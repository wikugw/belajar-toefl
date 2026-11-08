import { resultOf } from "./questions";
import { stopSpeech } from "./speech";
import { KEYS, readStored, writeStored, type Best, type HistoryEntry } from "./storage";
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

export function startTest(def: TestDef) {
  stopSpeech();
  const { items, sections } = prepare(def);
  testStore.set({
    def,
    sections,
    items,
    ans: Array(items.length).fill(null),
    sec: 0,
    played: {},
    result: null,
    filter: { f: "all", topic: null },
  });
  startTimer(def.sequential ? def.sections[0].time : def.time);
}

export function answer(index: number, choice: number) {
  const s = testStore.get();
  if (!s || s.result) return;
  const ans = s.ans.slice();
  ans[index] = choice;
  patch({ ans });
}

export function markPlayed(key: string) {
  const s = testStore.get();
  if (s && !s.played[key]) patch({ played: { ...s.played, [key]: true } });
}

export function nextSection() {
  const s = testStore.get();
  if (!s) return;
  stopSpeech();
  const sec = s.sec + 1;
  patch({ sec });
  startTimer(s.def.sections[sec].time);
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
  const hist = [
    { t: now.toISOString(), mode: def.id, pkg: def.pkg, total: res.total },
    ...(readStored<HistoryEntry[]>(KEYS.history) || []),
  ];
  writeStored(KEYS.history, hist.slice(0, 20));
  patch({ result: { c, res, grp, date: now, hist: hist.slice(0, 5) } });
}

export function matchesFilter(item: RunItem, chosen: number | null, { f, topic }: ReviewFilter) {
  const result = resultOf(item, chosen);
  const matchesResult = f === "all" || (f === "ok" && result === "ok") || (f === "bad" && result !== "ok");
  return matchesResult && (!topic || item.topic === topic);
}

export function setReviewFilter(filter: ReviewFilter) {
  patch({ filter });
}

export function closeTest() {
  stopSpeech();
  clearInterval(timer);
  timerStore.set(null);
  testStore.set(null);
}
