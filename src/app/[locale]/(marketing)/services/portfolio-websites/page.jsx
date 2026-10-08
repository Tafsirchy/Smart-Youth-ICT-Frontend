import { fetchServer } from "@/lib/api-server";
import PortfolioWebsitesClient from "@/components/marketing/services/PortfolioWebsitesClient";

export default async function PortfolioWebsitesPage() {
  let data = null;
  try {
    const res = await fetchServer("/cms/services/web-software/portfolio-websites", {
      revalidate: 60,
    });
    if (res.data) {
      data = res.data.landing;
    }
  } catch (err) {
    console.error("Failed to load portfolio data on server", err);
  }

  return <PortfolioWebsitesClient data={data} />;
}
