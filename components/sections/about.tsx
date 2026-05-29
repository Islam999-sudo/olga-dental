"use client";

import { motion } from "framer-motion";

const features = [
  {
    title: "Цифровая диагностика",
    desc: "Современные технологии позволяют планировать лечение максимально точно.",
  },
  {
    title: "Опытные специалисты",
    desc: "Команда врачей различных направлений для комплексного подхода.",
  },
  {
    title: "Современное оборудование",
    desc: "Безопасные и эффективные методы лечения с высоким уровнем комфорта.",
  },
  {
    title: "Индивидуальный подход",
    desc: "Каждый план лечения подбирается с учётом особенностей пациента.",
  },
];

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

export function About() {
  return (
    <section
      id="about"
      className="relative overflow-hidden py-32"
    >
      {/* BACKGROUND */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="
            absolute
            left-[-160px]
            top-[80px]
            h-[420px]
            w-[420px]
            rounded-full
            bg-[var(--accent-light)]/10
            blur-3xl
          "
        />

        <div
          className="
            absolute
            right-[-120px]
            bottom-[-80px]
            h-[360px]
            w-[360px]
            rounded-full
            bg-[var(--accent-light)]/8
            blur-3xl
          "
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-6">

        {/* HEADER */}
        <div className="max-w-3xl">
          <span
            className="
              inline-flex
              rounded-full
              border border-[var(--accent-light)]/20
              bg-[var(--accent-light)]/10
              px-4 py-2
              text-xs font-semibold uppercase tracking-[0.25em]
              text-[var(--accent)]
              backdrop-blur
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
              md:text-6xl
            "
          >
            Стоматология,
            <br />
            где технологии работают
            <br />
            на комфорт пациента
          </h2>

          <p
            className="
              mt-6
              max-w-2xl
              text-lg
              font-semibold
              leading-relaxed
              text-[var(--text-soft)]
            "
          >
            Мы объединяем современные технологии,
            клинический опыт и внимательное отношение,
            чтобы лечение было комфортным,
            понятным и предсказуемым.
          </p>
        </div>

        {/* FEATURES */}
        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {features.map((item) => (
            <motion.div
              key={item.title}
              whileHover={{ y: -4 }}
              className="
                rounded-[30px]
                border
                border-[var(--accent-light)]/15
                bg-[var(--card)]
                p-7
                shadow-[0_14px_40px_rgba(18,199,183,0.06)]
                backdrop-blur-xl
              "
            >
              <div
                className="
                  text-lg
                  font-semibold
                  text-[var(--accent)]
                "
              >
                {item.title}
              </div>

              <p
                className="
                  mt-3
                  text-sm
                  leading-relaxed
                  text-[var(--text-muted)]
                "
              >
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* BUTTON */}
        <div className="mt-12 flex justify-center">
          <a
            href="/about"
            className="
              group
              relative
              overflow-hidden

              rounded-full

              border
              border-[var(--accent-light)]/20

              bg-[var(--card)]

              px-8
              py-4

              text-sm
              font-semibold

              text-[var(--accent)]

              shadow-[0_10px_40px_rgba(18,199,183,0.08)]

              transition-all
              duration-500

              hover:-translate-y-1
              hover:border-[var(--accent-light)]/40
              hover:shadow-[0_20px_60px_rgba(18,199,183,0.18)]
            "
          >
            <span className="relative flex items-center gap-3">
              Подробнее о клинике

              <span
                className="
                  transition-transform
                  duration-300
                  group-hover:translate-x-1
                "
              >
                →
              </span>
            </span>
          </a>
        </div>

        {/* STATS */}
        <div className="mt-20 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((item) => (
            <div
              key={item.label}
              className="
                rounded-[30px]
                border
                border-[var(--accent-light)]/15
                bg-[var(--card)]
                p-7
                text-center
                shadow-[0_14px_40px_rgba(18,199,183,0.06)]
                backdrop-blur-xl
              "
            >
              <div
                className="
                  text-4xl
                  font-semibold
                  text-[var(--accent)]
                "
              >
                {item.value}
              </div>

              <div
                className="
                  mt-2
                  text-sm
                  font-medium
                  text-[var(--text-muted)]
                "
              >
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}