"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
 IoLayersOutline,
 IoSparklesOutline,
 IoCodeSlashOutline,
 IoBrowsersOutline,
 IoFingerPrintOutline,
 IoColorPaletteOutline,
 IoPulseOutline
} from "react-icons/io5";
import { getIcon } from "@/lib/icons";

export default function UiUxClient({ content }) {
 if (!content) return null;

 const { hero, sections, cta } = content.landing;
 const pillars = sections.pillars || [];
 const metrics = sections.metrics || [];

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
 <IoSparklesOutline size={16} />
 {hero.badge}
 </motion.div>
 <motion.h1
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ delay: 0.1 }}
 className="text-4xl sm:text-5xl lg:text-7xl font-light text-slate-900 leading-[1.1] tracking-tight"
 >
 {hero.title?.split('UX')[0]}UX <br />
 <span className="font-medium">
 {hero.title?.split('UX')[1] || "Experience"}
 </span>
 </motion.h1>
 <motion.p
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ delay: 0.2 }}
 className="text-slate-500 text-lg md:text-xl leading-relaxed max-w-2xl font-light"
 >
 {hero.description}
 </motion.p>
 <div className="flex flex-col sm:flex-row gap-4 mt-6">
 <button className="w-full sm:w-auto px-8 py-4 bg-slate-900 text-white font-medium hover:bg-slate-800 transition-colors uppercase tracking-widest text-xs">
 Initialize Product Audit
 </button>
 <Link
 href="/services/ui-ux/details"
 className="w-full sm:w-auto px-8 py-4 bg-white border border-slate-200 text-slate-900 font-medium hover:bg-slate-50 transition-colors uppercase tracking-widest text-xs flex items-center justify-center text-center"
 >
 Design Manifest
 </Link>
 </div>
 </div>
 </div>

 <div className="container-custom py-20 bg-slate-50">
 {/* PILLARS SECTION */}
 <div className="mb-24">
 <div className="flex items-center justify-between mb-12">
 <h2 className="text-3xl font-light text-slate-900 tracking-tight">Architecting <span className="font-medium">user behavior.</span></h2>
 <div className="hidden md:block h-[1px] flex-1 bg-slate-200 ml-8"></div>
 </div>

 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
 {pillars?.map((item, i) => (
 <motion.div
 key={i}
 initial={{ opacity: 0, y: 20 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true }}
 transition={{ delay: i * 0.1 }}
 className="bg-white border border-slate-200 p-8 hover:border-slate-400 hover:shadow-lg transition-all flex flex-col group"
 >
 <div className="w-14 h-14 bg-slate-900 text-white flex items-center justify-center mb-6 group-hover:scale-105 transition-transform">
 {getIcon(item.icon)}
 </div>
 <h3 className="text-xl font-medium text-slate-900 mb-3 tracking-tight">{item.title}</h3>
 <p className="text-slate-500 font-light leading-relaxed flex-1 mb-8">{item.desc}</p>
 </motion.div>
 ))}
 </div>
 </div>

 {/* ATOMIC METRICS SECTION */}
 <div className="mb-24 bg-white border border-slate-200 p-8 md:p-16 flex flex-col lg:flex-row gap-16 items-center">
 <div className="flex-1">
 <h2 className="text-3xl md:text-5xl font-light text-slate-900 tracking-tight mb-6">Atomic <br /><span className="font-medium">Scaling.</span></h2>
 <p className="text-slate-500 font-light leading-relaxed mb-10 max-w-lg">We build highly scalable Design Systems that standardize component logic and ensure absolute visual consistency across platforms.</p>

 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
 {metrics?.map((item, idx) => (
 <div key={idx} className="p-6 bg-slate-50 border border-slate-200 hover:border-slate-300 transition-colors">
 <h4 className="text-xs font-medium text-slate-900 uppercase tracking-widest mb-2">{item.t}</h4>
 <p className="text-sm text-slate-500 font-light">{item.d}</p>
 </div>
 ))}
 </div>
 </div>
 <div className="flex-1 w-full bg-slate-900 p-8 md:p-12 text-white flex flex-col">
 <div className="flex justify-between items-center mb-8 border-b border-white/20 pb-6 text-xs font-mono text-white/50 tracking-widest">
 <span>Interaction Spec</span>
 <span>UI_COMPONENT_v4.2</span>
 </div>
 <div className="space-y-8">
 <div className="flex items-center gap-6">
 <div className="w-14 h-14 bg-white/10 flex items-center justify-center text-white text-2xl font-black">A</div>
 <div className="flex-1 space-y-2">
 <div className="h-1.5 bg-white/20 w-full relative">
 <motion.div initial={{ width: 0 }} whileInView={{ width: "94%" }} transition={{ duration: 2 }} className="absolute inset-0 bg-white" />
 </div>
 <div className="h-1.5 bg-white/10 w-1/4"></div>
 </div>
 </div>
 </div>
 <div className="mt-12 pt-8 border-t border-white/20 flex justify-between items-center">
 <p className="text-[10px] font-mono text-white/70 font-bold tracking-tighter uppercase">Consistency::98% / Benchmark</p>
 <IoPulseOutline className="text-white/50 text-2xl" />
 </div>
 </div>
 </div>
 </div>

 {/* FINAL CTA RIBBON */}
 <div className="bg-slate-900 py-24 px-4 text-center text-white flex flex-col items-center">
 <IoColorPaletteOutline className="text-5xl mb-6 text-white/50" />
 <h3 className="text-white text-3xl md:text-5xl font-light tracking-tight leading-[1.1] mb-10">
 {cta.title?.includes('. ') ? (
 <>
 {cta.title.split('. ')[0]}. <br />
 <span className="font-medium">
 {cta.title.split('. ')[1]}
 </span>
 </>
 ) : (
 <>
 Ready to activate your <br />
 <span className="font-medium">
 {cta.title}
 </span>
 </>
 )}
 </h3>
 <div className="flex flex-col sm:flex-row gap-4 justify-center">
 <button className="w-full sm:w-auto px-8 py-4 bg-white text-slate-900 font-medium hover:bg-slate-200 transition-colors uppercase tracking-widest text-xs">
 Initialize Product Audit
 </button>
 </div>
 </div>

 {/* Mobile Sticky CTA */}
 <div className="sticky bottom-0 left-0 right-0 p-4 bg-white border-t border-slate-200 z-50 md:hidden flex justify-center mt-auto">
 <button className="w-full py-4 bg-slate-900 text-white font-medium text-xs uppercase tracking-widest hover:bg-slate-800 transition-colors">
 Initialize Product Audit
 </button>
 </div>
 </section>
 );
}
