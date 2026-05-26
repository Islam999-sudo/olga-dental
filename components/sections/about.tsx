"use client";

import { motion } from "framer-motion";
import { reveal, viewport } from "@/lib/motion";

export function About() {
  return (
    <motion.section
      id="about"
      className="relative overflow-hidden py-32"
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      variants={reveal}
    >

      {/* BACKGROUND */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">

        <div
          className="
            absolute
            left-[-120px]
            top-[120px]
            h-[420px]
            w-[420px]
            rounded-full
            bg-[#12c7b7]/10
            blur-3xl
          "
        />

        <div
          className="
            absolute
            right-[-120px]
            bottom-[-60px]
            h-[360px]
            w-[360px]
            rounded-full
            bg-[#12c7b7]/10
            blur-3xl
          "
        />

      </div>

      <div className="relative mx-auto max-w-7xl px-6">

        <div className="grid gap-16 lg:grid-cols-2 lg:items-start">

          {/* LEFT */}
          <div>

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
                tracking-[0.25em]
                text-[#0f8f84]
              "
            >
              О клинике
            </span>

            <h2
              className="
                mt-6
                text-4xl
                font-semibold
                tracking-tight
                text-[#0f8f84]
                md:text-5xl
              "
            >
              Современный подход
              <br />
              к стоматологии
            </h2>

            <p className="mt-6 text-lg leading-relaxed text-zinc-600">
              Мы объединяем цифровые технологии, клинический опыт и внимательное
              отношение к пациенту.
            </p>

          </div>

          {/* RIGHT */}
          <div className="grid grid-cols-2 gap-6">

            {/* CARD */}
            <motion.div
              whileHover={{ y: -5 }}
              className="
                rounded-[28px]
                border border-[#12c7b7]/15
                bg-white/80
                p-6
                shadow-[0_10px_40px_rgba(18,199,183,0.08)]
                backdrop-blur-xl
                transition-all
                duration-300
                hover:border-[#12c7b7]/30
                hover:shadow-[0_20px_60px_rgba(18,199,183,0.14)]
              "
            >
              <div className="text-3xl font-semibold text-[#0f8f84]">
                15+
              </div>

              <div className="mt-2 text-sm text-zinc-500">
                лет опыта
              </div>
            </motion.div>

            {/* CARD */}
            <motion.div
              whileHover={{ y: -5 }}
              className="
                rounded-[28px]
                border border-[#12c7b7]/15
                bg-white/80
                p-6
                shadow-[0_10px_40px_rgba(18,199,183,0.08)]
                backdrop-blur-xl
                transition-all
                duration-300
                hover:border-[#12c7b7]/30
                hover:shadow-[0_20px_60px_rgba(18,199,183,0.14)]
              "
            >
              <div className="text-3xl font-semibold text-[#0f8f84]">
                12 000+
              </div>

              <div className="mt-2 text-sm text-zinc-500">
                пациентов
              </div>
            </motion.div>

            {/* CARD */}
            <motion.div
              whileHover={{ y: -5 }}
              className="
                rounded-[28px]
                border border-[#12c7b7]/15
                bg-white/80
                p-6
                shadow-[0_10px_40px_rgba(18,199,183,0.08)]
                backdrop-blur-xl
                transition-all
                duration-300
                hover:border-[#12c7b7]/30
                hover:shadow-[0_20px_60px_rgba(18,199,183,0.14)]
              "
            >
              <div className="text-3xl font-semibold text-[#0f8f84]">
                4.9
              </div>

              <div className="mt-2 text-sm text-zinc-500">
                рейтинг
              </div>
            </motion.div>

            {/* CARD */}
            <motion.div
              whileHover={{ y: -5 }}
              className="
                rounded-[28px]
                border border-[#12c7b7]/15
                bg-white/80
                p-6
                shadow-[0_10px_40px_rgba(18,199,183,0.08)]
                backdrop-blur-xl
                transition-all
                duration-300
                hover:border-[#12c7b7]/30
                hover:shadow-[0_20px_60px_rgba(18,199,183,0.14)]
              "
            >
              <div className="text-3xl font-semibold text-[#0f8f84]">
                100%
              </div>

              <div className="mt-2 text-sm text-zinc-500">
                цифровая диагностика
              </div>
            </motion.div>

          </div>

        </div>

      </div>
    </motion.section>
  );
}