"use client";

import Link from "next/link";
import { Question } from "../Question";
import { filterSections, itemsOf, type HistoryRecord } from "@/lib/history";
import { createStore } from "@/lib/store";
import { RunSections } from "./RunSections";

/* Sengaja tidak disimpan ke browser: pengerjaan ulang tidak mengubah hasil tes asli. */
type Round = { id: string; indexes: number[]; chosen: Record<number, number> };
const roundStore = createStore<Round | null>(null);

export function Retake({ record, backHref }: { record: HistoryRecord; backHref: string }) {
  const stored = roundStore.use((s) => s);
  const wrong = itemsOf(record.sections)
    .filter((it) => record.ans[it.index] !== it.a)
    .map((it) => it.index);
  const round = stored?.id === record.id ? stored : { id: record.id, indexes: wrong, chosen: {} };
  const { indexes, chosen } = round;

  const included = new Set(indexes);
  const items = itemsOf(record.sections).filter((it) => included.has(it.index));
  const answered = items.filter((it) => chosen[it.index] != null).length;
  const correct = items.filter((it) => chosen[it.index] === it.a);
  const stillWrong = items.filter((it) => chosen[it.index] !== it.a).map((it) => it.index);
  const finished = items.length > 0 && answered === items.length;

  return (
    <div className="stack-lg">
      <div className="stack">
        <div className="bar">
          <h2>Kerjakan ulang soal yang salah</h2>
          <span className="score-pill">
            {answered} / {items.length} dijawab · {correct.length} benar
          </span>
        </div>
        <p className="note">
          Pembahasan muncul setelah menjawab. Hasil di sini tidak mengubah skor tes dan tidak masuk riwayat.
        </p>
        <div>
          <Link className="btn ghost sm" href={backHref}>
            Kembali ke hasil tes
          </Link>
        </div>
      </div>
      {items.length === 0 ? (
        <p className="status g" style={{ alignSelf: "flex-start" }}>
          Tidak ada soal yang salah di tes ini.
        </p>
      ) : (
        <RunSections
          compact
          sections={filterSections(record.sections, (it) => included.has(it.index))}
          renderItem={(it) => (
            <Question
              key={`${indexes.length}-${it.index}`}
              item={it}
              num={it.num}
              kind={it.kind}
              mode="practice"
              chosen={chosen[it.index] ?? null}
              revealed={chosen[it.index] != null}
              onChoose={(c) => roundStore.set({ ...round, chosen: { ...chosen, [it.index]: c } })}
            />
          )}
        />
      )}
      {finished && (
        <div className="panel tint stack" role="status">
          <h3>
            {correct.length} dari {items.length} kini benar
          </h3>
          <div className="audio">
            {stillWrong.length > 0 ? (
              <button
                className="btn"
                type="button"
                onClick={() => {
                  roundStore.set({ id: record.id, indexes: stillWrong, chosen: {} });
                  window.scrollTo(0, 0);
                }}
              >
                Ulangi {stillWrong.length} soal yang masih salah
              </button>
            ) : (
              <p>Semua soal sudah benar. Mantap!</p>
            )}
            <button
              className="btn ghost"
              type="button"
              onClick={() => {
                roundStore.set({ id: record.id, indexes: wrong, chosen: {} });
                window.scrollTo(0, 0);
              }}
            >
              Mulai lagi dari semua soal salah
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
