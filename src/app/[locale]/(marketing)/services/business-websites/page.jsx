import { toServiceContent } from "@/lib/cms/serviceContent";
import { fetchServer } from "@/lib/api-server";
import BusinessWebsitesClient from "@/components/marketing/services/BusinessWebsitesClient";

export default async function BusinessWebsitesPage() {
  let data = null;
  try {
    const res = await fetchServer("/cms/services/web-software/business-websites", {
      revalidate: 60,
    });
    if (res.data) {
      data = toServiceContent(res.data).landing;
    }
  } catch (err) {
    console.error("Failed to load business data on server", err);
  }

  return <BusinessWebsitesClient data={data} />;
}
