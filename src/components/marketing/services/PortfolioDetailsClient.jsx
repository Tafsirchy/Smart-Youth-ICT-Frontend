"use client";

import Link from "next/link";
import {
   IoArrowBackOutline,
   IoCheckmarkCircleOutline,
   IoCodeSlashOutline
} from "react-icons/io5";
import { getIcon } from "@/lib/icons";

export default function PortfolioDetailsClient({ data }) {
   if (!data) return null;

   const { hero = {}, sections = {}, cta = {} } = data;
   const techStack = sections.techStack || [];
   const checklist = sections.checklist || [];
   const codeSnippet = sections.codeSnippet || {};

   return (
      <section className="min-h-screen bg-white text-slate-900 selection:bg-rose-500 selection:text-white pb-8 md:pb-12 flex flex-col relative">
         {/* PERSISTENT BREADCRUMB */}
         <div className="border-b border-slate-200 bg-white/90 sticky top-0 z-50">
            <div className="container-custom py-2 flex items-center justify-between gap-3">
               <Link href="/services/portfolio-websites" className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-500 hover:text-rose-500 transition-colors leading-[1.4]">
                  <IoArrowBackOutline className="text-sm" /> Infrastructure Overview
               </Link>
               <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 leading-[1.4]">SPEC_LOG_v2.1</div>
            </div>
         </div>

         <div className="container-custom pt-4 sm:pt-6 pb-[max(2rem,env(safe-area-inset-bottom))] md:pb-0">
            <div className="max-w-4xl mb-5 pb-4 border-b border-slate-200">
               <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-600 leading-[1.4] mb-1">
                  {hero.badge}
               </div>
               <h1 className="text-xl sm:text-2xl font-black text-slate-900 leading-[1.3] mb-2">
                  {hero.title}{" "}
                  <span className="text-rose-500">{hero.subtitle}</span>
               </h1>
               <p className="text-slate-600 text-sm sm:text-base font-normal leading-[1.6] max-w-3xl">
                  {hero.description}
               </p>
            </div>

            {/* TECH STACK BENTO */}
            <div className="grid md:grid-cols-3 gap-px bg-slate-200 border border-slate-200 overflow-hidden shadow-sm mb-6 rounded-lg">
               {techStack?.map((tech, idx) => (
                  <div key={idx} className={`${tech.color} ${tech.colSpan || ""} p-3.5 sm:p-4 flex flex-col justify-between gap-2.5`}>
                     <div className="text-white/70 text-xl">
                        {getIcon(tech.icon)}
                     </div>
                     <div>
                        <h4 className="text-white text-base font-bold mb-1 leading-[1.3]">{tech.t}</h4>
                        <p className="text-white/80 text-xs sm:text-sm font-normal leading-[1.6] max-w-sm">{tech.d}</p>
                     </div>
                  </div>
               ))}
            </div>

            {/* CODE & CHECKLIST SECTION */}
            <div className="grid lg:grid-cols-2 gap-3 lg:gap-4 items-start mb-6">
               <div className="bg-slate-50 p-4 border border-slate-200 rounded-lg">
                  <div className="flex items-center gap-2.5 mb-2">
                     <div className="w-8 h-8 bg-white flex items-center justify-center text-base text-slate-900 border border-slate-200 rounded-md shrink-0">
                        <IoCodeSlashOutline />
                     </div>
                     <h2 className="text-lg sm:text-xl font-black text-slate-900 leading-[1.3]">{codeSnippet.title || "Architecturally Clean."}</h2>
                  </div>
                  <p className="text-slate-600 text-sm font-normal leading-[1.6] mb-3">
                     {codeSnippet.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5">
                     {codeSnippet.tags?.map(tag => (
                        <span key={tag} className="px-2.5 py-1 bg-white border border-slate-200 text-[11px] font-bold uppercase tracking-wider text-slate-600 leading-[1.4] rounded-md">{tag}</span>
                     ))}
                  </div>
               </div>

               <div className="bg-slate-900 p-3.5 sm:p-4 shadow-sm overflow-hidden rounded-lg border border-slate-800">
                  <div className="flex items-center justify-between mb-2.5 border-b border-white/10 pb-2">
                     <span className="text-[11px] font-bold text-rose-400 uppercase tracking-wider leading-[1.4]">{codeSnippet.fileName || "portfolio-config.ts"}</span>
                     <span className="text-[10px] font-mono text-slate-400 leading-[1.4]">CONFIG</span>
                  </div>
                  <div className="overflow-x-auto">
                     <pre className="text-indigo-300 font-mono text-xs leading-[1.6] selection:bg-rose-500 min-w-max pb-1">
                        <code>{codeSnippet.code}</code>
                     </pre>
                  </div>
               </div>
            </div>

            {/* CLIENT PREPARATION (CHECKLIST) */}
            <div className="mb-6">
               <div className="flex items-center justify-between gap-3 mb-3">
                  <h2 className="text-lg sm:text-xl font-black text-slate-900 leading-[1.3]">Prerequisites for <span className="text-slate-400">Production.</span></h2>
                  <div className="h-[1px] flex-1 bg-slate-200 hidden md:block"></div>
               </div>

               <div className="grid md:grid-cols-2 gap-2.5">
                  {checklist?.map((item, i) => (
                     <div key={i} className="flex gap-2.5 p-3.5 sm:p-4 bg-slate-50 border border-slate-200 hover:bg-white transition-colors rounded-lg">
                        <div className="text-emerald-500 text-lg pt-0.5 shrink-0">
                           <IoCheckmarkCircleOutline />
                        </div>
                        <div>
                           <h5 className="text-sm sm:text-base font-bold text-slate-900 mb-0.5 leading-[1.4]">{item.t}</h5>
                           <p className="text-slate-600 text-sm font-normal leading-[1.6]">{item.d}</p>
                        </div>
                     </div>
                  ))}
               </div>
            </div>

            {/* CTA */}
            <div className="text-center py-5 border-t border-slate-200">
               <h3 className="text-lg sm:text-xl font-black text-slate-900 mb-3 leading-[1.3]">{cta.title}</h3>
               <div className="flex flex-col sm:flex-row gap-2.5 justify-center">
                  <button className="w-full sm:w-[220px] min-h-[42px] px-4 py-2.5 bg-rose-500 text-white font-bold hover:bg-rose-600 transition-colors shadow-sm uppercase tracking-wider text-xs flex items-center justify-center leading-[1.4] rounded-md">
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
            <button className="px-4 py-2.5 min-h-[42px] bg-rose-500 text-white font-bold text-xs uppercase tracking-wider leading-[1.4] flex items-center justify-center rounded-md">
               Initialize Build
            </button>
         </div>
      </section>
   );
}
