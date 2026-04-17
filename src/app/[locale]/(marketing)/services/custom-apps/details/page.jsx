import { fetchServer } from "@/lib/api-server";
import CustomAppsDetailsClient from "@/components/marketing/services/CustomAppsDetailsClient";

export default async function CustomAppsDetailsPage() {
  let content = null;
  try {
    const res = await fetchServer("/cms/services/web-software/custom-apps", {
      revalidate: 60,
    });
    if (res.data) content = res.data.details;
  } catch (err) {
    console.error("Failed to load custom apps details on server", err);
  }

  return <CustomAppsDetailsClient data={content} />;
}
