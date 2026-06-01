"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ServiceModal } from "@/components/ui/service-modal";

export type Service = {
  title: string;
  slug: string;
  price: string;
  image?: string;
  desc: string;
  fullDesc: string;
  benefits: string[];
  featured?: boolean;
};

const smoothEase = [0.22, 1, 0.36, 1] as const;

const services: Service[] = [
  {
    title: "Имплантация",
    slug: "implantation",
    price: "от 35 000 ₽",
    image: "/services/implantation.webp",
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
  title: "Установка зуба под ключ",
  slug: "implant-tooth-package",
  price: "60 000 ₽",
  image: "/services/zub.webp",
  desc: "Комплексное восстановление зуба: имплантат, операция, формирователь, слепки и циркониевая коронка.",
  fullDesc:
    "Установка зуба под ключ — это комплексное предложение для восстановления утраченного зуба. В стоимость входит установка имплантата, операция, формирователь десны, снятие слепков и коронка из диоксида циркония.",
  benefits: [
    "Установка имплантата",
    "Операция",
    "Формирователь десны",
    "Слепки",
    "Коронка из диоксида циркония",
  ],
},

  {
    title: "Лечение кариеса",
    slug: "caries",
    price: "6 500 ₽",
    image: "/services/caries.webp",
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
    slug: "hygiene",
    price: "4 000 ₽",
    image: "/services/hygiene.webp",
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
    slug: "veneers",
    price: "от 22 700 ₽",
    image: "/services/veneers.webp",
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
    slug: "extraction",
    price: "от 3 700 ₽",
    image: "/services/extraction.webp",
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
    slug: "pulpitis",
    price: "от 12 000 ₽",
    image: "/services/pulpitis.webp",
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
    slug: "periodontitis",
    price: "от 15 000 ₽",
    image: "/services/periodontitis.webp",
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
    slug: "crowns",
    price: "от 14 900 ₽",
    image: "/services/crowns.webp",
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
    slug: "prosthetics",
    price: "от 9 500 ₽",
    image: "/services/prosthetics.webp",
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
    slug: "sinus",
    price: "от 45 000 ₽",
    image: "/services/sinus.webp",
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
    slug: "orthodontics",
    price: "от 81 000 ₽",
    image: "/services/orthodontics.webp",
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


const advantages = [
  {
    title: "Прозрачные цены",
    desc: "Пациент заранее понимает стоимость и этапы лечения.",
  },
  {
    title: "Современная диагностика",
    desc: "Планирование лечения строится на точной диагностике и клинической картине.",
  },
  {
    title: "Комплексный подход",
    desc: "Терапия, хирургия, ортопедия и гигиена работают как единая система.",
  },
  {
    title: "Комфортное лечение",
    desc: "Внимательное отношение, анестезия и спокойная атмосфера на приёме.",
  },
];

type Props = {
  onBookService: (service: Service) => void;
  preview?: boolean;
};

export function Services({
  onBookService,
  preview = false,
}: Props) {
  const [selectedService, setSelectedService] =
    useState<Service | null>(null);

  const visibleServices = preview
    ? services.slice(0, 3)
    : services;

  useEffect(() => {
  if (preview) return;

  const hash = window.location.hash.replace("#", "");

  if (!hash) return;

  const targetService = services.find(
    (service) => service.slug === hash
  );

  if (!targetService) return;

  const openServiceFromHash = () => {
    const element = document.getElementById(hash);

    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }

    window.setTimeout(() => {
      setSelectedService(targetService);
    }, 450);
  };

  const timeoutId = window.setTimeout(openServiceFromHash, 350);

  return () => {
    window.clearTimeout(timeoutId);
  };
}, [preview]);

  return (
    <section
      id="services"
      className={`
        relative
        overflow-hidden
        ${preview ? "py-24 sm:py-28 lg:py-32" : "pb-32 pt-36"}
      `}
    >
      {/* BACKGROUND */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-[-120px] top-[120px] h-[420px] w-[420px] rounded-full bg-[var(--accent-light)]/15 blur-3xl" />
        <div className="absolute bottom-0 right-[-120px] h-[360px] w-[360px] rounded-full bg-[var(--accent-light)]/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        {/* PAGE HERO */}
        {!preview && (
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
                backdrop-blur
              "
            >
              Услуги клиники
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
              Стоматологические
              <br />
              услуги
            </h1>

            <p
              className="
                mx-auto
                mt-6
                max-w-3xl
                text-lg
                font-medium
                leading-relaxed
                text-[var(--text-soft)]
              "
            >
              От профилактики и лечения кариеса до имплантации,
              протезирования и восстановления эстетики улыбки.
              Все направления собраны в одном месте, чтобы пациент мог
              получить комплексное лечение без лишних переходов между
              клиниками.
            </p>
          </div>
        )}

        {/* PREVIEW HEADER */}
        {preview && (
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
              Популярные направления клиники с понятным описанием и
              прозрачными ценами.
            </p>
          </div>
        )}

        {/* CATALOG HEADER */}
        {!preview && (
          <div className="mt-24 max-w-3xl">
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
                backdrop-blur
              "
            >
              Каталог
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
              Все направления
              <br />
              лечения
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
              Выберите нужную услугу, чтобы посмотреть подробности,
              преимущества и ориентировочную стоимость.
            </p>
          </div>
        )}

        {/* GRID */}
        <motion.div
          layout
          transition={{
            layout: {
              duration: 0.75,
              ease: smoothEase,
            },
          }}
          className={preview ? "mt-16" : "mt-16"}
        >
          <motion.div
            layout
            className="grid gap-6 lg:grid-cols-3"
            style={{
              perspective: 1400,
              transformStyle: "preserve-3d",
            }}
          >
            {visibleServices.map((service, idx) => {
              const isFeatured = service.featured && !preview;

              return (
                <motion.article
                  id={service.slug}
                  key={service.title}
                  layout
                  initial={{
                    opacity: 0,
                    y: 24,
                    scale: 0.97,
                    filter: "blur(8px)",
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    filter: "blur(0px)",
                  }}
                  transition={{
                    duration: 0.55,
                    ease: smoothEase,
                    delay: idx * 0.045,
                    layout: {
                      duration: 0.7,
                      ease: smoothEase,
                    },
                  }}
                  style={{
                    scrollMarginTop: "120px",
                    transformOrigin: "top center",
                    transformStyle: "preserve-3d",
                  }}
                  whileHover={{
                    y: -6,
                    rotateX: 1.5,
                    transition: {
                      duration: 0.25,
                    },
                  }}
                  className={
                    isFeatured
                      ? `
                        group
                        relative
                        overflow-hidden
                        rounded-[36px]
                        bg-gradient-to-br
                        from-[var(--accent-light)]
                        via-[#16d6c5]
                        to-[var(--accent)]
                        p-5
                        text-white
                        shadow-[0_20px_80px_rgba(18,199,183,0.22)]
                        lg:col-span-2
                        lg:row-span-2
                      `
                      : `
                        group
                        relative
                        overflow-hidden
                        rounded-[32px]
                        border
                        border-[var(--accent-light)]/15
                        bg-[var(--card)]
                        p-5
                        shadow-[0_10px_40px_rgba(18,199,183,0.08)]
                        backdrop-blur-xl
                        transition-colors
                        duration-300
                        hover:border-[var(--accent-light)]/35
                      `
                  }
                >
                  {/* IMAGE */}
                  <div
                    className={`
                      relative
                      overflow-hidden
                      rounded-[24px]
                      ${isFeatured ? "h-[300px]" : "h-[190px]"}
                    `}
                  >
                    <div
                      className={`
                        absolute
                        inset-0
                        ${
                          isFeatured
                            ? "bg-white/12"
                            : "bg-[var(--accent-light)]/10"
                        }
                      `}
                    />

                    {service.image && (
                      <img
                        src={service.image}
                        alt={service.title}
                        loading="lazy"
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                        }}
                        className="
                          absolute
                          inset-0
                          h-full
                          w-full
                          object-cover
                          transition-transform
                          duration-700
                          group-hover:scale-105
                        "
                      />
                    )}

                    <div
                      className={`
                        absolute
                        inset-0
                        ${
                          isFeatured
                            ? "bg-gradient-to-t from-[#071412]/65 via-[#071412]/10 to-transparent"
                            : "bg-gradient-to-t from-[var(--accent)]/28 via-transparent to-transparent"
                        }
                      `}
                    />

                    <div
                      className="
                        absolute
                        right-5
                        top-5
                        rounded-full
                        border
                        border-white/25
                        bg-white/15
                        px-3
                        py-1.5
                        text-xs
                        font-medium
                        text-white
                        backdrop-blur-xl
                      "
                    >
                      {service.price}
                    </div>
                  </div>

                  {/* CONTENT */}
                  <div className={isFeatured ? "p-5" : "p-3 pt-6"}>
                    {isFeatured && (
                      <span
                        className="
                          inline-flex
                          rounded-full
                          border
                          border-white/30
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
                        Популярная услуга
                      </span>
                    )}

                    <h3
                      className={
                        isFeatured
                          ? "mt-7 text-4xl font-semibold md:text-5xl"
                          : "text-xl font-semibold text-[var(--accent)]"
                      }
                    >
                      {service.title}
                    </h3>

                    <p
                      className={
                        isFeatured
                          ? "mt-5 max-w-xl text-lg leading-relaxed text-white/90"
                          : "mt-4 text-sm leading-relaxed text-[var(--text-muted)]"
                      }
                    >
                      {service.desc}
                    </p>

                    <div className="mt-6 flex flex-wrap gap-2">
                      {service.benefits.slice(0, 3).map((benefit) => (
                        <span
                          key={benefit}
                          className={
                            isFeatured
                              ? "rounded-full border border-white/15 bg-white/12 px-3 py-1 text-xs text-white backdrop-blur"
                              : "rounded-full border border-[var(--accent-light)]/18 bg-[var(--accent-light)]/7 px-3 py-1 text-xs text-[var(--text-soft)]"
                          }
                        >
                          {benefit}
                        </span>
                      ))}
                    </div>

                    <div className="mt-7 flex items-center justify-between gap-4">
                      <div
                        className={
                          isFeatured
                            ? "text-2xl font-semibold text-white"
                            : "text-lg font-semibold text-[var(--accent)]"
                        }
                      >
                        {service.price}
                      </div>

                      <button
                        type="button"
                        onClick={() => setSelectedService(service)}
                        className={
                          isFeatured
                            ? `
                              rounded-full
                              bg-white
                              px-6
                              py-3
                              text-sm
                              font-medium
                              text-[var(--accent)]
                              shadow-lg
                              transition
                              hover:scale-[1.03]
                              hover:bg-[#eafffc]
                            `
                            : `
                              rounded-full
                              border
                              border-[var(--accent-light)]/20
                              bg-[var(--accent-light)]/8
                              px-5
                              py-2.5
                              text-sm
                              font-medium
                              text-[var(--accent)]
                              transition
                              hover:bg-[var(--accent-light)]
                              hover:text-white
                            `
                        }
                      >
                        Подробнее
                      </button>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </motion.div>
        </motion.div>

        {/* PREVIEW CTA */}
        {preview && (
          <div className="mt-14 flex justify-center">
            <Link
              href="/services"
              className="
                group
                relative
                overflow-hidden
                rounded-full
                border
                border-[var(--accent-light)]/20
                bg-[var(--card)]
                px-8
                py-4
                text-sm
                font-semibold
                text-[var(--accent)]
                shadow-[0_10px_40px_rgba(18,199,183,0.08)]
                transition-all
                duration-500
                hover:-translate-y-1
                hover:border-[var(--accent-light)]/40
                hover:shadow-[0_20px_60px_rgba(18,199,183,0.18)]
              "
            >
              <span className="relative flex items-center gap-3">
                Все услуги

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
            </Link>
          </div>
        )}

        {/* ADVANTAGES */}
        {!preview && (
          <div className="mt-28">
            <div className="mx-auto max-w-3xl text-center">
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
                Почему выбирают нас
              </span>

              <h2
                className="
                  mt-6
                  text-4xl
                  font-semibold
                  text-[var(--accent)]
                  md:text-5xl
                "
              >
                Лечение должно быть понятным
                и спокойным
              </h2>

              <p
                className="
                  mx-auto
                  mt-5
                  max-w-2xl
                  text-lg
                  leading-relaxed
                  text-[var(--text-soft)]
                "
              >
                Мы объясняем этапы лечения, предлагаем несколько вариантов
                и помогаем выбрать решение, которое подходит пациенту.
              </p>
            </div>

            <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {advantages.map((item) => (
                <motion.div
                  key={item.title}
                  whileHover={{ y: -5 }}
                  className="
                    rounded-[30px]
                    border
                    border-[var(--accent-light)]/15
                    bg-[var(--card)]
                    p-7
                    shadow-[0_14px_45px_rgba(18,199,183,0.06)]
                    backdrop-blur-xl
                    transition-all
                    duration-300
                    hover:border-[var(--accent-light)]/35
                  "
                >
                  <div
                    className="
                      flex
                      h-10
                      w-10
                      items-center
                      justify-center
                      rounded-full
                      bg-[var(--accent-light)]/12
                      text-[var(--accent)]
                    "
                  >
                    ✓
                  </div>

                  <h3 className="mt-5 text-lg font-semibold text-[var(--accent)]">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-sm leading-relaxed text-[var(--text-muted)]">
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* FINAL CTA */}
        {!preview && (
          <div className="mt-28">
            <div
              className="
                relative
                overflow-hidden
                rounded-[40px]
                border
                border-[var(--accent-light)]/20
                bg-[var(--card)]
                p-10
                text-center
                shadow-[0_20px_80px_rgba(18,199,183,0.08)]
                backdrop-blur-xl
                md:p-14
              "
            >
              <div
                className="
                  pointer-events-none
                  absolute
                  left-1/2
                  top-[-120px]
                  h-[320px]
                  w-[320px]
                  -translate-x-1/2
                  rounded-full
                  bg-[var(--accent-light)]/14
                  blur-3xl
                "
              />

              <div className="relative">
                <h2
                  className="
                    text-4xl
                    font-semibold
                    text-[var(--accent)]
                    md:text-5xl
                  "
                >
                  Не нашли нужную услугу?
                </h2>

                <p
                  className="
                    mx-auto
                    mt-5
                    max-w-2xl
                    text-lg
                    leading-relaxed
                    text-[var(--text-soft)]
                  "
                >
                  Свяжитесь с нами, и администратор подскажет, какое
                  направление подойдёт именно в вашей ситуации.
                </p>

                <Link
                  href="/contact"
                  className="
                    mt-8
                    inline-flex
                    rounded-full
                    bg-[var(--accent-light)]
                    px-8
                    py-4
                    text-sm
                    font-semibold
                    text-[#071412]
                    shadow-[0_12px_40px_rgba(18,199,183,0.28)]
                    transition-all
                    duration-300
                    hover:-translate-y-[2px]
                    hover:brightness-110
                  "
                >
                  Связаться с клиникой
                </Link>
              </div>
            </div>
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