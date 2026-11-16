"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  LuBrainCircuit,
  LuSparkles,
  LuCloud,
  LuShieldCheck,
  LuChartColumn,
  LuHeadphones,
  LuServer,
  LuCircleCheck,
  LuArrowRight,
} from "react-icons/lu";

/**
 * 6 Core AI & Managed Service Nodes (Client Requirement #5)
 * Orbit Radius calibrated to 138px:
 * Bounding box is 376px wide, perfectly centered in the column with zero cutoff.
 * Color Scheme: #D5F2E3 (Soft Mint) & #003D46 (Deep Pine/Teal) Best Approach.
 */
const ORBIT_RADIUS = 138;

const ORBIT_CARDS = [
  {
    id: "ai-bots",
    title: "AI Chatbots",
    subtitle: "LLMs & Automation",
    Icon: LuSparkles,
    iconGradient: "bg-gradient-to-tr from-[#003D46] to-[#0D9488]",
    hoverBorder: "hover:border-[#0D9488] hover:shadow-[#003D46]/20",
    angleDeg: -90, // 12 o'clock
    x: 0,
    y: -ORBIT_RADIUS,
  },
  {
    id: "cloud",
    title: "Cloud & DevOps",
    subtitle: "AWS, Azure & CI/CD",
    Icon: LuCloud,
    iconGradient: "bg-gradient-to-tr from-sky-600 to-cyan-500",
    hoverBorder: "hover:border-sky-400 hover:shadow-sky-500/20",
    angleDeg: -30, // 2 o'clock
    x: Math.round(ORBIT_RADIUS * Math.cos((-30 * Math.PI) / 180)), // ~ 120
    y: Math.round(ORBIT_RADIUS * Math.sin((-30 * Math.PI) / 180)), // ~ -69
  },
  {
    id: "cyber",
    title: "Cyber Defense",
    subtitle: "Pen-Testing & SSL",
    Icon: LuShieldCheck,
    iconGradient: "bg-gradient-to-tr from-rose-600 to-red-500",
    hoverBorder: "hover:border-rose-400 hover:shadow-rose-500/20",
    angleDeg: 30, // 4 o'clock
    x: Math.round(ORBIT_RADIUS * Math.cos((30 * Math.PI) / 180)), // ~ 120
    y: Math.round(ORBIT_RADIUS * Math.sin((30 * Math.PI) / 180)), // ~ 69
  },
  {
    id: "managed-it",
    title: "Managed IT (AMC)",
    subtitle: "24/7 SLA Support",
    Icon: LuHeadphones,
    iconGradient: "bg-gradient-to-tr from-emerald-600 to-teal-500",
    hoverBorder: "hover:border-emerald-400 hover:shadow-emerald-500/20",
    angleDeg: 90, // 6 o'clock
    x: 0,
    y: ORBIT_RADIUS,
  },
  {
    id: "analytics",
    title: "Data & BI",
    subtitle: "Live Dashboards",
    Icon: LuChartColumn,
    iconGradient: "bg-gradient-to-tr from-amber-500 to-orange-500",
    hoverBorder: "hover:border-amber-400 hover:shadow-amber-500/20",
    angleDeg: 150, // 8 o'clock
    x: Math.round(ORBIT_RADIUS * Math.cos((150 * Math.PI) / 180)), // ~ -120
    y: Math.round(ORBIT_RADIUS * Math.sin((150 * Math.PI) / 180)), // ~ 69
  },
  {
    id: "recovery",
    title: "Cloud Backup",
    subtitle: "Disaster Recovery",
    Icon: LuServer,
    iconGradient: "bg-gradient-to-tr from-indigo-600 to-blue-700",
    hoverBorder: "hover:border-indigo-400 hover:shadow-indigo-500/20",
    angleDeg: 210, // 10 o'clock
    x: Math.round(ORBIT_RADIUS * Math.cos((210 * Math.PI) / 180)), // ~ -120
    y: Math.round(ORBIT_RADIUS * Math.sin((210 * Math.PI) / 180)), // ~ -69
  },
];

/**
 * Slide 3: Enterprise AI Solutions, Cloud DevOps & 24/7 Managed IT
 * Luxury Soft Mint (#D5F2E3) & Deep Pine/Teal (#003D46) Palette
 */
