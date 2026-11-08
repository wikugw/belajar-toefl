"use client";

import { scalePos, SCORE_MAX, SCORE_MIN } from "@/lib/score";
import { DEFAULT_TARGET, KEYS, useStored, useTarget, writeStored, type Best } from "@/lib/storage";
import { CommitInput } from "./CommitInput";

function commitTarget(raw: string) {
  const v = Math.max(SCORE_MIN, Math.min(SCORE_MAX, Math.round(+raw || DEFAULT_TARGET)));
  writeStored(KEYS.target, v);
  return String(v);
}

export function TargetControl() {
  const target = useTarget();
  const full = useStored<Best>(KEYS.bestFull);
  const short = useStored<Best>(KEYS.bestShort);
  const best = full || short;
  const pos = scalePos(target);

  return (
    <div className="target">
      <div className="scale" aria-label="Skala skor TOEFL ITP 310 sampai 677">
        <div className="scale-bar">
          <div className="scale-fill" style={{ width: `${pos}%` }} />
          <div className="scale-mark" style={{ left: `${pos}%` }} />
          {best?.total ? <div className="scale-you" style={{ left: `${scalePos(best.total)}%` }} /> : null}
        </div>
        <div className="scale-labels">
          <span>310</span>
          <span style={{ fontWeight: 700 }}>target {target}</span>
          <span>677</span>
        </div>
      </div>
      <label className="tgt" htmlFor="tgtIn">
        Target skorku
        <CommitInput
          id="tgtIn"
          type="number"
          min={SCORE_MIN}
          max={SCORE_MAX}
          step={1}
          inputMode="numeric"
          value={String(target)}
          onCommit={commitTarget}
        />
      </label>
      <div id="bestLabel" className="muted">
        {best?.total ? (
          <>
            Skor terbaik {full ? "tes lengkap" : "tes singkat"}: <b>{best.total}</b>
          </>
        ) : (
          "Belum ada skor simulasi"
        )}
      </div>
    </div>
  );
}
