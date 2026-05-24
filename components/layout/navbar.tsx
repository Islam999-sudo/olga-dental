type Props = {
  onBook: () => void;
};

export function Navbar({ onBook }: Props) {
  return (
    <header className="fixed left-0 top-0 z-50 w-full border-b border-zinc-200 bg-white/60 backdrop-blur-xl">

      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">

        {/* LOGO */}
        <div className="flex flex-col leading-none">
          <span className="text-xl font-semibold tracking-[0.18em] text-zinc-900">
            OLGA
          </span>

          <span className="mt-1 text-[10px] uppercase tracking-[0.35em] text-zinc-500">
            Dental Clinic
          </span>
        </div>

        {/* NAV */}
        <nav className="hidden gap-8 text-sm text-zinc-600 md:flex">

          <a href="#services" className="hover:text-zinc-900 transition">
            Услуги
          </a>

          <a href="#about" className="hover:text-zinc-900 transition">
            О клинике
          </a>

          <a href="#doctors" className="hover:text-zinc-900 transition">
            Врачи
          </a>

          <a href="#contact" className="hover:text-zinc-900 transition">
            Контакты
          </a>

        </nav>

        {/* ACTIONS */}
        <div className="flex items-center gap-3">

          <a
            href="tel:+78126026160"
            className="hidden sm:inline-flex rounded-full border border-zinc-200 bg-white px-5 py-2.5 text-sm text-zinc-900 shadow-sm hover:border-zinc-400 hover:shadow-md transition"
          >
            Позвонить
          </a>

          <button
            onClick={onBook}
            className="rounded-full bg-zinc-900 px-5 py-2.5 text-sm text-white hover:bg-zinc-700 transition"
          >
            Запись
          </button>

        </div>

      </div>
    </header>
  );
}