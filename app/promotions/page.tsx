"use client";

import Link from "next/link";
import { motion } from "framer-motion";

type Promotion = {
  title: string;
  price: string;
  description: string;
  href: string;
  benefits?: string[];
};

const promotions: Promotion[] = [
  {
    title: "Установка зуба под ключ",
    price: "60 000 ₽",
    description:
      "В стоимость входит установка имплантата, операция, формирователь, слепки и коронка из диоксида циркония.",
    href: "/services#implant-tooth-package",
    benefits: [
     
    ],
  },
  {
    title: "Комплексная гигиена полости рта",
    price: "от 4 000 ₽",
    description:
      "Профессиональная чистка зубов, удаление налёта и рекомендации по домашнему уходу.",
    href: "/services#hygiene",
  },
  {
    title: "Лечение кариеса",
    price: "от 6 500 ₽",
    description:
      "Современное лечение с эстетическим восстановлением зуба и комфортной анестезией.",
    href: "/services#caries",
  },
];
export default function PromotionsPage() {
  return (
    <section className="relative overflow-hidden pb-32 pt-36">
      {/* BACKGROUND */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="
            absolute
            left-[-120px]
            top-[100px]
            h-[420px]
            w-[420px]
            rounded-full
            bg-[var(--accent-light)]/15
            blur-3xl
          "
        />

        <div
          className="
            absolute
            right-[-120px]
            bottom-[-80px]
            h-[360px]
            w-[360px]
            rounded-full
            bg-[var(--accent-light)]/10
            blur-3xl
          "
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        {/* HEADER */}
        <div className="mx-auto max-w-4xl text-center">
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
              font-semibold
              uppercase
              tracking-[0.25em]
              text-[var(--accent)]
            "
          >
            Акции
          </span>

          <h1
            className="
              mt-6
              text-5xl
              font-semibold
              tracking-tight
              text-[var(--accent)]
              md:text-7xl
            "
          >
            Специальные
            <br />
            предложения
          </h1>

          <p
            className="
              mx-auto
              mt-6
              max-w-3xl
              text-lg
              leading-relaxed
              text-[var(--text-soft)]
            "
          >
            Актуальные предложения клиники. Нажмите на акцию,
            чтобы перейти к соответствующей услуге.
          </p>
        </div>

        {/* CARDS */}
        <div className="mt-20 grid gap-6 md:grid-cols-2">
          {promotions.map((promotion) => (
            <motion.article
              key={promotion.title}
              whileHover={{ y: -5 }}
              className="
                rounded-[32px]
                border
                border-[var(--accent-light)]/15
                bg-[var(--card)]
                p-8
                shadow-[0_10px_40px_rgba(18,199,183,0.08)]
                backdrop-blur-xl
              "
            >
              <div
                className="
                  inline-flex
                  rounded-full
                  bg-[var(--accent-light)]/10
                  px-3
                  py-1
                  text-xs
                  font-semibold
                  text-[var(--accent)]
                "
              >
                Спецпредложение
              </div>

              <h2
                className="
                  mt-5
                  text-2xl
                  font-semibold
                  text-[var(--accent)]
                "
              >
                {promotion.title}
              </h2>

              <div
                className="
                  mt-3
                  text-3xl
                  font-bold
                  text-[var(--accent)]
                "
              >
                {promotion.price}
              </div>

              <p
                className="
                  mt-4
                  text-sm
                  leading-relaxed
                  text-[var(--text-muted)]
                "
              >
                {promotion.description}
              </p>
              {promotion.benefits && (
  <div className="mt-5 grid gap-2">
    {promotion.benefits.map((benefit) => (
      <div
        key={benefit}
        className="
          rounded-2xl
          border
          border-[var(--accent-light)]/15
          bg-[var(--accent-light)]/6
          px-4
          py-2.5
          text-sm
          font-medium
          text-[var(--text-soft)]
        "
      >
        <span className="text-[var(--accent)]">✓</span>{" "}
        {benefit}
      </div>
    ))}
  </div>
)}

              <Link
                href={promotion.href}
                className="
                  mt-6
                  inline-flex
                  rounded-full
                  bg-[var(--accent-light)]
                  px-6
                  py-3
                  text-sm
                  font-semibold
                  text-[#071412]
                  shadow-[0_12px_40px_rgba(18,199,183,0.25)]
                  transition-all
                  duration-300
                  hover:-translate-y-[2px]
                  hover:brightness-110
                "
              >
                Подробнее →
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}