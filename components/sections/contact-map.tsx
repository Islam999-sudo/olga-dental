"use client";

import { useState } from "react";

export function ContactMap() {
  const [copied, setCopied] = useState(false);

  const address = "Санкт-Петербург, Невский проспект, 25";
  const phone = "+78126026160";

  const copyAddress = async () => {
    await navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <section id="contact" className="relative py-32">

      <div className="mx-auto max-w-7xl px-6">

        {/* HEADER */}
        <div className="max-w-3xl">
          <span className="text-xs uppercase tracking-[0.25em] text-zinc-500">
            Контакты
          </span>

          <h2 className="mt-4 text-4xl font-semibold text-zinc-900 md:text-6xl">
            Как нас найти
          </h2>

          <p className="mt-6 text-lg text-zinc-600">
            Удобное расположение в центре города. Мы всегда на связи.
          </p>
        </div>

        {/* GRID */}
        <div className="mt-16 grid gap-10 lg:grid-cols-2">

          {/* LEFT */}
          <div className="space-y-6">

            {/* ADDRESS */}
            <div className="rounded-2xl border border-zinc-200 bg-white p-6">
              <div className="text-sm text-zinc-500">Адрес</div>

              <div className="mt-1 text-lg font-medium text-zinc-900">
                {address}
              </div>

              <button
                onClick={copyAddress}
                className="mt-4 text-sm text-zinc-600 underline underline-offset-4 hover:text-zinc-900"
              >
                {copied ? "Скопировано ✓" : "Скопировать адрес"}
              </button>
            </div>

            {/* PHONE */}
            <div className="rounded-2xl border border-zinc-200 bg-white p-6">
              <div className="text-sm text-zinc-500">Телефон</div>

              <div className="mt-1 text-lg font-medium text-zinc-900">
                +7 (812) 602-61-60
              </div>

              <a
                href={`tel:${phone}`}
                className="mt-4 inline-block text-sm text-zinc-600 underline underline-offset-4 hover:text-zinc-900"
              >
                Позвонить
              </a>
            </div>

            {/* HOURS */}
            <div className="rounded-2xl border border-zinc-200 bg-white p-6">
              <div className="text-sm text-zinc-500">Время работы</div>

              <div className="mt-1 text-lg font-medium text-zinc-900">
                Пн–Сб: 09:00 – 21:00
              </div>
            </div>

            {/* ACTIONS */}
            <div className="flex flex-wrap gap-3">

              {/* ROUTE */}
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
                  address
                )}`}
                target="_blank"
                className="rounded-full bg-zinc-900 px-6 py-3 text-sm text-white hover:bg-zinc-700"
              >
                Построить маршрут
              </a>

              {/* CALL */}
              <a
                href={`tel:${phone}`}
                className="rounded-full border border-zinc-200 px-6 py-3 text-sm text-zinc-900 hover:bg-zinc-100"
              >
                Позвонить
              </a>

            </div>

          </div>

          {/* RIGHT - MAP */}
          <div className="relative overflow-hidden rounded-[32px] border border-zinc-200 shadow-soft-lg">

            {/* subtle overlay UI (sticky CTA) */}
            <div className="absolute bottom-4 left-4 z-10 rounded-2xl bg-white/90 px-4 py-3 text-sm backdrop-blur">
              <div className="font-medium text-zinc-900">
                OLGA Dental Clinic
              </div>
              <div className="text-xs text-zinc-500">
                центр города
              </div>
            </div>

            <iframe
              src={`https://www.google.com/maps?q=${encodeURIComponent(
                address
              )}&output=embed`}
              className="h-[420px] w-full"
              loading="lazy"
            />

          </div>

        </div>

      </div>
    </section>
  );
}