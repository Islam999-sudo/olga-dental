"use client";

import { motion } from "framer-motion";
import { reveal, viewport } from "@/lib/motion";

const stats = [
  {
    value: "5+",
    label: "лет опыта",
  },
  {
    value: "10 000+",
    label: "пациентов",
  },
  {
    value: "4.9",
    label: "рейтинг",
  },
  {
    value: "100%",
    label: "цифровая диагностика",
  },
];

const cardAnimation = {
  hidden: {
    opacity: 0,
    y: 18,
  },
  visible: {
    opacity: 1,
    y: 0,
  },
};

export function About() {
  return (
    <motion.section
  id="about"
  className="relative overflow-hidden py-24 sm:py-28 lg:py-32"
  initial={false}
  animate="visible"
  variants={reveal}
>
      {/* BACKGROUND */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="
            absolute
            left-[-140px]
            top-[80px]
            h-[420px]
            w-[420px]
            rounded-full
            bg-[var(--accent-light)]/10
            blur-3xl
            dark:bg-[var(--accent-light)]/12
          "
        />

        <div
          className="
            absolute
            right-[-140px]
            bottom-[-80px]
            h-[380px]
            w-[380px]
            rounded-full
            bg-[var(--accent-light)]/8
            blur-3xl
            dark:bg-[var(--accent-light)]/10
          "
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:items-start lg:gap-20">
          {/* LEFT */}
          <div className="max-w-2xl">
            <span
              className="
                inline-flex
                items-center
                rounded-full
                border
                border-[var(--accent-light)]/25
                bg-[var(--accent-light)]/10
                px-4
                py-2
                text-xs
                font-semibold
                uppercase
                tracking-[0.25em]
                text-[var(--accent)]
                shadow-[0_8px_30px_rgba(18,199,183,0.08)]
                backdrop-blur
                dark:border-[var(--accent-light)]/20
                dark:bg-[var(--accent-light)]/8
              "
            >
              О КЛИНИКЕ
            </span>

            <h2
  className="
    mt-6
    text-4xl
    font-semibold
    tracking-tight
    text-[var(--accent)]
    md:text-5xl
    lg:text-[64px]
    lg:leading-[0.98]
  "
>
              Современный
              <br />
              подход
              <br />
              к стоматологии
            </h2>

<p
  className="
    mt-8
    max-w-2xl
    text-xl
    font-semibold
    leading-relaxed
    text-[var(--text-soft)]
  "
>

  Мы объединяем цифровые технологии, клинический опыт и
  внимательное отношение к пациенту.
</p>
          </div>

          {/* RIGHT */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6">
            {stats.map((item, index) => (
              <motion.div
                key={item.label}
                variants={cardAnimation}
                transition={{
                  duration: 0.45,
                  delay: index * 0.08,
                  ease: "easeOut",
                }}
                whileHover={{
                  y: -6,
                  scale: 1.015,
                }}
                className="
                  group
                  relative
                  overflow-hidden
                  rounded-[30px]
                  border
                  border-[var(--accent-light)]/18
                  bg-[var(--card)]
                  p-6
                  shadow-[0_14px_45px_rgba(15,23,42,0.07)]
                  backdrop-blur-xl
                  transition-all
                  duration-300
                  hover:border-[var(--accent-light)]/45
                  hover:shadow-[0_22px_70px_rgba(15,23,42,0.1)]
                  dark:border-[var(--accent-light)]/14
                  dark:bg-[var(--card)]
                  dark:shadow-[0_14px_45px_rgba(0,0,0,0.28)]
                  dark:hover:border-[var(--accent-light)]/28
                  dark:hover:shadow-[0_22px_70px_rgba(54,223,218,0.08)]
                "
              >
                {/* TOP LINE */}
                <div
                  className="
                    pointer-events-none
                    absolute
                    inset-x-0
                    top-0
                    h-px
                    bg-gradient-to-r
                    from-transparent
                    via-[var(--accent-light)]/35
                    to-transparent
                    opacity-70
                    dark:opacity-50
                  "
                />

                {/* GLOW */}
                <div
                  className="
                    pointer-events-none
                    absolute
                    right-[-40px]
                    top-[-40px]
                    h-28
                    w-28
                    rounded-full
                    bg-[var(--accent-light)]/8
                    blur-2xl
                    opacity-70
                    transition-opacity
                    duration-300
                    group-hover:opacity-100
                    dark:bg-[var(--accent-light)]/10
                  "
                />

                <div className="relative">
                  <div
                    className="
                      text-3xl
                      font-semibold
                      tracking-tight
                      text-[var(--accent)]
                      md:text-[34px]
                    "
                  >
                    {item.value}
                  </div>

                  <div
                    className="
                      mt-2
                      text-sm
                      font-semibold
                      leading-relaxed
                      text-[var(--text-muted)]
                    "
                  >
                    {item.label}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
}