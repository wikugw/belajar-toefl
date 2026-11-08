import { FULL_PACKAGES } from "@/data/paket";
import { shortPaket1 } from "@/data/short-paket-1";
import { toefl } from "./score";
import { KEYS } from "./storage";
import type { Category, FullPackage, Passage, Question, QuestionKind, TestDef, TestItem } from "./types";

const tag =
  (kind: QuestionKind, cat: Category) =>
  (q: Question): TestItem => ({ ...q, kind, cat });
const listen = tag("listen", "L");
const struct = tag("struct", "S");
const read = tag("read", "R");

const pkgKey = (kind: "pkg" | "short", no: number) => `toefl475.${kind}${no}`;

function buildFull(P: FullPackage, no: number): TestDef {
  return {
    id: "full",
    pkg: no,
    sequential: true,
    playOnce: true,
    continuous: false,
    sections: [
      {
        title: "Section 1 · Listening Comprehension",
        sub: `Paket ${no} · 50 soal · mengikuti audio`,
        cls: "c-listen",
        time: null,
        directions:
          "Di tes asli, setiap audio dan pertanyaan hanya diputar satu kali dan pertanyaannya tidak tertulis. Di sini pertanyaan ikut tertulis supaya kamu bisa memeriksa, tapi usahakan menjawab dari yang kamu dengar.",
        blocks: [
          {
            grp: "Part A · Percakapan pendek",
            title: "Part A · Short Conversations",
            note: "Soal 1–30. Satu dialog pendek, satu pertanyaan.",
            items: P.A.map(listen),
          },
          ...P.B.map((g, i) => ({
            grp: "Part B · Percakapan panjang",
            title: i === 0 ? "Part B · Longer Conversations" : null,
            note: i === 0 ? "Soal 31–38. Dengarkan percakapan, lalu jawab 4 pertanyaan." : null,
            script: g.script,
            label: g.label,
            items: g.items.map(listen),
          })),
          ...P.C.map((g, i) => ({
            grp: "Part C · Kuliah & pengumuman",
            title: i === 0 ? "Part C · Talks" : null,
            note: i === 0 ? "Soal 39–50. Dengarkan kuliah atau pengumuman, lalu jawab 4 pertanyaan." : null,
            script: g.script,
            label: g.label,
            items: g.items.map(listen),
          })),
        ],
      },
      {
        title: "Section 2 · Structure & Written Expression",
        sub: `Paket ${no} · 40 soal · 25 menit`,
        cls: "c-struct",
        time: 25 * 60,
        directions:
          "Waktu berjalan begitu bagian ini dimulai. Kurang dari 40 detik per soal, jadi jangan berhenti terlalu lama di satu soal.",
        blocks: [
          { title: "Structure", note: "Soal 1–15. Pilih jawaban yang melengkapi kalimat.", items: P.S.map(struct) },
          {
            title: "Written Expression",
            note: "Soal 16–40. Pilih bagian bergaris bawah yang salah.",
            items: P.W.map(struct),
          },
        ],
      },
      {
        title: "Section 3 · Reading Comprehension",
        sub: `Paket ${no} · 50 soal · 55 menit`,
        cls: "c-read",
        time: 55 * 60,
        directions: "Lima teks, masing-masing 10 soal. Sekitar 11 menit per teks.",
        blocks: P.R.map((p, i) => ({ title: `Teks ${i + 1}`, passage: p.passage, items: p.items.map(read) })),
      },
    ],
    score: (c) => toefl(c.L, c.S, c.R),
    counts: { L: 50, S: 40, R: 50 },
    storeKey: KEYS.bestFull,
    pkgKey: pkgKey("pkg", no),
  };
}

function shortDef(
  L: TestItem[],
  S: TestItem[],
  W: TestItem[],
  passage: Passage,
  R: TestItem[],
  no: number | null,
): TestDef {
  return {
    id: "short",
    pkg: no,
    sequential: false,
    playOnce: false,
    continuous: true,
    time: 20 * 60,
    sections: [
      { title: "Part 1 · Listening", sub: "6 soal", cls: "c-listen", blocks: [{ grp: "Listening", items: L }] },
      { title: "Part 2 · Structure", sub: "soal 7–12", cls: "c-struct", blocks: [{ items: S }] },
      {
        title: "Part 2 · Written Expression",
        sub: "soal 13–18 · pilih bagian yang salah",
        cls: "c-struct",
        blocks: [{ items: W }],
      },
      { title: "Part 3 · Reading", sub: "soal 19–24", cls: "c-read", blocks: [{ passage, items: R }] },
    ],
    score: (c) => toefl((c.L / 6) * 50, (c.S / 12) * 40, (c.R / 6) * 50),
    counts: { L: 6, S: 12, R: 6 },
    storeKey: KEYS.bestShort,
    pkgKey: no ? pkgKey("short", no) : null,
  };
}

export const FULLS = FULL_PACKAGES.map((P, i) => buildFull(P, i + 1));

/* bank soal untuk tes singkat */
const BANK = {
  L: FULLS.flatMap((F) => F.sections[0].blocks[0].items),
  S: FULLS.flatMap((F) => F.sections[1].blocks[0].items),
  W: FULLS.flatMap((F) => F.sections[1].blocks[1].items),
  R: FULLS.flatMap((F) =>
    F.sections[2].blocks.map((b): { passage: Passage; items: TestItem[] } => ({ passage: b.passage!, items: b.items })),
  ),
};

function rng(seed: number) {
  return () => {
    seed = (seed * 1103515245 + 12345) % 2147483648;
    return seed / 2147483648;
  };
}
function shuffled<T>(arr: T[], random: () => number) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
const seededShuffle = <T>(arr: T[], seed: number) => shuffled(arr, rng(seed));
const pick = <T>(arr: T[], n: number) => shuffled(arr, Math.random).slice(0, n);
const indexes = (arr: unknown[]) => arr.map((_, i) => i);
const ascending = (a: number, b: number) => a - b;

const SB = {
  L: seededShuffle(BANK.L, 11),
  S: seededShuffle(BANK.S, 22),
  W: seededShuffle(BANK.W, 33),
  R: seededShuffle(BANK.R, 44),
};

export const SHORTS = [
  shortDef(
    shortPaket1.L.map(listen),
    shortPaket1.S.map(struct),
    shortPaket1.W.map(struct),
    shortPaket1.passage,
    shortPaket1.R.map(read),
    1,
  ),
  ...Array.from({ length: 9 }, (_, k) => {
    const P = SB.R[k];
    const idx = seededShuffle(indexes(P.items), 55 + k)
      .slice(0, 6)
      .sort(ascending);
    return shortDef(
      SB.L.slice(k * 6, k * 6 + 6),
      SB.S.slice(k * 6, k * 6 + 6),
      SB.W.slice(k * 6, k * 6 + 6),
      P.passage,
      idx.map((i) => P.items[i]),
      k + 2,
    );
  }),
];

export function buildRandomShort() {
  const P = pick(BANK.R, 1)[0];
  const ri = pick(indexes(P.items), 6).sort(ascending);
  return shortDef(
    pick(BANK.L, 6),
    pick(BANK.S, 6),
    pick(BANK.W, 6),
    P.passage,
    ri.map((i) => P.items[i]),
    null,
  );
}
