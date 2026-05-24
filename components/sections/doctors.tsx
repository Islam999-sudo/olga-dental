"use client";

import { useState } from "react";
import { motion } from "framer-motion";

import { doctors, Doctor } from "@/data/doctors";
import { DoctorModal } from "../ui/doctor-modal";

export function Doctors() {
  const [selected, setSelected] = useState<Doctor | null>(null);

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

              {/* IMAGE */}
              <img
                src={d.image}
                alt={d.name}
                className="absolute inset-0 h-full w-full object-cover object-top transition duration-700 group-hover:scale-110"
              />

              {/* GRADIENT */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

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

                <button
                  onClick={() => setSelected(d)}
                  className="mt-6 w-fit rounded-full bg-white/90 px-5 py-2 text-sm font-medium text-zinc-900"
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