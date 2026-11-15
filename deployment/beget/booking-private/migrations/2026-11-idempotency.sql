-- PREPARED ONLY: back up and test on an isolated copy first.
-- For an EXISTING booking_requests table created before request_id support.
-- A fresh installation must use schema.sql instead (do not run both).
-- Pause accept_bookings during the reviewed API + frontend rollout.
-- NULL preserves historic rows without inventing request identifiers.
ALTER TABLE booking_requests
  ADD COLUMN request_id CHAR(36) CHARACTER SET ascii COLLATE ascii_bin NULL AFTER id,
  ADD UNIQUE KEY booking_request_id (request_id);
