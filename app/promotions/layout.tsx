import { pageMetadata } from "@/lib/page-metadata";

export const metadata = pageMetadata(
  "Акции стоматологии в Мурино",
  "Актуальные предложения OLGA Dental Clinic в Мурино: условия, стоимость и переход к услугам клиники.",
  "/promotions/",
);

export default function PromotionsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
