import { fetchServer } from "@/lib/api-server";
import SocialCreativesClient from "@/components/marketing/services/SocialCreativesClient";

export async function generateMetadata() {
  return {
    title: "Social Media Creatives & Motion Design — Smart Youth ICT",
    description:
      "Scroll-stopping multi-slide carousels, kinetic motion reels, and brand-consistent social collateral engineered for viral distribution and audience retention.",
    keywords: [
      "social media creatives",
      "motion graphics",
      "carousels",
      "Reels design",
      "content architecture",
      "SYICT",
    ],
    openGraph: {
      title: "Social Media Creatives & Motion Design — Smart Youth ICT",
      description:
        "Psychological visual hooks and kinetic motion design engineered to command the feed across Instagram, LinkedIn, Facebook, and X.",
      type: "website",
    },
  };
}

export default async function SocialCreativesPage() {
  let content = null;
  try {
    const res = await fetchServer("/cms/services/web-software/social-creatives", {
      revalidate: 60,
    });
    if (res?.data) content = res.data;
  } catch (err) {
    console.error("Failed to fetch Social Creatives content on server", err);
  }

  return <SocialCreativesClient content={content} />;
}
