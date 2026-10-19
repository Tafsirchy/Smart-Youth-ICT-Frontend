'use client';

import { useState, useEffect, useTransition } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearchParams } from 'next/navigation';
import api from '@/lib/api';
import toast from 'react-hot-toast';
import {
  IoCalendarOutline,
  IoLocationOutline,
  IoTimeOutline,
  IoPersonOutline,
  IoCallOutline,
  IoMailOutline,
  IoSchoolOutline,
  IoBusinessOutline,
  IoVideocamOutline,
  IoCheckmarkCircle,
  IoSparklesOutline,
  IoShieldCheckmarkOutline
} from 'react-icons/io5';

const TIME_SLOTS = [
  '10:00 AM - 11:00 AM',
  '11:30 AM - 12:30 PM',
  '02:30 PM - 03:30 PM',
  '04:00 PM - 05:00 PM',
  '06:00 PM - 07:00 PM',
];

const PERKS = [
  { icon: '🎯', title: '1-to-1 Career Roadmap', desc: 'Direct session with senior mentors tailored to your background.' },
  { icon: '💻', title: 'Physical Lab & Campus Tour', desc: 'Experience high-spec lab PCs, high-speed fiber internet, and facilities.' },
  { icon: '🎁', title: 'Scholarship Eligibility Assessment', desc: 'Up to 50% waiver check based on test or academic background.' },
  { icon: '🚀', title: 'Freelancing & Job Placement Advice', desc: 'Learn marketplace demand, batch schedules, and internship opportunities.' },
];

