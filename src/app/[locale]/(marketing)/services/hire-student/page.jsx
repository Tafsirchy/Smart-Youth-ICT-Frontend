import { fetchServer } from "@/lib/api-server";
import HireStudentClient from "@/components/marketing/services/HireStudentClient";

export async function generateMetadata() {
  return {
    title: "Hire Verified Student Talent & Freelancers — Smart Youth ICT",
    description:
      "Access the top 1% of rigorously trained, project-tested student developers, UI/UX designers, and growth marketers with 100% senior engineering mentor oversight.",
    keywords: [
      "Hire Students",
      "Student Freelancers",
      "Vetted Developers",
      "Junior React Developers",
      "UI UX Designers",
      "Smart Youth ICT",
      "Academic Talent Network",
    ],
    openGraph: {
      title: "Hire Verified Student Talent & Freelancers — Smart Youth ICT",
      description:
        "Enterprise-grade execution at startup-friendly rates with guaranteed mentor supervision on all milestones.",
      type: "website",
    },
  };
}

export default async function HireStudentPage() {
  let content = null;
  try {
    const res = await fetchServer("/cms/services/ai-managed/hire-student", {
      revalidate: 60,
    });
    content = res?.data;
  } catch (err) {
    console.error("Failed to load hire-student content on server", err);
  }

  return <HireStudentClient content={content} />;
}
