'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '@/lib/api';
import {
  HiSpeakerphone,
  HiBell,
  HiClock,
  HiCalendar,
  HiExclamation,
  HiBookmark,
  HiCheckCircle,
  HiAcademicCap,
  HiSearch
} from 'react-icons/hi';
import { IoCloseOutline, IoPin } from 'react-icons/io5';

const CATEGORIES = [
  { value: 'all', label: 'All Announcements' },
  { value: 'urgent', label: 'Urgent Alerts' },
  { value: 'academic', label: 'Classes & Exams' },
  { value: 'holiday', label: 'Holidays' },
  { value: 'event', label: 'Workshops & Events' },
];

export default function StudentNoticesPage() {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedNotice, setSelectedNotice] = useState(null);

  const fetchStudentNotices = useCallback(async () => {
    try {
      setLoading(true);
      const res = await api.get('/notices/student');
      if (res.data?.success) {
        setNotices(res.data.data || []);
      }
    } catch (err) {
      console.error('Failed to load student notices:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStudentNotices();
  }, [fetchStudentNotices]);

  const urgentNotices = notices.filter(n => n.priority === 'urgent');

  const filteredNotices = notices.filter(n => {
    const matchesSearch =
      n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.content.toLowerCase().includes(searchQuery.toLowerCase());

    if (selectedCategory === 'all') return matchesSearch;
    if (selectedCategory === 'urgent') return matchesSearch && n.priority === 'urgent';
    return matchesSearch && n.category === selectedCategory;
  });

  return (
    <div className="space-y-8 pb-12">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-700 via-blue-700 to-sky-700 p-8 text-white shadow-xl shadow-blue-500/10">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/20 px-3.5 py-1 text-xs font-semibold backdrop-blur-md">
            <HiBell className="h-4 w-4" />
            <span>Campus Announcements & Broadcasts</span>
          </div>
          <h1 className="mt-3 text-2xl font-black tracking-tight sm:text-3xl">
            Notice Board & Updates
          </h1>
          <p className="mt-1 text-sm text-blue-100">
            Official announcements, examination schedules, campus holiday notices, and urgent alerts from your campus administration.
          </p>
        </div>

        <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/10 blur-2xl" />
      </div>

      {/* Urgent Alert Banner (if any) */}
      {urgentNotices.length > 0 && (
        <div className="space-y-3">
          {urgentNotices.map(notice => (
            <div
              key={notice._id}
              className="flex items-center justify-between rounded-2xl border border-rose-200 bg-rose-50 p-4 shadow-sm dark:border-rose-900/60 dark:bg-rose-950/40"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-rose-500 text-white shadow-md shadow-rose-500/20">
                  <HiExclamation className="h-6 w-6 animate-pulse" />
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="rounded-full bg-rose-200/80 px-2.5 py-0.5 text-[10px] font-black uppercase text-rose-800 dark:bg-rose-900 dark:text-rose-200">
                      Urgent Alert
                    </span>
                    <span className="text-xs font-medium text-slate-500">
                      {new Date(notice.publishDate).toLocaleDateString()}
                    </span>
                  </div>
                  <h4
                    onClick={() => setSelectedNotice(notice)}
                    className="mt-1 text-sm font-bold text-rose-900 hover:underline cursor-pointer dark:text-rose-200"
                  >
                    {notice.title}
                  </h4>
                </div>
              </div>

              <button
                onClick={() => setSelectedNotice(notice)}
                className="shrink-0 rounded-xl bg-white px-4 py-2 text-xs font-bold text-rose-600 shadow-sm hover:bg-rose-50 dark:bg-slate-800 dark:text-rose-300"
              >
                Read Alert
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-md">
          <HiSearch className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search notice content or title..."
            className="w-full rounded-2xl border border-slate-200 bg-white py-3 pl-12 pr-4 text-sm font-medium text-slate-800 outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-800 dark:bg-slate-900 dark:text-white"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {CATEGORIES.map(cat => (
            <button
              key={cat.value}
              onClick={() => setSelectedCategory(cat.value)}
              className={`rounded-xl px-4 py-2.5 text-xs font-bold capitalize transition-all whitespace-nowrap ${
                selectedCategory === cat.value
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-300'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Notices List */}
      {loading ? (
        <div className="flex h-64 items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
        </div>
      ) : filteredNotices.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-slate-200 bg-white p-12 text-center dark:border-slate-800 dark:bg-slate-900">
          <HiSpeakerphone className="mx-auto h-12 w-12 text-slate-300 dark:text-slate-700" />
          <h3 className="mt-4 text-base font-bold text-slate-800 dark:text-white">No Notices Available</h3>
          <p className="mt-1 text-sm text-slate-500">
            {searchQuery ? 'No notice matches your search query.' : 'There are currently no active announcements for your campus.'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredNotices.map(notice => (
            <div
              key={notice._id}
              onClick={() => setSelectedNotice(notice)}
              className="group cursor-pointer flex flex-col justify-between overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl hover:border-blue-300 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-blue-900"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold capitalize text-blue-700 dark:bg-blue-950/50 dark:text-blue-400">
                    {notice.category}
                  </span>

                  {notice.isPinned && (
                    <span className="flex items-center gap-1 text-xs font-bold text-amber-600 dark:text-amber-400">
                      <IoPin className="h-4 w-4" />
                      <span>Pinned</span>
                    </span>
                  )}
                </div>

                <h3 className="mt-4 text-lg font-black text-slate-800 transition-colors group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
                  {notice.title}
                </h3>

                <p className="mt-2 text-sm text-slate-600 line-clamp-3 dark:text-slate-300">
                  {notice.content}
                </p>
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4 text-xs text-slate-400 dark:border-slate-800">
                <span className="flex items-center gap-1">
                  <HiCalendar className="h-4 w-4" />
                  <span>
                    {new Date(notice.publishDate).toLocaleDateString('en-US', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric'
                    })}
                  </span>
                </span>

                <span className="font-semibold text-blue-600 group-hover:underline dark:text-blue-400">
                  Read More →
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Reader Modal */}
      <AnimatePresence>
        {selectedNotice && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-2xl overflow-hidden rounded-3xl bg-white p-8 shadow-2xl dark:bg-slate-900 dark:border dark:border-slate-800"
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700 dark:bg-blue-950/50 dark:text-blue-400 capitalize">
                    {selectedNotice.category} Notice
                  </span>
                  <h2 className="mt-3 text-2xl font-black text-slate-800 dark:text-white">
                    {selectedNotice.title}
                  </h2>
                  <p className="mt-1 text-xs text-slate-400">
                    Published on{' '}
                    {new Date(selectedNotice.publishDate).toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}{' '}
                    • {selectedNotice.branchId?.name || 'Smart Youth ICT HQ'}
                  </p>
                </div>

                <button
                  onClick={() => setSelectedNotice(null)}
                  className="rounded-xl p-2 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  <IoCloseOutline className="h-6 w-6" />
                </button>
              </div>

              <div className="mt-6 border-t border-slate-100 pt-6 dark:border-slate-800">
                <div className="prose max-w-none text-sm leading-relaxed text-slate-700 whitespace-pre-wrap dark:text-slate-300">
                  {selectedNotice.content}
                </div>
              </div>

              <div className="mt-8 flex justify-end">
                <button
                  onClick={() => setSelectedNotice(null)}
                  className="rounded-xl bg-blue-600 px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-blue-500/20 hover:bg-blue-700"
                >
                  Close Notice
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
