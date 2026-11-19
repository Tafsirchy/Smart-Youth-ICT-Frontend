"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  IoSparklesOutline,
  IoCodeSlashOutline,
  IoPeopleOutline,
  IoBriefcaseOutline,
  IoHardwareChipOutline,
  IoArrowForwardOutline,
  IoCheckmarkCircle,
} from "react-icons/io5";

const PILLARS = [
  {
    id: "production-code",
    tabLabel: "Live Production Code",
    tag: "Industry Methodology",
    title: "Direct Contributions to Real Commercial Codebases",
    shortBadge: "Zero Toy Tutorials",
    description:
      "We strictly reject artificial slide decks and toy tutorial projects. Our apprentices and learners train inside real enterprise SaaS codebases, microservices, and database schemas under strict commercial engineering standards.",
    photo:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=900&h=700&fit=crop",
    photoCaption: "Production Cloud Microservices & Live Sprint Pipeline",
    points: [
      "Real Git CI/CD workflows with strict Pull Request & peer code reviews",
      "Production-grade Docker environments, Redis caching & relational schemas",
      "Tangible commercial portfolio contributions to show global tech recruiters",
    ],
    metricValue: "0 Toy Tutorials",
    metricLabel: "100% Commercial Code",
    ctaLabel: "Explore Curriculum",
    ctaHref: "/courses",
    icon: IoCodeSlashOutline,
  },
  {
    id: "architect-mentorship",
    tabLabel: "1:1 Architect Review",
    tag: "Senior Mentorship",
    title: "Mentorship by Practicing Senior Software Architects",
    shortBadge: "Daily 1:1 Code Audits",
    description:
      "Learn directly from senior engineers who architect commercial ERPs, mobile systems, and cloud infrastructure daily. Receive meticulous code audits, refactoring strategies, and tailored guidance at your own pace.",
    photo:
      "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=900&h=700&fit=crop",
    photoCaption: "Lead Architect Pair-Programming & Architectural Audit",
    points: [
      "Rigorous 1:1 code refactoring sessions on architectural best practices",
      "Direct technical mentorship from active senior industry architects",
      "Lifetime private developer community access with dedicated bug-squashing desks",
    ],
    metricValue: "1:1 Review",
    metricLabel: "Daily Senior Feedback",
    ctaLabel: "Meet Our Faculty",
    ctaHref: "/about",
    icon: IoPeopleOutline,
  },
  {
    id: "placement-pipeline",
    tabLabel: "In-House Hiring Cell",
    tag: "Career Outcomes",
    title: "Direct In-House Hiring & Corporate Placement Pipeline",
    shortBadge: "Guaranteed Placement Cell",
    description:
      "The most direct bridge from education to employment. Top performers are recruited straight into SYICT's internal software engineering squads, while graduates enter our partner network across leading IT companies.",
    photo:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=900&h=700&fit=crop",
    photoCaption: "SYICT Full-Stack Engineering Team in Active Production Sprint",
    points: [
      "Direct recruitment pathway into SYICT enterprise software divisions",
      "BDT 35,000+ average starting salary for in-house engineering recruits",
      "Dedicated international client bidding cell for verified Upwork/Fiverr gigs",
    ],
    metricValue: "BDT 35K+ Avg",
    metricLabel: "Starting Placement Salary",
    ctaLabel: "Placement Details",
    ctaHref: "/about/why-choose-us",
    icon: IoBriefcaseOutline,
  },
  {
    id: "physical-campuses",
    tabLabel: "14+ Regional Campus Labs",
    tag: "Physical Reality",
    title: "14 Physical Branches with High-Spec AC Hardware Labs",
    shortBadge: "Nationwide Infrastructure",
    description:
      "We are not an anonymous Zoom link. Smart Youth ICT operates 14 physical branches across Bangladesh, equipped with air-conditioned workstation labs, high-speed gigabit fiber, and walk-in consultation desks.",
    photo:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=900&h=700&fit=crop",
    photoCaption: "Central Campus Workstation Lab & Walk-in Corporate Hub",
    points: [
      "14 fully equipped operational branches across Dhaka, Chattogram, Sylhet & Bogura",
      "Dual-monitor AC workstations with dedicated uninterrupted gigabit fiber",
      "Walk-in lifetime physical lab access for hands-on collaborative building",
    ],
    metricValue: "14 Campuses",
    metricLabel: "64-District Footprint",
    ctaLabel: "Locate Nearest Hub",
    ctaHref: "/branches",
    icon: IoHardwareChipOutline,
  },
];

