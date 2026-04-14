"use client";

import { useState, useEffect } from "react";
import { 
  IoLayersOutline, 
  IoCheckmarkCircleOutline, 
  IoGitNetworkOutline, 
  IoGlobeOutline,
  IoAnalyticsOutline,
  IoShieldOutline,
  IoHardwareChipOutline,
  IoPulseOutline
} from "react-icons/io5";
import { motion } from "framer-motion";
import Link from "next/link";
import api from "@/lib/api";
import { getIcon } from "@/lib/icons";

export default function ErpCrmPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get("/cms/services/web-software/erp-crm");
        if (res.data.data) {
          setData(res.data.data.landing);
        }
      } catch (err) {
        console.error("Failed to load erp-crm data", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div className="min-h-screen bg-slate-50 flex items-center justify-center font-black animate-pulse text-indigo-600 uppercase tracking-widest">INITIALIZING ENTERPRISE ENGINE...</div>;
  if (!data) return null;

  const { hero = {}, sections = {}, cta = {} } = data;
  const verticals = sections.verticals || [];
  const integrations = sections.integrations || [];
  const pricing = sections.pricing || [];

  return (
    <section className="min-h-screen bg-slate-50 text-slate-900 selection:bg-indigo-600 selection:text-white overflow-hidden relative font-sans">
      {/* INDUSTRIAL OVERLAY */}
      <div className="absolute top-0 opacity-10 pointer-events-none -z-10 w-full h-full">
         <div className="absolute top-0 left-1/4 w-[1px] h-full bg-slate-200"></div>
         <div className="absolute top-0 right-1/4 w-[1px] h-full bg-slate-200"></div>
         <div className="absolute top-1/2 left-0 w-full h-[1px] bg-slate-200"></div>
      </div>

      <div className="container-custom py-20 relative z-10">
        {/* ENTERPRISE HERO */}
        <div className="flex flex-col lg:flex-row items-center gap-20 mb-48 px-4 md:px-0">
          <div className="flex-1 text-left">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-[10px] font-black tracking-[0.4em] uppercase mb-10"
            >
              <IoHardwareChipOutline className="text-sm" /> {hero.badge}
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "circOut" }}
              className="text-5xl md:text-8xl font-black text-slate-900 leading-[0.9] mb-8 tracking-tighter"
            >
              {hero.title?.split(" ")[0]} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-slate-900 animate-gradient-x">{hero.subtitle}</span>
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
                Initialize Enterprise Audit
              </button>
              <Link
                href="/services/erp-crm/details"
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
               
               <div className="relative aspect-square flex flex-col items-center justify-center space-y-6">
                  <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="w-64 h-64 border border-indigo-100 rounded-full flex items-center justify-center relative">
                     <div className="absolute top-0 w-8 h-8 bg-indigo-600 rounded-lg shadow-xl shadow-indigo-200"></div>
                     <div className="absolute bottom-0 w-8 h-8 bg-purple-500 rounded-lg shadow-xl shadow-purple-200"></div>
                     <div className="absolute right-0 w-8 h-8 bg-slate-900 rounded-lg shadow-xl shadow-slate-400"></div>
                  </motion.div>
                  <div className="absolute inset-0 flex items-center justify-center">
                     <div className="w-32 h-32 bg-white rounded-3xl border border-slate-100 shadow-2xl flex flex-col items-center justify-center">
                        <IoPulseOutline className="text-4xl text-indigo-600 animate-pulse" />
                        <span className="text-[8px] font-black text-slate-300 mt-2">LINK_ACTIVE</span>
                     </div>
                  </div>
               </div>

               <div className="absolute bottom-4 left-1/2 -translate-x-1/2 font-mono text-[8px] text-slate-400 uppercase tracking-widest bg-white px-4">
                  ENTERPRISE_OS_v6.4
               </div>
            </motion.div>
          </div>
        </div>

        {/* SERVICE VERTICALS */}
        <div className="mb-48 px-4 md:px-0">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8 border-l-4 border-indigo-600 pl-8">
            <div className="max-w-xl">
              <h2 className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.4em] mb-4 font-bold">Logistics Standard</h2>
              <p className="text-4xl md:text-6xl font-black text-slate-900 leading-tight">
                Architectures built for <span className="text-slate-400 italic font-serif font-light">operational sovereignty.</span>
              </p>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {verticals?.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group cursor-default"
              >
                <div className={`bg-white rounded-[3rem] p-12 h-full border border-slate-100 shadow-sm shadow-slate-200/50 hover:shadow-2xl transition-all group-hover:-translate-y-2 relative overflow-hidden`}>
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

        {/* INTEGRATION SECTION */}
        <div className="mb-48 bg-slate-900 rounded-[5rem] p-12 lg:p-24 relative overflow-hidden text-white mx-4 md:mx-0">
           <div className="absolute top-0 right-0 w-1/2 h-full bg-indigo-600/10 blur-[150px] -z-10"></div>
           
           <div className="grid lg:grid-cols-2 gap-20 items-center relative z-10">
              <div>
                 <h2 className="text-5xl lg:text-7xl font-black mb-10 leading-[0.9]">Atomic <br/><span className="text-indigo-500 font-serif italic font-medium">Interconnectivity.</span></h2>
                 <p className="text-slate-500 text-xl font-light leading-relaxed mb-12">We eliminate operational friction. Your custom ERP/CRM becomes the central nervous system of your entire business infrastructure.</p>
                 
                 <div className="grid grid-cols-2 gap-px bg-white/5 border border-white/5 rounded-3xl overflow-hidden">
                    {integrations?.map((int, i) => (
                       <div key={i} className="p-10 hover:bg-white/5 transition-colors group">
                          <h4 className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-4">{int.t}</h4>
                          <p className="text-[10px] text-slate-500 font-bold leading-relaxed">{int.d}</p>
                       </div>
                    ))}
                 </div>
              </div>

              <div className="relative group lg:scale-110">
                 <div className="p-12 bg-white/5 rounded-[4rem] border border-white/10 backdrop-blur-sm relative z-20 overflow-hidden">
                    <div className="flex justify-between items-center mb-16 border-b border-white/5 pb-8 font-mono text-[8px] tracking-[0.4em] text-white/40">
                       <span>SYS_LOGIC_SYNC</span>
                       <span>STATUS::ACTIVE</span>
                    </div>
                    
                    <div className="space-y-8">
                       <div className="flex items-center gap-6">
                          <IoGitNetworkOutline className="text-4xl text-indigo-500" />
                          <div className="flex-1 space-y-2">
                             <div className="h-1.5 bg-white/10 rounded-full w-full"></div>
                             <div className="h-1.5 bg-white/5 rounded-full w-1/4"></div>
                          </div>
                       </div>
                       <div className="h-40 bg-white/5 rounded-3xl border border-white/5 flex items-center justify-center p-8">
                          <div className="grid grid-cols-6 gap-2 w-full h-full items-end">
                             {[0.4, 0.8, 0.6, 1, 0.7, 0.9].map((h, i) => (
                                <motion.div key={i} initial={{ height: 0 }} whileInView={{ height: `${h * 100}%` }} className="bg-indigo-500/50 rounded-t-lg" />
                             ))}
                          </div>
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </div>

        {/* PRICING */}
        <div className="mb-48 px-4 md:px-0">
           <div className="text-center max-w-2xl mx-auto mb-20">
              <h2 className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.4em] mb-4 font-bold">Scaling Tiers</h2>
              <p className="text-4xl md:text-6xl font-black text-slate-900 leading-tight">Investment for <span className="text-slate-400">sovereignty.</span></p>
           </div>

           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {pricing?.map((tier, idx) => (
                 <div key={idx} className={`bg-white rounded-[3rem] p-12 border ${tier.highlight ? "border-indigo-600 shadow-2xl shadow-indigo-600/10 -translate-y-4" : "border-slate-100 shadow-xl shadow-slate-200/50"} flex flex-col h-full relative overflow-hidden group transition-all`}>
                    <h4 className="text-3xl font-black text-slate-900 mb-2 uppercase tracking-tighter">{tier.t}</h4>
                    <p className="text-5xl font-black text-slate-900 mb-12">{tier.p}</p>

                    <div className="space-y-5 mb-12 flex-1">
                       {tier.list?.map(item => (
                          <div key={item} className="flex gap-3 items-center text-slate-500 text-sm font-light">
                             <IoCheckmarkCircleOutline className={`text-indigo-600 text-lg shrink-0`} /> {item}
                          </div>
                       ))}
                    </div>

                    <button className={`w-full py-6 rounded-2xl font-black uppercase tracking-widest text-xs transition-all shadow-xl shadow-slate-200/50 ${tier.highlight ? "bg-indigo-600 text-white shadow-indigo-600/30 font-black" : "bg-slate-900 text-white hover:bg-indigo-600 font-black"}`}>Initialize Build</button>
                 </div>
              ))}
           </div>
        </div>

        {/* CTA */}
        <div className="text-center py-40 border-t border-slate-100 px-4 md:px-0">
           <IoLayersOutline className="text-7xl text-indigo-600 mb-12 mx-auto opacity-10" />
           <h3 className="text-5xl lg:text-7xl font-black text-slate-900 mb-12 leading-tight">{cta.title?.split('your ')[0]}your <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-700 font-serif italic font-medium">{cta.title?.split('your ')[1]}</span></h3>
           <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button className="w-full sm:w-[280px] px-8 py-6 bg-indigo-600 text-white font-black rounded-xl hover:bg-indigo-700 transition-all shadow-2xl shadow-indigo-600/40 uppercase tracking-widest text-[10px] flex items-center justify-center">
                Initialize Build
              </button>
              <Link
                href="/services/erp-crm/details"
                className="w-full sm:w-[280px] px-8 py-6 bg-slate-900 text-white font-black rounded-xl hover:bg-slate-800 transition-all uppercase tracking-widest text-[10px] flex items-center justify-center text-center"
              >
                Technical Specifications
              </Link>
           </div>
        </div>
      </div>
    </section>
  );
}
