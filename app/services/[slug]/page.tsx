import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  CircleHelp,
  ClipboardList,
  HeartPulse,
  Info,
  ShieldCheck,
} from "lucide-react";
import { services, getService } from "@/lib/services";
import { getServiceArticle } from "@/lib/service-articles";
import { ServiceBookingButton } from "@/components/ui/service-booking-button";

type Params = { params: Promise<{ slug: string }> };

const anchors = [
  { href: "#about", label: "Об услуге" },
  { href: "#indications", label: "Когда обращаться" },
  { href: "#process", label: "Этапы лечения" },
  { href: "#aftercare", label: "После процедуры" },
  { href: "#important", label: "Особенности" },
  { href: "#pricing", label: "Стоимость" },
  { href: "#questions", label: "Вопросы и ответы" },
] as const;

function SectionHead({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="mb-8">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--accent)]">
        {eyebrow}
      </p>
      <h2 className="mt-3 text-3xl font-semibold leading-tight tracking-tight text-[var(--foreground)] sm:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="mt-4 max-w-[68ch] text-base leading-8 text-[var(--text-soft)]">
          {description}
        </p>
      )}
    </div>
  );
}

export function generateStaticParams() {
  return services.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  const article = getServiceArticle(slug);
  if (!service || !article) return { title: "Услуга не найдена" };

  return {
    title: service.title + " в Мурино — лечение, цены и этапы",
    description:
      service.desc + " Этапы лечения, показания, уход и ответы на частые вопросы. OLGA Dental Clinic, Мурино.",
    alternates: { canonical: "/services/" + slug },
    openGraph: {
      title: service.title + " — OLGA Dental Clinic",
      description: article.lead,
      type: "article",
      url: "/services/" + slug,
    },
  };
}

