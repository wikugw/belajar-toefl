import type { Metadata } from "next";
import { Practice } from "@/components/Practice";

export const metadata: Metadata = { title: "Structure · Siap TOEFL ITP" };

export default function StructurePage() {
  return (
    <section className="view">
      <div className="stack">
        <div className="eyebrow">Bagian 2 · 40 soal · 25 menit</div>
        <h2>Structure &amp; Written Expression</h2>
        <p>
          Bagian ini menguji grammar. Kabar baiknya, polanya terbatas dan berulang, jadi ini bagian yang{" "}
          <b>paling cepat dinaikkan</b> nilainya.
        </p>
      </div>
      <div className="rules">
        <div className="rule">
          <span className="tag">Soal 1–15</span>
          <h3>Structure</h3>
          <p>
            Kalimat rumpang. Pilih jawaban yang membuat kalimat <b>lengkap dan benar</b>.
          </p>
        </div>
        <div className="rule">
          <span className="tag">Soal 16–40</span>
          <h3>Written Expression</h3>
          <p>
            Ada 4 bagian bergaris bawah (A–D). Pilih <b>satu bagian yang salah</b>.
          </p>
        </div>
      </div>

      <div className="stack">
        <h3>10 pola grammar paling sering keluar</h3>
        <p className="muted">
          Langkah pertama untuk setiap soal Structure: cari <b>subjek</b> dan <b>kata kerja utama</b>. Banyak soal
          selesai di langkah ini.
        </p>
      </div>
      <div className="rules">
        <div className="rule">
          <span className="tag">Pola 1</span>
          <h3>Kalimat butuh subjek + kata kerja</h3>
          <p>Setiap kalimat wajib punya satu subjek dan satu kata kerja utama.</p>
          <div className="ex ok">
            <b>BENAR</b>Jupiter <u>is</u> the largest planet.
          </div>
          <div className="ex no">
            <b>SALAH</b>Jupiter the largest planet.
          </div>
        </div>
        <div className="rule">
          <span className="tag">Pola 2</span>
          <h3>Appositive &amp; reduced clause</h3>
          <p>Keterangan di antara koma tidak boleh punya kata kerja baru kalau kalimatnya sudah lengkap.</p>
          <div className="ex ok">
            <b>BENAR</b>Borobudur, <u>built</u> in the 9th century, is…
          </div>
          <div className="ex no">
            <b>SALAH</b>Borobudur, <u>was built</u> in the 9th century, is…
          </div>
        </div>
        <div className="rule">
          <span className="tag">Pola 3</span>
          <h3>Subject–verb agreement</h3>
          <p>Subjek tunggal → kata kerja tunggal. Abaikan frasa di antara subjek dan kata kerja.</p>
          <div className="ex ok">
            <b>BENAR</b>Each of the students <u>has</u> a book.
          </div>
          <div className="ex no">
            <b>SALAH</b>Each of the students <u>have</u> a book.
          </div>
        </div>
        <div className="rule">
          <span className="tag">Pola 4</span>
          <h3>Paralel</h3>
          <p>
            Hal yang disejajarkan dengan <i>and/or/but</i> harus punya bentuk sama.
          </p>
          <div className="ex ok">
            <b>BENAR</b>reading, swimming, and cooking
          </div>
          <div className="ex no">
            <b>SALAH</b>reading, to swim, and cooking
          </div>
        </div>
        <div className="rule">
          <span className="tag">Pola 5</span>
          <h3>Passive voice</h3>
          <p>
            Rumus: <b>be + verb 3</b>. Jebakan umum: be + verb 1.
          </p>
          <div className="ex ok">
            <b>BENAR</b>The bridge was <u>built</u> in 1990.
          </div>
          <div className="ex no">
            <b>SALAH</b>The bridge was <u>build</u> in 1990.
          </div>
        </div>
        <div className="rule">
          <span className="tag">Pola 6</span>
          <h3>Inversi</h3>
          <p>
            Setelah kata negatif di awal kalimat (<i>Never, Rarely, Seldom, Not until, Only after</i>), urutannya
            dibalik: <b>kata bantu + subjek</b>.
          </p>
          <div className="ex ok">
            <b>BENAR</b>Rarely <u>does it snow</u> here.
          </div>
          <div className="ex no">
            <b>SALAH</b>Rarely <u>it snows</u> here.
          </div>
        </div>
        <div className="rule">
          <span className="tag">Pola 7</span>
          <h3>Perbandingan</h3>
          <p>
            Pendek: <i>-er / the -est</i>. Panjang: <i>more / the most</i>. Jangan dobel. Pola khusus:{" "}
            <i>the more…, the more…</i>
          </p>
          <div className="ex ok">
            <b>BENAR</b>larger · the most beautiful
          </div>
          <div className="ex no">
            <b>SALAH</b>more larger · most beautifuller
          </div>
        </div>
        <div className="rule">
          <span className="tag">Pola 8</span>
          <h3>Bentuk kata (word form)</h3>
          <p>
            Kata kerja diterangkan <b>adverb</b> (-ly); kata benda diterangkan <b>adjective</b>. <i>-ed</i> untuk
            perasaan orang, <i>-ing</i> untuk sifat benda.
          </p>
          <div className="ex ok">
            <b>BENAR</b>answered <u>carefully</u> · I'm <u>excited</u>
          </div>
          <div className="ex no">
            <b>SALAH</b>answered <u>careful</u> · I'm <u>exciting</u>
          </div>
        </div>
        <div className="rule">
          <span className="tag">Pola 9</span>
          <h3>Gerund atau to-infinitive</h3>
          <p>
            <i>enjoy, avoid, finish, suggest</i> + <b>-ing</b>. <i>decide, want, plan, agree, hope</i> + <b>to + V1</b>.
          </p>
          <div className="ex ok">
            <b>BENAR</b>decided <u>to postpone</u> · enjoy <u>reading</u>
          </div>
        </div>
        <div className="rule">
          <span className="tag">Pola 10</span>
          <h3>Conditional &amp; kata hubung</h3>
          <p>
            If + had V3 → would have V3. <i>Although</i> + kalimat; <i>despite / because of</i> + kata benda.
          </p>
          <div className="ex ok">
            <b>BENAR</b>
            <u>Although</u> it rained · <u>Despite</u> the rain
          </div>
          <div className="ex no">
            <b>SALAH</b>
            <u>Despite</u> it rained
          </div>
        </div>
      </div>

      <div className="panel stack">
        <h3>Cara cepat di Written Expression</h3>
        <ul className="tight">
          <li>
            Periksa dulu <b>kata kerja</b> (tunggal/jamak, tense, passive), lalu <b>bentuk kata</b> (-ly, -ed/-ing),
            lalu <b>tunggal/jamak kata benda</b> (one of the + jamak).
          </li>
          <li>
            Kata benda tak terhitung seperti <i>information, advice, equipment</i> tidak pernah diberi -s.
          </li>
          <li>
            Jangan cari bagian yang "terdengar aneh"; cari yang <b>melanggar aturan</b>.
          </li>
        </ul>
      </div>

      <Practice section="structure" title="Latihan Structure" />
    </section>
  );
}
