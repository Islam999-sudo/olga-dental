"use client";

import { Services } from "@/components/sections/services";
import { useBooking } from "@/components/providers/booking-provider";

export default function ServicesPage() {
  const { openBooking } = useBooking();

  return (
    <Services
      onBookService={(service) =>
        openBooking(undefined, service)
      }
    />
  );
}