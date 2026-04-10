"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { AnimatePresence } from "framer-motion";
import api from "@/lib/api";
import ManualBankModal from "@/components/payments/ManualBankModal";
import CourseHero from "./CourseHero";
import PricingSidebar from "./PricingSidebar";
import FinalCTABanner from "./FinalCTABanner";

/**
 * A Client Component wrapper for the Course Detail page.
 * It handles all interactive logic (Enrollment, Modals, Session) 
 * while allowing the main page to be a Server Component.
 */
export default function CourseEnrollmentWrapper({ course, locale, children }) {
  const { data: session } = useSession();
  const router = useRouter();
  const [showManualBank, setShowManualBank] = useState(false);
  const [enrolling, setEnrolling] = useState(false);

  const handleEnroll = async () => {
    if (!session) {
      router.push(`/${locale}/login`);
      return;
    }

    setEnrolling(true);
    try {
      await api.post(`/courses/${course._id}/enroll`);
      toast.success("Enrollment initiated! Please complete your payment.");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Enrollment failed.");
    } finally {
      setEnrolling(false);
    }
  };

  // We use a Render Prop or specific component map to inject the enrollment logic 
  // into the child components passed from the Server Component.
  return (
    <>
      <CourseHero course={course} onEnroll={handleEnroll} />
      
      <div className="container-custom mt-12 grid grid-cols-1 lg:grid-cols-12 gap-x-12 gap-y-16 relative">
        <div className="lg:col-span-8 space-y-20 xl:space-y-24">
           {children}
        </div>

        {/* Pricing Sidebar (Client-side interactivity) */}
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

      <div className="container-custom mt-24">
        <FinalCTABanner onEnroll={handleEnroll} enrolling={enrolling} />
      </div>

      {/* Manual Bank Modal */}
      <AnimatePresence>
        {showManualBank && (
          <ManualBankModal 
            courseId={course._id} 
            amount={course.price} 
            onClose={() => setShowManualBank(false)} 
          />
        )}
      </AnimatePresence>
    </>
  );
}
