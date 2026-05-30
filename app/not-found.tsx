import Link from "next/link";

export default function NotFound() {
  return (
    <section
      className="
        flex
        min-h-screen
        items-center
        justify-center
        px-6
      "
    >
      <div className="max-w-xl text-center">
        <div
          className="
            text-8xl
            font-bold
            text-[var(--accent)]
          "
        >
          404
        </div>

        <h1
          className="
            mt-6
            text-4xl
            font-semibold
            text-[var(--foreground)]
          "
        >
          Страница не найдена
        </h1>

        <p
          className="
            mt-4
            text-lg
            text-[var(--text-soft)]
          "
        >
          Возможно, страница была удалена или адрес указан неверно.
        </p>

        <div
          className="
            mt-8
            flex
            justify-center
          "
        >
          <Link
            href="/"
            className="
              rounded-full
              bg-[var(--accent-light)]
              px-8
              py-4
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
            Вернуться на главную
          </Link>
        </div>
      </div>
    </section>
  );
}