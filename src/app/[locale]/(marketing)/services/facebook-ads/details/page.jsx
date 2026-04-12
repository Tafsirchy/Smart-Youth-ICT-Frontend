"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { 
  IoArrowBackOutline, 
  IoBarChartOutline, 
  IoFilterOutline, 
  IoFlaskOutline,
  IoPulseOutline,
  IoSyncOutline,
  IoTerminalOutline,
  IoCheckmarkCircleOutline,
  IoRocketOutline,
  IoSettingsOutline,
  IoSearchOutline,
  IoFlashOutline
} from "react-icons/io5";

const performanceArchitecture = [
  { step: "01", stage: "Funnel Mapping", action: "Architecting multi-stage customer journeys from awareness to transaction." },
  { step: "02", stage: "Pixel & API Audit", action: "Setting up Meta Pixel and Conversions API for 100% attribution accuracy." },
  { step: "03", stage: "Creative Content Lab", action: "A/B testing vertical video, static carousels, and high-convert copy." },
  { step: "04", stage: "Targeting Matrix", action: "Building lookalike, broad, and interest-based audience cohorts." },
  { step: "05", stage: "Scaling Protocols", action: "Managing budget increments and horizontal scaling to maintain ROAS." },
  { step: "06", stage: "Daily Optimization", action: "Analyzing frequency, CPC, and CTR to prune underperforming sets." }
];

const performanceSpecs = [
  { group: "Conversion Tier", items: ["Meta Pixel Config", "CAPI Server Sync", "Event Prioritization", "Aggregated Measurement"] },
  { group: "Creative Tier", items: ["Dynamic Creative", "UGC Sourcing", "Motion Graphic Sprints", "Hook Rate Analysis"] },
  { group: "Growth Tier", items: ["ROAS Multiplier", "LTV Attribution", "Predictive Modeling", "Market Delta Audit"] }
];

