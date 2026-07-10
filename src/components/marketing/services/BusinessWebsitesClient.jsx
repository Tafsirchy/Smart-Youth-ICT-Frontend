"use client";

import {
  IoRocketOutline,
  IoCheckmarkCircleOutline,
  IoGlobeOutline,
  IoAnalyticsOutline,
  IoShieldOutline,
  IoBriefcaseOutline
} from "react-icons/io5";
import { motion } from "framer-motion";
import Link from "next/link";
import { getIcon } from "@/lib/icons";

export default function BusinessWebsitesClient({ data }) {
  if (!data) return null;

  const { hero = {}, sections = {}, cta = {} } = data;
  const verticals = sections.verticals || [];
  const integrations = sections.integrations || [];
  const pricing = sections.pricing || [];

  return (
    <section className="min-h-screen bg-white selection:bg-blue-600 selection:text-white overflow-hidden relative flex flex-col">
      {/* INDUSTRIAL OVERLAY */}
      <div className="absolute top-0 opacity-10 pointer-events-none -z-10 w-full h-full">
        <div className="absolute top-0 left-1/4 w-[1px] h-full bg-slate-200"></div>
        <div className="absolute top-0 right-1/4 w-[1px] h-full bg-slate-200"></div>
        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-slate-200"></div>
      </div>

      <div className="container-custom py-10 lg:py-20 relative z-10">
        {/* BUSINESS HERO */}
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16 mb-24 lg:mb-32 px-4 md:px-0">
          <div className="flex-1 text-left">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-[10px] sm:text-xs font-black tracking-widest uppercase mb-4 sm:mb-6 leading-[1.4]"
            >
              <IoRocketOutline className="text-sm" /> {hero.badge}
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "circOut" }}
              className="text-4xl sm:text-6xl md:text-8xl font-black text-slate-900 leading-[1.1] lg:leading-[0.9] mb-4 sm:mb-6 tracking-tighter"
            >
              {hero.title} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500 animate-gradient-x">{hero.subtitle}</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-slate-500 text-lg sm:text-xl font-light leading-[1.6] max-w-2xl mb-6 md:mb-8"
            >
              {hero.description}
            </motion.p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <button className="w-full sm:w-[280px] min-h-[48px] px-5 py-3 sm:py-4 bg-blue-600 text-white font-black rounded-xl hover:bg-blue-700 transition-all shadow-xl shadow-blue-600/20 uppercase text-[10px] sm:text-xs flex items-center justify-center leading-[1.4]">
                Initialize Consultation
              </button>
              <Link
                href="/services/business-websites/details"
                className="w-full sm:w-[280px] min-h-[48px] px-5 py-3 sm:py-4 bg-white border border-slate-200 text-slate-900 font-black rounded-xl hover:bg-slate-50 transition-all uppercase text-[10px] sm:text-xs flex items-center justify-center text-center leading-[1.4]"
              >
                Technical Specifications
              </Link>
            </div>
          </div>

          <div className="flex-1 relative hidden lg:block">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotate: 5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1 }}
              className="relative p-6 lg:p-8 bg-white rounded-3xl lg:rounded-[4rem] border border-slate-100 shadow-2xl overflow-hidden"
            >
              <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: "linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)", backgroundSize: "50px 50px" }}></div>
              <img
                src={hero.mainImage}
                width={800}
                height={800}
                fetchPriority="high"
                onError={(e) => { e.target.onerror = null; e.target.src = '/images/placeholder.png'; }}
                className="w-full aspect-square object-cover rounded-2xl lg:rounded-[3rem] grayscale hover:grayscale-0 transition-all duration-1000 shadow-inner"
                alt="Business Growth"
              />
              <div className="absolute top-4 left-1/2 -translate-x-1/2 font-mono text-[8px] text-slate-400 uppercase tracking-widest bg-white px-3 leading-[1.4]">
                OPERATIONAL_GRID_v4.0
              </div>
            </motion.div>
          </div>
        </div>

        {/* SERVICE VERTICALS */}
        <div className="mb-24 lg:mb-32 px-4 md:px-0">
          <div className="flex flex-col md:flex-row justify-between items-end mb-8 sm:mb-12 gap-4 md:gap-6 border-l-4 border-blue-600 pl-4 sm:pl-6">
            <div className="max-w-xl">
              <h2 className="text-[10px] sm:text-xs font-black text-blue-600 uppercase tracking-widest mb-2 leading-[1.4]">{sections.verticalsHeader?.badge || "Industrial Standard"}</h2>
              <p className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 leading-[1.1]">
                {sections.verticalsHeader?.title || "Architectures built for"} <span className="text-slate-400 italic font-serif font-light">{sections.verticalsHeader?.focus || "conversion & scale."}</span>
              </p>
            </div>
          </div>

          <div className="flex overflow-x-auto snap-x snap-mandatory lg:grid lg:grid-cols-3 gap-4 sm:gap-6 pb-8 lg:pb-0 -mx-[var(--gutter)] px-[var(--gutter)] lg:mx-0 lg:px-0">
            {verticals?.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group cursor-default min-w-[280px] snap-center shrink-0 w-[85vw] lg:w-auto"
              >
                <div className={`bg-white rounded-[2rem] lg:rounded-[3rem] p-6 sm:p-8 h-full border ${item.border} shadow-sm shadow-slate-200/50 hover:shadow-xl transition-all lg:group-hover:-translate-y-2 relative overflow-hidden flex flex-col`}>
                  <div
                    className={`w-12 h-12 lg:w-14 lg:h-14 rounded-2xl bg-gradient-to-br ${item.color} text-white flex items-center justify-center text-2xl lg:text-3xl mb-4 sm:mb-6 shadow-lg shrink-0`}
                  >
                    {getIcon(item.icon)}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 mb-3 sm:mb-4 tracking-tighter uppercase leading-[1.1]">
                    {item.title}
                  </h3>
                  <p className="text-slate-500 leading-[1.6] font-light text-sm sm:text-base flex-1">
                    {item.desc}
                  </p>

                  <div className="mt-6 pt-6 border-t border-slate-50 flex items-center gap-2 text-[10px] sm:text-xs font-black text-slate-300 uppercase tracking-widest lg:group-hover:text-blue-600 transition-colors leading-[1.4]">
                    Execution Verified <IoCheckmarkCircleOutline className="text-base sm:text-lg shrink-0" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* LOGISTICS & INTEGRATION HUB */}
        <div className="mb-16 sm:mb-24 bg-slate-900 rounded-3xl sm:rounded-[4rem] lg:rounded-[5rem] p-6 sm:p-8 lg:p-16 relative overflow-hidden text-white mx-4 md:mx-0">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-600/10 blur-[150px] -z-10"></div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center relative z-10">
            <div>
              <h2 className="text-3xl sm:text-4xl lg:text-7xl font-black mb-4 sm:mb-6 leading-[1.1] tracking-tighter">{sections.logistics?.title || "Unified Logistics."}</h2>
              <p className="text-slate-400 text-base sm:text-lg font-light leading-[1.6] mb-6 sm:mb-10">{sections.logistics?.description || "We eliminate technical silos. Your website becomes the central node for your CRM, payments, and marketing automation."}</p>

              <div className="grid grid-cols-2 gap-px bg-white/5 border border-white/5 rounded-2xl overflow-hidden">
                {integrations?.map((int, i) => (
                  <div key={i} className="p-4 sm:p-6 hover:bg-white/5 transition-colors group">
                    <div className="text-blue-500 text-2xl mb-3 sm:mb-4 lg:group-hover:scale-110 transition-transform">{getIcon(int.icon)}</div>
                    <h4 className="text-[10px] sm:text-xs font-black uppercase tracking-widest mb-1 leading-[1.4]">{int.t}</h4>
                    <p className="text-[10px] text-slate-500 font-bold leading-[1.4]">{int.d}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative group lg:scale-105">
              <div className="p-6 sm:p-8 bg-white/5 rounded-3xl sm:rounded-[3rem] border border-white/10 backdrop-blur-sm relative z-20 overflow-hidden">
                <div className="flex justify-between items-center mb-6 sm:mb-8 border-b border-white/5 pb-4 sm:pb-6">
                  <p className="text-[10px] font-black uppercase tracking-widest text-blue-500 leading-[1.4]">{sections.logistics?.badge || "Infrastructure_Health"}</p>
                  <IoGlobeOutline className="text-emerald-500 animate-[spin_10s_linear_infinite]" />
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-1 bg-white/10 rounded-full overflow-hidden flex-1"><motion.div initial={{ width: 0 }} whileInView={{ width: "94%" }} className="h-full bg-blue-500" /></div>
                    <span className="text-[10px] sm:text-xs font-mono text-blue-400 leading-[1.4]">94.8%</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-1 bg-white/10 rounded-full overflow-hidden flex-1"><motion.div initial={{ width: 0 }} whileInView={{ width: "100%" }} className="h-full bg-emerald-500" /></div>
                    <span className="text-[10px] sm:text-xs font-mono text-emerald-400 leading-[1.4]">100%_UP</span>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-white/5 flex gap-3">
                  <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-blue-400"><IoAnalyticsOutline /></div>
                  <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-emerald-400"><IoShieldOutline /></div>
                </div>
              </div>
              <div className="absolute -inset-10 bg-blue-600/20 blur-[100px] rounded-full -z-10 group-hover:bg-blue-600/30 transition-all"></div>
            </div>
          </div>
        </div>

        {/* PRICING SELECTOR */}
        <div className="mb-24 lg:mb-32 px-4 md:px-0">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
            <h2 className="text-[10px] sm:text-xs font-black text-blue-600 uppercase tracking-widest mb-2 leading-[1.4]">{sections.pricingHeader?.badge || "Scaling Tiers"}</h2>
            <p className="text-2xl sm:text-4xl md:text-5xl font-black text-slate-900 leading-[1.1]">{sections.pricingHeader?.title || "Bespoke investment"} <span className="text-slate-400">{sections.pricingHeader?.focus || "for results."}</span></p>
          </div>

          <div className="flex overflow-x-auto snap-x snap-mandatory md:grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 pb-8 md:pb-0 -mx-[var(--gutter)] px-[var(--gutter)] md:mx-0 md:px-0">
            {pricing?.map((tier, idx) => (
              <div key={idx} className={`bg-white rounded-3xl sm:rounded-[3rem] p-6 sm:p-8 border min-w-[280px] snap-center shrink-0 w-[85vw] md:w-auto ${tier.highlight ? "border-blue-600 shadow-xl shadow-blue-600/10 md:-translate-y-4" : "border-slate-100 shadow-lg shadow-slate-200/50"} flex flex-col h-full relative overflow-hidden group transition-all`}>
                <h4 className="text-xl sm:text-2xl font-black text-slate-900 mb-1 uppercase tracking-tighter leading-[1.1]">{tier.t}</h4>
                <p className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 mb-6 sm:mb-8 leading-[1.1]">{tier.p}</p>

                <div className="space-y-3 sm:space-y-4 mb-8 sm:mb-10 flex-1">
                  {tier.list?.map(item => (
                    <div key={item} className="flex gap-2 sm:gap-3 items-center text-slate-500 text-sm font-light leading-[1.6]">
                      <IoCheckmarkCircleOutline className={`text-${tier.color}-600 text-base sm:text-lg shrink-0`} /> {item}
                    </div>
                  ))}
                </div>

                <button className={`w-full min-h-[48px] py-4 rounded-2xl font-black uppercase text-[10px] sm:text-xs transition-all shadow-md sm:shadow-xl shadow-slate-200/50 leading-[1.4] flex items-center justify-center ${tier.highlight ? "bg-blue-600 text-white shadow-blue-600/30" : "bg-slate-900 text-white hover:bg-blue-600"}`}>Select Deployment</button>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center py-16 lg:py-24 border-t border-slate-100 px-4 md:px-0">
          <IoBriefcaseOutline className="text-5xl sm:text-6xl lg:text-7xl text-blue-600 mb-6 sm:mb-8 mx-auto opacity-10" />
          <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 mb-6 sm:mb-8 leading-[1.1]">{cta.title?.split('your ')[0]}your <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 font-serif italic font-medium">{cta.title?.split('your ')[1]}</span></h3>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <button className="w-full sm:w-[280px] min-h-[48px] px-5 sm:px-6 py-4 bg-blue-600 text-white font-black rounded-xl hover:bg-blue-700 transition-all shadow-xl shadow-blue-600/40 uppercase tracking-widest text-[10px] sm:text-xs flex items-center justify-center leading-[1.4]">
              Initialize Build
            </button>
              <Link
              href="/services/business-websites/details"
              className="w-full sm:w-[280px] min-h-[48px] px-5 sm:px-6 py-4 bg-slate-900 text-white font-black rounded-xl hover:bg-slate-800 transition-all uppercase tracking-widest text-[10px] sm:text-xs flex items-center justify-center text-center leading-[1.4]"
            >
              Technical Specifications
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Sticky CTA */}
      <div className="sticky bottom-0 left-0 w-full p-[var(--gutter,16px)] bg-white/90 backdrop-blur-md border-t border-slate-200 z-50 md:hidden flex items-center justify-between shadow-[0_-10px_40px_rgba(0,0,0,0.05)] pb-[max(1rem,env(safe-area-inset-bottom))] mt-auto">
        <div className="flex flex-col gap-0.5">
          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-[1.4]">Start Project</p>
          <p className="text-slate-900 font-bold text-sm leading-[1.4]">Consult Expert</p>
        </div>
        <button className="px-5 py-3 min-h-[48px] bg-blue-600 text-white font-black rounded-xl text-[10px] uppercase tracking-widest shadow-lg shadow-blue-600/30 leading-[1.4] flex items-center justify-center">
          Book Now
        </button>
      </div>
    </section>
  );
}
