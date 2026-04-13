"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { 
  IoArrowBackOutline, 
  IoShieldCheckmarkOutline, 
  IoHardwareChipOutline,
  IoSettingsOutline,
  IoLockClosedOutline,
  IoCheckmarkCircleSharp,
  IoGitNetworkOutline,
  IoTimeOutline,
  IoCodeSlashOutline,
  IoCloudUploadOutline,
  IoReaderOutline,
  IoSyncOutline,
  IoTerminalOutline
} from "react-icons/io5";

export default function ErpCrmDetailsPage() {
  const roadmapPhases = [
    { 
      t: "Gap Analysis & Audit", 
      d: "Deep audit of current spreadsheets and legacy silos to map required logic bridges.", 
      icon: <IoReaderOutline />,
      step: "01"
    },
    { 
      t: "Process Mapping (BPM)", 
      d: "Architecting the bespoke workflows for HRM, CRM, and POS to ensure zero operational friction.", 
      icon: <IoSettingsOutline />,
      step: "02"
    },
    { 
      t: "Engine Construction", 
      d: "Development of the core logic with ACID-compliant persistence and real-time event bridges.", 
      icon: <IoCodeSlashOutline />,
      step: "03"
    },
    { 
      t: "Hardware Hardening", 
      d: "Testing POS printers, scanners, and inventory handhelds against the core API protocols.", 
      icon: <IoHardwareChipOutline />,
      step: "04"
    },
    { 
      t: "Data Migration Sprint", 
      d: "Automated sanitization and migration of legacy organizational data into the new ecosystem.", 
      icon: <IoSyncOutline />,
      step: "05"
    },
    { 
      t: "Global Deployment", 
      d: "Live system switch, staff training sessions, and 24/7 post-launch monitoring suite.", 
      icon: <IoCloudUploadOutline />,
      step: "06"
    }
  ];

  const technicalManifest = [
    { label: "Execution Logic", value: "Next.js 14 / Node.js 20 (LTS)" },
    { label: "Data Integrity", value: "PostgreSQL with ACID Compliance" },
    { label: "Hardware Protocol", value: "ESC/POS / ZPL II / HID Scanners" },
    { label: "Communication Tier", value: "Twilio SMS / SendGrid / Custom Hooks" },
    { label: "Identity Layer", value: "Role-Based Access Control (RBAC) + JWT" },
    { label: "Archival Logic", value: "Daily Encrypted S3 Backups" }
  ];

  return (
    <section className="min-h-screen bg-slate-50 text-slate-900 selection:bg-teal-600 pb-40">
      
      {/* STEALTH HEADER */}
      <div className="border-b border-slate-200 sticky top-0 bg-white/80 backdrop-blur-xl z-50">
         <div className="container-custom py-6 flex justify-between items-center px-4 md:px-0">
            <Link href="/services/erp-crm" className="flex items-center gap-2 text-slate-500 hover:text-teal-600 font-bold transition-all group">
               <IoArrowBackOutline className="group-hover:-translate-x-1 transition-transform" /> <span className="text-sm uppercase tracking-widest">Main Ecosystem</span>
            </Link>
            <div className="flex items-center gap-4 bg-slate-100 px-4 py-2 rounded-lg border border-slate-200">
               <div className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-[pulse_2s_infinite]"></div>
               <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">System Level: Enterprise Core</p>
            </div>
         </div>
      </div>

      <div className="container-custom pt-20 text-slate-900">
        
        {/* ARCHITECTURE HERO */}
        <div className="max-w-5xl mb-40 px-4 md:px-0">
           <motion.div 
             initial={{ opacity: 0, x: -20 }}
             animate={{ opacity: 1, x: 0 }}
             className="inline-flex items-center gap-3 px-6 py-2 rounded-lg bg-teal-50 border border-teal-100 text-teal-600 text-[10px] font-black uppercase tracking-[0.4em] mb-12"
           >
              <IoTerminalOutline className="text-sm" /> Operation Technical Protocol
           </motion.div>
           
           <motion.h1 
             className="text-5xl md:text-7xl font-black text-slate-900 leading-[1.1] mb-8 tracking-tighter"
             initial={{ opacity: 0, scale: 0.95 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
           >
             Industrial <br />
             <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-500 to-cyan-500 animate-gradient-x">Ecosystem</span>
           </motion.h1>

           <p className="text-xl md:text-2xl text-slate-500 font-light leading-relaxed max-w-3xl">
              We eliminate the fragmentation of standard SaaS. This manifest outlines the industrial-grade roadmap and hardware protocols used to engineer your unified operation core.
           </p>
        </div>

        {/* ROADMAP PROTOCOL GRID */}
        <div className="mb-48 px-4 md:px-0">
           <div className="max-w-xl mb-16">
              <h2 className="text-[10px] font-black text-teal-600 uppercase tracking-[0.4em] mb-4 font-bold">The Roadmap</h2>
              <p className="text-4xl font-black text-slate-900 leading-tight">6-Phase Implementation <span className="text-slate-400">Protocol.</span></p>
           </div>
           
           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {roadmapPhases.map((phase, idx) => (
                <motion.div 
                   key={idx}
                   whileHover={{ y: -10 }}
                   className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all group relative overflow-hidden"
                >
                   <div className="absolute top-0 right-0 p-8 text-4xl font-black text-slate-50 opacity-0 group-hover:opacity-100 transition-opacity">
                      {phase.step}
                   </div>
                   <div className="w-12 h-12 bg-teal-50 rounded-2xl flex items-center justify-center text-xl text-teal-600 mb-8 border border-teal-100">
                      {phase.icon}
                   </div>
                   <h4 className="text-xl font-black text-slate-900 mb-2 uppercase tracking-tighter">{phase.t}</h4>
                   <p className="text-slate-500 font-light text-sm leading-relaxed">{phase.d}</p>
                </motion.div>
              ))}
           </div>
        </div>

        {/* TECHNICAL STACK MANIFEST TABLE */}
        <div className="mb-48 px-4 md:px-0">
           <div className="max-w-xl mb-16">
              <h2 className="text-[10px] font-black text-teal-600 uppercase tracking-[0.4em] mb-4 font-bold">Enterprise Sync</h2>
              <p className="text-4xl font-black text-slate-900 leading-tight">Full-Stack Ecosystem <span className="text-slate-300">Database.</span></p>
           </div>
           
           <div className="grid md:grid-cols-2 gap-1 px-8 lg:px-0 bg-white border border-slate-100 rounded-[3rem] overflow-hidden shadow-2xl shadow-slate-200/50">
              {technicalManifest.map((spec, idx) => (
                 <div key={idx} className="p-10 border-b border-r border-slate-100 flex flex-col justify-between hover:bg-slate-50 transition-colors group">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-4">{spec.label}</p>
                    <p className="text-xl font-bold text-slate-900 group-hover:text-teal-600 transition-colors">{spec.value}</p>
                 </div>
              ))}
           </div>
        </div>

        {/* HARDWARE & SECURITY VAULT */}
        <div className="bg-white rounded-[5rem] p-12 lg:p-24 border border-slate-100 shadow-2xl shadow-slate-200/50 relative overflow-hidden px-4 md:px-24">
           <div className="absolute top-0 right-0 w-2/3 h-full bg-teal-50 -skew-x-[20deg] origin-top translate-x-1/2 opacity-50"></div>
           
           <div className="relative z-10">
              <div className="flex flex-col lg:flex-row justify-between items-start gap-12 mb-20">
                 <div className="max-w-2xl">
                    <h1 className="text-fluid-h1 font-black tracking-tighter mb-12 leading-none">
                      Operational <br/> <span className="text-slate-400 italic">Manifest.</span>
                    </h1>
                    <p className="text-slate-600 text-xl font-light leading-relaxed max-w-2xl italic">
                      "Software is either an asset or a liability. We treat ERP and CRM implementation as a structural hardening of your organization's logic."
                    </p>
                 </div>
                 <div className="w-20 h-20 bg-teal-50 rounded-full flex items-center justify-center border border-teal-100">
                    <IoHardwareChipOutline className="text-4xl text-teal-600" />
                 </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                 <div className="p-10 bg-slate-50 rounded-[3rem] border border-slate-100 group hover:border-teal-500/30 transition-all">
                    <h4 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-3 tracking-tighter uppercase">
                       <IoGitNetworkOutline className="text-teal-600" /> POS Bridging
                    </h4>
                    <p className="text-slate-500 text-sm leading-relaxed mb-6 font-light">
                       Direct communication with ESC/POS receipt printers, Honeywell scanners, and multi-region inventory hubs via atomic hardware drivers.
                    </p>
                    <div className="h-[1px] w-full bg-slate-200 mb-6"></div>
                    <p className="text-[10px] font-black text-teal-400 uppercase tracking-widest">Support: EPSON / SUNMI / ZEBRA</p>
                 </div>
                 <div className="p-10 bg-slate-50 rounded-[3rem] border border-slate-100 group hover:border-teal-500/30 transition-all">
                    <h4 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-3 tracking-tighter uppercase">
                       <IoLockClosedOutline className="text-teal-600" /> Audit Transparency
                    </h4>
                    <p className="text-slate-500 text-sm leading-relaxed mb-6 font-light">
                       Every transaction, inventory shift, and payroll adjustment is logged with immutable audit trails to ensure absolute fiscal accountability.
                    </p>
                    <div className="h-[1px] w-full bg-slate-200 mb-6"></div>
                    <p className="text-[10px] font-black text-teal-400 uppercase tracking-widest">Protocol: RBAC / LOGGING / ACID</p>
                 </div>
              </div>
           </div>
        </div>

        {/* CALL TO ACTION */}
        <div className="mt-48 text-center bg-teal-600 rounded-[4rem] py-32 relative overflow-hidden group shadow-2xl shadow-teal-600/30 mx-4 md:mx-0">
           <div className="relative z-10 flex flex-col items-center">
              <IoGitNetworkOutline className="text-8xl text-white opacity-20 mb-12 animate-pulse" />
              <h3 className="text-5xl lg:text-7xl font-black text-white mb-12 leading-tight">Authorize Your <br/><span className="font-serif italic font-light text-teal-200">Operation Brief.</span></h3>
              <div className="flex flex-col sm:flex-row gap-6">
                 <button className="w-full sm:w-[280px] px-16 py-6 bg-white text-teal-600 font-black rounded-2xl hover:bg-slate-900 hover:text-white transition-all shadow-2xl uppercase tracking-widest text-[10px] flex items-center justify-center">
                    Apply for Business Blueprint
                 </button>
                 <Link href="/services/erp-crm" className="w-full sm:w-[280px] px-16 py-6 bg-teal-700 text-white font-black rounded-2xl hover:bg-teal-800 transition-all shadow-2xl uppercase tracking-widest text-[10px] flex items-center justify-center text-center">
                    Return to Ecosystem
                 </Link>
              </div>
           </div>
           
           {/* Background Overlay */}
           <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-20 transition-opacity pointer-events-none"></div>
        </div>

      </div>
    </section>
  );
}
