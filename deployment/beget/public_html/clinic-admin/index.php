<?php
declare(strict_types=1);

/**
 * Upload only to public_html/clinic-admin/index.php on Beget.
 * Never deploy the patient dashboard to Vercel.
 */
header('Cache-Control: no-store, private');
header('Pragma: no-cache');
header('X-Robots-Tag: noindex, nofollow, noarchive');
header('X-Content-Type-Options: nosniff');
header('Referrer-Policy: no-referrer');
header('Content-Security-Policy: default-src \'none\'; style-src \'unsafe-inline\'; form-action \'self\'; base-uri \'none\'; frame-ancestors \'none\';');

try {
    require dirname(__DIR__, 2) . '/booking-private/bootstrap.php';
    booking_config();

    // Require HTTPS even when only the login form is displayed.
    if (($_SERVER['HTTPS'] ?? '') !== 'on') {
        http_response_code(403);
        exit('HTTPS required');
    }

    booking_start_admin_session();
} catch (Throwable $error) {
    http_response_code(503);
    exit('Панель временно недоступна.');
}

$feedback = '';
$isAdmin = ($_SESSION['authenticated'] ?? false) === true;
$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';

if ($method === 'POST') {
    $formToken = $_POST['csrf'] ?? null;
    if (!is_string($formToken) || !hash_equals((string) $_SESSION['csrf'], $formToken)) {
        http_response_code(403);
        exit('Недействительная сессия.');
    }

    if (($_POST['action'] ?? '') === 'logout') {
        $_SESSION = [];
        session_regenerate_id(true);
        header('Location: /clinic-admin/index.php', true, 303);
        exit;
    }

    if (!$isAdmin && ($_POST['action'] ?? '') === 'login') {
        try {
            if (booking_rate_limited('admin-login', 8, 3600)) {
                $feedback = 'Слишком много попыток входа. Повторите позже.';
            } else {
                $password = $_POST['password'] ?? '';
                $hash = (string) booking_config()['admin_password_hash'];
                if (is_string($password) && strlen($password) <= 256 && password_verify($password, $hash)) {
                    session_regenerate_id(true);
                    $_SESSION['authenticated'] = true;
                    $_SESSION['last_action'] = time();
                    $_SESSION['csrf'] = bin2hex(random_bytes(32));
                    header('Location: /clinic-admin/index.php', true, 303);
                    exit;
                }
                $feedback = 'Неверный пароль.';
            }
        } catch (Throwable $error) {
            $feedback = 'Сервис авторизации временно недоступен.';
        }
    }
}

