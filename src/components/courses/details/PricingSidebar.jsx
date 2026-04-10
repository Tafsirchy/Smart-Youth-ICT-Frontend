"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { IoShieldCheckmarkOutline, IoPlayCircleOutline, IoCheckmarkCircle, IoTimeOutline, IoMedalOutline, IoChatbubblesOutline } from 'react-icons/io5';
import VideoPlayer from '@/components/courses/VideoPlayer';
import PaymentGatewayButton from '@/components/payments/PaymentGatewayButton';

export default function PricingSidebar({ 
  course, 
  onEnroll, 
  enrolling, 
  session, 
  onShowManualBank 
}) {
  const originalPrice = course?.price ? Math.round(course.price * 1.5) : 0;

  return (
    <div className="sticky top-28 bg-white/70 backdrop-blur-xl rounded-3xl shadow-[0_10px_60px_-15px_rgba(0,0,0,0.1)] overflow-hidden border border-white/80 transition-all">
      
      {/* Video Thumbnail Area */}
      <div className="relative group">
        <VideoPlayer url={course?.previewVideo} thumbnail={course?.thumbnail} />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
          <IoPlayCircleOutline size={64} className="text-white drop-shadow-md" />
        </div>
      </div>

      <div className="p-6 md:p-8 shrink-0 relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-pink-100 rounded-full blur-[40px] opacity-60 mix-blend-multiply pointer-events-none" />
        
        <div className="mb-6 flex flex-col">
          <div className="flex items-center gap-3 mb-1">
            <span className="text-4xl font-extrabold text-slate-900 tracking-tight">৳{course?.price?.toLocaleString()}</span>
            {course?.price && (
              <span className="text-lg text-slate-400 line-through font-medium">৳{originalPrice.toLocaleString()}</span>
            )}
          </div>
          {course?.installmentsAllowed && (
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full inline-flex self-start border border-emerald-100 uppercase tracking-widest mt-2">
              Installment Available
            </span>
          )}
        </div>

        {/* Primary CTAs */}
        <div className="space-y-4 relative z-10">
          <motion.button
            onClick={onEnroll}
            disabled={enrolling}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-lg hover:shadow-[0_8px_30px_rgba(79,70,229,0.3)] transition-all disabled:opacity-60 disabled:cursor-not-allowed border border-indigo-400/50"
          >
            {enrolling ? 'Initiating...' : session ? '⚡ Enroll Now' : '🔐 Login to Enroll'}
          </motion.button>
          
          <div className="grid grid-cols-1 gap-2.5 mt-2">
            <PaymentGatewayButton gateway="bkash" courseId={course?._id} amount={course?.price} />
            <PaymentGatewayButton gateway="nagad" courseId={course?._id} amount={course?.price} />
            <PaymentGatewayButton gateway="stripe" courseId={course?._id} amount={course?.price} />
          </div>

          <div className="flex items-center gap-3 my-4">
            <div className="h-px flex-1 bg-slate-200" />
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">or pay manually</span>
            <div className="h-px flex-1 bg-slate-200" />
          </div>

          <button
            onClick={onShowManualBank}
            className="w-full py-3.5 rounded-xl border-2 border-slate-200 bg-slate-50 text-sm font-bold text-slate-700 hover:bg-slate-100 hover:border-slate-300 transition-colors"
          >
            🏦 Manual Bank Transfer
          </button>
        </div>

        {/* What's Included */}
        <div className="mt-8 space-y-4">
          <h4 className="text-sm font-bold text-slate-900 uppercase tracking-widest mb-4 border-b border-slate-100 pb-2">Course Includes</h4>
          <ul className="space-y-3">
            {[
              { label: 'Lifetime Access to Updates', icon: IoTimeOutline },
              { label: 'Industry Recognized Certificate', icon: IoMedalOutline },
              { label: '24/7 Dedicated Support', icon: IoChatbubblesOutline },
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-slate-600 font-medium">
                <item.icon size={18} className="text-emerald-500 shrink-0 mt-0.5" />
                <span>{item.label}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center justify-center gap-2 mt-8 text-xs font-semibold text-slate-400 uppercase tracking-wider bg-slate-50 py-3 rounded-xl">
          <IoShieldCheckmarkOutline size={16} className="text-emerald-500" />
          Secure 256-bit Checkout
        </div>
      </div>
    </div>
  );
}
