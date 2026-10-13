'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '@/lib/api';
import toast from 'react-hot-toast';
import {
  IoCalendarOutline,
  IoPeopleOutline,
  IoLocationOutline,
  IoCheckmarkCircle,
  IoArrowForwardOutline,
  IoTimeOutline,
  IoVideocamOutline,
  IoBusinessOutline,
} from 'react-icons/io5';

const DEFAULT_SEMINARS = [
  { id: 'web', title: '💻 Web Development — Free Career Seminar' },
  { id: 'smm', title: '📣 Digital Marketing — Free Career Seminar' },
  { id: 'design', title: '🎨 Graphic Design — Free Career Seminar' },
  { id: 'ai', title: '🤖 AI & Freelancing — Free Career Seminar' },
];

const SOURCES = [
  'Facebook / Social Media',
  'Friend / Referral',
  'Google Search',
  'YouTube',
  'WhatsApp',
  'Campus Poster / Banner',
  'Other',
];

const BENEFITS = [
  { icon: '🎯', text: 'Live guidance & 1:1 Q&A with industry leads' },
  { icon: '🏆', text: 'Verified Certificate of participation' },
  { icon: '💼', text: 'Real marketplace freelance income roadmaps' },
  { icon: '🆓', text: '100% free of charge — no hidden fees' },
];

