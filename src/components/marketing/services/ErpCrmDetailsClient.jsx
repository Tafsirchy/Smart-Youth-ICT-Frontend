"use client";

import Link from "next/link";
import {
   IoArrowBackOutline,
   IoHardwareChipOutline,
   IoCheckmarkCircleOutline,
   IoShieldCheckmarkOutline
} from "react-icons/io5";
import { getIcon } from "@/lib/icons";

export default function ErpCrmDetailsClient({ data }) {
   if (!data) return null;

   const { hero = {}, sections = {}, cta = {} } = data;
   const roi = sections.roi || [];
   const manifest = sections.manifest || [];
   const checklist = sections.checklist || [];

   return (
      <section className="min-h-screen bg-white text-slate-900 selection:bg-indigo-600 selection:text-white pb-8 md:pb-12 flex flex-col relative">
         {/* PERSISTENT BREADCRUMB */}
         <div className="border-b border-slate-200 bg-white/90 sticky top-0 z-50">
            <div className="container-custom py-2 flex items-center justify-between gap-3">
               <Link href="/services/erp-crm" className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-500 hover:text-indigo-600 transition-colors leading-[1.4]">
                  <IoArrowBackOutline className="text-sm" /> Product Overview
               </Link>
               <div className="text-[11px] font-bold uppercase tracking-wider text-indigo-600 leading-[1.4]">ENTERPRISE_SPEC_v6.4</div>
            </div>
         </div>

         <div className="container-custom pt-4 sm:pt-6 pb-[max(2rem,env(safe-area-inset-bottom))] md:pb-0">
            {/* COMPACT TECH HEADER */}
            <div className="max-w-4xl mb-5 pb-4 border-b border-slate-200">
               <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-600 leading-[1.4] mb-1">
                  {hero.badge}
               </div>
               <h1 className="text-xl sm:text-2xl font-black text-slate-900 leading-[1.3] mb-2">
                  {hero.title?.split(' ')[0]}{" "}
                  <span className="text-indigo-600">{hero.title?.split(' ').slice(1).join(' ')}</span>
               </h1>
               <p className="text-slate-600 text-sm sm:text-base font-normal leading-[1.6] max-w-3xl bg-slate-50 p-3 sm:p-4 border-l-4 border-indigo-600">
                  {hero.description}
               </p>
            </div>

            {/* ROI VISUALIZER BENTO */}
            <div className="grid md:grid-cols-2 gap-px mb-6 bg-slate-200 border border-slate-200 overflow-hidden shadow-sm rounded-lg">
               {roi?.map((spec, idx) => (
                  <div key={idx} className="p-3.5 sm:p-4 bg-white flex flex-col justify-between hover:bg-slate-50 transition-colors group">
                     <div className="flex justify-between items-center mb-2.5">
                        <div className="w-9 h-9 bg-indigo-50 flex items-center justify-center text-lg text-indigo-600 border border-indigo-100 group-hover:bg-indigo-600 group-hover:text-white transition-colors rounded-md">
                           {getIcon(spec.icon)}
                        </div>
                        <span className="text-[10px] font-bold text-slate-400 group-hover:text-indigo-500 transition-colors leading-[1.4]">KPI_SYNC_ACTIVE</span>
                     </div>
                     <div>
                        <h4 className="text-base sm:text-lg font-bold text-slate-900 mb-1 uppercase leading-[1.4]">{spec.title}</h4>
                        <p className="text-slate-600 text-sm font-normal leading-[1.6] mb-2.5">{spec.desc}</p>
                        <div className="flex flex-wrap gap-1.5">
                           {spec.features?.map(f => (
                              <span key={f} className="px-2 py-0.5 bg-slate-50 border border-slate-200 text-[11px] font-semibold text-slate-600 leading-[1.4] rounded-md">{f}</span>
                           ))}
                        </div>
                     </div>
                  </div>
               ))}
            </div>

            {/* TECHNICAL MANIFEST SECTION */}
            <div className="grid lg:grid-cols-2 gap-3 lg:gap-4 items-start mb-6">
               <div className="p-4 bg-slate-900 text-white shadow-sm rounded-lg border border-slate-800">
                  <h3 className="text-lg sm:text-xl font-black mb-3 flex items-center gap-2 leading-[1.3]">
                     <IoHardwareChipOutline className="text-indigo-500 shrink-0" /> Infrastructure Manifest
                  </h3>
                  <div className="space-y-1.5">
                     {manifest?.map((item, i) => (
                        <div key={i} className="flex justify-between items-center py-2 border-b border-white/10 group/row">
                           <span className="text-slate-400 text-[11px] font-bold uppercase tracking-wider group-hover/row:text-indigo-400 transition-colors leading-[1.4]">{item.label}</span>
                           <span className="text-sm font-bold text-white text-right leading-[1.4]">{item.value}</span>
                        </div>
                     ))}
                  </div>
               </div>

               <div className="bg-slate-50 p-4 border border-slate-200 rounded-lg">
                  <h2 className="text-lg sm:text-xl font-black text-slate-900 mb-2 leading-[1.3]">Operational <span className="text-indigo-600">Sovereignty.</span></h2>
                  <p className="text-slate-600 text-sm font-normal leading-[1.6] mb-3">We deliver more than software. We deliver a high-velocity enterprise engine isolated from the common friction of monolithic third-party SaaS platforms.</p>
                  <div className="flex items-center gap-3 p-3 bg-indigo-50 border border-indigo-100 rounded-lg">
                     <div className="w-9 h-9 bg-indigo-600 flex items-center justify-center text-white text-base shrink-0 rounded-md"><IoShieldCheckmarkOutline /></div>
                     <div>
                        <p className="text-[11px] font-bold text-indigo-900 uppercase tracking-wider leading-[1.4]">Security Protocol</p>
                        <p className="text-xs sm:text-sm text-indigo-600 font-bold leading-[1.4]">End-to-End Encryption Active</p>
                     </div>
                  </div>
               </div>
            </div>

            {/* PREREQUISITES GRID */}
            <div className="mb-6">
               <div className="flex items-center justify-between gap-3 mb-3">
                  <h2 className="text-lg sm:text-xl font-black text-slate-900 leading-[1.3]">Enterprise <span className="text-slate-400">Handover Artifacts.</span></h2>
                  <div className="h-[1px] flex-1 bg-slate-200 hidden md:block"></div>
               </div>

               <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-slate-200 border border-slate-200 overflow-hidden shadow-sm rounded-lg">
                  {checklist?.map((item, i) => (
                     <div key={i} className="p-3.5 sm:p-4 bg-white flex flex-col gap-1.5 hover:bg-slate-50 transition-colors">
                        <div className="flex items-center gap-2">
                           <IoCheckmarkCircleOutline className="text-emerald-500 text-lg shrink-0" />
                           <h5 className="text-sm sm:text-base font-bold text-slate-900 leading-[1.4]">{item.t}</h5>
                        </div>
                        <p className="text-slate-600 text-sm font-normal leading-[1.6]">{item.d}</p>
                     </div>
                  ))}
               </div>
            </div>

            {/* CTA */}
            <div className="text-center py-5 border-t border-slate-200">
               <h3 className="text-lg sm:text-xl font-black text-slate-900 mb-3 leading-[1.3]">{cta.title}</h3>
               <div className="flex flex-col sm:flex-row gap-2.5 justify-center">
                  <button className="w-full sm:w-[220px] min-h-[42px] px-4 py-2.5 bg-indigo-600 text-white font-bold hover:bg-indigo-700 transition-colors shadow-sm uppercase tracking-wider text-xs flex items-center justify-center leading-[1.4] rounded-md">
                     Initialize Build
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
            <button className="px-4 py-2.5 min-h-[42px] bg-indigo-600 text-white font-bold text-xs uppercase tracking-wider leading-[1.4] flex items-center justify-center rounded-md">
               Initialize Build
            </button>
         </div>
      </section>
   );
}
