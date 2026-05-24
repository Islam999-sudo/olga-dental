"use client";

import { Doctor } from "@/data/doctors";

type Props = {
  doctor: Doctor;
  onClose: () => void;
  onBook: (doctor: Doctor) => void;
};

export function DoctorModal({ doctor, onClose, onBook }: Props) {
  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center px-6">

      {/* overlay */}
      <div
        className="absolute inset-0 bg-zinc-900/50 backdrop-blur-md"
        onClick={onClose}
      />

      {/* modal */}
      <div className="relative w-full max-w-5xl overflow-hidden rounded-[36px] bg-white shadow-2xl">

        <div className="grid md:grid-cols-2">

          {/* IMAGE */}
          <div className="relative h-[520px] md:h-full overflow-hidden bg-zinc-100">

            <img
              src={doctor.image}
              alt={doctor.name}
              className="h-full w-full scale-105 object-cover transition duration-700"
              style={{ objectPosition: "50% 20%" }}
            />

            {/* subtle gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />

            {/* experience */}
            <div className="absolute bottom-6 left-6 text-white">
              <div className="text-sm opacity-80">Стаж</div>
              <div className="text-2xl font-semibold">{doctor.exp}</div>
            </div>

          </div>

          {/* CONTENT */}
          <div className="flex flex-col justify-center p-10">

            <span className="text-xs uppercase tracking-[0.25em] text-zinc-400">
              Врач клиники
            </span>

            <h2 className="mt-4 text-4xl font-semibold text-zinc-900">
              {doctor.name}
            </h2>

            <p className="mt-2 text-sm text-zinc-500">
              {doctor.role}
            </p>

            <p className="mt-6 text-sm text-zinc-600 leading-relaxed">
              {doctor.desc}
            </p>

            {/* education */}
            {doctor.education && (
              <div className="mt-6 rounded-2xl bg-zinc-50 p-4 text-sm text-zinc-700">
                🎓 {doctor.education}
              </div>
            )}

            {/* specialization */}
            <div className="mt-6">
              <div className="text-xs uppercase tracking-[0.2em] text-zinc-400">
                Специализация
              </div>

              <div className="mt-3 flex flex-wrap gap-2">
                {doctor.specialization.map((s, i) => (
                  <span
                    key={i}
                    className="rounded-full border border-zinc-200 px-3 py-1 text-xs text-zinc-700"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {/* highlights */}
            <div className="mt-6 space-y-2">
              {doctor.highlights.map((h, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-zinc-200 bg-white p-3 text-sm text-zinc-700"
                >
                  ✓ {h}
                </div>
              ))}
            </div>

            {/* actions */}
            <div className="mt-10 flex gap-3">

              <button
                onClick={onClose}
                className="flex-1 rounded-xl border border-zinc-200 py-3 text-sm text-zinc-700 hover:bg-zinc-100"
              >
                Закрыть
              </button>

              <button
                onClick={() => onBook(doctor)}
                className="flex-1 rounded-xl bg-zinc-900 py-3 text-sm text-white hover:bg-zinc-700"
              >
                Записаться
              </button>

            </div>

          </div>

        </div>
      </div>
    </div>
  );
}