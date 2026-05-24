"use client";

import { motion } from "framer-motion";

export function Doctors() {
  const doctors = [
    {
      name: "Ольга Сергеевна",
      image: "/doctors/olga.png",
      role: "Главный врач",
      exp: "20 лет опыта",
      desc: "Эстетическая стоматология, сложные клинические случаи и цифровое планирование лечения.",
    },
    {
      name: "Алексей Петров",
      image: "/doctors/alexey.png",
      role: "Ортопед",
      exp: "15 лет опыта",
      desc: "Протезирование, восстановление прикуса и функциональная эстетика улыбки.",
    },
    {
      name: "Мария Иванова",
      image: "/doctors/maria.png",
      role: "Терапевт",
      exp: "8 лет опыта",
      desc: "Лечение, реставрация зубов и бережный подход к каждому пациенту.",
    },
  ];

  return (
    <section
      id="doctors"
      className="relative overflow-hidden py-32"
    >

      {/* background */}
      <div className="absolute inset-0 pointer-events-none">

        <div className="absolute left-[8%] top-[10%] h-[320px] w-[320px] rounded-full bg-white/40 blur-3xl" />

        <div className="absolute bottom-[5%] right-[5%] h-[280px] w-[280px] rounded-full bg-white/30 blur-3xl" />

      </div>

      <div className="relative mx-auto max-w-7xl px-6">

        {/* HEADER */}
        <div className="max-w-3xl">

          <span className="text-xs uppercase tracking-[0.3em] text-zinc-500">
            Специалисты
          </span>

          <h2 className="mt-5 text-4xl font-semibold tracking-tight text-zinc-900 md:text-6xl">
            Команда,
            <br />
            которой доверяют
          </h2>

          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-zinc-600">
            Наши специалисты объединяют клинический опыт,
            современные технологии и внимательное отношение
            к каждому пациенту.
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
              whileHover={{ y: -8 }}
              className="group relative overflow-hidden rounded-[38px] border border-white/60 bg-white/75 p-5 backdrop-blur-2xl shadow-soft-lg"
            >

              {/* hover glow */}
              <div className="absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100">

                <div className="absolute -right-10 top-0 h-40 w-40 rounded-full bg-white/70 blur-3xl" />

              </div>

              {/* IMAGE */}
              <div className="relative overflow-hidden rounded-[32px] aspect-[4/5]">

                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />

                {/* overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-70" />

              </div>

              {/* CONTENT */}
              <div className="relative px-2 pb-2 pt-7">

                {/* top row */}
                <div className="flex items-center justify-between gap-4">

                  <div>

                    <h3 className="text-2xl font-semibold tracking-tight text-zinc-900">
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

                  </div>

                </div>

                {/* description */}
                <p className="mt-6 text-sm leading-relaxed text-zinc-600">
                  {doctor.desc}
                </p>

                {/* bottom line */}
                <div className="mt-8 flex items-center justify-between border-t border-zinc-200 pt-5">

                  <div className="text-sm text-zinc-500">
                    Premium Specialist
                  </div>

                  <button
                    className="rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-900 transition hover:border-zinc-300 hover:bg-zinc-50"
                  >
                    Подробнее
                  </button>

                </div>

              </div>

            </motion.div>
          ))}

        </div>

      </div>
    </section>
  );
}