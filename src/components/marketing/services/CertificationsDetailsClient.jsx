"use client";

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
      <section className="min-h-screen bg-slate-50 text-slate-900 selection:bg-emerald-600 selection:text-white pb-8 md:pb-12 relative flex flex-col">
         {/* PERSISTENT BREADCRUMB */}
         <div className="border-b border-slate-200 bg-white/90 sticky top-0 z-50">
            <div className="container-custom py-2 flex items-center justify-between gap-3">
               <Link href="/services/certifications" className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-500 hover:text-emerald-600 transition-colors leading-[1.4]">
                  <IoArrowBackOutline className="text-sm" /> Validation Overview
               </Link>
               <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-600 leading-[1.4]">CERT_SPEC_v9.4</div>
            </div>
         </div>

         <div className="container-custom pt-4 sm:pt-6 pb-[max(2rem,env(safe-area-inset-bottom))] lg:pb-0">
            {/* COMPACT TECH HEADER */}
            <div className="max-w-4xl mb-5 pb-4 border-b border-slate-200">
               <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-600 leading-[1.4] mb-1.5">
                  {hero.badge}
               </div>
               <h1 className="text-xl sm:text-2xl font-black text-slate-900 leading-[1.3] mb-2">
                  {hero.title?.split(' ')[0]}{" "}
                  <span className="text-emerald-600">{hero.title?.split(' ').slice(1).join(' ')}</span>
               </h1>
               <p className="text-slate-600 text-sm sm:text-base font-normal leading-[1.6] max-w-3xl">
                  &ldquo;{hero.desc}&rdquo;
               </p>
            </div>

            {/* 6-PHASE VALIDATION GRID */}
            <div className="mb-6">
               <div className="flex items-center gap-3 mb-3">
                  <h2 className="text-lg sm:text-xl font-black text-slate-900 uppercase leading-[1.3]">The Validation Lifecycle</h2>
                  <div className="h-[1px] flex-1 bg-slate-200"></div>
               </div>

               <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-2.5">
                  {phases.map((item, i) => (
                     <div key={i} className="bg-white p-3.5 sm:p-4 border border-slate-200 hover:border-emerald-200 transition-colors group rounded-lg">
                        <div className="text-emerald-600 font-mono text-xs mb-1 flex items-center gap-1.5 leading-[1.4]">
                           <span className="w-1.5 h-1.5 bg-emerald-600 rounded-xs shrink-0"></span>
                           {item.step} // CERT_VALIDATION_SYNC
                        </div>
                        <h3 className="text-base font-bold text-slate-900 mb-1 group-hover:text-emerald-600 transition-colors uppercase leading-[1.4]">{item.stage}</h3>
                        <p className="text-slate-600 text-sm leading-[1.6]">{item.action}</p>
                     </div>
                  ))}
               </div>
            </div>

            {/* SECURITY SECTION */}
            <div className="grid lg:grid-cols-2 gap-3 lg:gap-4 items-start mb-6">
               <div className="bg-white p-4 border border-slate-200 rounded-lg">
                  <div className="flex items-center gap-2.5 mb-2">
                     <div className="w-8 h-8 bg-emerald-50 flex items-center justify-center text-lg text-emerald-600 border border-emerald-100 rounded-md shrink-0">
                        <IoFingerPrintOutline />
                     </div>
                     <h2 className="text-lg sm:text-xl font-black text-slate-900 leading-[1.3]">Immutable Identity <span className="text-emerald-600">Sync.</span></h2>
                  </div>
                  <p className="text-slate-600 text-sm leading-[1.6] mb-3">By leveraging blockchain technology, we ensure that every certificate issued by SYICT is fractionalized, immutable, and globally verifiable without the need for manual checks.</p>

                  <div className="p-3 bg-slate-900 border border-slate-800 flex items-center justify-between rounded-lg">
                     <div className="flex gap-2.5 items-center">
                        <div className="w-8 h-8 bg-emerald-500 flex items-center justify-center text-white rounded-md shrink-0"><IoLockClosedOutline className="text-base" /></div>
                        <div>
                           <p className="text-[10px] font-bold text-white/50 uppercase tracking-wider leading-[1.4]">Integrity Audit</p>
                           <p className="text-xs font-bold text-white leading-[1.4]">LEDGER::SYNCED_IMMUTABLE</p>
                        </div>
                     </div>
                     <IoSyncOutline className="text-emerald-500 text-base" />
                  </div>
               </div>

               <div className="space-y-2.5">
                  {roi.map((spec, idx) => (
                     <div key={idx} className="bg-white p-3.5 sm:p-4 border border-slate-200 rounded-lg">
                        <h4 className="text-[11px] font-bold text-emerald-600 uppercase tracking-wider mb-2 leading-[1.4]">{spec.group} Framework</h4>
                        <div className="grid grid-cols-1 gap-1.5">
                           {spec.items?.map(item => (
                              <div key={item} className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-700 leading-[1.4]">
                                 <IoCheckmarkCircleOutline className="text-emerald-600 text-base shrink-0" /> {item}
                              </div>
                           ))}
                        </div>
                     </div>
                  ))}
               </div>
            </div>

            {/* BLOCKCHAIN SECTION */}
            <div className="bg-white p-4 sm:p-5 border border-slate-200 shadow-sm mb-6 rounded-lg">
               <div className="grid lg:grid-cols-2 gap-3 lg:gap-4 items-start">
                  <div>
                     <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-600 leading-[1.4] mb-1">
                        Decentralized Validation Network
                     </div>
                     <h2 className="text-lg sm:text-xl font-black text-slate-900 mb-1.5 leading-[1.3]">Absolute <span className="text-emerald-600">Verification.</span></h2>
                     <p className="text-slate-600 text-sm leading-[1.6] mb-3">&ldquo;A certificate is only as strong as its verification layer. We utilize a decentralized ledger to ensure your authority is recognized instantly by any firm in the world.&rdquo;</p>

                     <div className="space-y-2">
                        {[
                           { i: <IoGlobeOutline />, t: "Global Recognition", d: "Accepted and preferred by over 200+ partner tech firms." },
                           { i: <IoShieldOutline />, t: "Fraud Prevention", d: "Zero-knowledge proofs and secure QR anchors to eliminate forgery." },
                           { i: <IoRibbonOutline />, t: "Expert Endorsement", d: "Each certificate features signed verification from our project lead mentors." }
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
                        <span>SYS_CERT_LEDGER_v4</span>
                        <span>AUTH_BLUEPRINT</span>
                     </div>

                     <div className="p-3 bg-white/5 border border-white/10 rounded-md flex items-start gap-2.5">
                        <div className="w-8 h-8 bg-white/5 border border-white/10 flex items-center justify-center text-emerald-400 text-sm shrink-0 rounded-md">
                           <IoShieldCheckmarkOutline />
                        </div>
                        <div>
                           <p className="text-[10px] font-mono text-emerald-400 mb-1 leading-[1.4]">BLOCK_ID::0x7F29...ED41</p>
                           <p className="text-xs font-mono text-slate-300 leading-[1.5]">ISSUED_TO: S_MEMBER_912 | STRENGTH: ULTRA_HIGH | ENCRYPT: AES_256</p>
                        </div>
                     </div>

                     <div className="bg-white/5 border border-white/10 p-3 rounded-md flex items-center gap-2.5">
                        <IoPulseOutline className="text-xl text-emerald-500 shrink-0" />
                        <div>
                           <p className="text-[10px] font-bold text-white/50 uppercase tracking-wider leading-[1.4]">Protocol: VALIDATION_QA_CLEAR</p>
                           <p className="text-xs font-bold text-white leading-[1.4]">Authority ready for issuance.</p>
                        </div>
                     </div>
                  </div>
               </div>
            </div>

            {/* CTA */}
            <div className="text-center py-5 border-t border-slate-200">
               <h3 className="text-lg sm:text-xl font-black text-slate-900 mb-3 leading-[1.3]">Ready to command your <span className="text-emerald-600">Technical Authority?</span></h3>
               <div className="flex flex-col sm:flex-row gap-2.5 justify-center">
                  <button className="w-full min-h-[42px] sm:w-[220px] px-4 py-2.5 bg-emerald-600 text-white font-bold hover:bg-emerald-700 focus-visible:ring-4 focus-visible:ring-emerald-500 transition-colors shadow-sm uppercase tracking-wider text-xs flex items-center justify-center leading-[1.4] rounded-md">
                     {cta?.title || "Validate Now"}
                  </button>
                  <Link
                     href="/freelancing"
                     className="w-full min-h-[42px] sm:w-[220px] px-4 py-2.5 bg-slate-900 text-white font-bold hover:bg-slate-800 focus-visible:ring-4 focus-visible:ring-slate-500 transition-colors uppercase tracking-wider text-xs flex items-center justify-center text-center leading-[1.4] rounded-md"
                  >
                     Hire Student Talent
                  </Link>
               </div>
            </div>
         </div>
         {/* Mobile Sticky CTA */}
         <div className="sticky bottom-[0] left-0 right-0 px-3 pt-2.5 pb-[max(12px,env(safe-area-inset-bottom))] bg-white/95 border-t border-slate-200 z-[90] lg:hidden flex justify-center mt-auto">
            <button className="w-full min-h-[42px] py-2.5 px-4 bg-emerald-600 text-white font-bold text-xs uppercase tracking-wider leading-[1.4] rounded-md">
               {cta?.title || "Validate Now"}
            </button>
         </div>
      </section>
   );
}
