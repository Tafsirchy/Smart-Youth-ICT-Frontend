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
  IoCloudUploadOutline
} from "react-icons/io5";

export default function CustomAppsDetailsPage() {
  const lifecyclePhases = [
    { 
      t: "Discovery Sprint", 
      d: "Deep-dive mapping of user stories, business logic, and edge-case protocols.", 
      icon: <IoSettingsOutline />,
      step: "01"
    },
    { 
      t: "Architecture Blueprint", 
      d: "Selection of persistent layers, API schemas, and horizontal scaling strategies.", 
      icon: <IoGitNetworkOutline />,
      step: "02"
    },
    { 
      t: "Agile Development", 
      d: "Bi-weekly sprint releases with continuous feedback and logic hardening.", 
      icon: <IoCodeSlashOutline />,
      step: "03"
    },
    { 
      t: "Security Auditing", 
      d: "Automated pen-testing, JWT validation checks, and data encryption verification.", 
      icon: <IoShieldCheckmarkOutline />,
      step: "04"
    },
    { 
      t: "CI/CD Deployment", 
      d: "Zero-downtime deployment to production using automated pipeline triggers.", 
      icon: <IoCloudUploadOutline />,
      step: "05"
    },
    { 
      t: "Hyper-care Phase", 
      d: "24/7 post-launch monitoring, cache warming, and performance tuning.", 
      icon: <IoTimeOutline />,
      step: "06"
    }
  ];

  const technicalManifest = [
    { label: "Execution Layer", value: "Node.js 20+ / Python FastAPI / Go Fiber" },
    { label: "State Management", value: "Redis Cache / Persistent WebSockets" },
    { label: "Data Architecture", value: "PostgreSQL / Prisma ORM / Row-Level Security" },
    { label: "Infra & DevOps", value: "Docker / AWS Lambda / Vercel Edge" },
    { label: "Auth & Identity", value: "OAuth2 / JWT / Argon2-level Hardening" },
    { label: "API Protocol", value: "RESTful / GraphQL / gRPC options" }
  ];

  return (
    <section className="min-h-screen bg-slate-50 text-slate-900 selection:bg-violet-600 pb-40">
      
      {/* STEALTH HEADER */}
      <div className="border-b border-slate-200 sticky top-0 bg-white/80 backdrop-blur-xl z-50">
         <div className="container-custom py-6 flex justify-between items-center">
            <Link href="/services/custom-apps" className="flex items-center gap-2 text-slate-500 hover:text-violet-600 font-bold transition-all group">
               <IoArrowBackOutline className="group-hover:-translate-x-1 transition-transform" /> <span className="text-sm uppercase tracking-widest">Main Engine</span>
            </Link>
            <div className="flex items-center gap-4 bg-slate-100 px-4 py-2 rounded-lg border border-slate-200">
               <div className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-[pulse_2s_infinite]"></div>
               <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">System Level: Architectural</p>
            </div>
         </div>
      </div>

      <div className="container-custom pt-20 text-slate-900">
        
        {/* ARCHITECTURE HERO */}
        <div className="max-w-5xl mb-40">
           <motion.div 
             initial={{ opacity: 0, x: -20 }}
             animate={{ opacity: 1, x: 0 }}
             className="inline-flex items-center gap-3 px-6 py-2 rounded-lg bg-violet-50 border border-violet-100 text-violet-600 text-[10px] font-black uppercase tracking-[0.4em] mb-12"
           >
              <IoSettingsOutline className="text-sm animate-spin-slow" /> Technical Specification Protocol
           </motion.div>
           
           <motion.h1 
             className="text-5xl md:text-7xl font-black text-slate-900 leading-[1.1] mb-8 tracking-tighter"
             initial={{ opacity: 0, scale: 0.95 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
           >
             Bespoke <br />
             <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-500 to-cyan-500 animate-gradient-x">Architecture</span>
           </motion.h1>

           <p className="text-xl md:text-2xl text-slate-500 font-light leading-relaxed max-w-3xl">
              We eliminate the constraints of standard software. This manifest outlines the industrial-grade protocols used to engineer your custom digital assets.
           </p>
        </div>

        {/* LIFECYCLE PROTOCOL GRID */}
        <div className="mb-48">
           <div className="max-w-xl mb-16">
              <h2 className="text-[10px] font-black text-violet-500 uppercase tracking-[0.4em] mb-4 font-bold">The Protocol</h2>
              <p className="text-4xl font-black text-slate-900 leading-tight">6-Phase Development <span className="text-slate-400">Lifecycle.</span></p>
           </div>
           
           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {lifecyclePhases.map((phase, idx) => (
                <motion.div 
                   key={idx}
                   whileHover={{ y: -10 }}
                   className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all group relative overflow-hidden"
                >
                   <div className="absolute top-0 right-0 p-8 text-4xl font-black text-slate-50 opacity-0 group-hover:opacity-100 transition-opacity">
                      {phase.step}
                   </div>
                   <div className="w-12 h-12 bg-violet-50 rounded-2xl flex items-center justify-center text-xl text-violet-600 mb-8 border border-violet-100">
                      {phase.icon}
                   </div>
                   <h4 className="text-xl font-black text-slate-900 mb-4 uppercase tracking-tighter">{phase.t}</h4>
                   <p className="text-slate-500 font-light text-sm leading-relaxed">{phase.d}</p>
                </motion.div>
              ))}
           </div>
        </div>

        {/* TECHNICAL STACK MANIFEST TABLE */}
        <div className="mb-48">
           <div className="max-w-xl mb-16">
              <h2 className="text-[10px] font-black text-violet-500 uppercase tracking-[0.4em] mb-4 font-bold">Technical Sync</h2>
              <p className="text-4xl font-black text-slate-900 leading-tight">Full-Stack Ecosystem <span className="text-slate-300">Manifest.</span></p>
           </div>
           
           <div className="grid md:grid-cols-2 gap-1 px-8 lg:px-0 bg-white border border-slate-100 rounded-[3rem] overflow-hidden shadow-2xl shadow-slate-200/50">
              {technicalManifest.map((spec, idx) => (
                 <div key={idx} className="p-10 border-b border-r border-slate-100 flex flex-col justify-between hover:bg-slate-50 transition-colors group">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-4">{spec.label}</p>
                    <p className="text-xl font-bold text-slate-900 group-hover:text-violet-600 transition-colors">{spec.value}</p>
                 </div>
              ))}
           </div>
        </div>

        {/* SECURITY CRITICAL VAULT */}
        <div className="bg-white rounded-[5rem] p-12 lg:p-24 border border-slate-100 shadow-2xl shadow-slate-200/50 relative overflow-hidden">
           <div className="absolute top-0 right-0 w-2/3 h-full bg-violet-50 -skew-x-[20deg] origin-top translate-x-1/2 opacity-50"></div>
           
           <div className="relative z-10">
              <div className="flex flex-col lg:flex-row justify-between items-start gap-12 mb-20">
                 <div className="max-w-2xl">
                    <h1 className="text-fluid-h1 font-black tracking-tighter mb-12 leading-none">
                      Lifecycle <br/> <span className="text-slate-400 italic">Architecture.</span>
                    </h1>
                    <p className="text-slate-600 text-xl font-light leading-relaxed max-w-2xl italic">
                      "Software is either architected for sovereignty or bonded to legacy. We treat every line of code as a structural asset."
                    </p>
                 </div>
                 <div className="w-20 h-20 bg-violet-50 rounded-full flex items-center justify-center border border-violet-100">
                    <IoLockClosedOutline className="text-4xl text-violet-600" />
                 </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                 <div className="p-10 bg-slate-50 rounded-[3rem] border border-slate-100 group hover:border-violet-500/30 transition-all">
                    <h4 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-3">
                       <IoShieldCheckmarkOutline className="text-violet-600" /> Zero-Trust Access
                    </h4>
                    <p className="text-slate-500 text-sm leading-relaxed mb-6 font-light">
                       Implementation of tiered authentication scopes, encrypted user sessions, and hardware-level isolation for sensitive operation blocks.
                    </p>
                    <div className="h-[1px] w-full bg-slate-200 mb-6"></div>
                    <p className="text-[10px] font-black text-violet-400 uppercase tracking-widest">Protocol: JWT / OAuth2 / PKCE</p>
                 </div>
                 <div className="p-10 bg-slate-50 rounded-[3rem] border border-slate-100 group hover:border-violet-500/30 transition-all">
                    <h4 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-3">
                       <IoHardwareChipOutline className="text-violet-600" /> Data Sovereignty
                    </h4>
                    <p className="text-slate-500 text-sm leading-relaxed mb-6 font-light">
                       All persistent data is encrypted at rest using AES-256 standard, with automated weekly backups to multi-region cloud vaults.
                    </p>
                    <div className="h-[1px] w-full bg-slate-200 mb-6"></div>
                    <p className="text-[10px] font-black text-violet-400 uppercase tracking-widest">Standard: AES-256 / SSL / TLS 1.3</p>
                 </div>
              </div>
           </div>
        </div>

        {/* CALL TO ACTION */}
        <div className="mt-48 text-center bg-violet-600 rounded-[4rem] py-32 relative overflow-hidden group shadow-2xl shadow-violet-600/30">
           <div className="relative z-10 flex flex-col items-center">
              <IoGitNetworkOutline className="text-8xl text-white opacity-20 mb-12 animate-pulse" />
              <h3 className="text-5xl lg:text-7xl font-black text-white mb-12 leading-tight">Start Your <br/><span className="font-serif italic font-light text-violet-200">Engineering Brief.</span></h3>
              <div className="flex flex-col sm:flex-row gap-6">
                 <button className="px-16 py-6 bg-white text-violet-600 font-black rounded-2xl hover:bg-slate-900 hover:text-white transition-all shadow-2xl uppercase tracking-widest text-xs">
                    Apply for Core Discovery
                 </button>
                 <Link href="/services/custom-apps" className="px-16 py-6 bg-violet-700 text-white font-black rounded-2xl hover:bg-violet-800 transition-all shadow-2xl uppercase tracking-widest text-xs flex items-center justify-center">
                    Return to Engine
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
