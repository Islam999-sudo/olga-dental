"use client";

type Props = {
  onBook?: () => void;
};

import Link from "next/link";
export function Hero({ onBook }: Props) {
  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);

    if (!section) {
      console.warn(`Секция с id="${id}" не найдена`);
      return;
    }

    section.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const handleBookClick = () => {
    if (onBook) {
      onBook();
      return;
    }

    // fallback, если родитель не передал onBook
    scrollToSection("contact");
  };

  return (
    <section className="relative overflow-hidden pt-28">
      {/* BACKGROUND */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div
          className="
            absolute
            left-[-10%]
            top-[5%]
            h-[520px]
            w-[520px]
            animate-float
            rounded-full
            bg-[var(--accent-light)]/18
            blur-3xl
          "
        />

        <div
          className="
            absolute
            right-[-10%]
            top-[25%]
            h-[420px]
            w-[420px]
            animate-float-delayed
            rounded-full
            bg-[var(--accent-light)]/14
            blur-3xl
          "
        />

        <div
          className="
            absolute
            bottom-[-20%]
            left-[30%]
            h-[460px]
            w-[460px]
            animate-float-slow
            rounded-full
            bg-[var(--accent-light)]/10
            blur-3xl
          "
        />
      </div>

      <div
  className="
    relative
    z-10
    mx-auto
    grid
    max-w-7xl
    items-center
    gap-14
    px-6
    py-20
    sm:py-24
    lg:grid-cols-2
    lg:gap-20
    lg:py-32
  "
>
        {/* LEFT */}
        <div className="relative z-20">
          <span
            className="
              inline-flex
              rounded-full
              border border-[var(--accent-light)]/20
              bg-[var(--accent-light)]/10
              px-4
              py-2
              text-sm
              font-medium
              text-[var(--accent)]
              shadow-[0_10px_30px_rgba(18,199,183,0.08)]
              backdrop-blur
            "
          >
            Премиальная стоматология
          </span>

          <h1
            className="
              mt-6
              text-5xl
              font-semibold
              leading-[1.05]
              tracking-tight
              text-[var(--accent)]
              md:text-7xl
            "
          >
            Современная
            <br />
            стоматология
            <br />
            нового поколения
          </h1>

          <p
            className="
              mt-8
              max-w-xl
              text-lg
              leading-relaxed
              text-[var(--text-soft)]
            "
          >
            Эстетика, имплантация и цифровая диагностика с акцентом на комфорт и
            результат.
          </p>

          {/* BUTTONS */}
          <div className="relative z-30 mt-10 flex flex-wrap gap-4">
            <button
              type="button"
              onClick={handleBookClick}
              className="
                relative
                z-30
                rounded-full
                bg-[var(--accent-light)]
                px-8
                py-4
                text-sm
                font-medium
                text-white
                shadow-[0_18px_40px_rgba(18,199,183,0.28)]
                transition-all
                duration-300
                hover:-translate-y-[3px]
                hover:brightness-110
                hover:shadow-[0_25px_50px_rgba(18,199,183,0.35)]
                active:translate-y-0
                active:scale-[0.98]
              "
            >
              Записаться
            </button>

<Link
  href="/services"
  className="
    relative
    z-30
    rounded-full
    border border-[var(--accent-light)]/20
    bg-[var(--card)]
    px-8
    py-4
    text-sm
    font-medium
    text-[var(--accent)]
    shadow-[0_10px_30px_rgba(18,199,183,0.08)]
    backdrop-blur-xl
    transition-all
    duration-300
    hover:-translate-y-[3px]
    hover:border-[var(--accent-light)]/40
    hover:bg-[var(--accent-light)]/5
    active:translate-y-0
    active:scale-[0.98]
  "
>
  Услуги
</Link>
          </div>

          {/* CONTACT INFO */}
          <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-stretch">
            <div
              className="
                rounded-[24px]
                border border-[var(--accent-light)]/15
                bg-[var(--card)]
                px-5
                py-4
                shadow-[0_14px_40px_rgba(18,199,183,0.08)]
                backdrop-blur-xl
              "
            >
              <div className="text-xs uppercase tracking-[0.18em] text-[var(--text-muted)]">
                Телефон
              </div>

              <a
                href="tel:+78126026160"
                className="
                  mt-2
                  inline-flex
                  font-semibold
                  text-[var(--accent)]
                  underline
                  underline-offset-4
                  decoration-[var(--accent-light)]/40
                "
              >
                +7 (812) 60-261-60
              </a>
            </div>

            <div
              className="
                rounded-[24px]
                border border-[var(--accent-light)]/15
                bg-[linear-gradient(135deg,rgba(18,199,183,0.12),rgba(18,199,183,0.035))]
                px-5
                py-4
                shadow-[0_14px_40px_rgba(18,199,183,0.08)]
                backdrop-blur-xl
              "
            >
              <div className="text-xs uppercase tracking-[0.18em] text-[var(--text-muted)]">
                Время работы
              </div>

              <div className="mt-2 font-semibold text-[var(--accent)]">
                Ежедневно: 10:00 – 21:00
              </div>
            </div>
          </div>

          {/* STATS */}
          <div className="mt-14 flex flex-wrap gap-10">
            <div>
              <div className="text-3xl font-semibold text-[var(--accent)]">
                5+
              </div>

              <div className="mt-1 text-sm text-[var(--text-muted)]">
                лет опыта
              </div>
            </div>

            <div>
              <div className="text-3xl font-semibold text-[var(--accent)]">
                10 тыс.
              </div>

              <div className="mt-1 text-sm text-[var(--text-muted)]">
                пациентов
              </div>
            </div>

            <div>
              <div className="text-3xl font-semibold text-[var(--accent)]">
                4.9
              </div>

              <div className="mt-1 text-sm text-[var(--text-muted)]">
                рейтинг
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="relative z-10">
          <div
            className="
              pointer-events-none
              absolute
              inset-0
              scale-105
              rounded-[40px]
              bg-[var(--accent-light)]/20
              blur-3xl
            "
          />

          <div
            className="
              relative
              aspect-[4/5]
              overflow-hidden
              rounded-[36px]
              border border-[var(--accent-light)]/15
              shadow-[0_30px_80px_rgba(18,199,183,0.18)]
            "
          >
            <img
              src="/hero/my-photo.jpg"
              className="h-full w-full object-cover"
              style={{
                objectPosition: "50% 35%",
              }}
              alt="Фото клиники"
            />

            <div
              className="
                pointer-events-none
                absolute
                inset-0
                bg-gradient-to-t
                from-[var(--accent)]/20
                via-transparent
                to-transparent
              "
            />
          </div>

          <div
            className="
              pointer-events-none
              absolute
              -bottom-6
              -left-6
              rounded-[28px]
              border border-[var(--accent-light)]/15
              bg-[var(--card)]
              p-6
              shadow-[0_20px_60px_rgba(18,199,183,0.12)]
              backdrop-blur-xl
            "
          >
            <div className="text-sm text-[var(--text-muted)]">
              Цифровая диагностика
            </div>

            <div className="mt-1 text-lg font-semibold text-[var(--accent)]">
              Premium Care
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}