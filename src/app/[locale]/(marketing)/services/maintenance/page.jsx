"use client";

import { motion } from "framer-motion";
import { 
  IoShieldCheckmarkOutline, 
  IoConstructOutline, 
  IoCodeDownloadOutline, 
  IoTimerOutline, 
  IoSpeedometerOutline, 
  IoPulseOutline,
  IoCheckmarkCircleOutline
} from "react-icons/io5";

const maintenanceTiers = [
  {
    title: "Security & Core",
    desc: "The essentials. Weekly off-site backups, core engine updates, and 24/7 malware monitoring to keep your site live.",
    icon: <IoShieldCheckmarkOutline />,
    color: "bg-blue-500"
  },
  {
    title: "Standard Ops",
    desc: "Active performance tuning. Includes plugin/theme updates, broken link fixes, and monthly speed optimization audits.",
    icon: <IoConstructOutline />,
    color: "bg-emerald-500"
  },
  {
    title: "Full Dedicated",
    desc: "Your own development team on retainer. Includes unlimited small content changes and custom feature support.",
    icon: <IoPulseOutline />,
    color: "bg-purple-500"
  }
];

export default function MaintenancePage() {
  return (
    <section className="min-h-screen bg-white overflow-hidden relative font-sans lg:py-24">
      <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-slate-50 rounded-full blur-[100px] pointer-events-none -z-10 -translate-y-1/2 -translate-x-1/2 opacity-60"></div>
      
      <div className="container-custom pt-32 pb-20 relative z-10">
        
        {/* Maintenance Hero Section */}
        <div className="max-w-4xl mx-auto text-center mb-32">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-slate-900 text-white text-xs font-black tracking-widest uppercase mb-8"
          >
            Zero-Downtime Guarantee
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-6xl md:text-8xl lg:text-9xl font-black text-slate-900 leading-[0.85] mb-8 tracking-tighter"
          >
            Site <br className="hidden md:block"/> <span className="text-blue-600">Ops.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-slate-500 text-xl md:text-3xl font-light leading-relaxed max-w-3xl mx-auto"
          >
            Never worry about crashes, hackers, or slow page speeds again. We handle the intense technical operations while you focus purely on your business growth.
          </motion.p>
        </div>

        {/* Maintenance Tiers */}
        <div className="mb-32">
          <h2 className="text-4xl font-black text-slate-900 text-center mb-20 tracking-tighter">Maintenance Tiers</h2>
          <div className="grid lg:grid-cols-3 gap-8">
            {maintenanceTiers.map((tier, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white border border-slate-100 p-10 rounded-[3rem] relative overflow-hidden group hover:shadow-2xl hover:border-blue-100 transition-all"
              >
                <div className={`absolute top-0 right-0 w-32 h-32 ${tier.color} opacity-5 rounded-full blur-[40px] group-hover:opacity-10 transition-opacity`}></div>
                <div className={`text-4xl text-white mb-8 group-hover:scale-110 transition-transform w-16 h-16 rounded-2xl flex items-center justify-center ${tier.color} shadow-xl shadow-blue-500/10`}>
                  {tier.icon}
                </div>
                <h3 className="text-2xl font-black text-slate-900 mb-4">{tier.title}</h3>
                <p className="text-slate-500 font-light leading-relaxed text-lg">{tier.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* System Health Dashboard Visual */}
        <div className="grid lg:grid-cols-2 gap-20 items-center mb-32 bg-slate-900 rounded-[3rem] p-12 lg:p-20 relative overflow-hidden">
           <div className="space-y-10 relative z-10">
              <h2 className="text-4xl lg:text-5xl font-black text-white leading-tight">Live <br/><span className="text-blue-500 underline decoration-4 underline-offset-8">Health Desk.</span></h2>
              <p className="text-slate-400 text-lg md:text-xl font-light leading-relaxed">Gain absolute transparency. Every client receives a dashboard showing real-time uptime, security scans, and engine performance metrics.</p>
              
              <div className="grid grid-cols-2 gap-4">
                 {["99.9% Uptime", "Zero Malware", "Full Backups", "Speed Audit"].map(item => (
                    <div key={item} className="flex gap-2 items-center text-sm font-bold text-white">
                       <IoCheckmarkCircleOutline className="text-blue-500" /> {item}
                    </div>
                 ))}
              </div>
           </div>

           {/* Health Dashboard visual mockup */}
           <motion.div
             initial={{ opacity: 0, x: 20 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             className="bg-slate-800 rounded-[2.5rem] p-10 h-full overflow-hidden shadow-2xl border border-white/5"
           >
              <div className="flex justify-between items-center mb-10 border-b border-white/5 pb-8">
                 <p className="text-white font-black text-xl">Monitor: Core-X1</p>
                 <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></div>
                    <p className="text-emerald-500 text-[10px] font-black uppercase tracking-widest">Running</p>
                 </div>
              </div>
              
              <div className="space-y-8">
                 <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="p-6 bg-slate-900 rounded-3xl border border-white/5">
                       <IoTimerOutline className="text-blue-500 text-3xl mx-auto mb-2" />
                       <p className="text-2xl font-black text-white">99.99%</p>
                       <p className="text-[10px] text-slate-500 font-bold uppercase">Uptime</p>
                    </div>
                    <div className="p-6 bg-slate-900 rounded-3xl border border-white/5">
                       <IoSpeedometerOutline className="text-emerald-500 text-3xl mx-auto mb-2" />
                       <p className="text-2xl font-black text-white">100/100</p>
                       <p className="text-[10px] text-slate-500 font-bold uppercase">Speed Score</p>
                    </div>
                 </div>
                 
                 <div className="p-8 bg-slate-900 rounded-[2rem] border border-white/5">
                    <div className="flex justify-between items-center mb-4">
                       <p className="text-xs font-bold text-slate-400">Malware Scanner</p>
                       <p className="text-xs text-emerald-500 font-bold">Safe</p>
                    </div>
                    <div className="h-2 bg-slate-800 rounded-full w-full overflow-hidden">
                       <motion.div initial={{ width: 0 }} whileInView={{ width: "100%" }} transition={{ duration: 2 }} className="bg-emerald-500 h-full"></motion.div>
                    </div>
                 </div>
              </div>
           </motion.div>
        </div>

        {/* Maintenance Call to Action */}
        <div className="max-w-4xl mx-auto text-center border-t border-slate-100 pt-20">
           <h3 className="text-4xl font-black text-slate-900 mb-10 tracking-tight italic">Your website is your best salesperson. Don't let it call in sick.</h3>
           <button className="px-12 py-5 bg-slate-900 text-white font-extrabold rounded-full hover:bg-blue-600 transition-all shadow-2xl uppercase tracking-widest text-sm">
             Request My Ops Audit
           </button>
        </div>
      </div>
    </section>
  );
}
