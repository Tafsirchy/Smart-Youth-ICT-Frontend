"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
 IoDiamondOutline,
 IoCheckmarkCircleOutline,
 IoInfiniteOutline,
 IoFingerPrintOutline
} from "react-icons/io5";
import { getIcon } from "@/lib/icons";

export default function PortfolioWebsitesClient({ data }) {
 if (!data) return null;

 const { hero = {}, sections = {}, cta = {} } = data;
 const philosophies = sections.philosophies || [];
 const phases = sections.phases || [];
 const pricing = sections.pricing || [];

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
 <IoDiamondOutline size={16} />
 {hero.badge}
 </motion.div>
 <motion.h1
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ delay: 0.1 }}
 className="text-4xl sm:text-5xl lg:text-7xl font-light text-slate-900 leading-[1.1] tracking-tight"
 >
 {hero.title?.split(" ")[0]} <br />
 <span className="font-medium">
 {hero.subtitle}
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
 </div>
 </div>

 <div className="container-custom py-20 bg-slate-50">
 {/* DESIGN PHILOSOPHIES */}
 <div className="mb-24">
 <div className="flex items-center justify-between mb-12">
 <h2 className="text-3xl font-light text-slate-900 tracking-tight">Core <span className="font-medium">Methodologies.</span></h2>
 <div className="hidden md:block h-[1px] flex-1 bg-slate-200 ml-8"></div>
 </div>

 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
 {philosophies?.map((style, i) => (
 <motion.div
 key={i}
 initial={{ opacity: 0, y: 20 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true }}
 transition={{ delay: i * 0.1 }}
 className="bg-white border border-slate-200 p-8 hover:border-slate-400 hover:shadow-lg transition-all flex flex-col group"
 >
 <div className="w-14 h-14 bg-slate-900 text-white flex items-center justify-center mb-6 group-hover:scale-105 transition-transform">
 {getIcon(style.icon)}
 </div>
 <h3 className="text-xl font-medium text-slate-900 mb-3 tracking-tight">{style.title}</h3>
 <p className="text-slate-500 font-light leading-relaxed mb-8 flex-1">{style.desc}</p>
 <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-slate-900 group-hover:text-slate-500 transition-colors">
 Learn More <IoInfiniteOutline className="text-lg" />
 </div>
 </motion.div>
 ))}
 </div>
 </div>

 {/* DIGITAL ALCHEMY */}
 <div className="mb-24 max-w-4xl mx-auto">
 <h2 className="text-3xl font-light text-slate-900 text-center mb-16 tracking-tight">Digital <span className="font-medium">Alchemy.</span></h2>
 <div className="space-y-8 relative">
 {phases?.map((phase, idx) => (
 <motion.div
 key={idx}
 initial={{ opacity: 0, y: 20 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true }}
 transition={{ delay: idx * 0.1 }}
 className="flex flex-col md:flex-row gap-6 md:gap-8 items-start bg-white p-8 border border-slate-200"
 >
 <div className="w-12 h-12 bg-slate-900 flex items-center justify-center text-white font-medium shrink-0">
 {phase.id}
 </div>
 <div className="flex-1 flex flex-col gap-2">
 <h4 className="text-xl font-medium text-slate-900 tracking-tight">{phase.t}</h4>
 <p className="text-slate-500 font-light leading-relaxed">{phase.d}</p>
 </div>
 </motion.div>
 ))}
 </div>
 </div>

 {/* PREMIUM PACKAGES */}
 <div className="mb-24">
 <div className="text-center max-w-2xl mx-auto mb-16">
 <h2 className="text-xs font-medium text-slate-500 uppercase tracking-widest mb-4">{sections.pricingHeader?.badge || "Select Your Artifact"}</h2>
 <p className="text-3xl md:text-5xl font-light text-slate-900 leading-[1.1]">{sections.pricingHeader?.title || "Structured tiers for"} <span className="font-medium">{sections.pricingHeader?.focus || "every career stage."}</span></p>
 </div>

 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
 {pricing?.map((tier, idx) => (
 <div key={idx} className={`bg-white p-8 md:p-10 border flex flex-col group transition-all ${tier.highlight ? "border-slate-900 shadow-xl" : "border-slate-200"}`}>
 <h4 className="text-2xl font-medium text-slate-900 mb-2 tracking-tight">{tier.t}</h4>
 <p className="text-4xl font-medium text-slate-900 mb-8">{tier.p}</p>

 <div className="space-y-4 mb-10 flex-1 border-t border-slate-100 pt-6">
 {tier.list?.map(item => (
 <div key={item} className="flex gap-3 items-center text-slate-500 font-light text-sm">
 <IoCheckmarkCircleOutline className="text-slate-400 text-lg shrink-0" /> {item}
 </div>
 ))}
 </div>

 <button className={`w-full py-4 font-medium uppercase tracking-widest text-xs transition-colors ${tier.highlight ? "bg-slate-900 text-white hover:bg-slate-800" : "bg-white border border-slate-200 text-slate-900 hover:bg-slate-50"}`}>
 Select {tier.t}
 </button>
 </div>
 ))}
 </div>
 </div>
 </div>

 {/* CALL TO ACTION */}
 <div className="bg-slate-900 py-24 px-4 text-center text-white flex flex-col items-center">
 <IoFingerPrintOutline className="text-5xl mb-6 text-white/50" />
 <h3 className="text-white text-3xl md:text-5xl font-light tracking-tight leading-[1.1] mb-10">{cta.title}</h3>
 <div className="flex flex-col sm:flex-row gap-4 justify-center">
 <button className="w-full sm:w-auto px-8 py-4 bg-white text-slate-900 font-medium hover:bg-slate-200 transition-colors uppercase tracking-widest text-xs">
 Consult Portfolio Expert
 </button>
 <Link
 href="/services/portfolio-websites/details"
 className="w-full sm:w-auto px-8 py-4 border border-white/20 text-white font-medium hover:bg-white/10 transition-colors uppercase tracking-widest text-xs flex items-center justify-center text-center"
 >
 Technical Details
 </Link>
 </div>
 </div>

 {/* Mobile Sticky CTA */}
 <div className="sticky bottom-0 left-0 right-0 p-4 bg-white border-t border-slate-200 z-50 md:hidden flex justify-center mt-auto">
 <button className="w-full py-4 bg-slate-900 text-white font-medium text-xs uppercase tracking-widest hover:bg-slate-800 transition-colors">
 Book Now
 </button>
 </div>
 </section>
 );
}
