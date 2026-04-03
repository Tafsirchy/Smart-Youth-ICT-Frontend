"use client";

import { motion } from "framer-motion";
import { 
  IoPeopleOutline, 
  IoSchoolOutline, 
  IoStarOutline, 
  IoCodeWorkingOutline, 
  IoColorPaletteOutline, 
  IoMegaphoneOutline,
  IoCheckmarkCircleOutline 
} from "react-icons/io5";

const talentCategories = [
  {
    title: "Junior Developers",
    desc: "React, Next.js, and Python specialists ready to build landing pages, fix bugs, or develop internal tools.",
    icon: <IoCodeWorkingOutline />,
    color: "bg-blue-500"
  },
  {
    title: "Graphic Juniors",
    desc: "Creative minds focused on logo design, social media banners, and high-impact branding assets.",
    icon: <IoColorPaletteOutline />,
    color: "bg-rose-500"
  },
  {
    title: "Digital Marketers",
    desc: "Trained in Meta Ads, SEO basics, and social media management to keep your community engaged.",
    icon: <IoMegaphoneOutline />,
    color: "bg-emerald-500"
  }
];

export default function HireStudentPage() {
  return (
    <section className="min-h-screen bg-brand-green overflow-hidden relative font-sans lg:py-24">
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05] mix-blend-overlay"></div>
      
      <div className="container-custom pt-32 pb-20 relative z-10 text-white">
        {/* Hire Student Hero Section */}
        <div className="max-w-4xl mx-auto text-center mb-32">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white text-brand-green text-xs font-black tracking-widest uppercase mb-8 shadow-2xl shadow-white/20"
          >
            🔥 Most Popular For Startups
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-6xl md:text-8xl lg:text-9xl font-black leading-[0.85] mb-8 tracking-tighter"
          >
            Hire A <br className="hidden md:block"/> <span className="text-white/40 font-serif italic">Freelancer.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-emerald-50 text-xl md:text-3xl font-light leading-relaxed max-w-3xl mx-auto"
          >
            Access our internal network of rigorously trained, project-tested students. Get top-tier work done at extremely competitive rates while supporting their early careers.
          </motion.p>
        </div>

        {/* Talent Classifications */}
        <div className="mb-32">
          <h2 className="text-4xl font-black text-white text-center mb-24 tracking-tighter">Skill Classifications</h2>
          <div className="grid lg:grid-cols-3 gap-8">
            {talentCategories.map((type, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white/10 border border-white/20 p-10 rounded-[3rem] relative overflow-hidden group hover:bg-white hover:text-slate-900 transition-all"
              >
                <div className={`text-4xl text-white group-hover:text-slate-900 mb-8 group-hover:scale-110 transition-transform w-16 h-16 rounded-2xl flex items-center justify-center bg-white/10 group-hover:bg-slate-100 border border-white/20`}>
                  {type.icon}
                </div>
                <h3 className="text-2xl font-black mb-4">{type.title}</h3>
                <p className="opacity-70 group-hover:opacity-100 font-light leading-relaxed text-lg">{type.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mentor Mesh Section - The Quality Guarantee */}
        <div className="grid lg:grid-cols-2 gap-20 items-center mb-32 bg-white rounded-[3rem] p-12 lg:p-20 relative overflow-hidden text-slate-950">
           <div className="space-y-10">
              <h2 className="text-4xl lg:text-5xl font-black leading-tight">The <span className="text-brand-green">Quality Mesh.</span></h2>
              <p className="text-slate-500 text-lg md:text-xl font-light leading-relaxed">Hiring a student doesn't mean compromising quality. At SYICT, every student project is supervised by our senior Mentors through a proprietary **Mentor Mesh** review system.</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                 {[
                   { t: "Vetted Talent", d: "Only 10% of our students make it to the marketplace." },
                   { t: "Mentor Oversight", d: "Senior leads review all critical code/design work." },
                   { t: "Zero Overhead", d: "We handle the contracts and payroll for you." },
                   { t: "Rapid Delivery", d: "Ready-to-work talent available on 24hr notice." }
                 ].map(item => (
                    <div key={item.t} className="space-y-1">
                       <h4 className="font-black text-brand-green flex items-center gap-2"><IoCheckmarkCircleOutline /> {item.t}</h4>
                       <p className="text-xs text-slate-400">{item.d}</p>
                    </div>
                 ))}
              </div>
           </div>

           {/* Interactive Student Profile Cards mockup */}
           <div className="relative">
              <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} className="p-8 bg-slate-950 rounded-3xl shadow-2xl text-white relative z-20">
                 <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-white rounded-full"></div>
                    <div>
                       <p className="text-white font-black">Adnan Ahmed</p>
                       <p className="text-emerald-500 text-[10px] uppercase font-black tracking-widest">Available Now</p>
                    </div>
                 </div>
                 <div className="space-y-4">
                    <p className="text-xs text-slate-400">"I specialize in building React/Next.js frontends and integrating them with Node.js backends."</p>
                    <div className="flex gap-2">
                       <div className="px-3 py-1 bg-white/10 rounded-full text-[8px] font-black uppercase">React</div>
                       <div className="px-3 py-1 bg-white/10 rounded-full text-[8px] font-black uppercase">Tailwind</div>
                    </div>
                 </div>
              </motion.div>
              
              {/* Back card */}
              <div className="absolute top-10 left-10 w-full h-full bg-emerald-500 rounded-3xl -z-10 opacity-20 transform rotate-6"></div>
           </div>
        </div>

        {/* Hire Final Call to Action */}
        <div className="max-w-4xl mx-auto text-center border-t border-white/20 pt-20">
           <h3 className="text-4xl font-black text-white mb-10 tracking-tight italic">Support the next generation of talent. Get elite work done.</h3>
           <button className="px-12 py-5 bg-white text-slate-900 font-extrabold rounded-full hover:scale-105 transition-transform shadow-2xl shadow-white/30 uppercase tracking-widest text-sm">
             Post My Project Requirement
           </button>
        </div>
      </div>
    </section>
  );
}
