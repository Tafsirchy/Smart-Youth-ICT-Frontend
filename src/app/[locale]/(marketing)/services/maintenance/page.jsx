"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { 
  IoShieldCheckmarkOutline, 
  IoConstructOutline, 
  IoTimerOutline, 
  IoSpeedometerOutline, 
  IoPulseOutline,
  IoCheckmarkCircleOutline,
  IoReloadOutline,
  IoFlashOutline,
  IoSparklesOutline
} from "react-icons/io5";

const maintenanceTiers = [
  {
    title: "Security & Core",
    desc: "The structural essentials. Weekly off-site backups, core engine updates, and 24/7 malware monitoring to keep your node live.",
    icon: <IoShieldCheckmarkOutline />,
    color: "from-teal-600 to-emerald-700"
  },
  {
    title: "Standard Ops",
    desc: "Active performance tuning. Includes plugin/theme synchronization, broken link logic, and monthly speed optimization audits.",
    icon: <IoConstructOutline />,
    color: "from-slate-700 to-slate-900"
  },
  {
    title: "Full Dedicated",
    desc: "Your own development engineers on retainer. Includes unlimited small content changes and dedicated custom feature support.",
    icon: <IoPulseOutline />,
    color: "from-blue-600 to-indigo-700"
  }
];

