"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useLocale } from "next-intl";
import api from "@/lib/api";
import { 
  IoHardwareChipOutline, 
  IoColorPaletteOutline, 
  IoMegaphoneOutline, 
  IoLayersOutline,
  IoCodeWorkingOutline,
  IoCheckmarkCircle, 
  IoSearchOutline
} from "react-icons/io5";

const CATEGORY_STYLE_MAP = {
  "web-dev": {
    icon: <IoHardwareChipOutline size={32} />,
    color: "from-blue-500 to-indigo-600",
    bg: "bg-blue-50",
    text: "text-blue-600",
  },
  "graphic-design": {
    icon: <IoColorPaletteOutline size={32} />,
    color: "from-pink-500 to-rose-600",
    bg: "bg-pink-50",
    text: "text-pink-600",
  },
  smm: {
    icon: <IoMegaphoneOutline size={32} />,
    color: "from-amber-400 to-orange-500",
    bg: "bg-amber-50",
    text: "text-amber-600",
  },
  ai: {
    icon: <IoCodeWorkingOutline size={32} />,
    color: "from-emerald-500 to-teal-600",
    bg: "bg-emerald-50",
    text: "text-emerald-600",
  },
  other: {
    icon: <IoLayersOutline size={32} />,
    color: "from-slate-700 to-slate-900",
    bg: "bg-slate-100",
    text: "text-slate-800",
  },
};

export default function SkillDevelopmentPage() {
  const locale = useLocale();
  const [courses, setCourses] = useState([]);
  const [pageContent, setPageContent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      api.get("/courses", { params: { page: 1, limit: 100 } }),
      api.get("/cms/services/content/skill-development")
    ])
    .then(([coursesRes, contentRes]) => {
      if (coursesRes.data?.success) setCourses(coursesRes.data.data);
      if (contentRes.data?.data) setPageContent(contentRes.data.data);
    })
    .catch((err) => console.error("Failed to fetch data", err))
    .finally(() => setLoading(false));
  }, []);

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

  // Fallback defaults if CMS content is missing
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
    <section className="min-h-screen bg-slate-50 overflow-hidden relative">
      {/* Hero Section */}
      <div className="relative pt-20 pb-20 px-4">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-200/50 rounded-full blur-[120px] opacity-60 -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-pink-200/40 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="container-custom relative z-10 text-center space-y-6 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border border-slate-200 shadow-sm text-sm font-bold text-slate-800"
          >
            <span className="flex h-2 w-2 rounded-full bg-brand-pink relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-pink opacity-75"></span>
            </span>
            {hero.badge}
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-black text-slate-900 leading-[1.1] mb-8 tracking-tighter"
          >
             {hero.title.split(hero.subtitle)[0]} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-600 animate-gradient-x">{hero.subtitle}</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-slate-600 text-xl md:text-2xl leading-relaxed max-w-3xl mx-auto font-light"
          >
            {hero.description}
          </motion.p>
        </div>
      </div>

      {/* Methodology Section */}
      <div className="bg-white py-20 border-y border-slate-100">
         <div className="container-custom">
            <div className="grid md:grid-cols-3 gap-12 text-center">
               {methods.map((mod, i) => (
                  <motion.div 
                     key={i}
                     initial={{ opacity: 0, y: 20 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     viewport={{ once: true }}
                     className="space-y-4"
                  >
                     <h3 className="text-2xl font-extrabold text-slate-900">{mod.title}</h3>
                     <p className="text-slate-600 leading-relaxed max-w-sm mx-auto">{mod.description}</p>
                  </motion.div>
               ))}
            </div>
         </div>
      </div>

      {/* Detailed Programs Grid */}
      <div className="container-custom py-20">
        <h2 className="text-4xl font-black text-center mb-16 underline decoration-brand-pink decoration-4 underline-offset-8 uppercase tracking-tighter italic">Our Core Training Programs</h2>
        
        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-[400px] bg-white rounded-[2rem] animate-pulse border border-slate-100 shadow-sm"></div>
            ))}
          </div>
        ) : programsToDisplay.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {programsToDisplay.map((prog, i) => (
              <Link key={prog._id} href={`/${locale}/courses/${prog.slug}`}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  whileHover={{ y: -10 }}
                  className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-xl shadow-slate-200/40 relative overflow-hidden group flex flex-col h-full cursor-pointer"
                >
                  <div className={`absolute top-0 left-0 w-full h-2 bg-gradient-to-r ${prog.color}`}></div>
                  
                  <div className="flex justify-between items-start mb-6">
                     <div className={`w-16 h-16 rounded-2xl ${prog.bg} ${prog.text} flex items-center justify-center group-hover:scale-110 transition-transform duration-500`}>
                       {prog.icon}
                     </div>
                     <span className="px-3 py-1 bg-slate-100 text-slate-600 text-[10px] font-bold uppercase tracking-widest rounded-full">
                        {prog.badge}
                     </span>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">{prog.title}</h3>
                  <p className="text-slate-600 leading-relaxed mb-6 flex-1 text-sm line-clamp-3">{prog.description}</p>
                  
                  <div className="space-y-4 border-t border-slate-100 pt-6">
                     <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Outcomes</p>
                     <div className="flex flex-wrap gap-2">
                        {prog.tech.map(t => (
                           <span key={t} className="px-3 py-1.5 bg-slate-50 border border-slate-100 rounded-lg text-[10px] font-bold text-slate-700">
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
          <div className="text-center py-20 bg-white rounded-[3rem] shadow-sm border border-slate-100">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-slate-50 text-slate-300 mb-6">
               <IoSearchOutline size={40} />
            </div>
            <h3 className="text-xl font-black text-slate-900 mb-2">Programs Coming Soon</h3>
            <p className="text-slate-500 font-medium">We are currently updating our course catalog. Please check back later.</p>
          </div>
        )}
      </div>

      {/* CTA Bottom */}
      <div className="container-custom pb-24">
         <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-slate-900 rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden shadow-2xl"
         >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-3xl bg-brand-pink/20 blur-[120px]"></div>
            <h2 className="text-4xl md:text-5xl font-black text-white relative z-10 mb-8">{cta.title}</h2>
            <p className="text-slate-300 text-lg mb-10 max-w-2xl mx-auto relative z-10 font-light">{cta.description}</p>
            <button className="relative z-10 px-8 py-4 bg-white text-slate-900 font-extrabold rounded-full hover:scale-105 transition-transform shadow-xl uppercase tracking-widest text-xs">
               {cta.buttonText}
            </button>
         </motion.div>
      </div>

    </section>
  );
}
