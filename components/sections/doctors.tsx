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
      <div className="mx-auto max-w-7xl px-6">

        {/* HEADER */}
        <div className="max-w-3xl">
          <h2 className="text-4xl md:text-6xl font-semibold text-zinc-900">
            Врачи
          </h2>

          <p className="mt-4 text-lg text-zinc-600">
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
              bg-white/90
              border border-zinc-200
              shadow-xl
              backdrop-blur
              transition
              hover:scale-105
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
              bg-white/90
              border border-zinc-200
              shadow-xl
              backdrop-blur
              transition
              hover:scale-105
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
                        shadow-2xl
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

                      {/* OVERLAY */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

                      {/* ROLE */}
                      <div
                        className="
                          absolute left-6 top-6
                          rounded-full
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

                        <div className="mt-5 flex flex-wrap gap-2">
                          {d.specialization
                            .slice(0, 2)
                            .map((s, i) => (
                              <span
                                key={i}
                                className="
                                  rounded-full
                                  bg-white/10
                                  px-3 py-1
                                  text-xs
                                  backdrop-blur
                                "
                              >
                                {s}
                              </span>
                            ))}
                        </div>

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
                            text-zinc-900
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