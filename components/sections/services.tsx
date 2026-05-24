"use client";

import { motion } from "framer-motion";
import { useState } from "react";

import { ServiceModal } from "@/components/ui/service-modal";

export function Services() {
  const [selectedService, setSelectedService] = useState<null | {
    title: string;
    price: string;
    desc: string;
  }>(null);

  const services = [
    {
      title: "Имплантация",
      price: "от 25 000 ₽",
      desc: "Полное восстановление зубов с цифровым планированием и современными имплантами.",
      featured: true,
    },
    {
      title: "Эстетика",
      price: "от 6 000 ₽",
      desc: "Отбеливание и восстановление естественной эстетики улыбки.",
    },
    {
      title: "Терапия",
      price: "от 3 500 ₽",
      desc: "Лечение кариеса и восстановление зубов любой сложности.",
    },
    {
      title: "Гигиена",
      price: "от 4 000 ₽",
      desc: "Профессиональная чистка и профилактика заболеваний.",
    },
    {
      title: "Протезирование",
      price: "от 18 000 ₽",
      desc: "Коронки и восстановление жевательной функции.",
    },
  ];

  return (
    <section
      id="services"
      className="relative overflow-hidden py-32"
    >

      {/* background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-[5%] top-[20%] h-[300px] w-[300px] rounded-full bg-white/40 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6">

        {/* HEADER */}
        <div className="max-w-3xl">
          <span className="text-xs uppercase tracking-[0.25em] text-zinc-500">
            Услуги
          </span>

          <h2 className="mt-4 text-4xl font-semibold tracking-tight text-zinc-900 md:text-6xl">
            Лечение,
            <br />
            ориентированное
            <br />
            на результат
          </h2>

          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-zinc-600">
            Современные технологии и прозрачный подход без лишних процедур
            и скрытых услуг.
          </p>
        </div>

        {/* GRID */}
        <div className="mt-20 grid gap-6 lg:grid-cols-3">

          {services.map((service, idx) => {

            if (service.featured) {
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  whileHover={{ y: -6 }}
                  className="group relative overflow-hidden rounded-[36px] bg-zinc-900 p-10 text-white shadow-soft-lg lg:col-span-2 lg:row-span-2"
                >

                  {/* glow */}
                  <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-white/10 blur-3xl transition-all duration-500 group-hover:scale-125" />

                  <div className="relative">

                    <span className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs uppercase tracking-[0.2em] text-zinc-300">
                      Premium Care
                    </span>

                    <h3 className="mt-10 text-4xl font-semibold md:text-5xl">
                      {service.title}
                    </h3>

                    <p className="mt-6 max-w-xl text-lg leading-relaxed text-zinc-300">
                      {service.desc}
                    </p>

                    <div className="mt-10 flex items-center justify-between">

                      <div className="text-2xl font-semibold">
                        {service.price}
                      </div>

                      <button
                        onClick={() => setSelectedService(service)}
                        className="rounded-full bg-white px-6 py-3 text-sm font-medium text-zinc-900 transition hover:scale-[1.03]"
                      >
                        Подробнее
                      </button>

                    </div>

                  </div>
                </motion.div>
              );
            }

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                whileHover={{ y: -4 }}
                className="rounded-[32px] border border-zinc-200 bg-white/70 p-8 backdrop-blur-xl shadow-soft"
              >

                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-zinc-900">
                    {service.title}
                  </h3>

                  <span className="text-sm font-medium text-zinc-500">
                    {service.price}
                  </span>
                </div>

                <p className="mt-5 text-sm leading-relaxed text-zinc-600">
                  {service.desc}
                </p>

                <button
                  onClick={() => setSelectedService(service)}
                  className="mt-8 rounded-full border border-zinc-200 px-5 py-2.5 text-sm font-medium text-zinc-900 transition hover:bg-zinc-100"
                >
                  Подробнее
                </button>

              </motion.div>
            );
          })}

        </div>
      </div>

      <ServiceModal
        open={selectedService !== null}
        service={selectedService}
        onClose={() => setSelectedService(null)}
      />

    </section>
  );
}