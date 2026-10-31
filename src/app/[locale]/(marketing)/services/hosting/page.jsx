import { fetchServer } from "@/lib/api-server";
import HostingClient from "@/components/marketing/services/HostingClient";

export async function generateMetadata() {
  return {
    title: "Web Hosting & Domain Infrastructure — Smart Youth ICT",
    description:
      "Enterprise cloud hosting with PCIe Gen4 NVMe arrays, 99.99% uptime SLA, Anycast global edge CDN, and multi-terabit hardware DDoS mitigation.",
    keywords: [
      "Web Hosting",
      "Cloud Infrastructure",
      "NVMe Hosting",
      "Domain Registration",
      "DDoS Protection",
      "High Availability Hosting",
      "Smart Youth ICT",
    ],
    openGraph: {
      title: "Web Hosting & Domain Infrastructure — Smart Youth ICT",
      description:
        "High-performance cloud hosting engineered for sub-second latency, zero downtime, and instant horizontal scale.",
      type: "website",
    },
  };
}

export default async function HostingPage() {
  let content = null;
  try {
    const res = await fetchServer("/cms/services/ai-managed/hosting", {
      revalidate: 60,
    });
    content = res?.data;
  } catch (err) {
    console.error("Failed to load hosting content on server", err);
  }

  return <HostingClient content={content} />;
}
