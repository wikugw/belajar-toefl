import { NeedTable } from "@/components/NeedTable";
import { ScoreCalculator } from "@/components/ScoreCalculator";
import { TargetValue } from "@/components/TargetValue";

export default function MulaiPage() {
  return (
    <section className="view">
      <div className="stack">
        <div className="eyebrow">Kenalan dulu</div>
        <h2>TOEFL ITP itu seperti apa?</h2>
        <p>
          Banyak kampus, program beasiswa, kantor, dan instansi meminta <b>TOEFL ITP</b> (pilihan ganda, tersedia versi
          kertas dan digital). Skornya 310–677. Ada tiga bagian, semuanya pilihan ganda A–D, dan{" "}
          <b>tidak ada pengurangan nilai untuk jawaban salah</b>. Jadi jangan pernah mengosongkan jawaban.
        </p>
        <p className="note">
          Soal di halaman ini dibuat khusus untuk latihan, bukan soal resmi. Lihat{" "}
          <a href="#sumber" style={{ color: "var(--accent)" }}>
            Sumber &amp; catatan
          </a>{" "}
          di bagian bawah. Syarat skor dan jenis tes berbeda di tiap kampus, beasiswa, atau tempat kerja. Cek
          persyaratannya: apakah menerima ITP, iBT, atau tes setara lain, dan berapa lama masa berlaku sertifikatnya.
        </p>
      </div>

      <div className="tbl panel">
        <table>
          <thead>
            <tr>
              <th>Bagian</th>
              <th className="num">Soal</th>
              <th className="num">Waktu</th>
              <th>Isi</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <b>1. Listening</b>
              </td>
              <td className="num">50</td>
              <td className="num">±35 mnt</td>
              <td>Percakapan pendek, percakapan panjang, monolog/kuliah</td>
            </tr>
            <tr>
              <td>
                <b>2. Structure &amp; Written Expression</b>
              </td>
              <td className="num">40</td>
              <td className="num">25 mnt</td>
              <td>15 soal melengkapi kalimat + 25 soal mencari bagian yang salah</td>
            </tr>
            <tr>
              <td>
                <b>3. Reading</b>
              </td>
              <td className="num">50</td>
              <td className="num">55 mnt</td>
              <td>5 teks bacaan, masing-masing ±10 soal</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="stack">
        <div className="eyebrow">Target kamu</div>
        <h2>
          Target <TargetValue /> artinya berapa soal benar?
        </h2>
        <p>
          Jumlah benar di tiap bagian dikonversi ke skor skala (31–68), lalu ketiganya dijumlah dan dikali 10/3. Ubah
          angka target di bagian atas halaman, tabel ini ikut menyesuaikan. Untuk target{" "}
          <b>
            <TargetValue />
          </b>
          , kira-kira kamu butuh:
        </p>
      </div>
      <div className="tbl panel">
        <table>
          <thead>
            <tr>
              <th>Bagian</th>
              <th className="num">Benar minimal</th>
              <th className="num">Skor skala</th>
            </tr>
          </thead>
          <NeedTable />
        </table>
      </div>
      <p className="note">
        Tabel konversi resmi berbeda sedikit tiap paket tes. Angka di halaman ini memakai tabel konversi yang umum
        dipakai buku latihan, jadi anggap sebagai perkiraan.
      </p>

      <div className="panel stack">
        <h3>Kalkulator skor</h3>
        <p className="muted" style={{ fontSize: ".93rem" }}>
          Kalau kamu mengerjakan tes latihan dari buku atau aplikasi lain, masukkan jumlah benarnya di sini.
        </p>
        <ScoreCalculator />
      </div>

      <div className="stack">
        <div className="eyebrow">Rencana belajar</div>
        <h2>4 minggu, ±1 jam per hari</h2>
        <div className="plan">
          <div className="wk c-struct">
            <span>Minggu 1</span>
            <b>Structure dasar</b>Pelajari 10 pola grammar di tab Structure. Structure paling cepat naik nilainya karena
            polanya berulang.
          </div>
          <div className="wk c-listen">
            <span>Minggu 2</span>
            <b>Listening</b>Hafalkan ungkapan umum (saran, setuju, idiom). Dengarkan podcast bahasa Inggris pelan 15
            menit/hari.
          </div>
          <div className="wk c-read">
            <span>Minggu 3</span>
            <b>Reading</b>Latih 7 tipe soal Reading. Baca 1 artikel bahasa Inggris tiap hari dan catat 5 kosakata baru.
          </div>
          <div className="wk c-sim">
            <span>Minggu 4</span>
            <b>Simulasi</b>Kerjakan tes penuh dengan waktu. Ulangi simulasi di halaman ini dan pelajari pembahasan yang
            salah.
          </div>
        </div>
      </div>

      <div className="panel tint stack">
        <h3>Aturan emas di hari tes</h3>
        <ul className="tight">
          <li>
            <b>Isi semua jawaban.</b> Tidak ada minus. Kalau ragu, pilih satu huruf "andalan" (misalnya selalu B) untuk
            soal yang tidak sempat dikerjakan.
          </li>
          <li>
            <b>Waktu Structure paling ketat:</b> 40 soal dalam 25 menit, kurang dari 40 detik per soal. Jangan terpaku
            di satu soal.
          </li>
          <li>
            <b>Di Listening, soal hanya diputar sekali.</b> Baca pilihan jawaban selagi audio berjalan untuk menebak
            topiknya.
          </li>
          <li>
            <b>Bawa pensil 2B dan penghapus bagus.</b> Bulatan LJK harus penuh dan rapi.
          </li>
        </ul>
      </div>
    </section>
  );
}
