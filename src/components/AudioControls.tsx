"use client";

import { useState } from "react";
import { speechStore } from "@/lib/speech";
import type { ScriptLine } from "@/lib/types";
import { PlayButton } from "./PlayButton";

const SPEAKER_NAME = { W: "Woman", M: "Man", N: "Narrator" };

type Props = {
  script: ScriptLine[];
  playLabel?: string;
  playClassName?: string;
  once?: boolean;
  played?: boolean;
  onPlayed?: () => void;
  /** Transkrip disembunyikan selama tes berjalan, kecuali perangkat tidak bisa memutar suara. */
  lockTranscript?: boolean;
};

export function AudioControls({ script, playLabel, playClassName, once, played, onPlayed, lockTranscript }: Props) {
  const supported = speechStore.use((s) => s.supported);
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="audio">
        {supported && (
          <PlayButton
            script={script}
            label={playLabel}
            className={playClassName}
            once={once}
            played={played}
            onPlayed={onPlayed}
          />
        )}
        <button
          type="button"
          className="btn ghost tr-toggle"
          hidden={lockTranscript && supported}
          onClick={() => setOpen(!open)}
        >
          {open ? "Sembunyikan transkrip" : "Lihat transkrip"}
        </button>
      </div>
      <div className="transcript" hidden={!open}>
        {script.map(([s, t], i) => (
          <div key={i}>
            <b>{SPEAKER_NAME[s]}</b>
            {t}
          </div>
        ))}
      </div>
    </>
  );
}
