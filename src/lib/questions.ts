import { MATERI } from "@/data/materi";
import type { Question } from "./types";

export const LETTERS = "ABCD";
export type QuestionResult = "ok" | "bad" | "skip";

export function optionsOf(item: Question) {
  return item.type === "we" ? item.parts.flatMap((p) => (typeof p === "object" ? [p.u] : [])) : item.opts;
}

export function resultOf(item: Question, chosen: number | null): QuestionResult {
  return chosen == null ? "skip" : chosen === item.a ? "ok" : "bad";
}

export const lessonOf = (topic: string) => MATERI[topic] as (typeof MATERI)[string] | undefined;
