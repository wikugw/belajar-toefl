"use client";

import { useId } from "react";
import { speak, speechStore } from "@/lib/speech";
import type { ScriptLine } from "@/lib/types";
import { PlayIcon, StopIcon } from "./icons";

type Props = {
  script: ScriptLine[];
  label?: string;
  className?: string;
  /** Audio hanya boleh diputar sekali. */
  once?: boolean;
  played?: boolean;
  onPlayed?: () => void;
};

export function PlayButton({ script, label = "Putar", className = "btn ghost", once, played, onPlayed }: Props) {
  const id = useId();
  const speaking = speechStore.use((s) => s.speakingId === id);

  if (once && played) {
    return (
      <button type="button" className={className} disabled>
        Sudah diputar
      </button>
    );
  }
  const onClick = () => {
    if (!once) speak(script, id);
    else if (!speaking) speak(script, id, onPlayed);
  };
  return (
    <button type="button" className={className} onClick={onClick}>
      {!speaking ? (
        <>
          <PlayIcon />
          {label}
        </>
      ) : once ? (
        "Sedang diputar…"
      ) : (
        <>
          <StopIcon />
          Berhenti
        </>
      )}
    </button>
  );
}