export default function SlideAiCloud({ slide, mounted }) {
  return (
    <>
      {/* Background Banner - Refined Soft Mint (#D5F2E3) Gradient */}
      <div
        className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none"
        style={{
          background:
            slide.bgGradient ||
            "linear-gradient(135deg, #F0FAF4 0%, #D5F2E3 50%, #C6ECD8 100%)",
        }}
      >
        {/* Soft Ambient Lights (Mint & Emerald Depth) */}
        <div className="absolute top-[-10%] right-[10%] w-[520px] h-[520px] rounded-full bg-emerald-400/15 blur-[110px] pointer-events-none" />
        <div className="absolute bottom-[-15%] left-[20%] w-[450px] h-[450px] rounded-full bg-teal-500/12 blur-[120px] pointer-events-none" />
        <div className="absolute top-[35%] right-[35%] w-[380px] h-[380px] rounded-full bg-white/40 blur-[90px] pointer-events-none" />

        {/* Subtle Tech Grid Texture in Deep Pine */}
        <div
          className="absolute inset-0 opacity-[0.035] pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(#003D46 1px, transparent 1px), radial-gradient(#003D46 1px, transparent 1px)",
            backgroundSize: "28px 28px",
            backgroundPosition: "0 0, 14px 14px",
          }}
        />
      </div>

      <div className="container-custom px-4 sm:px-6 lg:px-10 xl:px-14 grid lg:grid-cols-2 gap-6 lg:gap-8 items-center relative z-20 py-6 lg:py-8">
        {/* Left Texts - High-contrast Deep Pine (#003D46) Typography */}
        <div className="max-w-xl mx-auto text-center lg:text-left lg:mx-0 flex flex-col items-center lg:items-start w-full">
          <motion.div
            initial={mounted ? { opacity: 0, x: -50 } : false}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.35 }}
            className="flex flex-col items-center lg:items-start w-full motion-gpu"
          >
            {slide.badge && (
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white/85 backdrop-blur-md border border-[#003D46]/20 text-[#003D46] text-xs font-bold tracking-wider mb-3 md:mb-4 rounded-full shadow-sm">
                <span className="w-2 h-2 rounded-full bg-[#0D9488] animate-pulse" />
                {slide.badge}
              </div>
            )}

            <h1 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-[40px] xl:text-[44px] font-black leading-[1.18] mb-3 md:mb-4 tracking-tight text-[#003D46]">
              {slide.heading}
            </h1>

            <p className="text-sm md:text-base mb-5 md:mb-6 leading-relaxed max-w-lg font-medium text-[#1D4B52]">
              {slide.description}
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center w-full sm:w-auto">
              <Link
                href={slide.primaryBtn.href}
                className="px-6 py-3.5 sm:px-8 sm:py-3.5 font-bold text-sm transition-all transform hover:scale-105 shadow-lg shadow-[#003D46]/25 hover:shadow-[#003D46]/35 text-center rounded-xl text-white flex items-center justify-center gap-2"
                style={{
                  background: slide.primaryBtn.color || "#003D46",
                }}
              >
                {slide.primaryBtn.text}
                <LuArrowRight size={16} />
              </Link>
              {slide.secondaryBtn && (
                <Link
                  href={slide.secondaryBtn.href || "/contact"}
                  className="px-6 py-3.5 sm:px-8 sm:py-3.5 font-bold text-sm border-2 border-[#003D46]/30 hover:border-[#003D46]/70 text-[#003D46] flex items-center justify-center gap-2 hover:bg-[#003D46]/10 transition-all text-center rounded-xl bg-white/75 backdrop-blur-sm shadow-sm"
                >
                  {slide.secondaryBtn.text}
                </Link>
              )}
            </div>

            {/* Trust Assurance Mini Badges */}
            <div className="mt-6 flex flex-wrap items-center gap-4 text-xs font-semibold text-[#1D4B52]">
              <span className="flex items-center gap-1.5">
                <LuCircleCheck size={15} className="text-[#057A78]" />
                99.9% SLA Guarantee
              </span>
              <span className="flex items-center gap-1.5">
                <LuCircleCheck size={15} className="text-[#003D46]" />
                Zero-Trust Certified
              </span>
              <span className="flex items-center gap-1.5">
                <LuCircleCheck size={15} className="text-[#0D9488]" />
                24/7 Dedicated AMC
              </span>
            </div>
          </motion.div>
        </div>

        {/* Right Visuals - Centered Circular Orbit with Clockwise Revolving Cards */}
        <div className="hidden lg:flex relative items-center justify-center h-full">
          <motion.div
            initial={mounted ? { opacity: 0, scale: 0.94 } : false}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.55 }}
            className="orbit-group relative w-[400px] xl:w-[420px] h-[380px] flex items-center justify-center select-none"
          >
            {/* Ambient Multi-Hue Core Lighting */}
            <div className="absolute w-[300px] h-[300px] rounded-full bg-gradient-to-tr from-teal-300/25 via-emerald-200/25 to-white/40 blur-3xl pointer-events-none -z-10" />

            {/* Static Central AI & Cloud Core Hub */}
            <motion.div
              animate={{ scale: [1, 1.04, 1] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="relative z-20 p-[2.5px] rounded-3xl bg-gradient-to-tr from-[#003D46] via-[#057A78] to-[#0D9488] shadow-xl shadow-[#003D46]/20"
            >
              <div className="w-[98px] h-[98px] rounded-[22px] bg-white/95 backdrop-blur-xl flex flex-col items-center justify-center p-2 text-center shadow-inner">
                {/* Central Icon */}
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#003D46] via-[#057A78] to-[#0D9488] flex items-center justify-center text-white shadow-md shadow-[#003D46]/30 mb-1">
                  <LuBrainCircuit size={18} />
                </div>
                <span className="text-[10px] font-black text-[#003D46] tracking-tight leading-tight">
                  AI & Cloud
                </span>
                <span className="text-[7.5px] font-bold text-[#0D9488] uppercase tracking-wider mt-0.5">
                  SYICT Core
                </span>
                <div className="flex items-center gap-1 mt-1 text-[7px] font-mono text-emerald-800 bg-emerald-100/90 px-1.5 py-0.2 rounded-full border border-emerald-300/70 font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-ping" />
                  <span>ACTIVE</span>
                </div>
              </div>
            </motion.div>

            {/* Clockwise Rotating Orbit Track with the 6 Service Cards */}
            <div
              className="animate-syict-orbit absolute w-[276px] h-[276px] rounded-full flex items-center justify-center pointer-events-none"
              style={{
                border: "2px dashed rgba(0, 61, 70, 0.35)",
                boxShadow: "0 0 20px rgba(0, 61, 70, 0.06)",
              }}
            >
              {/* Inner Decorative Guide Ring */}
              <div className="absolute inset-5 rounded-full border border-[#003D46]/15 pointer-events-none" />

              {/* The 6 Cards placed around the circle at 60° increments */}
              {ORBIT_CARDS.map((card) => (
                <div
                  key={card.id}
                  className="absolute pointer-events-auto"
                  style={{
                    left: `calc(50% + ${card.x}px)`,
                    top: `calc(50% + ${card.y}px)`,
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  {/* Counter-Spin Wrapper ensures card text stays 100% horizontal & readable while revolving */}
                  <div className="animate-syict-counter-spin">
                    <Link
                      href="/services"
                      className={`group block px-2.5 py-1.5 bg-white/95 hover:bg-white rounded-xl border border-[#003D46]/15 ${card.hoverBorder} shadow-[0_6px_18px_rgba(0,61,70,0.09)] hover:shadow-[0_12px_26px_rgba(0,61,70,0.18)] transition-all duration-300 w-[136px] xl:w-[142px] backdrop-blur-md cursor-pointer`}
                      title={card.title}
                    >
                      <div className="flex items-center gap-2">
                        {/* Solid Gradient Icon Box with crisp white icon */}
                        <div
                          className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${card.iconGradient} text-white shadow-sm`}
                        >
                          <card.Icon size={15} />
                        </div>
                        <div className="flex flex-col min-w-0">
                          <span className="text-[10px] font-bold text-[#003D46] group-hover:text-[#0D9488] transition-colors leading-tight truncate">
                            {card.title}
                          </span>
                          <span className="text-[8.5px] font-medium text-[#2D5A61] truncate leading-snug">
                            {card.subtitle}
                          </span>
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
