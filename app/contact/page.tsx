import { pageMetadata } from "@/lib/page-metadata";
import { ContactMap } from "@/components/sections/contact-map";

export const metadata = pageMetadata(
  "Контакты клиники в Мурино",
  "Контакты OLGA Dental Clinic: Мурино, Воронцовский бульвар, 2. Телефон, часы работы и карта проезда.",
  "/contact/",
);

export default function ContactPage() {
  return <ContactMap standalone />;
}