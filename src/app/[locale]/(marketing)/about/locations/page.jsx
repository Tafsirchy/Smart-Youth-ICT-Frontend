"use client";

import { motion } from "framer-motion";
import { IoLocationOutline, IoCallOutline, IoMailOutline, IoTimeOutline, IoNavigateCircleOutline } from "react-icons/io5";

export default function LocationsPage() {
  return (
    <section className="min-h-screen pb-12 md:pb-16 bg-slate-50 pt-12 sm:pt-18 overflow-hidden relative flex flex-col font-sans">
      <div className="container-custom relative z-10 w-full">
        {/* Compact Header */}
        <div className="max-w-4xl mb-8 md:mb-10">
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2.5 mb-2.5"
          >
            <div className="w-8 h-[2px] bg-brand-pink" />
            <p className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-400 leading-[1.4]">
              Visit Our Campus
            </p>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 }}
            className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 leading-[1.2] mb-2 tracking-tight"
          >
            Our <span className="text-brand-pink">Locations</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.16 }}
            className="text-slate-600 text-sm md:text-base leading-[1.6] max-w-2xl border-l-2 border-brand-pink pl-4"
          >
            Find us in the heart of Dhaka. Come to our primary campus for offline classes,
            <br className="hidden sm:inline" />
            direct mentorship, and hands-on lab access.
          </motion.p>
        </div>

        {/* Location Grid */}
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 items-stretch max-w-6xl mx-auto">
          {/* Main Campus Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.4 }}
            className="bg-white p-6 sm:p-8 border border-slate-200/90 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col rounded-2xl"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-rose-50 border border-rose-100 text-brand-pink flex items-center justify-center rounded-xl shrink-0">
                <IoLocationOutline size={24} />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-[1.2]">
                  Uttara HQ
                </h2>
                <p className="text-[10px] font-black tracking-[0.2em] uppercase text-brand-pink mt-0.5 leading-[1.4]">
                  Main Campus
                </p>
              </div>
            </div>

            <div className="space-y-4 flex-1">
              <div className="flex items-start gap-3">
                <div className="text-slate-400 mt-0.5 shrink-0"><IoNavigateCircleOutline size={18} /></div>
                <div>
                  <h4 className="text-slate-900 font-bold text-xs uppercase tracking-wider mb-0.5 leading-[1.4]">Address</h4>
                  <p className="text-slate-600 text-xs sm:text-sm font-normal leading-[1.5]">
                    Plot 18 (Flat 5/A), Road 2, Sector 15, Uttara, Dhaka, Bangladesh
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 border-t border-slate-100 pt-3">
                <div className="text-slate-400 mt-0.5 shrink-0"><IoCallOutline size={18} /></div>
                <div>
                  <h4 className="text-slate-900 font-bold text-xs uppercase tracking-wider mb-0.5 leading-[1.4]">Phone</h4>
                  <p className="text-slate-600 text-xs sm:text-sm font-normal leading-[1.5]">01822-335566</p>
                </div>
              </div>

              <div className="flex items-start gap-3 border-t border-slate-100 pt-3">
                <div className="text-slate-400 mt-0.5 shrink-0"><IoMailOutline size={18} /></div>
                <div>
                  <h4 className="text-slate-900 font-bold text-xs uppercase tracking-wider mb-0.5 leading-[1.4]">Email</h4>
                  <p className="text-slate-600 text-xs sm:text-sm font-normal leading-[1.5]">smartyouthictbd@gmail.com</p>
                </div>
              </div>

              <div className="flex items-start gap-3 border-t border-slate-100 pt-3">
                <div className="text-slate-400 mt-0.5 shrink-0"><IoTimeOutline size={18} /></div>
                <div>
                  <h4 className="text-slate-900 font-bold text-xs uppercase tracking-wider mb-0.5 leading-[1.4]">Opening Hours</h4>
                  <p className="text-slate-600 text-xs sm:text-sm font-normal leading-[1.5] mb-2">Saturday to Thursday: 09:00 AM – 09:00 PM</p>
                  <span className="px-2.5 py-0.5 bg-slate-100 border border-slate-200 text-slate-500 text-[10px] font-bold uppercase tracking-wider rounded-md">
                    Friday: Closed
                  </span>
                </div>
              </div>
            </div>

            <a
              href="https://maps.google.com/?q=Sector+15,+Uttara,+Dhaka"
              target="_blank"
              rel="noreferrer"
              className="mt-6 w-full block text-center py-3 bg-slate-900 text-white font-extrabold hover:bg-slate-800 transition-colors tracking-widest uppercase text-xs rounded-xl active:scale-95"
            >
              Get Directions
            </a>
          </motion.div>

          {/* Aesthetic Map / Graphic Area */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ delay: 0.15, duration: 0.4 }}
            className="border border-slate-200/90 bg-white shadow-xs overflow-hidden relative min-h-[340px] lg:min-h-full rounded-2xl flex flex-col justify-end p-6"
          >
            <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&h=800&fit=crop')] bg-cover bg-center grayscale mix-blend-multiply" />

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                className="relative group cursor-pointer"
              >
                <div className="w-12 h-12 bg-brand-pink flex items-center justify-center shadow-lg border-2 border-white rounded-xl rotate-45">
                  <div className="w-3.5 h-3.5 bg-white -rotate-45 rounded-xs" />
                </div>
              </motion.div>
              <div className="w-8 h-1.5 bg-black/15 rounded-full mt-3 blur-[2px]" />
            </div>

            <div className="relative z-10 bg-white/95 backdrop-blur-md px-5 py-3.5 border border-slate-200/90 flex flex-col items-center text-center shadow-sm rounded-xl">
              <p className="font-black text-slate-900 text-sm tracking-tight leading-[1.3]">Uttara Campus</p>
              <p className="text-[11px] text-slate-500 font-medium mt-0.5 leading-[1.3]">Sector 15, Road 2, Plot 18, Dhaka</p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Mobile Sticky CTA */}
      <div className="fixed bottom-0 left-0 w-full p-3 bg-white/90 backdrop-blur-md border-t border-slate-200 z-50 md:hidden flex items-center justify-between shadow-[0_-8px_24px_rgba(0,0,0,0.06)] pb-[max(0.75rem,env(safe-area-inset-bottom))]">
        <div>
          <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Campus</p>
          <p className="text-slate-900 font-black text-xs leading-none">Sector 15, Uttara</p>
        </div>
        <a
          href="https://maps.google.com/?q=Sector+15,+Uttara,+Dhaka"
          target="_blank"
          rel="noreferrer"
          className="px-5 py-2.5 min-h-[40px] bg-brand-pink text-white font-extrabold text-[10px] uppercase tracking-wider rounded-lg flex items-center justify-center active:scale-95"
        >
          Directions
        </a>
      </div>
    </section>
  );
}
