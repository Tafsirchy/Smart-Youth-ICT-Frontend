"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
   IoArrowBackOutline,
   IoStatsChartOutline,
   IoHardwareChipOutline,
   IoCheckmarkCircleOutline,
   IoShieldCheckmarkOutline
} from "react-icons/io5";
import { getIcon } from "@/lib/icons";

export default function CustomAppsDetailsClient({ data }) {
   if (!data) return null;

   const { hero = {}, sections = {}, cta = {} } = data;
   const roi = sections.roi || [];
   const manifest = sections.manifest || [];
   const checklist = sections.checklist || [];

   return (
      <section className="min-h-screen bg-white text-slate-900 selection:bg-violet-600 selection:text-white pb-12 md:pb-20 flex flex-col relative">
         {/* PERSISTENT BREADCRUMB */}
         <div className="border-b border-slate-100 bg-white/80 backdrop-blur-md sticky top-0 z-50">
            <div className="container-custom py-2 md:py-3 flex items-center justify-between">
               <Link href="/services/custom-apps" className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-violet-600 transition-colors">
                  <IoArrowBackOutline className="text-sm" /> Product Overview
               </Link>
               <div className="text-[10px] font-black uppercase tracking-widest text-violet-600">APP_SPEC_v4.2.0</div>
            </div>
         </div>

         <div className="container-custom pt-6 md:pt-10 pb-[max(3rem,env(safe-area-inset-bottom))] md:pb-0">
            {/* TECH HEADER */}
            <div className="max-w-5xl mb-12 md:mb-16">
               <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center gap-3 md:gap-4 text-emerald-600 mb-4"
               >
                  <div className="w-12 h-[1px] bg-emerald-600"></div>
                  <span className="text-[10px] font-black uppercase tracking-widest leading-[1.4]">{hero.badge}</span>
               </motion.div>
               <h1 className="text-4xl sm:text-5xl md:text-8xl font-black text-slate-900 leading-[1.1] md:leading-[0.9] mb-4 md:mb-6 tracking-tighter">
                  {hero.title?.split(' ')[0]} <br />
                  <span className="text-slate-200">{hero.title?.split(' ').slice(1).join(' ')}</span>
               </h1>
               <p className="text-slate-500 text-lg md:text-xl font-light leading-[1.6] max-w-2xl bg-slate-50 p-6 md:p-8 border-l-4 border-violet-600 rounded-r-2xl">
                  {hero.description}
               </p>
            </div>

            {/* ROI VISUALIZER BENTO */}
            <div className="grid md:grid-cols-2 gap-px mb-12 lg:mb-24 bg-white border border-slate-100 rounded-2xl md:rounded-[2rem] overflow-hidden shadow-xl shadow-slate-200/50">
               {roi?.map((spec, idx) => (
                  <div key={idx} className="p-6 md:p-8 border-b border-r border-slate-100 flex flex-col justify-between hover:bg-slate-50 transition-colors group">
                     <div className="flex justify-between items-start mb-8 md:mb-10">
                        <div className="w-12 h-12 md:w-16 md:h-16 bg-violet-50 rounded-xl md:rounded-2xl flex items-center justify-center text-2xl md:text-3xl text-violet-600 border border-violet-100 group-hover:bg-violet-600 group-hover:text-white transition-all">
                           {getIcon(spec.icon)}
                        </div>
                        <span className="text-[10px] font-black text-slate-300 group-hover:text-violet-200 transition-colors leading-[1.4]">KPI_SYNC_ACTIVE</span>
                     </div>
                     <div>
                        <h4 className="text-xl md:text-2xl font-black text-slate-900 mb-2 md:mb-3 tracking-tighter uppercase leading-[1.1]">{spec.title}</h4>
                        <p className="text-slate-500 text-sm font-light leading-[1.6] mb-4 md:mb-6">{spec.desc}</p>
                        <div className="flex flex-wrap gap-2">
                           {spec.features?.map(f => (
                              <span key={f} className="px-2 md:px-3 py-1 bg-white border border-slate-200 rounded-full text-[10px] font-bold text-slate-500 leading-[1.4]">{f}</span>
                           ))}
                        </div>
                     </div>
                  </div>
               ))}
            </div>

            {/* TECHNICAL MANIFEST SECTION */}
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center mb-12 lg:mb-24">
               <div className="relative group">
                  <div className="p-6 md:p-10 bg-slate-900 rounded-3xl md:rounded-[3rem] text-white overflow-hidden relative shadow-2xl">
                     <div className="absolute top-0 right-0 w-32 h-32 bg-violet-600/20 blur-[80px]"></div>
                     <h3 className="text-2xl md:text-3xl font-black mb-6 md:mb-8 tracking-tighter flex items-center gap-3 md:gap-4 leading-[1.1]">
                        <IoHardwareChipOutline className="text-violet-500 shrink-0" /> Infrastructure Manifest
                     </h3>
                     <div className="space-y-2 md:space-y-3">
                        {manifest?.map((item, i) => (
                           <div key={i} className="flex justify-between items-center py-3 border-b border-white/5 group/row">
                              <span className="text-slate-500 text-[10px] font-black uppercase tracking-widest group-hover/row:text-violet-400 transition-colors leading-[1.4]">{item.label}</span>
                              <span className="text-sm font-bold text-white text-right leading-[1.4]">{item.value}</span>
                           </div>
                        ))}
                     </div>
                  </div>
               </div>

               <div>
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 mb-4 md:mb-6 tracking-tighter leading-[1.1]">Bespoke <br /> <span className="text-violet-600 font-serif italic font-medium">Engineering.</span></h2>
                  <p className="text-slate-500 text-sm md:text-base font-light leading-[1.6] mb-6 md:mb-8">We deliver more than code. We deliver a high-velocity product engine isolated from the common friction of monolithic application frameworks.</p>
                  <div className="flex items-center gap-4 p-4 md:p-6 bg-violet-50 rounded-2xl md:rounded-3xl border border-violet-100">
                     <div className="w-10 h-10 md:w-12 md:h-12 bg-violet-600 rounded-lg md:rounded-xl flex items-center justify-center text-white text-lg md:text-xl shrink-0"><IoShieldCheckmarkOutline /></div>
                     <div>
                        <p className="text-[10px] md:text-xs font-black text-violet-900 uppercase tracking-widest leading-[1.4]">Logic Shield</p>
                        <p className="text-xs md:text-sm text-violet-600 font-bold leading-[1.4]">Encapsulated Runtime Active</p>
                     </div>
                  </div>
               </div>
            </div>

            {/* PREREQUISITES GRID */}
            <div className="mb-12 lg:mb-24">
               <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 md:mb-12 gap-4 md:gap-6">
                  <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tighter leading-[1.1]">Application <span className="text-slate-400">Launch Artifacts.</span></h2>
                  <div className="h-[1px] flex-1 bg-slate-100 hidden md:block"></div>
               </div>

               <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-slate-100 border border-slate-100 rounded-2xl md:rounded-[2rem] overflow-hidden shadow-xl">
                  {checklist?.map((item, i) => (
                     <div key={i} className="p-6 md:p-8 bg-white flex flex-col justify-between hover:bg-slate-50 transition-colors group">
                        <IoCheckmarkCircleOutline className="text-emerald-500 text-xl md:text-2xl mb-6 md:mb-8 group-hover:scale-110 transition-transform" />
                        <div>
                           <h5 className="text-lg md:text-xl font-bold text-slate-900 mb-2 md:mb-3 leading-[1.1]">{item.t}</h5>
                           <p className="text-slate-500 text-sm font-light leading-[1.6]">{item.d}</p>
                        </div>
                     </div>
                  ))}
               </div>
            </div>

            {/* CTA */}
            <div className="text-center py-12 lg:py-20 border-t border-slate-100">
               <IoStatsChartOutline className="text-5xl lg:text-6xl text-violet-600 mb-6 md:mb-8 mx-auto opacity-10" />
               <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 mb-6 md:mb-8 leading-[1.1]">{cta.title}</h3>
               <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
                  <button className="w-full sm:w-[240px] min-h-[48px] px-4 py-3 md:py-4 bg-violet-600 text-white font-black rounded-xl hover:bg-violet-700 transition-all shadow-xl shadow-violet-600/40 uppercase tracking-widest text-[10px] flex items-center justify-center leading-[1.4]">
                     Initialize Product Brief
                  </button>
                  <Link
                     href="/freelancing"
                     className="w-full sm:w-[240px] min-h-[48px] px-4 py-3 md:py-4 bg-slate-900 text-white font-black rounded-xl hover:bg-slate-800 transition-all uppercase tracking-widest text-[10px] flex items-center justify-center text-center leading-[1.4]"
                  >
                     Hire Student Talent
                  </Link>
               </div>
            </div>
         </div>

         {/* Mobile Sticky CTA */}
         <div className="sticky bottom-0 left-0 w-full p-[var(--gutter,16px)] bg-white/90 backdrop-blur-md border-t border-slate-100 z-50 md:hidden flex items-center justify-between shadow-[0_-10px_40px_rgba(0,0,0,0.05)] pb-[max(1rem,env(safe-area-inset-bottom))] mt-auto">
            <div className="flex flex-col gap-0.5">
               <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-[1.4]">Ready?</p>
               <p className="text-slate-900 font-bold text-sm leading-[1.4]">Start Building</p>
            </div>
            <button className="px-5 py-3 min-h-[48px] bg-violet-600 text-white font-black rounded-xl text-[10px] uppercase tracking-widest shadow-md shadow-violet-600/30 leading-[1.4] flex items-center justify-center">
               Initialize Build
            </button>
         </div>
      </section>
   );
}
