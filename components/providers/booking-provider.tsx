"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";

type BookingContextType = {
  openBooking: () => void;
  closeBooking: () => void;
  isOpen: boolean;
};

const BookingContext =
  createContext<BookingContextType | null>(null);

export function BookingProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <BookingContext.Provider
      value={{
        isOpen,
        openBooking: () => setIsOpen(true),
        closeBooking: () => setIsOpen(false),
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