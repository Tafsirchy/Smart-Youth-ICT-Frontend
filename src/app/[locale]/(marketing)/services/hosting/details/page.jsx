import { toServiceContent } from "@/lib/cms/serviceContent";
import { fetchServer } from "@/lib/api-server";
import HostingDetailsClient from "@/components/marketing/services/HostingDetailsClient";

export default async function HostingDetailsPage() {
  let content = null;
  try {
    const res = await fetchServer("/cms/services/ai-managed/hosting", {
      revalidate: 60,
    });
    if (res.data) content = res.data;
  } catch (err) {
    console.error("Failed to load hosting details on server", err);
  }

  return <HostingDetailsClient data={toServiceContent(content).details} />;
}
