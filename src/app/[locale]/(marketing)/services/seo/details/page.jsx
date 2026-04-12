"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { 
  IoArrowBackOutline, 
  IoAnalyticsOutline, 
  IoGitNetworkOutline, 
  IoBugOutline,
  IoPulseOutline,
  IoSyncOutline,
  IoCodeWorkingOutline,
  IoCheckmarkCircleOutline,
  IoTerminalOutline,
  IoSearchOutline
} from "react-icons/io5";

const technicalAuditItems = [
  { step: "01", stage: "Crawler Accessibility", action: "Optimizing robots.txt, XML sitemaps, and fixing 4xx/5xx crawl errors." },
  { step: "02", stage: "Core Web Vitals", action: "Resolving LCP, FID, and CLS bottlenecks for maximum speed scores." },
  { step: "03", stage: "Semantic JSON-LD", action: "Implementing structured data schemas to define entities to search engines." },
  { step: "04", stage: "JS Rendering", action: "Ensuring SPAs and dynamic React content are correctly pre-rendered for indexers." },
  { step: "05", stage: "Entity Clustering", action: "Grouping content into topical hubs to establish niche-wide authority." },
  { step: "06", stage: "Backlink Integrity", action: "Auditing domain authority and toxicity to protect your site's reputation." }
];

const seoPerformanceSpecs = [
  { group: "Indexing Tier", items: ["Server-Side Rendering", "Automatic XML Engine", "Canonical Logic", "Language Alternates"] },
  { group: "Semantic Tier", items: ["Entity Analysis", "Intent Categorization", "Natural Language API", "Schema Graph"] },
  { group: "Growth Tier", items: ["Daily Rank Tracking", "Conversion Attribution", "Competitor Delta", "UX Heatmap Sync"] }
];