export default async function ServiceDetailPage({ params }: Params) {
  const { slug } = await params;
  const service = getService(slug);
  const article = getServiceArticle(slug);
  if (!service || !article) notFound();

  const related = services.filter((item) => item.slug !== slug).slice(
    Math.max(0, services.findIndex((item) => item.slug === slug) - 1),
    Math.max(0, services.findIndex((item) => item.slug === slug) - 1) + 3
  ).slice(0, 3);

  return (
    <div className="relative isolate overflow-hidden pb-28 pt-28 sm:pt-36">
      <div aria-hidden="true" className="pointer-events-none absolute -left-24 top-20 -z-10 h-[440px] w-[440px] rounded-full bg-[var(--accent-light)]/10 blur-3xl" />
      <div aria-hidden="true" className="pointer-events-none absolute -right-28 top-[560px] -z-10 h-[380px] w-[380px] rounded-full bg-[var(--accent-light)]/10 blur-3xl" />
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

        <nav aria-label="Навигационная цепочка" className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm leading-6 text-[var(--text-muted)]">
          <Link href="/" className="transition hover:text-[var(--accent)]">Главная</Link>
          <span aria-hidden="true">/</span>
          <Link href="/services" className="transition hover:text-[var(--accent)]">Услуги</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page" className="font-medium text-[var(--foreground)]">{service.title}</span>
        </nav>

        <header className="mt-9 grid items-center gap-10 lg:grid-cols-[1.06fr_.94fr] lg:gap-14">
          <div className="min-w-0">
            <span className="inline-flex items-center gap-2 rounded-full border border-[var(--accent-light)]/20 bg-[var(--accent-light)]/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">
              <HeartPulse aria-hidden="true" size={15} />
              Направление стоматологии
            </span>
            <h1 className="mt-7 text-4xl font-semibold leading-[1.1] tracking-tight text-[var(--foreground)] sm:text-5xl lg:text-[3.75rem]">
              {service.title}
            </h1>
            <p className="mt-6 max-w-[64ch] text-base leading-8 text-[var(--text-soft)] sm:text-lg sm:leading-9">
              {article.lead}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <ServiceBookingButton service={service} />
              <Link href="#about" className="inline-flex items-center gap-2 rounded-full border border-[var(--accent-light)]/25 px-6 py-3.5 text-sm font-semibold text-[var(--accent)] transition hover:bg-[var(--accent-light)]/10">
                Читать об услуге <ArrowRight aria-hidden="true" size={16} />
              </Link>
            </div>
            <p className="mt-5 max-w-xl text-sm leading-6 text-[var(--text-muted)]">
              Информация носит ознакомительный характер. Окончательный план лечения определяется врачом после осмотра и диагностики.
            </p>
          </div>
          {service.image && (
            <div className="relative aspect-[5/4] overflow-hidden rounded-[30px] border border-[var(--accent-light)]/15 bg-[var(--card)] shadow-[0_25px_80px_rgba(18,199,183,.10)] sm:rounded-[42px]">
              <Image
                src={service.image}
                alt={service.title + " — стоматологическое лечение"}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover"
              />
              <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[#081713]/35 via-transparent to-transparent" />
              <span className="absolute bottom-5 left-5 rounded-full border border-white/25 bg-[#071412]/70 px-5 py-2.5 text-sm font-medium text-white backdrop-blur-xl sm:bottom-7 sm:left-7">
                Стоимость {service.price}
              </span>
            </div>
          )}
        </header>

        <div className="mt-16 grid items-start gap-10 lg:mt-24 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-12">
          <article className="min-w-0 space-y-16 sm:space-y-20">

            <section id="about" className="scroll-mt-28">
              <SectionHead eyebrow="Разбираемся в деталях" title={"Что нужно знать об услуге"} />
              <div className="space-y-5">
                {article.overview.map((paragraph) => (
                  <p key={paragraph} className="max-w-[74ch] text-base leading-[1.95] text-[var(--text-soft)] sm:text-[17px]">
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>

            <section id="indications" className="scroll-mt-28">
              <SectionHead
                eyebrow="Ориентиры для пациента"
                title="Когда стоит обратиться"
                description="Ни один из перечисленных признаков сам по себе не заменяет диагноз. На консультации врач оценит ситуацию и предложит подходящие варианты."
              />
              <div className="grid gap-4 sm:grid-cols-2">
                {article.occasions.map((item) => (
                  <div key={item} className="flex items-start gap-3 rounded-[22px] border border-[var(--accent-light)]/15 bg-[var(--card)] p-5 shadow-[0_8px_28px_rgba(18,199,183,.04)] sm:p-6">
                    <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--accent-light)]/12 text-[var(--accent)]">
                      <Check size={16} aria-hidden="true" />
                    </span>
                    <p className="text-[15px] leading-7 text-[var(--text-soft)]">{item}</p>
                  </div>
                ))}
              </div>
            </section>

            <section id="process" className="scroll-mt-28">
              <SectionHead
                eyebrow="Поэтапно и понятно"
                title="Как проходит лечение"
                description="Ниже — типичная последовательность действий. Точный порядок и количество посещений зависят от диагноза, особенностей пациента и выбранной тактики."
              />
              <ol className="relative space-y-5">
                {article.stages.map((stage, index) => (
                  <li key={stage.title} className="relative flex gap-4 rounded-[24px] border border-[var(--accent-light)]/15 bg-[var(--card)] p-5 shadow-[0_10px_35px_rgba(18,199,183,.035)] sm:gap-6 sm:p-7">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[var(--accent-light)]/13 text-base font-bold tabular-nums text-[var(--accent)]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="text-lg font-semibold leading-7 text-[var(--foreground)]">{stage.title}</h3>
                      <p className="mt-3 max-w-[67ch] text-[15px] leading-[1.85] text-[var(--text-soft)] sm:text-base">{stage.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </section>

            <section id="aftercare" className="scroll-mt-28">
              <SectionHead eyebrow="После посещения" title="Восстановление и уход" />
              <div className="rounded-[28px] border border-[var(--accent-light)]/15 bg-[var(--card)] p-6 sm:p-9">
                <div className="space-y-5">
                  {article.aftercare.map((paragraph) => (
                    <p key={paragraph} className="max-w-[74ch] text-base leading-[1.95] text-[var(--text-soft)]">{paragraph}</p>
                  ))}
                </div>
              </div>
            </section>

            <section id="important" className="scroll-mt-28">
              <SectionHead eyebrow="До принятия решения" title="На что обратить внимание" />
              <div className="space-y-4">
                {article.considerations.map((item) => (
                  <div key={item} className="flex gap-4 border-b border-[var(--accent-light)]/15 pb-5 last:border-0">
                    <ShieldCheck size={22} aria-hidden="true" className="mt-0.5 shrink-0 text-[var(--accent)]" />
                    <p className="max-w-[74ch] text-base leading-[1.85] text-[var(--text-soft)]">{item}</p>
                  </div>
                ))}
              </div>
            </section>

            <section id="pricing" className="scroll-mt-28">
              <SectionHead eyebrow="Стоимость лечения" title="Из чего складывается цена" />
              <div className="rounded-[28px] border border-[var(--accent-light)]/20 bg-[var(--accent-light)]/[.07] p-6 sm:p-9">
                <p className="text-xs font-semibold uppercase tracking-[.2em] text-[var(--text-muted)]">Стоимость по каталогу</p>
                <p className="mt-3 text-3xl font-semibold text-[var(--accent)] sm:text-4xl">{service.price}</p>
                <p className="mt-5 max-w-[68ch] text-base leading-[1.9] text-[var(--text-soft)]">{article.pricing}</p>
                <div className="mt-7"><ServiceBookingButton service={service} /></div>
              </div>
            </section>

            <section id="questions" className="scroll-mt-28">
              <SectionHead eyebrow="Ответы на вопросы" title="Часто спрашивают" description="Собрали темы, которые полезно обсудить перед началом лечения." />
              <div className="space-y-3">
                {article.faq.map((item) => (
                  <details key={item.question} className="group rounded-[22px] border border-[var(--accent-light)]/15 bg-[var(--card)] px-5 py-1 sm:px-7">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-5 py-5 text-left font-semibold leading-7 text-[var(--foreground)] [&::-webkit-details-marker]:hidden">
                      <span>{item.question}</span>
                      <ChevronDown aria-hidden="true" size={19} className="shrink-0 text-[var(--accent)] transition-transform duration-300 group-open:rotate-180" />
                    </summary>
                    <p className="max-w-[74ch] border-t border-[var(--accent-light)]/15 pb-6 pt-5 text-[15px] leading-[1.9] text-[var(--text-soft)] sm:text-base">{item.answer}</p>
                  </details>
                ))}
              </div>
            </section>

          </article>

          <aside className="space-y-5 lg:sticky lg:top-28" aria-label="Навигация по странице и запись">
            <div className="rounded-[28px] border border-[var(--accent-light)]/20 bg-[var(--card)] p-6 shadow-[0_14px_50px_rgba(18,199,183,.08)]">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[.18em] text-[var(--accent)]">
                <ClipboardList aria-hidden="true" size={16} />
                Консультация
              </div>
              <p className="mt-4 text-sm leading-6 text-[var(--text-muted)]">Стоимость по каталогу</p>
              <p className="mt-1 text-3xl font-semibold text-[var(--foreground)]">{service.price}</p>
              <p className="mt-3 text-sm leading-6 text-[var(--text-soft)]">Точный план и окончательная сумма определяются после осмотра.</p>
              <div className="mt-6"><ServiceBookingButton service={service} /></div>
            </div>
            <nav aria-label="Содержание статьи" className="rounded-[28px] border border-[var(--accent-light)]/15 bg-[var(--card)] p-6">
              <h2 className="mb-5 text-sm font-semibold text-[var(--foreground)]">Содержание</h2>
              <ul className="space-y-1">
                {anchors.map((anchor) => (
                  <li key={anchor.href}>
                    <a href={anchor.href} className="block rounded-xl px-3 py-2 text-sm leading-5 text-[var(--text-soft)] transition-colors hover:bg-[var(--accent-light)]/10 hover:text-[var(--accent)]">
                      {anchor.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="flex gap-3 rounded-[20px] border border-[var(--accent-light)]/15 bg-[var(--card)] p-5">
              <Info aria-hidden="true" className="mt-0.5 shrink-0 text-[var(--accent)]" size={18} />
              <p className="text-xs leading-6 text-[var(--text-muted)]">
                Материал для ознакомления, не индивидуальная медицинская рекомендация. При острой боли, отёке или других тревожных симптомах обращайтесь за очной помощью.
              </p>
            </div>
          </aside>
        </div>

        <section className="mt-24 overflow-hidden rounded-[34px] border border-[var(--accent-light)]/20 bg-[var(--card)] p-8 text-center shadow-[0_20px_70px_rgba(18,199,183,.075)] sm:p-12">
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[.2em] text-[var(--accent)]"><CircleHelp aria-hidden="true" size={16} /> Остались вопросы?</span>
          <h2 className="mx-auto mt-4 max-w-2xl text-3xl font-semibold leading-tight tracking-tight text-[var(--foreground)] sm:text-4xl">Обсудите варианты лечения на консультации</h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-[var(--text-soft)]">
            Врач оценит состояние зубов, расскажет о подходящих методах, последовательности процедур и поможет разобраться в расчёте стоимости именно для вашей ситуации.
          </p>
          <div className="mt-8 flex justify-center"><ServiceBookingButton service={service} /></div>
        </section>

        {related.length > 0 && (
          <section aria-label="Другие стоматологические услуги" className="mt-20">
            <div className="flex flex-wrap items-end justify-between gap-5">
              <div>
                <span className="text-xs font-semibold uppercase tracking-[.2em] text-[var(--accent)]">Другие направления</span>
                <h2 className="mt-3 text-2xl font-semibold text-[var(--foreground)] sm:text-3xl">Вам также может быть интересно</h2>
              </div>
              <Link href="/services" className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--accent)] hover:underline">Все услуги <ArrowUpRight aria-hidden="true" size={17} /></Link>
            </div>
            <div className="mt-7 grid gap-5 md:grid-cols-3">
              {related.map((item) => (
                <Link key={item.slug} href={"/services/" + item.slug} className="group overflow-hidden rounded-[24px] border border-[var(--accent-light)]/15 bg-[var(--card)] shadow-[0_8px_28px_rgba(18,199,183,.04)] transition hover:-translate-y-1 hover:shadow-[0_14px_40px_rgba(18,199,183,.10)]">
                  {item.image && <div className="relative aspect-[16/9] overflow-hidden"><Image src={item.image} alt={item.title} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition-transform duration-500 group-hover:scale-[1.04]" /></div>}
                  <div className="p-5">
                    <h3 className="font-semibold text-[var(--foreground)]">{item.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-[var(--text-muted)]">{item.desc}</p>
                    <div className="mt-4 flex items-center justify-between gap-3 text-sm font-semibold text-[var(--accent)]"><span>{item.price}</span><ArrowRight aria-hidden="true" size={18}/></div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
        <Link href="/services" className="mt-10 inline-flex items-center gap-2 text-sm font-medium text-[var(--text-soft)] transition hover:text-[var(--accent)]"><ArrowLeft aria-hidden="true" size={17} /> Вернуться в каталог услуг</Link>
      </div>
    </div>
  );
}
