"use client";

import { useState } from "react";
import { finishTest, nextSection, testStore, timerStore, type TestSession } from "@/lib/testSession";

function Timer() {
  const left = timerStore.use((s) => s);
  if (left == null) return <span className="timer">Ikuti audio</span>;
  const clock = `${String(Math.floor(left / 60)).padStart(2, "0")}:${String(left % 60).padStart(2, "0")}`;
  return <span className={left <= 120 ? "timer low" : "timer"}>{clock}</span>;
}

function Controls({ session }: { session: TestSession }) {
  const { def, sec, items, ans } = session;
  const [confirming, setConfirming] = useState(false);
  const last = !def.sequential || sec === def.sections.length - 1;

  if (!confirming) {
    return (
      <button className="btn" type="button" onClick={() => (def.sequential ? setConfirming(true) : finishTest())}>
        {last ? "Selesai" : `Lanjut ke Section ${sec + 2}`}
      </button>
    );
  }
  const unanswered = items.filter((it, i) => it.sec === sec && ans[i] == null).length;
  return (
    <span className="confirm">
      <span>
        {unanswered ? `${unanswered} soal belum dijawab. ` : ""}
        Tidak bisa kembali. Yakin?
      </span>
      <button className="btn" type="button" onClick={() => (last ? finishTest() : nextSection())}>
        Ya
      </button>
      <button className="btn ghost" type="button" onClick={() => setConfirming(false)}>
        Batal
      </button>
    </span>
  );
}

export function TestBar() {
  const session = testStore.use((s) => s);
  if (!session) return null;
  const { def, sec, items, ans } = session;
  const scope = items.filter((it) => !def.sequential || it.sec === sec);
  const answered = scope.filter((it) => ans[it.index] != null).length;

  return (
    <div className="sticky-test bar">
      <span className="sec-label">
        {def.sequential ? `${def.sections[sec].title.split(" · ")[0]} dari ${def.sections.length}` : "Tes singkat"}
      </span>
      <Timer />
      <span className="score-pill ans">
        {answered} / {scope.length} dijawab
      </span>
      <span className="ctl">
        <Controls key={sec} session={session} />
      </span>
    </div>
  );
}
