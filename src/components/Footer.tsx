export function Footer() {
  return (
    <footer className="src" id="sumber">
      <div className="wrap">
        <div className="eyebrow">Asal materi</div>
        <h2>Sumber &amp; catatan</h2>
        <div className="grid">
          <div className="item">
            <h3>Soal latihan &amp; simulasi</h3>
            <p>
              Semua soal, dialog, teks bacaan, dan pembahasan di halaman ini <b>ditulis khusus untuk halaman ini</b>{" "}
              dengan bantuan Claude (AI buatan Anthropic). Soal tidak diambil dari tes resmi atau buku mana pun, tetapi
              dibuat mengikuti format dan tipe soal TOEFL ITP.
            </p>
          </div>
          <div className="item">
            <h3>Format tes</h3>
            <p>
              Jumlah soal, waktu, dan rentang skor tiap bagian mengikuti informasi resmi ETS untuk TOEFL ITP Level 1.
            </p>
            <ul>
              <li>
                <a href="https://www.ets.org/toefl/itp/test-content.html" target="_blank" rel="noopener">
                  ETS – TOEFL ITP Test Content
                </a>
              </li>
            </ul>
          </div>
          <div className="item">
            <h3>Konversi skor</h3>
            <p>
              Tabel konversi jumlah benar ke skor skala adalah <b>perkiraan</b>, mengikuti tabel yang umum dipakai di
              buku latihan seperti <i>Longman Complete Course for the TOEFL Test</i> (Deborah Phillips). ETS tidak
              menerbitkan satu tabel tetap karena konversinya berbeda tiap paket tes.
            </p>
          </div>
          <div className="item">
            <h3>Fakta di teks bacaan</h3>
            <ul>
              <li>
                Luas mangrove Indonesia terbesar di dunia:{" "}
                <a href="https://doi.org/10.1111/j.1466-8238.2010.00584.x" target="_blank" rel="noopener">
                  Giri dkk. (2011), Global Ecology and Biogeography
                </a>
              </li>
              <li>
                Mangrove dan tsunami 2004:{" "}
                <a href="https://doi.org/10.1126/science.1118387" target="_blank" rel="noopener">
                  Danielsen dkk. (2005), Science
                </a>
              </li>
              <li>
                Tidur dan memori:{" "}
                <a href="https://doi.org/10.1038/nrn2762" target="_blank" rel="noopener">
                  Diekelmann &amp; Born (2010), Nature Reviews Neuroscience
                </a>
              </li>
              <li>
                Pemutihan karang:{" "}
                <a href="https://oceanservice.noaa.gov/facts/coral_bleach.html" target="_blank" rel="noopener">
                  NOAA Ocean Service
                </a>
              </li>
              <li>
                Tarian lebah madu, Karl von Frisch:{" "}
                <a href="https://www.nobelprize.org/prizes/medicine/1973/summary/" target="_blank" rel="noopener">
                  Nobel Prize 1973
                </a>
              </li>
              <li>
                Letusan Krakatau:{" "}
                <a href="https://volcano.si.edu/volcano.cfm?vn=262000" target="_blank" rel="noopener">
                  Smithsonian Global Volcanism Program
                </a>
              </li>
              <li>
                Teks dan audio lain di Paket 1–10 (misalnya rempah Maluku, mesin cetak, batik, monsun, Borobudur,
                gamelan, kertas, vaksin, kopi, Rafflesia) memakai fakta sejarah dan sains umum.
              </li>
            </ul>
          </div>
        </div>
        <div className="item">
          <h3>Untuk latihan lanjutan</h3>
          <ul>
            <li>
              Bahan persiapan resmi dari ETS:{" "}
              <a href="https://www.ets.org/toefl/itp/prepare.html" target="_blank" rel="noopener">
                ETS – Prepare for TOEFL ITP
              </a>
            </li>
            <li>
              Buku <i>Official Guide to the TOEFL ITP Test</i> (ETS) untuk tes latihan 140 soal yang lengkap
            </li>
          </ul>
        </div>
        <p className="disclaimer">
          TOEFL dan TOEFL ITP adalah merek dagang milik ETS. Halaman ini adalah bahan belajar mandiri dan tidak
          berafiliasi dengan atau didukung oleh ETS. Skor di halaman ini hanya perkiraan dan bukan skor resmi. Kalau
          menemukan soal atau pembahasan yang keliru, sampaikan ke pembuat halaman ini.
        </p>
      </div>
    </footer>
  );
}
