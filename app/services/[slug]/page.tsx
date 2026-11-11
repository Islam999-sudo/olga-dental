import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { services, getService } from "@/lib/services";
import { ServiceBookingButton } from "@/components/ui/service-booking-button";

type Params = { params: Promise<{ slug: string }> };

const details: Record<string, { overview: string; stages: string[]; notes: string }> = {
  implantation: {
    overview: "Имплантация позволяет восстановить утраченный зуб с опорой на искусственный корень. Выбор импланта и будущей коронки зависит от диагностики, объёма костной ткани и общего состояния полости рта.",
    stages: ["Консультация и диагностика, оценка костной ткани", "Составление индивидуального плана и расчёт стоимости", "Хирургическая установка импланта с обезболиванием", "Период приживления и последующее протезирование"],
    notes: "Сроки приживления и необходимость костной пластики определяются индивидуально. Имплантация имеет противопоказания."
  },
  "implant-tooth-package": {
    overview: "Комплексное предложение объединяет основные этапы восстановления одного утраченного зуба: от установки импланта до изготовления коронки из диоксида циркония.",
    stages: ["Диагностика и согласование плана лечения", "Установка импланта", "Установка формирователя десны по показаниям", "Получение оттисков или цифровых сканов", "Изготовление и фиксация циркониевой коронки"],
    notes: "Состав пакета и дополнительные вмешательства необходимо уточнить на консультации. Костная пластика и другие процедуры могут оплачиваться отдельно."
  },
  caries: {
    overview: "При лечении кариеса врач удаляет поражённые ткани и восстанавливает форму зуба пломбировочным материалом. Раннее обращение помогает сохранить больше собственных тканей.",
    stages: ["Осмотр и определение глубины поражения", "Анестезия при необходимости", "Удаление кариозных тканей", "Восстановление формы и контактов зуба", "Проверка прикуса и полировка"],
    notes: "Точная стоимость зависит от объёма разрушения и определяется после осмотра. Глубокий кариес иногда требует дополнительного лечения."
  },
  hygiene: {
    overview: "Профессиональная гигиена направлена на удаление мягкого и пигментированного налёта, а при необходимости — твёрдых зубных отложений. Она дополняет ежедневную домашнюю чистку.",
    stages: ["Осмотр полости рта и оценка состояния дёсен", "Удаление отложений подходящим методом", "Очистка поверхностей аппаратом Air-Flow по показаниям", "Полировка и рекомендации по домашнему уходу"],
    notes: "Методики подбираются с учётом состояния эмали, дёсен и чувствительности зубов."
  },
  veneers: {
    overview: "Керамические виниры E-Max могут скорректировать внешний вид передних зубов: форму, оттенок и небольшие эстетические недостатки. Подходящий вариант определяется после оценки прикуса.",
    stages: ["Консультация и обсуждение желаемого результата", "Диагностика и планирование улыбки", "Подготовка зубов при необходимости", "Изготовление индивидуальных виниров", "Примерка и фиксация"],
    notes: "Виниры подходят не во всех клинических ситуациях. Объём обработки зубов и возможные альтернативы обсуждаются заранее."
  },
  extraction: {
    overview: "Удаление рекомендуют тогда, когда сохранить зуб не удаётся либо есть другие медицинские показания. Тактика зависит от расположения корней и сложности клинической ситуации.",
    stages: ["Осмотр и рентгенологическая диагностика по показаниям", "Подбор местной анестезии", "Аккуратное удаление зуба", "Контроль состояния лунки и рекомендации по заживлению"],
    notes: "Сложное удаление, в том числе зубов мудрости, может потребовать отдельного плана и дополнительного времени."
  },
  pulpitis: {
    overview: "Пульпит — воспаление пульпы, внутренней ткани зуба. При лечении каналов врач удаляет поражённые ткани, обрабатывает корневую систему и восстанавливает зуб.",
    stages: ["Диагностика причины боли", "Обезболивание и изоляция зуба", "Обработка корневых каналов", "Пломбирование каналов", "Восстановление коронковой части зуба"],
    notes: "Количество посещений и способ окончательного восстановления зависят от состояния зуба и сложности каналов."
  },
  periodontitis: {
    overview: "При периодонтите воспаление затрагивает ткани в области корня зуба. Лечение направлено на устранение источника инфекции и сохранение зуба, когда это возможно.",
    stages: ["Осмотр и диагностика состояния корней", "Обработка и дезинфекция каналов", "Медикаментозный этап по показаниям", "Герметичное пломбирование каналов", "Контроль заживления и восстановление зуба"],
    notes: "Прогноз зависит от состояния корней и окружающих тканей. В отдельных случаях могут потребоваться дополнительные процедуры."
  },
  crowns: {
    overview: "Коронка покрывает разрушенную часть зуба и помогает восстановить его форму и жевательную функцию. Материал выбирают с учётом расположения зуба, нагрузки и эстетических требований.",
    stages: ["Диагностика и выбор материала", "Подготовка зуба или опоры импланта", "Снятие оттисков либо цифровое сканирование", "Изготовление коронки в лаборатории", "Примерка и фиксация"],
    notes: "Варианты включают металлокерамику и диоксид циркония. Подготовка каналов или культевая вкладка могут потребоваться отдельно."
  },
  prosthetics: {
    overview: "Съёмные протезы применяют при отсутствии нескольких или всех зубов. Они изготавливаются индивидуально с учётом анатомии челюсти и позволяют восстановить основные функции зубного ряда.",
    stages: ["Осмотр и оценка опорных тканей", "Выбор конструкции и материала", "Оттиски и определение прикуса", "Изготовление и примерка протеза", "Коррекция посадки и рекомендации по уходу"],
    notes: "К съёмному протезу может потребоваться период адаптации. Регулярные контрольные осмотры помогают поддерживать комфорт."
  },
  sinus: {
    overview: "Синус-лифтинг — хирургическое увеличение объёма костной ткани в боковых отделах верхней челюсти. Его проводят по показаниям при подготовке к имплантации.",
    stages: ["Компьютерная томография и оценка анатомии пазухи", "Выбор методики и планирование", "Хирургический этап и внесение костнопластического материала", "Наблюдение за заживлением", "Имплантация в согласованные сроки"],
    notes: "Процедура необходима не каждому пациенту. Показания, риски и сроки восстановления врач объясняет после диагностики."
  },
  orthodontics: {
    overview: "Ортодонтическое лечение помогает исправлять нарушения прикуса и положение зубов. В зависимости от ситуации могут использоваться брекеты или прозрачные элайнеры.",
    stages: ["Диагностика, снимки и анализ прикуса", "Разработка индивидуального плана лечения", "Установка брекетов или выдача элайнеров", "Периодические контрольные приёмы", "Ретенционный этап для сохранения результата"],
    notes: "Продолжительность и итоговая стоимость зависят от сложности случая и выбранной системы."
  }
};

