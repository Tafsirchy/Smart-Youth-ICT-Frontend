"use client";

import { useState, useEffect } from "react";
import { 
  IoArrowBackOutline, 
  IoStatsChartOutline, 
  IoHardwareChipOutline, 
  IoCheckmarkCircleOutline, 
  IoShieldCheckmarkOutline
} from "react-icons/io5";
import { motion } from "framer-motion";
import Link from "next/link";
import api from "@/lib/api";
import { getIcon } from "@/lib/icons";

export default function CustomAppsDetailsPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get("/cms/services/web-software/custom-apps");
        if (res.data.data) {
          setData(res.data.data.details);
        }
      } catch (err) {
        console.error("Failed to load custom apps details", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div className="min-h-screen bg-slate-50 flex items-center justify-center font-black animate-pulse text-violet-500 uppercase tracking-widest">ACTIVATING DETAIL PROTOCOL...</div>;
  if (!data) return null;

  const { hero = {}, sections = {}, cta = {} } = data;
  const roi = sections.roi || [];
  const manifest = sections.manifest || [];
  const checklist = sections.checklist || [];

  return (
    <section className="min-h-screen bg-white text-slate-900 selection:bg-violet-600 selection:text-white pb-40">
      {/* PERSISTENT BREADCRUMB */}
      <div className="border-b border-slate-100 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container-custom py-4 flex items-center justify-between">
          <Link href="/services/custom-apps" className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-violet-600 transition-colors">
            <IoArrowBackOutline className="text-sm" /> Product Overview
          </Link>
          <div className="text-[10px] font-black uppercase tracking-[0.4em] text-violet-600">APP_SPEC_v4.2.0</div>
        </div>
      </div>

      <div className="container-custom pt-20">
        {/* TECH HEADER */}
        <div className="max-w-5xl mb-32 px-8 lg:px-0">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-4 text-emerald-600 mb-8"
          >
            <div className="w-12 h-[1px] bg-emerald-600"></div>
            <span className="text-[10px] font-black uppercase tracking-[0.4em]">{hero.badge}</span>
          </motion.div>
          <h1 className="text-5xl md:text-8xl font-black text-slate-900 leading-[0.9] mb-8 tracking-tighter">
            {hero.title?.split(' ')[0]} <br />
            <span className="text-slate-200">{hero.title?.split(' ').slice(1).join(' ')}</span>
          </h1>
          <p className="text-slate-500 text-xl font-light leading-relaxed max-w-2xl bg-slate-50 p-10 border-l-4 border-violet-600 rounded-r-3xl">
            {hero.description}
          </p>
        </div>

        {/* ROI VISUALIZER BENTO */}
        <div className="grid md:grid-cols-2 gap-1 mb-48 px-8 lg:px-0 bg-white border border-slate-100 rounded-[3rem] overflow-hidden shadow-2xl shadow-slate-200/50">
           {roi?.map((spec, idx) => (
              <div key={idx} className="p-10 border-b border-r border-slate-100 flex flex-col justify-between hover:bg-slate-50 transition-colors group">
                 <div className="flex justify-between items-start mb-16">
                    <div className="w-16 h-16 bg-violet-50 rounded-2xl flex items-center justify-center text-3xl text-violet-600 border border-violet-100 group-hover:bg-violet-600 group-hover:text-white transition-all">
                       {getIcon(spec.icon)}
                    </div>
                    <span className="text-[10px] font-black text-slate-300 group-hover:text-violet-200 transition-colors">KPI_SYNC_ACTIVE</span>
                 </div>
                 <div>
                    <h4 className="text-2xl font-black text-slate-900 mb-4 tracking-tighter uppercase">{spec.title}</h4>
                    <p className="text-slate-500 text-sm font-light leading-relaxed mb-8">{spec.desc}</p>
                    <div className="flex flex-wrap gap-2">
                       {spec.features?.map(f => (
                          <span key={f} className="px-3 py-1 bg-white border border-slate-200 rounded-full text-[10px] font-bold text-slate-500">{f}</span>
                       ))}
                    </div>
                 </div>
              </div>
           ))}
        </div>

        {/* TECHNICAL MANIFEST SECTION */}
        <div className="grid lg:grid-cols-2 gap-20 items-center mb-48 px-8 lg:px-0">
           <div className="relative group">
              <div className="p-12 bg-slate-900 rounded-[4rem] text-white overflow-hidden relative shadow-2xl">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-violet-600/20 blur-[80px]"></div>
                 <h3 className="text-3xl font-black mb-10 tracking-tighter flex items-center gap-4">
                    <IoHardwareChipOutline className="text-violet-500" /> Infrastructure Manifest
                 </h3>
                 <div className="space-y-4">
                    {manifest?.map((item, i) => (
                       <div key={i} className="flex justify-between items-center py-4 border-b border-white/5 group/row">
                          <span className="text-slate-500 text-[10px] font-black uppercase tracking-widest group-hover/row:text-violet-400 transition-colors">{item.label}</span>
                          <span className="text-sm font-bold text-white text-right">{item.value}</span>
                       </div>
                    ))}
                 </div>
              </div>
           </div>

           <div>
              <h2 className="text-5xl font-black text-slate-900 mb-8 tracking-tighter">Bespoke <br /> <span className="text-violet-600 font-serif italic font-medium">Engineering.</span></h2>
              <p className="text-slate-500 text-lg font-light leading-relaxed mb-10">We deliver more than code. We deliver a high-velocity product engine isolated from the common friction of monolithic application frameworks.</p>
              <div className="flex items-center gap-6 p-8 bg-violet-50 rounded-3xl border border-violet-100">
                 <div className="w-12 h-12 bg-violet-600 rounded-xl flex items-center justify-center text-white text-xl"><IoShieldCheckmarkOutline /></div>
                 <div>
                    <p className="text-xs font-black text-violet-900 uppercase tracking-widest">Logic Shield</p>
                    <p className="text-xs text-violet-600 font-bold">Encapsulated Runtime Active</p>
                 </div>
              </div>
           </div>
        </div>

        {/* PREREQUISITES GRID */}
        <div className="mb-48">
           <div className="flex flex-col md:flex-row justify-between items-center mb-20 gap-8 px-8 lg:px-0">
              <h2 className="text-4xl font-black text-slate-900 tracking-tighter">Application <span className="text-slate-400">Launch Artifacts.</span></h2>
              <div className="h-[1px] flex-1 bg-slate-100 hidden md:block"></div>
           </div>

           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-1 bg-slate-100 border border-slate-100 rounded-[3rem] overflow-hidden shadow-2xl">
              {checklist?.map((item, i) => (
                 <div key={i} className="p-12 bg-white flex flex-col justify-between hover:bg-slate-50 transition-colors group">
                    <IoCheckmarkCircleOutline className="text-emerald-500 text-2xl mb-12 group-hover:scale-125 transition-transform" />
                    <div>
                       <h5 className="text-xl font-bold text-slate-900 mb-4">{item.t}</h5>
                       <p className="text-slate-500 text-sm font-light leading-relaxed">{item.d}</p>
                    </div>
                 </div>
              ))}
           </div>
        </div>

        {/* CTA */}
        <div className="text-center py-40 border-t border-slate-100">
           <IoStatsChartOutline className="text-7xl text-violet-600 mb-12 mx-auto opacity-10" />
           <h3 className="text-5xl lg:text-7xl font-black text-slate-900 mb-12 leading-tight">{cta.title}</h3>
           <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button className="w-full sm:w-[280px] px-8 py-6 bg-violet-600 text-white font-black rounded-xl hover:bg-violet-700 transition-all shadow-2xl shadow-violet-600/40 uppercase tracking-widest text-[10px] flex items-center justify-center">
                Initialize Product Brief
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
