import { fetchServer } from "@/lib/api-server";
import CareerTracksClient from "@/components/marketing/services/CareerTracksClient";

export default async function CareerTracksPage() {
  let tracks = [];
  let content = null;

  try {
    const [tracksRes, contentRes] = await Promise.all([
      fetchServer("/cms/services/career-tracks", { revalidate: 60 }),
      fetchServer("/cms/services/content/career-tracks", { revalidate: 60 })
    ]);
    tracks = tracksRes.data || [];
    content = contentRes.data || null;
  } catch (err) {
    console.error("Failed to load tracks data on server", err);
  }

  return <CareerTracksClient tracks={tracks} content={content} />;
}
