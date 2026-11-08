import type { Metadata } from "next";
import { Practice } from "@/components/Practice";
import { TtsNote } from "@/components/TtsNote";
import { VoicePanel } from "@/components/VoicePanel";

export const metadata: Metadata = { title: "Listening · Siap TOEFL ITP" };

export default function ListeningPage() {
  return (
    <section className="view">
      <div className="stack">
        <div className="eyebrow">Bagian 1 · 50 soal</div>
        <h2>Listening Comprehension</h2>
        <p>
          Kamu mendengar audio, lalu memilih jawaban yang tercetak di buku soal. Pertanyaannya hanya dibacakan, tidak
          tertulis. Ada tiga part:
        </p>
      </div>
      <div className="tbl panel">
        <table>
          <thead>
            <tr>
              <th>Part</th>
              <th className="num">Soal</th>
              <th>Bentuk</th>
              <th>Kunci</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <b>A</b>
              </td>
              <td className="num">30</td>
              <td>Dialog pendek pria–wanita, 1 soal</td>
              <td>
                Fokus ke <b>kalimat pembicara kedua</b>. Jawabannya hampir selalu di situ.
              </td>
            </tr>
            <tr>
              <td>
                <b>B</b>
              </td>
              <td className="num">8</td>
              <td>Dua dialog panjang, 4 soal masing-masing</td>
              <td>Urutan soal mengikuti urutan cerita.</td>
            </tr>
            <tr>
              <td>
                <b>C</b>
              </td>
              <td className="num">12</td>
              <td>Tiga monolog/kuliah singkat</td>
              <td>Kalimat pertama biasanya menyebut topik.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="stack">
        <h3>Ungkapan yang sering keluar di Part A</h3>
        <p className="muted">
          Part A berisi 30 dari 50 soal Listening, jadi menguasainya sangat membantu. Pelajari pola-pola ini:
        </p>
      </div>
      <div className="rules">
        <div className="rule">
          <span className="tag">Saran</span>
          <h3>Why don't you… / Have you thought about…</h3>
          <p>
            Artinya pembicara <b>menyarankan</b> sesuatu.
          </p>
          <div className="ex ok">
            <b>DENGAR</b>"Why don't you take a break?" → Dia menyarankan istirahat.
          </div>
        </div>
        <div className="rule">
          <span className="tag">Setuju</span>
          <h3>So do I / Me too / You can say that again</h3>
          <p>
            Semuanya berarti <b>setuju</b>. "You can say that again" bukan minta diulang.
          </p>
          <div className="ex ok">
            <b>DENGAR</b>"You can say that again!" → Sangat setuju.
          </div>
        </div>
        <div className="rule">
          <span className="tag">Setuju (negatif)</span>
          <h3>Neither do I / Me neither</h3>
          <p>
            Setuju dengan kalimat <b>negatif</b>. Kalau A bilang "I don't…", lalu B bilang "Neither do I", B juga tidak.
          </p>
        </div>
        <div className="rule">
          <span className="tag">Penyesalan</span>
          <h3>If only I had… / I wish I had…</h3>
          <p>
            Artinya hal itu <b>tidak</b> terjadi. "If only I had studied" = dia tidak belajar.
          </p>
        </div>
        <div className="rule">
          <span className="tag">Menolak halus</span>
          <h3>I'd love to, but…</h3>
          <p>
            Setelah "but" biasanya alasan menolak. Jawabannya: dia <b>tidak bisa</b>.
          </p>
        </div>
        <div className="rule">
          <span className="tag">Idiom</span>
          <h3>Swamped · a piece of cake · under the weather</h3>
          <p>Swamped = sangat sibuk. A piece of cake = sangat mudah. Under the weather = sedang kurang sehat.</p>
        </div>
      </div>

      <div className="panel stack">
        <h3>Jebakan yang perlu diwaspadai</h3>
        <ul className="tight">
          <li>
            <b>Bunyi mirip.</b> Pilihan jawaban sering memakai kata yang bunyinya mirip dengan audio (back/black,
            sore/store). Pilihan yang "terdengar paling sama" justru sering salah.
          </li>
          <li>
            <b>Kata yang diulang persis.</b> Jawaban benar biasanya memakai <b>sinonim</b>, bukan kata yang sama dengan
            audio.
          </li>
          <li>
            <b>Negatif ganda.</b> "It's not unusual" = biasa saja. Dua negatif menjadi positif.
          </li>
        </ul>
      </div>

      <Practice section="listening" title="Latihan Listening">
        <TtsNote />
        <VoicePanel />
      </Practice>
    </section>
  );
}
