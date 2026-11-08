export type Speaker = "W" | "M" | "N";
export type ScriptLine = [Speaker, string];
export type QuestionKind = "listen" | "struct" | "read";
export type Category = "L" | "S" | "R";

type QuestionBase = {
  /** Indeks jawaban benar (0-3). */
  a: number;
  /** Pembahasan, boleh berisi HTML sederhana. */
  ex: string;
  /** Kunci ke MATERI. */
  topic: string;
  tag?: string;
};
export type ChoiceQuestion = QuestionBase & {
  type?: "mc";
  q: string;
  opts: string[];
  script?: ScriptLine[];
};
export type WrittenExpressionQuestion = QuestionBase & {
  type: "we";
  parts: (string | { u: string })[];
};
export type Question = ChoiceQuestion | WrittenExpressionQuestion;

export type Passage = { title: string; paras: string[] };
export type AudioGroup = { label: string; script: ScriptLine[]; items: Question[] };
export type ReadingGroup = { passage: Passage; items: Question[] };

export type FullPackage = {
  A: Question[];
  B: AudioGroup[];
  C: AudioGroup[];
  S: Question[];
  W: Question[];
  R: ReadingGroup[];
};
export type ShortPackage = {
  L: Question[];
  S: Question[];
  W: Question[];
  passage: Passage;
  R: Question[];
};

export type Lesson = { t: string; r: string; f: string; ok: string; no: string; tip: string };

export type TestItem = Question & { kind: QuestionKind; cat: Category };
export type TestBlock = {
  grp?: string;
  title?: string | null;
  note?: string | null;
  passage?: Passage;
  script?: ScriptLine[];
  label?: string;
  items: TestItem[];
};
export type TestSection = {
  title: string;
  sub: string;
  cls: string;
  time?: number | null;
  directions?: string;
  blocks: TestBlock[];
};
export type Counts = Record<Category, number>;
export type TestDef = {
  id: "full" | "short" | "untimed";
  pkg: number | null;
  sequential: boolean;
  playOnce: boolean;
  continuous: boolean;
  time?: number;
  sections: TestSection[];
  /** Mengonversi jumlah benar per bagian ke skor. */
  score: (correct: Counts) => Score;
  counts: Counts;
  /** null: skor tidak dihitung sebagai skor terbaik. */
  storeKey: string | null;
  pkgKey: string | null;
  /** Hanya tes tanpa waktu: penanda isi paket untuk memvalidasi draft. */
  fingerprint?: string;
};

export type Score = { total: number; sl: number; ss: number; sr: number };
