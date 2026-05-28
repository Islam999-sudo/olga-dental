"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Doctor } from "@/data/doctors";

type Props = {
  doctor: Doctor;
  onClose: () => void;
  onBook: (doctor: Doctor) => void;
};

export function DoctorModal({
  doctor,
  onClose,
  onBook,
}: Props) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEsc);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleEsc);
    };
  }, [onClose]);

  if (!mounted) return null;

  return createPortal(
    <div
      className="
        fixed
        inset-0
        z-[2147483647]
        flex
        items-center
        justify-center
        bg-black/55
        px-4
        py-6
        backdrop-blur-md
        sm:px-6
      "
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="
          relative
          w-full
          max-w-[1040px]
          max-h-[88vh]
          overflow-y-auto
          overflow-x-hidden
          rounded-[30px]
          border
          border-[var(--accent-light)]/15
          bg-[var(--card)]
          text-[var(--foreground)]
          shadow-[0_40px_140px_rgba(18,199,183,0.18)]
          backdrop-blur-2xl
          md:rounded-[36px]
        "
      >
        {/* CLOSE BUTTON */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Закрыть профиль врача"
          className="
            absolute
            right-5
            top-5
            z-[40]
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-full
            bg-white/85
            text-lg
            font-medium
            leading-none
            text-[var(--accent)]
            shadow-[0_8px_30px_rgba(0,0,0,0.08)]
            backdrop-blur-xl
            transition
            hover:bg-white
            dark:bg-[var(--glass)]
            dark:hover:bg-[var(--accent-light)]/10
          "
        >
          ×
        </button>

        <div
          className="
            grid
            gap-0
            md:grid-cols-[380px_1fr]
            lg:grid-cols-[410px_1fr]
          "
        >
          {/* IMAGE — DESKTOP ONLY */}
          <div
            className="
              hidden
              p-5
              pr-0
              md:block
              lg:p-6
              lg:pr-0
            "
          >
            <div
              className="
                relative
                h-full
                min-h-[520px]
                overflow-hidden
                rounded-[28px]
                bg-[#071412]
                shadow-[0_24px_80px_rgba(18,199,183,0.16)]
              "
            >
              <img
  src={doctor.image}
  alt={doctor.name}
  loading="eager"
  decoding="async"
  draggable={false}
  className="
    block
    h-full
    w-full
    object-cover
    saturate-[1.06]
    contrast-[1.03]
    brightness-[0.98]
  "
  style={{
    objectPosition: "50% 18%",
  }}
/>

              <div
                className="
                  pointer-events-none
                  absolute
                  inset-0
                  z-[2]
                  bg-gradient-to-t
                  from-[#020404]/78
                  via-[#020404]/10
                  to-transparent
                "
              />

              <div
                className="
                  pointer-events-none
                  absolute
                  bottom-[-150px]
                  left-1/2
                  z-[3]
                  h-[360px]
                  w-[440px]
                  -translate-x-1/2
                  rounded-full
                  bg-[#12c7b7]/36
                  blur-[105px]
                "
              />

              <div
                className="
                  pointer-events-none
                  absolute
                  inset-x-0
                  bottom-0
                  z-[4]
                  h-[34%]
                  bg-gradient-to-t
                  from-[#12c7b7]/20
                  via-[#12c7b7]/7
                  to-transparent
                "
              />

              <div
                className="
                  pointer-events-none
                  absolute
                  inset-0
                  z-[5]
                  bg-[linear-gradient(135deg,rgba(255,255,255,0.06),transparent_42%)]
                "
              />

              <div className="absolute bottom-7 left-7 z-[6] text-white">
                <div className="text-sm opacity-75">
                  Стаж
                </div>

                <div className="mt-1 text-2xl font-semibold tracking-wide">
                  {doctor.exp}
                </div>
              </div>
            </div>
          </div>

          {/* CONTENT */}
          <div
            className="
              relative
              p-6
              sm:p-8
              md:p-10
              lg:p-12
            "
          >
            <div
              className="
                pointer-events-none
                absolute
                right-[-120px]
                top-1/2
                h-[300px]
                w-[300px]
                -translate-y-1/2
                rounded-full
                bg-[var(--accent-light)]/8
                blur-3xl
              "
            />

            <div className="relative z-[2] max-w-[600px]">
              <span
                className="
                  text-xs
                  uppercase
                  tracking-[0.28em]
                  text-[var(--accent)]
                "
              >
                Врач клиники
              </span>

              <h2
                className="
                  mt-4
                  pr-10
                  text-3xl
                  font-semibold
                  leading-tight
                  text-[var(--foreground)]
                  sm:text-4xl
                  md:text-[38px]
                "
              >
                {doctor.name}
              </h2>

              <p
                className="
                  mt-3
                  text-sm
                  text-[var(--text-muted)]
                "
              >
                {doctor.role}
              </p>

              {/* MOBILE EXPERIENCE */}
              <div
                className="
                  mt-5
                  rounded-2xl
                  border
                  border-[var(--accent-light)]/15
                  bg-[var(--accent-light)]/6
                  p-4
                  md:hidden
                "
              >
                <div className="text-xs uppercase tracking-[0.2em] text-[var(--text-muted)]">
                  Стаж
                </div>

                <div className="mt-1 text-lg font-semibold text-[var(--accent)]">
                  {doctor.exp}
                </div>
              </div>

              <p
                className="
                  mt-6
                  text-sm
                  leading-relaxed
                  text-[var(--text-soft)]
                "
              >
                {doctor.desc}
              </p>

              {doctor.education && (
                <div
                  className="
                    mt-6
                    rounded-3xl
                    border
                    border-[var(--accent-light)]/15
                    bg-[linear-gradient(180deg,rgba(18,199,183,0.08),rgba(18,199,183,0.03))]
                    p-5
                    text-sm
                    leading-relaxed
                    text-[var(--text-soft)]
                    shadow-[0_10px_40px_rgba(18,199,183,0.06)]
                    backdrop-blur-xl
                  "
                >
                  <span className="mr-2 text-[var(--accent)]">
                    🎓
                  </span>

                  {doctor.education}
                </div>
              )}

              <div className="mt-8">
                <div
                  className="
                    text-xs
                    uppercase
                    tracking-[0.22em]
                    text-[var(--text-muted)]
                  "
                >
                  Специализация
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {doctor.specialization.map((s, i) => (
                    <span
                      key={i}
                      className="
                        rounded-full
                        border
                        border-[var(--accent-light)]/20
                        bg-[var(--accent-light)]/6
                        px-4
                        py-2
                        text-xs
                        text-[var(--text-soft)]
                        backdrop-blur-xl
                        transition-all
                        duration-300
                        hover:border-[var(--accent-light)]/35
                        hover:bg-[var(--accent-light)]/10
                      "
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-8 space-y-3">
                {doctor.highlights.map((h, i) => (
                  <div
                    key={i}
                    className="
                      flex
                      items-start
                      gap-3
                      rounded-2xl
                      border
                      border-[var(--accent-light)]/12
                      bg-[var(--glass)]
                      p-4
                      text-sm
                      leading-relaxed
                      text-[var(--text-soft)]
                      shadow-[0_8px_30px_rgba(18,199,183,0.05)]
                      backdrop-blur-xl
                      transition-all
                      duration-300
                      hover:border-[var(--accent-light)]/24
                      hover:bg-[var(--accent-light)]/5
                    "
                  >
                    <span
                      className="
                        mt-[1px]
                        flex
                        h-5
                        w-5
                        shrink-0
                        items-center
                        justify-center
                        rounded-full
                        bg-[var(--accent-light)]/15
                        text-[11px]
                        text-[var(--accent)]
                      "
                    >
                      ✓
                    </span>

                    <span>{h}</span>
                  </div>
                ))}
              </div>

              <div
                className="
                  mt-8
                  flex
                  flex-col
                  gap-3
                  sm:flex-row
                "
              >
                <button
                  type="button"
                  onClick={onClose}
                  className="
                    flex-1
                    rounded-2xl
                    border
                    border-[var(--accent-light)]/20
                    bg-white/70
                    py-3
                    text-sm
                    font-medium
                    text-[var(--foreground)]
                    shadow-[0_10px_30px_rgba(18,199,183,0.06)]
                    transition-all
                    duration-300
                    hover:border-[var(--accent-light)]/40
                    hover:bg-white
                    dark:bg-[var(--glass)]
                    dark:hover:bg-[var(--accent-light)]/8
                  "
                >
                  Закрыть
                </button>

                <button
                  type="button"
                  onClick={() => onBook(doctor)}
                  className="
                    flex-1
                    rounded-2xl
                    bg-[var(--accent-light)]
                    py-3
                    text-sm
                    font-semibold
                    text-[#071412]
                    shadow-[0_12px_40px_rgba(18,199,183,0.28)]
                    transition-all
                    duration-300
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
    </div>,
    document.body
  );
}