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
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">

      {/* OVERLAY */}
      <div
        className="absolute inset-0 bg-black/35 backdrop-blur-md"
        onClick={onClose}
      />

      {/* MODAL */}
      <div
        className="
          relative
          w-full
          max-w-lg
          overflow-hidden
          rounded-[32px]
          border
          border-[#12c7b7]/20
          bg-white
          p-8
          shadow-[0_25px_80px_rgba(18,199,183,0.18)]
        "
      >

        {/* GLOW */}
        <div
          className="
            absolute
            right-[-120px]
            top-[-120px]
            h-[260px]
            w-[260px]
            rounded-full
            bg-[#12c7b7]/15
            blur-3xl
            pointer-events-none
          "
        />

        {!sent ? (
          <div className="relative">

            <span
              className="
                inline-flex
                rounded-full
                border border-[#12c7b7]/20
                bg-[#12c7b7]/10
                px-4 py-2
                text-xs
                font-medium
                uppercase
                tracking-[0.22em]
                text-[#0f8f84]
              "
            >
              Запись
            </span>

            <h2 className="mt-6 text-3xl font-semibold text-[#0f8f84]">
              Запись на прием
            </h2>

            {/* CONTEXT */}
            {contextLabel && (
              <div
                className="
                  mt-5
                  rounded-2xl
                  border border-[#12c7b7]/15
                  bg-[#12c7b7]/5
                  p-4
                "
              >
                <div
                  className="
                    text-xs
                    uppercase
                    tracking-[0.2em]
                    text-[#5caea7]
                  "
                >
                  Вы записываетесь
                </div>

                <div className="mt-1 font-medium text-[#0f8f84]">
                  {contextLabel}
                </div>
              </div>
            )}

            <p className="mt-5 text-sm leading-relaxed text-[#5f7c79]">
              Оставьте данные, и администратор свяжется с вами
              для подтверждения записи.
            </p>

            {/* FORM */}
            <div className="mt-7 space-y-4">

              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ваше имя"
                className="
                  w-full
                  rounded-2xl
                  border border-[#12c7b7]/15
                  bg-white
                  px-4 py-3.5
                  text-[#0f8f84]
                  outline-none
                  transition
                  placeholder:text-[#8ab8b3]
                  focus:border-[#12c7b7]
                  focus:ring-4
                  focus:ring-[#12c7b7]/10
                "
              />

              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Телефон"
                className="
                  w-full
                  rounded-2xl
                  border border-[#12c7b7]/15
                  bg-white
                  px-4 py-3.5
                  text-[#0f8f84]
                  outline-none
                  transition
                  placeholder:text-[#8ab8b3]
                  focus:border-[#12c7b7]
                  focus:ring-4
                  focus:ring-[#12c7b7]/10
                "
              />

              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Комментарий"
                rows={4}
                className="
                  w-full
                  rounded-2xl
                  border border-[#12c7b7]/15
                  bg-white
                  px-4 py-3.5
                  text-[#0f8f84]
                  outline-none
                  transition
                  placeholder:text-[#8ab8b3]
                  focus:border-[#12c7b7]
                  focus:ring-4
                  focus:ring-[#12c7b7]/10
                "
              />

            </div>

            {/* ACTIONS */}
            <div className="mt-7 flex gap-3">

              <button
                onClick={onClose}
                className="
                  flex-1
                  rounded-2xl
                  border border-[#12c7b7]/20
                  bg-white
                  py-3
                  text-sm
                  font-medium
                  text-[#0f8f84]
                  transition
                  hover:bg-[#12c7b7]/5
                "
              >
                Отмена
              </button>

              <button
                onClick={handleSubmit}
                className="
                  flex-1
                  rounded-2xl
                  bg-[#12c7b7]
                  py-3
                  text-sm
                  font-medium
                  text-white
                  shadow-lg
                  shadow-[#12c7b7]/30
                  transition
                  hover:bg-[#10b3a5]
                  hover:shadow-xl
                  hover:shadow-[#12c7b7]/40
                "
              >
                Отправить
              </button>

            </div>

          </div>
        ) : (
          <div className="relative py-16 text-center">

            <div
              className="
                mx-auto
                flex
                h-20 w-20
                items-center justify-center
                rounded-full
                bg-[#12c7b7]/10
                text-4xl
                text-[#12c7b7]
              "
            >
              ✓
            </div>

            <h2 className="mt-6 text-3xl font-semibold text-[#0f8f84]">
              Заявка отправлена
            </h2>

            <p className="mt-3 text-sm text-[#5f7c79]">
              Мы свяжемся с вами в ближайшее время
            </p>

          </div>
        )}

      </div>
    </div>
  );
}