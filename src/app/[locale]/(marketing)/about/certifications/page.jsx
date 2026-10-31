import { fetchServer } from "@/lib/api-server";
import CertificationsPageClient from "@/components/marketing/CertificationsPageClient";

export const revalidate = 60;

export async function generateMetadata({ params }) {
  return {
    title: "Official Certifications & Accreditations | Smart Youth ICT",
    description:
      "Explore official government registrations, BTEB affiliations, and ISO 9001:2015 quality standards maintained by Smart Youth ICT.",
    openGraph: {
      title: "Official Certifications & Accreditations | Smart Youth ICT",
      description:
        "Explore official government registrations, BTEB affiliations, and ISO 9001:2015 quality standards maintained by Smart Youth ICT.",
    },
  };
}

export default async function CertificationsPage() {
  let certifications = [];
  let hero = null;

  try {
    const res = await fetchServer("/cms/certifications", {
      revalidate: 30,
    });
    if (res?.data) {
      certifications = res.data;
    }
    if (res?.hero) {
      hero = res.hero;
    }
  } catch (err) {
    console.error("[CertificationsPage] Server fetch fallback:", err?.message);
  }

  return (
    <CertificationsPageClient
      initialCertifications={certifications}
      hero={hero}
    />
  );
}
