"use client";

import { motion } from "framer-motion";
import { 
  IoTrendingUp, 
  IoSearchOutline, 
  IoFlashOutline, 
  IoGlobeOutline, 
  IoBarChartOutline,
  IoCheckmarkCircleOutline
} from "react-icons/io5";

const seoHierarchy = [
  {
    title: "Technical SEO",
    desc: "The foundation. Optimizing Core Web Vitals, site speed, schema markup, and crawlability for search robots.",
    icon: <IoFlashOutline />,
    color: "from-emerald-500 to-teal-400"
  },
  {
    title: "On-Page / Content",
    desc: "Elite content structuring using latent semantic indexing (LSI) and cluster-based keyword mapping for topical authority.",
    icon: <IoSearchOutline />,
    color: "from-blue-500 to-indigo-400"
  },
  {
    title: "Authority / Backlinks",
    desc: "Acquiring high-quality, relevant backlinks from established domains to solidify your authority and trust in Google's eyes.",
    icon: <IoGlobeOutline />,
    color: "from-purple-500 to-rose-400"
  }
];

const roadmapSteps = [
  { m: "Month 1", t: "Audit & Technical Fixes" },
  { m: "Month 2", t: "Keyword Research & Clusters" },
  { m: "Month 3", t: "Content Production & Mapping" },
  { m: "Month 4", t: "Link Building & Outreach" },
  { m: "Month 5", t: "Optimization & PR Blitz" },
  { m: "Month 6", t: "Scaling Traffic Peaks" }
];

export default function SeoOptimizationPage() {
  return (
    <section className="min-h-screen bg-slate-900 overflow-hidden relative font-sans lg:py-24">
      <div className="absolute inset-x-0 top-0 h-[800px] bg-gradient-to-b from-emerald-900/30 via-transparent to-transparent pointer-events-none -z-10"></div>
      
      <div className="container-custom pt-32 pb-20 relative z-10">
        
        {/* SEO Dominance Hero */}
        <div className="max-w-4xl mx-auto text-center mb-32">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-black tracking-widest uppercase mb-8 border border-emerald-500/20 shadow-2xl shadow-emerald-500/10"
          >
            Organic Growth Engine
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-6xl md:text-8xl lg:text-9xl font-black text-white leading-[0.85] mb-8 tracking-tighter"
          >
            Organic <br className="hidden md:block"/> <span className="text-emerald-500">Unlocks.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 text-xl md:text-3xl font-light leading-relaxed max-w-3xl mx-auto"
          >
            Paid ads stop the moment you stop paying. SEO works for you while you sleep. We execute elite technical alignments and authority building to dominate Google rankings.
          </motion.p>
        </div>

        {/* The SEO Hierarchy */}
        <div className="mb-32">
          <h2 className="text-4xl font-black text-white text-center mb-24 tracking-tighter">The Search Hierarchy</h2>
          <div className="grid lg:grid-cols-3 gap-8">
            {seoHierarchy.map((pillar, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-slate-800/40 border border-white/5 p-10 rounded-[2.5rem] relative overflow-hidden group hover:bg-slate-800 transition-all hover:border-emerald-500/20"
              >
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${pillar.color} opacity-5 rounded-full blur-[40px] group-hover:opacity-20 transition-opacity`}></div>
                <div className={`text-4xl text-white mb-8 group-hover:scale-110 transition-transform w-16 h-16 rounded-2xl flex items-center justify-center bg-emerald-500/10 text-emerald-400 border border-emerald-500/20`}>
                  {pillar.icon}
                </div>
                <h3 className="text-2xl font-black text-white mb-4">{pillar.title}</h3>
                <p className="text-slate-500 font-light leading-relaxed text-lg">{pillar.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Roadmap Roadmap Visualization */}
        <div className="grid lg:grid-cols-2 gap-24 items-center mb-32 max-w-6xl mx-auto bg-slate-950 rounded-[4rem] p-12 lg:p-24 border border-white/5 shadow-2xl relative overflow-hidden">
           <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-emerald-500/10 via-transparent to-transparent opacity-40"></div>
           
           <div className="relative z-10 space-y-12">
              <h2 className="text-4xl lg:text-5xl font-black text-white leading-tight">6-Month <br/><span className="text-emerald-500 underline decoration-4 underline-offset-8">Growth Roadmap.</span></h2>
              <div className="space-y-6">
                 {roadmapSteps.map((step, idx) => (
                    <motion.div 
                      key={idx} 
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.05 }}
                      className="flex gap-4 items-center group cursor-default"
                    >
                       <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-black text-[10px] px-3 py-1 rounded w-20 text-center group-hover:bg-emerald-500 group-hover:text-black transition-colors">{step.m}</div>
                       <p className="text-white text-lg font-bold group-hover:pl-4 transition-all">{step.t}</p>
                    </motion.div>
                 ))}
              </div>
           </div>

           {/* Analytical Growth Mockup */}
           <div className="relative group">
              <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-10 h-full min-h-[400px] flex flex-col justify-end relative shadow-2xl overflow-hidden backdrop-blur-xl">
                 <div className="absolute top-0 left-0 w-full h-full p-10 opacity-20 flex items-end gap-2 overflow-hidden pointer-events-none">
                    {[10, 25, 15, 45, 30, 60, 55, 90, 85, 100].map((h, i) => (
                      <div key={i} className="flex-1 bg-emerald-500 rounded-t-sm" style={{ height: `${h}%` }}></div>
                    ))}
                 </div>
                 
                 <div className="relative z-10 text-center py-6">
                    <IoBarChartOutline size={48} className="text-emerald-500 mx-auto mb-6 group-hover:scale-125 transition-transform" />
                    <h4 className="text-3xl font-black text-white mb-2">Organic Authority</h4>
                    <p className="text-emerald-400 font-mono text-sm tracking-widest">+285.4% Search Visibility</p>
                 </div>
              </div>
           </div>
        </div>

        {/* SEO Final Action */}
        <div className="max-w-4xl mx-auto text-center border-t border-white/10 pt-20">
           <h3 className="text-4xl font-black text-white mb-10 tracking-tight italic">Be visible. Be the authority.</h3>
           <button className="px-12 py-5 bg-emerald-500 text-black font-extrabold rounded-full hover:scale-105 transition-transform shadow-2xl shadow-emerald-500/30 uppercase tracking-widest text-sm">
             Request An SEO Audit Today
           </button>
        </div>
      </div>
    </section>
  );
}
