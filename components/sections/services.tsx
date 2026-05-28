"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ServiceModal } from "@/components/ui/service-modal";

export type Service = {
  title: string;
  price: string;
  desc: string;
  fullDesc: string;
  benefits: string[];
  featured?: boolean;
};

const smoothEase = [0.22, 1, 0.36, 1] as const;

const services: Service[] = [
  {
    title: "Имплантация",
    price: "от 25 000 ₽",
    desc: "Восстановление зубов с цифровым планированием и современными имплантами.",
    fullDesc:
      "Имплантация помогает восстановить утраченные зубы и вернуть нормальную жевательную функцию. Лечение планируется индивидуально с учётом состояния костной ткани и будущей ортопедической конструкции.",
    benefits: [
      "Цифровое планирование",
      "Современные импланты",
      "Естественная эстетика",
      "Долгосрочный результат",
    ],
    featured: true,
  },
  {
    title: "Лечение кариеса",
    price: "6 000 ₽",
    desc: "Акционное лечение кариеса одной или нескольких поверхностей зуба.",
    fullDesc:
      "Кариес разрушает твёрдые ткани зуба и без лечения может привести к осложнениям. Мы восстанавливаем зуб современными материалами с сохранением естественной формы и эстетики.",
    benefits: [
      "Акционная цена",
      "Эстетичная реставрация",
      "Современные материалы",
      "Сохранение тканей зуба",
    ],
  },
  {
    title: "Профессиональная гигиена",
    price: "4 000 ₽",
    desc: "Комплексная чистка Air-Flow для удаления налёта и профилактики.",
    fullDesc:
      "Профессиональная гигиена помогает удалить мягкий налёт, улучшить состояние дёсен и снизить риск кариеса. Процедура проводится с использованием Air-Flow.",
    benefits: [
      "Air-Flow чистка",
      "Профилактика кариеса",
      "Свежесть и чистота",
      "Бережное воздействие",
    ],
  },
  {
    title: "Виниры E-Max",
    price: "от 22 700 ₽",
    desc: "Эстетическое восстановление улыбки керамическими винирами.",
    fullDesc:
      "Виниры E-Max помогают улучшить форму, цвет и эстетику зубов. Это решение для пациентов, которые хотят получить красивую и естественную улыбку.",
    benefits: [
      "Естественный внешний вид",
      "Керамика E-Max",
      "Эстетика улыбки",
      "Индивидуальная форма",
    ],
  },
  {
    title: "Удаление зубов",
    price: "от 3 700 ₽",
    desc: "Бережное удаление зубов любой сложности под анестезией.",
    fullDesc:
      "Если зуб невозможно сохранить, проводится удаление. Процедура выполняется под местной анестезией с акцентом на безопасность и комфорт пациента.",
    benefits: [
      "Местная анестезия",
      "Удаление зубов мудрости",
      "Бережный подход",
      "Минимум стресса",
    ],
  },
  {
    title: "Лечение пульпита",
    price: "от 10 000 ₽",
    desc: "Лечение воспаления нерва зуба с обработкой каналов.",
    fullDesc:
      "Пульпит — воспаление внутренних тканей зуба, которое часто сопровождается сильной болью. Лечение направлено на устранение воспаления, обработку каналов и сохранение зуба.",
    benefits: [
      "Лечение каналов",
      "Современная анестезия",
      "Снятие острой боли",
      "Сохранение зуба",
    ],
  },
  {
    title: "Лечение периодонтита",
    price: "от 12 000 ₽",
    desc: "Комплексное лечение воспаления тканей вокруг корня зуба.",
    fullDesc:
      "Периодонтит возникает при воспалении тканей вокруг корня зуба и может приводить к осложнениям. Лечение требует точной диагностики, обработки каналов и контроля воспаления.",
    benefits: [
      "Точная диагностика",
      "Лечение воспаления",
      "Контроль осложнений",
      "Восстановление функции зуба",
    ],
  },
  {
    title: "Коронки",
    price: "от 14 900 ₽",
    desc: "Металлокерамические и циркониевые коронки для восстановления зубов.",
    fullDesc:
      "Коронки применяются для восстановления разрушенных зубов и протезирования на имплантах. Доступны варианты из металлокерамики и диоксида циркония.",
    benefits: [
      "Восстановление зуба",
      "Цирконий и металлокерамика",
      "Протезирование на имплантах",
      "Надёжная фиксация",
    ],
  },
  {
    title: "Съёмные протезы",
    price: "от 9 500 ₽",
    desc: "Полные и частичные акриловые протезы для восстановления зубного ряда.",
    fullDesc:
      "Съёмные акриловые протезы позволяют восстановить один, несколько или все зубы. Конструкция подбирается индивидуально и помогает вернуть жевательную функцию.",
    benefits: [
      "Полные и частичные протезы",
      "Доступное восстановление",
      "Естественный внешний вид",
      "Индивидуальное изготовление",
    ],
  },
  {
    title: "Синус-лифтинг",
    price: "от 45 000 ₽",
    desc: "Наращивание костной ткани перед установкой импланта.",
    fullDesc:
      "Синус-лифтинг проводится при недостаточном объёме костной ткани в области верхней челюсти. Это подготовительный этап перед имплантацией.",
    benefits: [
      "Подготовка к имплантации",
      "Костная пластика",
      "Микрохирургический подход",
      "Планирование результата",
    ],
  },
  {
    title: "Ортодонтия",
    price: "от 81 000 ₽",
    desc: "Брекеты и элайнеры для коррекции прикуса.",
    fullDesc:
      "Ортодонтическое лечение помогает исправить прикус и положение зубов. Доступны брекет-системы, частичные системы и элайнеры.",
    benefits: [
      "Брекеты Damon Q2",
      "Элайнеры Eurokappa",
      "Коррекция прикуса",
      "План лечения под пациента",
    ],
  },
];

