import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { History } from "@/components/simulasi/History";

export const metadata: Metadata = { title: "Riwayat · Siap TOEFL ITP" };

export default function RiwayatPage() {
  return (
    <section className="view">
      <div className="stack">
        <div className="eyebrow">Hasil sebelumnya</div>
        <div className="bar">
          <h2>Riwayat tes</h2>
          <Link className="btn ghost sm" href="/simulasi">
            Ke halaman Simulasi
          </Link>
        </div>
      </div>
      <Suspense fallback={<p className="note">Memuat riwayat…</p>}>
        <History />
      </Suspense>
    </section>
  );
}