export default function SeminarPage() {
  const [branches, setBranches] = useState([]);
  const [dynamicSeminars, setDynamicSeminars] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState('all');

  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    branchId: '',
    seminarId: '',
    seminar: '',
    source: '',
  });

  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  // Fetch branches and seminars on mount
  useEffect(() => {
    api
      .get('/branches/public/list')
      .then((res) => {
        if (res.data?.success) setBranches(res.data.data || []);
      })
      .catch(() => {});

    api
      .get('/seminars', { params: { status: 'upcoming', limit: 100 } })
      .then((res) => {
        if (res.data?.success) setDynamicSeminars(res.data.data || []);
      })
      .catch(() => {});
  }, []);

  // Filter available seminars based on selected branch
  const availableSeminars = useMemo(() => {
    if (!dynamicSeminars.length) return DEFAULT_SEMINARS;

    let list = dynamicSeminars;
    if (selectedBranch && selectedBranch !== 'all') {
      list = dynamicSeminars.filter(
        (s) => s.branchId?._id === selectedBranch || s.branchId === selectedBranch
      );
    }

    if (list.length === 0) return DEFAULT_SEMINARS;
    return list;
  }, [dynamicSeminars, selectedBranch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleBranchChange = (e) => {
    const bId = e.target.value;
    setSelectedBranch(bId);
    setForm((prev) => ({
      ...prev,
      branchId: bId === 'all' ? '' : bId,
      seminar: '',
      seminarId: '',
    }));
  };

  const handleSeminarSelect = (e) => {
    const val = e.target.value;
    const found = availableSeminars.find((s) => s._id === val || s.title === val || s.id === val);
    setForm((prev) => ({
      ...prev,
      seminarId: found?._id || '',
      seminar: found?.title || val,
      branchId: found?.branchId?._id || prev.branchId || '',
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.seminar) {
      toast.error('Please select a seminar to attend.');
      return;
    }
    setLoading(true);
    try {
      await api.post('/seminars/register', form);
      setDone(true);
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans">
      {/* ── Hero ── */}
      <section className="relative pt-32 pb-20 px-4 text-center bg-white border-b border-slate-100">
        <div className="relative z-10 max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="w-8 h-[1px] bg-slate-300"></div>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-600 bg-cyan-50 px-3 py-1 rounded-full border border-cyan-100">
              Free Career Events
            </span>
            <div className="w-8 h-[1px] bg-slate-300"></div>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-light text-slate-900 leading-[1.08] tracking-tight mb-8">
            Join Our Free <br />
            <span className="font-extrabold bg-gradient-to-r from-slate-900 via-cyan-800 to-blue-700 bg-clip-text text-transparent">
              Branch Career Seminars.
            </span>
          </h1>

          <p className="text-slate-500 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto font-light mb-12">
            Arranged directly across all our regional campus branches and online — discover how to launch your IT career in just 2 hours.
          </p>

          {/* Quick meta stats */}
          <div className="flex flex-wrap justify-center gap-6 text-xs sm:text-sm text-slate-600 font-semibold">
            <span className="flex items-center gap-2">
              <IoCalendarOutline className="text-cyan-600" size={18} /> Regular Campus Schedules
            </span>
            <span className="flex items-center gap-2">
              <IoTimeOutline className="text-cyan-600" size={18} /> 2-Hour Intensive Workshop
            </span>
            <span className="flex items-center gap-2">
              <IoLocationOutline className="text-rose-500" size={18} /> In-Person & Online Hybrid
            </span>
            <span className="flex items-center gap-2">
              <IoPeopleOutline className="text-indigo-600" size={18} /> Limited Reserved Seats
            </span>
          </div>
        </div>
      </section>

      {/* ── Content ── */}
      <div className="container-lg mx-auto px-4 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start max-w-6xl mx-auto">
          {/* Left — Benefits */}
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-8 tracking-tight">
              What You&apos;ll Get from this Session 🎁
            </h2>

            <div className="space-y-4 mb-12">
              {BENEFITS.map((b, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-5 bg-white border border-slate-100 p-6 hover:border-slate-300 hover:shadow-md transition-all duration-300 rounded-2xl"
                >
                  <span className="text-3xl shrink-0">{b.icon}</span>
                  <span className="font-semibold text-slate-700 text-sm md:text-base">{b.text}</span>
                </motion.div>
              ))}
            </div>

            {/* Social proof */}
            <div className="bg-slate-900 p-8 md:p-10 text-white rounded-3xl shadow-xl space-y-3">
              <p className="font-bold text-2xl tracking-tight text-white flex items-center gap-2">
                <span>🚀 Join 5,000+ Students</span>
              </p>
              <p className="text-slate-400 font-normal leading-relaxed text-sm">
                Students across Bogura, Chattogram, Khulna, Mirpur, Cumilla, and beyond kickstart their tech journey through our branch seminars.
              </p>
            </div>
          </div>

          {/* Right — Registration Form */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white border border-slate-200 p-8 md:p-12 rounded-3xl shadow-xl shadow-slate-200/50"
          >
            <AnimatePresence mode="wait">
              {done ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8 space-y-4"
                >
                  <div className="w-20 h-20 mx-auto bg-emerald-50 border border-emerald-100 flex items-center justify-center rounded-full text-emerald-600">
                    <IoCheckmarkCircle size={56} />
                  </div>
                  <h3 className="text-3xl font-extrabold text-slate-900 tracking-tight">You&apos;re Registered! 🎉</h3>
                  <p className="text-slate-600 max-w-sm mx-auto leading-relaxed text-sm">
                    Thank you! Your seat has been reserved. Our branch campus coordinator will contact you with details and timing.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setDone(false);
                      setForm({
                        name: '',
                        phone: '',
                        email: '',
                        branchId: '',
                        seminarId: '',
                        seminar: '',
                        source: '',
                      });
                    }}
                    className="inline-flex items-center gap-2 text-xs font-bold text-cyan-700 hover:underline pt-4"
                  >
                    Register another attendee →
                  </button>
                </motion.div>
              ) : (
                <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <div className="mb-8">
                    <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">Reserve Your Free Seat 👇</h3>
                    <p className="text-slate-500 text-sm mt-1">Takes less than 60 seconds. 100% free entry.</p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Branch Selection */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                        Preferred Campus / Branch *
                      </label>
                      <div className="relative">
                        <select
                          name="branchId"
                          value={selectedBranch}
                          onChange={handleBranchChange}
                          className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:border-cyan-600 focus:bg-white transition"
                        >
                          <option value="all">🌐 All Campuses / Online Sessions</option>
                          {branches.map((b) => (
                            <option key={b._id} value={b._id}>
                              🏢 {b.name} ({b.code || b.city})
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Choose Seminar */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                        Select Seminar Event *
                      </label>
                      <select
                        name="seminar"
                        required
                        value={form.seminarId || form.seminar}
                        onChange={handleSeminarSelect}
                        className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold focus:outline-none focus:border-cyan-600 focus:bg-white transition"
                      >
                        <option value="">— Select an upcoming seminar —</option>
                        {availableSeminars.map((s) => (
                          <option key={s._id || s.id} value={s._id || s.title || s.label}>
                            {s.title || s.label}{' '}
                            {s.date ? `(${s.date}${s.venue ? ` • ${s.venue}` : ''})` : ''}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Full Name */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        name="name"
                        required
                        type="text"
                        placeholder="e.g. Shakil Ahmed"
                        className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-cyan-600 focus:bg-white transition"
                        value={form.name}
                        onChange={handleChange}
                      />
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                        Mobile Phone Number *
                      </label>
                      <input
                        name="phone"
                        required
                        type="tel"
                        placeholder="01XXXXXXXXX"
                        className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-cyan-600 focus:bg-white transition"
                        value={form.phone}
                        onChange={handleChange}
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                        Email Address (optional)
                      </label>
                      <input
                        name="email"
                        type="email"
                        placeholder="you@email.com"
                        className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-cyan-600 focus:bg-white transition"
                        value={form.email}
                        onChange={handleChange}
                      />
                    </div>

                    {/* Source */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                        How did you hear about us?
                      </label>
                      <select
                        name="source"
                        className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-cyan-600 focus:bg-white transition"
                        value={form.source}
                        onChange={handleChange}
                      >
                        <option value="">— Select source —</option>
                        {SOURCES.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-4 mt-4 bg-gradient-to-r from-slate-900 to-cyan-900 hover:from-black hover:to-cyan-800 text-white font-bold text-sm uppercase tracking-widest flex items-center justify-center gap-3 rounded-xl transition shadow-lg shadow-slate-900/20 active:scale-95 disabled:opacity-50"
                    >
                      {loading ? (
                        <>
                          <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                          </svg>
                          <span>Reserving Seat…</span>
                        </>
                      ) : (
                        <>
                          <IoArrowForwardOutline size={18} />
                          <span>Reserve My Free Seat</span>
                        </>
                      )}
                    </button>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
