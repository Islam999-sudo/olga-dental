"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const clinicPhotos = [
  {
    src: "/clinic/clinic-1.jpg",
    title: "Зона приёма",
    desc: "Спокойная атмосфера с первого визита.",
  },
  {
    src: "/clinic/clinic-2.jpg",
    title: "Кабинеты",
    desc: "Современное пространство для лечения.",
  },
  {
    src: "/clinic/clinic-3.jpg",
    title: "Диагностика",
    desc: "Точное планирование перед началом лечения.",
  },
  {
    src: "/clinic/clinic-4.jpg",
    title: "Оборудование",
    desc: "Технологии для комфорта и предсказуемого результата.",
  },
  {
    src: "/clinic/clinic-5.jpg",
    title: "Команда",
    desc: "Специалисты разных направлений работают вместе.",
  },
  {
    src: "/clinic/clinic-6.jpg",
    title: "Комфорт",
    desc: "Внимание к деталям на каждом этапе визита.",
  },
];

const features = [
  {
    title: "Современные технологии",
    desc: "Используем цифровую диагностику и современные методы лечения, чтобы заранее планировать результат и объяснять пациенту каждый этап.",
  },
  {
    title: "Опытная команда",
    desc: "В клинике работают специалисты разных направлений: терапия, хирургия, ортопедия, имплантация, ортодонтия и гигиена.",
  },
  {
    title: "Комфорт пациентов",
    desc: "Мы уделяем внимание не только лечению, но и атмосфере: спокойный приём, понятные объяснения и аккуратная работа.",
  },
  {
    title: "Индивидуальный подход",
    desc: "План лечения формируется под конкретного пациента: состояние зубов, цели, бюджет и долгосрочный результат.",
  },
];

const values = [
  {
    title: "Прозрачность",
    desc: "Пациент понимает, что происходит, зачем нужен каждый этап и какие есть варианты лечения.",
  },
  {
    title: "Точность",
    desc: "Диагностика и планирование помогают снизить неопределённость и сделать лечение предсказуемым.",
  },
  {
    title: "Эстетика",
    desc: "Мы стремимся к результату, который выглядит естественно и не выбивается из внешности пациента.",
  },
  {
    title: "Безопасность",
    desc: "Внимательно относимся к стерильности, состоянию пациента и клиническим показаниям.",
  },
];

const stats = [
  {
    value: "5+",
    label: "лет опыта",
  },
  {
    value: "10 000+",
    label: "пациентов",
  },
  {
    value: "4.9",
    label: "средний рейтинг",
  },
  {
    value: "100%",
    label: "цифровая диагностика",
  },
];

