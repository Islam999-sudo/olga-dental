import type { Metadata } from "next";

const siteName = "OLGA Dental Clinic";
const socialImage = {
  url: "/og-image.jpg",
  width: 1200,
  height: 630,
  alt: "Клиника Ольга Мурино — OLGA Dental Clinic",
};

export function pageMetadata(title: string, description: string, path: string): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: `${title} — ${siteName}`,
      description,
      url: path,
      siteName,
      locale: "ru_RU",
      type: "website",
      images: [socialImage],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} — ${siteName}`,
      description,
      images: [socialImage.url],
    },
  };
}
