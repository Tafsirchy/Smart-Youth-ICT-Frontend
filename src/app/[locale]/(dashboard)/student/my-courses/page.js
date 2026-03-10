'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { HiOutlineBookOpen, HiOutlineAcademicCap } from 'react-icons/hi';
import Link from 'next/link';
import Image from 'next/image';
import api from '@/lib/api';

export default function MyCoursesPage() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEnrolledCourses = async () => {
      try {
        const res = await api.get('/courses/enrolled');
        if (res.data?.success) {
          setCourses(res.data.data);
        }
      } catch (error) {
        console.error('Failed to fetch enrolled courses', error);
      } finally {
        setLoading(false);
      }
    };
    fetchEnrolledCourses();
  }, []);

  return (
    <div className="space-y-6 pb-10">
      <div>
        <h1 className="text-3xl font-extrabold text-neutral-900 tracking-tight flex items-center gap-3">
          <HiOutlineAcademicCap className="text-blue-600" />
          My Courses
        </h1>
        <p className="mt-2 text-neutral-500">Pick up right where you left off or discover something new.</p>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
          {[1, 2, 3].map(n => (
            <div key={n} className="h-64 animate-pulse rounded-2xl bg-neutral-200"></div>
          ))}
        </div>
      ) : courses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
          {courses.map((course, i) => (
            <motion.div 
              key={course._id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-neutral-200 hover:shadow-xl transition-all"
            >
              <div className="relative aspect-video w-full bg-neutral-100">
                <Image src={course.thumbnail || '/images/course-placeholder.jpg'} alt={course.title?.en || course.title} fill className="object-cover" />
                <div className="absolute top-3 left-3 rounded-md bg-blue-600/90 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur-sm">
                  {course.category || 'Course'}
                </div>
              </div>

              <div className="flex flex-1 flex-col p-5">
                <h3 className="mb-2 line-clamp-2 text-lg font-bold leading-tight text-neutral-900 group-hover:text-blue-600 transition-colors">
                  {course.title?.en || course.title}
                </h3>
                
                <div className="mt-auto pt-4 flex flex-col gap-3">
                  <div className="w-full">
                    <div className="mb-1 flex justify-between text-xs font-medium text-neutral-500">
                      <span>Progress</span>
                      <span className="text-emerald-600 font-bold">0%</span>
                    </div>
                    <div className="w-full bg-neutral-100 rounded-full h-2">
                       <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '0%' }}></div>
                    </div>
                  </div>
                  
                  <Link href={`/student/learn/${course.slug}`} className="btn-primary w-full py-2.5 text-center text-sm mt-2">
                    Continue Learning
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="rounded-3xl border-2 border-dashed border-neutral-200 bg-white py-20 text-center flex flex-col items-center mt-6">
          <div className="rounded-full bg-blue-50 p-6 mb-4">
            <HiOutlineBookOpen size={48} className="text-blue-500 opacity-80" />
          </div>
          <h3 className="text-xl font-bold text-neutral-900 mb-2">Your learning journey begins here</h3>
          <p className="text-neutral-500 max-w-md mx-auto mb-8">
            You don't have any active courses. Browse our catalog and start acquiring highly sought-after skills today.
          </p>
          <Link href="/courses" className="btn-primary px-8 py-3 font-semibold text-lg hover:scale-105 transition-transform shadow-lg shadow-blue-500/20">
            Browse Course Catalog
          </Link>
        </div>
      )}
    </div>
  );
}
