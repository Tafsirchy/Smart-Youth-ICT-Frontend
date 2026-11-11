"use client";

import Link from "next/link";
import {
   IoArrowBackOutline,
   IoBriefcaseOutline,
   IoPeopleOutline,
   IoCheckmarkCircleOutline,
   IoPulseOutline,
   IoSyncOutline,
   IoGitNetworkOutline,
   IoRocketOutline,
   IoStatsChartOutline,
   IoBusinessOutline
} from "react-icons/io5";

export default function JobPlacementDetailsClient({ data }) {
   if (!data) return null;

   const { hero, sections, cta } = data;
   const phases = sections.phases || [];
   const roi = sections.roi || [];

   return (
      <section className="min-h-screen bg-slate-50 text-slate-900 selection:bg-rose-600 selection:text-white pb-8 md:pb-12">
         {/* PERSISTENT BREADCRUMB */}
         <div className="border-b border-slate-200 bg-white/90 sticky top-0 z-50">
            <div className="container-custom py-2 flex items-center justify-between gap-3">
               <Link href="/services/job-placement" className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-500 hover:text-rose-600 transition-colors leading-[1.4]">
                  <IoArrowBackOutline className="text-sm" /> Infrastructure Overview
               </Link>
               <div className="text-[11px] font-bold uppercase tracking-wider text-rose-600 leading-[1.4]">BRIDGE_SPEC_v5.1</div>
            </div>
         </div>

         <div className="container-custom pt-4 sm:pt-6">
            {/* COMPACT TECH HEADER */}
            <div className="max-w-4xl mb-5 pb-4 border-b border-slate-200">
               <div className="text-[11px] font-bold uppercase tracking-wider text-rose-600 leading-[1.4] mb-1.5">
                  {hero.badge}
               </div>
               <h1 className="text-xl sm:text-2xl font-black text-slate-900 leading-[1.3] mb-2">
                  {hero.title?.split(' ')[0]}{" "}
                  <span className="text-rose-600">{hero.title?.split(' ').slice(1).join(' ')}</span>
               </h1>
               <p className="text-slate-600 text-sm sm:text-base font-normal leading-[1.6] max-w-3xl">
                  &ldquo;{hero.desc}&rdquo;
               </p>
            </div>

            {/* 6-PHASE BRIDGE GRID */}
            <div className="mb-6">
               <div className="flex items-center gap-3 mb-3">
                  <h2 className="text-lg sm:text-xl font-black text-slate-900 uppercase leading-[1.3]">The Placement Lifecycle</h2>
                  <div className="h-[1px] flex-1 bg-slate-200"></div>
               </div>

               <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-2.5">
                  {phases.map((item, i) => (
                     <div key={i} className="bg-white p-3.5 sm:p-4 border border-slate-200 hover:border-rose-200 transition-colors group flex flex-col gap-1 rounded-lg">
                        <div className="text-rose-600 font-mono text-xs mb-0.5 flex items-center gap-1.5 uppercase leading-[1.4]">
                           <span className="w-1.5 h-1.5 bg-rose-600 rounded-xs shrink-0"></span>
                           {item.step} // PLACEMENT_SYNC_NODE
                        </div>
                        <h3 className="text-base font-bold text-slate-900 group-hover:text-rose-600 transition-colors uppercase leading-[1.4]">{item.stage}</h3>
                        <p className="text-slate-600 text-sm leading-[1.6]">{item.action}</p>
                     </div>
                  ))}
               </div>
            </div>

            {/* NETWORK SECTION */}
            <div className="grid lg:grid-cols-2 gap-3 lg:gap-4 items-start mb-6">
               <div className="bg-white p-4 border border-slate-200 rounded-lg">
                  <div className="flex items-center gap-2.5 mb-2">
                     <div className="w-8 h-8 bg-rose-50 flex items-center justify-center text-lg text-rose-600 border border-rose-100 rounded-md shrink-0">
                        <IoBusinessOutline />
                     </div>
                     <h2 className="text-lg sm:text-xl font-black text-slate-900 leading-[1.3]">Direct Partner <span className="text-rose-600">Inroads.</span></h2>
                  </div>
                  <p className="text-slate-600 text-sm leading-[1.6] mb-3">We treat the job hunt as a deterministic engineering problem. By syncing our graduates directly with the internal spreadsheets of hiring managers, we bypass the noise of public job boards.</p>

                  <div className="p-3 bg-slate-900 border border-slate-800 flex items-center justify-between rounded-lg">
                     <div className="flex gap-2.5 items-center">
                        <div className="w-8 h-8 bg-rose-500 flex items-center justify-center text-white shrink-0 rounded-md"><IoGitNetworkOutline className="text-base" /></div>
                        <div>
                           <p className="text-[10px] font-bold text-white/50 uppercase tracking-wider leading-[1.4]">Network Audit</p>
                           <p className="text-xs font-bold text-white leading-[1.4]">STATUS::BRIDGE_STABLE</p>
                        </div>
                     </div>
                     <IoSyncOutline className="text-rose-500 text-base" />
                  </div>
               </div>

               <div className="space-y-2.5">
                  {roi.map((spec, idx) => (
                     <div key={idx} className="bg-white p-3.5 sm:p-4 border border-slate-200 rounded-lg">
                        <h4 className="text-[11px] font-bold text-rose-600 uppercase tracking-wider mb-2 leading-[1.4]">{spec.group} Framework</h4>
                        <div className="grid grid-cols-1 gap-1.5">
                           {spec.items?.map(item => (
                              <div key={item} className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-700 leading-[1.4]">
                                 <IoCheckmarkCircleOutline className="text-rose-600 text-base shrink-0" /> {item}
                              </div>
                           ))}
                        </div>
                     </div>
                  ))}
               </div>
            </div>

            {/* COACHING SECTION */}
            <div className="bg-white p-4 sm:p-5 border border-slate-200 shadow-sm mb-6 rounded-lg">
               <div className="grid lg:grid-cols-2 gap-3 lg:gap-4 items-start">
                  <div>
                     <div className="text-[11px] font-bold uppercase tracking-wider text-rose-600 leading-[1.4] mb-1">
                        Personalized Placement Agent
                     </div>
                     <h2 className="text-lg sm:text-xl font-black text-slate-900 mb-1.5 leading-[1.3]">Absolute <span className="text-rose-600">Transition.</span></h2>
                     <p className="text-slate-600 text-sm leading-[1.6] mb-3">&ldquo;Your story is as important as your code. We architect your professional narrative to ensure it resonates with the specific culture of your target firm.&rdquo;</p>

                     <div className="space-y-2">
                        {[
                           { i: <IoPeopleOutline />, t: "CTO Mock Interviews", d: "Simulated technical sessions with active CTOs from our partner network." },
                           { i: <IoStatsChartOutline />, t: "Salary Negotiation", d: "Heuristic data analysis to ensure you receive the highest possible market rate." },
                           { i: <IoRocketOutline />, t: "Pre-Hire Audit", d: "Final stress-test of your technical logic and communication protocols." }
                        ].map((feat, i) => (
                           <div key={i} className="flex gap-2.5 p-2.5 bg-slate-50 border border-slate-100 items-start rounded-md">
                              <div className="text-base text-rose-600 shrink-0 mt-0.5">{feat.i}</div>
                              <div>
                                 <h5 className="text-xs font-bold text-slate-900 uppercase tracking-wider leading-[1.4] mb-0.5">{feat.t}</h5>
                                 <p className="text-xs text-slate-500 font-medium leading-[1.4]">{feat.d}</p>
                              </div>
                           </div>
                        ))}
                     </div>
                  </div>

                  <div className="bg-slate-900 p-4 border border-slate-800 rounded-lg space-y-3">
                     <div className="flex justify-between items-center text-white/40 font-mono text-[10px] uppercase tracking-wider leading-[1.4]">
                        <span>SYS_BRIDGE_AUDIT</span>
                        <span>BP_JOB_PLACEMENT</span>
                     </div>

                     <div className="p-3 bg-white/5 border border-white/10 rounded-md flex items-start gap-2.5">
                        <div className="w-8 h-8 bg-white/5 border border-white/10 flex items-center justify-center text-rose-400 text-sm shrink-0 rounded-md">
                           <IoBriefcaseOutline />
                        </div>
                        <div>
                           <p className="text-[10px] font-mono text-emerald-400 mb-1 uppercase tracking-wider leading-[1.4]">BRIDGE_SYNC::OPTIMIZED_CLEAR</p>
                           <p className="text-xs font-mono text-slate-300 leading-[1.5]">MEMBER_ID: S_PLACE_921 | PLACEMENT_READY: YES | STATUS: COMMAND</p>
                        </div>
                     </div>

                     <div className="bg-white/5 border border-white/10 p-3 rounded-md flex items-center gap-2.5">
                        <IoPulseOutline className="text-xl text-rose-500 shrink-0" />
                        <div>
                           <p className="text-[10px] font-bold text-white/50 uppercase tracking-wider leading-[1.4]">Protocol: PLACEMENT_QA_CLEAR</p>
                           <p className="text-xs font-bold text-white leading-[1.4]">Bridge ready for activation.</p>
                        </div>
                     </div>
                  </div>
               </div>
            </div>

            {/* CTA */}
            <div className="text-center py-5 border-t border-slate-200">
               <h3 className="text-lg sm:text-xl font-black text-slate-900 mb-3 leading-[1.3]">Ready to activate your <span className="text-rose-600">Professional Placement?</span></h3>
               <div className="flex flex-col sm:flex-row gap-2.5 justify-center">
                  <button className="w-full sm:w-[220px] min-h-[42px] px-4 py-2.5 bg-rose-600 text-white font-bold hover:bg-rose-700 transition-colors shadow-sm uppercase tracking-wider text-xs flex items-center justify-center leading-[1.4] rounded-md">
                     {cta.title}
                  </button>
                  <Link
                     href="/freelancing"
                     className="w-full sm:w-[220px] min-h-[42px] px-4 py-2.5 bg-slate-900 text-white font-bold hover:bg-slate-800 transition-colors uppercase tracking-wider text-xs flex items-center justify-center text-center leading-[1.4] rounded-md"
                  >
                     Hire Student Talent
                  </Link>
               </div>
            </div>
         </div>
      </section>
   );
}
