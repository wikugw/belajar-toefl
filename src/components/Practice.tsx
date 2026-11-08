"use client";

import type { ReactNode } from "react";
import { listeningPractice, readingPractice, structurePractice } from "@/data/practice";
import { createStore } from "@/lib/store";
import type { Question as QuestionData, QuestionKind } from "@/lib/types";
import { Question } from "./Question";

type SectionId = "listening" | "structure" | "reading";

const SECTIONS: Record<SectionId, { kind: QuestionKind; items: QuestionData[] }> = {
  listening: { kind: "listen", items: listeningPractice },
  structure: { kind: "struct", items: structurePractice },
  reading: { kind: "read", items: readingPractice },
};

/* Jawaban latihan tetap tersimpan saat pindah tab, hilang saat halaman dimuat ulang. */
const answers = createStore<Record<SectionId, Record<number, number>>>({ listening: {}, structure: {}, reading: {} });

export function Practice({ section, title, children }: { section: SectionId; title: string; children?: ReactNode }) {
  const { kind, items } = SECTIONS[section];
  const chosen = answers.use((s) => s[section]);
  const done = Object.keys(chosen).length;
  const score = items.filter((it, i) => chosen[i] === it.a).length;

  return (
    <div className="stack">
      <div className="bar">
        <h2>{title}</h2>
        <span className="score-pill">
          {score} / {items.length}
          {done === items.length && " benar"}
        </span>
      </div>
      {children}
      <div className="stack">
        {items.map((it, i) => (
          <Question
            key={i}
            item={it}
            num={i + 1}
            kind={kind}
            mode="practice"
            chosen={chosen[i] ?? null}
            revealed={chosen[i] != null}
            onChoose={(c) => {
              const all = answers.get();
              answers.set({ ...all, [section]: { ...all[section], [i]: c } });
            }}
          />
        ))}
      </div>
    </div>
  );
}
