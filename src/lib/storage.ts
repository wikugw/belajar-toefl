import { useSyncExternalStore } from "react";

export const KEYS = {
  target: "toefl475.target",
  voice: "toefl475.voice",
  bestFull: "toefl475.bestFull",
  bestShort: "toefl475.best",
  history: "toefl475.hist",
  name: "toefl475.name",
};

export type Best = { total: number };
export type HistoryEntry = {
  t: string;
  mode: "full" | "short" | "untimed";
  pkg: number | null;
  total: number;
  /** Kosong untuk tes lama atau kalau detailnya gagal disimpan. */
  id?: string;
  wrong?: number;
  n?: number;
};

const cache = new Map<string, { raw: string | null; value: unknown }>();
const listeners = new Set<() => void>();

export function readStored<T>(key: string): T | null {
  let raw: string | null = null;
  try {
    raw = localStorage.getItem(key);
  } catch {}
  const hit = cache.get(key);
  if (hit && hit.raw === raw) return hit.value as T | null;
  let value: unknown = null;
  try {
    value = JSON.parse(raw as string);
  } catch {}
  cache.set(key, { raw, value });
  return value as T | null;
}

/** Mengembalikan false kalau browser menolak menyimpan (penuh atau diblokir). */
export function writeStored(key: string, value: unknown) {
  let saved = true;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    saved = false;
  }
  listeners.forEach((fn) => fn());
  return saved;
}

export function removeStored(key: string) {
  try {
    localStorage.removeItem(key);
  } catch {}
  listeners.forEach((fn) => fn());
}

function subscribe(fn: () => void) {
  listeners.add(fn);
  return () => {
    listeners.delete(fn);
  };
}

/** Membaca localStorage dengan aman untuk SSR: render pertama selalu null. */
export function useStored<T>(key: string): T | null {
  return useSyncExternalStore(
    subscribe,
    () => readStored<T>(key),
    () => null,
  );
}

export const DEFAULT_TARGET = 500;
export const readTarget = () => +(readStored<number>(KEYS.target) || DEFAULT_TARGET);
export const useTarget = () => +(useStored<number>(KEYS.target) || DEFAULT_TARGET);
