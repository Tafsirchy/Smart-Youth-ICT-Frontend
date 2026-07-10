"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
   IoArrowBackOutline,
   IoCheckmarkCircleOutline,
   IoShieldCheckmarkOutline,
   IoCodeSlashOutline,
   IoInfiniteOutline
} from "react-icons/io5";
import { getIcon } from "@/lib/icons";

export default function PortfolioDetailsClient({ data }) {
   if (!data) return null;

   const { hero = {}, sections = {}, cta = {} } = data;
   const techStack = sections.techStack || [];
   const checklist = sections.checklist || [];
   const codeSnippet = sections.codeSnippet || {};

   return (
      <section className="min-h-screen bg-white text-slate-900 selection:bg-rose-500 selection:text-white pb-12 md:pb-20 flex flex-col relative">
         {/* PERSISTENT BREADCRUMB */}
         <div className="border-b border-slate-100 bg-white/80 backdrop-blur-md sticky top-0 z-50">
            <div className="container-custom py-2 md:py-3 flex items-center justify-between">
               <Link href="/services/portfolio-websites" className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-400 hover:text-rose-500 transition-colors">
                  <IoArrowBackOutline className="text-sm" /> Infrastructure Overview
               </Link>
               <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">SPEC_LOG_v2.1</div>
            </div>
         </div>

         <div className="container-custom pt-6 md:pt-10 pb-[max(3rem,env(safe-area-inset-bottom))] md:pb-0">
            <div className="max-w-5xl mb-8 lg:mb-16 px-4 md:px-0">
               <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2 md:gap-3 text-emerald-600 mb-4">
                  <div className="w-8 md:w-12 h-[1px] bg-emerald-600"></div>
                  <span className="text-[10px] font-black uppercase tracking-widest leading-[1.4]">{hero.badge}</span>
               </motion.div>
               <h1 className="text-4xl sm:text-5xl md:text-8xl font-black text-slate-900 leading-[1.1] md:leading-[0.9] mb-4 md:mb-6 tracking-tighter">
                  {hero.title} <br />
                  <span className="text-slate-200">{hero.subtitle}</span>
               </h1>
               <p className="text-slate-500 text-lg md:text-xl font-light leading-[1.6] max-w-2xl">
                  {hero.description}
               </p>
            </div>

            {/* TECH STACK BENTO */}
            <div className="grid md:grid-cols-3 gap-px bg-slate-100 border border-slate-100 rounded-2xl md:rounded-[2rem] overflow-hidden shadow-xl shadow-slate-200/50 mb-8 lg:mb-16 mx-4 md:mx-0">
               {techStack?.map((tech, idx) => (
                  <div key={idx} className={`${tech.color} ${tech.colSpan || ""} p-4 sm:p-6 lg:p-8 flex flex-col justify-between group hover:grayscale transition-all duration-700 min-h-[180px] md:min-h-0`}>
                     <div className="text-white/20 text-3xl md:text-4xl mb-6 lg:mb-10 group-hover:text-white transition-colors">
                        {getIcon(tech.icon)}
                     </div>
                     <div>
                        <h4 className="text-white text-lg md:text-xl font-black mb-1 leading-[1.1]">{tech.t}</h4>
                        <p className="text-white/60 text-xs md:text-sm font-light leading-[1.6] max-w-sm">{tech.d}</p>
                     </div>
                  </div>
               ))}
            </div>

            {/* CODE & CHECKLIST SECTION */}
            <div className="grid lg:grid-cols-2 gap-6 lg:gap-10 items-start mb-12 lg:mb-24 px-4 md:px-0">
               <div className="lg:sticky lg:top-24">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-slate-50 rounded-xl flex items-center justify-center text-xl md:text-2xl text-slate-900 mb-4 md:mb-6 border border-slate-100 shadow-sm">
                     <IoCodeSlashOutline />
                  </div>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 mb-3 md:mb-4 tracking-tighter leading-[1.1]">{codeSnippet.title || "Architecturally Clean."}</h2>
                  <p className="text-slate-500 text-sm md:text-base font-light leading-[1.6] mb-6 md:mb-8">
                     {codeSnippet.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                     {codeSnippet.tags?.map(tag => (
                        <span key={tag} className="px-3 md:px-4 py-1.5 rounded-full border border-slate-200 text-[10px] font-black uppercase text-slate-400 leading-[1.4]">{tag}</span>
                     ))}
                  </div>
               </div>

               <div className="bg-slate-900 rounded-2xl md:rounded-[2.5rem] p-1 shadow-xl -mx-4 md:mx-0 overflow-hidden">
                  <div className="bg-slate-800 rounded-[1rem] md:rounded-[2.2rem] p-4 sm:p-6 lg:p-8 overflow-hidden relative">
                     <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-3">
                        <span className="text-[10px] font-black text-rose-500 uppercase leading-[1.4]">{codeSnippet.fileName || "portfolio-config.ts"}</span>
                        <div className="flex gap-1.5">
                           <div className="w-1.5 h-1.5 rounded-full bg-slate-700"></div>
                           <div className="w-1.5 h-1.5 rounded-full bg-slate-700"></div>
                        </div>
                     </div>
                     <div className="-mx-4 px-4 sm:mx-0 sm:px-0 overflow-x-auto">
                        <pre className="text-indigo-300 font-mono text-[10px] md:text-xs leading-[1.6] selection:bg-rose-500 min-w-max pb-3">
                           <code>{codeSnippet.code}</code>
                        </pre>
                     </div>

                     <div className="absolute bottom-0 right-0 p-4 md:p-6 opacity-10 pointer-events-none">
                        <IoInfiniteOutline className="text-4xl md:text-7xl text-white" />
                     </div>
                  </div>
               </div>
            </div>

            {/* CLIENT PREPARATION (CHECKLIST) */}
            <div className="mb-12 lg:mb-24 px-4 md:px-0">
               <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 md:mb-10 gap-3 md:gap-6">
                  <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tighter leading-[1.1]">Prerequisites for <span className="text-slate-400">Production.</span></h2>
                  <div className="h-[1px] flex-1 bg-slate-100 hidden md:block"></div>
               </div>

               <div className="grid md:grid-cols-2 gap-3 md:gap-6">
                  {checklist?.map((item, i) => (
                     <div key={i} className="flex gap-3 md:gap-6 p-4 md:p-6 bg-slate-50 rounded-2xl md:rounded-[2rem] border border-slate-100 group hover:bg-white hover:shadow-xl hover:shadow-slate-200/50 transition-all">
                        <div className="text-emerald-500 text-lg md:text-xl pt-0.5 shrink-0">
                           <IoCheckmarkCircleOutline />
                        </div>
                        <div>
                           <h5 className="text-base md:text-lg font-bold text-slate-900 mb-1 leading-[1.1]">{item.t}</h5>
                           <p className="text-slate-500 text-xs sm:text-sm font-light leading-[1.6]">{item.d}</p>
                        </div>
                     </div>
                  ))}
               </div>
            </div>

            {/* CTA */}
            <div className="text-center py-10 lg:py-20 border-t border-slate-100 px-4 md:px-0">
               <IoShieldCheckmarkOutline className="text-4xl lg:text-5xl text-slate-900 mb-6 mx-auto opacity-10" />
               <h3 className="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-900 mb-6 lg:mb-8 leading-[1.1]">{cta.title}</h3>
               <div className="flex flex-col sm:flex-row gap-3 lg:gap-4 justify-center">
                  <button className="w-full sm:w-[240px] min-h-[48px] px-4 lg:px-6 py-3 lg:py-4 bg-rose-500 text-white font-black rounded-xl hover:bg-rose-600 transition-all shadow-lg shadow-rose-500/40 uppercase text-[10px] flex items-center justify-center leading-[1.4]">
                     Initialize Build
                  </button>
                  <Link
                     href="/freelancing"
                     className="w-full sm:w-[240px] min-h-[48px] px-4 lg:px-6 py-3 lg:py-4 bg-slate-900 text-white font-black rounded-xl hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/20 uppercase text-[10px] flex items-center justify-center text-center leading-[1.4]"
                  >
                     Hire Student Talent
                  </Link>
               </div>
            </div>
         </div>

         {/* Mobile Sticky CTA */}
         <div className="sticky bottom-0 left-0 w-full p-[var(--gutter,16px)] bg-white/90 backdrop-blur-md border-t border-slate-100 z-50 md:hidden flex items-center justify-between shadow-[0_-10px_40px_rgba(0,0,0,0.05)] pb-[max(1rem,env(safe-area-inset-bottom))] mt-auto">
            <div className="flex flex-col gap-0.5">
               <p className="text-[10px] font-black text-slate-500 uppercase leading-[1.4]">Ready?</p>
               <p className="text-slate-900 font-bold text-sm leading-[1.4]">Start Building</p>
            </div>
            <button className="px-5 py-3 min-h-[48px] bg-rose-500 text-white font-black rounded-xl text-[10px] uppercase shadow-md shadow-rose-500/30 leading-[1.4] flex items-center justify-center">
               Initialize Build
            </button>
         </div>
      </section>
   );
}
