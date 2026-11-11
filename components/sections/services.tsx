"use client";

import Link from "next/link";
import { motion } from "framer-motion";

import { services, type Service } from "@/lib/services";
export type { Service } from "@/lib/services";

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
const visibleServices = preview
    ? services.slice(0, 3)
    : services;

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

                      <Link
                        href={`/services/${service.slug}`}
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
                      </Link>
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
</section>
  );
}