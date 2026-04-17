import { fetchServer } from "@/lib/api-server";
import EcommerceDetailsClient from "@/components/marketing/services/EcommerceDetailsClient";

export default async function EcommerceDetailsPage() {
  let content = null;
  try {
    const res = await fetchServer("/cms/services/web-software/ecommerce", {
      revalidate: 60,
    });
    if (res.data) content = res.data.details;
  } catch (err) {
    console.error("Failed to load ecommerce details on server", err);
  }

  return <EcommerceDetailsClient data={content} />;
}
