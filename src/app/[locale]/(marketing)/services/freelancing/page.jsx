import { fetchServer } from "@/lib/api-server";
import FreelancingClient from "@/components/marketing/services/FreelancingClient";

export default async function FreelancingTrainingPage() {
  let data = null;
  let content = null;
  try {
    const [freelanceRes, contentRes] = await Promise.all([
      fetchServer("/cms/services/freelancing", { revalidate: 60 }),
      fetchServer("/cms/services/content/freelancing", { revalidate: 60 })
    ]);
    
    if (freelanceRes.data && freelanceRes.data.length > 0) {
      data = freelanceRes.data[0];
    }
    if (contentRes.data) {
      content = contentRes.data;
    }
  } catch (err) {
    console.error("Failed to load freelancing data on server", err);
  }

  return <FreelancingClient data={data} content={content} />;
}
