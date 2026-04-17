import { fetchServer } from "@/lib/api-server";
import SocialCreativesClient from "@/components/marketing/services/SocialCreativesClient";

export default async function SocialCreativesPage() {
  let content = null;
  try {
    const res = await fetchServer("/cms/services/web-software/social-creatives", {
      revalidate: 60,
    });
    if (res.data) content = res.data;
  } catch (err) {
    console.error("Failed to fetch Social Creatives content on server", err);
  }

  return <SocialCreativesClient content={content} />;
}
