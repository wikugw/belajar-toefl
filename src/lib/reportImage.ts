import type { TestMeta } from "./history";
import type { TestResult } from "./testSession";
import type { TestDef } from "./types";

export function formatDate(d: Date) {
  return d.toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
}

export function testLabel(def: Pick<TestDef, "id" | "pkg">) {
  if (def.id === "full") return `Tes Lengkap · Paket ${def.pkg}`;
  if (def.id === "untimed") return `Tes Lengkap Tanpa Waktu · Paket ${def.pkg}`;
  return `Tes Singkat · ${def.pkg ? `Paket ${def.pkg}` : "Acak"}`;
}

/** Tiga tipe soal dengan persentase benar terendah, [nama, rasio]. */
export function weakestGroups(grp: TestResult["grp"]) {
  return Object.entries(grp)
    .map(([k, g]): [string, number] => [k, g.ok / g.n])
    .filter((r) => r[1] < 1)
    .sort((a, b) => a[1] - b[1])
    .slice(0, 3);
}

function roundRect(x: CanvasRenderingContext2D, a: number, b: number, w: number, h: number, r: number) {
  x.beginPath();
  x.moveTo(a + r, b);
  x.arcTo(a + w, b, a + w, b + h, r);
  x.arcTo(a + w, b + h, a, b + h, r);
  x.arcTo(a, b + h, a, b, r);
  x.arcTo(a, b, a + w, b, r);
  x.closePath();
}

function wrapText(x: CanvasRenderingContext2D, t: string, a: number, b: number, maxW: number, lh: number) {
  let line = "";
  t.split(" ").forEach((w) => {
    const test = line ? `${line} ${w}` : w;
    if (x.measureText(test).width > maxW) {
      x.fillText(line, a, b);
      b += lh;
      line = w;
    } else line = test;
  });
  if (line) x.fillText(line, a, b);
}

