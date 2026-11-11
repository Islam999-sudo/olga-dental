-- Run this SQL on a NEW, separate MySQL database on Beget.
-- Do not run against an existing clinic database.
-- Requires MySQL/MariaDB with InnoDB and utf8mb4.

CREATE TABLE IF NOT EXISTS booking_requests (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  payload_ciphertext MEDIUMTEXT NOT NULL,
  consent_version VARCHAR(64) NOT NULL,
  consent_at DATETIME NOT NULL,
  status ENUM('new','processed') NOT NULL DEFAULT 'new',
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  INDEX booking_created (created_at),
  INDEX booking_status_created (status, created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS booking_rate_limits (
  ip_hash CHAR(64) CHARACTER SET ascii COLLATE ascii_bin NOT NULL,
  window_started DATETIME NOT NULL,
  attempts INT UNSIGNED NOT NULL DEFAULT 0,
  PRIMARY KEY (ip_hash),
  INDEX booking_rate_window (window_started)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Consent/version and UTC timestamp are retained for audit purposes.
-- Only encrypted name/phone/selected doctor/service are stored.
-- The database must not be exposed to the public internet.
