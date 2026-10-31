import { fetchServer } from "@/lib/api-server";
import MaintenanceClient from "@/components/marketing/services/MaintenanceClient";

export async function generateMetadata() {
  return {
    title: "Website Maintenance & System Guard — Smart Youth ICT",
    description:
      "Proactive 24/7 uptime monitoring, automated off-site S3 backups, core engine synchronization, real-time malware remediation, and Core Web Vitals optimization.",
    keywords: [
      "Website Maintenance",
      "System Guard",
      "Security Audits",
      "Uptime Monitoring",
      "Bug Fixes",
      "Core Web Vitals",
      "Smart Youth ICT",
    ],
    openGraph: {
      title: "Website Maintenance & System Guard — Smart Youth ICT",
      description:
        "Your website doesn't get sick. We maintain momentum with zero-downtime infrastructure guarantees.",
      type: "website",
    },
  };
}

export default async function MaintenancePage() {
  let content = null;
  try {
    const res = await fetchServer("/cms/services/ai-managed/maintenance", {
      revalidate: 60,
    });
    content = res?.data;
  } catch (err) {
    console.error("Failed to load maintenance content on server", err);
  }

  return <MaintenanceClient content={content} />;
}
