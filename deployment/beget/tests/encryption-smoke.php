<?php
declare(strict_types=1);

/**
 * Synthetic-only encryption smoke test.
 * Must not use a real database, patient record, or production key.
 */
$folder = sys_get_temp_dir() . DIRECTORY_SEPARATOR . 'olga-booking-test-' . bin2hex(random_bytes(8));

if (!mkdir($folder, 0700) && !is_dir($folder)) {
    throw new RuntimeException('Failed to create isolated test directory.');
}
try {
    $source = dirname(__DIR__) . '/booking-private/bootstrap.php';
    if (!copy($source, $folder . '/bootstrap.php')) {
        throw new RuntimeException('Could not copy bootstrap for isolated test.');
    }

    $configuration = [
        'db_host' => 'localhost',
        'db_name' => 'synthetic_not_connected',
        'db_user' => 'not_used',
        'db_pass' => 'not_used',
        'encryption_key_b64' => base64_encode(random_bytes(32)),
        'rate_key_b64' => base64_encode(random_bytes(32)),
        'admin_password_hash' => password_hash('unique-test-only-password', PASSWORD_DEFAULT),
        'allowed_origins' => ['https://olga-clinic-murino.ru'],
        'consent_version' => 'synthetic-test-v1',
        'accept_bookings' => false,
    ];
    $configurationCode = "<?php\nreturn " . var_export($configuration, true) . ";\n";
    if (file_put_contents($folder . '/config.php', $configurationCode) === false) {
        throw new RuntimeException('Failed to write temporary config.');
    }

    require $folder . '/bootstrap.php';

    $patient = [
        'name' => 'Тестовый Пациент',
        'phone' => '+70000000000',
        'doctor' => 'Тестовый врач',
        'service' => 'Синтетический пример',
        'source' => 'service',
    ];
    $encrypted = booking_encrypt($patient);
    $decrypted = booking_decrypt($encrypted);

    if ($patient !== $decrypted) {
        throw new RuntimeException('Encryption roundtrip failed.');
    }
    if (str_contains($encrypted, 'Тестовый') || str_contains($encrypted, '+70000000000')) {
        throw new RuntimeException('Plaintext was found in encrypted record.');
    }

    $raw = base64_decode($encrypted, true);
    if ($raw === false || strlen($raw) <= 29) {
        throw new RuntimeException('Encrypted record too short.');
    }
    $raw[30] = chr(ord($raw[30]) ^ 1);
    $tampered = base64_encode($raw);
    $rejected = false;
    try {
        booking_decrypt($tampered);
    } catch (RuntimeException $error) {
        $rejected = true;
    }

    if (!$rejected) {
        throw new RuntimeException('Tampering was not detected.');
    }

    echo "PASS: encrypted roundtrip, plaintext isolation, GCM tamper protection.\n";
} finally {
    foreach (['bootstrap.php', 'config.php'] as $file) {
        @unlink($folder . '/' . $file);
    }
    @rmdir($folder);
}
