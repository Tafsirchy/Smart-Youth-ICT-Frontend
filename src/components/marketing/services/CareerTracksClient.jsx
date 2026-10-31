"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { IoTimerOutline, IoBriefcaseOutline, IoSearchOutline, IoArrowBackOutline } from "react-icons/io5";

export default function CareerTracksClient({ tracks = [], content = {} }) {
  return (
    <section className="min-h-screen bg-white overflow-hidden relative flex flex-col">
      {/* subtle grid texture */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0F172A06_1px,transparent_1px),linear-gradient(to_bottom,#0F172A06_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      {/* ── Hero ── */}
      <div className="relative pt-10 sm:pt-12 pb-6 px-4 border-b border-slate-100">
        <div className="container-custom relative z-10 flex flex-col items-center text-center">
          <div className="max-w-3xl w-full flex flex-col items-center gap-2.5">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 px-3 py-1 border border-brand-pink/30 text-brand-pink text-xs font-bold uppercase tracking-widest bg-brand-pink/5 rounded-full leading-[1.4]"
            >
              <span className="flex h-1.5 w-1.5 bg-brand-pink rounded-full shrink-0" />
              {content?.hero?.badge || "Zero To Hero"}
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 leading-[1.2]"
            >
              {content?.hero?.title || "Career Tracks"}
              <span className="block text-xl sm:text-2xl md:text-3xl font-bold text-brand-pink mt-0.5 leading-[1.3]">
                {content?.hero?.subtitle || "Full-Stack, AI, SMM & DevOps"}
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-slate-500 text-base md:text-lg leading-[1.6] font-light max-w-2xl line-clamp-2"
            >
              {content?.hero?.description || "Select a track, follow our rigorously tested curriculum, and launch your tech career methodically."}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Link
                href="/services/career-tracks/details"
                className="inline-flex items-center min-h-[36px] gap-1.5 text-xs font-black uppercase tracking-widest text-brand-green hover:text-brand-pink transition-colors group leading-[1.4]"
              >
                View Trajectory Manifest <IoArrowBackOutline className="rotate-180 group-hover:translate-x-1.5 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ── Tracks ── */}
      <div className="container-custom py-6 md:py-8">
        <div className="flex flex-col gap-4">
          {tracks.length > 0 ? (
            tracks.map((track, i) => (
              <motion.div
                key={track._id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                className="w-full bg-white border border-slate-200 rounded-xl p-5 sm:p-6 relative overflow-hidden group hover:border-brand-pink/30 hover:shadow-md transition-all duration-300"
              >
                {/* top accent bar using track color */}
                <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${track.color} opacity-90 rounded-t-xl`} />

                <div className="grid lg:grid-cols-12 gap-4 pt-1">
                  {/* Left — info */}
                  <div className="lg:col-span-5 flex flex-col gap-3">
                    <h2 className="text-xl sm:text-2xl font-black text-slate-900 leading-[1.2]">{track.title}</h2>
                    <p className="text-sm text-slate-500 leading-[1.6] font-light">{track.description}</p>

                    <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row gap-4">
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-1.5 mb-1 leading-[1.4]">
                          <IoTimerOutline /> Duration
                        </p>
                        <p className="text-slate-900 text-base font-bold leading-[1.4]">{track.duration}</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-1.5 mb-1 leading-[1.4]">
                          <IoBriefcaseOutline /> Outcome
                        </p>
                        <p className={`text-transparent bg-clip-text bg-gradient-to-r ${track.color} text-base font-bold leading-[1.4]`}>{track.outcome}</p>
                      </div>
                    </div>

                    <button className="w-full min-h-[38px] py-2 mt-1 bg-slate-50 border border-slate-200 text-slate-700 font-bold hover:border-brand-pink/30 hover:text-brand-pink transition-colors text-xs uppercase tracking-widest rounded-lg leading-[1.4]">
                      Download Syllabus PDF
                    </button>
                  </div>

                  {/* Right — phases */}
                  <div className="lg:col-span-7 bg-slate-50 border border-slate-100 rounded-lg p-4 relative">
                    <div className="space-y-3 relative z-10">
                      {[
                        { phase: "Phase 1: Basics", val: track.phase1 },
                        { phase: "Phase 2: Core", val: track.phase2 },
                        { phase: "Phase 3: Deep Dive", val: track.phase3 },
                        { phase: "Phase 4: Launch", val: track.phase4 },
                      ].map((step, idx) => (
                        <div key={idx} className="flex gap-3 items-start relative pb-3">
                          {idx !== 3 && (
                            <div className={`absolute left-3.5 top-8 bottom-0 w-px ${track.bg} opacity-30`} />
                          )}
                          <div className={`w-7 h-7 rounded-full ${track.bg} flex items-center justify-center shrink-0 z-10 text-white font-black text-xs leading-none`}>
                            {idx + 1}
                          </div>
                          <div>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5 leading-[1.4]">{step.phase}</p>
                            <p className="text-slate-800 font-medium text-sm leading-[1.5]">{step.val}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="text-center py-12 bg-slate-50 border border-slate-100 rounded-xl w-full">
              <IoSearchOutline className="text-4xl text-slate-300 mx-auto mb-3" />
              <p className="text-slate-400 font-black uppercase tracking-widest text-xs leading-[1.4]">No Active Tracks Found</p>
            </div>
          )}
        </div>
      </div>

      {/* Mobile sticky CTA */}
      <div className="sticky bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-slate-200 z-50 lg:hidden pb-[max(0.625rem,env(safe-area-inset-bottom))] mt-auto">
        <div className="container-custom py-2.5 flex justify-center">
          <button className="w-full max-w-sm min-h-[40px] py-2.5 bg-slate-900 text-white font-bold shadow-lg active:scale-95 transition-transform text-xs uppercase tracking-widest rounded-lg leading-[1.4]">
            Download PDF
          </button>
        </div>
      </div>
    </section>
  );
}
