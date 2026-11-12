"use client";

import { usePathname } from "next/navigation";
import { useEffect, useSyncExternalStore } from "react";
import Link from "next/link";

const COUNTER_ID = 105008013;
const CONSENT_KEY = "olga-analytics-consent-v1";
const PREFERENCE_CHANGED = "olga:analytics-preference-changed";
const PRODUCTION_HOSTS = new Set([
  "olga-clinic-murino.ru",
  "www.olga-clinic-murino.ru",
]);

type Choice = "loading" | "pending" | "accepted" | "declined";
type YandexFunction = ((...args: unknown[]) => void) & {
  a?: unknown[][];
  l?: number;
};

declare global {
  interface Window {
    ym?: YandexFunction;
    disableYaCounter105008013?: boolean;
  }
}

function productionHost(): boolean {
  return typeof window !== "undefined" &&
    PRODUCTION_HOSTS.has(window.location.hostname.toLowerCase());
}

function subscribeToChoice(onStoreChange: () => void) {
  window.addEventListener("storage", onStoreChange);
  window.addEventListener(PREFERENCE_CHANGED, onStoreChange);
  return () => {
    window.removeEventListener("storage", onStoreChange);
    window.removeEventListener(PREFERENCE_CHANGED, onStoreChange);
  };
}

function storedChoice(): Choice {
  if (!productionHost()) return "declined";
  try {
    const value = window.localStorage.getItem(CONSENT_KEY);
    return value === "accepted" || value === "declined" ? value : "pending";
  } catch {
    return "pending";
  }
}

function serverChoice(): Choice {
  return "loading";
}

function useAnalyticsChoice(): Choice {
  return useSyncExternalStore(subscribeToChoice, storedChoice, serverChoice);
}

function updateChoice(value: "accepted" | "declined" | "pending") {
  try {
    if (value === "pending") window.localStorage.removeItem(CONSENT_KEY);
    else window.localStorage.setItem(CONSENT_KEY, value);
  } catch {
    // Tracking is optional even when persistent storage is unavailable.
  }
  window.disableYaCounter105008013 = value !== "accepted";
  window.dispatchEvent(new Event(PREFERENCE_CHANGED));
}

function initMetrika(): void {
  if (window.ym) return;

  const ym = ((...args: unknown[]) => {
    (ym.a ??= []).push(args);
  }) as YandexFunction;
  ym.l = Date.now();
  window.ym = ym;

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://mc.yandex.ru/metrika/tag.js?id=${COUNTER_ID}`;
  document.head.appendChild(script);

  window.ym(COUNTER_ID, "init", {
    defer: true,
    clickmap: true,
    trackLinks: true,
    accurateTrackBounce: true,
    webvisor: false,
  });
}

export function AnalyticsSettingsButton() {
  const choice = useAnalyticsChoice();
  if (!productionHost() || choice === "loading") return null;

  return (
    <button
      type="button"
      onClick={() => updateChoice("pending")}
      className="text-left text-xs text-[var(--text-muted)] underline decoration-[var(--accent-light)]/30 underline-offset-4 transition hover:text-[var(--accent)]"
    >
      Настройки аналитики
    </button>
  );
}

export function YandexMetrika() {
  const pathname = usePathname();
  const choice = useAnalyticsChoice();
  const activeHost = productionHost();

  useEffect(() => {
    // Deny tracking until a visitor has explicitly opted in.
    window.disableYaCounter105008013 = !activeHost || choice !== "accepted";
    if (!activeHost || choice !== "accepted") return;

    initMetrika();
    // Pageviews never include query strings or fragments.
    window.ym?.(COUNTER_ID, "hit", window.location.origin + pathname);
  }, [activeHost, choice, pathname]);

  useEffect(() => {
    if (!activeHost || choice !== "accepted") return;

    const onClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      if (target.closest("a[href^='tel:']")) {
        window.ym?.(COUNTER_ID, "reachGoal", "phone_click");
      }
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [activeHost, choice]);

  if (!activeHost || choice !== "pending") return null;

  return (
    <section
      role="dialog"
      aria-label="Настройки аналитики"
      aria-modal="false"
      className="fixed bottom-4 left-4 right-4 z-[100000] mx-auto max-w-2xl rounded-[25px] border border-[var(--accent-light)]/25 bg-[var(--card)] p-5 text-[var(--foreground)] shadow-[0_20px_70px_rgba(0,0,0,.22)] sm:bottom-6 sm:p-6"
    >
      <h2 className="text-base font-semibold">Аналитика посещений</h2>
      <p className="mt-2 text-sm leading-6 text-[var(--text-soft)]">
        С вашего разрешения используем Яндекс Метрику для анализа посещаемости сайта.
        Без разрешения счётчик не загружается. Можно отказаться или изменить выбор позднее
        внизу сайта. Подробнее — в{" "}
        <Link href="/privacy" className="font-semibold text-[var(--accent)] underline underline-offset-2">
          политике обработки данных
        </Link>.
      </p>
      <div className="mt-5 flex flex-wrap gap-3">
        <button type="button" onClick={() => updateChoice("declined")}
          className="rounded-full border border-[var(--accent-light)]/30 px-5 py-2.5 text-sm font-semibold text-[var(--foreground)] transition hover:bg-[var(--accent-light)]/10">
          Отклонить
        </button>
        <button type="button" onClick={() => updateChoice("accepted")}
          className="rounded-full bg-[var(--accent-light)] px-5 py-2.5 text-sm font-semibold text-[#071412] transition hover:brightness-110">
          Разрешить аналитику
        </button>
      </div>
    </section>
  );
}
