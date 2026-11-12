"use client";

import { Hero } from "@/components/sections/hero";
import { Services } from "@/components/sections/services";
import { Doctors } from "@/components/sections/doctors";
import { Testimonials } from "@/components/sections/testimonials";
import { ContactMap } from "@/components/sections/contact-map";
import { useBooking } from "@/components/providers/booking-provider";

export default function Home() {
  const { openBooking } = useBooking();

  return (
    <div className="bg-transparent text-zinc-900 dark:text-white">
      <Hero onBook={() => openBooking()} />
      <Services preview />
      <Doctors onBookDoctor={(doctor) => openBooking(doctor)} />
      <div className="relative z-10">
        <Testimonials />
        <ContactMap />
      </div>
    </div>
  );
}
