"use client";

import { useRef, useState } from "react";
import { CommitInput } from "../CommitInput";
import { drawReportImage, formatDate, weakestGroups } from "@/lib/reportImage";
import { scalePos } from "@/lib/score";
import { KEYS, readTarget, useStored, useTarget, writeStored } from "@/lib/storage";
import { closeTest, testStore, type TestResult } from "@/lib/testSession";
import type { Category, TestDef } from "@/lib/types";
import { Review } from "./Review";

const TIPS: Record<string, string> = {
  "Part A · Percakapan pendek": "Hafalkan ungkapan di tab Listening: saran, setuju, penyesalan, dan idiom.",
  "Part B · Percakapan panjang":
    "Latih menangkap siapa, di mana, dan mengapa. Urutan soal mengikuti urutan percakapan.",
  "Part C · Kuliah & pengumuman": "Perhatikan kalimat pertama (topik) dan kata penanda seperti however dan next week.",
  Listening: "Dengarkan podcast bahasa Inggris pelan 15 menit per hari dan pelajari ungkapan di tab Listening.",
  Structure: "Ulangi 10 pola di tab Structure. Selalu cari subjek dan kata kerja utama dulu.",
  "Written Expression": "Periksa urut: kata kerja, bentuk kata (-ly, -ed/-ing), lalu tunggal/jamak.",
  "Main idea": "Baca kalimat pertama tiap paragraf; pilih jawaban yang mencakup seluruh teks.",
  Detail: "Cari kata kunci soal di teks, lalu baca 1–2 kalimat di sekitarnya.",
  Vocabulary: "Catat 10 kosakata akademik baru setiap hari dan coba ganti kata di kalimatnya.",
  Reference: "Lihat kata benda sebelum kata ganti dan cocokkan tunggal/jamaknya.",
  Inference: "Jawaban harus didukung teks. Hindari pilihan yang terlalu ekstrem.",
  "NOT / EXCEPT": "Coret tiga pilihan yang ada di teks; sisanya jawabannya.",
  "Tujuan penulis": "Lihat kalimat sebelum hal itu disebut: biasanya contoh untuk sebuah poin.",
};

const CATEGORY_CLASS: Record<Category, string> = { L: "c-listen", S: "c-struct", R: "c-read" };

function SectionRow(props: { name: string; ok: number; total: number; scaled: number; cls: string }) {
  const { name, ok, total, scaled, cls } = props;
  return (
    <div className={`rep-sec ${cls}`}>
      <div className="rep-sec-top">
        <b>{name}</b>
        <span>
          {ok} / {total} benar · skala <b>{scaled}</b>
        </span>
      </div>
      <div className="mini">
        <i style={{ width: `${((scaled - 31) / (68 - 31)) * 100}%` }} />
      </div>
    </div>
  );
}

