import { toServiceContent } from "@/lib/cms/serviceContent";
import { fetchServer } from "@/lib/api-server";
import EcommerceClient from "@/components/marketing/services/EcommerceClient";

export default async function EcommercePage() {
  let data = null;
  try {
    const res = await fetchServer("/cms/services/web-software/ecommerce", {
      revalidate: 60,
    });
    if (res.data) {
      data = toServiceContent(res.data).landing;
    }
  } catch (err) {
    console.error("Failed to fetch ecommerce data on server", err);
  }

  return <EcommerceClient data={data} />;
}
