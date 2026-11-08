"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import {
  clearHistory,
  deleteEntry,
  HISTORY_LIMIT,
  itemsOf,
  useHistory,
  useRecord,
  type HistoryRecord,
} from "@/lib/history";
import { formatDate, testLabel } from "@/lib/reportImage";
import { stopSpeech } from "@/lib/speech";
import type { HistoryEntry } from "@/lib/storage";
import { matchesFilter, type ReviewFilter } from "@/lib/testSession";
import { ResultView, type ReportData } from "./Report";
import { Retake } from "./Retake";
import { RunSections } from "./RunSections";
import { TestQuestion } from "./TestRunner";

const BASE = "/simulasi/riwayat";
const detailHref = (id: string) => `${BASE}?id=${id}`;
const retakeHref = (id: string) => `${BASE}?id=${id}&mode=ulang`;

function EntryRow({ entry }: { entry: HistoryEntry }) {
  const [confirming, setConfirming] = useState(false);
  const date = new Date(entry.t);
  return (
    <div className="hist-row">
      <div className="hist-main">
        <b>{testLabel({ id: entry.mode, pkg: entry.pkg })}</b>
        <span className="note">
          {formatDate(date)}, {date.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })}
          {entry.n != null ? ` · ${entry.wrong} salah dari ${entry.n} soal` : ""}
        </span>
        {!entry.id && <span className="note">Detail soal tidak tersedia untuk tes ini.</span>}
      </div>
      <span className="hist-score">{entry.total}</span>
      <div className="audio hist-actions">
        {confirming ? (
          <>
            <span className="note">Hapus tes ini?</span>
            <button className="btn sm" type="button" onClick={() => deleteEntry(entry)}>
              Ya, hapus
            </button>
            <button className="btn ghost sm" type="button" onClick={() => setConfirming(false)}>
              Batal
            </button>
          </>
        ) : (
          <>
            {entry.id && (
              <Link className="btn sm" href={detailHref(entry.id)}>
                Lihat hasil
              </Link>
            )}
            {entry.id && !!entry.wrong && (
              <Link className="btn ghost sm" href={retakeHref(entry.id)}>
                Ulangi yang salah
              </Link>
            )}
            <button className="btn ghost sm" type="button" onClick={() => setConfirming(true)}>
              Hapus
            </button>
          </>
        )}
      </div>
    </div>
  );
}

function HistoryList() {
  const entries = useHistory();
  const [confirming, setConfirming] = useState(false);
  return (
    <div className="stack">
      {entries.length === 0 ? (
        <div className="panel stack">
          <p>Belum ada tes yang selesai. Hasil tes akan muncul di sini setelah kamu menyelesaikannya.</p>
          <div>
            <Link className="btn" href="/simulasi">
              Pilih tes
            </Link>
          </div>
        </div>
      ) : (
        entries.map((e) => <EntryRow key={e.t} entry={e} />)
      )}
      {entries.length > 0 && (
        <div className="audio">
          {confirming ? (
            <>
              <span>Semua riwayat akan dihapus. Yakin?</span>
              <button
                className="btn sm"
                type="button"
                onClick={() => {
                  clearHistory();
                  setConfirming(false);
                }}
              >
                Ya, hapus semua
              </button>
              <button className="btn ghost sm" type="button" onClick={() => setConfirming(false)}>
                Batal
              </button>
            </>
          ) : (
            <button className="btn ghost sm" type="button" onClick={() => setConfirming(true)}>
              Hapus semua riwayat
            </button>
          )}
        </div>
      )}
    </div>
  );
}

function RecordDetail({ record }: { record: HistoryRecord }) {
  const [filter, setFilter] = useState<ReviewFilter>({ f: "all", topic: null });
  const items = useMemo(() => itemsOf(record.sections), [record]);
  const result = useMemo<ReportData>(
    () => ({ c: record.c, res: record.res, grp: record.grp, date: new Date(record.t), hist: [] }),
    [record],
  );
  const hasWrong = items.some((it) => record.ans[it.index] !== it.a);

  return (
    <>
      <ResultView
        meta={record.meta}
        result={result}
        sections={record.sections}
        items={items}
        ans={record.ans}
        filter={filter}
        onFilter={setFilter}
        actions={
          <>
            {hasWrong && (
              <Link className="btn" href={retakeHref(record.id)}>
                Kerjakan ulang yang salah
              </Link>
            )}
            <Link className="btn ghost" href={BASE}>
              Kembali ke riwayat
            </Link>
          </>
        }
      />
      <div id="simRun" className="stack-lg">
        <RunSections
          sections={record.sections}
          renderItem={(it) => (
            <TestQuestion
              key={it.index}
              item={it}
              chosen={record.ans[it.index]}
              revealed
              hidden={!matchesFilter(it, record.ans[it.index], filter)}
              playOnce={false}
              played={false}
            />
          )}
        />
      </div>
    </>
  );
}

function RecordPage({ id, retake }: { id: string; retake: boolean }) {
  const record = useRecord(id);
  if (!record) {
    return (
      <div className="panel stack">
        <p>Hasil tes ini tidak ditemukan. Mungkin sudah dihapus atau tergeser oleh tes yang lebih baru.</p>
        <div>
          <Link className="btn" href={BASE}>
            Kembali ke riwayat
          </Link>
        </div>
      </div>
    );
  }
  return retake ? <Retake record={record} backHref={detailHref(id)} /> : <RecordDetail key={id} record={record} />;
}

export function History() {
  const params = useSearchParams();
  const id = params.get("id");
  const retake = params.get("mode") === "ulang";

  useEffect(() => stopSpeech, [id, retake]);

  if (id) return <RecordPage id={id} retake={retake} />;
  return (
    <>
      <p className="note">
        Menyimpan {HISTORY_LIMIT} tes terakhir di browser ini. Tes yang lebih lama otomatis terhapus, jadi simpan
        sebagai PDF kalau ingin menyimpannya lebih lama.
      </p>
      <HistoryList />
    </>
  );
}
