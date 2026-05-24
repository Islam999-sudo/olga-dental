"use client";

import { useState } from "react";
import { motion } from "framer-motion";

type Doctor = {
  name: string;
  image: string;
  role: string;
  exp: string;
  desc: string;
};

export function Doctors() {
  const [selected, setSelected] = useState<Doctor | null>(null);

  const doctors: Doctor[] = [
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
    <section id="doctors" className="relative py-32">
      <div className="mx-auto max-w-7xl px-6">

        {/* HEADER */}
        <div className="max-w-3xl">
          <h2 className="text-4xl md:text-6xl font-semibold text-zinc-900">
            Врачи
          </h2>

          <p className="mt-4 text-lg text-zinc-600">
            Опытная команда специалистов.
          </p>
        </div>

        {/* GRID */}
        <div className="mt-14 grid gap-8 lg:grid-cols-3">

          {doctors.map((d, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.3 }}
              className="group relative h-[520px] overflow-hidden rounded-[36px] shadow-soft-lg"
            >

              {/* IMAGE BACKGROUND */}
              <div className="absolute inset-0">
                <img
                  src={d.image}
                  alt={d.name}
                  className="h-full w-full object-cover object-top transition duration-700 group-hover:scale-110"
                />

                {/* dark gradient for readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
              </div>

              {/* CONTENT */}
              <div className="relative flex h-full flex-col justify-end p-7 text-white">

                <h3 className="text-2xl font-semibold">
                  {d.name}
                </h3>

                <p className="mt-1 text-sm text-white/80">
                  {d.role} • {d.exp}
                </p>

                <p className="mt-4 text-sm text-white/80 leading-relaxed">
                  {d.desc}
                </p>

                {/* BUTTON */}
                <button
                  onClick={() => setSelected(d)}
                  className="mt-6 w-fit rounded-full bg-white/90 px-5 py-2 text-sm font-medium text-zinc-900 backdrop-blur transition hover:bg-white"
                >
                  Подробнее
                </button>

              </div>

            </motion.div>
          ))}

        </div>
      </div>

      {/* MODAL */}
      {selected && (
        <DoctorModal
          doctor={selected}
          onClose={() => setSelected(null)}
        />
      )}
    </section>
  );
}





function DoctorModal({
  doctor,
  onClose,
}: {
  doctor: Doctor;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center px-6">

      {/* softer overlay (не "кинотеатр") */}
      <div
        className="absolute inset-0 bg-zinc-900/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* modal card */}
      <div className="relative z-[1000] w-full max-w-4xl overflow-hidden rounded-[32px] bg-white shadow-2xl">

        <div className="grid md:grid-cols-2">

          {/* IMAGE SIDE */}
          <div className="relative h-[420px] md:h-full overflow-hidden bg-zinc-100">

            <img
              src={doctor.image}
              alt={doctor.name}
              className="h-full w-full object-cover object-top transition duration-700"
            />

            {/* subtle gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
          </div>

          {/* CONTENT SIDE */}
          <div className="p-8 md:p-10 flex flex-col justify-center">

            <span className="text-xs uppercase tracking-[0.2em] text-zinc-400">
              Врач
            </span>

            <h2 className="mt-4 text-3xl font-semibold text-zinc-900">
              {doctor.name}
            </h2>

            <p className="mt-2 text-sm text-zinc-500">
              {doctor.role} • {doctor.exp}
            </p>

            <p className="mt-6 text-sm leading-relaxed text-zinc-600">
              {doctor.desc}
            </p>

            {/* info blocks */}
            <div className="mt-8 space-y-3">

              <div className="rounded-xl bg-zinc-50 p-4 text-sm text-zinc-700">
                ✓ Современные методы лечения
              </div>

              <div className="rounded-xl bg-zinc-50 p-4 text-sm text-zinc-700">
                ✓ Индивидуальный подход
              </div>

              <div className="rounded-xl bg-zinc-50 p-4 text-sm text-zinc-700">
                ✓ Цифровая диагностика
              </div>

            </div>

            {/* actions */}
            <div className="mt-10 flex gap-3">

              <button
                onClick={onClose}
                className="flex-1 rounded-xl border border-zinc-200 py-3 text-sm text-zinc-700 hover:bg-zinc-100"
              >
                Закрыть
              </button>

              <button className="flex-1 rounded-xl bg-zinc-900 py-3 text-sm text-white hover:bg-zinc-700">
                Записаться
              </button>

            </div>

          </div>
        </div>
      </div>
    </div>
  );
}