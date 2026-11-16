"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  LuCloud,
  LuServer,
  LuCode,
  LuGlobe,
  LuBuilding2,
  LuBoxes,
  LuSmartphone,
  LuTablet,
  LuShieldCheck,
  LuLock,
  LuTerminal,
  LuCpu,
  LuBrainCircuit,
  LuSparkles,
} from "react-icons/lu";
import { LoopScribble, ArrowScribbleLong, DotGrid } from "./HeroDecorations";

// ─── 7 Core IT Solutions with Generated Vector Visuals & Telemetry ───────────
const IT_SOLUTIONS = [
  {
    id: "cloud",
    title: "Cloud & DevOps",
    shortTitle: "Cloud",
    badge: "99.9% Uptime",
    tag: "AWS • Edge Cloud",
    metric: "18ms Latency",
    codeSnippet: "aws::ec2 --live",
    color: "#0D9488",
    lightBg: "from-teal-50 via-teal-50/40 to-white",
    PrimaryIcon: LuCloud,
    SecondaryIcon: LuServer,
  },
  {
    id: "web",
    title: "Web Engineering",
    shortTitle: "Web Dev",
    badge: "Next.js • React",
    tag: "Modern Portals",
    metric: "100% Score",
    codeSnippet: "<Portal.Live />",
    color: "#2563EB",
    lightBg: "from-blue-50 via-blue-50/40 to-white",
    PrimaryIcon: LuCode,
    SecondaryIcon: LuGlobe,
  },
  {
    id: "enterprise",
    title: "Enterprise ERP",
    shortTitle: "ERP & POS",
    badge: "Multi-Branch",
    tag: "POS • Accounting",
    metric: "+48% Growth",
    codeSnippet: "erp.syncLive()",
    color: "#7C3AED",
    lightBg: "from-purple-50 via-purple-50/40 to-white",
    PrimaryIcon: LuBuilding2,
    SecondaryIcon: LuBoxes,
  },
  {
    id: "app",
    title: "Mobile Apps",
    shortTitle: "Mobile Apps",
    badge: "iOS & Android",
    tag: "Flutter • Native",
    metric: "60 FPS Native",
    codeSnippet: "buildWidget()",
    color: "#D97706",
    lightBg: "from-amber-50 via-amber-50/40 to-white",
    PrimaryIcon: LuSmartphone,
    SecondaryIcon: LuTablet,
  },
  {
    id: "cyber",
    title: "Cyber Security",
    shortTitle: "Cyber Guard",
    badge: "Zero-Trust",
    tag: "Data Defense",
    metric: "256-bit SSL",
    codeSnippet: "guard.verify()",
    color: "#DC2626",
    lightBg: "from-rose-50 via-rose-50/40 to-white",
    PrimaryIcon: LuShieldCheck,
    SecondaryIcon: LuLock,
  },
  {
    id: "software",
    title: "Custom Software",
    shortTitle: "Custom Logic",
    badge: "Bespoke Logic",
    tag: "Architecture",
    metric: "High Scalability",
    codeSnippet: "$ deploy prod",
    color: "#059669",
    lightBg: "from-emerald-50 via-emerald-50/40 to-white",
    PrimaryIcon: LuTerminal,
    SecondaryIcon: LuCpu,
  },
  {
    id: "ai",
    title: "AI & Automation",
    shortTitle: "AI Agents",
    badge: "Smart Agents",
    tag: "Neural Workflow",
    metric: "Autonomous",
    codeSnippet: "ai.generate()",
    color: "#0891B2",
    lightBg: "from-cyan-50 via-cyan-50/40 to-white",
    PrimaryIcon: LuBrainCircuit,
    SecondaryIcon: LuSparkles,
  },
];

// ─── 7 Puzzle Slot Positions & Sizing (Preserving the exact collage layout) ──
const PUZZLE_SLOTS = [
  { id: 0, w: 100, h: 100, x: 20, y: 180, scaleAnim: [1, 1.08, 1], dur: 3.2, delay: 0 },
  { id: 1, w: 100, h: 100, x: 130, y: 10, scaleAnim: [1, 1.07, 1], dur: 3.6, delay: 0.4 },
  { id: 2, w: 100, h: 100, x: 260, y: 50, scaleAnim: [1, 1.06, 1], dur: 3.0, delay: 0.8 },
  { id: 3, w: 220, h: 120, x: 130, y: 390, scaleAnim: [1, 1.05, 1], dur: 4.0, delay: 0.2 },
  { id: 4, w: 120, h: 260, x: 130, y: 120, scaleAnim: [1, 1.06, 1], dur: 3.8, delay: 0.6 },
  { id: 5, w: 150, h: 220, x: 260, y: 160, scaleAnim: [1, 1.05, 1], dur: 3.4, delay: 1.0 },
  { id: 6, w: 100, h: 140, x: 420, y: 190, scaleAnim: [1, 1.07, 1], dur: 3.5, delay: 0.5 },
];

