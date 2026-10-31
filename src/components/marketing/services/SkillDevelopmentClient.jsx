"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  IoHardwareChipOutline,
  IoColorPaletteOutline,
  IoMegaphoneOutline,
  IoLayersOutline,
  IoCodeWorkingOutline,
  IoSearchOutline,
  IoArrowBackOutline
} from "react-icons/io5";

const CATEGORY_STYLE_MAP = {
  "web-dev": {
    icon: <IoHardwareChipOutline size={26} />,
    color: "from-blue-500 to-indigo-600",
    bg: "bg-blue-50",
    text: "text-blue-600",
  },
  "graphic-design": {
    icon: <IoColorPaletteOutline size={26} />,
    color: "from-pink-500 to-rose-600",
    bg: "bg-pink-50",
    text: "text-pink-600",
  },
  smm: {
    icon: <IoMegaphoneOutline size={26} />,
    color: "from-amber-400 to-orange-500",
    bg: "bg-amber-50",
    text: "text-amber-600",
  },
  ai: {
    icon: <IoCodeWorkingOutline size={26} />,
    color: "from-emerald-500 to-teal-600",
    bg: "bg-emerald-50",
    text: "text-emerald-600",
  },
  other: {
    icon: <IoLayersOutline size={26} />,
    color: "from-slate-700 to-slate-900",
    bg: "bg-slate-100",
    text: "text-slate-800",
  },
};

