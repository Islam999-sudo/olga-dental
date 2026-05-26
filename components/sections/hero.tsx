"use client";

type Props = {
  onBook: () => void;
};

export function Hero({ onBook }: Props) {
  return (
    <section className="relative overflow-hidden pt-28">

      {/* BACKGROUND */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">

        {/* turquoise glow */}
        <div
          className="
            absolute
            left-[-10%]
            top-[5%]
            h-[520px]
            w-[520px]
            animate-float
            rounded-full
            bg-[#12c7b7]/18
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
            bg-[#12c7b7]/14
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
            bg-[#12c7b7]/10
            blur-3xl
          "
        />

      </div>

      <div className="relative mx-auto grid min-h-[90vh] max-w-7xl items-center gap-20 px-6 lg:grid-cols-2">

        {/* LEFT */}
        <div>

          {/* badge */}
          <span
            className="
              inline-flex
              rounded-full
              border border-[#12c7b7]/20
              bg-[#12c7b7]/10
              px-4
              py-2
              text-sm
              font-medium
              text-[#0f8f84]
              shadow-[0_10px_30px_rgba(18,199,183,0.08)]
              backdrop-blur
            "
          >
            Премиальная стоматология
          </span>

          {/* title */}
          <h1
            className="
              mt-6
              text-5xl
              font-semibold
              leading-[1.05]
              tracking-tight
              text-[#0f8f84]
              md:text-7xl
            "
          >
            Современная
            <br />
            стоматология
            <br />
            нового поколения
          </h1>

          {/* text */}
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-[#4d7c78]">
            Эстетика, имплантация и цифровая диагностика
            с акцентом на комфорт и результат.
          </p>

          {/* buttons */}
          <div className="mt-10 flex flex-wrap gap-4">

            <button
              onClick={onBook}
              className="
                rounded-full
                bg-[#12c7b7]
                px-8
                py-4
                text-sm
                font-medium
                text-white
                shadow-[0_18px_40px_rgba(18,199,183,0.28)]
                transition-all
                duration-300
                hover:-translate-y-[3px]
                hover:bg-[#10b3a5]
                hover:shadow-[0_25px_50px_rgba(18,199,183,0.35)]
              "
            >
              Записаться
            </button>

            <button
              onClick={() =>
                document.getElementById("services")?.scrollIntoView({
                  behavior: "smooth",
                })
              }
              className="
                rounded-full
                border border-[#12c7b7]/20
                bg-white/80
                px-8
                py-4
                text-sm
                font-medium
                text-[#0f8f84]
                shadow-[0_10px_30px_rgba(18,199,183,0.08)]
                backdrop-blur
                transition-all
                duration-300
                hover:-translate-y-[3px]
                hover:border-[#12c7b7]/40
                hover:bg-[#12c7b7]/5
              "
            >
              Услуги
            </button>

          </div>

          {/* phone */}
          <div className="mt-6 text-sm text-[#5d8b86]">
            Или позвоните:{" "}

            <a
              href="tel:+78126026160"
              className="
                font-medium
                text-[#0f8f84]
                underline
                underline-offset-4
                decoration-[#12c7b7]/40
              "
            >
              +7 (812) 60-261-60
            </a>
          </div>

          {/* stats */}
          <div className="mt-14 flex gap-10">

            <div>
              <div className="text-3xl font-semibold text-[#0f8f84]">
                15+
              </div>

              <div className="mt-1 text-sm text-[#6b8f8b]">
                лет опыта
              </div>
            </div>

            <div>
              <div className="text-3xl font-semibold text-[#0f8f84]">
                12k+
              </div>

              <div className="mt-1 text-sm text-[#6b8f8b]">
                пациентов
              </div>
            </div>

            <div>
              <div className="text-3xl font-semibold text-[#0f8f84]">
                4.9
              </div>

              <div className="mt-1 text-sm text-[#6b8f8b]">
                рейтинг
              </div>
            </div>

          </div>

        </div>

        {/* RIGHT */}
        <div className="relative">

          {/* image glow */}
          <div
            className="
              absolute
              inset-0
              scale-105
              rounded-[40px]
              bg-[#12c7b7]/20
              blur-3xl
            "
          />

          {/* image */}
          <div
            className="
              relative
              aspect-[4/5]
              overflow-hidden
              rounded-[36px]
              border border-[#12c7b7]/15
              shadow-[0_30px_80px_rgba(18,199,183,0.18)]
            "
          >
            <img
              src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=1400&auto=format&fit=crop"
              className="h-full w-full object-cover"
              alt="clinic"
            />

            {/* gradient */}
            <div
              className="
                absolute inset-0
                bg-gradient-to-t
                from-[#0f8f84]/20
                via-transparent
                to-transparent
              "
            />
          </div>

          {/* floating card */}
          <div
            className="
              absolute
              -bottom-6
              -left-6
              rounded-[28px]
              border border-[#12c7b7]/15
              bg-white/85
              p-6
              shadow-[0_20px_60px_rgba(18,199,183,0.12)]
              backdrop-blur-xl
            "
          >

            <div className="text-sm text-[#6b8f8b]">
              Цифровая диагностика
            </div>

            <div className="mt-1 text-lg font-semibold text-[#0f8f84]">
              Premium Care
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}