export default function SeoDetailsPage() {
  return (
    <section className="min-h-screen bg-slate-50 text-slate-900 selection:bg-indigo-600 selection:text-white pb-40">
      {/* PERSISTENT BREADCRUMB */}
      <div className="border-b border-slate-200 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container-custom py-4 flex items-center justify-between">
          <Link href="/services/seo" className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-indigo-600 transition-colors">
            <IoArrowBackOutline className="text-sm" /> Infrastructure Overview
          </Link>
          <div className="text-[10px] font-black uppercase tracking-[0.4em] text-indigo-600">SEARCH_SPEC_V3.8</div>
        </div>
      </div>

      <div className="container-custom pt-24">
        {/* TECH HEADER */}
        <div className="max-w-5xl mb-32">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-4 text-indigo-600 mb-8"
          >
            <div className="w-12 h-[1px] bg-indigo-600"></div>
            <span className="text-[10px] font-black uppercase tracking-[0.4em]">Technical SEO Manifest</span>
          </motion.div>
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-12 leading-[0.85]">
            Structural <br/> <span className="text-slate-400 italic">Integrity.</span>
          </h1>
          <p className="text-slate-500 text-xl font-light leading-relaxed max-w-2xl italic">
            "We treat SEO as a structural engineering discipline. Your site's code is the foundation of its ranking potential."
          </p>
        </div>

        {/* 6-PHASE AUDIT GRID */}
        <div className="mb-48">
          <div className="flex items-center gap-8 mb-20">
             <h2 className="text-3xl font-black text-slate-900 tracking-tighter uppercase leading-none">Technical Audit Protocol</h2>
             <div className="h-[1px] flex-1 bg-slate-200"></div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-slate-200 border border-slate-200 rounded-[3rem] overflow-hidden shadow-2xl">
            {technicalAuditItems.map((item, i) => (
              <div key={i} className="bg-white p-12 hover:bg-slate-50 transition-colors group">
                 <div className="text-indigo-600 font-mono text-xs mb-8 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-indigo-600"></span> 
                    {item.step} // CRAWL_NODE_STRICT
                 </div>
                 <h3 className="text-xl font-black text-slate-900 mb-4 tracking-tight group-hover:text-indigo-600 transition-colors uppercase">{item.stage}</h3>
                 <p className="text-slate-500 text-sm font-light leading-relaxed">{item.action}</p>
              </div>
            ))}
          </div>
        </div>

        {/* SEMANTIC MAPPING SECTION */}
        <div className="grid lg:grid-cols-2 gap-20 items-start mb-48">
           <div className="sticky top-32">
              <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center text-3xl text-indigo-600 mb-10 border border-indigo-100">
                <IoGitNetworkOutline />
              </div>
              <h2 className="text-5xl font-black text-slate-900 mb-8 tracking-tighter">Entity <br/> Clustering <span className="text-indigo-600">Logic.</span></h2>
              <p className="text-slate-500 text-lg font-light leading-relaxed mb-12">We map your site's content into semantic groups that match the natural language processing (NLP) patterns used by modern search engines.</p>
              
              <div className="p-8 bg-slate-900 rounded-3xl border border-slate-800 shadow-2xl flex items-center justify-between group cursor-default">
                 <div className="flex gap-4 items-center">
                    <div className="w-12 h-12 rounded-xl bg-indigo-500 flex items-center justify-center text-white shadow-lg"><IoSyncOutline className="text-2xl animate-spin-slow" /></div>
                    <div>
                       <p className="text-[10px] font-black text-white/40 uppercase tracking-widest">Real-time Rank Sync</p>
                       <p className="text-xs font-bold text-white tracking-tight">INDEX_STABILITY::98%</p>
                    </div>
                 </div>
                 <div className="flex gap-1">
                    {[0.6, 1, 0.4].map((h, i) => (
                      <motion.div key={i} animate={{ height: [10, 20, 10] }} transition={{ duration: 1, delay: i * 0.2, repeat: Infinity }} className="w-1 bg-emerald-400 rounded-full" />
                    ))}
                 </div>
              </div>
           </div>

           <div className="space-y-6">
              {seoPerformanceSpecs.map((spec, idx) => (
                 <div key={idx} className="bg-white rounded-[2.5rem] p-10 border border-slate-200 shadow-sm hover:shadow-xl transition-all">
                    <h4 className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.4em] mb-8">{spec.group} Protocol</h4>
                    <div className="grid grid-cols-2 gap-4">
                       {spec.items.map(item => (
                          <div key={item} className="flex items-center gap-3 text-sm font-bold text-slate-600">
                             <IoCheckmarkCircleOutline className="text-indigo-600 text-lg" /> {item}
                          </div>
                       ))}
                    </div>
                 </div>
              ))}
           </div>
        </div>

        {/* CRAWL VISUALIZER SECTION */}
        <div className="bg-white rounded-[4rem] p-12 lg:p-24 border border-slate-100 shadow-2xl shadow-slate-200/50 relative overflow-hidden mb-48">
           <div className="absolute top-0 right-0 w-1/3 h-full bg-slate-50/50 border-l border-slate-100 skew-x-12 translate-x-12"></div>
           <div className="grid lg:grid-cols-2 gap-20 relative z-10">
              <div>
                 <div className="text-indigo-600 mb-8 flex items-center gap-4">
                    <div className="w-12 h-[2px] bg-indigo-600"></div>
                    <span className="text-[10px] font-black uppercase tracking-[0.4em]">Engine Transparency</span>
                 </div>
                 <h2 className="text-5xl font-black text-slate-900 mb-8 leading-[0.9]">Crawl-Optimized <br/><span className="text-indigo-600">Source Delivery.</span></h2>
                 <p className="text-slate-500 text-lg font-light leading-relaxed mb-12 italic">"We deliver code that search spiders can digest instantly. Zero wasted resources, 100% indexing efficiency."</p>
                 
                 <div className="space-y-4">
                    {[
                       { i: <IoCodeWorkingOutline />, t: "Clean Source Protocol", d: "Minified, semantically valid HTML5 output." },
                       { i: <IoTerminalOutline />, t: "JSON-LD Automation", d: "Automatic schema generation for all page types." },
                       { i: <IoPulseOutline />, t: "Edge Caching", d: "Sub-100ms response times for indexing bots." }
                    ].map((feat, i) => (
                       <div key={i} className="flex gap-4 p-6 bg-slate-50 rounded-2xl border border-slate-100">
                          <div className="text-2xl text-indigo-600">{feat.i}</div>
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
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="space-y-8 relative z-10">
                       <div className="flex justify-between items-center text-white/30 font-mono text-[8px] tracking-[0.4em]">
                          <span>SYS_BOT_REPL</span>
                          <span>INDEXING_ENGINE</span>
                       </div>
                       
                       <div className="space-y-4">
                          <div className="h-[1px] w-full bg-white/10"></div>
                          <div className="flex items-center gap-4">
                             <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-indigo-400 font-black text-xs"><IoSearchOutline /></div>
                             <div className="flex-1 space-y-2">
                                <div className="h-1.5 bg-white/10 rounded-full w-full"></div>
                                <div className="h-1.5 bg-white/5 rounded-full w-1/3"></div>
                             </div>
                          </div>
                       </div>

                       <div className="p-6 bg-white/5 rounded-2xl border border-white/5">
                          <p className="text-[8px] font-mono text-emerald-400 mb-2 tracking-tighter">INDEX_STATUS::VERIFIED</p>
                          <p className="text-[8px] font-mono text-slate-500 leading-tight">URI: /en/services/seo/details<br/>TTL: 3600s<br/>ENC: SSL_VERIFIED</p>
                       </div>
                    </div>

                    <div className="bg-white/5 rounded-3xl border border-white/10 p-8 relative overflow-hidden group/m hover:bg-white/10 transition-all">
                       <IoBugOutline className="text-4xl text-indigo-600/30 mb-4 group-hover/m:rotate-12 transition-transform" />
                       <p className="text-[9px] font-black text-white/50 uppercase tracking-widest mb-2">Protocol: ZERO_ERR_INDEX</p>
                       <p className="text-xs font-bold text-white tracking-tight">Structural integrity confirmed.</p>
                       <div className="absolute bottom-0 left-0 w-full h-[1px] bg-indigo-500/50"></div>
                    </div>
                 </div>
              </div>
           </div>
        </div>

        {/* CTA */}
        <div className="text-center py-40 border-t border-slate-200">
           <IoAnalyticsOutline className="text-7xl text-indigo-600 mb-12 mx-auto opacity-20" />
           <h3 className="text-5xl lg:text-7xl font-black text-slate-900 mb-12 leading-tight">Stop playing catch up. <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-slate-700 font-serif italic font-medium">Command the First Page.</span></h3>
           <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button className="w-full sm:w-[280px] px-8 py-6 bg-indigo-600 text-white font-black rounded-xl hover:bg-indigo-700 transition-all shadow-2xl shadow-indigo-600/40 uppercase tracking-widest text-[10px] flex items-center justify-center">
                Initialize Technical Audit
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