export function AboutPageContent() {
  return (
    <main className="relative overflow-hidden pb-32 pt-32">
      {/* BACKGROUND */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="
            absolute
            left-[-180px]
            top-[80px]
            h-[520px]
            w-[520px]
            rounded-full
            bg-[var(--accent-light)]/12
            blur-3xl
          "
        />

        <div
          className="
            absolute
            right-[-180px]
            top-[520px]
            h-[460px]
            w-[460px]
            rounded-full
            bg-[var(--accent-light)]/10
            blur-3xl
          "
        />

        <div
          className="
            absolute
            bottom-[-220px]
            left-1/2
            h-[520px]
            w-[760px]
            -translate-x-1/2
            rounded-full
            bg-[var(--accent-light)]/8
            blur-3xl
          "
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        {/* HERO */}
        <section
          className="
            grid
            gap-12
            lg:grid-cols-[1fr_430px]
            lg:items-end
          "
        >
          <div className="max-w-4xl">
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
                shadow-[0_8px_30px_rgba(18,199,183,0.08)]
                backdrop-blur
              "
            >
              О клинике
            </span>

            <h1
              className="
                mt-7
                text-5xl
                font-semibold
                tracking-tight
                text-[var(--accent)]
                md:text-7xl
              "
            >
              Современная
              <br />
              стоматология
              <br />
              с вниманием к деталям
            </h1>

            <p
              className="
                mt-7
                max-w-3xl
                text-lg
                font-medium
                leading-relaxed
                text-[var(--text-soft)]
                md:text-xl
              "
            >
              OLGA Dental — это клиника, где технологии, опыт врачей и
              спокойная атмосфера работают вместе. Мы помогаем пациентам
              проходить лечение понятно, комфортно и с ориентиром на
              долгосрочный результат.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/contact"
                className="
                  inline-flex
                  justify-center
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
                Записаться на консультацию
              </Link>

              <Link
                href="/doctors"
                className="
                  inline-flex
                  justify-center
                  rounded-full
                  border
                  border-[var(--accent-light)]/20
                  bg-[var(--card)]
                  px-8
                  py-4
                  text-sm
                  font-semibold
                  text-[var(--accent)]
                  shadow-[0_10px_35px_rgba(18,199,183,0.08)]
                  backdrop-blur-xl
                  transition-all
                  duration-300
                  hover:-translate-y-[2px]
                  hover:border-[var(--accent-light)]/40
                  hover:bg-[var(--accent-light)]/6
                "
              >
                Смотреть врачей
              </Link>
            </div>
          </div>

          {/* HERO INFO CARD */}
          <motion.div
            whileHover={{ y: -5 }}
            className="
              relative
              overflow-hidden
              rounded-[38px]
              border
              border-[var(--accent-light)]/18
              bg-[var(--card)]
              p-7
              shadow-[0_22px_80px_rgba(18,199,183,0.1)]
              backdrop-blur-2xl
            "
          >
            <div
              className="
                pointer-events-none
                absolute
                right-[-90px]
                top-[-90px]
                h-[260px]
                w-[260px]
                rounded-full
                bg-[var(--accent-light)]/14
                blur-3xl
              "
            />

            <div className="relative">
              <div
                className="
                  text-sm
                  font-semibold
                  text-[var(--accent)]
                "
              >
                Наша задача — сделать лечение понятным
              </div>

              <p
                className="
                  mt-3
                  text-sm
                  leading-relaxed
                  text-[var(--text-muted)]
                "
              >
                Пациенту важно не просто получить услугу, а понимать: что
                происходит, почему это нужно и какой результат ожидается. Поэтому
                мы делаем акцент на диагностике, объяснении и аккуратном
                планировании.
              </p>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <div
                  className="
                    rounded-2xl
                    border
                    border-[var(--accent-light)]/12
                    bg-[var(--accent-light)]/5
                    p-4
                  "
                >
                  <div className="text-2xl font-semibold text-[var(--accent)]">
                    360°
                  </div>
                  <div className="mt-1 text-xs text-[var(--text-muted)]">
                    комплексный взгляд
                  </div>
                </div>

                <div
                  className="
                    rounded-2xl
                    border
                    border-[var(--accent-light)]/12
                    bg-[var(--accent-light)]/5
                    p-4
                  "
                >
                  <div className="text-2xl font-semibold text-[var(--accent)]">
                    Plan
                  </div>
                  <div className="mt-1 text-xs text-[var(--text-muted)]">
                    понятный план лечения
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* MAIN PHOTO / CLINIC ATMOSPHERE */}
        <section className="mt-24">
          <div
            className="
              relative
              overflow-hidden
              rounded-[46px]
              border
              border-[var(--accent-light)]/18
              bg-[var(--card)]
              p-4
              shadow-[0_26px_100px_rgba(18,199,183,0.12)]
              backdrop-blur-2xl
              md:p-5
            "
          >
            <div
              className="
                pointer-events-none
                absolute
                inset-0
                bg-[radial-gradient(circle_at_50%_0%,rgba(18,199,183,0.16),transparent_55%)]
              "
            />

            <div
              className="
                relative
                grid
                gap-5
                lg:grid-cols-[1.25fr_0.75fr]
              "
            >
              <div
                className="
                  relative
                  min-h-[380px]
                  overflow-hidden
                  rounded-[36px]
                  bg-[var(--accent-light)]/8
                  md:min-h-[520px]
                "
              >
                <img
                  src="/clinic/clinic-1.jpg"
                  alt="Интерьер клиники OLGA Dental"
                  loading="eager"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                  className="
                    absolute
                    inset-0
                    h-full
                    w-full
                    object-cover
                  "
                />

                <div
                  className="
                    absolute
                    inset-0
                    bg-gradient-to-t
                    from-[#03100f]/82
                    via-[#03100f]/18
                    to-transparent
                  "
                />

                <div
                  className="
                    absolute
                    bottom-0
                    left-0
                    right-0
                    p-7
                    text-white
                    md:p-10
                  "
                >
                  <div className="text-xs uppercase tracking-[0.24em] text-white/65">
                    Пространство клиники
                  </div>

                  <h2
                    className="
                      mt-3
                      max-w-2xl
                      text-3xl
                      font-semibold
                      leading-tight
                      md:text-5xl
                    "
                  >
                    Светлая атмосфера,
                    современное оборудование
                    и спокойный приём
                  </h2>

                  <p
                    className="
                      mt-5
                      max-w-2xl
                      text-sm
                      leading-relaxed
                      text-white/78
                      md:text-base
                    "
                  >
                    Визит к стоматологу не должен ощущаться как стресс.
                    Поэтому мы уделяем внимание деталям: от первого контакта до
                    завершения лечения.
                  </p>
                </div>
              </div>

              <div className="grid gap-5">
                {clinicPhotos.slice(1, 3).map((photo) => (
                  <div
                    key={photo.src}
                    className="
                      relative
                      min-h-[245px]
                      overflow-hidden
                      rounded-[34px]
                      border
                      border-[var(--accent-light)]/12
                      bg-[var(--accent-light)]/8
                    "
                  >
                    <img
                      src={photo.src}
                      alt={photo.title}
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
                      "
                    />

                    <div
                      className="
                        absolute
                        inset-0
                        bg-gradient-to-t
                        from-[#03100f]/78
                        via-[#03100f]/12
                        to-transparent
                      "
                    />

                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <h3 className="text-2xl font-semibold">
                        {photo.title}
                      </h3>

                      <p className="mt-2 text-sm leading-relaxed text-white/72">
                        {photo.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* GALLERY */}
        <section className="mt-28">
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
              Галерея
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
              Атмосфера клиники
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
              
            </p>
          </div>

          <div
            className="
              mt-14
              grid
              gap-5
              md:grid-cols-4
              md:grid-rows-[260px_260px]
            "
          >
            {clinicPhotos.map((photo, index) => (
              <motion.div
                key={photo.src}
                whileHover={{ y: -5 }}
                className={`
                  group
                  relative
                  min-h-[260px]
                  overflow-hidden
                  rounded-[34px]
                  border
                  border-[var(--accent-light)]/15
                  bg-[var(--card)]
                  shadow-[0_14px_45px_rgba(18,199,183,0.06)]
                  backdrop-blur-xl
                  ${
                    index === 0
                      ? "md:col-span-2 md:row-span-2"
                      : ""
                  }
                  ${
                    index === 3
                      ? "md:col-span-2"
                      : ""
                  }
                `}
              >
                <img
                  src={photo.src}
                  alt={photo.title}
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

                <div
                  className="
                    absolute
                    inset-0
                    bg-gradient-to-t
                    from-[#03100f]/82
                    via-[#03100f]/12
                    to-transparent
                  "
                />

                <div
                  className="
                    pointer-events-none
                    absolute
                    inset-0
                    bg-[radial-gradient(circle_at_50%_0%,rgba(18,199,183,0.14),transparent_58%)]
                  "
                />

                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-2xl font-semibold">
                    {photo.title}
                  </h3>

                  <p className="mt-2 text-sm leading-relaxed text-white/72">
                    {photo.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* FEATURES */}
        <section className="mt-28">
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
              Наш подход
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
              Лечение, в котором
              всё объясняется заранее
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
              Хорошая стоматология — это не только оборудование. Это ясная
              коммуникация, внимательная диагностика и врач, который помогает
              пациенту принять спокойное решение.
            </p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-2">
            {features.map((item) => (
              <motion.div
                key={item.title}
                whileHover={{ y: -5 }}
                className="
                  relative
                  overflow-hidden
                  rounded-[34px]
                  border
                  border-[var(--accent-light)]/15
                  bg-[var(--card)]
                  p-8
                  shadow-[0_14px_45px_rgba(18,199,183,0.06)]
                  backdrop-blur-xl
                  transition-all
                  duration-300
                  hover:border-[var(--accent-light)]/35
                "
              >
                <div
                  className="
                    pointer-events-none
                    absolute
                    right-[-70px]
                    top-[-70px]
                    h-[180px]
                    w-[180px]
                    rounded-full
                    bg-[var(--accent-light)]/10
                    blur-3xl
                  "
                />

                <h3
                  className="
                    relative
                    text-xl
                    font-semibold
                    text-[var(--accent)]
                  "
                >
                  {item.title}
                </h3>

                <p
                  className="
                    relative
                    mt-4
                    leading-relaxed
                    text-[var(--text-muted)]
                  "
                >
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* VALUES */}
        <section className="mt-28">
          <div
            className="
              relative
              overflow-hidden
              rounded-[44px]
              border
              border-[var(--accent-light)]/18
              bg-[linear-gradient(135deg,rgba(18,199,183,0.12),rgba(18,199,183,0.035))]
              p-8
              shadow-[0_24px_90px_rgba(18,199,183,0.1)]
              backdrop-blur-2xl
              md:p-12
            "
          >
            <div
              className="
                pointer-events-none
                absolute
                right-[-160px]
                top-[-160px]
                h-[420px]
                w-[420px]
                rounded-full
                bg-[var(--accent-light)]/16
                blur-3xl
              "
            />

            <div
              className="
                relative
                grid
                gap-10
                lg:grid-cols-[0.8fr_1.2fr]
                lg:items-start
              "
            >
              <div>
                <span
                  className="
                    inline-flex
                    rounded-full
                    border
                    border-[var(--accent-light)]/20
                    bg-[var(--card)]/60
                    px-4
                    py-2
                    text-xs
                    font-semibold
                    uppercase
                    tracking-[0.25em]
                    text-[var(--accent)]
                    backdrop-blur-xl
                  "
                >
                  Принципы
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
                  Что важно
                  <br />
                  в нашей работе
                </h2>

                <p
                  className="
                    mt-5
                    text-base
                    leading-relaxed
                    text-[var(--text-soft)]
                    md:text-lg
                  "
                >
                  Мы не строим лечение на случайных решениях. В основе —
                  диагностика, честное объяснение, аккуратность и уважение к
                  пациенту.
                </p>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                {values.map((item, index) => (
                  <motion.div
                    key={item.title}
                    whileHover={{ y: -5 }}
                    className="
                      rounded-[30px]
                      border
                      border-[var(--accent-light)]/15
                      bg-[var(--card)]/78
                      p-6
                      backdrop-blur-xl
                    "
                  >
                    <div
                      className="
                        flex
                        h-11
                        w-11
                        items-center
                        justify-center
                        rounded-full
                        bg-[var(--accent-light)]/12
                        text-sm
                        font-semibold
                        text-[var(--accent)]
                      "
                    >
                      0{index + 1}
                    </div>

                    <h3
                      className="
                        mt-5
                        text-lg
                        font-semibold
                        text-[var(--accent)]
                      "
                    >
                      {item.title}
                    </h3>

                    <p
                      className="
                        mt-3
                        text-sm
                        leading-relaxed
                        text-[var(--text-muted)]
                      "
                    >
                      {item.desc}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* STATS */}
        <section className="mt-28">
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
              Клиника в цифрах
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
              Факты, которые
              помогают доверять
            </h2>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((item) => (
              <motion.div
                key={item.label}
                whileHover={{ y: -5 }}
                className="
                  rounded-[32px]
                  border
                  border-[var(--accent-light)]/15
                  bg-[var(--card)]
                  p-8
                  text-center
                  shadow-[0_14px_45px_rgba(18,199,183,0.06)]
                  backdrop-blur-xl
                  transition-all
                  duration-300
                  hover:border-[var(--accent-light)]/35
                "
              >
                <div
                  className="
                    text-5xl
                    font-semibold
                    text-[var(--accent)]
                  "
                >
                  {item.value}
                </div>

                <div
                  className="
                    mt-3
                    text-sm
                    font-medium
                    text-[var(--text-muted)]
                  "
                >
                  {item.label}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="mt-28">
          <div
            className="
              relative
              overflow-hidden
              rounded-[44px]
              border
              border-[var(--accent-light)]/20
              bg-[var(--card)]
              p-8
              text-center
              shadow-[0_24px_90px_rgba(18,199,183,0.1)]
              backdrop-blur-2xl
              md:p-14
            "
          >
            <div
              className="
                pointer-events-none
                absolute
                left-1/2
                top-[-160px]
                h-[360px]
                w-[360px]
                -translate-x-1/2
                rounded-full
                bg-[var(--accent-light)]/16
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
                Готовы начать лечение?
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
                Запишитесь на консультацию — врач проведёт осмотр, объяснит
                ситуацию и предложит понятный план лечения.
              </p>

              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                <Link
                  href="/contact"
                  className="
                    inline-flex
                    justify-center
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
                  Записаться на консультацию
                </Link>

                <Link
                  href="/services"
                  className="
                    inline-flex
                    justify-center
                    rounded-full
                    border
                    border-[var(--accent-light)]/20
                    bg-[var(--glass)]
                    px-8
                    py-4
                    text-sm
                    font-semibold
                    text-[var(--accent)]
                    transition-all
                    duration-300
                    hover:border-[var(--accent-light)]/40
                    hover:bg-[var(--accent-light)]/6
                  "
                >
                  Смотреть услуги
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}