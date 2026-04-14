"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  LuPlus, LuPencil, LuTrash2, LuCheck, LuX, 
  LuBriefcase, LuRocket, LuList, LuSave, LuRefreshCw,
  LuLayoutDashboard, LuTarget, LuChevronRight, LuUsers, LuTrendingUp
} from "react-icons/lu";
import api from "@/lib/api";
import toast from "react-hot-toast";

export default function JobPlacementDashboard() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [savingContent, setSavingContent] = useState(false);
  const [pageContent, setPageContent] = useState({
    hero: { badge: "", title: "", subtitle: "", description: "" }
  });
  const [data, setData] = useState({
    placements: [],
    lifecycle: [],
    stats: { partners: "120+", rate: "90%" }
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [placementRes, contentRes] = await Promise.all([
        api.get("/cms/services/job-placements"),
        api.get("/cms/services/content/job-placement")
      ]);

      if (placementRes.data.data && placementRes.data.data.length > 0) {
        setData(placementRes.data.data[0]);
      }
      if (contentRes.data.data) {
        setPageContent(contentRes.data.data);
      }
    } catch (err) {
      toast.error("Failed to load placement data");
    } finally {
      setLoading(false);
    }
  };

  const handleSavePageContent = async () => {
    setSavingContent(true);
    try {
      await api.put("/cms/services/content/job-placement", pageContent);
      toast.success("Hero content updated");
    } catch (err) {
      toast.error("Failed to update hero content");
    } finally {
      setSavingContent(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      if (data._id) {
        await api.put(`/cms/services/job-placements/${data._id}`, data);
      } else {
        await api.post("/cms/services/job-placements", data);
      }
      toast.success("Placement records updated");
      fetchData();
    } catch (err) {
      toast.error("Save failed");
    } finally {
      setSaving(false);
    }
  };

  const addPlacement = () => {
    setData({
      ...data,
      placements: [...data.placements, { title: "", type: "", desc: "", icon: "", color: "bg-blue-600", avgSalary: "" }]
    });
  };

  const updatePlacement = (idx, field, val) => {
    const newP = [...data.placements];
    newP[idx][field] = val;
    setData({ ...data, placements: newP });
  };

  const addLifecycleStep = () => {
    setData({
      ...data,
      lifecycle: [...data.lifecycle, { step: `Phase 0${data.lifecycle.length + 1}`, title: "", d: "" }]
    });
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="flex flex-col items-center gap-4">
        <LuRefreshCw className="w-10 h-10 text-blue-600 animate-spin" />
        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">Synchronizing Placement Hub...</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50/50 pb-20">
      {/* STICKY HEADER */}
      <div className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-8 py-6 flex justify-between items-center">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></div>
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Sync_Protocol_v5.0</span>
            </div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tighter uppercase">Placement <span className="text-blue-600">CMS</span></h1>
          </div>
          <button 
            onClick={handleSave}
            disabled={saving}
            className="group px-8 py-4 bg-slate-900 text-white rounded-2xl font-black flex items-center gap-3 hover:bg-black transition-all shadow-xl shadow-slate-900/20 disabled:opacity-50"
          >
            {saving ? <LuRefreshCw className="animate-spin text-blue-400" /> : <LuCheck className="text-emerald-400" />}
            <span className="uppercase tracking-widest text-[10px]">{saving ? "Deploying..." : "Update Official Records"}</span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
          {/* LEFT: HERO CONFIG */}
          <div className="lg:col-span-4 space-y-4">
            <section className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden box-border">
              <div className="px-4 py-4 border-b border-slate-50 flex items-center gap-4 bg-slate-50/30 text-slate-900">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100 shadow-sm"><LuBriefcase size={20} /></div>
                <div>
                  <h2 className="text-sm font-black uppercase tracking-tight">Main Portal Hero</h2>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">Hero Messaging Protocol</p>
                </div>
              </div>
              
              <div className="p-4 space-y-4">
                <div>
                  <label className="block text-[10px] font-black uppercase text-slate-400 mb-2 ml-1">Identity Badge</label>
                  <input className="w-full px-4 py-3 bg-slate-50 border-2 border-transparent focus:border-blue-500/20 focus:bg-white rounded-xl outline-none font-bold text-xs" value={pageContent.hero.badge} onChange={(e) => setPageContent({...pageContent, hero: {...pageContent.hero, badge: e.target.value}})} />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase text-slate-400 mb-2 ml-1">Hero Title</label>
                  <input className="w-full px-4 py-3 bg-slate-50 border-2 border-transparent focus:border-blue-500/20 focus:bg-white rounded-xl outline-none font-black text-sm" value={pageContent.hero.title} onChange={(e) => setPageContent({...pageContent, hero: {...pageContent.hero, title: e.target.value}})} />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase text-slate-400 mb-2 ml-1">Subtitle Manifest</label>
                  <input className="w-full px-4 py-3 bg-slate-50 border-2 border-transparent focus:border-blue-500/20 focus:bg-white rounded-xl outline-none font-bold text-[10px] text-blue-600 uppercase tracking-widest" value={pageContent.hero.subtitle} onChange={(e) => setPageContent({...pageContent, hero: {...pageContent.hero, subtitle: e.target.value}})} />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase text-slate-400 mb-2 ml-1">Narrative Deck</label>
                  <textarea rows="4" className="w-full px-4 py-3 bg-slate-50 border-2 border-transparent focus:border-blue-500/20 focus:bg-white rounded-2xl outline-none text-xs leading-relaxed font-medium text-slate-500 italic resize-none" value={pageContent.hero.description} onChange={(e) => setPageContent({...pageContent, hero: {...pageContent.hero, description: e.target.value}})} />
                </div>
                
                <button 
                  onClick={handleSavePageContent}
                  disabled={savingContent}
                  className="w-full py-4 bg-blue-600 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-3 hover:bg-blue-700 transition-all shadow-xl shadow-blue-600/10"
                >
                  {savingContent ? <LuRefreshCw className="animate-spin text-white" /> : <LuCheck className="text-white" />}
                  Deploy Messaging
                </button>
              </div>
            </section>
          </div>

          {/* RIGHT: DATA & ANALYTICS */}
          <div className="lg:col-span-8 space-y-12">
            {/* STATS ANALYTICS */}
            <section className="bg-white p-5 rounded-[2rem] border border-slate-100 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-10">
               <div className="space-y-4">
                  <div className="flex items-center gap-3 ml-1">
                    <LuUsers className="text-blue-500" size={16} />
                    <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Global Hiring Partners</label>
                  </div>
                  <input className="w-full px-8 py-5 bg-slate-50 border-2 border-transparent focus:border-blue-500/20 focus:bg-white rounded-2xl outline-none font-black text-3xl text-blue-600 transition-all shadow-inner" value={data.stats.partners} onChange={(e) => setData({...data, stats: { ...data.stats, partners: e.target.value }})} />
               </div>
               <div className="space-y-4">
                  <div className="flex items-center gap-3 ml-1">
                    <LuTrendingUp className="text-emerald-500" size={16} />
                    <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Success Rate Probability</label>
                  </div>
                  <input className="w-full px-8 py-5 bg-slate-50 border-2 border-transparent focus:border-emerald-500/20 focus:bg-white rounded-2xl outline-none font-black text-3xl text-emerald-600 transition-all shadow-inner" value={data.stats.rate} onChange={(e) => setData({...data, stats: { ...data.stats, rate: e.target.value }})} />
               </div>
            </section>

            {/* PLACEMENT TRACKS */}
            <section>
              <div className="flex justify-between items-center mb-6">
                 <div className="flex items-center gap-3">
                   <div className="w-8 h-[1px] bg-slate-200"></div>
                   <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] leading-none">Authorized_Placement_Tracks</h2>
                 </div>
                 <button onClick={addPlacement} className="flex items-center gap-2 text-[10px] font-black text-blue-600 uppercase tracking-widest hover:bg-blue-50 px-4 py-2 rounded-xl transition-all shadow-sm">
                   <LuPlus /> New track
                 </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                <AnimatePresence mode="popLayout">
                  {data.placements.map((p, i) => (
                    <motion.div 
                      key={i}
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="bg-white p-4 rounded-[2rem] border border-slate-100 shadow-sm relative group hover:shadow-2xl transition-all flex flex-col"
                    >
                      <button 
                        onClick={() => {
                           const newP = data.placements.filter((_, idx) => idx !== i);
                           setData({ ...data, placements: newP });
                        }}
                        className="absolute top-6 right-6 p-2.5 text-slate-300 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all opacity-0 group-hover:opacity-100"
                      >
                        <LuTrash2 size={16} />
                      </button>

                      <div className="space-y-2 flex-1">
                        <div>
                          <input className="w-full bg-transparent border-b-2 border-slate-50 focus:border-blue-500 outline-none font-black text-lg text-slate-900 py-1 transition-colors" placeholder="Track Name" value={p.title} onChange={(e) => updatePlacement(i, 'title', e.target.value)} />
                        </div>
                        <div>
                          <label className="text-[9px] font-black uppercase text-slate-400 mb-1 block">Strategic Category</label>
                          <input className="w-full px-4 py-2 bg-slate-50 rounded-xl outline-none font-bold text-[10px] text-blue-600" value={p.type} onChange={(e) => updatePlacement(i, 'type', e.target.value)} />
                        </div>
                        <div>
                          <textarea rows="3" className="w-full px-4 py-3 bg-slate-50 border-2 border-transparent focus:border-blue-500/20 rounded-2xl outline-none text-[11px] font-medium leading-relaxed italic text-slate-500 resize-none shadow-inner" placeholder="Market description..." value={p.desc} onChange={(e) => updatePlacement(i, 'desc', e.target.value)} />
                        </div>
                        <div className="pt-4 border-t border-slate-50 mt-auto">
                          <label className="text-[9px] font-black uppercase text-slate-400 mb-2 block tracking-widest">Aggregated Yield (Salary)</label>
                          <div className="relative group/sal">
                             <span className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-500 font-black">$</span>
                             <input className="w-full pl-8 pr-4 py-2 bg-emerald-50 border border-emerald-100 text-emerald-700 font-black text-xs rounded-xl outline-none focus:bg-emerald-100 transition-colors" value={p.avgSalary} onChange={(e) => updatePlacement(i, 'avgSalary', e.target.value)} />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </section>

            {/* LIFECYCLE CHRONOLOGY */}
            <section className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm relative overflow-hidden">
               <div className="absolute top-0 right-0 w-64 h-64 bg-slate-50 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2"></div>
               
               <div className="flex justify-between items-center mb-10 relative z-10">
                  <div className="flex items-center gap-4">
                    <div>
                      <h2 className="text-xl font-black uppercase tracking-tight text-slate-900 mb-0.5">Success Lifecycle</h2>
                      <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.3em]">Job placement sequence</p>
                    </div>
                  </div>
                  <button onClick={addLifecycleStep} className="p-4 bg-slate-50 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-2xl transition-all shadow-sm">
                    <LuPlus size={20} />
                  </button>
               </div>

               <div className="space-y-8 relative z-10">
                  <AnimatePresence mode="popLayout">
                    {data.lifecycle.map((l, i) => (
                      <motion.div 
                        key={i}
                        layout
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="flex gap-8 group/item"
                      >
                         <div className="flex flex-col items-center">
                            <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white font-black text-lg shadow-lg shadow-blue-600/20 group-hover/item:scale-110 transition-transform duration-500">
                              {i+1}
                            </div>
                            <div className="w-[2px] flex-1 bg-gradient-to-b from-blue-200 to-transparent mt-4 opacity-50 group-last/item:hidden"></div>
                         </div>
                         
                         <div className="flex-1 space-y-4 pt-1 pr-10">
                            <div className="flex justify-between items-center gap-4">
                               <input placeholder="Module Title" className="bg-transparent border-b-2 border-slate-100 focus:border-blue-500 outline-none font-black text-xl text-slate-900 flex-1 py-1 transition-all" value={l.title} onChange={(e) => {
                                 const newL = [...data.lifecycle];
                                 newL[i].title = e.target.value;
                                 setData({ ...data, lifecycle: newL });
                               }} />
                               <input className="w-28 px-3 py-1.5 bg-blue-50 rounded-lg text-[9px] font-black text-blue-600 uppercase tracking-widest text-center border border-blue-100 shrink-0" value={l.step} onChange={(e) => {
                                 const newL = [...data.lifecycle];
                                 newL[i].step = e.target.value;
                                 setData({ ...data, lifecycle: newL });
                               }} />
                               <button 
                                onClick={() => {
                                    const newL = data.lifecycle.filter((_, idx) => idx !== i);
                                    setData({ ...data, lifecycle: newL });
                                }}
                                className="p-2.5 text-slate-200 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all opacity-0 group-hover/item:opacity-100"
                              >
                                <LuTrash2 size={18} />
                              </button>
                            </div>
                            <textarea 
                              placeholder="Process requirements and target outcomes..." 
                              className="w-full max-w-2xl bg-slate-50/50 border border-slate-100 focus:border-blue-500/20 focus:bg-white rounded-2xl outline-none text-xs font-medium text-slate-500 p-5 resize-none leading-relaxed transition-all italic shadow-inner" 
                              value={l.d} 
                              onChange={(e) => {
                                const newL = [...data.lifecycle];
                                newL[i].d = e.target.value;
                                setData({ ...data, lifecycle: newL });
                              }} 
                            />
                         </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>

                  {data.lifecycle.length === 0 && (
                    <div onClick={addLifecycleStep} className="py-20 border-2 border-dashed border-slate-100 rounded-[4rem] flex flex-col items-center justify-center gap-4 hover:border-blue-300 transition-all cursor-pointer group">
                       <LuTarget className="text-slate-100 group-hover:text-blue-100 transition-colors" size={48} />
                       <p className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-300 group-hover:text-blue-400">Initialize Placement Sequence</p>
                    </div>
                  )}
               </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
