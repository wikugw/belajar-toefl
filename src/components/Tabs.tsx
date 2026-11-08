"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect, useRef } from "react";
import { initSpeech, stopSpeech } from "@/lib/speech";

const TABS = [
  { href: "/", label: "Mulai", cls: "c-mulai", sec: "mulai" },
  { href: "/listening", label: "Listening", cls: "c-listen", sec: "listening" },
  { href: "/structure", label: "Structure", cls: "c-struct", sec: "structure" },
  { href: "/reading", label: "Reading", cls: "c-read", sec: "reading" },
  { href: "/simulasi", label: "Simulasi", cls: "c-sim", sec: "simulasi" },
];

const isActive = (href: string, pathname: string) =>
  href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

export function Tabs() {
  const pathname = usePathname();
  const previous = useRef(pathname);

  useEffect(initSpeech, []);

  useLayoutEffect(() => {
    document.documentElement.dataset.sec = TABS.find((t) => isActive(t.href, pathname))?.sec ?? "mulai";
    if (previous.current === pathname) return;
    previous.current = pathname;
    stopSpeech();
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <nav className="tabs" aria-label="Bagian">
      <div className="wrap">
        {TABS.map((t) => (
          <Link
            key={t.href}
            href={t.href}
            className={t.cls}
            aria-current={isActive(t.href, pathname) ? "page" : undefined}
          >
            {t.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
