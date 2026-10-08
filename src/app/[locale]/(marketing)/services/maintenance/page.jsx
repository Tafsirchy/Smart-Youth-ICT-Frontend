import { fetchServer } from "@/lib/api-server";
import MaintenanceClient from "@/components/marketing/services/MaintenanceClient";

export default async function MaintenancePage() {
  let content = null;
  try {
    const res = await fetchServer("/cms/services/web-software/maintenance", {
      revalidate: 60,
    });
    if (res.data) content = res.data;
  } catch (err) {
    console.error("Failed to load maintenance content on server", err);
  }

  return <MaintenanceClient content={content} />;
}
