import { fetchServer } from "@/lib/api-server";
import SkillDevelopmentDetailsClient from "@/components/marketing/services/SkillDevelopmentDetailsClient";

export default async function SkillDevelopmentDetailsPage() {
  let content = null;
  try {
    const res = await fetchServer("/cms/services/content/skill-development", {
      revalidate: 60,
    });
    if (res.data) content = res.data;
  } catch (err) {
    console.error("Failed to load skill development details on server", err);
  }

  return <SkillDevelopmentDetailsClient data={content?.details} />;
}
