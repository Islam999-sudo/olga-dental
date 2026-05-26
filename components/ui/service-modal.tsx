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

      {/* OVERLAY */}
      <div
        onClick={onClose}
        className="
          absolute inset-0
          bg-[#0f766e]/20
          backdrop-blur-md
        "
      />

      {/* MODAL */}
      <div
        className="
          relative
          w-full
          max-w-2xl
          overflow-hidden
          rounded-[36px]
          border border-[#12c7b7]/15
          bg-white
          p-10
          shadow-[0_30px_120px_rgba(18,199,183,0.16)]
        "
      >

        {/* GLOW */}
        <div
          className="
            absolute
            right-[-80px]
            top-[-80px]
            h-[260px]
            w-[260px]
            rounded-full
            bg-[#12c7b7]/10
            blur-3xl
          "
        />

        <div className="relative">

          {/* TAG */}
          <span
            className="
              rounded-full
              border border-[#12c7b7]/20
              bg-[#12c7b7]/8
              px-4 py-2
              text-xs
              uppercase
              tracking-[0.2em]
              text-[#0f8f84]
            "
          >
            Услуга
          </span>

          {/* TITLE */}
          <h2
            className="
              mt-8
              text-4xl
              font-semibold
              tracking-tight
              text-[#0f766e]
            "
          >
            {service.title}
          </h2>

          {/* DESC */}
          <p
            className="
              mt-6
              text-lg
              leading-relaxed
              text-zinc-600
            "
          >
            {service.desc}
          </p>

          {/* BENEFITS */}
          <div className="mt-10 grid gap-4 md:grid-cols-2">

            <div
              className="
                rounded-2xl
                border border-[#12c7b7]/15
                bg-[#12c7b7]/5
                p-5
              "
            >

              <div className="text-sm font-medium text-[#0f766e]">
                Современные технологии
              </div>

              <div className="mt-2 text-sm text-zinc-600">
                Используем цифровую диагностику и современные материалы.
              </div>

            </div>

            <div
              className="
                rounded-2xl
                border border-[#12c7b7]/15
                bg-[#12c7b7]/5
                p-5
              "
            >

              <div className="text-sm font-medium text-[#0f766e]">
                Комфорт пациента
              </div>

              <div className="mt-2 text-sm text-zinc-600">
                Максимально бережный и спокойный процесс лечения.
              </div>

            </div>

          </div>

          {/* BOTTOM */}
          <div
            className="
              mt-12
              flex flex-col gap-4
              border-t border-[#12c7b7]/15
              pt-8
              md:flex-row
              md:items-center
              md:justify-between
            "
          >

            <div>

              <div className="text-sm text-[#12a89d]">
                Стоимость
              </div>

              <div
                className="
                  mt-1
                  text-3xl
                  font-semibold
                  text-[#0f766e]
                "
              >
                {service.price}
              </div>

            </div>

            <div className="flex gap-3">

              <button
                onClick={onClose}
                className="
                  rounded-full
                  border border-[#12c7b7]/20
                  bg-white
                  px-6 py-3
                  text-sm
                  font-medium
                  text-[#0f766e]
                  transition
                  hover:bg-[#12c7b7]/5
                "
              >
                Закрыть
              </button>

              <button
                className="
                  rounded-full
                  bg-[#12c7b7]
                  px-6 py-3
                  text-sm
                  font-medium
                  text-white
                  shadow-lg
                  shadow-[#12c7b7]/30
                  transition
                  hover:bg-[#10b3a5]
                "
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