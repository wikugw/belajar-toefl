"use client";

import { flushSync } from "react-dom";
import { LessonBody } from "../Lesson";
import { lessonOf } from "@/lib/questions";
import { matchesFilter, setReviewFilter, testStore, type ReviewFilter } from "@/lib/testSession";

const TOPIC_CLASS: Record<string, string> = { L: "c-listen", S: "c-struct", R: "c-read" };

export function Review() {
  const session = testStore.use((s) => s);
  if (!session) return null;
  const { items, ans, filter } = session;

  const byTopic = new Map<string, { topic: string; n: number; bad: number }>();
  items.forEach((it, i) => {
    const stat = byTopic.get(it.topic) ?? { topic: it.topic, n: 0, bad: 0 };
    stat.n++;
    if (ans[i] !== it.a) stat.bad++;
    byTopic.set(it.topic, stat);
  });
  const stats = [...byTopic.values()].filter((x) => lessonOf(x.topic)).sort((a, b) => b.bad - a.bad || b.n - a.n);
  const weak = stats.filter((x) => x.bad > 0);
  const bad = items.filter((it, i) => ans[i] !== it.a).length;
  const all = items.length;

  const shown = items.filter((it, i) => matchesFilter(it, ans[i], filter)).length;

  const chip = (f: ReviewFilter["f"], label: string) => (
    <button
      type="button"
      className={filter.f === f ? "chipbtn on" : "chipbtn"}
      onClick={() => setReviewFilter({ f, topic: null })}
    >
      {label}
    </button>
  );

  const showTopic = (topic: string) => {
    flushSync(() => setReviewFilter({ f: "bad", topic }));
    document
      .querySelector("#simRun [data-question]:not([hidden])")
      ?.scrollIntoView({ block: "start", behavior: "smooth" });
  };

  return (
    <div className="panel stack review">
      <div className="eyebrow">Belajar dari hasil tes</div>
      <h2>Pembahasan &amp; materi</h2>
      <p>
        Setiap soal di bawah sudah dilengkapi kunci, penjelasan, dan tombol <b>Pelajari materi</b>. Mulailah dari topik
        yang paling banyak salah.
      </p>
      <div className="filters" role="group" aria-label="Saring soal">
        {chip("all", `Semua soal (${all})`)}
        {chip("bad", `Salah & kosong (${bad})`)}
        {chip("ok", `Benar (${all - bad})`)}
      </div>
      {weak.length ? (
        <>
          <h3>Topik yang perlu dipelajari</h3>
          <div className="topics">
            {weak.map((x, i) => {
              const lesson = lessonOf(x.topic)!;
              return (
                <div key={x.topic} className={`topic-card ${TOPIC_CLASS[x.topic[0]]}`}>
                  <div className="topic-top">
                    <b>{lesson.t}</b>
                    <span>
                      {x.bad} salah dari {x.n} soal
                    </span>
                  </div>
                  <details open={i === 0}>
                    <summary>Baca materi</summary>
                    <LessonBody lesson={lesson} />
                  </details>
                  <div>
                    <button type="button" className="btn ghost sm" onClick={() => showTopic(x.topic)}>
                      Lihat {x.bad} soal yang salah
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <p className="status g" style={{ alignSelf: "flex-start" }}>
          Semua soal benar. Luar biasa!
        </p>
      )}
      <p className="note">
        {filter.topic
          ? `Menampilkan ${shown} soal salah untuk topik "${lessonOf(filter.topic)?.t}". Gulir ke bawah untuk melihatnya.`
          : filter.f === "all"
            ? ""
            : `Menampilkan ${shown} soal.`}
      </p>
    </div>
  );
}