export default function FacebookAdsDetailsPage() {
  return (
    <section className="min-h-screen bg-slate-50 text-slate-900 selection:bg-emerald-600 selection:text-white pb-40">
      {/* PERSISTENT BREADCRUMB */}
      <div className="border-b border-slate-200 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container-custom py-4 flex items-center justify-between">
          <Link href="/services/facebook-ads" className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-emerald-600 transition-colors">
            <IoArrowBackOutline className="text-sm" /> Infrastructure Overview
          </Link>
          <div className="text-[10px] font-black uppercase tracking-[0.4em] text-emerald-600">GROWTH_SPEC_V6.4</div>
        </div>
      </div>

      <div className="container-custom pt-24">
        {/* TECH HEADER */}
        <div className="max-w-5xl mb-32">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-4 text-emerald-600 mb-8"
          >
            <div className="w-12 h-[1px] bg-emerald-600"></div>
            <span className="text-[10px] font-black uppercase tracking-[0.4em]">Performance Manifest</span>
          </motion.div>
          <h1 className="text-fluid-h1 font-black tracking-tighter mb-12 leading-none">
            Performance <br/> <span className="text-slate-400 italic">Logic.</span>
          </h1>
          <p className="text-slate-600 text-xl font-light leading-relaxed max-w-2xl italic">
            "We treat ad targeting as a mathematical optimization problem, not a creative guessing game."
          </p>
        </div>

        {/* 6-PHASE ARCHITECTURE GRID */}
        <div className="mb-48">
          <div className="flex items-center gap-8 mb-20">
             <h2 className="text-3xl font-black text-slate-900 tracking-tighter uppercase leading-none">Performance Architecture</h2>
             <div className="h-[1px] flex-1 bg-slate-200"></div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-slate-200 border border-slate-200 rounded-[3rem] overflow-hidden shadow-2xl">
            {performanceArchitecture.map((item, i) => (
              <div key={i} className="bg-white p-12 hover:bg-slate-50 transition-colors group">
                 <div className="text-emerald-600 font-mono text-xs mb-8 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-600"></span> 
                    {item.step} // ROAS_ENGINE_SYNC
                 </div>
                 <h3 className="text-xl font-black text-slate-900 mb-4 tracking-tight group-hover:text-emerald-600 transition-colors uppercase">{item.stage}</h3>
                 <p className="text-slate-500 text-sm font-light leading-relaxed">{item.action}</p>
              </div>
            ))}
          </div>
        </div>

        {/* FUNNEL LOGIC SECTION */}
        <div className="grid lg:grid-cols-2 gap-20 items-start mb-48">
           <div className="sticky top-32">
              <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center text-3xl text-emerald-600 mb-10 border border-emerald-100">
                <IoFilterOutline />
              </div>
              <h2 className="text-5xl font-black text-slate-900 mb-8 tracking-tighter">Conversion <br/> Attribution <span className="text-emerald-600">Logic.</span></h2>
              <p className="text-slate-500 text-lg font-light leading-relaxed mb-12">We use advanced attribution modeling to track every customer touchpoint, ensuring that you know exactly which creative driven which transaction.</p>
              
              <div className="p-8 bg-slate-900 rounded-3xl border border-slate-800 shadow-2xl flex items-center justify-between group cursor-default">
                 <div className="flex gap-4 items-center">
                    <div className="w-12 h-12 rounded-xl bg-emerald-500 flex items-center justify-center text-white shadow-lg"><IoSyncOutline className="text-2xl animate-spin-slow" /></div>
                    <div>
                       <p className="text-[10px] font-black text-white/40 uppercase tracking-widest">CAPI_SYNC_V4</p>
                       <p className="text-xs font-bold text-white tracking-tight">ATTRIBUTION_GAP::1.2%</p>
                    </div>
                 </div>
                 <div className="flex gap-1">
                    {[0.6, 1, 0.4, 0.8].map((h, i) => (
                      <motion.div key={i} animate={{ height: [10, 20, 10] }} transition={{ duration: 1, delay: i * 0.2, repeat: Infinity }} className="w-1 bg-emerald-400 rounded-full" />
                    ))}
                 </div>
              </div>
           </div>

           <div className="space-y-6">
              {performanceSpecs.map((spec, idx) => (
                 <div key={idx} className="bg-white rounded-[2.5rem] p-10 border border-slate-200 shadow-sm hover:shadow-xl transition-all">
                    <h4 className="text-[10px] font-black text-emerald-600 uppercase tracking-[0.4em] mb-8">{spec.group} Protocol</h4>
                    <div className="grid grid-cols-2 gap-4">
                       {spec.items.map(item => (
                          <div key={item} className="flex items-center gap-3 text-sm font-bold text-slate-600">
                             <IoCheckmarkCircleOutline className="text-emerald-600 text-lg" /> {item}
                          </div>
                       ))}
                    </div>
                 </div>
              ))}
           </div>
        </div>

        {/* CREATIVE AD LAB SECTION */}
        <div className="bg-white rounded-[4rem] p-12 lg:p-24 border border-slate-100 shadow-2xl shadow-slate-200/50 relative overflow-hidden mb-48">
           <div className="absolute top-0 right-0 w-1/3 h-full bg-slate-50/50 border-l border-slate-100 skew-x-12 translate-x-12"></div>
           <div className="grid lg:grid-cols-2 gap-20 relative z-10">
              <div>
                 <div className="text-emerald-600 mb-8 flex items-center gap-4">
                    <div className="w-12 h-[2px] bg-emerald-600"></div>
                    <span className="text-[10px] font-black uppercase tracking-[0.4em]">Creative Intelligence</span>
                 </div>
                 <h2 className="text-5xl font-black text-slate-900 mb-8 leading-[0.9]">High-Velocity <br/><span className="text-emerald-600">Creative Sprints.</span></h2>
                 <p className="text-slate-500 text-lg font-light leading-relaxed mb-12 italic">"Winner creatives are found, not imagined. We launch weekly A/B sprints to identify and scale the highest-converting hooks."</p>
                 
                 <div className="space-y-4">
                    {[
                       { i: <IoFlashOutline />, t: "Hook Rate Audit", d: "Analyzing the first 3 seconds of video for attention retention." },
                       { i: <IoSettingsOutline />, t: "Dynamic Iteration", d: "Automatic scaling of creatives based on CTR benchmarks." },
                       { i: <IoRocketOutline />, t: "ROAS Scaling", d: "Horizontal budget expansion for winning ad sets." }
                    ].map((feat, i) => (
                       <div key={i} className="flex gap-4 p-6 bg-slate-50 rounded-2xl border border-slate-100">
                          <div className="text-2xl text-emerald-600">{feat.i}</div>
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
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="space-y-8 relative z-10">
                       <div className="flex justify-between items-center text-white/30 font-mono text-[8px] tracking-[0.4em]">
                          <span>AD_MANAGER_SYNC</span>
                          <span>PERFORMANCE_ENGINE</span>
                       </div>
                       
                       <div className="space-y-4">
                          <div className="h-[1px] w-full bg-white/10"></div>
                          <div className="flex items-center gap-4">
                             <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-emerald-400 font-black text-xs"><IoBarChartOutline /></div>
                             <div className="flex-1 space-y-2">
                                <div className="h-1.5 bg-white/10 rounded-full w-full"></div>
                                <div className="h-1.5 bg-white/5 rounded-full w-1/3"></div>
                             </div>
                          </div>
                       </div>

                       <div className="p-6 bg-white/5 rounded-2xl border border-white/5">
                          <p className="text-[8px] font-mono text-emerald-400 mb-2 tracking-tighter">SUCCESS_ROAS::4.2x</p>
                          <p className="text-[8px] font-mono text-slate-500 leading-tight">ACTIVE_SETS: 12<br/>WINNER_RATE: 1.4%<br/>AUDIT: PASSED</p>
                       </div>
                    </div>

                    <div className="bg-white/5 rounded-3xl border border-white/10 p-8 relative overflow-hidden group/m hover:bg-white/10 transition-all">
                       <IoFlaskOutline className="text-4xl text-emerald-600/30 mb-4 group-hover/m:rotate-12 transition-transform" />
                       <p className="text-[9px] font-black text-white/50 uppercase tracking-widest mb-2">Protocol: SCALABILITY_AUDIT</p>
                       <p className="text-xs font-bold text-white tracking-tight">System ready for aggressive scaling.</p>
                       <div className="absolute bottom-0 left-0 w-full h-[1px] bg-emerald-500/50"></div>
                    </div>
                 </div>
              </div>
           </div>
        </div>

        {/* CTA */}
        <div className="text-center py-40 border-t border-slate-200">
           <IoPulseOutline className="text-7xl text-emerald-600 mb-12 mx-auto opacity-20" />
           <h3 className="text-5xl lg:text-7xl font-black text-slate-900 mb-12 leading-tight">Ready to activate your <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-blue-700 font-serif italic font-medium">Performance Engine?</span></h3>
           <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button className="w-full sm:w-[280px] px-8 py-6 bg-emerald-600 text-white font-black rounded-xl hover:bg-emerald-700 transition-all shadow-2xl shadow-emerald-600/40 uppercase tracking-widest text-[10px] flex items-center justify-center">
                Initialize Performance Audit
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
