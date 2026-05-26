"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { reveal, viewport } from "@/lib/motion";

export function ContactMap() {
  const [copied, setCopied] = useState(false);

  const address = "г. Мурино, Воронцовский бульвар, 2";
  const phone = "+78126026160";

  const copyAddress = async () => {
    await navigator.clipboard.writeText(address);
    setCopied(true);

    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <motion.section
      id="contact"
      className="relative overflow-hidden py-32"
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      variants={reveal}
    >

      {/* BACKGROUND */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">

        <div
          className="
            absolute
            left-[-180px]
            top-[80px]
            h-[420px]
            w-[420px]
            rounded-full
            bg-[#12c7b7]/12
            blur-3xl
          "
        />

        <div
          className="
            absolute
            right-[-120px]
            bottom-[-120px]
            h-[360px]
            w-[360px]
            rounded-full
            bg-[#12c7b7]/10
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
            Контакты
          </span>

          <h2
            className="
              mt-6
              text-4xl
              font-semibold
              text-[#0f8f84]
              md:text-6xl
            "
          >
            Как нас найти
          </h2>

          <p className="mt-6 text-lg leading-relaxed text-zinc-600">
            Удобное расположение в Мурино.
            Мы всегда остаёмся на связи и готовы помочь.
          </p>

        </div>

        {/* GRID */}
        <div className="mt-16 grid gap-10 lg:grid-cols-2">

          {/* LEFT */}
          <div className="space-y-6">

            {/* ADDRESS */}
            <div
              className="
                rounded-[30px]
                border border-[#12c7b7]/15
                bg-white/80
                p-7
                backdrop-blur-xl
                shadow-[0_10px_40px_rgba(18,199,183,0.08)]
              "
            >

              <div className="text-sm uppercase tracking-[0.2em] text-[#0f8f84]">
                Адрес
              </div>

              <div className="mt-3 text-xl font-semibold text-[#0f8f84]">
                {address}
              </div>

              <button
                onClick={copyAddress}
                className="
                  mt-5
                  text-sm
                  text-zinc-500
                  underline
                  underline-offset-4
                  transition
                  hover:text-[#0f8f84]
                "
              >
                {copied ? "Скопировано ✓" : "Скопировать адрес"}
              </button>

            </div>

            {/* PHONE */}
            <div
              className="
                rounded-[30px]
                border border-[#12c7b7]/15
                bg-white/80
                p-7
                backdrop-blur-xl
                shadow-[0_10px_40px_rgba(18,199,183,0.08)]
              "
            >

              <div className="text-sm uppercase tracking-[0.2em] text-[#0f8f84]">
                Телефон
              </div>

              <div className="mt-3 text-xl font-semibold text-[#0f8f84]">
                +7 (812) 602-61-60
              </div>

              <a
                href={`tel:${phone}`}
                className="
                  mt-5
                  inline-block
                  text-sm
                  text-zinc-500
                  underline
                  underline-offset-4
                  transition
                  hover:text-[#0f8f84]
                "
              >
                Позвонить
              </a>

            </div>

            {/* HOURS */}
            <div
              className="
                rounded-[30px]
                border border-[#12c7b7]/15
                bg-white/80
                p-7
                backdrop-blur-xl
                shadow-[0_10px_40px_rgba(18,199,183,0.08)]
              "
            >

              <div className="text-sm uppercase tracking-[0.2em] text-[#0f8f84]">
                Время работы
              </div>

              <div className="mt-3 text-xl font-semibold text-[#0f8f84]">
                Ежедневно: 10:00 – 21:00
              </div>

            </div>

            {/* CTA */}
            <div className="flex flex-wrap gap-4">

              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`}
                target="_blank"
                className="
                  rounded-full
                  bg-[#12c7b7]
                  px-7 py-3.5
                  text-sm
                  font-medium
                  text-white
                  shadow-lg
                  shadow-[#12c7b7]/25
                  transition-all
                  duration-300
                  hover:bg-[#10b3a5]
                  hover:-translate-y-[2px]
                "
              >
                Построить маршрут
              </a>

              <a
                href={`tel:${phone}`}
                className="
                  rounded-full
                  border border-[#12c7b7]/20
                  bg-white
                  px-7 py-3.5
                  text-sm
                  font-medium
                  text-[#0f8f84]
                  transition-all
                  duration-300
                  hover:bg-[#12c7b7]
                  hover:text-white
                "
              >
                Позвонить
              </a>

            </div>

          </div>

          {/* RIGHT — MAP */}
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="
              relative
              overflow-hidden
              rounded-[36px]
              border border-[#12c7b7]/15
              bg-white
              shadow-[0_20px_80px_rgba(18,199,183,0.12)]
            "
          >

            {/* glow */}
            <div
              className="
                absolute
                right-[-80px]
                top-[-80px]
                h-[240px]
                w-[240px]
                rounded-full
                bg-[#12c7b7]/15
                blur-3xl
              "
            />

            {/* overlay */}
            <div
              className="
                pointer-events-none
                absolute
                inset-0
                bg-gradient-to-t
                from-[#12c7b7]/10
                via-transparent
                to-transparent
              "
            />

            {/* CARD */}
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="
                absolute
                bottom-5
                left-5
                z-10
                rounded-2xl
                border border-[#12c7b7]/15
                bg-white/90
                px-5 py-4
                backdrop-blur-xl
              "
            >

              <div className="font-semibold text-[#0f8f84]">
                OLGA Dental Clinic
              </div>

              <div className="mt-1 text-xs uppercase tracking-[0.15em] text-zinc-500">
                Мурино
              </div>

            </motion.div>

            <iframe
              src={`https://www.google.com/maps?q=${encodeURIComponent(address)}&output=embed`}
              className="h-[460px] w-full"
              loading="lazy"
            />

          </motion.div>

        </div>

      </div>
    </motion.section>
  );
}