<?php
declare(strict_types=1);

/**
 * Scheduled cleanup; keep outside public_html.
 * Only execute over SSH or from a Beget cron job after the clinic approves
 * the retention period in config.php and has a backup/recovery procedure.
 */
if (PHP_SAPI !== 'cli') {
    http_response_code(403);
    exit;
}

require __DIR__ . '/bootstrap.php';

$config = booking_config();
$days = (int) ($config['retention_days'] ?? 0);
if ($days < 1 || $days > 3650 || ($config['accept_bookings'] ?? false) !== true) {
    fwrite(STDERR, "Cleanup disabled or retention period not approved.\n");
    exit(1);
}

$db = booking_database();
$stmt = $db->prepare(
    'DELETE FROM booking_requests WHERE created_at < DATE_SUB(UTC_TIMESTAMP(), INTERVAL ' . $days . ' DAY)'
);
$stmt->execute();

// Rate limit records only need to survive their active window.
$db->exec('DELETE FROM booking_rate_limits WHERE window_started < DATE_SUB(UTC_TIMESTAMP(), INTERVAL 2 DAY)');

// Do not print patient data, tokens or SQL queries.
echo "Old requests and expired rate-limit entries were purged.\n";
