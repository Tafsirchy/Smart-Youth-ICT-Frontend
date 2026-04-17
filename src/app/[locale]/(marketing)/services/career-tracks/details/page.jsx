import { fetchServer } from "@/lib/api-server";
import CareerTracksDetailsClient from "@/components/marketing/services/CareerTracksDetailsClient";

export default async function CareerTracksDetailsPage() {
  let content = null;
  try {
    const res = await fetchServer("/cms/services/content/career-tracks", {
      revalidate: 60,
    });
    if (res.data) content = res.data;
  } catch (err) {
    console.error("Failed to load career tracks details on server", err);
  }

  return <CareerTracksDetailsClient data={content?.details} />;
}
