import { fetchServer } from "@/lib/api-server";
import CustomAppsClient from "@/components/marketing/services/CustomAppsClient";

export default async function CustomAppsPage() {
  let data = null;
  try {
    const res = await fetchServer("/cms/services/web-software/custom-apps", {
      revalidate: 60,
    });
    if (res.data) {
      data = res.data.landing;
    }
  } catch (err) {
    console.error("Failed to fetch custom apps data on server", err);
  }

  return <CustomAppsClient data={data} />;
}
