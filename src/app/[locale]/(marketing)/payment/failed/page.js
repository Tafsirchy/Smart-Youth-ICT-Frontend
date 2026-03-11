'use client';

import { Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { IoCloseCircle, IoRefreshOutline, IoArrowBackOutline, IoLogoWhatsapp } from 'react-icons/io5';

const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '';

function FailedContent() {
  const params  = useSearchParams();
  const locale  = useLocale();
  const course  = params.get('course')  || null;
  const gateway = params.get('gateway') || null;
  const reason  = params.get('reason')  || 'Payment could not be processed.';
  const courseId = params.get('courseId') || null;

  const waMsg = encodeURIComponent(`Hi SYICT, I had a payment failure for "${course || 'a course'}". Can you help me complete my enrollment?`);

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-16"
      style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 60%, #312e81 100%)' }}>
      <motion.div
        initial={{ opacity:0, y:24 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.5, ease:'easeOut' }}
        className="bg-white rounded-3xl shadow-2xl p-10 max-w-md w-full text-center">
        {/* Error icon */}
        <motion.div className="w-24 h-24 mx-auto rounded-full bg-red-50 flex items-center justify-center mb-6"
          animate={{ rotate:[0, -5, 5, 0] }} transition={{ duration:0.5, delay:0.4 }}>
          <IoCloseCircle size={56} className="text-red-500" />
        </motion.div>

        <h1 className="text-3xl font-extrabold text-neutral-900 mb-2">Payment Failed 😢</h1>
        <p className="text-neutral-500 text-sm mb-5">
          {course ? <>Your payment for <strong className="text-neutral-800">{course}</strong> could not be completed.</> : 'Your payment could not be completed.'}
        </p>

        {/* Error detail */}
        <div className="bg-red-50 border border-red-100 rounded-2xl p-4 mb-7 text-left">
          <p className="text-xs font-bold text-red-600 uppercase tracking-wider mb-1">What went wrong</p>
          <p className="text-sm text-red-700">{reason}</p>
          {gateway && <p className="text-xs text-neutral-400 mt-1 capitalize">Gateway: {gateway}</p>}
        </div>

        {/* Suggestions */}
        <div className="text-left mb-7 space-y-2">
          <p className="text-sm font-semibold text-neutral-700 mb-2">Things to try:</p>
          {['Check your mobile banking balance','Try a different payment method','Contact your bank if the amount was deducted','Reach us on WhatsApp for instant help'].map((t,i) => (
            <p key={i} className="text-sm text-neutral-500 flex items-start gap-2">
              <span className="text-neutral-400 shrink-0">•</span>{t}
            </p>
          ))}
        </div>

        <div className="flex flex-col gap-3">
          {courseId ? (
            <Link href={`/${locale}/courses/${courseId}`}
              className="flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl bg-gradient-to-r from-pink-500 to-indigo-500 text-white font-bold hover:opacity-90 transition">
              <IoRefreshOutline size={18} /> Try Payment Again
            </Link>
          ) : (
            <Link href={`/${locale}/courses`}
              className="flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl bg-gradient-to-r from-pink-500 to-indigo-500 text-white font-bold hover:opacity-90 transition">
              <IoRefreshOutline size={18} /> Browse Courses
            </Link>
          )}
          {WHATSAPP && (
            <a href={`https://wa.me/${WHATSAPP}?text=${waMsg}`} target="_blank" rel="noreferrer"
              className="flex items-center justify-center gap-2 w-full py-3 rounded-2xl bg-emerald-500 text-white font-bold hover:bg-emerald-600 transition text-sm">
              <IoLogoWhatsapp size={18} /> Get Help on WhatsApp
            </a>
          )}
          <Link href={`/${locale}`} className="flex items-center justify-center gap-1.5 text-sm text-neutral-400 hover:text-neutral-600 transition">
            <IoArrowBackOutline size={14} /> Back to Home
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

export default function PaymentFailedPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center" style={{ background:'#0f172a' }}><div className="text-white animate-pulse">Loading…</div></div>}>
      <FailedContent />
    </Suspense>
  );
}
