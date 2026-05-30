"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";

import { doctors, type Doctor } from "@/data/doctors";
import { DoctorModal } from "@/components/ui/doctor-modal";
import { useBooking } from "@/components/providers/booking-provider";

const stats = [
  {
    value: "7",
    label: "врачей в команде",
  },
  {
    value: "5+",
    label: "направлений лечения",
  },
  {
    value: "4.9",
    label: "средний рейтинг",
  },
  {
    value: "10 000+",
    label: "пациентов",
  },
];

const filters = [
  "Все",
  "Терапия",
  "Хирургия",
  "Имплантация",
  "Ортопедия",
  "Ортодонтия",
  "Гигиена",
];

const approach = [
  {
    title: "Сначала диагностика",
    desc: "Врач оценивает состояние зубов, дёсен и прикуса, чтобы предложить не случайную услугу, а понятный план лечения.",
  },
  {
    title: "Профильный специалист",
    desc: "Пациент попадает к врачу нужного направления: терапевту, хирургу, ортопеду, имплантологу, ортодонту или гигиенисту.",
  },
  {
    title: "Понятное объяснение",
    desc: "Мы стараемся объяснять лечение простым языком: что происходит, какие есть варианты и почему выбран конкретный путь.",
  },
];

function matchesFilter(doctor: Doctor, filter: string) {
  if (filter === "Все") return true;

  const text = [
    doctor.role,
    doctor.desc,
    doctor.education,
    ...doctor.specialization,
    ...doctor.highlights,
  ]
    .join(" ")
    .toLowerCase();

  const query = filter.toLowerCase();

  if (query === "терапия") {
    return text.includes("терап");
  }

  if (query === "хирургия") {
    return text.includes("хирург");
  }

  if (query === "имплантация") {
    return text.includes("имплант");
  }

  if (query === "ортопедия") {
    return text.includes("ортопед") || text.includes("протез");
  }

  if (query === "ортодонтия") {
    return text.includes("ортодонт") || text.includes("прикус");
  }

  if (query === "гигиена") {
    return text.includes("гигиен") || text.includes("профилакти");
  }

  return text.includes(query);
}

