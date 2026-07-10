"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
   IoArrowBackOutline,
   IoShieldCheckmarkOutline,
   IoRibbonOutline,
   IoCheckmarkCircleOutline,
   IoPulseOutline,
   IoSyncOutline,
   IoFingerPrintOutline,
   IoGlobeOutline,
   IoLockClosedOutline,
   IoShieldOutline
} from "react-icons/io5";

export default function CertificationsDetailsClient({ data }) {
   if (!data) return null;

   const { hero, sections, cta } = data;
   const phases = sections.phases || [];
   const roi = sections.roi || [];

   return (
      <section className="min-h-screen bg-slate-50 text-slate-900 selection:bg-emerald-600 selection:text-white pb-12">
         {/* PERSISTENT BREADCRUMB */}
         <div className="border-b border-slate-200 bg-white/80 backdrop-blur-md sticky top-0 z-50">
            <div className="container-custom py-2 flex items-center justify-between">
               <Link href="/services/certifications" className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-emerald-600 transition-colors leading-tight">
                  <IoArrowBackOutline className="text-sm" /> Validation Overview
               </Link>
               <div className="text-[10px] font-black uppercase tracking-widest text-emerald-600 leading-tight">CERT_SPEC_v9.4</div>
            </div>
         </div>

         <div className="container-custom pt-8">
            {/* TECH HEADER */}
            <div className="max-w-5xl mb-8">
               <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center gap-2 text-emerald-600 mb-4"
               >
                  <div className="w-8 h-[1px] bg-emerald-600"></div>
                  <span className="text-[10px] font-black uppercase tracking-widest leading-tight">{hero.badge}</span>
               </motion.div>
               <h1 className="text-5xl md:text-5xl font-black text-slate-900 leading-[1.1] mb-4">
                  {hero.title?.split(' ')[0]} <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-500 to-indigo-500 animate-gradient-x">{hero.title?.split(' ').slice(1).join(' ')}</span>
               </h1>
               <p className="text-slate-600 text-xl font-light leading-[1.6] max-w-2xl italic">
                  "{hero.desc}"
               </p>
            </div>

            {/* 6-PHASE VALIDATION GRID */}
            <div className="mb-12">
               <div className="flex items-center gap-4 mb-6">
                  <h2 className="text-3xl font-black text-slate-900 uppercase leading-none">The Validation Lifecycle</h2>
                  <div className="h-[1px] flex-1 bg-slate-200"></div>
               </div>

               <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-slate-200 border border-slate-200 rounded-3xl overflow-hidden shadow-lg">
                  {phases.map((item, i) => (
                     <div key={i} className="bg-white p-6 hover:bg-slate-50 transition-colors group">
                        <div className="text-emerald-600 font-mono text-xs mb-3 flex items-center gap-1.5 leading-tight">
                           <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                           {item.step} // CERT_VALIDATION_SYNC
                        </div>
                        <h3 className="text-xl font-black text-slate-900 mb-2 group-hover:text-emerald-600 transition-colors uppercase leading-tight">{item.stage}</h3>
                        <p className="text-slate-500 text-sm font-light leading-[1.6]">{item.action}</p>
                     </div>
                  ))}
               </div>
            </div>

            {/* SECURITY SECTION */}
            <div className="grid lg:grid-cols-2 gap-8 items-start mb-12">
               <div className="relative lg:sticky lg:top-20">
                  <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center text-2xl text-emerald-600 mb-4 border border-emerald-100">
                     <IoFingerPrintOutline />
                  </div>
                  <h2 className="text-5xl font-black text-slate-900 mb-4 leading-[1.1]">Immutable <br /> Identity <span className="text-emerald-600">Sync.</span></h2>
                  <p className="text-slate-500 text-lg font-light leading-[1.6] mb-6">By leveraging blockchain technology, we ensure that every certificate issued by SYICT is fractionalized, immutable, and globally verifiable without the need for manual checks.</p>

                  <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 shadow-lg flex items-center justify-between group cursor-default">
                     <div className="flex gap-3 items-center">
                        <div className="w-10 h-10 rounded-lg bg-emerald-500 flex items-center justify-center text-white shadow-md"><IoLockClosedOutline className="text-xl" /></div>
                        <div>
                           <p className="text-[10px] font-black text-white/40 uppercase tracking-widest leading-tight">Integrity Audit</p>
                           <p className="text-xs font-bold text-white leading-tight">LEDGER::SYNCED_IMMUTABLE</p>
                        </div>
                     </div>
                     <IoSyncOutline className="text-emerald-500 text-lg animate-spin-slow" />
                  </div>
               </div>

               <div className="space-y-3">
                  {roi.map((spec, idx) => (
                     <div key={idx} className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm hover:shadow-md transition-all">
                        <h4 className="text-[10px] font-black text-emerald-600 uppercase tracking-widest mb-3 leading-tight">{spec.group} Framework</h4>
                        <div className="grid grid-cols-1 gap-2">
                           {spec.items?.map(item => (
                              <div key={item} className="flex items-center gap-2 text-sm font-bold text-slate-600 leading-tight">
                                 <IoCheckmarkCircleOutline className="text-emerald-600 text-base" /> {item}
                              </div>
                           ))}
                        </div>
                     </div>
                  ))}
               </div>
            </div>

            {/* BLOCKCHAIN SECTION */}
            <div className="bg-white rounded-3xl p-6 lg:p-10 border border-slate-100 shadow-lg relative overflow-hidden mb-12">
               <div className="absolute top-0 right-0 w-1/3 h-full bg-slate-50/50 border-l border-slate-100 skew-x-12 translate-x-6"></div>
               <div className="grid lg:grid-cols-2 gap-8 relative z-10">
                  <div>
                     <div className="text-emerald-600 mb-4 flex items-center gap-2">
                        <div className="w-8 h-[2px] bg-emerald-600"></div>
                        <span className="text-[10px] font-black uppercase tracking-widest leading-tight">Decentralized Validation Network</span>
                     </div>
                     <h2 className="text-5xl font-black text-slate-900 mb-4 leading-[1.1]">Absolute <br /><span className="text-emerald-600">Verification.</span></h2>
                     <p className="text-slate-500 text-lg font-light leading-[1.6] mb-6 italic">"A certificate is only as strong as its verification layer. We utilize a decentralized ledger to ensure your authority is recognized instantly by any firm in the world."</p>

                     <div className="space-y-3">
                        {[
                           { i: <IoGlobeOutline />, t: "Global Recognition", d: "Accepted and preferred by over 200+ partner tech firms." },
                           { i: <IoShieldOutline />, t: "Fraud Prevention", d: "Zero-knowledge proofs and secure QR anchors to eliminate forgery." },
                           { i: <IoRibbonOutline />, t: "Expert Endorsement", d: "Each certificate features signed verification from our project lead mentors." }
                        ].map((feat, i) => (
                           <div key={i} className="flex gap-3 p-4 bg-slate-50 rounded-xl border border-slate-100">
                              <div className="text-xl text-emerald-600">{feat.i}</div>
                              <div>
                                 <h5 className="text-[10px] font-black text-slate-900 uppercase tracking-widest leading-tight">{feat.t}</h5>
                                 <p className="text-xs text-slate-400 font-bold leading-[1.6]">{feat.d}</p>
                              </div>
                           </div>
                        ))}
                     </div>
                  </div>

                  <div className="relative hidden lg:block">
                     <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 shadow-lg aspect-[3/4] flex flex-col justify-between group overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <div className="space-y-4 relative z-10">
                           <div className="flex justify-between items-center text-white/30 font-mono text-[8px] tracking-widest leading-tight">
                              <span>SYS_CERT_LEDGER_v4</span>
                              <span>AUTH_BLUEPRINT</span>
                           </div>

                           <div className="space-y-2">
                              <div className="h-[1px] w-full bg-white/10"></div>
                              <div className="flex items-center gap-2">
                                 <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-emerald-400 font-black text-xs"><IoShieldCheckmarkOutline /></div>
                                 <div className="flex-1 space-y-1">
                                    <div className="h-1 bg-white/10 rounded-full w-full"></div>
                                    <div className="h-1 bg-white/5 rounded-full w-1/3"></div>
                                 </div>
                              </div>
                           </div>

                           <div className="p-3 bg-white/5 rounded-xl border border-white/5">
                              <p className="text-[8px] font-mono text-emerald-400 mb-1 leading-tight">BLOCK_ID::0x7F29...ED41</p>
                              <p className="text-[8px] font-mono text-slate-500 leading-[1.4]">ISSUED_TO: S_MEMBER_912<br />STRENGTH: ULTRA_HIGH<br />ENCRYPT: AES_256</p>
                           </div>
                        </div>

                        <div className="bg-white/5 rounded-2xl border border-white/10 p-4 relative overflow-hidden group/m hover:bg-white/10 transition-all">
                           <IoPulseOutline className="text-2xl text-emerald-600/30 mb-2 group-hover/m:rotate-12 transition-transform shadow-[0_0_15px_rgba(16,185,129,0.2)]" />
                           <p className="text-[9px] font-black text-white/50 uppercase tracking-widest mb-1 leading-tight">Protocol: VALIDATION_QA_CLEAR</p>
                           <p className="text-xs font-bold text-white leading-tight">Authority ready for issuance.</p>
                           <div className="absolute bottom-0 left-0 w-full h-[1px] bg-emerald-500/50"></div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>

            {/* CTA */}
            <div className="text-center py-12 border-t border-slate-200">
               <IoRibbonOutline className="text-5xl text-emerald-600 mb-6 mx-auto opacity-20" />
               <h3 className="text-4xl lg:text-5xl font-black text-slate-900 mb-6 leading-[1.1]">Ready to command your <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-indigo-700 font-serif italic font-medium">Technical Authority?</span></h3>
               <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <button className="w-full min-h-[48px] sm:w-[280px] px-6 py-3 bg-emerald-600 text-white font-black rounded-xl hover:bg-emerald-700 focus-visible:ring-4 focus-visible:ring-emerald-500 transition-colors shadow-lg shadow-emerald-600/40 uppercase tracking-widest text-base flex items-center justify-center active:scale-95 leading-tight">
                     {cta?.title || "Validate Now"}
                  </button>
                  <Link
                     href="/freelancing"
                     className="w-full min-h-[48px] sm:w-[280px] px-6 py-3 bg-slate-900 text-white font-black rounded-xl hover:bg-slate-800 focus-visible:ring-4 focus-visible:ring-slate-500 transition-colors uppercase tracking-widest text-base flex items-center justify-center text-center active:scale-95 leading-tight"
                  >
                     Hire Student Talent
                  </Link>
               </div>
            </div>
         </div>
         {/* Mobile Sticky CTA */}
         <div className="sticky bottom-[0] left-0 right-0 px-[var(--gutter,16px)] pt-3 pb-[max(12px,env(safe-area-inset-bottom))] bg-white/90 backdrop-blur-md border-t border-slate-200 z-[90] lg:hidden flex justify-center mt-auto">
            <button className="w-full min-h-[48px] py-3 px-4 bg-emerald-600 text-white font-black rounded-xl shadow-lg active:scale-95 transition-transform text-base uppercase tracking-widest leading-tight">
               {cta?.title || "Validate Now"}
            </button>
         </div>
      </section>
   );
}
