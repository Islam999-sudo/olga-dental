"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";

const navItems = [
  { href: "/", label: "Главная" },
  { href: "/services", label: "Услуги" },
  { href: "/doctors", label: "Врачи" },
  { href: "/about", label: "О клинике" },
  { href: "/contact", label: "Контакты" },
];

const smoothEase = [0.22, 1, 0.36, 1] as const;

export function Navbar() {
  const pathname = usePathname();

  const [mounted, setMounted] = useState(false);

  const { resolvedTheme, setTheme } = useTheme();
  const isDark = mounted && resolvedTheme === "dark";

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
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
          px-6
        "
      >
        {/* LOGO */}
        <Link
          href="/"
          className="
            group
            flex
            items-center
            gap-3
          "
        >
          <div className="relative">
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

            <Image
              src="/zub.png"
              alt="OLGA Logo"
              width={70}
              height={70}
              priority
              className="
                relative
                object-contain
                transition-transform
                duration-500
                ease-[var(--theme-ease)]
                group-hover:scale-[1.04]
                group-hover:rotate-[-3deg]
              "
            />
          </div>

          <div className="flex flex-col leading-none text-left">
            <span
              className="
                bg-gradient-to-r
                from-[var(--accent)]
                via-[var(--accent-light)]
                to-[var(--accent)]
                bg-clip-text
                text-xl
                font-semibold
                tracking-[0.18em]
                text-transparent
              "
            >
              OLGA
            </span>

            <span
              className="
                mt-1
                text-[10px]
                uppercase
                tracking-[0.32em]
                text-[var(--text-muted)]
              "
            >
              Dental Clinic
            </span>
          </div>
        </Link>

        {/* NAVIGATION */}
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
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname === item.href ||
                  pathname.startsWith(`${item.href}/`);

            const isHome = item.href === "/";

            return (
              <Link
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
                      ? isHome
                        ? "text-[#071412] dark:text-[#071412]"
                        : "text-[var(--accent)]"
                      : "text-[var(--text-muted)] hover:text-[var(--accent)]"
                  }
                `}
              >
                {/* BASE HOVER GLASS */}
                <span
                  className={`
                    absolute
                    inset-0
                    rounded-full
                    transition-all
                    duration-500
                    ${
                      isActive
                        ? isHome
                          ? "bg-[linear-gradient(135deg,var(--accent-light),rgba(18,199,183,0.72))]"
                          : "bg-[var(--accent-light)]/10"
                        : "bg-transparent group-hover:bg-[var(--accent-light)]/8"
                    }
                  `}
                />

                {/* ACTIVE HOME INNER LIGHT */}
                {isActive && isHome && (
                  <span
                    className="
                      pointer-events-none
                      absolute
                      inset-0
                      rounded-full
                      bg-[linear-gradient(135deg,rgba(255,255,255,0.42),transparent_55%)]
                    "
                  />
                )}

                {/* ACTIVE GLOW */}
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

                {/* HOVER SHINE */}
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

                <span className="relative z-10">
                  {item.label}
                </span>

                {/* SMALL ACTIVE DOT */}
                {isActive && !isHome && (
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

                {/* HOME SPECIAL DOT */}
                {isActive && isHome && (
                  <span
                    className="
                      absolute
                      bottom-[5px]
                      left-1/2
                      h-[2px]
                      w-8
                      -translate-x-1/2
                      rounded-full
                      bg-[#071412]/45
                    "
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* ACTIONS */}
        <div className="flex items-center gap-3">
          {/* THEME TOGGLE */}
          <button
            type="button"
            onClick={() => setTheme(isDark ? "light" : "dark")}
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

          {/* PHONE */}
          <a
            href="tel:+78126026160"
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
            "
          >
            Позвонить
          </a>

          {/* BOOK */}
          <Link
            href="/contact"
            className="
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
            "
          >
            Запись
          </Link>
        </div>
      </div>
    </header>
  );
}