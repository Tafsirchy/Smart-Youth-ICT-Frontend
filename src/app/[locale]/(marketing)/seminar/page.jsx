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
 const [done, setDone] = useState(false);

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
 <div className="min-h-screen flex flex-col bg-slate-50 font-sans">

 {/* ── Hero ── */}
 <section className="relative pt-32 pb-20 px-4 text-center bg-white border-b border-slate-100">
 <div className="relative z-10 max-w-3xl mx-auto">
 <div className="flex items-center justify-center gap-4 mb-8">
 <div className="w-8 h-[1px] bg-slate-300"></div>
 <span className="text-xs font-medium uppercase tracking-[0.2em] text-slate-500">
 Free Event
 </span>
 <div className="w-8 h-[1px] bg-slate-300"></div>
 </div>
 <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-slate-900 leading-[1.05] tracking-tight mb-8">
 Join Our Free <br />
 <span className="font-semibold">Career Seminar.</span>
 </h1>
 <p className="text-slate-500 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto font-light mb-12">
 Discover how to launch your IT career and earn from freelancing — completely free, in just 2 hours.
 </p>
 {/* Quick meta */}
 <div className="flex flex-wrap justify-center gap-6 text-sm text-slate-600 font-medium">
 <span className="flex items-center gap-2"><IoCalendarOutline size={18} /> Every Saturday</span>
 <span className="flex items-center gap-2"><IoTimeOutline size={18} /> 10:00 AM – 12:00 PM</span>
 <span className="flex items-center gap-2"><IoLocationOutline size={18} /> Online (Zoom)</span>
 <span className="flex items-center gap-2"><IoPeopleOutline size={18} /> Limited seats</span>
 </div>
 </div>
 </section>

 {/* ── Content ── */}
 <div className="container-lg mx-auto px-4 py-16 md:py-24">
 <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start max-w-6xl mx-auto">

 {/* Left — Benefits */}
 <div>
 <h2 className="text-2xl md:text-3xl font-medium text-slate-900 mb-8 tracking-tight">What You'll Get 🎁</h2>
 <div className="space-y-4 mb-12">
 {BENEFITS.map((b, i) => (
 <motion.div key={i}
 initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
 className="flex items-center gap-5 bg-white border border-slate-100 p-6 hover:border-slate-200 hover:shadow-sm transition-all duration-300 rounded-lg">
 <span className="text-3xl">{b.icon}</span>
 <span className="font-medium text-slate-700">{b.text}</span>
 </motion.div>
 ))}
 </div>

 {/* Social proof */}
 <div className="bg-slate-900 p-8 md:p-10 text-white rounded-lg">
 <p className="font-medium text-2xl mb-2 tracking-tight">🚀 Join 5,000+ Students</p>
 <p className="text-slate-400 font-light leading-relaxed">
 Who kickstarted their IT career with SYICT's free seminar. Your journey starts with one click.
 </p>
 </div>
 </div>

 {/* Right — Registration Form */}
 <motion.div
 initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
 className="bg-white border border-slate-200 p-8 md:p-12 rounded-lg"
 >
 <AnimatePresence mode="wait">
 {done ? (
 <motion.div key="success" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-8">
 <div className="w-24 h-24 mx-auto bg-slate-50 border border-slate-100 flex items-center justify-center mb-6 rounded-lg">
 <IoCheckmarkCircle size={56} className="text-slate-900" />
 </div>
 <h3 className="text-3xl font-medium text-slate-900 mb-4 tracking-tight">You're Registered! 🎉</h3>
 <p className="text-slate-500 font-light max-w-sm mx-auto leading-relaxed">
 We'll send your Zoom link to your phone/email shortly. See you on Saturday!
 </p>
 </motion.div>
 ) : (
 <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
 <h3 className="text-2xl font-medium text-slate-900 mb-2 tracking-tight">Register for Free 👇</h3>
 <p className="text-slate-500 font-light text-sm mb-8">Takes less than 60 seconds. No credit card needed.</p>
 <form onSubmit={handleSubmit} className="space-y-5">
 <div>
 <label className="block text-xs font-medium uppercase tracking-widest text-slate-500 mb-2">Full Name *</label>
 <input name="name" required type="text" placeholder="Your full name"
 className="w-full p-4 bg-slate-50 border border-slate-200 focus:outline-none focus:border-slate-400 focus:bg-white transition-colors rounded-md" value={form.name} onChange={handleChange} />
 </div>
 <div>
 <label className="block text-xs font-medium uppercase tracking-widest text-slate-500 mb-2">Phone Number *</label>
 <input name="phone" required type="tel" placeholder="01XXXXXXXXX"
 className="w-full p-4 bg-slate-50 border border-slate-200 focus:outline-none focus:border-slate-400 focus:bg-white transition-colors rounded-md" value={form.phone} onChange={handleChange} />
 </div>
 <div>
 <label className="block text-xs font-medium uppercase tracking-widest text-slate-500 mb-2">Email (optional)</label>
 <input name="email" type="email" placeholder="you@email.com"
 className="w-full p-4 bg-slate-50 border border-slate-200 focus:outline-none focus:border-slate-400 focus:bg-white transition-colors rounded-md" value={form.email} onChange={handleChange} />
 </div>
 <div>
 <label className="block text-xs font-medium uppercase tracking-widest text-slate-500 mb-2">Choose Seminar *</label>
 <select name="seminar" required className="w-full p-4 bg-slate-50 border border-slate-200 focus:outline-none focus:border-slate-400 focus:bg-white transition-colors appearance-none" value={form.seminar} onChange={handleChange}>
 <option value="">— Select a seminar —</option>
 {SEMINARS.map(s => <option key={s.id} value={s.label}>{s.label}</option>)}
 </select>
 </div>
 <div>
 <label className="block text-xs font-medium uppercase tracking-widest text-slate-500 mb-2">How did you hear about us?</label>
 <select name="source" className="w-full p-4 bg-slate-50 border border-slate-200 focus:outline-none focus:border-slate-400 focus:bg-white transition-colors appearance-none" value={form.source} onChange={handleChange}>
 <option value="">— Select source —</option>
 {SOURCES.map(s => <option key={s} value={s}>{s}</option>)}
 </select>
 </div>
 <button type="submit" disabled={loading}
 className="w-full py-4 mt-4 bg-slate-900 text-white font-medium text-sm uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-slate-800 transition-colors disabled:bg-slate-300 disabled:text-slate-500 rounded-md">
 {loading
 ? <><svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" /></svg> Registering…</>
 : <><IoArrowForwardOutline size={18} /> Register Now — It's Free!</>
 }
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
