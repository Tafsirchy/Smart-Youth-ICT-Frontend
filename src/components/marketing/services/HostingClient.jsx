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
      <section className="min-h-screen bg-slate-50 text-slate-900 selection:bg-blue-600 selection:text-white overflow-hidden relative font-sans">
         {/* INDUSTRIAL BACKGROUND DECOR */}
         <div className="absolute top-0 opacity-20 pointer-events-none -z-10 w-full h-full">
            <div className="absolute top-0 left-1/4 w-[1px] h-full bg-slate-200"></div>
            <div className="absolute top-0 right-1/4 w-[1px] h-full bg-slate-200"></div>
            <div className="absolute top-1/2 left-0 w-full h-[1px] bg-slate-200"></div>
            <div className="absolute top-[15%] right-[-100px] w-[500px] h-[500px] bg-blue-50 rounded-full blur-[140px]"></div>
         </div>

         <div className="container-custom py-20 relative z-10">
            {/* HOSTING HERO */}
            <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20 mb-32 lg:mb-48 pt-8 lg:pt-0">
               <div className="flex-1 text-left w-full">
                  <motion.div
                     initial={{ opacity: 0, x: -20 }}
                     animate={{ opacity: 1, x: 0 }}
                     className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-[10px] sm:text-xs font-black tracking-wider sm:tracking-[0.4em] uppercase mb-8 sm:mb-10"
                  >
                     <IoSparklesOutline className="text-sm" /> {data.hero.badge}
                  </motion.div>

                  <motion.h1
                     initial={{ opacity: 0, y: 30 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ duration: 0.8, ease: "circOut" }}
                     className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 leading-[1.1] mb-6 sm:mb-8 tracking-tighter"
                  >
                     {data.hero.title?.split(' ')[0]} <br className="hidden sm:block" />
                     <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-violet-500 to-emerald-500 animate-gradient-x block sm:inline mt-2 sm:mt-0">{data.hero.title?.split(' ').slice(1).join(' ')}</span>
                  </motion.h1>

                  <motion.p
                     initial={{ opacity: 0 }}
                     animate={{ opacity: 1 }}
                     transition={{ delay: 0.4 }}
                     className="text-slate-600 text-lg sm:text-xl font-light leading-relaxed max-w-2xl mb-10 sm:mb-12"
                  >
                     {data.hero.description}
                  </motion.p>

                  <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 mb-16 lg:mb-0">
                     <button className="w-full sm:w-[280px] px-8 py-4 sm:py-6 bg-blue-600 text-white font-black rounded-xl hover:bg-blue-700 transition-all shadow-xl sm:shadow-2xl shadow-blue-600/20 uppercase tracking-wider sm:tracking-widest text-xs sm:text-sm flex items-center justify-center min-h-[44px]">
                        {data.cta?.title || "Initialize Plan"}
                     </button>
                     <Link
                        href="/services/hosting/details"
                        className="w-full sm:w-[280px] px-8 py-4 sm:py-6 bg-white border border-slate-200 text-slate-900 font-black rounded-xl hover:bg-slate-50 transition-all uppercase tracking-wider sm:tracking-widest text-xs sm:text-sm flex items-center justify-center text-center min-h-[44px]"
                     >
                        Technical Specifications
                     </Link>
                  </div>
               </div>

               <div className="flex-1 relative hidden lg:block">
                  <motion.div
                     initial={{ opacity: 0, scale: 0.9 }}
                     animate={{ opacity: 1, scale: 1 }}
                     className="relative p-12 bg-white rounded-[4rem] border border-slate-100 shadow-2xl overflow-hidden"
                  >
                     <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: "linear-gradient(#3b82f6 1px, transparent 1px), linear-gradient(90deg, #3b82f6 1px, transparent 1px)", backgroundSize: "40px 40px" }}></div>
                     <div className="relative aspect-square bg-slate-900 rounded-[3rem] p-10 flex flex-col justify-between overflow-hidden shadow-2xl">
                        <div className="flex justify-between items-center text-white/30 font-mono text-[10px] sm:text-xs tracking-[0.2em] sm:tracking-[0.4em]">
                           <span>CORE_SERVER_v6.0</span>
                           <span>99.9%_UPTIME</span>
                        </div>
                        <div className="space-y-4">
                           {[1, 2, 3, 4].map(i => (
                              <div key={i} className="h-12 bg-white/5 rounded-xl border border-white/5 flex items-center px-4 gap-4 relative overflow-hidden group">
                                 <div className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_10px_#3b82f6]"></div>
                                 <div className="flex-1 h-1 bg-white/10 rounded-full">
                                    <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 2, delay: i * 0.3, repeat: Infinity }} className="h-full w-2/3 bg-blue-500/50" />
                                 </div>
                                 <div className="flex gap-1">
                                    {[1, 2, 3].map(j => (
                                       <div key={j} className="w-1 h-3 bg-white/10 rounded-full"></div>
                                    ))}
                                 </div>
                                 <motion.div initial={{ x: "-100%" }} whileHover={{ x: "100%" }} transition={{ duration: 1 }} className="absolute inset-0 bg-white/5 skew-x-12" />
                              </div>
                           ))}
                        </div>
                        <div className="flex justify-between items-center text-blue-400 font-mono text-[10px] sm:text-xs tracking-widest">
                           <p>NVMe::GEN4_SPEED</p>
                           <p>ENCRYPTION::AES_256</p>
                        </div>
                     </div>
                  </motion.div>
               </div>
            </div>

            {/* DOMAIN SEARCH SECTION */}
            <div className="mb-32 lg:mb-48">
               <div className="max-w-4xl mx-auto bg-white border border-slate-100 p-8 sm:p-12 lg:p-20 rounded-3xl lg:rounded-[4rem] shadow-xl lg:shadow-2xl shadow-slate-200/50 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-20 h-20 sm:w-32 sm:h-32 bg-blue-50 rounded-bl-full opacity-50"></div>
                  <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mb-6 tracking-tighter">Claim Your <br className="block sm:hidden" /><span className="text-blue-600">Digital Node.</span></h2>
                  <form onSubmit={handleSearch} className="relative flex flex-col sm:flex-row gap-4 p-2 bg-slate-50 border border-slate-100 rounded-3xl sm:rounded-[2rem] overflow-hidden focus-within:border-blue-500 transition-colors">
                     <div className="flex-1 flex items-center px-4 sm:px-6 gap-3 sm:gap-4 py-4 sm:py-0 min-h-[56px]">
                        <IoSearchOutline className="text-blue-500 text-2xl shrink-0" />
                        <input
                           type="text"
                           placeholder="Find your perfect domain (e.g. syict.com)"
                           className="bg-transparent border-none outline-none text-slate-900 w-full font-bold placeholder:text-slate-400 min-w-0"
                           value={domainQuery}
                           onChange={(e) => setDomainQuery(e.target.value)}
                        />
                     </div>
                     <button
                        disabled={isSearching}
                        className="bg-blue-600 text-white font-black px-8 sm:px-12 py-4 sm:py-5 rounded-2xl w-full sm:w-auto hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 uppercase tracking-wider sm:tracking-widest text-xs sm:text-sm min-h-[56px]"
                     >
                        {isSearching ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : "Search Registry"}
                     </button>
                  </form>

                  <AnimatePresence>
                     {searchResult && (
                        <motion.div
                           initial={{ opacity: 0, y: 10 }}
                           animate={{ opacity: 1, y: 0 }}
                           exit={{ opacity: 0 }}
                           className={`mt-6 sm:mt-8 p-6 sm:p-8 rounded-3xl border flex flex-col sm:flex-row sm:items-center justify-between gap-6 ${searchResult.available ? 'bg-emerald-50 border-emerald-100 text-emerald-900' : 'bg-rose-50 border-rose-100 text-rose-900'}`}
                        >
                           <div className="flex items-center gap-4 sm:gap-6">
                              {searchResult.available ? <IoCheckmarkCircleOutline className="text-emerald-500 text-3xl sm:text-4xl shrink-0" /> : <IoCloseCircleOutline className="text-rose-500 text-3xl sm:text-4xl shrink-0" />}
                              <div className="text-left min-w-0">
                                 <p className="font-black text-xl sm:text-2xl tracking-tighter truncate">{searchResult.domain}</p>
                                 <p className="text-[10px] sm:text-xs font-bold uppercase tracking-widest opacity-60">
                                    {searchResult.available ? 'Ready for registration' : 'Already registered'}
                                 </p>
                              </div>
                           </div>
                           {searchResult.available && (
                              <div className="flex sm:flex-col lg:flex-row items-center gap-4 sm:gap-6 w-full sm:w-auto">
                                 <p className="font-black text-xl w-full sm:w-auto text-left sm:text-right">{searchResult.price}</p>
                                 <button className="bg-emerald-600 text-white font-black px-6 sm:px-8 py-3 rounded-xl text-xs sm:text-sm uppercase tracking-widest w-full sm:w-auto min-h-[44px]">Reserve Node</button>
                              </div>
                           )}
                        </motion.div>
                     )}
                  </AnimatePresence>
               </div>
            </div>

            {/* SLA METRICS SECTION */}
            {data.sections.metrics && data.sections.metrics.length > 0 && (
               <div className="mb-32 lg:mb-48 max-w-7xl mx-auto">
                  <div className="flex items-center gap-6 mb-12 lg:mb-16">
                     <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900 tracking-tighter uppercase leading-none">SLA Metrics Matrix</h2>
                     <div className="h-[1px] flex-1 bg-slate-200"></div>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-px bg-slate-200 border border-slate-200 rounded-3xl lg:rounded-[3rem] overflow-hidden shadow-xl lg:shadow-2xl">
                     {data.sections.metrics.map((item, idx) => (
                        <div key={idx} className="bg-white p-6 sm:p-8 lg:p-10 hover:bg-blue-50 transition-colors group">
                           <h4 className="text-[10px] sm:text-xs font-black text-blue-600 uppercase tracking-widest mb-2 sm:mb-3">{item.t}</h4>
                           <p className="text-xs sm:text-sm text-slate-500 font-medium leading-relaxed">{item.d}</p>
                        </div>
                     ))}
                  </div>
               </div>
            )}

            {/* PRICING TABLE */}
            <div className="mb-32 lg:mb-48">
               <div className="flex flex-col items-center mb-16 lg:mb-24">
                  <h2 className="text-xs font-black text-blue-600 uppercase tracking-widest sm:tracking-[0.4em] mb-4">Infrastructure Tiers</h2>
                  <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 p-1 bg-white border border-slate-100 rounded-3xl sm:rounded-full shadow-lg w-full sm:w-auto">
                     <button
                        onClick={() => setIsAnnual(true)}
                        className={`w-full sm:w-auto px-6 sm:px-8 py-4 rounded-2xl sm:rounded-full text-xs sm:text-sm font-black uppercase tracking-widest transition-all min-h-[44px] ${isAnnual ? 'bg-blue-600 text-white shadow-xl' : 'text-slate-400'}`}
                     >
                        Annual Saving <span className="ml-2 bg-emerald-500 text-black px-2 py-0.5 rounded-full text-[10px]">-20%</span>
                     </button>
                     <button
                        onClick={() => setIsAnnual(false)}
                        className={`w-full sm:w-auto px-6 sm:px-8 py-4 rounded-2xl sm:rounded-full text-xs sm:text-sm font-black uppercase tracking-widest transition-all min-h-[44px] ${!isAnnual ? 'bg-blue-600 text-white shadow-xl' : 'text-slate-400'}`}
                     >
                        Monthly
                     </button>
                  </div>
               </div>

               {/* Full-bleed Mobile Carousel */}
               <div className="overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-8 lg:pb-0 lg:overflow-visible lg:snap-none">
                  <div className="flex lg:grid lg:grid-cols-3 gap-6 lg:gap-8 min-w-max lg:min-w-0 w-max lg:w-auto max-w-7xl mx-auto">
                     {(data.sections.plans || []).map((plan, i) => (
                        <motion.div
                           key={plan.name}
                           initial={{ opacity: 0, y: 30 }}
                           whileInView={{ opacity: 1, y: 0 }}
                           viewport={{ once: true }}
                           transition={{ delay: i * 0.1 }}
                           className={`bg-white border ${plan.popular ? 'border-blue-500 border-2' : 'border-slate-100'} p-8 sm:p-10 lg:p-12 rounded-3xl lg:rounded-[3.5rem] flex flex-col transition-all hover:translate-y-0 lg:hover:-translate-y-4 shadow-xl shadow-slate-200/50 relative group snap-center w-[85vw] max-w-[320px] lg:w-auto lg:max-w-none whitespace-normal`}
                        >
                           {plan.popular && (
                              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-600 text-white px-6 sm:px-8 py-2 rounded-full text-[10px] sm:text-xs font-black uppercase tracking-widest sm:tracking-[0.4em] shadow-2xl whitespace-nowrap">
                                 🔥 Preferred
                              </div>
                           )}
                           <h3 className="text-2xl sm:text-3xl font-black text-slate-900 mb-4">{plan.name}</h3>
                           <p className="text-slate-400 text-xs sm:text-sm mb-8 sm:mb-10 leading-relaxed font-bold">{plan.desc}</p>
                           <div className="mb-8 sm:mb-12 border-b border-slate-100 pb-8 sm:pb-10">
                              <p className="text-5xl sm:text-6xl font-black text-slate-900 leading-none tracking-tighter">
                                 <span className="text-xl sm:text-2xl align-top mr-1 text-blue-600">$</span>
                                 {isAnnual ? (plan.annualPrice / 12).toFixed(2) : plan.monthlyPrice}
                                 <span className="text-base sm:text-lg text-slate-300"> /mo</span>
                              </p>
                              <p className="text-[10px] sm:text-xs text-slate-300 font-black uppercase tracking-widest mt-4">Billed {isAnnual ? `$${plan.annualPrice} / Annual` : 'Monthly Cycle'}</p>
                           </div>

                           <ul className="flex-1 space-y-4 sm:space-y-5 mb-8 sm:mb-12">
                              {plan.features?.map(f => (
                                 <li key={f} className="flex items-center gap-3 sm:gap-4 text-slate-600 text-xs sm:text-sm font-bold">
                                    <IoCheckmarkCircleOutline className="text-blue-500 text-lg sm:text-xl shrink-0" /> <span className="leading-tight">{f}</span>
                                 </li>
                              ))}
                           </ul>
                           <button className={`w-full py-4 sm:py-6 rounded-2xl font-black text-xs sm:text-sm uppercase tracking-wider sm:tracking-widest transition-all min-h-[44px] ${plan.popular ? 'bg-blue-600 text-white shadow-2xl shadow-blue-600/30' : 'bg-slate-900 text-white hover:bg-slate-800'}`}>
                              Initialize Cloud Instance
                           </button>
                        </motion.div>
                     ))}
                  </div>
               </div>
            </div>

            {/* PILLARS SECTION */}
            <div className="max-w-6xl mx-auto py-20 lg:py-32 border-t border-slate-100 mt-20 lg:mt-32">
               <div className="text-center mb-16 lg:mb-24">
                  <h2 className="text-xs font-black text-blue-600 uppercase tracking-widest sm:tracking-[0.4em] mb-4">Core Principles</h2>
                  <h3 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tighter">Industrial <br className="block sm:hidden" /><span className="text-blue-600">Infrastructure.</span></h3>
               </div>
               
               {/* Full-bleed Mobile Carousel */}
               <div className="overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-8 lg:pb-0 lg:overflow-visible lg:snap-none">
                  <div className="flex lg:grid lg:grid-cols-3 gap-6 lg:gap-12 min-w-max lg:min-w-0 w-max lg:w-auto">
                     {(data.sections.pillars || []).map((p, i) => (
                        <motion.div key={i} className="text-center group snap-center w-[85vw] max-w-[320px] lg:w-auto lg:max-w-none whitespace-normal bg-white lg:bg-transparent p-8 lg:p-0 rounded-3xl border border-slate-100 lg:border-none shadow-xl lg:shadow-none">
                           <div className="w-16 h-16 sm:w-20 sm:h-20 bg-blue-50 text-blue-600 rounded-2xl sm:rounded-[2rem] flex items-center justify-center text-3xl sm:text-4xl mx-auto mb-6 sm:mb-10 lg:group-hover:scale-110 transition-transform shadow-lg sm:shadow-xl shadow-blue-600/10 shrink-0">{getIcon(p.icon)}</div>
                           <h4 className="text-slate-900 font-black text-xl sm:text-2xl mb-3 sm:mb-4 tracking-tight">{p.title}</h4>
                           <p className="text-slate-500 font-light leading-relaxed text-sm sm:text-lg">{p.desc}</p>
                        </motion.div>
                     ))}
                  </div>
               </div>
            </div>

            {/* CTA */}
            <div className="text-center py-20 lg:py-40 border-t border-slate-200 pb-32 lg:pb-40">
               <IoServerOutline className="text-6xl lg:text-7xl text-blue-600 mb-8 lg:mb-12 mx-auto opacity-20" />
               <h3 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 mb-10 lg:mb-12 leading-tight tracking-tighter sm:tracking-normal">
                  Scale your digital footprint. <br className="hidden sm:block" />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 font-serif italic font-medium block sm:inline mt-2 sm:mt-0">Command the Infrastructure.</span>
               </h3>
               <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
                  {/* Sticky Mobile CTA */}
                  <div className="fixed bottom-0 left-0 w-full px-4 pt-4 pb-[max(1rem,env(safe-area-inset-bottom))] bg-slate-50/90 backdrop-blur-md border-t border-slate-200 z-50 lg:relative lg:border-none lg:bg-transparent lg:p-0 lg:w-auto">
                     <button className="w-full lg:w-[280px] px-8 py-4 sm:py-6 bg-blue-600 text-white font-black rounded-xl hover:bg-blue-700 transition-all shadow-xl sm:shadow-2xl shadow-blue-600/40 uppercase tracking-wider sm:tracking-widest text-xs sm:text-sm flex items-center justify-center min-h-[44px]">
                        {data.cta?.title || "Initialize Plan"}
                     </button>
                  </div>
                  <Link
                     href="/services/hosting/details"
                     className="hidden lg:flex w-full sm:w-[280px] px-8 py-4 sm:py-6 bg-slate-900 text-white font-black rounded-xl hover:bg-slate-800 transition-all uppercase tracking-wider sm:tracking-widest text-xs sm:text-sm items-center justify-center text-center min-h-[44px]"
                  >
                     Technical Hub
                  </Link>
               </div>
            </div>
         </div>
      </section>
   );
}
