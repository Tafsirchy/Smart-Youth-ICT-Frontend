"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { IoTimerOutline, IoBriefcaseOutline, IoSearchOutline, IoArrowBackOutline } from "react-icons/io5";

export default function CareerTracksClient({ tracks, content }) {
 return (
 <section className="min-h-screen bg-slate-50 flex flex-col font-sans">

 <div className="relative pt-24 pb-16 px-4 bg-white border-b border-slate-200 text-center">
 <div className="container-custom relative z-10 flex flex-col items-center max-w-4xl mx-auto gap-6">
 <motion.div
 initial={{ opacity: 0, y: 10 }}
 animate={{ opacity: 1, y: 0 }}
 className="inline-flex items-center gap-3 px-4 py-2 border border-slate-200 text-xs font-medium uppercase tracking-widest text-slate-500"
 >
 <span className="flex h-1.5 w-1.5 bg-slate-400"></span>
 {content?.hero?.badge || "Zero To Hero"}
 </motion.div>
 <motion.h1
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ delay: 0.1 }}
 className="text-4xl sm:text-5xl lg:text-7xl font-light text-slate-900 leading-[1.1] tracking-tight"
 >
 {content?.hero?.title || "Career Tracks"} <br />
 <span className="font-medium text-slate-900">
 {content?.hero?.subtitle || "(Web, AI, SMM)"}
 </span>
 </motion.h1>
 <motion.p
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ delay: 0.2 }}
 className="text-slate-500 text-lg md:text-xl leading-relaxed max-w-2xl font-light"
 >
 {content?.hero?.description || "Select a track, follow our rigorously tested curriculum, and launch your tech career methodically."}
 </motion.p>

 <motion.div
 initial={{ opacity: 0, y: 10 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ delay: 0.3 }}
 className="pt-6"
 >
 <Link
 href="/services/career-tracks/details"
 className="inline-flex items-center gap-3 text-sm font-medium uppercase tracking-widest text-slate-900 hover:text-slate-500 transition-colors group"
 >
 View Trajectory Manifest <IoArrowBackOutline className="rotate-180 group-hover:translate-x-2 transition-transform" />
 </Link>
 </motion.div>
 </div>
 </div>

 <div className="container-custom py-20 bg-slate-50">
 <div className="flex flex-col gap-12 max-w-6xl mx-auto">
 {tracks.length > 0 ? (
 tracks.map((track, i) => (
 <motion.div
 key={track._id}
 initial={{ opacity: 0, y: 30 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true, margin: "-100px" }}
 className="w-full bg-white border border-slate-200 shadow-sm p-8 md:p-12 group hover:border-slate-300 hover:shadow-md transition-all flex flex-col lg:flex-row gap-12"
 >
 <div className="lg:w-5/12 flex flex-col justify-between">
 <div>
 <h2 className="text-3xl font-medium text-slate-900 mb-4 tracking-tight">{track.title}</h2>
 <p className="text-slate-500 leading-relaxed font-light mb-8">{track.description}</p>
 </div>

 <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row gap-8">
 <div>
 <p className="text-[10px] font-medium uppercase tracking-widest text-slate-400 flex items-center gap-2 mb-2"><IoTimerOutline /> Duration</p>
 <p className="text-slate-900 text-lg font-medium">{track.duration}</p>
 </div>
 <div>
 <p className="text-[10px] font-medium uppercase tracking-widest text-slate-400 flex items-center gap-2 mb-2"><IoBriefcaseOutline /> Outcome</p>
 <p className="text-slate-900 text-lg font-medium">{track.outcome}</p>
 </div>
 </div>

 <button className="w-full py-4 mt-8 bg-slate-900 text-white font-medium hover:bg-slate-800 transition-colors text-xs uppercase tracking-widest">
 Download Syllabus PDF
 </button>
 </div>

 <div className="lg:w-7/12 bg-slate-50 p-8 border border-slate-200">
 <div className="space-y-8 relative">
 {[
 { phase: "Phase 1: Basics", val: track.phase1 },
 { phase: "Phase 2: Core", val: track.phase2 },
 { phase: "Phase 3: Deep Dive", val: track.phase3 },
 { phase: "Phase 4: Launch", val: track.phase4 },
 ].map((step, idx) => (
 <div key={idx} className="flex gap-6 items-start relative pb-4">
 {idx !== 3 && <div className={`absolute left-[15px] top-10 bottom-0 w-px bg-slate-200`}></div>}
 <div className={`w-8 h-8 bg-white border border-slate-200 flex items-center justify-center shrink-0 z-10 text-slate-900 font-medium text-sm`}>
 {idx + 1}
 </div>
 <div>
 <p className="text-[10px] font-medium text-slate-400 uppercase tracking-widest mb-1.5">{step.phase}</p>
 <p className="text-slate-700 font-light text-sm md:text-base leading-relaxed">{step.val}</p>
 </div>
 </div>
 ))}
 </div>
 </div>
 </motion.div>
 ))
 ) : (
 <div className="text-center py-20 bg-white border border-slate-200">
 <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-50 border border-slate-200 text-slate-400 mb-6">
 <IoSearchOutline size={32} />
 </div>
 <h3 className="text-xl font-medium text-slate-900 mb-2">No Active Tracks</h3>
 <p className="text-slate-500 font-light">We are updating our career tracks. Check back later.</p>
 </div>
 )}
 </div>
 </div>
 
 <div className="sticky bottom-0 left-0 right-0 bg-white border-t border-slate-200 z-50 lg:hidden p-4 mt-auto">
 <button className="w-full py-4 bg-slate-900 text-white font-medium text-xs uppercase tracking-widest">
 Download PDF
 </button>
 </div>
 </section>
 );
}
