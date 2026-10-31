import { fetchServer } from "@/lib/api-server";
import SeoClient from "@/components/marketing/services/SeoClient";

export async function generateMetadata() {
  return {
    title: "SEO Optimization & Search Dominance — Smart Youth ICT",
    description:
      "Enterprise SEO architecture, Core Web Vitals optimization, semantic topical entity clustering, and high-DA authority engineering designed for permanent first-page dominance.",
    keywords: [
      "SEO",
      "search engine optimization",
      "technical SEO",
      "Core Web Vitals",
      "semantic SEO",
      "SYICT",
      "search authority",
    ],
    openGraph: {
      title: "SEO Optimization & Search Dominance — Smart Youth ICT",
      description:
        "Structural authority engineering and semantic topical clusters that turn organic search intent into sustainable pipeline revenue.",
      type: "website",
    },
  };
}

export default async function SeoPage() {
  let content = null;
  try {
    const res = await fetchServer("/cms/services/web-software/seo", {
      revalidate: 60,
    });
    if (res?.data) content = res.data;
  } catch (err) {
    console.error("Failed to fetch SEO content on server", err);
  }

  return <SeoClient content={content} />;
}
