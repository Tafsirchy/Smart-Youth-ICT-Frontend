"use client";

import {
  IoColorPaletteOutline,
  IoTextOutline,
  IoDiamondOutline,
  IoFingerPrintOutline,
  IoTriangleOutline,
  IoInfiniteOutline,
  IoGitNetworkOutline,
  IoSparklesOutline
} from "react-icons/io5";
import { motion } from "framer-motion";
import Link from "next/link";
import { getIcon } from "@/lib/icons";

export default function BrandingClient({ content }) {
  if (!content) return null;

  const { hero, sections, cta } = content.landing;
  const pillars = sections.pillars || [];
  const metrics = sections.metrics || [];

  return (
    <section className="min-h-screen bg-slate-50 text-slate-900 selection:bg-indigo-600 selection:text-white overflow-hidden relative">
      <div className="absolute top-0 opacity-20 pointer-events-none -z-10 w-full h-full">
        <div className="absolute top-0 left-1/4 w-[1px] h-full bg-slate-200"></div>
        <div className="absolute top-0 right-1/4 w-[1px] h-full bg-slate-200"></div>
        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-slate-200"></div>
      </div>

      <div className="container-custom py-20 relative">
        {/* BRANDING HERO */}
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-20 mb-20 lg:mb-48">
          <div className="flex-1 text-left">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-xs sm:text-sm font-black tracking-[0.2em] sm:tracking-[0.4em] uppercase mb-10"
            >
              <IoFingerPrintOutline className="text-sm" /> {hero.badge}
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "circOut" }}
              className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 leading-[1.1] mb-8 tracking-tighter"
            >
              {hero.title?.split('&')[0]} & <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-rose-500 to-indigo-500 animate-gradient-x">
                {hero.title?.split('&')[1] || "Identity"}
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-slate-600 text-xl font-light leading-relaxed max-w-2xl mb-12"
            >
              {hero.description}
            </motion.p>

            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
              <button className="w-full sm:w-[280px] px-8 py-4 sm:py-6 bg-indigo-600 text-white font-black rounded-xl hover:bg-indigo-700 transition-all shadow-xl sm:shadow-2xl shadow-indigo-600/20 uppercase tracking-wider sm:tracking-widest text-xs sm:text-sm flex items-center justify-center min-h-[44px]">
                Initialize Brand Audit
              </button>
              <button className="w-full sm:w-[280px] px-8 py-4 sm:py-6 bg-white border border-slate-200 text-slate-900 font-black rounded-xl hover:bg-slate-50 transition-all uppercase tracking-wider sm:tracking-widest text-xs sm:text-sm flex items-center justify-center text-center min-h-[44px]">
                Portfolio Showcase
              </button>
            </div>
          </div>

          <div className="flex-1 relative hidden lg:block">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="relative p-12 bg-white rounded-[4rem] border border-slate-100 shadow-2xl overflow-hidden group"
            >
              <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: "linear-gradient(#6366f1 1px, transparent 1px), linear-gradient(90deg, #6366f1 1px, transparent 1px)", backgroundSize: "40px 40px" }}></div>
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 via-transparent to-transparent"></div>

              <div className="relative aspect-square flex items-center justify-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 border border-indigo-100 rounded-full"
                ></motion.div>
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-20 border border-indigo-200 rounded-full border-dashed"
                ></motion.div>

                <div className="relative z-10 w-48 h-48 bg-slate-900 rounded-[3rem] shadow-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <IoDiamondOutline className="text-6xl text-white animate-pulse" />
                  <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-indigo-500 -translate-x-4 -translate-y-4"></div>
                  <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-indigo-500 translate-x-4 translate-y-4"></div>
                </div>

                <div className="absolute bottom-4 left-4 font-mono text-[8px] text-slate-400 opacity-50 uppercase tracking-[0.4em]">
                  Scale::1.618 (Golden Ratio)
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* PILLARS SECTION */}
        <div className="mb-20 lg:mb-48">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 lg:mb-24 gap-4 lg:gap-8 border-l-4 border-indigo-600 pl-6 lg:pl-8">
            <div className="max-w-xl">
              <h2 className="text-xs sm:text-sm font-black text-indigo-600 uppercase tracking-[0.2em] sm:tracking-[0.4em] mb-4 font-bold">Design DNA</h2>
              <p className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 leading-tight">
                The pillars of <span className="text-slate-400 italic font-serif font-light">visual authority.</span>
              </p>
            </div>
          </div>

          <div className="flex overflow-x-auto snap-x snap-mandatory lg:grid lg:grid-cols-3 gap-6 lg:gap-8 pb-8 -mx-[var(--gutter)] px-[var(--gutter)] lg:mx-0 lg:px-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {pillars?.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group cursor-default w-[85vw] sm:w-[320px] lg:w-auto shrink-0 snap-center"
              >
                <div className="bg-white rounded-[3rem] p-12 h-full border border-slate-100 shadow-sm shadow-slate-200/50 hover:shadow-2xl transition-all group-hover:-translate-y-2 relative overflow-hidden">
                  <div
                    className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.color} text-white flex items-center justify-center text-3xl mb-10 shadow-lg`}
                  >
                    {getIcon(item.icon)}
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 mb-6 tracking-tighter uppercase leading-none">
                    {item.title}
                  </h3>
                  <p className="text-slate-500 leading-relaxed font-light text-lg">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* BRAND BOOK VISUAL */}
        <div className="mb-20 lg:mb-48">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-20 items-center bg-white rounded-3xl lg:rounded-[4rem] p-8 sm:p-12 lg:p-24 border border-slate-100 shadow-xl lg:shadow-2xl shadow-slate-200/50 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-1/3 h-full bg-indigo-50/30 -skew-x-[20deg] origin-top translate-x-1/2"></div>

            <div className="relative z-10 space-y-8 sm:space-y-12">
              <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center text-3xl text-indigo-600 border border-indigo-100">
                <IoSparklesOutline />
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 leading-[1.1] sm:leading-[0.9] tracking-tighter">The Corporate <br className="hidden sm:block" /><span className="text-indigo-600 block sm:inline mt-2 sm:mt-0">Voice API.</span></h2>
              <p className="text-slate-500 text-lg sm:text-xl font-light leading-relaxed">Consistency is absolute. We deliver a comprehensive brand manual documenting every pixel of your identity for flawless global scaling.</p>

              <div className="grid grid-cols-2 gap-px bg-slate-50 border border-slate-100 rounded-2xl lg:rounded-3xl overflow-hidden mt-8 lg:mt-10">
                {metrics?.map((item, idx) => (
                  <div key={idx} className="p-6 lg:p-10 hover:bg-white transition-colors group">
                    <h4 className="text-[10px] sm:text-xs font-black text-indigo-600 uppercase tracking-wider lg:tracking-widest mb-2">{item.t}</h4>
                    <p className="text-xs sm:text-sm text-slate-400 font-bold">{item.d}</p>
                  </div>
                ))}
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotateX: 5 }}
              whileInView={{ opacity: 1, scale: 1, rotateX: 0 }}
              className="relative bg-slate-50 aspect-auto lg:aspect-[4/5] h-full rounded-3xl shadow-2xl p-8 sm:p-12 lg:p-16 flex flex-col justify-between overflow-hidden border border-slate-200"
            >
              <div className="absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 bg-white rounded-bl-[60px] sm:rounded-bl-[100px] border-b border-l border-slate-100"></div>
              <div className="relative z-10">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-slate-900 mb-8 lg:mb-12 rounded-2xl shadow-xl flex items-center justify-center"><IoInfiniteOutline className="text-white text-2xl sm:text-3xl" /></div>
                <h4 className="text-4xl sm:text-5xl font-serif italic text-slate-900 mb-4 sm:mb-6 font-bold pb-4 sm:pb-6 lg:pb-8 border-b border-slate-200 leading-none">Guideline.</h4>
                <p className="text-[10px] sm:text-xs font-black text-slate-400 uppercase tracking-widest sm:tracking-[0.3em] mb-8 lg:mb-12">Build 14.2 / Confidential</p>

                <div className="space-y-4 sm:space-y-6">
                  <div className="h-4 bg-slate-200 rounded-full w-full"></div>
                  <div className="h-4 bg-slate-200 rounded-full w-4/5"></div>
                  <div className="flex gap-4 pt-6 lg:pt-10">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-indigo-600 shadow-lg"></div>
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-purple-600 shadow-lg"></div>
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-slate-900 shadow-lg"></div>
                  </div>
                </div>
              </div>
              <div className="relative z-10 text-slate-300 text-[8px] sm:text-[9px] font-black uppercase tracking-[0.2em] sm:tracking-[0.4em] text-center border-t border-slate-100 pt-6 sm:pt-8 mt-10">SYICT Design Studio Protocol © 2026</div>
            </motion.div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center py-20 lg:py-40 border-t border-slate-200 pb-32 lg:pb-40">
          <IoGitNetworkOutline className="text-6xl lg:text-7xl text-indigo-600 mb-8 lg:mb-12 mx-auto opacity-20" />
          <h3 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 mb-8 lg:mb-12 leading-tight">{cta.title?.split('. ')[0]}. <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-500 font-serif italic font-medium">{cta.title?.split('. ')[1] || "Initialize Architecture."}</span></h3>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
            {/* Sticky Mobile CTA */}
            <div className="fixed bottom-0 left-0 w-full px-4 pt-4 pb-[max(1rem,env(safe-area-inset-bottom))] bg-white/90 backdrop-blur-md border-t border-slate-200 z-50 lg:relative lg:border-none lg:bg-transparent lg:p-0 lg:w-auto">
              <button className="w-full lg:w-[280px] px-8 py-4 sm:py-6 bg-indigo-600 text-white font-black rounded-xl hover:bg-indigo-700 transition-all shadow-xl sm:shadow-2xl shadow-indigo-600/40 uppercase tracking-wider sm:tracking-widest text-xs sm:text-sm flex items-center justify-center min-h-[44px]">
                Initialize Consultation
              </button>
            </div>
            <Link
              href="/services/branding/details"
              className="w-full sm:w-[280px] px-8 py-4 sm:py-6 bg-slate-900 text-white font-black rounded-xl hover:bg-slate-800 transition-all uppercase tracking-wider sm:tracking-widest text-xs sm:text-sm flex items-center justify-center text-center min-h-[44px]"
            >
              Technical Details
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
