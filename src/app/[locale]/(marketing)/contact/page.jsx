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
    <div className="min-h-screen pb-20 md:pb-0 flex flex-col bg-slate-50 font-sans pt-12 sm:pt-18">

      {/* Content */}
      <div className="container-custom py-8 md:py-10 relative z-10">

        {/* Compact inline page title */}
        <div className="mb-6 md:mb-8">
          <p className="text-[11px] font-extrabold uppercase tracking-widest text-brand-pink mb-1">📞 Communications</p>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight tracking-tight">
            Contact <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-pink to-brand-green">Us.</span>
          </h1>
          <p className="text-slate-500 text-sm font-medium mt-1 leading-[1.5]">
            Reach us via WhatsApp for instant support, or drop a detailed inquiry below.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-start">

          {/* Left — Info */}
          <div className="space-y-4">
            <div className="bg-white border border-slate-100 p-5 md:p-7 shadow-lg shadow-slate-200/40 rounded-lg">
              <h2 className="text-lg font-extrabold text-slate-900 mb-5 tracking-tight">Direct Channels 👋</h2>
              <div className="space-y-4">
                {CONTACT_INFO.map((c, i) => (
                  <div key={c.label} className={`flex items-start gap-4 ${i !== CONTACT_INFO.length - 1 ? 'pb-4 border-b border-slate-100' : ''}`}>
                    <div className="w-9 h-9 bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 shadow-inner rounded-lg">
                      <c.icon size={18} />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-[1.4]">{c.label}</p>
                      {c.href ? (
                        <a href={c.href} target="_blank" rel="noreferrer" className="text-sm font-extrabold text-slate-900 hover:text-brand-pink transition-colors leading-[1.4]">
                          {c.value}
                        </a>
                      ) : (
                        <p className="text-sm font-extrabold text-slate-900 leading-[1.4]">{c.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Direct messaging */}
            <div className="bg-gradient-to-br from-emerald-500 to-teal-600 p-5 md:p-6 shadow-lg text-white rounded-lg">
              <p className="font-extrabold mb-1.5 text-base flex items-center gap-2">
                <IoLogoWhatsapp size={22} /> High-Priority Sync
              </p>
              <p className="text-emerald-100 font-medium mb-4 text-sm leading-[1.5]">
                Skip the queue. Message us directly on WhatsApp—we typically respond within 12 minutes during operational hours.
              </p>
              <a href="https://wa.me/8801822335566" target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 bg-white text-emerald-700 font-extrabold text-xs uppercase tracking-widest px-6 py-3 hover:bg-emerald-50 transition-all shadow-md active:scale-95 w-full sm:w-auto rounded-md">
                <IoLogoWhatsapp size={16} /> Initialize Chat
              </a>
            </div>

            {/* Social */}
            <div className="flex gap-3">
              <a href={process.env.NEXT_PUBLIC_FACEBOOK_PAGE_URL || "https://www.facebook.com/profile.php?id=100064678913065"} target="_blank" rel="noreferrer" className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white font-extrabold text-xs hover:bg-blue-700 transition-colors shadow-md active:scale-95 rounded-md">
                <FaFacebook size={16} /> Facebook
              </a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer" className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-red-600 text-white font-extrabold text-xs hover:bg-red-700 transition-colors shadow-md active:scale-95 rounded-md">
                <FaYoutube size={16} /> YouTube
              </a>
            </div>
          </div>

          {/* Right — Form */}
          <div className="bg-white border border-slate-100 p-5 md:p-7 shadow-lg shadow-slate-200/40 rounded-lg">
            <AnimatePresence mode="wait">
              {done ? (
                <motion.div key="ok" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-10">
                  <div className="w-16 h-16 mx-auto bg-brand-green/10 flex items-center justify-center mb-4 text-brand-green shadow-inner rounded-lg">
                    <IoCheckmarkCircle size={36} />
                  </div>
                  <h3 className="text-2xl font-extrabold text-slate-900 mb-2 tracking-tight">Message Sent! 🎉</h3>
                  <p className="text-slate-600 font-medium text-sm leading-[1.6]">We have received your detailed specifications and will initialize contact within standard protocol timelines (24h).</p>
                </motion.div>
              ) : (
                <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <h3 className="text-xl font-extrabold text-slate-900 mb-1 tracking-tight">Submit Inquiry</h3>
                  <p className="text-slate-500 font-medium text-sm mb-5 leading-[1.5]">We read every message and reply within 24 hours.</p>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-widest mb-1.5 leading-[1.4]">Name *</label>
                        <input name="name" required type="text" placeholder="John Doe" autoComplete="name" className="w-full h-11 px-3.5 bg-slate-50 border border-slate-200 text-slate-900 font-medium placeholder-slate-400 focus:outline-none focus:border-brand-pink focus:bg-white focus:ring-4 focus:ring-brand-pink/10 transition-all rounded-md" value={form.name} onChange={handleChange} />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-widest mb-1.5 leading-[1.4]">Phone</label>
                        <input name="phone" type="tel" placeholder="01XXX-XXXXXX" autoComplete="tel" className="w-full h-11 px-3.5 bg-slate-50 border border-slate-200 text-slate-900 font-medium placeholder-slate-400 focus:outline-none focus:border-brand-pink focus:bg-white focus:ring-4 focus:ring-brand-pink/10 transition-all rounded-md" value={form.phone} onChange={handleChange} />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-widest mb-1.5 leading-[1.4]">Email *</label>
                      <input name="email" required type="email" placeholder="john@example.com" autoComplete="email" className="w-full h-11 px-3.5 bg-slate-50 border border-slate-200 text-slate-900 font-medium placeholder-slate-400 focus:outline-none focus:border-brand-pink focus:bg-white focus:ring-4 focus:ring-brand-pink/10 transition-all rounded-md" value={form.email} onChange={handleChange} />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-widest mb-1.5 leading-[1.4]">Subject</label>
                      <input name="subject" type="text" placeholder="How can we help?" className="w-full h-11 px-3.5 bg-slate-50 border border-slate-200 text-slate-900 font-medium placeholder-slate-400 focus:outline-none focus:border-brand-pink focus:bg-white focus:ring-4 focus:ring-brand-pink/10 transition-all rounded-md" value={form.subject} onChange={handleChange} />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-widest mb-1.5 leading-[1.4]">Message *</label>
                      <textarea name="message" required rows={5} placeholder="Provide your full specifications..." className="w-full p-3.5 bg-slate-50 border border-slate-200 text-slate-900 font-medium placeholder-slate-400 focus:outline-none focus:border-brand-pink focus:bg-white focus:ring-4 focus:ring-brand-pink/10 transition-all resize-none rounded-md" value={form.message} onChange={handleChange} />
                    </div>

                    <button type="submit" disabled={loading} className="w-full h-12 bg-gradient-to-r from-brand-pink to-brand-green text-white font-extrabold text-sm uppercase tracking-widest flex items-center justify-center gap-2 hover:shadow-[0_0_20px_rgba(255,44,109,0.3)] hover:scale-[1.02] transition-all disabled:opacity-70 active:scale-95 rounded-md">
                      {loading ? (
                        <>Processing...</>
                      ) : (
                        <><IoSendOutline size={17} /> Transmit Request</>
                      )}
                    </button>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Mobile Sticky CTA */}
      <div className="fixed bottom-0 left-0 w-full p-3 bg-white/90 backdrop-blur-md border-t border-slate-200 z-50 md:hidden flex items-center justify-between shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
        <div>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-[1.4]">Urgent</p>
          <p className="text-slate-900 font-bold text-sm leading-[1.4]">WhatsApp Sync</p>
        </div>
        <a href="https://wa.me/8801822335566" className="px-5 py-2.5 bg-brand-green text-white font-bold text-[10px] uppercase tracking-widest flex items-center gap-2 shadow-lg shadow-brand-green/30 rounded-md">
          <IoLogoWhatsapp size={15} /> Chat
        </a>
      </div>
    </div>
  );
}
