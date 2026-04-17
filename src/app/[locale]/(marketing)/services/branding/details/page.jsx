import { fetchServer } from "@/lib/api-server";
import BrandingDetailsClient from "@/components/marketing/services/BrandingDetailsClient";

export default async function BrandingDetailsPage() {
  let content = null;
  try {
    const res = await fetchServer("/cms/services/web-software/branding", {
      revalidate: 60,
    });
    if (res.data) content = res.data;
  } catch (err) {
    console.error("Failed to fetch branding details on server", err);
  }

  return <BrandingDetailsClient data={content?.details} />;
}
