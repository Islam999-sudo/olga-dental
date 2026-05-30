"use client";

import { BookingModal } from "@/components/ui/booking-modal";
import { useBooking } from "@/components/providers/booking-provider";

export function GlobalBookingModal() {
  const {
    isOpen,
    closeBooking,
    doctor,
    service,
  } = useBooking();

  return (
    <BookingModal
      open={isOpen}
      onClose={closeBooking}
      doctor={doctor}
      service={service}
    />
  );
}