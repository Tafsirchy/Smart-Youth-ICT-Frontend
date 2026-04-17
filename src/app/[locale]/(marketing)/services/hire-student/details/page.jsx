import { fetchServer } from "@/lib/api-server";
import HireStudentDetailsClient from "@/components/marketing/services/HireStudentDetailsClient";

export default async function HireStudentDetailsPage() {
  let content = null;
  try {
    const res = await fetchServer("/cms/services/web-software/hire-student", {
      revalidate: 60,
    });
    if (res.data) content = res.data;
  } catch (err) {
    console.error("Failed to load hire-student details on server", err);
  }

  return <HireStudentDetailsClient data={content?.details} />;
}
