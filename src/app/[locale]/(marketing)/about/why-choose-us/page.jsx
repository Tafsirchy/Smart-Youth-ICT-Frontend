"use client";

import { motion } from "framer-motion";
import { IoRocketOutline, IoShieldCheckmarkOutline, IoBriefcaseOutline, IoHeadsetOutline, IoCodeSlashOutline, IoGlobeOutline } from "react-icons/io5";

const features = [
 {
 title: "100% Practical Learning",
 description: "No boring slide decks. Every module requires you to write code, design interfaces, or run live campaigns.",
 icon: <IoCodeSlashOutline size={24} />,
 colSpan: "col-span-1 md:col-span-2",
 },
 {
 title: "Real Client Projects",
 description: "Graduate with a portfolio full of production-ready work that stands out.",
 icon: <IoBriefcaseOutline size={24} />,
 colSpan: "col-span-1",
 },
 {
 title: "24/7 Dedicated Support",
 description: "Stuck on a bug at 2 AM? Our mentor network is always available to help you push through.",
 icon: <IoHeadsetOutline size={24} />,
 colSpan: "col-span-1",
 },
 {
 title: "Global Marketplace Prep",
 description: "Learn how to dominate remote job boards and present yourself effectively.",
 icon: <IoGlobeOutline size={24} />,
 colSpan: "col-span-1 md:col-span-2",
 },
 {
 title: "Rapid Career Growth",
 description: "Our syllabus is rigorously updated every 3 months to match industry shifts.",
 icon: <IoRocketOutline size={24} />,
 colSpan: "col-span-1 md:col-span-2",
 },
 {
 title: "Verified Certifications",
 description: "Receive globally recognized credentials upon graduation.",
 icon: <IoShieldCheckmarkOutline size={24} />,
 colSpan: "col-span-1",
 },
];

export default function WhyChooseUsPage() {
 return (
 <section className="min-h-screen pb-24 md:pb-32 bg-white pt-24 md:pt-32 overflow-hidden relative flex flex-col font-sans">
 <div className="container-custom relative z-10">
 <div className="max-w-4xl mb-20 md:mb-24">
 <motion.div
 initial={{ opacity: 0, x: -20 }}
 animate={{ opacity: 1, x: 0 }}
 className="flex items-center gap-4 mb-8"
 >
 <div className="w-8 h-[1px] bg-slate-300"></div>
 <p className="text-xs font-medium uppercase tracking-[0.2em] text-slate-500">
 The Smart Youth Advantage
 </p>
 </motion.div>
 <motion.h1
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ delay: 0.1 }}
 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-slate-900 leading-[1.05] tracking-tight mb-8"
 >
 Why choose <br />
 <span className="font-semibold">our platform.</span>
 </motion.h1>
 <motion.p
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ delay: 0.2 }}
 className="text-slate-500 text-lg md:text-xl leading-relaxed max-w-2xl font-light"
 >
 We don't just sell courses. We engineer career transformations through rigorous practical learning and unyielding support.
 </motion.p>
 </div>

 {/* Simplistic Grid */}
 <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl">
 {features.map((feat, i) => (
 <motion.div
 key={i}
 initial={{ opacity: 0, y: 20 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true, margin: "-50px" }}
 transition={{ delay: i * 0.1, duration: 0.5 }}
 className={`p-8 md:p-10 border border-slate-100 bg-white transition-all duration-500 hover:border-slate-200 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col justify-between group ${feat.colSpan}`}
 >
 <div className="w-14 h-14 bg-slate-50 text-slate-600 flex items-center justify-center mb-10 group-hover:scale-110 group-hover:bg-slate-900 group-hover:text-white transition-all duration-500 rounded-md">
 {feat.icon}
 </div>
 <div>
 <h3 className="text-xl md:text-2xl font-medium mb-3 text-slate-900 tracking-tight">
 {feat.title}
 </h3>
 <p className="text-slate-500 leading-relaxed font-light">
 {feat.description}
 </p>
 </div>
 </motion.div>
 ))}
 </div>
 </div>

 {/* Mobile Sticky CTA */}
 <div className="fixed bottom-0 left-0 w-full p-4 bg-white/90 backdrop-blur-md border-t border-slate-100 z-50 md:hidden flex items-center justify-between pb-[max(1rem,env(safe-area-inset-bottom))]">
 <div>
 <p className="text-[10px] font-medium text-slate-400 uppercase tracking-widest mb-0.5">Next Step</p>
 <p className="text-slate-900 font-medium text-sm">Join the Program</p>
 </div>
 <button className="px-6 py-3 min-h-[44px] bg-slate-900 text-white font-medium text-[11px] uppercase tracking-wider transition-transform active:scale-95 rounded-md">
 Apply Now
 </button>
 </div>
 </section>
 );
}
