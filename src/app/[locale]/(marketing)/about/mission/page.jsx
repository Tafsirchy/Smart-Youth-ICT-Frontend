"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  IoRocketOutline,
  IoEyeOutline,
  IoCheckmarkCircle,
  IoFlashOutline,
  IoShieldCheckmarkOutline,
  IoGlobeOutline,
  IoLayersOutline,
  IoSparkles,
} from "react-icons/io5";

const CORE_TENETS = [
  { label: "Tactical Execution", icon: IoFlashOutline, desc: "Action over theory" },
  { label: "Industry Aligned", icon: IoShieldCheckmarkOutline, desc: "Market-ready skills" },
  { label: "Global Reach", icon: IoGlobeOutline, desc: "Remote work readiness" },
  { label: "Community Driven", icon: IoLayersOutline, desc: "Peer-to-peer growth" },
];

const MISSION_POINTS = [
  {
    title: "Project-First Immersion",
    detail: "Deliver intensive, project-first training environments that simulate real production workflows.",
    tag: "Hands-on",
  },
  {
    title: "Mentorship Community",
    detail: "Foster a highly supportive peer and mentor learning community with round-the-clock guidance.",
    tag: "Collaborative",
  },
  {
    title: "Outcome-Driven Careers",
    detail: "Ensure remarkably high career and freelancing success rates with vetted portfolio deliverables.",
    tag: "High ROI",
  },
];

const VISION_POINTS = [
  {
    title: "Global Tech Authority",
    detail: "Attain global recognition for sustainable tech excellence and cutting-edge curriculum.",
    tag: "Standard",
  },
  {
    title: "Digital Independence",
    detail: "Empower mass remote work adaptation and digital independence for the next generation.",
    tag: "Empowerment",
  },
  {
    title: "Self-Sustaining Ecosystem",
    detail: "Build a thriving, self-sustaining ecosystem of top tech talent driving modern enterprises.",
    tag: "Long-term",
  },
];

