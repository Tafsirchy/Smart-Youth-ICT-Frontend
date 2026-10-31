"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  IoRibbonOutline,
  IoCheckmarkCircle,
  IoSearchOutline,
  IoShieldCheckmarkOutline,
  IoArrowBackOutline,
} from "react-icons/io5";

export default function CertificationsClient({ programs, content }) {
  return (
    <section className="min-h-screen bg-white flex flex-col">
      <div className="fixed inset-0 bg-[radial-gradient(#0F172A08_1px,transparent_1px)] [background-size:22px_22px] pointer-events-none z-0" />

      <div className="relative z-10 flex flex-col flex-1">

        {/* ── Hero ── */}
        <div className="border-b border-slate-100">
          <div className="container-custom pt-10 sm:pt-14 pb-8 flex flex-col items-center text-center gap-3 max-w-2xl mx-auto">

            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-brand-pink/8 border border-brand-pink/25 text-brand-pink text-[10px] font-black uppercase tracking-widest rounded-full leading-[1.4]"
            >
              <span className="h-1.5 w-1.5 bg-brand-pink rounded-full shrink-0" />
              {content?.hero?.badge || "Official Validation"}
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08 }}
              className="flex flex-col gap-1"
            >
              <span className="text-xl sm:text-2xl md:text-3xl font-black text-slate-900 leading-[1.2] whitespace-nowrap">
                {content?.hero?.title || "Professional Certifications"}
              </span>
              <span className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-extrabold text-brand-green leading-[1.2]">
                {content?.hero?.subtitle || "Verified Technical Standards"}
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="text-slate-400 text-sm leading-[1.6] line-clamp-2 max-w-md"
            >
              {content?.hero?.description ||
                "Boost your resume instantly. Our certification programs assess your skills through rigorous practical exams."}
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.22 }}
            >
              <Link
                href="/services/certifications/details"
                className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-brand-green hover:text-brand-pink transition-colors group leading-[1.4]"
              >
                View Validation Manifest{" "}
                <IoArrowBackOutline className="rotate-180 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>

          </div>
        </div>

        {/* ── Program Cards ── */}
        <div className="container-custom py-6">
          <div className="flex overflow-x-auto snap-x snap-mandatory gap-3 pb-1 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-3 scrollbar-hide -mx-[var(--gutter)] px-[var(--gutter)]">
            {programs?.length > 0 ? (
              programs.map((prog, i) => (
                <motion.div
                  key={prog._id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  className="min-w-[82vw] sm:min-w-[280px] md:w-auto snap-center shrink-0 bg-white rounded-xl border border-slate-200 p-4 hover:border-brand-pink/30 hover:shadow-md transition-all relative overflow-hidden group flex flex-col"
                >
                  <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-brand-pink to-brand-green rounded-t-xl" />

                  <div className="flex items-start gap-3 mt-1 mb-2.5">
                    <div className="w-9 h-9 bg-brand-pink/8 flex items-center justify-center text-lg text-brand-pink rounded-lg shrink-0 group-hover:rotate-6 transition-transform">
                      <IoRibbonOutline />
                    </div>
                    <div className="flex flex-col gap-0.5 min-w-0">
                      <p className="text-[10px] font-black uppercase tracking-widest text-brand-pink leading-[1.4]">
                        {prog.badgeText}
                      </p>
                      <h2 className="text-base font-black text-slate-900 leading-[1.2]">
                        {prog.title}
                      </h2>
                    </div>
                  </div>

                  <p className="text-slate-500 text-[13px] leading-[1.6] mb-2.5 flex-1">
                    {prog.description}
                  </p>

                  <div className="space-y-1 mb-3 border-t border-slate-100 pt-2.5">
                    {prog.features?.slice(0, 4).map((f, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-500 uppercase tracking-wider leading-[1.4]"
                      >
                        <IoCheckmarkCircle className="text-brand-green text-sm shrink-0" />
                        {f}
                      </div>
                    ))}
                  </div>

                  <button className="w-full min-h-[36px] py-1.5 px-3 bg-slate-900 text-white font-black uppercase tracking-widest text-[11px] hover:bg-slate-800 transition-colors active:scale-95 leading-[1.4] rounded-lg">
                    Apply for Assessment
                  </button>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full py-10 bg-slate-50 border border-slate-100 text-center rounded-xl">
                <IoSearchOutline className="text-4xl text-slate-300 mx-auto mb-2" />
                <p className="text-slate-400 font-black uppercase tracking-widest text-xs leading-[1.4]">
                  No Active Validation Programs
                </p>
                <p className="text-slate-400 text-xs mt-1 leading-[1.6]">
                  New certification cohorts are launching soon.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* ── Verification CTA Strip ── */}
        <div className="container-custom pb-6">
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-5 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-green/6 blur-[60px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="w-10 h-10 bg-brand-green/10 rounded-xl flex items-center justify-center shrink-0">
                <IoShieldCheckmarkOutline className="text-xl text-brand-green" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-base font-black text-slate-900 leading-[1.2] mb-0.5">
                  Industry-Grade Verification
                </h3>
                <p className="text-slate-500 text-sm leading-[1.6]">
                  Employers can verify our student credentials directly through our localized, high-authority registry.
                </p>
              </div>
              <button className="hidden lg:inline-flex shrink-0 min-h-[36px] px-5 py-1.5 bg-slate-900 text-white font-black hover:bg-slate-800 transition-colors uppercase tracking-widest text-[11px] active:scale-95 leading-[1.4] items-center justify-center rounded-lg">
                Access Registry
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* Mobile Sticky CTA */}
      <div className="sticky bottom-0 left-0 right-0 px-4 pt-2 pb-[max(10px,env(safe-area-inset-bottom))] bg-white/92 backdrop-blur-md border-t border-slate-200 z-50 lg:hidden">
        <button className="w-full min-h-[40px] py-2 bg-slate-900 text-white font-bold active:scale-95 transition-transform text-xs uppercase tracking-widest leading-[1.4] rounded-lg">
          Access Registry
        </button>
      </div>
    </section>
  );
}
