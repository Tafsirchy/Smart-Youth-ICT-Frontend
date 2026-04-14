"use client";

import { useState, useEffect } from "react";
import { 
  IoCubeOutline, 
  IoShieldCheckmarkOutline, 
  IoSyncOutline, 
  IoCheckmarkCircleOutline,
  IoCodeSlashOutline,
  IoRocketOutline
} from "react-icons/io5";
import { motion } from "framer-motion";
import Link from "next/link";
import api from "@/lib/api";
import { getIcon } from "@/lib/icons";

export default function CustomAppsPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get("/cms/services/web-software/custom-apps");
        if (res.data.data) {
          setData(res.data.data.landing);
        }
      } catch (err) {
        console.error("Failed to load custom apps data", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div className="min-h-screen bg-slate-50 flex items-center justify-center font-black animate-pulse text-violet-500 uppercase tracking-widest">INITIALIZING BESPOKE ENGINE...</div>;
  if (!data) return null;

  const { hero = {}, sections = {}, cta = {} } = data;
  const verticals = sections.verticals || [];
  const integrations = sections.integrations || [];
  const pricing = sections.pricing || [];

  return (
    <section className="min-h-screen bg-slate-50 text-slate-900 selection:bg-violet-600 selection:text-white overflow-hidden relative font-sans">
      {/* INDUSTRIAL OVERLAY */}
      <div className="absolute top-0 opacity-10 pointer-events-none -z-10 w-full h-full">
         <div className="absolute top-0 left-1/4 w-[1px] h-full bg-slate-200"></div>
         <div className="absolute top-0 right-1/4 w-[1px] h-full bg-slate-200"></div>
         <div className="absolute top-1/2 left-0 w-full h-[1px] bg-slate-200"></div>
      </div>

      <div className="container-custom py-20 relative z-10">
        {/* CUSTOM APPS HERO */}
        <div className="flex flex-col lg:flex-row items-center gap-20 mb-48 px-4 md:px-0">
          <div className="flex-1 text-left">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-violet-50 border border-violet-100 text-violet-700 text-[10px] font-black tracking-[0.4em] uppercase mb-10"
            >
              <IoRocketOutline className="text-sm" /> {hero.badge}
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "circOut" }}
              className="text-5xl md:text-8xl font-black text-slate-900 leading-[0.9] mb-8 tracking-tighter"
            >
              {hero.title?.split(" ")[0]} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-indigo-600 animate-gradient-x">{hero.subtitle}</span>
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
              <button className="w-full sm:w-[280px] px-8 py-6 bg-violet-600 text-white font-black rounded-xl hover:bg-violet-700 transition-all shadow-2xl shadow-violet-600/20 uppercase tracking-widest text-[10px] flex items-center justify-center">
                Initialize Product Brief
              </button>
              <Link
                href="/services/custom-apps/details"
                className="w-full sm:w-[280px] px-8 py-6 bg-white border border-slate-200 text-slate-900 font-black rounded-xl hover:bg-slate-50 transition-all uppercase tracking-widest text-[10px] flex items-center justify-center text-center"
              >
                Technical Specifications
              </Link>
            </div>
          </div>

          <div className="flex-1 relative hidden lg:block">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1 }}
              className="relative p-12 bg-white rounded-[4rem] border border-slate-100 shadow-2xl overflow-hidden group"
            >
               <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: "linear-gradient(#4f46e5 1px, transparent 1px), linear-gradient(90deg, #4f46e5 1px, transparent 1px)", backgroundSize: "40px 40px" }}></div>
               
               <div className="grid grid-cols-2 gap-8 relative z-10 aspect-square">
                  <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 4, repeat: Infinity }} className="p-8 bg-violet-50 rounded-3xl border border-violet-100 flex flex-col justify-between shadow-sm">
                     <div className="w-10 h-10 bg-violet-600 rounded-xl shadow-lg shadow-violet-200"></div>
                     <div className="space-y-2">
                        <div className="h-1.5 w-full bg-violet-200 rounded-full"></div>
                        <div className="h-1.5 w-3/4 bg-violet-200 rounded-full"></div>
                     </div>
                  </motion.div>
                  <motion.div animate={{ y: [10, 0, 10] }} transition={{ duration: 4, repeat: Infinity }} className="p-8 bg-slate-900 rounded-3xl flex flex-col justify-end shadow-xl">
                     <div className="h-10 bg-white/10 rounded-full flex items-center justify-center text-[10px] font-black text-violet-400">ENGINE_SYNC</div>
                  </motion.div>
                  <motion.div className="col-span-2 p-10 bg-white rounded-[2.5rem] border border-slate-100 shadow-xl flex items-center justify-between">
                     <div className="flex gap-3">
                        <div className="w-6 h-6 bg-violet-500 rounded-full"></div>
                        <div className="w-6 h-6 bg-indigo-500 rounded-full"></div>
                        <div className="w-6 h-6 bg-slate-200 rounded-full"></div>
                     </div>
                     <div className="w-32 h-6 bg-slate-50 rounded-full border border-slate-100 flex items-center justify-center">
                        <div className="w-24 h-1.5 bg-slate-200 rounded-full"></div>
                     </div>
                  </motion.div>
               </div>

               <div className="absolute top-4 left-1/2 -translate-x-1/2 font-mono text-[8px] text-slate-400 uppercase tracking-widest bg-white px-4">
                  LOGIC_SPEC_v4.2.0
               </div>
            </motion.div>
          </div>
        </div>

        {/* SERVICE VERTICALS */}
        <div className="mb-48 px-4 md:px-0">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8 border-l-4 border-violet-600 pl-8">
            <div className="max-w-xl">
              <h2 className="text-[10px] font-black text-violet-600 uppercase tracking-[0.4em] mb-4 font-bold">Custom Engineering</h2>
              <p className="text-4xl md:text-6xl font-black text-slate-900 leading-tight">
                Architectures built for <span className="text-slate-400 italic font-serif font-light">sovereignty.</span>
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

        {/* TECH STACK HUB */}
        <div className="mb-48 bg-white rounded-[5rem] p-12 lg:p-24 border border-slate-100 shadow-2xl shadow-slate-200/50 relative overflow-hidden mx-4 md:mx-0">
           <div className="absolute top-0 right-0 w-1/3 h-full bg-violet-50/50 -skew-x-[20deg] origin-top translate-x-1/2 opacity-50"></div>
           
           <div className="grid lg:grid-cols-2 gap-20 items-center relative z-10">
              <div>
                 <h2 className="text-5xl lg:text-7xl font-black text-slate-900 leading-[0.9] mb-10">Atomic <br/><span className="text-violet-600 font-serif italic font-medium">Infrastructure.</span></h2>
                 <p className="text-slate-500 text-xl font-light leading-relaxed mb-12">We don't use templates. We engineer logic. Every application is built with a bespoke tech stack optimized for performance and horizontal scale.</p>
                 
                 <div className="grid grid-cols-2 gap-6 pt-10 border-t border-slate-200">
                    {integrations?.map((int, i) => (
                       <div key={i} className="space-y-4">
                          <h4 className="text-[10px] font-black text-slate-900 uppercase tracking-widest">{int.group}</h4>
                          <div className="flex flex-wrap gap-2">
                             {int.tags?.map(tag => (
                                <span key={tag} className="px-3 py-1 bg-slate-50 border border-slate-100 rounded-full text-[9px] font-bold text-slate-500">{tag}</span>
                             ))}
                          </div>
                       </div>
                    ))}
                 </div>
              </div>

              <div className="relative group lg:scale-110">
                 <div className="p-12 bg-slate-900 rounded-[4rem] text-white shadow-2xl relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="flex justify-between items-center mb-16 border-b border-white/5 pb-8 font-mono text-[8px] tracking-[0.4em] text-white/40">
                       <span>SYS_LOGIC_PROX</span>
                       <span>CORE_STATUS::READY</span>
                    </div>
                    
                    <div className="space-y-8">
                       <div className="flex items-center gap-6">
                          <div className="w-12 h-12 bg-violet-500 rounded-2xl flex items-center justify-center text-white text-2xl"><IoCodeSlashOutline /></div>
                          <div className="flex-1 space-y-2">
                             <div className="h-1.5 bg-white/10 rounded-full w-full"></div>
                             <div className="h-1.5 bg-white/5 rounded-full w-1/3"></div>
                          </div>
                       </div>
                       <div className="p-8 bg-white/5 rounded-3xl border border-white/5 relative overflow-hidden flex flex-col items-center justify-center">
                          <IoSyncOutline className="text-4xl text-violet-500 animate-spin-slow opacity-50" />
                          <p className="text-[8px] font-mono text-emerald-400 mt-4 tracking-tighter">DATASTREAM::VERIFIED</p>
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </div>

        {/* PRICING */}
        <div className="mb-48 px-4 md:px-0">
           <div className="text-center max-w-2xl mx-auto mb-20">
              <h2 className="text-[10px] font-black text-violet-600 uppercase tracking-[0.4em] mb-4 font-bold">Scaling Tiers</h2>
              <p className="text-4xl md:text-6xl font-black text-slate-900 leading-tight">Structured for <span className="text-slate-400">every evolution.</span></p>
           </div>

           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {pricing?.map((tier, idx) => (
                 <div key={idx} className={`bg-white rounded-[3rem] p-12 border ${tier.highlight ? "border-violet-600 shadow-2xl shadow-violet-600/10 -translate-y-4" : "border-slate-100 shadow-xl shadow-slate-200/50"} flex flex-col h-full relative overflow-hidden group transition-all`}>
                    <h4 className="text-3xl font-black text-slate-900 mb-2 uppercase tracking-tighter">{tier.t}</h4>
                    <p className="text-5xl font-black text-slate-900 mb-12">{tier.p}</p>

                    <div className="space-y-5 mb-12 flex-1">
                       {tier.list?.map(item => (
                          <div key={item} className="flex gap-3 items-center text-slate-500 text-sm font-light">
                             <IoCheckmarkCircleOutline className={`text-violet-600 text-lg shrink-0`} /> {item}
                          </div>
                       ))}
                    </div>

                    <button className={`w-full py-6 rounded-2xl font-black uppercase tracking-widest text-xs transition-all shadow-xl shadow-slate-200/50 ${tier.highlight ? "bg-violet-600 text-white shadow-violet-600/30" : "bg-slate-900 text-white hover:bg-violet-600 font-black"}`}>Initialize Build</button>
                 </div>
              ))}
           </div>
        </div>

        {/* CTA */}
        <div className="text-center py-40 border-t border-slate-100 px-4 md:px-0">
           <IoCubeOutline className="text-7xl text-violet-600 mb-12 mx-auto opacity-10" />
           <h3 className="text-5xl lg:text-7xl font-black text-slate-900 mb-12 leading-tight">{cta.title?.split('your ')[0]}your <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-indigo-600 font-serif italic font-medium">{cta.title?.split('your ')[1]}</span></h3>
           <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button className="w-full sm:w-[280px] px-8 py-6 bg-violet-600 text-white font-black rounded-xl hover:bg-violet-700 transition-all shadow-2xl shadow-violet-600/40 uppercase tracking-widest text-[10px] flex items-center justify-center">
                Initialize Build
              </button>
              <Link
                href="/services/custom-apps/details"
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
