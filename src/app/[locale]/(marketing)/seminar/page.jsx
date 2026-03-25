'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '@/lib/api';
import toast from 'react-hot-toast';
import {
  IoCalendarOutline, IoPeopleOutline, IoLocationOutline,
  IoCheckmarkCircle, IoArrowForwardOutline, IoTimeOutline
} from 'react-icons/io5';

const SEMINARS = [
  { id: 'web', label: '💻 Web Development — Free Career Seminar' },
  { id: 'smm', label: '📣 Digital Marketing — Free Career Seminar' },
  { id: 'design', label: '🎨 Graphic Design — Free Career Seminar' },
  { id: 'ai', label: '🤖 AI & Freelancing — Free Career Seminar' },
];

const SOURCES = ['Facebook / Social Media', 'Friend / Referral', 'Google Search', 'YouTube', 'WhatsApp', 'Other'];

const BENEFITS = [
  { icon: '🎯', text: 'Live Q&A with industry experts' },
  { icon: '🏆', text: 'Certificate of participation' },
  { icon: '💼', text: 'Real freelancing income tips' },
  { icon: '🆓', text: '100% free — no hidden costs' },
];

export default function SeminarPage() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', seminar: '', source: '' });
  const [loading, setLoading] = useState(false);
  const [done, setDone]       = useState(false);

  const handleChange = e => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.seminar) { toast.error('Please select a seminar.'); return; }
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
    <div className="min-h-screen" style={{ background: 'var(--color-background)' }}>

      {/* ── Hero ── */}
      <section className="relative overflow-hidden py-20 px-4 text-center"
        style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 60%, #312e81 100%)' }}>
        <motion.div className="absolute -top-20 -left-20 w-80 h-80 rounded-full opacity-20 blur-3xl pointer-events-none"
          style={{ background: 'var(--color-brand-pink)' }}
          animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 8, repeat: Infinity }} />
        <div className="relative z-10 max-w-2xl mx-auto">
          <span className="inline-block mb-4 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider text-indigo-200 bg-white/10 border border-white/10">
            🎓 Free Event
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
            Join Our Free Career Seminar
          </h1>
          <p className="text-indigo-200 text-lg mb-8">
            Discover how to launch your IT career and earn from freelancing — completely free, in just 2 hours.
          </p>
          {/* Quick meta */}
          <div className="flex flex-wrap justify-center gap-5 text-sm text-indigo-200">
            <span className="flex items-center gap-1.5"><IoCalendarOutline size={16} /> Every Saturday</span>
            <span className="flex items-center gap-1.5"><IoTimeOutline size={16} /> 10:00 AM – 12:00 PM</span>
            <span className="flex items-center gap-1.5"><IoLocationOutline size={16} /> Online (Zoom)</span>
            <span className="flex items-center gap-1.5"><IoPeopleOutline size={16} /> Limited seats</span>
          </div>
        </div>
      </section>

      {/* ── Content ── */}
      <div className="container-lg mx-auto px-4 py-14">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

          {/* Left — Benefits */}
          <div>
            <h2 className="text-2xl font-extrabold text-textPrimary mb-6">What You'll Get 🎁</h2>
            <div className="space-y-4 mb-10">
              {BENEFITS.map((b, i) => (
                <motion.div key={i}
                  initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-4 bg-white rounded-2xl ring-1 ring-neutral-200 shadow-sm p-5">
                  <span className="text-2xl">{b.icon}</span>
                  <span className="font-semibold text-textPrimary">{b.text}</span>
                </motion.div>
              ))}
            </div>

            {/* Social proof */}
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-6 text-white">
              <p className="font-bold text-lg mb-1">🚀 Join 5,000+ Students</p>
              <p className="text-blue-100 text-sm leading-relaxed">
                Who kickstarted their IT career with SYICT's free seminar. Your journey starts with one click.
              </p>
            </div>
          </div>

          {/* Right — Registration Form */}
          <motion.div
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
            className="bg-white rounded-3xl ring-1 ring-neutral-200 shadow-xl p-8"
          >
            <AnimatePresence mode="wait">
              {done ? (
                <motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-6">
                  <div className="w-20 h-20 mx-auto rounded-full bg-emerald-50 flex items-center justify-center mb-5">
                    <IoCheckmarkCircle size={48} className="text-emerald-500" />
                  </div>
                  <h3 className="text-2xl font-extrabold text-textPrimary mb-2">You're Registered! 🎉</h3>
                  <p className="text-textSecondary text-sm max-w-sm mx-auto">
                    We'll send your Zoom link to your phone/email shortly. See you on Saturday!
                  </p>
                </motion.div>
              ) : (
                <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <h3 className="text-xl font-extrabold text-textPrimary mb-1">Register for Free 👇</h3>
                  <p className="text-textSecondary text-sm mb-7">Takes less than 60 seconds. No credit card needed.</p>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-textPrimary mb-1.5">Full Name *</label>
                      <input name="name" required type="text" placeholder="Your full name"
                        className="input w-full" value={form.name} onChange={handleChange} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-textPrimary mb-1.5">Phone Number *</label>
                      <input name="phone" required type="tel" placeholder="01XXXXXXXXX"
                        className="input w-full" value={form.phone} onChange={handleChange} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-textPrimary mb-1.5">Email (optional)</label>
                      <input name="email" type="email" placeholder="you@email.com"
                        className="input w-full" value={form.email} onChange={handleChange} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-textPrimary mb-1.5">Choose Seminar *</label>
                      <select name="seminar" required className="input w-full" value={form.seminar} onChange={handleChange}>
                        <option value="">— Select a seminar —</option>
                        {SEMINARS.map(s => <option key={s.id} value={s.id}>{s.label}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-textPrimary mb-1.5">How did you hear about us?</label>
                      <select name="source" className="input w-full" value={form.source} onChange={handleChange}>
                        <option value="">— Select source —</option>
                        {SOURCES.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>
                    <motion.button type="submit" disabled={loading}
                      className="w-full py-4 mt-2 rounded-2xl bg-gradient-to-r from-pink-500 to-indigo-500 text-white font-bold text-base flex items-center justify-center gap-2 hover:opacity-90 transition disabled:opacity-60"
                      whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.97 }}>
                      {loading
                        ? <><svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" /></svg> Registering…</>
                        : <><IoArrowForwardOutline size={18} /> Register Now — It's Free!</>
                      }
                    </motion.button>
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
