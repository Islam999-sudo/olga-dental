"use client";

import { useState } from "react";

import { doctors, Doctor } from "@/data/doctors";
import { DoctorModal } from "@/components/ui/doctor-modal";

type Props = {
  onBookDoctor: (doctor: Doctor) => void;
};

export function Doctors({ onBookDoctor }: Props) {
  const [active, setActive] = useState(0);
  const [selected, setSelected] = useState<Doctor | null>(null);

  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const next = () => {
    setActive((prev) => (prev + 1) % doctors.length);
  };

  const prev = () => {
    setActive((prev) => (prev - 1 + doctors.length) % doctors.length);
  };

  const getPrevDoctor = () => {
    return doctors[(active - 1 + doctors.length) % doctors.length];
  };

  const getNextDoctor = () => {
    return doctors[(active + 1) % doctors.length];
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;

    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        next();
      } else {
        prev();
      }
    }

    setTouchStartX(null);
  };

  const DoctorCard = ({
    doctor,
    variant = "main",
    onClick,
  }: {
    doctor: Doctor;
    variant?: "main" | "side" | "mobile";
    onClick: () => void;
  }) => {
    const isMain = variant === "main";
    const isMobile = variant === "mobile";

    return (
      <article
        onClick={onClick}
        className={`
          group
          relative
          cursor-pointer
          overflow-hidden
          rounded-[34px]
          border
          border-[var(--accent-light)]/15
          bg-[#071412]
          shadow-[0_24px_80px_rgba(18,199,183,0.14)]
          transition-all
          duration-300
          hover:-translate-y-2
          hover:shadow-[0_34px_100px_rgba(18,199,183,0.22)]
          ${isMobile ? "h-[455px] w-full max-w-[320px]" : ""}
          ${isMain ? "h-[540px] w-[380px]" : ""}
          ${variant === "side" ? "h-[470px] w-[315px] opacity-75 hover:opacity-100" : ""}
        `}
      >
        {/* IMAGE */}
        <img
          src={doctor.image}
          alt={doctor.name}
          draggable={false}
          loading="eager"
          decoding="async"
          className="
            absolute
            inset-0
            z-[1]
            h-full
            w-full
            object-cover
            select-none
          "
          style={{
            objectPosition: "50% 20%",
          }}
        />

        {/* DARK OVERLAY */}
        <div
          className="
            pointer-events-none
            absolute
            inset-0
            z-[2]
            bg-gradient-to-t
            from-[#021210]/94
            via-[#021210]/24
            to-transparent
          "
        />

        {/* TURQUOISE BOTTOM GLOW */}
        <div
          className="
            pointer-events-none
            absolute
            inset-x-0
            bottom-0
            z-[3]
            h-[52%]
            bg-[radial-gradient(circle_at_bottom,rgba(36,211,197,0.46),transparent_72%)]
          "
        />

        {/* ROLE */}
        <div
          className="
            absolute
            left-5
            top-5
            z-[5]
            max-w-[calc(100%-40px)]
            rounded-full
            border
            border-white/20
            bg-white/85
            px-4
            py-2
            text-xs
            font-medium
            text-[var(--accent)]
            shadow-[0_8px_24px_rgba(18,199,183,0.12)]
          "
        >
          {doctor.role}
        </div>

        {/* CONTENT */}
        <div
          className="
            absolute
            inset-x-0
            bottom-0
            z-[6]
            p-6
            text-white
          "
        >
          <h3
            className={`
              font-semibold
              leading-tight
              tracking-tight
              text-white
              ${isMain ? "text-3xl" : "text-2xl"}
              ${isMobile ? "text-[26px]" : ""}
            `}
          >
            {doctor.name}
          </h3>

          <p className="mt-2 text-sm text-white/82">
            {doctor.exp}
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            {doctor.specialization.slice(0, 2).map((item) => (
              <span
                key={item}
                className="
                  rounded-full
                  border
                  border-white/15
                  bg-white/12
                  px-3
                  py-1.5
                  text-[11px]
                  font-medium
                  text-white
                "
              >
                {item}
              </span>
            ))}
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setSelected(doctor);
            }}
            className="
              mt-6
              rounded-full
              bg-white
              px-6
              py-3
              text-sm
              font-medium
              text-[var(--accent)]
              shadow-[0_12px_32px_rgba(0,0,0,0.14)]
              transition-all
              duration-300
              hover:bg-[var(--accent-light)]
              hover:text-white
            "
          >
            Профиль врача
          </button>
        </div>
      </article>
    );
  };

  const activeDoctor = doctors[active];
  const prevDoctor = getPrevDoctor();
  const nextDoctor = getNextDoctor();

  return (
    <section
      id="doctors"
      className="
        relative
        z-0
        overflow-hidden
        py-24
        sm:py-28
        lg:py-32
      "
    >
      {/* BACKGROUND */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div
          className="
            absolute
            left-[-120px]
            top-[120px]
            h-[420px]
            w-[420px]
            rounded-full
            bg-[var(--accent-light)]/10
            blur-3xl
          "
        />

        <div
          className="
            absolute
            bottom-0
            right-[-120px]
            h-[360px]
            w-[360px]
            rounded-full
            bg-[var(--accent-light)]/10
            blur-3xl
          "
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        {/* HEADER */}
        <div className="max-w-3xl">
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

          <h2
            className="
              mt-6
              text-4xl
              font-semibold
              tracking-tight
              text-[var(--accent)]
              md:text-6xl
            "
          >
            Врачи
          </h2>

          <p className="mt-4 text-lg leading-relaxed text-[var(--text-soft)]">
            Команда специалистов уровня private clinic.
          </p>
        </div>

        {/* DESKTOP CAROUSEL */}
        <div className="relative mt-20 hidden items-center justify-center gap-10 md:flex">
          <button
            type="button"
            onClick={prev}
            aria-label="Предыдущий врач"
            className="
              absolute
              left-0
              z-20
              flex
              h-14
              w-14
              items-center
              justify-center
              rounded-full
              border
              border-[var(--accent-light)]/15
              bg-[var(--card)]
              text-[var(--accent)]
              shadow-[0_15px_40px_rgba(18,199,183,0.15)]
              transition-all
              duration-300
              hover:scale-105
              hover:bg-[var(--accent-light)]
              hover:text-white
            "
          >
            ←
          </button>

          <DoctorCard
            doctor={prevDoctor}
            variant="side"
            onClick={prev}
          />

          <DoctorCard
            doctor={activeDoctor}
            variant="main"
            onClick={() => setSelected(activeDoctor)}
          />

          <DoctorCard
            doctor={nextDoctor}
            variant="side"
            onClick={next}
          />

          <button
            type="button"
            onClick={next}
            aria-label="Следующий врач"
            className="
              absolute
              right-0
              z-20
              flex
              h-14
              w-14
              items-center
              justify-center
              rounded-full
              border
              border-[var(--accent-light)]/15
              bg-[var(--card)]
              text-[var(--accent)]
              shadow-[0_15px_40px_rgba(18,199,183,0.15)]
              transition-all
              duration-300
              hover:scale-105
              hover:bg-[var(--accent-light)]
              hover:text-white
            "
          >
            →
          </button>
        </div>

        {/* MOBILE CAROUSEL */}
        <div className="mt-14 flex flex-col items-center md:hidden">
          <div
            className="
              mb-4
              flex
              items-center
              justify-center
              gap-2
              text-xs
              font-medium
              text-[var(--text-muted)]
            "
          >
            <span>←</span>
            <span>Свайпните карточку</span>
            <span>→</span>
          </div>

          <div
            className="flex w-full justify-center"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <DoctorCard
              doctor={activeDoctor}
              variant="mobile"
              onClick={() => setSelected(activeDoctor)}
            />
          </div>

          <div
            className="
              mt-5
              rounded-full
              border
              border-[var(--accent-light)]/15
              bg-[var(--card)]
              px-4
              py-2
              text-xs
              font-medium
              text-[var(--text-muted)]
            "
          >
            {active + 1} / {doctors.length}
          </div>
        </div>
      </div>

      {/* MODAL */}
      {selected && (
        <DoctorModal
          doctor={selected}
          onClose={() => setSelected(null)}
          onBook={() => {
            onBookDoctor(selected);
            setSelected(null);
          }}
        />
      )}
    </section>
  );
}