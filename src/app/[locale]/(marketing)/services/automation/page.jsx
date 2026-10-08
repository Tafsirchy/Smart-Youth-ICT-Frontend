import { fetchServer } from "@/lib/api-server";
import AutomationClient from "@/components/marketing/services/AutomationClient";

export default async function BusinessAutomationPage() {
  let content = null;
  try {
    const res = await fetchServer("/cms/services/web-software/automation", {
      revalidate: 60,
    });
    if (res.data) content = res.data;
  } catch (err) {
    console.error("Failed to load automation content on server", err);
  }

  return <AutomationClient data={content?.landing} />;
}
