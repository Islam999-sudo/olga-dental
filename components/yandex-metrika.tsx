"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

// Public Yandex Metrika counter ID. No private keys are stored in the source.
const COUNTER_ID = 105008013;
const PRODUCTION_HOSTS = new Set([
  "olga-clinic-murino.ru",
  "www.olga-clinic-murino.ru",
]);

type YandexFunction = ((...args: unknown[]) => void) & {
  a?: unknown[][];
  l?: number;
};

declare global {
  interface Window {
    ym?: YandexFunction;
  }
}

function initMetrika() {
  if (window.ym) return;

  // Queue calls until the external tag loads, as in the official snippet.
  const ym = ((...args: unknown[]) => {
    (ym.a ??= []).push(args);
  }) as YandexFunction;

  ym.l = Date.now();
  window.ym = ym;

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://mc.yandex.ru/metrika/tag.js?id=${COUNTER_ID}`;
  document.head.appendChild(script);

  // SPA pageviews are sent manually for each route.
  window.ym(COUNTER_ID, "init", {
    defer: true,
    clickmap: true,
    trackLinks: true,
    accurateTrackBounce: true,
    webvisor: false,
    sendTitle: false,
  });
}

export function YandexMetrika() {
  const pathname = usePathname();

  useEffect(() => {
    // The client's analytics must not be polluted by Vercel previews,
    // staging deployments, localhost, or other unapproved hostnames.
    if (!PRODUCTION_HOSTS.has(window.location.hostname.toLowerCase())) return;

    initMetrika();

    // Do not send query strings: these can sometimes contain personal data.
    // Send each client-side page transition exactly once per route change.
    window.ym?.(COUNTER_ID, "hit", `${window.location.origin}${pathname}`);
  }, [pathname]);

  return null;
}
