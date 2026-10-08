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
 icon: <IoHardwareChipOutline size={28} />,
 bg: "bg-slate-900",
 text: "text-white",
 },
 "graphic-design": {
 icon: <IoColorPaletteOutline size={28} />,
 bg: "bg-slate-900",
 text: "text-white",
 },
 smm: {
 icon: <IoMegaphoneOutline size={28} />,
 bg: "bg-slate-900",
 text: "text-white",
 },
 ai: {
 icon: <IoCodeWorkingOutline size={28} />,
 bg: "bg-slate-900",
 text: "text-white",
 },
 other: {
 icon: <IoLayersOutline size={28} />,
 bg: "bg-slate-900",
 text: "text-white",
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
 <section className="min-h-screen bg-slate-50 overflow-hidden relative flex flex-col font-sans">
 {/* Hero Section */}
 <div className="relative pt-24 pb-16 px-4 bg-white border-b border-slate-200">
 <div className="container-custom relative z-10 text-center flex flex-col gap-6 max-w-4xl mx-auto">
 <motion.div
 initial={{ opacity: 0, y: 10 }}
 animate={{ opacity: 1, y: 0 }}
 className="inline-flex items-center gap-3 px-4 py-2 border border-slate-200 text-xs font-medium uppercase tracking-widest text-slate-500 self-center"
 >
 <span className="flex h-1.5 w-1.5 bg-slate-400"></span>
 {hero.badge}
 </motion.div>
 <motion.h1
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ delay: 0.1 }}
 className="text-4xl sm:text-5xl lg:text-7xl font-light text-slate-900 leading-[1.1] tracking-tight"
 >
 {hero.title.split(hero.subtitle)[0]} <br />
 <span className="font-medium text-slate-900">{hero.subtitle}</span>
 </motion.h1>
 <motion.p
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ delay: 0.2 }}
 className="text-slate-500 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto font-light"
 >
 {hero.description}
 </motion.p>
 </div>
 </div>

 {/* Methodology Section */}
 <div className="bg-slate-50 py-16 border-b border-slate-200">
 <div className="container-custom">
 <div className="grid md:grid-cols-3 gap-8 md:gap-12">
 {methods.map((mod, i) => (
 <motion.div
 key={i}
 initial={{ opacity: 0, y: 20 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true }}
 className="flex flex-col gap-3 border-l-2 border-slate-300 pl-6"
 >
 <h3 className="text-xl font-medium text-slate-900 tracking-tight">{mod.title}</h3>
 <p className="text-slate-500 font-light leading-relaxed">{mod.description}</p>
 </motion.div>
 ))}
 </div>

 <div className="mt-16 text-center">
 <Link
 href="/services/skill-development/details"
 className="inline-flex items-center gap-3 text-sm font-medium uppercase tracking-widest text-slate-900 hover:text-slate-500 transition-colors group"
 >
 View Pedagogical Manifest <IoArrowBackOutline className="rotate-180 group-hover:translate-x-2 transition-transform" />
 </Link>
 </div>
 </div>
 </div>

 {/* Detailed Programs Grid */}
 <div className="container-custom py-20 bg-white">
 <div className="flex items-center justify-between mb-12">
 <h2 className="text-3xl font-light text-slate-900 tracking-tight">Core <span className="font-medium">Training Programs</span></h2>
 <div className="hidden md:block h-[1px] flex-1 bg-slate-200 ml-8"></div>
 </div>

 {programsToDisplay.length > 0 ? (
 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
 {programsToDisplay.map((prog, i) => (
 <Link key={prog._id} href={`/${locale}/courses/${prog.slug}`} className="block group">
 <motion.div
 initial={{ opacity: 0, y: 30 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true, margin: "-50px" }}
 transition={{ delay: i * 0.1, duration: 0.5 }}
 className="bg-white p-8 border border-slate-200 group-hover:border-slate-400 group-hover:shadow-xl transition-all duration-300 flex flex-col h-full"
 >
 <div className="flex justify-between items-start mb-6">
 <div className={`w-14 h-14 ${prog.bg} ${prog.text} flex items-center justify-center group-hover:scale-110 transition-transform duration-500`}>
 {prog.icon}
 </div>
 <span className="px-3 py-1 bg-slate-100 text-slate-600 text-[10px] font-medium uppercase tracking-widest">
 {prog.badge}
 </span>
 </div>

 <h3 className="text-xl font-medium text-slate-900 mb-3 tracking-tight">{prog.title}</h3>
 <p className="text-slate-500 font-light leading-relaxed mb-8 flex-1 line-clamp-3">{prog.description}</p>

 <div className="flex flex-col gap-4 border-t border-slate-100 pt-6">
 <p className="text-[10px] font-medium text-slate-400 uppercase tracking-widest">Outcomes</p>
 <div className="flex flex-wrap gap-2">
 {prog.tech.map(t => (
 <span key={t} className="px-3 py-1.5 bg-slate-50 text-slate-600 text-xs font-medium">
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
 <div className="text-center py-20 bg-slate-50 border border-slate-200">
 <div className="inline-flex items-center justify-center w-16 h-16 bg-white border border-slate-200 text-slate-400 mb-6">
 <IoSearchOutline size={32} />
 </div>
 <h3 className="text-xl font-medium text-slate-900 mb-2">Programs Coming Soon</h3>
 <p className="text-slate-500 font-light">We are currently updating our course catalog. Please check back later.</p>
 </div>
 )}
 </div>

 {/* CTA Bottom */}
 <div className="bg-slate-900 py-20 px-4 text-center">
 <motion.div
 initial={{ opacity: 0, y: 20 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true }}
 className="max-w-3xl mx-auto flex flex-col items-center gap-6"
 >
 <h2 className="text-3xl md:text-4xl font-light text-white tracking-tight">Not sure which <span className="font-medium">program to pick?</span></h2>
 <p className="text-slate-400 text-lg max-w-2xl font-light leading-relaxed mb-4">{cta.description}</p>
 <button className="px-8 py-4 bg-white text-slate-900 font-medium text-sm uppercase tracking-widest hover:bg-slate-200 transition-colors">
 {cta.buttonText}
 </button>
 </motion.div>
 </div>

 {/* Mobile Sticky CTA */}
 <div className="sticky bottom-0 left-0 right-0 p-4 bg-white border-t border-slate-200 z-50 lg:hidden flex justify-center mt-auto">
 <button className="w-full max-w-sm px-6 py-4 bg-slate-900 text-white font-medium text-xs uppercase tracking-widest active:bg-slate-800 transition-colors">
 {cta.buttonText}
 </button>
 </div>
 </section>
 );
}
