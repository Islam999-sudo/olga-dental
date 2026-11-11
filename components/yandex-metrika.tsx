"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

const COUNTER_ID = 105008013;
const CONSENT_KEY = "olga-analytics-consent-v1";
const REOPEN_EVENT = "olga:analytics-settings";
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
  return typeof window !== "undefined"
    && PRODUCTION_HOSTS.has(window.location.hostname.toLowerCase());
}

function setTrackingDisabled(disabled: boolean) {
  // Official Yandex Metrika opt-out switch.
  window.disableYaCounter105008013 = disabled;
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

function storedChoice(): Choice {
  try {
    const value = window.localStorage.getItem(CONSENT_KEY);
    return value === "accepted" || value === "declined" ? value : "pending";
  } catch {
    return "pending";
  }
}

export function AnalyticsSettingsButton() {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(REOPEN_EVENT))}
      className="text-left text-xs text-[var(--text-muted)] underline decoration-[var(--accent-light)]/30 underline-offset-4 transition hover:text-[var(--accent)]"
    >
      Настройки аналитики
    </button>
  );
}

export function YandexMetrika() {
  const pathname = usePathname();
  const [choice, setChoice] = useState<Choice>("loading");
  const [activeHost, setActiveHost] = useState(false);

  useEffect(() => {
    const isProduction = productionHost();
    setActiveHost(isProduction);

    // Prevent any counter activity before explicitly allowed.
    if (!isProduction) {
      setTrackingDisabled(true);
      setChoice("declined");
      return;
    }

    const readPreference = () => {
      const selected = storedChoice();
      setTrackingDisabled(selected !== "accepted");
      setChoice(selected);
    };

    readPreference();

    const openSettings = () => {
      setTrackingDisabled(true);
      setChoice("pending");
    };
    window.addEventListener(REOPEN_EVENT, openSettings);
    window.addEventListener("storage", readPreference);
    return () => {
      window.removeEventListener(REOPEN_EVENT, openSettings);
      window.removeEventListener("storage", readPreference);
    };
  }, []);

  useEffect(() => {
    if (!activeHost || choice !== "accepted") return;

    setTrackingDisabled(false);
    initMetrika();

    // Do not record query strings or fragments containing visitor information.
    window.ym?.(COUNTER_ID, "hit", window.location.origin + pathname);
  }, [activeHost, choice, pathname]);

  useEffect(() => {
    if (!activeHost || choice !== "accepted") return;

    const onClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const link = target.closest("a[href^='tel:']");
      if (link) window.ym?.(COUNTER_ID, "reachGoal", "phone_click");
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [activeHost, choice]);

  const select = (next: "accepted" | "declined") => {
    setTrackingDisabled(next !== "accepted");
    try {
      window.localStorage.setItem(CONSENT_KEY, next);
    } catch {
      // Analytics is optional, even if storage is blocked.
    }
    setChoice(next);
  };

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
        <button
          type="button"
          onClick={() => select("declined")}
          className="rounded-full border border-[var(--accent-light)]/30 px-5 py-2.5 text-sm font-semibold text-[var(--foreground)] transition hover:bg-[var(--accent-light)]/10"
        >
          Отклонить
        </button>
        <button
          type="button"
          onClick={() => select("accepted")}
          className="rounded-full bg-[var(--accent-light)] px-5 py-2.5 text-sm font-semibold text-[#071412] transition hover:brightness-110"
        >
          Разрешить аналитику
        </button>
      </div>
    </section>
  );
}
