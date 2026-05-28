"use client";

import { useEffect } from "react";
import type { Service } from "@/components/sections/services";

type Props = {
  open: boolean;
  service: Service | null;
  onClose: () => void;
  onBook: (service: Service) => void;
};

export function ServiceModal({
  open,
  service,
  onClose,
  onBook,
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
          bg-[var(--background)]/65
          backdrop-blur-md
        "
      />

      {/* MODAL */}
      <div
        className="
          relative
          box-border
          w-full
          max-w-2xl
          max-h-[90vh]
          overflow-y-auto
          overflow-x-hidden
          rounded-[36px]
          border border-[var(--accent-light)]/15
          bg-[var(--card)]
          p-10
          text-[var(--foreground)]
          shadow-[0_30px_120px_rgba(18,199,183,0.16)]
          backdrop-blur-2xl
        "
      >
        {/* GLOW */}
        <div
          className="
            pointer-events-none
            absolute
            right-[-80px]
            top-[-80px]
            h-[260px]
            w-[260px]
            rounded-full
            bg-[var(--accent-light)]/10
            blur-3xl
          "
        />

        <div className="relative">
          {/* BADGE */}
          <span
            className="
              rounded-full
              border border-[var(--accent-light)]/20
              bg-[var(--accent-light)]/8
              px-4 py-2
              text-xs
              uppercase
              tracking-[0.2em]
              text-[var(--accent)]
              backdrop-blur
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
              text-[var(--accent)]
            "
          >
            {service.title}
          </h2>

          {/* DESCRIPTION */}
          <p
            className="
              mt-6
              text-lg
              leading-relaxed
              text-[var(--text-soft)]
            "
          >
            {service.fullDesc || service.desc}
          </p>

          {/* BENEFITS */}
          {service.benefits?.length > 0 && (
            <div className="mt-10 grid gap-4 md:grid-cols-2">
              {service.benefits.map((benefit, idx) => (
                <div
                  key={idx}
                  className="
                    rounded-2xl
                    border border-[var(--accent-light)]/15
                    bg-[var(--accent-light)]/5
                    p-5
                    backdrop-blur
                  "
                >
                  <div className="text-sm font-medium text-[var(--text-soft)]">
                    <span className="text-[var(--accent)]">✓</span>{" "}
                    {benefit}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* BOTTOM */}
          <div
            className="
              mt-12
              flex flex-col gap-4
              border-t border-[var(--accent-light)]/15
              pt-8
              md:flex-row
              md:items-center
              md:justify-between
            "
          >
            {/* PRICE */}
            <div>
              <div className="text-sm text-[var(--text-muted)]">
                Стоимость
              </div>

              <div className="mt-1 text-3xl font-semibold text-[var(--accent)]">
                {service.price}
              </div>
            </div>

            {/* BUTTONS */}
            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="
                  rounded-full
                  border border-[var(--accent-light)]/20
                  bg-[var(--card)]
                  px-6 py-3
                  text-sm
                  font-medium
                  text-[var(--accent)]
                  backdrop-blur-xl
                  transition-all duration-300
                  hover:border-[var(--accent-light)]/40
                  hover:bg-[var(--accent-light)]/5
                "
              >
                Закрыть
              </button>

              <button
                onClick={() => onBook(service)}
                className="
                  rounded-full
                  bg-[var(--accent-light)]
                  px-6 py-3
                  text-sm
                  font-medium
                  text-[#071412]
                  shadow-lg
                  shadow-[var(--accent-light)]/30
                  transition-all duration-300
                  hover:-translate-y-[2px]
                  hover:brightness-110
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