import { fetchServer } from "@/lib/api-server";
import AutomationClient from "@/components/marketing/services/AutomationClient";

export async function generateMetadata() {
  return {
    title: "Business Automation & Workflow Intelligence — Smart Youth ICT",
    description:
      "Eliminate repetitive manual bottlenecks with custom webhook pipelines, Zapier and Make.com integrations, RPA bots, and deterministic data synchronization.",
    keywords: [
      "Business Automation",
      "Workflow Automation",
      "Zapier Integration",
      "Make.com Architecture",
      "RPA Bots",
      "API Webhooks",
      "Smart Youth ICT",
    ],
    openGraph: {
      title: "Business Automation & Workflow Intelligence — Smart Youth ICT",
      description:
        "Stop doing manually what can be automated permanently. Bridge your apps into an autonomous growth engine.",
      type: "website",
    },
  };
}

export default async function BusinessAutomationPage() {
  let content = null;
  try {
    const res = await fetchServer("/cms/services/ai-managed/automation", {
      revalidate: 60,
    });
    content = res?.data;
  } catch (err) {
    console.error("Failed to load automation content on server", err);
  }

  return <AutomationClient content={content} />;
}