export default function WhyChooseUs() {
  const [activeIdx, setActiveIdx] = useState(0);
  const activeItem = PILLARS[activeIdx];

  return (
    <section
      className="relative w-full py-12 sm:py-16 md:py-20 bg-white font-sans border-b border-slate-200/80 overflow-hidden"
      id="why-choose-us"
    >
      <div className="container-custom relative z-10">
        {/* ── SECTION HEADER (Centered & Clean) ── */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-2xl mx-auto mb-8 sm:mb-10"
        >
          <p className="text-[10px] sm:text-xs font-black uppercase tracking-[0.22em] text-emerald-600 mb-2">
            The SYICT Advantage
          </p>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tight leading-[1.15] mb-3">
            Why Choose{" "} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600">
              Smart Youth ICT
            </span>
          </h2>

          <p className="text-sm sm:text-lg text-slate-600 leading-relaxed font-normal max-w-2xl mx-auto">
            Four fundamental pillars that separate real industrial engineering from basic classroom tutorials.
          </p>
        </motion.div>

        {/* ── HORIZONTAL TAB PILLS (Aligned with Navbar Grid) ── */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-8 sm:mb-10 w-full"
        >
          {PILLARS.map((pillar, i) => {
            const Icon = pillar.icon;
            const isSelected = activeIdx === i;

            return (
              <motion.button
                key={pillar.id}
                onClick={() => setActiveIdx(i)}
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className={`relative flex items-center gap-2 px-4 py-2.5 sm:px-5 sm:py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer select-none ${
                  isSelected
                    ? "bg-white text-emerald-950 border border-emerald-500 shadow-md ring-2 ring-emerald-100/80"
                    : "bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200/80 hover:text-slate-900"
                }`}
              >
                <div
                  className={`w-6 h-6 rounded-lg flex items-center justify-center transition-colors ${
                    isSelected ? "bg-emerald-600 text-white" : "text-slate-500"
                  }`}
                >
                  <Icon size={14} />
                </div>
                <span>{pillar.tabLabel}</span>

                {isSelected && (
                  <motion.div
                    layoutId="active-why-tab-indicator"
                    className="absolute -bottom-1 left-4 right-4 h-0.5 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </motion.button>
            );
          })}
        </motion.div>

        {/* ── 2-COLUMN CALM SHOWCASE CARD (Full Width Aligned with Navbar Container) ── */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.985 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.65, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
          className="w-full bg-white rounded-3xl border border-slate-200/90 shadow-xl shadow-slate-100/80 overflow-hidden relative"
        >
          {/* Subtle Accent Glow Line on Top */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500" />

          <AnimatePresence mode="wait">
            <motion.div
              key={activeItem.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 lg:grid-cols-12 items-stretch"
            >
              {/* ── Left Content Column (7 Cols on Desktop) ── */}
              <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10 xl:p-12 flex flex-col justify-between">
                <div>
                  {/* Category Tag & Badge */}
                  <div className="flex flex-wrap items-center gap-2 mb-3.5">
                    <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-[11px] font-black uppercase tracking-wider border border-emerald-200/80">
                      {activeItem.tag}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[11px] font-bold border border-slate-200/80">
                      {activeItem.shortBadge}
                    </span>
                  </div>

                  {/* Active Heading */}
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900 tracking-tight leading-snug mb-3 text-left">
                    {activeItem.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal mb-6 text-left max-w-2xl">
                    {activeItem.description}
                  </p>

                  {/* 3 Checkpoint Proofs (Staggered Animation on Tab Switch) */}
                  <div className="space-y-3 mb-6 sm:mb-8 text-left">
                    {activeItem.points.map((point, idx) => (
                      <motion.div
                        key={`${activeItem.id}-${idx}`}
                        initial={{ opacity: 0, x: -14 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          duration: 0.35,
                          delay: 0.08 + idx * 0.07,
                          ease: [0.16, 1, 0.3, 1],
                        }}
                        className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 font-medium"
                      >
                        <IoCheckmarkCircle
                          size={18}
                          className="text-emerald-600 shrink-0 mt-0.5"
                        />
                        <span className="leading-snug">{point}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Footer Action Row: Metric & Link */}
                <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <span className="block text-base sm:text-lg font-black text-slate-900 leading-tight">
                      {activeItem.metricValue}
                    </span>
                    <span className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mt-0.5">
                      {activeItem.metricLabel}
                    </span>
                  </div>

                  <Link
                    href={activeItem.ctaHref}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-xl text-xs font-black uppercase tracking-wider shadow-sm hover:shadow-md transition-all group cursor-pointer"
                  >
                    <span>{activeItem.ctaLabel}</span>
                    <IoArrowForwardOutline
                      size={13}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </Link>
                </div>
              </div>

              {/* ── Right Photography Column (5 Cols on Desktop) ── */}
              <div className="lg:col-span-5 p-4 sm:p-6 lg:p-8 flex items-center justify-center bg-slate-50/60 border-t lg:border-t-0 lg:border-l border-slate-100">
                <motion.div
                  key={`photo-${activeItem.id}`}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className="relative w-full h-[280px] sm:h-[340px] lg:h-[400px] xl:h-[420px] rounded-2xl overflow-hidden shadow-md border border-slate-200/80 group/photo"
                >
                  <Image
                    src={activeItem.photo}
                    alt={activeItem.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover/photo:scale-105"
                    sizes="(max-width: 1024px) 100vw, 550px"
                    priority
                  />

                  {/* Subtle Vignette Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent pointer-events-none" />

                  {/* Floating Live Status Pill over the photo */}
                  <div className="absolute bottom-3 left-3 right-3 z-10 px-3 py-1.5 bg-white/95 backdrop-blur-md rounded-xl text-slate-800 text-[11px] font-bold shadow-sm border border-white/60 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                    <span className="truncate">{activeItem.photoCaption}</span>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* ── SUBTLE BOTTOM EXPLORATION LINK ── */}
        <div className="mt-8 text-center">
          <Link
            href="/seminar"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-500 hover:text-emerald-600 transition-colors group cursor-pointer"
          >
            <span>Interested in visiting a physical workstation lab?</span>
            <span className="text-emerald-600 font-black group-hover:underline inline-flex items-center gap-1">
              Book a Free Campus Tour <IoArrowForwardOutline size={13} />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
