import type { Metadata } from "next";

import "./globals.css";

import { ScrollToTop } from "@/components/ScrollToTop";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { BookingProvider } from "@/components/providers/booking-provider";

import { Navbar } from "@/components/layout/navbar";
import { GlobalBookingModal } from "@/components/global-booking-modal";

export const metadata: Metadata = {
  metadataBase: new URL(
  "https://olga-clinic-murino.ru"
),

  title: {
    default: "OLGA Dental Clinic — стоматология в Мурино",
    template: "%s | OLGA Dental Clinic",
  },

  description:
    "Современная стоматология в Мурино. Имплантация зубов, лечение кариеса, ортодонтия, профессиональная гигиена, протезирование и эстетическая стоматология.",

  keywords: [
    "стоматология Мурино",
    "стоматолог Мурино",
    "имплантация зубов",
    "лечение зубов",
    "лечение кариеса",
    "ортодонтия",
    "виниры",
    "коронки",
    "протезирование",
    "синус-лифтинг",
    "удаление зубов",
    "OLGA Dental Clinic",
  ],

  authors: [
    {
      name: "OLGA Dental Clinic",
    },
  ],

  creator: "OLGA Dental Clinic",

  openGraph: {
    title: "OLGA Dental Clinic — стоматология в Мурино",

    description:
      "Имплантация, лечение зубов, ортодонтия, профессиональная гигиена и протезирование в современной стоматологической клинике.",

    url: "https://olga-clinic-murino.ru",

    siteName: "OLGA Dental Clinic",

    locale: "ru_RU",

    type: "website",

  images: [
    {
      url: "https://olga-clinic-murino.ru/og-image.jpg",
      width: 1200,
      height: 630,
      alt: "OLGA Dental Clinic — стоматология в Мурино",
    },
  ],
},

  twitter: {
    card: "summary_large_image",

    title: "OLGA Dental Clinic",

    description:
      "Современная стоматология в Мурино. Имплантация, лечение зубов и эстетическая стоматология.",

    images: ["/og-image.jpg"],
  },

  robots: {
    index: true,
    follow: true,

    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ru"
      suppressHydrationWarning
    >
      <body
        className="
          bg-zinc-50
          text-zinc-900
          antialiased
          transition-colors
          duration-500
          dark:bg-[#071412]
          dark:text-white
        "
      >
        <ThemeProvider>
          <BookingProvider>
            <ScrollToTop />

            <Navbar />

            <GlobalBookingModal />

            <div className="min-h-screen flex flex-col">
              <main className="flex-1">
                {children}
              </main>
            </div>
          </BookingProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}