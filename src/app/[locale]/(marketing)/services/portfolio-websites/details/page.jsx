"use client";

import { motion } from "framer-motion";
import { 
  IoArrowBackOutline, 
  IoTerminalOutline, 
  IoLayersOutline, 
  IoFlashOutline, 
  IoGlobeOutline,
  IoCodeSlashOutline,
  IoShieldCheckmarkOutline,
  IoLockOpenOutline,
  IoCheckmarkCircleSharp
} from "react-icons/io5";
import Link from "next/link";

export default function PortfolioDetailsPage() {
  
  const techBento = [
    { 
      t: "Next.js 14", 
      d: "The core engine for SSG & ISR, delivering sub-second hydration and global scalability.",
      icon: <IoLayersOutline />,
      color: "bg-slate-900",
      colSpan: "md:col-span-2"
    },
    { 
      t: "Vercel Edge", 
      d: "Deployed on 100+ global edge locations for zero latency.",
      icon: <IoGlobeOutline />,
      color: "bg-emerald-600",
      colSpan: "md:col-span-1"
    },
    { 
      t: "Framer Motion", 
      d: "High-performance physics-based animation system.",
      icon: <IoFlashOutline />,
      color: "bg-rose-500",
      colSpan: "md:col-span-1"
    },
    { 
      t: "Schema.org", 
      d: "Structured JSON-LD injections for elite search rankings.",
      icon: <IoShieldCheckmarkOutline />,
      color: "bg-indigo-600",
      colSpan: "md:col-span-2"
    }
  ];

  const preparationVault = [
    { t: "Storytelling Bio", d: "Craft a narrative that connects with high-value clients." },
    { t: "Visual Artifacts", d: "4K renders or screenshots of your production work." },
    { t: "Proof of Authority", d: "Links to case studies, GitHub, or client reviews." },
    { t: "Identity Links", d: "A consolidated list of all professional handles." }
  ];

  return (
    <section className="min-h-screen bg-[#050505] text-white selection:bg-rose-500 selection:text-white pb-40">
      
      {/* NAVIGATION ARCHITECTURE */}
      <div className="border-b border-white/5 sticky top-0 bg-black/50 backdrop-blur-2xl z-50">
         <div className="container-custom py-6 flex justify-between items-center">
            <Link href="/services/portfolio-websites" className="flex items-center gap-2 text-slate-500 hover:text-rose-500 font-bold transition-all group">
               <IoArrowBackOutline className="group-hover:-translate-x-1 transition-transform" /> <span className="text-sm uppercase tracking-widest">Exit Vault</span>
            </Link>
            <div className="flex items-center gap-4 bg-white/5 px-4 py-2 rounded-full border border-white/10">
               <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-[pulse_2s_infinite]"></div>
               <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">System Live: Architecture.v2</p>
            </div>
         </div>
      </div>

      <div className="container-custom pt-24">
        
        {/* TERMINAL HERO: ARCHITECTURE REVEAL */}
        <div className="max-w-5xl mx-auto mb-40 text-center">
           <motion.div 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-500 text-[10px] font-black uppercase tracking-[0.4em] mb-12 shadow-[0_0_30px_rgba(244,63,94,0.1)]"
           >
              <IoTerminalOutline className="text-sm" /> Initializing Detail Protocol
           </motion.div>
           
           <motion.h1 
             className="text-6xl md:text-8xl lg:text-[10rem] font-black leading-[0.8] mb-12 tracking-tighter"
             initial={{ opacity: 0, scale: 0.95 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
           >
             Technical <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 via-pink-500 to-indigo-500 font-serif italic font-light italic">Luxury.</span>
           </motion.h1>

           <motion.div 
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ delay: 0.5 }}
             className="bg-slate-900/50 rounded-[2.5rem] border border-white/5 p-4 max-w-3xl mx-auto relative overflow-hidden group shadow-2xl"
           >
              <div className="flex items-center gap-2 px-6 py-3 border-b border-white/5">
                 <div className="w-2 h-2 rounded-full bg-rose-500/50"></div>
                 <div className="w-2 h-2 rounded-full bg-amber-500/50"></div>
                 <div className="w-2 h-2 rounded-full bg-emerald-500/50"></div>
                 <p className="text-[10px] font-mono text-slate-500 ml-4">root@syict:~/architecture/portfolio</p>
              </div>
              <div className="p-8 text-left font-mono text-sm leading-relaxed text-slate-400 space-y-2">
                 <p className="text-rose-500">$ syict deploy --target portfolio --mode creative</p>
                 <p className="text-emerald-400">› Compiling serverless functions...</p>
                 <p className="text-emerald-400">› Optimizing 4K assets... OK</p>
                 <p className="text-emerald-400">› Building SEO graph (Schema.org)... OK</p>
                 <p className="text-white font-bold mt-4">✓ Deployment Status: PRODUCTION_READY</p>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-rose-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
           </motion.div>
        </div>

        {/* THE ENGINE ROOM (Bento Tech Stack) */}
        <div className="mb-48">
           <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
              <div className="max-w-xl">
                 <h2 className="text-[10px] font-black text-rose-500 uppercase tracking-[0.4em] mb-6">Engine Room</h2>
                 <p className="text-4xl md:text-6xl font-black text-white leading-tight">Hand-coded for <span className="text-slate-600">peak performance.</span></p>
              </div>
              <p className="text-slate-500 max-w-xs font-light text-lg">We don't use builders. We use code to control every byte of your digital legacy.</p>
           </div>

           <div className="grid md:grid-cols-3 gap-6">
              {techBento.map((item, idx) => (
                <motion.div 
                   key={idx}
                   initial={{ opacity: 0, y: 20 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true }}
                   className={`${item.colSpan} group relative`}
                >
                   <div className="bg-white/5 rounded-[3rem] p-12 h-full border border-white/10 hover:border-rose-500/50 transition-all duration-500 relative overflow-hidden group">
                      <div className={`w-14 h-14 rounded-2xl ${item.color} text-white flex items-center justify-center text-2xl mb-10 shadow-2xl`}>
                         {item.icon}
                      </div>
                      <h4 className="text-2xl font-black text-white mb-4">{item.t}</h4>
                      <p className="text-slate-400 font-light leading-relaxed text-lg max-w-sm">{item.d}</p>
                      
                      {/* Decorative Background Glow */}
                      <div className={`absolute bottom-[-20%] right-[-10%] w-40 h-40 ${item.color} rounded-full blur-[100px] opacity-0 group-hover:opacity-20 transition-opacity`}></div>
                   </div>
                </motion.div>
              ))}
           </div>
        </div>

        {/* CODE-SNIPPET SHOWCASE (Technical Trust) */}
        <div className="flex flex-col lg:flex-row gap-20 items-center mb-48 bg-white/5 rounded-[4rem] p-12 lg:p-24 border border-white/5 relative overflow-hidden">
           <div className="absolute top-0 right-0 w-2/3 h-full bg-rose-500/5 -skew-x-[20deg] origin-top translate-x-1/2"></div>
           
           <div className="flex-1">
              <h2 className="text-5xl font-black text-white leading-tight mb-8">Architecturally <span className="text-rose-500 italic font-serif font-light">Clean.</span></h2>
              <p className="text-slate-400 text-xl font-light leading-relaxed mb-10">
                 All SYICT portfolios feature atomic structuring. We isolate concerns, ensuring your code is ready for future scaling or complex interactive expansions.
              </p>
              <div className="flex flex-wrap gap-4">
                 {["TypeScript Core", "Atomic CSS", "Clean Routes", "Edge Cache"].map(tag => (
                   <span key={tag} className="px-4 py-2 bg-white/5 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-500 border border-white/5">
                      {tag}
                   </span>
                 ))}
              </div>
           </div>

           <div className="flex-1 w-full overflow-hidden">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-[#0f1117] rounded-[2.5rem] p-8 font-mono text-xs leading-relaxed border border-white/10 shadow-2xl relative"
              >
                 <div className="flex justify-between items-center mb-6">
                    <p className="text-slate-600">portfolio-config.ts</p>
                    <IoCodeSlashOutline className="text-rose-500" />
                 </div>
                 <pre className="text-slate-300">
                    <code className="block">
                      <span className="text-pink-500">export const</span> <span className="text-white">PortfolioConfig</span> = {"{"} <br/>
                      &nbsp;&nbsp;<span className="text-indigo-400">performance</span>: <span className="text-amber-400">"ultra_fast"</span>, <br/>
                      &nbsp;&nbsp;<span className="text-indigo-400">animations</span>: <span className="text-amber-400">"immersive_physics"</span>, <br/>
                      &nbsp;&nbsp;<span className="text-indigo-400">deployment</span>: <span className="text-pink-500">{"{"}</span> <br/>
                      &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-indigo-400">provider</span>: <span className="text-amber-400">"Vercel Edge"</span>, <br/>
                      &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-indigo-400">ssl</span>: <span className="text-pink-500">true</span> <br/>
                      &nbsp;&nbsp;<span className="text-pink-500">{"}"}</span>, <br/>
                      &nbsp;&nbsp;<span className="text-indigo-400">seo</span>: <span className="text-pink-500">["Schema.org", "JSON-LD"]</span> <br/>
                      {"}"};
                    </code>
                 </pre>
              </motion.div>
           </div>
        </div>

        {/* THE PREPARATION VAULT (Checklist) */}
        <div className="text-center mb-48">
           <div className="max-w-2xl mx-auto mb-20">
              <h2 className="text-[10px] font-black text-rose-500 uppercase tracking-[0.4em] mb-6">Onboarding</h2>
              <p className="text-4xl md:text-6xl font-black text-white leading-tight">The Preparation <br/> <span className="text-slate-600">Vault.</span></p>
           </div>

           <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
              {preparationVault.map((item, idx) => (
                <motion.div 
                   key={idx}
                   whileHover={{ scale: 1.02 }}
                   className="bg-white/5 p-10 rounded-[3rem] border border-white/5 hover:border-emerald-500/50 transition-all text-left group"
                >
                   <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-xl text-slate-500 group-hover:bg-emerald-500 group-hover:text-white transition-all mb-8 shadow-2xl">
                      <IoLockOpenOutline />
                   </div>
                   <h4 className="text-xl font-bold text-white mb-4">{item.t}</h4>
                   <p className="text-slate-500 font-light text-sm leading-relaxed">{item.d}</p>
                </motion.div>
              ))}
           </div>
        </div>

        {/* FINAL VAULT CTA */}
        <div className="text-center py-40 border-t border-white/5 mt-20 relative overflow-hidden bg-rose-500 rounded-[5rem]">
           <div className="relative z-10">
              <h3 className="text-5xl lg:text-8xl font-black text-white mb-12 leading-[0.8]">Ready to unlock <br/> your <span className="font-serif italic font-light opacity-60 italic">Online Power?</span></h3>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                 <button className="px-16 py-6 bg-white text-rose-500 font-black rounded-3xl hover:bg-slate-900 hover:text-white transition-all shadow-2xl uppercase tracking-widest text-xs">
                    Start Architecture Brief
                 </button>
                 <Link href="/services/portfolio-websites" className="px-16 py-6 bg-rose-600 text-white font-black rounded-3xl hover:bg-rose-700 transition-all shadow-2xl uppercase tracking-widest text-xs flex items-center justify-center">
                    Return to Showcase
                 </Link>
              </div>
           </div>
           
           {/* Decorative Background Elements */}
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-white/10 blur-[120px] rounded-full pointer-events-none"></div>
        </div>

      </div>
    </section>
  );
}
