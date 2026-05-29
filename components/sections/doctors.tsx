"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { doctors, Doctor } from "@/data/doctors";
import { DoctorModal } from "@/components/ui/doctor-modal";

type Props = {
  onBookDoctor: (doctor: Doctor) => void;
};

export function Doctors({ onBookDoctor }: Props) {
  const [active, setActive] = useState(0);
  const [selected, setSelected] = useState<Doctor | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  const dragBlockedRef = useRef(false);

  useEffect(() => {
    const updateScreen = () => {
      setIsMobile(window.innerWidth < 768);
    };

    updateScreen();

    window.addEventListener("resize", updateScreen);

    return () => {
      window.removeEventListener("resize", updateScreen);
    };
  }, []);

  const next = () => {
    setActive((prev) => (prev + 1) % doctors.length);
  };

  const prev = () => {
    setActive((prev) => (prev - 1 + doctors.length) % doctors.length);
  };

  const handleSwipe = (
    offsetX: number,
    velocityX: number
  ) => {
    const swipeDistance = 65;
    const swipeVelocity = 450;

    const swipedLeft =
      offsetX < -swipeDistance || velocityX < -swipeVelocity;

    const swipedRight =
      offsetX > swipeDistance || velocityX > swipeVelocity;

    if (swipedLeft) {
      dragBlockedRef.current = true;
      next();

      window.setTimeout(() => {
        dragBlockedRef.current = false;
      }, 250);

      return;
    }

    if (swipedRight) {
      dragBlockedRef.current = true;
      prev();

      window.setTimeout(() => {
        dragBlockedRef.current = false;
      }, 250);
    }
  };

  const getPosition = (index: number) => {
    const diff = index - active;

    const sideOffset = isMobile ? 150 : 390;

    if (diff === 0) {
      return {
        x: 0,
        scale: 1,
        rotateY: 0,
        opacity: 1,
        zIndex: 3,
        pointerEvents: "auto" as const,
      };
    }

    if (diff === -1 || diff === doctors.length - 1) {
      return {
        x: -sideOffset,
        scale: isMobile ? 0.8 : 0.9,
        rotateY: isMobile ? 18 : 28,
        opacity: isMobile ? 0.5 : 0.72,
        zIndex: 2,
        pointerEvents: "auto" as const,
      };
    }

    if (diff === 1 || diff === -(doctors.length - 1)) {
      return {
        x: sideOffset,
        scale: isMobile ? 0.8 : 0.9,
        rotateY: isMobile ? -18 : -28,
        opacity: isMobile ? 0.5 : 0.72,
        zIndex: 2,
        pointerEvents: "auto" as const,
      };
    }

    return {
      x: 0,
      scale: 0.6,
      rotateY: 0,
      opacity: 0,
      zIndex: 0,
      pointerEvents: "none" as const,
    };
  };

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

        {/* CAROUSEL */}
        <div className="relative z-10 mt-16 sm:mt-20 lg:mt-24">
          {/* DESKTOP LEFT BUTTON */}
          <button
            type="button"
            onClick={prev}
            aria-label="Предыдущий врач"
            className="
              absolute
              left-[-30px]
              top-1/2
              z-20
              hidden
              h-16
              w-16
              -translate-y-1/2
              rounded-full
              border
              border-[var(--accent-light)]/15
              bg-[var(--card)]
              text-[var(--accent)]
              shadow-[0_15px_40px_rgba(18,199,183,0.15)]
              backdrop-blur-xl
              transition-all
              duration-300
              hover:scale-105
              hover:border-[var(--accent-light)]/40
              hover:bg-[var(--accent-light)]
              hover:text-white
              md:block
            "
          >
            ←
          </button>

          {/* DESKTOP RIGHT BUTTON */}
          <button
            type="button"
            onClick={next}
            aria-label="Следующий врач"
            className="
              absolute
              right-[-30px]
              top-1/2
              z-20
              hidden
              h-16
              w-16
              -translate-y-1/2
              rounded-full
              border
              border-[var(--accent-light)]/15
              bg-[var(--card)]
              text-[var(--accent)]
              shadow-[0_15px_40px_rgba(18,199,183,0.15)]
              backdrop-blur-xl
              transition-all
              duration-300
              hover:scale-105
              hover:border-[var(--accent-light)]/40
              hover:bg-[var(--accent-light)]
              hover:text-white
              md:block
            "
          >
            →
          </button>

          {/* SWIPE HINT */}
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
              md:hidden
            "
          >
            <span>←</span>
            <span>Свайпните карточку</span>
            <span>→</span>
          </div>

          {/* 3D AREA */}
          <div
            className="
              relative
              z-0
              flex
              h-[505px]
              touch-pan-y
              items-center
              justify-center
              overflow-hidden
              sm:h-[620px]
            "
            style={{
              perspective: "2200px",
            }}
          >
            <AnimatePresence mode="popLayout">
              {doctors.map((d, index) => {
                const pos = getPosition(index);
                const isActive = index === active;

                return (
                  <motion.div
                    key={d.name}
                    drag={isMobile && isActive ? "x" : false}
                    dragConstraints={{
                      left: 0,
                      right: 0,
                    }}
                    dragElastic={0.22}
                    onDragEnd={(_, info) => {
                      if (!isMobile || !isActive) return;

                      handleSwipe(info.offset.x, info.velocity.x);
                    }}
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
                      pointerEvents: pos.pointerEvents,
                    }}
                    className="
                      absolute
                      h-[455px]
                      w-[292px]
                      cursor-pointer
                      select-none
                      touch-pan-y
                      sm:h-[520px]
                      sm:w-[360px]
                    "
                    onClick={() => {
  if (dragBlockedRef.current) return;
}}
                  >
                    <motion.div
                      whileHover={
                        isMobile
                          ? undefined
                          : {
                              y: -10,
                            }
                      }
                      className="
                        relative
                        h-full
                        w-full
                        overflow-hidden
                        rounded-[34px]
                        border
                        border-[var(--accent-light)]/15
                        shadow-[0_25px_80px_rgba(18,199,183,0.14)]
                        sm:rounded-[40px]
                      "
                    >
                      {/* IMAGE */}
                      <img
                        src={d.image}
                        alt={d.name}
                        draggable={false}
                        loading="eager"
                        decoding="async"
                        className="
                          pointer-events-none
                          absolute
                          inset-0
                          z-[1]
                          block
                          h-full
                          w-full
                          object-cover
                          select-none
                        "
                        style={{
                          objectPosition: "50% 20%",
                          backfaceVisibility: "hidden",
                          WebkitBackfaceVisibility: "hidden",
                          transform: "translateZ(0)",
                        }}
                      />

                      {/* OVERLAY */}
                      <div
                        className="
                          pointer-events-none
                          absolute
                          inset-0
                          z-[2]
                          bg-gradient-to-t
                          from-[var(--accent)]/92
                          via-[var(--accent)]/24
                          to-transparent
                        "
                      />

                      {/* LIGHT */}
                      <div
                        className="
                          pointer-events-none
                          absolute
                          inset-0
                          z-[3]
                          bg-[var(--accent-light)]/10
                        "
                      />

                      {/* ROLE */}
                      <div
                        className="
                          absolute
                          left-5
                          top-5
                          z-[4]
                          max-w-[calc(100%-40px)]
                          rounded-full
                          border
                          border-[var(--accent-light)]/20
                          bg-[var(--card)]
                          px-3
                          py-2
                          text-[11px]
                          font-medium
                          text-[var(--accent)]
                          shadow-[0_6px_20px_rgba(18,199,183,0.08)]
                          backdrop-blur-xl
                          sm:left-6
                          sm:top-6
                          sm:px-4
                          sm:text-xs
                        "
                      >
                        {d.role}
                      </div>

                      {/* CONTENT */}
                      <div
                        className="
                          absolute
                          bottom-0
                          z-[5]
                          w-full
                          p-5
                          text-white
                          sm:p-7
                        "
                      >
                        <h3
                          className="
                            max-w-full
                            text-[22px]
                            font-semibold
                            leading-tight
                            sm:text-3xl
                          "
                        >
                          {d.name}
                        </h3>

                        <p className="mt-2 text-sm text-white/85">
                          {d.exp}
                        </p>

                        {/* TAGS */}
                        <div className="mt-4 flex flex-wrap gap-2 sm:mt-5">
                          {d.specialization.slice(0, 2).map((s, i) => (
                            <span
                              key={i}
                              className="
                                rounded-full
                                border
                                border-white/15
                                bg-white/12
                                px-3
                                py-1
                                text-[11px]
                                text-white
                                backdrop-blur
                                sm:text-xs
                              "
                            >
                              {s}
                            </span>
                          ))}
                        </div>

                        
                      </div>
                    </motion.div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* MOBILE INDICATOR */}
          <div className="mt-12 flex justify-center">
  <a
    href="/doctors"
    className="
      group
      relative
      overflow-hidden

      rounded-full

      border
      border-[var(--accent-light)]/25

      bg-[rgba(18,199,183,0.08)]

      px-10
      py-4

      text-sm
      font-semibold

      text-[var(--accent)]

      backdrop-blur-xl

      shadow-[0_10px_40px_rgba(18,199,183,0.12)]

      transition-all
      duration-500

      hover:-translate-y-1
      hover:border-[var(--accent-light)]/50
      hover:shadow-[0_20px_60px_rgba(18,199,183,0.25)]
    "
  >
    {/* перелив */}
    <span
      className="
        absolute
        inset-0

        -translate-x-[200%]
        skew-x-[-25deg]

        bg-gradient-to-r
        from-transparent
        via-white/30
        to-transparent

        transition-transform
        duration-[1800ms]

        group-hover:translate-x-[250%]
      "
    />

    {/* внутреннее свечение */}
    <span
      className="
        absolute
        inset-0

        bg-[radial-gradient(circle_at_center,rgba(18,199,183,0.18),transparent_70%)]

        opacity-0
        transition-opacity
        duration-500

        group-hover:opacity-100
      "
    />

    <span className="relative flex items-center gap-3">
      Все специалисты

      <span
        className="
          transition-transform
          duration-300
          group-hover:translate-x-1
        "
      >
        →
      </span>
    </span>
  </a>
</div>
          <div
            className="
              mt-5
              flex
              justify-center
              md:hidden
            "
          >
            <div
              className="
                rounded-full
                border
                border-[var(--accent-light)]/15
                bg-[var(--card)]
                px-4
                py-2
                text-xs
                font-medium
                text-[var(--text-muted)]
                backdrop-blur-xl
              "
            >
              {active + 1} / {doctors.length}
            </div>
          </div>
        </div>
      </div>


    </section>
  );
}