"use client";

import { useState } from "react";

import { Navbar } from "@/components/layout/navbar";
import { Hero } from "@/components/sections/hero";

import {
  Services,
  type Service,
} from "@/components/sections/services";

import { About } from "@/components/sections/about";
import { BookingModal } from "@/components/ui/booking-modal";
import { Doctors } from "@/components/sections/doctors";
import { Testimonials } from "@/components/sections/testimonials";
import { ContactMap } from "@/components/sections/contact-map";

type Doctor = {
  name: string;
};

export default function Home() {
  const [open, setOpen] = useState(false);

  const [selectedDoctor, setSelectedDoctor] =
    useState<Doctor | null>(null);

  const [selectedService, setSelectedService] =
    useState<Service | null>(null);

  const openGeneralBooking = () => {
    setSelectedDoctor(null);
    setSelectedService(null);
    setOpen(true);
  };

  const openDoctorBooking = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    setSelectedService(null);
    setOpen(true);
  };

  const openServiceBooking = (service: Service) => {
    setSelectedService(service);
    setSelectedDoctor(null);
    setOpen(true);
  };

  const closeBooking = () => {
    setOpen(false);
  };

  return (
    <>
      

      <main className="bg-transparent text-zinc-900 dark:text-white">
        <Hero onBook={openGeneralBooking} />

        <Services
  preview
  onBookService={openServiceBooking}
/>

        <Doctors onBookDoctor={openDoctorBooking} />

        <div className="relative z-10">
          <Testimonials />

          <About />

          <ContactMap />
        </div>
      </main>

      <BookingModal
        open={open}
        onClose={closeBooking}
        doctor={selectedDoctor}
        service={selectedService}
      />
    </>
  );
}