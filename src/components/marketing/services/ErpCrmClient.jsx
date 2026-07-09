"use client";

import {
  IoLayersOutline,
  IoCheckmarkCircleOutline,
  IoGitNetworkOutline,
  IoHardwareChipOutline,
  IoPulseOutline
} from "react-icons/io5";
import { motion } from "framer-motion";
import Link from "next/link";
import { getIcon } from "@/lib/icons";

export default function ErpCrmClient({ data }) {
  if (!data) return null;

  const { hero = {}, sections = {}, cta = {} } = data;
  const verticals = sections.verticals || [];
  const integrations = sections.integrations || [];
  const pricing = sections.pricing || [];

  return (
    <section className="min-h-screen bg-slate-50 text-slate-900 selection:bg-indigo-600 selection:text-white overflow-hidden relative font-sans flex flex-col">
      {/* INDUSTRIAL OVERLAY */}
      <div className="absolute top-0 opacity-10 pointer-events-none -z-10 w-full h-full">
        <div className="absolute top-0 left-1/4 w-[1px] h-full bg-slate-200"></div>
        <div className="absolute top-0 right-1/4 w-[1px] h-full bg-slate-200"></div>
        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-slate-200"></div>
      </div>

      <div className="container-custom py-10 relative z-10">
        {/* ENTERPRISE HERO */}
        <div className="flex flex-col lg:flex-row items-center gap-4 lg:gap-8 mb-8 md:mb-12 lg:mb-16">
          <div className="flex-1 text-left">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-black tracking-[0.2em] uppercase mb-4"
            >
              <IoHardwareChipOutline className="text-sm" /> {hero.badge}
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "circOut" }}
              className="text-4xl md:text-6xl lg:text-8xl font-black text-slate-900 leading-[1.1] md:leading-[0.9] mb-3 md:mb-4 tracking-tighter"
            >
              {hero.title?.split(" ")[0]} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-slate-900 animate-gradient-x">{hero.subtitle}</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-slate-600 text-lg md:text-xl font-light leading-relaxed max-w-2xl mb-5 md:mb-6"
            >
              {hero.description}
            </motion.p>

            <div className="flex flex-col sm:flex-row gap-3">
              <button className="w-full min-h-[44px] sm:w-[280px] px-6 py-4 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-600/20 uppercase tracking-wider text-sm flex items-center justify-center">
                Initialize Enterprise Audit
              </button>
              <Link
                href="/services/erp-crm/details"
                className="w-full sm:w-[280px] min-h-[44px] px-6 py-4 bg-white border border-slate-200 text-slate-900 font-bold rounded-xl hover:bg-slate-50 transition-all uppercase tracking-wider text-sm flex items-center justify-center text-center"
              >
                Technical Specifications
              </Link>
            </div>
          </div>

          <div className="flex-1 relative hidden lg:block">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="relative p-6 bg-white rounded-[2rem] border border-slate-100 shadow-xl overflow-hidden group"
            >
              <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: "radial-gradient(#4338ca 1px, transparent 1px)", backgroundSize: "30px 30px" }}></div>

              <div className="relative aspect-square flex flex-col items-center justify-center space-y-3">
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="w-48 h-48 border border-indigo-100 rounded-full flex items-center justify-center relative">
                  <div className="absolute top-0 w-6 h-6 bg-indigo-600 rounded-md shadow-lg shadow-indigo-200"></div>
                  <div className="absolute bottom-0 w-6 h-6 bg-purple-500 rounded-md shadow-lg shadow-purple-200"></div>
                  <div className="absolute right-0 w-6 h-6 bg-slate-900 rounded-md shadow-lg shadow-slate-400"></div>
                </motion.div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-24 h-24 bg-white rounded-2xl border border-slate-100 shadow-xl flex flex-col items-center justify-center">
                    <IoPulseOutline className="text-3xl text-indigo-600 animate-pulse" />
                    <span className="text-[10px] font-black text-slate-300 mt-1">LINK_ACTIVE</span>
                  </div>
                </div>
              </div>

              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 font-mono text-[10px] text-slate-400 uppercase tracking-widest bg-white px-3 py-1 rounded-full border border-slate-50">
                ENTERPRISE_OS_v6.4
              </div>
            </motion.div>
          </div>
        </div>

        {/* SERVICE VERTICALS */}
        <div className="mb-8 md:mb-12 lg:mb-16">
          <div className="flex flex-col md:flex-row justify-between items-end mb-6 md:mb-8 gap-4 border-l-4 border-indigo-600 pl-4 md:pl-6">
            <div className="max-w-xl">
              <h2 className="text-xs font-black text-indigo-600 uppercase tracking-widest mb-2">Logistics Standard</h2>
              <p className="text-3xl md:text-5xl font-black text-slate-900 leading-tight">
                Architectures built for <span className="text-slate-400 italic font-serif font-light">operational sovereignty.</span>
              </p>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-4">
            {verticals?.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group cursor-default"
              >
                <div className={`bg-white rounded-[2rem] p-6 h-full border border-slate-100 shadow-sm shadow-slate-200/50 hover:shadow-xl transition-all group-hover:-translate-y-1 relative overflow-hidden`}>
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} text-white flex items-center justify-center text-2xl mb-4 shadow-md`}
                  >
                    {getIcon(item.icon)}
                  </div>
                  <h3 className="text-xl font-black text-slate-900 mb-2 uppercase leading-none">
                    {item.title}
                  </h3>
                  <p className="text-slate-500 leading-relaxed font-light text-sm">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* INTEGRATION SECTION */}
        <div className="mb-8 md:mb-12 lg:mb-16 bg-slate-900 rounded-[2rem] lg:rounded-[3rem] p-4 md:p-6 lg:p-12 relative overflow-hidden text-white -mx-4 sm:mx-0">
          <div className="hidden lg:block absolute top-0 right-0 w-1/2 h-full bg-indigo-600/10 blur-[150px] -z-10"></div>

          <div className="flex flex-col lg:grid lg:grid-cols-2 gap-6 lg:gap-10 items-center relative z-10">
            <div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-4 lg:mb-6 leading-[0.9]">Atomic <br /><span className="text-indigo-500 font-serif italic font-medium">Interconnectivity.</span></h2>
              <p className="text-slate-400 md:text-slate-500 text-lg md:text-xl font-light leading-relaxed mb-4 lg:mb-6">We eliminate operational friction. Your custom ERP/CRM becomes the central nervous system of your entire business infrastructure.</p>

              <div className="pt-4 lg:pt-4">
                {/* Mobile Accordion */}
                <details className="lg:hidden group">
                  <summary className="cursor-pointer min-h-[44px] list-none font-bold text-sm text-indigo-400 flex justify-between items-center bg-white/5 p-3 rounded-xl border border-white/10">
                    View Integrations
                    <span className="transition group-open:rotate-180 text-xs">▼</span>
                  </summary>
                  <div className="grid grid-cols-1 gap-px bg-white/5 border border-white/5 rounded-2xl overflow-hidden mt-3">
                    {integrations?.map((int, i) => (
                      <div key={i} className="p-3 hover:bg-white/5 transition-colors group">
                        <h4 className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-1">{int.t}</h4>
                        <p className="text-xs text-slate-500 font-bold leading-relaxed">{int.d}</p>
                      </div>
                    ))}
                  </div>
                </details>

                {/* Desktop Grid */}
                <div className="hidden lg:grid grid-cols-2 gap-px bg-white/5 border border-white/5 rounded-2xl overflow-hidden">
                  {integrations?.map((int, i) => (
                    <div key={i} className="p-5 hover:bg-white/5 transition-colors group">
                      <h4 className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-2">{int.t}</h4>
                      <p className="text-xs text-slate-500 font-bold leading-relaxed">{int.d}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="relative group w-full lg:w-auto lg:scale-110 mt-6 lg:mt-0">
              <div className="p-4 lg:p-6 bg-white/5 rounded-[2rem] lg:rounded-[3rem] border border-white/10 backdrop-blur-sm relative z-20 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="flex justify-between items-center mb-6 border-b border-white/5 pb-4 font-mono text-[10px] tracking-widest text-white/40">
                  <span>SYS_LOGIC_SYNC</span>
                  <span>STATUS::ACTIVE</span>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <IoGitNetworkOutline className="text-3xl text-indigo-500" />
                    <div className="flex-1 space-y-1.5">
                      <div className="h-1 bg-white/10 rounded-full w-full"></div>
                      <div className="h-1 bg-white/5 rounded-full w-1/4"></div>
                    </div>
                  </div>
                  <div className="h-32 bg-white/5 rounded-2xl border border-white/5 flex items-center justify-center p-4">
                    <div className="grid grid-cols-6 gap-1.5 w-full h-full items-end">
                      {[0.4, 0.8, 0.6, 1, 0.7, 0.9].map((h, i) => (
                        <motion.div key={i} initial={{ height: 0 }} whileInView={{ height: `${h * 100}%` }} className="bg-indigo-500/50 rounded-t-md" />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* PRICING */}
        <div className="mb-8 md:mb-12 lg:mb-16">
          <div className="text-center max-w-2xl mx-auto mb-6 md:mb-8">
            <h2 className="text-xs font-black text-indigo-600 uppercase tracking-widest mb-2">Scaling Tiers</h2>
            <p className="text-3xl md:text-5xl font-black text-slate-900 leading-tight">Investment for <span className="text-slate-400">sovereignty.</span></p>
          </div>

          <div className="flex overflow-x-auto snap-x snap-mandatory md:grid md:grid-cols-2 lg:grid-cols-3 gap-4 pb-4 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-hide">
            {pricing?.map((tier, idx) => (
              <div key={idx} className={`snap-center shrink-0 w-[85vw] md:w-auto bg-white rounded-[2rem] p-6 border ${tier.highlight ? "border-indigo-600 shadow-xl shadow-indigo-600/10 md:-translate-y-2" : "border-slate-100 shadow-md shadow-slate-200/50"} flex flex-col h-full relative overflow-hidden group transition-all`}>
                <h4 className="text-2xl font-black text-slate-900 mb-1 uppercase tracking-tight">{tier.t}</h4>
                <p className="text-4xl font-black text-slate-900 mb-6">{tier.p}</p>

                <div className="space-y-3 mb-6 flex-1">
                  {tier.list?.map(item => (
                    <div key={item} className="flex gap-2 items-start text-slate-500 text-xs font-light leading-snug">
                      <IoCheckmarkCircleOutline className={`text-indigo-600 text-base shrink-0 mt-0.5`} /> {item}
                    </div>
                  ))}
                </div>

                <button className={`w-full min-h-[44px] py-3 rounded-xl font-black uppercase tracking-widest text-[10px] transition-all shadow-md shadow-slate-200/50 ${tier.highlight ? "bg-indigo-600 text-white shadow-indigo-600/30 font-black" : "bg-slate-900 text-white hover:bg-indigo-600 font-black"}`}>Initialize Build</button>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center py-8 md:py-12 lg:py-20 border-t border-slate-200">
          <IoLayersOutline className="text-5xl md:text-6xl text-indigo-600 mb-4 md:mb-6 mx-auto opacity-10" />
          <h3 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 mb-4 md:mb-6 leading-tight">{cta.title?.split('your ')[0]}your <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-700 font-serif italic font-medium">{cta.title?.split('your ')[1]}</span></h3>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button className="w-full sm:w-[280px] min-h-[44px] px-6 py-4 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-600/40 uppercase tracking-wider text-xs flex items-center justify-center">
              Initialize Build
            </button>
              <Link
              href="/services/erp-crm/details"
              className="w-full sm:w-[280px] min-h-[44px] px-6 py-4 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-all uppercase tracking-wider text-xs flex items-center justify-center text-center"
            >
              Technical Specifications
            </Link>
          </div>
        </div>
      </div>

      {/* MOBILE STICKY CTA */}
      <div className="md:hidden sticky bottom-0 left-0 w-full bg-gradient-to-t from-white via-white/95 to-white/80 backdrop-blur-md border-t border-slate-200 p-3 z-50 shadow-[0_-10px_40px_rgba(0,0,0,0.05)] pb-[max(0.75rem,env(safe-area-inset-bottom))] mt-auto">
        <button className="w-full min-h-[44px] py-3 bg-indigo-600 text-white font-bold rounded-xl shadow-lg shadow-indigo-600/30 uppercase tracking-wider text-xs flex items-center justify-center">
          Initialize Enterprise Audit
        </button>
      </div>
    </section>
  );
}
