"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { 
  IoArrowBackOutline, 
  IoSparklesOutline,
  IoCheckmarkCircleOutline,
  IoFlashOutline
} from "react-icons/io5";

export default function UiUxDetailsClient({ data }) {
  if (!data) return null;

  const { hero, sections, cta } = data.details;

  return (
    <section className="min-h-screen bg-slate-50 text-slate-900 selection:bg-cyan-600 selection:text-white pb-40 relative font-sans">
      {/* PERSISTENT BREADCRUMB */}
      <div className="border-b border-slate-200 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container-custom py-4 flex items-center justify-between">
          <Link href="/services/ui-ux" className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-cyan-600 transition-colors">
            <IoArrowBackOutline className="text-sm" /> Design Overview
          </Link>
          <div className="text-[10px] font-black uppercase tracking-[0.4em] text-cyan-600">DESIGN_SPEC_v4.2</div>
        </div>
      </div>

      <div className="container-custom pt-20">
        <div className="max-w-5xl mb-32 px-4 md:px-0 relative">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-4 text-cyan-600 mb-8">
            <div className="w-12 h-[1px] bg-cyan-600"></div>
            <span className="text-[10px] font-black uppercase tracking-[0.4em]">{hero.badge}</span>
          </motion.div>
          <h1 className="text-5xl md:text-[6rem] font-black text-slate-900 leading-[0.9] mb-10 tracking-tighter uppercase whitespace-pre-line">
            {hero.title?.split(' ').slice(0, 1)} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 animate-gradient-x">{hero.title?.split(' ').slice(1).join(' ')}</span>
          </h1>
          <div className="flex flex-col md:flex-row gap-12 items-start mt-20">
             <div className="flex-1">
                <p className="text-slate-600 text-2xl font-light leading-relaxed mb-10 italic">
                  &quot;{hero.description}&quot;
                </p>
                <div className="h-1 w-20 bg-cyan-600/20" />
             </div>
             <div className="w-full md:w-80 bg-white p-8 rounded-3xl border border-slate-100 shadow-xl">
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6 px-1">Cognitive Pulse</h4>
                <div className="space-y-4">
                   {["Usability Score", "Conversion Logic", "Atomic Scaling"].map(label => (
                      <div key={label} className="space-y-1.5">
                         <div className="flex justify-between text-[9px] font-bold text-slate-500 uppercase">
                            <span>{label}</span>
                            <span>98%</span>
                         </div>
                         <div className="h-1 bg-slate-50 rounded-full overflow-hidden">
                            <motion.div initial={{ width: 0 }} whileInView={{ width: "98%" }} transition={{ duration: 1 }} className="h-full bg-cyan-500" />
                         </div>
                      </div>
                   ))}
                </div>
             </div>
          </div>
        </div>

        {/* 6-PHASE DESIGN PROTOCOL */}
        <div className="mb-48 px-4 md:px-0">
          <div className="flex items-center gap-6 mb-16">
            <h2 className="text-3xl font-black text-slate-900 tracking-tighter uppercase leading-none italic">The Design Protocol</h2>
            <div className="h-[1px] flex-1 bg-slate-200"></div>
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">v4.2 Lifecycle</span>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-slate-200 border border-slate-200 rounded-[3.5rem] overflow-hidden shadow-2xl">
            {(sections.phases || []).map((phase, idx) => (
              <div key={idx} className="bg-white p-12 hover:bg-slate-50 transition-all group relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 text-4xl font-black text-slate-50 group-hover:text-cyan-50 transition-colors select-none">{phase.step}</div>
                <div className="relative z-10">
                   <h4 className="text-[10px] font-black text-cyan-600 uppercase tracking-[0.4em] mb-4">{phase.stage}</h4>
                   <p className="text-lg text-slate-500 font-light leading-relaxed">{phase.action}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ARCHITECTURAL FRAMEWORKS */}
        <div className="mb-48 px-4 md:px-0">
           <div className="flex flex-col md:flex-row gap-12 items-baseline mb-20">
              <h2 className="text-[10px] font-black text-cyan-600 uppercase tracking-[0.4em] border-l-4 border-cyan-600 pl-4">Architectural Frameworks</h2>
           </div>

           <div className="grid lg:grid-cols-3 gap-8">
              {(sections.roi || []).map((group, idx) => (
                 <div key={idx} className="bg-white rounded-[3rem] p-12 border border-slate-100 shadow-xl shadow-slate-200/50 hover:shadow-2xl transition-all group">
                    <div className="w-12 h-12 bg-cyan-50 rounded-xl flex items-center justify-center text-2xl text-cyan-600 mb-8 group-hover:scale-110 transition-transform"><IoFlashOutline /></div>
                    <h3 className="text-xl font-black text-slate-900 mb-8 tracking-tighter uppercase">{group.group}</h3>
                    <ul className="space-y-4">
                       {group.items?.map(item => (
                          <li key={item} className="flex items-center gap-3 text-slate-500 text-[11px] font-bold uppercase tracking-wider">
                             <IoCheckmarkCircleOutline className="text-cyan-500 text-lg shrink-0" /> {item}
                          </li>
                       ))}
                    </ul>
                 </div>
              ))}
           </div>
        </div>

        {/* FINAL CTA RIBBON */}
        <div className="text-center py-40 border-t border-slate-200 px-4 md:px-0">
           <IoSparklesOutline className="text-7xl text-cyan-600 mb-12 mx-auto opacity-20" />
           <h3 className="text-5xl lg:text-7xl font-black text-slate-900 mb-12 leading-tight">
              {cta.title?.includes('your ') ? (
                <>
                  {cta.title.split('your ')[0]}your <br/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-indigo-600 font-serif italic font-medium">
                    {cta.title.split('your ')[1]}
                  </span>
                </>
              ) : (
                <>
                  Ready to activate your <br/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-indigo-600 font-serif italic font-medium">
                    {cta.title}
                  </span>
                </>
              )}
           </h3>
           <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button className="w-full sm:w-[280px] px-8 py-6 bg-cyan-600 text-white font-black rounded-xl hover:bg-cyan-700 transition-all shadow-2xl shadow-cyan-600/40 uppercase tracking-widest text-[10px] flex items-center justify-center">
                Initialize Product Audit
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
