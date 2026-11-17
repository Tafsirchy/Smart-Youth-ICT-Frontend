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

// ── Orbit radius বাড়ানো হয়েছে 138 → 165 ──────────────────────────────────
const ORBIT_RADIUS = 165;

const ORBIT_CARDS = [
  {
    id: "ai-bots",
    title: "AI Chatbots",
    subtitle: "LLMs & Automation",
    Icon: LuSparkles,
    iconColor: "text-violet-600",
    iconBg: "bg-violet-50",
    angleDeg: -90,
    x: 0,
    y: -ORBIT_RADIUS,
  },
  {
    id: "cloud",
    title: "Cloud & DevOps",
    subtitle: "AWS, Azure & CI/CD",
    Icon: LuCloud,
    iconColor: "text-sky-600",
    iconBg: "bg-sky-50",
    angleDeg: -30,
    x: Math.round(ORBIT_RADIUS * Math.cos((-30 * Math.PI) / 180)),
    y: Math.round(ORBIT_RADIUS * Math.sin((-30 * Math.PI) / 180)),
  },
  {
    id: "cyber",
    title: "Cyber Defense",
    subtitle: "Pen-Testing & SSL",
    Icon: LuShieldCheck,
    iconColor: "text-rose-600",
    iconBg: "bg-rose-50",
    angleDeg: 30,
    x: Math.round(ORBIT_RADIUS * Math.cos((30 * Math.PI) / 180)),
    y: Math.round(ORBIT_RADIUS * Math.sin((30 * Math.PI) / 180)),
  },
  {
    id: "managed-it",
    title: "Managed IT (AMC)",
    subtitle: "24/7 SLA Support",
    Icon: LuHeadphones,
    iconColor: "text-emerald-600",
    iconBg: "bg-emerald-50",
    angleDeg: 90,
    x: 0,
    y: ORBIT_RADIUS,
  },
  {
    id: "analytics",
    title: "Data & BI",
    subtitle: "Live Dashboards",
    Icon: LuChartColumn,
    iconColor: "text-amber-600",
    iconBg: "bg-amber-50",
    angleDeg: 150,
    x: Math.round(ORBIT_RADIUS * Math.cos((150 * Math.PI) / 180)),
    y: Math.round(ORBIT_RADIUS * Math.sin((150 * Math.PI) / 180)),
  },
  {
    id: "recovery",
    title: "Cloud Backup",
    subtitle: "Disaster Recovery",
    Icon: LuServer,
    iconColor: "text-indigo-600",
    iconBg: "bg-indigo-50",
    angleDeg: 210,
    x: Math.round(ORBIT_RADIUS * Math.cos((210 * Math.PI) / 180)),
    y: Math.round(ORBIT_RADIUS * Math.sin((210 * Math.PI) / 180)),
  },
];

