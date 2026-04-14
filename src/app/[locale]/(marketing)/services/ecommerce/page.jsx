"use client";

import { useState, useEffect } from "react";
import { 
  IoCartOutline, 
  IoCheckmarkCircleOutline, 
  IoGlobeOutline,
  IoCardOutline,
  IoGitNetworkOutline,
  IoShieldOutline,
  IoBagCheckOutline,
  IoPeopleOutline
} from "react-icons/io5";
import { motion } from "framer-motion";
import Link from "next/link";
import api from "@/lib/api";
import { getIcon } from "@/lib/icons";

export default function EcommercePage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get("/cms/services/web-software/ecommerce");
        if (res.data.data) {
          setData(res.data.data.landing);
        }
      } catch (err) {
        console.error("Failed to load ecommerce data", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div className="min-h-screen bg-slate-50 flex items-center justify-center font-black animate-pulse text-rose-500 uppercase tracking-widest">INITIALIZING COMMERCE ENGINE...</div>;
  if (!data) return null;

  const { hero = {}, sections = {}, cta = {} } = data;
  const verticals = sections.verticals || [];
  const integrations = sections.integrations || [];
  const pricing = sections.pricing || [];

  return (
    <section className="min-h-screen bg-slate-50 text-slate-900 selection:bg-rose-600 selection:text-white overflow-hidden relative">
      {/* INDUSTRIAL OVERLAY */}
      <div className="absolute top-0 opacity-10 pointer-events-none -z-10 w-full h-full">
         <div className="absolute top-0 left-1/4 w-[1px] h-full bg-slate-200"></div>
         <div className="absolute top-0 right-1/4 w-[1px] h-full bg-slate-200"></div>
         <div className="absolute top-1/2 left-0 w-full h-[1px] bg-slate-200"></div>
      </div>

      <div className="container-custom py-20 relative z-10">
        {/* ECOMMERCE HERO */}
        <div className="flex flex-col lg:flex-row items-center gap-20 mb-48 px-4 md:px-0">
          <div className="flex-1 text-left">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-rose-50 border border-rose-100 text-rose-700 text-[10px] font-black tracking-[0.4em] uppercase mb-10"
            >
              <IoCartOutline className="text-sm" /> {hero.badge}
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "circOut" }}
              className="text-5xl md:text-8xl font-black text-slate-900 leading-[0.9] mb-8 tracking-tighter"
            >
              {hero.title?.split(" ")[0]} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-rose-500 to-indigo-500 animate-gradient-x">{hero.subtitle}</span>
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
              <button className="w-full sm:w-[280px] px-8 py-6 bg-rose-600 text-white font-black rounded-xl hover:bg-rose-700 transition-all shadow-2xl shadow-rose-600/20 uppercase tracking-widest text-[10px] flex items-center justify-center">
                Initialize Storefront
              </button>
              <Link
                href="/services/ecommerce/details"
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
              className="relative p-12 bg-white rounded-[4rem] border border-slate-100 shadow-2xl overflow-hidden"
            >
               <div className="absolute inset-x-0 top-1/2 h-[1px] bg-slate-100"></div>
               <div className="absolute inset-y-0 left-1/2 w-[1px] bg-slate-100"></div>
               
               <div className="grid grid-cols-2 gap-8 relative z-10 aspect-square">
                  <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 4, repeat: Infinity }} className="p-8 bg-rose-50 rounded-3xl border border-rose-100 flex flex-col justify-between shadow-sm shadow-rose-100">
                     <div className="w-10 h-10 bg-rose-600 rounded-xl"></div>
                     <div className="space-y-2">
                        <div className="h-1.5 w-full bg-rose-200 rounded-full"></div>
                        <div className="h-1.5 w-3/4 bg-rose-200 rounded-full"></div>
                     </div>
                  </motion.div>
                  <motion.div animate={{ y: [10, 0, 10] }} transition={{ duration: 4, repeat: Infinity }} className="p-8 bg-slate-900 rounded-3xl flex flex-col justify-end">
                     <div className="h-10 bg-white/10 rounded-full flex items-center justify-center text-[10px] font-black text-rose-400">SECURE_SYNC</div>
                  </motion.div>
                  <motion.div className="col-span-2 p-8 bg-white rounded-3xl border border-slate-100 shadow-xl flex items-center justify-between">
                     <div className="flex gap-2">
                        <div className="w-8 h-8 rounded-full bg-rose-100"></div>
                        <div className="w-8 h-8 rounded-full bg-slate-100"></div>
                     </div>
                     <div className="w-32 h-6 bg-slate-50 rounded-full"></div>
                  </motion.div>
               </div>
            </motion.div>
          </div>
        </div>

        {/* SERVICE VERTICALS */}
        <div className="mb-48 px-4 md:px-0">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8 border-l-4 border-rose-600 pl-8">
            <div className="max-w-xl">
              <h2 className="text-[10px] font-black text-rose-600 uppercase tracking-[0.4em] mb-4 font-bold">Commerce Standard</h2>
              <p className="text-4xl md:text-6xl font-black text-slate-900 leading-tight">
                Architectures built for <span className="text-slate-400 italic font-serif font-light">transactional dominance.</span>
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
                <div className={`bg-white rounded-[3rem] p-12 h-full border ${item.border} shadow-sm shadow-slate-200/50 hover:shadow-2xl transition-all group-hover:-translate-y-2 relative overflow-hidden`}>
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

        {/* INTEGRATION HUB */}
        <div className="mb-48 bg-white rounded-[5rem] p-12 lg:p-24 border border-slate-100 shadow-2xl shadow-slate-200/50 relative overflow-hidden mx-4 md:mx-0">
           <div className="absolute top-0 right-0 w-1/3 h-full bg-rose-50/50 -skew-x-[20deg] origin-top translate-x-1/2 opacity-50"></div>
           
           <div className="grid lg:grid-cols-2 gap-20 items-center relative z-10">
              <div>
                 <h2 className="text-5xl lg:text-7xl font-black text-slate-900 leading-[0.9] mb-10">Atomic <br/><span className="text-rose-600 font-serif italic font-medium">Logistics.</span></h2>
                 <p className="text-slate-500 text-xl font-light leading-relaxed mb-12">We don't just bridge code; we bridge revenue. Every integration is engineered for zero-latency sync and absolute data integrity.</p>
                 
                 <div className="grid grid-cols-2 gap-6 pt-10 border-t border-slate-200">
                    {integrations?.map((int, i) => (
                       <div key={i} className="flex items-center gap-4 group">
                          <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center text-rose-500 border border-slate-100 group-hover:bg-rose-500 group-hover:text-white transition-all transform group-hover:rotate-6">
                             {getIcon(int.icon)}
                          </div>
                          <div>
                             <h4 className="text-[10px] font-black text-slate-900 uppercase tracking-widest">{int.t}</h4>
                             <p className="text-[10px] text-slate-400 font-bold">{int.d}</p>
                          </div>
                       </div>
                    ))}
                 </div>
              </div>

              <div className="relative group lg:scale-110">
                 <div className="p-12 bg-slate-900 rounded-[4rem] text-white shadow-2xl relative overflow-hidden">
                    <div className="flex justify-between items-center mb-16 border-b border-white/5 pb-8 font-mono text-[8px] tracking-[0.4em] text-white/40">
                       <span>HUB_ID_PROX_88</span>
                       <span>CORE_STATUS::UP</span>
                    </div>
                    
                    <div className="space-y-8">
                       <div className="flex items-center gap-6">
                          <div className="w-12 h-12 bg-rose-500 rounded-2xl flex items-center justify-center text-white text-2xl"><IoGitNetworkOutline /></div>
                          <div className="flex-1 space-y-2">
                             <div className="h-1.5 bg-white/10 rounded-full w-full"></div>
                             <div className="h-1.5 bg-white/5 rounded-full w-1/2"></div>
                          </div>
                       </div>
                       <div className="p-8 bg-white/5 rounded-3xl border border-white/5">
                          <p className="text-emerald-400 font-mono text-[10px] mb-4 tracking-tighter">DATALOAD::VERIFIED</p>
                          <div className="flex gap-4">
                             {[1,2,3,4].map(i => <div key={i} className="h-8 flex-1 bg-white/5 rounded-lg border border-white/5"></div>)}
                          </div>
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </div>

        {/* PRICING */}
        <div className="mb-48 px-4 md:px-0">
           <div className="text-center max-w-2xl mx-auto mb-20 text-center">
              <h2 className="text-[10px] font-black text-rose-600 uppercase tracking-[0.4em] mb-4 font-bold">Commerce Tiers</h2>
              <p className="text-4xl md:text-6xl font-black text-slate-900 leading-tight">Select your <span className="text-slate-400">market engine.</span></p>
           </div>

           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {pricing?.map((tier, idx) => (
                 <div key={idx} className={`bg-white rounded-[3rem] p-12 border ${tier.highlight ? "border-rose-500 shadow-2xl shadow-rose-500/10 -translate-y-4" : "border-slate-100 shadow-xl shadow-slate-200/50"} flex flex-col h-full relative overflow-hidden group transition-all`}>
                    <h4 className="text-3xl font-black text-slate-900 mb-2 uppercase tracking-tighter">{tier.t}</h4>
                    <p className="text-5xl font-black text-slate-900 mb-12">{tier.p}</p>

                    <div className="space-y-5 mb-12 flex-1">
                       {tier.list?.map(item => (
                          <div key={item} className="flex gap-3 items-center text-slate-500 text-sm font-light">
                             <IoCheckmarkCircleOutline className={`text-rose-600 text-lg shrink-0`} /> {item}
                          </div>
                       ))}
                    </div>

                    <button className={`w-full py-6 rounded-2xl font-black uppercase tracking-widest text-xs transition-all shadow-xl shadow-slate-200/50 ${tier.highlight ? "bg-rose-600 text-white shadow-rose-600/30" : "bg-slate-900 text-white hover:bg-rose-600 font-black"}`}>Initialize Build</button>
                 </div>
              ))}
           </div>
        </div>

        {/* CTA */}
        <div className="text-center py-40 border-t border-slate-100 px-4 md:px-0">
           <IoBagCheckOutline className="text-7xl text-rose-600 mb-12 mx-auto opacity-10" />
           <h3 className="text-5xl lg:text-7xl font-black text-slate-900 mb-12 leading-tight">{cta.title?.split('your ')[0]}your <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-600 to-indigo-600 font-serif italic font-medium">{cta.title?.split('your ')[1]}</span></h3>
           <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button className="w-full sm:w-[280px] px-8 py-6 bg-rose-600 text-white font-black rounded-xl hover:bg-rose-700 transition-all shadow-2xl shadow-rose-600/40 uppercase tracking-widest text-[10px] flex items-center justify-center">
                Initialize Build
              </button>
              <Link
                href="/services/ecommerce/details"
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
