"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  LuBrainCircuit,
  LuCloud,
  LuShieldCheck,
  LuChartColumn,
  LuHeadphones,
  LuSparkles,
} from "react-icons/lu";

const SERVICE_NODES = [
  { id: "cloud", title: "Multi-Cloud & DevOps", Icon: LuCloud, color: "#38BDF8" },
  { id: "cyber", title: "Zero-Trust Cyber Defense", Icon: LuShieldCheck, color: "#F43F5E" },
  { id: "ai-bots", title: "AI Chatbots & Automation", Icon: LuSparkles, color: "#34D399" },
  { id: "analytics", title: "Data Analytics & BI", Icon: LuChartColumn, color: "#FBBF24" },
  { id: "managed-it", title: "24/7 Managed IT Support", Icon: LuHeadphones, color: "#A78BFA" },
];

export default function SlideAiCloud({ slide, mounted }) {
  return (
    <div className="container-custom px-4 sm:px-6 lg:px-14 xl:px-16 grid lg:grid-cols-2 gap-6 lg:gap-10 items-center relative z-20 py-6 lg:py-8">
      <div className="max-w-xl mx-auto text-center lg:text-left lg:mx-0 flex flex-col items-center lg:items-start w-full">
        <motion.div
          initial={mounted ? { opacity: 0, x: -50 } : false}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col items-center lg:items-start w-full"
        >
          {slide.badge && (
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-cyan-500/10 border border-cyan-400/30 text-cyan-800 text-xs font-bold tracking-wider mb-3 rounded-lg">
              🤖 {slide.badge}
            </div>
          )}
          <h1 className="font-display text-2xl sm:text-3xl md:text-4xl font-black leading-tight mb-3 text-slate-900">
            {slide.heading}
          </h1>
          <p className="text-sm md:text-base mb-5 leading-relaxed text-slate-600">
            {slide.description}
          </p>
          <div className="flex gap-4">
            <Link
              href={slide.primaryBtn.href}
              className="px-6 py-3 font-bold text-sm bg-blue-600 text-white rounded-md shadow-md"
            >
              {slide.primaryBtn.text}
            </Link>
          </div>
        </motion.div>
      </div>

      <div className="hidden lg:flex relative items-center justify-center">
        <div className="relative w-72 h-72 rounded-full border border-dashed border-sky-400/30 flex items-center justify-center">
          <div className="w-28 h-28 rounded-2xl bg-white shadow-xl border border-sky-200 flex flex-col items-center justify-center">
            <LuBrainCircuit size={28} className="text-sky-600" />
            <span className="text-[10px] font-bold mt-1">AI Neural Core</span>
          </div>
        </div>
      </div>
    </div>
  );
}
