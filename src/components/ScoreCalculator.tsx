"use client";

import { useSyncExternalStore } from "react";
import { needFor, toefl } from "@/lib/score";
import { DEFAULT_TARGET, readTarget, useTarget } from "@/lib/storage";
import { createStore } from "@/lib/store";

type Values = { l: string; s: string; r: string };

const fromTarget = (t: number): Values => {
  const n = needFor(t);
  return { l: String(n.l), s: String(n.s), r: String(n.r) };
};

/* Awalnya diisi sesuai target saat halaman dibuka, lalu tidak ikut berubah supaya
   statusnya bisa menunjukkan selisih terhadap target baru. */
const edited = createStore<Values | null>(null);
const serverSeed = fromTarget(DEFAULT_TARGET);
let clientSeed: Values | null = null;
const current = () => edited.get() ?? (clientSeed ??= fromTarget(readTarget()));

const FIELDS = [
  { key: "l", id: "cL", label: "Listening (0–50)", max: 50 },
  { key: "s", id: "cS", label: "Structure (0–40)", max: 40 },
  { key: "r", id: "cR", label: "Reading (0–50)", max: 50 },
] as const;

export function ScoreCalculator() {
  const target = useTarget();
  const values = useSyncExternalStore(edited.subscribe, current, () => serverSeed);
  const { total } = toefl(values.l, values.s, values.r);
  const pass = total >= target;

  return (
    <>
      <div className="calc">
        {FIELDS.map((f) => (
          <label key={f.id} htmlFor={f.id}>
            {f.label}
            <input
              id={f.id}
              type="number"
              min={0}
              max={f.max}
              inputMode="numeric"
              value={values[f.key]}
              onChange={(e) => edited.set({ ...current(), [f.key]: e.target.value })}
            />
          </label>
        ))}
      </div>
      <div className="result">
        <span className="big">{total}</span>
        <span className={`status ${pass ? "g" : "b"}`}>
          {pass ? `Lolos target ${target}` : `Kurang ${target - total} poin dari ${target}`}
        </span>
      </div>
    </>
  );
}
