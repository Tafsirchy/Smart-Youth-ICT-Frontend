'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import CourseCard from '@/components/courses/CourseCard';
import { CourseCardSkeleton } from '@/components/ui/Skeleton';
import api from '@/lib/api';
import { IoSearchOutline, IoCloseOutline, IoBookOutline } from 'react-icons/io5';

const CATEGORIES = [
  { id: 'all',               label: '🌐 All Courses' },
  { id: 'web-development',   label: '💻 Web Dev' },
  { id: 'graphic-design',    label: '🎨 Design' },
  { id: 'digital-marketing', label: '📣 Marketing' },
  { id: 'video-editing',     label: '🎬 Video' },
  { id: 'ai',                label: '🤖 AI & Tools' },
];

const stagger = { animate: { transition: { staggerChildren: 0.07 } } };
const cardVariant = { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } } };

export default function CoursesPage() {
  const locale = useLocale();
  const [courses, setCourses]     = useState([]);
  const [loading, setLoading]     = useState(true);
  const [category, setCategory]   = useState('all');
  const [search, setSearch]       = useState('');
  const [inputVal, setInputVal]   = useState('');
  const debounceRef               = useRef(null);

  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      try {
        const params = {};
        if (category !== 'all') params.category = category;
        if (search) params.search = search;
        const res = await api.get('/courses', { params });
        if (res.data?.success) setCourses(res.data.data);
      } catch (err) {
        console.error('Failed to fetch courses', err);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, [category, search]);

  // Debounce search input
  const handleSearchChange = (e) => {
    setInputVal(e.target.value);
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => setSearch(e.target.value), 350);
  };

  const clearSearch = () => { setInputVal(''); setSearch(''); };

  return (
    <div className="min-h-screen" style={{ background: 'var(--color-background)' }}>

      {/* ── Hero Banner ───────────────────────────────── */}
      <section className="relative overflow-hidden py-20 text-center"
        style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 60%, #312e81 100%)' }}>
        {/* Blobs */}
        <motion.div className="absolute -top-24 -left-20 w-72 h-72 rounded-full opacity-20 blur-3xl pointer-events-none"
          style={{ background: 'var(--color-brand-pink)' }}
          animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 8, repeat: Infinity }} />
        <motion.div className="absolute -bottom-20 -right-20 w-64 h-64 rounded-full opacity-15 blur-3xl pointer-events-none"
          style={{ background: '#818cf8' }}
          animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 7, repeat: Infinity, delay: 1.5 }} />

        <motion.div className="relative z-10 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <span className="inline-block mb-4 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider text-indigo-200 bg-white/10 border border-white/10">
            🎓 {courses.length > 0 ? `${courses.length} Courses Available` : 'Courses'}
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 leading-tight">
            Explore Our<br /><span className="text-gradient">Courses</span>
          </h1>
          <p className="text-indigo-200 text-lg max-w-xl mx-auto mb-8">
            Learn demand-driven skills from industry experts and start earning via real client projects.
          </p>

          {/* Search Bar */}
          <div className="relative max-w-lg mx-auto">
            <IoSearchOutline size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-300" />
            <input
              type="text"
              placeholder="Search courses…"
              className="w-full pl-12 pr-12 py-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-indigo-300/70 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition text-base"
              value={inputVal}
              onChange={handleSearchChange}
            />
            {inputVal && (
              <button onClick={clearSearch} className="absolute right-4 top-1/2 -translate-y-1/2 text-indigo-300 hover:text-white">
                <IoCloseOutline size={20} />
              </button>
            )}
          </div>
        </motion.div>
      </section>

      {/* ── Category Filter Tabs ─────────────────────── */}
      <section className="sticky top-0 z-20 bg-[var(--color-surface)] border-b border-neutral-200 shadow-sm">
        <div className="container-custom py-3 flex gap-2 overflow-x-auto scrollbar-hide">
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setCategory(cat.id)}
              className={`shrink-0 rounded-full px-5 py-2 text-sm font-semibold transition-all ${
                category === cat.id
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-200'
                  : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </section>

      {/* ── Course Grid ──────────────────────────────── */}
      <div className="container-custom py-12 md:py-16">
        {loading ? (
          <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {[...Array(8)].map((_, i) => (
              <CourseCardSkeleton key={i} />
            ))}
          </div>
        ) : courses.length > 0 ? (
          <AnimatePresence mode="wait">
            <motion.div
              key={category + search}
              variants={stagger}
              initial="initial"
              animate="animate"
              className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            >
              {courses.map(course => (
                <motion.div key={course._id} variants={cardVariant}>
                  <CourseCard course={course} locale={locale} />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        ) : (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-24 text-center"
          >
            <div className="w-20 h-20 rounded-full bg-blue-50 flex items-center justify-center mb-5">
              <IoBookOutline size={36} className="text-blue-400" />
            </div>
            <h3 className="text-xl font-bold text-neutral-800 mb-2">No courses found</h3>
            <p className="text-neutral-500 text-sm">Try a different category or clear your search.</p>
            {search && (
              <button onClick={clearSearch} className="mt-4 text-sm text-blue-600 hover:underline">
                Clear search
              </button>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}