export default function MissionVisionPage() {
  const [activeTab, setActiveTab] = useState("both"); // "both" | "mission" | "vision"

  return (
    <section className="min-h-screen bg-slate-50 pt-12 sm:pt-18 pb-14 md:pb-16 flex flex-col font-sans relative">
      <div className="container-custom relative z-10">
        {/* Compact Header */}
        <div className="max-w-4xl mx-auto text-center mb-6 md:mb-8">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200/90 shadow-xs mb-3"
          >
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-green opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-green" />
            </span>
            <span className="text-[11px] font-black uppercase tracking-wider text-slate-700">
              Strategic Blueprint
            </span>
            <span className="text-slate-300">|</span>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              Core Principles
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 leading-[1.2] mb-2.5 tracking-tight"
          >
            Our Mission &amp;{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-green via-teal-500 to-brand-pink">
              Vision.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-slate-600 text-sm md:text-base leading-[1.6] font-normal max-w-3xl mx-auto"
          >
            We operate with absolute clarity and an aggressive focus on execution.<br className="hidden sm:inline" />{" "}
            Here is the dual-engine blueprint that drives us forward every single day.
          </motion.p>

          {/* Perspective Switcher */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.15 }}
            className="inline-flex p-1 mt-4 rounded-xl bg-slate-200/70 border border-slate-300/60"
          >
            <button
              onClick={() => setActiveTab("both")}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all duration-200 ${
                activeTab === "both"
                  ? "bg-white text-slate-900 shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Dual Engine View
            </button>
            <button
              onClick={() => setActiveTab("mission")}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all duration-200 flex items-center gap-1.5 ${
                activeTab === "mission"
                  ? "bg-brand-green text-white shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <IoRocketOutline size={13} />
              Mission Focus
            </button>
            <button
              onClick={() => setActiveTab("vision")}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all duration-200 flex items-center gap-1.5 ${
                activeTab === "vision"
                  ? "bg-brand-pink text-white shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <IoEyeOutline size={13} />
              Vision Horizon
            </button>
          </motion.div>
        </div>

        {/* Dynamic Dual-Card Grid */}
        <div className="max-w-5xl mx-auto mb-8 md:mb-10">
          <AnimatePresence mode="wait">
            <div
              className={`grid gap-4 sm:gap-6 transition-all duration-300 ${
                activeTab === "both" ? "lg:grid-cols-2" : "grid-cols-1 max-w-3xl mx-auto"
              }`}
            >
              {/* Mission Pillar */}
              {(activeTab === "both" || activeTab === "mission") && (
                <motion.div
                  key="mission-card"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.35 }}
                  whileHover={{ y: -3 }}
                  className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-7 shadow-xs hover:shadow-lg hover:border-brand-green/40 transition-all duration-300 flex flex-col group"
                >
                  {/* Header Strip */}
                  <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-slate-100">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-200/70 text-brand-green flex items-center justify-center shadow-xs group-hover:rotate-6 transition-transform">
                        <IoRocketOutline size={18} />
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-[10px] font-black uppercase tracking-wider text-brand-green">
                            Engine 01
                          </span>
                          <span className="text-slate-300">â€¢</span>
                          <span className="text-[11px] font-bold text-slate-500">
                            Present Reality
                          </span>
                        </div>
                        <h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight leading-none mt-0.5">
                          Our Mission
                        </h2>
                      </div>
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-emerald-800 bg-emerald-50 border border-emerald-200/80 px-2 py-0.5 rounded-md">
                      Execution
                    </span>
                  </div>

                  {/* Mission Lead Statement */}
                  <div className="p-3.5 rounded-xl bg-slate-50/80 border border-slate-100 mb-4">
                    <p className="text-slate-700 text-xs sm:text-sm leading-[1.6] font-medium">
                      To equip youths and professionals with in-demand, practical digital skills that directly map to industry needs through project-based learning, accessible mentorship, and real-world execution.
                    </p>
                  </div>

                  {/* Implementation Vectors */}
                  <div className="space-y-2.5 flex-1">
                    <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                      Core Implementation Vectors
                    </p>
                    {MISSION_POINTS.map((pt, i) => (
                      <div
                        key={i}
                        className="p-2.5 rounded-xl border border-slate-100 bg-white hover:border-emerald-200/70 hover:bg-emerald-50/30 transition-all duration-200 flex items-start gap-2.5"
                      >
                        <IoCheckmarkCircle className="text-brand-green shrink-0 mt-0.5" size={16} />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-1 mb-0.5">
                            <span className="text-xs font-bold text-slate-900 leading-tight">
                              {pt.title}
                            </span>
                            <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.2 rounded bg-slate-100 text-slate-600">
                              {pt.tag}
                            </span>
                          </div>
                          <p className="text-slate-500 text-[11px] sm:text-xs leading-[1.5]">
                            {pt.detail}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Card Footer */}
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-medium">
                    <span className="flex items-center gap-1 text-brand-green font-bold text-[10px] uppercase tracking-wider">
                      <IoSparkles size={12} /> Real-World Applied
                    </span>
                    <span className="text-slate-400 text-[10px]">Zero Vanity Theory</span>
                  </div>
                </motion.div>
              )}

              {/* Vision Pillar */}
              {(activeTab === "both" || activeTab === "vision") && (
                <motion.div
                  key="vision-card"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.35, delay: activeTab === "both" ? 0.08 : 0 }}
                  whileHover={{ y: -3 }}
                  className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-7 shadow-xs hover:shadow-lg hover:border-brand-pink/40 transition-all duration-300 flex flex-col group"
                >
                  {/* Header Strip */}
                  <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-slate-100">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-xl bg-rose-50 border border-rose-200/70 text-brand-pink flex items-center justify-center shadow-xs group-hover:rotate-6 transition-transform">
                        <IoEyeOutline size={18} />
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-[10px] font-black uppercase tracking-wider text-brand-pink">
                            Horizon 02
                          </span>
                          <span className="text-slate-300">â€¢</span>
                          <span className="text-[11px] font-bold text-slate-500">
                            Future Destination
                          </span>
                        </div>
                        <h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight leading-none mt-0.5">
                          Our Vision
                        </h2>
                      </div>
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-brand-pink bg-rose-50 border border-rose-200/80 px-2 py-0.5 rounded-md">
                      Impact
                    </span>
                  </div>

                  {/* Vision Lead Statement */}
                  <div className="p-3.5 rounded-xl bg-slate-50/80 border border-slate-100 mb-4">
                    <p className="text-slate-700 text-xs sm:text-sm leading-[1.6] font-medium">
                      To become the leading catalyst for transforming youth potential into digital excellence, creating an empowered global workforce of skilled, independent tech professionals and digital entrepreneurs.
                    </p>
                  </div>

                  {/* Future Benchmarks */}
                  <div className="space-y-2.5 flex-1">
                    <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                      Long-Term Milestones
                    </p>
                    {VISION_POINTS.map((pt, i) => (
                      <div
                        key={i}
                        className="p-2.5 rounded-xl border border-slate-100 bg-white hover:border-rose-200/70 hover:bg-rose-50/30 transition-all duration-200 flex items-start gap-2.5"
                      >
                        <IoCheckmarkCircle className="text-brand-pink shrink-0 mt-0.5" size={16} />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-1 mb-0.5">
                            <span className="text-xs font-bold text-slate-900 leading-tight">
                              {pt.title}
                            </span>
                            <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.2 rounded bg-slate-100 text-slate-600">
                              {pt.tag}
                            </span>
                          </div>
                          <p className="text-slate-500 text-[11px] sm:text-xs leading-[1.5]">
                            {pt.detail}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Card Footer */}
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-medium">
                    <span className="flex items-center gap-1 text-brand-pink font-bold text-[10px] uppercase tracking-wider">
                      <IoGlobeOutline size={12} /> Global Impact
                    </span>
                    <span className="text-slate-400 text-[10px]">Self-Sustaining Ecosystem</span>
                  </div>
                </motion.div>
              )}
            </div>
          </AnimatePresence>
        </div>

        {/* Core Tenets Matrix (Bottom Dense Strip) */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="max-w-5xl mx-auto"
        >
          <div className="bg-white border border-slate-200/80 rounded-2xl p-4 sm:p-5 shadow-xs">
            <div className="flex items-center justify-between mb-3 border-b border-slate-100 pb-2">
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                Core Operating Tenets
              </span>
              <span className="text-[11px] font-bold text-slate-600 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-green" />
                Continuous Evolution
              </span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {CORE_TENETS.map((t, idx) => {
                const Icon = t.icon;
                return (
                  <div
                    key={idx}
                    className="flex items-center gap-2.5 p-2 rounded-xl bg-slate-50/80 border border-slate-100 hover:border-slate-300/80 transition-colors"
                  >
                    <div className="w-7 h-7 rounded-lg bg-white border border-slate-200/70 text-slate-700 flex items-center justify-center shrink-0 shadow-xs">
                      <Icon size={14} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-slate-900 truncate leading-none">
                        {t.label}
                      </p>
                      <p className="text-[10px] text-slate-500 font-medium truncate mt-0.5">
                        {t.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Mobile Sticky CTA */}
      <div className="fixed bottom-0 left-0 w-full p-3 bg-white/95 backdrop-blur-md border-t border-slate-200 z-50 md:hidden flex items-center justify-between shadow-[0_-10px_40px_rgba(0,0,0,0.05)] pb-[max(0.75rem,env(safe-area-inset-bottom))]">
        <div>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-[1.4]">Next Step</p>
          <p className="text-slate-900 font-bold text-sm leading-[1.4]">Join the Program</p>
        </div>
        <button className="px-5 py-2.5 bg-brand-green text-white font-bold text-[10px] uppercase tracking-widest shadow-md shadow-brand-green/30 rounded-md leading-[1.4]">
          Apply Now
        </button>
      </div>
    </section>
  );
}
