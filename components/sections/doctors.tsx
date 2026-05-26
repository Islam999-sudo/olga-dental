"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { doctors, Doctor } from "@/data/doctors";
import { DoctorModal } from "@/components/ui/doctor-modal";
import { BookingModal } from "@/components/ui/booking-modal";

export function Doctors() {
  const [active, setActive] = useState(0);

  const [selected, setSelected] = useState<Doctor | null>(null);
  const [bookingOpen, setBookingOpen] = useState(false);

  const next = () => {
    setActive((prev) => (prev + 1) % doctors.length);
  };

  const prev = () => {
    setActive((prev) => (prev - 1 + doctors.length) % doctors.length);
  };

  const getPosition = (index: number) => {
    const diff = index - active;

    // CENTER
    if (diff === 0) {
      return {
        x: 0,
        scale: 1,
        rotateY: 0,
        opacity: 1,
        zIndex: 30,
      };
    }

    // LEFT
    if (diff === -1 || diff === doctors.length - 1) {
      return {
        x: -390,
        scale: 0.9,
        rotateY: 28,
        opacity: 0.72,
        zIndex: 20,
      };
    }

    // RIGHT
    if (diff === 1 || diff === -(doctors.length - 1)) {
      return {
        x: 390,
        scale: 0.9,
        rotateY: -28,
        opacity: 0.72,
        zIndex: 20,
      };
    }

    // HIDDEN
    return {
      x: 0,
      scale: 0.6,
      rotateY: 0,
      opacity: 0,
      zIndex: 0,
    };
  };

  return (
    <section
      id="doctors"
      className="relative overflow-hidden py-32"
    >

      {/* BACKGROUND */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">

        <div
          className="
            absolute
            left-[-120px]
            top-[120px]
            h-[420px]
            w-[420px]
            rounded-full
            bg-[#12c7b7]/10
            blur-3xl
          "
        />

        <div
          className="
            absolute
            right-[-120px]
            bottom-[0]
            h-[360px]
            w-[360px]
            rounded-full
            bg-[#12c7b7]/10
            blur-3xl
          "
        />

      </div>

      <div className="relative mx-auto max-w-7xl px-6">

        {/* HEADER */}
        <div className="max-w-3xl">

          <span
            className="
              inline-flex
              rounded-full
              border border-[#12c7b7]/20
              bg-[#12c7b7]/10
              px-4
              py-2
              text-xs
              font-medium
              uppercase
              tracking-[0.25em]
              text-[#0f8f84]
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
              text-[#0f8f84]
              md:text-6xl
            "
          >
            Врачи
          </h2>

          <p className="mt-4 text-lg leading-relaxed text-[#5f8d88]">
            Команда специалистов уровня private clinic.
          </p>

        </div>

        {/* CAROUSEL */}
        <div className="relative mt-24">

          {/* LEFT BUTTON */}
          <button
            onClick={prev}
            className="
              absolute left-[-30px] top-1/2 z-50
              -translate-y-1/2
              h-16 w-16 rounded-full
              border border-[#12c7b7]/15
              bg-white/85
              text-[#0f8f84]
              shadow-[0_15px_40px_rgba(18,199,183,0.15)]
              backdrop-blur-xl
              transition-all duration-300
              hover:scale-105
              hover:border-[#12c7b7]/40
              hover:bg-[#12c7b7]
              hover:text-white
            "
          >
            ←
          </button>

          {/* RIGHT BUTTON */}
          <button
            onClick={next}
            className="
              absolute right-[-30px] top-1/2 z-50
              -translate-y-1/2
              h-16 w-16 rounded-full
              border border-[#12c7b7]/15
              bg-white/85
              text-[#0f8f84]
              shadow-[0_15px_40px_rgba(18,199,183,0.15)]
              backdrop-blur-xl
              transition-all duration-300
              hover:scale-105
              hover:border-[#12c7b7]/40
              hover:bg-[#12c7b7]
              hover:text-white
            "
          >
            →
          </button>

          {/* 3D AREA */}
          <div
            className="
              relative
              flex h-[620px]
              items-center justify-center
              overflow-hidden
            "
            style={{
              perspective: "2200px",
            }}
          >

            <AnimatePresence mode="popLayout">
              {doctors.map((d, index) => {
                const pos = getPosition(index);

                return (
                  <motion.div
                    key={d.name}
                    animate={{
                      x: pos.x,
                      scale: pos.scale,
                      rotateY: pos.rotateY,
                      opacity: pos.opacity,
                    }}
                    transition={{
                      duration: 0.6,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    style={{
                      zIndex: pos.zIndex,
                      transformStyle: "preserve-3d",
                    }}
                    className="
                      absolute
                      w-[360px]
                      h-[520px]
                      cursor-pointer
                    "
                    onClick={() => setSelected(d)}
                  >

                    <motion.div
                      whileHover={{
                        y: -10,
                      }}
                      className="
                        relative h-full w-full
                        overflow-hidden
                        rounded-[40px]
                        border border-[#12c7b7]/15
                        shadow-[0_25px_80px_rgba(18,199,183,0.14)]
                      "
                    >

                      {/* IMAGE */}
                      <img
                        src={d.image}
                        alt={d.name}
                        className="
                          absolute inset-0
                          h-full w-full
                          object-cover
                        "
                        style={{
                          objectPosition: "50% 20%",
                        }}
                      />

                      {/* TURQUOISE OVERLAY */}
                      <div
                        className="
                          absolute inset-0
                          bg-gradient-to-t
                          from-[#0f8f84]/90
                          via-[#0f8f84]/25
                          to-transparent
                        "
                      />

                      {/* EXTRA GLOW */}
                      <div
                        className="
                          absolute
                          inset-0
                          bg-[#12c7b7]/10
                        "
                      />

                      {/* ROLE */}
                      <div
                        className="
                          absolute left-6 top-6
                          rounded-full
                          border border-white/10
                          bg-white/10
                          px-4 py-2
                          text-xs text-white
                          backdrop-blur
                        "
                      >
                        {d.role}
                      </div>

                      {/* CONTENT */}
                      <div className="absolute bottom-0 p-7 text-white">

                        <h3 className="text-3xl font-semibold">
                          {d.name}
                        </h3>

                        <p className="mt-2 text-sm text-white/80">
                          {d.exp}
                        </p>

                        <p className="mt-4 text-sm leading-relaxed text-white/80">
                          {d.desc}
                        </p>

                        {/* TAGS */}
                        <div className="mt-5 flex flex-wrap gap-2">
                          {d.specialization
                            .slice(0, 2)
                            .map((s, i) => (
                              <span
                                key={i}
                                className="
                                  rounded-full
                                  border border-white/10
                                  bg-white/10
                                  px-3 py-1
                                  text-xs
                                  text-white
                                  backdrop-blur
                                "
                              >
                                {s}
                              </span>
                            ))}
                        </div>

                        {/* BUTTON */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelected(d);
                          }}
                          className="
                            mt-6
                            rounded-full
                            bg-white
                            px-5 py-2
                            text-sm
                            font-medium
                            text-[#0f8f84]
                            transition-all
                            duration-300
                            hover:bg-[#12c7b7]
                            hover:text-white
                          "
                        >
                          Профиль врача
                        </button>

                      </div>
                    </motion.div>
                  </motion.div>
                );
              })}
            </AnimatePresence>

          </div>
        </div>
      </div>

      {/* MODALS */}
      {selected && (
        <DoctorModal
          doctor={selected}
          onClose={() => setSelected(null)}
          onBook={() => {
            setSelected(null);
            setBookingOpen(true);
          }}
        />
      )}

      <BookingModal
        open={bookingOpen}
        onClose={() => setBookingOpen(false)}
        doctor={null}
        service={null}
      />
    </section>
  );
}