'use client';

import React, { useState, useEffect } from 'react';
import { notFound, useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { useSession } from 'next-auth/react';
import toast from 'react-hot-toast';

import api from '@/lib/api';
import { Skeleton } from '@/components/ui/Skeleton';
import ManualBankModal from '@/components/payments/ManualBankModal';

// Redesigned Components
import CourseHero from '@/components/courses/details/CourseHero';
import CourseOverview from '@/components/courses/details/CourseOverview';
import CourseFeatures from '@/components/courses/details/CourseFeatures';
import CourseInfoGrid from '@/components/courses/details/CourseInfoGrid';
import DetailedCurriculum from '@/components/courses/details/DetailedCurriculum';
import ProjectShowcase from '@/components/courses/details/ProjectShowcase';
import InstructorSection from '@/components/courses/details/InstructorSection';
import ReviewsGrid from '@/components/courses/details/ReviewsGrid';
import CertificationSection from '@/components/courses/details/CertificationSection';
import FAQAccordion from '@/components/courses/details/FAQAccordion';
import FinalCTABanner from '@/components/courses/details/FinalCTABanner';
import PricingSidebar from '@/components/courses/details/PricingSidebar';

export default function CourseDetailPage({ params }) {
  const { slug } = params;
  const locale = useLocale();
  const { data: session } = useSession();
  const router = useRouter();

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [showManualBank, setShowManualBank] = useState(false);
  const [enrolling, setEnrolling] = useState(false);

  useEffect(() => {
    api.get(`/courses/${slug}`)
      .then(res => { if (res.data?.success) setCourse(res.data.data); else setError(true); })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [slug]);

  const handleEnroll = async () => {
    if (!session) { router.push(`/${locale}/login`); return; }
    setEnrolling(true);
    try {
      await api.post(`/courses/${course._id}/enroll`);
      toast.success('Enrollment successful! Complete payment if required.');
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Enrollment failed.');
    } finally {
      setEnrolling(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white px-4">
        <div className="h-96 bg-slate-100 rounded-b-3xl w-full" />
        <div className="container-custom pt-12 grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-6">
            <Skeleton className="h-12 w-full md:w-3/4 rounded-2xl" />
            <Skeleton className="h-40 w-full rounded-2xl" />
          </div>
          <div className="bg-slate-50 rounded-3xl p-6 h-[500px]">
            <Skeleton className="h-full w-full rounded-2xl" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !course) return notFound();

  return (
    <main className="min-h-screen pb-24 bg-white selection:bg-indigo-500/30 selection:text-indigo-900">
      
      {/* 1. Hero Section */}
      <CourseHero course={course} onEnroll={handleEnroll} />

      <div className="container-custom mt-12 grid grid-cols-1 lg:grid-cols-12 gap-x-12 gap-y-16 relative">
        
        {/* Left Column - Main Details */}
        <div className="lg:col-span-8 space-y-20 xl:space-y-24">
          <div className="space-y-16 pb-12 border-b border-slate-100">
             {/* 2 & 3. Overview & Target Audience */}
             <CourseOverview course={course} />
             
             {/* 4. What You Will Learn Grid */}
             <CourseFeatures />
          </div>

          {/* 7. Course Duration & Info */}
          <CourseInfoGrid course={course} />

          {/* 5. Course Curriculum */}
          <DetailedCurriculum course={course} isEnrolled={!!session} />

          {/* 9. Projects / Portfolio Showcase */}
          <ProjectShowcase />

          {/* 10. Certification Preview */}
          <CertificationSection />

          {/* 6. Instructor Section */}
          <InstructorSection course={course} />

          {/* 8. Student Reviews & Ratings */}
          <ReviewsGrid course={course} />

          {/* 11. FAQ Section */}
          <FAQAccordion />
        </div>

        {/* Right Column - Sticky Sidebar */}
        <div className="lg:col-span-4 relative">
          <PricingSidebar 
            course={course} 
            onEnroll={handleEnroll} 
            enrolling={enrolling} 
            session={session} 
            onShowManualBank={() => setShowManualBank(true)} 
          />
        </div>

      </div>

      {/* 13. Final CTA Banner */}
      <div className="container-custom mt-24">
        <FinalCTABanner onEnroll={handleEnroll} enrolling={enrolling} />
      </div>

      {/* Manual Bank Modal */}
      <AnimatePresence>
        {showManualBank && (
          <ManualBankModal courseId={course._id} amount={course.price} onClose={() => setShowManualBank(false)} />
        )}
      </AnimatePresence>
    </main>
  );
}
