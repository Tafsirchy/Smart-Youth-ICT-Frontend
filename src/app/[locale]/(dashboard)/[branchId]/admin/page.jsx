'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import { useParams } from 'next/navigation';
import api from '@/lib/api';
import {
  IoPeopleOutline, IoBookOutline, IoCashOutline, IoRibbonOutline,
  IoTrendingUpOutline, IoArrowForwardOutline, IoCalendarOutline,
  IoCheckmarkCircle, IoTimeOutline, IoArrowUpOutline
} from 'react-icons/io5';
import { HiOutlineAcademicCap } from 'react-icons/hi';

const stagger = { animate: { transition: { staggerChildren: 0.09 } } };
const card    = { initial: { opacity: 0, y: 18 }, animate: { opacity: 1, y: 0, transition: { duration: 0.4 } } };

const QUICK_LINKS = [
  { href: '/admin/students',  label: 'Students',     icon: IoPeopleOutline,    color: 'from-blue-500 to-blue-600' },
  { href: '/admin/courses',   label: 'Courses',      icon: IoBookOutline,       color: 'from-violet-500 to-purple-600' },
  { href: '/admin/payments',  label: 'Payments',     icon: IoCashOutline,       color: 'from-emerald-500 to-green-600' },
  { href: '/admin/blog',      label: 'Blog',         icon: IoCalendarOutline,   color: 'from-pink-500 to-rose-500' },
  { href: '/admin/testimonials', label: 'Testimonials', icon: IoRibbonOutline,  color: 'from-amber-500 to-orange-500' },
  { href: '/admin/seminars',  label: 'Seminars',     icon: HiOutlineAcademicCap, color: 'from-cyan-500 to-blue-500' },
];

