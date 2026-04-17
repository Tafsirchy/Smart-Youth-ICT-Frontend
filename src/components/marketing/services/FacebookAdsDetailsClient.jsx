"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { 
  IoArrowBackOutline, 
  IoAnalyticsOutline
} from "react-icons/io5";
import { getIcon } from "@/lib/icons";

export default function FacebookAdsDetailsClient({ data }) {
  if (!data) return null;

  const { hero, sections, cta } = data.details;
  const roi = sections.roi || [];

  return (
    <section className="min-h-screen bg-slate-50 text-slate-900 selection:bg-emerald-600 selection:text-white pb-40">
      {/* PERSISTENT BREADCRUMB */}
      <div className="border-b border-slate-200 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container-custom py-4 flex items-center justify-between">
          <Link href="/services/facebook-ads" className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-emerald-600 transition-colors">
            <IoArrowBackOutline className="text-sm" /> Performance Overview
          </Link>
          <div className="text-[10px] font-black uppercase tracking-[0.4em] text-emerald-600">ADS_SPEC_v6.4</div>
        </div>
      </div>

      <div className="container-custom pt-20">
        <div className="max-w-5xl mb-32 px-4 md:px-0">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-4 text-emerald-600 mb-8">
            <div className="w-12 h-[1px] bg-emerald-600"></div>
            <span className="text-[10px] font-black uppercase tracking-[0.4em]">{hero.badge}</span>
          </motion.div>
          <h1 className="text-5xl md:text-7xl font-black text-slate-900 leading-[1.1] mb-8 tracking-tighter">
            {hero.title?.split(' ')[0]} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-rose-500 to-indigo-500 animate-gradient-x">{hero.title?.split(' ').slice(1).join(' ')}</span>
          </h1>
          <p className="text-slate-600 text-xl font-light leading-relaxed max-w-2xl">
            {hero.description}
          </p>
        </div>

        {/* ROI / PILLARS SECTION */}
        <div className="grid lg:grid-cols-2 gap-12 mb-48 px-4 md:px-0">
           {roi?.map((item, idx) => (
              <div key={idx} className="bg-white rounded-[3rem] p-12 border border-slate-100 shadow-xl shadow-slate-200/50 hover:shadow-2xl transition-all">
                 <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center text-3xl text-emerald-600 mb-10 border border-emerald-100">
                    {getIcon(item.icon)}
                 </div>
                 <h3 className="text-2xl font-black text-slate-900 mb-6 tracking-tighter uppercase">{item.title}</h3>
                 <p className="text-slate-500 text-lg font-light leading-relaxed">{item.desc}</p>
              </div>
           ))}
        </div>

        {/* CTA */}
        <div className="text-center py-40 border-t border-slate-200 px-4 md:px-0">
           <IoAnalyticsOutline className="text-7xl text-emerald-600 mb-12 mx-auto opacity-20" />
           <h3 className="text-5xl lg:text-7xl font-black text-slate-900 mb-12 leading-tight">{cta.title?.split('your ')[0]}your <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-blue-700 font-serif italic font-medium">{cta.title?.split('your ')[1]}</span></h3>
           <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button className="w-full sm:w-[280px] px-8 py-6 bg-emerald-600 text-white font-black rounded-xl hover:bg-emerald-700 transition-all shadow-2xl shadow-emerald-600/40 uppercase tracking-widest text-[10px] flex items-center justify-center">
                Initialize Performance Audit
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
