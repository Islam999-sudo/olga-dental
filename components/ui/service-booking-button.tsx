"use client";

import { useBooking } from "@/components/providers/booking-provider";
import type { Service } from "@/lib/services";

export function ServiceBookingButton({ service }: { service: Service }) {
  const { openBooking } = useBooking();
  return (
    <button type="button" onClick={() => openBooking(undefined, service)}
      className="rounded-full bg-[var(--accent-light)] px-7 py-3.5 font-semibold text-[#071412] shadow-[0_10px_30px_rgba(18,199,183,.18)] transition hover:-translate-y-0.5 hover:brightness-110">
      Записаться на консультацию
    </button>
  );
}
