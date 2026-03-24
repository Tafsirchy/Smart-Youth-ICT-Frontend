"use client";

import { motion, useScroll, useTransform } from "framer-motion";
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

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariant = {
  hidden: { opacity: 0, x: 20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

// Double the reasons for seamless infinity scroll
const scrollReasons = [...reasons, ...reasons];

export default function WhyChooseUs() {
  return (
    <section
      className="section relative overflow-hidden bg-[#FAF9F6]"
      id="why-choose-us"
    >
      {/* Dynamic Artistic Background Elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[40%] bg-[#10B981]/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[40%] bg-[#FF2C6D]/3 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-[0.03] grayscale pointer-events-none" 
             style={{ backgroundImage: "radial-gradient(#2D5A54 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
      </div>

      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          
          {/* Left Side: Sticky Signature & Text */}
          <div className="lg:sticky lg:top-32 self-start space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="mb-6 inline-flex items-center gap-2 rounded-full bg-emerald-50 px-5 py-2 text-xs font-black uppercase tracking-widest text-emerald-700">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                The SYICT Difference
              </span>
              
              <h2 className="text-4xl md:text-6xl font-black text-slate-900 leading-[1.1] mb-6">
                Not Just a Course — <br />
                <span className="relative inline-block mt-2">
                  A Career Launch Pad
                  <motion.svg 
                    viewBox="0 0 400 20" 
                    className="absolute -bottom-2 left-0 w-full h-3 text-emerald-400/60"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    transition={{ duration: 1.5, delay: 0.5 }}
                  >
                    <path d="M5 15Q100 5 200 15T395 10" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
                  </motion.svg>
                </span>
              </h2>

              <p className="text-slate-600 text-lg md:text-xl leading-relaxed max-w-xl font-medium mb-10">
                We bridge the gap between learning and earning by combining intensive training with real-world internship opportunities.
              </p>

              {/* Unique Artistic Signature */}
              <div className="relative mt-12 pb-8">
                <div className="absolute -top-12 -left-8 w-32 h-32 bg-emerald-100/40 rounded-full blur-3xl -z-10" />
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1, delay: 0.3 }}
                  className="font-serif italic text-5xl md:text-7xl text-slate-800/20 select-none pointer-events-none absolute -top-8 left-0 z-0"
                  style={{ fontFamily: "'Dancing Script', 'Sacramento', cursive" }}
                >
                  Smart Youth ICT
                </motion.div>
                <div className="relative z-10 pl-4 border-l-4 border-emerald-500">
                   <p className="text-slate-900 font-bold text-lg mb-1 italic">"Our mission is to empower the next generation of digital leaders through practical, project-first education."</p>
                   <p className="text-emerald-600 font-black text-sm uppercase tracking-widest">— SYICT FOUNDATION</p>
                </div>
              </div>

              {/* Scroll Indicator for Mobile */}
              <div className="lg:hidden flex items-center gap-3 text-slate-400 font-bold text-xs uppercase tracking-widest mt-12 animate-bounce">
                <HiArrowNarrowDown size={20} />
                Explore our features
              </div>
            </motion.div>
          </div>

          {/* Right Side: Infinity Vertical Scroll */}
          <div className="relative h-[600px] md:h-[700px] overflow-hidden group">
            
            {/* Edge Fading Masks */}
            <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-[#FAF9F6] to-transparent z-20 pointer-events-none" />
            <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-[#FAF9F6] to-transparent z-20 pointer-events-none" />

            {/* Scrolling Content */}
            <motion.div
              animate={{ y: ["0%", "-50%"] }}
              transition={{
                duration: 40,
                repeat: Infinity,
                ease: "linear",
              }}
              className="flex flex-col gap-6 py-12"
            >
              {scrollReasons.map(({ Icon, title, desc, color }, idx) => (
                <div
                  key={`${title}-${idx}`}
                  className="group/card relative bg-white rounded-[32px] p-8 border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-500 cursor-default"
                >
                  <div 
                    className="absolute inset-0 rounded-[32px] opacity-0 group-hover/card:opacity-[0.02] transition-opacity"
                    style={{ background: color }}
                  />
                  
                  <div className="flex items-start gap-6">
                    <div
                      className="w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 shadow-inner group-hover/card:scale-110 transition-transform duration-500"
                      style={{ background: `${color}15` }}
                    >
                      <Icon size={32} style={{ color }} />
                    </div>
                    
                    <div className="flex-1 pt-1">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                          Feature 0{(idx % reasons.length) + 1}
                        </span>
                        <div className="w-8 h-[2px] bg-slate-100 group-hover/card:w-16 group-hover/card:bg-emerald-200 transition-all duration-500" />
                      </div>
                      <h3 className="text-xl font-black text-slate-900 mb-3 group-hover/card:text-emerald-700 transition-colors">
                        {title}
                      </h3>
                      <p className="text-slate-500 text-sm md:text-base leading-relaxed font-medium">
                        {desc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
