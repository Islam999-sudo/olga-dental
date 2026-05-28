"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { reveal } from "@/lib/motion";

export function ContactMap() {
  const [copied, setCopied] = useState(false);

  const address = "г. Мурино, Воронцовский бульвар, 2";
  const phone = "+78126026160";

  const yandexMapUrl = `https://yandex.ru/map-widget/v1/?text=${encodeURIComponent(
    address
  )}&z=16`;

  const yandexRouteUrl = `https://yandex.ru/maps/?rtext=~${encodeURIComponent(
    address
  )}&rtt=auto`;

  const copyAddress = async () => {
    await navigator.clipboard.writeText(address);
    setCopied(true);

    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <motion.section
      id="contact"
      className="relative overflow-hidden py-32"
      initial={false}
      animate="visible"
      variants={reveal}
    >
      {/* BACKGROUND */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-[-180px] top-[80px] h-[420px] w-[420px] rounded-full bg-[var(--accent-light)]/12 blur-3xl" />
        <div className="absolute bottom-[-120px] right-[-120px] h-[360px] w-[360px] rounded-full bg-[var(--accent-light)]/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        {/* HEADER */}
        <div className="max-w-3xl">
          <span className="inline-flex rounded-full border border-[var(--accent-light)]/20 bg-[var(--accent-light)]/10 px-4 py-2 text-xs font-medium uppercase tracking-[0.25em] text-[var(--accent)] backdrop-blur">
            Контакты
          </span>

          <h2 className="mt-6 text-4xl font-semibold text-[var(--accent)] md:text-6xl">
            Как нас найти
          </h2>

          <p className="mt-6 text-lg leading-relaxed text-[var(--text-soft)]">
            Удобное расположение в Мурино. Мы всегда остаёмся на связи и готовы
            помочь.
          </p>
        </div>

        {/* GRID */}
        <div className="mt-16 grid gap-10 lg:grid-cols-2">
          {/* LEFT */}
          <div className="space-y-6">
            {/* ADDRESS */}
            <div className="rounded-[30px] border border-[var(--accent-light)]/15 bg-[var(--card)] p-7 shadow-[0_10px_40px_rgba(18,199,183,0.08)] backdrop-blur-xl">
              <div className="text-sm uppercase tracking-[0.2em] text-[var(--accent)]">
                Адрес
              </div>

              <div className="mt-3 text-xl font-semibold text-[var(--accent)]">
                {address}
              </div>

              <button
                type="button"
                onClick={copyAddress}
                className="mt-5 text-sm text-[var(--text-muted)] underline underline-offset-4 transition hover:text-[var(--accent)]"
              >
                {copied ? "Скопировано ✓" : "Скопировать адрес"}
              </button>
            </div>

            {/* PHONE */}
            <div className="rounded-[30px] border border-[var(--accent-light)]/15 bg-[var(--card)] p-7 shadow-[0_10px_40px_rgba(18,199,183,0.08)] backdrop-blur-xl">
              <div className="text-sm uppercase tracking-[0.2em] text-[var(--accent)]">
                Телефон
              </div>

              <div className="mt-3 text-xl font-semibold text-[var(--accent)]">
                +7 (812) 602-61-60
              </div>

              <a
                href={`tel:${phone}`}
                className="mt-5 inline-block text-sm text-[var(--text-muted)] underline underline-offset-4 transition hover:text-[var(--accent)]"
              >
                Позвонить
              </a>
            </div>

            {/* HOURS */}
            <div className="rounded-[30px] border border-[var(--accent-light)]/15 bg-[var(--card)] p-7 shadow-[0_10px_40px_rgba(18,199,183,0.08)] backdrop-blur-xl">
              <div className="text-sm uppercase tracking-[0.2em] text-[var(--accent)]">
                Время работы
              </div>

              <div className="mt-3 text-xl font-semibold text-[var(--accent)]">
                Ежедневно: 10:00 – 21:00
              </div>
            </div>

            {/* CTA */}
            <div className="flex flex-wrap gap-4">
              <a
                href={yandexRouteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-[var(--accent-light)] px-7 py-3.5 text-sm font-medium text-white shadow-lg shadow-[var(--accent-light)]/25 transition-all duration-300 hover:-translate-y-[2px] hover:brightness-110"
              >
                Построить маршрут
              </a>

              <a
                href={`tel:${phone}`}
                className="rounded-full border border-[var(--accent-light)]/20 bg-[var(--card)] px-7 py-3.5 text-sm font-medium text-[var(--accent)] transition-all duration-300 hover:bg-[var(--accent-light)] hover:text-white"
              >
                Позвонить
              </a>
            </div>
          </div>

          {/* RIGHT — MAP */}
          <motion.div
            initial={false}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative overflow-hidden rounded-[36px] border border-[var(--accent-light)]/15 bg-[var(--card)] shadow-[0_20px_80px_rgba(18,199,183,0.12)] backdrop-blur-xl"
          >
            <div className="pointer-events-none absolute right-[-80px] top-[-80px] h-[240px] w-[240px] rounded-full bg-[var(--accent-light)]/15 blur-3xl" />

            <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t from-[var(--accent-light)]/10 via-transparent to-transparent" />

            <motion.div
              initial={false}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="pointer-events-none absolute bottom-5 left-5 z-10 rounded-2xl border border-[var(--accent-light)]/15 bg-[var(--card)] px-5 py-4 backdrop-blur-xl"
            >
              <div className="font-semibold text-[var(--accent)]">
                OLGA Dental Clinic
              </div>

              <div className="mt-1 text-xs uppercase tracking-[0.15em] text-[var(--text-muted)]">
                Мурино
              </div>
            </motion.div>

            <iframe
              src={yandexMapUrl}
              className="h-[460px] w-full border-0"
              loading="lazy"
              allowFullScreen
              title="OLGA Dental Clinic на Яндекс.Картах"
            />
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}