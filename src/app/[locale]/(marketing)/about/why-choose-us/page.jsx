"use client";

import { motion } from "framer-motion";
import {
  IoRocketOutline,
  IoShieldCheckmarkOutline,
  IoBriefcaseOutline,
  IoHeadsetOutline,
  IoCodeSlashOutline,
  IoGlobeOutline,
  IoCheckmarkCircleOutline,
  IoArrowForwardOutline,
} from "react-icons/io5";

const features = [
  {
    number: "01",
    tag: "Methodology",
    title: "100% Practical Learning",
    description:
      "No boring slide decks. Every module requires you to write code, design interfaces, or run live campaigns in a sandbox environment.",
    icon: IoCodeSlashOutline,
    badgeBg: "bg-emerald-50 text-brand-green border-emerald-200/70",
    hoverBorder: "hover:border-emerald-300",
    colSpan: "col-span-1 md:col-span-2",
    highlight: "Live Production Labs",
  },
  {
    number: "02",
    tag: "Deliverables",
    title: "Real Client Projects",
    description:
      "Graduate with a portfolio full of production-ready work that commands attention from international recruiters.",
    icon: IoBriefcaseOutline,
    badgeBg: "bg-blue-50 text-blue-600 border-blue-200/70",
    hoverBorder: "hover:border-blue-300",
    colSpan: "col-span-1",
    highlight: "Proof of Work",
  },
  {
    number: "03",
    tag: "Mentorship",
    title: "24/7 Dedicated Support",
    description:
      "Stuck on a bug at 2 AM? Our mentor network and active community are always available to help you push through obstacles.",
    icon: IoHeadsetOutline,
    badgeBg: "bg-amber-50 text-amber-600 border-amber-200/70",
    hoverBorder: "hover:border-amber-300",
    colSpan: "col-span-1",
    highlight: "Always On Support",
  },
  {
    number: "04",
    tag: "Remote Work",
    title: "Global Marketplace Prep",
    description:
      "Learn how to dominate remote job boards, write winning proposals, communicate effectively with clients, and price your services fairly.",
    icon: IoGlobeOutline,
    badgeBg: "bg-cyan-50 text-cyan-700 border-cyan-200/70",
    hoverBorder: "hover:border-cyan-300",
    colSpan: "col-span-1 md:col-span-2",
    highlight: "Global Talent Ready",
  },
  {
    number: "05",
    tag: "Curriculum",
    title: "Rapid Career Growth",
    description:
      "Our syllabus is rigorously reviewed and updated every 3 months to match real-time shifts in AI, web development, and digital marketing.",
    icon: IoRocketOutline,
    badgeBg: "bg-rose-50 text-brand-pink border-rose-200/70",
    hoverBorder: "hover:border-rose-300",
    colSpan: "col-span-1 md:col-span-2",
    highlight: "AI-Augmented Tracks",
  },
  {
    number: "06",
    tag: "Credentials",
    title: "Verified Certifications",
    description:
      "Receive verifiable, globally recognized credentials backed by industry partnerships upon graduation.",
    icon: IoShieldCheckmarkOutline,
    badgeBg: "bg-purple-50 text-purple-600 border-purple-200/70",
    hoverBorder: "hover:border-purple-300",
    colSpan: "col-span-1",
    highlight: "Verifiable Credential",
  },
];

export default function WhyChooseUsPage() {
  return (
    <section className="min-h-screen bg-slate-50 pt-12 sm:pt-18 pb-12 md:pb-16 flex flex-col font-sans relative">
      <div className="container-custom relative z-10">
        {/* Compact Header */}
        <div className="max-w-4xl mx-auto text-center mb-8 md:mb-10">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200/70 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-2.5 shadow-xs"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-brand-green animate-pulse" />
            <span>The Smart Youth Advantage</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 leading-[1.2] mb-2 tracking-tight"
          >
            Why Choose{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-pink to-rose-500">
              Our Platform.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-slate-600 text-sm md:text-base leading-[1.6] font-normal max-w-3xl mx-auto"
          >
            We don't just teach courses. We engineer career transformations<br className="hidden sm:inline" />{" "}
            through rigorous practical learning and unyielding mentor support.
          </motion.p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-4 max-w-5xl mx-auto">
          {features.map((feat, i) => {
            const Icon = feat.icon;
            return (
              <motion.div
                key={feat.number}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ delay: i * 0.05, duration: 0.35 }}
                whileHover={{ y: -2 }}
                className={`p-4 sm:p-5 border border-slate-200/90 bg-white rounded-2xl shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between group ${feat.colSpan} ${feat.hoverBorder}`}
              >
                {/* Top Row: Icon + Meta Tag + Directed Indicator */}
                <div className="flex items-center justify-between mb-3">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center border shadow-xs group-hover:scale-105 transition-transform ${feat.badgeBg}`}
                  >
                    <Icon size={18} />
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                        {feat.number}
                      </span>
                      <span className="text-slate-300">•</span>
                      <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-slate-50 border border-slate-200/70 text-[9px] font-bold text-slate-600 uppercase tracking-wider">
                        <IoCheckmarkCircleOutline className="text-brand-green" size={11} />
                        {feat.tag}
                      </span>
                    </div>

                    {/* Header Directed Indicator with Smooth Animation */}
                    <motion.div
                      animate={{ x: [0, 3, 0] }}
                      transition={{
                        repeat: Infinity,
                        duration: 1.8,
                        ease: "easeInOut",
                        delay: i * 0.15,
                      }}
                      className="w-6 h-6 rounded-full bg-slate-50 border border-slate-200/80 flex items-center justify-center text-slate-400 group-hover:text-brand-pink group-hover:border-brand-pink/40 group-hover:bg-rose-50 transition-all duration-200 shrink-0"
                    >
                      <IoArrowForwardOutline size={12} />
                    </motion.div>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h2 className="text-base sm:text-lg font-black text-slate-900 tracking-tight leading-tight mb-1 group-hover:text-slate-800 transition-colors">
                    {feat.title}
                  </h2>
                  <p className="text-slate-600 text-xs sm:text-sm leading-[1.6] font-normal">
                    {feat.description}
                  </p>
                </div>

                {/* Footer Directed Action Strip */}
                <div className="flex items-center justify-between pt-2.5 mt-3 border-t border-slate-100">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    {feat.highlight}
                  </span>
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-500 group-hover:text-brand-pink transition-colors">
                    <span>Explore</span>
                    <motion.span
                      animate={{ x: [0, 3.5, 0] }}
                      transition={{
                        repeat: Infinity,
                        duration: 1.5,
                        ease: "easeInOut",
                        delay: i * 0.15,
                      }}
                      className="inline-flex items-center"
                    >
                      <IoArrowForwardOutline size={12} />
                    </motion.span>
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Mobile Sticky CTA */}
      <div className="fixed bottom-0 left-0 w-full p-3 bg-white/95 backdrop-blur-md border-t border-slate-200 z-50 md:hidden flex items-center justify-between shadow-[0_-10px_40px_rgba(0,0,0,0.05)] pb-[max(0.75rem,env(safe-area-inset-bottom))]">
        <div>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-[1.4]">Next Step</p>
          <p className="text-slate-900 font-bold text-sm leading-[1.4]">Join the Program</p>
        </div>
        <button className="px-5 py-2.5 bg-brand-pink text-white font-bold text-[10px] uppercase tracking-widest shadow-md shadow-brand-pink/30 rounded-md leading-[1.4]">
          Apply Now
        </button>
      </div>
    </section>
  );
}
