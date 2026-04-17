"use client";

import { 
  IoSearchOutline, 
  IoTrendingUpOutline, 
  IoAnalyticsOutline, 
  IoCheckmarkCircleOutline,
  IoGitNetworkOutline,
  IoPulseOutline,
  IoBugOutline
} from "react-icons/io5";
import { motion } from "framer-motion";
import Link from "next/link";
import { getIcon } from "@/lib/icons";

export default function SeoClient({ content }) {
  if (!content) return null;

  const { hero, sections, cta } = content.landing;
  const pillars = sections.pillars || [];
  const metrics = sections.metrics || [];

  return (
    <section className="min-h-screen bg-slate-50 text-slate-900 selection:bg-indigo-600 selection:text-white overflow-hidden relative">
      <div className="absolute top-0 opacity-20 pointer-events-none -z-10 w-full h-full">
         <div className="absolute top-0 left-1/4 w-[1px] h-full bg-slate-200"></div>
         <div className="absolute top-0 right-1/4 w-[1px] h-full bg-slate-200"></div>
         <div className="absolute top-1/2 left-0 w-full h-[1px] bg-slate-200"></div>
         <div className="absolute top-[20%] right-[-100px] w-[600px] h-[600px] bg-indigo-50 rounded-full blur-[160px]"></div>
      </div>

      <div className="container-custom py-20 relative">
        {/* SEO HERO */}
        <div className="flex flex-col lg:flex-row items-center gap-20 mb-48 px-4 md:px-0">
          <div className="flex-1 text-left">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-[10px] font-black tracking-[0.4em] uppercase mb-10"
            >
              <IoAnalyticsOutline className="text-sm" /> {hero.badge}
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "circOut" }}
              className="text-5xl md:text-7xl font-black text-slate-900 leading-[1.1] mb-8 tracking-tighter"
            >
              {hero.title?.split(' ')[0]} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-rose-500 to-indigo-500 animate-gradient-x">
                {hero.title?.split(' ').slice(1).join(' ') || "Optimization"}
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-slate-600 text-xl font-light leading-relaxed max-w-2xl mb-12"
            >
              {hero.description}
            </motion.p>

            <div className="flex flex-col sm:flex-row gap-6">
              <button className="w-full sm:w-[280px] px-8 py-6 bg-indigo-600 text-white font-black rounded-xl hover:bg-indigo-700 transition-all shadow-2xl shadow-indigo-600/20 uppercase tracking-widest text-[10px] flex items-center justify-center">
                Initialize Technical Audit
              </button>
              <Link
                href="/services/seo/details"
                className="w-full sm:w-[280px] px-8 py-6 bg-white border border-slate-200 text-slate-900 font-black rounded-xl hover:bg-slate-50 transition-all uppercase tracking-widest text-[10px] flex items-center justify-center text-center"
              >
                Technical Specifications
              </Link>
            </div>
          </div>

          <div className="flex-1 relative hidden lg:block">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="relative p-12 bg-white rounded-[4rem] border border-slate-100 shadow-2xl overflow-hidden group"
            >
               <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: "radial-gradient(#4338ca 1px, transparent 1px)", backgroundSize: "30px 30px" }}></div>
               
               <div className="relative aspect-square flex items-center justify-center">
                  <motion.div 
                    animate={{ scale: [1, 1.05, 1] }} 
                    transition={{ duration: 6, repeat: Infinity }}
                    className="w-64 h-64 bg-slate-50 rounded-full border border-slate-100 flex items-center justify-center relative p-8 shadow-inner"
                  >
                     <IoGitNetworkOutline className="text-8xl text-indigo-600/20 absolute opacity-50" />
                     <div className="relative z-10 text-center">
                        <IoSearchOutline className="text-5xl text-indigo-600 mb-4 mx-auto" />
                        <p className="text-[10px] font-black text-slate-400 tracking-widest uppercase mb-1">Crawl Status</p>
                        <p className="text-xs font-mono text-emerald-500 font-bold">200_OK_VERIFIED</p>
                     </div>
                  </motion.div>

                  {[
                    { icon: <IoPulseOutline />, pos: "top-10 left-10" },
                    { icon: <IoBugOutline />, pos: "bottom-10 right-10" },
                    { icon: <IoAnalyticsOutline />, pos: "top-10 right-10" }
                  ].map((sat, i) => (
                    <motion.div
                      key={i}
                      animate={{ y: [0, -15, 0] }}
                      transition={{ duration: 3 + i, repeat: Infinity }}
                      className={`absolute ${sat.pos} p-6 bg-white rounded-3xl border border-slate-100 shadow-xl text-indigo-600 text-xl`}
                    >
                       {sat.icon}
                    </motion.div>
                  ))}
               </div>

               <div className="absolute bottom-8 left-1/2 -translate-x-1/2 font-mono text-[8px] text-slate-300 uppercase tracking-[0.5em] bg-white px-4">
                  SEMANTIC_AUTHORITY_SYNC_V4
               </div>
            </motion.div>
          </div>
        </div>

        {/* PILLARS SECTION */}
        <div className="mb-48 px-4 md:px-0">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8 border-l-4 border-indigo-600 pl-8">
            <div className="max-w-xl">
              <h2 className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.4em] mb-4 font-bold">Search Mechanics</h2>
              <p className="text-4xl md:text-6xl font-black text-slate-900 leading-tight">
                The architecture of <span className="text-slate-400 italic font-serif font-light">global visibility.</span>
              </p>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {pillars?.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group cursor-default"
              >
                <div className="bg-white rounded-[3rem] p-12 h-full border border-slate-100 shadow-sm shadow-slate-200/50 hover:shadow-2xl transition-all group-hover:-translate-y-2 relative overflow-hidden">
                  <div
                    className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.color} text-white flex items-center justify-center text-3xl mb-10 shadow-lg`}
                  >
                    {getIcon(item.icon)}
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 mb-6 tracking-tighter uppercase leading-none">
                    {item.title}
                  </h3>
                  <p className="text-slate-500 leading-relaxed font-light text-lg">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* TECHNICAL AUDIT SECTION */}
        <div className="mb-48 px-4 md:px-0">
          <div className="grid lg:grid-cols-2 gap-20 items-center bg-white rounded-[4rem] p-12 lg:p-24 border border-slate-100 shadow-2xl shadow-slate-200/50 relative overflow-hidden">
             <div className="absolute top-0 right-0 w-1/3 h-full bg-indigo-50/20 -skew-x-[20deg] origin-top translate-x-1/2"></div>
             
             <div className="relative z-10 space-y-12">
                <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center text-3xl text-indigo-600 border border-indigo-100">
                   <IoBugOutline />
                </div>
                <h2 className="text-5xl lg:text-7xl font-black text-slate-900 leading-[0.9]">Technical <br/><span className="text-indigo-600">Integrity.</span></h2>
                <p className="text-slate-500 text-xl font-light leading-relaxed">We perform deep-tissue technical audits covering Core Web Vitals, Structured Data (JSON-LD), and JavaScript rendering to eliminate every barrier to indexing.</p>
                
                <div className="grid grid-cols-2 gap-px bg-slate-50 border border-slate-100 rounded-3xl overflow-hidden mt-10">
                   {metrics?.map((item, idx) => (
                      <div key={idx} className="p-10 hover:bg-white transition-colors group">
                         <h4 className="text-[10px] font-black text-indigo-600 uppercase tracking-widest mb-2">{item.t}</h4>
                         <p className="text-xs text-slate-400 font-bold">{item.d}</p>
                      </div>
                   ))}
                </div>
             </div>

             <motion.div
               animate={{ y: [0, 10, 0] }}
               transition={{ duration: 5, repeat: Infinity }}
               className="relative lg:scale-110"
             >
                <div className="bg-slate-900 rounded-[3rem] p-12 border border-slate-800 shadow-2xl space-y-10 group">
                   <div className="flex justify-between items-center text-white/40 font-mono text-[8px] tracking-[0.4em] uppercase">
                      <span>Authority Report</span>
                      <span>PAGE_RANK_v2.0</span>
                   </div>
                   
                   <div className="space-y-6">
                      <div className="flex items-center gap-4">
                         <div className="w-12 h-12 rounded-xl bg-indigo-500 shadow-[0_0_20px_rgba(67,56,202,0.4)] flex items-center justify-center"><IoTrendingUpOutline className="text-white text-2xl" /></div>
                         <div className="flex-1 space-y-2">
                            <div className="h-1.5 bg-white/10 rounded-full w-full"></div>
                            <div className="h-1.5 bg-white/5 rounded-full w-1/3"></div>
                         </div>
                      </div>
                      <div className="h-32 w-full bg-white/5 rounded-2xl border border-white/5 relative overflow-hidden flex items-center justify-center">
                         <p className="text-[4rem] font-black text-white/5 opacity-40">SEO</p>
                         <div className="absolute inset-0 flex items-center justify-center space-x-1">
                            {[0.4, 0.7, 0.9, 0.6, 0.8, 1].map((h, i) => (
                               <motion.div key={i} initial={{ height: 0 }} animate={{ height: `${h * 40}px` }} transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }} className="w-1 bg-indigo-400 rounded-full" />
                            ))}
                         </div>
                      </div>
                   </div>

                   <div className="pt-8 border-t border-white/5">
                      <p className="text-[10px] font-mono text-emerald-400 font-bold tracking-tighter">SUCCESS_INDEX::94/100</p>
                      <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mt-2">Mobile Latency: 1.2s</p>
                   </div>
                </div>
             </motion.div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center py-40 border-t border-slate-200 px-4 md:px-0">
           <IoAnalyticsOutline className="text-7xl text-indigo-600 mb-12 mx-auto opacity-20" />
           <h3 className="text-5xl lg:text-7xl font-black text-slate-900 mb-12 leading-tight">{cta.title?.split('. ')[0]}. <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-slate-700 font-serif italic font-medium">{cta.title?.split('. ')[1] || "Command the First Page."}</span></h3>
           <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button className="w-full sm:w-[280px] px-8 py-6 bg-indigo-600 text-white font-black rounded-xl hover:bg-indigo-700 transition-all shadow-2xl shadow-indigo-600/20 uppercase tracking-widest text-[10px] flex items-center justify-center">
                Initialize Technical Audit
              </button>
              <Link
                href="/services/seo/details"
                className="w-full sm:w-[280px] px-8 py-6 bg-slate-900 text-white font-black rounded-xl hover:bg-slate-800 transition-all uppercase tracking-widest text-[10px] flex items-center justify-center text-center"
              >
                Technical Details
              </Link>
           </div>
        </div>
      </div>
    </section>
  );
}
