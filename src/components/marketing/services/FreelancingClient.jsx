"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  IoGlobeOutline,
  IoCheckmarkCircle,
  IoShieldCheckmarkOutline,
  IoSearchOutline,
  IoArrowBackOutline
} from "react-icons/io5";

export default function FreelancingClient({ data, content }) {
  return (
    <section className="min-h-screen bg-slate-950 overflow-hidden relative font-sans flex flex-col">
      <div className="absolute inset-x-0 top-0 h-[800px] bg-gradient-to-b from-emerald-900/40 via-transparent to-transparent pointer-events-none"></div>

      <div className="container-custom py-8 lg:py-16 relative z-10">
        {/* Hero Section */}
        <div className="max-w-4xl mx-auto text-left lg:text-center mb-10 lg:mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 lg:px-4 lg:py-2 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-black tracking-widest uppercase mb-4 lg:mb-6 border border-emerald-500/20 leading-[1.4]"
          >
            {content?.hero?.badge || "Digital Sovereignty"}
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-6xl font-black text-white leading-[1.1] mb-4 lg:mb-6"
          >
            {content?.hero?.title || "Freelancing"} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 animate-gradient-x">
              {content?.hero?.subtitle || "Success Training"}
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 text-lg md:text-xl lg:text-2xl leading-[1.6] font-light max-w-3xl lg:mx-auto"
          >
            {content?.hero?.description || "Master the art of high-ticket client acquisition on global marketplaces."}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="pt-6 lg:pt-10"
          >
            <Link
              href="/services/freelancing/details"
              className="inline-flex items-center min-h-[48px] gap-2 text-xs sm:text-sm font-black uppercase tracking-widest text-emerald-400 hover:text-white transition-colors group leading-[1.4]"
            >
              View Market Manifest <IoArrowBackOutline className="rotate-180 group-hover:translate-x-2 transition-transform" />
            </Link>
          </motion.div>
        </div>

        {data?.classifications?.length > 0 ? (
          /* Target Classifications */
          <div className="mb-10 lg:mb-20">
            <h2 className="text-2xl lg:text-3xl font-black text-white text-left lg:text-center mb-6 lg:mb-10 uppercase italic">Marketplace Strategy Hubs</h2>
            <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 lg:grid lg:grid-cols-3 lg:gap-6 max-w-7xl mx-auto scrollbar-hide -mx-[var(--gutter)] px-[var(--gutter)]">
              {data.classifications.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="min-w-[85vw] sm:min-w-[300px] lg:w-auto snap-center shrink-0 bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[2rem] p-6 group hover:border-emerald-500/50 transition-all overflow-hidden relative flex flex-col gap-4"
                >
                  <div className={`absolute -right-10 -bottom-10 w-40 h-40 ${item.color} opacity-10 rounded-full blur-[60px] group-hover:opacity-30 transition-opacity`}></div>

                  <div className={`w-12 h-12 lg:w-14 lg:h-14 rounded-xl ${item.color} text-white flex items-center justify-center text-2xl mb-2 shadow-2xl group-hover:scale-110 transition-transform`}>
                    <IoGlobeOutline />
                  </div>
                  <div>
                    <h3 className="text-xl lg:text-2xl font-black text-white leading-[1.4] mb-1">{item.title}</h3>
                    <p className="text-[10px] lg:text-xs font-black uppercase tracking-widest text-emerald-400 leading-[1.4]">{item.type}</p>
                  </div>
                  <p className="text-slate-400 text-sm leading-[1.6] font-light">{item.desc}</p>

                  <div className="space-y-3 pt-4 border-t border-white/5 mt-auto">
                    {item.features?.map((f, idx) => (
                      <div key={idx} className="flex items-center gap-3 text-[10px] sm:text-xs font-black text-slate-500 uppercase tracking-widest leading-[1.4]">
                        <IoCheckmarkCircle className="text-emerald-500 text-base shrink-0" />
                        {f}
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-start lg:items-center gap-4 justify-center py-8 lg:py-12 bg-white/5 rounded-[2rem] mb-10 lg:mb-20 px-6">
            <IoSearchOutline className="text-4xl lg:text-5xl text-white/20" />
            <p className="text-white/40 text-xs lg:text-sm font-black uppercase tracking-widest leading-[1.4]">Strategy Catalog Ready</p>
          </div>
        )}

        {/* Dynamic Mastery Roadmap */}
        {data?.phases?.length > 0 && (
          <div className="mb-10 lg:mb-20 max-w-5xl mx-auto">
            <h2 className="text-2xl lg:text-4xl font-black text-white text-left lg:text-center mb-8 lg:mb-12 leading-[1.4]">Mastery <span className="text-emerald-500">Roadmap.</span></h2>
            <div className="space-y-6 lg:space-y-10 relative">
              <div className="absolute left-5 top-8 bottom-8 w-px bg-white/10 hidden md:block"></div>
              {data.phases.map((p, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex flex-col md:flex-row gap-4 lg:gap-6 items-start relative z-10"
                >
                  <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center text-white font-black shrink-0 shadow-lg shadow-emerald-600/30">
                    {p.step}
                  </div>
                  <div className="flex-1 flex flex-col gap-2">
                    <h3 className="text-lg lg:text-xl font-black text-white leading-[1.4]">{p.title}</h3>
                    <p className="text-slate-400 text-sm lg:text-base font-light leading-[1.6] max-w-2xl">{p.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Global Access Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-emerald-600 rounded-[2rem] p-6 lg:p-16 text-left lg:text-center text-white shadow-xl relative overflow-hidden flex flex-col gap-6 lg:items-center"
        >
          <div className="hidden md:block absolute top-0 right-0 w-[300px] h-[300px] bg-white rounded-full blur-[80px] pointer-events-none -translate-y-1/2 translate-x-1/2 opacity-20"></div>

          <IoShieldCheckmarkOutline className="text-5xl lg:text-6xl lg:mx-auto" />
          <h2 className="text-2xl lg:text-5xl font-black leading-[1.1]">Certified Global <br />Freelance Expert.</h2>
          <p className="text-emerald-100 text-base lg:text-lg font-light max-w-2xl lg:mx-auto italic leading-[1.6]">Receive a high-authority digital credential that proves your proficiency to clients across 180+ countries.</p>
          <button className="hidden lg:inline-flex min-h-[48px] px-8 py-4 bg-white text-emerald-600 font-black rounded-xl hover:scale-105 transition-transform shadow-lg uppercase tracking-widest text-sm items-center justify-center leading-[1.4] mt-2">
            Join Next BootCamp
          </button>
        </motion.div>

      </div>
      {/* Mobile Sticky CTA */}
      <div className="sticky bottom-0 left-0 right-0 p-[var(--gutter,16px)] bg-slate-950/90 backdrop-blur-md border-t border-emerald-500/10 z-50 lg:hidden flex justify-center pb-[max(1rem,env(safe-area-inset-bottom))] mt-auto">
        <button className="w-full min-h-[48px] py-3 px-4 bg-emerald-600 text-white font-bold rounded-xl shadow-lg active:scale-95 transition-transform text-sm uppercase tracking-widest leading-[1.4]">
          Join Next BootCamp
        </button>
      </div>
    </section>
  );
}
