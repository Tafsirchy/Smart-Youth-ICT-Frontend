export async function generateMetadata({ params }) {
  return { title: `Course: ${params.slug}` };
}

export default function CourseDetailPage({ params }) {
  return (
    <section className="section container-lg">
      <h1 className="text-3xl font-bold text-textPrimary mb-4">Course Detail</h1>
      <p className="text-textSecondary">Slug: {params.slug}</p>
      {/* TODO: CourseHero, CourseCurriculum, CourseInstructor, EnrollButton */}
    </section>
  );
}
