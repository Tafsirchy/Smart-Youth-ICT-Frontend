"use client";

import { motion } from "framer-motion";
import { IoRocketOutline, IoShieldCheckmarkOutline, IoBriefcaseOutline, IoHeadsetOutline, IoCodeSlashOutline, IoGlobeOutline } from "react-icons/io5";

const features = [
  {
    title: "100% Practical Learning",
    description: "No boring slide decks. Every module requires you to write code, design interfaces, or run live campaigns.",
    icon: <IoCodeSlashOutline size={32} />,
    colSpan: "col-span-1 md:col-span-2",
    theme: "bg-indigo-50 text-indigo-600 border-indigo-100",
  },
  {
    title: "Real Client Projects",
    description: "Graduate with a portfolio full of production-ready work.",
    icon: <IoBriefcaseOutline size={32} />,
    colSpan: "col-span-1",
    theme: "bg-emerald-50 text-emerald-600 border-emerald-100",
  },
  {
    title: "24/7 Dedicated Support",
    description: "Stuck on a bug at 2 AM? Our mentor network is always available.",
    icon: <IoHeadsetOutline size={32} />,
    colSpan: "col-span-1",
    theme: "bg-rose-50 text-rose-600 border-rose-100",
  },
  {
    title: "Global Marketplace Prep",
    description: "Learn how to dominate Upwork, Fiverr, and remote job boards effectively.",
    icon: <IoGlobeOutline size={32} />,
    colSpan: "col-span-1",
    theme: "bg-blue-50 text-blue-600 border-blue-100",
  },
  {
    title: "Rapid Career Growth",
    description: "Our syllabus is rigorously updated every 3 months to match industry shifts.",
    icon: <IoRocketOutline size={32} />,
    colSpan: "col-span-1",
    theme: "bg-amber-50 text-amber-600 border-amber-100",
  },
  {
    title: "Verified Certifications",
    description: "Receive globally recognized credentials upon graduation to prove your worth.",
    icon: <IoShieldCheckmarkOutline size={32} />,
    colSpan: "col-span-1 md:col-span-3 lg:col-span-1",
    theme: "bg-purple-50 text-purple-600 border-purple-100",
  },
];

export default function WhyChooseUsPage() {
  return (
    <section className="min-h-screen bg-white py-24 overflow-hidden relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-green/5 rounded-full blur-[100px] mix-blend-multiply pointer-events-none"></div>
      
      <div className="container-custom relative z-10">
        <div className="max-w-3xl mb-16">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block text-[11px] font-black uppercase tracking-[0.28em] text-brand-green mb-4"
          >
            Brand & Edge
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-7xl font-black text-slate-900 leading-tight mb-6"
          >
            Why Choose Us.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-slate-600 text-xl leading-relaxed max-w-2xl"
          >
            We don't just sell courses. We engineer career transformations. Discover the robust foundation that sets Smart Youth ICT apart.
          </motion.p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl">
          {features.map((feat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ scale: 0.98 }}
              className={`p-8 rounded-[2rem] border transition-shadow hover:shadow-lg ${feat.colSpan} ${feat.theme}`}
            >
              <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center mb-6 shadow-sm border border-black/5">
                {feat.icon}
              </div>
              <h3 className="text-2xl font-bold mb-3 text-slate-900">
                {feat.title}
              </h3>
              <p className="text-slate-700 leading-relaxed font-medium">
                {feat.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
