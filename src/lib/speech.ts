import { KEYS, readStored, writeStored } from "./storage";
import { createStore } from "./store";
import type { ScriptLine, Speaker } from "./types";

const FEM =
  /female|woman|samantha|zira|aria|jenny|susan|karen|victoria|allison|ava|emma|michelle|sonia|libby|natasha|serena|moira|tessa|fiona|joanna|salli|kendra|kimberly|ivy|zoe|ana\b|google us english/i;
const MAL =
  /\bmale\b|david|daniel|alex\b|guy|fred|mark|tom\b|aaron|andrew|brian|christopher|eric|roger|ryan|thomas|william|matthew|joey|justin|evan|nathan|oliver|arthur|rishi|davis|tony|jason/i;
function quality(v: SpeechSynthesisVoice) {
  const n = v.name;
  let s = 0;
  if (/natural|neural/i.test(n)) s += 60;
  if (/premium/i.test(n)) s += 50;
  if (/enhanced/i.test(n)) s += 40;
  if (/online/i.test(n)) s += 20;
  if (/google/i.test(n)) s += 30;
  if (!v.localService) s += 5;
  if (/en[-_]US/i.test(v.lang)) s += 8;
  else if (/en[-_](GB|AU|CA)/i.test(v.lang)) s += 4;
  if (
    /compact|espeak|novelty|bells|whisper|zarvox|bad news|good news|bubbles|cellos|organ|trinoids|jester|superstar|albert|wobble|bahh|boing|hysterical|deranged|grandma|grandpa|eddy|flo|reed|rocko|sandy|shelley/i.test(
      n,
    )
  )
    s -= 100;
  return s;
}
const isMale = (v: SpeechSynthesisVoice) => MAL.test(v.name) && !/female/i.test(v.name);
const isFem = (v: SpeechSynthesisVoice) => FEM.test(v.name) && !isMale(v);

type SpeechState = {
  /** false kalau browser tidak punya speechSynthesis. Saat SSR dianggap true. */
  supported: boolean;
  voices: SpeechSynthesisVoice[];
  w: string;
  m: string;
  rate: number;
  /** Id tombol yang sedang memutar audio. */
  speakingId: string | null;
};

export const speechStore = createStore<SpeechState>({
  supported: true,
  voices: [],
  w: "",
  m: "",
  rate: 0.95,
  speakingId: null,
});

const synth = () => (typeof window !== "undefined" && "speechSynthesis" in window ? window.speechSynthesis : null);

function patch(p: Partial<SpeechState>) {
  speechStore.set({ ...speechStore.get(), ...p });
}

function loadVoices() {
  const s = synth();
  if (!s) return;
  const voices = s
    .getVoices()
    .filter((v) => /^en[-_]/i.test(v.lang))
    .sort((a, b) => quality(b) - quality(a));
  if (!voices.length) return;
  let { w, m } = speechStore.get();
  const has = (n: string) => voices.some((v) => v.name === n);
  if (!has(w)) w = (voices.find(isFem) || voices[0]).name;
  if (!has(m)) m = (voices.find(isMale) || voices.find((v) => v.name !== w) || voices[0]).name;
  patch({ voices, w, m });
}

let started = false;
/** Dipanggil sekali di sisi client. */
export function initSpeech() {
  if (started) return;
  started = true;
  const saved = readStored<Partial<Pick<SpeechState, "w" | "m" | "rate">>>(KEYS.voice);
  patch({ ...saved, supported: !!synth() });
  const s = synth();
  if (!s) return;
  s.onvoiceschanged = loadVoices;
  setTimeout(loadVoices, 0);
  setTimeout(loadVoices, 800);
}

export function setVoiceSetting(p: Partial<Pick<SpeechState, "w" | "m" | "rate">>) {
  patch(p);
  const { w, m, rate } = speechStore.get();
  writeStored(KEYS.voice, { w, m, rate });
}

function voiceFor(sp: Speaker) {
  const { voices, w, m } = speechStore.get();
  const name = sp === "M" ? m : w;
  return voices.find((v) => v.name === name) || voices[0] || null;
}
function pitchFor(sp: Speaker) {
  const { w, m } = speechStore.get();
  if (w !== m) return 1;
  return sp === "M" ? 0.88 : sp === "W" ? 1.1 : 1;
}
function sentences(t: string) {
  return (t.match(/[^.!?]+[.!?]+["']?|[^.!?]+$/g) || [t]).map((x) => x.trim()).filter(Boolean);
}

export function rateLabel(r: number) {
  return r < 0.9 ? "Pelan" : r < 1 ? "Agak pelan" : r < 1.05 ? "Normal (seperti tes asli)" : "Cepat";
}

let speakDone: (() => void) | null = null;

/** Menghentikan audio. Callback `done` audio yang sedang berjalan ikut dipanggil. */
export function stopSpeech() {
  synth()?.cancel();
  const d = speakDone;
  speakDone = null;
  if (speechStore.get().speakingId !== null) patch({ speakingId: null });
  d?.();
}

export function speak(lines: ScriptLine[], id: string, done?: () => void) {
  const s = synth();
  if (!s) return;
  if (speechStore.get().speakingId === id) {
    stopSpeech();
    return;
  }
  stopSpeech();
  speakDone = done || null;
  patch({ speakingId: id });
  const parts: [Speaker, string, number][] = [];
  lines.forEach(([sp, t], li) => {
    const ss = sentences(t);
    ss.forEach((x, k) =>
      parts.push([sp, x, k === ss.length - 1 ? (li === lines.length - 1 ? 0 : sp === "N" ? 500 : 650) : 180]),
    );
  });
  const active = () => speechStore.get().speakingId === id;
  let i = 0;
  const next = () => {
    if (!active()) return;
    if (i >= parts.length) {
      stopSpeech();
      return;
    }
    const [sp, t, gap] = parts[i++];
    const u = new SpeechSynthesisUtterance(t);
    const v = voiceFor(sp);
    if (v) {
      u.voice = v;
      u.lang = v.lang;
    } else u.lang = "en-US";
    u.rate = speechStore.get().rate;
    u.pitch = pitchFor(sp);
    u.onend = () => {
      if (active()) setTimeout(next, gap);
    };
    u.onerror = () => {
      if (active()) stopSpeech();
    };
    s.speak(u);
  };
  next();
}
