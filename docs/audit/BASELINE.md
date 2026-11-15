# OLGA Dental Clinic — исходное состояние

Дата: 2026-11-15 (UTC). Репозиторий: `Islam999-sudo/olga-dental`.
Исследуемая ветка: `preview/soni-development`, commit `b52dc6849d94baac48c32aa0d35f4e62126f74a2`.
Рабочая ветка: `audit/olga-quality-2026`. Этот отчёт создан **до изменений кода приложения**.

## Границы и метод

Аудит распределён между frontend, UX, performance, security и QA направлениями с независимой проверкой результатов. Изучены все исходные файлы app/components/lib/data, конфигурации, workflows, PHP/SQL/Apache и deployment-инструкции. Реальные заявки, production Beget, медицинские сведения и утверждённая структура не изменяются. Активные security-тесты допускаются только в локальном контейнере с синтетическими данными. Нет доступа к конфигурации рабочего Apache/MySQL, SFTP, журналам или физическому iPhone. Chromium с заданным viewport не является проверкой iOS Safari.

## Реализовано

- Next.js 16.2.6 / React 19.2.4 / TypeScript / Tailwind 4 / Framer Motion; App Router, `output: export`, `trailingSlash: true`, `images.unoptimized: true`.
- 20 страниц контента: главная, услуги, 12 статей услуг, врачи, о клинике, акции, контакты, privacy и consent. Профили 7 врачей открываются в модальных окнах, отдельных URL нет.
- Общая запись через BookingProvider/GlobalBookingModal, контекст врача/услуги, маска телефона, отдельное согласие; на preview отправка отключена, показан честный demo feedback.
- Светлая/тёмная тема next-themes, меню, карусель врачей, отзывы, телефон, копирование адреса, автоматический lazy iframe Яндекс Карты.
- Метрика загружается только на production host после отдельного выбора аналитики; webvisor отключён. Карта не зависит от аналитического выбора; это раскрыто в проекте политики.
- Отдельный PHP пакет (не входит в `public/` и static export): same-origin JSON API, MySQL, AES-256-GCM, HMAC rate keys, админские HTTPS sessions/CSRF/escaping, retention script. Конфигурация-шаблон не содержит рабочих секретов.
- SEO metadata, JSON-LD Dentist, sitemap, robots, OG; Vercel `X-Robots-Tag: noindex, nofollow, noarchive`.
- GitHub Actions для frontend и PHP. README Beget прямо запрещает запуск до одобрения документов и проверки инфраструктуры.

## Подтверждённые исходные проверки

Node v24.22.1, npm 11.9.0, Linux. `npm ci` с lockfile выполнен без изменений зависимостей (cache в /tmp). ESLint, TypeScript и `scripts/verify-content.mjs` — PASS: 12 услуг, 12 статей, 12 изображений услуг, 7 фото врачей. `next build` — PASS, статический экспорт сформирован. Первая попытка build была заблокирована sandbox при bind локального порта; повтор в разрешённой сетевой среде успешен: это ограничение окружения, а не дефект сайта. Логи в [evidence](evidence/).

Security: PHP 8.3 в изолированном Docker, read-only исходники, без сети: синтаксис всех PHP/шаблона — PASS; существующий encryption smoke — PASS (roundtrip, отсутствие plaintext, отклонение подмены GCM).

Браузерные снимки и исходные измерения производительности снимаются с **неизменённой** production static build на `http://127.0.0.1:4173` перед разрешением правок; результаты и точные условия сохраняются отдельно в REGRESSION/PERFORMANCE и evidence/before-*.

## Реестр исходных проблем

| ID | Приоритет | Доказательство / проблема | Действие |
|---|---|---|---|
| UX-01 | P1 | BookingModal/DoctorModal без dialog semantics, focus trap/initial focus/restore; inputs без labels; нет form/Enter submit | Минимальная доступность модалок и формы |
| UX-02 | P1 | Navbar drawer max-height + overflow-hidden, нет Escape/focus handling; desktop nav с md=768 потенциально тесный | Проверка браузером; scrollable drawer и корректный breakpoint |
| UX-03 | P2 | globals.css без Tailwind 4 class-based dark variant при next-themes `.dark` | Согласовать механизм темы |
| UX-04 | P2 | white на #12c7b7 ≈2.13:1; мелкий accent #0f8f84 на white ≈3.98:1 | Сохранить палитру, поправить foreground/contrast |
| UX-05 | P2 | CSS reduced-motion есть, Framer Motion общей reducedMotion конфигурации нет | Уважать системное предпочтение и JS scrolling |
| FORM-01 | P1 | localStorage get вне try; set после успешного POST может вызвать ложную ошибку | Storage optional, состояние отправки надёжно |
| FORM-02 | P2 | fetch без timeout, success timer не очищается, нет idempotency key | Abort/cleanup; isolated retry/idempotency tests |
| SEC-01 | P2 | maintenance запрещён при accept_bookings=false; при остановке приёма retention тоже останавливается | Разделить приём и очистку, проверить локально |
| SEO-01 | P2 | Основные страницы наследуют одинаковый metadata; canonical только у detail услуг | Уникальные metadata/canonical без правок медицинского контента |
| A11Y-01 | P2 | Contact без h1; about/doctors вложенные main | Исправить семантику без изменения вида |
| CI-01 | P2 | Переэкранированный regex внешнего booking API не ловит синтетический URL; неполные paths filters | Исправить guard, добавить самопроверку/export check |
| PERF-01 | P2 | public/zub.png: 1 494 215 bytes, 1024px для маленького логотипа | Снять baseline; отдельный меньший lossless WebP |
| READY-01 | P1, блокер запуска | Privacy/consent явно являются неутверждёнными проектами; инфраструктура не подтверждена | Юрист/ответственный клиники, не сочинять правовые тексты |

Наличие названных защит в исходниках не доказывает их включение на Beget. Подтверждённых P0 на этом этапе нет; это не гарантия отсутствия уязвимостей.

## Сопровождение и инвентаризация

Нет необходимости в масштабном рефакторинге. Повторяемость карточек/стилей частично намеренная. Сложные зоны: большая ручная Navbar, жизненный цикл вложенных модалок, телефонная маска, два контура размещения, смена ключей шифрования/retention/backup. `resend` не импортируется; шаблонные public SVG, `components/sections/about.tsx`, exports transition/viewport lib/motion не используются текущими маршрутами. Они учитываются как кандидаты на последующую уборку, не удаляются ради косметики.

## Ограничения исходной оценки

Браузер/метрики, network/heap и screenshots имеют отдельные артефакты; не выводятся из одного успешного build. Lab Lighthouse не измеряет полевой INP. Проверка юридических документов завершается вопросами ответственным, не обещанием соответствия закону. До разрешения правок необходимо сохранить before screenshots и Lighthouse; итоговая оценка даётся после regression, с явным разделением результатов и экспертных суждений.
