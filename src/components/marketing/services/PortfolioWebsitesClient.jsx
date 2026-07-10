"use client";

import {
  IoDiamondOutline,
  IoCheckmarkCircleOutline,
  IoInfiniteOutline,
  IoFingerPrintOutline
} from "react-icons/io5";
import { motion } from "framer-motion";
import Link from "next/link";
import { getIcon } from "@/lib/icons";

export default function PortfolioWebsitesClient({ data }) {
  if (!data) return null;

  const { hero = {}, sections = {}, cta = {} } = data;
  const philosophies = sections.philosophies || [];
  const phases = sections.phases || [];
  const pricing = sections.pricing || [];

  return (
    <section className="min-h-screen bg-[#fafafa] overflow-hidden relative selection:bg-rose-500 selection:text-white flex flex-col">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-[800px] pointer-events-none -z-10">
        <div className="absolute top-[-200px] left-[-200px] w-[800px] h-[800px] bg-rose-200/40 rounded-full blur-[160px] animate-pulse"></div>
        <div className="absolute top-[100px] right-[-300px] w-[700px] h-[700px] bg-emerald-100/30 rounded-full blur-[140px]"></div>
      </div>

      <div className="container-custom py-10 lg:py-12 relative">
        {/* STRUCTURALLY CREATIVE HERO */}
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12 mb-20 lg:mb-24 pt-10">
          <div className="flex-1 text-left">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-2 px-4 sm:px-6 py-2 rounded-full bg-white border border-slate-100 shadow-xl shadow-slate-200/50 text-slate-900 text-xs font-black tracking-widest uppercase mb-4 sm:mb-6 leading-[1.4]"
            >
              <IoDiamondOutline className="text-rose-500" /> {hero.badge}
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "circOut" }}
              className="text-3xl sm:text-4xl lg:text-6xl font-black text-slate-900 leading-[1.1] mb-4 sm:mb-6"
            >
              {hero.title?.split(" ")[0]} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-500 to-cyan-500 animate-gradient-x">{hero.subtitle}</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-slate-500 text-lg sm:text-xl md:text-3xl font-light leading-[1.6] max-w-2xl"
            >
              {hero.description}
            </motion.p>
          </div>

          <div className="flex-1 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1, ease: "backOut" }}
              className="relative z-20 group"
            >
              <div className="bg-white rounded-[3.5rem] p-4 shadow-2xl border border-slate-50 relative overflow-hidden transition-transform duration-700 group-hover:scale-[1.02]">
                <img
                  src={hero.mainImage}
                  width={800}
                  height={1000}
                  fetchPriority="high"
                  onError={(e) => { e.target.onerror = null; e.target.src = '/images/placeholder.png'; }}
                  className="w-full aspect-[4/5] object-cover rounded-[2.8rem] grayscale group-hover:grayscale-0 transition-all duration-1000"
                  alt="Portfolio Concept"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent flex flex-col justify-end p-6 sm:p-8 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity">
                  <p className="text-white text-3xl font-black leading-[1.1]">
                    Visual Poetics.
                  </p>
                  <p className="text-white/70 font-light leading-[1.6]">
                    Engineered for Creative Minds.
                  </p>
                </div>
              </div>

              {/* Floating Assets */}
              <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -top-10 -right-10 bg-white p-4 lg:p-6 rounded-3xl shadow-2xl border border-slate-100 z-30 hidden md:block"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-500 font-black text-xl italic leading-[1.1]">
                    100
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="text-xs font-black uppercase tracking-widest text-slate-400 leading-[1.4]">
                      PageSpeed
                    </p>
                    <p className="text-sm font-bold text-slate-900 leading-[1.4]">
                      Optimized
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* DESIGN PHILOSOPHIES (Creative Grid) */}
        <div className="mb-24 lg:mb-32">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 lg:mb-16 gap-4 lg:gap-6">
            <div className="max-w-xl">
              <h2 className="text-xs font-black text-rose-500 uppercase tracking-widest mb-2 lg:mb-3 leading-[1.4]">
                Core Methodologies
              </h2>
              <p className="text-2xl sm:text-3xl lg:text-5xl font-black text-slate-900 leading-[1.1]">
                Design thinking meets{" "}
                <span className="text-slate-400">technical mastery.</span>
              </p>
            </div>
            <p className="text-slate-500 max-w-xs font-light leading-[1.6]">
              We leverage Static Site Generation (SSG) to ensure your first
              impression is instantaneous.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-4 lg:gap-6">
            {philosophies?.map((style, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative h-full"
              >
                <div className="bg-white rounded-[3rem] p-6 lg:p-8 h-full border border-slate-100 hover:border-rose-100 hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-2 relative overflow-hidden flex flex-col">
                  <div
                    className={`w-12 h-12 lg:w-14 lg:h-14 rounded-2xl bg-gradient-to-br ${style.color} text-white flex items-center justify-center text-2xl mb-4 lg:mb-6 ${style.shadow} group-hover:scale-110 transition-transform shrink-0`}
                  >
                    {getIcon(style.icon)}
                  </div>
                  <h3 className="text-xl lg:text-2xl font-black text-slate-900 mb-3 leading-[1.1]">
                    {style.title}
                  </h3>
                  <p className="text-slate-500 leading-[1.6] font-light mb-6 group-hover:text-slate-700 transition-colors flex-1">
                    {style.desc}
                  </p>

                  <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-400 group-hover:text-rose-500 transition-colors leading-[1.4]">
                    Learn More <IoInfiniteOutline className="text-sm shrink-0" />
                  </div>

                  <div className="absolute bottom-[-20%] right-[-10%] w-40 h-40 bg-slate-50 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* DIGITAL ALCHEMY (Visual Stepper) */}
        <div className="relative bg-slate-900 rounded-3xl sm:rounded-[4rem] lg:rounded-[5rem] p-6 sm:p-8 lg:p-16 overflow-hidden mb-16 sm:mb-24">
          <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none">
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-rose-500 rounded-full blur-[200px]"></div>
          </div>

          <div className="relative z-10 grid lg:grid-cols-2 gap-8 lg:gap-12">
            <div className="flex flex-col gap-6 lg:gap-8">
              <div className="flex flex-col gap-4">
                 <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-[1.1]">
                   5-Phase Digital Alchemy.
                 </h2>
                 <p className="text-slate-400 text-lg lg:text-xl font-light leading-[1.6]">
                   Our process is linear but the results are exponential. We
                   transform raw ideas into production-grade artifacts.
                 </p>
              </div>

              <div className="flex flex-col w-full">
                {phases?.map((phase, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ x: 10 }}
                    className="group flex gap-4 lg:gap-6 items-center py-4 lg:py-6 border-b border-white/5 cursor-default"
                  >
                    <span className="text-slate-600 font-black text-xl lg:text-2xl group-hover:text-rose-500 transition-colors shrink-0 leading-[1.1]">
                      {phase.id}
                    </span>
                    <div className="flex flex-col gap-1">
                      <h4 className="text-lg lg:text-xl font-bold text-white group-hover:underline decoration-rose-500 underline-offset-4 transition-all leading-[1.4]">
                        {phase.t}
                      </h4>
                      <p className="text-slate-500 text-sm font-light max-w-sm leading-[1.6]">
                        {phase.d}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="hidden lg:flex items-center justify-center relative">
              <div className="w-full aspect-square border border-white/10 rounded-full flex items-center justify-center p-10 lg:p-12 animate-[spin_60s_linear_infinite]">
                <div className="w-full aspect-square border-2 border-dashed border-rose-500/30 rounded-full flex items-center justify-center relative">
                  <div className="absolute -top-4 text-rose-500 text-3xl">✦</div>
                  <IoInfiniteOutline className="absolute -bottom-4 text-emerald-500 text-3xl" />
                </div>
              </div>
              <div className="absolute text-center bg-slate-900 p-8 lg:p-10 rounded-full z-20 flex flex-col gap-2">
                <p className="text-rose-500 font-serif italic text-5xl lg:text-7xl leading-[1.1]">
                  Gold.
                </p>
                <p className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-white leading-[1.4]">
                  Standard Delivery
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* PREMIUM PACKAGES (Creative Cards) */}
        <div className="mb-24 lg:mb-32 text-center">
          <div className="max-w-2xl mx-auto mb-8 sm:mb-12 text-center flex flex-col gap-2 lg:gap-4">
            <h2 className="text-xs font-black text-rose-500 uppercase tracking-widest leading-[1.4]">
              {sections.pricingHeader?.badge || "Select Your Artifact"}
            </h2>
            <p className="text-2xl sm:text-3xl lg:text-5xl font-black text-slate-900 leading-[1.1]">
              {sections.pricingHeader?.title || "Structured tiers for"}{" "}
              <span className="text-slate-400">{sections.pricingHeader?.focus || "every career stage."}</span>
            </p>
          </div>

          <div className="flex overflow-x-auto snap-x snap-mandatory md:grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-6xl mx-auto text-left pb-8 md:pb-0 -mx-[var(--gutter)] px-[var(--gutter)] md:mx-0 md:px-0">
            {pricing?.map((tier, idx) => (
              <div
                key={idx}
                className={`bg-white rounded-3xl sm:rounded-[3rem] p-6 sm:p-8 border min-w-[280px] snap-center shrink-0 w-[85vw] md:w-auto ${tier.highlight ? "border-rose-500 shadow-2xl shadow-rose-500/10 md:-translate-y-4" : "border-slate-100 shadow-xl"} flex flex-col h-full relative overflow-hidden group transition-all`}
              >
                {tier.highlight && (
                  <div className="absolute top-0 right-0 bg-rose-500 text-white text-[10px] sm:text-xs font-black uppercase tracking-widest px-4 sm:px-6 py-2 rounded-bl-2xl sm:rounded-bl-3xl leading-[1.4]">
                    Popular
                  </div>
                )}
                <h4 className="text-xl lg:text-3xl font-black text-slate-900 mb-1 leading-[1.1]">
                  {tier.t}
                </h4>
                <p className="text-4xl lg:text-5xl font-black text-slate-900 mb-6 lg:mb-8 leading-[1.1]">
                  {tier.p}
                  <span className="text-sm font-light text-slate-400 leading-[1.4]">
                    {" "}
                    / starting
                  </span>
                </p>

                <div className="flex flex-col gap-3 lg:gap-4 mb-8 lg:mb-12 flex-1">
                  {tier.list?.map((item) => (
                    <div
                      key={item}
                      className="flex gap-2 items-center text-slate-600 font-light text-sm lg:text-base leading-[1.4]"
                    >
                      <IoCheckmarkCircleOutline
                        className={`text-rose-500 text-base shrink-0`}
                      />{" "}
                      {item}
                    </div>
                  ))}
                </div>

                <button
                  className={`w-full min-h-[48px] py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] sm:text-xs transition-all leading-[1.4] flex items-center justify-center ${tier.highlight ? "bg-rose-500 text-white shadow-xl shadow-rose-500/30" : "bg-slate-900 text-white hover:bg-rose-500"}`}
                >
                  Select {tier.t}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* CALL TO ACTION (Immersive) */}
        <div className="text-center py-16 lg:py-24 border-t border-slate-100 mt-10 lg:mt-12 relative overflow-hidden rounded-[3rem] lg:rounded-[5rem] bg-white">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-slate-50/50 -z-10 blur-3xl opacity-50"></div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="max-w-4xl mx-auto px-6 flex flex-col items-center gap-6 lg:gap-8"
          >
            <IoFingerPrintOutline className="text-6xl lg:text-7xl text-rose-500 opacity-20" />
            <h3 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 leading-[1.1]">
              {cta.title}
            </h3>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center w-full sm:w-auto">
              <button className="w-full sm:w-[280px] min-h-[48px] px-6 sm:px-8 py-4 sm:py-5 bg-rose-500 text-white font-black rounded-[2rem] hover:bg-rose-600 transition-all shadow-lg shadow-rose-600/40 uppercase tracking-widest text-[10px] sm:text-xs flex items-center justify-center leading-[1.4]">
                Consult Portfolio Expert
              </button>
              <Link
                href="/services/portfolio-websites/details"
                className="w-full sm:w-[280px] min-h-[48px] px-6 sm:px-8 py-4 sm:py-5 bg-slate-900 text-white font-black rounded-[2rem] hover:bg-black transition-all shadow-lg shadow-slate-900/40 uppercase tracking-widest text-[10px] sm:text-xs flex items-center justify-center text-center leading-[1.4]"
              >
                Technical Details
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Mobile Sticky CTA */}
      <div className="sticky bottom-0 left-0 w-full p-[var(--gutter,16px)] bg-white/90 backdrop-blur-md border-t border-slate-100 z-50 md:hidden flex items-center justify-between shadow-[0_-10px_40px_rgba(0,0,0,0.05)] pb-[max(1rem,env(safe-area-inset-bottom))] mt-auto">
        <div className="flex flex-col gap-1">
          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-[1.4]">Start Project</p>
          <p className="text-slate-900 font-bold text-sm leading-[1.4]">Consult Expert</p>
        </div>
        <button className="px-5 py-3 min-h-[48px] bg-rose-500 text-white font-black rounded-xl text-[10px] uppercase tracking-widest shadow-lg shadow-rose-500/30 leading-[1.4] flex items-center justify-center">
          Book Now
        </button>
      </div>
    </section>
  );
}
