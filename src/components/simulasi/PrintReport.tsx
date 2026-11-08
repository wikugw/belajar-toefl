"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal, flushSync } from "react-dom";
import { LessonBody } from "../Lesson";
import { Question } from "../Question";
import { filterSections, itemsOf, type TestMeta } from "@/lib/history";
import { lessonOf } from "@/lib/questions";
import { formatDate, testLabel } from "@/lib/reportImage";
import type { RunSection } from "@/lib/testSession";
import { ReportCard, type ReportData } from "./Report";
import { RunSections } from "./RunSections";

type Props = {
  meta: TestMeta;
  result: ReportData;
  sections: RunSection[];
  ans: (number | null)[];
  name: string;
};

function PrintDoc({ meta, result, sections, ans, name, all }: Props & { all: boolean }) {
  const isWrong = (i: number, a: number) => ans[i] !== a;
  const wrongItems = itemsOf(sections).filter((it) => isWrong(it.index, it.a));
  const shown = all ? sections : filterSections(sections, (it) => isWrong(it.index, it.a));
  const topics = [...new Set(wrongItems.map((it) => it.topic))].flatMap((t) => {
    const lesson = lessonOf(t);
    return lesson ? [{ topic: t, lesson }] : [];
  });

  return createPortal(
    <div className="print-doc">
      {/* tfoot tabel diulang browser di setiap halaman cetak. */}
      <table className="print-frame">
        <tfoot>
          <tr>
            <td>
              <p className="print-foot">
                Hanya simulasi untuk latihan. Bukan skor resmi TOEFL ITP dan tidak berlaku untuk keperluan apa pun.
              </p>
            </td>
          </tr>
        </tfoot>
        <tbody>
          <tr>
            <td>
              <div className="stack-lg">
                <ReportCard meta={meta} result={{ ...result, hist: [] }} name={name} />
                <h2 className="print-title">
                  {all ? "Semua soal" : `Soal yang salah atau kosong (${wrongItems.length})`}
                </h2>
                {shown.length ? (
                  <RunSections
                    compact
                    sections={shown}
                    renderItem={(it) => (
                      <Question
                        key={it.index}
                        item={it}
                        num={it.num}
                        kind={it.kind}
                        mode="test"
                        chosen={ans[it.index]}
                        revealed
                        onChoose={() => {}}
                      />
                    )}
                  />
                ) : (
                  <p>Semua soal benar.</p>
                )}
                {topics.length > 0 && (
                  <>
                    <h2 className="print-title">Materi untuk dipelajari</h2>
                    {topics.map(({ topic, lesson }) => (
                      <div key={topic} className="print-lesson">
                        <h3>{lesson.t}</h3>
                        <LessonBody lesson={lesson} />
                      </div>
                    ))}
                  </>
                )}
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>,
    document.body,
  );
}

export function PrintReport(props: Props) {
  const [all, setAll] = useState(false);
  const [printing, setPrinting] = useState(false);
  const pageTitle = useRef("");

  useEffect(() => {
    const done = () => {
      if (!pageTitle.current) return;
      document.body.classList.remove("printing");
      document.title = pageTitle.current;
      pageTitle.current = "";
      setPrinting(false);
    };
    window.addEventListener("afterprint", done);
    return () => window.removeEventListener("afterprint", done);
  }, []);

  const print = () => {
    if (!pageTitle.current) pageTitle.current = document.title;
    // Judul halaman dipakai browser sebagai nama file PDF.
    document.title = `Rapor TOEFL - ${testLabel(props.meta).replace(/ · /g, " - ")} - ${formatDate(props.result.date)}`;
    document.body.classList.add("printing");
    flushSync(() => setPrinting(true));
    window.print();
  };

  return (
    <div className="stack" style={{ gap: 6 }}>
      <label className="print-option">
        <input type="checkbox" checked={all} onChange={(e) => setAll(e.target.checked)} /> Sertakan semua soal di PDF
        {props.meta.id !== "short" ? " (bisa puluhan halaman)" : ""}
      </label>
      <div>
        <button className="btn ghost" type="button" onClick={print}>
          Simpan sebagai PDF
        </button>
      </div>
      <p className="note">
        Di dialog cetak, pilih <b>Simpan sebagai PDF</b>. Kalau dialognya tidak muncul, buka situs ini langsung di
        Chrome atau Safari.
      </p>
      {printing && <PrintDoc {...props} all={all} />}
    </div>
  );
}