type Props = {
  onBookService: (service: Service) => void;
};

export function Services({
  onBookService,
}: Props)
 {
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [showAll, setShowAll] = useState(false);

  const visibleServices = showAll ? services : services.slice(0, 5);

  return (
    <section id="services" className="relative overflow-hidden py-32">
      {/* BACKGROUND */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-[-120px] top-[120px] h-[420px] w-[420px] rounded-full bg-[var(--accent-light)]/15 blur-3xl" />

        <div className="absolute bottom-0 right-[-120px] h-[360px] w-[360px] rounded-full bg-[var(--accent-light)]/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        {/* HEADER */}
        <div className="max-w-3xl">
          <span
            className="
              inline-flex
              rounded-full
              border border-[var(--accent-light)]/20
              bg-[var(--accent-light)]/10
              px-4 py-2
              text-xs font-medium uppercase tracking-[0.25em]
              text-[var(--accent)]
              backdrop-blur
            "
          >
            Услуги
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
            Лечение,
            <br />
            ориентированное
            <br />
            на результат
          </h2>

          <p
            className="
              mt-6
              max-w-2xl
              text-lg
              font-semibold
              leading-relaxed
              text-[var(--text-soft)]
            "
          >
            Реальные услуги клиники, прозрачные цены и понятное описание без
            перегруженных медицинских терминов.
          </p>
        </div>

        {/* GRID */}
        <motion.div
          layout
          transition={{
            layout: {
              duration: 0.75,
              ease: smoothEase,
            },
          }}
          className="mt-20"
        >
          <motion.div
            layout
            className="grid gap-6 lg:grid-cols-3"
            style={{
              perspective: 1400,
              transformStyle: "preserve-3d",
            }}
          >
            <AnimatePresence mode="popLayout" initial={false}>
              {visibleServices.map((service, idx) => {
                const isNewCard = idx >= 5;
                const delay = showAll && isNewCard ? (idx - 5) * 0.075 : 0;

                return (
                  <motion.article
                    key={service.title}
                    layout
                    initial={
                      isNewCard
                        ? {
                            opacity: 0,
                            y: 34,
                            rotateX: -55,
                            rotateY: -4,
                            scale: 0.94,
                            filter: "blur(10px)",
                          }
                        : false
                    }
                    animate={{
                      opacity: 1,
                      y: 0,
                      rotateX: 0,
                      rotateY: 0,
                      scale: 1,
                      filter: "blur(0px)",
                    }}
                    exit={{
                      opacity: 0,
                      y: 28,
                      rotateX: 45,
                      rotateY: 4,
                      scale: 0.94,
                      filter: "blur(10px)",
                      transition: {
                        duration: 0.42,
                        ease: [0.4, 0, 0.2, 1] as const,
                      },
                    }}
                    transition={{
                      duration: 0.65,
                      ease: smoothEase,
                      delay,
                      layout: {
                        duration: 0.7,
                        ease: smoothEase,
                      },
                    }}
                    style={{
                      transformOrigin: "top center",
                      transformStyle: "preserve-3d",
                    }}
                    whileHover={{
                      y: -6,
                      rotateX: 1.5,
                      transition: { duration: 0.25 },
                    }}
                    className={
                      service.featured
                        ? `
                          group relative overflow-hidden
                          rounded-[36px]
                          bg-gradient-to-br
                          from-[var(--accent-light)]
                          via-[#16d6c5]
                          to-[var(--accent)]
                          p-10
                          text-white
                          shadow-[0_20px_80px_rgba(18,199,183,0.22)]
                          lg:col-span-2 lg:row-span-2
                        `
                        : `
                          group relative overflow-hidden
                          rounded-[32px]
                          border border-[var(--accent-light)]/15
                          bg-[var(--card)]
                          p-8
                          shadow-[0_10px_40px_rgba(18,199,183,0.08)]
                          backdrop-blur-xl
                          transition-colors duration-300
                          hover:border-[var(--accent-light)]/35
                        `
                    }
                  >
                    {service.featured ? (
                      <>
                        <div className="absolute right-[-80px] top-[-80px] h-[260px] w-[260px] rounded-full bg-white/15 blur-3xl transition-transform duration-700 group-hover:scale-125" />

                        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.10),transparent)]" />

                        <div className="relative">
                          <span className="rounded-full border border-white/30 bg-white/10 px-4 py-2 text-xs uppercase tracking-[0.2em] text-white backdrop-blur">
                            Популярная услуга
                          </span>

                          <h3 className="mt-10 text-4xl font-semibold md:text-5xl">
                            {service.title}
                          </h3>

                          <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/90">
                            {service.desc}
                          </p>

                          <div className="mt-10 flex items-center justify-between gap-6">
                            <div className="text-2xl font-semibold text-white">
                              {service.price}
                            </div>

                            <button
                              onClick={() => setSelectedService(service)}
                              className="
                                rounded-full
                                bg-white
                                px-6 py-3
                                text-sm font-medium
                                text-[var(--accent)]
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
                      </>
                    ) : (
                      <>
                        <div className="absolute right-[-70px] top-[-70px] h-[170px] w-[170px] rounded-full bg-[var(--accent-light)]/10 blur-3xl transition-transform duration-700 group-hover:scale-125" />

                        <div className="relative">
                          <div className="flex items-start justify-between gap-4">
                            <h3 className="text-xl font-semibold text-[var(--accent)]">
                              {service.title}
                            </h3>

                            <span className="shrink-0 text-sm font-medium text-[var(--accent)]">
                              {service.price}
                            </span>
                          </div>

                          <p className="mt-5 text-sm leading-relaxed text-[var(--text-muted)]">
                            {service.desc}
                          </p>

                          <button
                            onClick={() => setSelectedService(service)}
                            className="
                              mt-8
                              rounded-full
                              border border-[var(--accent-light)]/20
                              bg-[var(--accent-light)]/8
                              px-5 py-2.5
                              text-sm font-medium
                              text-[var(--accent)]
                              transition
                              hover:bg-[var(--accent-light)]
                              hover:text-white
                            "
                          >
                            Подробнее
                          </button>
                        </div>
                      </>
                    )}
                  </motion.article>
                );
              })}
            </AnimatePresence>
          </motion.div>
        </motion.div>

        {/* SHOW MORE */}
        {services.length > 5 && (
          <div className="mt-14 flex justify-center">
            <motion.button
              type="button"
              layout
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => setShowAll((prev) => !prev)}
              className="
                group relative overflow-hidden
                rounded-full
                border border-[var(--accent-light)]/20
                bg-[var(--card)]
                px-7 py-3
                text-sm font-medium
                text-[var(--accent)]
                shadow-sm
                transition-all duration-300
                hover:border-[var(--accent-light)]/40
                hover:text-white
                hover:shadow-lg hover:shadow-[var(--accent-light)]/20
              "
            >
              <span className="absolute inset-0 origin-left scale-x-0 bg-[var(--accent-light)] transition-transform duration-300 group-hover:scale-x-100" />

              <span className="relative inline-flex items-center gap-2">
                {showAll ? "Скрыть услуги" : "Показать все услуги"}

                <motion.span
                  animate={{ rotate: showAll ? 180 : 0 }}
                  transition={{
                    duration: 0.35,
                    ease: smoothEase,
                  }}
                >
                  ↓
                </motion.span>
              </span>
            </motion.button>
          </div>
        )}
      </div>

     <ServiceModal
  open={selectedService !== null}
  service={selectedService}
  onClose={() => setSelectedService(null)}
  onBook={(service) => {
    setSelectedService(null);
    onBookService(service);
  }}
/>
    </section>
  );
}