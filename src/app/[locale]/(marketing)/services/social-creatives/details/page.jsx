import { fetchServer } from "@/lib/api-server";
import SocialCreativesDetailsClient from "@/components/marketing/services/SocialCreativesDetailsClient";

export default async function SocialCreativesDetailsPage() {
  let content = null;
  try {
    const res = await fetchServer("/cms/services/web-software/social-creatives", {
      revalidate: 60,
    });
    if (res.data) content = res.data;
  } catch (err) {
    console.error("Failed to fetch Social Creatives details on server", err);
  }

  return <SocialCreativesDetailsClient data={content} />;
}
