"use client";

import {
  IoCubeOutline,
  IoShieldCheckmarkOutline,
  IoSyncOutline,
  IoCheckmarkCircleOutline,
  IoCodeSlashOutline,
  IoRocketOutline
} from "react-icons/io5";
import { motion } from "framer-motion";
import Link from "next/link";
import { getIcon } from "@/lib/icons";

export default function CustomAppsClient({ data }) {
  if (!data) return null;

  const { hero = {}, sections = {}, cta = {} } = data;
  const verticals = sections.verticals || [];
  const integrations = sections.integrations || [];
  const pricing = sections.pricing || [];

  return (
    <section className="min-h-screen bg-slate-50 text-slate-900 selection:bg-violet-600 selection:text-white overflow-hidden relative font-sans flex flex-col pb-12 md:pb-0">
      {/* INDUSTRIAL OVERLAY */}
      <div className="absolute top-0 opacity-10 pointer-events-none -z-10 w-full h-full">
        <div className="absolute top-0 left-1/4 w-[1px] h-full bg-slate-200"></div>
        <div className="absolute top-0 right-1/4 w-[1px] h-full bg-slate-200"></div>
        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-slate-200"></div>
      </div>

      <div className="container-custom py-10 lg:py-16 relative z-10">
        {/* CUSTOM APPS HERO */}
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16 mb-16 lg:mb-24">
          <div className="flex-1 text-left">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-50 border border-violet-100 text-violet-700 text-[10px] font-black tracking-widest uppercase mb-6 leading-[1.4]"
            >
              <IoRocketOutline className="text-sm" /> {hero.badge}
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "circOut" }}
              className="text-4xl sm:text-5xl md:text-8xl font-black text-slate-900 leading-[1.1] md:leading-[0.9] mb-4 lg:mb-6 tracking-tighter"
            >
              {hero.title?.split(" ")[0]} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-indigo-600 animate-gradient-x">{hero.subtitle}</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-slate-600 text-lg md:text-xl font-light leading-[1.6] max-w-2xl mb-8"
            >
              {hero.description}
            </motion.p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="w-full sm:w-[240px] min-h-[48px] px-4 py-3 md:py-4 bg-violet-600 text-white font-bold rounded-xl hover:bg-violet-700 transition-all shadow-xl shadow-violet-600/20 uppercase tracking-widest text-[10px] flex items-center justify-center leading-[1.4]">
                Initialize Product Brief
              </button>
              <Link
                href="/services/custom-apps/details"
                className="w-full sm:w-[240px] min-h-[48px] px-4 py-3 md:py-4 bg-white border border-slate-200 text-slate-900 font-bold rounded-xl hover:bg-slate-50 transition-all uppercase tracking-widest text-[10px] flex items-center justify-center text-center leading-[1.4]"
              >
                Technical Specifications
              </Link>
            </div>
          </div>

          <div className="flex-1 relative hidden lg:block">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1 }}
              className="relative p-8 xl:p-12 bg-white rounded-3xl xl:rounded-[4rem] border border-slate-100 shadow-2xl overflow-hidden group"
            >
              <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: "linear-gradient(#4f46e5 1px, transparent 1px), linear-gradient(90deg, #4f46e5 1px, transparent 1px)", backgroundSize: "40px 40px" }}></div>

              <div className="grid grid-cols-2 gap-4 xl:gap-8 relative z-10 aspect-square">
                <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 4, repeat: Infinity }} className="p-6 xl:p-8 bg-violet-50 rounded-2xl xl:rounded-3xl border border-violet-100 flex flex-col justify-between shadow-sm">
                  <div className="w-8 h-8 xl:w-10 xl:h-10 bg-violet-600 rounded-lg xl:rounded-xl shadow-lg shadow-violet-200"></div>
                  <div className="space-y-1.5 xl:space-y-2">
                    <div className="h-1.5 w-full bg-violet-200 rounded-full"></div>
                    <div className="h-1.5 w-3/4 bg-violet-200 rounded-full"></div>
                  </div>
                </motion.div>
                <motion.div animate={{ y: [10, 0, 10] }} transition={{ duration: 4, repeat: Infinity }} className="p-6 xl:p-8 bg-slate-900 rounded-2xl xl:rounded-3xl flex flex-col justify-end shadow-xl">
                  <div className="h-8 xl:h-10 bg-white/10 rounded-full flex items-center justify-center text-[10px] xl:text-xs font-black text-violet-400">ENGINE_SYNC</div>
                </motion.div>
                <motion.div className="col-span-2 p-6 xl:p-10 bg-white rounded-2xl xl:rounded-[2.5rem] border border-slate-100 shadow-xl flex items-center justify-between">
                  <div className="flex gap-2 xl:gap-3">
                    <div className="w-5 h-5 xl:w-6 xl:h-6 bg-violet-500 rounded-full"></div>
                    <div className="w-5 h-5 xl:w-6 xl:h-6 bg-indigo-500 rounded-full"></div>
                    <div className="w-5 h-5 xl:w-6 xl:h-6 bg-slate-200 rounded-full"></div>
                  </div>
                  <div className="w-24 xl:w-32 h-5 xl:h-6 bg-slate-50 rounded-full border border-slate-100 flex items-center justify-center">
                    <div className="w-16 xl:w-24 h-1.5 bg-slate-200 rounded-full"></div>
                  </div>
                </motion.div>
              </div>

              <div className="absolute top-4 left-1/2 -translate-x-1/2 font-mono text-[10px] xl:text-xs text-slate-400 uppercase tracking-widest bg-white px-4 leading-[1.4]">
                LOGIC_SPEC_v4.2.0
              </div>
            </motion.div>
          </div>
        </div>

        {/* SERVICE VERTICALS */}
        <div className="mb-16 lg:mb-24">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4 lg:gap-6 border-l-4 border-violet-600 pl-6 lg:pl-8">
            <div className="max-w-xl">
              <h2 className="text-[10px] md:text-xs font-black text-violet-600 uppercase tracking-widest mb-3 leading-[1.4]">Custom Engineering</h2>
              <p className="text-3xl md:text-5xl font-black text-slate-900 leading-[1.1]">
                Architectures built for <span className="text-slate-400 italic font-serif font-light">sovereignty.</span>
              </p>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-px md:gap-4 lg:gap-6">
            {verticals?.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group cursor-default"
              >
                <div className="bg-white rounded-2xl md:rounded-[2rem] p-6 md:p-10 h-full border border-slate-100 shadow-sm shadow-slate-200/50 hover:shadow-xl transition-all group-hover:-translate-y-1 relative overflow-hidden">
                  <div
                    className={`w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-gradient-to-br ${item.color} text-white flex items-center justify-center text-2xl md:text-3xl mb-6 md:mb-8 shadow-md`}
                  >
                    {getIcon(item.icon)}
                  </div>
                  <h3 className="text-xl md:text-2xl font-black text-slate-900 mb-3 tracking-tighter uppercase leading-[1.1]">
                    {item.title}
                  </h3>
                  <p className="text-slate-500 leading-[1.6] font-light text-sm md:text-base">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* TECH STACK HUB */}
        <div className="mb-16 lg:mb-24 bg-white rounded-2xl lg:rounded-[4rem] p-6 lg:p-12 border border-slate-100 shadow-xl relative overflow-hidden">
          <div className="hidden lg:block absolute top-0 right-0 w-1/3 h-full bg-violet-50/50 -skew-x-[20deg] origin-top translate-x-1/2 opacity-50"></div>

          <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 lg:gap-12 items-center relative z-10">
            <div>
              <h2 className="text-4xl lg:text-5xl font-black text-slate-900 leading-[1.1] mb-6 lg:mb-8">Atomic <br /><span className="text-violet-600 font-serif italic font-medium">Infrastructure.</span></h2>
              <p className="text-slate-500 text-base md:text-lg font-light leading-[1.6] mb-8">We don't use templates. We engineer logic. Every application is built with a bespoke tech stack optimized for performance and horizontal scale.</p>

              <div className="pt-6 lg:pt-8 border-t border-slate-200">
                {/* Mobile Accordion */}
                <details className="lg:hidden group">
                  <summary className="cursor-pointer min-h-[48px] list-none font-bold text-sm text-violet-600 flex justify-between items-center bg-violet-50 p-4 rounded-xl border border-violet-100 leading-[1.4]">
                    View Full Tech Stack
                    <span className="transition group-open:rotate-180 text-xs">▼</span>
                  </summary>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                    {integrations?.map((int, i) => (
                      <div key={i} className="space-y-3">
                        <h4 className="text-[10px] font-black text-slate-900 uppercase tracking-widest leading-[1.4]">{int.group}</h4>
                        <div className="flex overflow-x-auto snap-x scrollbar-hide gap-2 pb-2 -mb-2">
                          {int.tags?.map(tag => (
                            <span key={tag} className="shrink-0 snap-start px-2 py-1 bg-slate-50 border border-slate-100 rounded-full text-[10px] font-bold text-slate-500 leading-[1.4]">{tag}</span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </details>

                {/* Desktop Grid */}
                <div className="hidden lg:grid grid-cols-2 gap-6">
                  {integrations?.map((int, i) => (
                    <div key={i} className="space-y-3">
                      <h4 className="text-[10px] font-black text-slate-900 uppercase tracking-widest leading-[1.4]">{int.group}</h4>
                      <div className="flex flex-wrap gap-2">
                        {int.tags?.map(tag => (
                          <span key={tag} className="px-2 py-1 bg-slate-50 border border-slate-100 rounded-full text-[10px] font-bold text-slate-500 leading-[1.4]">{tag}</span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="relative group w-full lg:w-auto lg:scale-105">
              <div className="p-6 lg:p-10 bg-slate-900 rounded-2xl lg:rounded-[3rem] text-white shadow-xl relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="flex justify-between items-center mb-8 lg:mb-10 border-b border-white/5 pb-4 lg:pb-6 font-mono text-[10px] tracking-widest text-white/40 leading-[1.4]">
                  <span>SYS_LOGIC_PROX</span>
                  <span>CORE_STATUS::READY</span>
                </div>

                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-violet-500 rounded-xl flex items-center justify-center text-white text-xl"><IoCodeSlashOutline /></div>
                    <div className="flex-1 space-y-1.5">
                      <div className="h-1.5 bg-white/10 rounded-full w-full"></div>
                      <div className="h-1.5 bg-white/5 rounded-full w-1/3"></div>
                    </div>
                  </div>
                  <div className="p-6 bg-white/5 rounded-2xl border border-white/5 relative overflow-hidden flex flex-col items-center justify-center">
                    <IoSyncOutline className="text-3xl text-violet-500 animate-spin-slow opacity-50" />
                    <p className="text-[10px] font-mono text-emerald-400 mt-3 tracking-tighter leading-[1.4]">DATASTREAM::VERIFIED</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* PRICING */}
        <div className="mb-16 lg:mb-24">
          <div className="text-left md:text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-[10px] md:text-xs font-black text-violet-600 uppercase tracking-widest mb-3 leading-[1.4]">Scaling Tiers</h2>
            <p className="text-3xl md:text-5xl font-black text-slate-900 leading-[1.1]">Structured for <span className="text-slate-400">every evolution.</span></p>
          </div>

          <div className="flex overflow-x-auto snap-x snap-mandatory md:grid md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 pb-6 scrollbar-hide">
            {pricing?.map((tier, idx) => (
              <div key={idx} className={`snap-center shrink-0 w-[85vw] md:w-auto bg-white rounded-2xl md:rounded-[2.5rem] p-6 md:p-8 border ${tier.highlight ? "border-violet-600 shadow-xl shadow-violet-600/10 md:-translate-y-2" : "border-slate-100 shadow-md"} flex flex-col h-full relative overflow-hidden group transition-all`}>
                <h4 className="text-2xl font-black text-slate-900 mb-1 uppercase tracking-tighter leading-[1.1]">{tier.t}</h4>
                <p className="text-3xl md:text-4xl font-black text-slate-900 mb-6 md:mb-8 leading-[1.1]">{tier.p}</p>

                <div className="space-y-3 mb-8 flex-1">
                  {tier.list?.map(item => (
                    <div key={item} className="flex gap-2 items-center text-slate-500 text-xs md:text-sm font-light leading-[1.6]">
                      <IoCheckmarkCircleOutline className={`text-violet-600 text-base shrink-0`} /> {item}
                    </div>
                  ))}
                </div>

                <button className={`w-full min-h-[48px] py-3 rounded-xl font-black uppercase tracking-widest text-[10px] transition-all shadow-md leading-[1.4] ${tier.highlight ? "bg-violet-600 text-white shadow-violet-600/30" : "bg-slate-900 text-white hover:bg-violet-600 font-black"}`}>Initialize Build</button>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center py-12 lg:py-20 border-t border-slate-100">
          <IoCubeOutline className="text-5xl lg:text-6xl text-violet-600 mb-6 md:mb-8 mx-auto opacity-10" />
          <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 mb-6 md:mb-8 leading-[1.1]">{cta.title?.split('your ')[0]}your <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-indigo-600 font-serif italic font-medium">{cta.title?.split('your ')[1]}</span></h3>
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
            <button className="w-full sm:w-[240px] min-h-[48px] px-4 py-3 md:py-4 bg-violet-600 text-white font-bold rounded-xl hover:bg-violet-700 transition-all shadow-xl shadow-violet-600/40 uppercase tracking-widest text-[10px] flex items-center justify-center leading-[1.4]">
              Initialize Build
            </button>
              <Link
              href="/services/custom-apps/details"
              className="w-full sm:w-[240px] min-h-[48px] px-4 py-3 md:py-4 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-all uppercase tracking-widest text-[10px] flex items-center justify-center text-center leading-[1.4]"
            >
              Technical Specifications
            </Link>
          </div>
        </div>
      </div>

      {/* MOBILE STICKY CTA */}
      <div className="sticky bottom-0 left-0 w-full p-[var(--gutter,16px)] bg-white/90 backdrop-blur-md border-t border-slate-100 z-50 md:hidden flex items-center justify-between shadow-[0_-10px_40px_rgba(0,0,0,0.05)] pb-[max(1rem,env(safe-area-inset-bottom))] mt-auto">
         <div className="flex flex-col gap-0.5">
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-[1.4]">Ready?</p>
            <p className="text-slate-900 font-bold text-sm leading-[1.4]">Start Building</p>
         </div>
         <button className="px-5 py-3 min-h-[48px] bg-violet-600 text-white font-black rounded-xl text-[10px] uppercase tracking-widest shadow-md shadow-violet-600/30 leading-[1.4] flex items-center justify-center">
            Initialize Brief
         </button>
      </div>
    </section>
  );
}
