"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
   IoArrowBackOutline,
   IoLayersOutline,
   IoGitMergeOutline,
   IoFlashOutline,
   IoPulseOutline,
   IoSyncOutline,
   IoShieldCheckmarkOutline,
   IoCheckmarkCircleOutline,
   IoStatsChartOutline,
   IoSettingsOutline,
   IoCloudDoneOutline
} from "react-icons/io5";

export default function AutomationDetailsClient({ data }) {
   if (!data) return null;

   return (
      <section className="min-h-screen bg-slate-50 text-slate-900 selection:bg-amber-600 selection:text-white pb-12 md:pb-20 relative font-sans flex flex-col">
         {/* PERSISTENT BREADCRUMB */}
         <div className="border-b border-slate-200 bg-white/80 backdrop-blur-md sticky top-0 z-50">
            <div className="container-custom py-2 md:py-3 flex items-center justify-between">
               <Link href="/services/automation" className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-amber-600 transition-colors">
                  <IoArrowBackOutline className="text-sm" /> Infrastructure Overview
               </Link>
               <div className="text-[10px] font-black uppercase tracking-[0.4em] text-amber-600">{data.hero.subtitle}</div>
            </div>
         </div>

         <div className="container-custom pt-6 md:pt-10 pb-[max(3rem,env(safe-area-inset-bottom))] md:pb-0">
            {/* TECH HEADER */}
            <div className="max-w-5xl mb-12 md:mb-16 relative">
               <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center gap-3 md:gap-4 text-amber-600 mb-4 md:mb-6"
               >
                  <div className="w-12 h-[1px] bg-amber-600"></div>
                  <span className="text-[10px] font-black uppercase tracking-[0.4em] leading-[1.4]">{data.hero.badge}</span>
               </motion.div>
               <h1 className="text-4xl md:text-[5rem] lg:text-[6rem] font-black text-slate-900 leading-[1.1] md:leading-[0.9] mb-4 md:mb-6 tracking-tighter uppercase whitespace-pre-line">
                  {data.hero.title?.split(' ')[0]} <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-violet-500 to-emerald-500 animate-gradient-x">{data.hero.title?.split(' ').slice(1).join(' ')}</span>
               </h1>
               <div className="mt-8 md:mt-12">
                  <p className="text-slate-600 text-lg md:text-xl font-light leading-[1.6] mb-6 md:mb-8 max-w-2xl italic">
                     "{data.hero.description}"
                  </p>
                  <div className="h-1 w-12 md:w-20 bg-amber-600/20" />
               </div>
            </div>

            {/* 6-PHASE LIFECYCLE GRID */}
            <div className="mb-12 lg:mb-24">
               <div className="flex items-center gap-4 md:gap-6 mb-8 md:mb-12">
                  <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tighter uppercase leading-[1.1] italic">Implementation Lifecycle</h2>
                  <div className="h-[1px] flex-1 bg-slate-200"></div>
               </div>

               <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-slate-200 border border-slate-200 rounded-2xl md:rounded-[3rem] overflow-hidden shadow-2xl">
                  {(data.sections.phases || []).map((item, i) => (
                     <div key={i} className="bg-white p-6 md:p-10 hover:bg-slate-50 transition-colors group">
                        <div className="text-amber-600 font-mono text-xs mb-4 md:mb-6 flex items-center gap-2">
                           <span className="w-2 h-2 rounded-full bg-amber-600"></span>
                           {item.step} // NODE_SYNC_STRICT
                        </div>
                        <h3 className="text-lg md:text-xl font-black text-slate-900 mb-2 md:mb-4 tracking-tight group-hover:text-amber-600 transition-colors uppercase leading-[1.4]">{item.stage}</h3>
                        <p className="text-slate-500 text-sm md:text-base font-light leading-[1.6]">{item.action}</p>
                     </div>
                  ))}
               </div>
            </div>

            {/* INTEGRATION MATRIX SECTION */}
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-start mb-12 lg:mb-24">
               <div className="relative lg:sticky lg:top-32 mb-8 lg:mb-0">
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-amber-50 rounded-xl md:rounded-2xl flex items-center justify-center text-2xl md:text-3xl text-amber-600 mb-6 md:mb-8 border border-amber-100">
                     <IoLayersOutline />
                  </div>
                  <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-4 md:mb-6 tracking-tighter leading-[1.1]">Logic <br /> Node <span className="text-amber-600">Specifications.</span></h2>
                  <p className="text-slate-500 text-base md:text-lg font-light leading-[1.6] mb-6 md:mb-8">Every automation workflow is built on a resilient node-based architecture. This allows your business to scale complex logic without increasing manual oversight.</p>

                  <div className="p-6 md:p-8 bg-slate-900 rounded-2xl md:rounded-3xl border border-slate-800 shadow-2xl flex items-center justify-between group cursor-default">
                     <div className="flex gap-3 md:gap-4 items-center">
                        <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-amber-500 flex items-center justify-center text-white shadow-lg"><IoGitMergeOutline className="text-xl md:text-2xl" /></div>
                        <div>
                           <p className="text-[9px] md:text-[10px] font-black text-white/40 uppercase tracking-widest leading-[1.4]">Workflow Audit</p>
                           <p className="text-[10px] md:text-xs font-bold text-white tracking-tight leading-[1.4]">LATENCY_SYNC::SUB_2S</p>
                        </div>
                     </div>
                     <IoSyncOutline className="text-amber-500 text-xl animate-spin-slow" />
                  </div>
               </div>

               <div className="space-y-4 md:space-y-6">
                  {(data.sections.roi || []).map((spec, idx) => (
                     <div key={idx} className="bg-white rounded-2xl md:rounded-[2.5rem] p-6 md:p-8 border border-slate-200 shadow-sm hover:shadow-xl transition-all">
                        <h4 className="text-[10px] font-black text-amber-600 uppercase tracking-[0.4em] mb-4 md:mb-6 leading-[1.4]">{spec.group} Framework</h4>
                        <div className="grid grid-cols-2 gap-3 md:gap-4">
                           {spec.items?.map(item => (
                              <div key={item} className="flex items-center gap-2 md:gap-3 text-xs md:text-sm font-bold text-slate-600 leading-[1.4]">
                                 <IoCheckmarkCircleOutline className="text-amber-600 text-base md:text-lg shrink-0" />
                                 <span>{item}</span>
                              </div>
                           ))}
                        </div>
                     </div>
                  ))}
               </div>
            </div>

            {/* ROI TRACKING SECTION */}
            <div className="bg-white rounded-3xl md:rounded-[4rem] p-6 md:p-12 lg:p-24 border border-slate-100 shadow-2xl shadow-slate-200/50 relative overflow-hidden mb-12 lg:mb-24">
               <div className="absolute top-0 right-0 w-1/3 h-full bg-slate-50/50 border-l border-slate-100 skew-x-12 translate-x-12"></div>
               <div className="grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-20 relative z-10">
                  <div>
                     <div className="text-amber-600 mb-4 md:mb-6 flex items-center gap-3 md:gap-4">
                        <div className="w-12 h-[2px] bg-amber-600"></div>
                        <span className="text-[10px] font-black uppercase tracking-[0.4em] leading-[1.4]">Efficiency Attribution</span>
                     </div>
                     <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-4 md:mb-6 leading-[1.1]">Attributable <br /><span className="text-amber-600">Resource Gain.</span></h2>
                     <p className="text-slate-500 text-base md:text-lg font-light leading-[1.6] mb-6 md:mb-8 italic">"We don't just 'make' workflows. We architect efficiency engines that yield measurable ROI across your entire operation."</p>

                     <div className="space-y-2 md:space-y-4">
                        {[
                           { i: <IoStatsChartOutline />, t: "Time Gain Analysis", d: "Documenting hours saved via automated data handling." },
                           { i: <IoSettingsOutline />, t: "Logic Pruning", d: "Iterative workflow optimization to reduce latency." },
                           { i: <IoCheckmarkCircleOutline />, t: "Zero-Error Guarantee", d: "Eliminating human entry error through direct sync." }
                        ].map((feat, i) => (
                           <div key={i} className="flex gap-3 md:gap-4 p-4 md:p-6 bg-slate-50 rounded-xl md:rounded-2xl border border-slate-100 items-start">
                              <div className="text-xl md:text-2xl text-amber-600 shrink-0 mt-0.5">{feat.i}</div>
                              <div>
                                 <h5 className="text-[9px] md:text-[10px] font-black text-slate-900 uppercase tracking-widest leading-[1.4] mb-1">{feat.t}</h5>
                                 <p className="text-[10px] md:text-xs text-slate-400 font-bold leading-[1.4]">{feat.d}</p>
                              </div>
                           </div>
                        ))}
                     </div>
                  </div>

                  <div className="relative mt-8 lg:mt-0">
                     <div className="bg-slate-900 rounded-2xl md:rounded-[3rem] p-6 md:p-10 border border-slate-800 shadow-2xl aspect-auto md:aspect-[3/4] flex flex-col justify-between group overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <div className="space-y-6 md:space-y-8 relative z-10 mb-8 md:mb-0">
                           <div className="flex justify-between items-center text-white/30 font-mono text-[8px] tracking-[0.4em] leading-[1.4]">
                              <span>SYS_WORKFLOW_200</span>
                              <span>AUTO_BLUEPRINT</span>
                           </div>

                           <div className="space-y-4">
                              <div className="h-[1px] w-full bg-white/10"></div>
                              <div className="flex items-center gap-3 md:gap-4">
                                 <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-amber-400 font-black text-xs shrink-0"><IoFlashOutline /></div>
                                 <div className="flex-1 space-y-2">
                                    <div className="h-1.5 bg-white/10 rounded-full w-full"></div>
                                    <div className="h-1.5 bg-white/5 rounded-full w-1/3"></div>
                                 </div>
                              </div>
                           </div>

                           <div className="p-4 md:p-6 bg-white/5 rounded-xl md:rounded-2xl border border-white/5">
                              <p className="text-[8px] md:text-[9px] font-mono text-emerald-400 mb-2 tracking-tighter leading-[1.4]">DATA_BRIDGE::STABLE</p>
                              <p className="text-[8px] md:text-[9px] font-mono text-slate-500 leading-[1.4]">SRC: SHOPIFY_V3<br />DEST: G-SHEETS_API<br />MAP: CUSTOM_JSON</p>
                           </div>
                        </div>

                        <div className="bg-white/5 rounded-xl md:rounded-3xl border border-white/10 p-6 md:p-8 relative overflow-hidden group/m hover:bg-white/10 transition-all mt-auto relative z-10">
                           <IoCloudDoneOutline className="text-3xl md:text-4xl text-amber-600/30 mb-3 md:mb-4 group-hover/m:rotate-12 transition-transform" />
                           <p className="text-[8px] md:text-[9px] font-black text-white/50 uppercase tracking-widest mb-2 leading-[1.4]">Protocol: SCALABILITY_QA</p>
                           <p className="text-[10px] md:text-xs font-bold text-white tracking-tight leading-[1.4]">System ready for global deployment.</p>
                           <div className="absolute bottom-0 left-0 w-full h-[1px] bg-amber-500/50"></div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>

            {/* CTA */}
            <div className="text-center py-12 lg:py-20 border-t border-slate-200">
               <IoPulseOutline className="text-5xl lg:text-7xl text-amber-600 mb-6 md:mb-8 mx-auto opacity-20" />
               <h3 className="text-3xl sm:text-4xl lg:text-6xl font-black text-slate-900 mb-6 md:mb-8 leading-[1.1]">Ready to activate your <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-indigo-600 font-serif italic font-medium">Efficiency Engines?</span></h3>
               <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
                  <button className="w-full sm:w-[240px] min-h-[48px] px-4 py-3 md:py-4 bg-amber-600 text-white font-black rounded-xl hover:bg-amber-700 transition-all shadow-xl shadow-amber-600/40 uppercase tracking-widest text-[10px] flex items-center justify-center leading-[1.4]">
                     {data.cta.title}
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
               <p className="text-slate-900 font-bold text-sm leading-[1.4]">Start Automating</p>
            </div>
            <button className="px-5 py-3 min-h-[48px] bg-amber-600 text-white font-black rounded-xl text-[10px] uppercase tracking-widest shadow-md shadow-amber-600/30 leading-[1.4] flex items-center justify-center">
               Initialize
            </button>
         </div>
      </section>
   );
}
