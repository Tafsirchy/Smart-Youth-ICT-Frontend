"use client";

import { motion } from "framer-motion";
import { IoLocationOutline, IoCallOutline, IoMailOutline, IoTimeOutline, IoNavigateCircleOutline } from "react-icons/io5";

export default function LocationsPage() {
 return (
 <section className="min-h-screen pb-24 md:pb-32 bg-white pt-24 md:pt-32 overflow-hidden relative flex flex-col font-sans">
 <div className="container-custom relative z-10">
 <div className="max-w-4xl mb-20 md:mb-24">
 <motion.div
 initial={{ opacity: 0, x: -20 }}
 animate={{ opacity: 1, x: 0 }}
 className="flex items-center gap-4 mb-8"
 >
 <div className="w-8 h-[1px] bg-slate-300"></div>
 <p className="text-xs font-medium uppercase tracking-[0.2em] text-slate-500">
 Visit Our Campus
 </p>
 </motion.div>
 
 <motion.h1
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ delay: 0.1 }}
 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-slate-900 leading-[1.05] tracking-tight mb-8"
 >
 Our <br />
 <span className="font-semibold">Locations.</span>
 </motion.h1>
 
 <motion.p
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ delay: 0.2 }}
 className="text-slate-500 text-lg md:text-xl leading-relaxed max-w-2xl font-light"
 >
 Find us in the heart of Dhaka. Come to our primary campus for offline classes, direct mentorship, and live lab access.
 </motion.p>
 </div>

 <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-stretch max-w-7xl mx-auto">
 {/* Main Campus Card */}
 <motion.div
 initial={{ opacity: 0, y: 20 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true, margin: "-50px" }}
 transition={{ duration: 0.5 }}
 className="bg-white p-8 md:p-12 -[2rem] border border-slate-100 shadow-sm hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-500 flex flex-col"
 >
 <div className="flex items-center gap-5 mb-12">
 <div className="w-14 h-14 bg-slate-50 border border-slate-100 text-slate-600 flex items-center justify-center">
 <IoLocationOutline size={28} />
 </div>
 <div>
 <h2 className="text-2xl font-medium text-slate-900 tracking-tight">
 Uttara HQ
 </h2>
 <p className="text-[10px] font-medium tracking-widest uppercase text-slate-400 mt-1">
 Main Campus
 </p>
 </div>
 </div>

 <div className="space-y-8 flex-1">
 <div className="flex items-start gap-4">
 <div className="text-slate-400 mt-0.5"><IoNavigateCircleOutline size={20} /></div>
 <div>
 <h4 className="text-slate-900 font-medium mb-1">Address</h4>
 <p className="text-slate-500 font-light leading-relaxed">
 Plot 18 (Flat 5/A), Road 2,<br />
 Sector 15, Uttara,<br />
 Dhaka, Bangladesh
 </p>
 </div>
 </div>

 <div className="flex items-start gap-4 border-t border-slate-100 pt-8">
 <div className="text-slate-400 mt-0.5"><IoCallOutline size={20} /></div>
 <div>
 <h4 className="text-slate-900 font-medium mb-1">Phone</h4>
 <p className="text-slate-500 font-light">01822-335566</p>
 </div>
 </div>

 <div className="flex items-start gap-4 border-t border-slate-100 pt-8">
 <div className="text-slate-400 mt-0.5"><IoMailOutline size={20} /></div>
 <div>
 <h4 className="text-slate-900 font-medium mb-1">Email</h4>
 <p className="text-slate-500 font-light">smartyouthictbd@gmail.com</p>
 </div>
 </div>

 <div className="flex items-start gap-4 border-t border-slate-100 pt-8">
 <div className="text-slate-400 mt-0.5"><IoTimeOutline size={20} /></div>
 <div>
 <h4 className="text-slate-900 font-medium mb-1">Opening Hours</h4>
 <p className="text-slate-500 font-light mb-3">Saturday to Thursday: 09:00 AM – 09:00 PM</p>
 <span className="px-3 py-1 bg-slate-50 border border-slate-200 text-slate-600 text-[10px] font-medium uppercase tracking-wider">
 Friday: Closed
 </span>
 </div>
 </div>
 </div>

 <a
 href="https://maps.google.com/?q=Sector+15,+Uttara,+Dhaka"
 target="_blank"
 rel="noreferrer"
 className="mt-10 w-full block text-center py-4 bg-slate-900 text-white font-medium hover:bg-slate-800 transition-colors tracking-wide text-sm active:scale-95"
 >
 Get Directions
 </a>
 </motion.div>

 {/* Aesthetic Map / Graphic Area */}
 <motion.div
 initial={{ opacity: 0, y: 20 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true, margin: "-50px" }}
 transition={{ delay: 0.2, duration: 0.5 }}
 className="-[2rem] border border-slate-100 bg-slate-50 overflow-hidden relative min-h-[400px] lg:min-h-full"
 >
 {/* Visual map placeholder with a pin */}
 <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&h=800&fit=crop')] bg-cover bg-center grayscale mix-blend-multiply"></div>

 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
 <div className="relative group cursor-pointer hover:-translate-y-2 transition-transform duration-500">
 <div className="w-14 h-14 bg-slate-900 -none -rotate-45 flex items-center justify-center shadow-lg border-2 border-white">
 <div className="w-4 h-4 bg-white rotate-45"></div>
 </div>
 </div>
 <div className="w-8 h-2 bg-black/10 -[100%] mt-2 blur-[2px]"></div>

 <div className="mt-6 bg-white/80 backdrop-blur-md px-6 py-4 border border-slate-100 flex flex-col items-center pointer-events-none shadow-sm">
 <p className="font-medium text-slate-900 tracking-tight">Uttara Campus</p>
 <p className="text-[11px] text-slate-500 font-light mt-1">Sector 15, Dhaka</p>
 </div>
 </div>
 </motion.div>
 </div>
 </div>

 {/* Mobile Sticky CTA */}
 <div className="fixed bottom-0 left-0 w-full p-4 bg-white/90 backdrop-blur-md border-t border-slate-100 z-50 md:hidden flex items-center justify-between pb-[max(1rem,env(safe-area-inset-bottom))]">
 <div>
 <p className="text-[10px] font-medium text-slate-400 uppercase tracking-widest mb-0.5">Next Step</p>
 <p className="text-slate-900 font-medium text-sm">Join the Program</p>
 </div>
 <button className="px-6 py-3 min-h-[44px] bg-slate-900 text-white font-medium text-[11px] uppercase tracking-wider transition-transform active:scale-95">
 Apply Now
 </button>
 </div>
 </section>
 );
}
