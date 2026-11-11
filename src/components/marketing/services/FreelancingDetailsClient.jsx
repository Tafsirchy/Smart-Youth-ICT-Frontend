"use client";

import Link from "next/link";
import {
   IoArrowBackOutline,
   IoWalletOutline,
   IoGlobeOutline,
   IoCheckmarkCircleOutline,
   IoPulseOutline,
   IoSyncOutline,
   IoPeopleOutline,
   IoStorefrontOutline,
   IoBriefcaseOutline,
   IoRocketOutline
} from "react-icons/io5";

export default function FreelancingDetailsClient({ data }) {
   if (!data) return null;

   const { hero, sections, cta } = data;
   const phases = sections.phases || [];
   const roi = sections.roi || [];

   return (
      <section className="min-h-screen bg-slate-50 text-slate-900 selection:bg-amber-600 selection:text-white pb-8 md:pb-12 relative flex flex-col">
         <div className="border-b border-slate-200 bg-white/90 sticky top-0 z-50">
            <div className="container-custom py-2 flex items-center justify-between gap-3">
               <Link href="/services/freelancing" className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-500 hover:text-amber-600 transition-colors leading-[1.4]">
                  <IoArrowBackOutline className="text-sm" /> Independence Overview
               </Link>
               <div className="text-[11px] font-bold uppercase tracking-wider text-amber-600 leading-[1.4]">MARKET_SPEC_v2.4</div>
            </div>
         </div>

         <div className="container-custom pt-4 sm:pt-6 pb-[max(2rem,env(safe-area-inset-bottom))] lg:pb-0">
            <div className="max-w-4xl mb-5 pb-4 border-b border-slate-200">
               <div className="text-[11px] font-bold uppercase tracking-wider text-amber-600 leading-[1.4] mb-1.5">
                  {hero.badge}
               </div>
               <h1 className="text-xl sm:text-2xl font-black text-slate-900 leading-[1.3] mb-2">
                  {hero.title?.split(' ')[0]}{" "}
                  <span className="text-amber-600">{hero.title?.split(' ').slice(1).join(' ')}</span>
               </h1>
               <p className="text-slate-600 text-sm sm:text-base font-normal leading-[1.6] max-w-3xl">
                  &ldquo;{hero.desc}&rdquo;
               </p>
            </div>

            <div className="mb-6">
               <div className="flex items-center gap-3 mb-3">
                  <h2 className="text-lg sm:text-xl font-black text-slate-900 uppercase leading-[1.3]">The Independence Lifecycle</h2>
                  <div className="h-[1px] flex-1 bg-slate-200"></div>
               </div>

               <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-2.5">
                  {phases.map((item, i) => (
                     <div key={i} className="bg-white p-3.5 sm:p-4 border border-slate-200 hover:border-amber-200 transition-colors group flex flex-col gap-1 rounded-lg">
                        <div className="text-amber-600 font-mono text-xs mb-0.5 flex items-center gap-1.5 uppercase leading-[1.4]">
                           <span className="w-1.5 h-1.5 bg-amber-600 rounded-xs shrink-0"></span>
                           {item.step} // MARKET_STRATEGY_SYNC
                        </div>
                        <h3 className="text-base font-bold text-slate-900 group-hover:text-amber-600 transition-colors uppercase leading-[1.4]">{item.stage}</h3>
                        <p className="text-slate-600 text-sm leading-[1.6]">{item.action}</p>
                     </div>
                  ))}
               </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-3 lg:gap-4 items-start mb-6">
               <div className="bg-white p-4 border border-slate-200 rounded-lg">
                  <div className="flex items-center gap-2.5 mb-2">
                     <div className="w-8 h-8 bg-amber-50 flex items-center justify-center text-lg text-amber-600 border border-amber-100 rounded-md shrink-0">
                        <IoWalletOutline />
                     </div>
                     <h2 className="text-lg sm:text-xl font-black text-slate-900 leading-[1.3]">Monetization Sovereignty <span className="text-amber-600">Manifest.</span></h2>
                  </div>
                  <p className="text-slate-600 text-sm leading-[1.6] mb-3">Building a freelance career is building a business. We provide the architectural blueprints for high-vibration client acquisition and persistent revenue growth.</p>

                  <div className="p-3 bg-slate-900 border border-slate-800 flex items-center justify-between rounded-lg">
                     <div className="flex gap-2.5 items-center">
                        <div className="w-8 h-8 bg-amber-500 flex items-center justify-center text-white shrink-0 rounded-md"><IoBriefcaseOutline className="text-base" /></div>
                        <div>
                           <p className="text-[10px] font-bold text-white/50 uppercase tracking-wider leading-[1.4]">Revenue Audit</p>
                           <p className="text-xs font-bold text-white leading-[1.4]">STATUS::TOP_RATED_CLEAR</p>
                        </div>
                     </div>
                     <IoSyncOutline className="text-amber-500 text-base" />
                  </div>
               </div>

               <div className="space-y-2.5">
                  {roi.map((spec, idx) => (
                     <div key={idx} className="bg-white p-3.5 sm:p-4 border border-slate-200 rounded-lg">
                        <h4 className="text-[11px] font-bold text-amber-600 uppercase tracking-wider mb-2 leading-[1.4]">{spec.group} Framework</h4>
                        <div className="grid grid-cols-1 gap-1.5">
                           {spec.items?.map(item => (
                              <div key={item} className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-700 leading-[1.4]">
                                 <IoCheckmarkCircleOutline className="text-amber-600 text-base shrink-0" /> {item}
                              </div>
                           ))}
                        </div>
                     </div>
                  ))}
               </div>
            </div>

            <div className="bg-white p-4 sm:p-5 border border-slate-200 shadow-sm mb-6 rounded-lg">
               <div className="grid lg:grid-cols-2 gap-3 lg:gap-4 items-start">
                  <div>
                     <div className="text-[11px] font-bold uppercase tracking-wider text-amber-600 leading-[1.4] mb-1">
                        Global Marketplace Sync
                     </div>
                     <h2 className="text-lg sm:text-xl font-black text-slate-900 mb-1.5 leading-[1.3]">Absolute <span className="text-amber-600">Monetization.</span></h2>
                     <p className="text-slate-600 text-sm leading-[1.6] mb-3">&ldquo;The feed is competitive, but it&apos;s not random. We teach you the mathematical approach to bidding that guarantees high-vibration client resonance.&rdquo;</p>

                     <div className="space-y-2">
                        {[
                           { i: <IoGlobeOutline />, t: "Global Payment Hub", d: "Setting up secure, low-fee payment gates for seamless revenue capture." },
                           { i: <IoPeopleOutline />, t: "Client Engineering", d: "Mastering the psychology of lead qualification and high-ticket closing." },
                           { i: <IoStorefrontOutline />, t: "Profile Architecture", d: "Designing service nodes that act as passive lead-generation engines." }
                        ].map((feat, i) => (
                           <div key={i} className="flex gap-2.5 p-2.5 bg-slate-50 border border-slate-100 items-start rounded-md">
                              <div className="text-base text-amber-600 shrink-0 mt-0.5">{feat.i}</div>
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
                        <span>SYS_MARKET_LOGIC_v6</span>
                        <span>BP_FREELANCE_v4</span>
                     </div>

                     <div className="p-3 bg-white/5 border border-white/10 rounded-md flex items-start gap-2.5">
                        <div className="w-8 h-8 bg-white/5 border border-white/10 flex items-center justify-center text-amber-400 text-sm shrink-0 rounded-md">
                           <IoRocketOutline />
                        </div>
                        <div>
                           <p className="text-[10px] font-mono text-emerald-400 mb-1 uppercase tracking-wider leading-[1.4]">BID_STRENGTH::OPTIMIZED_HIGH</p>
                           <p className="text-xs font-mono text-slate-300 leading-[1.5]">AVG_HOURLY: $45.00 | SUCCESS_RATE: 98% | STATUS: TOP_RATED</p>
                        </div>
                     </div>

                     <div className="bg-white/5 border border-white/10 p-3 rounded-md flex items-center gap-2.5">
                        <IoPulseOutline className="text-xl text-amber-500 shrink-0" />
                        <div>
                           <p className="text-[10px] font-bold text-white/50 uppercase tracking-wider leading-[1.4]">Protocol: MARKET_QA_CLEAR</p>
                           <p className="text-xs font-bold text-white leading-[1.4]">Profile ready for activation.</p>
                        </div>
                     </div>
                  </div>
               </div>
            </div>

            <div className="text-center py-5 border-t border-slate-200">
               <h3 className="text-lg sm:text-xl font-black text-slate-900 mb-3 leading-[1.3]">Ready to command your <span className="text-amber-600">Independent Sovereignty?</span></h3>
               <div className="flex flex-col sm:flex-row gap-2.5 justify-center">
                  <button className="w-full sm:w-[220px] min-h-[42px] px-4 py-2.5 bg-amber-600 text-white font-bold hover:bg-amber-700 transition-colors shadow-sm uppercase tracking-wider text-xs flex items-center justify-center leading-[1.4] rounded-md">
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

         <div className="sticky bottom-0 left-0 right-0 bg-white/95 border-t border-slate-200 z-50 lg:hidden pb-[max(0.75rem,env(safe-area-inset-bottom))] mt-auto">
            <div className="container-custom py-2.5 flex gap-2.5 justify-center">
               <button className="flex-1 w-full min-h-[42px] bg-amber-600 hover:bg-amber-700 transition-colors text-white font-bold uppercase tracking-wider text-xs leading-[1.4] rounded-md">
                  {cta.title || "Command Autonomy"}
               </button>
            </div>
         </div>
      </section>
   );
}
