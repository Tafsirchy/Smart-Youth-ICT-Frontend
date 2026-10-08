"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  IoArrowBackOutline,
  IoAnalyticsOutline,
  IoCheckmarkCircleOutline,
  IoFlashOutline
} from "react-icons/io5";

export default function SeoDetailsClient({ data }) {
  if (!data) return null;

  const { hero, sections, cta } = data.details;

  return (
    <section className="min-h-screen bg-slate-50 text-slate-900 selection:bg-indigo-600 selection:text-white pb-12 md:pb-20 relative font-sans flex flex-col">
      {/* PERSISTENT BREADCRUMB */}
      <div className="border-b border-slate-200 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container-custom py-2 md:py-3 flex items-center justify-between">
          <Link href="/services/seo" className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-indigo-600 transition-colors">
            <IoArrowBackOutline className="text-sm" /> Structural SEO Overview
          </Link>
          <div className="text-[10px] font-black uppercase tracking-[0.4em] text-indigo-600">SEO_SPEC_v4.2</div>
        </div>
      </div>

      <div className="container-custom pt-6 md:pt-10 pb-[max(3rem,env(safe-area-inset-bottom))] md:pb-0">
        <div className="max-w-5xl mb-12 md:mb-16 relative">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-3 md:gap-4 text-indigo-600 mb-4 md:mb-6">
            <div className="w-12 h-[1px] bg-indigo-600"></div>
            <span className="text-[10px] font-black uppercase tracking-[0.4em] leading-[1.4]">{hero.badge}</span>
          </motion.div>
          <h1 className="text-4xl md:text-[6rem] font-black text-slate-900 leading-[1.1] md:leading-[0.9] mb-4 md:mb-6 tracking-tighter uppercase whitespace-pre-line">
            {hero.title?.split(' ')[0]} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-rose-500 to-indigo-600 animate-gradient-x">{hero.title?.split(' ').slice(1).join(' ')}</span>
          </h1>
          <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-start mt-8 md:mt-12">
            <div className="flex-1">
              <p className="text-slate-600 text-lg md:text-xl font-light leading-[1.6] mb-6 md:mb-8 italic">
                &quot;{hero.description}&quot;
              </p>
              <div className="h-1 w-12 md:w-20 bg-indigo-600/20" />
            </div>
            <div className="w-full md:w-80 bg-white p-6 md:p-8 rounded-2xl md:rounded-3xl border border-slate-100 shadow-xl">
              <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 md:mb-6 px-1 leading-[1.4]">Authority Index</h4>
              <div className="space-y-3 md:space-y-4">
                {["Technical Integrity", "Semantic Load", "Backlink Power"].map(label => (
                  <div key={label} className="space-y-1.5">
                    <div className="flex justify-between text-[9px] font-bold text-slate-500 uppercase leading-[1.4]">
                      <span>{label}</span>
                      <span>98%</span>
                    </div>
                    <div className="h-1 bg-slate-50 rounded-full overflow-hidden">
                      <motion.div initial={{ width: 0 }} whileInView={{ width: "98%" }} transition={{ duration: 1 }} className="h-full bg-indigo-500" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 6-PHASE PROTOCOL GRID */}
        <div className="mb-12 lg:mb-24">
          <div className="flex items-center gap-4 md:gap-6 mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tighter uppercase leading-[1.1] italic">The SEO Protocol</h2>
            <div className="h-[1px] flex-1 bg-slate-200"></div>
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-[1.4]">V4.2 Lifecycle</span>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-slate-200 border border-slate-200 rounded-2xl md:rounded-[3.5rem] overflow-hidden shadow-2xl">
            {(sections.phases || []).map((phase, idx) => (
              <div key={idx} className="bg-white p-6 md:p-10 hover:bg-slate-50 transition-all group relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 md:p-8 text-3xl md:text-4xl font-black text-slate-50 group-hover:text-indigo-50 transition-colors select-none leading-none">{phase.step}</div>
                <div className="relative z-10">
                  <h4 className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.4em] mb-2 md:mb-4 leading-[1.4]">{phase.stage}</h4>
                  <p className="text-sm md:text-base text-slate-500 font-light leading-[1.6]">{phase.action}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* OPTIMIZATION FRAMEWORKS */}
        <div className="mb-12 lg:mb-24">
          <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-baseline mb-8 md:mb-12">
            <h2 className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.4em] border-l-4 border-indigo-600 pl-3 md:pl-4 leading-[1.4]">Optimization Frameworks</h2>
          </div>

          <div className="grid lg:grid-cols-3 gap-4 md:gap-8">
            {(sections.roi || []).map((group, idx) => (
              <div key={idx} className="bg-white rounded-2xl md:rounded-[3rem] p-6 md:p-10 border border-slate-100 shadow-xl shadow-slate-200/50 hover:shadow-2xl transition-all group">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-indigo-50 rounded-xl flex items-center justify-center text-xl md:text-2xl text-indigo-600 mb-6 md:mb-8 group-hover:scale-110 transition-transform"><IoFlashOutline /></div>
                <h3 className="text-lg md:text-xl font-black text-slate-900 mb-4 md:mb-6 tracking-tighter uppercase leading-[1.1]">{group.group}</h3>
                <ul className="space-y-2 md:space-y-4">
                  {group.items?.map(item => (
                    <li key={item} className="flex items-center gap-3 text-slate-500 text-[10px] md:text-[11px] font-bold uppercase tracking-wider leading-[1.4]">
                      <IoCheckmarkCircleOutline className="text-indigo-500 text-lg shrink-0" /> {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* FINAL CTA RIBBON */}
        <div className="text-center py-12 lg:py-20 border-t border-slate-200">
          <IoAnalyticsOutline className="text-5xl lg:text-7xl text-indigo-600 mb-6 md:mb-8 mx-auto opacity-20" />
          <h3 className="text-3xl sm:text-4xl lg:text-6xl font-black text-slate-900 mb-6 md:mb-8 leading-[1.1]">
            {cta.title?.includes('.') ? (
              <>
                {cta.title.split('.')[0]}. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-slate-700 font-serif italic font-medium">
                  {cta.title.split('.').slice(1).join('.').trim()}
                </span>
              </>
            ) : (
              <>
                Scale your Visibility. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-slate-700 font-serif italic font-medium">
                  {cta.title}
                </span>
              </>
            )}
          </h3>
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
            <button className="w-full sm:w-[240px] min-h-[48px] px-4 py-3 md:py-4 bg-indigo-600 text-white font-black rounded-xl hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-600/40 uppercase tracking-widest text-[10px] flex items-center justify-center leading-[1.4]">
              Initialize Technical Audit
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
            <p className="text-slate-900 font-bold text-sm leading-[1.4]">Start Scaling</p>
         </div>
         <button className="px-5 py-3 min-h-[48px] bg-indigo-600 text-white font-black rounded-xl text-[10px] uppercase tracking-widest shadow-md shadow-indigo-600/30 leading-[1.4] flex items-center justify-center">
            Initialize Audit
         </button>
      </div>
    </section>
  );
}
