"use client";

import { motion } from "framer-motion";
import { 
  IoFlashOutline, 
  IoSyncOutline, 
  IoCalculatorOutline, 
  IoShareSocialOutline, 
  IoLayersOutline, 
  IoCloudDoneOutline, 
  IoCheckmarkCircleOutline 
} from "react-icons/io5";

const automationTiers = [
  {
    title: "Data Sync Engine",
    desc: "Keep your CRM, Google Sheets, and Database in perfect harmony. No more manual entry or data fragmentation.",
    icon: <IoSyncOutline />,
    color: "from-blue-600 to-indigo-500"
  },
  {
    title: "Auto-Invoicing",
    desc: "Generate invoices, track payments, and send automated reminders to clients the moment a milestone is hit.",
    icon: <IoCalculatorOutline />,
    color: "from-emerald-600 to-teal-400"
  },
  {
    title: "Social Scheduler",
    desc: "Automated content distribution across all platforms. Post once, distribute everywhere on an optimized timeline.",
    icon: <IoShareSocialOutline />,
    color: "from-pink-500 to-rose-400"
  }
];

export default function BusinessAutomationPage() {
  return (
    <section className="min-h-screen bg-slate-950 overflow-hidden relative font-sans lg:py-24">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/40 via-slate-950 to-slate-950 pointer-events-none -z-10"></div>
      
      <div className="container-custom pt-32 pb-20 relative z-10">
        
        {/* Automation Hero Section */}
        <div className="max-w-4xl mx-auto text-center mb-32">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-indigo-500/10 text-indigo-400 text-xs font-black tracking-widest uppercase mb-8 border border-indigo-500/20"
          >
            Efficiency Unlocked
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-6xl md:text-8xl lg:text-9xl font-black text-white leading-[0.85] mb-8 tracking-tighter"
          >
            Business <br className="hidden md:block"/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500">Autopilot.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 text-xl md:text-3xl font-light leading-relaxed max-w-3xl mx-auto"
          >
            Stop wasting time on repetitive tasks. We build massive Zapier, Make.com, and custom API workflows so your business runs flawlessly while you focus on growth.
          </motion.p>
        </div>

        {/* Workflow Grid */}
        <div className="mb-32">
          <h2 className="text-4xl font-black text-white text-center mb-20 tracking-tighter">Workflow Tiers</h2>
          <div className="grid lg:grid-cols-3 gap-8">
            {automationTiers.map((tier, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white/5 border border-white/10 p-10 rounded-[2.5rem] relative overflow-hidden group hover:bg-white/10 transition-all"
              >
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${tier.color} opacity-10 rounded-full blur-[60px] group-hover:opacity-30 transition-opacity`}></div>
                <div className="text-4xl text-white mb-8 group-hover:scale-110 transition-transform w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10">
                  {tier.icon}
                </div>
                <h3 className="text-2xl font-black text-white mb-4">{tier.title}</h3>
                <p className="text-slate-400 font-light leading-relaxed text-lg">{tier.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Higher-Fidelity Visual Logic Builder Mockup */}
        <div className="grid lg:grid-cols-2 gap-20 items-center mb-32 bg-slate-900/50 rounded-[3rem] p-12 lg:p-20 border border-white/5 relative overflow-hidden">
           <div className="space-y-10">
              <h2 className="text-4xl lg:text-5xl font-black text-white leading-tight">Visual <br/><span className="text-indigo-400 underline decoration-4 underline-offset-8">Logic Building.</span></h2>
              <p className="text-slate-400 text-lg md:text-xl font-light leading-relaxed">We connect your software ecosystem through complex nodes. Every time an action happens in one app, your entire business reacts instantly.</p>
              
              <div className="grid grid-cols-2 gap-4">
                 {["Zapier Master", "Make.com Expert", "Custom Webhooks", "Zero-Latency Sync"].map(item => (
                    <div key={item} className="flex gap-2 items-center text-sm font-bold text-white">
                       <IoCheckmarkCircleOutline className="text-indigo-400" /> {item}
                    </div>
                 ))}
              </div>
           </div>

           {/* Workflow Logic visual mockup - nodes and lines */}
           <div className="relative h-full min-h-[400px]">
              <div className="absolute inset-0 flex flex-col justify-between items-center py-10">
                 {/* Top node */}
                 <motion.div initial={{ opacity: 0, y: -20 }} whileInView={{ opacity: 1, y: 0 }} className="p-6 bg-blue-600 rounded-2xl shadow-2xl relative z-20 font-black text-white">SHOPIFY ORDER</motion.div>
                 
                 {/* Middle nodes */}
                 <div className="w-full flex justify-around items-center px-4">
                    <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="p-4 bg-slate-800 rounded-xl relative z-20 text-blue-400 text-xs font-bold border border-blue-900">GENERATE INVOICE</motion.div>
                    <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="p-4 bg-slate-800 rounded-xl relative z-20 text-emerald-400 text-xs font-bold border border-emerald-900">SYNC STOCK</motion.div>
                 </div>

                 {/* Bottom node */}
                 <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="p-6 bg-purple-600 rounded-2xl shadow-2xl relative z-20 font-black text-white flex gap-2 items-center"><IoCloudDoneOutline /> G-SHEETS UPDATE</motion.div>
                 
                 {/* Logic lines using SVG */}
                 <svg className="absolute inset-0 w-full h-full -z-10" overflow="visible">
                    <motion.line initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} x1="50%" y1="20%" x2="25%" y2="50%" stroke="rgba(59,130,246,0.3)" strokeWidth="2" />
                    <motion.line initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} x1="50%" y1="20%" x2="75%" y2="50%" stroke="rgba(59,130,246,0.3)" strokeWidth="2" />
                    <motion.line initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} x1="25%" y1="50%" x2="50%" y2="80%" stroke="rgba(16,185,129,0.3)" strokeWidth="2" />
                    <motion.line initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} x1="75%" y1="50%" x2="50%" y2="80%" stroke="rgba(16,185,129,0.3)" strokeWidth="2" />
                 </svg>
              </div>
           </div>
        </div>

        {/* Automation Call to Action */}
        <div className="max-w-4xl mx-auto text-center border-t border-white/10 pt-20">
           <h3 className="text-4xl font-black text-white mb-10 tracking-tight">Focus on your strategy. Let us automate the grind.</h3>
           <button className="px-12 py-5 bg-white text-slate-900 font-extrabold rounded-full hover:scale-105 transition-transform shadow-2xl uppercase tracking-widest text-sm">
             Request My Automation Design
           </button>
        </div>
      </div>
    </section>
  );
}
