"use client";

import { useEffect, useRef, type InputHTMLAttributes, type RefObject } from "react";

type Props = Omit<InputHTMLAttributes<HTMLInputElement>, "value" | "defaultValue" | "onChange"> & {
  value: string;
  /** Mengembalikan nilai yang sudah dinormalkan untuk ditampilkan. */
  onCommit: (raw: string) => string | void;
  inputRef?: RefObject<HTMLInputElement | null>;
};

/* Input yang menyimpan nilai saat event `change` native (blur/Enter), bukan tiap ketikan. */
export function CommitInput({ value, onCommit, inputRef, ...rest }: Props) {
  const own = useRef<HTMLInputElement>(null);
  const ref = inputRef ?? own;

  useEffect(() => {
    if (ref.current) ref.current.value = value;
  }, [ref, value]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const handle = () => {
      const next = onCommit(el.value);
      if (next !== undefined) el.value = next;
    };
    el.addEventListener("change", handle);
    return () => el.removeEventListener("change", handle);
  }, [ref, onCommit]);

  return <input ref={ref} defaultValue={value} {...rest} />;
}
