"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { 
  IoArrowBackOutline, 
  IoShieldCheckmarkOutline, 
  IoStatsChartOutline, 
  IoHardwareChipOutline,
  IoSettingsOutline,
  IoLockClosedOutline,
  IoCheckmarkCircleSharp,
  IoGitNetworkOutline
} from "react-icons/io5";

export default function BusinessDetailsPage() {
  const corporateChecklist = [
    { t: "Brand Identity Asset Bundle", d: "High-resolution logos, brand color codes (HEX/RGB), and corporate fonts." },
    { t: "Service Hierarchy Document", d: "Complete breakdown of services, pricing tiers, and organizational structure." },
    { t: "Leadership Artifacts", d: "Professional bios and portraits of the executive board members." },
    { t: "Operational KPIs", d: "Clear definition of what leads or conversions matter most to your bottom line." },
    { t: "Legal Documentation", d: "Privacy policies, Terms of Service, and industry-specific compliance data." }
  ];

  const engineSpecs = [
    { label: "Core Architecture", value: "Next.js 14 + TypeScript" },
    { label: "Data Management", value: "Server-Side Rendering (SSR)" },
    { label: "Global Delivery", value: "Vercel Edge Network" },
    { label: "SEO Protocol", value: "Schema.org + JSON-LD" },
    { label: "Security Layer", value: "SSL + DDoS Mitigation" },
    { label: "Analytics Stack", value: "GTM + Custom ROI Tracking" }
  ];

  return (
    <section className="min-h-screen bg-slate-50 text-slate-900 selection:bg-blue-600 pb-40">
      
      {/* STEALTH HEADER */}
      <div className="border-b border-slate-200 sticky top-0 bg-white/80 backdrop-blur-xl z-50">
         <div className="container-custom py-6 flex justify-between items-center">
            <Link href="/services/business-websites" className="flex items-center gap-2 text-slate-500 hover:text-blue-600 font-bold transition-all group">
               <IoArrowBackOutline className="group-hover:-translate-x-1 transition-transform" /> <span className="text-sm uppercase tracking-widest">Main Engine</span>
            </Link>
            <div className="flex items-center gap-4 bg-slate-100 px-4 py-2 rounded-lg border border-slate-200">
               <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-[pulse_2s_infinite]"></div>
               <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Security Layer: Enterprise</p>
            </div>
         </div>
      </div>

      <div className="container-custom pt-24 text-slate-900">
        
        {/* ARCHITECTURE HERO */}
        <div className="max-w-5xl mb-40">
           <motion.div 
             initial={{ opacity: 0, x: -20 }}
             animate={{ opacity: 1, x: 0 }}
             className="inline-flex items-center gap-3 px-6 py-2 rounded-lg bg-blue-50 border border-blue-100 text-blue-600 text-[10px] font-black uppercase tracking-[0.4em] mb-12"
           >
              <IoSettingsOutline className="text-sm animate-spin-slow" /> Technical Specification Protocol
           </motion.div>
           
           <motion.h1 
             className="text-6xl md:text-8xl lg:text-[10rem] font-black leading-[0.8] mb-12 tracking-tighter"
             initial={{ opacity: 0, scale: 0.95 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
           >
             Operational <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-cyan-500 to-indigo-600 font-serif italic font-light">Architecture.</span>
           </motion.h1>

           <p className="text-xl md:text-2xl text-slate-500 font-light leading-relaxed max-w-3xl">
             We deliver industrial-grade web infrastructure designed to scale with your organization. Here is the technical manifest of our business engines.
           </p>
        </div>

        {/* REVENUE ENGINE GRID */}
        <div className="grid lg:grid-cols-2 gap-12 mb-48">
           <div className="bg-white rounded-[4rem] p-12 lg:p-20 border border-slate-100 shadow-xl shadow-slate-200/50 relative overflow-hidden group">
              <IoStatsChartOutline className="text-5xl text-blue-500 mb-8" />
              <h3 className="text-3xl font-black text-slate-900 mb-6">ROI Convergence</h3>
              <p className="text-slate-500 font-light leading-relaxed text-lg mb-10">
                 Our engines are built with a single KPI in mind: **Conversion**. By isolating common friction points in standard builders, we reduce bounce rates by up to **64%** from the first month.
              </p>
              <div className="h-[1px] w-full bg-slate-100 mb-10"></div>
              <ul className="space-y-4">
                 {["Behavioral Heatmapping", "Zero-Friction Forms", "Fast-Action CTAs"].map(item => (
                    <li key={item} className="flex gap-3 items-center text-sm font-bold text-slate-400">
                       <IoCheckmarkCircleSharp className="text-blue-500 text-lg" /> {item}
                    </li>
                 ))}
              </ul>
           </div>

           <div className="bg-white rounded-[4rem] p-12 lg:p-20 border border-slate-100 shadow-xl shadow-slate-200/50 relative overflow-hidden group">
              <IoHardwareChipOutline className="text-5xl text-cyan-500 mb-8" />
              <h3 className="text-3xl font-black text-slate-900 mb-6">Technical Integrity</h3>
              <p className="text-slate-500 font-light leading-relaxed text-lg mb-10">
                 Native SSR (Server-Side Rendering) ensures that Google sees every byte of your content instantly, granting you an immediate technical SEO advantage over client-side competitors.
              </p>
              <div className="h-[1px] w-full bg-slate-100 mb-10"></div>
              <ul className="space-y-4">
                 {["Type-Safe Production", "Edge CDN Caching", "Atomic Code Standards"].map(item => (
                    <li key={item} className="flex gap-3 items-center text-sm font-bold text-slate-400">
                       <IoCheckmarkCircleSharp className="text-cyan-500 text-lg" /> {item}
                    </li>
                 ))}
              </ul>
           </div>
        </div>

        {/* THE ENGINE MANIFEST (Table) */}
        <div className="mb-48">
           <div className="max-w-xl mb-16">
              <h2 className="text-[10px] font-black text-blue-500 uppercase tracking-[0.4em] mb-4">The Manifest</h2>
              <p className="text-4xl font-black text-slate-900 leading-tight">Engine Specification <span className="text-slate-300">Database.</span></p>
           </div>
           
           <div className="grid md:grid-cols-2 gap-1 px-8 lg:px-0 bg-white border border-slate-100 rounded-[3rem] overflow-hidden shadow-2xl shadow-slate-200/50">
              {engineSpecs.map((spec, idx) => (
                 <div key={idx} className="p-10 border-b border-r border-slate-100 flex flex-col justify-between hover:bg-slate-50 transition-colors group">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-4">{spec.label}</p>
                    <p className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{spec.value}</p>
                 </div>
              ))}
           </div>
        </div>

        {/* CORPORATE PREPARATION VAULT */}
        <div className="bg-white rounded-[5rem] p-12 lg:p-24 border border-slate-100 shadow-2xl shadow-slate-200/50 relative overflow-hidden">
           <div className="absolute top-0 right-0 w-2/3 h-full bg-blue-50 -skew-x-[20deg] origin-top translate-x-1/2 opacity-50"></div>
           
           <div className="relative z-10">
              <div className="flex flex-col lg:flex-row justify-between items-start gap-12 mb-20">
                 <div className="max-w-2xl">
                    <h2 className="text-5xl lg:text-7xl font-black text-slate-900 leading-tight mb-8">Corporate <br/> <span className="font-serif italic font-light text-blue-600">Readiness.</span></h2>
                    <p className="text-slate-500 text-xl font-light leading-relaxed">To ensure high-fidelity delivery, our architects require the following data artifacts before the discovery sprint begins.</p>
                 </div>
                 <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center border border-blue-100">
                    <IoLockClosedOutline className="text-4xl text-blue-500" />
                 </div>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                 {corporateChecklist.map((item, idx) => (
                    <div key={idx} className="bg-slate-50 p-10 rounded-[2.5rem] border border-slate-100 hover:border-blue-500/30 transition-all group">
                       <h4 className="font-bold text-slate-900 mb-4 group-hover:text-blue-500 transition-colors">{item.t}</h4>
                       <p className="text-sm text-slate-500 font-light leading-relaxed">{item.d}</p>
                    </div>
                 ))}
              </div>
           </div>
        </div>

        {/* CALL TO ORDER */}
        <div className="mt-48 text-center bg-blue-600 rounded-[4rem] py-32 relative overflow-hidden group shadow-2xl shadow-blue-500/30">
           <div className="relative z-10 flex flex-col items-center">
              <IoGitNetworkOutline className="text-8xl text-white opacity-20 mb-12 animate-pulse" />
              <h3 className="text-5xl lg:text-7xl font-black text-white mb-12 leading-tight">Initialize Your <br/><span className="font-serif italic font-light text-blue-200">Corporate Presence.</span></h3>
              <div className="flex flex-col sm:flex-row gap-6">
                 <button className="px-16 py-6 bg-white text-blue-600 font-black rounded-2xl hover:bg-slate-900 hover:text-white transition-all shadow-2xl uppercase tracking-widest text-xs">
                    Apply for Business Blueprint
                 </button>
                 <Link href="/services/business-websites" className="px-16 py-6 bg-blue-700 text-white font-black rounded-2xl hover:bg-blue-800 transition-all shadow-2xl uppercase tracking-widest text-xs flex items-center justify-center">
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
