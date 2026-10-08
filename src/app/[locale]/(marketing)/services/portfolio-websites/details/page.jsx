import { fetchServer } from "@/lib/api-server";
import PortfolioDetailsClient from "@/components/marketing/services/PortfolioDetailsClient";

export default async function PortfolioDetailsPage() {
  let content = null;
  try {
    const res = await fetchServer("/cms/services/web-software/portfolio-websites", {
      revalidate: 60,
    });
    if (res.data) content = res.data.details;
  } catch (err) {
    console.error("Failed to load portfolio details on server", err);
  }

  return <PortfolioDetailsClient data={content} />;
}
