"use client";

import { 
  IoSearchOutline, 
  IoLayersOutline, 
  IoFlashOutline, 
  IoCheckmarkCircleOutline,
  IoPulseOutline,
  IoSparklesOutline,
  IoColorPaletteOutline,
  IoCodeSlashOutline,
  IoBrowsersOutline,
  IoFingerPrintOutline,
  IoFileTrayFullOutline
} from "react-icons/io5";
import { motion } from "framer-motion";
import Link from "next/link";
import { getIcon } from "@/lib/icons";

export default function UiUxClient({ content }) {
  if (!content) return null;

  const { hero, sections, cta } = content.landing;
  const pillars = sections.pillars || [];
  const metrics = sections.metrics || [];

  return (
    <section className="min-h-screen bg-slate-50 text-slate-900 selection:bg-cyan-600 selection:text-white overflow-hidden relative font-sans">
      <div className="absolute top-0 opacity-20 pointer-events-none -z-10 w-full h-full">
         <div className="absolute top-0 left-1/4 w-[1px] h-full bg-slate-200"></div>
         <div className="absolute top-0 right-1/4 w-[1px] h-full bg-slate-200"></div>
         <div className="absolute top-1/2 left-0 w-full h-[1px] bg-slate-200"></div>
         <div className="absolute top-[15%] left-[-100px] w-[500px] h-[500px] bg-cyan-50 rounded-full blur-[140px]"></div>
      </div>

      <div className="container-custom py-20 relative z-10">
        {/* DESIGN HERO */}
        <div className="flex flex-col lg:flex-row items-center gap-20 mb-48 px-4 md:px-0">
          <div className="flex-1 text-left">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-cyan-50 border border-cyan-100 text-cyan-700 text-[10px] font-black tracking-[0.4em] uppercase mb-10"
            >
              <IoSparklesOutline className="text-sm" /> {hero.badge}
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "circOut" }}
              className="text-5xl md:text-7xl font-black text-slate-900 leading-[1.1] mb-8 tracking-tighter"
            >
              {hero.title?.split('UX')[0]}UX <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-rose-500 to-indigo-500 animate-gradient-x">
                {hero.title?.split('UX')[1] || "Experience"}
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-slate-600 text-xl font-light leading-relaxed max-w-2xl mb-12"
            >
              {hero.description}
            </motion.p>

            <div className="flex flex-col sm:flex-row gap-6">
              <button className="w-full sm:w-[280px] px-8 py-6 bg-cyan-600 text-white font-black rounded-xl hover:bg-cyan-700 transition-all shadow-2xl shadow-cyan-600/20 uppercase tracking-widest text-[10px] flex items-center justify-center">
                Initialize Product Audit
              </button>
              <Link href="/services/ui-ux/details" className="w-full sm:w-[280px] px-8 py-6 bg-white border border-slate-200 text-slate-900 font-black rounded-xl hover:bg-slate-50 transition-all uppercase tracking-widest text-[10px] flex items-center justify-center text-center">
                Design Manifest
              </Link>
            </div>
          </div>

          <div className="flex-1 relative hidden lg:block">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="relative p-12 bg-white rounded-[4rem] border border-slate-100 shadow-2xl overflow-hidden group"
            >
               <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: "radial-gradient(#0891b2 1px, transparent 1px)", backgroundSize: "30px 30px" }}></div>
               
               <div className="relative aspect-square flex flex-col items-center justify-center">
                  <motion.div 
                    animate={{ scale: [1, 1.05, 1] }} 
                    transition={{ duration: 4, repeat: Infinity }}
                    className="w-48 h-48 bg-cyan-600 rounded-[3rem] shadow-2xl flex items-center justify-center relative overflow-hidden"
                  >
                     <motion.div 
                        animate={{ rotate: 360 }}
                        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-2 border-2 border-white/20 rounded-[2.5rem] border-dashed"
                     />
                     <IoLayersOutline className="text-6xl text-white" />
                  </motion.div>

                  <div className="absolute inset-0 flex items-center justify-center">
                     {[
                       { icon: <IoColorPaletteOutline />, pos: "top-10 left-10", d: 0.1 },
                       { icon: <IoCodeSlashOutline />, pos: "bottom-10 right-10", d: 0.3 },
                       { icon: <IoBrowsersOutline />, pos: "top-10 right-10", d: 0.5 },
                       { icon: <IoFingerPrintOutline />, pos: "bottom-10 left-10", d: 0.7 }
                     ].map((sat, i) => (
                       <motion.div
                         key={i}
                         initial={{ opacity: 0, scale: 0 }}
                         animate={{ opacity: 1, scale: 1 }}
                         transition={{ delay: sat.d, duration: 0.5 }}
                         className={`absolute ${sat.pos} w-20 h-20 bg-white border border-slate-100 shadow-xl rounded-3xl flex items-center justify-center text-cyan-500 text-3xl group-hover:scale-110 transition-transform`}
                       >
                          {sat.icon}
                       </motion.div>
                     ))}
                  </div>
               </div>

               <div className="absolute bottom-8 left-1/2 -translate-x-1/2 font-mono text-[8px] text-slate-300 uppercase tracking-[0.5em] bg-white px-4">
                  PRODUCT_INTERFACE_LAB_V4
               </div>
            </motion.div>
          </div>
        </div>

        {/* PILLARS SECTION */}
        <div className="mb-48 px-4 md:px-0">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8 border-l-4 border-cyan-600 pl-8">
            <div className="max-w-xl">
              <h2 className="text-[10px] font-black text-cyan-600 uppercase tracking-[0.4em] mb-4 font-bold">Experience Philosophy</h2>
              <p className="text-4xl md:text-6xl font-black text-slate-900 leading-tight">
                Architecting <span className="text-slate-400 italic font-serif font-light">user behavior.</span>
              </p>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {pillars?.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group cursor-default"
              >
                <div className="bg-white rounded-[3rem] p-12 h-full border border-slate-100 shadow-sm shadow-slate-200/50 hover:shadow-2xl transition-all group-hover:-translate-y-2 relative overflow-hidden text-left">
                  <div
                    className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.color} text-white flex items-center justify-center text-3xl mb-10 shadow-lg`}
                  >
                    {getIcon(item.icon)}
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

        {/* ATOMIC METRICS SECTION */}
        <div className="mb-48 px-4 md:px-0">
          <div className="grid lg:grid-cols-2 gap-20 items-center bg-white rounded-[4rem] p-12 lg:p-24 border border-slate-100 shadow-2xl shadow-slate-200/50 relative overflow-hidden">
             <div className="absolute top-0 right-0 w-1/3 h-full bg-cyan-50/20 -skew-x-[20deg] origin-top translate-x-1/2"></div>
             
             <div className="relative z-10 space-y-12">
                <div className="w-16 h-16 bg-cyan-50 rounded-2xl flex items-center justify-center text-3xl text-cyan-600 border border-cyan-100">
                   <IoLayersOutline />
                </div>
                <h2 className="text-5xl lg:text-7xl font-black text-slate-900 leading-[0.9]">Atomic <br/><span className="text-cyan-600">Scaling.</span></h2>
                <p className="text-slate-500 text-xl font-light leading-relaxed">We build highly scalable Design Systems that standardize component logic and ensure absolute visual consistency across platforms.</p>
                
                <div className="grid grid-cols-2 gap-px bg-slate-50 border border-slate-100 rounded-3xl overflow-hidden mt-10">
                   {metrics?.map((item, idx) => (
                      <div key={idx} className="p-10 hover:bg-white transition-colors group">
                         <div className="text-cyan-600 mb-3 text-xl">{getIcon(item.icon)}</div>
                         <h4 className="text-[10px] font-black text-cyan-600 uppercase tracking-widest mb-2">{item.t}</h4>
                         <p className="text-xs text-slate-400 font-bold italic">{item.d}</p>
                      </div>
                   ))}
                </div>
             </div>

             <motion.div
               animate={{ rotate: [0, -1, 0] }}
               transition={{ duration: 8, repeat: Infinity }}
               className="relative lg:scale-110"
             >
                <div className="bg-slate-900 rounded-[3rem] p-12 border border-slate-800 shadow-2xl space-y-10 group">
                   <div className="flex justify-between items-center text-white/40 font-mono text-[8px] tracking-[0.4em] uppercase">
                       <span>Interaction Spec</span>
                       <span>UI_COMPONENT_v4.2</span>
                   </div>
                   
                   <div className="space-y-6">
                      <div className="flex items-center gap-4">
                         <div className="w-12 h-12 rounded-xl bg-cyan-500 shadow-[0_0_20px_rgba(6,182,212,0.4)] flex items-center justify-center text-white font-black text-xs">A</div>
                         <div className="flex-1 space-y-2">
                             <div className="h-1.5 bg-white/10 rounded-full w-full relative">
                                <motion.div initial={{ width: 0 }} whileInView={{ width: "94%" }} transition={{ duration: 2 }} className="absolute inset-0 bg-cyan-500 rounded-full" />
                             </div>
                             <div className="h-1.5 bg-white/5 rounded-full w-1/4"></div>
                         </div>
                      </div>
                   </div>

                   <div className="pt-8 border-t border-white/5 flex justify-between items-center">
                      <p className="text-[10px] font-mono text-cyan-400 font-bold tracking-tighter uppercase">Consistency::98% / Benchmark</p>
                      <IoPulseOutline className="text-cyan-500 animate-pulse text-2xl" />
                   </div>
                </div>
             </motion.div>
          </div>
        </div>

        {/* FINAL CTA RIBBON */}
        <div className="text-center py-40 border-t border-slate-200 px-4 md:px-0">
           <IoColorPaletteOutline className="text-7xl text-cyan-600 mb-12 mx-auto opacity-20" />
           <h3 className="text-5xl lg:text-[5.5rem] font-black text-slate-900 mb-14 leading-[1.1] tracking-tighter">
              {cta.title?.includes('. ') ? (
                 <>
                    {cta.title.split('. ')[0]}. <br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-indigo-600 font-serif italic font-medium">
                      {cta.title.split('. ')[1]}
                    </span>
                 </>
              ) : (
                 <>
                    Ready to activate your <br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-indigo-600 font-serif italic font-medium">
                      {cta.title}
                    </span>
                 </>
              )}
           </h3>
           <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <button className="w-full sm:w-[320px] px-10 py-7 bg-cyan-600 text-white font-black rounded-2xl hover:bg-cyan-700 transition-all shadow-[0_20px_40px_-15px_rgba(6,182,212,0.3)] uppercase tracking-[0.2em] text-[11px] flex items-center justify-center gap-3 active:scale-95">
                <IoFlashOutline className="text-xl" /> Initialize Product Audit
              </button>
           </div>
        </div>
      </div>
    </section>
  );
}
