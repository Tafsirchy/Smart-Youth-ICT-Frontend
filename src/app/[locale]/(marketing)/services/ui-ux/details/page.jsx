import { fetchServer } from "@/lib/api-server";
import UiUxDetailsClient from "@/components/marketing/services/UiUxDetailsClient";

export default async function UiUxDetailsPage() {
  let content = null;
  try {
    const res = await fetchServer("/cms/services/web-software/ui-ux", {
      revalidate: 60,
    });
    if (res.data) content = res.data;
  } catch (err) {
    console.error("Failed to fetch UI/UX details on server", err);
  }

  return <UiUxDetailsClient data={content} />;
}
