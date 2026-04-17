"use client";

import { 
  IoFlashOutline, 
  IoSyncOutline, 
  IoCalculatorOutline, 
  IoShareSocialOutline, 
  IoLayersOutline, 
  IoCloudDoneOutline, 
  IoGitNetworkOutline,
  IoPulseOutline,
  IoSettingsOutline,
  IoSparklesOutline
} from "react-icons/io5";
import { motion } from "framer-motion";
import Link from "next/link";
import { getIcon } from "@/lib/icons";

export default function AutomationClient({ data }) {
  if (!data) return null;

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
        {/* AUTOMATION HERO */}
        <div className="flex flex-col lg:flex-row items-center gap-20 mb-48 px-4 md:px-0">
          <div className="flex-1 text-left">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-amber-50 border border-amber-100 text-amber-700 text-[10px] font-black tracking-[0.4em] uppercase mb-10"
            >
              <IoSparklesOutline className="text-sm" /> {data.hero.badge}
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "circOut" }}
              className="text-5xl md:text-7xl font-black text-slate-900 leading-[1.1] mb-8 tracking-tighter"
            >
              {data.hero.title?.split(' ')[0]} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-violet-500 to-emerald-500 animate-gradient-x">{data.hero.title?.split(' ').slice(1).join(' ')}</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-slate-600 text-xl font-light leading-relaxed max-w-2xl mb-12"
            >
              {data.hero.description}
            </motion.p>

            <div className="flex flex-col sm:flex-row gap-6">
              <button className="w-full sm:w-[280px] px-8 py-6 bg-amber-600 text-white font-black rounded-xl hover:bg-amber-700 transition-all shadow-2xl shadow-amber-600/20 uppercase tracking-widest text-[10px] flex items-center justify-center">
                Initialize Audit
              </button>
              <Link
                href="/services/automation/details"
                className="w-full sm:w-[280px] px-8 py-6 bg-white border border-slate-200 text-slate-900 font-black rounded-xl hover:bg-slate-50 transition-all uppercase tracking-widest text-[10px] flex items-center justify-center text-center"
              >
                Technical Specifications
              </Link>
            </div>
          </div>

          <div className="flex-1 relative hidden lg:block">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotate: 5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1 }}
              className="relative p-12 bg-white rounded-[4rem] border border-slate-100 shadow-2xl overflow-hidden"
            >
               {/* Logic Schematic Visual */}
               <div className="relative aspect-[4/3] flex flex-col justify-between items-center py-10">
                  <motion.div 
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 4, repeat: Infinity }}
                    className="p-6 bg-amber-600 rounded-2xl shadow-2xl relative z-20 font-black text-white text-xs tracking-widest uppercase"
                  >
                    API_SOURCE_EVENT
                  </motion.div>
                  <div className="w-full flex justify-around items-center px-4">
                     <motion.div className="p-4 bg-slate-900 rounded-xl relative z-20 text-white text-[8px] font-black border border-slate-800 space-y-3 w-32 shadow-xl">
                        <div className="flex justify-between items-center opacity-40 uppercase tracking-widest"><span>Node_01</span> <IoFlashOutline /></div>
                        <div className="h-1 w-full bg-amber-500/20 rounded-full overflow-hidden">
                           <motion.div animate={{ x: ["-100%", "100%"] }} transition={{ duration: 2, repeat: Infinity }} className="h-full w-1/2 bg-amber-500" />
                        </div>
                        <p className="text-amber-500">FORMAT_DATA</p>
                     </motion.div>
                     <motion.div className="p-4 bg-slate-100 rounded-xl relative z-20 text-slate-400 text-[8px] font-black border border-slate-200 space-y-3 w-32 shadow-sm">
                        <div className="flex justify-between items-center opacity-40 uppercase tracking-widest"><span>Node_02</span> <IoSettingsOutline /></div>
                        <div className="h-1 w-full bg-slate-200 rounded-full"></div>
                        <p>SYNC_LOGIC</p>
                     </motion.div>
                  </div>
                  <motion.div 
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 5, repeat: Infinity }}
                    className="p-6 bg-indigo-600 rounded-2xl shadow-2xl relative z-20 font-black text-white text-xs flex gap-3 items-center tracking-widest uppercase"
                  >
                    <IoCloudDoneOutline className="text-xl" /> CRM_DESTINATION
                  </motion.div>
                   <svg className="absolute inset-0 w-full h-full -z-10" viewBox="0 0 100 100" preserveAspectRatio="none">
                      <motion.path 
                        initial={{ pathLength: 0 }} 
                        whileInView={{ pathLength: 1 }} 
                        d="M 50 15 L 20 50 L 50 85" 
                        stroke="rgba(245,158,11,0.2)" 
                        strokeWidth="1" 
                        fill="none" 
                      />
                      <motion.path 
                        initial={{ pathLength: 0 }} 
                        whileInView={{ pathLength: 1 }} 
                        d="M 50 15 L 80 50 L 50 85" 
                        stroke="rgba(99,102,241,0.2)" 
                        strokeWidth="1" 
                        fill="none" 
                      />
                   </svg>
               </div>
               <div className="absolute top-4 left-4 font-mono text-[8px] text-slate-300 uppercase tracking-widest bg-white pr-4">
                  SYNC_ACTIVE::V6.8
               </div>
            </motion.div>
          </div>
        </div>

        {/* PILLARS SECTION */}
        <div className="mb-48 px-4 md:px-0">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8 border-l-4 border-amber-600 pl-8">
            <div className="max-w-xl">
              <h2 className="text-[10px] font-black text-amber-600 uppercase tracking-[0.4em] mb-4 font-bold">Automation Logic</h2>
              <p className="text-4xl md:text-6xl font-black text-slate-900 leading-tight">
                The architecture of <span className="text-slate-400 italic font-serif font-light">frictionless growth.</span>
              </p>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {(data.sections.pillars || []).map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group cursor-default"
              >
                <div className="bg-white rounded-[3rem] p-12 h-full border border-slate-100 shadow-sm shadow-slate-200/50 hover:shadow-2xl transition-all group-hover:-translate-y-2 relative overflow-hidden">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.color || 'from-amber-500 to-orange-600'} text-white flex items-center justify-center text-3xl mb-10 shadow-lg`}>
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

        {/* LOGIC ENGINE SECTION */}
        <div className="mb-48 px-4 md:px-0">
          <div className="grid lg:grid-cols-2 gap-20 items-center bg-white rounded-[4rem] p-12 lg:p-24 border border-slate-100 shadow-2xl shadow-slate-200/50 relative overflow-hidden">
             <div className="absolute top-0 right-0 w-1/3 h-full bg-amber-50/20 -skew-x-[20deg] origin-top translate-x-1/2"></div>
             
             <div className="relative z-10 space-y-12">
                <div className="w-16 h-16 bg-amber-50 rounded-2xl flex items-center justify-center text-3xl text-amber-600 border border-amber-100">
                   <IoLayersOutline />
                </div>
                <h2 className="text-5xl lg:text-7xl font-black text-slate-900 leading-[0.9]">Visual <br/><span className="text-amber-600">Logic Hub.</span></h2>
                <p className="text-slate-500 text-xl font-light leading-relaxed">We connect your software ecosystem through complex, resilient nodes. Every time an event triggers in one app, your entire business reacts instantly.</p>
                
                <div className="grid grid-cols-2 gap-px bg-slate-50 border border-slate-100 rounded-3xl overflow-hidden mt-10">
                   {(data.sections.integrations || []).map((item, idx) => (
                      <div key={idx} className="p-10 hover:bg-white transition-colors group">
                         <h4 className="text-[10px] font-black text-amber-600 uppercase tracking-widest mb-2">{item.t}</h4>
                         <p className="text-xs text-slate-400 font-bold">{item.d}</p>
                      </div>
                   ))}
                </div>
             </div>

             <motion.div
               animate={{ y: [0, -10, 0] }}
               transition={{ duration: 7, repeat: Infinity }}
               className="relative bg-slate-900 rounded-[3rem] p-12 border border-slate-800 shadow-2xl space-y-10 overflow-hidden"
             >
                <div className="absolute top-0 right-0 p-4 font-mono text-[7px] text-amber-400 bg-white/5 opacity-50 tracking-[0.4em]">PROCESS_SYNC::ACTIVE</div>
                
                <div className="space-y-6">
                   <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/5">
                      <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-500"><IoPulseOutline /></div>
                      <div className="flex-1 space-y-1">
                         <div className="h-1.5 w-full bg-white/10 rounded-full"></div>
                         <div className="h-1.5 w-1/2 bg-white/10 rounded-full"></div>
                      </div>
                   </div>
                </div>

                <div className="pt-10 border-t border-white/5">
                   <p className="text-[10px] font-mono text-amber-500 font-bold tracking-tighter">DATA_PROPAGATION::99.9% SUCCESS</p>
                   <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mt-2">Active Workflows: 24</p>
                </div>
             </motion.div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center py-40 border-t border-slate-200 px-4 md:px-0">
           <IoFlashOutline className="text-7xl text-amber-600 mb-12 mx-auto opacity-20" />
           <h3 className="text-5xl lg:text-7xl font-black text-slate-900 mb-12 leading-tight">Focus on your strategy. <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-indigo-600 font-serif italic font-medium">Automate the Grind.</span></h3>
           <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button className="w-full sm:w-[280px] px-8 py-6 bg-amber-600 text-white font-black rounded-xl hover:bg-amber-700 transition-all shadow-2xl shadow-amber-600/40 uppercase tracking-widest text-[10px] flex items-center justify-center">
                Request Audit
              </button>
              <Link
                href="/services/automation/details"
                className="w-full sm:w-[280px] px-8 py-6 bg-slate-900 text-white font-black rounded-xl hover:bg-slate-800 transition-all uppercase tracking-widest text-[10px] flex items-center justify-center text-center"
              >
                Technical Hub
              </Link>
           </div>
        </div>
      </div>
    </section>
  );
}
