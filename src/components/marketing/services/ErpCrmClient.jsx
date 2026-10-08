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
      <div className="absolute top-0 opacity-10 pointer-events-none -z-10 w-full h-full">
        <div className="absolute top-0 left-1/4 w-[1px] h-full bg-slate-200"></div>
        <div className="absolute top-0 right-1/4 w-[1px] h-full bg-slate-200"></div>
        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-slate-200"></div>
      </div>

      <div className="container-custom py-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-3 lg:gap-4 mb-6">
          <div className="flex-1 text-left">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-black tracking-widest uppercase mb-3"
            >
              <IoHardwareChipOutline className="text-sm" /> {hero.badge}
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "circOut" }}
              className="text-4xl md:text-6xl lg:text-8xl font-black text-slate-900 leading-[1.1] md:leading-[0.9] mb-2 md:mb-3 tracking-tighter"
            >
              {hero.title?.split(" ")[0]} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-slate-900 animate-gradient-x">{hero.subtitle}</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-slate-600 text-lg md:text-xl font-light leading-relaxed max-w-2xl mb-4"
            >
              {hero.description}
            </motion.p>

            <div className="flex flex-col sm:flex-row gap-2">
              <button className="w-full min-h-[44px] sm:w-[240px] px-4 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-all shadow-md shadow-indigo-600/20 uppercase tracking-wider text-sm flex items-center justify-center">
                Initialize Audit
              </button>
              <Link
                href="/services/erp-crm/details"
                className="w-full sm:w-[240px] min-h-[44px] px-4 py-3 bg-white border border-slate-200 text-slate-900 font-bold rounded-xl hover:bg-slate-50 transition-all uppercase tracking-wider text-sm flex items-center justify-center text-center"
              >
                Tech Specs
              </Link>
            </div>
          </div>

          <div className="flex-1 relative hidden lg:block">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="relative p-4 bg-white rounded-2xl border border-slate-100 shadow-xl overflow-hidden group"
            >
              <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: "radial-gradient(#4338ca 1px, transparent 1px)", backgroundSize: "30px 30px" }}></div>

              <div className="relative aspect-square flex flex-col items-center justify-center space-y-2">
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="w-40 h-40 border border-indigo-100 rounded-full flex items-center justify-center relative">
                  <div className="absolute top-0 w-4 h-4 bg-indigo-600 rounded-sm shadow-md shadow-indigo-200"></div>
                  <div className="absolute bottom-0 w-4 h-4 bg-purple-500 rounded-sm shadow-md shadow-purple-200"></div>
                  <div className="absolute right-0 w-4 h-4 bg-slate-900 rounded-sm shadow-md shadow-slate-400"></div>
                </motion.div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 bg-white rounded-xl border border-slate-100 shadow-lg flex flex-col items-center justify-center">
                    <IoPulseOutline className="text-2xl text-indigo-600 animate-pulse" />
                    <span className="text-[9px] font-black text-slate-300 mt-1">ACTIVE</span>
                  </div>
                </div>
              </div>

              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 font-mono text-[9px] text-slate-400 uppercase tracking-widest bg-white px-2 py-0.5 rounded-full border border-slate-50">
                OS_v6.4
              </div>
            </motion.div>
          </div>
        </div>

        <div className="mb-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-4 gap-3 border-l-[3px] border-indigo-600 pl-3 md:pl-4">
            <div className="max-w-xl">
              <h2 className="text-[10px] font-black text-indigo-600 uppercase tracking-widest mb-1">Logistics Standard</h2>
              <p className="text-2xl md:text-4xl font-black text-slate-900 leading-tight">
                Architectures for <span className="text-slate-400 italic font-serif font-light">sovereignty.</span>
              </p>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-3">
            {verticals?.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group cursor-default"
              >
                <div className={`bg-white rounded-2xl p-4 h-full border border-slate-100 shadow-sm shadow-slate-200/30 hover:shadow-lg transition-all group-hover:-translate-y-0.5 relative overflow-hidden`}>
                  <div
                    className={`w-10 h-10 rounded-lg bg-gradient-to-br ${item.color} text-white flex items-center justify-center text-xl mb-3 shadow-sm`}
                  >
                    {getIcon(item.icon)}
                  </div>
                  <h3 className="text-lg font-black text-slate-900 mb-1 uppercase leading-none">
                    {item.title}
                  </h3>
                  <p className="text-slate-500 leading-[1.5] font-light text-[13px]">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mb-6 bg-slate-900 rounded-2xl lg:rounded-3xl p-4 lg:p-6 relative overflow-hidden text-white">
          <div className="hidden lg:block absolute top-0 right-0 w-1/2 h-full bg-indigo-600/10 blur-[100px] -z-10"></div>

          <div className="flex flex-col lg:grid lg:grid-cols-2 gap-4 lg:gap-6 items-center relative z-10">
            <div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-2 leading-[0.9]">Atomic <span className="text-indigo-500 font-serif italic font-medium">Interconnectivity.</span></h2>
              <p className="text-slate-400 text-base md:text-lg font-light leading-relaxed mb-3">We eliminate friction. Your custom ERP becomes the central nervous system of your infrastructure.</p>

              <div className="pt-2">
                <details className="lg:hidden group">
                  <summary className="cursor-pointer min-h-[40px] list-none font-bold text-xs text-indigo-400 flex justify-between items-center bg-white/5 p-2.5 rounded-lg border border-white/10">
                    View Integrations
                    <span className="transition group-open:rotate-180 text-[10px]">▼</span>
                  </summary>
                  <div className="grid grid-cols-1 gap-px bg-white/5 border border-white/5 rounded-lg overflow-hidden mt-1.5">
                    {integrations?.map((int, i) => (
                      <div key={i} className="p-2.5 hover:bg-white/5 transition-colors group">
                        <h4 className="text-[9px] font-black text-indigo-400 uppercase tracking-widest mb-0.5">{int.t}</h4>
                        <p className="text-[11px] text-slate-400 font-bold leading-[1.4]">{int.d}</p>
                      </div>
                    ))}
                  </div>
                </details>

                <div className="hidden lg:grid grid-cols-2 gap-px bg-white/5 border border-white/5 rounded-xl overflow-hidden">
                  {integrations?.map((int, i) => (
                    <div key={i} className="p-3.5 hover:bg-white/5 transition-colors group">
                      <h4 className="text-[9px] font-black text-indigo-400 uppercase tracking-widest mb-1.5">{int.t}</h4>
                      <p className="text-xs text-slate-400 font-bold leading-[1.4]">{int.d}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="relative group w-full lg:w-auto lg:scale-105 mt-4 lg:mt-0">
              <div className="p-4 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm relative z-20 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="flex justify-between items-center mb-4 border-b border-white/5 pb-2 font-mono text-[9px] tracking-widest text-white/40">
                  <span>SYS_SYNC</span>
                  <span>STATUS:OK</span>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <IoGitNetworkOutline className="text-2xl text-indigo-500" />
                    <div className="flex-1 space-y-1">
                      <div className="h-1 bg-white/10 rounded-full w-full"></div>
                      <div className="h-1 bg-white/5 rounded-full w-1/4"></div>
                    </div>
                  </div>
                  <div className="h-24 bg-white/5 rounded-xl border border-white/5 flex items-center justify-center p-3">
                    <div className="grid grid-cols-6 gap-1 w-full h-full items-end">
                      {[0.4, 0.8, 0.6, 1, 0.7, 0.9].map((h, i) => (
                        <motion.div key={i} initial={{ height: 0 }} whileInView={{ height: `${h * 100}%` }} className="bg-indigo-500/50 rounded-t-sm" />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <div className="text-center max-w-xl mx-auto mb-4">
            <h2 className="text-[10px] font-black text-indigo-600 uppercase tracking-widest mb-1">Scaling Tiers</h2>
            <p className="text-2xl md:text-4xl font-black text-slate-900 leading-tight">Investment for <span className="text-slate-400">sovereignty.</span></p>
          </div>

          <div className="flex overflow-x-auto snap-x snap-mandatory md:grid md:grid-cols-2 lg:grid-cols-3 gap-3 pb-2 scrollbar-hide">
            {pricing?.map((tier, idx) => (
              <div key={idx} className={`snap-center shrink-0 w-[85vw] md:w-auto bg-white rounded-2xl p-4 border ${tier.highlight ? "border-indigo-600 shadow-md md:-translate-y-1" : "border-slate-100 shadow-sm"} flex flex-col h-full relative overflow-hidden group transition-all`}>
                <h4 className="text-xl font-black text-slate-900 mb-0.5 uppercase tracking-tight">{tier.t}</h4>
                <p className="text-2xl font-black text-slate-900 mb-3">{tier.p}</p>

                <div className="space-y-2 mb-4 flex-1">
                  {tier.list?.map(item => (
                    <div key={item} className="flex gap-1.5 items-start text-slate-500 text-[11px] font-light leading-snug">
                      <IoCheckmarkCircleOutline className={`text-indigo-600 text-sm shrink-0 mt-px`} /> {item}
                    </div>
                  ))}
                </div>

                <button className={`w-full min-h-[40px] py-2 rounded-lg font-black uppercase tracking-widest text-[9px] transition-all shadow-sm ${tier.highlight ? "bg-indigo-600 text-white shadow-indigo-600/20" : "bg-slate-900 text-white hover:bg-indigo-600"}`}>Initialize</button>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center py-6 border-t border-slate-200">
          <IoLayersOutline className="text-4xl md:text-5xl text-indigo-600 mb-3 mx-auto opacity-10" />
          <h3 className="text-2xl md:text-3xl lg:text-4xl font-black text-slate-900 mb-4 leading-tight">{cta.title?.split('your ')[0]}your <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-700 font-serif italic font-medium">{cta.title?.split('your ')[1]}</span></h3>
          <div className="flex flex-col sm:flex-row gap-2 justify-center">
            <button className="w-full sm:w-[220px] min-h-[44px] px-4 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-all shadow-md shadow-indigo-600/20 uppercase tracking-widest text-[10px] flex items-center justify-center">
              Initialize Build
            </button>
              <Link
              href="/services/erp-crm/details"
              className="w-full sm:w-[220px] min-h-[44px] px-4 py-3 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-all uppercase tracking-widest text-[10px] flex items-center justify-center text-center"
            >
              Tech Specs
            </Link>
          </div>
        </div>
      </div>

      <div className="md:hidden sticky bottom-0 left-0 w-full bg-gradient-to-t from-white via-white/95 to-white/80 backdrop-blur-md border-t border-slate-100 p-2 z-50 pb-[max(0.5rem,env(safe-area-inset-bottom))] mt-auto">
        <button className="w-full min-h-[44px] py-2.5 bg-indigo-600 text-white font-bold rounded-xl shadow-md shadow-indigo-600/20 uppercase tracking-widest text-[10px] flex items-center justify-center">
          Init Audit
        </button>
      </div>
    </section>
  );
}
