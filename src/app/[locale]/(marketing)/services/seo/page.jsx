import { fetchServer } from "@/lib/api-server";
import SeoClient from "@/components/marketing/services/SeoClient";

export default async function SeoPage() {
  let content = null;
  try {
    const res = await fetchServer("/cms/services/web-software/seo", {
      revalidate: 60,
    });
    content = res.data;
  } catch (err) {
    console.error("Failed to fetch SEO content on server", err);
  }

  if (!content) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold text-slate-900">Analysis Halted</h1>
          <p className="text-slate-500">The SEO audit engines are currently offline.</p>
        </div>
      </div>
    );
  }

  return <SeoClient content={content} />;
}
