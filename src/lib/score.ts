import type { Score } from "./types";

export const SCORE_MIN = 310;
export const SCORE_MAX = 677;

// raw: [L, S, R]
const CONV: Record<number, [number, number | null, number]> = {
  50: [68, null, 67],
  49: [67, null, 66],
  48: [66, null, 65],
  47: [65, null, 63],
  46: [63, null, 61],
  45: [62, null, 60],
  44: [61, null, 59],
  43: [60, null, 58],
  42: [59, null, 57],
  41: [58, null, 56],
  40: [57, 68, 55],
  39: [57, 67, 54],
  38: [56, 65, 54],
  37: [55, 63, 53],
  36: [54, 61, 52],
  35: [54, 60, 52],
  34: [53, 58, 51],
  33: [52, 57, 50],
  32: [52, 56, 49],
  31: [51, 55, 48],
  30: [51, 54, 48],
  29: [50, 53, 47],
  28: [49, 52, 46],
  27: [49, 51, 46],
  26: [48, 50, 45],
  25: [48, 49, 44],
  24: [47, 48, 43],
  23: [47, 47, 43],
  22: [46, 46, 42],
  21: [45, 45, 41],
  20: [45, 44, 40],
  19: [44, 43, 39],
  18: [43, 42, 38],
  17: [42, 41, 37],
  16: [41, 40, 36],
  15: [41, 40, 35],
  14: [39, 38, 34],
  13: [38, 37, 32],
  12: [37, 36, 31],
  11: [35, 35, 30],
  10: [33, 33, 29],
  9: [32, 31, 28],
  8: [32, 29, 28],
  7: [31, 27, 27],
  6: [30, 26, 26],
  5: [29, 25, 25],
  4: [28, 23, 24],
  3: [27, 22, 23],
  2: [26, 21, 23],
  1: [25, 20, 22],
  0: [24, 20, 21],
};

export function toefl(l: number | string, s: number | string, r: number | string): Score {
  const c = (v: number | string, max: number) => Math.max(0, Math.min(max, Math.round(+v || 0)));
  const sl = Math.max(31, CONV[c(l, 50)][0]);
  const ss = Math.max(31, CONV[c(s, 40)][1] as number);
  const sr = Math.max(31, CONV[c(r, 50)][2]);
  return { total: Math.round(((sl + ss + sr) * 10) / 3), sl, ss, sr };
}

export function needFor(t: number) {
  for (let p = 0; p <= 100; p++) {
    const l = Math.round((p / 100) * 50);
    const s = Math.round((p / 100) * 40);
    const r = Math.round((p / 100) * 50);
    const x = toefl(l, s, r);
    if (x.total >= t) return { l, s, r, ...x };
  }
  return { l: 50, s: 40, r: 50, ...toefl(50, 40, 50) };
}

/** Posisi skor pada skala 310-677, dalam persen. */
export function scalePos(v: number) {
  return Math.max(0, Math.min(100, ((v - SCORE_MIN) / (SCORE_MAX - SCORE_MIN)) * 100));
}
