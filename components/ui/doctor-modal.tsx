"use client";

import { Doctor } from "@/data/doctors";

type Props = {
  doctor: Doctor;
  onClose: () => void;
  onBook: (doctor: Doctor) => void;
};

export function DoctorModal({
  doctor,
  onClose,
  onBook,
}: Props) {
  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center px-6">

      {/* OVERLAY */}
      <div
        className="
          absolute inset-0
          bg-[#0f766e]/20
          backdrop-blur-md
        "
        onClick={onClose}
      />

      {/* MODAL */}
      <div
        className="
          relative
          w-full
          max-w-5xl
          overflow-hidden
          rounded-[40px]
          border border-[#12c7b7]/15
          bg-white
          shadow-[0_30px_120px_rgba(18,199,183,0.18)]
        "
      >

        {/* glow */}
        <div
          className="
            pointer-events-none
            absolute
            right-[-120px]
            top-[-120px]
            h-[320px]
            w-[320px]
            rounded-full
            bg-[#12c7b7]/10
            blur-3xl
          "
        />

        <div className="grid md:grid-cols-2">

          {/* IMAGE */}
          <div
            className="
              relative
              h-[520px]
              overflow-hidden
              bg-[#dffaf7]
              md:h-full
            "
          >

            <img
              src={doctor.image}
              alt={doctor.name}
              className="
                h-full
                w-full
                scale-105
                object-cover
                transition
                duration-700
              "
              style={{
                objectPosition: "50% 20%",
              }}
            />

            {/* turquoise gradient */}
            <div
              className="
                absolute inset-0
                bg-gradient-to-t
                from-[#0f8f84]/60
                via-transparent
                to-transparent
              "
            />

            {/* EXPERIENCE */}
            <div className="absolute bottom-6 left-6 text-white">

              <div className="text-sm opacity-80">
                Стаж
              </div>

              <div className="text-2xl font-semibold">
                {doctor.exp}
              </div>

            </div>

          </div>

          {/* CONTENT */}
          <div className="relative flex flex-col justify-center p-10">

            <span
              className="
                text-xs
                uppercase
                tracking-[0.25em]
                text-[#0f8f84]
              "
            >
              Врач клиники
            </span>

            <h2
              className="
                mt-4
                text-4xl
                font-semibold
                text-[#0f766e]
              "
            >
              {doctor.name}
            </h2>

            <p className="mt-2 text-sm text-[#12a89d]">
              {doctor.role}
            </p>

            <p
              className="
                mt-6
                text-sm
                leading-relaxed
                text-zinc-600
              "
            >
              {doctor.desc}
            </p>

            {/* EDUCATION */}
            {doctor.education && (
              <div
                className="
                  mt-6
                  rounded-2xl
                  border border-[#12c7b7]/15
                  bg-[#12c7b7]/5
                  p-4
                  text-sm
                  text-[#0f766e]
                "
              >
                🎓 {doctor.education}
              </div>
            )}

            {/* SPECIALIZATION */}
            <div className="mt-6">

              <div
                className="
                  text-xs
                  uppercase
                  tracking-[0.2em]
                  text-[#12a89d]
                "
              >
                Специализация
              </div>

              <div className="mt-3 flex flex-wrap gap-2">

                {doctor.specialization.map((s, i) => (
                  <span
                    key={i}
                    className="
                      rounded-full
                      border border-[#12c7b7]/20
                      bg-[#12c7b7]/5
                      px-3 py-1
                      text-xs
                      text-[#0f766e]
                    "
                  >
                    {s}
                  </span>
                ))}

              </div>

            </div>

            {/* HIGHLIGHTS */}
            <div className="mt-6 space-y-2">

              {doctor.highlights.map((h, i) => (
                <div
                  key={i}
                  className="
                    rounded-xl
                    border border-[#12c7b7]/15
                    bg-white
                    p-3
                    text-sm
                    text-[#0f766e]
                    shadow-[0_4px_20px_rgba(18,199,183,0.05)]
                  "
                >
                  ✓ {h}
                </div>
              ))}

            </div>

            {/* ACTIONS */}
            <div className="mt-10 flex gap-3">

              <button
                onClick={onClose}
                className="
                  flex-1
                  rounded-xl
                  border border-[#12c7b7]/20
                  bg-white
                  py-3
                  text-sm
                  font-medium
                  text-[#0f766e]
                  transition
                  hover:bg-[#12c7b7]/5
                "
              >
                Закрыть
              </button>

              <button
                onClick={() => onBook(doctor)}
                className="
                  flex-1
                  rounded-xl
                  bg-[#12c7b7]
                  py-3
                  text-sm
                  font-medium
                  text-white
                  shadow-lg
                  shadow-[#12c7b7]/30
                  transition
                  hover:bg-[#10b3a5]
                "
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