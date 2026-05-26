"use client";

import { useEffect, useState } from "react";

type Props = {
  onBook: () => void;
};

const sections = ["services", "doctors", "about", "contact"];

export function Navbar({ onBook }: Props) {
  const [active, setActive] = useState("");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      let current = "";

      for (const id of sections) {
        const el = document.getElementById(id);

        if (!el) continue;

        const rect = el.getBoundingClientRect();

        if (rect.top <= 120 && rect.bottom >= 120) {
          current = id;
        }
      }

      setActive(current);
      setScrolled(window.scrollY > 101);
    };

    window.addEventListener("scroll", handleScroll);

    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const linkClass = (id: string) =>
    `
      relative transition duration-300
      ${
        active === id
          ? "text-[#36DFDA] font-medium"
          : "text-zinc-500 hover:text-[#36DFDA]"
      }
    `;

  return (
    <header
      className={`
        fixed left-0 top-0 z-50 w-full
        transition-all duration-500
        ${
          scrolled
            ? "border-b border-[#36DFDA]/10 bg-white/80 backdrop-blur-2xl shadow-[0_8px_30px_rgba(54,223,218,0.08)]"
            : "bg-white/60 backdrop-blur-xl"
        }
      `}
    >

      {/* BACKGROUND GLOW */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">

        <div
          className="
            absolute left-[8%] top-[-120px]
            h-[260px] w-[260px]
            rounded-full
            bg-[#36DFDA]/15
            blur-3xl
          "
        />

        <div
          className="
            absolute right-[10%] top-[-140px]
            h-[240px] w-[240px]
            rounded-full
            bg-[#36DFDA]/10
            blur-3xl
          "
        />

      </div>

      <div className="relative mx-auto flex h-20 max-w-7xl items-center justify-between px-6">

        {/* LOGO */}
        <button
          onClick={() => scrollTo("services")}
          className="flex flex-col leading-none text-left"
        >

          <span
            className="
              bg-gradient-to-r
              from-[#1f8f8b]
              via-[#36DFDA]
              to-[#7ff5ef]
              bg-clip-text
              text-xl
              font-semibold
              tracking-[0.18em]
              text-transparent
            "
          >
            OLGA
          </span>

          <span className="mt-1 text-[10px] uppercase tracking-[0.35em] text-zinc-500">
            Dental Clinic
          </span>

        </button>

        {/* NAVIGATION */}
        <nav className="hidden gap-10 text-sm md:flex">

          {sections.map((id) => {
            const labels: Record<string, string> = {
              services: "Услуги",
              about: "О клинике",
              doctors: "Врачи",
              contact: "Контакты",
            };

            return (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className={linkClass(id)}
              >
                {labels[id]}

                {active === id && (
                  <span
                    className="
                      absolute -bottom-2 left-1/2
                      h-[3px] w-6
                      -translate-x-1/2
                      rounded-full
                      bg-[#36DFDA]
                      shadow-[0_0_18px_rgba(54,223,218,0.8)]
                    "
                  />
                )}
              </button>
            );
          })}

        </nav>

        {/* ACTIONS */}
        <div className="flex items-center gap-3">

          <a
            href="tel:+78126026160"
            className="
              hidden sm:inline-flex
              items-center
              rounded-full
              border border-[#36DFDA]/30
              bg-white/90
              px-5 py-2.5
              text-sm
              font-medium
              text-[#169e99]
              shadow-sm
              transition-all duration-300
              hover:border-[#36DFDA]
              hover:bg-[#ecfffe]
              hover:shadow-[0_8px_24px_rgba(54,223,218,0.18)]
              hover:-translate-y-[1px]
            "
          >
            Позвонить
          </a>

          <button
            onClick={onBook}
            className="
              rounded-full
              bg-[#36DFDA]
              px-5 py-2.5
              text-sm
              font-medium
              text-white
              shadow-[0_12px_30px_rgba(54,223,218,0.35)]
              transition-all duration-300
              hover:bg-[#2fd1cc]
              hover:shadow-[0_16px_40px_rgba(54,223,218,0.45)]
              hover:-translate-y-[2px]
              active:translate-y-0
            "
          >
            Запись
          </button>

        </div>

      </div>
    </header>
  );
}