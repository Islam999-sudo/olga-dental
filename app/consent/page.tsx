import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Проект согласия на обработку данных",
  robots: { index: false, follow: false },
};

export default function ConsentPage() {
  return (
    <div className="mx-auto max-w-4xl px-5 pb-24 pt-32 sm:pt-40">
      <Link href="/" className="text-sm text-[var(--accent)] hover:underline">← На главную</Link>
      <div className="mt-8 rounded-[28px] border border-amber-500/30 bg-amber-500/10 p-6 text-sm leading-7 text-[var(--text-soft)]">
        <strong className="text-[var(--foreground)]">Проект согласия — требуется юридическое согласование.</strong>
        <p className="mt-1">Новая система не принимает обращения до утверждения документов и проверки серверной инфраструктуры.</p>
      </div>
      <h1 className="mt-10 text-4xl font-semibold text-[var(--foreground)] sm:text-5xl">
        Согласие на обработку персональных данных
      </h1>
      <div className="mt-8 space-y-6 text-base leading-8 text-[var(--text-soft)]">
        <p>
          Оставляя заявку на обратный звонок и отдельно отмечая согласие,
          посетитель разрешает ООО «ОРДВИК» (ИНН 7843312800, ОГРН 1117847128189)
          обработать предоставленные им имя и телефон для связи по поводу записи
          в OLGA Dental Clinic. При выборе услуги или врача эти сведения также
          могут использоваться для организации ответа.
        </p>
        <p>
          Предполагаемые действия: получение, запись, хранение, использование для обратного звонка,
          а также удаление после достижения цели или в случаях, предусмотренных законом.
          Порядок, срок действия согласия, перечень уполномоченных лиц и информация
          о порученной обработке должны быть уточнены и утверждены оператором.
        </p>
        <p>
          Для обращения об отзыве согласия или обработке данных можно написать на
          <a className="ml-1 text-[var(--accent)] underline" href="mailto:mail@olga-clinic.ru">mail@olga-clinic.ru</a>.
          Отзыв согласия не обязательно исключает дальнейшую обработку при наличии
          иных оснований, предусмотренных законом.
        </p>
        <p>
          Не вводите в форму сведения о здоровье, диагнозы или результаты обследований.
          Медицинские вопросы следует обсуждать с сотрудником клиники по соответствующему каналу.
        </p>
      </div>
      <Link href="/privacy" className="mt-10 inline-flex text-sm font-semibold text-[var(--accent)] underline">
        Проект политики обработки персональных данных
      </Link>
    </div>
  );
}
