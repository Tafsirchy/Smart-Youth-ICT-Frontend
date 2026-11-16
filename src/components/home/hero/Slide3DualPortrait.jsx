"use client";

import React from "react";
import { motion } from "framer-motion";
import ImageLoader from "@/components/ui/ImageLoader";
import Link from "next/link";
import { LightbulbIcon, PieChartIcon, StarIcon } from "./HeroDecorations";

/**
 * Slide 3 (Dual Portrait Layout)
 * Preserves the exact original design, avatar ratings, twin arch pillars, and floating icons.
 */
export default function Slide3DualPortrait({ slide, mounted }) {
  return (
    <div className="container-custom px-4 sm:px-6 lg:px-14 xl:px-16 grid lg:grid-cols-2 gap-6 lg:gap-10 items-center relative z-20 py-6 lg:py-8">
      {/* Left Texts */}
      <div className="max-w-xl mx-auto text-center lg:text-left lg:mx-0 flex flex-col items-center lg:items-start w-full">
        <motion.div
          initial={mounted ? { opacity: 0, x: -50 } : false}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col items-center lg:items-start w-full motion-gpu"
        >
          {/* User Ratings & Badge */}
          <div className="flex flex-col gap-2 mb-3 md:mb-4 items-center lg:items-start">
            <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-9 h-9 border-2 border-white overflow-hidden shadow-sm rounded-lg"
                  >
                    <ImageLoader
                      src={`https://i.pravatar.cc/100?u=user${i + 5}`}
                      alt="User"
                      width={36}
                      height={36}
                    />
                  </div>
                ))}
              </div>
              <div className="flex flex-col gap-0.5 items-center lg:items-start">
                <div className="flex text-yellow-400">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <StarIcon key={i} />
                  ))}
                </div>
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  {slide.label}
                </p>
              </div>
            </div>
          </div>

          <h1 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-[42px] xl:text-[46px] font-black leading-[1.18] mb-3 md:mb-4 tracking-tight text-[#232F3E]">
            {slide.heading}
          </h1>

          <p className="text-sm md:text-base mb-5 md:mb-6 leading-relaxed max-w-lg font-medium opacity-90 text-[#5E6D77]">
            {slide.description}
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center w-full sm:w-auto">
            <Link
              href={slide.primaryBtn.href}
              className="px-6 py-3.5 sm:px-8 sm:py-3.5 font-bold text-sm transition-all transform hover:scale-105 shadow-xl text-center rounded-md"
              style={{
                background: slide.primaryBtn.color || "#4A2C2E",
                color: slide.primaryBtn.textColor || "#FFFFFF",
              }}
            >
              {slide.primaryBtn.text}
            </Link>
            {slide.secondaryBtn && (
              <Link
                href={slide.secondaryBtn.href}
                className="px-6 py-3.5 sm:px-8 sm:py-3.5 font-bold text-sm border-2 border-[#A85161]/30 text-[#4A2C2E] flex items-center justify-center gap-2 hover:bg-[#A85161]/10 transition-colors text-center rounded-md"
              >
                {slide.secondaryBtn.text}
              </Link>
            )}
          </div>
        </motion.div>
      </div>

      {/* Right Visuals - Hidden on mobile/tablet, shown on desktop (lg and up) */}
      <div className="hidden lg:flex relative items-center justify-end h-full">
        <motion.div
          initial={mounted ? { opacity: 0, scale: 0.95 } : false}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="relative w-full h-[380px] md:h-[470px] flex items-center justify-center lg:justify-end lg:pr-12">
            <div className="relative">
              {/* Ambient Background Warm Glow */}
              <div className="absolute -inset-10 w-[380px] h-[380px] rounded-full bg-rose-400/15 blur-3xl pointer-events-none -z-10" />

              {/* Background Frames from Schematic - Animated Breathing Blueprint */}
              {/* Top-Left Frame */}
              <motion.div
                initial={mounted ? { opacity: 0, scale: 0.9 } : false}
                animate={{
                  opacity: 1,
                  scale: [1, 1.03, 1],
                  rotate: [0, 1.5, 0],
                  x: [0, -4, 0],
                }}
                transition={{
                  opacity: { delay: 0.4, duration: 0.6 },
                  scale: { duration: 6, repeat: Infinity, ease: "easeInOut" },
                  rotate: { duration: 6, repeat: Infinity, ease: "easeInOut" },
                  x: { duration: 6, repeat: Infinity, ease: "easeInOut" },
                }}
                className="absolute -top-8 -left-8 md:-top-10 md:-left-10 w-[85%] h-[85%] border-2 border-[#A85161]/25 rounded-2xl pointer-events-none"
              />
              {/* Bottom-Right Frame */}
              <motion.div
                initial={mounted ? { opacity: 0, scale: 0.9 } : false}
                animate={{
                  opacity: 1,
                  scale: [1, 1.04, 1],
                  rotate: [0, -1.5, 0],
                  x: [0, 4, 0],
                }}
                transition={{
                  opacity: { delay: 0.5, duration: 0.6 },
                  scale: { duration: 6.5, repeat: Infinity, ease: "easeInOut", delay: 0.4 },
                  rotate: { duration: 6.5, repeat: Infinity, ease: "easeInOut", delay: 0.4 },
                  x: { duration: 6.5, repeat: Infinity, ease: "easeInOut", delay: 0.4 },
                }}
                className="absolute -bottom-8 -right-8 md:-bottom-10 md:-right-10 w-[85%] h-[85%] border-2 border-[#A85161]/25 rounded-2xl pointer-events-none ml-auto"
                style={{ left: "auto" }}
              />

              {/* Floating Status Badge 1 - Top Left Floating Telemetry */}
              <motion.div
                animate={{ y: [0, -8, 0], x: [0, 3, 0] }}
                transition={{
                  duration: 4.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.3,
                }}
                className="absolute -top-4 -left-6 md:-left-10 z-30 bg-white/95 backdrop-blur-xl px-3 py-1.5 rounded-xl shadow-xl border border-rose-200/80 flex items-center gap-2 text-slate-800 pointer-events-none"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <span className="text-[11px] font-black tracking-wide text-slate-900 leading-tight">
                  Live Production Sprint
                </span>
              </motion.div>

              <div className="relative flex items-center gap-3 z-10">
                {/* Left Pillar - Animated Floating Bobbing & Interactive Scale */}
                <motion.div
                  initial={mounted ? { opacity: 0, x: -30 } : false}
                  animate={{
                    opacity: 1,
                    x: 0,
                    y: [0, -10, 0],
                  }}
                  transition={{
                    opacity: { delay: 0.6, duration: 0.5 },
                    x: { delay: 0.6, duration: 0.5 },
                    y: {
                      duration: 4.6,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 0.6,
                    },
                  }}
                  whileHover={{
                    scale: 1.05,
                    y: -14,
                    zIndex: 25,
                    transition: { duration: 0.25 },
                  }}
                  className="relative w-[120px] h-[260px] md:w-[170px] md:h-[390px] rounded-2xl overflow-hidden border-2 border-white/90 bg-[#FAF1F2] shadow-2xl cursor-pointer group"
                >
                  <div
                    className="absolute inset-0 opacity-[0.08] mix-blend-multiply pointer-events-none select-none"
                    style={{
                      backgroundImage:
                        "radial-gradient(#A85161 0.5px, transparent 0.5px)",
                      backgroundSize: "12px 12px",
                    }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <ImageLoader
                      src={slide.archImage}
                      alt="Student Left"
                      fill
                      sizes="(max-width: 768px) 50vw, 33vw"
                      priority={false}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                      wrapperClassName="w-full h-full"
                    />
                  </div>
                </motion.div>

                {/* Right Pillar - Animated Floating Bobbing (Out of Phase) */}
                <motion.div
                  initial={mounted ? { opacity: 0, x: 30 } : false}
                  animate={{
                    opacity: 1,
                    x: 0,
                    y: [0, 10, 0],
                  }}
                  transition={{
                    opacity: { delay: 0.7, duration: 0.5 },
                    x: { delay: 0.7, duration: 0.5 },
                    y: {
                      duration: 5.2,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 0.9,
                    },
                  }}
                  whileHover={{
                    scale: 1.05,
                    y: -14,
                    zIndex: 25,
                    transition: { duration: 0.25 },
                  }}
                  className="relative w-[120px] h-[260px] md:w-[170px] md:h-[390px] rounded-2xl overflow-hidden border-2 border-white/90 bg-[#FAF1F2] shadow-2xl cursor-pointer group"
                >
                  <div
                    className="absolute inset-0 opacity-[0.08] mix-blend-multiply pointer-events-none select-none"
                    style={{
                      backgroundImage:
                        "radial-gradient(#A85161 0.5px, transparent 0.5px)",
                      backgroundSize: "12px 12px",
                    }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <ImageLoader
                      src={slide.image}
                      alt="Student Right"
                      fill
                      sizes="(max-width: 768px) 50vw, 33vw"
                      priority={false}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                      wrapperClassName="w-full h-full"
                    />
                  </div>
                </motion.div>
              </div>

              {/* Floating Status Badge 2 - Bottom Right Telemetry */}
              <motion.div
                animate={{ y: [0, 8, 0], x: [0, -2, 0] }}
                transition={{
                  duration: 4.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.6,
                }}
                className="absolute -bottom-4 -right-4 md:-right-8 z-30 bg-white/95 backdrop-blur-xl px-3 py-1.5 rounded-xl shadow-xl border border-rose-200/80 flex items-center gap-2 text-slate-800 pointer-events-none"
              >
                <span className="w-5 h-5 rounded-md bg-[#A85161]/15 text-[#A85161] flex items-center justify-center font-bold text-[10px]">
                  ⚡
                </span>
                <div className="flex flex-col">
                  <span className="text-[10px] font-black leading-tight text-slate-900">
                    Enterprise Pipeline
                  </span>
                  <span className="text-[8px] font-bold text-slate-500 uppercase tracking-wider">
                    Industrial Attachment
                  </span>
                </div>
              </motion.div>

              {/* Floating Decorative Icons */}
              <motion.div
                animate={{
                  y: [0, -16, 0],
                  rotate: [0, 10, 0],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 4.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -top-14 -right-6 md:-right-8 z-30 text-[#A85161] opacity-70"
              >
                <LightbulbIcon className="w-12 h-12 drop-shadow-md" />
              </motion.div>

              <motion.div
                animate={{
                  y: [0, 16, 0],
                  rotate: [0, -12, 0],
                  scale: [1, 1.08, 1],
                }}
                transition={{
                  duration: 4.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -bottom-14 -left-14 md:-left-16 z-30 text-[#A85161] opacity-70"
              >
                <PieChartIcon className="w-10 h-10 drop-shadow-md" />
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