export function DoctorsPage() {
  const { openBooking } = useBooking();

  const [selectedDoctor, setSelectedDoctor] =
    useState<Doctor | null>(null);

  const [activeFilter, setActiveFilter] = useState("Все");

  const filteredDoctors = useMemo(() => {
    return doctors.filter((doctor) =>
      matchesFilter(doctor, activeFilter)
    );
  }, [activeFilter]);

  const handleBookDoctor = (doctor: Doctor) => {
    setSelectedDoctor(null);
    openBooking(doctor);
  };

  return (
    <main
      className="
        relative
        min-h-screen
        overflow-hidden
        pb-32
        pt-32
      "
    >
      {/* BACKGROUND */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="
            absolute
            left-[-180px]
            top-[100px]
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
            right-[-160px]
            top-[420px]
            h-[420px]
            w-[420px]
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
            lg:grid-cols-[1fr_420px]
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
              Специалисты
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
              Врачи,
              <br />
              которым доверяют
              <br />
              здоровье улыбки
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
              Команда OLGA Dental объединяет специалистов разных направлений:
              терапевтов, хирургов, имплантологов, ортопедов, ортодонтов и
              гигиенистов. Это позволяет смотреть на лечение комплексно и
              подбирать решение под конкретного пациента.
            </p>
          </div>

          {/* HERO CARD */}
          <div
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
              <div className="text-sm font-semibold text-[var(--accent)]">
                Как мы подбираем врача
              </div>

              <p
                className="
                  mt-3
                  text-sm
                  leading-relaxed
                  text-[var(--text-muted)]
                "
              >
                Если пациент не знает, к какому специалисту записаться,
                администратор поможет выбрать направление по жалобе, цели
                лечения и ситуации.
              </p>

              <button
                type="button"
                onClick={() => openBooking()}
                className="
                  mt-6
                  w-full
                  rounded-full
                  bg-[var(--accent-light)]
                  px-6
                  py-3.5
                  text-sm
                  font-semibold
                  text-[#071412]
                  shadow-[0_12px_40px_rgba(18,199,183,0.26)]
                  transition-all
                  duration-300
                  hover:-translate-y-[2px]
                  hover:brightness-110
                "
              >
                Помочь выбрать специалиста
              </button>
            </div>
          </div>
        </section>

        {/* STATS */}
        <section className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((item) => (
            <motion.div
              key={item.label}
              whileHover={{ y: -5 }}
              className="
                rounded-[30px]
                border
                border-[var(--accent-light)]/15
                bg-[var(--card)]
                p-7
                text-center
                shadow-[0_14px_45px_rgba(18,199,183,0.06)]
                backdrop-blur-xl
                transition-all
                duration-300
                hover:border-[var(--accent-light)]/35
              "
            >
              <div className="text-4xl font-semibold text-[var(--accent)]">
                {item.value}
              </div>

              <div
                className="
                  mt-2
                  text-sm
                  font-medium
                  text-[var(--text-muted)]
                "
              >
                {item.label}
              </div>
            </motion.div>
          ))}
        </section>

        {/* FILTERS */}
        <section className="mt-20">
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
              Направления
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
              Выберите специалиста
              <br />
              по направлению
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
              Можно посмотреть всю команду или быстро отфильтровать врачей по
              нужной области лечения.
            </p>
          </div>

          <div className="mt-10 flex flex-wrap justify-center gap-3">
            {filters.map((filter) => {
              const isActive = activeFilter === filter;

              return (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setActiveFilter(filter)}
                  className={`
                    rounded-full
                    border
                    px-5
                    py-2.5
                    text-sm
                    font-semibold
                    backdrop-blur-xl
                    transition-all
                    duration-300
                    ${
                      isActive
                        ? "border-[var(--accent-light)] bg-[var(--accent-light)] text-[#071412] shadow-[0_12px_35px_rgba(18,199,183,0.24)]"
                        : "border-[var(--accent-light)]/18 bg-[var(--card)] text-[var(--accent)] hover:border-[var(--accent-light)]/40 hover:bg-[var(--accent-light)]/7"
                    }
                  `}
                >
                  {filter}
                </button>
              );
            })}
          </div>
        </section>

        {/* DOCTORS GRID */}
        <section className="mt-16">
          {filteredDoctors.length > 0 ? (
            <div
              className="
                grid
                items-start
                gap-8
                md:grid-cols-2
                xl:grid-cols-3
              "
            >
              {filteredDoctors.map((doctor, index) => (
                <motion.article
                  key={doctor.name}
                  initial={{
                    opacity: 0,
                    y: 22,
                    filter: "blur(8px)",
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    filter: "blur(0px)",
                  }}
                  transition={{
                    duration: 0.45,
                    delay: index * 0.04,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  whileHover={{ y: -6 }}
                  className="
                    group
                    relative
                    overflow-hidden
                    rounded-[38px]
                    border
                    border-[var(--accent-light)]/15
                    bg-[var(--card)]
                    shadow-[0_20px_80px_rgba(18,199,183,0.08)]
                    backdrop-blur-xl
                    transition-all
                    duration-500
                    hover:border-[var(--accent-light)]/35
                    hover:shadow-[0_28px_100px_rgba(18,199,183,0.13)]
                  "
                >
                  <div
                    className="
                      pointer-events-none
                      absolute
                      right-[-100px]
                      top-[-100px]
                      h-[260px]
                      w-[260px]
                      rounded-full
                      bg-[var(--accent-light)]/10
                      blur-3xl
                    "
                  />

                  {/* IMAGE */}
                  <div
                    className="
                      relative
                      h-[430px]
                      overflow-hidden
                      sm:h-[460px]
                    "
                  >
                    <img
                      src={doctor.image}
                      alt={doctor.name}
                      loading="lazy"
                      decoding="async"
                      className="
                        h-full
                        w-full
                        object-cover
                        transition-transform
                        duration-700
                        group-hover:scale-105
                      "
                      style={{
                        objectPosition: "50% 18%",
                      }}
                    />

                    <div
                      className="
                        absolute
                        inset-0
                        bg-gradient-to-t
                        from-[#03100f]/88
                        via-[var(--accent)]/18
                        to-transparent
                      "
                    />

                    <div
                      className="
                        absolute
                        left-5
                        top-5
                        rounded-full
                        border
                        border-white/18
                        bg-white/14
                        px-4
                        py-2
                        text-xs
                        font-medium
                        text-white
                        backdrop-blur-xl
                      "
                    >
                      {doctor.exp}
                    </div>

                    <div
                      className="
                        absolute
                        bottom-5
                        left-5
                        right-5
                        text-white
                      "
                    >
                      <div
                        className="
                          text-xs
                          uppercase
                          tracking-[0.22em]
                          text-white/65
                        "
                      >
                        Врач клиники
                      </div>

                      <div
                        className="
                          mt-2
                          text-lg
                          font-semibold
                          leading-tight
                          text-white/95
                        "
                      >
                        {doctor.role}
                      </div>
                    </div>
                  </div>

                  {/* CONTENT */}
                  <div className="relative p-7">
                    <h3
                      className="
                        text-2xl
                        font-semibold
                        leading-tight
                        text-[var(--foreground)]
                      "
                    >
                      {doctor.name}
                    </h3>

                    <p
                      className="
                        mt-4
                        text-sm
                        leading-relaxed
                        text-[var(--text-soft)]
                      "
                    >
                      {doctor.desc}
                    </p>

                    <div className="mt-6 flex flex-wrap gap-2">
                      {doctor.specialization.slice(0, 4).map((spec) => (
                        <span
                          key={spec}
                          className="
                            rounded-full
                            border
                            border-[var(--accent-light)]/20
                            bg-[var(--accent-light)]/8
                            px-3
                            py-1.5
                            text-xs
                            font-medium
                            text-[var(--text-soft)]
                          "
                        >
                          {spec}
                        </span>
                      ))}
                    </div>

                    <div className="mt-6 space-y-3">
                      {doctor.highlights.slice(0, 3).map((item) => (
                        <div
                          key={item}
                          className="
                            flex
                            items-start
                            gap-3
                            rounded-2xl
                            border
                            border-[var(--accent-light)]/12
                            bg-[var(--accent-light)]/5
                            p-3.5
                            text-sm
                            leading-relaxed
                            text-[var(--text-soft)]
                          "
                        >
                          <span
                            className="
                              mt-[2px]
                              flex
                              h-5
                              w-5
                              shrink-0
                              items-center
                              justify-center
                              rounded-full
                              bg-[var(--accent-light)]/14
                              text-xs
                              text-[var(--accent)]
                            "
                          >
                            ✓
                          </span>

                          <span>{item}</span>
                        </div>
                      ))}
                    </div>

                    <div
                      className="
                        mt-7
                        flex
                        flex-col
                        gap-3
                        sm:flex-row
                        md:flex-col
                        lg:flex-row
                        xl:flex-col
                      "
                    >
                      <button
                        type="button"
                        onClick={() => setSelectedDoctor(doctor)}
                        className="
                          flex-1
                          rounded-2xl
                          border
                          border-[var(--accent-light)]/20
                          bg-[var(--glass)]
                          px-5
                          py-3
                          text-sm
                          font-semibold
                          text-[var(--accent)]
                          transition-all
                          duration-300
                          hover:border-[var(--accent-light)]/40
                          hover:bg-[var(--accent-light)]/6
                        "
                      >
                        Подробнее
                      </button>

                      <button
                        type="button"
                        onClick={() => openBooking(doctor)}
                        className="
                          flex-1
                          rounded-2xl
                          bg-[var(--accent-light)]
                          px-5
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
                        Записаться
                      </button>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          ) : (
            <div
              className="
                rounded-[34px]
                border
                border-[var(--accent-light)]/15
                bg-[var(--card)]
                p-10
                text-center
                text-[var(--text-soft)]
                shadow-[0_14px_45px_rgba(18,199,183,0.06)]
                backdrop-blur-xl
              "
            >
              По этому направлению специалисты не найдены.
            </div>
          )}
        </section>

        {/* APPROACH */}
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
              Подход к лечению
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
              Врач не просто лечит,
              <br />
              а ведёт пациента
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
              Хорошее лечение начинается с доверия, диагностики и понятного
              плана. Поэтому мы уделяем внимание не только процедуре, но и
              объяснению каждого этапа.
            </p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {approach.map((item, index) => (
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

                <div
                  className="
                    relative
                    flex
                    h-12
                    w-12
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
                    relative
                    mt-6
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
        </section>

        {/* FINAL CTA */}
        <section className="mt-28">
          <div
            className="
              relative
              overflow-hidden
              rounded-[44px]
              border
              border-[var(--accent-light)]/20
              bg-[linear-gradient(135deg,rgba(18,199,183,0.14),rgba(18,199,183,0.035))]
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
                Не знаете, к кому записаться?
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
                Оставьте заявку, и администратор поможет подобрать специалиста
                под вашу ситуацию: боль, лечение, имплантация, протезирование,
                прикус или профилактика.
              </p>

              <button
                type="button"
                onClick={() => openBooking()}
                className="
                  mt-8
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
                Подобрать специалиста
              </button>
            </div>
          </div>
        </section>
      </div>

      {selectedDoctor && (
        <DoctorModal
          doctor={selectedDoctor}
          onClose={() => setSelectedDoctor(null)}
          onBook={handleBookDoctor}
        />
      )}
    </main>
  );
}