"use client";

import { motion } from "framer-motion";

export function Doctors() {
  const doctors = [
    {
      name: "Ольга Сергеевна",
      role: "Главный врач",
      exp: "20 лет опыта",
      desc: "Эстетическая стоматология и сложные клинические случаи.",
    },
    {
      name: "Алексей Петров",
      role: "Ортопед",
      exp: "15 лет опыта",
      desc: "Протезирование и восстановление прикуса.",
    },
    {
      name: "Мария Иванова",
      role: "Терапевт",
      exp: "8 лет опыта",
      desc: "Лечение и реставрация зубов.",
    },
  ];

  return (
    <section
      id="doctors"
      className="relative overflow-hidden py-32"
    >
      {/* background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-[10%] top-[20%] h-[300px] w-[300px] rounded-full bg-white/40 blur-3xl" />
        <div className="absolute right-[5%] bottom-[10%] h-[260px] w-[260px] rounded-full bg-white/30 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6">

        {/* HEADER */}
        <div className="max-w-3xl">
          <span className="text-xs uppercase tracking-[0.25em] text-zinc-500">
            Специалисты
          </span>

          <h2 className="mt-4 text-4xl font-semibold tracking-tight text-zinc-900 md:text-6xl">
            Команда,
            <br />
            которой доверяют
          </h2>

          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-zinc-600">
            Наши врачи объединяют клинический опыт, современные технологии
            и внимательное отношение к каждому пациенту.
          </p>
        </div>

        {/* GRID */}
        <div className="mt-20 grid gap-8 lg:grid-cols-3">

          {doctors.map((doctor, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              whileHover={{ y: -6 }}
              className="group relative overflow-hidden rounded-[32px] border border-white/50 bg-white/70 p-8 backdrop-blur-xl shadow-soft-lg"
            >

              {/* glow */}
              <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                <div className="absolute -top-10 right-0 h-32 w-32 rounded-full bg-white/60 blur-3xl" />
              </div>

              {/* avatar */}
              <div className="relative flex h-20 w-20 items-center justify-center rounded-3xl bg-zinc-100 text-2xl font-semibold text-zinc-900">
                {doctor.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>

              {/* content */}
              <div className="relative mt-8">
                <h3 className="text-2xl font-semibold text-zinc-900">
                  {doctor.name}
                </h3>

                <div className="mt-2 flex items-center gap-3">
                  <span className="text-sm text-zinc-500">
                    {doctor.role}
                  </span>

                  <div className="h-1 w-1 rounded-full bg-zinc-300" />

                  <span className="text-sm font-medium text-zinc-700">
                    {doctor.exp}
                  </span>
                </div>

                <p className="mt-5 text-sm leading-relaxed text-zinc-600">
                  {doctor.desc}
                </p>
              </div>

            </motion.div>
          ))}

        </div>
      </div>
    </section>
  );
}