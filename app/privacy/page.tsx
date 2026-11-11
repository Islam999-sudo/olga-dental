import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Проект политики обработки персональных данных",
  description: "Предварительный документ для юридического согласования с ООО «ОРДВИК».",
  robots: { index: false, follow: false },
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-4xl px-5 pb-24 pt-32 sm:pt-40">
      <Link href="/" className="text-sm text-[var(--accent)] hover:underline">← На главную</Link>
      <div className="mt-8 rounded-[28px] border border-amber-500/30 bg-amber-500/10 p-6">
        <strong className="text-[var(--foreground)]">Проект документа — не утверждён</strong>
        <p className="mt-2 text-sm leading-7 text-[var(--text-soft)]">
          Эта версия предназначена для технического предпросмотра и согласования с заказчиком.
          До утверждения документа и проверки фактической обработки данных приём реальных заявок через новую систему отключён.
        </p>
      </div>
      <h1 className="mt-10 text-4xl font-semibold tracking-tight text-[var(--foreground)] sm:text-5xl">
        Политика в отношении обработки персональных данных
      </h1>
      <p className="mt-5 text-base leading-8 text-[var(--text-soft)]">
        Предварительный текст для OLGA Dental Clinic. Публикация в качестве действующей политики
        возможна только после проверки юристом клиники, фактической конфигурации хостинга
        и срока хранения заявок.
      </p>
      <div className="mt-10 space-y-10 text-[var(--text-soft)]">
        <section>
          <h2 className="text-2xl font-semibold text-[var(--foreground)]">1. Оператор персональных данных</h2>
          <p className="mt-4 leading-8">
            Общество с ограниченной ответственностью «ОРДВИК» (ООО «ОРДВИК»),
            ИНН 7843312800, ОГРН 1117847128189.
            Юридический адрес: Санкт-Петербург, г. Зеленогорск, ул. Привокзальная, д. 3,
            литера А, пом. 1Н. Адрес клиники: Ленинградская область, г. Мурино,
            Воронцовский бульвар, д. 2.
          </p>
          <p className="mt-3 leading-8">Для обращений: <a className="text-[var(--accent)] underline" href="mailto:mail@olga-clinic.ru">mail@olga-clinic.ru</a>.</p>
        </section>
        <section>
          <h2 className="text-2xl font-semibold text-[var(--foreground)]">2. Цели обработки</h2>
          <p className="mt-4 leading-8">
            Обработка обращений, организация обратного звонка администратора и согласование записи
            на приём. Окончательный перечень целей и правовых оснований подлежит утверждению оператором.
          </p>
        </section>
        <section>
          <h2 className="text-2xl font-semibold text-[var(--foreground)]">3. Какие сведения предполагается собирать</h2>
          <p className="mt-4 leading-8">
            Имя, контактный телефон, выбранная услуга или специалист, отметка о согласии и дата её получения.
            Свободный комментарий с диагнозом и жалобами в новой форме не предусмотрен.
            Данные о состоянии здоровья должны обрабатываться отдельно по соответствующим основаниям.
          </p>
        </section>
        <section>
          <h2 className="text-2xl font-semibold text-[var(--foreground)]">4. Хранение и доступ</h2>
          <p className="mt-4 leading-8">
            Проектируемая система предусматривает первичную запись заявок в отдельную базу данных
            на сервере, расположение и условия которого необходимо подтвердить у провайдера Beget,
            а также ограниченный доступ сотрудников клиники. Сроки хранения, порядок уничтожения,
            резервного копирования и организационные меры безопасности ожидают согласования с оператором.
          </p>
        </section>
        <section>
          <h2 className="text-2xl font-semibold text-[var(--foreground)]">5. Подрядчики и аналитика</h2>
          <p className="mt-4 leading-8">
            При запуске потребуется документировать всех лиц и сервисы, участвующие в обработке,
            включая хостинг, почтовые сервисы и Яндекс Метрику, и определить применимые
            основания и ограничения передачи сведений. Действующий Web3Forms не должен
            оставаться каналом сбора заявок после безопасного перехода.
          </p>
        </section>
        <section>
          <h2 className="text-2xl font-semibold text-[var(--foreground)]">6. Права субъекта персональных данных</h2>
          <p className="mt-4 leading-8">
            Посетитель вправе направить оператору запрос о порядке обработки его данных,
            исправлении неточных сведений, прекращении обработки или отзыве согласия
            в случаях и порядке, предусмотренных законодательством РФ.
            Порядок подтверждения личности и обработки запросов должен быть согласован оператором.
          </p>
        </section>
      </div>
      <div className="mt-12 border-t border-[var(--accent-light)]/20 pt-8 text-sm leading-7 text-[var(--text-muted)]">
        Требует утверждения: юридические основания, перечень получателей, сроки хранения,
        вопросы трансграничной передачи, аналитика, меры безопасности и порядок удаления данных.
      </div>
    </div>
  );
}