/**
 * Slide 1 (Full-Spectrum IT Solutions)
 * Features 7 live IT Solution slots powered entirely by dynamic vector graphics,
 * responsive icons, live telemetry badges, and micro-animations that shuffle periodically.
 */
export default function Slide1Collage({ slide, mounted }) {
  // Shuffle offset advances every 4 seconds to cycle solutions through the 7 slots
  const [shuffleOffset, setShuffleOffset] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setShuffleOffset((prev) => (prev + 1) % IT_SOLUTIONS.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Decorative Elements for Slide 1 - Hidden on mobile/tablet */}
      <div className="hidden lg:block">
        <LoopScribble className="absolute top-10 left-10" />
        <ArrowScribbleLong className="absolute top-20 right-40" />
        <DotGrid className="absolute bottom-10 left-10" />
      </div>

      <div className="container-custom px-4 sm:px-6 lg:px-14 xl:px-16 grid lg:grid-cols-2 gap-6 lg:gap-10 items-center relative z-20 py-6 lg:py-8">
        {/* Left Texts */}
        <div className="max-w-xl mx-auto text-center lg:text-left lg:mx-0 flex flex-col items-center lg:items-start w-full">
          <motion.div
            initial={mounted ? { opacity: 0, x: -50 } : false}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col items-center lg:items-start w-full motion-gpu"
          >
            <p className="text-xs font-semibold tracking-wider uppercase mb-2.5 text-slate-500">
              {slide.label}
            </p>

            <h1 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-[42px] xl:text-[46px] font-black leading-[1.18] mb-3 md:mb-4 tracking-tight text-[#232F3E]">
              {slide.heading}
            </h1>

            <p className="text-sm md:text-base mb-5 md:mb-6 leading-relaxed max-w-lg font-medium opacity-90 text-[#5E6D77]">
              {slide.description}
            </p>

            {/* Buttons Container for Slide 1 */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center bg-white p-1.5 rounded-lg shadow-xl border border-slate-100 overflow-hidden w-full sm:w-auto">
              <Link
                href={slide.primaryBtn?.href || "/contact"}
                className="px-5 py-3 sm:px-7 sm:py-3.5 text-center text-[#232F3E] font-bold text-sm hover:translate-y-[-1px] transition-transform rounded-md"
              >
                {slide.primaryBtn.text}
              </Link>
              <Link
                href={slide.secondaryBtn?.href || "/services"}
                className="px-5 py-3 sm:px-7 sm:py-3.5 text-center bg-[#2D5A54] text-white rounded-md font-bold text-sm shadow-md hover:translate-y-[-1px] transition-transform"
              >
                {slide.secondaryBtn?.text}
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Right Visuals - 7 Animated & Shuffling IT Solution Slots with Generated Content */}
        <div className="hidden lg:flex relative items-center justify-end h-full">
          <motion.div
            initial={mounted ? { opacity: 0, scale: 0.95 } : false}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
          >
            {/* 7-Slot Puzzle Grid Container */}
            <div className="relative w-[520px] h-[520px] scale-[0.74] md:scale-[0.84] lg:scale-[0.9] origin-center lg:origin-right">
              {PUZZLE_SLOTS.map((slot, index) => {
                // Map slot to shuffling solution
                const solution =
                  IT_SOLUTIONS[(index + shuffleOffset) % IT_SOLUTIONS.length];
                const PrimaryIcon = solution.PrimaryIcon;
                const SecondaryIcon = solution.SecondaryIcon;

                return (
                  <motion.div
                    key={slot.id}
                    initial={mounted ? { opacity: 0, scale: 0.8 } : false}
                    animate={{
                      opacity: 1,
                      scale: slot.scaleAnim,
                      y: [0, -6, 0],
                    }}
                    transition={{
                      scale: {
                        duration: slot.dur,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: slot.delay,
                      },
                      y: {
                        duration: slot.dur,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: slot.delay,
                      },
                      opacity: { duration: 0.5 },
                    }}
                    whileHover={{
                      scale: 1.12,
                      zIndex: 40,
                      transition: { duration: 0.2 },
                    }}
                    className="absolute rounded-2xl overflow-hidden shadow-xl border border-white/90 bg-white/95 backdrop-blur-md cursor-pointer group transition-shadow hover:shadow-2xl"
                    style={{
                      width: slot.w,
                      height: slot.h,
                      left: slot.x,
                      top: slot.y,
                    }}
                  >
                    <Link
                      href="/services"
                      className="w-full h-full block relative"
                      title={solution.title}
                    >
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={solution.id}
                          initial={{ opacity: 0, scale: 0.88, filter: "blur(2px)" }}
                          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                          exit={{ opacity: 0, scale: 1.12, filter: "blur(2px)" }}
                          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                          className={`w-full h-full bg-gradient-to-br ${solution.lightBg} flex flex-col select-none`}
                        >
                          {/* ── Slot Layout 3: Wide Bottom Card (220x120) ── */}
                          {slot.id === 3 ? (
                            <div className="w-full h-full flex items-center justify-between gap-2.5 p-3 text-left">
                              <div className="flex flex-col justify-between h-full py-0.5 min-w-0 flex-1">
                                <div className="flex items-center gap-1.5">
                                  <span
                                    className="text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full text-white shadow-xs"
                                    style={{ backgroundColor: solution.color }}
                                  >
                                    {solution.badge}
                                  </span>
                                  <span className="flex h-2 w-2 relative">
                                    <span
                                      className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                                      style={{ backgroundColor: solution.color }}
                                    />
                                    <span
                                      className="relative inline-flex rounded-full h-2 w-2"
                                      style={{ backgroundColor: solution.color }}
                                    />
                                  </span>
                                </div>
                                <div className="flex flex-col my-0.5">
                                  <span className="text-sm font-black text-slate-900 leading-tight truncate">
                                    {solution.title}
                                  </span>
                                  <span className="text-[10px] font-semibold text-slate-500 truncate">
                                    {solution.tag}
                                  </span>
                                </div>
                                <div className="flex items-center gap-1.5 text-[9px] font-mono text-slate-700 bg-white/80 px-2 py-0.5 rounded border border-slate-200/80 w-max shadow-2xs">
                                  <span className="text-emerald-600 font-bold">✓</span>
                                  <span>{solution.codeSnippet}</span>
                                </div>
                              </div>

                              {/* Visual Icon Pedestal */}
                              <div className="relative w-16 h-16 shrink-0 flex items-center justify-center">
                                <div
                                  className="absolute inset-0 rounded-2xl opacity-25 blur-md"
                                  style={{ backgroundColor: solution.color }}
                                />
                                <div
                                  className="relative w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-lg transition-transform group-hover:scale-105"
                                  style={{
                                    background: `linear-gradient(135deg, ${solution.color} 0%, ${solution.color}dd 100%)`,
                                  }}
                                >
                                  <PrimaryIcon size={26} className="drop-shadow-sm" />
                                  <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-white flex items-center justify-center shadow-md">
                                    <SecondaryIcon size={11} style={{ color: solution.color }} />
                                  </div>
                                </div>
                              </div>
                            </div>
                          ) : slot.id === 4 ? (
                            /* ── Slot Layout 4: Tall Pillar (120x260) ── */
                            <div className="w-full h-full flex flex-col items-center justify-between p-3 text-center">
                              {/* Top Badge */}
                              <span
                                className="text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full text-white shadow-xs max-w-full truncate"
                                style={{ backgroundColor: solution.color }}
                              >
                                {solution.badge}
                              </span>

                              {/* Center Glowing Icon with Equalizer Waves */}
                              <div className="relative my-auto flex flex-col items-center justify-center">
                                <div
                                  className="absolute w-20 h-20 rounded-full opacity-20 blur-lg"
                                  style={{ backgroundColor: solution.color }}
                                />
                                <div
                                  className="relative w-16 h-16 rounded-2xl flex items-center justify-center text-white shadow-xl group-hover:scale-110 transition-transform duration-300"
                                  style={{
                                    background: `linear-gradient(135deg, ${solution.color} 0%, ${solution.color}ee 100%)`,
                                  }}
                                >
                                  <PrimaryIcon size={32} />
                                </div>

                                {/* Micro Animated Equalizer / Activity Bars */}
                                <div className="flex items-end gap-1 mt-3 h-5">
                                  {[12, 18, 14, 20, 10].map((h, i) => (
                                    <motion.div
                                      key={i}
                                      animate={{ height: [h * 0.4, h, h * 0.4] }}
                                      transition={{
                                        duration: 1.2 + i * 0.2,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                      }}
                                      className="w-1.5 rounded-full"
                                      style={{ backgroundColor: solution.color }}
                                    />
                                  ))}
                                </div>
                              </div>

                              {/* Bottom Details */}
                              <div className="flex flex-col items-center w-full">
                                <span className="text-[12px] font-black text-slate-900 leading-tight">
                                  {solution.title}
                                </span>
                                <span className="text-[9px] font-bold mt-1 px-1.5 py-0.5 rounded-md text-slate-600 bg-white/90 border border-slate-200/80 shadow-2xs">
                                  {solution.metric}
                                </span>
                              </div>
                            </div>
                          ) : slot.id === 5 ? (
                            /* ── Slot Layout 5: Medium Tall Card (150x220) ── */
                            <div className="w-full h-full flex flex-col items-center justify-between p-3 text-center">
                              {/* Top Status */}
                              <div className="flex items-center gap-1.5 w-full justify-center">
                                <span
                                  className="w-2 h-2 rounded-full animate-ping"
                                  style={{ backgroundColor: solution.color }}
                                />
                                <span className="text-[10px] font-bold text-slate-600 truncate max-w-[105px]">
                                  {solution.tag}
                                </span>
                              </div>

                              {/* Center Icon & Metric */}
                              <div className="relative my-auto flex flex-col items-center">
                                <div
                                  className="w-16 h-16 rounded-2xl flex items-center justify-center text-white shadow-xl group-hover:scale-110 transition-transform duration-300 relative"
                                  style={{
                                    background: `linear-gradient(135deg, ${solution.color} 0%, ${solution.color}dd 100%)`,
                                  }}
                                >
                                  <PrimaryIcon size={32} />
                                  <div className="absolute -top-1.5 -right-1.5 w-6 h-6 rounded-full bg-white flex items-center justify-center shadow border border-slate-100">
                                    <SecondaryIcon size={12} style={{ color: solution.color }} />
                                  </div>
                                </div>
                                <span className="mt-2 text-[9px] font-extrabold px-2 py-0.5 rounded-full text-slate-700 bg-white/95 border border-slate-200 shadow-2xs">
                                  {solution.metric}
                                </span>
                              </div>

                              {/* Bottom Title & Badge */}
                              <div className="flex flex-col items-center w-full">
                                <span className="text-xs font-black text-slate-900 leading-tight truncate max-w-full">
                                  {solution.title}
                                </span>
                                <span
                                  className="text-[9px] font-bold mt-1 px-2 py-0.5 rounded text-white"
                                  style={{ backgroundColor: solution.color }}
                                >
                                  {solution.badge}
                                </span>
                              </div>
                            </div>
                          ) : (
                            /* ── Slot Layout 0, 1, 2, 6: Square & Compact Tiles ── */
                            <div className="w-full h-full flex flex-col items-center justify-center p-2 text-center relative">
                              {/* Ambient Halo */}
                              <div
                                className="absolute w-12 h-12 rounded-full opacity-20 blur-sm pointer-events-none"
                                style={{ backgroundColor: solution.color }}
                              />

                              <div
                                className="relative w-11 h-11 rounded-xl flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform duration-300 mb-1"
                                style={{
                                  background: `linear-gradient(135deg, ${solution.color} 0%, ${solution.color}dd 100%)`,
                                }}
                              >
                                <PrimaryIcon size={22} />
                              </div>

                              <span className="text-[10px] font-black text-slate-900 leading-tight truncate max-w-full px-1">
                                {solution.shortTitle || solution.title}
                              </span>

                              <span
                                className="text-[8px] font-bold mt-1 px-1.5 py-0.5 rounded-full text-white leading-tight truncate max-w-full"
                                style={{ backgroundColor: solution.color }}
                              >
                                {solution.badge}
                              </span>
                            </div>
                          )}
                        </motion.div>
                      </AnimatePresence>
                    </Link>
                  </motion.div>
                );
              })}

              {/* Floating Tech Telemetry Chip */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute top-[280px] left-[-20px] md:left-[-40px] bg-white/95 backdrop-blur-md px-3 py-2 rounded-xl shadow-2xl flex items-center gap-3 border border-emerald-100 z-30 min-w-[200px]"
              >
                <div className="w-9 h-9 rounded-lg bg-emerald-500 text-white flex items-center justify-center font-black text-base shadow-md shadow-emerald-200 shrink-0">
                  ⚡
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-black text-slate-800 leading-tight">
                    Full IT Architecture
                  </span>
                  <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider">
                    7+ Solutions Live
                  </span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
