# Воспроизведение браузерного аудита

Это отдельный набор инструментов, не runtime-зависимости сайта. Версии Playwright Core 1.65.1 и axe 4.14.0 закреплены lock-файлом. Нужны Node.js 24 и установленный Chromium (`/usr/bin/chromium` либо `CHROMIUM_PATH`). Установить инструменты в отдельный временный каталог:

```sh
mkdir -p /tmp/olga-qa
cp docs/audit/tools/* /tmp/olga-qa/
npm ci --prefix /tmp/olga-qa --cache /tmp/olga-npm-cache
```

Собрать обычный preview с выключенной отправкой и запустить статический сервер:

```sh
NEXT_PUBLIC_BOOKING_ENABLED=false npm run build
python3 -m http.server 4173 --bind 127.0.0.1 --directory out
```

В другой оболочке, из корня checkout:

```sh
REPO_ROOT="$PWD" BASE_URL=http://127.0.0.1:4173 PHASE=after npm --prefix /tmp/olga-qa run audit:browser
REPO_ROOT="$PWD" BASE_URL=http://127.0.0.1:4173 PHASE=after npm --prefix /tmp/olga-qa run audit:headings
REPO_ROOT="$PWD" BASE_URL=http://127.0.0.1:4173 npm --prefix /tmp/olga-qa run audit:focused
REPO_ROOT="$PWD" BASE_URL=http://127.0.0.1:4173 npm --prefix /tmp/olga-qa run audit:extras
REPO_ROOT="$PWD" BASE_URL=http://127.0.0.1:4173 npm --prefix /tmp/olga-qa run audit:validation
REPO_ROOT="$PWD" BASE_URL=http://127.0.0.1:4173 npm --prefix /tmp/olga-qa run audit:interactions
REPO_ROOT="$PWD" BASE_URL=http://127.0.0.1:4173 npm --prefix /tmp/olga-qa run audit:smoke
REPO_ROOT="$PWD" BASE_URL=http://127.0.0.1:4173 node /tmp/olga-qa/scroll-regression.mjs
```

`scroll-regression.mjs` проверяет три независимых возврата истории, три якоря из акций, прямой fragment URL и сохранение пользовательской прокрутки при задержке JavaScript на 1800 мс. Он разрешает только GET к origin локальной сборки, сохраняет `scroll-final.json` и завершает работу с ненулевым кодом при провале assertion.

`audit:browser` сохраняет JSON и PNG в `docs/audit/`. Матрица: 20 маршрутов в двух темах; шесть представительных страниц на восьми размерах в обеих темах; формы, врачи, меню, адрес и ссылки. Внешние HTTP-запросы блокируются и записываются в evidence. Проверка не оценивает работоспособность Яндекс.Карты. Скриншоты полной страницы снимаются после прокрутки и ограниченного ожидания декодирования изображений. Это подготовка скриншотов, не метод измерения производительности.

Проверки реальной ветви `fetch` требуют **отдельного локального экспорта** с синтетической версией согласия. Не изменять guard production-host и не публиковать этот включённый тестовый экспорт. В аудите он был собран в `/tmp/olga-enabled/out`, вне обычного preview:

```sh
# Выполнить в изолированной копии исходников, сохранив обычный out/:
NEXT_PUBLIC_BOOKING_ENABLED=true NEXT_PUBLIC_BOOKING_CONSENT_VERSION=approved-test npm run build -- --webpack

# Указать путь именно к изолированному экспорту:
REPO_ROOT="$PWD" MOCK_OUT=/tmp/olga-enabled/out npm --prefix /tmp/olga-qa run audit:booking
REPO_ROOT="$PWD" MOCK_OUT=/tmp/olga-enabled/out npm --prefix /tmp/olga-qa run audit:analytics
```

Оба mock-скрипта перехватывают **каждый** HTTP-запрос: HTML/JS/CSS/изображения возвращаются из локальных файлов, API получает синтетические ответы, Метрика получает пустую тестовую реализацию. `route.continue()` в этих двух скриптах отсутствует. URL production используется только как имитированный origin браузера; настоящие серверы клиники и Метрики не вызываются. Ввод содержит только синтетическое имя и номер. Успешный ответ mock не доказывает готовность Beget, отправку уведомления или работу с настоящей базой.

Ограничения: Chromium headless — настоящий браузерный движок, но размеры iPhone являются эмуляцией viewport. Физические iPhone/iOS Safari, системная клавиатура и реальные safe-area inset в этой среде не проверены. Axe не заменяет проверку screen reader и полный аудит WCAG. `heading-clipping` намеренно также видит частично скрытые боковые карточки карусели; их нужно отличать от обрезанных основных заголовков.

`audit:extras` проверяет backdrop, поворот/reduced height, reduced motion и эквивалентный 200% reflow (683×384 CSS px с DPR 2 для исходного 1366×768; не Chrome UI zoom). `audit:validation` проверяет фактические отдельные alert. `audit:interactions` проверяет темы, все профили/фильтры врачей, карусель, FAQ и mailto без запуска почтового приложения. `audit:smoke` сверяет 20 маршрутов, статические assets и критические сценарии после точечного завершения сборки.
