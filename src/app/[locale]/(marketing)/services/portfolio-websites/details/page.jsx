"use client";

import { useState, useEffect } from "react";
import { 
  IoArrowBackOutline, 
  IoCheckmarkCircleOutline, 
  IoFlashOutline, 
  IoShieldCheckmarkOutline, 
  IoGlobeOutline, 
  IoCodeSlashOutline,
  IoLayersOutline
} from "react-icons/io5";
import { motion } from "framer-motion";
import Link from "next/link";
import api from "@/lib/api";
import { getIcon } from "@/lib/icons";

export default function PortfolioDetailsPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get("/cms/services/web-software/portfolio-websites");
        if (res.data.data) {
          setData(res.data.data.details);
        }
      } catch (err) {
        console.error("Failed to load portfolio details", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div className="min-h-screen bg-[#fafafa] flex items-center justify-center font-black animate-pulse text-slate-300 uppercase tracking-widest">INITIALIZING DETAIL VAULT...</div>;
  if (!data) return null;

  const { hero = {}, sections = {}, cta = {} } = data;
  const techStack = sections.techStack || [];
  const checklist = sections.checklist || [];
  const codeSnippet = sections.codeSnippet || {};

  return (
    <section className="min-h-screen bg-white text-slate-900 selection:bg-rose-500 selection:text-white pb-40">
      {/* PERSISTENT BREADCRUMB */}
      <div className="border-b border-slate-100 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container-custom py-4 flex items-center justify-between">
          <Link href="/services/portfolio-websites" className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-rose-500 transition-colors">
            <IoArrowBackOutline className="text-sm" /> Infrastructure Overview
          </Link>
          <div className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">SPEC_LOG_v2.1</div>
        </div>
      </div>

      <div className="container-custom pt-20">
        <div className="max-w-5xl mb-32">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-4 text-emerald-600 mb-8">
            <div className="w-12 h-[1px] bg-emerald-600"></div>
            <span className="text-[10px] font-black uppercase tracking-[0.4em]">{hero.badge}</span>
          </motion.div>
          <h1 className="text-5xl md:text-8xl font-black text-slate-900 leading-[0.9] mb-8 tracking-tighter">
            {hero.title} <br />
            <span className="text-slate-200">{hero.subtitle}</span>
          </h1>
          <p className="text-slate-500 text-xl font-light leading-relaxed max-w-2xl">
            {hero.description}
          </p>
        </div>

        {/* TECH STACK BENTO */}
        <div className="grid md:grid-cols-3 gap-1 mb-48 bg-slate-100 border border-slate-100 rounded-[3rem] overflow-hidden shadow-2xl shadow-slate-200/50">
           {techStack?.map((tech, idx) => (
              <div key={idx} className={`${tech.color} ${tech.colSpan || ""} p-12 flex flex-col justify-between group hover:grayscale transition-all duration-700`}>
                 <div className="text-white/20 text-5xl mb-20 group-hover:text-white transition-colors">
                    {getIcon(tech.icon)}
                 </div>
                 <div>
                    <h4 className="text-white text-2xl font-black mb-2">{tech.t}</h4>
                    <p className="text-white/60 text-sm font-light leading-relaxed max-w-sm">{tech.d}</p>
                 </div>
              </div>
           ))}
        </div>

        {/* CODE & CHECKLIST SECTION */}
        <div className="grid lg:grid-cols-2 gap-20 items-start mb-48 px-6 lg:px-0">
           <div className="sticky top-32">
              <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-3xl text-slate-900 mb-10 border border-slate-100 shadow-sm">
                <IoCodeSlashOutline />
              </div>
              <h2 className="text-5xl font-black text-slate-900 mb-8 tracking-tighter">{codeSnippet.title || "Architecturally Clean."}</h2>
              <p className="text-slate-500 text-lg font-light leading-relaxed mb-12">
                {codeSnippet.description}
              </p>
              
              <div className="flex flex-wrap gap-3">
                 {codeSnippet.tags?.map(tag => (
                    <span key={tag} className="px-5 py-2 rounded-full border border-slate-200 text-[10px] font-black uppercase tracking-widest text-slate-400">{tag}</span>
                 ))}
              </div>
           </div>

           <div className="bg-slate-900 rounded-[3.5rem] p-1 shadow-2xl">
              <div className="bg-slate-800 rounded-[3.2rem] p-8 lg:p-12 overflow-hidden relative">
                 <div className="flex items-center justify-between mb-8 border-b border-white/10 pb-6">
                    <span className="text-[10px] font-black text-rose-500 uppercase tracking-widest">{codeSnippet.fileName || "portfolio-config.ts"}</span>
                    <div className="flex gap-2">
                       <div className="w-2 h-2 rounded-full bg-slate-700"></div>
                       <div className="w-2 h-2 rounded-full bg-slate-700"></div>
                    </div>
                 </div>
                 <pre className="text-indigo-300 font-mono text-sm leading-relaxed overflow-x-auto selection:bg-rose-500">
                    <code>{codeSnippet.code}</code>
                 </pre>
                 
                 <div className="absolute bottom-0 right-0 p-10 opacity-10">
                    <IoInfiniteOutline className="text-9xl text-white" />
                 </div>
              </div>
           </div>
        </div>

        {/* CLIENT PREPARATION (CHECKLIST) */}
        <div className="mb-48">
           <div className="flex flex-col md:flex-row justify-between items-center mb-20 gap-8">
              <h2 className="text-4xl font-black text-slate-900 tracking-tighter">Prerequisites for <span className="text-slate-400">Production.</span></h2>
              <div className="h-[1px] flex-1 bg-slate-100 hidden md:block"></div>
           </div>

           <div className="grid md:grid-cols-2 gap-8">
              {checklist?.map((item, i) => (
                 <div key={i} className="flex gap-8 p-10 bg-slate-50 rounded-[2.5rem] border border-slate-100 group hover:bg-white hover:shadow-2xl hover:shadow-slate-200/50 transition-all">
                    <div className="text-emerald-500 text-2xl pt-1">
                       <IoCheckmarkCircleOutline />
                    </div>
                    <div>
                       <h5 className="text-xl font-bold text-slate-900 mb-2">{item.t}</h5>
                       <p className="text-slate-500 text-sm font-light leading-relaxed">{item.d}</p>
                    </div>
                 </div>
              ))}
           </div>
        </div>

        {/* CTA */}
        <div className="text-center py-40 border-t border-slate-100">
           <IoShieldCheckmarkOutline className="text-7xl text-slate-900 mb-12 mx-auto opacity-10" />
           <h3 className="text-5xl lg:text-7xl font-black text-slate-900 mb-12 leading-tight">{cta.title}</h3>
           <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button className="w-full sm:w-[280px] px-8 py-6 bg-rose-500 text-white font-black rounded-xl hover:bg-rose-600 transition-all shadow-2xl shadow-rose-500/40 uppercase tracking-widest text-[10px] flex items-center justify-center">
                Initialize Build
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
