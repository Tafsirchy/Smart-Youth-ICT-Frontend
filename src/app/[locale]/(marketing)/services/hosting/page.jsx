import { fetchServer } from "@/lib/api-server";
import HostingClient from "@/components/marketing/services/HostingClient";

export default async function HostingPage() {
  let content = null;
  try {
    const res = await fetchServer("/cms/services/web-software/hosting", {
      revalidate: 60,
    });
    if (res.data) content = res.data;
  } catch (err) {
    console.error("Failed to load hosting content on server", err);
  }

  return <HostingClient data={content?.landing} />;
}
