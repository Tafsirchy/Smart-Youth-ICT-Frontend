import { fetchServer } from "@/lib/api-server";
import HireStudentClient from "@/components/marketing/services/HireStudentClient";

export default async function HireStudentPage() {
  let content = null;
  try {
    const res = await fetchServer("/cms/services/web-software/hire-student", {
      revalidate: 60,
    });
    if (res.data) content = res.data;
  } catch (err) {
    console.error("Failed to load hire-student content on server", err);
  }

  return <HireStudentClient data={content?.landing} />;
}
