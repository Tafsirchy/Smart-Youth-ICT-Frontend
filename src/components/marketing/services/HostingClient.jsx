"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
 IoServerOutline,
 IoSearchOutline,
 IoCheckmarkCircleOutline,
 IoCloseCircleOutline,
 IoSparklesOutline
} from "react-icons/io5";
import { getIcon } from "@/lib/icons";

export default function HostingClient({ data }) {
 const [isAnnual, setIsAnnual] = useState(true);
 const [domainQuery, setDomainQuery] = useState("");
 const [isSearching, setIsSearching] = useState(false);
 const [searchResult, setSearchResult] = useState(null);

 if (!data) return null;

 const handleSearch = (e) => {
 e.preventDefault();
 if (!domainQuery) return;
 setIsSearching(true);
 setTimeout(() => {
 const isAvailable = Math.random() > 0.3;
 setSearchResult({
 domain: domainQuery.includes(".") ? domainQuery : `${domainQuery}.com`,
 available: isAvailable,
 price: isAvailable ? "$12.99/yr" : null
 });
 setIsSearching(false);
 }, 1200);
 };

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
 {data.hero.badge}
 </motion.div>
 <motion.h1
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ delay: 0.1 }}
 className="text-4xl sm:text-5xl lg:text-7xl font-light text-slate-900 leading-[1.1] tracking-tight"
 >
 {data.hero.title?.split(' ')[0]} <br />
 <span className="font-medium">
 {data.hero.title?.split(' ').slice(1).join(' ')}
 </span>
 </motion.h1>
 <motion.p
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ delay: 0.2 }}
 className="text-slate-500 text-lg md:text-xl leading-relaxed max-w-2xl font-light"
 >
 {data.hero.description}
 </motion.p>
 <div className="flex flex-col sm:flex-row gap-4 mt-6">
 <button className="w-full sm:w-auto px-8 py-4 bg-slate-900 text-white font-medium hover:bg-slate-800 transition-colors uppercase tracking-widest text-xs">
 {data.cta?.title || "Initialize Plan"}
 </button>
 <Link
 href="/services/hosting/details"
 className="w-full sm:w-auto px-8 py-4 bg-white border border-slate-200 text-slate-900 font-medium hover:bg-slate-50 transition-colors uppercase tracking-widest text-xs flex items-center justify-center text-center"
 >
 Technical Specifications
 </Link>
 </div>
 </div>
 </div>

 <div className="container-custom py-20 bg-slate-50">
 {/* DOMAIN SEARCH SECTION */}
 <div className="mb-24">
 <div className="max-w-4xl mx-auto bg-white border border-slate-200 p-8 md:p-16 flex flex-col">
 <h2 className="text-3xl font-light text-slate-900 mb-8 tracking-tight">Claim Your <span className="font-medium">Digital Node.</span></h2>
 <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4">
 <div className="flex-1 flex items-center px-4 bg-slate-50 border border-slate-200 focus-within:border-slate-400 transition-colors min-h-[56px]">
 <IoSearchOutline className="text-slate-500 text-xl shrink-0 mr-3" />
 <input
 type="text"
 placeholder="Find your perfect domain (e.g. syict.com)"
 className="bg-transparent border-none outline-none text-slate-900 w-full font-medium placeholder:text-slate-400 min-w-0"
 value={domainQuery}
 onChange={(e) => setDomainQuery(e.target.value)}
 />
 </div>
 <button
 disabled={isSearching}
 className="bg-slate-900 text-white font-medium px-8 py-4 hover:bg-slate-800 transition-colors flex items-center justify-center uppercase tracking-widest text-xs min-h-[56px]"
 >
 {isSearching ? <div className="w-4 h-4 border-2 border-white/30 border-t-white animate-spin"></div> : "Search Registry"}
 </button>
 </form>

 <AnimatePresence>
 {searchResult && (
 <motion.div
 initial={{ opacity: 0, y: 10 }}
 animate={{ opacity: 1, y: 0 }}
 exit={{ opacity: 0 }}
 className={`mt-8 p-6 border flex flex-col sm:flex-row sm:items-center justify-between gap-6 ${searchResult.available ? 'bg-white border-slate-900 text-slate-900' : 'bg-slate-50 border-slate-200 text-slate-500'}`}
 >
 <div className="flex items-center gap-4">
 {searchResult.available ? <IoCheckmarkCircleOutline className="text-slate-900 text-2xl shrink-0" /> : <IoCloseCircleOutline className="text-slate-400 text-2xl shrink-0" />}
 <div className="text-left min-w-0">
 <p className="font-medium text-xl truncate">{searchResult.domain}</p>
 <p className="text-[10px] font-medium uppercase tracking-widest opacity-60 mt-1">
 {searchResult.available ? 'Ready for registration' : 'Already registered'}
 </p>
 </div>
 </div>
 {searchResult.available && (
 <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
 <p className="font-medium text-xl">{searchResult.price}</p>
 <button className="bg-slate-900 text-white font-medium px-6 py-3 text-xs uppercase tracking-widest w-full sm:w-auto">Reserve</button>
 </div>
 )}
 </motion.div>
 )}
 </AnimatePresence>
 </div>
 </div>

 {/* SLA METRICS SECTION */}
 {data.sections.metrics && data.sections.metrics.length > 0 && (
 <div className="mb-24">
 <div className="flex items-center justify-between mb-12">
 <h2 className="text-3xl font-light text-slate-900 tracking-tight">SLA Metrics <span className="font-medium">Matrix</span></h2>
 <div className="hidden md:block h-[1px] flex-1 bg-slate-200 ml-8"></div>
 </div>
 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
 {data.sections.metrics.map((item, idx) => (
 <div key={idx} className="bg-white p-8 border border-slate-200 hover:border-slate-400 transition-colors">
 <h4 className="text-xs font-medium text-slate-900 uppercase tracking-widest mb-3">{item.t}</h4>
 <p className="text-sm text-slate-500 font-light leading-relaxed">{item.d}</p>
 </div>
 ))}
 </div>
 </div>
 )}

 {/* PRICING TABLE */}
 <div className="mb-24">
 <div className="text-center mb-16">
 <h2 className="text-xs font-medium text-slate-500 uppercase tracking-widest mb-4">Infrastructure Tiers</h2>
 <div className="inline-flex flex-col sm:flex-row items-center p-1 bg-slate-100 border border-slate-200">
 <button
 onClick={() => setIsAnnual(true)}
 className={`px-8 py-3 text-xs font-medium uppercase tracking-widest transition-all ${isAnnual ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'}`}
 >
 Annual (-20%)
 </button>
 <button
 onClick={() => setIsAnnual(false)}
 className={`px-8 py-3 text-xs font-medium uppercase tracking-widest transition-all ${!isAnnual ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'}`}
 >
 Monthly
 </button>
 </div>
 </div>

 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
 {(data.sections.plans || []).map((plan, i) => (
 <div key={plan.name} className={`bg-white p-8 md:p-10 border flex flex-col group transition-all ${plan.popular ? "border-slate-900 shadow-xl" : "border-slate-200"}`}>
 {plan.popular && (
 <div className="text-[10px] font-medium text-slate-500 uppercase tracking-widest mb-4">
 Preferred Tier
 </div>
 )}
 <h4 className="text-2xl font-medium text-slate-900 mb-2 tracking-tight">{plan.name}</h4>
 <p className="text-sm text-slate-500 font-light mb-8">{plan.desc}</p>
 
 <div className="mb-10 pb-8 border-b border-slate-100">
 <p className="text-4xl font-medium text-slate-900 mb-2">
 ${isAnnual ? (plan.annualPrice / 12).toFixed(2) : plan.monthlyPrice}
 <span className="text-lg text-slate-400 font-light"> /mo</span>
 </p>
 <p className="text-xs text-slate-400 font-medium uppercase tracking-widest">Billed {isAnnual ? 'Annually' : 'Monthly'}</p>
 </div>

 <div className="space-y-4 mb-10 flex-1">
 {plan.features?.map(f => (
 <div key={f} className="flex gap-3 items-center text-slate-500 font-light text-sm">
 <IoCheckmarkCircleOutline className="text-slate-400 text-lg shrink-0" /> {f}
 </div>
 ))}
 </div>

 <button className={`w-full py-4 font-medium uppercase tracking-widest text-xs transition-colors ${plan.popular ? "bg-slate-900 text-white hover:bg-slate-800" : "bg-white border border-slate-200 text-slate-900 hover:bg-slate-50"}`}>
 Initialize Instance
 </button>
 </div>
 ))}
 </div>
 </div>
 
 {/* PILLARS SECTION */}
 <div className="mb-24">
 <div className="flex items-center justify-between mb-12">
 <h2 className="text-3xl font-light text-slate-900 tracking-tight">Industrial <span className="font-medium">Infrastructure.</span></h2>
 <div className="hidden md:block h-[1px] flex-1 bg-slate-200 ml-8"></div>
 </div>

 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
 {(data.sections.pillars || []).map((item, i) => (
 <div key={i} className="bg-white border border-slate-200 p-8 flex flex-col group">
 <div className="w-14 h-14 bg-slate-900 text-white flex items-center justify-center mb-6">
 {getIcon(item.icon)}
 </div>
 <h3 className="text-xl font-medium text-slate-900 mb-3 tracking-tight">{item.title}</h3>
 <p className="text-slate-500 font-light leading-relaxed flex-1 mb-8">{item.desc}</p>
 </div>
 ))}
 </div>
 </div>
 </div>

 {/* CTA */}
 <div className="bg-slate-900 py-24 px-4 text-center text-white flex flex-col items-center">
 <IoServerOutline className="text-5xl mb-6 text-white/50" />
 <h3 className="text-white text-3xl md:text-5xl font-light tracking-tight leading-[1.1] mb-10">
 Scale your digital footprint. <br />
 <span className="font-medium">
 Command the Infrastructure.
 </span>
 </h3>
 <div className="flex flex-col sm:flex-row gap-4 justify-center">
 <button className="w-full sm:w-auto px-8 py-4 bg-white text-slate-900 font-medium hover:bg-slate-200 transition-colors uppercase tracking-widest text-xs">
 {data.cta?.title || "Initialize Plan"}
 </button>
 <Link
 href="/services/hosting/details"
 className="w-full sm:w-auto px-8 py-4 border border-white/20 text-white font-medium hover:bg-white/10 transition-colors uppercase tracking-widest text-xs flex items-center justify-center text-center"
 >
 Technical Hub
 </Link>
 </div>
 </div>

 {/* Mobile Sticky CTA */}
 <div className="sticky bottom-0 left-0 right-0 p-4 bg-white border-t border-slate-200 z-50 md:hidden flex justify-center mt-auto">
 <button className="w-full py-4 bg-slate-900 text-white font-medium text-xs uppercase tracking-widest hover:bg-slate-800 transition-colors">
 {data.cta?.title || "Initialize Plan"}
 </button>
 </div>
 </section>
 );
}
