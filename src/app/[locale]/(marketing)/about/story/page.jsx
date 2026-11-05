"use client";

import { motion } from "framer-motion";
import {
  IoBulbOutline,
  IoTerminalOutline,
  IoRocketOutline,
  IoGlobeOutline,
  IoCheckmarkCircleOutline,
} from "react-icons/io5";

const STORY_MILESTONES = [
  {
    phase: "Phase 01",
    tagline: "The Genesis",
    title: "Recognizing the Skill Gap",
    description:
      "We realized that while many youths were graduating, very few had the hands-on skills required to land a job or start freelancing. Our founders began mentoring small groups in local communities to test a project-first learning approach.",
    accent: "from-pink-500 to-rose-500",
    borderGlow: "group-hover:border-pink-500/30",
    badgeBg: "bg-pink-50 text-pink-600 border-pink-200/60",
    icon: IoBulbOutline,
    highlight: "Project-First Mentorship",
  },
  {
    phase: "Phase 02",
    tagline: "First Cohort",
    title: "Opening Doors to Practical Training",
    description:
      "Equipped with a few computers and a passion for teaching, we officially launched our training center. The curriculum bypassed traditional lectures, focusing entirely on tangible deliverables and real-world scenarios right from day one.",
    accent: "from-emerald-500 to-teal-500",
    borderGlow: "group-hover:border-emerald-500/30",
    badgeBg: "bg-emerald-50 text-emerald-600 border-emerald-200/60",
    icon: IoTerminalOutline,
    highlight: "100% Tangible Deliverables",
  },
  {
    phase: "Phase 03",
    tagline: "Market Expansion",
    title: "Introducing Freelancing Tracks",
    description:
      "As the digital economy grew, we saw a critical need for specialized and remote work training. We expanded our curriculum to include advanced UI/UX Design, full-stack development, AI tools integration, and targeted Digital Marketing.",
    accent: "from-blue-500 to-indigo-500",
    borderGlow: "group-hover:border-blue-500/30",
    badgeBg: "bg-blue-50 text-blue-600 border-blue-200/60",
    icon: IoRocketOutline,
    highlight: "Global Remote Tracks",
  },
  {
    phase: "Phase 04",
    tagline: "Today & Beyond",
    title: "Empowering Thousands Globally",
    description:
      "We now maintain an integrated ecosystem, serving massive cohorts of learners. Working closely with industry partners, we successfully guide students into sustainable freelancing careers and highly engaging remote job placements.",
    accent: "from-purple-500 to-violet-600",
    borderGlow: "group-hover:border-purple-500/30",
    badgeBg: "bg-purple-50 text-purple-600 border-purple-200/60",
    icon: IoGlobeOutline,
    highlight: "Integrated Tech Ecosystem",
  },
];

const JOURNEY_STATS = [
  { label: "Founded", value: "2021", detail: "Grassroots Tech Initiative" },
  { label: "Active Hubs", value: "13+", detail: "Physical Labs Nationwide" },
  { label: "Curricula", value: "25+", detail: "Market-Aligned Tracks" },
  { label: "Hands-on Ratio", value: "100%", detail: "Project-Based Learning" },
];

