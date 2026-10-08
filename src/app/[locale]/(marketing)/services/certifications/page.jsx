import { fetchServer } from "@/lib/api-server";
import CertificationsClient from "@/components/marketing/services/CertificationsClient";

export default async function CertificationsProgramsPage() {
  let programs = [];
  let content = null;
  try {
    const [programsRes, contentRes] = await Promise.all([
      fetchServer("/cms/services/certifications", { revalidate: 60 }),
      fetchServer("/cms/services/content/certifications", { revalidate: 60 })
    ]);
    if (programsRes.data) programs = programsRes.data;
    if (contentRes.data) content = contentRes.data;
  } catch (err) {
    console.error("Failed to load certifications data on server", err);
  }

  return <CertificationsClient programs={programs} content={content} />;
}
