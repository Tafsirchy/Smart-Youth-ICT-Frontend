import { fetchServer } from "@/lib/api-server";
import ErpCrmDetailsClient from "@/components/marketing/services/ErpCrmDetailsClient";

export default async function ErpCrmDetailsPage() {
  let content = null;
  try {
    const res = await fetchServer("/cms/services/web-software/erp-crm", {
      revalidate: 60,
    });
    if (res.data) content = res.data.details;
  } catch (err) {
    console.error("Failed to load erp-crm details on server", err);
  }

  return <ErpCrmDetailsClient data={content} />;
}
