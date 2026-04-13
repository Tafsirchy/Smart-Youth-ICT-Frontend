"use client";

import { motion } from "framer-motion";
import { IoLocationOutline, IoCallOutline, IoMailOutline, IoTimeOutline, IoNavigateCircleOutline } from "react-icons/io5";

export default function LocationsPage() {
  return (
    <section className="min-h-screen bg-slate-50 py-20 overflow-hidden relative">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-100 rounded-full blur-[100px] opacity-60 -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>

      <div className="container-custom relative z-10">
        <div className="max-w-3xl mb-16">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block text-[11px] font-black uppercase tracking-[0.28em] text-brand-green mb-4"
          >
            Visit Our Campus
          </motion.p>
          <h1 className="text-5xl md:text-7xl font-black text-slate-900 leading-[1.1] mb-8 tracking-tighter">
            Our <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-600 animate-gradient-x">Locations</span>
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-slate-600 text-xl leading-relaxed max-w-2xl"
          >
            Find us in the heart of Dhaka. Come to our primary campus for offline classes, direct mentorship, and live lab access.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* Main Campus Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/50 relative overflow-hidden"
          >
            {/* Background design */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-green/10 rounded-full blur-3xl -mr-10 -mt-10"></div>
            
            <div className="flex items-center gap-3 mb-8 relative z-10">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center">
                <IoLocationOutline size={24} />
              </div>
              <div>
                <h2 className="text-2xl font-black text-slate-900 leading-none">
                  Uttara HQ (Main Campus)
                </h2>
                <p className="text-sm font-bold tracking-widest uppercase text-emerald-600 mt-1">
                  Dhaka, Bangladesh
                </p>
              </div>
            </div>

            <div className="space-y-6 relative z-10">
              <div className="flex items-start gap-4">
                <div className="text-slate-400 mt-1"><IoNavigateCircleOutline size={20} /></div>
                <div>
                  <h4 className="text-slate-900 font-bold mb-1">Address</h4>
                  <p className="text-slate-600 leading-relaxed font-medium">
                    Plot 18 (Flat 5/A), Road 2,<br />
                    Sector 15, Uttara,<br />
                    Dhaka, Bangladesh
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 border-t border-slate-100 pt-6">
                <div className="text-slate-400 mt-1"><IoCallOutline size={20} /></div>
                <div>
                  <h4 className="text-slate-900 font-bold mb-1">Phone</h4>
                  <p className="text-slate-600 font-medium">01822-335566</p>
                </div>
              </div>

              <div className="flex items-start gap-4 border-t border-slate-100 pt-6">
                <div className="text-slate-400 mt-1"><IoMailOutline size={20} /></div>
                <div>
                  <h4 className="text-slate-900 font-bold mb-1">Email</h4>
                  <p className="text-slate-600 font-medium">smartyouthictbd@gmail.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4 border-t border-slate-100 pt-6">
                <div className="text-slate-400 mt-1"><IoTimeOutline size={20} /></div>
                <div>
                  <h4 className="text-slate-900 font-bold mb-1">Opening Hours</h4>
                  <p className="text-slate-600 font-medium pb-2">Saturday to Thursday: 09:00 AM – 09:00 PM</p>
                  <span className="px-3 py-1 bg-red-50 text-red-600 text-[10px] font-black uppercase tracking-wider rounded-md">
                    Friday: Closed
                  </span>
                </div>
              </div>
            </div>

            <a 
              href="https://maps.google.com/?q=Sector+15,+Uttara,+Dhaka" 
              target="_blank" 
              rel="noreferrer"
              className="mt-8 w-full block text-center py-4 rounded-xl bg-slate-900 text-white font-bold hover:bg-brand-green transition-colors"
            >
              Get Directions on Google Maps
            </a>
          </motion.div>

          {/* Aesthetic Map / Graphic Area */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: 0.2 }}
            className="rounded-3xl border border-slate-200 bg-slate-200 overflow-hidden relative min-h-[400px]"
          >
            {/* Visual map placeholder with a pin */}
            <div className="absolute inset-0 opacity-40 bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&h=800&fit=crop')] bg-cover bg-center mix-blend-overlay grayscale"></div>
            
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
              <div className="relative group cursor-pointer animate-bounce">
                <div className="w-14 h-14 bg-brand-green rounded-full rounded-br-none -rotate-45 flex items-center justify-center shadow-2xl border-4 border-white">
                  <div className="w-4 h-4 rounded-full bg-white rotate-45"></div>
                </div>
              </div>
              <div className="w-8 h-2 bg-black/20 rounded-[100%] mt-2 blur-[2px]"></div>
              
              <div className="mt-4 bg-white px-5 py-3 rounded-2xl shadow-xl flex flex-col items-center pointer-events-none">
                <p className="font-extrabold text-slate-900">Uttara Campus</p>
                <p className="text-xs text-slate-500 font-medium">Sector 15, Dhaka</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
