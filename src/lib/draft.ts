import { useStored } from "./storage";
import type { TestDef } from "./types";

/* Hanya untuk tes tanpa waktu. Yang disimpan cuma posisi dan jawaban; soalnya dibangun ulang dari nomor paket. */
export type Draft = {
  /** Sidik jari isi paket. Jawaban dicatat per nomor soal, jadi tidak boleh dipakai kalau isi paketnya berubah. */
  fingerprint: string;
  ans: (number | null)[];
  sec: number;
  savedAt: string;
};
export type DraftStatus = { state: "none" } | { state: "stale" } | { state: "ok"; draft: Draft };

export const draftKey = (pkg: number | null) => `toefl475.draft.pkg${pkg}`;

const countItems = (def: TestDef) =>
  def.sections.reduce((n, s) => n + s.blocks.reduce((m, b) => m + b.items.length, 0), 0);

export function checkDraft(def: TestDef, draft: Draft | null): DraftStatus {
  if (!draft) return { state: "none" };
  const usable =
    draft.fingerprint === def.fingerprint &&
    Array.isArray(draft.ans) &&
    draft.ans.length === countItems(def) &&
    Number.isInteger(draft.sec) &&
    draft.sec >= 0 &&
    draft.sec < def.sections.length;
  return usable ? { state: "ok", draft } : { state: "stale" };
}

export function useDraft(def: TestDef) {
  return checkDraft(def, useStored<Draft>(draftKey(def.pkg)));
}

export const answeredCount = (draft: Draft) => draft.ans.filter((a) => a != null).length;
