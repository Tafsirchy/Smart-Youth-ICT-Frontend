import { fetchServer } from "@/lib/api-server";
import BusinessWebsitesClient from "@/components/marketing/services/BusinessWebsitesClient";

export default async function BusinessWebsitesPage() {
  let data = null;
  try {
    const res = await fetchServer("/cms/services/web-software/business-websites", {
      revalidate: 60, // Revalidate every minute
    });
    if (res.data) {
      data = res.data.landing;
    }
  } catch (err) {
    console.error("Failed to load business data on server", err);
  }

  // If data fails to load, we can handle it here or in the client
  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold text-slate-900">Data Unavailable</h1>
          <p className="text-slate-500">The business engine could not be initialized at this time.</p>
        </div>
      </div>
    );
  }

  return <BusinessWebsitesClient data={data} />;
}
