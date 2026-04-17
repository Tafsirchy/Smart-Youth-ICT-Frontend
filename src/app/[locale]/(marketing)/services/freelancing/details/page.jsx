import { fetchServer } from "@/lib/api-server";
import FreelancingDetailsClient from "@/components/marketing/services/FreelancingDetailsClient";

export default async function FreelancingDetailsPage() {
  let content = null;
  try {
    const res = await fetchServer("/cms/services/content/freelancing", {
      revalidate: 60,
    });
    if (res.data) content = res.data;
  } catch (err) {
    console.error("Failed to load freelancing details on server", err);
  }

  return <FreelancingDetailsClient data={content?.details} />;
}
