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
            <div className="container-custom py-4 flex items-center justify-between">
               <Link href="/services/career-tracks" className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-indigo-600 transition-colors">
                  <IoArrowBackOutline className="text-sm" /> Product Trajectory
               </Link>
               <div className="text-[10px] font-black uppercase tracking-[0.4em] text-indigo-600">PATH_SPEC_v3.2</div>
            </div>
         </div>

         <div className="container-custom pt-10">
            {/* Removed px-4 md:px-0 to enforce strict container-custom alignment */}
            <div className="max-w-5xl mb-16">
               <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center gap-4 text-indigo-600 mb-4"
               >
                  <div className="w-12 h-[1px] bg-indigo-600"></div>
                  <span className="text-[10px] font-black uppercase tracking-[0.4em]">{hero.badge}</span>
               </motion.div>
               <h1 className="text-5xl md:text-5xl font-black text-slate-900 leading-[1.1] mb-4 tracking-tighter">
                  {hero.title?.split(' ')[0]} <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-violet-500 to-emerald-500 animate-gradient-x">{hero.title?.split(' ').slice(1).join(' ')}</span>
               </h1>
               <p className="text-slate-600 text-xl font-light leading-[1.6] max-w-2xl italic">
                  "{hero.desc}"
               </p>
            </div>

            <div className="mb-16">
               <div className="flex items-center gap-4 mb-8">
                  <h2 className="text-3xl font-black text-slate-900 tracking-tighter uppercase leading-none">The Trajectory Lifecycle</h2>
                  <div className="h-[1px] flex-1 bg-slate-200"></div>
               </div>

               <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-slate-200 border border-slate-200 rounded-[2rem] overflow-hidden shadow-2xl">
                  {phases.map((item, i) => (
                     <div key={i} className="bg-white p-6 md:p-8 hover:bg-slate-50 transition-colors group">
                        <div className="text-indigo-600 font-mono text-xs mb-4 flex items-center gap-2">
                           <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
                           {item.step} // PATH_SYNC_PROTOCOL
                        </div>
                        <h3 className="text-xl font-black text-slate-900 mb-2 tracking-tight group-hover:text-indigo-600 transition-colors uppercase">{item.stage}</h3>
                        <p className="text-slate-500 text-sm font-light leading-[1.6]">{item.action}</p>
                     </div>
                  ))}
               </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start mb-16">
               <div className="sticky top-24">
                  <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center text-3xl text-indigo-600 mb-4 border border-indigo-100">
                     <IoCompassOutline />
                  </div>
                  <h2 className="text-5xl font-black text-slate-900 mb-4 tracking-tighter">Bespoke <br /> Career <span className="text-indigo-600">Architecture.</span></h2>
                  <p className="text-slate-500 text-lg font-light leading-[1.6] mb-6">We treat your professional growth as a high-fidelity development project, focusing on the specific KPI signals that hiring managers track.</p>

                  <div className="p-4 md:p-6 bg-slate-900 rounded-[2rem] border border-slate-800 shadow-2xl flex items-center justify-between group cursor-default">
                     <div className="flex gap-4 items-center">
                        <div className="w-12 h-12 rounded-xl bg-indigo-500 flex items-center justify-center text-white shadow-lg"><IoStatsChartOutline className="text-2xl" /></div>
                        <div>
                           <p className="text-[10px] font-black text-white/40 uppercase tracking-widest">Growth Audit</p>
                           <p className="text-xs font-bold text-white tracking-tight">VIBRATION::RESONANCE_HIGH</p>
                        </div>
                     </div>
                     <IoSyncOutline className="text-indigo-500 text-xl animate-spin-slow" />
                  </div>
               </div>

               <div className="space-y-4">
                  {roi.map((spec, idx) => (
                     <div key={idx} className="bg-white rounded-[2rem] p-5 md:p-6 border border-slate-200 shadow-sm hover:shadow-xl transition-all">
                        <h4 className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.4em] mb-4">{spec.group} Framework</h4>
                        <div className="grid grid-cols-1 gap-3">
                           {spec.items?.map(item => (
                              <div key={item} className="flex items-center gap-3 text-sm font-bold text-slate-600">
                                 <IoCheckmarkCircleOutline className="text-indigo-600 text-lg" /> {item}
                              </div>
                           ))}
                        </div>
                     </div>
                  ))}
               </div>
            </div>

            <div className="bg-white rounded-[2rem] p-6 lg:p-12 border border-slate-100 shadow-2xl shadow-slate-200/50 relative overflow-hidden mb-16">
               <div className="absolute top-0 right-0 w-1/3 h-full bg-slate-50/50 border-l border-slate-100 skew-x-12 translate-x-12"></div>
               <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 relative z-10">
                  <div>
                     <div className="text-indigo-600 mb-4 flex items-center gap-4">
                        <div className="w-12 h-[2px] bg-indigo-600"></div>
                        <span className="text-[10px] font-black uppercase tracking-[0.4em]">Corporate Talent Sync</span>
                     </div>
                     <h2 className="text-5xl font-black text-slate-900 mb-4 leading-[0.9]">Absolute <br /><span className="text-indigo-600">Trajectory.</span></h2>
                     <p className="text-slate-500 text-lg font-light leading-[1.6] mb-6 italic">"A career isn't just about what you know; it's about how you position that knowledge. We architect your professional brand to be irresistible to elite firms."</p>

                     <div className="space-y-3">
                        {[
                           { i: <IoBriefcaseOutline />, t: "Market Positioning", d: "Aligning your skills with the highest-growth sectors of the tech economy." },
                           { i: <IoGitNetworkOutline />, t: "Network Authority", d: "Direct inroads to hiring managers and decision-makers globally." },
                           { i: <IoRocketOutline />, t: "High-Octane Launch", d: "Rapid placement protocols designed for sub-45 day trajectories." }
                        ].map((feat, i) => (
                           <div key={i} className="flex gap-4 p-5 bg-slate-50 rounded-xl border border-slate-100">
                              <div className="text-2xl text-indigo-600">{feat.i}</div>
                              <div>
                                 <h5 className="text-[10px] font-black text-slate-900 uppercase tracking-widest">{feat.t}</h5>
                                 <p className="text-xs text-slate-400 font-bold">{feat.d}</p>
                              </div>
                           </div>
                        ))}
                     </div>
                  </div>

                  <div className="relative">
                     <div className="bg-slate-900 rounded-[2rem] p-5 md:p-6 border border-slate-800 shadow-2xl aspect-[3/4] flex flex-col justify-between group overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <div className="space-y-6 relative z-10">
                           <div className="flex justify-between items-center text-white/30 font-mono text-[8px] tracking-[0.4em]">
                              <span>SYS_CAREER_ARCH_v2</span>
                              <span>TALENT_BLUEPRINT</span>
                           </div>

                           <div className="space-y-3">
                              <div className="h-[2px] w-full bg-white/10"></div>
                              <div className="flex items-center gap-3">
                                 <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-indigo-400 font-black text-xs"><IoTrendingUpOutline /></div>
                                 <div className="flex-1 space-y-2">
                                    <div className="h-1.5 bg-white/10 rounded-full w-full"></div>
                                    <div className="h-1.5 bg-white/5 rounded-full w-1/3"></div>
                                 </div>
                              </div>
                           </div>

                           <div className="p-4 bg-white/5 rounded-xl border border-white/5">
                              <p className="text-[8px] font-mono text-emerald-400 mb-1 tracking-tighter">PLACEMENT_READY::VERIFIED</p>
                              <p className="text-[8px] font-mono text-slate-500 leading-tight">MEMBER_ID: S_CAREER_482<br />TARGET_SALARY: HIGH_TIER<br />STATUS: COMMAND</p>
                           </div>
                        </div>

                        <div className="bg-white/5 rounded-2xl border border-white/10 p-5 relative overflow-hidden group/m hover:bg-white/10 transition-all">
                           <IoPulseOutline className="text-3xl text-indigo-600/30 mb-3 group-hover/m:rotate-12 transition-transform shadow-[0_0_20px_rgba(79,70,229,0.2)]" />
                           <p className="text-[9px] font-black text-white/50 uppercase tracking-widest mb-1">Protocol: CAREER_QA_CLEAR</p>
                           <p className="text-xs font-bold text-white tracking-tight">Trajectory ready for activation.</p>
                           <div className="absolute bottom-0 left-0 w-full h-[1px] bg-indigo-500/50"></div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>

            <div className="text-center py-16 border-t border-slate-200">
               <IoBriefcaseOutline className="text-5xl text-indigo-600 mb-6 mx-auto opacity-20" />
               <h3 className="text-4xl lg:text-5xl font-black text-slate-900 mb-6 leading-tight">Ready to activate your <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-700 font-serif italic font-medium">Professional Identity?</span></h3>
               <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <button className="w-full sm:w-[280px] px-6 py-4 bg-indigo-600 text-white font-black rounded-xl hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-600/40 uppercase tracking-widest text-[10px] flex items-center justify-center">
                     {cta.title}
                  </button>
                  <Link
                     href="/freelancing"
                     className="w-full sm:w-[280px] px-6 py-4 bg-slate-900 text-white font-black rounded-xl hover:bg-slate-800 transition-all uppercase tracking-widest text-[10px] flex items-center justify-center text-center"
                  >
                     Hire Student Talent
                  </Link>
               </div>
            </div>
         </div>
         
         {/* Mobile Sticky CTA */}
         <div className="sticky bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-slate-200 z-50 lg:hidden pb-[max(0.5rem,env(safe-area-inset-bottom))] mt-auto shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
            <div className="container-custom py-3 flex gap-3 justify-center">
               <button className="flex-1 w-full min-h-[44px] bg-indigo-600 hover:bg-indigo-700 transition-colors text-white font-black rounded-xl uppercase tracking-widest text-[10px] shadow-lg shadow-indigo-600/20 active:scale-95">
                  {cta.title || "Activate Identity"}
               </button>
            </div>
         </div>
      </section>
   );
}
