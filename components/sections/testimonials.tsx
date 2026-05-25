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
      className="relative overflow-hidden bg-zinc-950 py-32 text-white"
    >
      <div className="mx-auto max-w-7xl px-6">

        <div className="max-w-3xl">
          <span className="text-xs uppercase tracking-[0.25em] text-zinc-500">
            Отзывы
          </span>

          <h2 className="mt-4 text-4xl font-semibold md:text-6xl">
            Пациенты возвращаются
            <br />
            не случайно
          </h2>
        </div>

        <motion.div
          variants={sectionVariants}
          className="mt-20 grid gap-8 lg:grid-cols-3"
        >
          {reviews.map((review, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              whileHover={{ y: -6 }}
              className="rounded-[32px] border border-white/10 bg-white/5 p-8 backdrop-blur-xl"
            >
              <div className="flex gap-1 text-white">★★★★★</div>

              <p className="mt-6 text-sm text-zinc-300">
                “{review.text}”
              </p>

              <div className="mt-8 text-sm font-medium text-white">
                {review.name}
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </motion.section>
  );
}