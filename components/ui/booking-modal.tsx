"use client";

import { useEffect, useState } from "react";

type Props = {
  open: boolean;
  onClose: () => void;

  doctor?: {
    name: string;
  } | null;

  service?: {
    title: string;
  } | null;
};

export function BookingModal({
  open,
  onClose,
  doctor,
  service,
}: Props) {
  const [sent, setSent] = useState(false);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [comment, setComment] = useState("");

  const contextLabel =
    doctor?.name
      ? `Врач: ${doctor.name}`
      : service?.title
      ? `Услуга: ${service.title}`
      : null;

  const source =
    doctor?.name ? "doctor" : service?.title ? "service" : "general";

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSent(false);
        onClose();
      }
    };

    if (open) {
      document.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "auto";
    };
  }, [open, onClose]);

  if (!open) return null;

  const handleSubmit = () => {
    const payload = {
      name,
      phone,
      comment,
      source,
      doctor: doctor?.name || null,
      service: service?.title || null,
    };

    console.log("BOOKING:", payload);

    setSent(true);

    setTimeout(() => {
      setSent(false);
      setName("");
      setPhone("");
      setComment("");
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">

      {/* overlay */}
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* modal */}
      <div className="relative w-full max-w-lg rounded-[28px] border border-zinc-200 bg-white p-8 shadow-2xl">

        {!sent ? (
          <>
            <h2 className="text-2xl font-semibold text-zinc-900">
              Запись на прием
            </h2>

            {/* CONTEXT BLOCK */}
            {contextLabel && (
              <div className="mt-4 rounded-2xl border border-zinc-200 bg-zinc-50 p-4 text-sm text-zinc-700">
                <div className="text-xs uppercase tracking-[0.2em] text-zinc-400">
                  Вы записываетесь
                </div>

                <div className="mt-1 font-medium text-zinc-900">
                  {contextLabel}
                </div>
              </div>
            )}

            <p className="mt-4 text-sm text-zinc-600">
              Оставьте данные, и мы свяжемся с вами
            </p>

            <div className="mt-6 space-y-4">

              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ваше имя"
                className="w-full rounded-xl border border-zinc-200 px-4 py-3 outline-none focus:border-zinc-400"
              />

              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Телефон"
                className="w-full rounded-xl border border-zinc-200 px-4 py-3 outline-none focus:border-zinc-400"
              />

              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Комментарий"
                className="w-full rounded-xl border border-zinc-200 px-4 py-3 outline-none focus:border-zinc-400"
                rows={4}
              />

            </div>

            <div className="mt-6 flex gap-3">

              <button
                onClick={onClose}
                className="flex-1 rounded-xl border border-zinc-200 py-3 text-sm text-zinc-600 hover:bg-zinc-50"
              >
                Отмена
              </button>

              <button
                onClick={handleSubmit}
                className="flex-1 rounded-xl bg-zinc-900 py-3 text-sm text-white hover:bg-zinc-700"
              >
                Отправить
              </button>

            </div>
          </>
        ) : (
          <div className="py-16 text-center">
            <div className="text-4xl">✓</div>

            <h2 className="mt-4 text-2xl font-semibold text-zinc-900">
              Заявка отправлена
            </h2>

            <p className="mt-2 text-sm text-zinc-600">
              Мы свяжемся с вами в ближайшее время
            </p>
          </div>
        )}

      </div>
    </div>
  );
}