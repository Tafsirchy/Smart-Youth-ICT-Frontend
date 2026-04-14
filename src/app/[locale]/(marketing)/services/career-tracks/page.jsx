"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { IoTimerOutline, IoBriefcaseOutline, IoSearchOutline } from "react-icons/io5";
import api from "@/lib/api";

export default function CareerTracksPage() {
  const [tracks, setTracks] = useState([]);
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [tracksRes, contentRes] = await Promise.all([
        api.get("/cms/services/career-tracks"),
        api.get("/cms/services/content/career-tracks")
      ]);
      setTracks(tracksRes.data.data);
      setContent(contentRes.data.data);
    } catch (err) {
      console.error("Failed to load tracks data", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-slate-950 overflow-hidden relative">
      {/* Heavy grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:40px_40px]"></div>

      <div className="relative pt-20 pb-20 px-4">
        <div className="container-custom relative z-10 text-center max-w-4xl mx-auto">
          <motion.div
             initial={{ opacity: 0, scale: 0.9 }}
             animate={{ opacity: 1, scale: 1 }}
             className="px-4 py-2 border border-white/20 rounded-full inline-block text-white/70 text-xs font-mono uppercase tracking-widest mb-8 bg-white/5 backdrop-blur-md"
          >
             {content?.hero?.badge || "Zero To Hero"}
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-black text-white leading-[1.1] mb-8 tracking-tighter"
          >
            {content?.hero?.title || "Career Tracks"} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-400 animate-gradient-x">
              {content?.hero?.subtitle || "(Web, AI, SMM)"}
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 text-xl md:text-2xl leading-relaxed font-light"
          >
            {content?.hero?.description || "Select a track, follow our rigorously tested curriculum, and launch your tech career methodically."}
          </motion.p>
        </div>
      </div>

      <div className="container-custom py-16">
        <div className="space-y-16 max-w-6xl mx-auto">
          {loading ? (
             <div className="space-y-8 animate-pulse">
                {[1, 2].map(i => (
                  <div key={i} className="h-64 bg-white/5 rounded-[3rem] border border-white/10" />
                ))}
             </div>
          ) : tracks.length > 0 ? (
            tracks.map((track, i) => (
              <motion.div
                key={track._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                className="bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-[3rem] p-8 md:p-12 relative overflow-hidden group hover:border-white/20 transition-all"
              >
                <div className={`absolute top-0 right-0 w-full h-2 bg-gradient-to-r ${track.color} opacity-80`}></div>
                
                <div className="grid lg:grid-cols-12 gap-12">
                   {/* Left meta info */}
                   <div className="lg:col-span-5 space-y-6">
                      <h2 className="text-4xl font-black text-white">{track.title}</h2>
                      <p className="text-lg text-slate-400 leading-relaxed font-light">{track.description}</p>
                      
                      <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row gap-6">
                         <div>
                           <p className="text-xs font-black uppercase tracking-widest text-slate-500 flex items-center gap-2 mb-2"><IoTimerOutline /> Duration</p>
                           <p className="text-white text-xl font-bold">{track.duration}</p>
                         </div>
                         <div>
                           <p className="text-xs font-black uppercase tracking-widest text-slate-500 flex items-center gap-2 mb-2"><IoBriefcaseOutline /> Outcome</p>
                           <p className={`text-transparent bg-clip-text bg-gradient-to-r ${track.color} text-xl font-bold`}>{track.outcome}</p>
                         </div>
                      </div>

                      <button className="w-full py-4 mt-8 bg-white/5 border border-white/10 text-white font-bold rounded-xl hover:bg-white/10 transition-colors">
                         Download Syllabus PDF
                      </button>
                   </div>

                   {/* Right Phases Flowchart */}
                   <div className="lg:col-span-7 bg-black/40 rounded-3xl p-8 border border-white/5 relative">
                      <div className="space-y-8 relative z-10">
                         {[
                           { phase: "Phase 1: Basics", val: track.phase1 },
                           { phase: "Phase 2: Core", val: track.phase2 },
                           { phase: "Phase 3: Deep Dive", val: track.phase3 },
                           { phase: "Phase 4: Launch", val: track.phase4 },
                         ].map((step, idx) => (
                            <div key={idx} className="flex gap-4 items-start relative pb-4">
                               {/* Line connector */}
                               {idx !== 3 && <div className={`absolute left-4 top-10 bottom-0 w-px ${track.bg} opacity-30`}></div>}
                               
                               <div className={`w-8 h-8 rounded-full ${track.bg} flex items-center justify-center shrink-0 z-10 text-white font-black text-sm`}>
                                 {idx + 1}
                               </div>
                               <div>
                                 <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">{step.phase}</p>
                                 <p className="text-white font-medium">{step.val}</p>
                               </div>
                            </div>
                         ))}
                      </div>
                   </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="text-center py-20 bg-white/5 rounded-[3rem] border border-white/10">
               <IoSearchOutline className="text-5xl text-white/20 mx-auto mb-6" />
               <p className="text-white/40 font-black uppercase tracking-widest">No Active Tracks Found</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
