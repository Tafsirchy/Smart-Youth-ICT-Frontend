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
    <div className="min-h-screen pb-24 md:pb-0 flex flex-col bg-slate-50 font-sans">

      {/* Hero */}
      <section className="bg-slate-900 pt-24 pb-32 px-4 text-center border-b border-slate-800">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <span className="inline-block px-4 py-2 border border-slate-700 text-xs font-medium uppercase tracking-widest text-slate-400 mb-8">
              Communications
            </span>
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-light text-white leading-[1.1] mb-8 tracking-tight">
              Contact <span className="font-medium">Us.</span>
            </h1>
            <p className="text-slate-400 text-lg md:text-xl font-light leading-relaxed max-w-2xl mx-auto">
              We operate with high availability. Reach us via WhatsApp for instant support, or drop a detailed inquiry below.
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <div className="container-custom py-24 -mt-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">

          {/* Left — Info */}
          <div className="space-y-8">
            <div className="bg-white border border-slate-200 p-8 md:p-12">
              <h2 className="text-2xl font-medium text-slate-900 mb-10 tracking-tight">Direct Channels</h2>
              <div className="space-y-6">
                {CONTACT_INFO.map((c, i) => (
                  <div key={c.label} className={`flex items-start gap-6 ${i !== CONTACT_INFO.length - 1 ? 'pb-6 border-b border-slate-100' : ''}`}>
                    <div className="w-12 h-12 bg-slate-900 text-white flex items-center justify-center shrink-0">
                      <c.icon size={20} />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{c.label}</p>
                      {c.href ? (
                        <a href={c.href} target="_blank" rel="noreferrer" className="text-lg font-medium text-slate-900 hover:text-slate-500 transition-colors">
                          {c.value}
                        </a>
                      ) : (
                        <p className="text-lg font-medium text-slate-900">{c.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Direct messaging */}
            <div className="bg-slate-900 p-8 md:p-12 border border-slate-800 text-white">
              <p className="font-medium mb-3 text-lg flex items-center gap-3">
                <IoLogoWhatsapp size={24} /> High-Priority Sync
              </p>
              <p className="text-slate-400 font-light mb-8 leading-relaxed">
                Skip the queue. Message us directly on WhatsApp—we typically respond within 12 minutes during operational hours.
              </p>
              <a href="https://wa.me/8801822335566" target="_blank" rel="noreferrer" className="inline-flex items-center gap-3 bg-white text-slate-900 font-medium text-xs uppercase tracking-widest px-8 py-4 hover:bg-slate-200 transition-colors">
                <IoLogoWhatsapp size={18} /> Initialize Chat
              </a>
            </div>

            {/* Social */}
            <div className="flex gap-4">
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="flex-1 flex items-center justify-center gap-3 px-6 py-4 bg-white border border-slate-200 text-slate-900 font-medium text-xs uppercase tracking-widest hover:border-slate-900 transition-colors">
                <FaFacebook size={18} /> Facebook
              </a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer" className="flex-1 flex items-center justify-center gap-3 px-6 py-4 bg-white border border-slate-200 text-slate-900 font-medium text-xs uppercase tracking-widest hover:border-slate-900 transition-colors">
                <FaYoutube size={18} /> YouTube
              </a>
            </div>
          </div>

          {/* Right — Form */}
          <div className="bg-white border border-slate-200 p-8 md:p-12 lg:p-16">
            <AnimatePresence mode="wait">
              {done ? (
                <motion.div key="ok" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16">
                  <div className="w-24 h-24 mx-auto bg-slate-900 flex items-center justify-center mb-8 text-white">
                    <IoCheckmarkCircle size={40} />
                  </div>
                  <h3 className="text-3xl font-light text-slate-900 mb-4 tracking-tight">Transmission <span className="font-medium">Successful.</span></h3>
                  <p className="text-slate-500 font-light leading-relaxed">We have received your detailed specifications and will initialize contact within standard protocol timelines (24h).</p>
                </motion.div>
              ) : (
                <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <h3 className="text-3xl font-light text-slate-900 mb-3 tracking-tight">Submit <span className="font-medium">Inquiry.</span></h3>
                  <p className="text-slate-500 font-light text-sm mb-10">Structured data preferred. We process all submissions sequentially.</p>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs font-bold text-slate-900 uppercase tracking-widest mb-3">Name</label>
                        <input name="name" required type="text" placeholder="John Doe" autoComplete="name" className="w-full h-14 px-4 bg-slate-50 border border-slate-200 text-slate-900 font-light placeholder-slate-400 focus:outline-none focus:border-slate-900 focus:bg-white transition-colors" value={form.name} onChange={handleChange} />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-900 uppercase tracking-widest mb-3">Phone</label>
                        <input name="phone" type="tel" placeholder="01XXX-XXXXXX" autoComplete="tel" className="w-full h-14 px-4 bg-slate-50 border border-slate-200 text-slate-900 font-light placeholder-slate-400 focus:outline-none focus:border-slate-900 focus:bg-white transition-colors" value={form.phone} onChange={handleChange} />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-900 uppercase tracking-widest mb-3">Email</label>
                      <input name="email" required type="email" placeholder="john@example.com" autoComplete="email" className="w-full h-14 px-4 bg-slate-50 border border-slate-200 text-slate-900 font-light placeholder-slate-400 focus:outline-none focus:border-slate-900 focus:bg-white transition-colors" value={form.email} onChange={handleChange} />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-900 uppercase tracking-widest mb-3">Subject</label>
                      <input name="subject" type="text" placeholder="Inquiry topic" className="w-full h-14 px-4 bg-slate-50 border border-slate-200 text-slate-900 font-light placeholder-slate-400 focus:outline-none focus:border-slate-900 focus:bg-white transition-colors" value={form.subject} onChange={handleChange} />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-900 uppercase tracking-widest mb-3">Message</label>
                      <textarea name="message" required rows={5} placeholder="Provide your full specifications..." className="w-full p-4 bg-slate-50 border border-slate-200 text-slate-900 font-light placeholder-slate-400 focus:outline-none focus:border-slate-900 focus:bg-white transition-colors resize-none" value={form.message} onChange={handleChange} />
                    </div>
                    
                    <button type="submit" disabled={loading} className="w-full h-16 mt-4 bg-slate-900 text-white font-medium text-xs uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-slate-800 transition-colors disabled:opacity-70 border border-slate-900">
                      {loading ? (
                        <>Processing...</>
                      ) : (
                        <><IoSendOutline size={18} /> Transmit Request</>
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
      <div className="fixed bottom-0 left-0 w-full p-4 bg-white border-t border-slate-200 z-50 md:hidden flex items-center justify-between">
        <div>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Urgent</p>
          <p className="text-slate-900 font-medium text-sm">WhatsApp Sync</p>
        </div>
        <a href="https://wa.me/8801822335566" className="px-6 py-4 bg-slate-900 text-white font-medium text-[10px] uppercase tracking-widest flex items-center gap-2">
          <IoLogoWhatsapp size={16} /> Chat
        </a>
      </div>
    </div>
  );
}
