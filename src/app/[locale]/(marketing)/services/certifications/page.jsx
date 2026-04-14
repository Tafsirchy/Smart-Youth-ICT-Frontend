"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { IoRibbonOutline, IoCheckmarkCircle, IoSearchOutline, IoShieldCheckmarkOutline } from "react-icons/io5";
import CertificationIllustration from "@/components/marketing/CertificationIllustration";
import api from "@/lib/api";

export default function CertificationsProgramsPage() {
  const [programs, setPrograms] = useState([]);
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [programsRes, contentRes] = await Promise.all([
        api.get("/cms/services/certifications"),
        api.get("/cms/services/content/certifications")
      ]);
      setPrograms(programsRes.data.data);
      setContent(contentRes.data.data);
    } catch (err) {
      console.error("Failed to load certifications data", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-slate-50 py-20 relative overflow-hidden">
      <div className="container-custom">
        <div className="flex flex-col lg:flex-row items-center gap-16 mb-32">
          {/* Hero Content */}
          <div className="lg:w-1/2 text-center lg:text-left pt-10">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-bold tracking-widest uppercase mb-6"
            >
              <IoRibbonOutline size={18} /> {content?.hero?.badge || "Official Validation"}
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl lg:text-8xl font-black text-slate-900 leading-[1.1] mb-8 tracking-tighter"
            >
              {content?.hero?.title || "Certification"} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-600 animate-gradient-x">
                {content?.hero?.subtitle || "Programs"}
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="text-slate-600 text-lg md:text-xl leading-relaxed max-w-2xl"
            >
              {content?.hero?.description || "Boost your resume instantly. Our certification programs assess your skills through rigorous practical exams."}
            </motion.p>
          </div>

          {/* Creative Illustration */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="lg:w-1/2 w-full"
          >
            <div className="relative group hover:scale-105 transition-transform duration-500">
               <div className="absolute inset-0 bg-emerald-600/10 blur-3xl rounded-[3rem] -z-10 animate-pulse"></div>
               <CertificationIllustration />
            </div>
          </motion.div>
        </div>


        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
           {loading ? (
             [1, 2, 3].map(i => (
               <div key={i} className="h-96 bg-white rounded-[3rem] animate-pulse border border-slate-100 shadow-xl shadow-slate-200/50" />
             ))
           ) : programs.length > 0 ? (
             programs.map((prog, i) => (
               <motion.div
                 key={prog._id}
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ delay: i * 0.1 }}
                 className="bg-white rounded-[3rem] p-8 border border-slate-100 shadow-xl shadow-slate-200/50 hover:shadow-2xl transition-all relative overflow-hidden group border-b-[6px] border-b-blue-600"
               >
                 <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-3xl text-blue-600 mb-8 group-hover:rotate-6 transition-transform">
                   <IoRibbonOutline />
                 </div>
                 <p className="text-[10px] font-black uppercase tracking-widest text-blue-500 mb-2">{prog.badgeText}</p>
                 <h2 className="text-2xl font-black text-slate-900 mb-4 leading-tight">{prog.title}</h2>
                 <p className="text-slate-500 text-sm font-light leading-relaxed mb-8">{prog.description}</p>
                 
                 <div className="space-y-3 mb-10 h-32 overflow-hidden">
                    {prog.features.map((f, idx) => (
                      <div key={idx} className="flex items-center gap-3 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                         <IoCheckmarkCircle className="text-blue-500 text-lg shrink-0" />
                         {f}
                      </div>
                    ))}
                 </div>

                 <button className="w-full py-4 bg-slate-900 text-white rounded-xl font-black uppercase tracking-widest text-[10px] hover:bg-black transition-all shadow-lg transform hover:-translate-y-1">
                    Apply for Assessment
                 </button>
               </motion.div>
             ))
           ) : (
             <div className="col-span-full py-32 bg-white rounded-[3rem] border border-slate-100 text-center shadow-2xl shadow-slate-100">
                <IoSearchOutline className="text-7xl text-slate-100 mx-auto mb-6" />
                <p className="text-slate-300 font-black uppercase tracking-[0.3em]">No Active Validation Programs</p>
                <p className="text-slate-400 text-sm mt-2">New certification cohorts are launching soon.</p>
             </div>
           )}
        </div>

        {/* Unified Verification CTA */}
        <div className="mt-48 text-center bg-white rounded-[4rem] p-12 lg:p-24 shadow-2xl border border-slate-50 relative overflow-hidden">
           <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-50 rounded-full blur-[150px] opacity-60 -translate-y-1/2 translate-x-1/2"></div>
           <div className="relative z-10">
              <IoShieldCheckmarkOutline className="text-8xl text-blue-600 mb-12 mx-auto" />
              <h3 className="text-4xl lg:text-7xl font-black mb-8 tracking-tighter leading-none text-slate-900">Industry-Grade <br/>Verification.</h3>
              <p className="text-slate-500 text-xl font-light mb-16 max-w-2xl mx-auto">Employers can verify our student credentials directly through our localized, high-authority registry.</p>
              <button className="px-12 py-6 bg-slate-900 text-white font-black rounded-xl hover:bg-black transition-all uppercase tracking-widest text-xs shadow-2xl">
                Access Student Registry
              </button>
           </div>
        </div>
      </div>
    </section>
  );
}
