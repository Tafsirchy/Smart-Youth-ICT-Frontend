"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
 IoBriefcaseOutline,
 IoFlaskOutline,
 IoChatbubblesOutline,
 IoSearchOutline,
 IoPulseOutline,
 IoArrowBackOutline,
} from "react-icons/io5";

export default function JobPlacementClient({ data, content }) {
 return (
 <section className="min-h-screen bg-slate-50 flex flex-col font-sans">
 {/* Hero Section */}
 <div className="bg-white border-b border-slate-200 pt-24 pb-16 px-4">
 <div className="container-custom relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center gap-6">
 <motion.div
 initial={{ opacity: 0, y: 10 }}
 animate={{ opacity: 1, y: 0 }}
 className="inline-flex items-center gap-3 px-4 py-2 border border-slate-200 text-xs font-medium uppercase tracking-widest text-slate-500"
 >
 <span className="flex h-1.5 w-1.5 bg-slate-400"></span>
 {content?.hero?.badge || "Your Career Launchpad"}
 </motion.div>
 <motion.h1
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ delay: 0.1 }}
 className="text-4xl sm:text-5xl lg:text-7xl font-light text-slate-900 leading-[1.1] tracking-tight"
 >
 {content?.hero?.title || "Job Placement"} <br />
 <span className="font-medium">
 {content?.hero?.subtitle || "Support Cell"}
 </span>
 </motion.h1>
 <motion.p
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ delay: 0.2 }}
 className="text-slate-500 text-lg md:text-xl leading-relaxed max-w-2xl font-light"
 >
 {content?.hero?.description ||
 "Graduation is just the beginning. Our dedicated placement cell actively maps our top talent with hiring partners."}
 </motion.p>

 <motion.div
 initial={{ opacity: 0, y: 10 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ delay: 0.3 }}
 className="pt-6"
 >
 <Link
 href="/services/job-placement/details"
 className="inline-flex items-center gap-3 text-sm font-medium uppercase tracking-widest text-slate-900 hover:text-slate-500 transition-colors group"
 >
 View Placement Manifest <IoArrowBackOutline className="rotate-180 group-hover:translate-x-2 transition-transform" />
 </Link>
 </motion.div>
 </div>
 </div>

 <div className="container-custom py-20 bg-slate-50">
 {data?.placements?.length > 0 ? (
 /* Target Classifications */
 <div className="mb-20">
 <div className="flex items-center justify-between mb-12">
 <h2 className="text-3xl font-light text-slate-900 tracking-tight">Placement Track <span className="font-medium">Classifications</span></h2>
 <div className="hidden md:block h-[1px] flex-1 bg-slate-200 ml-8"></div>
 </div>
 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
 {data.placements.map((p, i) => (
 <motion.div
 key={i}
 initial={{ opacity: 0, y: 30 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true }}
 transition={{ delay: i * 0.1 }}
 className="bg-white border border-slate-200 p-8 hover:border-slate-400 hover:shadow-lg transition-all flex flex-col group"
 >
 <div className={`w-14 h-14 bg-slate-900 text-white flex items-center justify-center mb-6 group-hover:scale-105 transition-transform`}>
 <IoBriefcaseOutline size={24} />
 </div>
 <p className="text-[10px] font-medium uppercase tracking-widest text-slate-400 mb-2">{p.type}</p>
 <h3 className="text-xl font-medium text-slate-900 mb-3 tracking-tight">{p.title}</h3>
 <p className="text-slate-500 font-light leading-relaxed text-sm mb-8 flex-1">{p.desc}</p>

 <div className="pt-6 border-t border-slate-100 mt-auto">
 <p className="text-[10px] font-medium uppercase tracking-widest text-slate-400 mb-2">Avg. Entry Package</p>
 <p className="text-xl font-medium text-slate-900">{p.avgSalary}</p>
 </div>
 </motion.div>
 ))}
 </div>
 </div>
 ) : (
 <div className="text-center py-20 bg-white border border-slate-200 mb-20">
 <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-50 border border-slate-200 text-slate-400 mb-6">
 <IoPulseOutline size={32} className="animate-pulse" />
 </div>
 <p className="text-slate-900 font-medium text-xl mb-2">Job Channels Ready</p>
 <p className="text-slate-500 font-light">Content is being updated.</p>
 </div>
 )}

 {/* The Lifecycle */}
 {data?.lifecycle?.length > 0 && (
 <div className="mb-20 max-w-4xl mx-auto">
 <h2 className="text-3xl font-light text-slate-900 text-center mb-16 tracking-tight">The Recruitment <span className="font-medium">Lifecycle.</span></h2>
 <div className="space-y-8 relative">
 {data.lifecycle.map((l, i) => (
 <motion.div
 key={i}
 initial={{ opacity: 0, y: 20 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true }}
 transition={{ delay: i * 0.1 }}
 className="flex flex-col md:flex-row gap-6 md:gap-8 items-start bg-white p-8 border border-slate-200"
 >
 <div className="w-12 h-12 bg-slate-900 flex items-center justify-center text-white font-medium shrink-0">
 {i + 1}
 </div>
 <div className="flex-1 flex flex-col gap-3">
 <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
 <h3 className="text-xl font-medium text-slate-900 tracking-tight">{l.title}</h3>
 <span className="text-[10px] font-medium uppercase tracking-widest text-slate-500 px-3 py-1.5 bg-slate-100 border border-slate-200 inline-block md:inline">
 {l.step}
 </span>
 </div>
 <p className="text-slate-500 font-light leading-relaxed">{l.d}</p>
 </div>
 </motion.div>
 ))}
 </div>
 </div>
 )}

 {/* Interview Labs & Facility Section */}
 <div className="bg-white border border-slate-200 flex flex-col lg:flex-row mb-20">
 <div className="p-10 md:p-16 flex-1 flex flex-col justify-center">
 <div className="w-14 h-14 bg-slate-50 border border-slate-200 text-slate-900 flex items-center justify-center text-2xl mb-8">
 <IoFlaskOutline />
 </div>
 <h2 className="text-3xl lg:text-4xl font-light text-slate-900 leading-[1.1] mb-6">
 Career Launch <br /><span className="font-medium">Labs.</span>
 </h2>
 <p className="text-slate-500 font-light leading-relaxed mb-10 max-w-lg">
 We don't just refer—we prepare. Our physically simulated interview
 labs provide you with the exact pressure-test you need before
 facing real hiring boards.
 </p>

 <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-slate-100 pt-10">
 <div>
 <h4 className="font-medium text-slate-900 flex items-center gap-3 mb-2">
 <IoChatbubblesOutline className="text-slate-400" /> Mock HR Rounds
 </h4>
 <p className="text-xs font-light text-slate-500 leading-relaxed">
 Live practice with senior tech recruiters.
 </p>
 </div>
 <div>
 <h4 className="font-medium text-slate-900 flex items-center gap-3 mb-2">
 <IoSearchOutline className="text-slate-400" /> Resume Audit
 </h4>
 <p className="text-xs font-light text-slate-500 leading-relaxed">
 Personalized refinement to bypass global ATS filters.
 </p>
 </div>
 </div>
 </div>
 <div className="flex-1 relative hidden lg:block border-l border-slate-200">
 <Image
 src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&h=800&fit=crop"
 alt="Interview lab"
 fill
 sizes="50vw"
 className="object-cover grayscale opacity-90"
 />
 </div>
 </div>
 </div>

 {/* Global Stats Footer */}
 <div className="bg-slate-900 py-20 px-4">
 <div className="container-custom max-w-5xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12">
 <div className="flex flex-col sm:flex-row gap-12 md:gap-20 text-center sm:text-left w-full lg:w-auto">
 <div>
 <p className="text-4xl md:text-5xl font-light text-white mb-2">{data?.stats?.partners || "0+"}</p>
 <p className="text-[10px] sm:text-xs font-medium uppercase tracking-widest text-slate-400">Global Hiring Partners</p>
 </div>
 <div>
 <p className="text-4xl md:text-5xl font-light text-white mb-2">{data?.stats?.rate || "0%"}</p>
 <p className="text-[10px] sm:text-xs font-medium uppercase tracking-widest text-slate-400">Placement Success Rate</p>
 </div>
 </div>
 <button className="hidden lg:inline-flex px-8 py-4 bg-white text-slate-900 font-medium hover:bg-slate-200 transition-colors uppercase tracking-widest text-xs shrink-0">
 Partner With Our Placement Cell
 </button>
 </div>
 </div>

 {/* Mobile Sticky CTA */}
 <div className="sticky bottom-0 left-0 right-0 p-4 bg-white border-t border-slate-200 z-50 lg:hidden flex justify-center mt-auto">
 <button className="w-full py-4 bg-slate-900 text-white font-medium text-xs uppercase tracking-widest hover:bg-slate-800 transition-colors">
 Partner With Us
 </button>
 </div>
 </section>
 );
}
