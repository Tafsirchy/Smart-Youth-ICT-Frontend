'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams } from 'next/navigation';
import api from '@/lib/api';
import { useRole } from '@/hooks/useRole';
import {
  HiSpeakerphone,
  HiBell,
  HiPlus,
  HiSearch,
  HiTrash,
  HiClock,
  HiBookmark,
  HiCheckCircle,
  HiExclamation,
  HiCalendar,
  HiUsers,
  HiAcademicCap
} from 'react-icons/hi';
import { IoCloseOutline, IoPin, IoPinOutline } from 'react-icons/io5';

const CATEGORIES = [
  { value: 'all', label: 'All Notices', color: 'bg-slate-100 text-slate-700' },
  { value: 'general', label: 'General', color: 'bg-blue-50 text-blue-700 border-blue-200' },
  { value: 'academic', label: 'Academic & Class', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  { value: 'holiday', label: 'Campus Holiday', color: 'bg-purple-50 text-purple-700 border-purple-200' },
  { value: 'exam', label: 'Exam & Test', color: 'bg-amber-50 text-amber-700 border-amber-200' },
  { value: 'event', label: 'Workshop & Event', color: 'bg-cyan-50 text-cyan-700 border-cyan-200' },
  { value: 'urgent', label: 'Urgent Alert', color: 'bg-rose-50 text-rose-700 border-rose-200' },
];

export default function BranchNoticesPage() {
  const { branchId } = useParams();
  const { isSuperAdmin, isBranchManager } = useRole();
  const canManage = isSuperAdmin || isBranchManager;

  const [notices, setNotices] = useState([]);
  const [metrics, setMetrics] = useState({
    total: 0,
    activeCount: 0,
    urgentCount: 0,
    pinnedCount: 0
  });
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [selectedNotice, setSelectedNotice] = useState(null);
  const [feedback, setFeedback] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: 'general',
    priority: 'normal',
    isPinned: false,
    targetAudience: 'all',
    expiryDate: ''
  });

  const fetchNotices = useCallback(async () => {
    try {
      setLoading(true);
      const res = await api.get('/notices/admin', {
        params: {
          branchId: branchId || undefined,
          category: selectedCategory !== 'all' ? selectedCategory : undefined
        }
      });
      if (res.data?.success) {
        setNotices(res.data.data || []);
        if (res.data.metrics) setMetrics(res.data.metrics);
      }
    } catch (err) {
      console.error('Failed to load notices:', err);
    } finally {
      setLoading(false);
    }
  }, [branchId, selectedCategory]);

  useEffect(() => {
    fetchNotices();
  }, [fetchNotices]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.content) {
      setFeedback({ type: 'error', message: 'Notice title and details are required.' });
      return;
    }

    try {
      setSubmitting(true);
      setFeedback(null);
      const res = await api.post('/notices/admin', {
        ...formData,
        branchId: isSuperAdmin ? undefined : branchId
      });

      if (res.data?.success) {
        setIsModalOpen(false);
        setFormData({
          title: '',
          content: '',
          category: 'general',
          priority: 'normal',
          isPinned: false,
          targetAudience: 'all',
          expiryDate: ''
        });
        setFeedback({ type: 'success', message: 'Notice published and broadcasted!' });
        fetchNotices();
      }
    } catch (err) {
      setFeedback({
        type: 'error',
        message: err.response?.data?.message || 'Failed to publish notice'
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleTogglePin = async (id) => {
    try {
      const res = await api.patch(`/notices/admin/${id}/pin`);
      if (res.data?.success) {
        setNotices(prev =>
          prev.map(n => (n._id === id ? { ...n, isPinned: res.data.isPinned } : n))
        );
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Error updating pin status');
    }
  };

  const handleDeleteNotice = async (id, title) => {
    if (!confirm(`Are you sure you want to delete notice "${title}"?`)) return;
    try {
      await api.delete(`/notices/admin/${id}`);
      setNotices(prev => prev.filter(n => n._id !== id));
      setMetrics(prev => ({ ...prev, total: Math.max(0, prev.total - 1) }));
    } catch (err) {
      alert(err.response?.data?.message || 'Error deleting notice');
    }
  };

  const filteredNotices = notices.filter(n => {
    return (
      n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.content.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <div className="space-y-8 pb-12">
      {/* Top Banner Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 p-8 text-white shadow-xl shadow-indigo-500/10">
        <div className="relative z-10 flex flex-col justify-between gap-6 md:flex-row md:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/20 px-3.5 py-1 text-xs font-semibold backdrop-blur-md">
              <HiSpeakerphone className="h-4 w-4" />
              <span>Campus Broadcast Hub</span>
            </div>
            <h1 className="mt-3 text-2xl font-black tracking-tight sm:text-3xl">
              Branch Notice Board & Alerts
            </h1>
            <p className="mt-1 max-w-xl text-sm text-blue-100">
              Publish campus announcements, holiday notices, exam schedules, and send push alerts directly to your students.
            </p>
          </div>

          {canManage && (
            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-bold text-indigo-600 shadow-lg transition-all hover:scale-105 hover:bg-blue-50 active:scale-95"
            >
              <HiPlus className="h-5 w-5" />
              <span>Broadcast New Notice</span>
            </button>
          )}
        </div>

        {/* Decorative background glow */}
        <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/10 blur-2xl" />
        <div className="absolute -bottom-16 right-48 h-48 w-48 rounded-full bg-blue-400/20 blur-xl" />
      </div>

      {/* Feedback Toast */}
      {feedback && (
        <div
          className={`flex items-center justify-between rounded-2xl p-4 text-sm font-semibold border ${
            feedback.type === 'success'
              ? 'bg-emerald-50 text-emerald-800 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800'
              : 'bg-rose-50 text-rose-800 border-rose-200 dark:bg-rose-950/40 dark:text-rose-300 dark:border-rose-800'
          }`}
        >
          <span>{feedback.message}</span>
          <button onClick={() => setFeedback(null)} className="text-gray-400 hover:text-gray-600">
            <IoCloseOutline className="h-5 w-5" />
          </button>
        </div>
      )}

      {/* KPI Metric Cards */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Total Notices</span>
            <span className="rounded-xl bg-blue-50 p-2 text-blue-600 dark:bg-blue-950/50">
              <HiSpeakerphone className="h-5 w-5" />
            </span>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-2xl font-black text-slate-800 dark:text-white">
              {metrics.total}
            </span>
            <span className="text-xs text-slate-500">Broadcasts</span>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Active Live</span>
            <span className="rounded-xl bg-emerald-50 p-2 text-emerald-600 dark:bg-emerald-950/50">
              <HiCheckCircle className="h-5 w-5" />
            </span>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-2xl font-black text-emerald-600">
              {metrics.activeCount}
            </span>
            <span className="text-xs text-slate-500">Visible to Campus</span>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Pinned to Top</span>
            <span className="rounded-xl bg-amber-50 p-2 text-amber-600 dark:bg-amber-950/50">
              <HiBookmark className="h-5 w-5" />
            </span>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-2xl font-black text-amber-600">
              {metrics.pinnedCount}
            </span>
            <span className="text-xs text-slate-500">Top Highlights</span>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Urgent Alerts</span>
            <span className="rounded-xl bg-rose-50 p-2 text-rose-600 dark:bg-rose-950/50">
              <HiExclamation className="h-5 w-5" />
            </span>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-2xl font-black text-rose-600">
              {metrics.urgentCount}
            </span>
            <span className="text-xs text-slate-500">High Priority</span>
          </div>
        </div>
      </div>

      {/* Filter Tabs & Search */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-md">
          <HiSearch className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search notice title or keywords..."
            className="w-full rounded-2xl border border-slate-200 bg-white py-3 pl-12 pr-4 text-sm font-medium text-slate-800 outline-none transition-all focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-800 dark:bg-slate-900 dark:text-white"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {CATEGORIES.map(cat => (
            <button
              key={cat.value}
              onClick={() => setSelectedCategory(cat.value)}
              className={`rounded-xl px-4 py-2.5 text-xs font-bold capitalize transition-all whitespace-nowrap ${
                selectedCategory === cat.value
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-300'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Notices Grid */}
      {loading ? (
        <div className="flex h-64 items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-indigo-500 border-t-transparent" />
        </div>
      ) : filteredNotices.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-slate-200 bg-white p-12 text-center dark:border-slate-800 dark:bg-slate-900">
          <HiSpeakerphone className="mx-auto h-12 w-12 text-slate-300 dark:text-slate-700" />
          <h3 className="mt-4 text-base font-bold text-slate-800 dark:text-white">No Notices Published</h3>
          <p className="mt-1 text-sm text-slate-500">
            {searchQuery ? 'No notice matches your search query.' : 'Post your first campus announcement to keep students informed.'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredNotices.map(notice => {
            const isUrgent = notice.priority === 'urgent';
            const categoryConfig = CATEGORIES.find(c => c.value === notice.category) || CATEGORIES[1];

            return (
              <div
                key={notice._id}
                className={`group relative flex flex-col justify-between overflow-hidden rounded-3xl border transition-all hover:shadow-lg ${
                  isUrgent
                    ? 'border-rose-200 bg-rose-50/20 dark:border-rose-900/40 dark:bg-rose-950/10'
                    : notice.isPinned
                    ? 'border-amber-200 bg-amber-50/10 dark:border-amber-900/40 dark:bg-amber-950/10'
                    : 'border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900'
                }`}
              >
                {/* Top Colored Indicator Bar */}
                <div
                  className={`h-2 w-full ${
                    isUrgent
                      ? 'bg-rose-500'
                      : notice.isPinned
                      ? 'bg-amber-500'
                      : 'bg-indigo-500'
                  }`}
                />

                <div className="p-6">
                  {/* Category & Status */}
                  <div className="flex items-center justify-between">
                    <span
                      className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-bold border ${categoryConfig.color}`}
                    >
                      {categoryConfig.label}
                    </span>

                    <div className="flex items-center gap-2">
                      {notice.isPinned && (
                        <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-600 dark:text-amber-400">
                          <IoPin className="h-4 w-4" />
                          <span>Pinned</span>
                        </span>
                      )}
                      {isUrgent && (
                        <span className="inline-flex items-center gap-1 text-xs font-bold text-rose-600 dark:text-rose-400">
                          <HiExclamation className="h-4 w-4" />
                          <span>Urgent</span>
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Title & Preview */}
                  <h3
                    onClick={() => setSelectedNotice(notice)}
                    className="mt-4 cursor-pointer text-lg font-black text-slate-800 transition-colors hover:text-indigo-600 dark:text-white dark:hover:text-indigo-400"
                  >
                    {notice.title}
                  </h3>

                  <p className="mt-2 text-sm text-slate-600 line-clamp-3 dark:text-slate-300">
                    {notice.content}
                  </p>

                  {/* Meta details */}
                  <div className="mt-5 space-y-2 border-t border-slate-100 pt-4 text-xs text-slate-400 dark:border-slate-800">
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1.5">
                        <HiCalendar className="h-4 w-4" />
                        <span>
                          {new Date(notice.publishDate).toLocaleDateString('en-US', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric'
                          })}
                        </span>
                      </span>

                      <span className="flex items-center gap-1.5">
                        <HiUsers className="h-4 w-4" />
                        <span className="capitalize">{notice.targetAudience}</span>
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-slate-500">
                      <span>Campus: {notice.branchId ? notice.branchId.name : 'Global (HQ)'}</span>
                      <span>By: {notice.createdBy?.name || 'Admin'}</span>
                    </div>
                  </div>
                </div>

                {/* Footer Controls */}
                <div className="flex items-center justify-between border-t border-slate-100 bg-slate-50/50 p-4 dark:border-slate-800 dark:bg-slate-900/80">
                  <button
                    onClick={() => setSelectedNotice(notice)}
                    className="text-xs font-bold text-indigo-600 hover:text-indigo-700 dark:text-indigo-400"
                  >
                    Read Details
                  </button>

                  {canManage && (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleTogglePin(notice._id)}
                        className={`rounded-lg p-1.5 transition-all ${
                          notice.isPinned
                            ? 'text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-950/50'
                            : 'text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                        }`}
                        title={notice.isPinned ? 'Unpin' : 'Pin to Top'}
                      >
                        {notice.isPinned ? <IoPin className="h-4 w-4" /> : <IoPinOutline className="h-4 w-4" />}
                      </button>

                      <button
                        onClick={() => handleDeleteNotice(notice._id, notice.title)}
                        className="rounded-lg p-1.5 text-slate-400 transition-all hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-950/50"
                        title="Delete Notice"
                      >
                        <HiTrash className="h-4 w-4" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Broadcast Notice Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-xl overflow-hidden rounded-3xl bg-white shadow-2xl dark:bg-slate-900 dark:border dark:border-slate-800"
            >
              <div className="flex items-center justify-between border-b border-slate-100 p-6 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="rounded-xl bg-indigo-50 p-2 text-indigo-600 dark:bg-indigo-950">
                    <HiSpeakerphone className="h-5 w-5" />
                  </span>
                  <h2 className="text-lg font-bold text-slate-800 dark:text-white">
                    Broadcast Campus Notice
                  </h2>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-xl p-2 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  <IoCloseOutline className="h-5 w-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
                {/* Title */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Notice Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={e => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g. Eid-ul-Fitr Campus Holiday Schedule"
                    className="w-full rounded-xl border border-slate-200 p-3 text-sm text-slate-800 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  />
                </div>

                {/* Category & Priority */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Notice Category
                    </label>
                    <select
                      value={formData.category}
                      onChange={e => setFormData({ ...formData, category: e.target.value })}
                      className="w-full rounded-xl border border-slate-200 p-3 text-sm text-slate-800 outline-none focus:border-indigo-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                    >
                      <option value="general">General Announcement</option>
                      <option value="academic">Academic & Class</option>
                      <option value="holiday">Campus Holiday</option>
                      <option value="exam">Exam & Assessment</option>
                      <option value="event">Workshop & Event</option>
                      <option value="urgent">Urgent Alert</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Priority Level
                    </label>
                    <select
                      value={formData.priority}
                      onChange={e => setFormData({ ...formData, priority: e.target.value })}
                      className="w-full rounded-xl border border-slate-200 p-3 text-sm text-slate-800 outline-none focus:border-indigo-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                    >
                      <option value="normal">Normal Priority</option>
                      <option value="high">High Priority</option>
                      <option value="urgent">Urgent Alert (Red Banner)</option>
                    </select>
                  </div>
                </div>

                {/* Target Audience & Expiry */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Target Audience
                    </label>
                    <select
                      value={formData.targetAudience}
                      onChange={e => setFormData({ ...formData, targetAudience: e.target.value })}
                      className="w-full rounded-xl border border-slate-200 p-3 text-sm text-slate-800 outline-none focus:border-indigo-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                    >
                      <option value="all">All (Students & Staff)</option>
                      <option value="students">Students Only</option>
                      <option value="instructors">Instructors & Mentors</option>
                      <option value="staff">Branch Staff Only</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Expiry Date (Optional)
                    </label>
                    <input
                      type="date"
                      value={formData.expiryDate}
                      onChange={e => setFormData({ ...formData, expiryDate: e.target.value })}
                      className="w-full rounded-xl border border-slate-200 p-3 text-sm text-slate-800 outline-none focus:border-indigo-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                    />
                  </div>
                </div>

                {/* Pin to Top Checkbox */}
                <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3.5 dark:border-slate-800 dark:bg-slate-800/50">
                  <input
                    type="checkbox"
                    id="isPinned"
                    checked={formData.isPinned}
                    onChange={e => setFormData({ ...formData, isPinned: e.target.checked })}
                    className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <label htmlFor="isPinned" className="text-xs font-bold text-slate-700 dark:text-slate-300 cursor-pointer">
                    Pin this notice to the top of the campus board
                  </label>
                </div>

                {/* Content */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Notice Details / Content *
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={formData.content}
                    onChange={e => setFormData({ ...formData, content: e.target.value })}
                    placeholder="Write detailed announcements, timing instructions, or emergency updates..."
                    className="w-full rounded-xl border border-slate-200 p-3 text-sm text-slate-800 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  />
                </div>

                <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-100 dark:border-slate-800">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="rounded-xl px-5 py-2.5 text-sm font-bold text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="rounded-xl bg-indigo-600 px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-indigo-500/20 transition-all hover:bg-indigo-700 disabled:opacity-50"
                  >
                    {submitting ? 'Publishing...' : 'Publish Notice'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Notice Reader Modal */}
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
                  <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-bold text-indigo-700 dark:bg-indigo-950/50 dark:text-indigo-400 capitalize">
                    {selectedNotice.category} Notice
                  </span>
                  <h2 className="mt-3 text-2xl font-black text-slate-800 dark:text-white">
                    {selectedNotice.title}
                  </h2>
                  <p className="mt-1 text-xs text-slate-400">
                    Published on {new Date(selectedNotice.publishDate).toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })} • {selectedNotice.branchId?.name || 'Smart Youth ICT HQ'}
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
                  className="rounded-xl bg-slate-100 px-6 py-2.5 text-sm font-bold text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-white"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
