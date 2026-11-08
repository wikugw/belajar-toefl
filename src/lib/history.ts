import { KEYS, readStored, removeStored, useStored, writeStored, type HistoryEntry } from "./storage";
import type { GroupStat, RunItem, RunSection } from "./testSession";
import type { Counts, Score, TestDef } from "./types";

export const HISTORY_LIMIT = 10;

export type TestMeta = Pick<TestDef, "id" | "pkg" | "counts">;

/* Salinan soal dan jawaban, supaya hasil lama tetap benar walau isi paket nanti berubah. */
export type HistoryRecord = {
  id: string;
  t: string;
  meta: TestMeta;
  sections: RunSection[];
  ans: (number | null)[];
  c: Counts;
  res: Score;
  grp: Record<string, GroupStat>;
};

const recordKey = (id: string) => `toefl475.result.${id}`;

export const itemsOf = (sections: RunSection[]) => sections.flatMap((s) => s.blocks.flatMap((b) => b.items));

/** Hanya menyisakan soal yang lolos `keep`, beserta teks bacaan dan audionya. */
export function filterSections(sections: RunSection[], keep: (item: RunItem) => boolean) {
  return sections
    .map((s) => ({
      ...s,
      blocks: s.blocks.map((b) => ({ ...b, items: b.items.filter(keep) })).filter((b) => b.items.length > 0),
    }))
    .filter((s) => s.blocks.length > 0);
}

/** Mengembalikan entri riwayat terbaru. `id`-nya kosong kalau detail tes gagal disimpan. */
export function addToHistory(record: Omit<HistoryRecord, "id">) {
  const id = Date.now().toString(36);
  const hasDetail = writeStored(recordKey(id), { ...record, id });
  const items = itemsOf(record.sections);
  const entry: HistoryEntry = {
    t: record.t,
    mode: record.meta.id,
    pkg: record.meta.pkg,
    total: record.res.total,
    wrong: items.filter((it, i) => record.ans[i] !== it.a).length,
    n: items.length,
    ...(hasDetail ? { id } : {}),
  };
  const all = [entry, ...(readStored<HistoryEntry[]>(KEYS.history) || [])];
  writeStored(KEYS.history, all.slice(0, HISTORY_LIMIT));
  all.slice(HISTORY_LIMIT).forEach((old) => old.id && removeStored(recordKey(old.id)));
  return { entry, hist: all.slice(0, HISTORY_LIMIT) };
}

export function deleteEntry(entry: HistoryEntry) {
  if (entry.id) removeStored(recordKey(entry.id));
  const all = readStored<HistoryEntry[]>(KEYS.history) || [];
  writeStored(
    KEYS.history,
    all.filter((e) => e.t !== entry.t),
  );
}

export function clearHistory() {
  (readStored<HistoryEntry[]>(KEYS.history) || []).forEach((e) => e.id && removeStored(recordKey(e.id)));
  removeStored(KEYS.history);
}

export function useHistory() {
  return (useStored<HistoryEntry[]>(KEYS.history) || []).slice(0, HISTORY_LIMIT);
}

export function useRecord(id: string) {
  const record = useStored<HistoryRecord>(recordKey(id));
  return record && Array.isArray(record.sections) && Array.isArray(record.ans) && record.res ? record : null;
}
