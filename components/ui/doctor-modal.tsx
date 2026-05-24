"use client";

import { Doctor } from "@/data/doctors";

type Props = {
  doctor: Doctor;
  onClose: () => void;
};

export function DoctorModal({ doctor, onClose }: Props) {
  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center px-6">

      {/* overlay */}
      <div
        className="absolute inset-0 bg-zinc-900/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* modal */}
      <div className="relative w-full max-w-4xl overflow-hidden rounded-[32px] bg-white shadow-2xl">

        <div className="grid md:grid-cols-2">

          {/* IMAGE */}
          <div className="relative h-[420px] overflow-hidden bg-zinc-100">
            <img
              src={doctor.image}
              alt={doctor.name}
              className="h-full w-full object-cover object-top"
            />
          </div>

          {/* CONTENT */}
          <div className="flex flex-col justify-center p-10">

            <h2 className="text-3xl font-semibold text-zinc-900">
              {doctor.name}
            </h2>

            <p className="mt-2 text-sm text-zinc-500">
              {doctor.role} • {doctor.exp}
            </p>

            <p className="mt-6 text-sm leading-relaxed text-zinc-600">
              {doctor.desc}
            </p>

            {/* INFO */}
            <div className="mt-8 space-y-3">
              <div className="rounded-xl bg-zinc-50 p-4 text-sm">
                ✓ Современные методы лечения
              </div>
              <div className="rounded-xl bg-zinc-50 p-4 text-sm">
                ✓ Индивидуальный подход
              </div>
              <div className="rounded-xl bg-zinc-50 p-4 text-sm">
                ✓ Цифровая диагностика
              </div>
            </div>

            {/* ACTIONS */}
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