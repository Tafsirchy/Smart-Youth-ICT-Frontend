import { fetchServer } from "@/lib/api-server";
import FacebookAdsDetailsClient from "@/components/marketing/services/FacebookAdsDetailsClient";

export default async function FacebookAdsDetailsPage() {
  let content = null;
  try {
    const res = await fetchServer("/cms/services/web-software/facebook-ads", {
      revalidate: 60,
    });
    if (res.data) {
      content = res.data;
    }
  } catch (err) {
    console.error("Failed to fetch Facebook Ads details on server", err);
  }

  return <FacebookAdsDetailsClient data={content} />;
}
