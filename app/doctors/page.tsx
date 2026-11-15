import { pageMetadata } from "@/lib/page-metadata";
import { DoctorsPage } from "@/components/pages/doctors-page";

export const metadata = pageMetadata(
  "Врачи клиники в Мурино",
  "Врачи OLGA Dental Clinic: направления лечения, образование, опыт и запись к специалисту.",
  "/doctors/",
);

export default function Page() {
return <DoctorsPage />;
}
