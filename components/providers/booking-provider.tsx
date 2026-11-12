"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";

type BookingContextType = {
  isOpen: boolean;

  doctor: { name: string } | null;
  service: { title: string } | null;

  openBooking: (
    doctor?: { name: string },
    service?: { title: string }
  ) => void;

  closeBooking: () => void;
};

const BookingContext =
  createContext<BookingContextType | null>(null);

export function BookingProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const [doctor, setDoctor] = useState<{ name: string } | null>(null);
  const [service, setService] = useState<{ title: string } | null>(null);

  const openBooking = (
    doctorData?: { name: string },
    serviceData?: { title: string }
  ) => {
    setDoctor(doctorData ?? null);
    setService(serviceData ?? null);

    setIsOpen(true);
  };

  const closeBooking = () => {
    setIsOpen(false);

    setDoctor(null);
    setService(null);
  };

  return (
    <BookingContext.Provider
      value={{
        isOpen,
        doctor,
        service,
        openBooking,
        closeBooking,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const context = useContext(BookingContext);

  if (!context) {
    throw new Error(
      "useBooking must be used inside BookingProvider"
    );
  }

  return context;
}