"use client";

const reviews = [
  {
    name: "василиса е.",
    level: "Знаток города 4 уровня",
    date: "23 мая",
    text:
      "Было сложное удаление зуба, работал хирург Константин Андреевич. Мне все очень понравилось, у меня был проблемный зуб, тяжело удаляли, но благодаря профессионализму доктора, прекрасному дружелюбному общению, поддержке, все прошло очень хорошо. Спасибо администратору за оперативную запись, поскольку проблема была острая. Цена за такую сложную работу была очень адекватная. Могу клинику и врача советовать однозначно, спасибо большое за помощь!",
  },
  {
    name: "Альбина Ч.",
    level: "Знаток города 5 уровня",
    date: "24 марта",
    text:
      "Приходила в данную стоматологию на проф. гигиену. Процедура прошла безболезненно, быстро, комфортно. Врач-гигиенист Бакланская Виктория...",
  },
  {
    name: "Efim",
    level: "Знаток города 3 уровня",
    date: "28 ноября 2025",
    text:
      "Пришел в вечернее время 27 ноября 2025 года, болела десна, думал, что болит зуб. Пригласили в кабинет, оказали первую помощь, промыли антисептиком десну. Порекомендовали полоскать. Врач Олеся очень внимательная, настоящий профессионал. Весь персонал очень вежливый и приветливый. Осмотр был совершенно бесплатный. Спасибо администратору за решение, за доброту и хорошее отношение, и за подарок — отличную зубную щетку!",
  },
];

export function Testimonials() {
  const yandexReviewsUrl =
    "https://yandex.ru/maps/org/olga/99713820273/";

  return (
    <section
      id="testimonials"
      className="
        relative
        overflow-hidden
        bg-[#071413]
        py-24
        text-white
        sm:py-28
        lg:py-32
      "
    >
      {/* BACKGROUND */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="
            absolute
            left-[-120px]
            top-[80px]
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
            right-[-100px]
            bottom-[-60px]
            h-[360px]
            w-[360px]
            rounded-full
            bg-[var(--accent-light)]/12
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
              text-[var(--accent-light)]
              backdrop-blur
            "
          >
            Отзывы
          </span>

          <h2
            className="
              mt-6
              text-4xl
              font-semibold
              leading-tight
              text-white
              md:text-6xl
            "
          >
            Пациенты возвращаются
            <br />
            не случайно
          </h2>

          <p
            className="
              mt-6
              max-w-2xl
              text-lg
              leading-relaxed
              text-white/75
            "
          >
            Спокойный сервис, современное лечение и прозрачный подход —
            именно за это пациенты рекомендуют клинику своим близким.
          </p>
        </div>

        {/* CARDS */}
        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {reviews.map((review, idx) => (
            <article
              key={`${review.name}-${idx}`}
              className="
                group
                relative
                overflow-hidden
                rounded-[32px]
                border
                border-[var(--accent-light)]/15
                bg-white/[0.08]
                p-8
                shadow-[0_10px_40px_rgba(0,0,0,0.25)]
                backdrop-blur-xl
                transition-colors
                duration-300
                hover:border-[var(--accent-light)]/30
                hover:bg-white/[0.10]
              "
            >
              {/* GLOW */}
              <div
                className="
                  pointer-events-none
                  absolute
                  right-[-40px]
                  top-[-40px]
                  h-[140px]
                  w-[140px]
                  rounded-full
                  bg-[var(--accent-light)]/10
                  blur-3xl
                "
              />

              <div className="relative">
                {/* STARS + DATE */}
                <div className="flex items-center justify-between gap-4">
                  <div className="flex gap-1 text-[var(--accent-light)]">
                    ★★★★★
                  </div>

                  <div className="text-xs text-white/40">
                    {review.date}
                  </div>
                </div>

                {/* TEXT */}
                <p
                  className="
                    mt-6
                    text-sm
                    leading-relaxed
                    text-white/80
                  "
                >
                  “{review.text}”
                </p>

                {/* DIVIDER */}
                <div className="mt-8 h-px w-full bg-gradient-to-r from-[var(--accent-light)]/30 to-transparent" />

                {/* AUTHOR */}
                <div className="mt-6 flex items-center gap-3">
                  <div
                    className="
                      flex
                      h-11
                      w-11
                      items-center
                      justify-center
                      rounded-full
                      bg-[var(--accent-light)]/10
                      text-sm
                      font-semibold
                      text-[var(--accent-light)]
                    "
                  >
                    {review.name[0].toUpperCase()}
                  </div>

                  <div>
                    <div className="text-sm font-semibold text-white">
                      {review.name}
                    </div>

                    <div className="text-xs text-white/45">
                      {review.level}
                    </div>

                    <div className="mt-1 text-xs text-white/35">
                      Отзыв на Яндекс.Картах
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* YANDEX CTA */}
        <div
          className="
            mt-14
            flex
            flex-col
            items-start
            justify-between
            gap-5
            rounded-[32px]
            border
            border-[var(--accent-light)]/15
            bg-white/[0.06]
            p-6
            shadow-[0_10px_40px_rgba(0,0,0,0.18)]
            backdrop-blur-xl
            md:flex-row
            md:items-center
          "
        >
          <div>
            <div className="text-sm font-semibold text-white">
              Хотите увидеть больше мнений пациентов?
            </div>

            <div className="mt-2 max-w-2xl text-sm leading-relaxed text-white/55">
              Откройте карточку клиники на Яндекс.Картах, чтобы посмотреть
              актуальные отзывы, рейтинг и фотографии.
            </div>
          </div>

          <a
            href={yandexReviewsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="
              inline-flex
              shrink-0
              items-center
              justify-center
              rounded-full
              bg-[var(--accent-light)]
              px-7
              py-3.5
              text-sm
              font-semibold
              text-[#071412]
              shadow-[0_12px_36px_rgba(18,199,183,0.28)]
              transition-all
              duration-300
              hover:-translate-y-[2px]
              hover:brightness-110
            "
          >
            Смотреть все отзывы
          </a>
        </div>
      </div>
    </section>
  );
}