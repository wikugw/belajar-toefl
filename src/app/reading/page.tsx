import type { Metadata } from "next";
import { Passage } from "@/components/Passage";
import { Practice } from "@/components/Practice";
import { readingPassage } from "@/data/practice";

export const metadata: Metadata = { title: "Reading · Siap TOEFL ITP" };

export default function ReadingPage() {
  return (
    <section className="view">
      <div className="stack">
        <div className="eyebrow">Bagian 3 · 50 soal · 55 menit</div>
        <h2>Reading Comprehension</h2>
        <p>
          Lima teks akademik (sains, sejarah, biologi, dll). Kamu tidak perlu tahu topiknya; semua jawaban ada di teks.
          Waktu sekitar 11 menit per teks.
        </p>
      </div>
      <div className="tbl panel">
        <table>
          <thead>
            <tr>
              <th>Tipe soal</th>
              <th>Contoh pertanyaan</th>
              <th>Strategi</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <b>Main idea</b>
              </td>
              <td>What is the passage mainly about?</td>
              <td>Baca kalimat pertama tiap paragraf. Pilih jawaban yang mencakup seluruh teks, bukan satu detail.</td>
            </tr>
            <tr>
              <td>
                <b>Detail</b>
              </td>
              <td>According to the passage, …</td>
              <td>Cari kata kunci dari soal di teks, lalu baca 1–2 kalimat di sekitarnya.</td>
            </tr>
            <tr>
              <td>
                <b>Vocabulary</b>
              </td>
              <td>The word "X" is closest in meaning to …</td>
              <td>Ganti kata itu dengan tiap pilihan di kalimatnya. Pilih yang artinya tetap masuk akal.</td>
            </tr>
            <tr>
              <td>
                <b>Reference</b>
              </td>
              <td>The word "it" refers to …</td>
              <td>
                Lihat kata benda <b>sebelum</b> kata ganti itu, cocokkan tunggal/jamaknya.
              </td>
            </tr>
            <tr>
              <td>
                <b>Inference</b>
              </td>
              <td>It can be inferred that …</td>
              <td>
                Jawabannya tidak tertulis langsung, tapi pasti didukung teks. Hindari pilihan yang terlalu ekstrem.
              </td>
            </tr>
            <tr>
              <td>
                <b>NOT / EXCEPT</b>
              </td>
              <td>All of the following are mentioned EXCEPT …</td>
              <td>Coret tiga pilihan yang ada di teks. Sisanya jawaban.</td>
            </tr>
            <tr>
              <td>
                <b>Tujuan penulis</b>
              </td>
              <td>Why does the author mention …?</td>
              <td>Lihat kalimat sebelum hal itu disebut: biasanya contoh untuk mendukung sebuah poin.</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="panel stack">
        <h3>Urutan kerja yang disarankan</h3>
        <ul className="tight">
          <li>Baca cepat teks (±2 menit) untuk tahu topik tiap paragraf. Jangan berhenti di kata sulit.</li>
          <li>Kerjakan soal vocabulary dan reference dulu: paling cepat dan nilainya sama.</li>
          <li>Soal main idea dikerjakan terakhir, setelah kamu paham isi teks dari soal lain.</li>
        </ul>
      </div>

      <Practice section="reading" title="Latihan Reading">
        <div>
          <Passage passage={readingPassage} />
        </div>
      </Practice>
    </section>
  );
}
