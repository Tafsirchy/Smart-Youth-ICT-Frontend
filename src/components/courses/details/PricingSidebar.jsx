"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { IoShieldCheckmarkOutline, IoPlayCircleOutline, IoCheckmarkCircle, IoTimeOutline, IoMedalOutline, IoChatbubblesOutline } from 'react-icons/io5';
import VideoPlayer from '@/components/courses/VideoPlayer';
import PaymentGatewayButton from '@/components/payments/PaymentGatewayButton';
import api from '@/lib/api';
import toast from 'react-hot-toast';

export default function PricingSidebar({ 
 course, 
 onEnroll, 
 enrolling, 
 session, 
 coupon,
 onCouponChange,
 onShowManualBank 
}) {
 const originalPrice = course?.price ? Math.round(course.price * 1.5) : 0;

 const [couponInput, setCouponInput] = useState('');
 const [validatingCoupon, setValidatingCoupon] = useState(false);

 const handleApplyCoupon = async () => {
  if (!couponInput.trim()) return;
  setValidatingCoupon(true);
  try {
    const res = await api.post('/coupons/validate', {
      code: couponInput.trim(),
      courseId: course?._id,
      branchId: typeof course?.branchId === 'object' ? course?.branchId?._id : course?.branchId,
      originalAmount: course?.price
    });
    if (res.data?.success && res.data?.data) {
      onCouponChange?.({
        code: res.data.data.code,
        discountAmount: res.data.data.discountAmount,
        finalAmount: res.data.data.finalAmount
      });
      toast.success(res.data.data.message || 'Coupon applied!');
    }
  } catch (err) {
    onCouponChange?.(null);
    toast.error(err.response?.data?.message || 'Invalid coupon code');
  } finally {
    setValidatingCoupon(false);
  }
 };

 const handleRemoveCoupon = () => {
  setCouponInput('');
  onCouponChange?.(null);
 };

 const payableAmount = coupon ? coupon.finalAmount : course?.price;

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
 
 <div className="mb-4 flex flex-col">
 <div className="flex items-center gap-3 mb-1">
 <span className="text-4xl font-bold text-slate-900 tracking-tight">৳{payableAmount?.toLocaleString()}</span>
 {course?.price && (
 <span className="text-lg text-slate-400 line-through font-medium">৳{originalPrice.toLocaleString()}</span>
 )}
 </div>
 {coupon && (
 <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-lg self-start">
  <span>PROMO "{coupon.code}" applied — you save ৳{coupon.discountAmount.toLocaleString()}</span>
  <button type="button" onClick={handleRemoveCoupon} className="text-emerald-600 hover:text-emerald-900 underline">Remove</button>
 </div>
 )}
 {course?.installmentsAllowed && (
 <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1 inline-flex self-start border border-emerald-100 rounded-full mt-2">
 Installment Available
 </span>
 )}
 </div>

 {/* Coupon Code */}
 {!coupon && (
 <div className="flex gap-2 mb-6">
  <input
    type="text"
    value={couponInput}
    onChange={(e) => setCouponInput(e.target.value)}
    onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleApplyCoupon(); } }}
    placeholder="Promo code"
    className="flex-1 min-w-0 border-2 border-slate-200 rounded-lg px-3 py-2.5 text-sm font-semibold uppercase tracking-wide outline-none focus:border-slate-400 transition-all"
  />
  <button
    type="button"
    onClick={handleApplyCoupon}
    disabled={validatingCoupon || !couponInput.trim()}
    className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 border-2 border-slate-200 rounded-lg text-xs font-black uppercase tracking-widest transition-all disabled:opacity-50"
  >
    {validatingCoupon ? '...' : 'Apply'}
  </button>
 </div>
 )}

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
 <PaymentGatewayButton gateway="bkash" courseId={course?._id} amount={payableAmount} couponCode={coupon?.code} />
 <PaymentGatewayButton gateway="nagad" courseId={course?._id} amount={payableAmount} couponCode={coupon?.code} />
 <PaymentGatewayButton gateway="stripe" courseId={course?._id} amount={payableAmount} couponCode={coupon?.code} />
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
