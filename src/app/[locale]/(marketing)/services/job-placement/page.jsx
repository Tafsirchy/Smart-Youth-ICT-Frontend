import { fetchServer } from "@/lib/api-server";
import JobPlacementClient from "@/components/marketing/services/JobPlacementClient";

export default async function JobPlacementSupportPage() {
  let data = null;
  let content = null;
  try {
    const [placementRes, contentRes] = await Promise.all([
      fetchServer("/cms/services/job-placements", { revalidate: 60 }),
      fetchServer("/cms/services/content/job-placement", { revalidate: 60 })
    ]);
    
    if (placementRes.data && placementRes.data.length > 0) {
      data = placementRes.data[0];
    }
    if (contentRes.data) {
      content = contentRes.data;
    }
  } catch (err) {
    console.error("Failed to load placement data on server", err);
  }

  return <JobPlacementClient data={data} content={content} />;
}
