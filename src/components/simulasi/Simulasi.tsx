"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { VoicePanel } from "../VoicePanel";
import { useHistory } from "@/lib/history";
import { testStore } from "@/lib/testSession";
import { Report } from "./Report";
import { TestChooser } from "./TestChooser";
import { TestRunner } from "./TestRunner";

export function Simulasi() {
  const session = testStore.use((s) => s);
  const stage = !session ? "choose" : session.result ? "result" : `section-${session.sec}`;
  const previous = useRef(stage);
  const historyCount = useHistory().length;

  useEffect(() => {
    const from = previous.current;
    if (from === stage) return;
    previous.current = stage;
    if (from === "choose") return;
    const id = stage === "choose" ? "simChoose" : stage === "result" ? "simResult" : "simRun";
    document.getElementById(id)?.scrollIntoView({ block: "start" });
  }, [stage]);

  return (
    <>
      <p className="disclaimer" role="note">
        <b>Ini hanya simulasi untuk latihan.</b> Hasil tes di sini bukan skor resmi TOEFL ITP dan tidak berlaku untuk
        keperluan apa pun, termasuk pendaftaran kampus, beasiswa, atau pekerjaan.
      </p>
      <div hidden={!!session}>
        <Link className="btn ghost" href="/simulasi/riwayat">
          Riwayat tes{historyCount ? ` (${historyCount})` : ""}
        </Link>
      </div>
      <TestChooser hidden={!!session} />
      <VoicePanel hidden={!!session} />
      <p className="note" hidden={!!session}>
        Siapkan tempat tenang dan suara perangkat menyala untuk bagian Listening. Untuk tes lengkap, sisihkan waktu
        sekitar 2 jam tanpa gangguan.
      </p>
      <Report />
      <TestRunner />
    </>
  );
}
