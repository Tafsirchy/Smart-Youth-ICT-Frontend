import { fetchServer } from "@/lib/api-server";
import CertificationsDetailsClient from "@/components/marketing/services/CertificationsDetailsClient";

export default async function CertificationsDetailsPage() {
  let content = null;
  try {
    const res = await fetchServer("/cms/services/content/certifications", {
      revalidate: 60,
    });
    if (res.data) content = res.data;
  } catch (err) {
    console.error("Failed to load certifications details on server", err);
  }

  return <CertificationsDetailsClient data={content?.details} />;
}
