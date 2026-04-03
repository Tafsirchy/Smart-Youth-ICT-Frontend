"use client";

import { motion } from "framer-motion";
import { 
  IoStatsChartOutline, 
  IoPeopleOutline, 
  IoCalculatorOutline, 
  IoLayersOutline, 
  IoShieldCheckmarkOutline, 
  IoPodiumOutline, 
  IoAnalyticsOutline,
  IoSettingsOutline,
  IoFingerPrintOutline
} from "react-icons/io5";

const erpModules = [
  {
    title: "HRM & Payroll",
    desc: "Automated attendance, leave management, and complex payroll processing with tax and deduction logic.",
    icon: <IoPeopleOutline />,
    color: "bg-purple-600"
  },
  {
    title: "Inventory & SC",
    desc: "Real-time stock tracking, automated re-order points, and supply chain visibility across multi-warehouse setups.",
    icon: <IoLayersOutline />,
    color: "bg-emerald-600"
  },
  {
    title: "Account & Ledger",
    desc: "Double-entry bookkeeping, automated tax reporting, and massive financial visibility with drill-down analytics.",
    icon: <IoCalculatorOutline />,
    color: "bg-blue-600"
  }
];

const enterpriseFeatures = [
  { t: "Role-Based Access Control (RBAC)", d: "Granular permission mapping for admins, managers, and staff members across every module." },
  { t: "Automated Reporting Desk", d: "Schedule daily, weekly, or monthly PDF reports sent directly to stakeholder emails." },
  { t: "Database Synchronization", d: "High-integrity ACID-compliant transactions ensuring your data is never inconsistent." }
];

