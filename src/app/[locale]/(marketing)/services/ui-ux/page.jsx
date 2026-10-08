import { fetchServer } from "@/lib/api-server";
import UiUxClient from "@/components/marketing/services/UiUxClient";

export default async function UiUxPage() {
  let content = null;
  try {
    const res = await fetchServer("/cms/services/web-software/ui-ux", {
      revalidate: 60,
    });
    if (res.data) content = res.data;
  } catch (err) {
    console.error("Failed to fetch UI/UX content on server", err);
  }

  return <UiUxClient content={content} />;
}
