import { fetchServer } from "@/lib/api-server";
import SeoDetailsClient from "@/components/marketing/services/SeoDetailsClient";

export default async function SeoDetailsPage() {
  let content = null;
  try {
    const res = await fetchServer("/cms/services/web-software/seo", {
      revalidate: 60,
    });
    if (res.data) content = res.data;
  } catch (err) {
    console.error("Failed to fetch SEO details on server", err);
  }

  return <SeoDetailsClient data={content} />;
}
