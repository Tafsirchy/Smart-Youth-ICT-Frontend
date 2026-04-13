"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { 
  IoPeopleOutline, 
  IoSchoolOutline, 
  IoStarOutline, 
  IoCodeWorkingOutline, 
  IoColorPaletteOutline, 
  IoMegaphoneOutline,
  IoCheckmarkCircleOutline,
  IoRocketOutline,
  IoGitBranchOutline,
  IoTerminalOutline,
  IoSparklesOutline
} from "react-icons/io5";

const talentCategories = [
  {
    title: "Core Engineering",
    desc: "React, Next.js, and Python specialists trained to build resilient frontends and automated internal tools.",
    icon: <IoTerminalOutline />,
    color: "from-blue-600 to-indigo-700"
  },
  {
    title: "Visual Identity",
    desc: "Creative students focused on mathematical logo construction, social media branding, and high-impact assets.",
    icon: <IoColorPaletteOutline />,
    color: "from-amber-500 to-orange-600"
  },
  {
    title: "Performance Growth",
    desc: "Rigorously trained in SEO fundamentals, Meta Ads, and social strategy to drive measurable business reach.",
    icon: <IoMegaphoneOutline />,
    color: "from-emerald-600 to-teal-700"
  }
];

export default function HireStudentPage() {
  return (
    <section className="min-h-screen bg-slate-50 text-slate-900 selection:bg-amber-600 selection:text-white overflow-hidden relative font-sans">
      {/* INDUSTRIAL BACKGROUND DECOR */}
      <div className="absolute top-0 opacity-20 pointer-events-none -z-10 w-full h-full">
         <div className="absolute top-0 left-1/4 w-[1px] h-full bg-slate-200"></div>
         <div className="absolute top-0 right-1/4 w-[1px] h-full bg-slate-200"></div>
         <div className="absolute top-1/2 left-0 w-full h-[1px] bg-slate-200"></div>
         <div className="absolute top-[10%] left-[-100px] w-[500px] h-[500px] bg-amber-50 rounded-full blur-[140px]"></div>
      </div>

      <div className="container-custom py-20 relative z-10">
        {/* HIRE STUDENT HERO */}
        <div className="flex flex-col lg:flex-row items-center gap-20 mb-48 px-4 md:px-0">
          <div className="flex-1 text-left">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-amber-50 border border-amber-100 text-amber-700 text-[10px] font-black tracking-[0.4em] uppercase mb-10"
            >
              <IoSparklesOutline className="text-sm" /> 🔥 Higher Fidelity Talent [POPULAR]
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "circOut" }}
              className="text-5xl md:text-7xl font-black text-slate-900 leading-[1.1] mb-8 tracking-tighter"
            >
              Elite <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-violet-500 to-emerald-500 animate-gradient-x">Freelance</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-slate-600 text-xl font-light leading-relaxed max-w-2xl mb-12"
            >
              Access our network of rigorously trained, project-tested student talent. Support the next generation while receiving enterprise-grade work at competitive startup rates.
            </motion.p>

            <div className="flex flex-col sm:flex-row gap-6">
              <button className="w-full sm:w-[280px] px-8 py-6 bg-amber-600 text-white font-black rounded-xl hover:bg-amber-700 transition-all shadow-2xl shadow-amber-600/20 uppercase tracking-widest text-[10px] flex items-center justify-center">
                Initialize Talent Request
              </button>
              <Link
                href="/services/hire-student/details"
                className="w-full sm:w-[280px] px-8 py-6 bg-white border border-slate-200 text-slate-900 font-black rounded-xl hover:bg-slate-50 transition-all uppercase tracking-widest text-[10px] flex items-center justify-center text-center"
              >
                Vetting Specifications
              </Link>
            </div>
          </div>

          <div className="flex-1 relative hidden lg:block">
            {/* Student Constellation visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotate: 3 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1 }}
              className="relative p-12 bg-white rounded-[4rem] border border-slate-100 shadow-2xl overflow-hidden"
            >
               <div className="relative aspect-square bg-slate-900 rounded-[3rem] p-10 flex flex-col justify-between overflow-hidden shadow-2xl">
                  <div className="flex justify-between items-center text-white/30 font-mono text-[8px] tracking-[0.4em]">
                     <span>TALENTHUB_v4.2</span>
                     <span>VETTED_READY</span>
                  </div>
                  
                  {/* Dynamic Skill Constellation */}
                  <div className="relative flex-1 flex items-center justify-center">
                     <motion.div animate={{ rotate: 360 }} transition={{ duration: 40, repeat: Infinity, ease: "linear" }} className="absolute inset-0 border border-white/5 rounded-full border-dashed" />
                     
                     <div className="relative z-10 grid grid-cols-2 gap-4">
                        {[
                          { t: "React_Lead", s: "98%" },
                          { t: "UI_Dev", s: "95%" },
                          { t: "SEO_Arch", s: "92%" },
                          { t: "Logo_Eng", s: "96%" }
                        ].map((card, idx) => (
                           <div key={idx} className="p-4 bg-white/5 border border-white/10 rounded-2xl flex flex-col justify-between h-24 w-32 backdrop-blur-sm">
                              <p className="text-[7px] font-black text-white/40 uppercase tracking-widest">{card.t}</p>
                              <div className="flex items-center justify-between">
                                 <div className="w-6 h-6 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-500 text-[8px] font-black">SY</div>
                                 <span className="text-[10px] font-bold text-white">{card.s}</span>
                              </div>
                           </div>
                        ))}
                     </div>
                  </div>

                  <div className="flex justify-between items-center text-amber-500 font-mono text-[8px] tracking-widest">
                     <p>ACCESS::DIRECT_BRIDGE</p>
                     <p>QA::MENTOR_OVERHAUL</p>
                  </div>
               </div>

               <div className="absolute bottom-6 right-6 p-4 bg-amber-600 rounded-2xl shadow-xl text-white font-black text-[10px] uppercase tracking-widest">
                  Active Vetting
               </div>
            </motion.div>
          </div>
        </div>

        {/* TIERS SECTION */}
        <div className="mb-48 px-4 md:px-0">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8 border-l-4 border-amber-600 pl-8">
            <div className="max-w-xl">
              <h2 className="text-[10px] font-black text-amber-600 uppercase tracking-[0.4em] mb-4 font-bold">Talent Classifications</h2>
              <p className="text-4xl md:text-6xl font-black text-slate-900 leading-tight">
                Access a global net of <span className="text-slate-400 italic font-serif font-light">verified student talent.</span>
              </p>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {talentCategories.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group cursor-default"
              >
                <div className="bg-white rounded-[3rem] p-12 h-full border border-slate-100 shadow-sm shadow-slate-200/50 hover:shadow-2xl transition-all group-hover:-translate-y-2 relative overflow-hidden">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.color} text-white flex items-center justify-center text-3xl mb-10 shadow-lg`}>
                    {item.icon}
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 mb-6 tracking-tighter uppercase leading-none">
                    {item.title}
                  </h3>
                  <p className="text-slate-500 leading-relaxed font-light text-lg">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* QUALITY MESH SECTION */}
        <div className="mb-48 px-4 md:px-0">
          <div className="grid lg:grid-cols-2 gap-20 items-center bg-white rounded-[4rem] p-12 lg:p-24 border border-slate-100 shadow-2xl shadow-slate-200/50 relative overflow-hidden">
             <div className="absolute top-0 right-0 w-1/3 h-full bg-amber-50/20 -skew-x-[20deg] origin-top translate-x-1/2"></div>
             
             <div className="relative z-10 space-y-12">
                <div className="w-16 h-16 bg-amber-50 rounded-2xl flex items-center justify-center text-3xl text-amber-600 border border-amber-100">
                   <IoGitBranchOutline />
                </div>
                <h2 className="text-5xl lg:text-7xl font-black text-slate-900 leading-[0.9]">The Quality <br/><span className="text-amber-600">Mentor Mesh.</span></h2>
                <p className="text-slate-500 text-xl font-light leading-relaxed">Hiring a student doesn't mean compromising. Every project is supervised by our senior Mentors through a proprietary review system ensureing enterprise standards.</p>
                
                <div className="grid grid-cols-2 gap-6 pt-10 border-t border-slate-100">
                   {[
                     { t: "Vetted Access", d: "Strict Top 10% filtering" },
                     { t: "Senior Oversight", d: "Mandatory lead reviews" },
                     { t: "Zero Overhead", d: "Direct portal contracting" },
                     { t: "Rapid Bridge", d: "Launch ready in 48hrs" }
                   ].map((item, idx) => (
                      <div key={idx} className="space-y-2">
                         <h4 className="text-[10px] font-black text-amber-600 uppercase tracking-widest">{item.t}</h4>
                         <p className="text-xs text-slate-400 font-bold">{item.d}</p>
                      </div>
                   ))}
                </div>
             </div>

             <motion.div
               animate={{ y: [0, 10, 0] }}
               transition={{ duration: 9, repeat: Infinity }}
               className="relative bg-slate-900 rounded-[3rem] p-12 border border-slate-800 shadow-2xl space-y-10 overflow-hidden"
             >
                <div className="absolute top-0 right-0 p-4 font-mono text-[7px] text-amber-400 bg-white/5 opacity-50 tracking-[0.4em]">BRIDGE_ACTIVE::TALENT_SYNC</div>
                
                <div className="flex items-center gap-6 p-8 bg-white/5 border border-white/10 rounded-3xl">
                   <div className="w-16 h-16 rounded-full bg-white/10 border-2 border-amber-500 p-1 flex items-center justify-center">
                      <div className="w-full h-full bg-amber-500 rounded-full flex items-center justify-center text-white"><IoPeopleOutline /></div>
                   </div>
                   <div className="flex-1 space-y-2">
                      <div className="h-2 w-full bg-white/10 rounded-full"></div>
                      <div className="h-2 w-1/2 bg-white/5 rounded-full"></div>
                      <div className="flex gap-2 pt-2">
                         <div className="w-3 h-3 bg-amber-500 rounded-full" />
                         <div className="w-3 h-3 bg-blue-500 rounded-full" />
                         <div className="w-3 h-3 bg-emerald-500 rounded-full" />
                      </div>
                   </div>
                </div>

                <div className="p-8 bg-white/5 rounded-2xl border border-white/5">
                   <p className="text-[10px] font-mono text-amber-500 font-bold tracking-tighter uppercase mb-2">Mentor Consensus: PASSED</p>
                   <p className="text-[10px] font-mono text-slate-500 uppercase leading-none">Output Integrity: 100% Verified</p>
                </div>
             </motion.div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center py-40 border-t border-slate-200 px-4 md:px-0">
           <IoRocketOutline className="text-7xl text-amber-600 mb-12 mx-auto opacity-20" />
           <h3 className="text-5xl lg:text-7xl font-black text-slate-900 mb-12 leading-tight">The support they need. <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-indigo-600 font-serif italic font-medium">The Quality You Require.</span></h3>
           <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button className="w-full sm:w-[280px] px-8 py-6 bg-amber-600 text-white font-black rounded-xl hover:bg-amber-700 transition-all shadow-2xl shadow-amber-600/40 uppercase tracking-widest text-[10px] flex items-center justify-center">
                Request Talent Bridge
              </button>
              <Link
                href="/services/hire-student/details"
                className="w-full sm:w-[280px] px-8 py-6 bg-slate-900 text-white font-black rounded-xl hover:bg-slate-800 transition-all uppercase tracking-widest text-[10px] flex items-center justify-center text-center"
              >
                Vetting Specifications
              </Link>
           </div>
        </div>
      </div>
    </section>
  );
}
