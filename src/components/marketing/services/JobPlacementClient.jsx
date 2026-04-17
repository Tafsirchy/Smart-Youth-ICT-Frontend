"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { 
  IoBriefcaseOutline, 
  IoFlaskOutline, 
  IoChatbubblesOutline, 
  IoSearchOutline,
  IoPulseOutline,
  IoArrowBackOutline
} from "react-icons/io5";

export default function JobPlacementClient({ data, content }) {
  return (
    <section className="min-h-screen bg-slate-950 overflow-hidden relative font-sans text-slate-100">
      <div className="absolute inset-x-0 top-0 h-[800px] bg-gradient-to-b from-blue-900/30 via-transparent to-transparent pointer-events-none"></div>

      <div className="container-custom py-20 relative z-10">
        
        {/* Massive Hero Section */}
        <div className="max-w-4xl mx-auto text-center mb-32">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-blue-500/10 text-blue-400 text-xs font-black tracking-widest uppercase mb-8 border border-blue-500/20"
          >
            {content?.hero?.badge || "Your Career Launchpad"}
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-black text-white leading-[1.1] mb-8 tracking-tighter"
          >
            {content?.hero?.title || "Job Placement"} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-600 animate-gradient-x">
              {content?.hero?.subtitle || "Support Cell"}
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 text-xl md:text-3xl leading-relaxed font-light max-w-3xl mx-auto"
          >
            {content?.hero?.description || "Graduation is just the beginning. Our dedicated placement cell actively maps our top talent with hiring partners."}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="pt-12"
          >
            <Link 
              href="/services/job-placement/details"
              className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.4em] text-blue-400 hover:text-white transition-colors group"
            >
              View Placement Manifest <IoArrowBackOutline className="rotate-180 group-hover:translate-x-2 transition-transform" />
            </Link>
          </motion.div>
        </div>

        {data?.placements?.length > 0 ? (
          /* Target Classifications */
          <div className="mb-32">
            <h2 className="text-4xl font-black text-white text-center mb-16 uppercase italic tracking-tighter">Placement Track Classifications</h2>
            <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
               {data.placements.map((p, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[3rem] p-10 group hover:border-blue-500/50 transition-all overflow-hidden relative"
                  >
                    <div className={`absolute -right-10 -bottom-10 w-40 h-40 ${p.color} opacity-10 rounded-full blur-[60px] group-hover:opacity-30 transition-opacity`}></div>
                    
                    <div className={`w-16 h-16 rounded-2xl ${p.color} text-white flex items-center justify-center text-3xl mb-8 shadow-2xl`}>
                      <IoBriefcaseOutline />
                    </div>
                    <h3 className="text-2xl font-black text-white mb-2">{p.title}</h3>
                    <p className="text-[10px] font-black uppercase tracking-widest text-blue-400 mb-6">{p.type}</p>
                    <p className="text-slate-400 leading-relaxed font-light mb-8 text-sm line-clamp-3">{p.desc}</p>
                    
                    <div className="pt-6 border-t border-white/5">
                       <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Avg. Entry Package</p>
                       <p className="text-2xl font-black text-white">{p.avgSalary}</p>
                    </div>
                  </motion.div>
               ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-20 bg-white/5 rounded-[3rem] border border-white/10 mb-32 flex flex-col items-center">
             <IoPulseOutline className="text-5xl text-white/20 mb-6 animate-pulse" />
             <p className="text-white/40 font-black uppercase tracking-widest leading-none">Job Channels Ready</p>
          </div>
        )}

        {/* The Lifecycle */}
        {data?.lifecycle?.length > 0 && (
          <div className="mb-32 max-w-5xl mx-auto">
            <h2 className="text-4xl lg:text-5xl font-black text-white text-center mb-20 leading-tight">The Recruitment <span className="text-blue-500">Lifecycle.</span></h2>
            <div className="space-y-12 relative">
               <div className="absolute left-6 top-10 bottom-10 w-px bg-white/10 hidden md:block"></div>
               {data.lifecycle.map((l, i) => (
                 <motion.div
                   key={i}
                   initial={{ opacity: 0, x: -20 }}
                   whileInView={{ opacity: 1, x: 0 }}
                   viewport={{ once: true }}
                   transition={{ delay: i * 0.1 }}
                   className="flex flex-col md:flex-row gap-8 items-start relative z-10"
                 >
                   <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white font-black shrink-0 shadow-xl shadow-blue-600/30">
                     {i + 1}
                   </div>
                   <div className="flex-1">
                      <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                         <h3 className="text-2xl font-black text-white tracking-tight">{l.title}</h3>
                         <span className="text-[10px] font-black text-blue-500 uppercase tracking-[0.2em] bg-blue-500/10 px-3 py-1 rounded-md">{l.step}</span>
                      </div>
                      <p className="text-slate-400 text-lg font-light leading-relaxed max-w-3xl">{l.d}</p>
                   </div>
                 </motion.div>
               ))}
            </div>
          </div>
        )}

        {/* Interview Labs & Facility Section */}
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="bg-white rounded-[3rem] p-12 lg:p-20 flex flex-col lg:flex-row items-center gap-16 shadow-2xl relative overflow-hidden text-slate-900"
        >
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-100 rounded-full blur-[100px] pointer-events-none -translate-y-1/2 translate-x-1/2 opacity-60"></div>
          
          <div className="flex-1 space-y-8 relative z-10">
             <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center text-3xl shadow-sm"><IoFlaskOutline /></div>
             <h2 className="text-4xl lg:text-5xl font-black text-slate-900 leading-tight tracking-tighter uppercase italic">Career Launch <br/>Labs.</h2>
             <p className="text-slate-600 text-lg md:text-xl font-light leading-relaxed">We don't just refer—we prepare. Our physically simulated interview labs provide you with the exact pressure-test you need before facing real hiring boards.</p>
             
             <div className="grid grid-cols-2 gap-8">
                <div>
                   <h4 className="font-bold text-slate-900 flex items-center gap-2 mb-2"><IoChatbubblesOutline className="text-blue-500" /> Mock HR Rounds</h4>
                   <p className="text-[10px] text-slate-400 font-black leading-relaxed uppercase tracking-widest">Live practice with senior tech recruiters.</p>
                </div>
                <div>
                   <h4 className="font-bold text-slate-900 flex items-center gap-2 mb-2"><IoSearchOutline className="text-blue-500" /> Resume Audit</h4>
                   <p className="text-[10px] text-slate-400 font-black leading-relaxed uppercase tracking-widest">Personalized refinement to bypass global ATS filters.</p>
                </div>
             </div>
          </div>

          <div className="flex-1 w-full lg:w-auto relative hidden lg:block overflow-hidden rounded-[2.5rem]">
              <img src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&h=800&fit=crop" className="w-full h-full object-cover grayscale opacity-80" />
          </div>
        </motion.div>

        {/* Global Stats Footer */}
        <div className="mt-32 border-t border-white/5 pt-16 flex flex-col lg:flex-row items-center justify-between gap-12 text-center lg:text-left">
           <div className="flex gap-16">
              <div>
                <p className="text-blue-500 text-6xl font-black mb-2">{data?.stats?.partners || '0+'}</p>
                <p className="text-white font-black uppercase tracking-[0.2em] text-[10px] text-slate-500">Global Hiring Partners</p>
              </div>
              <div>
                <p className="text-emerald-500 text-6xl font-black mb-2">{data?.stats?.rate || '0%'}</p>
                <p className="text-white font-black uppercase tracking-[0.2em] text-[10px] text-slate-500">Placement Success Rate</p>
              </div>
           </div>
           <button className="px-12 py-6 bg-white text-slate-950 font-black rounded-xl hover:bg-blue-600 hover:text-white transition-all shadow-2xl uppercase tracking-widest text-[10px]">
             Partner With Our Placement Cell
           </button>
        </div>

      </div>
    </section>
  );
}
