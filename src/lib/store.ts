import { useSyncExternalStore } from "react";

/** Store kecil di level modul: state-nya bertahan saat pindah halaman. */
export function createStore<T>(initial: T) {
  let state = initial;
  const listeners = new Set<() => void>();
  const subscribe = (fn: () => void) => {
    listeners.add(fn);
    return () => {
      listeners.delete(fn);
    };
  };
  return {
    get: () => state,
    set(next: T) {
      state = next;
      listeners.forEach((fn) => fn());
    },
    subscribe,
    /** `select` harus mengembalikan nilai yang stabil (primitif atau referensi state). */
    use<S>(select: (s: T) => S): S {
      return useSyncExternalStore(
        subscribe,
        () => select(state),
        () => select(initial),
      );
    },
  };
}
