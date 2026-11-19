"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  IoSparklesOutline,
  IoCubeOutline,
  IoGlobeOutline,
  IoHardwareChipOutline,
  IoSchoolOutline,
  IoArrowForwardOutline,
  IoCheckmarkCircle,
  IoChevronBackOutline,
  IoChevronForwardOutline,
  IoShieldCheckmarkOutline,
} from "react-icons/io5";

// 4 Core Dimensions of the SYICT Ecosystem
const ORBIT_NODES = [
  {
    id: "erp",
    index: "01",
    label: "Enterprise ERP",
    title: "Commercial ERP & Enterprise Software",
    categoryBadge: "Proprietary Software Systems",
    shortDesc: "Proprietary business systems (Smart HR, POS, HMS) deployed for real enterprises.",
    description:
      "We design, develop, and maintain high-performance enterprise suites deployed across commercial enterprises—featuring automated microservices, ISO-standard security, and 99.9% cloud uptime SLA.",
    photo:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&h=540&fit=crop",
    photoCaption: "Smart Enterprise ERP Cloud Architecture & Monitoring Dashboard",
    points: [
      "9+ proprietary software suites actively operating in the market",
      "End-to-end multi-tenant architecture with automated backups",
      "Integrated REST, GraphQL APIs & automated corporate workflows",
    ],
    metricValue: "9+ Commercial ERPs",
    metricLabel: "Active In Market",
    ctaLabel: "Explore ERP Suites",
    ctaHref: "/services",
    icon: IoCubeOutline,
    accentColor: "emerald",
  },
  {
    id: "agency",
    index: "02",
    label: "Global Agency",
    title: "Full-Cycle Digital Agency & Global IT Delivery",
    categoryBadge: "Worldwide Client Services",
    shortDesc: "Custom web, mobile, and AI automation for domestic and international clients.",
    description:
      "From high-growth international startups to domestic corporations, our dedicated engineering teams craft bespoke digital systems with transparent sprint delivery, strict QA, and 24/7 SLA maintenance.",
    photo:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=900&h=540&fit=crop",
    photoCaption: "SYICT Full-Stack Engineering Team in Active Production Sprint",
    points: [
      "500+ commercial web, mobile & cloud projects delivered worldwide",
      "Dedicated Agile engineering squads with 100% source code ownership",
      "Enterprise DevSecOps, automated CI/CD pipelines & SLA support",
    ],
    metricValue: "500+ Delivered Projects",
    metricLabel: "Worldwide Portfolio",
    ctaLabel: "Agency Solutions",
    ctaHref: "/services",
    icon: IoGlobeOutline,
    accentColor: "teal",
  },
  {
    id: "campuses",
    index: "03",
    label: "Physical Hubs",
    title: "14+ Regional Campuses & Workstation Labs",
    categoryBadge: "Nationwide Infrastructure",
    shortDesc: "14 real physical branch offices & high-spec hardware labs across Bangladesh.",
    description:
      "We are not an anonymous online course. Smart Youth ICT operates 14 physical branches equipped with air-conditioned hardware labs, enterprise dual-monitors, dedicated gigabit fiber, and walk-in consultation desks.",
    photo:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=900&h=540&fit=crop",
    photoCaption: "Central Campus Workstation Lab & Walk-in Corporate Hub",
    points: [
      "14 operational branches in Dhaka, Chattogram, Bogura, Sylhet & beyond",
      "Dedicated high-spec AC workstation labs with dual-monitor setups",
      "Walk-in corporate meeting rooms & full-time senior lab mentors",
    ],
    metricValue: "14 Physical Campuses",
    metricLabel: "Nationwide Hubs",
    ctaLabel: "Locate Nearest Hub",
    ctaHref: "/branches",
    icon: IoHardwareChipOutline,
    accentColor: "cyan",
  },
  {
    id: "academy",
    index: "04",
    label: "Talent Engine",
    title: "Production-Led Industrial Talent Engine",
    categoryBadge: "In-House Hiring Pipeline",
    shortDesc: "Students train on real commercial codebases and get hired directly.",
    description:
      "The bridge between education and enterprise software. Students don't build toy tutorial projects; they train directly within our agency codebases, qualifying for in-house hiring and partner company placements.",
    photo:
      "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=900&h=540&fit=crop",
    photoCaption: "1:1 Lead Architect Mentorship & Production Code Review",
    points: [
      "No toy tutorials—direct contribution to commercial microservices",
      "Direct hiring into SYICT software teams (BDT 35k+ avg starting salary)",
      "Dedicated international client bidding cell for verified Upwork/Fiverr gigs",
    ],
    metricValue: "BDT 35,000+ Avg",
    metricLabel: "Starting Placement Salary",
    ctaLabel: "Explore Programs",
    ctaHref: "/courses",
    icon: IoSchoolOutline,
    accentColor: "emerald",
  },
];

