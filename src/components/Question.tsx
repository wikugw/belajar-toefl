"use client";

import { LETTERS, lessonOf, optionsOf, resultOf } from "@/lib/questions";
import type { Question as QuestionData, QuestionKind } from "@/lib/types";
import { AudioControls } from "./AudioControls";
import { LessonBody } from "./Lesson";

type Props = {
  item: QuestionData;
  num: number;
  kind: QuestionKind;
  /** practice: pembahasan langsung muncul. test: jawaban disimpan sampai tes selesai. */
  mode: "practice" | "test";
  chosen: number | null;
  revealed: boolean;
  onChoose: (i: number) => void;
  hidden?: boolean;
  playOnce?: boolean;
  played?: boolean;
  onPlayed?: () => void;
};

function Prompt({ item, kind }: { item: QuestionData; kind: QuestionKind }) {
  if (item.type === "we") {
    let k = 0;
    return (
      <div className="we">
        {item.parts.map((p, i) =>
          typeof p === "string" ? (
            p
          ) : (
            <span key={i}>
              <u>{p.u}</u>
              <sub>{LETTERS[k++]}</sub>
            </span>
          ),
        )}
      </div>
    );
  }
  if (kind === "listen") {
    return (
      <div className="q-prompt muted" style={{ fontSize: ".95rem" }}>
        <i>Pertanyaan yang dibacakan:</i> {item.q}
      </div>
    );
  }
  const blank = item.q.indexOf("_____");
  return (
    <div className="q-prompt">
      {blank < 0 ? (
        item.q
      ) : (
        <>
          {item.q.slice(0, blank)}
          <span className="blank" />
          {item.q.slice(blank + 5)}
        </>
      )}
    </div>
  );
}

function Explanation({ item, chosen, openLesson }: { item: QuestionData; chosen: number | null; openLesson: boolean }) {
  const result = resultOf(item, chosen);
  const lesson = lessonOf(item.topic);
  return (
    <div className="explain">
      <span className={`verdict ${result === "ok" ? "g" : "b"}`}>
        {result === "skip" ? "Tidak dijawab." : result === "ok" ? "Benar." : "Kurang tepat."}
      </span>{" "}
      Jawaban: <b>{LETTERS[item.a]}</b>
      {result === "bad" && ` (kamu memilih ${LETTERS[chosen as number]})`}.{" "}
      <span dangerouslySetInnerHTML={{ __html: item.ex }} />
      {lesson && (
        <details className="lesson" open={openLesson}>
          <summary>Pelajari materi: {lesson.t}</summary>
          <LessonBody lesson={lesson} />
        </details>
      )}
    </div>
  );
}

export function Question({
  item,
  num,
  kind,
  mode,
  chosen,
  revealed,
  onChoose,
  hidden,
  playOnce,
  played,
  onPlayed,
}: Props) {
  const label =
    kind === "listen"
      ? "Listening"
      : item.type === "we"
        ? "Written Expression"
        : item.tag
          ? item.tag
          : kind === "read"
            ? "Reading"
            : "Structure";
  const script = item.type !== "we" ? item.script : undefined;

  const optionClass = (i: number) => {
    if (!revealed) return chosen === i ? "opt sel" : "opt";
    if (i === item.a) return "opt right";
    return i === chosen ? "opt wrong" : "opt";
  };

  return (
    <div className="q" data-question hidden={hidden}>
      <div className="q-head">
        <span className="no">Soal {num}</span>
        <span>{label}</span>
      </div>
      {script && (
        <AudioControls
          script={script}
          once={playOnce && !revealed}
          played={played}
          onPlayed={onPlayed}
          lockTranscript={mode === "test" && !revealed}
        />
      )}
      <Prompt item={item} kind={kind} />
      <div className="opts" role="group" aria-label={`Pilihan jawaban soal ${num}`}>
        {optionsOf(item).map((o, i) => (
          <button key={i} type="button" className={optionClass(i)} disabled={revealed} onClick={() => onChoose(i)}>
            <span className="bub">{LETTERS[i]}</span>
            <span>{o}</span>
          </button>
        ))}
      </div>
      {revealed && <Explanation item={item} chosen={chosen} openLesson={mode === "practice" && chosen !== item.a} />}
    </div>
  );
}
