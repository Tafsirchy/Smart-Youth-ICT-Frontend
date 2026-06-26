'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '@/lib/api';
import toast from 'react-hot-toast';
import {
  IoCallOutline, IoMailOutline, IoLocationOutline,
  IoLogoWhatsapp, IoSendOutline, IoCheckmarkCircle,
  IoTimeOutline
} from 'react-icons/io5';
import { FaFacebook, FaYoutube } from 'react-icons/fa';

const CONTACT_INFO = [
  { icon: IoCallOutline, label: 'Phone / WhatsApp', value: '01822-335566', href: 'tel:01822-335566' },
  { icon: IoMailOutline, label: 'Email', value: 'smartyouthictbd@gmail.com', href: 'mailto:smartyouthictbd@gmail.com' },
  { icon: IoLocationOutline, label: 'Office', value: 'Plot 18 (Flat 5/A), Road 2, Sector 15, Uttara, Dhaka', href: null },
  { icon: IoTimeOutline, label: 'Office Hours', value: 'Sat–Thu, 9AM – 9PM', href: null },
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const handleChange = e => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/contact', form);
      setDone(true);
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Message failed to send. Please try WhatsApp instead.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pb-24 md:pb-0 flex flex-col" style={{ background: 'var(--color-background)' }}>

      {/* ── Hero ── */}
      <section className="relative overflow-hidden py-16 text-center"
        style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 60%, #312e81 100%)' }}>
        <motion.div className="absolute -top-20 -left-20 w-72 h-72 rounded-full opacity-15 blur-3xl pointer-events-none"
          style={{ background: 'var(--color-brand-pink)' }}
          animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 8, repeat: Infinity }} />
        <div className="container-custom relative z-10">
          <div className="max-w-xl mx-auto">
            <span className="inline-block mb-4 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider text-indigo-200 bg-white/10 border border-white/10">
              📞 Get In Touch
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white leading-[1.1] mb-8 tracking-tighter">
              Contact <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-blue-500 animate-gradient-x">Us</span>
            </h1>
            <p className="text-indigo-200 text-lg">We're here to help. Reach us via WhatsApp, email, or the form below.</p>
          </div>
        </div>
      </section>

      {/* ── Content ── */}
      <div className="container-custom py-14">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

          {/* Left — Info */}
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-extrabold text-textPrimary mb-5">Get In Touch 👋</h2>
              <div className="space-y-4">
                {CONTACT_INFO.map(c => (
                  <motion.div key={c.label} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                    className="flex items-center gap-4 bg-white rounded-2xl ring-1 ring-neutral-200 shadow-sm p-4">
                    <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                      <c.icon size={22} />
                    </div>
                    <div>
                      <p className="text-sm text-textSecondary font-medium">{c.label}</p>
                      {c.href ? (
                        <a href={c.href} target="_blank" rel="noreferrer"
                          className="font-semibold text-textPrimary hover:text-blue-600 transition-colors">{c.value}</a>
                      ) : (
                        <p className="font-semibold text-textPrimary">{c.value}</p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Social links */}
            <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl p-5 text-white">
              <p className="font-bold mb-1 flex items-center gap-2"><IoLogoWhatsapp size={20} /> Fast Response on WhatsApp</p>
              <p className="text-sm text-emerald-100 mb-4">Message us directly — we typically respond within 30 minutes.</p>
              <a href="https://wa.me/8801822335566" target="_blank" rel="noreferrer"
                className="inline-flex items-center gap-2 bg-white text-emerald-700 font-bold text-base min-h-[44px] px-5 py-2.5 rounded-xl hover:bg-emerald-50 transition active:scale-95">
                <IoLogoWhatsapp size={18} /> Chat on WhatsApp
              </a>
            </div>

            {/* Social */}
            <div className="flex gap-3">
              <a href="https://facebook.com" target="_blank" rel="noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 text-white text-base min-h-[44px] font-semibold hover:bg-blue-700 transition active:scale-95">
                <FaFacebook size={16} /> Facebook
              </a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-red-600 text-white text-base min-h-[44px] font-semibold hover:bg-red-700 transition active:scale-95">
                <FaYoutube size={16} /> YouTube
              </a>
            </div>
          </div>

          {/* Right — Form */}
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="bg-white rounded-3xl ring-1 ring-neutral-200 shadow-xl p-8">
            <AnimatePresence mode="wait">
              {done ? (
                <motion.div key="ok" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-8">
                  <div className="w-20 h-20 mx-auto rounded-full bg-emerald-50 flex items-center justify-center mb-5">
                    <IoCheckmarkCircle size={48} className="text-emerald-500" />
                  </div>
                  <h3 className="text-2xl font-extrabold text-textPrimary mb-2">Message Sent! 🎉</h3>
                  <p className="text-textSecondary text-sm">We'll get back to you within 24 hours. For urgent matters, use WhatsApp.</p>
                </motion.div>
              ) : (
                <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <h3 className="text-xl font-extrabold text-textPrimary mb-1">Send Us a Message</h3>
                  <p className="text-textSecondary text-sm mb-6">We read every message and reply within 24 hours.</p>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-base sm:text-sm font-medium text-textPrimary mb-1.5">Name *</label>
                        <input name="name" required type="text" placeholder="Your name" autoComplete="name" className="input w-full"
                          value={form.name} onChange={handleChange} />
                      </div>
                      <div>
                        <label className="block text-base sm:text-sm font-medium text-textPrimary mb-1.5">Phone</label>
                        <input name="phone" type="tel" placeholder="01XXXXXXXXX" autoComplete="tel" className="input w-full"
                          value={form.phone} onChange={handleChange} />
                      </div>
                    </div>
                    <div>
                      <label className="block text-base sm:text-sm font-medium text-textPrimary mb-1.5">Email *</label>
                      <input name="email" required type="email" placeholder="you@email.com" autoComplete="email" className="input w-full"
                        value={form.email} onChange={handleChange} />
                    </div>
                    <div>
                      <label className="block text-base sm:text-sm font-medium text-textPrimary mb-1.5">Subject</label>
                      <input name="subject" type="text" placeholder="How can we help?" className="input w-full"
                        value={form.subject} onChange={handleChange} />
                    </div>
                    <div>
                      <label className="block text-base sm:text-sm font-medium text-textPrimary mb-1.5">Message *</label>
                      <textarea name="message" required rows={4} placeholder="Your message…" className="input w-full resize-none"
                        value={form.message} onChange={handleChange} />
                    </div>
                    <motion.button type="submit" disabled={loading}
                      className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-pink-500 to-indigo-500 text-white font-bold flex items-center justify-center gap-2 hover:opacity-90 transition disabled:opacity-60"
                      whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.97 }}>
                      {loading
                        ? <><svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" /></svg> Sending…</>
                        : <><IoSendOutline size={18} /> Send Message</>
                      }
                    </motion.button>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      {/* Mobile Sticky CTA */}
      <div className="fixed bottom-0 left-0 w-full bg-white/90 backdrop-blur-md border-t border-slate-200 z-50 md:hidden shadow-[0_-10px_40px_rgba(0,0,0,0.05)] pb-[max(1rem,env(safe-area-inset-bottom))]">
        <div className="container-custom py-4 flex items-center justify-between">
          <div>
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Next Step</p>
            <p className="text-slate-900 font-bold text-sm">Join the Program</p>
          </div>
          <button className="px-5 py-3 min-h-[44px] bg-brand-green text-white font-black rounded-xl text-[10px] uppercase tracking-widest shadow-lg shadow-brand-green/30">
            Apply Now
          </button>
        </div>
      </div>
    </div>
  );
}
