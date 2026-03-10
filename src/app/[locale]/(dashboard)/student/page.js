'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { HiOutlineBookOpen, HiOutlineChartPie, HiOutlineBadgeCheck } from 'react-icons/hi';
import Link from 'next/link';
import Image from 'next/image';
import api from '@/lib/api';
import { useSession } from 'next-auth/react';

export default function StudentDashboardPage() {
  const { data: session } = useSession();
  const [courses, setCourses] = useState([]);
  const [dashboardStats, setDashboardStats] = useState({ enrolledCourses: 0, completedLessons: 0, certificates: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [coursesRes, statsRes] = await Promise.all([
          api.get('/courses/enrolled'),
          api.get('/progress/dashboard/stats')
        ]);
        
        if (coursesRes.data?.success) setCourses(coursesRes.data.data);
        if (statsRes.data?.success) setDashboardStats(statsRes.data.data);

      } catch (error) {
        console.error('Failed to fetch dashboard data', error);
      } finally {
        setLoading(false);
      }
    };

    if (session) {
      fetchDashboardData();
    }
  }, [session]);

  const stats = [
    { label: 'Enrolled Courses', value: dashboardStats.enrolledCourses, icon: HiOutlineBookOpen,    color: 'bg-blue-50 text-blue-600' },
    { label: 'Completed Lessons',value: dashboardStats.completedLessons, icon: HiOutlineChartPie,    color: 'bg-emerald-50 text-emerald-600' },
    { label: 'Certificates',     value: dashboardStats.certificates,     icon: HiOutlineBadgeCheck, color: 'bg-amber-50 text-amber-600' },
  ];

  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-neutral-900 tracking-tight">
            Welcome back, {session?.user?.name?.split(' ')[0] || 'Student'}! 👋
          </h1>
          <p className="mt-2 text-neutral-500">Here is an overview of your learning progress and recent activity.</p>
        </div>
        <Link href="/courses" className="btn-primary px-5 py-2.5 text-sm font-semibold whitespace-nowrap">
          Browse More Courses
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-neutral-200 flex items-center gap-5"
          >
            <div className={`p-4 rounded-xl ${stat.color}`}>
              <stat.icon size={28} />
            </div>
            <div>
              <p className="text-sm font-medium text-neutral-500">{stat.label}</p>
              <p className="text-3xl font-bold text-neutral-900 mt-1">{loading ? '-' : stat.value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Enrolled Courses Section */}
      <section>
        <div className="mb-6 flex items-center justify-between border-b border-neutral-200 pb-4">
          <h2 className="text-xl font-bold text-neutral-900">Recently Active Courses</h2>
          <Link href="/student/my-courses" className="text-sm font-semibold text-blue-600 hover:text-blue-700">
            View All →
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2].map(n => (
              <div key={n} className="h-48 animate-pulse rounded-2xl bg-neutral-200"></div>
            ))}
          </div>
        ) : courses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {courses.slice(0, 3).map((course, i) => (
              <motion.div 
                key={course._id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 + (i * 0.1) }}
                className="group relative overflow-hidden rounded-2xl bg-white ring-1 ring-neutral-200 hover:shadow-xl transition-all flex flex-col"
              >
                <div className="relative h-36 w-full bg-neutral-100 shrink-0">
                  <Image src={course.thumbnail || '/images/course-placeholder.jpg'} alt={course.title?.en || course.title} fill className="object-cover" />
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-neutral-900 line-clamp-2 group-hover:text-blue-600 transition-colors">
                      {course.title?.en || course.title}
                    </h3>
                    <p className="text-xs text-neutral-500 mt-2 flex justify-between">
                      <span>{course.duration || '3 Months'}</span>
                      <span className="font-medium text-emerald-600 text-right">0% Completed</span>
                    </p>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-neutral-100">
                    <div className="w-full bg-neutral-200 rounded-full h-2 mb-3">
                      <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '0%' }}></div>
                    </div>
                    <Link href={`/student/learn/${course.slug}`} className="block w-full rounded-lg bg-blue-50 py-2.5 text-center text-sm font-bold text-blue-700 hover:bg-blue-600 hover:text-white transition-colors">
                      Resume Journey
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
           <div className="rounded-2xl border border-dashed border-neutral-300 bg-neutral-50 p-12 text-center">
             <HiOutlineBookOpen className="mx-auto h-12 w-12 text-neutral-400 mb-4" />
             <h3 className="text-lg font-bold text-neutral-900">No courses yet</h3>
             <p className="text-neutral-500 mt-2 mb-6 max-w-sm mx-auto">You haven't enrolled in any courses yet. Explore our catalog and start learning today!</p>
             <Link href="/courses" className="btn-primary inline-block px-6 py-2.5">
               Explore Courses
             </Link>
           </div>
        )}
      </section>
    </div>
  );
}
