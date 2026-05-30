"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";

type BookingContextType = {
  isOpen: boolean;

  doctor: any | null;
  service: any | null;

  openBooking: (
    doctor?: any,
    service?: any
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

  const [doctor, setDoctor] = useState<any | null>(null);
  const [service, setService] = useState<any | null>(null);

  const openBooking = (
    doctorData?: any,
    serviceData?: any
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