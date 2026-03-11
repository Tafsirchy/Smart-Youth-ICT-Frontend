'use client';

import { Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { IoCheckmarkCircle, IoRibbonOutline, IoBookOutline, IoArrowForwardOutline } from 'react-icons/io5';

function SuccessContent() {
  const params   = useSearchParams();
  const locale   = useLocale();
  const course   = params.get('course')  || 'Your Course';
  const amount   = params.get('amount')  || null;
  const gateway  = params.get('gateway') || null;
  const txnId    = params.get('txnId')   || params.get('trxID') || null;

  const NEXT_STEPS = [
    { icon: IoBookOutline,   text: 'Access your course materials in the student dashboard' },
    { icon: IoRibbonOutline, text: 'Complete lessons and earn your verified certificate' },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-16"
      style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 60%, #312e81 100%)' }}>
      <motion.div
        initial={{ opacity:0, scale:0.9 }} animate={{ opacity:1, scale:1 }} transition={{ duration:0.55, ease:'easeOut' }}
        className="bg-white rounded-3xl shadow-2xl p-10 max-w-md w-full text-center">
        {/* Success icon */}
        <motion.div className="w-24 h-24 mx-auto rounded-full bg-emerald-50 flex items-center justify-center mb-6"
          animate={{ scale:[1, 1.08, 1] }} transition={{ duration:2, repeat:Infinity }}>
          <IoCheckmarkCircle size={56} className="text-emerald-500" />
        </motion.div>

        <h1 className="text-3xl font-extrabold text-neutral-900 mb-2">Payment Successful! 🎉</h1>
        <p className="text-neutral-500 text-sm mb-6">
          You're now enrolled in <strong className="text-neutral-800">{course}</strong>.
        </p>

        {/* Order summary */}
        {(amount || txnId || gateway) && (
          <div className="bg-neutral-50 rounded-2xl p-4 mb-6 text-left space-y-2 text-sm">
            {amount  && <div className="flex justify-between"><span className="text-neutral-500">Amount Paid</span><span className="font-bold text-emerald-600">৳{Number(amount).toLocaleString()}</span></div>}
            {gateway && <div className="flex justify-between"><span className="text-neutral-500">Payment Method</span><span className="font-semibold capitalize">{gateway}</span></div>}
            {txnId   && <div className="flex justify-between"><span className="text-neutral-500">Transaction ID</span><span className="font-mono text-xs text-neutral-700">{txnId}</span></div>}
          </div>
        )}

        {/* Next steps */}
        <div className="space-y-3 mb-8 text-left">
          {NEXT_STEPS.map((s, i) => (
            <div key={i} className="flex items-center gap-3 text-sm text-neutral-700">
              <s.icon size={18} className="text-blue-500 shrink-0" /> {s.text}
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-3">
          <Link href={`/${locale}/student/my-courses`}
            className="flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl bg-gradient-to-r from-pink-500 to-indigo-500 text-white font-bold hover:opacity-90 transition">
            Go to My Courses <IoArrowForwardOutline size={16} />
          </Link>
          <Link href={`/${locale}/courses`} className="text-sm text-neutral-500 hover:text-neutral-700 transition">
            Browse More Courses
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center" style={{ background:'#0f172a' }}><div className="text-white animate-pulse">Loading…</div></div>}>
      <SuccessContent />
    </Suspense>
  );
}
