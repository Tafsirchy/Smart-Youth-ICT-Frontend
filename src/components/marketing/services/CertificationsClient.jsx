"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { IoRibbonOutline, IoCheckmarkCircle, IoSearchOutline, IoShieldCheckmarkOutline, IoArrowBackOutline } from "react-icons/io5";

export default function CertificationsClient({ programs, content }) {
 return (
 <section className="min-h-screen bg-slate-50 flex flex-col font-sans">
 
 <div className="bg-white border-b border-slate-200 pt-24 pb-16 px-4">
 <div className="container-custom max-w-5xl mx-auto flex flex-col items-center text-center">
 <motion.div
 initial={{ opacity: 0, y: 10 }}
 animate={{ opacity: 1, y: 0 }}
 className="inline-flex items-center gap-3 px-4 py-2 border border-slate-200 text-xs font-medium uppercase tracking-widest text-slate-500 mb-8"
 >
 <IoRibbonOutline size={16} /> {content?.hero?.badge || "Official Validation"}
 </motion.div>
 <motion.h1
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ delay: 0.1 }}
 className="text-4xl sm:text-5xl lg:text-7xl font-light text-slate-900 leading-[1.1] tracking-tight mb-6"
 >
 {content?.hero?.title || "Certification"} <br />
 <span className="font-medium">
 {content?.hero?.subtitle || "Programs"}
 </span>
 </motion.h1>
 <motion.p
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ delay: 0.2 }}
 className="text-slate-500 text-lg md:text-xl leading-relaxed max-w-2xl font-light mb-10"
 >
 {content?.hero?.description || "Boost your resume instantly. Our certification programs assess your skills through rigorous practical exams."}
 </motion.p>

 <motion.div
 initial={{ opacity: 0, y: 10 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ delay: 0.3 }}
 >
 <Link
 href="/services/certifications/details"
 className="inline-flex items-center gap-3 text-sm font-medium uppercase tracking-widest text-slate-900 hover:text-slate-500 transition-colors group"
 >
 View Validation Manifest <IoArrowBackOutline className="rotate-180 group-hover:translate-x-2 transition-transform" />
 </Link>
 </motion.div>
 </div>
 </div>

 <div className="container-custom py-20 bg-slate-50">
 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
 {programs?.length > 0 ? (
 programs.map((prog, i) => (
 <motion.div
 key={prog._id}
 initial={{ opacity: 0, y: 20 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true }}
 transition={{ delay: i * 0.1 }}
 className="bg-white p-8 border border-slate-200 hover:border-slate-400 hover:shadow-lg transition-all flex flex-col group"
 >
 <div className="w-14 h-14 bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-900 mb-6 group-hover:scale-105 transition-transform">
 <IoRibbonOutline size={24} />
 </div>
 <p className="text-[10px] font-medium uppercase tracking-widest text-slate-400 mb-2">{prog.badgeText}</p>
 <h2 className="text-2xl font-medium text-slate-900 mb-3 tracking-tight">{prog.title}</h2>
 <p className="text-slate-500 text-sm font-light leading-relaxed mb-8 flex-1">{prog.description}</p>

 <div className="space-y-3 mb-8 border-t border-slate-100 pt-6">
 {prog.features?.map((f, idx) => (
 <div key={idx} className="flex items-center gap-3 text-[10px] sm:text-xs font-medium text-slate-600 uppercase tracking-widest">
 <IoCheckmarkCircle className="text-slate-400 text-base shrink-0" />
 {f}
 </div>
 ))}
 </div>

 <button className="w-full py-4 bg-slate-900 text-white font-medium uppercase tracking-widest text-xs hover:bg-slate-800 transition-colors">
 Apply for Assessment
 </button>
 </motion.div>
 ))
 ) : (
 <div className="col-span-full py-20 bg-white border border-slate-200 text-center">
 <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-50 border border-slate-200 text-slate-400 mb-6">
 <IoSearchOutline size={32} />
 </div>
 <p className="text-slate-900 font-medium text-xl mb-2">No Active Validation Programs</p>
 <p className="text-slate-500 font-light">New certification cohorts are launching soon.</p>
 </div>
 )}
 </div>

 {/* Unified Verification CTA */}
 <div className="mt-20 text-center bg-slate-900 p-12 lg:p-20 flex flex-col items-center">
 <IoShieldCheckmarkOutline className="text-5xl text-white mb-6" />
 <h3 className="text-3xl lg:text-5xl font-light text-white mb-4 tracking-tight">Industry-Grade <span className="font-medium">Verification.</span></h3>
 <p className="text-slate-400 text-lg font-light mb-10 max-w-2xl leading-relaxed">Employers can verify our student credentials directly through our localized, high-authority registry.</p>
 <button className="hidden lg:inline-flex px-8 py-4 bg-white text-slate-900 font-medium hover:bg-slate-200 transition-colors uppercase tracking-widest text-xs">
 Access Student Registry
 </button>
 </div>
 </div>
 
 <div className="sticky bottom-0 left-0 right-0 p-4 bg-white border-t border-slate-200 z-50 lg:hidden flex justify-center mt-auto">
 <button className="w-full py-4 bg-slate-900 text-white font-medium text-xs uppercase tracking-widest">
 Access Registry
 </button>
 </div>
 </section>
 );
}
