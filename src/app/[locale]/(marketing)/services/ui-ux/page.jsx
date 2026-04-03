"use client";

import { motion } from "framer-motion";
import { 
  IoSearchOutline, 
  IoLayersOutline, 
  IoFlashOutline, 
  IoFingerPrintOutline, 
  IoGridOutline, 
  IoCubeOutline, 
  IoCheckmarkCircleOutline 
} from "react-icons/io5";

const designPillars = [
  {
    title: "User Research",
    desc: "Empathy mapping, user interviews, and data-driven personas to understand exactly who we are building for.",
    icon: <IoSearchOutline />,
    color: "from-blue-600 to-indigo-500"
  },
  {
    title: "Wireframing",
    desc: "Low-fidelity structural logic. We prioritize flow and information architecture before we touch a single pixel.",
    icon: <IoLayersOutline />,
    color: "from-purple-600 to-indigo-500"
  },
  {
    title: "Prototyping",
    desc: "High-fidelity, interactive Figma handoffs. Experience the final product before a single line of code is written.",
    icon: <IoFlashOutline />,
    color: "from-pink-500 to-rose-400"
  }
];

export default function UiUxPage() {
  return (
    <section className="min-h-screen bg-slate-950 overflow-hidden relative font-sans">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/40 via-slate-950 to-slate-950 pointer-events-none -z-10"></div>
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none font-mono"></div>
      
      <div className="container-custom pt-32 pb-20 relative z-10">
        {/* Modern Dark Hero */}
        <div className="max-w-4xl mx-auto text-center mb-32">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/5 border border-white/10 text-white/70 text-xs font-black tracking-widest uppercase mb-8"
          >
            Figma-Native Design Studio
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-6xl md:text-8xl lg:text-9xl font-black text-white leading-[0.85] mb-8 tracking-tighter"
          >
            UI/UX <br className="hidden md:block"/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-pink via-indigo-400 to-indigo-600">Product.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 text-xl md:text-3xl font-light leading-relaxed max-w-3xl mx-auto"
          >
            We don't just 'design' interfaces. We construct high-conversion user journeys that maximize retention and eliminate friction through scientific design principles.
          </motion.p>
        </div>

        {/* Methodology Section */}
        <div className="mb-32">
          <h2 className="text-4xl font-black text-white text-center mb-24 tracking-tighter">Design Methodology</h2>
          <div className="grid lg:grid-cols-3 gap-8">
            {designPillars.map((pillar, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white/5 border border-white/10 p-10 rounded-[2.5rem] relative overflow-hidden group hover:bg-white/10 transition-all"
              >
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${pillar.color} opacity-10 rounded-full blur-[60px] group-hover:opacity-30 transition-opacity`}></div>
                <div className="text-4xl text-white mb-8 group-hover:scale-110 transition-transform w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10">
                  {pillar.icon}
                </div>
                <h3 className="text-2xl font-black text-white mb-4">{pillar.title}</h3>
                <p className="text-slate-400 font-light leading-relaxed text-lg">{pillar.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Component Showcase Visual */}
        <div className="grid lg:grid-cols-2 gap-20 items-center mb-32 bg-slate-900/50 rounded-[3rem] p-12 lg:p-20 border border-white/5 relative overflow-hidden">
           <div className="space-y-10">
              <h2 className="text-4xl lg:text-5xl font-black text-white leading-tight">Elite <br/><span className="text-brand-pink">Component Systems.</span></h2>
              <p className="text-slate-400 text-lg md:text-xl font-light leading-relaxed">We deliver more than pages. We deliver **Scalability**. Our designs come with a comprehensive component library mapping every button, input, and interaction state for flawless engineering handoffs.</p>
              
              <div className="grid grid-cols-2 gap-4">
                 {["Atomic Design", "Design Tokens", "Auto-Layout", "Dark/Light Modes"].map(item => (
                    <div key={item} className="flex gap-2 items-center text-sm font-bold text-white">
                       <IoCheckmarkCircleOutline className="text-brand-pink" /> {item}
                    </div>
                 ))}
              </div>
           </div>

           {/* Component Library Mockup */}
           <div className="grid grid-cols-2 gap-4">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="p-8 bg-white/5 rounded-3xl border border-white/10 space-y-4">
                 <div className="w-10 h-10 bg-brand-pink rounded-xl shadow-[0_0_20px_rgba(255,107,175,0.4)]"></div>
                 <div className="h-2 bg-white/10 rounded w-full"></div>
                 <div className="h-2 bg-white/10 rounded w-1/2"></div>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="p-8 bg-white/5 rounded-3xl border border-white/10 flex flex-col justify-end">
                 <div className="h-10 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-full flex items-center justify-center text-[10px] font-black tracking-widest uppercase">Active Node</div>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="p-8 bg-white/5 rounded-3xl border border-white/10 col-span-2 flex items-center justify-between">
                 <div className="flex gap-2">
                    <div className="w-4 h-4 bg-indigo-500 rounded-full"></div>
                    <div className="w-4 h-4 bg-purple-500 rounded-full"></div>
                    <div className="w-4 h-4 bg-rose-500 rounded-full"></div>
                 </div>
                 <div className="w-24 h-4 bg-white/10 rounded-full"></div>
              </motion.div>
           </div>
        </div>

        {/* UI Action Call */}
        <div className="max-w-4xl mx-auto text-center border-t border-white/10 pt-20">
           <h3 className="text-4xl font-black text-white mb-10 tracking-tight">Stop guessing. Move fast with proven design systems.</h3>
           <button className="px-12 py-5 bg-white text-slate-900 font-extrabold rounded-full hover:scale-105 transition-transform shadow-2xl uppercase tracking-widest text-sm">
             Schedule Your Product Audit
           </button>
        </div>
      </div>
    </section>
  );
}
