import type { Metadata } from "next";

import "./globals.css";

import { ScrollToTop } from "@/components/ScrollToTop";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { BookingProvider } from "@/components/providers/booking-provider";

import { Navbar } from "@/components/layout/navbar";
import { GlobalBookingModal } from "@/components/global-booking-modal";

const siteUrl = "https://olga-clinic-murino.ru";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default:
      "Клиника Ольга Мурино — OLGA Dental Clinic | Стоматология в Мурино",
    template: "%s | OLGA Dental Clinic",
  },

  description:
    "Клиника Ольга в Мурино — современная стоматология OLGA Dental Clinic на Воронцовском бульваре, 2. Лечение зубов, имплантация, ортодонтия, профессиональная гигиена, протезирование и эстетическая стоматология.",

  keywords: [
    "Клиника Ольга Мурино",
    "Ольга клиника Мурино",
    "стоматология Ольга Мурино",
    "OLGA Dental Clinic Мурино",
    "OLGA Clinic Мурино",
    "OLGA Dental Clinic",
    "стоматология Мурино",
    "стоматолог Мурино",
    "стоматологическая клиника Мурино",
    "Воронцовский бульвар 2 стоматология",
    "стоматология Воронцовский бульвар",
    "имплантация зубов Мурино",
    "лечение зубов Мурино",
    "лечение кариеса Мурино",
    "ортодонтия Мурино",
    "виниры Мурино",
    "коронки Мурино",
    "протезирование Мурино",
    "профессиональная гигиена зубов Мурино",
    "синус-лифтинг",
    "удаление зубов",
  ],

  authors: [
    {
      name: "OLGA Dental Clinic",
    },
  ],

  creator: "OLGA Dental Clinic",

  openGraph: {
    title:
      "Клиника Ольга Мурино — OLGA Dental Clinic | Стоматология в Мурино",

    description:
      "Стоматологическая клиника Ольга в Мурино. Имплантация, лечение зубов, ортодонтия, профессиональная гигиена, протезирование и эстетическая стоматология.",

    url: siteUrl,

    siteName: "OLGA Dental Clinic",

    locale: "ru_RU",

    type: "website",

    images: [
      {
        url: `${siteUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Клиника Ольга Мурино — OLGA Dental Clinic",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title: "Клиника Ольга Мурино — OLGA Dental Clinic",

    description:
      "Современная стоматология в Мурино на Воронцовском бульваре, 2. Лечение зубов, имплантация, ортодонтия и эстетическая стоматология.",

    images: [`${siteUrl}/og-image.jpg`],
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

const clinicJsonLd = {
  "@context": "https://schema.org",
  "@type": "Dentist",
  name: "OLGA Dental Clinic",
  alternateName: [
    "Клиника Ольга",
    "Клиника Ольга Мурино",
    "Ольга клиника Мурино",
    "Стоматология Ольга Мурино",
    "OLGA Clinic",
  ],
  url: siteUrl,
  image: `${siteUrl}/og-image.jpg`,
  logo: `${siteUrl}/zub.png`,
  telephone: "+7-812-603-63-64",
  priceRange: "₽₽",
  medicalSpecialty: "Dentistry",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Мурино",
    streetAddress: "Воронцовский бульвар, 2",
    addressCountry: "RU",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "10:00",
      closes: "21:00",
    },
  ],
  sameAs: ["https://vk.com/olgaclinic"],
  hasMap: "https://yandex.ru/maps/org/olga/99713820273/",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" suppressHydrationWarning>
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
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(clinicJsonLd),
          }}
        />

        <ThemeProvider>
          <BookingProvider>
            <ScrollToTop />

            <Navbar />

            <GlobalBookingModal />

            <div className="min-h-screen flex flex-col">
              <main className="flex-1">{children}</main>
            </div>
          </BookingProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}