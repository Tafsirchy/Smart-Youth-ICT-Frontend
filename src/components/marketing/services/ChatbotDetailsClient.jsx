"use client";

import Link from "next/link";
import {
   IoArrowBackOutline,
   IoHardwareChipOutline,
   IoGitNetworkOutline,
   IoAnalyticsOutline,
   IoSyncOutline,
   IoTerminalOutline,
   IoShieldCheckmarkOutline,
   IoCheckmarkCircleOutline,
   IoFlaskOutline,
   IoSaveOutline
} from "react-icons/io5";

export default function ChatbotDetailsClient({ data }) {
   if (!data) return null;

   const { hero, sections, cta } = data;

   return (
      <section className="min-h-screen bg-slate-50 text-slate-900 selection:bg-emerald-600 selection:text-white pb-8 md:pb-12 relative font-sans flex flex-col">
         {/* PERSISTENT BREADCRUMB */}
         <div className="border-b border-slate-200 bg-white/90 sticky top-0 z-50">
            <div className="container-custom py-2 flex items-center justify-between gap-3">
               <Link href="/services/chatbot" className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-500 hover:text-emerald-600 transition-colors leading-[1.4]">
                  <IoArrowBackOutline className="text-sm" /> Infrastructure Overview
               </Link>
               <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-600 leading-[1.4]">{hero.subtitle}</div>
            </div>
         </div>

         <div className="container-custom pt-4 sm:pt-6 pb-[max(2rem,env(safe-area-inset-bottom))] md:pb-0">
            {/* COMPACT TECH HEADER */}
            <div className="max-w-4xl mb-5 pb-4 border-b border-slate-200">
               <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-600 leading-[1.4] mb-1.5">
                  {hero.badge}
               </div>
               <h1 className="text-xl sm:text-2xl font-black text-slate-900 leading-[1.3] mb-2 uppercase">
                  {hero.title?.split(' ')[0]}{" "}
                  <span className="text-emerald-600">{hero.title?.split(' ').slice(1).join(' ')}</span>
               </h1>
               <p className="text-slate-600 text-sm sm:text-base font-normal leading-[1.6] max-w-3xl">
                  &ldquo;{hero.description}&rdquo;
               </p>
            </div>

            {/* 6-PHASE LIFECYCLE GRID */}
            <div className="mb-6">
               <div className="flex items-center gap-3 mb-3">
                  <h2 className="text-lg sm:text-xl font-black text-slate-900 uppercase leading-[1.3]">Training Lifecycle</h2>
                  <div className="h-[1px] flex-1 bg-slate-200"></div>
               </div>

               <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-2.5">
                  {(sections.phases || []).map((item, i) => (
                     <div key={i} className="bg-white p-3.5 sm:p-4 border border-slate-200 hover:border-emerald-200 transition-colors group rounded-lg">
                        <div className="text-emerald-600 font-mono text-xs mb-1.5 flex items-center gap-1.5 leading-[1.4]">
                           <span className="w-1.5 h-1.5 bg-emerald-600 rounded-xs shrink-0"></span>
                           {item.step} // VECTOR_INGEST
                        </div>
                        <h3 className="text-base font-bold text-slate-900 mb-1 group-hover:text-emerald-600 transition-colors uppercase leading-[1.4]">{item.stage}</h3>
                        <p className="text-slate-600 text-sm leading-[1.6]">{item.action}</p>
                     </div>
                  ))}
               </div>
            </div>

            {/* LOGIC ARCHITECTURE SECTION */}
            <div className="grid lg:grid-cols-2 gap-3 lg:gap-4 items-start mb-6">
               <div className="bg-white p-4 border border-slate-200 rounded-lg">
                  <div className="flex items-center gap-2.5 mb-2">
                     <div className="w-8 h-8 bg-emerald-50 flex items-center justify-center text-lg text-emerald-600 border border-emerald-100 rounded-md shrink-0">
                        <IoHardwareChipOutline />
                     </div>
                     <h2 className="text-lg sm:text-xl font-black text-slate-900 leading-[1.3]">Inference Processing <span className="text-emerald-600">Architecture.</span></h2>
                  </div>
                  <p className="text-slate-600 text-sm leading-[1.6] mb-3">Every AI deployment is anchored by a high-performance vector database, ensuring that your chatbot possesses perfect long-term recall of your business data.</p>

                  <div className="p-3 bg-slate-900 border border-slate-800 flex items-center justify-between rounded-lg">
                     <div className="flex gap-2.5 items-center">
                        <div className="w-8 h-8 bg-emerald-500 flex items-center justify-center text-white rounded-md shrink-0"><IoGitNetworkOutline className="text-base" /></div>
                        <div>
                           <p className="text-[10px] font-bold text-white/50 uppercase tracking-wider leading-[1.4]">Latency Audit</p>
                           <p className="text-xs font-bold text-white leading-[1.4]">TOKEN_STREAMING::ACTIVE</p>
                        </div>
                     </div>
                     <IoSyncOutline className="text-emerald-500 text-base" />
                  </div>
               </div>

               <div className="space-y-2.5">
                  {(sections.roi || []).map((spec, idx) => (
                     <div key={idx} className="bg-white p-3.5 sm:p-4 border border-slate-200 rounded-lg">
                        <h4 className="text-[11px] font-bold text-emerald-600 uppercase tracking-wider mb-2 leading-[1.4]">{spec.group} Framework</h4>
                        <div className="grid grid-cols-2 gap-2">
                           {spec.items?.map(item => (
                              <div key={item} className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-700 leading-[1.4]">
                                 <IoCheckmarkCircleOutline className="text-emerald-600 text-base shrink-0" />
                                 <span>{item}</span>
                              </div>
                           ))}
                        </div>
                     </div>
                  ))}
               </div>
            </div>

            {/* SECURITY PROMPT SECTION */}
            <div className="bg-white p-4 sm:p-5 border border-slate-200 shadow-sm mb-6 rounded-lg">
               <div className="grid lg:grid-cols-2 gap-3 lg:gap-4 items-start">
                  <div>
                     <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-600 leading-[1.4] mb-1">
                        Integrity Governance
                     </div>
                     <h2 className="text-lg sm:text-xl font-black text-slate-900 mb-1.5 leading-[1.3]">Trusted <span className="text-emerald-600">Decision Systems.</span></h2>
                     <p className="text-slate-600 text-sm leading-[1.6] mb-3">&ldquo;We implement multi-layered prompt injection shielding and PII redaction to ensure your AI behaves with corporate-grade integrity.&rdquo;</p>

                     <div className="space-y-2">
                        {[
                           { i: <IoShieldCheckmarkOutline />, t: "Injection Shielding", d: "Hardening system prompts against adversarial manipulation." },
                           { i: <IoTerminalOutline />, t: "PII Redaction Engine", d: "Automatic masking of sensitive customer data." },
                           { i: <IoSaveOutline />, t: "Audit Logs", d: "Full conversation persistence with meta-tracking." }
                        ].map((feat, i) => (
                           <div key={i} className="flex gap-2.5 p-2.5 bg-slate-50 border border-slate-100 items-start rounded-md">
                              <div className="text-base text-emerald-600 shrink-0 mt-0.5">{feat.i}</div>
                              <div>
                                 <h5 className="text-xs font-bold text-slate-900 uppercase tracking-wider leading-[1.4] mb-0.5">{feat.t}</h5>
                                 <p className="text-xs text-slate-500 font-medium leading-[1.4]">{feat.d}</p>
                              </div>
                           </div>
                        ))}
                     </div>
                  </div>

                  <div className="bg-slate-900 p-4 border border-slate-800 rounded-lg space-y-3">
                     <div className="flex justify-between items-center text-white/40 font-mono text-[10px] tracking-wider leading-[1.4]">
                        <span>SYS_INFERENCE_200</span>
                        <span>NEURAL_BLUEPRINT</span>
                     </div>

                     <div className="p-3 bg-white/5 border border-white/10 rounded-md flex items-start gap-2.5">
                        <div className="w-8 h-8 bg-white/5 border border-white/10 flex items-center justify-center text-emerald-400 text-sm shrink-0 rounded-md">
                           <IoAnalyticsOutline />
                        </div>
                        <div className="font-mono">
                           <p className="text-[10px] text-emerald-400 mb-1 leading-[1.4]">QUERY: &quot;Status of Order #8210?&quot;</p>
                           <p className="text-xs text-slate-300 leading-[1.5]">SEARCHING_DB... FOUND | STATUS: SHIPPED | ACTION: INFORM_CLIENT</p>
                        </div>
                     </div>

                     <div className="bg-white/5 border border-white/10 p-3 rounded-md flex items-center gap-2.5">
                        <IoFlaskOutline className="text-xl text-emerald-500 shrink-0" />
                        <div>
                           <p className="text-[10px] font-bold text-white/50 uppercase tracking-wider leading-[1.4]">Protocol: ETHICS_CONTROL_B4</p>
                           <p className="text-xs font-bold text-white leading-[1.4]">System ready for global inference.</p>
                        </div>
                     </div>
                  </div>
               </div>
            </div>

            {/* CTA */}
            <div className="text-center py-5 border-t border-slate-200">
               <h3 className="text-lg sm:text-xl font-black text-slate-900 mb-3 leading-[1.3]">Ready to activate your <span className="text-emerald-600">Digital Intelligence?</span></h3>
               <div className="flex flex-col sm:flex-row gap-2.5 justify-center">
                  <button className="w-full sm:w-[220px] min-h-[42px] px-4 py-2.5 bg-emerald-600 text-white font-bold hover:bg-emerald-700 transition-colors shadow-sm uppercase tracking-wider text-xs flex items-center justify-center leading-[1.4] rounded-md">
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

         {/* Mobile Sticky CTA */}
         <div className="sticky bottom-0 left-0 w-full p-3 bg-white/95 border-t border-slate-200 z-50 md:hidden flex items-center justify-between pb-[max(0.75rem,env(safe-area-inset-bottom))] mt-auto">
            <div className="flex flex-col">
               <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider leading-[1.4]">Ready?</p>
               <p className="text-slate-900 font-bold text-sm leading-[1.4]">Start Building</p>
            </div>
            <button className="px-4 py-2.5 min-h-[42px] bg-emerald-600 text-white font-bold text-xs uppercase tracking-wider leading-[1.4] flex items-center justify-center rounded-md">
               Initialize
            </button>
         </div>
      </section>
   );
}
