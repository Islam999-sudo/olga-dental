"use client";

import { useEffect } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
  service: {
    title: string;
    price: string;
    desc: string;
  } | null;
};

export function ServiceModal({
  open,
  onClose,
  service,
}: Props) {

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (open) {
      document.body.style.overflow = "hidden";
      document.addEventListener("keydown", handleEsc);
    }

    return () => {
      document.body.style.overflow = "auto";
      document.removeEventListener("keydown", handleEsc);
    };
  }, [open, onClose]);

  if (!open || !service) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">

      {/* overlay */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/40 backdrop-blur-md"
      />

      {/* modal */}
      <div className="relative w-full max-w-2xl overflow-hidden rounded-[36px] border border-white/20 bg-white p-10 shadow-2xl">

        {/* glow */}
        <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-zinc-100 blur-3xl" />

        <div className="relative">

          <span className="rounded-full border border-zinc-200 bg-zinc-100 px-4 py-2 text-xs uppercase tracking-[0.2em] text-zinc-600">
            Услуга
          </span>

          <h2 className="mt-8 text-4xl font-semibold tracking-tight text-zinc-900">
            {service.title}
          </h2>

          <p className="mt-6 text-lg leading-relaxed text-zinc-600">
            {service.desc}
          </p>

          {/* benefits */}
          <div className="mt-10 grid gap-4 md:grid-cols-2">

            <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-5">
              <div className="text-sm font-medium text-zinc-900">
                Современные технологии
              </div>

              <div className="mt-2 text-sm text-zinc-600">
                Используем цифровую диагностику и современные материалы.
              </div>
            </div>

            <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-5">
              <div className="text-sm font-medium text-zinc-900">
                Комфорт пациента
              </div>

              <div className="mt-2 text-sm text-zinc-600">
                Максимально бережный и спокойный процесс лечения.
              </div>
            </div>

          </div>

          {/* bottom */}
          <div className="mt-12 flex flex-col gap-4 border-t border-zinc-200 pt-8 md:flex-row md:items-center md:justify-between">

            <div>
              <div className="text-sm text-zinc-500">
                Стоимость
              </div>

              <div className="mt-1 text-3xl font-semibold text-zinc-900">
                {service.price}
              </div>
            </div>

            <div className="flex gap-3">

              <button
                onClick={onClose}
                className="rounded-full border border-zinc-200 px-6 py-3 text-sm text-zinc-700 hover:bg-zinc-100"
              >
                Закрыть
              </button>

              <button
                className="rounded-full bg-zinc-900 px-6 py-3 text-sm text-white hover:bg-zinc-700"
              >
                Записаться
              </button>

            </div>

          </div>

        </div>
      </div>
    </div>
  );
}