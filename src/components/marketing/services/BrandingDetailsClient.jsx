"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
   IoArrowBackOutline,
   IoTriangleOutline,
   IoJournalOutline,
   IoFingerPrintOutline,
   IoSyncOutline,
   IoCheckmarkCircleOutline,
   IoInfiniteOutline,
   IoDiamondOutline
} from "react-icons/io5";
import { getIcon } from "@/lib/icons";

export default function BrandingDetailsClient({ data }) {
   if (!data) return null;

   const { hero, sections, cta } = data;
   const phases = sections.phases || [];
   const roi = sections.roi || [];
   const manifest = sections.manifest || [];

   return (
      <section className="min-h-screen bg-slate-50 text-slate-900 selection:bg-indigo-600 selection:text-white pb-12 md:pb-20 flex flex-col relative">
         {/* PERSISTENT BREADCRUMB */}
         <div className="border-b border-slate-200 bg-white/80 backdrop-blur-md sticky top-0 z-50">
            <div className="container-custom py-2 md:py-3 flex items-center justify-between">
               <Link href="/services/branding" className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-indigo-600 transition-colors">
                  <IoArrowBackOutline className="text-sm" /> Infrastructure Overview
               </Link>
               <div className="text-[10px] font-black uppercase tracking-[0.4em] text-indigo-600">BRAND_SPEC_v2.4</div>
            </div>
         </div>

         <div className="container-custom pt-6 md:pt-10 pb-[max(3rem,env(safe-area-inset-bottom))] md:pb-0">
            {/* TECH HEADER */}
            <div className="max-w-5xl mb-12 md:mb-16">
               <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center gap-3 md:gap-4 text-indigo-600 mb-4 md:mb-6"
               >
                  <div className="w-12 h-[1px] bg-indigo-600"></div>
                  <span className="text-[10px] font-black uppercase tracking-[0.4em] leading-[1.4]">{hero.badge}</span>
               </motion.div>
               <h1 className="text-5xl md:text-5xl font-black text-slate-900 leading-[1.1] mb-4 md:mb-6 tracking-tighter">
                  {hero.title?.split(' ')[0]} <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-rose-500 to-indigo-500 animate-gradient-x">{hero.title?.split(' ').slice(1).join(' ')}</span>
               </h1>
               <p className="text-slate-600 text-xl font-light leading-[1.6] max-w-2xl italic">
                  {hero.description}
               </p>
            </div>

            {/* 6-PHASE PROTOCOL GRID */}
            <div className="mb-12 lg:mb-24">
               <div className="flex items-center gap-4 md:gap-6 mb-8 md:mb-12">
                  <h2 className="text-3xl font-black text-slate-900 tracking-tighter uppercase leading-[1.1]">Engineering Lifecycle</h2>
                  <div className="h-[1px] flex-1 bg-slate-200"></div>
               </div>

               <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-slate-200 border border-slate-200 rounded-2xl md:rounded-[3rem] overflow-hidden shadow-2xl">
                  {phases?.map((item, i) => (
                     <div key={i} className="bg-white p-6 md:p-10 hover:bg-slate-50 transition-colors group">
                        <div className="text-indigo-600 font-mono text-xs mb-6 md:mb-8 flex items-center gap-2">
                           <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
                           {item.step} // DISCIPLINE_SYNC
                        </div>
                        <h3 className="text-xl font-black text-slate-900 mb-2 md:mb-3 tracking-tight group-hover:text-indigo-600 transition-colors uppercase leading-[1.1]">{item.stage}</h3>
                        <p className="text-slate-500 text-sm font-light leading-[1.6]">{item.action}</p>
                     </div>
                  ))}
               </div>
            </div>

            {/* LOGO CONSTRUCTION SECTION */}
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-start mb-12 lg:mb-24">
               <div className="relative lg:sticky lg:top-32 mb-12 lg:mb-0">
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-indigo-50 rounded-xl md:rounded-2xl flex items-center justify-center text-2xl md:text-3xl text-indigo-600 mb-6 md:mb-10 border border-indigo-100">
                     <IoTriangleOutline />
                  </div>
                  <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 md:mb-6 tracking-tighter leading-[1.1]">Geometric <br /> Construction <span className="text-indigo-600">Matrix.</span></h2>
                  <p className="text-slate-500 text-base md:text-lg font-light leading-[1.6] mb-6 md:mb-12">We use mathematical grids and the golden ratio (1.618) to ensure every brand we build possesses internal structural harmony and timeless visual balance.</p>

                  <div className="p-6 md:p-8 bg-slate-900 rounded-2xl md:rounded-3xl border border-slate-800 shadow-2xl flex items-center justify-between group cursor-default">
                     <div className="flex gap-3 md:gap-4 items-center">
                        <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-indigo-500 flex items-center justify-center text-white shadow-lg"><IoDiamondOutline className="text-xl md:text-2xl" /></div>
                        <div>
                           <p className="text-[10px] font-black text-white/40 uppercase tracking-widest leading-[1.4]">Logic Audit</p>
                           <p className="text-[10px] md:text-xs font-bold text-white tracking-tight leading-[1.4]">SYMMETRY_RATIO::1:1.6</p>
                        </div>
                     </div>
                     <IoSyncOutline className="text-emerald-500 text-lg md:text-xl animate-spin-slow shrink-0" />
                  </div>
               </div>

               <div className="space-y-4 md:space-y-6">
                  {roi?.map((spec, idx) => (
                     <div key={idx} className="bg-white rounded-2xl md:rounded-[2.5rem] p-6 md:p-10 border border-slate-200 shadow-sm hover:shadow-xl transition-all">
                        <h4 className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.4em] mb-6 md:mb-8 leading-[1.4]">{spec.group} Protocol</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                           {spec.items?.map(item => (
                              <div key={item} className="flex items-center gap-3 text-sm font-bold text-slate-600 leading-[1.4]">
                                 <IoCheckmarkCircleOutline className="text-indigo-600 text-lg shrink-0" /> {item}
                              </div>
                           ))}
                        </div>
                     </div>
                  ))}
               </div>
            </div>

            {/* CHROMODYNAMIC SECTION */}
            <div className="bg-white rounded-3xl md:rounded-[4rem] p-6 md:p-12 lg:p-20 border border-slate-100 shadow-2xl shadow-slate-200/50 relative overflow-hidden mb-12 lg:mb-24">
               <div className="absolute top-0 right-0 w-1/3 h-full bg-indigo-50/50 border-l border-slate-100 skew-x-12 translate-x-12 hidden md:block"></div>
               <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 relative z-10">
                  <div>
                     <div className="text-indigo-600 mb-4 md:mb-6 flex items-center gap-3 md:gap-4">
                        <div className="w-12 h-[2px] bg-indigo-600"></div>
                        <span className="text-[10px] font-black uppercase tracking-[0.4em] leading-[1.4]">Color Psychology</span>
                     </div>
                     <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 md:mb-6 leading-[1.1]">Chromodynamic <br /><span className="text-indigo-600">Synthesis.</span></h2>
                     <p className="text-slate-500 text-base md:text-lg font-light leading-[1.6] mb-6 md:mb-12 italic">"Colors aren't just aesthetic; they are neural triggers. We map palettes to brand sentiment and accessibility standards."</p>

                     <div className="space-y-3 md:space-y-4">
                        {manifest?.map((feat, i) => (
                           <div key={i} className="flex gap-3 md:gap-4 p-4 md:p-6 bg-slate-50 rounded-2xl border border-slate-100">
                              <div className="text-xl md:text-2xl text-indigo-600 shrink-0">{getIcon(feat.i)}</div>
                              <div>
                                 <h5 className="text-[10px] font-black text-slate-900 uppercase tracking-widest leading-[1.4]">{feat.t}</h5>
                                 <p className="text-[10px] md:text-xs text-slate-500 font-bold leading-[1.6]">{feat.d}</p>
                              </div>
                           </div>
                        ))}
                     </div>
                  </div>

                  <div className="relative mt-8 lg:mt-0">
                     <div className="bg-slate-900 rounded-2xl md:rounded-[3rem] p-6 md:p-10 border border-slate-800 shadow-2xl md:aspect-[3/4] flex flex-col justify-between group overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <div className="space-y-6 md:space-y-8 relative z-10 mb-6 md:mb-0">
                           <div className="flex justify-between items-center text-white/30 font-mono text-[8px] tracking-[0.4em] leading-[1.4]">
                              <span>SYS_ID_PROTO</span>
                              <span>IDENTITY_ENGINE</span>
                           </div>

                           <div className="space-y-3 md:space-y-4">
                              <div className="h-[1px] w-full bg-white/10"></div>
                              <div className="flex items-center gap-3 md:gap-4">
                                 <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-indigo-400 font-black text-xs shrink-0"><IoInfiniteOutline /></div>
                                 <div className="flex-1 space-y-1.5 md:space-y-2">
                                    <div className="h-1.5 bg-white/10 rounded-full w-full"></div>
                                    <div className="h-1.5 bg-white/5 rounded-full w-2/3"></div>
                                 </div>
                              </div>
                           </div>

                           <div className="p-4 md:p-6 bg-white/5 rounded-2xl border border-white/5">
                              <p className="text-[8px] font-mono text-emerald-400 mb-2 tracking-tighter leading-[1.4]">THEME_SYNC::VERIFIED</p>
                              <div className="flex gap-2 md:gap-3 mt-2 md:mt-4">
                                 <div className="w-6 h-6 md:w-8 md:h-8 rounded-lg bg-indigo-500"></div>
                                 <div className="w-6 h-6 md:w-8 md:h-8 rounded-lg bg-purple-500"></div>
                                 <div className="w-6 h-6 md:w-8 md:h-8 rounded-lg bg-white/10"></div>
                              </div>
                           </div>
                        </div>

                        <div className="bg-white/5 rounded-2xl md:rounded-3xl border border-white/10 p-6 md:p-8 relative overflow-hidden group/m hover:bg-white/10 transition-all">
                           <IoJournalOutline className="text-3xl md:text-4xl text-indigo-600/30 mb-3 md:mb-4 group-hover/m:rotate-12 transition-transform" />
                           <p className="text-[8px] md:text-[9px] font-black text-white/50 uppercase tracking-widest mb-1 md:mb-2 leading-[1.4]">Protocol: GOVERNANCE_QA</p>
                           <p className="text-[10px] md:text-xs font-bold text-white tracking-tight leading-[1.4]">Manual ready for worldwide scaling.</p>
                           <div className="absolute bottom-0 left-0 w-full h-[1px] bg-indigo-500/50"></div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>

            {/* CTA */}
            <div className="text-center py-12 lg:py-20 border-t border-slate-200">
               <IoFingerPrintOutline className="text-5xl lg:text-7xl text-indigo-600 mb-6 md:mb-8 mx-auto opacity-20" />
               <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 mb-6 md:mb-8 leading-[1.1]">{cta.title?.split('your ')[0]}your <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-500 font-serif italic font-medium">{cta.title?.split('your ')[1]}</span></h3>
               <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
                  <button className="w-full sm:w-[240px] min-h-[48px] px-4 py-3 md:py-4 bg-indigo-600 text-white font-black rounded-xl hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-600/40 uppercase tracking-widest text-[10px] flex items-center justify-center leading-[1.4]">
                     Initialize Brand Audit
                  </button>
                  <Link
                     href="/freelancing"
                     className="w-full sm:w-[240px] min-h-[48px] px-4 py-3 md:py-4 bg-slate-900 text-white font-black rounded-xl hover:bg-slate-800 transition-all uppercase tracking-widest text-[10px] flex items-center justify-center text-center leading-[1.4]"
                  >
                     Hire Student Talent
                  </Link>
               </div>
            </div>
         </div>

         {/* Mobile Sticky CTA */}
         <div className="sticky bottom-0 left-0 w-full p-[var(--gutter,16px)] bg-white/90 backdrop-blur-md border-t border-slate-100 z-50 md:hidden flex items-center justify-between shadow-[0_-10px_40px_rgba(0,0,0,0.05)] pb-[max(1rem,env(safe-area-inset-bottom))] mt-auto">
            <div className="flex flex-col gap-0.5">
               <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-[1.4]">Ready?</p>
               <p className="text-slate-900 font-bold text-sm leading-[1.4]">Start Building</p>
            </div>
            <button className="px-5 py-3 min-h-[48px] bg-indigo-600 text-white font-black rounded-xl text-[10px] uppercase tracking-widest shadow-md shadow-indigo-600/30 leading-[1.4] flex items-center justify-center">
               Initialize Audit
            </button>
         </div>
      </section>
   );
}