$records = [];
if ($isAdmin) {
    try {
        $pdo = booking_database();
        $stmt = $pdo->query(
            'SELECT id, payload_ciphertext, consent_version, consent_at, created_at
             FROM booking_requests ORDER BY id DESC LIMIT 50'
        );
        while ($row = $stmt->fetch()) {
            try {
                $data = booking_decrypt((string) $row['payload_ciphertext']);
                $records[] = [
                    'id' => (int) $row['id'],
                    'created_at' => (string) $row['created_at'],
                    'consent_version' => (string) $row['consent_version'],
                    'consent_at' => (string) $row['consent_at'],
                    'data' => $data,
                ];
            } catch (Throwable $error) {
                // Do not show raw encrypted data on a corrupted entry.
                $records[] = [
                    'id' => (int) $row['id'],
                    'created_at' => (string) $row['created_at'],
                    'consent_version' => '',
                    'consent_at' => '',
                    'data' => ['name' => 'Ошибка чтения', 'phone' => '', 'service' => '', 'doctor' => '', 'source' => ''],
                ];
            }
        }
    } catch (Throwable $error) {
        $feedback = 'Не удалось загрузить заявки.';
    }
}
?>
<!doctype html>
<html lang="ru">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <meta name="robots" content="noindex,nofollow,noarchive">
  <title>Заявки — OLGA Dental Clinic</title>
  <style>
    :root{color-scheme:light;font-family:system-ui,-apple-system,Arial,sans-serif;background:#f4f8f7;color:#193530}
    *{box-sizing:border-box}
    body{margin:0;padding:24px;line-height:1.6}
    .wrap{max-width:1040px;margin:0 auto}
    h1{font-size:clamp(1.5rem,4vw,2.2rem);margin:18px 0 8px}
    p{margin:8px 0;color:#405b56}
    .panel{background:#fff;border:1px solid #d4eae5;border-radius:22px;padding:24px;box-shadow:0 10px 40px rgba(23,138,118,.06)}
    .top{display:flex;align-items:center;justify-content:space-between;gap:16px;flex-wrap:wrap;margin-bottom:26px}
    a{color:#0c7667}label{font-weight:600;display:block;margin:14px 0 6px}
    input{font:inherit;width:100%;padding:14px;border:1px solid #b8d5cf;border-radius:12px}
    button{cursor:pointer;border:none;border-radius:999px;background:#0e9486;padding:12px 22px;color:#fff;font:inherit;font-weight:700}
    button:hover{background:#0c736a}
    .error{padding:10px 15px;background:#fff0ed;border-radius:12px;color:#8d3122;margin:14px 0}
    .record{padding:21px;border:1px solid #d9e8e4;border-radius:17px;margin-top:15px;background:#fff}
    .meta{font-size:12px;color:#58716b}.record h2{margin:3px 0 10px;font-size:18px}
    .grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:14px}
    .value{overflow-wrap:anywhere;font-weight:550}
    small{display:block;color:#516e68;font-size:12px;margin-bottom:3px}
  </style>
</head>
<body><div class="wrap">
  <div class="top"><div>
    <p style="font-weight:750;letter-spacing:.12em;color:#0e9486">OLGA DENTAL CLINIC</p>
    <h1>Заявки с сайта</h1>
    <p>Доступ только для уполномоченных сотрудников клиники.</p>
  </div>
  <?php if ($isAdmin): ?>
    <form method="post" action="/clinic-admin/index.php">
      <input type="hidden" name="csrf" value="<?= booking_html((string) $_SESSION['csrf']) ?>">
      <input type="hidden" name="action" value="logout">
      <button type="submit">Выйти</button>
    </form>
  <?php endif; ?>
  </div>
  <?php if ($feedback !== ''): ?><div class="error"><?= booking_html($feedback) ?></div><?php endif; ?>
  <?php if (!$isAdmin): ?>
    <div class="panel" style="max-width:460px">
      <h2>Вход для сотрудников</h2>
      <p>Введите отдельный пароль панели заявок.</p>
      <form method="post" action="/clinic-admin/index.php">
        <input type="hidden" name="csrf" value="<?= booking_html((string) $_SESSION['csrf']) ?>">
        <input type="hidden" name="action" value="login">
        <label for="password">Пароль</label>
        <input type="password" id="password" name="password" autocomplete="current-password" required>
        <div style="margin-top:20px"><button type="submit">Войти</button></div>
      </form>
    </div>
  <?php else: ?>
    <div class="panel">
      <h2>Последние 50 обращений</h2>
      <p>Время указано в UTC. Не передавайте данные пациентов через незащищённые каналы.</p>
      <?php if (count($records) === 0): ?><p>Новых данных пока нет.</p><?php endif; ?>
      <?php foreach ($records as $record): ?>
        <article class="record">
          <div class="meta">№ <?= $record['id'] ?> · <?= booking_html($record['created_at']) ?> UTC</div>
          <h2><?= booking_html((string) ($record['data']['name'] ?? '—')) ?></h2>
          <div class="grid">
            <div><small>Телефон</small><div class="value"><?= booking_html((string) ($record['data']['phone'] ?? '—')) ?></div></div>
            <div><small>Источник записи</small><div class="value"><?= booking_html((string) ($record['data']['source'] ?? '—')) ?></div></div>
            <div><small>Услуга</small><div class="value"><?= booking_html((string) ($record['data']['service'] ?? '—')) ?></div></div>
            <div><small>Врач</small><div class="value"><?= booking_html((string) ($record['data']['doctor'] ?? '—')) ?></div></div>
          </div>
          <div class="meta" style="margin-top:16px">Согласие: <?= booking_html($record['consent_version']) ?> · <?= booking_html($record['consent_at']) ?> UTC</div>
        </article>
      <?php endforeach; ?>
    </div>
  <?php endif; ?>
</div></body></html>
