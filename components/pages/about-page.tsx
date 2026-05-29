"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const features = [
  {
    title: "Современные технологии",
    desc: "Используем цифровую диагностику и современные методы лечения для достижения предсказуемого результата.",
  },
  {
    title: "Опытная команда",
    desc: "Специалисты разных направлений работают совместно для комплексного подхода к лечению.",
  },
  {
    title: "Комфорт пациентов",
    desc: "Мы уделяем внимание не только качеству лечения, но и атмосфере во время каждого визита.",
  },
  {
    title: "Индивидуальный подход",
    desc: "Каждый план лечения формируется с учётом особенностей конкретного пациента.",
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
    label: "средний рейтинг",
  },
  {
    value: "100%",
    label: "цифровая диагностика",
  },
];

export function AboutPageContent() {
  return (
    <main className="relative overflow-hidden">

      {/* HERO */}
      <section className="relative overflow-hidden pt-36 pb-24">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">

          <div
            className="
              absolute
              left-[-140px]
              top-[80px]
              h-[420px]
              w-[420px]
              rounded-full
              bg-[var(--accent-light)]/12
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
              bg-[var(--accent-light)]/10
              blur-3xl
            "
          />
        </div>

        <div className="relative mx-auto max-w-7xl px-6">
          <div className="max-w-4xl">

            <span
              className="
                inline-flex
                rounded-full
                border
                border-[var(--accent-light)]/20
                bg-[var(--accent-light)]/10
                px-4
                py-2
                text-xs
                font-semibold
                uppercase
                tracking-[0.25em]
                text-[var(--accent)]
              "
            >
              О КЛИНИКЕ
            </span>

            <h1
              className="
                mt-8
                text-5xl
                font-semibold
                tracking-tight
                text-[var(--accent)]
                md:text-7xl
              "
            >
              Современная
              <br />
              стоматология
              <br />
              нового поколения
            </h1>

            <p
              className="
                mt-8
                max-w-3xl
                text-xl
                font-medium
                leading-relaxed
                text-[var(--text-soft)]
              "
            >
              Мы создаём пространство, где современные технологии,
              профессионализм врачей и забота о пациенте работают вместе,
              чтобы лечение было комфортным, понятным и эффективным.
            </p>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6">

          <h2
            className="
              text-center
              text-4xl
              font-semibold
              text-[var(--accent)]
            "
          >
            Наш подход
          </h2>

          <div className="mt-14 grid gap-6 md:grid-cols-2">
            {features.map((item) => (
              <motion.div
                key={item.title}
                whileHover={{ y: -4 }}
                className="
                  rounded-[32px]
                  border
                  border-[var(--accent-light)]/15
                  bg-[var(--card)]
                  p-8
                  shadow-[0_14px_40px_rgba(18,199,183,0.06)]
                  backdrop-blur-xl
                "
              >
                <h3
                  className="
                    text-xl
                    font-semibold
                    text-[var(--accent)]
                  "
                >
                  {item.title}
                </h3>

                <p
                  className="
                    mt-4
                    leading-relaxed
                    text-[var(--text-muted)]
                  "
                >
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6">

          <h2
            className="
              text-center
              text-4xl
              font-semibold
              text-[var(--accent)]
            "
          >
            Клиника в цифрах
          </h2>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((item) => (
              <div
                key={item.label}
                className="
                  rounded-[32px]
                  border
                  border-[var(--accent-light)]/15
                  bg-[var(--card)]
                  p-8
                  text-center
                  shadow-[0_14px_40px_rgba(18,199,183,0.06)]
                  backdrop-blur-xl
                "
              >
                <div
                  className="
                    text-5xl
                    font-semibold
                    text-[var(--accent)]
                  "
                >
                  {item.value}
                </div>

                <div
                  className="
                    mt-3
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

      {/* CTA */}
      <section className="pb-32 pt-10">
        <div className="mx-auto max-w-5xl px-6">

          <div
            className="
              relative
              overflow-hidden
              rounded-[40px]
              border
              border-[var(--accent-light)]/20
              bg-[var(--card)]
              p-12
              text-center
              shadow-[0_20px_70px_rgba(18,199,183,0.08)]
            "
          >
            <div
              className="
                absolute
                left-1/2
                top-0
                h-[300px]
                w-[300px]
                -translate-x-1/2
                rounded-full
                bg-[var(--accent-light)]/10
                blur-3xl
              "
            />

            <div className="relative">
              <h2
                className="
                  text-4xl
                  font-semibold
                  text-[var(--accent)]
                "
              >
                Готовы начать лечение?
              </h2>

              <p
                className="
                  mx-auto
                  mt-5
                  max-w-2xl
                  text-lg
                  text-[var(--text-soft)]
                "
              >
                Запишитесь на консультацию и получите индивидуальный план лечения.
              </p>

              <Link
                href="/contact"
                className="
                  mt-8
                  inline-flex
                  rounded-full
                  bg-[var(--accent-light)]
                  px-8
                  py-4
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
                Записаться на консультацию
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}