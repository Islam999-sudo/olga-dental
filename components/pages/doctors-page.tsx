"use client";

import { useState } from "react";

import { doctors, Doctor } from "@/data/doctors";
import { DoctorModal } from "@/components/ui/doctor-modal";

export function DoctorsPage() {
  const [selectedDoctor, setSelectedDoctor] =
    useState<Doctor | null>(null);

  return (
    <main className="relative min-h-screen overflow-hidden pt-32 pb-24">
      {/* BACKGROUND */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-[-150px] top-[120px] h-[420px] w-[420px] rounded-full bg-[var(--accent-light)]/10 blur-3xl" />

        <div className="absolute right-[-120px] bottom-[120px] h-[360px] w-[360px] rounded-full bg-[var(--accent-light)]/10 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        {/* HERO */}
        <div className="mx-auto max-w-4xl text-center">
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
              font-medium
              uppercase
              tracking-[0.25em]
              text-[var(--accent)]
            "
          >
            Специалисты
          </span>

          <h1
            className="
              mt-6
              text-5xl
              font-semibold
              tracking-tight
              text-[var(--accent)]
              md:text-7xl
            "
          >
            Врачи клиники
          </h1>

          <p
            className="
              mx-auto
              mt-6
              max-w-2xl
              text-lg
              leading-relaxed
              text-[var(--text-soft)]
            "
          >
            Команда специалистов, объединяющая опыт,
            современные технологии и индивидуальный подход
            к каждому пациенту.
          </p>
        </div>

        {/* DOCTORS GRID */}
        <div className="mt-20 grid gap-8 md:grid-cols-2">
          {doctors.map((doctor) => (
            <div
              key={doctor.name}
              className="
                group
                overflow-hidden
                rounded-[34px]
                border
                border-[var(--accent-light)]/15
                bg-[var(--card)]
                shadow-[0_20px_80px_rgba(18,199,183,0.08)]
                backdrop-blur-xl
                transition-all
                duration-500
                hover:-translate-y-1
                hover:border-[var(--accent-light)]/30
              "
            >
              <div className="grid md:grid-cols-[220px_1fr]">
                <div className="relative h-[320px] md:h-full">
                  <img
                    src={doctor.image}
                    alt={doctor.name}
                    className="h-full w-full object-cover"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" />
                </div>

                <div className="p-6">
                  <div
                    className="
                      text-xs
                      uppercase
                      tracking-[0.22em]
                      text-[var(--accent)]
                    "
                  >
                    {doctor.role}
                  </div>

                  <h3
                    className="
                      mt-3
                      text-2xl
                      font-semibold
                      text-[var(--foreground)]
                    "
                  >
                    {doctor.name}
                  </h3>

                  <p className="mt-2 text-sm text-[var(--text-muted)]">
                    {doctor.exp}
                  </p>

                  <p
                    className="
                      mt-4
                      text-sm
                      leading-relaxed
                      text-[var(--text-soft)]
                    "
                  >
                    {doctor.desc}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {doctor.specialization
                      .slice(0, 3)
                      .map((spec) => (
                        <span
                          key={spec}
                          className="
                            rounded-full
                            border
                            border-[var(--accent-light)]/20
                            bg-[var(--accent-light)]/8
                            px-3
                            py-1
                            text-xs
                            text-[var(--text-soft)]
                          "
                        >
                          {spec}
                        </span>
                      ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => setSelectedDoctor(doctor)}
                    className="
                      mt-6
                      rounded-2xl
                      bg-[var(--accent-light)]
                      px-5
                      py-3
                      text-sm
                      font-semibold
                      text-[#071412]
                      shadow-[0_12px_40px_rgba(18,199,183,0.25)]
                      transition-all
                      duration-300
                      hover:-translate-y-[2px]
                    "
                  >
                    Подробнее
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedDoctor && (
        <DoctorModal
          doctor={selectedDoctor}
          onClose={() => setSelectedDoctor(null)}
          onBook={() => {
            setSelectedDoctor(null);
          }}
        />
      )}
    </main>
  );
}