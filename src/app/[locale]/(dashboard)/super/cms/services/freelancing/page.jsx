"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  LuPlus, LuPencil, LuTrash2, LuCheck, LuX, 
  LuGlobe, LuRocket, LuList, LuCpu, LuShield, LuSave, LuRefreshCw,
  LuLayoutDashboard, LuTarget, LuChevronRight, LuPackage
} from "react-icons/lu";
import api from "@/lib/api";
import toast from "react-hot-toast";

export default function FreelancingDashboard() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [savingContent, setSavingContent] = useState(false);
  const [pageContent, setPageContent] = useState({
    hero: { badge: "", title: "", subtitle: "", description: "" }
  });
  const [data, setData] = useState({
    classifications: [],
    phases: [],
    toolkit: []
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [freelanceRes, contentRes] = await Promise.all([
        api.get("/cms/services/freelancing"),
        api.get("/cms/services/content/freelancing")
      ]);

      if (freelanceRes.data.data && freelanceRes.data.data.length > 0) {
        setData(freelanceRes.data.data[0]);
      }
      if (contentRes.data.data) {
        setPageContent(contentRes.data.data);
      }
    } catch (err) {
      toast.error("Failed to load freelancing data");
    } finally {
      setLoading(false);
    }
  };

  const handleSavePageContent = async () => {
    setSavingContent(true);
    try {
      await api.put("/cms/services/content/freelancing", pageContent);
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
        await api.put(`/cms/services/freelancing/${data._id}`, data);
      } else {
        await api.post("/cms/services/freelancing", data);
      }
      toast.success("Freelancing modules updated");
      fetchData();
    } catch (err) {
      toast.error("Save failed");
    } finally {
      setSaving(false);
    }
  };

  // Classifications
  const addClassification = () => {
    setData({
      ...data,
      classifications: [...data.classifications, { title: "", type: "", desc: "", icon: "", color: "bg-emerald-600", features: [] }]
    });
  };

  const updateClassification = (idx, field, val) => {
    const newCls = [...data.classifications];
    newCls[idx][field] = val;
    setData({ ...data, classifications: newCls });
  };

  const addClassFeature = (idx) => {
    const newCls = [...data.classifications];
    newCls[idx].features.push("");
    setData({ ...data, classifications: newCls });
  };

  // Phases
  const addPhase = () => {
    setData({
      ...data,
      phases: [...data.phases, { step: `0${data.phases.length + 1}`, title: "", desc: "" }]
    });
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="flex flex-col items-center gap-4">
        <LuRefreshCw className="w-10 h-10 text-emerald-600 animate-spin" />
        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">Compiling Marketplaces...</p>
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
              <div className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></div>
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Sync_Protocol_v4.2</span>
            </div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tighter uppercase">Freelancing <span className="text-emerald-600">CMS</span></h1>
          </div>
          <button 
            onClick={handleSave}
            disabled={saving}
            className="group px-8 py-4 bg-slate-900 text-white rounded-2xl font-black flex items-center gap-3 hover:bg-black transition-all shadow-xl shadow-slate-900/20 disabled:opacity-50"
          >
            {saving ? <LuCpu className="animate-spin text-emerald-400" /> : <LuCheck className="text-emerald-400" />}
            <span className="uppercase tracking-widest text-[10px]">{saving ? "Syncing..." : "Sync Global Config"}</span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT: HERO CONFIG */}
          <div className="lg:col-span-4 space-y-8">
            <section className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden box-border">
              <div className="px-4 py-4 border-b border-slate-50 flex items-center gap-4 bg-slate-50/30 text-slate-900">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100"><LuRocket size={20} /></div>
                <div>
                  <h2 className="text-sm font-black uppercase tracking-tight">Messaging Profile</h2>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">Landing Hero Control</p>
                </div>
              </div>
              
              <div className="p-4 space-y-4">
                <div>
                  <label className="block text-[10px] font-black uppercase text-slate-400 mb-2 ml-1">Identity Badge</label>
                  <input className="w-full px-4 py-3 bg-slate-50 border-2 border-transparent focus:border-emerald-500/20 focus:bg-white rounded-xl outline-none font-bold text-xs" value={pageContent.hero.badge} onChange={(e) => setPageContent({...pageContent, hero: {...pageContent.hero, badge: e.target.value}})} />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase text-slate-400 mb-2 ml-1">Main Headline</label>
                  <input className="w-full px-4 py-3 bg-slate-50 border-2 border-transparent focus:border-emerald-500/20 focus:bg-white rounded-xl outline-none font-black text-sm" value={pageContent.hero.title} onChange={(e) => setPageContent({...pageContent, hero: {...pageContent.hero, title: e.target.value}})} />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase text-slate-400 mb-2 ml-1">Subtitle Manifest</label>
                  <input className="w-full px-4 py-3 bg-slate-50 border-2 border-transparent focus:border-emerald-500/20 focus:bg-white rounded-xl outline-none font-bold text-[10px] text-emerald-600 uppercase tracking-widest" value={pageContent.hero.subtitle} onChange={(e) => setPageContent({...pageContent, hero: {...pageContent.hero, subtitle: e.target.value}})} />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase text-slate-400 mb-2 ml-1">Narrative Deck</label>
                  <textarea rows="4" className="w-full px-4 py-3 bg-slate-50 border-2 border-transparent focus:border-emerald-500/20 focus:bg-white rounded-2xl outline-none text-xs leading-relaxed font-medium text-slate-500 italic resize-none" value={pageContent.hero.description} onChange={(e) => setPageContent({...pageContent, hero: {...pageContent.hero, description: e.target.value}})} />
                </div>
                
                <button 
                  onClick={handleSavePageContent}
                  disabled={savingContent}
                  className="w-full py-4 bg-emerald-600 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-3 hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-600/10"
                >
                  {savingContent ? <LuRefreshCw className="animate-spin text-white" /> : <LuPackage className="text-white" />}
                  Deploy Messaging
                </button>
              </div>
            </section>
          </div>

          {/* RIGHT: PLATFORMS & ROADMAP */}
          <div className="lg:col-span-8 space-y-12">
            {/* PLATFORMS */}
            <section>
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-[1px] bg-slate-200"></div>
                  <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] leading-none">Marketplace_Ecosystem</h2>
                </div>
                <button onClick={addClassification} className="flex items-center gap-2 text-[10px] font-black text-emerald-600 uppercase tracking-widest hover:bg-emerald-50 px-4 py-2 rounded-xl transition-all shadow-sm">
                  <LuPlus /> Add Platform
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <AnimatePresence mode="popLayout">
                  {data.classifications.map((item, i) => (
                    <motion.div 
                      key={i}
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="bg-white p-4 rounded-[2rem] border border-slate-100 shadow-sm relative group hover:shadow-2xl transition-all"
                    >
                      <button 
                        onClick={() => {
                          const newCls = data.classifications.filter((_, idx) => idx !== i);
                          setData({ ...data, classifications: newCls });
                        }}
                        className="absolute top-6 right-6 p-2 text-slate-300 hover:text-rose-500 transition-colors opacity-0 group-hover:opacity-100"
                      >
                        <LuTrash2 size={18} />
                      </button>

                      <div className="space-y-6">
                        <div className="flex items-center gap-3 mb-2">
                          <div className={`w-8 h-8 rounded-lg shadow-sm ${item.color} flex items-center justify-center text-white font-black text-[10px]`}>
                             {item.title.charAt(0) || "P"}
                          </div>
                          <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Platform_Module</span>
                        </div>

                        <div className="grid grid-cols-1 gap-4">
                          <div>
                            <input className="w-full bg-transparent border-b-2 border-slate-100 focus:border-emerald-500 outline-none font-black text-lg text-slate-900 py-1 transition-colors" placeholder="Platform Name" value={item.title} onChange={(e) => updateClassification(i, 'title', e.target.value)} />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                               <label className="text-[9px] font-black uppercase text-slate-400 mb-1 block tracking-tighter">Strategic Type</label>
                               <input className="w-full px-3 py-2 bg-slate-50 rounded-lg outline-none font-bold text-[10px] text-emerald-600" value={item.type} onChange={(e) => updateClassification(i, 'type', e.target.value)} />
                            </div>
                            <div>
                               <label className="text-[9px] font-black uppercase text-slate-400 mb-1 block tracking-tighter">Hex/TW Color</label>
                               <input className="w-full px-3 py-2 bg-slate-50 rounded-lg outline-none font-mono text-[10px]" value={item.color} onChange={(e) => updateClassification(i, 'color', e.target.value)} />
                            </div>
                          </div>
                        </div>

                        <div>
                          <textarea 
                            rows="2" 
                            className="w-full px-5 py-3 bg-slate-50/50 border border-slate-100 focus:border-emerald-500/20 focus:bg-white rounded-2xl outline-none text-xs font-medium leading-relaxed italic text-slate-500 resize-none shadow-inner transition-all" 
                            placeholder="Marketing narrative..." 
                            value={item.desc} 
                            onChange={(e) => updateClassification(i, 'desc', e.target.value)} 
                          />
                        </div>

                        <div className="space-y-3 p-6 bg-slate-50/50 rounded-[2rem] border border-slate-50">
                           <div className="flex justify-between items-center mb-2">
                              <label className="text-[10px] font-black uppercase text-slate-400 flex items-center gap-2 underline decoration-emerald-500/30 font-serif">Core Pillars</label>
                              <button onClick={() => addClassFeature(i)} className="text-[10px] font-black text-emerald-600 hover:text-emerald-700 transition-colors">+ NEW</button>
                           </div>
                           <div className="space-y-2">
                              {item.features.map((f, fi) => (
                                 <div key={fi} className="flex gap-2 group/feat">
                                    <input className="flex-1 px-3 py-2 bg-white border border-slate-100 rounded-xl text-[10px] font-bold text-slate-600 focus:border-emerald-400 transition-all outline-none" value={f} onChange={(e) => {
                                       const newCls = [...data.classifications];
                                       newCls[i].features[fi] = e.target.value;
                                       setData({ ...data, classifications: newCls });
                                    }} />
                                    <button onClick={() => {
                                       const newCls = [...data.classifications];
                                       newCls[i].features = newCls[i].features.filter((_, fidx) => fidx !== fi);
                                       setData({ ...data, classifications: newCls });
                                    }} className="text-slate-200 hover:text-rose-500 opacity-0 group-hover/feat:opacity-100 transition-opacity">×</button>
                                 </div>
                              ))}
                           </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </section>

            {/* ROADMAP DARK EDITOR */}
            <section className="bg-[#0c0f14] p-4 lg:p-8 rounded-[2rem] text-white shadow-2xl relative overflow-hidden ring-1 ring-white/10">
               <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 blur-[120px] pointer-events-none translate-x-32 -translate-y-32"></div>
               <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/5 blur-[100px] pointer-events-none -translate-x-32 translate-y-32"></div>
               
               <div className="flex justify-between items-center mb-16 relative z-10">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-white/5 text-emerald-500 flex items-center justify-center border border-white/10 shadow-lg shadow-emerald-500/5 animate-pulse"><LuTarget size={24} /></div>
                    <div>
                      <h2 className="text-xl font-black uppercase tracking-tight text-white mb-0.5 whitespace-nowrap">Mastery Roadmap</h2>
                      <p className="text-[10px] text-white/30 font-black uppercase tracking-[0.3em]">Sequential Acceleration</p>
                    </div>
                  </div>
                  <button onClick={addPhase} className="p-4 bg-emerald-500 text-[#0c0f14] rounded-2xl hover:bg-emerald-400 hover:scale-110 active:scale-95 transition-all shadow-xl shadow-emerald-500/20 group">
                    <LuPlus className="group-hover:rotate-90 transition-transform" />
                  </button>
               </div>

               <div className="space-y-12 relative z-10">
                  <AnimatePresence mode="popLayout">
                    {data.phases.map((p, i) => (
                      <motion.div 
                        key={i}
                        layout
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="flex gap-8 group"
                      >
                         <div className="flex flex-col items-center gap-4">
                            <input className="w-14 h-14 bg-white/5 border border-white/10 rounded-2xl text-emerald-400 font-black text-xl text-center outline-none focus:border-emerald-500/50 focus:bg-white/10 transition-all shadow-inner" value={p.step} onChange={(e) => {
                               const newP = [...data.phases];
                               newP[i].step = e.target.value;
                               setData({ ...data, phases: newP });
                            }} />
                            <div className="w-[2px] flex-1 bg-gradient-to-b from-emerald-500/50 to-transparent min-h-[40px] opacity-20 group-last:hidden"></div>
                         </div>
                         
                         <div className="flex-1 space-y-4 pt-2 pr-10">
                            <div className="flex justify-between items-center">
                              <input placeholder="Phase Identity Label" className="w-full bg-transparent border-b-2 border-white/5 focus:border-emerald-500/50 outline-none text-2xl font-black py-2 transition-all" value={p.title} onChange={(e) => {
                                const newP = [...data.phases];
                                newP[i].title = e.target.value;
                                setData({ ...data, phases: newP });
                              }} />
                              <button 
                               onClick={() => {
                                   const newP = data.phases.filter((_, idx) => idx !== i);
                                   setData({ ...data, phases: newP });
                               }}
                               className="p-3 text-white/10 hover:text-rose-500 hover:bg-rose-500/10 rounded-xl transition-all opacity-0 group-hover:opacity-100"
                             >
                               <LuTrash2 size={18} />
                             </button>
                            </div>
                            <textarea 
                              rows="3" 
                              placeholder="Strategic methodology and core KPIs for this phase..." 
                              className="w-full max-w-2xl bg-white/5 border border-white/5 focus:border-emerald-500/30 rounded-2xl outline-none text-sm font-medium text-white/50 py-4 px-6 resize-none leading-relaxed transition-all shadow-inner italic" 
                              value={p.desc} 
                              onChange={(e) => {
                                const newP = [...data.phases];
                                newP[i].desc = e.target.value;
                                setData({ ...data, phases: newP });
                              }} 
                            />
                         </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>

                  {data.phases.length === 0 && (
                    <div onClick={addPhase} className="py-20 border-2 border-dashed border-white/10 rounded-[3rem] flex flex-col items-center justify-center gap-4 hover:border-emerald-500/30 transition-all cursor-pointer group">
                       <LuRocket className="text-white/10 group-hover:text-emerald-500/50 transition-colors" size={48} />
                       <p className="text-[10px] font-black uppercase tracking-[0.5em] text-white/20 group-hover:text-white/40">Initialize Mastery Sequence</p>
                    </div>
                  )}
               </div>

               {/* BOTTOM DECOR */}
               <div className="mt-16 flex items-center gap-4 opacity-20">
                  <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-white/50 to-transparent"></div>
                  <LuCpu className="text-white" size={14} />
                  <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-white/50 to-transparent"></div>
               </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
