"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { IoRibbonOutline, IoCheckmarkCircle, IoSearchOutline, IoShieldCheckmarkOutline, IoArrowBackOutline } from "react-icons/io5";
import CertificationIllustration from "@/components/marketing/CertificationIllustration";

export default function CertificationsClient({ programs, content }) {
  return (
    <section className="min-h-screen bg-slate-50 py-6 relative overflow-hidden flex flex-col">
      <div className="container-custom">
        <div className="flex flex-col lg:flex-row items-center gap-2 mb-4">
          {/* Hero Content */}
          <div className="lg:w-1/2 text-center lg:text-left pt-3">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-bold tracking-widest uppercase mb-2 leading-tight"
            >
              <IoRibbonOutline size={18} /> {content?.hero?.badge || "Official Validation"}
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="text-3xl sm:text-4xl lg:text-8xl font-black text-slate-900 leading-[1.1] mb-2"
            >
              {content?.hero?.title || "Certification"} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-600 animate-gradient-x">
                {content?.hero?.subtitle || "Programs"}
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="text-slate-600 text-lg md:text-xl leading-[1.6] max-w-2xl"
            >
              {content?.hero?.description || "Boost your resume instantly. Our certification programs assess your skills through rigorous practical exams."}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-2"
            >
              <Link
                href="/services/certifications/details"
                className="inline-flex items-center min-h-[48px] gap-1.5 text-sm font-black uppercase tracking-widest text-emerald-600 hover:text-indigo-600 transition-colors group leading-tight"
              >
                View Validation Manifest <IoArrowBackOutline className="rotate-180 group-hover:translate-x-1.5 transition-transform" />
              </Link>
            </motion.div>
          </div>

          {/* Creative Illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="lg:w-1/2 w-full"
          >
            <div className="relative group hover:scale-105 transition-transform duration-500">
              <div className="absolute inset-0 bg-emerald-600/10 blur-3xl rounded-[3rem] -z-10 animate-pulse"></div>
              <CertificationIllustration />
            </div>
          </motion.div>
        </div>

        <div className="flex overflow-x-auto snap-x snap-mandatory gap-2 pb-2 md:grid md:grid-cols-2 lg:grid-cols-3 lg:gap-2 scrollbar-hide -mx-[var(--gutter)] px-[var(--gutter)]">
          {programs?.length > 0 ? (
            programs.map((prog, i) => (
              <motion.div
                key={prog._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="min-w-[85vw] sm:min-w-[300px] md:w-auto snap-center shrink-0 bg-white rounded-[2rem] p-4 border border-slate-100 shadow-xl shadow-slate-200/50 hover:shadow-2xl transition-all relative overflow-hidden group border-b-[6px] border-b-blue-600"
              >
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-2xl text-blue-600 mb-3 group-hover:rotate-6 transition-transform">
                  <IoRibbonOutline />
                </div>
                <p className="text-sm font-black uppercase tracking-widest text-blue-500 mb-1 leading-tight">{prog.badgeText}</p>
                <h2 className="text-2xl font-black text-slate-900 mb-1 leading-[1.1]">{prog.title}</h2>
                <p className="text-slate-500 text-sm font-light leading-[1.6] mb-3">{prog.description}</p>

                <div className="space-y-1.5 mb-4 h-24 overflow-hidden">
                  {prog.features?.map((f, idx) => (
                    <div key={idx} className="flex items-center gap-1.5 text-sm font-black text-slate-400 uppercase tracking-widest leading-tight">
                      <IoCheckmarkCircle className="text-blue-500 text-base shrink-0" />
                      {f}
                    </div>
                  ))}
                </div>

                <button className="w-full min-h-[48px] py-2 px-3 bg-slate-900 text-white rounded-xl font-black uppercase tracking-widest text-base hover:bg-black transition-colors focus-visible:ring-4 focus-visible:ring-blue-500 shadow-md active:scale-95 leading-tight">
                  Apply for Assessment
                </button>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full py-8 bg-white rounded-[2rem] border border-slate-100 text-center shadow-lg shadow-slate-100">
              <IoSearchOutline className="text-5xl text-slate-100 mx-auto mb-2" />
              <p className="text-slate-300 font-black uppercase tracking-widest leading-tight">No Active Validation Programs</p>
              <p className="text-slate-400 text-sm mt-1 leading-[1.6]">New certification cohorts are launching soon.</p>
            </div>
          )}
        </div>

        {/* Unified Verification CTA */}
        <div className="mt-6 text-center bg-white rounded-[3rem] p-5 lg:p-8 shadow-xl border border-slate-50 relative overflow-hidden">
          <div className="hidden md:block absolute top-0 right-0 w-[400px] h-[400px] bg-blue-50 rounded-full blur-[100px] opacity-60 -translate-y-1/2 translate-x-1/2"></div>
          <div className="relative z-10">
            <IoShieldCheckmarkOutline className="text-6xl text-blue-600 mb-4 mx-auto" />
            <h3 className="text-4xl lg:text-5xl font-black mb-3 leading-none text-slate-900">Industry-Grade <br />Verification.</h3>
            <p className="text-slate-500 text-lg font-light mb-5 max-w-2xl mx-auto leading-[1.6]">Employers can verify our student credentials directly through our localized, high-authority registry.</p>
            <button className="hidden lg:inline-flex min-h-[48px] px-6 py-3 bg-slate-900 text-white font-black rounded-xl hover:bg-black transition-colors focus-visible:ring-4 focus-visible:ring-blue-500 uppercase tracking-widest text-base shadow-lg active:scale-95 leading-tight items-center justify-center">
              Access Student Registry
            </button>
          </div>
        </div>
      </div>
      {/* Mobile Sticky CTA */}
      <div className="sticky bottom-[0] left-0 right-0 px-[var(--gutter,16px)] pt-3 pb-[max(12px,env(safe-area-inset-bottom))] bg-white/90 backdrop-blur-md border-t border-slate-200 z-[90] lg:hidden flex justify-center mt-auto">
        <button className="w-full max-w-sm min-h-[48px] py-2 px-3 bg-slate-900 text-white font-bold rounded-xl shadow-md active:scale-95 transition-transform text-base uppercase tracking-widest leading-tight">
          Access Registry
        </button>
      </div>
    </section>
  );
}
