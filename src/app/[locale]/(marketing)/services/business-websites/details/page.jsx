import { fetchServer } from "@/lib/api-server";
import BusinessDetailsClient from "@/components/marketing/services/BusinessDetailsClient";

export default async function BusinessDetailsPage() {
  let content = null;
  try {
    const res = await fetchServer("/cms/services/web-software/business-websites", {
      revalidate: 60,
    });
    if (res.data) {
      content = res.data.details;
    }
  } catch (err) {
    console.error("Failed to load business details on server", err);
  }

  return <BusinessDetailsClient data={content} />;
}
