import type { Lesson } from "@/lib/types";

/* Isi materi berasal dari src/data dan memuat tag sederhana seperti <u> dan <i>. */
const html = (s: string) => ({ __html: s });

export function LessonBody({ lesson: L }: { lesson: Lesson }) {
  return (
    <div className="lesson-body">
      <p dangerouslySetInnerHTML={html(L.r)} />
      <p className="lf">
        <b>Rumus / pola:</b> <span dangerouslySetInnerHTML={html(L.f)} />
      </p>
      <div className="ex ok">
        <b>BENAR</b>
        <span dangerouslySetInnerHTML={html(L.ok)} />
      </div>
      <div className="ex no">
        <b>HINDARI</b>
        <span dangerouslySetInnerHTML={html(L.no)} />
      </div>
      <p className="lt">
        <b>Tips:</b> <span dangerouslySetInnerHTML={html(L.tip)} />
      </p>
    </div>
  );
}
