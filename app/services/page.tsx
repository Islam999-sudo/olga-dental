import { pageMetadata } from "@/lib/page-metadata";
import { Services } from "@/components/sections/services";

export const metadata = pageMetadata(
  "Стоматологические услуги в Мурино",
  "Услуги OLGA Dental Clinic в Мурино: лечение зубов, имплантация, ортодонтия, протезирование и профессиональная гигиена.",
  "/services/",
);

export default function ServicesPage() {
  return <Services />;
}
