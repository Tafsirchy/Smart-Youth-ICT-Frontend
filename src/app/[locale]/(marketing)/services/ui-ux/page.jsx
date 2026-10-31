import { fetchServer } from "@/lib/api-server";
import UiUxClient from "@/components/marketing/services/UiUxClient";

export async function generateMetadata() {
  return {
    title: "UI/UX Design & Product Systems — Smart Youth ICT",
    description:
      "Enterprise product design, cognitive psychology wireframes, atomic Figma token systems, and WCAG 2.2 AA compliant responsive user interfaces.",
    keywords: [
      "UI/UX design",
      "product design",
      "design systems",
      "Figma tokens",
      "wireframes",
      "accessibility",
      "SYICT",
    ],
    openGraph: {
      title: "UI/UX Design & Product Systems — Smart Youth ICT",
      description:
        "Human-centered digital ergonomics and atomic design tokens engineered for frictionless conversion and developer implementation.",
      type: "website",
    },
  };
}

export default async function UiUxPage() {
  let content = null;
  try {
    const res = await fetchServer("/cms/services/web-software/ui-ux", {
      revalidate: 60,
    });
    if (res?.data) content = res.data;
  } catch (err) {
    console.error("Failed to fetch UI/UX content on server", err);
  }

  return <UiUxClient content={content} />;
}
