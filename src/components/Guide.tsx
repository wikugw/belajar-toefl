import Link from "next/link";

const MODES = [
  {
    name: "Tes Lengkap",
    size: "140 soal, ±115 menit",
    audio: "Sekali putar",
    pause: "Tidak bisa",
    use: "Mengukur kesiapan dengan kondisi mirip tes asli",
  },
  {
    name: "Tes Singkat",
    size: "24 soal, 20 menit",
    audio: "Boleh diulang",
    pause: "Tidak bisa",
    use: "Latihan cepat kalau waktumu sedikit",
  },
  {
    name: "Tes Lengkap Tanpa Waktu",
    size: "140 soal, bebas",
    audio: "Boleh diulang",
    pause: "Bisa, tersimpan otomatis",
    use: "Mengerjakan tes penuh sedikit demi sedikit",
  },
];

export function Guide() {
  return (
    <div className="stack guide">
      <div className="eyebrow">Panduan</div>
      <h2>Cara memakai situs ini</h2>
      <div className="plan">
        <div className="wk c-mulai">
          <span>Langkah 1</span>
          <b>Tentukan target</b>
          <p>
            Isi <b>Target skorku</b> di bagian atas halaman. Di bawah, kamu bisa melihat jumlah soal benar yang
            dibutuhkan.
          </p>
        </div>
        <div className="wk c-listen">
          <span>Langkah 2</span>
          <b>Belajar dan latihan</b>
          <p>
            Buka <Link href="/listening">Listening</Link>, <Link href="/structure">Structure</Link>, dan{" "}
            <Link href="/reading">Reading</Link>. Setiap jawaban latihan langsung dibahas.
          </p>
        </div>
        <div className="wk c-sim">
          <span>Langkah 3</span>
          <b>Coba simulasi</b>
          <p>
            Buka <Link href="/simulasi">Simulasi</Link>, lalu pilih jenis tes dan paket soal. Tersedia 10 paket untuk
            tiap jenis tes.
          </p>
        </div>
        <div className="wk c-read">
          <span>Langkah 4</span>
          <b>Pelajari hasilnya</b>
          <p>Rapor menunjukkan topik yang lemah. Setiap soal dilengkapi kunci, pembahasan, dan materi belajar.</p>
        </div>
      </div>
      <div className="panel stack">
        <details>
          <summary>Pilih jenis tes yang mana?</summary>
          <div className="tbl">
            <table>
              <thead>
                <tr>
                  <th>Jenis tes</th>
                  <th>Ukuran</th>
                  <th>Audio</th>
                  <th>Dijeda dan dilanjutkan</th>
                  <th>Cocok untuk</th>
                </tr>
              </thead>
              <tbody>
                {MODES.map((m) => (
                  <tr key={m.name}>
                    <td>
                      <b>{m.name}</b>
                    </td>
                    <td>{m.size}</td>
                    <td>{m.audio}</td>
                    <td>{m.pause}</td>
                    <td>{m.use}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="note">
            Skor Tes Lengkap Tanpa Waktu masuk riwayat, tetapi tidak dihitung sebagai skor terbaik.
          </p>
        </details>
        <details>
          <summary>Hal yang perlu diketahui</summary>
          <ul className="tight">
            <li>
              <b>Muat ulang menghapus tes yang berjalan.</b> Jawaban Tes Lengkap, Tes Singkat, dan latihan hilang kalau
              halaman dimuat ulang atau ditutup. Kalau perlu jeda, pakai Tes Lengkap Tanpa Waktu.
            </li>
            <li>
              <b>Pindah tab di situs ini selama tes boleh.</b> Jawabanmu tetap ada, tetapi waktu terus berjalan dan
              audio berhenti. Di Tes Lengkap, audio yang terhenti dianggap sudah diputar.
            </li>
            <li>
              <b>Progres tersimpan di browser ini.</b> Target, skor terbaik, riwayat, dan draft tidak ikut pindah ke
              perangkat lain, dan hilang kalau data browser dihapus.
            </li>
            <li>
              <b>Suara bisa diatur.</b> Pilih suara dan kecepatan di <b>Pengaturan suara</b> pada tab Listening atau
              Simulasi.
            </li>
          </ul>
        </details>
      </div>
    </div>
  );
}
