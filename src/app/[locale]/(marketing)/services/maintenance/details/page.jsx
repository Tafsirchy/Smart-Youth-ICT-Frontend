import { fetchServer } from "@/lib/api-server";
import MaintenanceDetailsClient from "@/components/marketing/services/MaintenanceDetailsClient";

export default async function MaintenanceDetailsPage() {
  let content = null;
  try {
    const res = await fetchServer("/cms/services/web-software/maintenance", {
      revalidate: 60,
    });
    if (res.data) content = res.data;
  } catch (err) {
    console.error("Failed to load maintenance details on server", err);
  }

  return <MaintenanceDetailsClient data={content?.details} />;
}
