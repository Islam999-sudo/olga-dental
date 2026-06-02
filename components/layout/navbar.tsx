"use client";

import { useEffect, useState } from "react";
import { Menu, Moon, Sun, X } from "lucide-react";
import { useTheme } from "next-themes";
import { AnimatePresence, motion } from "framer-motion";

import { useBooking } from "@/components/providers/booking-provider";

const navItems = [
  { href: "/", label: "Главная" },
  { href: "/services", label: "Услуги" },
  { href: "/promotions", label: "Акции" },
  { href: "/doctors", label: "Врачи" },
  { href: "/about", label: "О клинике" },
  { href: "/contact", label: "Контакты" },
];

const smoothEase = [0.22, 1, 0.36, 1] as const;

export function Navbar() {
  const { openBooking } = useBooking();

  const [mounted, setMounted] = useState(false);
  const [pathname, setPathname] = useState("/");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { resolvedTheme, setTheme } = useTheme();

  const isDark = mounted && resolvedTheme === "dark";

  useEffect(() => {
    setMounted(true);

    if (typeof window !== "undefined") {
      setPathname(window.location.pathname);
    }
  }, []);

  useEffect(() => {
    if (!mobileMenuOpen) return;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const handleMobileBooking = () => {
    closeMobileMenu();
    openBooking();
  };

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };

  const isActivePath = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }

    return (
      pathname === href ||
      pathname === `${href}/` ||
      pathname.startsWith(`${href}/`)
    );
  };

  return (
    <>
      <header
        className="
          fixed
          left-0
          top-0
          z-50
          w-full
          border-b
          border-[color:rgba(18,199,183,0.16)]
          bg-[var(--glass)]
          shadow-[0_12px_40px_rgba(15,143,132,0.08)]
          backdrop-blur-3xl
          transition-all
          duration-[var(--theme-duration)]
          ease-[var(--theme-ease)]
        "
      >
        {/* BACKGROUND GLOW */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div
            className="
              animate-float
              absolute
              left-[8%]
              top-[-120px]
              h-[260px]
              w-[260px]
              rounded-full
              bg-[var(--accent-light)]/14
              blur-3xl
            "
          />

          <div
            className="
              animate-float-delayed
              absolute
              right-[12%]
              top-[-140px]
              h-[240px]
              w-[240px]
              rounded-full
              bg-[var(--accent)]/10
              blur-3xl
            "
          />

          <div
            className="
              absolute
              inset-x-0
              bottom-0
              h-px
              bg-gradient-to-r
              from-transparent
              via-[var(--accent-light)]/30
              to-transparent
            "
          />
        </div>

        <div
          className="
            relative
            mx-auto
            flex
            h-20
            max-w-7xl
            items-center
            justify-between
            px-4
            sm:px-6
          "
        >
          {/* LOGO */}
          <a
            href="/"
            onClick={closeMobileMenu}
            className="
              group
              flex
              min-w-0
              items-center
              gap-3
            "
          >
            <div className="relative shrink-0">
              <div
                className="
                  absolute
                  inset-0
                  rounded-full
                  bg-[var(--accent-light)]/20
                  opacity-0
                  blur-xl
                  transition-opacity
                  duration-500
                  group-hover:opacity-100
                "
              />

              <img
                src="/zub.png"
                alt="OLGA Logo"
                width={66}
                height={66}
                className="
                  relative
                  h-[58px]
                  w-[58px]
                  object-contain
                  transition-transform
                  duration-500
                  ease-[var(--theme-ease)]
                  group-hover:scale-[1.04]
                  group-hover:rotate-[-3deg]
                  sm:h-[70px]
                  sm:w-[70px]
                "
              />
            </div>

            <div className="flex min-w-0 flex-col leading-none text-left">
              <span
                className="
                  bg-gradient-to-r
                  from-[var(--accent)]
                  via-[var(--accent-light)]
                  to-[var(--accent)]
                  bg-clip-text
                  text-lg
                  font-semibold
                  tracking-[0.18em]
                  text-transparent
                  sm:text-xl
                "
              >
                OLGA
              </span>

              <span
                className="
                  mt-1
                  text-[9px]
                  uppercase
                  tracking-[0.28em]
                  text-[var(--text-muted)]
                  sm:text-[10px]
                  sm:tracking-[0.32em]
                "
              >
                Dental Clinic
              </span>
            </div>
          </a>

          {/* DESKTOP NAVIGATION */}
          <nav
            className="
              hidden
              items-center
              gap-1.5
              rounded-full
              border
              border-[color:rgba(18,199,183,0.16)]
              bg-[var(--card)]/88
              p-1.5
              shadow-[0_12px_38px_rgba(18,199,183,0.08)]
              backdrop-blur-2xl
              md:flex
            "
          >
            {navItems.map((item) => {
              const isActive = isActivePath(item.href);

              return (
                <a
                  key={item.href}
                  href={item.href}
                  className={`
                    group
                    relative
                    overflow-hidden
                    rounded-full
                    px-4
                    py-2.5
                    text-sm
                    font-medium
                    transition-all
                    duration-500
                    ${
                      isActive
                        ? "text-[var(--accent)]"
                        : "text-[var(--text-muted)] hover:text-[var(--accent)]"
                    }
                  `}
                >
                  <span
                    className={`
                      absolute
                      inset-0
                      rounded-full
                      transition-all
                      duration-500
                      ${
                        isActive
                          ? "bg-[var(--accent-light)]/10"
                          : "bg-transparent group-hover:bg-[var(--accent-light)]/8"
                      }
                    `}
                  />

                  {isActive && (
                    <span
                      className="
                        pointer-events-none
                        absolute
                        inset-0
                        rounded-full
                        shadow-[inset_0_0_0_1px_rgba(255,255,255,0.18),0_0_28px_rgba(18,199,183,0.28)]
                      "
                    />
                  )}

                  <span
                    className="
                      pointer-events-none
                      absolute
                      inset-0
                      -translate-x-[140%]
                      skew-x-[-22deg]
                      bg-gradient-to-r
                      from-transparent
                      via-white/20
                      to-transparent
                      transition-transform
                      duration-1000
                      group-hover:translate-x-[180%]
                    "
                  />

                  <span className="relative z-10">{item.label}</span>

                  {isActive && (
                    <span
                      className="
                        absolute
                        bottom-[5px]
                        left-1/2
                        h-[2px]
                        w-7
                        -translate-x-1/2
                        rounded-full
                        bg-[var(--accent-light)]
                        shadow-[0_0_18px_rgba(18,199,183,0.75)]
                      "
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* ACTIONS */}
          <div className="flex items-center gap-3">
            {/* THEME TOGGLE */}
            <button
              type="button"
              onClick={toggleTheme}
              aria-label="Переключить тему"
              className="
                relative
                h-11
                w-[82px]
                overflow-hidden
                rounded-full
                border-2
                border-[var(--accent-light)]
                bg-[var(--card)]
                shadow-[0_0_0_1px_rgba(18,199,183,0.18),0_10px_28px_rgba(18,199,183,0.14)]
                backdrop-blur-2xl
                transition-[box-shadow,border-color,background-color,transform]
                duration-700
                ease-[var(--theme-ease)]
                hover:shadow-[0_0_0_3px_rgba(18,199,183,0.18),0_14px_35px_rgba(18,199,183,0.22)]
                active:scale-[0.985]
              "
            >
              <motion.span
                className="absolute inset-0"
                animate={{
                  background: isDark
                    ? "linear-gradient(135deg, rgba(7,20,18,0.98), rgba(10,28,25,0.88))"
                    : "linear-gradient(135deg, rgba(246,246,245,0.98), rgba(255,255,255,0.82))",
                }}
                transition={{
                  duration: 0.45,
                  ease: smoothEase,
                }}
              />

              <motion.span
                className="absolute left-[14px] top-1/2 z-[1] -translate-y-1/2"
                animate={{
                  opacity: isDark ? 0.32 : 1,
                  scale: isDark ? 0.75 : 1,
                  rotate: isDark ? 90 : 0,
                }}
                transition={{
                  duration: 0.45,
                  ease: smoothEase,
                }}
              >
                <Sun
                  size={16}
                  className={
                    isDark
                      ? "text-[var(--text-muted)]"
                      : "text-[var(--accent)]"
                  }
                />
              </motion.span>

              <motion.span
                className="absolute right-[14px] top-1/2 z-[1] -translate-y-1/2"
                animate={{
                  opacity: isDark ? 1 : 0.32,
                  scale: isDark ? 1 : 0.75,
                  rotate: isDark ? 0 : -90,
                }}
                transition={{
                  duration: 0.45,
                  ease: smoothEase,
                }}
              >
                <Moon
                  size={15}
                  className={
                    isDark
                      ? "text-[var(--accent-light)]"
                      : "text-[var(--text-muted)]"
                  }
                />
              </motion.span>

              <motion.span
                className="
                  absolute
                  left-[5px]
                  top-[5px]
                  z-10
                  flex
                  h-8
                  w-8
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-white/70
                  shadow-[0_10px_24px_rgba(0,0,0,0.14)]
                  will-change-transform
                "
                animate={{
                  x: isDark ? 38 : 0,
                  rotate: isDark ? 360 : 0,
                  backgroundColor: isDark ? "#071412" : "#ffffff",
                  color: isDark ? "#5ffbf1" : "#0f8f84",
                  boxShadow: isDark
                    ? "0 10px 30px rgba(127,245,239,0.26)"
                    : "0 10px 24px rgba(0,0,0,0.14)",
                }}
                transition={{
                  type: "tween",
                  duration: 0.72,
                  ease: smoothEase,
                }}
              >
                <motion.span
                  key={isDark ? "moon" : "sun"}
                  initial={{
                    opacity: 0,
                    scale: 0.85,
                    rotate: -30,
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    rotate: 0,
                  }}
                  transition={{
                    duration: 0.22,
                    ease: smoothEase,
                  }}
                >
                  {isDark ? <Moon size={16} /> : <Sun size={17} />}
                </motion.span>
              </motion.span>
            </button>

            {/* DESKTOP PHONE */}
            <a
              href="tel:+78126036364"
              className="
                hidden
                items-center
                rounded-full
                border
                border-[color:rgba(18,199,183,0.28)]
                bg-[var(--card)]
                px-5
                py-2.5
                text-sm
                font-medium
                text-[var(--accent)]
                shadow-soft
                backdrop-blur-2xl
                transition-all
                duration-500
                hover:border-[var(--accent-light)]
                hover:bg-[var(--glass)]
                hover:shadow-[0_10px_28px_rgba(18,199,183,0.18)]
                sm:inline-flex
                md:inline-flex
              "
            >
              Позвонить
            </a>

            {/* DESKTOP BOOK */}
            <button
              type="button"
              onClick={openBooking}
              className="
                hidden
                rounded-full
                bg-[var(--accent-light)]
                px-5
                py-2.5
                text-sm
                font-semibold
                text-white
                shadow-[0_12px_30px_rgba(18,199,183,0.34)]
                transition-all
                duration-500
                hover:-translate-y-[2px]
                hover:bg-[var(--accent)]
                hover:shadow-[0_16px_40px_rgba(18,199,183,0.42)]
                dark:text-[#071412]
                md:inline-flex
              "
            >
              Запись
            </button>

            {/* MOBILE MENU BUTTON */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Открыть меню"
              className="
                inline-flex
                h-11
                w-11
                items-center
                justify-center
                rounded-full
                border
                border-[var(--accent-light)]/25
                bg-[var(--card)]
                text-[var(--accent)]
                shadow-[0_10px_28px_rgba(18,199,183,0.14)]
                backdrop-blur-2xl
                transition-all
                duration-300
                hover:border-[var(--accent-light)]/45
                hover:bg-[var(--accent-light)]/8
                active:scale-95
                md:hidden
              "
            >
              <Menu size={21} />
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE DRAWER */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* OVERLAY */}
            <motion.button
              type="button"
              aria-label="Закрыть меню"
              onClick={closeMobileMenu}
              className="
                fixed
                inset-0
                z-[90]
                bg-[#03100f]/50
                backdrop-blur-md
                md:hidden
              "
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 0.25,
                ease: smoothEase,
              }}
            />

            {/* PANEL */}
            <motion.aside
              className="
                fixed
                right-3
                top-3
                z-[100]
                flex
                max-h-[calc(100vh-24px)]
                w-[calc(100vw-24px)]
                max-w-[360px]
                flex-col
                overflow-hidden
                rounded-[34px]
                border
                border-[var(--accent-light)]/20
                bg-[var(--card)]/92
                p-5
                shadow-[0_28px_100px_rgba(0,0,0,0.28)]
                backdrop-blur-3xl
                md:hidden
              "
              initial={{
                opacity: 0,
                x: 40,
                scale: 0.96,
                filter: "blur(8px)",
              }}
              animate={{
                opacity: 1,
                x: 0,
                scale: 1,
                filter: "blur(0px)",
              }}
              exit={{
                opacity: 0,
                x: 40,
                scale: 0.96,
                filter: "blur(8px)",
              }}
              transition={{
                duration: 0.35,
                ease: smoothEase,
              }}
            >
              {/* PANEL GLOW */}
              <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div
                  className="
                    absolute
                    right-[-100px]
                    top-[-100px]
                    h-[260px]
                    w-[260px]
                    rounded-full
                    bg-[var(--accent-light)]/16
                    blur-3xl
                  "
                />

                <div
                  className="
                    absolute
                    bottom-[-130px]
                    left-[-100px]
                    h-[260px]
                    w-[260px]
                    rounded-full
                    bg-[var(--accent)]/10
                    blur-3xl
                  "
                />
              </div>

              <div className="relative z-10 flex items-center justify-between gap-4">
                <div>
                  <div
                    className="
                      text-xs
                      font-semibold
                      uppercase
                      tracking-[0.25em]
                      text-[var(--accent)]
                    "
                  >
                    Меню
                  </div>

                  <div
                    className="
                      mt-1
                      text-sm
                      text-[var(--text-muted)]
                    "
                  >
                    OLGA Dental Clinic
                  </div>
                </div>

                <button
                  type="button"
                  onClick={closeMobileMenu}
                  aria-label="Закрыть меню"
                  className="
                    flex
                    h-11
                    w-11
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-[var(--accent-light)]/20
                    bg-[var(--glass)]
                    text-[var(--accent)]
                    transition-all
                    duration-300
                    hover:bg-[var(--accent-light)]/8
                    active:scale-95
                  "
                >
                  <X size={20} />
                </button>
              </div>

              <div className="relative z-10 mt-7 space-y-2">
                {navItems.map((item) => {
                  const isActive = isActivePath(item.href);

                  return (
                    <a
                      key={item.href}
                      href={item.href}
                      onClick={closeMobileMenu}
                      className={`
                        group
                        relative
                        flex
                        items-center
                        justify-between
                        overflow-hidden
                        rounded-2xl
                        border
                        px-5
                        py-4
                        text-base
                        font-semibold
                        transition-all
                        duration-300
                        ${
                          isActive
                            ? "border-[var(--accent-light)]/45 bg-[var(--accent-light)]/14 text-[var(--accent)]"
                            : "border-[var(--accent-light)]/12 bg-[var(--glass)] text-[var(--text-soft)] hover:border-[var(--accent-light)]/28 hover:bg-[var(--accent-light)]/7 hover:text-[var(--accent)]"
                        }
                      `}
                    >
                      <span>{item.label}</span>

                      <span
                        className={`
                          text-sm
                          transition-transform
                          duration-300
                          ${
                            isActive
                              ? "translate-x-0 text-[var(--accent)]"
                              : "text-[var(--text-muted)] group-hover:translate-x-1 group-hover:text-[var(--accent)]"
                          }
                        `}
                      >
                        →
                      </span>
                    </a>
                  );
                })}
              </div>

              <div
                className="
                  relative
                  z-10
                  my-6
                  h-px
                  bg-gradient-to-r
                  from-transparent
                  via-[var(--accent-light)]/25
                  to-transparent
                "
              />

              <div className="relative z-10 space-y-3">
                <a
                  href="tel:+78126036364"
                  onClick={closeMobileMenu}
                  className="
                    flex
                    w-full
                    items-center
                    justify-center
                    rounded-2xl
                    border
                    border-[var(--accent-light)]/20
                    bg-[var(--glass)]
                    px-5
                    py-4
                    text-sm
                    font-semibold
                    text-[var(--accent)]
                    transition-all
                    duration-300
                    hover:border-[var(--accent-light)]/40
                    hover:bg-[var(--accent-light)]/7
                  "
                >
                  Позвонить
                </a>

                <button
                  type="button"
                  onClick={handleMobileBooking}
                  className="
                    group
                    relative
                    flex
                    w-full
                    items-center
                    justify-center
                    overflow-hidden
                    rounded-2xl
                    bg-[var(--accent-light)]
                    px-5
                    py-4
                    text-sm
                    font-semibold
                    text-[#071412]
                    shadow-[0_14px_42px_rgba(18,199,183,0.28)]
                    transition-all
                    duration-300
                    hover:brightness-110
                    active:scale-[0.99]
                  "
                >
                  <span
                    className="
                      pointer-events-none
                      absolute
                      inset-0
                      -translate-x-[160%]
                      skew-x-[-22deg]
                      bg-gradient-to-r
                      from-transparent
                      via-white/35
                      to-transparent
                      transition-transform
                      duration-1000
                      group-hover:translate-x-[180%]
                    "
                  />

                  <span className="relative">Записаться на приём</span>
                </button>
              </div>

              <div
                className="
                  relative
                  z-10
                  mt-6
                  rounded-3xl
                  border
                  border-[var(--accent-light)]/14
                  bg-[var(--accent-light)]/6
                  p-4
                "
              >
                <div
                  className="
                    text-xs
                    font-semibold
                    uppercase
                    tracking-[0.18em]
                    text-[var(--accent)]
                  "
                >
                  Контакты
                </div>

                <div
                  className="
                    mt-2
                    text-sm
                    leading-relaxed
                    text-[var(--text-muted)]
                  "
                >
                  г. Мурино, Воронцовский бульвар, 2
                  <br />
                  Ежедневно: 10:00 – 21:00
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}