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
 <div className="sticky top-28 bg-white border border-slate-200 rounded-lg shadow-sm transition-all overflow-hidden">
 
 {/* Video Thumbnail Area */}
 <div className="relative group border-b border-slate-100">
 <VideoPlayer url={course?.previewVideo} thumbnail={course?.thumbnail} />
 <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
 <IoPlayCircleOutline size={64} className="text-white drop-shadow-md" />
 </div>
 </div>

 <div className="p-6 md:p-8 shrink-0 relative overflow-hidden bg-white rounded-lg">
 
 <div className="mb-6 flex flex-col">
 <div className="flex items-center gap-3 mb-1">
 <span className="text-4xl font-bold text-slate-900 tracking-tight">৳{course?.price?.toLocaleString()}</span>
 {course?.price && (
 <span className="text-lg text-slate-400 line-through font-medium">৳{originalPrice.toLocaleString()}</span>
 )}
 </div>
 {course?.installmentsAllowed && (
 <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1 inline-flex self-start border border-emerald-100 rounded-full mt-2">
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
 className="w-full py-3.5 bg-slate-900 text-white font-semibold text-lg rounded-lg shadow-md hover:bg-slate-800 hover:shadow-lg transition-all disabled:opacity-60 disabled:cursor-not-allowed"
 >
 {enrolling ? 'Initiating...' : session ? '⚡ Enroll Now' : '🔐 Login to Enroll'}
 </motion.button>
 
 <div className="grid grid-cols-1 gap-3 mt-4">
 <PaymentGatewayButton gateway="bkash" courseId={course?._id} amount={course?.price} />
 <PaymentGatewayButton gateway="nagad" courseId={course?._id} amount={course?.price} />
 <PaymentGatewayButton gateway="stripe" courseId={course?._id} amount={course?.price} />
 </div>

 <div className="flex items-center gap-3 my-5">
 <div className="h-px flex-1 bg-slate-200" />
 <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">or pay manually</span>
 <div className="h-px flex-1 bg-slate-200" />
 </div>

 <button 
 onClick={onShowManualBank}
 className="w-full flex items-center justify-center gap-2 bg-slate-50 text-slate-700 font-semibold text-sm h-12 rounded-lg border border-slate-200 hover:bg-slate-100 transition-all"
 >
 Manual Payment (bKash/Nagad/Bank)
 </button>
 </div>

 {/* What's Included */}
 <div className="mt-8 space-y-4">
 <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-2">Course Includes</h4>
 <ul className="space-y-3">
 {[
 { label: 'Lifetime Access to Updates', icon: IoTimeOutline },
 { label: 'Industry Recognized Certificate', icon: IoMedalOutline },
 { label: '24/7 Dedicated Support', icon: IoChatbubblesOutline },
 ].map((item, i) => (
 <li key={i} className="flex items-start gap-3 text-sm text-slate-700 font-medium">
 <div className="mt-0.5">
 <item.icon size={18} className="text-brand-pink" />
 </div>
 <span>{item.label}</span>
 </li>
 ))}
 </ul>
 </div>

 <div className="flex items-center justify-center gap-2 mt-8 text-[11px] font-semibold text-slate-500 uppercase tracking-wider bg-slate-50 border-t border-slate-100 py-4">
 <IoShieldCheckmarkOutline size={16} className="text-emerald-500" />
 Secure 256-bit Checkout
 </div>
 </div>
 </div>
 );
}
