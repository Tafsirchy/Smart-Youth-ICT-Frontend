import { fetchServer } from "@/lib/api-server";
import EcommerceClient from "@/components/marketing/services/EcommerceClient";

export default async function EcommercePage() {
  let data = null;
  try {
    const res = await fetchServer("/cms/services/web-software/ecommerce", {
      revalidate: 60,
    });
    if (res.data) {
      data = res.data.landing;
    }
  } catch (err) {
    console.error("Failed to fetch ecommerce data on server", err);
  }

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold text-slate-900">Commerce Halted</h1>
          <p className="text-slate-500">The transactional gateway is currently under maintenance.</p>
        </div>
      </div>
    );
  }

  return <EcommerceClient data={data} />;
}