export function generateStaticParams() {
  return services.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return { title: "Услуга не найдена" };
  return {
    title: `${service.title} в Мурино — цены и запись`,
    description: `${service.desc} Подробнее о лечении, этапах и стоимости в OLGA Dental Clinic, Мурино.`,
    alternates: { canonical: `/services/${slug}` }
  };
}

export default async function ServiceDetailPage({ params }: Params) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();
  const detail = details[slug];
  if (!detail) notFound();
  return (
    <div className="relative overflow-hidden pb-24 pt-28 sm:pt-36">
      <div className="pointer-events-none absolute -left-32 top-32 h-96 w-96 rounded-full bg-[var(--accent-light)]/10 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-6">
        <nav aria-label="Навигационная цепочка" className="flex flex-wrap gap-2 text-sm text-[var(--text-muted)]">
          <Link href="/" className="hover:text-[var(--accent)]">Главная</Link><span>/</span>
          <Link href="/services" className="hover:text-[var(--accent)]">Услуги</Link><span>/</span>
          <span aria-current="page" className="text-[var(--accent)]">{service.title}</span>
        </nav>
        <div className="mt-10 grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <span className="inline-flex rounded-full border border-[var(--accent-light)]/20 bg-[var(--accent-light)]/10 px-4 py-2 text-xs font-semibold uppercase tracking-[.18em] text-[var(--accent)]">Стоматологические услуги</span>
            <h1 className="mt-6 text-4xl font-semibold leading-tight tracking-tight text-[var(--accent)] sm:text-5xl lg:text-6xl">{service.title}</h1>
            <p className="mt-6 text-lg leading-relaxed text-[var(--text-soft)]">{service.fullDesc}</p>
            <div className="mt-8 flex flex-wrap items-center gap-5">
              <span className="text-3xl font-semibold text-[var(--accent)]">{service.price}</span>
              <ServiceBookingButton service={service} />
            </div>
            <p className="mt-5 text-sm text-[var(--text-muted)]">Итоговую стоимость и необходимость отдельных этапов уточняйте после осмотра.</p>
          </div>
          {service.image && (
            <div className="relative aspect-[5/4] overflow-hidden rounded-[34px] border border-[var(--accent-light)]/20 bg-[var(--card)] shadow-[0_22px_70px_rgba(18,199,183,0.1)]">
              <Image src={service.image} alt={service.title} fill priority sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
            </div>
          )}
        </div>
        <div className="mt-20 grid gap-8 lg:grid-cols-[1.4fr_1fr]">
          <section className="rounded-[30px] border border-[var(--accent-light)]/15 bg-[var(--card)] p-7 shadow-sm sm:p-10">
            <h2 className="text-3xl font-semibold text-[var(--accent)]">Об услуге</h2>
            <p className="mt-5 leading-8 text-[var(--text-soft)]">{detail.overview}</p>
            <h2 className="mt-10 text-2xl font-semibold text-[var(--accent)]">Как проходит лечение</h2>
            <ol className="mt-6 space-y-5">
              {detail.stages.map((stage, i) => (
                <li key={stage} className="flex gap-4 text-[var(--text-soft)]">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--accent-light)]/15 font-semibold text-[var(--accent)]">{i + 1}</span>
                  <span className="pt-1.5">{stage}</span>
                </li>
              ))}
            </ol>
          </section>
          <div className="space-y-6">
            <section className="rounded-[30px] border border-[var(--accent-light)]/15 bg-[var(--card)] p-7 sm:p-9">
              <h2 className="text-2xl font-semibold text-[var(--accent)]">Преимущества</h2>
              <ul className="mt-6 space-y-4">
                {service.benefits.map((benefit) => <li key={benefit} className="flex gap-3 text-[var(--text-soft)]"><span className="text-[var(--accent)]">✓</span>{benefit}</li>)}
              </ul>
            </section>
            <section className="rounded-[30px] border border-[var(--accent-light)]/15 bg-[var(--card)] p-7 sm:p-9">
              <h2 className="text-xl font-semibold text-[var(--accent)]">Важно знать</h2>
              <p className="mt-4 leading-7 text-[var(--text-soft)]">{detail.notes}</p>
            </section>
          </div>
        </div>
        <section className="mt-16 rounded-[34px] bg-[var(--card)] p-8 text-center shadow-[0_16px_50px_rgba(18,199,183,.08)] sm:p-12">
          <h2 className="text-3xl font-semibold text-[var(--accent)]">Обсудим план лечения?</h2>
          <p className="mx-auto mt-4 max-w-2xl text-[var(--text-soft)]">Запишитесь на консультацию, чтобы узнать о подходящих вариантах и получить индивидуальный расчёт.</p>
          <div className="mt-7 flex justify-center"><ServiceBookingButton service={service} /></div>
          <Link href="/services" className="mt-7 inline-block text-sm text-[var(--accent)] underline underline-offset-4">Вернуться ко всем услугам</Link>
        </section>
      </div>
    </div>
  );
}
