import type { Metadata } from "next";
import { Simulasi } from "@/components/simulasi/Simulasi";

export const metadata: Metadata = { title: "Simulasi · Siap TOEFL ITP" };

export default function SimulasiPage() {
  return (
    <section className="view">
      <div className="stack">
        <div className="eyebrow">Pilih jenis tes</div>
        <h2>Simulasi TOEFL</h2>
        <p>
          Setelah tes selesai, kamu mendapat rapor, kunci jawaban, penjelasan tiap soal, dan <b>materi belajar</b> untuk
          setiap topik yang diuji. Hasilnya dikonversi ke perkiraan skor TOEFL ITP.
        </p>
      </div>
      <Simulasi />
    </section>
  );
}
