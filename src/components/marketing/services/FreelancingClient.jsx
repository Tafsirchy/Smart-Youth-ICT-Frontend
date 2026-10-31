"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  IoGlobeOutline,
  IoCheckmarkCircle,
  IoShieldCheckmarkOutline,
  IoSearchOutline,
  IoArrowBackOutline,
  IoRocketOutline,
} from "react-icons/io5";

export default function FreelancingClient({ data, content }) {
  return (
    <section className="min-h-screen bg-white flex flex-col">
      {/* Dot grid texture */}
      <div className="fixed inset-0 bg-[radial-gradient(#0F172A08_1px,transparent_1px)] [background-size:22px_22px] pointer-events-none z-0" />

      <div className="relative z-10 flex flex-col flex-1">

        {/* ── Hero ── */}
        <div className="border-b border-slate-100">
          <div className="container-custom pt-10 sm:pt-12 pb-7 flex flex-col items-center text-center gap-2.5 max-w-2xl mx-auto">

            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-brand-pink/8 border border-brand-pink/25 text-brand-pink text-[10px] font-black uppercase tracking-widest rounded-full leading-[1.4]"
            >
              <span className="h-1.5 w-1.5 bg-brand-pink rounded-full shrink-0" />
              {content?.hero?.badge || "Digital Sovereignty"}
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08 }}
              className="flex flex-col gap-1"
            >
              <span className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 leading-[1.2]">
                {content?.hero?.title || "Freelancing"}
              </span>
              <span className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-extrabold text-brand-green leading-[1.2]">
                {content?.hero?.subtitle || "Success Training"}
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="text-slate-400 text-sm md:text-base leading-[1.6] line-clamp-2 max-w-md"
            >
              {content?.hero?.description || "Master the art of high-ticket client acquisition on global marketplaces."}
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.22 }}
            >
              <Link
                href="/services/freelancing/details"
                className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-brand-green hover:text-brand-pink transition-colors group leading-[1.4]"
              >
                View Market Manifest{" "}
                <IoArrowBackOutline className="rotate-180 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>

          </div>
        </div>

        {/* ── Marketplace Strategy Hubs ── */}
        <div className="container-custom py-6">
          {data?.classifications?.length > 0 ? (
            <>
              <h2 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-4 leading-[1.4]">
                Marketplace Strategy Hubs
              </h2>
              <div className="flex overflow-x-auto snap-x snap-mandatory gap-3 pb-1 lg:grid lg:grid-cols-3 lg:gap-3 scrollbar-hide -mx-[var(--gutter)] px-[var(--gutter)]">
                {data.classifications.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.07 }}
                    className="min-w-[82vw] sm:min-w-[280px] lg:w-auto snap-center shrink-0 bg-white border border-slate-200 rounded-xl p-4 hover:border-brand-pink/30 hover:shadow-md transition-all relative overflow-hidden group flex flex-col gap-3"
                  >
                    {/* top accent */}
                    <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-brand-pink to-brand-green rounded-t-xl" />

                    <div className="flex items-start gap-3 mt-1">
                      <div className={`w-9 h-9 rounded-lg ${item.color} text-white flex items-center justify-center text-lg shrink-0 group-hover:scale-110 transition-transform`}>
                        <IoGlobeOutline />
                      </div>
                      <div className="flex flex-col gap-0.5 min-w-0">
                        <p className="text-[10px] font-black uppercase tracking-widest text-brand-pink leading-[1.4]">
                          {item.type}
                        </p>
                        <h3 className="text-base font-black text-slate-900 leading-[1.2]">
                          {item.title}
                        </h3>
                      </div>
                    </div>

                    <p className="text-slate-500 text-[13px] leading-[1.6] flex-1">
                      {item.desc}
                    </p>

                    <div className="space-y-1 pt-2.5 border-t border-slate-100">
                      {item.features?.map((f, idx) => (
                        <div key={idx} className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-500 uppercase tracking-wider leading-[1.4]">
                          <IoCheckmarkCircle className="text-brand-green text-sm shrink-0" />
                          {f}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </>
          ) : (
            <div className="py-10 bg-slate-50 border border-slate-100 rounded-xl text-center">
              <IoSearchOutline className="text-4xl text-slate-300 mx-auto mb-2" />
              <p className="text-slate-400 text-xs font-black uppercase tracking-widest leading-[1.4]">
                Strategy Catalog Ready
              </p>
            </div>
          )}
        </div>

        {/* ── Mastery Roadmap ── */}
        {data?.phases?.length > 0 && (
          <div className="border-t border-slate-100 bg-slate-50">
            <div className="container-custom py-6 max-w-3xl mx-auto">
              <h2 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-4 leading-[1.4]">
                Mastery <span className="text-brand-green">Roadmap</span>
              </h2>
              <div className="flex flex-col gap-3 relative">
                {/* vertical connector */}
                <div className="absolute left-[17px] top-8 bottom-8 w-px bg-slate-200 hidden md:block" />
                {data.phases.map((p, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.07 }}
                    className="flex flex-col md:flex-row gap-3 items-start relative z-10"
                  >
                    <div className="w-9 h-9 bg-brand-green flex items-center justify-center text-white font-black shrink-0 rounded-lg text-sm leading-none">
                      {p.step}
                    </div>
                    <div className="flex-1 bg-white border border-slate-200 rounded-xl p-3.5 hover:border-brand-green/30 transition-colors">
                      <h3 className="text-sm font-black text-slate-900 leading-[1.4] mb-0.5">
                        {p.title}
                      </h3>
                      <p className="text-slate-500 text-[13px] leading-[1.6]">
                        {p.desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── Global Access CTA Banner ── */}
        <div className="container-custom py-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-xl border border-slate-200 bg-slate-50 p-5 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-green/5 blur-[60px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="w-10 h-10 bg-brand-green/10 rounded-xl flex items-center justify-center shrink-0">
                <IoShieldCheckmarkOutline className="text-xl text-brand-green" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-base font-black text-slate-900 leading-[1.2] mb-0.5">
                  Certified Global Freelance Expert
                </h3>
                <p className="text-slate-500 text-sm leading-[1.6]">
                  Receive a high-authority digital credential that proves your proficiency to clients across 180+ countries.
                </p>
              </div>
              <button className="hidden lg:inline-flex shrink-0 min-h-[36px] px-5 py-1.5 bg-slate-900 text-white font-black hover:bg-slate-800 transition-colors uppercase tracking-widest text-[11px] active:scale-95 leading-[1.4] items-center gap-1.5 justify-center rounded-lg">
                <IoRocketOutline className="text-sm" /> Join Next BootCamp
              </button>
            </div>
          </motion.div>
        </div>

      </div>

      {/* Mobile Sticky CTA */}
      <div className="sticky bottom-0 left-0 right-0 px-4 pt-2 pb-[max(10px,env(safe-area-inset-bottom))] bg-white/92 backdrop-blur-md border-t border-slate-200 z-50 lg:hidden">
        <button className="w-full min-h-[40px] py-2 bg-brand-green text-white font-bold active:scale-95 transition-transform text-xs uppercase tracking-widest leading-[1.4] rounded-lg shadow-sm">
          Join Next BootCamp
        </button>
      </div>
    </section>
  );
}
