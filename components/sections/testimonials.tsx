"use client";

import { motion } from "framer-motion";

const sectionVariants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut" as const,
      staggerChildren: 0.12,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut" as const,
    },
  },
};

export function Testimonials() {
  const reviews = [
    {
      name: "Анна К.",
      text: "Очень аккуратная работа. Лечила кариес и делала чистку — всё прошло без боли и стресса.",
    },
    {
      name: "Дмитрий С.",
      text: "Ставил имплант. Всё оказалось намного спокойнее, чем ожидал.",
    },
    {
      name: "Елена М.",
      text: "Нет ощущения навязывания услуг. Всё объясняют спокойно и честно.",
    },
  ];

  return (
    <motion.section
      id="testimonials"
      variants={sectionVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      className="
        relative overflow-hidden
        bg-[#071413]
        py-32
        text-white
      "
    >

      {/* BACKGROUND */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">

        <div
          className="
            absolute
            left-[-120px]
            top-[80px]
            h-[420px]
            w-[420px]
            rounded-full
            bg-[#12c7b7]/15
            blur-3xl
          "
        />

        <div
          className="
            absolute
            right-[-100px]
            bottom-[-60px]
            h-[360px]
            w-[360px]
            rounded-full
            bg-[#12c7b7]/12
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
              px-4 py-2
              text-xs
              font-medium
              uppercase
              tracking-[0.25em]
              text-[#8ff3ea]
              backdrop-blur
            "
          >
            Отзывы
          </span>

          <h2
            className="
              mt-6
              text-4xl
              font-semibold
              leading-tight
              text-white
              md:text-6xl
            "
          >
            Пациенты возвращаются
            <br />
            не случайно
          </h2>

          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80">
            Спокойный сервис, современное лечение и прозрачный подход —
            именно за это пациенты рекомендуют клинику своим близким.
          </p>

        </div>

        {/* CARDS */}
        <div className="mt-20 grid gap-8 lg:grid-cols-3">

          {reviews.map((review, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              whileHover={{
                y: -8,
              }}
              className="
                group
                relative
                overflow-hidden
                rounded-[32px]
                border border-[#12c7b7]/15
                bg-white/[0.08]
                p-8
                backdrop-blur-xl
                shadow-[0_10px_40px_rgba(0,0,0,0.25)]
                transition-all
                duration-300
                hover:border-[#12c7b7]/35
                hover:bg-white/[0.12]
                hover:shadow-[0_20px_60px_rgba(18,199,183,0.18)]
              "
            >

              {/* glow */}
              <div
                className="
                  absolute
                  right-[-40px]
                  top-[-40px]
                  h-[140px]
                  w-[140px]
                  rounded-full
                  bg-[#12c7b7]/10
                  blur-3xl
                  transition-all
                  duration-500
                  group-hover:scale-125
                "
              />

              <div className="relative">

                {/* stars */}
                <div className="flex gap-1 text-[#12c7b7]">
                  ★★★★★
                </div>

                {/* text */}
                <p className="mt-6 text-sm leading-relaxed text-white/80">
                  “{review.text}”
                </p>

                {/* divider */}
                <div className="mt-8 h-px w-full bg-gradient-to-r from-[#12c7b7]/30 to-transparent" />

                {/* author */}
                <div className="mt-6 flex items-center gap-3">

                  <div
                    className="
                      flex h-11 w-11 items-center justify-center
                      rounded-full
                      bg-[#12c7b7]/10
                      text-sm
                      font-semibold
                      text-[#8ff3ea]
                    "
                  >
                    {review.name[0]}
                  </div>

                  <div>
                    <div className="text-sm font-semibold text-white">
                      {review.name}
                    </div>

                    <div className="text-xs text-zinc-400">
                      Пациент клиники
                    </div>
                  </div>

                </div>

              </div>

            </motion.div>
          ))}

        </div>

      </div>
    </motion.section>
  );
}