export default function StoryPage() {
  return (
    <section className="min-h-screen bg-slate-50 pt-12 sm:pt-18 pb-12 md:pb-16 flex flex-col font-sans relative overflow-hidden">


      <div className="container-custom relative z-10">
        {/* Compact Header (No giant dedicated banner) */}
        <div className="max-w-4xl mx-auto mb-6 md:mb-8">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-pink-50 border border-pink-200/70 text-pink-700 text-xs font-bold uppercase tracking-wider mb-2.5 shadow-xs"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-brand-pink animate-pulse" />
            <span>Origin &amp; Evolution</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 leading-[1.2] mb-2 tracking-tight"
          >
            Our{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-pink via-rose-500 to-brand-green">
              Story.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-slate-600 text-sm md:text-base leading-[1.6] font-normal max-w-4xl"
          >
            It all started with a simple observation: there is a huge gap between traditional education and<br className="hidden sm:inline" />{" "}
            what the tech industry actually demands. We built Smart Youth ICT to bridge that gap with brutal efficiency.
          </motion.p>
        </div>

        {/* Journey Stats Strip (Information-dense) */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-2.5 mb-8 md:mb-10"
        >
          {JOURNEY_STATS.map((s, idx) => (
            <div
              key={idx}
              className="bg-white/90 backdrop-blur-xs p-3 sm:p-3.5 rounded-xl border border-slate-200/80 shadow-xs hover:border-slate-300 transition-colors"
            >
              <div className="flex items-baseline justify-between">
                <span className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  {s.value}
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  {s.label}
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium mt-0.5 leading-snug">
                {s.detail}
              </p>
            </div>
          ))}
        </motion.div>

        {/* Creative Interactive Timeline Rail */}
        <div className="max-w-4xl mx-auto relative">
          {/* Animated Gradient Rail */}
          <div className="absolute left-4 sm:left-6 top-3 bottom-6 w-0.5 bg-gradient-to-b from-pink-500 via-emerald-500 to-purple-600 opacity-30 rounded-full" />

          <div className="space-y-4 sm:space-y-5">
            {STORY_MILESTONES.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.phase}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ delay: index * 0.08, duration: 0.4 }}
                  className="relative pl-10 sm:pl-14 group"
                >
                  {/* Floating Pulsing Indicator Dot */}
                  <div className="absolute left-2.5 sm:left-4.5 top-5 -translate-x-1/2 flex items-center justify-center">
                    <span className={`w-3.5 h-3.5 rounded-full bg-gradient-to-r ${item.accent} shadow-sm group-hover:scale-125 transition-transform duration-300 ring-4 ring-white`} />
                  </div>

                  {/* Card Container */}
                  <div
                    className={`bg-white border border-slate-200/80 rounded-2xl p-4 sm:p-5 shadow-xs hover:shadow-lg transition-all duration-300 ${item.borderGlow}`}
                  >
                    {/* Header Row: Phase + Highlight Pill */}
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-7 h-7 rounded-lg flex items-center justify-center border shadow-xs ${item.badgeBg}`}
                        >
                          <Icon size={15} />
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                              {item.phase}
                            </span>
                            <span className="text-slate-300">•</span>
                            <span className="text-[11px] font-bold text-slate-700">
                              {item.tagline}
                            </span>
                          </div>
                        </div>
                      </div>

                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-50 border border-slate-200/60 text-[10px] font-bold text-slate-600 leading-none">
                        <IoCheckmarkCircleOutline className="text-emerald-500" size={12} />
                        {item.highlight}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-base sm:text-lg font-black text-slate-900 mb-1.5 tracking-tight group-hover:text-slate-700 transition-colors">
                      {item.title}
                    </h3>

                    {/* Body Text */}
                    <p className="text-slate-600 text-xs sm:text-sm leading-[1.6] font-normal">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Mobile Sticky CTA */}
      <div className="fixed bottom-0 left-0 w-full p-3 bg-white/95 backdrop-blur-md border-t border-slate-200 z-50 md:hidden flex items-center justify-between shadow-[0_-10px_40px_rgba(0,0,0,0.05)] pb-[max(0.75rem,env(safe-area-inset-bottom))]">
        <div>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-[1.4]">
            Next Step
          </p>
          <p className="text-slate-900 font-bold text-sm leading-[1.4]">
            Join the Program
          </p>
        </div>
        <button className="px-5 py-2.5 bg-brand-pink text-white font-bold text-[10px] uppercase tracking-widest shadow-md shadow-brand-pink/30 rounded-md leading-[1.4]">
          Apply Now
        </button>
      </div>
    </section>
  );
}
