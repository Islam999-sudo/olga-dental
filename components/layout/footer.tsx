import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Clock3, MapPin, Phone } from "lucide-react";

const navigation = [
  { href: "/", label: "Главная" },
  { href: "/services", label: "Услуги" },
  { href: "/promotions", label: "Акции" },
  { href: "/doctors", label: "Наши врачи" },
  { href: "/about", label: "О клинике" },
  { href: "/contact", label: "Контакты" },
];

const featuredServices = [
  { href: "/services/implantation", label: "Имплантация зубов" },
  { href: "/services/caries", label: "Лечение кариеса" },
  { href: "/services/hygiene", label: "Профессиональная гигиена" },
  { href: "/services/orthodontics", label: "Ортодонтия" },
  { href: "/services/crowns", label: "Коронки" },
];

const footerLinkClass =
  "inline-flex w-fit items-center gap-1 text-sm leading-6 text-[var(--text-soft)] transition-colors duration-300 hover:text-[var(--accent)] focus-visible:rounded focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="relative isolate overflow-hidden border-t border-[var(--accent-light)]/20 bg-[var(--card)] text-[var(--foreground)]"
      aria-label="Информация о клинике"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-24 -top-28 h-80 w-80 rounded-full bg-[var(--accent-light)]/10 blur-3xl" />
        <div className="absolute -bottom-36 right-0 h-96 w-96 rounded-full bg-[var(--accent-light)]/10 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-6 pb-7 pt-14 sm:pt-16 lg:pt-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.35fr_.75fr_.85fr_1.1fr] lg:gap-10">
          <div className="max-w-sm">
            <Link href="/" className="group inline-flex items-center gap-3" aria-label="OLGA Dental Clinic — на главную">
              <Image
                src="/zub.png"
                alt=""
                width={72}
                height={72}
                className="h-[62px] w-[62px] object-contain transition-transform duration-500 group-hover:scale-105"
              />
              <span className="flex flex-col gap-1.5">
                <span className="bg-gradient-to-r from-[var(--accent)] via-[var(--accent-light)] to-[var(--accent)] bg-clip-text text-2xl font-semibold tracking-[.2em] text-transparent">
                  OLGA
                </span>
                <span className="text-[10px] font-medium uppercase tracking-[.25em] text-[var(--text-muted)]">
                  Dental Clinic
                </span>
              </span>
            </Link>
            <p className="mt-6 text-sm leading-7 text-[var(--text-soft)]">
              Стоматологическая клиника в Мурино. Консультации,
              профилактика, лечение и восстановление улыбки с индивидуальным
              подходом к каждому пациенту.
            </p>
            <Link
              href="/contact"
              className="mt-7 inline-flex items-center gap-2 rounded-full border border-[var(--accent-light)]/25 bg-[var(--accent-light)]/10 px-5 py-3 text-sm font-semibold text-[var(--accent)] shadow-[0_8px_32px_rgba(18,199,183,.06)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--accent-light)]/50 hover:bg-[var(--accent-light)]/15"
            >
              Связаться с клиникой
              <ArrowUpRight size={17} aria-hidden="true" />
            </Link>
          </div>

          <nav aria-label="Разделы сайта" className="min-w-0">
            <h2 className="mb-5 text-sm font-semibold tracking-wide text-[var(--foreground)]">
              Разделы сайта
            </h2>
            <ul className="flex flex-col gap-3">
              {navigation.map((item) => (
                <li key={item.href}>
                  <Link className={footerLinkClass} href={item.href}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Популярные услуги" className="min-w-0">
            <h2 className="mb-5 text-sm font-semibold tracking-wide text-[var(--foreground)]">
              Направления
            </h2>
            <ul className="flex flex-col gap-3">
              {featuredServices.map((item) => (
                <li key={item.href}>
                  <Link className={footerLinkClass} href={item.href}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="min-w-0">
            <h2 className="mb-5 text-sm font-semibold tracking-wide text-[var(--foreground)]">
              Контакты и график
            </h2>
            <div className="space-y-5">
              <div className="flex items-start gap-3">
                <Phone aria-hidden="true" size={18} className="mt-1 shrink-0 text-[var(--accent)]" />
                <a className={footerLinkClass + " font-medium"} href="tel:+78126036364">
                  +7 (812) 603-63-64
                </a>
              </div>
              <div className="flex items-start gap-3">
                <MapPin aria-hidden="true" size={18} className="mt-1 shrink-0 text-[var(--accent)]" />
                <a
                  className={footerLinkClass}
                  href="https://yandex.ru/maps/org/olga/99713820273/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Мурино, Воронцовский бульвар, 2
                  <ArrowUpRight size={14} aria-hidden="true" className="shrink-0" />
                </a>
              </div>
              <div className="flex items-start gap-3">
                <Clock3 aria-hidden="true" size={18} className="mt-1 shrink-0 text-[var(--accent)]" />
                <span className="text-sm leading-6 text-[var(--text-soft)]">Ежедневно, 10:00–21:00</span>
              </div>
              <a
                className={footerLinkClass + " mt-1"}
                href="https://vk.com/olgaclinic"
                target="_blank"
                rel="noopener noreferrer"
              >
                Сообщество ВКонтакте <ArrowUpRight size={14} aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-14 h-px w-full bg-gradient-to-r from-transparent via-[var(--accent-light)]/30 to-transparent sm:mt-16" />

        <div className="flex flex-col gap-4 py-7 sm:flex-row sm:items-center sm:justify-between sm:gap-8">
          <p className="text-xs leading-6 text-[var(--text-muted)] sm:text-sm">
            © {year} OLGA Dental Clinic. Все права защищены.
          </p>
          <p className="max-w-2xl text-xs leading-6 text-[var(--text-muted)] sm:text-right">
            Информация на сайте носит ознакомительный характер и не заменяет
            очную консультацию врача. Имеются противопоказания.
          </p>
        </div>
      </div>
    </footer>
  );
}