export default function AdminDashboardPage() {
  const locale = useLocale();
  const { branchId } = useParams();
  const [stats, setStats]       = useState(null);
  const [recent, setRecent]     = useState([]);
  const [loading, setLoading]   = useState(true);

  useEffect(() => {
    Promise.all([
      api.get(`/branches/stats`),
      api.get('/enrollments', { params: { limit: 8, sort: '-createdAt' } }).catch(() => ({ data: { data: [] } })),
    ]).then(([sRes, eRes]) => {
      if (sRes.data?.success) setStats(sRes.data.data);
      setRecent(eRes.data?.data || []);
    }).catch(console.error).finally(() => setLoading(false));
  }, []);

  const STAT_CARDS = [
    { label: 'Total Students',   value: stats?.totalStudents  ?? stats?.enrolledCourses ?? '—', icon: IoPeopleOutline,     bg: 'bg-blue-50',    txt: 'text-blue-600',   ring: 'ring-blue-100',   trend: '+12%' },
    { label: 'Active Courses',   value: stats?.totalCourses   ?? '—',                           icon: IoBookOutline,        bg: 'bg-violet-50',  txt: 'text-violet-600', ring: 'ring-violet-100', trend: '+3%'  },
    { label: 'Revenue (৳)',      value: stats?.totalRevenue?.toLocaleString() ?? '—',           icon: IoCashOutline,        bg: 'bg-emerald-50', txt: 'text-emerald-600',ring: 'ring-emerald-100',trend: '+24%' },
    { label: 'Certificates',     value: stats?.certificates   ?? '—',                           icon: IoRibbonOutline,      bg: 'bg-amber-50',   txt: 'text-amber-600',  ring: 'ring-amber-100',  trend: '+8%'  },
  ];

  return (
    <div className="space-y-8 pb-12">
      {/* ── Welcome Banner ── */}
      <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl px-8 py-7"
        style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 55%, #312e81 100%)' }}>
        <motion.div className="absolute -top-16 -right-16 w-60 h-60 rounded-full opacity-20 blur-3xl pointer-events-none"
          style={{ background: 'var(--color-brand-pink)' }}
          animate={{ scale: [1,1.15,1] }} transition={{ duration: 8, repeat: Infinity }} />
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-white mb-0.5">Admin Dashboard 🛠️</h1>
            <p className="text-indigo-200 text-sm">Platform overview — manage students, courses, payments & content.</p>
          </div>
          <Link href={`/${locale}/${branchId}/courses`} target="_blank"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/15 border border-white/20 text-white text-sm font-semibold hover:bg-white/25 transition backdrop-blur-sm">
            View Site <IoArrowForwardOutline size={15} />
          </Link>
        </div>
      </motion.div>

      {/* ── Stat Cards ── */}
      <motion.div variants={stagger} initial="initial" animate="animate"
        className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        {STAT_CARDS.map(s => (
          <motion.div key={s.label} variants={card}
            className={`bg-white rounded-2xl ring-1 ${s.ring} p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col gap-3`}>
            <div className="flex items-start justify-between">
              <div className={`${s.bg} ${s.txt} p-3 rounded-xl`}><s.icon size={22} /></div>
              <span className="flex items-center gap-0.5 text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                <IoArrowUpOutline size={11} />{s.trend}
              </span>
            </div>
            <div>
              <p className="text-xs font-medium text-textSecondary">{s.label}</p>
              <p className={`text-3xl font-extrabold mt-0.5 ${s.txt}`}>
                {loading ? <span className="inline-block w-10 h-7 bg-neutral-200 animate-pulse rounded" /> : s.value}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* ── Quick Actions ── */}
      <div>
        <h2 className="text-sm font-semibold text-textSecondary mb-3">Quick Access</h2>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
          {QUICK_LINKS.map((link, i) => (
            <motion.div key={link.href} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.06 }}>
              <Link href={`/${locale}/${branchId}${link.href}`}
                className={`flex flex-col items-center justify-center gap-1.5 py-4 rounded-2xl bg-gradient-to-br ${link.color} text-white font-semibold text-xs shadow-md hover:scale-105 hover:shadow-lg transition-all`}>
                <link.icon size={22} />{link.label}
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── Recent Enrollments ── */}
      <section className="bg-white rounded-2xl ring-1 ring-neutral-200 shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-100">
          <h2 className="font-bold text-textPrimary flex items-center gap-2">
            <IoTrendingUpOutline size={18} className="text-blue-500" /> Recent Enrollments
          </h2>
          <Link href={`/${locale}/${branchId}/admin/payments`} className="text-xs font-semibold text-blue-600 hover:underline flex items-center gap-1">
            View All <IoArrowForwardOutline size={12} />
          </Link>
        </div>
        <div className="divide-y divide-neutral-50">
          {loading ? [...Array(5)].map((_, i) => (
            <div key={i} className="px-6 py-3.5 flex items-center gap-4 animate-pulse">
              <div className="w-9 h-9 rounded-xl bg-neutral-200 shrink-0" />
              <div className="flex-1 space-y-1.5">
                <div className="h-3 bg-neutral-200 rounded w-40" />
                <div className="h-2.5 bg-neutral-100 rounded w-24" />
              </div>
              <div className="h-3 bg-neutral-200 rounded w-16" />
            </div>
          )) : recent.length > 0 ? recent.map((e, i) => (
            <motion.div key={e._id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }}
              className="px-6 py-3.5 flex items-center gap-4 hover:bg-neutral-50 transition-colors">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-xs font-extrabold shrink-0">
                {e.user?.name?.charAt(0) || 'U'}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-textPrimary text-sm truncate">{e.user?.name || 'Unknown Student'}</p>
                <p className="text-xs text-textSecondary truncate">{e.course?.title?.en || e.course?.title || 'Course'}</p>
              </div>
              <div className="text-right shrink-0">
                <p className="text-xs font-bold text-emerald-600">৳{e.amount?.toLocaleString() || '—'}</p>
                <p className="text-xs text-textSecondary flex items-center gap-1 justify-end mt-0.5">
                  <IoTimeOutline size={11} />
                  {e.createdAt ? new Date(e.createdAt).toLocaleDateString() : '—'}
                </p>
              </div>
              <span className={`shrink-0 text-xs font-semibold px-2.5 py-1 rounded-full ${
                e.paymentStatus === 'paid' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
              }`}>
                {e.paymentStatus || 'pending'}
              </span>
            </motion.div>
          )) : (
            <div className="py-12 text-center text-textSecondary text-sm">No enrollments yet.</div>
          )}
        </div>
      </section>
    </div>
  );
}
