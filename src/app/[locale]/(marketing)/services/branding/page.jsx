import { fetchServer } from "@/lib/api-server";
import BrandingClient from "@/components/marketing/services/BrandingClient";

export async function generateMetadata() {
  return {
    title: "Logo & Brand Identity Architecture — Smart Youth ICT",
    description:
      "Enterprise logo design, mathematical grid construction, calibrated multi-channel color systems, and comprehensive brand identity guidelines engineered for enduring corporate authority.",
    keywords: [
      "branding",
      "logo design",
      "visual identity",
      "brand guidelines",
      "color system",
      "typography",
      "SYICT",
      "corporate identity architecture",
    ],
    openGraph: {
      title: "Logo & Brand Identity Architecture — Smart Youth ICT",
      description:
        "Mathematically grounded, high-fidelity visual identity systems that command authority and foster absolute customer trust.",
      type: "website",
    },
  };
}

export default async function BrandingPage() {
  let content = null;
  try {
    const res = await fetchServer("/cms/services/web-software/branding", {
      revalidate: 60,
    });
    if (res?.data) {
      content = res.data;
    }
  } catch (err) {
    console.error("Failed to fetch branding content on server", err);
  }

  return <BrandingClient content={content} />;
}