/** Menggambar rapor ke canvas dan mengembalikannya sebagai data URL PNG. */
export async function drawReportImage(
  def: TestMeta,
  result: Pick<TestResult, "c" | "res" | "grp" | "date">,
  target: number,
  name: string,
) {
  try {
    await document.fonts.ready;
  } catch {}
  const { c, res, grp, date } = result;
  const n = def.counts;
  const W = 1080;
  const H = 1350;
  const cv = document.createElement("canvas");
  cv.width = W;
  cv.height = H;
  const x = cv.getContext("2d") as CanvasRenderingContext2D;
  const css = getComputedStyle(document.documentElement);
  const col = (k: string) => css.getPropertyValue(k).trim();
  // Nama font dari next/font di-hash, jadi diambil dari variabel CSS.
  const D = col("--f-display");
  const B = col("--f-body");
  const M = col("--f-mono");

  x.fillStyle = "#FFFFFF";
  x.fillRect(0, 0, W, H);
  x.fillStyle = col("--hero");
  x.fillRect(0, 0, W, 330);
  (
    [
      [960, 80, 46, "--c-listen"],
      [1030, 240, 70, "--c-struct"],
      [880, 270, 24, "--c-read"],
      [850, 110, 16, "--c-sim"],
      [940, 180, 20, "--c-mulai"],
    ] as const
  ).forEach(([cx, cy, r, k]) => {
    x.fillStyle = col(k);
    x.beginPath();
    x.arc(cx, cy, r, 0, 7);
    x.fill();
  });
  x.fillStyle = "#1B2230";
  x.font = `700 26px ${M}`;
  x.fillText(`RAPOR LATIHAN · ${testLabel(def).toUpperCase()}`, 70, 90);
  x.font = `800 74px ${D}`;
  x.fillText("TOEFL ITP Practice Report", 70, 175);
  x.font = `700 44px ${B}`;
  x.fillText((name || "Peserta").slice(0, 34), 70, 250);
  x.font = `400 28px ${B}`;
  x.fillText(formatDate(date), 70, 295);

  // skor
  x.fillStyle = col("--c-sim");
  x.font = `800 200px ${D}`;
  x.fillText(String(res.total), 70, 560);
  const pass = res.total >= target;
  x.font = `700 30px ${M}`;
  const st = pass ? `TARGET ${target} TERCAPAI` : `KURANG ${target - res.total} POIN DARI ${target}`;
  const tw = x.measureText(st).width;
  x.fillStyle = pass ? col("--good-soft") : col("--bad-soft");
  roundRect(x, 480, 470, tw + 40, 56, 28);
  x.fill();
  x.fillStyle = pass ? col("--good") : col("--bad");
  x.fillText(st, 500, 508);

  // skala
  const sx = 70;
  const sw = W - 140;
  const sy = 610;
  const p = (v: number) => sx + sw * Math.max(0, Math.min(1, (v - 310) / 367));
  x.fillStyle = "#EEF1F7";
  roundRect(x, sx, sy, sw, 18, 9);
  x.fill();
  const gr = x.createLinearGradient(sx, 0, p(target), 0);
  gr.addColorStop(0, col("--c-listen"));
  gr.addColorStop(1, col("--c-mulai"));
  x.fillStyle = gr;
  roundRect(x, sx, sy, p(target) - sx, 18, 9);
  x.fill();
  x.fillStyle = "#1B2230";
  x.fillRect(p(target) - 2, sy - 10, 4, 38);
  x.fillStyle = col("--c-struct");
  x.beginPath();
  x.arc(p(res.total), sy + 9, 16, 0, 7);
  x.fill();
  x.strokeStyle = "#fff";
  x.lineWidth = 5;
  x.stroke();
  x.fillStyle = "#5B6577";
  x.font = `700 22px ${M}`;
  x.fillText("310", sx, sy + 60);
  x.textAlign = "center";
  x.fillText(`target ${target}`, p(target), sy + 60);
  x.textAlign = "right";
  x.fillText("677", sx + sw, sy + 60);
  x.textAlign = "left";

  // section
  (
    [
      ["Listening", c.L, n.L, res.sl, "--c-listen"],
      ["Structure", c.S, n.S, res.ss, "--c-struct"],
      ["Reading", c.R, n.R, res.sr, "--c-read"],
    ] as const
  ).forEach(([nm, ok, tot, sc, k], i) => {
    const y = 730 + i * 120;
    x.fillStyle = col(`${k}-soft`);
    roundRect(x, 70, y, W - 140, 100, 20);
    x.fill();
    x.fillStyle = col(k);
    x.font = `800 40px ${D}`;
    x.fillText(nm, 100, y + 50);
    x.fillStyle = "#1B2230";
    x.font = `400 26px ${B}`;
    x.fillText(`${ok} / ${tot} benar`, 100, y + 84);
    x.textAlign = "right";
    x.font = `800 64px ${D}`;
    x.fillStyle = col(k);
    x.fillText(String(sc), W - 100, y + 72);
    const scw = x.measureText(String(sc)).width;
    x.font = `700 20px ${M}`;
    x.fillStyle = "#5B6577";
    x.fillText("SKALA", W - 100 - scw - 16, y + 66);
    x.textAlign = "left";
  });

  // fokus
  const weak = weakestGroups(grp);
  x.fillStyle = "#1B2230";
  x.font = `800 34px ${D}`;
  x.fillText("Fokus berikutnya", 70, 1120);
  x.font = `400 27px ${B}`;
  x.fillText(
    weak.length ? weak.map((r) => `${r[0]} (${Math.round(r[1] * 100)}%)`).join("  ·  ") : "Semua tipe soal benar!",
    70,
    1165,
    W - 140,
  );
  x.fillStyle = "#5B6577";
  x.font = `400 21px ${B}`;
  wrapText(
    x,
    "Rapor latihan mandiri dari halaman Siap TOEFL ITP. Bukan sertifikat atau skor resmi TOEFL ITP, dan tidak diterbitkan oleh ETS.",
    70,
    1250,
    W - 140,
    30,
  );
  return cv.toDataURL("image/png");
}
