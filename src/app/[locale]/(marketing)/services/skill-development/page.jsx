import { fetchServer } from "@/lib/api-server";
import { getLocale } from "next-intl/server";
import SkillDevelopmentClient from "@/components/marketing/services/SkillDevelopmentClient";

export default async function SkillDevelopmentPage() {
  const locale = await getLocale();
  let courses = [];
  let pageContent = null;

  try {
    const [coursesRes, contentRes] = await Promise.all([
      fetchServer("/courses", { params: { page: 1, limit: 100 }, revalidate: 300 }),
      fetchServer("/cms/services/content/skill-development", { revalidate: 300 })
    ]);

    if (coursesRes.success) courses = coursesRes.data;
    if (contentRes.data) pageContent = contentRes.data;
  } catch (err) {
    console.error("Failed to fetch skill development data on server", err);
  }

  return (
    <SkillDevelopmentClient 
      locale={locale} 
      courses={courses} 
      pageContent={pageContent} 
    />
  );
}