export default function WhyChooseUs() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const activeItem = ORBIT_NODES[activeIdx];

  // Optional subtle auto-rotation if user isn't actively inspecting
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % ORBIT_NODES.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [isPaused]);

  const handlePrev = () => {
    setActiveIdx((prev) => (prev - 1 + ORBIT_NODES.length) % ORBIT_NODES.length);
  };

  const handleNext = () => {
    setActiveIdx((prev) => (prev + 1) % ORBIT_NODES.length);
  };

  return (
    <section
      className="relative w-full py-8 sm:py-10 md:py-12 bg-white font-sans border-b border-slate-200/80 overflow-hidden"
      id="why-choose-us"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="container-custom relative z-10">
        {/* ── SECTION HEADER ── */}
        <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 border border-emerald-200/90 text-emerald-800 text-[11px] font-black uppercase tracking-wider rounded-full mb-2.5 shadow-xs">
            <IoSparklesOutline className="text-emerald-600" size={13} />
            <span>The SYICT Advantage</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tight leading-[1.15] mb-2">
            Why Choose{" "} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600">
              Smart Youth ICT
            </span>
          </h2>

          <p className="text-sm sm:text-lg text-slate-600 leading-relaxed font-normal max-w-3xl mx-auto">
            Explore our proprietary ERP software, global agency delivery, 14 physical campuses, and industrial talent engine.
          </p>
        </div>

        {/* ── MOBILE/TABLET COMPACT SELECTOR PILLS (Visible on < lg) ── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4 lg:hidden w-full">
          {ORBIT_NODES.map((node, i) => {
            const Icon = node.icon;
            const isSelected = activeIdx === i;
            return (
              <button
                key={node.id}
                onClick={() => setActiveIdx(i)}
                className={`flex flex-col items-center justify-center p-2 sm:p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                  isSelected
                    ? "bg-white border-emerald-500 shadow-md ring-2 ring-emerald-100 text-slate-900"
                    : "bg-slate-50/80 border-slate-200/80 text-slate-600 hover:bg-white"
                }`}
              >
                <div
                  className={`w-7 h-7 rounded-lg flex items-center justify-center mb-1 ${
                    isSelected ? "bg-emerald-600 text-white" : "bg-slate-200/70 text-slate-700"
                  }`}
                >
                  <Icon size={14} />
                </div>
                <span className="block text-[9px] font-mono text-slate-400 font-bold">
                  {node.index}
                </span>
                <span className="block text-[11px] font-black truncate">{node.label}</span>
              </button>
            );
          })}
        </div>

        {/* ── DESKTOP RADIAL ORBIT HUB (Strict 12-Col Grid Aligned with Navbar) ── */}
        <div className="relative w-full grid grid-cols-1 lg:grid-cols-12 gap-4 xl:gap-6 items-center">
          
          {/* Circular Orbit Guide Track (Decorative Background on lg) */}
          <div className="hidden lg:block absolute inset-0 m-auto w-[90%] max-w-[680px] h-[440px] rounded-full border border-dashed border-emerald-200/60 pointer-events-none -z-0" />

          {/* ── LEFT SATELLITE COLUMN (Nodes 01 & 03 — Centered Content) ── */}
          <div className="hidden lg:flex lg:col-span-3 flex-col gap-3.5 xl:gap-4 z-10">
            {[ORBIT_NODES[0], ORBIT_NODES[2]].map((node) => {
              const realIndex = ORBIT_NODES.findIndex((n) => n.id === node.id);
              const isSelected = activeIdx === realIndex;
              const Icon = node.icon;

              return (
                <div
                  key={node.id}
                  onClick={() => setActiveIdx(realIndex)}
                  className={`relative p-3.5 xl:p-4 rounded-2xl border transition-all duration-300 cursor-pointer group text-center flex flex-col items-center justify-between ${
                    isSelected
                      ? "bg-white border-emerald-500 shadow-xl shadow-emerald-500/10 ring-4 ring-emerald-50 scale-[1.02]"
                      : "bg-white/80 hover:bg-white border-slate-200/90 hover:border-slate-300 shadow-xs hover:shadow-md"
                  }`}
                >
                  {/* Centered Top Active Indicator Pill */}
                  {isSelected && (
                    <motion.div
                      layoutId="active-orbit-indicator"
                      className="absolute top-0 left-1/4 right-1/4 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-b-full shadow-xs"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}

                  {/* Centered Icon & Index Badge */}
                  <div className="relative mb-2 flex items-center justify-center">
                    <div
                      className={`w-9 h-9 xl:w-10 xl:h-10 rounded-xl flex items-center justify-center transition-all ${
                        isSelected
                          ? "bg-emerald-600 text-white shadow-xs ring-4 ring-emerald-50"
                          : "bg-slate-100 text-slate-700 group-hover:bg-emerald-50 group-hover:text-emerald-700"
                      }`}
                    >
                      <Icon size={18} />
                    </div>
                    <span className="absolute -top-1.5 -right-2 px-1.5 py-0.5 bg-slate-900 text-white text-[9px] font-mono font-black rounded-full leading-none shadow-xs">
                      {node.index}
                    </span>
                  </div>

                  <h4 className="text-xs xl:text-sm font-black text-slate-900 mb-1 group-hover:text-emerald-700 transition-colors leading-snug text-center">
                    {node.title}
                  </h4>
                  <p className="text-[11px] text-slate-500 leading-snug line-clamp-2 text-center mb-2">
                    {node.shortDesc}
                  </p>

                  <div className="w-full pt-2 border-t border-slate-100 flex items-center justify-center gap-2 text-[10px] font-bold">
                    <span className="text-slate-900">{node.metricValue}</span>
                    <span className="text-slate-300">•</span>
                    <span className="text-emerald-600 group-hover:underline">
                      {isSelected ? "Inspecting" : "Click to View →"}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ── CENTER SPOTLIGHT STAGE (Dynamic Living Showcase) ── */}
          <div className="lg:col-span-6 w-full flex flex-col items-center justify-center z-10">
            <div className="w-full max-w-[460px] xl:max-w-[490px] relative bg-white rounded-3xl border-2 border-emerald-500/80 shadow-2xl shadow-emerald-500/15 overflow-hidden flex flex-col justify-between">
              
              {/* Top Accent Gradient Line */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 z-20" />

              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={activeItem.id}
                  initial={{ opacity: 0, y: 10, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.98 }}
                  transition={{
                    duration: 0.28,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="flex flex-col"
                >
                  {/* Real Photograph Header (Seamless Gradient Blend into Card Body) */}
                  <div className="relative w-full h-48 sm:h-52 overflow-hidden bg-white group/img">
                    <Image
                      src={activeItem.photo}
                      alt={activeItem.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover/img:scale-105"
                      sizes="(max-width: 768px) 100vw, 500px"
                      priority
                    />
                    
                    {/* Top Subtle Vignette for Badges */}
                    <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-slate-950/40 to-transparent z-10 pointer-events-none" />

                    {/* Top Floating Badge & Index */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 z-20">
                      <span className="px-2.5 py-0.5 rounded-full bg-white/95 backdrop-blur-md text-slate-800 text-[10px] font-black uppercase tracking-wider border border-white/60 shadow-xs">
                        {activeItem.categoryBadge}
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-slate-950/80 backdrop-blur-md text-white text-[10px] font-mono font-bold border border-white/20">
                        {activeItem.index} / 04
                      </span>
                    </div>

                    {/* ── SEAMLESS GRADIENT BLEND (Eliminates the sharp line & merges into white card) ── */}
                    <div className="absolute inset-x-0 bottom-0 h-20 sm:h-24 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none z-10" />

                    {/* Floating Micro Caption Badge Over the Blend */}
                    <div className="absolute bottom-2.5 left-1/2 -translate-y-0 -translate-x-1/2 z-20 px-3 py-1 bg-white/95 backdrop-blur-md rounded-full text-slate-700 text-[10px] font-bold shadow-xs border border-slate-200/80 whitespace-nowrap max-w-[90%] flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                      <span className="truncate">{activeItem.photoCaption}</span>
                    </div>
                  </div>

                  {/* Body Details (Seamlessly Connected) */}
                  <div className="p-4 sm:p-5 pt-2 flex-1 flex flex-col justify-between items-center text-center">
                    <div className="w-full flex flex-col items-center">
                      {/* Active Title */}
                      <h3 className="text-base sm:text-lg font-black text-slate-900 tracking-tight leading-snug mb-1.5 text-center">
                        {activeItem.title}
                      </h3>

                      {/* Description */}
                      <p className="text-xs text-slate-600 leading-relaxed font-normal mb-3 text-center max-w-sm mx-auto">
                        {activeItem.description}
                      </p>

                      {/* 3 Checkpoint Proofs (Centered Block with Aligned Checks) */}
                      <div className="space-y-1.5 mb-3.5 text-[11px] sm:text-xs text-slate-700 inline-flex flex-col items-start mx-auto text-left">
                        {activeItem.points.map((pt, i) => (
                          <div key={i} className="flex items-start gap-2">
                            <IoCheckmarkCircle
                              size={15}
                              className="text-emerald-600 shrink-0 mt-0.5"
                            />
                            <span className="leading-snug">{pt}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Stage Footer: Metric Highlight & Action Button */}
                    <div className="w-full pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
                      <div className="text-center sm:text-left">
                        <span className="block text-sm sm:text-base font-black text-slate-900 leading-none">
                          {activeItem.metricValue}
                        </span>
                        <span className="block text-[10px] font-bold text-slate-400 mt-0.5 uppercase tracking-wider">
                          {activeItem.metricLabel}
                        </span>
                      </div>

                      <Link
                        href={activeItem.ctaHref}
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-xl text-xs font-black uppercase tracking-wider shadow-xs hover:shadow-md transition-all group/btn"
                      >
                        <span>{activeItem.ctaLabel}</span>
                        <IoArrowForwardOutline
                          size={12}
                          className="group-hover/btn:translate-x-0.5 transition-transform"
                        />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Orbit Navigation Controls (< Prev, Indicator Dots, Next >) */}
            <div className="flex items-center justify-between mt-3 px-1 w-full max-w-[460px] xl:max-w-[490px]">
              <button
                onClick={handlePrev}
                className="w-8 h-8 rounded-full bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 flex items-center justify-center transition shadow-xs cursor-pointer hover:border-emerald-300"
                title="Previous dimension"
              >
                <IoChevronBackOutline size={14} />
              </button>

              {/* 4 Step Dots */}
              <div className="flex items-center gap-1.5">
                {ORBIT_NODES.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveIdx(i)}
                    className={`h-2 rounded-full transition-all duration-400 ease-out cursor-pointer ${
                      activeIdx === i
                        ? "w-7 bg-emerald-600 shadow-xs"
                        : "w-2 bg-slate-300 hover:bg-slate-400"
                    }`}
                    title={`Go to dimension ${i + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={handleNext}
                className="w-8 h-8 rounded-full bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 flex items-center justify-center transition shadow-xs cursor-pointer hover:border-emerald-300"
                title="Next dimension"
              >
                <IoChevronForwardOutline size={14} />
              </button>
            </div>
          </div>

          {/* ── RIGHT SATELLITE COLUMN (Nodes 02 & 04 — Pinned to Right Boundary matching Navbar CTA) ── */}
          <div className="hidden lg:flex lg:col-span-3 flex-col gap-3.5 xl:gap-4 z-10">
            {[ORBIT_NODES[1], ORBIT_NODES[3]].map((node) => {
              const realIndex = ORBIT_NODES.findIndex((n) => n.id === node.id);
              const isSelected = activeIdx === realIndex;
              const Icon = node.icon;

              return (
                <div
                  key={node.id}
                  onClick={() => setActiveIdx(realIndex)}
                  className={`relative p-3.5 xl:p-4 rounded-2xl border transition-all duration-300 cursor-pointer group text-center flex flex-col items-center justify-between ${
                    isSelected
                      ? "bg-white border-emerald-500 shadow-xl shadow-emerald-500/10 ring-4 ring-emerald-50 scale-[1.02]"
                      : "bg-white/80 hover:bg-white border-slate-200/90 hover:border-slate-300 shadow-xs hover:shadow-md"
                  }`}
                >
                  {/* Centered Top Active Indicator Pill */}
                  {isSelected && (
                    <motion.div
                      layoutId="active-orbit-indicator"
                      className="absolute top-0 left-1/4 right-1/4 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-b-full shadow-xs"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}

                  {/* Centered Icon & Index Badge */}
                  <div className="relative mb-2 flex items-center justify-center">
                    <div
                      className={`w-9 h-9 xl:w-10 xl:h-10 rounded-xl flex items-center justify-center transition-all ${
                        isSelected
                          ? "bg-emerald-600 text-white shadow-xs ring-4 ring-emerald-50"
                          : "bg-slate-100 text-slate-700 group-hover:bg-emerald-50 group-hover:text-emerald-700"
                      }`}
                    >
                      <Icon size={18} />
                    </div>
                    <span className="absolute -top-1.5 -right-2 px-1.5 py-0.5 bg-slate-900 text-white text-[9px] font-mono font-black rounded-full leading-none shadow-xs">
                      {node.index}
                    </span>
                  </div>

                  <h4 className="text-xs xl:text-sm font-black text-slate-900 mb-1 group-hover:text-emerald-700 transition-colors leading-snug text-center">
                    {node.title}
                  </h4>
                  <p className="text-[11px] text-slate-500 leading-snug line-clamp-2 text-center mb-2">
                    {node.shortDesc}
                  </p>

                  <div className="w-full pt-2 border-t border-slate-100 flex items-center justify-center gap-2 text-[10px] font-bold">
                    <span className="text-slate-900">{node.metricValue}</span>
                    <span className="text-slate-300">•</span>
                    <span className="text-emerald-600 group-hover:underline">
                      {isSelected ? "Inspecting" : "Click to View →"}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

        {/* ── SINGLE ACTION TEXT LINK (Text Only, No BG/Border) ── */}
        <div className="mt-6 sm:mt-7 flex justify-center">
          <Link
            href="/seminar"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-black uppercase tracking-wider text-emerald-600 hover:text-emerald-700 transition-colors group cursor-pointer"
          >
            <span>Book Campus Visit</span>
            <IoArrowForwardOutline
              size={14}
              className="group-hover:translate-x-1.5 transition-transform"
            />
          </Link>
        </div>

      </div>
    </section>
  );
}
