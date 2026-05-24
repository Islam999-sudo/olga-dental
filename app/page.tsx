"use client";

import { useState } from "react";

import { Navbar } from "@/components/layout/navbar";
import { Hero } from "@/components/sections/hero";
import { Services } from "@/components/sections/services";
import { About } from "@/components/sections/about";
import { BookingModal } from "@/components/ui/booking-modal";
import { Doctors } from "@/components/sections/doctors";
import { Testimonials } from "@/components/sections/testimonials";

export default function Home() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Navbar onBook={() => setOpen(true)} />

      <main className="bg-transparent text-zinc-900">
        <Hero onBook={() => setOpen(true)} />
        <Services />
        <Doctors />
        <Testimonials />
        <About />
      </main>

      <BookingModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}