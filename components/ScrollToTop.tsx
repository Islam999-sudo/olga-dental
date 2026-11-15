"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

export function ScrollToTop() {
  const pathname = usePathname();
  const previousPathnameRef = useRef(pathname);
  const historyLocationRef = useRef<string | null>(null);

  useEffect(() => {
    const onHistoryNavigation = () => {
      historyLocationRef.current = window.location.href;
    };
    window.addEventListener("popstate", onHistoryNavigation);
    return () => window.removeEventListener("popstate", onHistoryNavigation);
  }, []);

  useEffect(() => {
    const pathChanged = previousPathnameRef.current !== pathname;
    previousPathnameRef.current = pathname;
    // Hydration must preserve a visitor's scroll position on the initial page.
    if (!pathChanged) return;
    const restoreHistory = historyLocationRef.current === window.location.href;
    historyLocationRef.current = null;
    // Next.js handles anchor targets and restores the previous history position.
    if (window.location.hash || restoreHistory) return;
    window.scrollTo({
      top: 0,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
    });
  }, [pathname]);

  return null;
}
