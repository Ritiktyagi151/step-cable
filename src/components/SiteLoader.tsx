"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

function isModifiedClick(event: MouseEvent) {
  return event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0;
}

function isInternalNavigation(anchor: HTMLAnchorElement) {
  if (!anchor.href || anchor.target || anchor.hasAttribute("download")) return false;

  const nextUrl = new URL(anchor.href);
  const currentUrl = new URL(window.location.href);

  if (nextUrl.origin !== currentUrl.origin) return false;
  return nextUrl.pathname !== currentUrl.pathname || nextUrl.search !== currentUrl.search;
}

function isHomeHref(anchor: HTMLAnchorElement) {
  const nextUrl = new URL(anchor.href);
  return nextUrl.pathname === "/";
}

export function SiteLoader() {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const [visible, setVisible] = useState(true);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    if (!isHomePage) {
      setVisible(false);
      return;
    }

    setVisible(true);
    const timer = window.setTimeout(() => setVisible(false), 650);
    return () => window.clearTimeout(timer);
  }, [isHomePage]);

  useEffect(() => {
    if (!isHomePage) {
      setVisible(false);
      return;
    }

    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = window.setTimeout(() => setVisible(false), 360);

    return () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, [isHomePage, pathname]);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (isModifiedClick(event) || event.defaultPrevented) return;

      const target = event.target instanceof Element ? event.target.closest("a") : null;
      if (!(target instanceof HTMLAnchorElement)) return;
      if (!isInternalNavigation(target)) return;
      if (!isHomeHref(target)) return;

      setVisible(true);
    };

    const handleBeforeUnload = () => {
      if (window.location.pathname === "/") {
        setVisible(true);
      }
    };

    document.addEventListener("click", handleClick, true);
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      document.removeEventListener("click", handleClick, true);
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  if (!isHomePage) return null;

  return (
    <div
      aria-hidden={!visible}
      className={`pointer-events-none fixed inset-0 z-[999] grid place-items-center bg-white/96 text-brand-dark backdrop-blur-sm transition duration-300 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      <span className="absolute left-0 top-0 h-1 w-full overflow-hidden bg-brand-teal/15">
        <span className="block h-full w-full animate-pulse bg-brand-teal" />
      </span>

      <div className="grid place-items-center gap-5 px-6 text-center">
        <div className="relative grid h-24 w-24 place-items-center rounded-full border border-brand-teal/20 bg-white shadow-2xl shadow-slate-900/10">
          <span className="absolute inset-0 rounded-full border-4 border-brand-teal/10 border-t-brand-teal animate-spin" />
          <img src="/new-logo.png" alt="" className="h-14 w-16 object-contain" />
        </div>
        <div>
          <p className="text-xs font-black uppercase tracking-[0.28em] text-brand-teal">Step Cables</p>
          <p className="mt-2 text-sm font-bold text-slate-700">Loading...</p>
        </div>
      </div>

    </div>
  );
}
