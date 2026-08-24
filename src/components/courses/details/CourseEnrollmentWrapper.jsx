"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { AnimatePresence } from "framer-motion";
import api from "@/lib/api";
import ManualPaymentModal from "@/components/payments/ManualPaymentModal";
import CourseHero from "./CourseHero";
import PricingSidebar from "./PricingSidebar";
import FinalCTABanner from "./FinalCTABanner";
import BranchSelectionModal from "./BranchSelectionModal";

/**
 * A Client Component wrapper for the Course Detail page.
 * It handles all interactive logic (Enrollment, Modals, Session) 
 * while allowing the main page to be a Server Component.
 */
export default function CourseEnrollmentWrapper({ course, locale, children }) {
  const { data: session } = useSession();
  const router = useRouter();
  const [showManualBank, setShowManualBank] = useState(false);
  const [showBranchModal, setShowBranchModal] = useState(false);
  const [enrolling, setEnrolling] = useState(false);

  const handleEnroll = async () => {
    if (!session) {
      router.push(`/${locale}/login`);
      return;
    }

    // Multi-branch logic: If it's a master course, they must select a branch first
    if (course.isMaster) {
      setShowBranchModal(true);
      return;
    }

    executeEnrollment();
  };

  const executeEnrollment = async (targetBranchId = null) => {
    setEnrolling(true);
    try {
      const payload = targetBranchId ? { targetBranchId } : {};
      await api.post(`/courses/${course._id}/enroll`, payload);
      toast.success("Enrollment initiated! Please complete your payment.");
      setShowBranchModal(false);
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
      
      <div className="container-custom mt-6 grid grid-cols-1 lg:grid-cols-12 gap-x-8 gap-y-8 relative">
        <div className="lg:col-span-8 space-y-8 lg:space-y-12 pb-12 lg:pb-0">
           {children}
        </div>

        {/* Pricing Sidebar (Desktop Only) */}
        <div className="hidden lg:block lg:col-span-4 relative">
          <PricingSidebar 
            course={course} 
            onEnroll={handleEnroll} 
            enrolling={enrolling} 
            session={session} 
            onShowManualBank={() => setShowManualBank(true)} 
          />
        </div>
      </div>

      {/* Sticky Bottom CTA for Mobile */}
      <div className="lg:hidden sticky bottom-0 left-0 w-full bg-white/95 backdrop-blur-md border-t border-slate-200 p-3 z-[90] pb-[max(0.75rem,env(safe-area-inset-bottom))]">
        <div className="flex items-center justify-between gap-3 max-w-lg mx-auto">
          <div className="flex flex-col">
            <span className="text-xs text-slate-500 font-medium line-through">
              ৳{course?.price ? Math.round(course.price * 1.5) : 0}
            </span>
            <span className="text-lg font-black text-slate-900 leading-none">
              ৳{course?.price || 0}
            </span>
          </div>
          <button 
            onClick={handleEnroll}
            disabled={enrolling}
            className="flex-1 bg-indigo-600 text-white font-bold h-11 rounded-xl active:scale-[0.98] transition-transform disabled:opacity-60 shadow-md shadow-indigo-500/20"
          >
            {enrolling ? 'Initiating...' : session ? '⚡ Enroll Now' : '🔐 Login'}
          </button>
        </div>
      </div>

      <div className="container-custom mt-12">
        <FinalCTABanner onEnroll={handleEnroll} enrolling={enrolling} />
      </div>

      {/* Manual Payment Modal */}
      <AnimatePresence>
        {showManualBank && (
          <ManualPaymentModal 
            courseId={course._id} 
            amount={course.price} 
            onClose={() => setShowManualBank(false)} 
          />
        )}

        {/* Branch Selection Modal */}
        {showBranchModal && (
          <BranchSelectionModal
            onClose={() => setShowBranchModal(false)}
            onConfirm={(branchId) => executeEnrollment(branchId)}
            availableBranches={course.availableBranches}
            enrolling={enrolling}
          />
        )}
      </AnimatePresence>
    </>
  );
}
