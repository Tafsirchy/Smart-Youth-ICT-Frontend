import { fetchServer } from "@/lib/api-server";
import JobPlacementDetailsClient from "@/components/marketing/services/JobPlacementDetailsClient";

export default async function JobPlacementDetailsPage() {
  let content = null;
  try {
    const res = await fetchServer("/cms/services/content/job-placement", {
      revalidate: 60,
    });
    if (res.data) content = res.data;
  } catch (err) {
    console.error("Failed to load job placement details on server", err);
  }

  return <JobPlacementDetailsClient data={content?.details} />;
}
