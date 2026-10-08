import { fetchServer } from "@/lib/api-server";
import BrandingClient from "@/components/marketing/services/BrandingClient";

export default async function BrandingPage() {
  let content = null;
  try {
    const res = await fetchServer("/cms/services/web-software/branding", {
      revalidate: 60,
    });
    content = res.data;
  } catch (err) {
    console.error("Failed to fetch branding content on server", err);
  }

  if (!content) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold text-slate-900">Protocol Halted</h1>
          <p className="text-slate-500">The design DNA engine is currently undergoing maintenance.</p>
        </div>
      </div>
    );
  }

  return <BrandingClient content={content} />;
}
