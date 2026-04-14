"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  LuSave, 
  LuRefreshCw, 
  LuPlus, 
  LuTrash2, 
  LuLayoutDashboard, 
  LuCheck,
  LuChevronRight,
  LuTarget
} from "react-icons/lu";
import api from "@/lib/api";
import toast from "react-hot-toast";

export default function SkillDevelopmentDashboard() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [content, setContent] = useState({
    hero: { badge: "", title: "", subtitle: "", description: "" },
    methodology: [],
    cta: { title: "", description: "", buttonText: "" }
  });

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const res = await api.get("/cms/services/content/skill-development");
      if (res.data.data) {
        setContent(res.data.data);
      }
    } catch (err) {
      toast.error("Failed to load page content");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await api.put("/cms/services/content/skill-development", content);
      toast.success("Page content updated successfully");
    } catch (err) {
      toast.error("Failed to save changes");
    } finally {
      setSaving(false);
    }
  };

  const addMethod = () => {
    setContent({
      ...content,
      methodology: [...content.methodology, { title: "", description: "" }]
    });
  };

  const removeMethod = (index) => {
    const newMethods = content.methodology.filter((_, i) => i !== index);
    setContent({ ...content, methodology: newMethods });
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="flex flex-col items-center gap-4">
        <LuRefreshCw className="w-10 h-10 text-indigo-600 animate-spin" />
        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">Initializing Infrastructure...</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50/50 pb-20">
      {/* STICKY HEADER */}
      <div className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-8 py-6 flex justify-between items-center">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse"></div>
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Sync_Protocol_v4.2</span>
            </div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tighter uppercase">Skill Development <span className="text-indigo-600">CMS</span></h1>
          </div>
          <button 
            onClick={handleSave}
            disabled={saving}
            className="group relative px-8 py-4 bg-slate-900 text-white rounded-2xl font-black flex items-center gap-3 hover:bg-black transition-all shadow-2xl shadow-slate-900/20 disabled:opacity-50 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500"></div>
            {saving ? <LuRefreshCw className="animate-spin" /> : <LuCheck className="text-emerald-400" />}
            <span className="relative z-10 uppercase tracking-widest text-[10px]">
              {saving ? "Deploying..." : "Push Changes"}
            </span>
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto pt-12 space-y-8">
        {/* HERO CONFIGURATION */}
        <section className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden box-border">
          <div className="px-5 py-4 border-b border-slate-50 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center border border-indigo-100">
                <LuLayoutDashboard size={20} />
              </div>
              <div>
                <h2 className="text-lg font-black text-slate-900 uppercase tracking-tight">Hero Configuration</h2>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">Landing Page Entry Point</p>
              </div>
            </div>
          </div>
          
          <div className="p-5 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              <div className="md:col-span-8">
                <label className="block text-[10px] font-black uppercase text-slate-400 mb-3 ml-1">Main Headline</label>
                <input 
                  className="w-full px-6 py-4 bg-slate-50 border-2 border-transparent focus:border-indigo-500/20 focus:bg-white rounded-2xl transition-all outline-none font-bold text-xl text-slate-900 shadow-inner" 
                  placeholder="e.g. Architecting Future Careers"
                  value={content.hero.title}
                  onChange={(e) => setContent({ ...content, hero: { ...content.hero, title: e.target.value }})}
                />
              </div>
              <div className="md:col-span-4">
                <label className="block text-[10px] font-black uppercase text-slate-400 mb-3 ml-1">Identity Badge</label>
                <input 
                  className="w-full px-6 py-4 bg-slate-50 border-2 border-transparent focus:border-indigo-500/20 focus:bg-white rounded-2xl transition-all outline-none font-bold text-slate-700" 
                  placeholder="SKILL_LAB_01"
                  value={content.hero.badge}
                  onChange={(e) => setContent({ ...content, hero: { ...content.hero, badge: e.target.value }})}
                />
              </div>
              <div className="md:col-span-12">
                <label className="block text-[10px] font-black uppercase text-slate-400 mb-3 ml-1">Gradient Sub-Heading</label>
                <input 
                  className="w-full px-6 py-4 bg-slate-50 border-2 border-transparent focus:border-indigo-500/20 focus:bg-white rounded-2xl transition-all outline-none font-bold text-indigo-600 uppercase tracking-widest text-xs" 
                  placeholder="The Future of Technical Mastery"
                  value={content.hero.subtitle}
                  onChange={(e) => setContent({ ...content, hero: { ...content.hero, subtitle: e.target.value }})}
                />
              </div>
              <div className="md:col-span-12">
                <label className="block text-[10px] font-black uppercase text-slate-400 mb-3 ml-1">Hero Manifesto</label>
                <textarea 
                  rows="4"
                  className="w-full max-w-2xl px-5 py-4 bg-slate-50/50 border border-slate-100 focus:border-indigo-500/20 focus:bg-white rounded-2xl transition-all outline-none resize-none leading-relaxed text-slate-600 font-medium italic shadow-inner" 
                  placeholder="Articulate the core value proposition..."
                  value={content.hero.description}
                  onChange={(e) => setContent({ ...content, hero: { ...content.hero, description: e.target.value }})}
                />
              </div>
            </div>
          </div>
        </section>

        {/* METHODOLOGY ARCHITECTURE */}
        <section className="bg-white rounded-[3rem] border border-slate-100 shadow-sm overflow-hidden box-border">
          <div className="px-5 py-4 border-b border-slate-50 flex items-center justify-between bg-slate-50/30">
            <div className="flex items-center gap-3">
              <div className="w-8 h-[1px] bg-slate-200"></div>
              <div>
                <h2 className="text-lg font-black text-slate-900 uppercase tracking-tight leading-none">Methodology Architecture</h2>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1.5 leading-none">The Core Pedagogical Pillars</p>
              </div>
            </div>
            <button 
              onClick={addMethod} 
              className="flex items-center gap-2 px-5 py-2.5 bg-emerald-50 text-emerald-600 rounded-xl hover:bg-emerald-600 hover:text-white transition-all font-black text-[10px] uppercase tracking-widest shadow-sm shadow-emerald-600/5 group"
            >
              <LuPlus className="group-hover:rotate-90 transition-transform" />
              Initialize Module
            </button>
          </div>
          
          <div className="p-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <AnimatePresence mode="popLayout">
                {content.methodology.map((m, i) => (
                  <motion.div 
                    key={i}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="p-5 bg-slate-50 rounded-[2rem] border border-slate-100 group hover:border-emerald-200 hover:bg-white transition-all relative shadow-sm hover:shadow-xl"
                  >
                    <button 
                      onClick={() => removeMethod(i)} 
                      className="absolute top-6 right-6 p-2 text-slate-300 hover:text-rose-500 transition-colors opacity-0 group-hover:opacity-100"
                    >
                      <LuTrash2 size={18} />
                    </button>

                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-black text-xs shadow-lg shadow-emerald-600/20">
                        {i + 1}
                      </div>
                      <span className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em]">Module_Instance</span>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <input 
                          placeholder="Strategic Heading..."
                          className="w-full bg-transparent border-b-2 border-slate-200 focus:border-emerald-500 outline-none font-black text-lg text-slate-900 py-1 transition-colors" 
                          value={m.title}
                          onChange={(e) => {
                            const newM = [...content.methodology];
                            newM[i].title = e.target.value;
                            setContent({ ...content, methodology: newM });
                          }}
                        />
                      </div>
                      <div>
                        <textarea 
                          placeholder="Operational details and methodology description..."
                          className="w-full bg-transparent border-b border-slate-200 focus:border-emerald-500 outline-none resize-none text-sm font-medium text-slate-500 leading-relaxed py-1" 
                          rows="3"
                          value={m.description}
                          onChange={(e) => {
                            const newM = [...content.methodology];
                            newM[i].description = e.target.value;
                            setContent({ ...content, methodology: newM });
                          }}
                        />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              
              {content.methodology.length === 0 && (
                <div 
                  onClick={addMethod}
                  className="md:col-span-2 py-20 border-2 border-dashed border-slate-200 rounded-[3rem] flex flex-col items-center justify-center gap-4 hover:border-emerald-300 group cursor-pointer transition-all bg-white"
                >
                  <div className="w-16 h-16 rounded-full bg-slate-50 text-slate-300 flex items-center justify-center group-hover:bg-emerald-50 group-hover:text-emerald-500 transition-all">
                    <LuPlus size={32} />
                  </div>
                  <p className="text-[10px] font-black tracking-[0.3em] text-slate-400 uppercase group-hover:text-emerald-600">Click to Initialize Methodology</p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* BOTTOM CTA MATRICX */}
        <section className="bg-slate-900 rounded-[4rem] p-12 lg:p-16 relative overflow-hidden shadow-2xl">
           <div className="absolute top-0 right-0 w-1/2 h-full bg-indigo-600/10 skew-x-12 translate-x-32 pointer-events-none"></div>
           
           <div className="relative z-10 grid lg:grid-cols-12 gap-12 items-center">
             <div className="lg:col-span-5">
               <div className="flex items-center gap-3 mb-6">
                 <div className="w-10 h-10 rounded-xl bg-white/10 text-white flex items-center justify-center border border-white/5"><LuTarget /></div>
                 <h2 className="text-xl font-black text-white uppercase tracking-tighter italic">Call to Action <span className="text-indigo-400 font-normal underline decoration-indigo-400/30">Protocol</span></h2>
               </div>
               <p className="text-slate-400 text-sm font-medium leading-relaxed mb-8">Refine the conversion narrative for students ready to initialize their professional deployment.</p>
               
               <div className="p-6 bg-white/5 rounded-3xl border border-white/5 space-y-4">
                  <div className="flex items-center gap-3 text-emerald-400">
                    <LuCheck size={16} />
                    <span className="text-[10px] font-black uppercase tracking-widest">Real-time DB Sync</span>
                  </div>
                  <div className="flex items-center gap-3 text-indigo-400">
                    <div className="w-4 h-[1px] bg-indigo-500"></div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-white/40 italic">Industrial Luxury Standard</span>
                  </div>
               </div>
             </div>

             <div className="lg:col-span-7 space-y-6">
               <div className="space-y-2">
                 <label className="text-[10px] font-black uppercase text-white/30 tracking-widest ml-1">CTA Heading</label>
                 <input 
                    className="w-full px-8 py-5 bg-white/5 border border-white/10 text-white rounded-[2rem] outline-none font-black text-lg focus:bg-white/10 focus:border-indigo-400 transition-all shadow-2xl" 
                    placeholder="Ready to architect your future?"
                    value={content.cta.title}
                    onChange={(e) => setContent({ ...content, cta: { ...content.cta, title: e.target.value }})}
                  />
               </div>
               <div className="space-y-2">
                 <label className="text-[10px] font-black uppercase text-white/30 tracking-widest ml-1">Narrative Description</label>
                 <textarea 
                    rows="2"
                    className="w-full px-8 py-5 bg-white/5 border border-white/10 text-white rounded-[2rem] outline-none resize-none font-medium text-sm focus:bg-white/10 focus:border-indigo-400 transition-all leading-relaxed" 
                    placeholder="Provide a final nudge..."
                    value={content.cta.description}
                    onChange={(e) => setContent({ ...content, cta: { ...content.cta, description: e.target.value }})}
                  />
               </div>
               <div className="space-y-2">
                 <label className="text-[10px] font-black uppercase text-white/30 tracking-widest ml-1">Primary Action Label</label>
                 <div className="relative group">
                   <LuChevronRight className="absolute right-6 top-1/2 -translate-y-1/2 text-indigo-400 group-hover:translate-x-1 transition-transform" />
                   <input 
                      className="w-full px-8 py-4 bg-indigo-600/20 border border-indigo-500/30 text-indigo-100 rounded-2xl outline-none font-black uppercase tracking-[0.3em] text-[10px] focus:bg-indigo-600/40 focus:border-indigo-400 transition-all" 
                      placeholder="INITIALIZE_ENROLLMENT"
                      value={content.cta.buttonText}
                      onChange={(e) => setContent({ ...content, cta: { ...content.cta, buttonText: e.target.value }})}
                    />
                 </div>
               </div>
             </div>
           </div>
        </section>
      </div>
    </div>
  );
}
