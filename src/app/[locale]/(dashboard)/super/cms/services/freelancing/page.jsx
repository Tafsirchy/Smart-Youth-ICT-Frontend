"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  LuPlus, LuPencil, LuTrash2, LuCheck, LuX, 
  LuGlobe, LuRocket, LuList, LuCpu, LuShield, LuSave, LuRefreshCw 
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

  if (loading) return <div className="p-10 text-center animate-pulse text-slate-400 font-black uppercase tracking-widest">Compiling Global Marketplaces...</div>;

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-12">
        <div>
          <h1 className="text-3xl font-black text-slate-900 mb-2">Freelancing Training CMS</h1>
          <p className="text-slate-500">Manage global messaging and individual marketplace strategies.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left: Hero Manager */}
        <div className="lg:col-span-4 space-y-8">
           <section className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm text-slate-900">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center"><LuRocket /></div>
                <h2 className="text-xl font-black uppercase tracking-tight">Main Hero</h2>
              </div>
              <div className="space-y-6">
                <div>
                  <label className="block text-[10px] font-black uppercase text-slate-400 mb-2">Badge</label>
                  <input className="w-full px-4 py-2 bg-slate-50 border border-transparent focus:border-emerald-500/20 rounded-xl outline-none font-bold text-sm" value={pageContent.hero.badge} onChange={(e) => setPageContent({...pageContent, hero: {...pageContent.hero, badge: e.target.value}})} />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase text-slate-400 mb-2">Title</label>
                  <input className="w-full px-4 py-2 bg-slate-50 border border-transparent focus:border-emerald-500/20 rounded-xl outline-none font-bold text-sm" value={pageContent.hero.title} onChange={(e) => setPageContent({...pageContent, hero: {...pageContent.hero, title: e.target.value}})} />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase text-slate-400 mb-2">Subtitle (Gradient)</label>
                  <input className="w-full px-4 py-2 bg-slate-50 border border-transparent focus:border-emerald-500/20 rounded-xl outline-none font-bold text-sm" value={pageContent.hero.subtitle} onChange={(e) => setPageContent({...pageContent, hero: {...pageContent.hero, subtitle: e.target.value}})} />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase text-slate-400 mb-2">Description</label>
                  <textarea rows="3" className="w-full px-4 py-2 bg-slate-50 border border-transparent focus:border-emerald-500/20 rounded-xl outline-none text-xs resize-none leading-relaxed" value={pageContent.hero.description} onChange={(e) => setPageContent({...pageContent, hero: {...pageContent.hero, description: e.target.value}})} />
                </div>
                <button 
                  onClick={handleSavePageContent}
                  disabled={savingContent}
                  className="w-full py-4 bg-emerald-600 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-2 hover:bg-emerald-700 transition-all shadow-lg"
                >
                  {savingContent ? <LuRefreshCw className="animate-spin" /> : <LuSave />}
                  Update Messaging
                </button>
              </div>
           </section>
        </div>

        {/* Right: Modules Manager */}
        <div className="lg:col-span-8 space-y-12">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tighter italic">Training Modules</h2>
            <button 
              onClick={handleSave}
              disabled={saving}
              className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-black flex items-center gap-3 hover:bg-black transition-all shadow-xl shadow-slate-900/10 disabled:opacity-50"
            >
              {saving ? <LuCpu className="animate-spin" /> : <LuCheck />}
              {saving ? "Syncing..." : "Save Global Config"}
            </button>
          </div>
        
        {/* Marketplace Classifications */}
        <section>
          <div className="flex justify-between items-center mb-8">
             <div className="flex items-center gap-3">
               <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center"><LuGlobe /></div>
               <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight">Marketplace Classifications</h2>
             </div>
             <button onClick={addClassification} className="flex items-center gap-2 text-xs font-black text-emerald-600 uppercase tracking-widest hover:bg-emerald-50 px-4 py-2 rounded-xl transition-all">
               <LuPlus /> Add Platform
             </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
             {data.classifications.map((item, i) => (
                <div key={i} className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm relative group">
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
                      <div className="grid grid-cols-2 gap-4">
                        <div className="col-span-2">
                           <label className="text-[10px] font-black uppercase text-slate-400 mb-2 block">Platform Name</label>
                           <input className="w-full px-4 py-2 bg-slate-50 border-2 border-transparent focus:border-emerald-500/20 rounded-xl outline-none font-bold" value={item.title} onChange={(e) => updateClassification(i, 'title', e.target.value)} />
                        </div>
                        <div>
                           <label className="text-[10px] font-black uppercase text-slate-400 mb-2 block">Strategy Type</label>
                           <input className="w-full px-4 py-2 bg-slate-50 border-2 border-transparent focus:border-emerald-500/20 rounded-xl outline-none font-bold text-xs" value={item.type} onChange={(e) => updateClassification(i, 'type', e.target.value)} />
                        </div>
                        <div>
                           <label className="text-[10px] font-black uppercase text-slate-400 mb-2 block">Theme Color (CSS)</label>
                           <input className="w-full px-4 py-2 bg-slate-50 border-2 border-transparent focus:border-emerald-500/20 rounded-xl outline-none font-mono text-xs" value={item.color} onChange={(e) => updateClassification(i, 'color', e.target.value)} />
                        </div>
                      </div>

                      <div>
                        <label className="text-[10px] font-black uppercase text-slate-400 mb-2 block">Marketing Description</label>
                        <textarea rows="3" className="w-full px-4 py-3 bg-slate-50 border-2 border-transparent focus:border-emerald-500/20 rounded-2xl outline-none text-sm resize-none" value={item.desc} onChange={(e) => updateClassification(i, 'desc', e.target.value)} />
                      </div>

                      <div className="space-y-2">
                         <div className="flex justify-between items-center">
                            <label className="text-[10px] font-black uppercase text-slate-400">Core Features</label>
                            <button onClick={() => addClassFeature(i)} className="text-[10px] font-black text-emerald-600 hover:underline">+ ADD</button>
                         </div>
                         {item.features.map((f, fi) => (
                            <div key={fi} className="flex gap-2">
                               <input className="flex-1 px-3 py-1.5 bg-white border border-slate-100 rounded-lg text-xs" value={f} onChange={(e) => {
                                  const newCls = [...data.classifications];
                                  newCls[i].features[fi] = e.target.value;
                                  setData({ ...data, classifications: newCls });
                               }} />
                               <button onClick={() => {
                                  const newCls = [...data.classifications];
                                  newCls[i].features = newCls[i].features.filter((_, fidx) => fidx !== fi);
                                  setData({ ...data, classifications: newCls });
                               }} className="text-slate-300 hover:text-rose-500">×</button>
                            </div>
                         ))}
                      </div>
                   </div>
                </div>
             ))}
          </div>
        </section>

        {/* Roadmap Phases */}
        <section className="bg-slate-950 p-12 rounded-[4rem] text-white overflow-hidden relative">
           <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/20 blur-[100px] pointer-events-none"></div>
           
           <div className="flex justify-between items-center mb-12 relative z-10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/10 text-white flex items-center justify-center"><LuRocket /></div>
                <h2 className="text-xl font-black uppercase tracking-tight">Mastery Roadmap</h2>
              </div>
              <button onClick={addPhase} className="p-3 bg-white/10 text-white rounded-xl hover:bg-white/20 transition-all">
                <LuPlus />
              </button>
           </div>

           <div className="space-y-6 relative z-10">
              {data.phases.map((p, i) => (
                <div key={i} className="flex gap-6 items-start group">
                   <input className="w-12 px-2 py-2 bg-white/5 border border-white/10 rounded-lg text-emerald-400 font-black text-center outline-none" value={p.step} onChange={(e) => {
                      const newP = [...data.phases];
                      newP[i].step = e.target.value;
                      setData({ ...data, phases: newP });
                   }} />
                   <div className="flex-1 space-y-2">
                      <input placeholder="Phase Title" className="w-full bg-transparent border-b border-white/5 focus:border-emerald-500/50 outline-none text-xl font-bold py-1" value={p.title} onChange={(e) => {
                        const newP = [...data.phases];
                        newP[i].title = e.target.value;
                        setData({ ...data, phases: newP });
                      }} />
                      <textarea rows="2" placeholder="Phase Methodology..." className="w-full bg-transparent border-b border-white/5 focus:border-emerald-500/50 outline-none text-sm font-light py-1 resize-none" value={p.desc} onChange={(e) => {
                        const newP = [...data.phases];
                        newP[i].desc = e.target.value;
                        setData({ ...data, phases: newP });
                      }} />
                   </div>
                   <button 
                    onClick={() => {
                        const newP = data.phases.filter((_, idx) => idx !== i);
                        setData({ ...data, phases: newP });
                    }}
                    className="p-2 text-white/20 hover:text-rose-500 transition-colors opacity-0 group-hover:opacity-100"
                  >
                    <LuTrash2 size={18} />
                  </button>
                </div>
              ))}
           </div>
          </section>
        </div>
      </div>
    </div>
  );
}
