import { pageMetadata } from "@/lib/page-metadata";
import { AboutPageContent } from "@/components/pages/about-page";

export const metadata = pageMetadata(
  "О клинике в Мурино",
  "О клинике OLGA Dental Clinic в Мурино: подход к лечению, команда и пространство клиники.",
  "/about/",
);

export default function AboutPage() {
  return <AboutPageContent />;
}