export default function MaintenancePage() {
  return (
    <section className="min-h-screen bg-slate-50 text-slate-900 selection:bg-teal-600 selection:text-white overflow-hidden relative font-sans">
      {/* INDUSTRIAL BACKGROUND DECOR */}
      <div className="absolute top-0 opacity-20 pointer-events-none -z-10 w-full h-full">
         <div className="absolute top-0 left-1/4 w-[1px] h-full bg-slate-200"></div>
         <div className="absolute top-0 right-1/4 w-[1px] h-full bg-slate-200"></div>
         <div className="absolute top-1/2 left-0 w-full h-[1px] bg-slate-200"></div>
         <div className="absolute top-[20%] left-[-100px] w-[500px] h-[500px] bg-teal-50 rounded-full blur-[140px]"></div>
      </div>

      <div className="container-custom py-24 relative z-10">
        {/* MAINTENANCE HERO */}
        <div className="flex flex-col lg:flex-row items-center gap-20 mb-48 pt-10 px-4 md:px-0">
          <div className="flex-1 text-left">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-teal-50 border border-teal-100 text-teal-700 text-[10px] font-black tracking-[0.4em] uppercase mb-10"
            >
              <IoSparklesOutline className="text-sm" /> Zero-Downtime Infrastructure Guarantee
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "circOut" }}
              className="text-6xl md:text-8xl lg:text-[10rem] font-black leading-[0.85] mb-12 tracking-tighter"
            >
              System <br /> <span className="text-teal-600 italic font-serif font-light">Guard.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-slate-500 text-xl md:text-2xl font-light leading-relaxed max-w-2xl mb-12"
            >
              Never worry about crashes or security vulnerabilities again. We architect high-vibration maintenance protocols that ensure your platform remains elite, secure, and globally performant.
            </motion.p>

            <div className="flex flex-col sm:flex-row gap-6">
              <button className="w-full sm:w-[280px] px-8 py-6 bg-teal-600 text-white font-black rounded-xl hover:bg-teal-700 transition-all shadow-2xl shadow-teal-600/20 uppercase tracking-widest text-[10px] flex items-center justify-center">
                Initialize Ops Audit
              </button>
              <Link
                href="/services/maintenance/details"
                className="w-full sm:w-[280px] px-8 py-6 bg-white border border-slate-200 text-slate-900 font-black rounded-xl hover:bg-slate-50 transition-all uppercase tracking-widest text-[10px] flex items-center justify-center text-center"
              >
                Technical Specifications
              </Link>
            </div>
          </div>

          <div className="flex-1 relative hidden lg:block">
            {/* Guardian Console Visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotate: -3 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1 }}
              className="relative p-12 bg-white rounded-[4rem] border border-slate-100 shadow-2xl overflow-hidden group"
            >
               <div className="relative aspect-square flex items-center justify-center">
                  <div className="absolute inset-x-0 h-[1px] bg-slate-100"></div>
                  <div className="absolute inset-y-0 w-[1px] bg-slate-100"></div>
                  
                  {/* Pulsing Radar UI */}
                  <div className="relative z-10 w-64 h-64 border border-teal-100 rounded-full flex items-center justify-center">
                     <motion.div 
                       animate={{ scale: [1, 1.5, 1], opacity: [0.1, 0, 0.1] }} 
                       transition={{ duration: 3, repeat: Infinity }}
                       className="absolute inset-0 bg-teal-100 rounded-full"
                     ></motion.div>
                     
                     <div className="w-48 h-48 bg-slate-900 rounded-[3rem] shadow-2xl flex flex-col items-center justify-center group-hover:scale-110 transition-transform relative z-20">
                        <IoShieldCheckmarkOutline className="text-6xl text-teal-400 mb-4" />
                        <div className="flex flex-col items-center gap-1">
                           <span className="text-[8px] font-black text-white/40 uppercase tracking-widest">System Health</span>
                           <span className="text-xs font-bold text-teal-400">OPTIMIZED</span>
                        </div>
                     </div>
                  </div>

                  {/* Floating Status Nodes */}
                  {[
                    { icon: <IoTimerOutline />, pos: "top-10 left-10", label: "UPTIME::99.9%" },
                    { icon: <IoSpeedometerOutline />, pos: "bottom-10 right-10", label: "SCORE::100/100" },
                    { icon: <IoReloadOutline />, pos: "top-14 right-14", label: "BACKUP::SYNCED" }
                  ].map((node, i) => (
                    <motion.div
                      key={i}
                      animate={{ y: [0, -10, 0] }}
                      transition={{ duration: 5, delay: i * 0.7, repeat: Infinity }}
                      className={`absolute ${node.pos} p-6 bg-white rounded-3xl border border-slate-100 shadow-xl flex flex-col items-center gap-2 z-30`}
                    >
                      <div className="text-teal-600 text-2xl">{node.icon}</div>
                      <span className="text-[7px] font-black text-slate-300 uppercase tracking-widest">{node.label}</span>
                    </motion.div>
                  ))}
               </div>
            </motion.div>
          </div>
        </div>

        {/* TIERS SECTION */}
        <div className="mb-48 px-4 md:px-0">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8 border-l-4 border-teal-600 pl-8">
            <div className="max-w-xl">
              <h2 className="text-[10px] font-black text-teal-600 uppercase tracking-[0.4em] mb-4 font-bold">Operational Tiers</h2>
              <p className="text-4xl md:text-6xl font-black text-slate-900 leading-tight">
                The lifecycle of <span className="text-slate-400 italic font-serif font-light">peak performance.</span>
              </p>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {maintenanceTiers.map((item, i) => (
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

        {/* HEALTH DASHBOARD SECTION */}
        <div className="mb-48 px-4 md:px-0">
          <div className="grid lg:grid-cols-2 gap-20 items-center bg-white rounded-[4rem] p-12 lg:p-24 border border-slate-100 shadow-2xl shadow-slate-200/50 relative overflow-hidden">
             <div className="absolute top-0 right-0 w-1/3 h-full bg-teal-50/20 -skew-x-[20deg] origin-top translate-x-1/2"></div>
             
             <div className="relative z-10 space-y-12">
                <div className="w-16 h-16 bg-teal-50 rounded-2xl flex items-center justify-center text-3xl text-teal-600 border border-teal-100">
                   <IoSpeedometerOutline />
                </div>
                <h2 className="text-5xl lg:text-7xl font-black text-slate-900 leading-[0.9]">Live <br/><span className="text-teal-600">Health Hub.</span></h2>
                <p className="text-slate-500 text-xl font-light leading-relaxed">Gain absolute structural transparency. Every client receives a manifest showing real-time uptime, security scans, and V8 engine performance metrics.</p>
                
                <div className="grid grid-cols-2 gap-6 pt-10 border-t border-slate-100">
                   {[
                     { t: "99.9% Uptime", d: "Zero-latency monitoring" },
                     { t: "Malware Decryption", d: "Deep heuristic scanning" },
                     { t: "Version Sync", d: "Atomic core updates" },
                     { t: "Speed Calibration", d: "LCP/CLS Optimization" }
                   ].map((item, idx) => (
                      <div key={idx} className="space-y-2">
                         <h4 className="text-[10px] font-black text-teal-600 uppercase tracking-widest">{item.t}</h4>
                         <p className="text-xs text-slate-400 font-bold">{item.d}</p>
                      </div>
                   ))}
                </div>
             </div>

             <motion.div
               animate={{ y: [0, 10, 0] }}
               transition={{ duration: 8, repeat: Infinity }}
               className="relative bg-slate-900 rounded-[3rem] p-12 border border-slate-800 shadow-2xl space-y-10 overflow-hidden"
             >
                <div className="absolute top-0 right-0 p-4 font-mono text-[7px] text-teal-400 bg-white/5 opacity-50 tracking-[0.4em]">SCAN_ACTIVE::Vulnerabilities_0</div>
                
                <div className="grid grid-cols-2 gap-4">
                   <div className="p-6 bg-white/5 border border-white/10 rounded-2xl text-center">
                      <IoTimerOutline className="text-teal-500 text-3xl mx-auto mb-2" />
                      <p className="text-2xl font-black text-white">99.9%</p>
                      <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Uptime</p>
                   </div>
                   <div className="p-6 bg-white/5 border border-white/10 rounded-2xl text-center">
                      <IoSpeedometerOutline className="text-emerald-500 text-3xl mx-auto mb-2" />
                      <p className="text-2xl font-black text-white">100/100</p>
                      <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest">PageSpeed</p>
                   </div>
                </div>

                <div className="pt-6 border-t border-white/5">
                   <div className="flex justify-between items-center mb-4">
                      <p className="text-[10px] font-black text-white/40 uppercase tracking-widest">Backup Stability</p>
                      <p className="text-xs text-teal-500 font-bold">100%</p>
                   </div>
                   <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <motion.div initial={{ width: 0 }} whileInView={{ width: "100%" }} transition={{ duration: 1 }} className="bg-teal-500 h-full" />
                   </div>
                </div>
             </motion.div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center py-40 border-t border-slate-200 px-4 md:px-0">
           <IoFlashOutline className="text-7xl text-teal-600 mb-12 mx-auto opacity-20" />
           <h3 className="text-5xl lg:text-7xl font-black text-slate-900 mb-12 leading-tight">Your website doesn't get sick. <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-slate-900 font-serif italic font-medium">Engineer Resilience.</span></h3>
           <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button className="w-full sm:w-[280px] px-8 py-6 bg-teal-600 text-white font-black rounded-xl hover:bg-teal-700 transition-all shadow-2xl shadow-teal-600/40 uppercase tracking-widest text-[10px] flex items-center justify-center">
                Initialize Ops Audit
              </button>
              <Link
                href="/services/maintenance/details"
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