function ReportCard({ def, result, name }: { def: TestDef; result: TestResult; name: string }) {
  const target = useTarget();
  const { c, res, grp, date, hist } = result;
  const n = def.counts;
  const pass = res.total >= target;
  const rows = Object.entries(grp).map(([k, g]) => ({ k, ...g, p: g.ok / g.n }));
  const weak = weakestGroups(grp);
  const strong = rows
    .filter((r) => r.p >= 0.75)
    .sort((a, b) => b.p - a.p)
    .slice(0, 3);

  return (
    <div className="report">
      <div className="rep-head">
        <div>
          <div className="eyebrow">
            Rapor Latihan ·{" "}
            {def.id === "full"
              ? `Tes Lengkap · Paket ${def.pkg}`
              : `Tes Singkat · ${def.pkg ? `Paket ${def.pkg}` : "Acak"}`}
          </div>
          <h2>TOEFL ITP Practice Report</h2>
          <p className="rep-name">{name || <span className="muted">Tulis namamu di bawah rapor</span>}</p>
          <p className="note">{formatDate(date)}</p>
        </div>
        <div className="rep-total">
          <span className="big">{res.total}</span>
          <span className={`status ${pass ? "g" : "b"}`}>
            {pass ? `Target ${target} tercapai` : `Kurang ${target - res.total} poin dari ${target}`}
          </span>
        </div>
      </div>
      <div className="rep-scale">
        <div className="scale-bar">
          <div className="scale-fill" style={{ width: `${scalePos(target)}%` }} />
          <div className="scale-mark" style={{ left: `${scalePos(target)}%` }} />
          <div className="scale-you" style={{ left: `${scalePos(res.total)}%` }} />
        </div>
        <div className="scale-labels">
          <span>310</span>
          <span>target {target}</span>
          <span>677</span>
        </div>
      </div>
      <div className="rep-grid">
        <SectionRow name="Listening" ok={c.L} total={n.L} scaled={res.sl} cls="c-listen" />
        <SectionRow name="Structure" ok={c.S} total={n.S} scaled={res.ss} cls="c-struct" />
        <SectionRow name="Reading" ok={c.R} total={n.R} scaled={res.sr} cls="c-read" />
      </div>
      <div className="rep-cols">
        <div className="stack">
          <h3>Per tipe soal</h3>
          <div className="tbl">
            <table>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.k} className={CATEGORY_CLASS[r.cat]}>
                    <td>{r.k}</td>
                    <td className="num">
                      {r.ok}/{r.n}
                    </td>
                    <td style={{ width: "38%" }}>
                      <div className="mini">
                        <i style={{ width: `${r.p * 100}%` }} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="stack">
          <h3>Fokus berikutnya</h3>
          {weak.length ? (
            <ul className="tight">
              {weak.map(([k, p]) => (
                <li key={k}>
                  <b>{k}</b> ({Math.round(p * 100)}%). {TIPS[k] || ""}
                </li>
              ))}
            </ul>
          ) : (
            <p>Semua tipe soal benar. Luar biasa!</p>
          )}
          {strong.length > 0 && (
            <>
              <h3>Sudah kuat</h3>
              <p>{strong.map((r) => r.k).join(", ")}</p>
            </>
          )}
          {hist.length > 1 && (
            <>
              <h3>Riwayat</h3>
              <div className="tbl">
                <table>
                  <tbody>
                    {hist.map((h, i) => (
                      <tr key={i}>
                        <td>{formatDate(new Date(h.t))}</td>
                        <td>
                          {h.mode === "full" ? "Lengkap" : "Singkat"}
                          {h.pkg ? ` P${h.pkg}` : ""}
                        </td>
                        <td className="num">
                          <b>{h.total}</b>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      </div>
      <p className="rep-foot">
        Rapor latihan mandiri dari halaman Siap TOEFL ITP. Bukan sertifikat atau skor resmi TOEFL ITP, dan tidak
        diterbitkan oleh ETS. Skor dihitung dengan tabel konversi perkiraan.
      </p>
    </div>
  );
}

const commitName = (raw: string) => writeStored(KEYS.name, raw);

export function Report() {
  const session = testStore.use((s) => s);
  const storedName = useStored<string>(KEYS.name) ?? "";
  const nameInput = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState<string | null>(null);
  if (!session?.result) return null;
  const { def, result } = session;
  const name = storedName.trim();

  const makeImage = async () => {
    const typed = nameInput.current?.value ?? storedName;
    commitName(typed);
    setImage(await drawReportImage(def, result, readTarget(), typed.trim()));
  };

  return (
    <div id="simResult" className="stack">
      <ReportCard def={def} result={result} name={name} />
      <div className="panel stack">
        <label htmlFor="repNameIn" className="stack" style={{ gap: 4 }}>
          <b>Nama di rapor</b>
          <CommitInput
            id="repNameIn"
            inputRef={nameInput}
            type="text"
            maxLength={40}
            placeholder="Nama kamu"
            className="txt"
            value={name}
            onCommit={commitName}
          />
        </label>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <button className="btn" type="button" onClick={makeImage}>
            Buat gambar rapor
          </button>
          <button className="btn ghost" type="button" onClick={closeTest}>
            Pilih tes lagi
          </button>
        </div>
        {image && (
          <div className="stack">
            {/* eslint-disable-next-line @next/next/no-img-element -- data URL hasil canvas */}
            <img
              alt="Gambar rapor latihan TOEFL"
              src={image}
              style={{ border: "1px solid var(--line)", borderRadius: 12, width: "100%", maxWidth: 540 }}
            />
            <p className="note">
              Untuk menyimpan: di HP tekan lama gambarnya lalu pilih <b>Simpan gambar</b>; di laptop klik kanan lalu{" "}
              <b>Save image as</b>. Kalau tidak bisa, ambil screenshot.
            </p>
          </div>
        )}
      </div>
      <Review />
    </div>
  );
}
