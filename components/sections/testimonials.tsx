"use client";

import { motion } from "framer-motion";

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
    <section
      id="testimonials"
      className="relative overflow-hidden bg-zinc-950 py-32 text-white"
    >

      {/* background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-[10%] top-[20%] h-[400px] w-[400px] rounded-full bg-white/5 blur-3xl" />
        <div className="absolute right-[5%] bottom-[10%] h-[300px] w-[300px] rounded-full bg-white/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6">

        {/* HEADER */}
        <div className="max-w-3xl">
          <span className="text-xs uppercase tracking-[0.25em] text-zinc-500">
            Отзывы
          </span>

          <h2 className="mt-4 text-4xl font-semibold tracking-tight md:text-6xl">
            Пациенты возвращаются
            <br />
            не случайно
          </h2>

          <p className="mt-6 text-lg leading-relaxed text-zinc-400">
            Главное для нас — спокойствие пациента и предсказуемый результат лечения.
          </p>
        </div>

        {/* CARDS */}
        <div className="mt-20 grid gap-8 lg:grid-cols-3">

          {reviews.map((review, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              whileHover={{ y: -6 }}
              className="rounded-[32px] border border-white/10 bg-white/5 p-8 backdrop-blur-xl"
            >

              <div className="flex gap-1 text-white">
                ★★★★★
              </div>

              <p className="mt-6 text-sm leading-relaxed text-zinc-300">
                “{review.text}”
              </p>

              <div className="mt-8 text-sm font-medium text-white">
                {review.name}
              </div>

            </motion.div>
          ))}

        </div>
      </div>
    </section>
  );
}