"use client";

import { motion } from "framer-motion";
import {
  IoSearchOutline,
  IoTerminalOutline,
  IoBriefcaseOutline,
  IoSchoolOutline,
  IoRocketOutline,
  IoCheckmarkCircleOutline,
} from "react-icons/io5";

const steps = [
  {
    number: "01",
    phase: "Phase 01",
    title: "Discover & Consult",
    tag: "Consultation",
    description:
      "Explore our diverse expert-led courses and career tracks. Speak to an advisory counselor to find the path that precisely matches your technical goals, whether it's software engineering, product design, or digital marketing.",
    icon: IoSearchOutline,
    accent: "text-emerald-600 bg-emerald-50 border-emerald-200/70",
  },
  {
    number: "02",
    phase: "Phase 02",
    title: "Project-Based Learning",
    tag: "Production Code",
    description:
      "Dive into our hands-on structured modules. We prioritize skipping endless theoretical lectures so you can start building real-world projects immediately. Expert instructors actively guide you through every complex step.",
    icon: IoTerminalOutline,
    accent: "text-teal-600 bg-teal-50 border-teal-200/70",
  },
  {
    number: "03",
    phase: "Phase 03",
    title: "Portfolio Accumulation",
    tag: "Proof of Work",
    description:
      "As you continuously learn, you naturally accumulate a robust, production-ready portfolio. Every assigned project and end-of-module assessment becomes a high-quality piece of work to show to global clients.",
    icon: IoBriefcaseOutline,
    accent: "text-blue-600 bg-blue-50 border-blue-200/70",
  },
  {
    number: "04",
    phase: "Phase 04",
    title: "Mentorship & Prep",
    tag: "Marketplace Strategy",
    description:
      "Receive intensive training on navigating modern freelance marketplaces. Learn the essentials on how to communicate effectively with international clients, establish fair pricing, and write incredibly winning proposals.",
    icon: IoSchoolOutline,
    accent: "text-violet-600 bg-violet-50 border-violet-200/70",
  },
  {
    number: "05",
    phase: "Phase 05",
    title: "Earn, Grow & Network",
    tag: "Career Launch",
    description:
      "Graduate completely equipped with the confidence and proof of work necessary to land remote jobs, spearhead a physical IT career, or seamlessly operate as a profitable independent freelancer.",
    icon: IoRocketOutline,
    accent: "text-brand-pink bg-rose-50 border-rose-200/70",
  },
];

export default function HowItWorksPage() {
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
            <span>The Pipeline</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 leading-[1.2] mb-2 tracking-tight"
          >
            How{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-green to-emerald-600">
              It Works.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-slate-600 text-sm md:text-base leading-[1.6] font-normal max-w-4xl mx-auto"
          >
            Our strategic step-by-step learning methodology is uniquely designed to securely take you from<br className="hidden sm:inline" />{" "}
            an absolute beginner to an actively earning tech professional. No fluff—just solid execution.
          </motion.p>
        </div>

        {/* Pipeline Timeline */}
        <div className="max-w-4xl mx-auto relative">
          {/* Vertical Connecting Rail on desktop */}
          <div className="hidden md:block absolute left-6 top-6 bottom-6 w-0.5 bg-slate-200 rounded-full" />

          <div className="space-y-3.5 sm:space-y-4">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-30px" }}
                  transition={{ delay: index * 0.06, duration: 0.35 }}
                  className="relative md:pl-16 group"
                >
                  {/* Desktop Step Number Circle Indicator */}
                  <div className="hidden md:flex absolute left-6 top-5 -translate-x-1/2 w-8 h-8 rounded-full bg-white border-2 border-slate-200 text-slate-700 font-black text-xs items-center justify-center shadow-xs group-hover:border-brand-green group-hover:text-brand-green group-hover:scale-110 transition-all duration-200 z-10">
                    {step.number}
                  </div>

                  {/* Card Container */}
                  <div className="bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-5 shadow-xs hover:shadow-md hover:border-brand-green/40 transition-all duration-200 flex flex-col sm:flex-row sm:items-start gap-3.5 sm:gap-4">
                    {/* Icon Badge */}
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border shadow-xs group-hover:scale-105 transition-transform ${step.accent}`}
                    >
                      <Icon size={18} />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center justify-between gap-1.5 mb-1.5">
                        <div className="flex items-center gap-2">
                          <span className="md:hidden text-xs font-black text-brand-green bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200/60">
                            {step.number}
                          </span>
                          <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                            {step.phase}
                          </span>
                          <span className="text-slate-300">•</span>
                          <h2 className="text-base sm:text-lg font-black text-slate-900 tracking-tight leading-tight">
                            {step.title}
                          </h2>
                        </div>

                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-50 border border-slate-200/70 text-[10px] font-bold text-slate-600">
                          <IoCheckmarkCircleOutline className="text-brand-green" size={12} />
                          {step.tag}
                        </span>
                      </div>

                      <p className="text-slate-600 text-xs sm:text-sm leading-[1.6] font-normal">
                        {step.description}
                      </p>
                    </div>
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
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-[1.4]">Next Step</p>
          <p className="text-slate-900 font-bold text-sm leading-[1.4]">Join the Program</p>
        </div>
        <button className="px-5 py-2.5 bg-brand-green text-white font-bold text-[10px] uppercase tracking-widest shadow-md shadow-brand-green/30 rounded-md leading-[1.4]">
          Apply Now
        </button>
      </div>
    </section>
  );
}
