"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { 
  IoFlashOutline, 
  IoPeopleOutline, 
  IoBarChartOutline, 
  IoAnalyticsOutline, 
  IoCheckmarkCircleOutline,
  IoGitNetworkOutline,
  IoPulseOutline,
  IoRocketOutline,
  IoFilterOutline
} from "react-icons/io5";

const fbAdsPillars = [
  {
    title: "Precision Targeting",
    desc: "Leveraging custom audiences, lookalikes, and behavioral interest mapping to ensure your budget hit the exact buyer persona.",
    icon: <IoPeopleOutline />,
    color: "from-emerald-600 to-green-700"
  },
  {
    title: "Conversion Funnels",
    desc: "Architecting multi-stage customer journeys from cold awareness to high-intent remarketing cycles.",
    icon: <IoFilterOutline />,
    color: "from-green-700 to-blue-800"
  },
  {
    title: "ROAS Optimization",
    desc: "Rigorous daily tracking of Return on Ad Spend (ROAS) and attribution modeling to maximize every dollar spent.",
    icon: <IoBarChartOutline />,
    color: "from-blue-600 to-emerald-700"
  }
];

export default function FacebookAdsPage() {
  return (
    <section className="min-h-screen bg-slate-50 text-slate-900 selection:bg-emerald-600 selection:text-white overflow-hidden relative">
      {/* INDUSTRIAL BACKGROUND DECOR */}
      <div className="absolute top-0 opacity-20 pointer-events-none -z-10 w-full h-full">
         <div className="absolute top-0 left-1/4 w-[1px] h-full bg-slate-200"></div>
         <div className="absolute top-0 right-1/4 w-[1px] h-full bg-slate-200"></div>
         <div className="absolute top-1/2 left-0 w-full h-[1px] bg-slate-200"></div>
         <div className="absolute top-[30%] left-[-100px] w-[500px] h-[500px] bg-emerald-50 rounded-full blur-[140px]"></div>
      </div>

      <div className="container-custom py-20 relative">
        {/* FB ADS HERO */}
        <div className="flex flex-col lg:flex-row items-center gap-20 mb-48 px-4 md:px-0">
          <div className="flex-1 text-left">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-[10px] font-black tracking-[0.4em] uppercase mb-10"
            >
              <IoRocketOutline className="text-sm" /> Performance Growth Engine
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "circOut" }}
              className="text-5xl md:text-7xl font-black text-slate-900 leading-[1.1] mb-8 tracking-tighter"
            >
              Facebook <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-rose-500 to-indigo-500 animate-gradient-x">Ads Management</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-slate-600 text-xl font-light leading-relaxed max-w-2xl mb-12"
            >
              We treat ad spend as a technical investment. Our Facebook Ads infrastructure is built on deep behavioral data and creative engineering to ensure your ROAS is both high and predictable.
            </motion.p>

            <div className="flex flex-col sm:flex-row gap-6">
              <button className="w-full sm:w-[280px] px-8 py-6 bg-emerald-600 text-white font-black rounded-xl hover:bg-emerald-700 transition-all shadow-2xl shadow-emerald-600/20 uppercase tracking-widest text-[10px] flex items-center justify-center">
                Initialize Performance Audit
              </button>
              <Link
                href="/services/facebook-ads/details"
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
               {/* Performance Funnel Visual */}
               <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: "linear-gradient(#10b981 1px, transparent 1px), linear-gradient(90deg, #10b981 1px, transparent 1px)", backgroundSize: "40px 40px" }}></div>
               
               <div className="relative aspect-square flex flex-col items-center justify-center space-y-4">
                  {[
                    { w: "w-64", h: "h-24", label: "AWARENESS (Top)", color: "bg-emerald-50 text-emerald-400" },
                    { w: "w-48", h: "h-20", label: "INTENT (Mid)", color: "bg-emerald-100/50 text-emerald-500" },
                    { w: "w-32", h: "h-16", label: "CONVERSION (Btm)", color: "bg-emerald-600 text-white" }
                  ].map((level, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.2 }}
                      whileHover={{ scale: 1.05 }}
                      className={`${level.w} ${level.h} ${level.color} border border-emerald-200 rounded-3xl shadow-xl flex items-center justify-center relative overflow-hidden group/item cursor-default`}
                    >
                       <span className="text-[10px] font-black tracking-widest uppercase relative z-10">{level.label}</span>
                       <motion.div 
                         animate={{ x: ["-100%", "100%"] }}
                         transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                         className="absolute top-0 left-0 w-full h-full bg-white/20 -skew-x-12 pointer-events-none"
                       />
                    </motion.div>
                  ))}

                  <div className="absolute top-0 right-10 p-6 bg-slate-900 rounded-2xl shadow-2xl border border-slate-800 flex flex-col items-center">
                     <p className="text-[8px] font-black text-white/40 uppercase tracking-widest mb-1">ROAS Forecast</p>
                     <p className="text-xl font-black text-emerald-400">4.2x</p>
                     <IoPulseOutline className="text-emerald-500 text-lg mt-2 animate-pulse" />
                  </div>
               </div>

               <div className="absolute bottom-8 left-1/2 -translate-x-1/2 font-mono text-[8px] text-slate-300 uppercase tracking-[0.5em] bg-white px-4">
                  FUNNEL_ARCHITECTURE_STRICT
               </div>
            </motion.div>
          </div>
        </div>

        {/* PILLARS SECTION */}
        <div className="mb-48 px-4 md:px-0">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8 border-l-4 border-emerald-600 pl-8">
            <div className="max-w-xl">
              <h2 className="text-[10px] font-black text-emerald-600 uppercase tracking-[0.4em] mb-4 font-bold">Growth Mechanics</h2>
              <p className="text-4xl md:text-6xl font-black text-slate-900 leading-tight">
                The architecture of <span className="text-slate-400 italic font-serif font-light">scalable revenue.</span>
              </p>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {fbAdsPillars.map((item, i) => (
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
                    {item.icon}
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

        {/* PERFORMANCE SECTION */}
        <div className="mb-48 px-4 md:px-0">
          <div className="grid lg:grid-cols-2 gap-20 items-center bg-white rounded-[4rem] p-12 lg:p-24 border border-slate-100 shadow-2xl shadow-slate-200/50 relative overflow-hidden">
             <div className="absolute top-0 right-0 w-1/3 h-full bg-emerald-50/20 -skew-x-[20deg] origin-top translate-x-1/2"></div>
             
             <div className="relative z-10 space-y-12">
                <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center text-3xl text-emerald-600 border border-emerald-100">
                   <IoBarChartOutline />
                </div>
                <h2 className="text-5xl lg:text-7xl font-black text-slate-900 leading-[0.9]">Technical <br/><span className="text-emerald-600">Precision.</span></h2>
                <p className="text-slate-500 text-xl font-light leading-relaxed">We move beyond 'vanity metrics'. We focus on attributable revenue, checkout-intent modeling, and LTV optimization to ensure sustainable growth.</p>
                
                <div className="grid grid-cols-2 gap-6 pt-10 border-t border-slate-100">
                   {[
                     "Custom conversion setups",
                     "Pixel & API Integration",
                     "ROAS Attribution Logic",
                     "LTV Forecasting",
                     "A/B Creative Sprints",
                     "Competitor Scale Audit"
                   ].map((item, idx) => (
                      <div key={idx} className="flex items-center gap-3 text-sm font-bold text-slate-700">
                         <IoCheckmarkCircleOutline className="text-emerald-600 text-lg" /> {item}
                      </div>
                   ))}
                </div>
             </div>

             <motion.div
               animate={{ y: [0, -10, 0] }}
               transition={{ duration: 5, repeat: Infinity }}
               className="relative lg:scale-110"
             >
                <div className="bg-slate-900 rounded-[3rem] p-12 border border-slate-800 shadow-2xl space-y-10 group">
                   <div className="flex justify-between items-center text-white/40 font-mono text-[8px] tracking-[0.4em] uppercase">
                      <span>Performance Logic</span>
                      <span>ROI_CALCULATOR_v6.4</span>
                   </div>
                   
                   <div className="space-y-6">
                      <div className="flex items-center gap-4">
                         <div className="w-12 h-12 rounded-xl bg-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.4)] flex items-center justify-center text-white"><IoFlashOutline className="text-2xl" /></div>
                         <div className="flex-1 space-y-2">
                            <div className="h-1.5 bg-white/10 rounded-full w-full"></div>
                            <div className="h-1.5 bg-white/5 rounded-full w-1/2"></div>
                         </div>
                      </div>
                      <div className="h-32 w-full bg-white/5 rounded-2xl border border-white/5 relative overflow-hidden flex flex-col items-center justify-center p-6">
                         <div className="flex justify-between w-full mb-4">
                            <p className="text-[10px] font-mono text-emerald-400">NET_CONV::485</p>
                            <p className="text-[10px] font-mono text-white">CP_AQ::$12.4</p>
                         </div>
                         <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                            <motion.div initial={{ width: 0 }} animate={{ width: "85%" }} transition={{ duration: 2 }} className="h-full bg-emerald-500" />
                         </div>
                      </div>
                   </div>

                   <div className="pt-8 border-t border-white/5 flex justify-between items-center">
                      <p className="text-[10px] font-mono text-emerald-400 font-bold tracking-tighter">ATTRIBUTION::VERIFIED</p>
                      <IoCheckmarkCircleOutline className="text-emerald-500" />
                   </div>
                </div>
             </motion.div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center py-40 border-t border-slate-200 px-4 md:px-0">
           <IoAnalyticsOutline className="text-7xl text-emerald-600 mb-12 mx-auto opacity-20" />
           <h3 className="text-5xl lg:text-7xl font-black text-slate-900 mb-12 leading-tight">Stop burning budget. <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-blue-700 font-serif italic font-medium">Command the Feed.</span></h3>
           <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button className="w-full sm:w-[280px] px-8 py-6 bg-emerald-600 text-white font-black rounded-xl hover:bg-emerald-700 transition-all shadow-2xl shadow-emerald-600/40 uppercase tracking-widest text-[10px] flex items-center justify-center">
                Initialize Performance Audit
              </button>
              <Link
                href="/services/facebook-ads/details"
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
