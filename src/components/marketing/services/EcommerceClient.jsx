"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
 IoCartOutline,
 IoCheckmarkCircleOutline,
 IoGitNetworkOutline,
 IoBagCheckOutline,
} from "react-icons/io5";
import { getIcon } from "@/lib/icons";

export default function EcommerceClient({ data }) {
 if (!data) return null;

 const { hero = {}, sections = {}, cta = {} } = data;
 const verticals = sections.verticals || [];
 const integrations = sections.integrations || [];
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
 <IoCartOutline size={16} />
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
 <div className="flex flex-col sm:flex-row gap-4 mt-6">
 <button className="w-full sm:w-auto px-8 py-4 bg-slate-900 text-white font-medium hover:bg-slate-800 transition-colors uppercase tracking-widest text-xs">
 Initialize Storefront
 </button>
 <Link
 href="/services/ecommerce/details"
 className="w-full sm:w-auto px-8 py-4 bg-white border border-slate-200 text-slate-900 font-medium hover:bg-slate-50 transition-colors uppercase tracking-widest text-xs flex items-center justify-center text-center"
 >
 Technical Specifications
 </Link>
 </div>
 </div>
 </div>

 <div className="container-custom py-20 bg-slate-50">
 {/* SERVICE VERTICALS */}
 <div className="mb-24">
 <div className="flex items-center justify-between mb-12">
 <h2 className="text-3xl font-light text-slate-900 tracking-tight">Architectures built for <span className="font-medium">transactional dominance.</span></h2>
 <div className="hidden md:block h-[1px] flex-1 bg-slate-200 ml-8"></div>
 </div>

 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
 {verticals?.map((item, i) => (
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

 {/* INTEGRATION HUB */}
 <div className="mb-24 bg-white border border-slate-200 p-8 md:p-16 flex flex-col lg:flex-row gap-16 items-center">
 <div className="flex-1">
 <h2 className="text-3xl md:text-5xl font-light text-slate-900 tracking-tight mb-6">Atomic <br /><span className="font-medium">Logistics.</span></h2>
 <p className="text-slate-500 font-light leading-relaxed mb-10 max-w-lg">We don't just bridge code; we bridge revenue. Every integration is engineered for zero-latency sync and absolute data integrity.</p>

 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
 {integrations?.map((int, i) => (
 <div key={i} className="p-6 bg-slate-50 border border-slate-200 hover:border-slate-300 transition-colors flex items-start gap-4">
 <div className="text-slate-900 text-2xl">{getIcon(int.icon)}</div>
 <div>
 <h4 className="text-xs font-medium text-slate-900 uppercase tracking-widest mb-1">{int.t}</h4>
 <p className="text-sm text-slate-500 font-light">{int.d}</p>
 </div>
 </div>
 ))}
 </div>
 </div>
 <div className="flex-1 w-full bg-slate-900 p-8 md:p-12 text-white flex flex-col">
 <div className="flex justify-between items-center mb-8 border-b border-white/20 pb-6">
 <span className="text-xs font-medium uppercase tracking-widest text-white/50">HUB_ID_PROX_88</span>
 <span className="text-xs font-medium uppercase tracking-widest text-white/50">CORE_STATUS::UP</span>
 </div>
 <div className="space-y-8">
 <div className="flex items-center gap-6">
 <div className="w-14 h-14 bg-white/10 flex items-center justify-center text-white text-2xl"><IoGitNetworkOutline /></div>
 <div className="flex-1 space-y-2">
 <div className="h-1.5 bg-white/20 w-full"></div>
 <div className="h-1.5 bg-white/10 w-1/2"></div>
 </div>
 </div>
 <div className="p-6 bg-white/5 border border-white/10">
 <p className="text-white/70 font-mono text-xs mb-4 tracking-tighter">DATALOAD::VERIFIED</p>
 <div className="flex gap-4">
 {[1, 2, 3, 4].map(i => <div key={i} className="h-8 flex-1 bg-white/10"></div>)}
 </div>
 </div>
 </div>
 </div>
 </div>

 {/* PRICING SELECTOR */}
 <div className="mb-24">
 <div className="text-center max-w-2xl mx-auto mb-16">
 <h2 className="text-xs font-medium text-slate-500 uppercase tracking-widest mb-4">Commerce Tiers</h2>
 <p className="text-3xl md:text-5xl font-light text-slate-900 leading-[1.1]">Select your <span className="font-medium">market engine.</span></p>
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
 Initialize Build
 </button>
 </div>
 ))}
 </div>
 </div>
 </div>

 {/* CALL TO ACTION */}
 <div className="bg-slate-900 py-24 px-4 text-center text-white flex flex-col items-center">
 <IoBagCheckOutline className="text-5xl mb-6 text-white/50" />
 <h3 className="text-white text-3xl md:text-5xl font-light tracking-tight leading-[1.1] mb-10">{cta.title?.split('your ')[0]}your <br /><span className="font-medium">{cta.title?.split('your ')[1]}</span></h3>
 <div className="flex flex-col sm:flex-row gap-4 justify-center">
 <button className="w-full sm:w-auto px-8 py-4 bg-white text-slate-900 font-medium hover:bg-slate-200 transition-colors uppercase tracking-widest text-xs">
 Initialize Build
 </button>
 <Link
 href="/services/ecommerce/details"
 className="w-full sm:w-auto px-8 py-4 border border-white/20 text-white font-medium hover:bg-white/10 transition-colors uppercase tracking-widest text-xs flex items-center justify-center text-center"
 >
 Technical Specifications
 </Link>
 </div>
 </div>

 {/* Mobile Sticky CTA */}
 <div className="sticky bottom-0 left-0 right-0 p-4 bg-white border-t border-slate-200 z-50 md:hidden flex justify-center mt-auto">
 <button className="w-full py-4 bg-slate-900 text-white font-medium text-xs uppercase tracking-widest hover:bg-slate-800 transition-colors">
 Build Now
 </button>
 </div>
 </section>
 );
}
