import { fetchServer } from "@/lib/api-server";
import FacebookAdsClient from "@/components/marketing/services/FacebookAdsClient";

export default async function FacebookAdsPage() {
  let content = null;
  try {
    const res = await fetchServer("/cms/services/web-software/facebook-ads", {
      revalidate: 60,
    });
    content = res.data;
  } catch (err) {
    console.error("Failed to fetch Facebook Ads content on server", err);
  }

  if (!content) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold text-slate-900">System Error</h1>
          <p className="text-slate-500">Performance engines could not be synchronized.</p>
        </div>
      </div>
    );
  }

  return <FacebookAdsClient content={content} />;
}
