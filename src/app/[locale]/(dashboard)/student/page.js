'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import api from '@/lib/api';
import { useSession } from 'next-auth/react';
import { useLocale } from 'next-intl';
import {
  IoBookOutline, IoCheckmarkDoneOutline, IoRibbonOutline,
  IoPlayCircleOutline, IoFlameOutline, IoTrophyOutline,
  IoArrowForwardOutline
} from 'react-icons/io5';

const stagger = { animate: { transition: { staggerChildren: 0.1 } } };
const card    = { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' } } };

const QUICK_LINKS = [
  { label: 'My Courses',    href: '/student/my-courses',  icon: IoBookOutline,            color: 'from-blue-500 to-blue-600' },
  { label: 'Assignments',   href: '/student/assignments',  icon: IoCheckmarkDoneOutline,   color: 'from-violet-500 to-purple-600' },
  { label: 'Certificates',  href: '/student/certificates', icon: IoRibbonOutline,          color: 'from-amber-500 to-orange-500' },
  { label: 'Progress',      href: '/student/progress',     icon: IoTrophyOutline,          color: 'from-emerald-500 to-green-600' },
];

export default function StudentDashboardPage() {
  const { data: session } = useSession();
  const locale = useLocale();
  const [courses, setCourses]           = useState([]);
  const [stats, setStats]               = useState({ enrolledCourses: 0, completedLessons: 0, certificates: 0 });
  const [loading, setLoading]           = useState(true);
  const firstName = session?.user?.name?.split(' ')[0] || 'Student';

  useEffect(() => {
    if (!session) return;
    Promise.all([
      api.get('/courses/enrolled'),
      api.get('/progress/dashboard/stats'),
    ]).then(([cRes, sRes]) => {
      if (cRes.data?.success)  setCourses(cRes.data.data);
      if (sRes.data?.success)  setStats(sRes.data.data);
    }).catch(console.error).finally(() => setLoading(false));
  }, [session]);

  const STAT_CARDS = [
    { label: 'Enrolled Courses',   value: stats.enrolledCourses,  icon: IoBookOutline,          bg: 'bg-blue-50',    text: 'text-blue-600',    ring: 'ring-blue-100' },
    { label: 'Completed Lessons',  value: stats.completedLessons, icon: IoCheckmarkDoneOutline,  bg: 'bg-violet-50',  text: 'text-violet-600',  ring: 'ring-violet-100' },
    { label: 'Certificates Earned',value: stats.certificates,      icon: IoRibbonOutline,         bg: 'bg-amber-50',   text: 'text-amber-600',   ring: 'ring-amber-100' },
  ];

  return (
    <div className="space-y-8 pb-12">
      {/* ── Welcome Banner ── */}
      <motion.div
        initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
        className="relative overflow-hidden rounded-3xl px-8 py-8"
        style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 55%, #312e81 100%)' }}
      >
        <motion.div className="absolute -top-16 -right-16 w-64 h-64 rounded-full opacity-20 blur-3xl pointer-events-none" style={{ background: 'var(--color-brand-pink)' }}
          animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 8, repeat: Infinity }} />
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-white/15 flex items-center justify-center shrink-0">
              <IoFlameOutline size={30} className="text-orange-300" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-white">
                Welcome back, {firstName}! 👋
              </h1>
              <p className="text-indigo-200 text-sm mt-0.5">Keep pushing — you're on a learning streak!</p>
            </div>
          </div>
          <Link href={`/${locale}/courses`}
            className="shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/15 border border-white/20 text-white text-sm font-semibold hover:bg-white/25 transition backdrop-blur-sm">
            Browse Courses <IoArrowForwardOutline size={16} />
          </Link>
        </div>
      </motion.div>

      {/* ── Stat Cards ── */}
      <motion.div variants={stagger} initial="initial" animate="animate"
        className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {STAT_CARDS.map(s => (
          <motion.div key={s.label} variants={card}
            className={`rounded-2xl bg-white ring-1 ${s.ring} p-6 flex items-center gap-5 shadow-sm hover:shadow-md transition-shadow`}>
            <div className={`${s.bg} ${s.text} p-4 rounded-2xl shrink-0`}>
              <s.icon size={26} />
            </div>
            <div>
              <p className="text-xs font-medium text-neutral-500">{s.label}</p>
              <p className={`text-3xl font-extrabold mt-0.5 ${s.text}`}>
                {loading ? <span className="animate-pulse bg-neutral-200 rounded w-8 h-7 inline-block" /> : s.value}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* ── Quick Links ── */}
      <div>
        <h2 className="text-base font-semibold text-textSecondary mb-3">Quick Access</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {QUICK_LINKS.map((link, i) => (
            <motion.div key={link.href} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.08 }}>
              <Link href={`/${locale}${link.href}`}
                className={`flex flex-col items-center justify-center gap-2 py-5 rounded-2xl bg-gradient-to-br ${link.color} text-white font-semibold text-sm shadow-md hover:scale-105 hover:shadow-lg transition-all`}>
                <link.icon size={26} />
                {link.label}
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── Active Courses ── */}
      <section>
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-bold text-textPrimary">Continue Learning</h2>
          <Link href={`/${locale}/student/my-courses`} className="text-sm font-semibold text-blue-600 hover:underline flex items-center gap-1">
            View All <IoArrowForwardOutline size={14} />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[1,2,3].map(n => <div key={n} className="h-52 animate-pulse rounded-2xl bg-neutral-200" />)}
          </div>
        ) : courses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {courses.slice(0, 3).map((course, i) => {
              const pct = course.progress?.percentage || 0;
              return (
                <motion.div key={course._id}
                  initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + i * 0.09 }}
                  className="group bg-white rounded-2xl ring-1 ring-neutral-200 overflow-hidden hover:shadow-lg transition-all flex flex-col">
                  <div className="relative h-36 w-full bg-neutral-100">
                    <Image src={course.thumbnail || '/images/course-placeholder.jpg'} alt={course.title?.en || course.title} fill className="object-cover" />
                    {course.category && (
                      <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-blue-600/90 text-xs font-semibold text-white backdrop-blur-sm">
                        {course.category}
                      </span>
                    )}
                  </div>
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <h3 className="font-bold text-textPrimary line-clamp-2 text-sm group-hover:text-blue-600 transition-colors mb-3">
                      {course.title?.en || course.title}
                    </h3>
                    <div>
                      <div className="flex justify-between text-xs font-medium text-textSecondary mb-1.5">
                        <span>Progress</span>
                        <span className="text-emerald-600 font-bold">{pct}%</span>
                      </div>
                      <div className="w-full bg-neutral-100 rounded-full h-1.5 mb-4">
                        <motion.div className="bg-gradient-to-r from-emerald-400 to-emerald-500 h-1.5 rounded-full"
                          initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ duration: 0.8, delay: 0.3 }} />
                      </div>
                      <Link href={`/${locale}/student/learn/${course.slug}`}
                        className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-blue-50 text-blue-700 text-sm font-bold hover:bg-blue-600 hover:text-white transition-colors">
                        <IoPlayCircleOutline size={16} />
                        {pct > 0 ? 'Continue' : 'Start Learning'}
                      </Link>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <div className="rounded-2xl border-2 border-dashed border-neutral-200 bg-white p-12 text-center">
            <IoBookOutline className="mx-auto h-12 w-12 text-neutral-300 mb-4" />
            <h3 className="font-bold text-textPrimary mb-2">No courses yet</h3>
            <p className="text-textSecondary text-sm mb-6">Explore our catalog and start your learning journey today.</p>
            <Link href={`/${locale}/courses`} className="btn-primary inline-block px-6 py-2.5">Explore Courses</Link>
          </div>
        )}
      </section>
    </div>
  );
}
