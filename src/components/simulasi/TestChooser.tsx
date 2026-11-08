"use client";

import { useState } from "react";
import { answeredCount, useDraft } from "@/lib/draft";
import { useStored, type Best } from "@/lib/storage";
import { startTest } from "@/lib/testSession";
import { buildRandomShort, FULLS, SHORTS, UNTIMED } from "@/lib/tests";
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

function UntimedButton({ def, onDraft }: { def: TestDef; onDraft: () => void }) {
  const status = useDraft(def);
  return (
    <button
      type="button"
      className="pkg c-struct"
      onClick={() => (status.state === "none" ? startTest(def) : onDraft())}
    >
      <b>Paket {def.pkg}</b>
      <span>
        {status.state === "ok"
          ? `Draft ${answeredCount(status.draft)}/${status.draft.ans.length}`
          : status.state === "stale"
            ? "Draft usang"
            : "Belum"}
      </span>
    </button>
  );
}

function DraftPrompt({ def, onClose }: { def: TestDef; onClose: () => void }) {
  const status = useDraft(def);
  const [confirming, setConfirming] = useState(false);
  const restart = () => {
    onClose();
    startTest(def);
  };

  if (status.state === "none") return null;
  if (status.state === "stale") {
    return (
      <div className="draft-prompt" role="status">
        <p>
          <b>Paket {def.pkg}:</b> soal paket ini sudah diperbarui, jadi draft lamanya tidak bisa dilanjutkan.
        </p>
        <div className="audio">
          <button className="btn" type="button" onClick={restart}>
            Mulai dari awal
          </button>
          <button className="btn ghost" type="button" onClick={onClose}>
            Batal
          </button>
        </div>
      </div>
    );
  }
  const { draft } = status;
  const savedAt = new Date(draft.savedAt).toLocaleString("id-ID", { dateStyle: "medium", timeStyle: "short" });
  return (
    <div className="draft-prompt" role="status">
      <p>
        <b>Paket {def.pkg}:</b> {answeredCount(draft)} dari {draft.ans.length} soal sudah dijawab. Terakhir disimpan{" "}
        {savedAt}.
      </p>
      {confirming ? (
        <div className="audio">
          <span>Draft ini akan dihapus. Yakin?</span>
          <button className="btn" type="button" onClick={restart}>
            Ya, mulai ulang
          </button>
          <button className="btn ghost" type="button" onClick={() => setConfirming(false)}>
            Batal
          </button>
        </div>
      ) : (
        <div className="audio">
          <button
            className="btn"
            type="button"
            onClick={() => {
              onClose();
              startTest(def, draft);
            }}
          >
            Lanjutkan
          </button>
          <button className="btn ghost" type="button" onClick={() => setConfirming(true)}>
            Mulai ulang
          </button>
          <button className="btn ghost" type="button" onClick={onClose}>
            Tutup
          </button>
        </div>
      )}
    </div>
  );
}

function UntimedCard() {
  const [selected, setSelected] = useState<TestDef | null>(null);
  return (
    <div className="mode wide c-struct">
      <span className="eyebrow" style={{ color: "var(--k)" }}>
        Santai, bisa dicicil
      </span>
      <h3>Tes Lengkap Tanpa Waktu</h3>
      <div className="facts">
        <span>
          <b>140</b> soal
        </span>
        <span>
          <b>Tanpa</b> batas waktu
        </span>
      </div>
      <ul className="tight">
        <li>Soal sama dengan Tes Lengkap: Listening 50, Structure 40, Reading 50.</li>
        <li>
          Jawaban <b>tersimpan otomatis</b> sebagai draft, jadi bisa dilanjutkan kapan saja.
        </li>
        <li>Audio boleh diputar ulang dan bebas pindah antar section.</li>
        <li>Skornya masuk riwayat, tetapi tidak dihitung sebagai skor terbaik.</li>
      </ul>
      <div className="pkgs">
        {UNTIMED.map((F) => (
          <UntimedButton key={F.pkg} def={F} onDraft={() => setSelected(F)} />
        ))}
      </div>
      {selected && <DraftPrompt key={selected.pkg} def={selected} onClose={() => setSelected(null)} />}
      <p className="note">Draft hanya tersimpan di browser dan perangkat ini, dan hilang kalau data browser dihapus.</p>
    </div>
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
      <UntimedCard />
    </div>
  );
}
