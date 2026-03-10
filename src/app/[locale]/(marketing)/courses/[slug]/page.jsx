'use client';

import React, { useState, useEffect } from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { IoTimeOutline, IoCheckmarkCircle, IoPlayCircleOutline } from 'react-icons/io5';
import VideoPlayer from '@/components/courses/VideoPlayer';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import PaymentGatewayButton from '@/components/payments/PaymentGatewayButton';
import ManualBankModal from '@/components/payments/ManualBankModal';
import api from '@/lib/api';

export default function CourseDetailPage({ params }) {
  const { slug } = params;
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [showManualBank, setShowManualBank] = useState(false);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await api.get(`/courses/${slug}`);
        if (res.data?.success) {
          setCourse(res.data.data);
        } else {
          setError(true);
        }
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen animate-pulse bg-neutral-50 px-4 py-16">
        <div className="container-lg mx-auto">
          <div className="h-96 w-full rounded-3xl bg-neutral-200"></div>
          <div className="mt-8 flex gap-8">
            <div className="h-64 flex-1 rounded-2xl bg-neutral-200"></div>
            <div className="h-96 w-1/3 rounded-2xl bg-neutral-200"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !course) {
    return notFound();
  }

  const title = course.title?.en || course.title || 'Course Details';
  const description = course.description?.en || course.description || 'Become an expert with our comprehensive curriculum and hands-on projects designed for the modern industry.';

  return (
    <main className="min-h-screen bg-neutral-50 pb-20 pt-8">
      <div className="container-lg mx-auto px-4">
        
        {/* Hero Section Container */}
        <div className="relative mb-12 overflow-hidden rounded-3xl bg-neutral-900 shadow-2xl">
          <div className="absolute inset-0 z-0 opacity-20">
             <Image src={course.thumbnail || '/images/course-placeholder.jpg'} alt="Bg" fill className="object-cover blur-2xl" />
          </div>
          
          <div className="relative z-10 flex flex-col lg:flex-row gap-8 p-8 lg:p-12 items-center">
            {/* Left Content */}
            <div className="flex-1 text-white">
              <Badge variant="default" className="mb-4 bg-blue-600">{course.category || 'Tech Course'}</Badge>
              <h1 className="mb-4 text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl text-balance">
                {title}
              </h1>
              <p className="mb-8 max-w-xl text-lg text-neutral-300">
                {description}
              </p>
              
              <div className="flex flex-wrap items-center gap-6 text-sm font-medium text-neutral-400">
                <span className="flex items-center gap-2">
                  <IoTimeOutline size={20} className="text-blue-400" />
                  {course.duration || '3 Months Duration'}
                </span>
                <span className="flex items-center gap-2">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">★</span>
                  {course.rating || '4.8'} Average Rating
                </span>
              </div>
            </div>

            {/* Right Video / Action block */}
            <div className="w-full lg:w-[500px] shrink-0">
              <div className="overflow-hidden rounded-2xl bg-white shadow-xl ring-1 ring-neutral-200">
                <VideoPlayer url={course.previewVideo} thumbnail={course.thumbnail} />
                <div className="p-6">
                  <div className="mb-4 flex items-end justify-between">
                    <div>
                      <span className="block text-sm font-medium text-neutral-500">Course Fee</span>
                      <span className="text-3xl font-bold text-neutral-900">৳ {course.price}</span>
                    </div>
                    {course.installmentsAllowed && (
                      <span className="text-sm font-semibold text-blue-600">Installments Available</span>
                    )}
                  </div>
                  
                  {/* Payment Gateways Grid */}
                  <div className="mt-6 flex flex-col gap-3">
                    <PaymentGatewayButton gateway="bkash" courseId={course._id} amount={course.price} />
                    <PaymentGatewayButton gateway="nagad" courseId={course._id} amount={course.price} />
                    <PaymentGatewayButton gateway="stripe" courseId={course._id} amount={course.price} />
                    
                    <div className="my-2 flex items-center justify-center gap-2">
                       <span className="h-[1px] w-full bg-neutral-200"></span>
                       <span className="text-xs font-semibold uppercase text-neutral-400">OR</span>
                       <span className="h-[1px] w-full bg-neutral-200"></span>
                    </div>

                    {/* Manual Bank Transfer sets local state to show modal instead of hitting API directly */}
                    <Button 
                      variant="outline" 
                      onClick={() => setShowManualBank(true)} 
                      className="w-full py-5 text-neutral-700 hover:bg-neutral-100 font-bold"
                    >
                      Manual Bank Transfer
                    </Button>
                  </div>
                  
                  <p className="mt-6 text-center text-xs font-medium text-neutral-400">
                    Secure checkout. Real projects. Guaranteed learning.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal rendering */}
        <AnimatePresence>
          {showManualBank && (
            <ManualBankModal 
              courseId={course._id} 
              amount={course.price} 
              onClose={() => setShowManualBank(false)} 
            />
          )}
        </AnimatePresence>

        {/* Course Details Grid */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          
          {/* Left Column (Syllabus) */}
          <div className="lg:col-span-2 space-y-10">
            {/* What you'll learn */}
            <section>
              <h2 className="mb-6 text-2xl font-bold text-neutral-900">What You Will Learn</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  'Master industry-standard tools and techniques',
                  'Build real-world projects for actual clients',
                  'Create a stunning portfolio to showcase your work',
                  'Learn how to land freelance gigs and remote jobs'
                ].map((item, i) => (
                  <div key={i} className="flex gap-3 text-neutral-700">
                    <IoCheckmarkCircle size={22} className="shrink-0 text-emerald-500" />
                    <span className="leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Curriculum */}
            <section>
              <h2 className="mb-6 text-2xl font-bold text-neutral-900">Course Curriculum</h2>
              <div className="rounded-2xl border border-neutral-200 bg-white shadow-sm overflow-hidden">
                {course.curriculum?.length > 0 ? (
                  course.curriculum.map((module, i) => (
                    <div key={i} className="group border-b border-neutral-100 last:border-0 p-5 hover:bg-neutral-50 transition-colors">
                      <h4 className="font-semibold text-neutral-900 mb-2 flex items-center gap-2">
                        <span className="flex h-6 w-6 items-center justify-center rounded bg-blue-100 text-xs text-blue-700">{i+1}</span>
                        {module.title}
                      </h4>
                      <div className="pl-8 space-y-3 mt-4">
                        {module.topics?.map((topic, j) => (
                          <div key={j} className="flex items-center gap-3 text-sm text-neutral-600">
                            <IoPlayCircleOutline size={18} className="text-neutral-400 group-hover:text-blue-500" />
                            {topic}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-8 text-center text-neutral-500">
                    Curriculum outline is being updated.
                  </div>
                )}
              </div>
            </section>
          </div>

          {/* Right Column (Instructor & Info) */}
          <div className="space-y-8">
            <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
              <h3 className="mb-4 text-lg font-bold text-neutral-900">Your Instructor</h3>
              <div className="flex items-center gap-4 mb-4">
                <div className="relative h-16 w-16 overflow-hidden rounded-full ring-2 ring-neutral-100">
                  <Image src={course.instructor?.avatar || '/images/default-avatar.png'} alt="Instructor" fill className="object-cover" />
                </div>
                <div>
                  <h4 className="font-bold text-neutral-900">{course.instructor?.name || 'Expert Instructor'}</h4>
                  <p className="text-sm text-neutral-500">Senior Industry Professional</p>
                </div>
              </div>
              <p className="text-sm leading-relaxed text-neutral-600">
                Learn directly from someone with years of hands-on experience delivering successful projects in the global marketplace.
              </p>
            </div>
            
            <div className="rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 p-6 text-white shadow-lg">
              <h3 className="mb-2 text-lg font-bold">Internship Opportunity</h3>
              <p className="text-sm text-blue-100 mb-4">
                Top performing students will get the chance to work on real client projects and earn back their course fee!
              </p>
              <Badge className="bg-white/20 text-white hover:bg-white/30 border-0">Performance Based</Badge>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
