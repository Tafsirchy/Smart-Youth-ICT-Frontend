import React from "react";
import { notFound } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { fetchServer } from "@/lib/api-server";

// Components
import CourseEnrollmentWrapper from "@/components/courses/details/CourseEnrollmentWrapper";
import CourseOverview from "@/components/courses/details/CourseOverview";
import CourseFeatures from "@/components/courses/details/CourseFeatures";
import CourseInfoGrid from "@/components/courses/details/CourseInfoGrid";
import DetailedCurriculum from "@/components/courses/details/DetailedCurriculum";
import ProjectShowcase from "@/components/courses/details/ProjectShowcase";
import InstructorSection from "@/components/courses/details/InstructorSection";
import CertificationSection from "@/components/courses/details/CertificationSection";
import FAQAccordion from "@/components/courses/details/FAQAccordion";

/**
 * Optimized Course Detail Page (React Server Component)
 * Data is fetched on the server to eliminate client-side waterfalls, 
 * improve SEO, and accelerate LCP.
 */
export default async function CourseDetailPage({ params }) {
  const { slug, locale } = params;
  
  try {
    // 1. Fetch Session & Course Data in parallel on the server
    const [session, courseData] = await Promise.all([
      getServerSession(authOptions),
      fetchServer(`/courses/${slug}`, { 
        next: { revalidate: 3600, tags: [`course-${slug}`] } 
      })
    ]);

    const course = courseData.data;
    if (!course) return notFound();

    return (
      <main className="min-h-screen pb-24 bg-white selection:bg-indigo-500/30 selection:text-indigo-900">
        <CourseEnrollmentWrapper course={course} locale={locale}>
          {/* 
            The following components are passed as children to the wrapper.
            They are "Passive" segments that benefit from RSC rendering.
          */}
          <div className="space-y-16 pb-12 border-b border-slate-100">
            <CourseOverview course={course} />
            <CourseFeatures />
          </div>

          <CourseInfoGrid course={course} />

          <DetailedCurriculum course={course} isEnrolled={!!session} />

          <ProjectShowcase />

          <CertificationSection />

          <InstructorSection course={course} />

          <FAQAccordion />
        </CourseEnrollmentWrapper>
      </main>
    );
  } catch (err) {
    console.error("[CourseDetail RSC Error]", err);
    return notFound();
  }
}
