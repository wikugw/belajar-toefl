"use client";

import { useId } from "react";
import { rateLabel, setVoiceSetting, speechStore } from "@/lib/speech";
import type { ScriptLine } from "@/lib/types";
import { PlayButton } from "./PlayButton";

const SAMPLE: ScriptLine[] = [
  ["W", "Hi! Are you ready for the TOEFL test?"],
  ["M", "I think so. I've been practicing every day."],
];

export function VoicePanel({ hidden }: { hidden?: boolean }) {
  const id = useId();
  const speech = speechStore.use((s) => s);

  if (!speech.supported) {
    return (
      <div className="panel voice-panel stack" hidden={hidden}>
        <p className="note">
          Perangkat ini tidak mendukung suara otomatis. Coba buka halaman ini di Chrome, Edge, atau Safari versi
          terbaru.
        </p>
      </div>
    );
  }
  const options = speech.voices.map((v) => (
    <option key={v.name} value={v.name}>
      {v.name.replace(/^Microsoft /, "").replace(/ - English.*$/, "")} ({v.lang.replace("_", "-")})
    </option>
  ));
  return (
    <div className="panel voice-panel stack" hidden={hidden}>
      <h3>Pengaturan suara</h3>
      <div className="calc">
        <label htmlFor={`${id}-w`}>
          Suara wanita
          <select id={`${id}-w`} value={speech.w} onChange={(e) => setVoiceSetting({ w: e.target.value })}>
            {options}
          </select>
        </label>
        <label htmlFor={`${id}-m`}>
          Suara pria
          <select id={`${id}-m`} value={speech.m} onChange={(e) => setVoiceSetting({ m: e.target.value })}>
            {options}
          </select>
        </label>
        <label htmlFor={`${id}-r`}>
          Kecepatan: <b className="rate-val">{rateLabel(speech.rate)}</b>
          <input
            id={`${id}-r`}
            type="range"
            min="0.75"
            max="1.1"
            step="0.05"
            value={speech.rate}
            onChange={(e) => setVoiceSetting({ rate: +e.target.value })}
          />
        </label>
      </div>
      <div className="audio">
        <PlayButton script={SAMPLE} label="Coba suara" />
      </div>
      <p className="note">
        Suara paling natural biasanya bernama <b>Natural</b>, <b>Neural</b>, <b>Premium</b>, <b>Enhanced</b>, atau{" "}
        <b>Google</b>. Di laptop, buka halaman ini di <b>Microsoft Edge</b> untuk suara &quot;Natural&quot; yang mirip
        manusia. Di iPhone, unduh suara Enhanced/Premium lewat Pengaturan › Aksesibilitas › Konten Lisan › Suara. Di
        Android, pakai mesin suara Google.
      </p>
    </div>
  );
}
