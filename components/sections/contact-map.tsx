"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { reveal } from "@/lib/motion";

export function ContactMap() {
  const [copied, setCopied] = useState(false);

  const address = "г. Мурино, Воронцовский бульвар, 2";
  const phone = "+78126026160";

  /*
    Карта теперь открывает не просто адрес дома,
    а конкретную карточку организации OLGA в Яндекс.Картах.
  */
  const yandexMapUrl =
    "https://yandex.ru/map-widget/v1/?mode=search&oid=99713820273&ol=biz&z=17";

  const yandexClinicUrl =
    "https://yandex.ru/maps/org/olga/99713820273/";

  const yandexRouteUrl =
    "https://yandex.ru/maps/org/olga/99713820273/";

  const copyAddress = async () => {
    try {
      await navigator.clipboard.writeText(address);
      setCopied(true);

      setTimeout(() => setCopied(false), 1500);
    } catch (error) {
      console.error("COPY ADDRESS ERROR:", error);
      alert("Не удалось скопировать адрес");
    }
  };

  return (
    <motion.section
      id="contact"
      className="relative overflow-hidden py-32"
      initial={false}
      animate="visible"
      variants={reveal}
    >
      {/* BACKGROUND */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="
            absolute
            left-[-180px]
            top-[80px]
            h-[420px]
            w-[420px]
            rounded-full
            bg-[var(--accent-light)]/12
            blur-3xl
          "
        />

        <div
          className="
            absolute
            bottom-[-120px]
            right-[-120px]
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
            Контакты
          </span>

          <h2
            className="
              mt-6
              text-4xl
              font-semibold
              text-[var(--accent)]
              md:text-6xl
            "
          >
            Как нас найти
          </h2>

          <p
            className="
              mt-6
              max-w-2xl
              text-lg
              leading-relaxed
              text-[var(--text-soft)]
            "
          >
            OLGA Dental Clinic находится в Мурино на Воронцовском бульваре.
            Постройте маршрут, позвоните в клинику или скопируйте адрес для
            навигатора.
          </p>
        </div>

        {/* GRID */}
        <div className="mt-16 grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          {/* LEFT */}
          <div className="space-y-6">
            {/* ADDRESS */}
            <motion.div
              whileHover={{ y: -4 }}
              className="
                relative
                overflow-hidden
                rounded-[30px]
                border
                border-[var(--accent-light)]/15
                bg-[var(--card)]
                p-7
                shadow-[0_10px_40px_rgba(18,199,183,0.08)]
                backdrop-blur-xl
              "
            >
              <div
                className="
                  pointer-events-none
                  absolute
                  right-[-70px]
                  top-[-70px]
                  h-[170px]
                  w-[170px]
                  rounded-full
                  bg-[var(--accent-light)]/10
                  blur-3xl
                "
              />

              <div className="relative">
                <div
                  className="
                    text-sm
                    uppercase
                    tracking-[0.2em]
                    text-[var(--accent)]
                  "
                >
                  Адрес
                </div>

                <div
                  className="
                    mt-3
                    text-xl
                    font-semibold
                    leading-snug
                    text-[var(--accent)]
                  "
                >
                  {address}
                </div>

                <div className="mt-5 flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={copyAddress}
                    className="
                      rounded-full
                      border
                      border-[var(--accent-light)]/20
                      bg-[var(--glass)]
                      px-5
                      py-2.5
                      text-sm
                      font-medium
                      text-[var(--accent)]
                      transition-all
                      duration-300
                      hover:border-[var(--accent-light)]/40
                      hover:bg-[var(--accent-light)]/6
                    "
                  >
                    {copied ? "Скопировано ✓" : "Скопировать адрес"}
                  </button>

                  <a
                    href={yandexClinicUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                      rounded-full
                      border
                      border-[var(--accent-light)]/20
                      bg-[var(--glass)]
                      px-5
                      py-2.5
                      text-sm
                      font-medium
                      text-[var(--accent)]
                      transition-all
                      duration-300
                      hover:border-[var(--accent-light)]/40
                      hover:bg-[var(--accent-light)]/6
                    "
                  >
                    Открыть в Яндекс.Картах
                  </a>
                </div>
              </div>
            </motion.div>

            {/* PHONE */}
            <motion.div
              whileHover={{ y: -4 }}
              className="
                relative
                overflow-hidden
                rounded-[30px]
                border
                border-[var(--accent-light)]/15
                bg-[var(--card)]
                p-7
                shadow-[0_10px_40px_rgba(18,199,183,0.08)]
                backdrop-blur-xl
              "
            >
              <div
                className="
                  pointer-events-none
                  absolute
                  right-[-70px]
                  top-[-70px]
                  h-[170px]
                  w-[170px]
                  rounded-full
                  bg-[var(--accent-light)]/10
                  blur-3xl
                "
              />

              <div className="relative">
                <div
                  className="
                    text-sm
                    uppercase
                    tracking-[0.2em]
                    text-[var(--accent)]
                  "
                >
                  Телефон
                </div>

                <div
                  className="
                    mt-3
                    text-xl
                    font-semibold
                    text-[var(--accent)]
                  "
                >
                  +7 (812) 602-61-60
                </div>

                <a
                  href={`tel:${phone}`}
                  className="
                    mt-5
                    inline-flex
                    rounded-full
                    border
                    border-[var(--accent-light)]/20
                    bg-[var(--glass)]
                    px-5
                    py-2.5
                    text-sm
                    font-medium
                    text-[var(--accent)]
                    transition-all
                    duration-300
                    hover:border-[var(--accent-light)]/40
                    hover:bg-[var(--accent-light)]/6
                  "
                >
                  Позвонить
                </a>
              </div>
            </motion.div>

            {/* HOURS */}
            <motion.div
              whileHover={{ y: -4 }}
              className="
                relative
                overflow-hidden
                rounded-[30px]
                border
                border-[var(--accent-light)]/15
                bg-[var(--card)]
                p-7
                shadow-[0_10px_40px_rgba(18,199,183,0.08)]
                backdrop-blur-xl
              "
            >
              <div
                className="
                  pointer-events-none
                  absolute
                  right-[-70px]
                  top-[-70px]
                  h-[170px]
                  w-[170px]
                  rounded-full
                  bg-[var(--accent-light)]/10
                  blur-3xl
                "
              />

              <div className="relative">
                <div
                  className="
                    text-sm
                    uppercase
                    tracking-[0.2em]
                    text-[var(--accent)]
                  "
                >
                  Время работы
                </div>

                <div
                  className="
                    mt-3
                    text-xl
                    font-semibold
                    text-[var(--accent)]
                  "
                >
                  Ежедневно: 10:00 – 21:00
                </div>

                <p
                  className="
                    mt-4
                    text-sm
                    leading-relaxed
                    text-[var(--text-muted)]
                  "
                >
                  Рекомендуем записываться заранее, чтобы администратор подобрал
                  удобное время и нужного специалиста.
                </p>
              </div>
            </motion.div>

            {/* CTA */}
            <div className="flex flex-wrap gap-4">
              <a
                href={yandexRouteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  rounded-full
                  bg-[var(--accent-light)]
                  px-7
                  py-3.5
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
                Построить маршрут
              </a>

              <a
                href={`tel:${phone}`}
                className="
                  rounded-full
                  border
                  border-[var(--accent-light)]/20
                  bg-[var(--card)]
                  px-7
                  py-3.5
                  text-sm
                  font-semibold
                  text-[var(--accent)]
                  transition-all
                  duration-300
                  hover:-translate-y-[2px]
                  hover:border-[var(--accent-light)]/40
                  hover:bg-[var(--accent-light)]/6
                "
              >
                Позвонить
              </a>
            </div>
          </div>

          {/* RIGHT — MAP */}
          <motion.div
            initial={false}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="
              relative
              min-h-[520px]
              overflow-hidden
              rounded-[36px]
              border
              border-[var(--accent-light)]/15
              bg-[var(--card)]
              shadow-[0_20px_80px_rgba(18,199,183,0.12)]
              backdrop-blur-xl
              lg:min-h-full
            "
          >
            <div
              className="
                pointer-events-none
                absolute
                right-[-80px]
                top-[-80px]
                h-[240px]
                w-[240px]
                rounded-full
                bg-[var(--accent-light)]/15
                blur-3xl
              "
            />

            <div
              className="
                pointer-events-none
                absolute
                inset-0
                z-[1]
                bg-gradient-to-t
                from-[var(--accent-light)]/10
                via-transparent
                to-transparent
              "
            />

            <motion.div
              initial={false}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="
                pointer-events-none
                absolute
                bottom-5
                left-5
                z-10
                max-w-[calc(100%-40px)]
                rounded-2xl
                border
                border-[var(--accent-light)]/15
                bg-[var(--card)]
                px-5
                py-4
                shadow-[0_12px_40px_rgba(18,199,183,0.12)]
                backdrop-blur-xl
              "
            >
              <div className="font-semibold text-[var(--accent)]">
                OLGA Dental Clinic
              </div>

              <div
                className="
                  mt-1
                  text-xs
                  uppercase
                  tracking-[0.15em]
                  text-[var(--text-muted)]
                "
              >
                Мурино · Воронцовский бульвар, 2
              </div>
            </motion.div>

            <iframe
              src={yandexMapUrl}
              className="h-[520px] w-full border-0 lg:h-full"
              loading="lazy"
              allowFullScreen
              title="OLGA Dental Clinic на Яндекс.Картах"
            />
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}