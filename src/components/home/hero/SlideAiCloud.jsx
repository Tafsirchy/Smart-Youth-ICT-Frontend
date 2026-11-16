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
} from "react-icons/lu";

const ORBIT_RADIUS = 138;

const ORBIT_CARDS = [
  { id: "ai-bots", title: "AI Chatbots", subtitle: "LLMs & Automation", Icon: LuSparkles, angleDeg: -90, x: 0, y: -ORBIT_RADIUS },
  { id: "cloud", title: "Cloud & DevOps", subtitle: "AWS, Azure & CI/CD", Icon: LuCloud, angleDeg: -30, x: Math.round(ORBIT_RADIUS * Math.cos((-30 * Math.PI) / 180)), y: Math.round(ORBIT_RADIUS * Math.sin((-30 * Math.PI) / 180)) },
  { id: "cyber", title: "Cyber Defense", subtitle: "Pen-Testing & SSL", Icon: LuShieldCheck, angleDeg: 30, x: Math.round(ORBIT_RADIUS * Math.cos((30 * Math.PI) / 180)), y: Math.round(ORBIT_RADIUS * Math.sin((30 * Math.PI) / 180)) },
  { id: "managed-it", title: "Managed IT (AMC)", subtitle: "24/7 SLA Support", Icon: LuHeadphones, angleDeg: 90, x: 0, y: ORBIT_RADIUS },
  { id: "analytics", title: "Data & BI", subtitle: "Live Dashboards", Icon: LuChartColumn, angleDeg: 150, x: Math.round(ORBIT_RADIUS * Math.cos((150 * Math.PI) / 180)), y: Math.round(ORBIT_RADIUS * Math.sin((150 * Math.PI) / 180)) },
  { id: "recovery", title: "Cloud Backup", subtitle: "Disaster Recovery", Icon: LuServer, angleDeg: 210, x: Math.round(ORBIT_RADIUS * Math.cos((210 * Math.PI) / 180)), y: Math.round(ORBIT_RADIUS * Math.sin((210 * Math.PI) / 180)) },
];

export default function SlideAiCloud({ slide, mounted }) {
  return (
    <div className="container-custom px-4 sm:px-6 lg:px-10 xl:px-14 grid lg:grid-cols-2 gap-6 lg:gap-8 items-center relative z-20 py-6 lg:py-8">
      <div className="max-w-xl mx-auto text-center lg:text-left lg:mx-0 flex flex-col items-center lg:items-start w-full">
        <motion.div initial={mounted ? { opacity: 0, x: -50 } : false} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.35 }}>
          <h1 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-black leading-tight mb-3 text-slate-900">
            {slide.heading}
          </h1>
          <p className="text-sm md:text-base mb-5 leading-relaxed text-slate-600">
            {slide.description}
          </p>
          <div className="flex gap-4">
            <Link href={slide.primaryBtn.href} className="px-6 py-3 font-bold text-sm bg-blue-600 text-white rounded-xl shadow-lg">
              {slide.primaryBtn.text}
            </Link>
          </div>
        </motion.div>
      </div>

      <div className="hidden lg:flex relative items-center justify-center h-full">
        <div className="orbit-group relative w-[400px] h-[380px] flex items-center justify-center select-none">
          <div className="relative z-20 w-24 h-24 rounded-2xl bg-white shadow-xl flex flex-col items-center justify-center border border-sky-200">
            <LuBrainCircuit size={22} className="text-blue-600" />
            <span className="text-[10px] font-bold text-slate-800 mt-1">AI & Cloud</span>
          </div>

          <div className="animate-syict-orbit absolute w-[276px] h-[276px] rounded-full border-2 border-dashed border-blue-400/50 flex items-center justify-center">
            {ORBIT_CARDS.map((card) => (
              <div
                key={card.id}
                className="absolute"
                style={{
                  left: `calc(50% + ${card.x}px)`,
                  top: `calc(50% + ${card.y}px)`,
                  transform: "translate(-50%, -50%)",
                }}
              >
                <div className="animate-syict-counter-spin">
                  <div className="px-2.5 py-1.5 bg-white rounded-xl border border-slate-200 shadow-md w-[136px] flex items-center gap-2">
                    <card.Icon size={16} className="text-blue-600 shrink-0" />
                    <div className="flex flex-col min-w-0">
                      <span className="text-[10px] font-bold text-slate-900 truncate">{card.title}</span>
                      <span className="text-[8.5px] text-slate-500 truncate">{card.subtitle}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
