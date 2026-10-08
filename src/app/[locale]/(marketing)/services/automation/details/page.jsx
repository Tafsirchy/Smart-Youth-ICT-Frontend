import { fetchServer } from "@/lib/api-server";
import AutomationDetailsClient from "@/components/marketing/services/AutomationDetailsClient";

export default async function AutomationDetailsPage() {
  let content = null;
  try {
    const res = await fetchServer("/cms/services/ai-managed/automation", {
      revalidate: 60,
    });
    if (res.data) content = res.data;
  } catch (err) {
    console.error("Failed to load automation details on server", err);
  }

  return <AutomationDetailsClient data={content?.details} />;
}
