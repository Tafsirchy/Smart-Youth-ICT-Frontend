"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  HiLightningBolt,
  HiBriefcase,
  HiCurrencyBangladeshi,
  HiStar,
  HiAcademicCap,
  HiGlobeAlt,
  HiArrowNarrowDown,
} from "react-icons/hi";

const reasons = [
  {
    Icon: HiLightningBolt,
    title: "Project-Based Learning",
    desc: "Learn by building real projects for real clients — not just watching videos.",
    color: "var(--color-brand-pink)",
  },
  {
    Icon: HiBriefcase,
    title: "Internship Program",
    desc: "Get placed in real internships and build your professional portfolio.",
    color: "var(--color-brand-green)",
  },
  {
    Icon: HiCurrencyBangladeshi,
    title: "Earn While You Study",
    desc: "Pay your course fee from your own earnings on real freelance projects.",
    color: "var(--color-brand-green-light)",
  },
  {
    Icon: HiStar,
    title: "Expert Instructors",
    desc: "Learn from industry professionals with 5–10 years of real-world experience.",
    color: "var(--color-brand-pink)",
  },
  {
    Icon: HiAcademicCap,
    title: "Verified Certificate",
    desc: "Receive a verified digital certificate recognised by top employers.",
    color: "var(--color-brand-green)",
  },
  {
    Icon: HiGlobeAlt,
    title: "Global Freelancing",
    desc: "We guide you to land projects on Fiverr, Upwork & local marketplaces.",
    color: "var(--color-brand-pink-light)",
  },
];

const scrollReasons = [...reasons, ...reasons];

export default function WhyChooseUs() {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkViewport = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    checkViewport();
    window.addEventListener("resize", checkViewport);
    return () => window.removeEventListener("resize", checkViewport);
  }, []);

  return (
    <section
      className="section relative overflow-hidden bg-[#FAF9F6] pt-6 pb-12 sm:pt-8 sm:pb-16 md:pt-12 md:pb-24"
      id="why-choose-us"
    >
      {/* Dynamic Background Elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[40%] bg-[#10B981]/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[40%] bg-[#FF2C6D]/3 rounded-full blur-[120px]" />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-[0.03] grayscale pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(#2D5A54 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="container-custom px-4 sm:px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-24 items-start">

          {/* Left Side: Sticky Text */}
          <div className="lg:sticky lg:top-20 self-start space-y-6 md:space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="mb-4 sm:mb-6 inline-flex items-center gap-2 rounded-full bg-emerald-50 px-5 py-2 text-xs font-black uppercase tracking-widest text-emerald-700">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                The SYICT Difference
              </span>

              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 leading-[1.1] mb-6 md:mb-8 tracking-tighter">
                Real Skills. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-600">
                  Real Careers.
                </span>
              </h2>

              <p className="text-slate-600 text-base md:text-xl leading-relaxed max-w-xl font-medium mb-6 md:mb-10">
                We bridge the gap between learning and earning by combining intensive training with real-world internship opportunities.
              </p>

              {/* Signature Block */}
              <div className="relative mt-8 md:mt-12 pb-6">
                <div className="absolute -top-12 -left-8 w-32 h-32 bg-emerald-100/40 rounded-full blur-3xl -z-10" />
                <div className="relative z-10 pl-4 border-l-4 border-emerald-500">
                  <p className="text-slate-800 font-bold text-base md:text-lg mb-1 italic leading-relaxed">
                    "Our mission is to empower the next generation of digital leaders through practical, project-first education."
                  </p>
                  <p className="text-emerald-600 font-black text-[11px] sm:text-xs uppercase tracking-widest">
                    — SYICT FOUNDATION
                  </p>
                </div>
              </div>

              {/* Scroll Indicator for Mobile */}
              <div className="lg:hidden flex items-center gap-3 text-slate-400 font-black text-xs uppercase tracking-widest mt-8 animate-bounce">
                <HiArrowNarrowDown size={18} />
                Explore our features
              </div>
            </motion.div>
          </div>

          {/* Right Side: Features Layout (Scrolling on Desktop, Static Stack on Mobile) */}
          <div className="relative lg:h-[600px] xl:h-[700px] overflow-hidden rounded-[32px]">
            {isDesktop ? (
              <>
                {/* Fade Masks */}
                <div className="absolute top-0 inset-x-0 h-24 bg-gradient-to-b from-[#FAF9F6] to-transparent z-20 pointer-events-none" />
                <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-[#FAF9F6] to-transparent z-20 pointer-events-none" />

                {/* Animated Loop for Desktop */}
                <motion.div
                  animate={{ y: ["0%", "-50%"] }}
                  transition={{
                    duration: 35,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="flex flex-col gap-6 py-6 motion-gpu"
                >
                  {scrollReasons.map(({ Icon, title, desc, color }, idx) => (
                    <div
                      key={`scroll-${title}-${idx}`}
                      className="group/card relative bg-white rounded-[24px] p-6 border border-slate-100 shadow-sm hover:shadow-lg transition-all duration-300 cursor-default"
                    >
                      <div className="flex items-start gap-6">
                        <div
                          className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0 shadow-sm"
                          style={{ background: `${color}15` }}
                        >
                          <Icon size={26} style={{ color }} aria-hidden="true" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-black text-slate-900 mb-2">
                            {title}
                          </h3>
                          <p className="text-slate-600 text-sm leading-relaxed font-medium">
                            {desc}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </motion.div>
              </>
            ) : (
              /* Static list for mobile screens */
              <div className="flex flex-col gap-5 py-2">
                {reasons.map(({ Icon, title, desc, color }, idx) => (
                  <div
                    key={`static-${title}-${idx}`}
                    className="bg-white rounded-[24px] p-5 border border-slate-100/80 shadow-sm"
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                        style={{ background: `${color}12` }}
                      >
                        <Icon size={22} style={{ color }} aria-hidden="true" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-base font-black text-slate-900 mb-1.5">
                          {title}
                        </h3>
                        <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-medium">
                          {desc}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
