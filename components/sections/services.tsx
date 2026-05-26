"use client";

import { useState } from "react";
import { motion } from "framer-motion";
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

      {/* BACKGROUND */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">

        <div
          className="
            absolute
            left-[-120px]
            top-[120px]
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
            Услуги
          </span>

          <h2 className="mt-6 text-4xl font-semibold tracking-tight text-[#0f8f84] md:text-6xl">
            Лечение,
            <br />
            ориентированное
            <br />
            на результат
          </h2>

          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[#4b8f89]">
            Современные технологии и прозрачный подход без лишних процедур
            и скрытых услуг.
          </p>

        </div>

        {/* GRID */}
        <div className="mt-20 grid gap-6 lg:grid-cols-3">

          {services.map((service, idx) => {

            const delay = idx * 0.08;

            // FEATURED CARD
            if (service.featured) {
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6, delay }}
                  whileHover={{ y: -6 }}
                  className="
                    group
                    relative
                    overflow-hidden
                    rounded-[36px]
                    bg-gradient-to-br
                    from-[#12c7b7]
                    via-[#16d6c5]
                    to-[#0fb3a5]
                    p-10
                    text-white
                    shadow-[0_20px_80px_rgba(18,199,183,0.22)]
                    lg:col-span-2
                    lg:row-span-2
                  "
                >

                  {/* glow */}
                  <div
                    className="
                      absolute
                      right-[-80px]
                      top-[-80px]
                      h-[260px]
                      w-[260px]
                      rounded-full
                      bg-white/15
                      blur-3xl
                      transition-all
                      duration-700
                      group-hover:scale-125
                    "
                  />

                  {/* overlay */}
                  <div
                    className="
                      absolute inset-0
                      bg-[linear-gradient(135deg,rgba(255,255,255,0.10),transparent)]
                    "
                  />

                  <div className="relative">

                    <span
                      className="
                        rounded-full
                        border border-white/30
                        bg-white/10
                        px-4
                        py-2
                        text-xs
                        uppercase
                        tracking-[0.2em]
                        text-white
                        backdrop-blur
                      "
                    >
                      Популярная Услуга
                    </span>

                    <h3 className="mt-10 text-4xl font-semibold md:text-5xl">
                      {service.title}
                    </h3>

                    <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/90">
                      {service.desc}
                    </p>

                    <div className="mt-10 flex items-center justify-between">

                      <div className="text-2xl font-semibold text-white">
                        {service.price}
                      </div>

                      <button
                        onClick={() => setSelectedService(service)}
                        className="
                          rounded-full
                          bg-white
                          px-6
                          py-3
                          text-sm
                          font-medium
                          text-[#0f8f84]
                          shadow-lg
                          transition
                          hover:scale-[1.03]
                          hover:bg-[#eafffc]
                        "
                      >
                        Подробнее
                      </button>

                    </div>

                  </div>
                </motion.div>
              );
            }

            // SMALL CARDS
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay }}
                whileHover={{ y: -5 }}
                className="
                  rounded-[32px]
                  border
                  border-[#12c7b7]/15
                  bg-white/90
                  p-8
                  backdrop-blur-xl
                  shadow-[0_10px_40px_rgba(18,199,183,0.08)]
                  transition-all
                  duration-300
                  hover:border-[#12c7b7]/35
                  hover:shadow-[0_20px_60px_rgba(18,199,183,0.14)]
                "
              >

                <div className="flex items-center justify-between">

                  <h3 className="text-xl font-semibold text-[#0f8f84]">
                    {service.title}
                  </h3>

                  <span className="text-sm font-medium text-[#12c7b7]">
                    {service.price}
                  </span>

                </div>

                <p className="mt-5 text-sm leading-relaxed text-[#5f8f8b]">
                  {service.desc}
                </p>

                <button
                  onClick={() => setSelectedService(service)}
                  className="
                    mt-8
                    rounded-full
                    border
                    border-[#12c7b7]/20
                    bg-[#12c7b7]/8
                    px-5
                    py-2.5
                    text-sm
                    font-medium
                    text-[#0f8f84]
                    transition
                    hover:bg-[#12c7b7]
                    hover:text-white
                  "
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