export default function ErpCrmPage() {
  return (
    <section className="min-h-screen bg-white overflow-hidden relative">
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-slate-50 rounded-full blur-[100px] pointer-events-none -z-10 -translate-y-1/2 translate-x-1/2 opacity-60"></div>
      
      {/* Hero Section */}
      <div className="container-custom pt-32 pb-20 relative z-10 text-center max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-purple-100 text-purple-700 text-xs font-black tracking-widest uppercase mb-8"
        >
          Operational Excellence
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-5xl md:text-7xl lg:text-9xl font-black text-slate-900 leading-[0.9] mb-8 tracking-tighter"
        >
          ERP, CRM & <br/> <span className="text-purple-600">POS Core.</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-slate-500 text-xl md:text-3xl font-light leading-relaxed mb-12 max-w-4xl mx-auto"
        >
          Modernize your internal workflows. We construct bespoke management portals entirely tailored to eliminate bottlenecks and optimize operational scale efficiently.
        </motion.p>
      </div>

      {/* Module Grid */}
      <div className="container-custom mb-32">
        <h2 className="text-4xl font-black text-slate-900 text-center mb-24 tracking-tight">Enterprise Model Classifications</h2>
        <div className="grid lg:grid-cols-3 gap-8">
           {erpModules.map((item, i) => (
             <motion.div
               key={i}
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: i * 0.1 }}
               className="bg-white rounded-[3rem] p-10 shadow-2xl border border-slate-100/50 hover:-translate-y-2 transition-transform group"
             >
               <div className={`w-16 h-16 rounded-2xl ${item.color} text-white flex items-center justify-center text-3xl mb-8 shadow-2xl group-hover:scale-110 transition-transform`}>
                 {item.icon}
               </div>
               <h3 className="text-2xl font-black text-slate-900 mb-4">{item.title}</h3>
               <p className="text-slate-500 leading-relaxed font-light text-lg">{item.desc}</p>
             </motion.div>
           ))}
        </div>
      </div>

      {/* Deep Dive Section */}
      <div className="container-custom py-24 bg-slate-50 rounded-[4rem] border border-slate-200 shadow-2xl mb-32 relative overflow-hidden">
         <div className="absolute top-0 right-0 w-1/4 h-full bg-white/50 -translate-x-1/2 -skew-x-12"></div>
         
         <div className="flex flex-col lg:flex-row gap-20 relative z-10 px-8 lg:px-20 items-center">
            <div className="flex-1 space-y-10">
               <h2 className="text-5xl font-black text-slate-900 leading-tight">Master Your <br/><span className="text-purple-600">Organization.</span></h2>
               <div className="space-y-8">
                  {enterpriseFeatures.map((f, idx) => (
                    <div key={idx} className="flex gap-6 items-start group">
                       <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center font-black text-xl shrink-0 group-hover:rotate-12 transition-transform"><IoSettingsOutline /></div>
                       <div>
                          <h4 className="text-xl font-bold text-slate-900 mb-2">{f.t}</h4>
                          <p className="text-slate-500 font-light leading-relaxed">{f.d}</p>
                       </div>
                    </div>
                  ))}
               </div>
            </div>

            {/* Analytics Dashboard Visual */}
            <div className="flex-1">
               <motion.div
                 initial={{ opacity: 0, scale: 0.9 }}
                 whileInView={{ opacity: 1, scale: 1 }}
                 viewport={{ once: true }}
                 className="bg-white rounded-[3rem] p-10 lg:p-14 shadow-[0_50px_100px_rgba(0,0,0,0.08)] border border-slate-200 h-full overflow-hidden"
               >
                  <div className="flex justify-between items-center mb-10 border-b border-slate-100 pb-8">
                     <p className="text-slate-900 text-xl font-black tracking-tighter">System Analytics</p>
                     <IoAnalyticsOutline className="text-purple-600 text-2xl" />
                  </div>
                  
                  <div className="space-y-8">
                     <div className="grid grid-cols-2 gap-4">
                        <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                           <p className="text-[10px] text-slate-400 font-black uppercase mb-1">Stock Turn Rate</p>
                           <p className="text-3xl font-black text-slate-900">42%</p>
                        </div>
                        <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 text-white">
                           <p className="text-[10px] text-slate-400 font-black uppercase mb-1">New Leads</p>
                           <p className="text-3xl font-black text-purple-400">142</p>
                        </div>
                     </div>
                     
                     <div className="p-8 bg-purple-50 rounded-[2rem] border border-purple-100 flex items-center justify-between">
                        <div className="space-y-1">
                           <p className="text-[10px] text-purple-400 font-black uppercase">System Auth</p>
                           <p className="text-xl font-bold text-slate-900 flex items-center gap-2">Vetted <IoFingerPrintOutline className="text-purple-600" /></p>
                        </div>
                        <div className="w-24 h-12 bg-white rounded-lg flex items-center justify-center p-2 font-mono text-[10px] text-slate-400">#6821-XPR</div>
                     </div>
                  </div>
               </motion.div>
            </div>
         </div>
      </div>

      {/* Enterprise CTA */}
      <div className="container-custom pb-24 text-center">
         <motion.div 
           initial={{ opacity: 0, scale: 0.95 }}
           whileInView={{ opacity: 1, scale: 1 }}
           className="bg-slate-900 rounded-[3rem] p-12 lg:p-20 text-center relative overflow-hidden"
         >
            <div className="absolute top-0 right-0 w-[500px] h-full bg-purple-500/20 blur-[100px] pointer-events-none -z-10 translate-x-1/2 opacity-40"></div>
            <h3 className="text-4xl font-extrabold text-white mb-6 relative z-10">Ditch the spreadsheets.</h3>
            <p className="text-slate-400 mb-10 max-w-2xl mx-auto relative z-10 text-lg">Stop paying monthly subscriptions for fragmented software. Build <b>one unified system</b> for your organization that scales as you grow.</p>
            <button className="relative z-10 px-12 py-5 bg-white text-slate-900 font-black rounded-full hover:bg-purple-500 hover:text-white transition-colors shadow-2xl uppercase tracking-widest text-sm">
               Schedule Architecture Call
            </button>
         </motion.div>
      </div>
    </section>
  );
}
