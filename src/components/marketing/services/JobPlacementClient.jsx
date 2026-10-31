"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  IoBriefcaseOutline,
  IoFlaskOutline,
  IoChatbubblesOutline,
  IoSearchOutline,
  IoPulseOutline,
  IoArrowBackOutline,
} from "react-icons/io5";

export default function JobPlacementClient({ data, content }) {
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
              {content?.hero?.badge || "Your Career Launchpad"}
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08 }}
              className="flex flex-col gap-1"
            >
              <span className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 leading-[1.2]">
                {content?.hero?.title || "Job Placement"}
              </span>
              <span className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-extrabold text-brand-green leading-[1.2] whitespace-nowrap">
                {content?.hero?.subtitle || "Support Cell"}
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="text-slate-400 text-sm md:text-base leading-[1.6] line-clamp-2 max-w-md"
            >
              {content?.hero?.description ||
                "Graduation is just the beginning. Our dedicated placement cell actively maps our top talent with hiring partners."}
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.22 }}
            >
              <Link
                href="/services/job-placement/details"
                className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-brand-green hover:text-brand-pink transition-colors group leading-[1.4]"
              >
                View Placement Manifest{" "}
                <IoArrowBackOutline className="rotate-180 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </div>

        {/* ── Stats Bar ── */}
        {(data?.stats?.partners || data?.stats?.rate) && (
          <div className="border-b border-slate-100 bg-slate-50">
            <div className="container-custom py-4">
              <div className="flex items-center justify-center gap-8 sm:gap-16 flex-wrap">
                {data?.stats?.partners && (
                  <div className="text-center">
                    <p className="text-2xl sm:text-3xl font-black text-brand-pink leading-[1.1]">
                      {data.stats.partners}
                    </p>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 leading-[1.4] mt-0.5">
                      Hiring Partners
                    </p>
                  </div>
                )}
                {data?.stats?.rate && (
                  <div className="text-center">
                    <p className="text-2xl sm:text-3xl font-black text-brand-green leading-[1.1]">
                      {data.stats.rate}
                    </p>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 leading-[1.4] mt-0.5">
                      Placement Rate
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ── Placement Track Classifications ── */}
        <div className="container-custom py-6">
          {data?.placements?.length > 0 ? (
            <>
              <h2 className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-4 leading-[1.4]">
                Placement Track Classifications
              </h2>
              <div className="flex overflow-x-auto snap-x snap-mandatory gap-3 pb-1 lg:grid lg:grid-cols-3 lg:gap-3 scrollbar-hide -mx-[var(--gutter)] px-[var(--gutter)]">
                {data.placements.map((p, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.07 }}
                    className="min-w-[82vw] sm:min-w-[280px] lg:w-auto snap-center shrink-0 bg-white border border-slate-200 rounded-xl p-4 hover:border-brand-pink/30 hover:shadow-md transition-all relative overflow-hidden group flex flex-col gap-3"
                  >
                    <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-brand-pink to-brand-green rounded-t-xl" />

                    <div className="flex items-start gap-3 mt-1">
                      <div className={`w-9 h-9 rounded-lg ${p.color} text-white flex items-center justify-center text-lg shrink-0 group-hover:scale-110 transition-transform`}>
                        <IoBriefcaseOutline />
                      </div>
                      <div className="flex flex-col gap-0.5 min-w-0">
                        <p className="text-[10px] font-black uppercase tracking-widest text-brand-pink leading-[1.4]">
                          {p.type}
                        </p>
                        <h3 className="text-base font-black text-slate-900 leading-[1.2]">
                          {p.title}
                        </h3>
                      </div>
                    </div>

                    <p className="text-slate-500 text-[13px] leading-[1.6] line-clamp-3 flex-1">
                      {p.desc}
                    </p>

                    <div className="pt-2.5 border-t border-slate-100">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5 leading-[1.4]">
                        Avg. Entry Package
                      </p>
                      <p className="text-lg font-black text-slate-900 leading-[1.2]">
                        {p.avgSalary}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </>
          ) : (
            <div className="py-10 bg-slate-50 border border-slate-100 rounded-xl text-center">
              <IoPulseOutline className="text-4xl text-slate-300 mx-auto mb-2 animate-pulse" />
              <p className="text-slate-400 text-xs font-black uppercase tracking-widest leading-[1.4]">
                Job Channels Ready
              </p>
            </div>
          )}
        </div>

        {/* ── Recruitment Lifecycle ── */}
        {data?.lifecycle?.length > 0 && (
          <div className="border-t border-slate-100 bg-slate-50">
            <div className="container-custom py-6 max-w-3xl mx-auto">
              <h2 className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-4 leading-[1.4]">
                The Recruitment <span className="text-brand-green">Lifecycle</span>
              </h2>
              <div className="flex flex-col gap-3 relative">
                <div className="absolute left-[17px] top-8 bottom-8 w-px bg-slate-200 hidden md:block" />
                {data.lifecycle.map((l, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.07 }}
                    className="flex flex-col md:flex-row gap-3 items-start relative z-10"
                  >
                    <div className="w-9 h-9 bg-brand-pink flex items-center justify-center text-white font-black shrink-0 rounded-lg text-sm leading-none">
                      {i + 1}
                    </div>
                    <div className="flex-1 bg-white border border-slate-200 rounded-xl p-3.5 hover:border-brand-pink/30 transition-colors">
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-0.5">
                        <h3 className="text-sm font-black text-slate-900 leading-[1.4]">
                          {l.title}
                        </h3>
                        {l.step && (
                          <span className="text-[10px] font-black text-brand-green uppercase tracking-widest bg-brand-green/8 border border-brand-green/20 px-2 py-0.5 leading-[1.4] rounded-full">
                            {l.step}
                          </span>
                        )}
                      </div>
                      <p className="text-slate-500 text-[13px] leading-[1.6]">
                        {l.d}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── Career Launch Labs ── */}
        <div className="container-custom py-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-xl border border-slate-200 bg-white overflow-hidden"
          >
            <div className="flex flex-col lg:flex-row">
              {/* Content */}
              <div className="flex-1 p-5 sm:p-6 flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-brand-pink/8 border border-brand-pink/20 rounded-xl flex items-center justify-center shrink-0">
                    <IoFlaskOutline className="text-xl text-brand-pink" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 leading-[1.4]">
                      Preparation Facility
                    </p>
                    <h2 className="text-lg sm:text-xl font-black text-slate-900 leading-[1.2]">
                      Career Launch Labs
                    </h2>
                  </div>
                </div>

                <p className="text-slate-500 text-sm leading-[1.6]">
                  We don't just refer — we prepare. Our physically simulated interview labs provide you with the exact pressure-test you need before facing real hiring boards.
                </p>

                <div className="grid grid-cols-2 gap-3 pt-1 border-t border-slate-100">
                  <div className="flex flex-col gap-1">
                    <h4 className="font-bold text-slate-900 flex items-center gap-1.5 leading-[1.4] text-sm">
                      <IoChatbubblesOutline className="text-brand-green shrink-0" />
                      Mock HR Rounds
                    </h4>
                    <p className="text-[11px] text-slate-400 leading-[1.5]">
                      Live practice with senior tech recruiters.
                    </p>
                  </div>
                  <div className="flex flex-col gap-1">
                    <h4 className="font-bold text-slate-900 flex items-center gap-1.5 leading-[1.4] text-sm">
                      <IoSearchOutline className="text-brand-green shrink-0" />
                      Resume Audit
                    </h4>
                    <p className="text-[11px] text-slate-400 leading-[1.5]">
                      Personalized refinement to bypass global ATS filters.
                    </p>
                  </div>
                </div>

                <button className="hidden lg:inline-flex self-start min-h-[36px] px-5 py-1.5 bg-slate-900 text-white font-black hover:bg-slate-800 transition-colors uppercase tracking-widest text-[11px] active:scale-95 leading-[1.4] items-center justify-center rounded-lg">
                  Partner With Our Placement Cell
                </button>
              </div>

              {/* Image — desktop only */}
              <div className="hidden lg:block relative w-[320px] shrink-0">
                <div className="absolute top-0 left-0 w-px h-full bg-slate-100" />
                <Image
                  src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=640&h=480&fit=crop"
                  alt="Interview lab collaboration"
                  fill
                  sizes="320px"
                  loading="lazy"
                  decoding="async"
                  onError={(e) => { e.target.srcset = ""; e.target.src = "/images/placeholder.png"; }}
                  className="object-cover grayscale opacity-60"
                />
              </div>
            </div>
          </motion.div>
        </div>

      </div>

      {/* Mobile Sticky CTA */}
      <div className="sticky bottom-0 left-0 right-0 px-4 pt-2 pb-[max(10px,env(safe-area-inset-bottom))] bg-white/92 backdrop-blur-md border-t border-slate-200 z-50 lg:hidden">
        <button className="w-full min-h-[40px] py-2 bg-brand-pink text-white font-bold active:scale-95 transition-transform text-xs uppercase tracking-widest leading-[1.4] rounded-lg shadow-sm">
          Partner With Us
        </button>
      </div>
    </section>
  );
}
