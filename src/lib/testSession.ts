import { draftKey, type Draft } from "./draft";
import { addToHistory } from "./history";
import { resultOf } from "./questions";
import { stopSpeech } from "./speech";
import { readStored, removeStored, writeStored, type Best, type HistoryEntry } from "./storage";
import { createStore } from "./store";
import type { Category, Counts, Score, TestBlock, TestDef, TestItem } from "./types";

export type RunItem = TestItem & { index: number; num: number; sec: number; grp: string };
export type RunBlock = Omit<TestBlock, "items"> & { id: string; items: RunItem[] };
export type RunSection = Omit<TestDef["sections"][number], "blocks"> & { blocks: RunBlock[] };
export type GroupStat = { ok: number; n: number; cat: Category };
export type TestResult = {
  c: Counts;
  res: Score;
  grp: Record<string, GroupStat>;
  date: Date;
  hist: HistoryEntry[];
  /** Id di riwayat. null kalau detail tes gagal disimpan. */
  recordId: string | null;
};
export type ReviewFilter = { f: "all" | "bad" | "ok"; topic: string | null };

export type TestSession = {
  def: TestDef;
  sections: RunSection[];
  items: RunItem[];
  ans: (number | null)[];
  sec: number;
  /** Audio sekali-putar yang sudah terpakai. Disimpan di sini supaya pindah tab tidak mereset. */
  played: Record<string, true>;
  result: TestResult | null;
  filter: ReviewFilter;
  /** false kalau draft terakhir gagal ditulis ke browser. */
  draftSaved: boolean;
};

export const testStore = createStore<TestSession | null>(null);
/* Dipisah dari sesi supaya detik timer tidak me-render ulang seluruh soal. */
export const timerStore = createStore<number | null>(null);

let timer: ReturnType<typeof setInterval> | undefined;

function patch(p: Partial<TestSession>) {
  const s = testStore.get();
  if (s) testStore.set({ ...s, ...p });
}

function prepare(def: TestDef) {
  const items: RunItem[] = [];
  const sections = def.sections.map((sec, si): RunSection => {
    let num = 0;
    return {
      ...sec,
      blocks: sec.blocks.map((b, bi) => ({
        ...b,
        id: `${si}-${bi}`,
        items: b.items.map((it) => {
          num++;
          const grp =
            it.cat === "R"
              ? it.tag || "Reading"
              : it.cat === "S"
                ? it.type === "we"
                  ? "Written Expression"
                  : "Structure"
                : b.grp || "Listening";
          const run: RunItem = {
            ...it,
            index: items.length,
            num: def.continuous ? items.length + 1 : num,
            sec: si,
            grp,
          };
          items.push(run);
          return run;
        }),
      })),
    };
  });
  return { items, sections };
}

function startTimer(left: number | null | undefined) {
  clearInterval(timer);
  timerStore.set(left ?? null);
  if (left == null) return;
  timer = setInterval(() => {
    const next = (timerStore.get() ?? 0) - 1;
    timerStore.set(next);
    if (next <= 0) {
      clearInterval(timer);
      const s = testStore.get();
      if (s && s.def.sequential && s.sec < s.def.sections.length - 1) nextSection();
      else finishTest();
    }
  }, 1000);
}

function saveDraft() {
  const s = testStore.get();
  if (!s || s.def.id !== "untimed" || s.result) return;
  if (s.sec === 0 && s.ans.every((a) => a == null)) return;
  const draft: Draft = {
    fingerprint: s.def.fingerprint as string,
    ans: s.ans,
    sec: s.sec,
    savedAt: new Date().toISOString(),
  };
  const draftSaved = writeStored(draftKey(s.def.pkg), draft);
  if (draftSaved !== s.draftSaved) patch({ draftSaved });
}

/** Tanpa `draft`, tes dimulai dari awal dan draft lama paket itu dihapus. */
export function startTest(def: TestDef, draft?: Draft) {
  stopSpeech();
  if (def.id === "untimed" && !draft) removeStored(draftKey(def.pkg));
  const { items, sections } = prepare(def);
  const sec = draft?.sec ?? 0;
  testStore.set({
    def,
    sections,
    items,
    ans: draft?.ans ?? Array(items.length).fill(null),
    sec,
    played: {},
    result: null,
    filter: { f: "all", topic: null },
    draftSaved: true,
  });
  startTimer(def.sequential ? def.sections[sec].time : def.time);
}

export function answer(index: number, choice: number) {
  const s = testStore.get();
  if (!s || s.result) return;
  const ans = s.ans.slice();
  ans[index] = choice;
  patch({ ans });
  saveDraft();
}

export function markPlayed(key: string) {
  const s = testStore.get();
  if (s && !s.played[key]) patch({ played: { ...s.played, [key]: true } });
}

export function goToSection(sec: number) {
  const s = testStore.get();
  if (!s) return;
  stopSpeech();
  patch({ sec });
  startTimer(s.def.sections[sec].time);
  saveDraft();
}

export function nextSection() {
  const s = testStore.get();
  if (s) goToSection(s.sec + 1);
}

export function finishTest() {
  stopSpeech();
  const s = testStore.get();
  if (!s || s.result) return;
  clearInterval(timer);
  const { def, items, ans } = s;
  const c: Counts = { L: 0, S: 0, R: 0 };
  const grp: Record<string, GroupStat> = {};
  items.forEach((it, i) => {
    const ok = ans[i] === it.a;
    if (ok) c[it.cat]++;
    const g = grp[it.grp] || (grp[it.grp] = { ok: 0, n: 0, cat: it.cat });
    g.n++;
    if (ok) g.ok++;
  });
  const res = def.score(c);
  for (const key of [def.storeKey, def.pkgKey]) {
    if (!key) continue;
    const best = readStored<Best>(key);
    if (!best || res.total > best.total) writeStored(key, { total: res.total });
  }
  const now = new Date();
  const { entry, hist } = addToHistory({
    t: now.toISOString(),
    meta: { id: def.id, pkg: def.pkg, counts: def.counts },
    sections: s.sections,
    ans,
    c,
    res,
    grp,
  });
  if (def.id === "untimed") removeStored(draftKey(def.pkg));
  patch({ result: { c, res, grp, date: now, hist: hist.slice(0, 5), recordId: entry.id ?? null } });
}

export function matchesFilter(item: RunItem, chosen: number | null, { f, topic }: ReviewFilter) {
  const result = resultOf(item, chosen);
  const matchesResult = f === "all" || (f === "ok" && result === "ok") || (f === "bad" && result !== "ok");
  return matchesResult && (!topic || item.topic === topic);
}

export function setReviewFilter(filter: ReviewFilter) {
  patch({ filter });
}

export function saveAndExit() {
  saveDraft();
  closeTest();
}

export function closeTest() {
  stopSpeech();
  clearInterval(timer);
  timerStore.set(null);
  testStore.set(null);
}
