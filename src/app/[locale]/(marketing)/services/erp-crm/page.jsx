import { fetchServer } from "@/lib/api-server";
import ErpCrmClient from "@/components/marketing/services/ErpCrmClient";

export default async function ErpCrmPage() {
  let data = null;
  try {
    const res = await fetchServer("/cms/services/web-software/erp-crm", {
      revalidate: 60,
    });
    if (res.data) {
      data = res.data.landing;
    }
  } catch (err) {
    console.error("Failed to fetch erp-crm data on server", err);
  }

  return <ErpCrmClient data={data} />;
}