export default function BookCounselingPage() {
  const searchParams = useSearchParams();
  const preBranch = searchParams?.get('branch') || '';

  const [branches, setBranches] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loadingBranches, setLoadingBranches] = useState(true);

  const [form, setForm] = useState({
    fullName: '',
    phone: '',
    email: '',
    branchId: '',
    interestedCourse: '',
    preferredDate: '',
    preferredSlot: '11:30 AM - 12:30 PM',
    mode: 'in-person',
  });

  const [submitting, setSubmitting] = useState(false);
  const [bookedSession, setBookedSession] = useState(null);

  useEffect(() => {
    Promise.all([
      api.get('/branches').catch(() => ({ data: { data: [] } })),
      api.get('/courses', { params: { limit: 50 } }).catch(() => ({ data: { data: [] } })),
    ]).then(([bRes, cRes]) => {
      const bList = bRes.data?.data || [];
      setBranches(bList);
      setCourses(cRes.data?.data || cRes.data?.courses || []);

      if (bList.length > 0) {
        const found = preBranch
          ? bList.find((b) => b.slug === preBranch || b.code === preBranch.toUpperCase() || b._id === preBranch)
          : null;
        setForm((prev) => ({ ...prev, branchId: found ? found._id : bList[0]._id }));
      }
    }).finally(() => setLoadingBranches(false));
  }, [preBranch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.fullName || !form.phone || !form.branchId || !form.preferredDate) {
      toast.error('Please fill in all required fields.');
      return;
    }

    try {
      setSubmitting(true);
      const res = await api.post('/counseling/book', form);
      if (res.data?.success) {
        setBookedSession(res.data.data);
        toast.success('Counseling session booked successfully!');
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to book session. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const selectedBranchData = branches.find((b) => b._id === form.branchId);

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 pt-28 pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ── Hero Section ── */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-1.5 px-3 py-1 bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300 rounded-full text-xs font-semibold uppercase tracking-wider mb-3"
          >
            <IoSparklesOutline size={15} /> Free 1-on-1 Consultation
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 dark:text-white tracking-tight leading-tight"
          >
            Meet With An Expert At Your Preferred Branch
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-base text-gray-600 dark:text-gray-400 mt-3"
          >
            Confused about which tech career fits your skills? Book a complimentary 1-on-1 counseling session with our senior branch mentors.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* ── Left Column: Benefits & Branch Info ── */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <IoShieldCheckmarkOutline className="text-purple-600" size={22} />
                What You Receive in the Session
              </h3>
              <div className="space-y-4">
                {PERKS.map((p, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <span className="text-xl p-2 bg-purple-50 dark:bg-purple-900/30 rounded-xl shrink-0">
                      {p.icon}
                    </span>
                    <div>
                      <h4 className="text-sm font-semibold text-gray-900 dark:text-white">
                        {p.title}
                      </h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 leading-relaxed">
                        {p.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {selectedBranchData && (
              <div className="bg-gradient-to-br from-indigo-900 to-purple-950 text-white rounded-2xl p-6 shadow-lg border border-indigo-800">
                <div className="flex items-center gap-2 text-indigo-300 text-xs font-semibold uppercase tracking-wider mb-2">
                  <IoBusinessOutline size={16} /> Campus Location
                </div>
                <h4 className="text-xl font-bold">{selectedBranchData.name} Branch</h4>
                <p className="text-xs text-indigo-200 mt-2 flex items-start gap-1.5">
                  <IoLocationOutline size={18} className="shrink-0 text-indigo-300 mt-0.5" />
                  {selectedBranchData.address || 'Smart Youth ICT Campus, Dhaka'}
                </p>
                {selectedBranchData.phone && (
                  <p className="text-xs text-indigo-200 mt-2 flex items-center gap-1.5 font-mono">
                    <IoCallOutline size={16} className="text-indigo-300" />
                    {selectedBranchData.phone}
                  </p>
                )}
              </div>
            )}
          </div>

          {/* ── Right Column: Booking Form or Success State ── */}
          <div className="lg:col-span-7">
            <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 sm:p-8 shadow-sm">
              <AnimatePresence mode="wait">
                {bookedSession ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="text-center py-8 space-y-4"
                  >
                    <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto shadow-inner">
                      <IoCheckmarkCircle size={38} />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                      Appointment Confirmed! 🎉
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 max-w-md mx-auto">
                      Thank you <span className="font-semibold text-gray-900 dark:text-white">{bookedSession.fullName}</span>. We have scheduled your 1-on-1 counseling appointment.
                    </p>

                    <div className="bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-700 rounded-xl p-4 max-w-sm mx-auto text-left text-xs space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Branch:</span>
                        <span className="font-semibold text-gray-800 dark:text-gray-200">{bookedSession.branchId?.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Date:</span>
                        <span className="font-semibold text-gray-800 dark:text-gray-200">
                          {new Date(bookedSession.preferredDate).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Time:</span>
                        <span className="font-semibold text-gray-800 dark:text-gray-200">{bookedSession.preferredSlot}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Mode:</span>
                        <span className="font-semibold capitalize text-purple-600 dark:text-purple-400">
                          {bookedSession.mode === 'in-person' ? 'Physical Branch Visit' : 'Online Meet'}
                        </span>
                      </div>
                    </div>

                    <p className="text-xs text-gray-500">
                      Our branch counselor will call your phone (<span className="font-mono font-medium">{bookedSession.phone}</span>) for final confirmation.
                    </p>

                    <button
                      onClick={() => setBookedSession(null)}
                      className="mt-4 px-6 py-2.5 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-xs font-semibold rounded-lg hover:opacity-90 transition"
                    >
                      Book Another Session
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-5"
                  >
                    <div>
                      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                        Schedule Your 1-on-1 Session
                      </h2>
                      <p className="text-xs text-gray-500">
                        Fill in your details below. Sessions are 100% free with no commitment required.
                      </p>
                    </div>

                    {/* Mode Picker */}
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        How would you like to attend?
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        <label
                          className={`flex items-center gap-3 p-3.5 rounded-xl border text-xs font-semibold cursor-pointer transition ${
                            form.mode === 'in-person'
                              ? 'border-purple-600 bg-purple-50 dark:bg-purple-900/30 text-purple-900 dark:text-purple-200 shadow-sm'
                              : 'border-neutral-200 dark:border-neutral-800 text-gray-600 dark:text-gray-400 hover:bg-neutral-50 dark:hover:bg-neutral-800'
                          }`}
                        >
                          <input
                            type="radio"
                            name="mode"
                            value="in-person"
                            checked={form.mode === 'in-person'}
                            onChange={() => setForm({ ...form, mode: 'in-person' })}
                            className="hidden"
                          />
                          <IoBusinessOutline size={20} className="text-purple-600" />
                          <div>
                            <div>Visit Campus</div>
                            <div className="text-[11px] font-normal text-gray-400">Physical lab tour</div>
                          </div>
                        </label>

                        <label
                          className={`flex items-center gap-3 p-3.5 rounded-xl border text-xs font-semibold cursor-pointer transition ${
                            form.mode === 'online'
                              ? 'border-purple-600 bg-purple-50 dark:bg-purple-900/30 text-purple-900 dark:text-purple-200 shadow-sm'
                              : 'border-neutral-200 dark:border-neutral-800 text-gray-600 dark:text-gray-400 hover:bg-neutral-50 dark:hover:bg-neutral-800'
                          }`}
                        >
                          <input
                            type="radio"
                            name="mode"
                            value="online"
                            checked={form.mode === 'online'}
                            onChange={() => setForm({ ...form, mode: 'online' })}
                            className="hidden"
                          />
                          <IoVideocamOutline size={20} className="text-purple-600" />
                          <div>
                            <div>Online Meet</div>
                            <div className="text-[11px] font-normal text-gray-400">Google Meet link</div>
                          </div>
                        </label>
                      </div>
                    </div>

                    {/* Branch Selection */}
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                        Select Campus / Branch *
                      </label>
                      <select
                        required
                        value={form.branchId}
                        onChange={(e) => setForm({ ...form, branchId: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-xs bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl focus:ring-2 focus:ring-purple-500 focus:outline-none dark:text-white"
                      >
                        {branches.map((b) => (
                          <option key={b._id} value={b._id}>
                            {b.name} ({b.code}) — {b.city || 'Dhaka'}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Personal Details */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Your Name"
                          value={form.fullName}
                          onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                          className="w-full px-3.5 py-2.5 text-xs bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl focus:ring-2 focus:ring-purple-500 focus:outline-none dark:text-white"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                          Phone Number (WhatsApp) *
                        </label>
                        <input
                          type="tel"
                          required
                          placeholder="01XXXXXXXXX"
                          value={form.phone}
                          onChange={(e) => setForm({ ...form, phone: e.target.value })}
                          className="w-full px-3.5 py-2.5 text-xs bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl focus:ring-2 focus:ring-purple-500 focus:outline-none dark:text-white"
                        />
                      </div>
                    </div>

                    {/* Email & Course */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                          Email Address (Optional)
                        </label>
                        <input
                          type="email"
                          placeholder="name@email.com"
                          value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          className="w-full px-3.5 py-2.5 text-xs bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl focus:ring-2 focus:ring-purple-500 focus:outline-none dark:text-white"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                          Interested Course
                        </label>
                        <select
                          value={form.interestedCourse}
                          onChange={(e) => setForm({ ...form, interestedCourse: e.target.value })}
                          className="w-full px-3.5 py-2.5 text-xs bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl focus:ring-2 focus:ring-purple-500 focus:outline-none dark:text-white"
                        >
                          <option value="">General Career Exploration</option>
                          {courses.map((c) => (
                            <option key={c._id} value={c._id}>
                              {c.title}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Date & Time Slot */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                          Preferred Date *
                        </label>
                        <input
                          type="date"
                          required
                          min={new Date().toISOString().split('T')[0]}
                          value={form.preferredDate}
                          onChange={(e) => setForm({ ...form, preferredDate: e.target.value })}
                          className="w-full px-3.5 py-2.5 text-xs bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl focus:ring-2 focus:ring-purple-500 focus:outline-none dark:text-white"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                          Preferred Time Slot *
                        </label>
                        <select
                          value={form.preferredSlot}
                          onChange={(e) => setForm({ ...form, preferredSlot: e.target.value })}
                          className="w-full px-3.5 py-2.5 text-xs bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl focus:ring-2 focus:ring-purple-500 focus:outline-none dark:text-white"
                        >
                          {TIME_SLOTS.map((s) => (
                            <option key={s} value={s}>
                              {s}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full py-3.5 px-6 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold rounded-xl shadow-md transition disabled:opacity-50 text-sm"
                    >
                      {submitting ? 'Confirming Appointment...' : 'Confirm Free 1-on-1 Counseling'}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
