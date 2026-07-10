"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
   IoArrowBackOutline,
   IoRocketOutline,
   IoGitNetworkOutline,
   IoCheckmarkCircleOutline,
   IoPulseOutline,
   IoSyncOutline,
   IoBriefcaseOutline,
   IoCompassOutline,
   IoStatsChartOutline,
   IoTrendingUpOutline
} from "react-icons/io5";

export default function CareerTracksDetailsClient({ data }) {
   if (!data) return null;

   const { hero, sections, cta } = data;
   const phases = sections.phases || [];
   const roi = sections.roi || [];

   return (
      <section className="min-h-screen bg-slate-50 text-slate-900 selection:bg-indigo-600 selection:text-white pb-20 relative flex flex-col">
         <div className="border-b border-slate-200 bg-white/80 backdrop-blur-md sticky top-0 z-50">
            <div className="container-custom py-3 flex items-center justify-between">
               <Link href="/services/career-tracks" className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-indigo-600 transition-colors leading-[1.4]">
                  <IoArrowBackOutline className="text-sm" /> Product Trajectory
               </Link>
               <div className="text-[10px] font-black uppercase tracking-widest text-indigo-600 leading-[1.4]">PATH_SPEC_v3.2</div>
            </div>
         </div>

         <div className="container-custom pt-10 lg:pt-16">
            <div className="max-w-5xl mb-16">
               <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center gap-3 text-indigo-600 mb-6"
               >
                  <div className="w-8 h-[1px] bg-indigo-600"></div>
                  <span className="text-[10px] font-black uppercase tracking-widest leading-[1.4]">{hero.badge}</span>
               </motion.div>
               <h1 className="text-3xl md:text-5xl font-black text-slate-900 leading-[1.1] mb-6">
                  {hero.title?.split(' ')[0]} <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-violet-500 to-emerald-500 animate-gradient-x">{hero.title?.split(' ').slice(1).join(' ')}</span>
               </h1>
               <p className="text-slate-600 text-base md:text-lg font-light leading-[1.6] max-w-2xl italic">
                  "{hero.desc}"
               </p>
            </div>

            <div className="mb-24">
               <div className="flex items-center gap-4 lg:gap-6 mb-10 lg:mb-12">
                  <h2 className="text-2xl lg:text-3xl font-black text-slate-900 uppercase leading-[1.1]">The Trajectory Lifecycle</h2>
                  <div className="h-[1px] flex-1 bg-slate-200"></div>
               </div>

               <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-slate-200 border border-slate-200 rounded-[2rem] overflow-hidden shadow-xl">
                  {phases.map((item, i) => (
                     <div key={i} className="bg-white p-6 lg:p-8 hover:bg-slate-50 transition-colors group flex flex-col gap-2 lg:gap-3">
                        <div className="text-indigo-600 font-mono text-[10px] mb-2 flex items-center gap-2 uppercase tracking-widest leading-[1.4]">
                           <span className="w-2 h-2 rounded-full bg-indigo-600 shrink-0"></span>
                           {item.step} // PATH_SYNC_PROTOCOL
                        </div>
                        <h3 className="text-lg lg:text-xl font-black text-slate-900 group-hover:text-indigo-600 transition-colors uppercase leading-[1.1]">{item.stage}</h3>
                        <p className="text-slate-500 text-sm font-light leading-[1.6]">{item.action}</p>
                     </div>
                  ))}
               </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start mb-24">
               <div className="lg:sticky lg:top-24 flex flex-col gap-6 lg:gap-8 z-10 bg-slate-50 pb-4 lg:pb-0 lg:bg-transparent">
                  <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center text-2xl text-indigo-600 border border-indigo-100">
                     <IoCompassOutline />
                  </div>
                  <h2 className="text-3xl lg:text-5xl font-black text-slate-900 leading-[1.1]">Bespoke <br /> Career <span className="text-indigo-600">Architecture.</span></h2>
                  <p className="text-slate-500 text-base lg:text-lg font-light leading-[1.6]">We treat your professional growth as a high-fidelity development project, focusing on the specific KPI signals that hiring managers track.</p>

                  <div className="p-4 lg:p-6 bg-slate-900 rounded-2xl border border-slate-800 shadow-xl flex items-center justify-between group cursor-default">
                     <div className="flex gap-3 items-center">
                        <div className="w-10 h-10 rounded-xl bg-indigo-500 flex items-center justify-center text-white shadow-lg shrink-0"><IoStatsChartOutline className="text-xl" /></div>
                        <div className="flex flex-col gap-1">
                           <p className="text-[10px] font-black text-white/40 uppercase tracking-widest leading-[1.4]">Growth Audit</p>
                           <p className="text-xs font-bold text-white leading-[1.4]">VIBRATION::RESONANCE_HIGH</p>
                        </div>
                     </div>
                     <IoSyncOutline className="text-indigo-500 text-xl animate-spin-slow" />
                  </div>
               </div>

               <div className="flex flex-col gap-4 lg:gap-6 relative z-0">
                  {roi.map((spec, idx) => (
                     <div key={idx} className="bg-white rounded-[2rem] p-6 lg:p-8 border border-slate-200 shadow-sm hover:shadow-lg transition-all flex flex-col gap-4 lg:gap-6">
                        <h4 className="text-[10px] font-black text-indigo-600 uppercase tracking-widest leading-[1.4]">{spec.group} Framework</h4>
                        <div className="grid grid-cols-1 gap-3">
                           {spec.items?.map(item => (
                              <div key={item} className="flex items-center gap-2 text-xs md:text-sm font-bold text-slate-600 leading-[1.4]">
                                 <IoCheckmarkCircleOutline className="text-indigo-600 text-base shrink-0" /> {item}
                              </div>
                           ))}
                        </div>
                     </div>
                  ))}
               </div>
            </div>

            <div className="bg-white rounded-[2rem] lg:rounded-[3rem] p-6 lg:p-12 border border-slate-100 shadow-xl shadow-slate-200/50 relative overflow-hidden mb-24">
               <div className="absolute top-0 right-0 w-1/3 h-full bg-slate-50/50 border-l border-slate-100 skew-x-12 translate-x-12 hidden lg:block"></div>
               <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 relative z-10">
                  <div className="flex flex-col gap-6 lg:gap-8">
                     <div className="text-indigo-600 flex items-center gap-3">
                        <div className="w-8 h-[2px] bg-indigo-600"></div>
                        <span className="text-[10px] font-black uppercase tracking-widest leading-[1.4]">Corporate Talent Sync</span>
                     </div>
                     <h2 className="text-3xl lg:text-5xl font-black text-slate-900 leading-[1.1]">Absolute <br /><span className="text-indigo-600">Trajectory.</span></h2>
                     <p className="text-slate-500 text-base lg:text-lg font-light leading-[1.6] italic">"A career isn't just about what you know; it's about how you position that knowledge. We architect your professional brand to be irresistible to elite firms."</p>

                     <div className="flex flex-col gap-3 lg:gap-4">
                        {[
                           { i: <IoBriefcaseOutline />, t: "Market Positioning", d: "Aligning your skills with the highest-growth sectors of the tech economy." },
                           { i: <IoGitNetworkOutline />, t: "Network Authority", d: "Direct inroads to hiring managers and decision-makers globally." },
                           { i: <IoRocketOutline />, t: "High-Octane Launch", d: "Rapid placement protocols designed for sub-45 day trajectories." }
                        ].map((feat, i) => (
                           <div key={i} className="flex gap-3 p-4 bg-slate-50 rounded-xl border border-slate-100">
                              <div className="text-xl text-indigo-600 shrink-0">{feat.i}</div>
                              <div className="flex flex-col gap-1">
                                 <h5 className="text-[10px] font-black text-slate-900 uppercase tracking-widest leading-[1.4]">{feat.t}</h5>
                                 <p className="text-xs text-slate-500 font-bold leading-[1.6]">{feat.d}</p>
                              </div>
                           </div>
                        ))}
                     </div>
                  </div>

                  <div className="relative">
                     <div className="bg-slate-900 rounded-[2rem] p-6 lg:p-8 border border-slate-800 shadow-xl aspect-[3/4] flex flex-col justify-between group overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <div className="flex flex-col gap-6 lg:gap-8 relative z-10">
                           <div className="flex justify-between items-center text-white/30 font-mono text-[8px] uppercase tracking-widest leading-[1.4]">
                              <span>SYS_CAREER_ARCH_v2</span>
                              <span>TALENT_BLUEPRINT</span>
                           </div>

                           <div className="flex flex-col gap-3 lg:gap-4">
                              <div className="h-[1px] w-full bg-white/10"></div>
                              <div className="flex items-center gap-3">
                                 <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-indigo-400 font-black text-xs shrink-0"><IoTrendingUpOutline /></div>
                                 <div className="flex-1 flex flex-col gap-2">
                                    <div className="h-1 bg-white/10 rounded-full w-full"></div>
                                    <div className="h-1 bg-white/5 rounded-full w-1/3"></div>
                                 </div>
                              </div>
                           </div>

                           <div className="p-4 bg-white/5 rounded-xl border border-white/5 flex flex-col gap-2">
                              <p className="text-[8px] font-mono text-emerald-400 tracking-widest uppercase leading-[1.4]">PLACEMENT_READY::VERIFIED</p>
                              <p className="text-[8px] font-mono text-slate-500 leading-[1.6]">MEMBER_ID: S_CAREER_482<br />TARGET_SALARY: HIGH_TIER<br />STATUS: COMMAND</p>
                           </div>
                        </div>

                        <div className="bg-white/5 rounded-2xl border border-white/10 p-6 relative overflow-hidden group/m hover:bg-white/10 transition-all flex flex-col gap-2 mt-4 lg:mt-0">
                           <IoPulseOutline className="text-3xl text-indigo-600/30 group-hover/m:rotate-12 transition-transform shadow-[0_0_20px_rgba(79,70,229,0.2)]" />
                           <p className="text-[9px] font-black text-white/50 uppercase tracking-widest leading-[1.4]">Protocol: CAREER_QA_CLEAR</p>
                           <p className="text-xs font-bold text-white leading-[1.4]">Trajectory ready for activation.</p>
                           <div className="absolute bottom-0 left-0 w-full h-[1px] bg-indigo-500/50"></div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>

            <div className="text-center py-16 lg:py-24 border-t border-slate-200 flex flex-col items-center gap-6 lg:gap-8">
               <IoBriefcaseOutline className="text-5xl lg:text-6xl text-indigo-600 opacity-20" />
               <h3 className="text-3xl lg:text-5xl font-black text-slate-900 leading-[1.1]">Ready to activate your <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-700 font-serif italic font-medium">Professional Identity?</span></h3>
               <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                  <button className="w-full sm:w-[280px] min-h-[48px] px-6 py-4 bg-indigo-600 text-white font-black rounded-xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-600/40 uppercase tracking-widest text-[10px] flex items-center justify-center leading-[1.4]">
                     {cta.title}
                  </button>
                  <Link
                     href="/freelancing"
                     className="w-full sm:w-[280px] min-h-[48px] px-6 py-4 bg-slate-900 text-white font-black rounded-xl hover:bg-slate-800 transition-all uppercase tracking-widest text-[10px] flex items-center justify-center text-center leading-[1.4]"
                  >
                     Hire Student Talent
                  </Link>
               </div>
            </div>
         </div>
         
         <div className="sticky bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-slate-200 z-50 lg:hidden pb-[max(0.75rem,env(safe-area-inset-bottom))] mt-auto shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
            <div className="container-custom py-3 flex gap-3 justify-center">
               <button className="flex-1 w-full min-h-[48px] bg-indigo-600 hover:bg-indigo-700 transition-colors text-white font-black rounded-xl uppercase tracking-widest text-[10px] shadow-lg shadow-indigo-600/20 active:scale-95 leading-[1.4]">
                  {cta.title || "Activate Identity"}
               </button>
            </div>
         </div>
      </section>
   );
}
