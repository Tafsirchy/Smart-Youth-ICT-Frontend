"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { 
  IoArrowBackOutline, 
  IoShieldCheckmarkOutline, 
  IoConstructOutline, 
  IoPulseOutline,
  IoSyncOutline,
  IoTerminalOutline,
  IoSpeedometerOutline,
  IoCheckmarkCircleOutline,
  IoSearchOutline,
  IoReloadOutline,
  IoBuildOutline
} from "react-icons/io5";

export default function MaintenanceDetailsClient({ data }) {
  if (!data) return null;

  return (
    <section className="min-h-screen bg-slate-50 text-slate-900 selection:bg-teal-600 selection:text-white pb-40">
      {/* PERSISTENT BREADCRUMB */}
      <div className="border-b border-slate-200 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container-custom py-4 flex items-center justify-between">
          <Link href="/services/maintenance" className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-teal-600 transition-colors">
            <IoArrowBackOutline className="text-sm" /> Infrastructure Overview
          </Link>
          <div className="text-[10px] font-black uppercase tracking-[0.4em] text-teal-600">{data.hero.subtitle}</div>
        </div>
      </div>

      <div className="container-custom pt-20">
        {/* TECH HEADER */}
        <div className="max-w-5xl mb-32 px-4 md:px-0">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-4 text-teal-600 mb-8"
          >
            <div className="w-12 h-[1px] bg-teal-600"></div>
            <span className="text-[10px] font-black uppercase tracking-[0.4em]">{data.hero.badge}</span>
          </motion.div>
          <h1 className="text-5xl md:text-7xl font-black text-slate-900 leading-[1.1] mb-8 tracking-tighter">
            {data.hero.title?.split(' ')[0]} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-violet-500 to-emerald-500 animate-gradient-x">{data.hero.title?.split(' ').slice(1).join(' ')}</span>
          </h1>
          <p className="text-slate-600 text-xl font-light leading-relaxed max-w-2xl italic">
            "{data.hero.desc}"
          </p>
        </div>

        {/* 6-PHASE OPS GRID */}
        <div className="mb-48 px-4 md:px-0">
          <div className="flex items-center gap-8 mb-20">
             <h2 className="text-3xl font-black text-slate-900 tracking-tighter uppercase leading-none">The Maintenance Protocol</h2>
             <div className="h-[1px] flex-1 bg-slate-200"></div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-slate-200 border border-slate-200 rounded-[3rem] overflow-hidden shadow-2xl">
            {(data.sections.phases || []).map((item, i) => (
              <div key={i} className="bg-white p-12 hover:bg-slate-50 transition-colors group">
                 <div className="text-teal-600 font-mono text-xs mb-8 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-teal-600"></span> 
                    {item.step} // HEALTH_SYNC_NODE
                 </div>
                 <h3 className="text-xl font-black text-slate-900 mb-4 tracking-tight group-hover:text-teal-600 transition-colors uppercase">{item.stage}</h3>
                 <p className="text-slate-500 text-sm font-light leading-relaxed">{item.action}</p>
              </div>
            ))}
          </div>
        </div>

        {/* SECURITY AUDIT SECTION */}
        <div className="grid lg:grid-cols-2 gap-20 items-start mb-48 px-4 md:px-0">
           <div className="sticky top-32">
              <div className="w-16 h-16 bg-teal-50 rounded-2xl flex items-center justify-center text-3xl text-teal-600 mb-10 border border-teal-100">
                <IoShieldCheckmarkOutline />
              </div>
              <h2 className="text-5xl font-black text-slate-900 mb-8 tracking-tighter">Vulnerability <br/> Neutralization <span className="text-teal-600">Logic.</span></h2>
              <p className="text-slate-500 text-lg font-light leading-relaxed mb-12">Every maintenance cycle includes a deep heuristic scan of your entire file structure, neutralising threats before they hit your live environment.</p>
              
              <div className="p-8 bg-slate-900 rounded-3xl border border-slate-800 shadow-2xl flex items-center justify-between group cursor-default">
                 <div className="flex gap-4 items-center">
                    <div className="w-12 h-12 rounded-xl bg-teal-500 flex items-center justify-center text-white shadow-lg"><IoSearchOutline className="text-2xl" /></div>
                    <div>
                       <p className="text-[10px] font-black text-white/40 uppercase tracking-widest">Active Scan</p>
                       <p className="text-xs font-bold text-white tracking-tight">THREAT_LEVEL::ZERO</p>
                    </div>
                 </div>
                 <IoSyncOutline className="text-teal-500 text-xl animate-spin-slow" />
              </div>
           </div>

           <div className="space-y-6">
              {(data.sections.roi || []).map((spec, idx) => (
                 <div key={idx} className="bg-white rounded-[2.5rem] p-10 border border-slate-200 shadow-sm hover:shadow-xl transition-all">
                    <h4 className="text-[10px] font-black text-teal-600 uppercase tracking-[0.4em] mb-8">{spec.group} Framework</h4>
                    <div className="grid grid-cols-2 gap-4">
                       {spec.items?.map(item => (
                          <div key={item} className="flex items-center gap-3 text-sm font-bold text-slate-600">
                             <IoCheckmarkCircleOutline className="text-teal-600 text-lg" /> {item}
                          </div>
                       ))}
                    </div>
                 </div>
              ))}
           </div>
        </div>

        {/* PERFORMANCE BASELINE SECTION */}
        <div className="bg-white rounded-[4rem] p-12 lg:p-24 border border-slate-100 shadow-2xl shadow-slate-200/50 relative overflow-hidden mb-48 px-4 md:px-0">
           <div className="absolute top-0 right-0 w-1/3 h-full bg-slate-50/50 border-l border-slate-100 skew-x-12 translate-x-12"></div>
           <div className="grid lg:grid-cols-2 gap-20 relative z-10">
              <div>
                 <div className="text-teal-600 mb-8 flex items-center gap-4">
                    <div className="w-12 h-[2px] bg-teal-600"></div>
                    <span className="text-[10px] font-black uppercase tracking-[0.4em]">Performance Sovereignty</span>
                 </div>
                 <h2 className="text-5xl font-black text-slate-900 mb-8 leading-[0.9]">V8 Speed <br/><span className="text-teal-600">Architecture.</span></h2>
                 <p className="text-slate-500 text-lg font-light leading-relaxed mb-12 italic">"Maintaining score 100/100 isn't just about code; it's about persistent database hygiene and asset vibration optimization."</p>
                 
                 <div className="space-y-4">
                    {[
                       { i: <IoSpeedometerOutline />, t: "LCP Optimization", d: "Largest Contentful Paint calibration for zero-delay rendering." },
                       { i: <IoBuildOutline />, t: "Database Pruning", d: "Clearing overhead and optimizing queries for raw speed." },
                       { i: <IoReloadOutline />, t: "Atomic Rollbacks", d: "Instant recovery to previous stable versions if needed." }
                    ].map((feat, i) => (
                       <div key={i} className="flex gap-4 p-6 bg-slate-50 rounded-2xl border border-slate-100">
                          <div className="text-2xl text-teal-600">{feat.i}</div>
                          <div>
                             <h5 className="text-[10px] font-black text-slate-900 uppercase tracking-widest">{feat.t}</h5>
                             <p className="text-xs text-slate-400 font-bold">{feat.d}</p>
                          </div>
                       </div>
                    ))}
                 </div>
              </div>

              <div className="relative">
                 <div className="bg-slate-900 rounded-[3rem] p-10 border border-slate-800 shadow-2xl aspect-[3/4] flex flex-col justify-between group overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="space-y-8 relative z-10">
                       <div className="flex justify-between items-center text-white/30 font-mono text-[8px] tracking-[0.4em]">
                          <span>SYS_HEALTH_200</span>
                          <span>OPS_BLUEPRINT</span>
                       </div>
                       
                       <div className="space-y-4">
                          <div className="h-[2px] w-full bg-white/10"></div>
                          <div className="flex items-center gap-4">
                             <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-teal-400 font-black text-xs"><IoPulseOutline /></div>
                             <div className="flex-1 space-y-2">
                                <div className="h-1.5 bg-white/10 rounded-full w-full"></div>
                                <div className="h-1.5 bg-white/5 rounded-full w-1/3"></div>
                             </div>
                          </div>
                       </div>

                       <div className="p-6 bg-white/5 rounded-2xl border border-white/5">
                          <p className="text-[8px] font-mono text-emerald-400 mb-2 tracking-tighter">SYSTEM_STABLE::VERIFIED</p>
                          <p className="text-[8px] font-mono text-slate-500 leading-tight">UPTIME: 99.99%<br/>THREATS: 0<br/>VERSION: v8.4.2</p>
                       </div>
                    </div>

                    <div className="bg-white/5 rounded-3xl border border-white/10 p-8 relative overflow-hidden group/m hover:bg-white/10 transition-all">
                       <IoTerminalOutline className="text-4xl text-teal-600/30 mb-4 group-hover/m:rotate-12 transition-transform" />
                       <p className="text-[9px] font-black text-white/50 uppercase tracking-widest mb-2">Protocol: OPS_QA_VERIFIED</p>
                       <p className="text-xs font-bold text-white tracking-tight">System ready for absolute uptime.</p>
                       <div className="absolute bottom-0 left-0 w-full h-[1px] bg-teal-500/50"></div>
                    </div>
                 </div>
              </div>
           </div>
        </div>

        {/* CTA */}
        <div className="text-center py-40 border-t border-slate-200 px-4 md:px-0">
           <IoConstructOutline className="text-7xl text-teal-600 mb-12 mx-auto opacity-20" />
           <h3 className="text-5xl lg:text-7xl font-black text-slate-900 mb-12 leading-tight">Protect your digital legacy. <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-slate-900 font-serif italic font-medium">Engineer Absolute Uptime.</span></h3>
           <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button className="w-full sm:w-[280px] px-8 py-6 bg-teal-600 text-white font-black rounded-xl hover:bg-teal-700 transition-all shadow-2xl shadow-teal-600/40 uppercase tracking-widest text-[10px] flex items-center justify-center">
                {data.cta.title}
              </button>
              <Link
                href="/freelancing"
                className="w-full sm:w-[280px] px-8 py-6 bg-slate-900 text-white font-black rounded-xl hover:bg-slate-800 transition-all uppercase tracking-widest text-[10px] flex items-center justify-center text-center"
              >
                Hire Student Talent
              </Link>
           </div>
        </div>
      </div>
    </section>
  );
}
