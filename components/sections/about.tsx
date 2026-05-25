"use client";

import { motion } from "framer-motion";
import { reveal, viewport } from "@/lib/motion";

export function About() {
  return (
    <motion.section
      id="about"
      className="relative py-32"
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      variants={reveal}
    >
      <div className="mx-auto max-w-7xl px-6">

        <div className="grid gap-16 lg:grid-cols-2 lg:items-start">

          <div>
            <span className="text-xs font-medium tracking-[0.25em] text-zinc-500 uppercase">
              О клинике
            </span>

            <h2 className="mt-4 text-4xl font-semibold tracking-tight text-zinc-900 md:text-5xl">
              Современный подход
              <br />
              к стоматологии
            </h2>

            <p className="mt-6 text-lg leading-relaxed text-zinc-600">
              Мы объединяем цифровые технологии, клинический опыт и внимательное
              отношение к пациенту.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6">

            <div className="rounded-[24px] border border-zinc-200 bg-white p-6 shadow-sm">
              <div className="text-3xl font-semibold">15+</div>
              <div className="mt-2 text-sm text-zinc-500">лет опыта</div>
            </div>

            <div className="rounded-[24px] border border-zinc-200 bg-white p-6 shadow-sm">
              <div className="text-3xl font-semibold">12 000+</div>
              <div className="mt-2 text-sm text-zinc-500">пациентов</div>
            </div>

            <div className="rounded-[24px] border border-zinc-200 bg-white p-6 shadow-sm">
              <div className="text-3xl font-semibold">4.9</div>
              <div className="mt-2 text-sm text-zinc-500">рейтинг</div>
            </div>

            <div className="rounded-[24px] border border-zinc-200 bg-white p-6 shadow-sm">
              <div className="text-3xl font-semibold">100%</div>
              <div className="mt-2 text-sm text-zinc-500">цифровая диагностика</div>
            </div>

          </div>

        </div>

      </div>
    </motion.section>
  );
}