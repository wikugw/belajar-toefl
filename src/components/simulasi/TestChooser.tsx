"use client";

import { useStored, type Best } from "@/lib/storage";
import { startTest } from "@/lib/testSession";
import { buildRandomShort, FULLS, SHORTS } from "@/lib/tests";
import type { TestDef } from "@/lib/types";

function PackageButton({ def, no, cls }: { def: TestDef; no: number; cls: string }) {
  const best = useStored<Best>(def.pkgKey as string);
  return (
    <button type="button" className={`pkg ${cls}`} onClick={() => startTest(def)}>
      <b>Paket {no}</b>
      <span>{best ? `Terbaik ${best.total}` : "Belum"}</span>
    </button>
  );
}

export function TestChooser({ hidden }: { hidden: boolean }) {
  return (
    <div id="simChoose" className="choose" hidden={hidden}>
      <div className="mode c-sim">
        <span className="eyebrow" style={{ color: "var(--k)" }}>
          Seperti tes asli
        </span>
        <h3>Tes Lengkap</h3>
        <div className="facts">
          <span>
            <b>140</b> soal
          </span>
          <span>
            <b>±115</b> menit
          </span>
        </div>
        <ul className="tight">
          <li>
            Listening 50 soal (Part A, B, C). Audio <b>hanya bisa diputar sekali</b>.
          </li>
          <li>
            Structure 40 soal, waktu <b>25 menit</b>.
          </li>
          <li>
            Reading 50 soal (5 teks), waktu <b>55 menit</b>.
          </li>
          <li>
            Bagian dikerjakan berurutan dan <b>tidak bisa kembali</b> ke bagian sebelumnya.
          </li>
        </ul>
        <div className="pkgs">
          {FULLS.map((F, i) => (
            <PackageButton key={i} def={F} no={i + 1} cls="c-sim" />
          ))}
        </div>
        <p className="note">10 paket dengan soal berbeda. Kerjakan paket lain di hari berikutnya.</p>
      </div>
      <div className="mode c-mulai">
        <span className="eyebrow" style={{ color: "var(--k)" }}>
          Latihan cepat
        </span>
        <h3>Tes Singkat</h3>
        <div className="facts">
          <span>
            <b>24</b> soal
          </span>
          <span>
            <b>20</b> menit
          </span>
        </div>
        <ul className="tight">
          <li>6 Listening, 12 Structure, 6 Reading.</li>
          <li>Audio boleh diputar ulang.</li>
          <li>Semua soal di satu halaman, bebas pindah-pindah.</li>
          <li>Skornya perkiraan kasar karena soalnya sedikit.</li>
        </ul>
        <div className="pkgs">
          {SHORTS.map((F, i) => (
            <PackageButton key={i} def={F} no={i + 1} cls="c-mulai" />
          ))}
        </div>
        <div>
          <button className="btn ghost" type="button" onClick={() => startTest(buildRandomShort())}>
            Acak soal dari semua paket
          </button>
        </div>
        <p className="note">
          10 paket tetap. Paket 2–10 memakai soal dari bank tes lengkap, jadi sebagian soal bisa muncul lagi di tes
          lengkap.
        </p>
      </div>
    </div>
  );
}