export default function SkillDevelopmentClient({ locale, courses, pageContent }) {
  const programsToDisplay = courses.length > 0
    ? courses.map(course => {
      const style = CATEGORY_STYLE_MAP[course.category] || CATEGORY_STYLE_MAP.other;
      return {
        _id: course._id,
        slug: course.slug,
        title: course.title?.en || course.title || "Untitled Program",
        badge: course.tagline || (course.isPopular ? "Popular" : "New"),
        description: course.description?.en || (typeof course.description === 'string' ? course.description : ""),
        tech: course.outcomes?.slice(0, 4) || [],
        ...style
      };
    })
    : [];

  const hero = pageContent?.hero || {
    badge: "Industry-Approved Curriculum",
    title: "Skill Development Programs",
    subtitle: "Programs",
    description: "We don't teach theory. You'll spend 90% of your time building real-world projects that you can immediately showcase to global employers."
  };

  const methods = pageContent?.methodology?.length > 0 ? pageContent.methodology : [
    { title: "1. Hands-On Projects", description: "No boring lectures. You are coding, designing, and marketing from day one." },
    { title: "2. Expert Mentors", description: "Learn directly from senior industry professionals who are currently working in top agencies." },
    { title: "3. Portfolio Ready", description: "Graduate with 5+ complete, high-quality projects ready for your Upwork or LinkedIn profile." }
  ];

  const cta = pageContent?.cta || {
    title: "Not sure which program to pick?",
    description: "Schedule a free 15-minute counseling session with our academic advisors. We'll assess your interests and recommend the perfect career path.",
    buttonText: "Book Free Counseling"
  };

  return (
    <section className="min-h-screen bg-slate-50 overflow-hidden relative flex flex-col">
      {/* Hero Section */}
      <div className="relative pt-12 sm:pt-14 md:pt-16 pb-6 px-4">
        <div className="hidden md:block absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-200/50 blur-[120px] opacity-60 -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
        <div className="hidden md:block absolute bottom-0 left-0 w-[400px] h-[400px] bg-pink-200/40 blur-[100px] pointer-events-none"></div>

        <div className="container-custom relative z-10 text-center flex flex-col gap-2.5 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-slate-200 shadow-sm text-xs md:text-sm font-bold text-slate-800 leading-[1.4] self-center rounded-md"
          >
            <span className="flex h-2 w-2 bg-brand-pink relative shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full bg-brand-pink opacity-75"></span>
            </span>
            {hero.badge}
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 leading-[1.2]"
          >
            <span>{hero.title.split(hero.subtitle)[0]}</span>
            <span className="block mt-1 text-lg sm:text-xl md:text-2xl lg:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-600 animate-gradient-x leading-[1.2]">
              {hero.subtitle}
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-slate-600 text-base md:text-lg leading-[1.6] max-w-2xl mx-auto font-light"
          >
            {hero.description}
          </motion.p>
        </div>
      </div>

      {/* Methodology Section */}
      <div className="bg-white py-6 border-y border-slate-100 rounded-lg">
        <div className="container-custom">
          <div className="grid md:grid-cols-3 gap-4 md:gap-3 text-center">
            {methods.map((mod, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex flex-col gap-1.5"
              >
                <h3 className="text-lg md:text-xl font-extrabold text-slate-900 leading-[1.4]">{mod.title}</h3>
                <p className="text-slate-600 leading-[1.6] max-w-sm mx-auto text-sm md:text-base">{mod.description}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-5 text-center">
            <Link
              href="/services/skill-development/details"
              className="inline-flex items-center min-h-[40px] gap-2 text-xs sm:text-sm font-black uppercase tracking-widest text-blue-600 hover:text-indigo-600 transition-colors group leading-[1.4]"
            >
              View Pedagogical Manifest <IoArrowBackOutline className="rotate-180 group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>
        </div>
      </div>

      {/* Detailed Programs Grid */}
      <div className="container-custom py-6 md:py-8">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-center mb-5 underline decoration-brand-pink decoration-4 underline-offset-4 uppercase italic leading-[1.1]">Our Core Training Programs</h2>

        {programsToDisplay.length > 0 ? (
          <div className="flex overflow-x-auto snap-x snap-mandatory gap-3.5 pb-2.5 md:grid md:grid-cols-2 lg:grid-cols-3 lg:gap-4 scrollbar-hide -mx-[var(--gutter)] px-[var(--gutter)]">
            {programsToDisplay.map((prog, i) => (
              <Link key={prog._id} href={`/${locale}/courses/${prog.slug}`} className="min-w-[85vw] sm:min-w-[300px] md:w-auto snap-center shrink-0 block">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  whileHover={{ y: -4 }}
                  className="bg-white p-4 sm:p-4.5 border border-slate-100 shadow-xl shadow-slate-200/40 relative overflow-hidden group flex flex-col h-full cursor-pointer rounded-md"
                >
                  <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${prog.color}`}></div>

                  <div className="flex justify-between items-start mb-2.5">
                    <div className={`w-10 sm:w-11 h-10 sm:h-11 rounded-lg ${prog.bg} ${prog.text} flex items-center justify-center group-hover:scale-110 transition-transform duration-500`}>
                      {prog.icon}
                    </div>
                    <span className="px-2.5 py-0.5 bg-slate-100 text-slate-600 text-[10px] sm:text-xs font-bold uppercase tracking-widest leading-[1.4] rounded-md">
                      {prog.badge}
                    </span>
                  </div>

                  <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-1.5 group-hover:text-blue-600 transition-colors leading-[1.4]">{prog.title}</h3>
                  <p className="text-slate-600 leading-[1.6] mb-2.5 flex-1 text-sm line-clamp-3">{prog.description}</p>

                  <div className="flex flex-col gap-2 border-t border-slate-100 pt-2.5">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-[1.4]">Outcomes</p>
                    <div className="flex flex-wrap gap-1.5">
                      {prog.tech.map(t => (
                        <span key={t} className="px-2 py-0.5 bg-slate-50 border border-slate-100 text-xs font-bold text-slate-700 leading-[1.4] rounded-md">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-6 bg-white shadow-sm border border-slate-100 rounded-lg">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-slate-50 text-slate-300 mb-2.5">
              <IoSearchOutline size={28} />
            </div>
            <h3 className="text-lg font-black text-slate-900 mb-1 leading-[1.4]">Programs Coming Soon</h3>
            <p className="text-slate-500 font-medium text-sm leading-[1.6]">We are currently updating our course catalog. Please check back later.</p>
          </div>
        )}
      </div>

      {/* CTA Bottom */}
      <div className="container-custom pb-6 md:pb-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-slate-900 p-5 sm:p-6 md:p-7 text-center relative overflow-hidden shadow-2xl flex flex-col gap-2.5 md:gap-3.5 items-center rounded-lg"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-3xl bg-brand-pink/20 blur-[120px]"></div>
          <h2 className="text-3xl md:text-4xl font-black text-white relative z-10 leading-[1.2]">{cta.title}</h2>
          <p className="text-slate-300 text-base md:text-lg max-w-2xl mx-auto relative z-10 font-light leading-[1.6]">{cta.description}</p>
          <button className="relative z-10 px-5 min-h-[40px] py-2.5 bg-white text-slate-900 font-extrabold hover:scale-105 transition-transform shadow-lg uppercase tracking-widest text-[10px] sm:text-xs leading-[1.4] rounded-md">
            {cta.buttonText}
          </button>
        </motion.div>
      </div>

      {/* Mobile Sticky CTA */}
      <div className="sticky bottom-0 left-0 right-0 p-2.5 bg-white/90 backdrop-blur-md border-t border-slate-200 z-50 lg:hidden flex justify-center pb-[max(0.625rem,env(safe-area-inset-bottom))] mt-auto">
        <button className="w-full max-w-sm min-h-[42px] px-5 py-2.5 bg-slate-900 text-white font-bold shadow-lg active:scale-95 transition-transform text-xs uppercase tracking-widest leading-[1.4] rounded-md">
          {cta.buttonText}
        </button>
      </div>
    </section>
  );
}
