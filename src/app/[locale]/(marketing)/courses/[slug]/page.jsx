'use client';

import React, { useState, useEffect } from 'react';
import { notFound, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import {
  IoTimeOutline, IoCheckmarkCircle, IoPlayCircleOutline,
  IoPeopleOutline, IoStarOutline, IoStar, IoShieldCheckmarkOutline,
  IoRibbonOutline, IoChevronDownOutline, IoChevronUpOutline
} from 'react-icons/io5';
import VideoPlayer from '@/components/courses/VideoPlayer';
import PaymentGatewayButton from '@/components/payments/PaymentGatewayButton';
import ManualBankModal from '@/components/payments/ManualBankModal';
import api from '@/lib/api';
import toast from 'react-hot-toast';
import { useSession } from 'next-auth/react';

const TABS = ['Overview', 'Curriculum', 'Instructor', 'Reviews'];

const WHAT_YOU_LEARN = [
  'Master industry-standard tools and techniques',
  'Build real-world projects for actual clients',
  'Create a stunning portfolio to showcase your work',
  'Land freelance gigs and high-paying remote jobs',
  'Get internship placement with top companies',
  'Earn income while studying — from day one',
];

export default function CourseDetailPage({ params }) {
  const { slug }     = params;
  const locale       = useLocale();
  const { data: session } = useSession();
  const router       = useRouter();

  const [course, setCourse]         = useState(null);
  const [loading, setLoading]       = useState(true);
  const [error, setError]           = useState(false);
  const [activeTab, setActiveTab]   = useState('Overview');
  const [showManualBank, setShowManualBank] = useState(false);
  const [openModule, setOpenModule] = useState(0);
  const [enrolling, setEnrolling]   = useState(false);

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
      toast.success('Enrollment initiated! Complete payment to activate access.');
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Enrollment failed.');
    } finally {
      setEnrolling(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen animate-pulse bg-neutral-50 px-4 py-16">
        <div className="container-custom pt-32 pb-20 relative z-10">
          <div className="h-72 w-full rounded-3xl bg-neutral-200" />
          <div className="container-custom pt-12 pb-24 grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-6">
              <div className="h-40 rounded-2xl bg-neutral-200" />
              <div className="h-60 rounded-2xl bg-neutral-200" />
            </div>
            <div className="h-96 rounded-2xl bg-neutral-200" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !course) return notFound();

  const title       = course.title?.en || course.title || 'Course Details';
  const description = course.description?.en || course.description || '';
  const rating      = course.rating || 4.8;

  return (
    <main className="min-h-screen pb-24" style={{ background: 'var(--color-background)' }}>

      {/* ── Hero Banner ── */}
      <section className="relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 60%, #312e81 100%)' }}>
        {/* Blurred bg thumbnail */}
        {course.thumbnail && (
          <div className="absolute inset-0 opacity-10">
            <Image src={course.thumbnail} alt="" fill className="object-cover blur-2xl" />
          </div>
        )}
        <div className="relative z-10 w-11/12 mx-auto py-16 lg:py-20">
          <div className="flex flex-col lg:flex-row gap-10 items-start">

            {/* Left — Info */}
            <div className="flex-1 text-white">
              {course.category && (
                <span className="inline-block mb-4 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/10 border border-white/15 text-indigo-200">
                  {course.category}
                </span>
              )}
              <h1 className="text-3xl md:text-5xl font-extrabold leading-tight mb-5 text-balance">{title}</h1>
              <p className="text-indigo-200 text-lg max-w-xl leading-relaxed mb-6">{description}</p>

              {/* Meta */}
              <div className="flex flex-wrap items-center gap-5 text-sm font-medium text-indigo-200 mb-8">
                <span className="flex items-center gap-2">
                  <IoTimeOutline size={18} className="text-indigo-300" />
                  {course.duration || '3 Months'}
                </span>
                <span className="flex items-center gap-2">
                  <IoPeopleOutline size={18} className="text-indigo-300" />
                  {course.enrolledCount || 0} Students
                </span>
                <span className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    i < Math.round(rating)
                      ? <IoStar key={i} size={16} className="text-amber-400" />
                      : <IoStarOutline key={i} size={16} className="text-indigo-400" />
                  ))}
                  <span className="ml-1">{rating}</span>
                </span>
              </div>

              {/* Trust badges */}
              <div className="flex flex-wrap gap-3">
                {['Certificate Included', 'Project-Based', 'Freelancing Support'].map(b => (
                  <span key={b} className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full bg-white/10 border border-white/15 text-indigo-100">
                    <IoRibbonOutline size={13} /> {b}
                  </span>
                ))}
              </div>
            </div>

            {/* Right — Sticky Price Card (desktop: floats right in hero) */}
            <div className="w-full lg:w-[400px] shrink-0">
              <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
                <VideoPlayer url={course.previewVideo} thumbnail={course.thumbnail} />
                <div className="p-6">
                  <div className="flex items-end justify-between mb-5">
                    <div>
                      <span className="block text-xs text-neutral-500 font-medium mb-0.5">Course Fee</span>
                      <span className="text-4xl font-extrabold text-neutral-900">৳{course.price?.toLocaleString()}</span>
                    </div>
                    {course.installmentsAllowed && (
                      <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-3 py-1.5 rounded-full">
                        Installments ✓
                      </span>
                    )}
                  </div>

                  {/* Enroll + Payment buttons */}
                  <div className="space-y-3">
                    <motion.button
                      onClick={handleEnroll}
                      disabled={enrolling}
                      className="w-full py-3.5 rounded-xl bg-gradient-to-r from-pink-500 to-indigo-500 text-white font-bold text-base hover:opacity-90 transition disabled:opacity-60"
                      whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}
                    >
                      {enrolling ? 'Processing…' : session ? '🎓 Enroll Now →' : '🔐 Login to Enroll'}
                    </motion.button>

                    <div className="grid grid-cols-1 gap-2.5 pt-1">
                      <PaymentGatewayButton gateway="bkash"  courseId={course._id} amount={course.price} />
                      <PaymentGatewayButton gateway="nagad"  courseId={course._id} amount={course.price} />
                      <PaymentGatewayButton gateway="stripe" courseId={course._id} amount={course.price} />
                    </div>

                    <div className="flex items-center gap-2 my-1">
                      <span className="h-px flex-1 bg-neutral-200" />
                      <span className="text-xs text-neutral-400 font-semibold">OR</span>
                      <span className="h-px flex-1 bg-neutral-200" />
                    </div>

                    <button
                      onClick={() => setShowManualBank(true)}
                      className="w-full py-3 rounded-xl border-2 border-neutral-200 text-sm font-bold text-neutral-700 hover:bg-neutral-50 transition"
                    >
                      Manual Bank Transfer
                    </button>
                  </div>

                  <div className="flex items-center justify-center gap-2 mt-5 text-xs text-neutral-500">
                    <IoShieldCheckmarkOutline size={14} className="text-emerald-500" />
                    Secure checkout • Money-back guarantee
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Tab Navigation ── */}
      <div className="sticky top-0 z-20 bg-[var(--color-surface)] border-b border-neutral-200 shadow-sm">
        <div className="container-custom border-b border-indigo-100 flex items-center gap-10 overflow-x-auto scrollbar-hide">
          {TABS.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`shrink-0 py-4 px-5 text-sm font-semibold border-b-2 transition-colors ${
                activeTab === tab
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-neutral-500 hover:text-neutral-900'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* ── Tab Content ── */}
      <div className="container-custom pt-32 pb-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="max-w-3xl"
          >

            {/* OVERVIEW TAB */}
            {activeTab === 'Overview' && (
              <div className="space-y-10">
                <section>
                  <h2 className="text-2xl font-bold text-textPrimary mb-6">What You Will Learn</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {WHAT_YOU_LEARN.map((item, i) => (
                      <div key={i} className="flex gap-3 text-textSecondary">
                        <IoCheckmarkCircle size={20} className="shrink-0 text-emerald-500 mt-0.5" />
                        <span className="leading-relaxed text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                </section>

                <section className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-6 text-white">
                  <h3 className="text-lg font-bold mb-2">🚀 Internship Opportunity</h3>
                  <p className="text-blue-100 text-sm leading-relaxed">
                    Top-performing students get placed on real client projects and earn back their course fee — while still studying!
                  </p>
                </section>
              </div>
            )}

            {/* CURRICULUM TAB */}
            {activeTab === 'Curriculum' && (
              <div className="space-y-3">
                <p className="text-sm text-textSecondary mb-6">
                  {course.curriculum?.reduce((a, m) => a + (m.topics?.length || 0), 0) || 0} lessons across {course.curriculum?.length || 0} modules
                </p>
                {course.curriculum?.length > 0 ? course.curriculum.map((module, i) => (
                  <div key={i} className="bg-white rounded-2xl ring-1 ring-neutral-200 shadow-sm overflow-hidden">
                    <button
                      onClick={() => setOpenModule(openModule === i ? -1 : i)}
                      className="w-full flex items-center justify-between p-5 text-left hover:bg-neutral-50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-xs font-bold text-white shrink-0">{i + 1}</span>
                        <span className="font-semibold text-textPrimary">{module.title}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-textSecondary shrink-0 ml-4">
                        <span>{module.topics?.length || 0} lessons</span>
                        {openModule === i ? <IoChevronUpOutline size={16} /> : <IoChevronDownOutline size={16} />}
                      </div>
                    </button>
                    <AnimatePresence>
                      {openModule === i && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25 }}
                          className="overflow-hidden border-t border-neutral-100"
                        >
                          <div className="p-5 pl-8 space-y-3">
                            {module.topics?.map((topic, j) => (
                              <div key={j} className="flex items-center gap-3 text-sm text-textSecondary">
                                <IoPlayCircleOutline size={18} className="text-blue-400 shrink-0" />
                                {topic}
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )) : (
                  <div className="text-center py-12 text-textSecondary">
                    Curriculum is being finalized. Check back soon.
                  </div>
                )}
              </div>
            )}

            {/* INSTRUCTOR TAB */}
            {activeTab === 'Instructor' && (
              <div className="bg-white rounded-2xl ring-1 ring-neutral-200 shadow-sm p-8">
                <div className="flex items-center gap-5 mb-6">
                  <div className="relative h-20 w-20 rounded-2xl overflow-hidden ring-2 ring-neutral-100 shrink-0">
                    <Image
                      src={course.instructor?.avatar || '/images/default-avatar.png'}
                      alt="Instructor" fill className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-textPrimary">{course.instructor?.name || 'Expert Instructor'}</h3>
                    <p className="text-textSecondary text-sm">Senior Industry Professional</p>
                    <div className="flex items-center gap-3 mt-2 text-xs text-textSecondary">
                      <span>⭐ {rating} Rating</span>
                      <span>🎓 {course.enrolledCount || 0}+ Students</span>
                    </div>
                  </div>
                </div>
                <p className="text-textSecondary leading-relaxed text-sm">
                  {course.instructor?.bio || 'Learn directly from a hands-on expert with years of delivering real client projects in the global marketplace. This instructor brings both teaching clarity and industry depth to every lesson.'}
                </p>
              </div>
            )}

            {/* REVIEWS TAB */}
            {activeTab === 'Reviews' && (
              <div className="space-y-6">
                <div className="flex items-center gap-6 bg-white rounded-2xl ring-1 ring-neutral-200 shadow-sm p-6">
                  <div className="text-center">
                    <p className="text-6xl font-extrabold text-neutral-900">{rating}</p>
                    <div className="flex justify-center gap-0.5 my-1">
                      {[...Array(5)].map((_, i) => (
                        <IoStar key={i} size={18} className={i < Math.round(rating) ? 'text-amber-400' : 'text-neutral-200'} />
                      ))}
                    </div>
                    <p className="text-xs text-neutral-500">Course Rating</p>
                  </div>
                  <div className="flex-1 space-y-2">
                    {[5,4,3,2,1].map(star => (
                      <div key={star} className="flex items-center gap-3 text-xs">
                        <span className="w-3 text-right text-neutral-600">{star}</span>
                        <IoStar size={12} className="text-amber-400 shrink-0" />
                        <div className="flex-1 bg-neutral-100 rounded-full h-1.5">
                          <div className="bg-amber-400 h-1.5 rounded-full" style={{ width: star === 5 ? '70%' : star === 4 ? '20%' : '5%' }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <p className="text-center text-textSecondary text-sm py-8">
                  Student reviews will appear here after course completion.
                </p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
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