export default function SlideAiCloud({ slide, mounted }) {
  return (
    <>
      {/* Background */}
      <div
        className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none"
        style={{
          background:
            slide.bgGradient ||
            "linear-gradient(135deg, #F0FAF4 0%, #D5F2E3 50%, #C6ECD8 100%)",
        }}
      >
        <div className="absolute top-[-10%] right-[10%] w-[500px] h-[500px] rounded-full bg-emerald-400/15 blur-[110px]" />
        <div className="absolute bottom-[-15%] left-[20%] w-[450px] h-[450px] rounded-full bg-teal-500/12 blur-[120px]" />
        <div className="absolute top-[35%] right-[35%] w-[380px] h-[380px] rounded-full bg-white/40 blur-[90px]" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "radial-gradient(#003D46 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
      </div>

      <div className="container-custom px-4 sm:px-6 lg:px-10 xl:px-14 grid lg:grid-cols-2 gap-6 lg:gap-8 items-center relative z-20 py-6 lg:py-8">

        {/* ── Left Text ─────────────────────────────────────── */}
        <div className="max-w-xl mx-auto text-center lg:text-left lg:mx-0 flex flex-col items-center lg:items-start w-full">
          <motion.div
            initial={mounted ? { opacity: 0, x: -50 } : false}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.35 }}
            className="flex flex-col items-center lg:items-start w-full"
          >
            {slide.badge && (
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white/85 border border-[#003D46]/20 text-[#003D46] text-xs font-bold tracking-wider mb-3 rounded-full shadow-sm">
                <span className="w-2 h-2 rounded-full bg-[#0D9488] animate-pulse" />
                {slide.badge}
              </div>
            )}

            <h1 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-[40px] xl:text-[44px] font-black leading-[1.18] mb-3 tracking-tight text-[#003D46]">
              {slide.heading}
            </h1>

            <p className="text-sm md:text-base mb-5 leading-relaxed max-w-lg font-medium text-[#1D4B52]">
              {slide.description}
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center w-full sm:w-auto">
              <Link
                href={slide.primaryBtn.href}
                className="px-6 py-3.5 sm:px-8 font-bold text-sm transition-all transform hover:scale-105 shadow-lg shadow-[#003D46]/25 text-center rounded-xl text-white flex items-center justify-center gap-2"
                style={{ background: slide.primaryBtn.color || "#003D46" }}
              >
                {slide.primaryBtn.text}
                <LuArrowRight size={16} />
              </Link>
              {slide.secondaryBtn && (
                <Link
                  href={slide.secondaryBtn.href || "/contact"}
                  className="px-6 py-3.5 sm:px-8 font-bold text-sm border-2 border-[#003D46]/30 hover:border-[#003D46]/70 text-[#003D46] flex items-center justify-center gap-2 hover:bg-[#003D46]/10 transition-all text-center rounded-xl bg-white/75 shadow-sm"
                >
                  {slide.secondaryBtn.text}
                </Link>
              )}
            </div>

            {/* Trust badges */}
            <div className="mt-5 flex flex-wrap items-center gap-4 text-xs font-semibold text-[#1D4B52]">
              <span className="flex items-center gap-1.5">
                <LuCircleCheck size={14} className="text-[#057A78]" /> 99.9% SLA Guarantee
              </span>
              <span className="flex items-center gap-1.5">
                <LuCircleCheck size={14} className="text-[#003D46]" /> Zero-Trust Certified
              </span>
              <span className="flex items-center gap-1.5">
                <LuCircleCheck size={14} className="text-[#0D9488]" /> 24/7 Dedicated AMC
              </span>
            </div>
          </motion.div>
        </div>

        {/* ── Right: Circular Orbit ─────────────────────────── */}
        <div className="hidden lg:flex relative items-center justify-center h-full">
          <motion.div
            initial={mounted ? { opacity: 0, scale: 0.94 } : false}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.55 }}
            className="orbit-group relative w-[460px] xl:w-[480px] h-[440px] flex items-center justify-center select-none"
          >
            {/* Ambient glow */}
            <div className="absolute w-[320px] h-[320px] rounded-full bg-gradient-to-tr from-teal-300/25 via-emerald-200/25 to-white/40 blur-3xl -z-10" />

            {/* ── Central Hub ──────────────────────────────── */}
            <motion.div
              animate={{ scale: [1, 1.04, 1] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="relative z-20 flex flex-col items-center justify-center"
            >
              {/* Gradient border ring (outer glow) */}
              <div
                className="p-[3px] rounded-[26px] shadow-2xl"
                style={{
                  background: "linear-gradient(135deg, #003D46, #057A78, #0D9488)",
                }}
              >
                {/* Inner white card — pure opaque white for crisp readability */}
                <div className="w-[112px] h-[112px] rounded-[23px] bg-white flex flex-col items-center justify-center p-3 text-center">

                  {/* Pulse ring */}
                  <motion.div
                    animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0.05, 0.3] }}
                    transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute inset-0 rounded-[23px] pointer-events-none"
                    style={{ background: "rgba(0,61,70,0.06)" }}
                  />

                  {/* Icon */}
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-md mb-2"
                    style={{ background: "linear-gradient(135deg, #003D46, #057A78, #0D9488)" }}
                  >
                    <LuBrainCircuit size={21} />
                  </div>

                  <span className="text-[12px] font-black leading-tight" style={{ color: "#003D46" }}>
                    AI & Cloud
                  </span>
                  <span className="text-[8.5px] font-bold uppercase tracking-widest mt-0.5" style={{ color: "#057A78" }}>
                    SYICT Core
                  </span>

                  {/* Active dot */}
                  <div className="flex items-center gap-1 mt-1.5 text-[7px] font-mono font-bold px-1.5 py-0.5 rounded-full" style={{ background: "#E6FAF4", color: "#003D46", border: "1px solid #A7F3D0" }}>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                    ACTIVE
                  </div>
                </div>
              </div>
            </motion.div>

            {/* ── Orbit Track ──────────────────────────────── */}
            {/* diameter = 2 × 165 + card-half ≈ 330px track */}
            <div
              className="animate-syict-orbit absolute rounded-full flex items-center justify-center pointer-events-none"
              style={{
                width:  `${ORBIT_RADIUS * 2}px`,
                height: `${ORBIT_RADIUS * 2}px`,
                border: "2.5px dashed rgba(0, 61, 70, 0.4)",
                boxShadow: "0 0 24px rgba(0, 61, 70, 0.07)",
              }}
            >
              {/* Inner ring */}
              <div
                className="absolute rounded-full border border-[#003D46]/12 pointer-events-none"
                style={{ inset: "18px" }}
              />

              {/* 6 Service Cards */}
              {ORBIT_CARDS.map((card) => (
                <div
                  key={card.id}
                  className="absolute pointer-events-auto"
                  style={{
                    left: `calc(50% + ${card.x}px)`,
                    top:  `calc(50% + ${card.y}px)`,
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  {/* Counter-spin keeps text upright */}
                  <div className="animate-syict-counter-spin">
                    <Link
                      href="/services"
                      className="group block px-3 py-2 bg-white hover:bg-white/95 rounded-xl border-2 border-[#003D46]/18 hover:border-[#003D46]/50 shadow-[0_6px_18px_rgba(0,61,70,0.1)] hover:shadow-[0_10px_26px_rgba(0,61,70,0.2)] transition-all duration-300 w-[146px] xl:w-[152px] cursor-pointer"
                      title={card.title}
                    >
                      <div className="flex items-center gap-2.5">
                        {/* Icon */}
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${card.iconBg} border border-slate-200/80`}>
                          <card.Icon size={16} className={card.iconColor} />
                        </div>
                        <div className="flex flex-col min-w-0">
                          <span className="text-[11px] font-extrabold text-[#003D46] group-hover:text-[#057A78] transition-colors leading-tight truncate">
                            {card.title}
                          </span>
                          <span className="text-[9px] font-semibold text-[#2D5A61] truncate leading-snug">
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
