"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { 
  IoSearchOutline, 
  IoLayersOutline, 
  IoFlashOutline, 
  IoGridOutline, 
  IoCubeOutline, 
  IoCheckmarkCircleOutline,
  IoColorWandOutline,
  IoGitNetworkOutline,
  IoShapesOutline
} from "react-icons/io5";

const designPillars = [
  {
    title: "User Research Protocol",
    desc: "Empathy mapping, user interviews, and data-driven personas to understand exactly who we are building for.",
    icon: <IoSearchOutline />,
    color: "from-cyan-600 to-indigo-600"
  },
  {
    title: "Architectural Wireframing",
    desc: "Low-fidelity structural logic. We prioritize flow and information architecture before we touch a single pixel.",
    icon: <IoLayersOutline />,
    color: "from-indigo-600 to-blue-700"
  },
  {
    title: "Atomic Prototyping",
    desc: "High-fidelity, interactive Figma handoffs. Experience the final product before a single line of code is written.",
    icon: <IoFlashOutline />,
    color: "from-rose-500 to-pink-600"
  }
];

export default function UiUxPage() {
  return (
    <section className="min-h-screen bg-slate-50 text-slate-900 selection:bg-cyan-600 selection:text-white overflow-hidden relative font-sans">
      {/* INDUSTRIAL BACKGROUND DECOR */}
      <div className="absolute top-0 opacity-20 pointer-events-none -z-10 w-full h-full">
         <div className="absolute top-0 left-1/4 w-[1px] h-full bg-slate-200"></div>
         <div className="absolute top-0 right-1/4 w-[1px] h-full bg-slate-200"></div>
         <div className="absolute top-1/2 left-0 w-full h-[1px] bg-slate-200"></div>
         <div className="absolute top-[10%] left-[-100px] w-[500px] h-[500px] bg-cyan-50 rounded-full blur-[140px]"></div>
      </div>

      <div className="container-custom py-20 relative z-10">
        {/* UI/UX HERO */}
        <div className="flex flex-col lg:flex-row items-center gap-20 mb-48 pt-10 px-4 md:px-0">
          <div className="flex-1 text-left">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-cyan-50 border border-cyan-100 text-cyan-700 text-[10px] font-black tracking-[0.4em] uppercase mb-10"
            >
              <IoColorWandOutline className="text-sm" /> Product Experience Blueprint
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "circOut" }}
              className="text-5xl md:text-7xl font-black text-slate-900 leading-[1.1] mb-8 tracking-tighter"
            >
              UI/UX <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-rose-500 to-indigo-500 animate-gradient-x">Design</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-slate-600 text-xl font-light leading-relaxed max-w-2xl mb-12"
            >
              We don't just design interfaces; we architect user behavior. Our UI/UX philosophy is grounded in cognitive psychology and data-driven accessibility to ensure your product is beautiful and highly efficient.
            </motion.p>

            <div className="flex flex-col sm:flex-row gap-6">
              <button className="w-full sm:w-[280px] px-8 py-6 bg-cyan-600 text-white font-black rounded-xl hover:bg-cyan-700 transition-all shadow-2xl shadow-cyan-600/20 uppercase tracking-widest text-[10px] flex items-center justify-center">
                Initialize Product Audit
              </button>
              <Link
                href="/services/ui-ux/details"
                className="w-full sm:w-[280px] px-8 py-6 bg-white border border-slate-200 text-slate-900 font-black rounded-xl hover:bg-slate-50 transition-all uppercase tracking-widest text-[10px] flex items-center justify-center text-center"
              >
                Technical Specifications
              </Link>
            </div>
          </div>

          <div className="flex-1 relative hidden lg:block">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1 }}
              className="relative p-12 bg-white rounded-[4rem] border border-slate-100 shadow-2xl overflow-hidden"
            >
               {/* Component Logic Grid */}
               <div className="absolute inset-x-0 top-1/2 h-[1px] bg-slate-100"></div>
               <div className="absolute inset-y-0 left-1/2 w-[1px] bg-slate-100"></div>
               
               <div className="grid grid-cols-2 gap-8 relative z-10 aspect-square">
                  <motion.div 
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 4, repeat: Infinity }}
                    className="p-8 bg-slate-50 rounded-3xl border border-slate-100 flex flex-col justify-between shadow-sm"
                  >
                     <div className="w-10 h-10 bg-cyan-600 rounded-xl shadow-[0_0_20px_rgba(8,145,178,0.4)]"></div>
                     <div className="space-y-2">
                        <div className="h-1.5 w-full bg-slate-200 rounded-full"></div>
                        <div className="h-1.5 w-3/4 bg-slate-200 rounded-full"></div>
                     </div>
                  </motion.div>
                  <motion.div 
                    animate={{ y: [10, 0, 10] }}
                    transition={{ duration: 4, repeat: Infinity }}
                    className="p-8 bg-slate-900 rounded-3xl flex flex-col justify-end shadow-xl"
                  >
                     <div className="h-10 bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 rounded-full flex items-center justify-center text-[10px] font-black tracking-widest uppercase">Active Node</div>
                  </motion.div>
                  <motion.div 
                    initial={{ scale: 0.9 }}
                    whileHover={{ scale: 1.05 }}
                    className="col-span-2 p-10 bg-white rounded-[2.5rem] border border-slate-200 shadow-xl flex items-center justify-between"
                  >
                     <div className="flex gap-3">
                        <div className="w-6 h-6 bg-cyan-500 rounded-full"></div>
                        <div className="w-6 h-6 bg-indigo-500 rounded-full"></div>
                        <div className="w-6 h-6 bg-slate-200 rounded-full"></div>
                     </div>
                     <div className="w-32 h-6 bg-slate-50 rounded-full border border-slate-100 flex items-center justify-center">
                        <div className="w-24 h-1.5 bg-slate-200 rounded-full"></div>
                     </div>
                  </motion.div>
               </div>

               <div className="absolute top-4 left-1/2 -translate-x-1/2 font-mono text-[8px] text-slate-400 uppercase tracking-widest bg-white px-4">
                  COMPONENT_REGISTRY_V2.0
               </div>
            </motion.div>
          </div>
        </div>

        {/* PILLARS SECTION */}
        <div className="mb-48 px-4 md:px-0">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8 border-l-4 border-cyan-600 pl-8">
            <div className="max-w-xl">
              <h2 className="text-[10px] font-black text-cyan-600 uppercase tracking-[0.4em] mb-4 font-bold">Scientific Design</h2>
              <p className="text-4xl md:text-6xl font-black text-slate-900 leading-tight">
                The lifecycle of <span className="text-slate-400 italic font-serif font-light">user engagement.</span>
              </p>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {designPillars.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group cursor-default"
              >
                <div className="bg-white rounded-[3rem] p-12 h-full border border-slate-100 shadow-sm shadow-slate-200/50 hover:shadow-2xl transition-all group-hover:-translate-y-2 relative overflow-hidden">
                  <div
                    className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.color} text-white flex items-center justify-center text-3xl mb-10 shadow-lg`}
                  >
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

        {/* SYSTEM MANIFEST SECTION */}
        <div className="mb-48 px-4 md:px-0">
          <div className="grid lg:grid-cols-2 gap-20 items-center bg-white rounded-[4rem] p-12 lg:p-24 border border-slate-100 shadow-2xl shadow-slate-200/50 relative overflow-hidden">
             <div className="absolute top-0 right-0 w-1/3 h-full bg-cyan-50/20 -skew-x-[20deg] origin-top translate-x-1/2"></div>
             
             <div className="relative z-10 space-y-12">
                <div className="w-16 h-16 bg-cyan-50 rounded-2xl flex items-center justify-center text-3xl text-cyan-600 border border-cyan-100">
                   <IoShapesOutline />
                </div>
                <h2 className="text-5xl lg:text-7xl font-black text-slate-900 leading-[0.9]">Atomic <br/><span className="text-cyan-600">Libraries.</span></h2>
                <p className="text-slate-500 text-xl font-light leading-relaxed">We deliver more than pages. We deliver Scalability. Our designs come with a comprehensive component library mapping every button and interaction state.</p>
                
                <div className="grid grid-cols-2 gap-6 pt-10 border-t border-slate-100">
                   {[
                     "Atomic Design Specs",
                     "Design Tokens (JSON)",
                     "Figma Auto-Layout",
                     "Interaction Prototypes",
                     "Handoff Protocol",
                     "Light/Dark Schemas"
                   ].map((item, idx) => (
                      <div key={idx} className="flex items-center gap-3 text-sm font-bold text-slate-700">
                         <IoCheckmarkCircleOutline className="text-cyan-600 text-lg" /> {item}
                      </div>
                   ))}
                </div>
             </div>

             <motion.div
               animate={{ rotate: [0, 1, 0] }}
               transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
               className="relative lg:scale-110"
             >
                <div className="bg-slate-900 rounded-[3rem] p-12 border border-slate-800 shadow-2xl space-y-10 group">
                   <div className="flex justify-between items-center text-white/40 font-mono text-[8px] tracking-[0.4em] uppercase">
                      <span>Sync Active</span>
                      <span>Product_Spec_v3</span>
                   </div>
                   
                   <div className="space-y-6">
                      <div className="flex items-center gap-4">
                         <div className="w-12 h-12 rounded-xl bg-cyan-500 shadow-[0_0_20px_rgba(6,182,212,0.4)]"></div>
                         <div className="flex-1 space-y-2">
                            <div className="h-1.5 bg-white/10 rounded-full w-full"></div>
                            <div className="h-1.5 bg-white/5 rounded-full w-2/3"></div>
                         </div>
                      </div>
                      <div className="flex flex-wrap gap-2 pt-6">
                         <div className="px-4 py-2 rounded-full border border-white/10 text-[8px] font-black uppercase text-white/60">Primary_01</div>
                         <div className="px-4 py-2 rounded-full border border-white/10 text-[8px] font-black uppercase text-white/60">Success_04</div>
                         <div className="px-4 py-2 rounded-full border border-white/10 text-[8px] font-black uppercase text-white/60">Warn_08</div>
                      </div>
                   </div>

                   <div className="h-[200px] bg-white/5 rounded-3xl border border-white/10 relative overflow-hidden flex flex-col items-center justify-center">
                      <IoGitNetworkOutline className="text-4xl text-white/10 animate-pulse" />
                      <div className="absolute top-0 right-0 p-4 font-mono text-[7px] text-emerald-400">STATUS::READY</div>
                   </div>
                </div>
             </motion.div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center py-40 border-t border-slate-200 px-4 md:px-0">
           <IoColorWandOutline className="text-7xl text-cyan-600 mb-12 mx-auto opacity-20" />
           <h3 className="text-5xl lg:text-7xl font-black text-slate-900 mb-12 leading-tight">Eliminate friction. <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-indigo-600 font-serif italic font-medium">Maximize Conversion.</span></h3>
           <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button className="w-full sm:w-[280px] px-8 py-6 bg-cyan-600 text-white font-black rounded-xl hover:bg-cyan-700 transition-all shadow-2xl shadow-cyan-600/40 uppercase tracking-widest text-[10px] flex items-center justify-center">
                Initialize Product Audit
              </button>
              <Link
                href="/services/ui-ux/details"
                className="w-full sm:w-[280px] px-8 py-6 bg-slate-900 text-white font-black rounded-xl hover:bg-slate-800 transition-all uppercase tracking-widest text-[10px] flex items-center justify-center text-center"
              >
                Technical Specifications
              </Link>
           </div>
        </div>
      </div>
    </section>
  );
}
