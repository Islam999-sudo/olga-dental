<?php
declare(strict_types=1);

/**
 * Upload to public_html/api/booking.php ONLY on the Beget PHP server.
 * DO NOT copy this PHP file into a Vercel or static export artifact.
 */
header('Cache-Control: no-store');
header('X-Content-Type-Options: nosniff');
header('Referrer-Policy: no-referrer');

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    header('Allow: POST');
    http_response_code(405);
    exit;
}

try {
    require dirname(__DIR__, 2) . '/booking-private/bootstrap.php';
    $config = booking_config();

    // Deny any unencrypted submission, even if a caller spoofs Origin.
    if (($_SERVER['HTTPS'] ?? '') !== 'on') {
        booking_reply(403, ['success' => false, 'message' => 'Требуется защищённое соединение.']);
    }

    // Launch is explicitly disabled until the legal documents and Beget
    // database configuration are verified by the clinic.
    if (($config['accept_bookings'] ?? false) !== true) {
        booking_reply(503, ['success' => false, 'message' => 'Онлайн-запись пока недоступна. Пожалуйста, позвоните в клинику.']);
    }

    // No CORS. Browser requests must originate from the exact clinic origin.
    $origin = (string) ($_SERVER['HTTP_ORIGIN'] ?? '');
    $allowedOrigins = $config['allowed_origins'];
    if (!is_array($allowedOrigins) || !in_array($origin, $allowedOrigins, true)) {
        booking_reply(403, ['success' => false, 'message' => 'Запрос не разрешён.']);
    }

    if (!preg_match('~^application/json(?:\s*;|$)~i', (string) ($_SERVER['CONTENT_TYPE'] ?? ''))) {
        booking_reply(415, ['success' => false, 'message' => 'Неподдерживаемый формат.']);
    }

    if ((int) ($_SERVER['CONTENT_LENGTH'] ?? 0) > 4096) {
        booking_reply(413, ['success' => false, 'message' => 'Слишком большой запрос.']);
    }

    $raw = file_get_contents('php://input', false, null, 0, 4097);
    if ($raw === false || strlen($raw) > 4096) {
        booking_reply(413, ['success' => false, 'message' => 'Слишком большой запрос.']);
    }

    $body = json_decode($raw, true, 10, JSON_THROW_ON_ERROR);
    if (!is_array($body)) {
        booking_reply(400, ['success' => false, 'message' => 'Некорректные данные.']);
    }

    // Honeypot. A nonempty value indicates scripted submission.
    if (!empty($body['website'])) {
        booking_reply(400, ['success' => false, 'message' => 'Не удалось обработать запрос.']);
    }

    if (($body['consent'] ?? false) !== true
        || !is_string($body['consent_version'] ?? null)
        || !hash_equals((string) $config['consent_version'], $body['consent_version'])
    ) {
        booking_reply(400, ['success' => false, 'message' => 'Требуется актуальное согласие на обработку данных.']);
    }

    // Only the minimum details needed for a callback are accepted.
    // Free-text symptoms/comments are deliberately not collected.
    foreach (['name', 'phone'] as $field) {
        if (!is_string($body[$field] ?? null)) {
            booking_reply(400, ['success' => false, 'message' => 'Укажите имя и телефон.']);
        }
    }

    $name = trim($body['name']);
    $phone = preg_replace('/\D/', '', $body['phone']);
    if (strlen($name) < 2 || strlen($name) > 180 || !preg_match('/^[\p{L}\p{M}\s\'-]{2,60}$/u', $name)) {
        booking_reply(400, ['success' => false, 'message' => 'Проверьте имя.']);
    }
    if (str_starts_with($phone, '8') && strlen($phone) === 11) {
        $phone = '7' . substr($phone, 1);
    }
    if (str_starts_with($phone, '9') && strlen($phone) === 10) {
        $phone = '7' . $phone;
    }
    if (!preg_match('/^7\d{10}$/', $phone)) {
        booking_reply(400, ['success' => false, 'message' => 'Проверьте номер телефона.']);
    }

    $source = is_string($body['source'] ?? null) ? $body['source'] : '';
    if (!in_array($source, ['general', 'doctor', 'service'], true)) {
        booking_reply(400, ['success' => false, 'message' => 'Неверный источник записи.']);
    }

    $doctor = $body['doctor'] ?? '';
    $service = $body['service'] ?? '';
    if (!is_string($doctor) || !is_string($service) || strlen($doctor) > 250 || strlen($service) > 250) {
        booking_reply(400, ['success' => false, 'message' => 'Слишком длинное название услуги или врача.']);
    }

    if (booking_rate_limited('submission', 3, 1800)) {
        header('Retry-After: 1800');
        booking_reply(429, ['success' => false, 'message' => 'Слишком много запросов. Попробуйте позже.']);
    }

    $encryptedPayload = booking_encrypt([
        'name' => $name,
        'phone' => '+' . $phone,
        'source' => $source,
        'doctor' => trim($doctor),
        'service' => trim($service),
    ]);

    $stmt = booking_database()->prepare(
        'INSERT INTO booking_requests (payload_ciphertext, consent_version, consent_at)
         VALUES (:payload_ciphertext, :consent_version, UTC_TIMESTAMP())'
    );
    $stmt->execute([
        'payload_ciphertext' => $encryptedPayload,
        'consent_version' => $config['consent_version'],
    ]);

    // No form data, tokens, names, numbers or email bodies in responses/logs.
    booking_reply(201, ['success' => true, 'message' => 'Заявка принята. Администратор свяжется с вами.']);
} catch (JsonException $error) {
    booking_reply(400, ['success' => false, 'message' => 'Некорректный формат данных.']);
} catch (Throwable $error) {
    // Fail closed; do not return SQL, config, PHP or patient details.
    http_response_code(503);
    header('Content-Type: application/json; charset=utf-8');
    echo '{"success":false,"message":"Сервис записи временно недоступен. Позвоните в клинику."}';
    exit;
}
