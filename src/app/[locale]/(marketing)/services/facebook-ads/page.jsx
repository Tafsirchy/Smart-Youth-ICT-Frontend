import { fetchServer } from "@/lib/api-server";
import FacebookAdsClient from "@/components/marketing/services/FacebookAdsClient";

export async function generateMetadata() {
  return {
    title: "Facebook & Meta Ads Management — Smart Youth ICT",
    description:
      "Server-side Meta Conversions API (CAPI), multi-stage behavioral funnels, high-volume creative sprint testing, and algorithmic scaling for predictable ROAS.",
    keywords: [
      "Facebook ads",
      "Meta ads",
      "paid social",
      "CAPI tracking",
      "ROAS optimization",
      "performance marketing",
      "SYICT",
    ],
    openGraph: {
      title: "Facebook & Meta Ads Management — Smart Youth ICT",
      description:
        "Data-driven paid social acquisition infrastructure built on first-party attribution and continuous creative sprint testing.",
      type: "website",
    },
  };
}

export default async function FacebookAdsPage() {
  let content = null;
  try {
    const res = await fetchServer("/cms/services/web-software/facebook-ads", {
      revalidate: 60,
    });
    if (res?.data) content = res.data;
  } catch (err) {
    console.error("Failed to fetch Facebook Ads content on server", err);
  }

  return <FacebookAdsClient content={content} />;
}
