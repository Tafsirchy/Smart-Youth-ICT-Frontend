"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
 IoGlobeOutline,
 IoCheckmarkCircle,
 IoShieldCheckmarkOutline,
 IoSearchOutline,
 IoArrowBackOutline
} from "react-icons/io5";

export default function FreelancingClient({ data, content }) {
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
 {content?.hero?.badge || "Digital Sovereignty"}
 </motion.div>
 <motion.h1
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ delay: 0.1 }}
 className="text-4xl sm:text-5xl lg:text-7xl font-light text-slate-900 leading-[1.1] tracking-tight"
 >
 {content?.hero?.title || "Freelancing"} <br />
 <span className="font-medium">
 {content?.hero?.subtitle || "Success Training"}
 </span>
 </motion.h1>
 <motion.p
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ delay: 0.2 }}
 className="text-slate-500 text-lg md:text-xl leading-relaxed max-w-2xl font-light"
 >
 {content?.hero?.description || "Master the art of high-ticket client acquisition on global marketplaces."}
 </motion.p>

 <motion.div
 initial={{ opacity: 0, y: 10 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ delay: 0.3 }}
 className="pt-6"
 >
 <Link
 href="/services/freelancing/details"
 className="inline-flex items-center gap-3 text-sm font-medium uppercase tracking-widest text-slate-900 hover:text-slate-500 transition-colors group"
 >
 View Market Manifest <IoArrowBackOutline className="rotate-180 group-hover:translate-x-2 transition-transform" />
 </Link>
 </motion.div>
 </div>
 </div>

 <div className="container-custom py-20 bg-slate-50">
 {data?.classifications?.length > 0 ? (
 /* Target Classifications */
 <div className="mb-20">
 <div className="flex items-center justify-between mb-12">
 <h2 className="text-3xl font-light text-slate-900 tracking-tight">Marketplace <span className="font-medium">Strategy Hubs</span></h2>
 <div className="hidden md:block h-[1px] flex-1 bg-slate-200 ml-8"></div>
 </div>
 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
 {data.classifications.map((item, i) => (
 <motion.div
 key={i}
 initial={{ opacity: 0, y: 30 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true }}
 transition={{ delay: i * 0.1 }}
 className="bg-white border border-slate-200 p-8 hover:border-slate-400 hover:shadow-lg transition-all flex flex-col group"
 >
 <div className={`w-14 h-14 bg-slate-900 text-white flex items-center justify-center mb-6 group-hover:scale-105 transition-transform`}>
 <IoGlobeOutline size={24} />
 </div>
 <p className="text-[10px] font-medium uppercase tracking-widest text-slate-400 mb-2">{item.type}</p>
 <h3 className="text-xl font-medium text-slate-900 mb-3 tracking-tight">{item.title}</h3>
 <p className="text-slate-500 text-sm font-light leading-relaxed flex-1 mb-8">{item.desc}</p>

 <div className="space-y-3 pt-6 border-t border-slate-100 mt-auto">
 {item.features?.map((f, idx) => (
 <div key={idx} className="flex items-center gap-3 text-[10px] sm:text-xs font-medium text-slate-600 uppercase tracking-widest">
 <IoCheckmarkCircle className="text-slate-400 text-base shrink-0" />
 {f}
 </div>
 ))}
 </div>
 </motion.div>
 ))}
 </div>
 </div>
 ) : (
 <div className="text-center py-20 bg-white border border-slate-200 mb-20">
 <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-50 border border-slate-200 text-slate-400 mb-6">
 <IoSearchOutline size={32} />
 </div>
 <p className="text-slate-900 font-medium text-xl mb-2">Strategy Catalog Ready</p>
 <p className="text-slate-500 font-light">Content is being updated.</p>
 </div>
 )}

 {/* Dynamic Mastery Roadmap */}
 {data?.phases?.length > 0 && (
 <div className="mb-20 max-w-4xl mx-auto">
 <h2 className="text-3xl font-light text-slate-900 text-center mb-16 tracking-tight">Mastery <span className="font-medium">Roadmap.</span></h2>
 <div className="space-y-8 relative">
 {data.phases.map((p, i) => (
 <motion.div
 key={i}
 initial={{ opacity: 0, y: 20 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true }}
 transition={{ delay: i * 0.1 }}
 className="flex flex-col md:flex-row gap-6 md:gap-8 items-start bg-white p-8 border border-slate-200"
 >
 <div className="w-12 h-12 bg-slate-900 flex items-center justify-center text-white font-medium shrink-0">
 {p.step}
 </div>
 <div className="flex-1 flex flex-col gap-2">
 <h3 className="text-xl font-medium text-slate-900 tracking-tight">{p.title}</h3>
 <p className="text-slate-500 font-light leading-relaxed">{p.desc}</p>
 </div>
 </motion.div>
 ))}
 </div>
 </div>
 )}
 </div>

 {/* Global Access Banner */}
 <div className="bg-slate-900 py-24 px-4 text-center text-white flex flex-col items-center">
 <IoShieldCheckmarkOutline className="text-5xl mb-6 text-white/50" />
 <h2 className="text-white text-3xl md:text-5xl font-light tracking-tight leading-[1.1] mb-6">Certified Global <br /><span className="font-medium">Freelance Expert.</span></h2>
 <p className="text-slate-400 text-lg font-light max-w-2xl mx-auto leading-relaxed mb-10">Receive a high-authority digital credential that proves your proficiency to clients across 180+ countries.</p>
 <button className="hidden lg:inline-flex px-8 py-4 bg-white text-slate-900 font-medium hover:bg-slate-200 transition-colors uppercase tracking-widest text-xs">
 Join Next BootCamp
 </button>
 </div>

 {/* Mobile Sticky CTA */}
 <div className="sticky bottom-0 left-0 right-0 p-4 bg-white border-t border-slate-200 z-50 lg:hidden flex justify-center mt-auto">
 <button className="w-full py-4 bg-slate-900 text-white font-medium text-xs uppercase tracking-widest hover:bg-slate-800 transition-colors">
 Join Next BootCamp
 </button>
 </div>
 </section>
 );
}
