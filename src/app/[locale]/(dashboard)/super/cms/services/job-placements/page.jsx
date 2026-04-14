"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  LuPlus, LuPencil, LuTrash2, LuCheck, LuX, 
  LuBriefcase, LuRocket, LuList, LuSave, LuRefreshCw 
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

  if (loading) return <div className="p-10 text-center animate-pulse text-slate-400 font-black uppercase tracking-widest">Synchronizing Placement Hub...</div>;

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-12">
        <div>
          <h1 className="text-3xl font-black text-slate-900 mb-2">Job Placement CMS</h1>
          <p className="text-slate-500">Manage global messaging and individual placement roadmaps.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left: Hero Manager */}
        <div className="lg:col-span-4 space-y-8">
           <section className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm text-slate-900">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center"><LuBriefcase /></div>
                <h2 className="text-xl font-black uppercase tracking-tight">Main Hero</h2>
              </div>
              <div className="space-y-6">
                <div>
                  <label className="block text-[10px] font-black uppercase text-slate-400 mb-2">Badge</label>
                  <input className="w-full px-4 py-2 bg-slate-50 border border-transparent focus:border-blue-500/20 rounded-xl outline-none font-bold text-sm" value={pageContent.hero.badge} onChange={(e) => setPageContent({...pageContent, hero: {...pageContent.hero, badge: e.target.value}})} />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase text-slate-400 mb-2">Title</label>
                  <input className="w-full px-4 py-2 bg-slate-50 border border-transparent focus:border-blue-500/20 rounded-xl outline-none font-bold text-sm" value={pageContent.hero.title} onChange={(e) => setPageContent({...pageContent, hero: {...pageContent.hero, title: e.target.value}})} />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase text-slate-400 mb-2">Subtitle (Gradient)</label>
                  <input className="w-full px-4 py-2 bg-slate-50 border border-transparent focus:border-blue-500/20 rounded-xl outline-none font-bold text-sm" value={pageContent.hero.subtitle} onChange={(e) => setPageContent({...pageContent, hero: {...pageContent.hero, subtitle: e.target.value}})} />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase text-slate-400 mb-2">Description</label>
                  <textarea rows="3" className="w-full px-4 py-2 bg-slate-50 border border-transparent focus:border-blue-500/20 rounded-xl outline-none text-xs resize-none leading-relaxed" value={pageContent.hero.description} onChange={(e) => setPageContent({...pageContent, hero: {...pageContent.hero, description: e.target.value}})} />
                </div>
                <button 
                  onClick={handleSavePageContent}
                  disabled={savingContent}
                  className="w-full py-4 bg-blue-600 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-3 hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20"
                >
                  {savingContent ? <LuRefreshCw className="animate-spin" /> : <LuCheck />}
                  Update Messaging
                </button>
              </div>
           </section>
        </div>

        {/* Right: Data Manager */}
        <div className="lg:col-span-8 space-y-12">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tighter italic">Operational Data</h2>
            <button 
              onClick={handleSave}
              disabled={saving}
              className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-black flex items-center gap-3 hover:bg-black transition-all shadow-xl shadow-slate-900/10 disabled:opacity-50"
            >
              {saving ? <LuRefreshCw className="animate-spin" /> : <LuCheck />}
              {saving ? "Deploying..." : "Update Records"}
            </button>
          </div>
        
        {/* Statistics Banner */}
        <section className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-8">
           <div>
              <label className="block text-[10px] font-black uppercase text-slate-400 mb-2 flex items-center gap-2">
                <LuRocket /> Total Hiring Partners
              </label>
              <input className="w-full px-6 py-4 bg-slate-50 border-2 border-transparent focus:border-blue-500/20 focus:bg-white rounded-2xl outline-none font-black text-2xl text-blue-600" value={data.stats.partners} onChange={(e) => setData({...data, stats: { ...data.stats, partners: e.target.value }})} />
           </div>
           <div>
              <label className="block text-[10px] font-black uppercase text-slate-400 mb-2 flex items-center gap-2">
                <LuCheck /> Placement Success Rate
              </label>
              <input className="w-full px-6 py-4 bg-slate-50 border-2 border-transparent focus:border-emerald-500/20 focus:bg-white rounded-2xl outline-none font-black text-2xl text-emerald-600" value={data.stats.rate} onChange={(e) => setData({...data, stats: { ...data.stats, rate: e.target.value }})} />
           </div>
        </section>

        {/* Placement Track Classifications */}
        <section>
          <div className="flex justify-between items-center mb-8">
             <div className="flex items-center gap-3">
               <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center"><LuBriefcase /></div>
               <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight">Placement Tracks</h2>
             </div>
             <button onClick={addPlacement} className="text-xs font-black text-blue-600 uppercase tracking-widest hover:bg-blue-50 px-4 py-2 rounded-xl transition-all">
               + Add Track Category
             </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
             {data.placements.map((p, i) => (
                <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm relative group flex flex-col">
                   <button 
                     onClick={() => {
                        const newP = data.placements.filter((_, idx) => idx !== i);
                        setData({ ...data, placements: newP });
                     }}
                     className="absolute top-6 right-6 p-2 text-slate-300 hover:text-rose-500 transition-colors opacity-0 group-hover:opacity-100"
                   >
                     <LuTrash2 size={16} />
                   </button>

                   <div className="space-y-4 flex-1">
                      <div>
                        <label className="text-[10px] font-black text-slate-400 uppercase mb-1">Track Title</label>
                        <input className="w-full px-4 py-2 bg-slate-50 border border-transparent focus:border-blue-500/20 rounded-xl outline-none font-bold text-sm" value={p.title} onChange={(e) => updatePlacement(i, 'title', e.target.value)} />
                      </div>
                      <div>
                        <label className="text-[10px] font-black text-slate-400 uppercase mb-1">Category Type</label>
                        <input className="w-full px-4 py-2 bg-slate-50 border border-transparent focus:border-blue-500/20 rounded-xl outline-none font-bold text-[10px]" value={p.type} onChange={(e) => updatePlacement(i, 'type', e.target.value)} />
                      </div>
                      <div>
                        <label className="text-[10px] font-black text-slate-400 uppercase mb-1">Description</label>
                        <textarea rows="3" className="w-full px-4 py-3 bg-slate-50 border border-transparent focus:border-blue-500/20 rounded-2xl outline-none text-xs resize-none" value={p.desc} onChange={(e) => updatePlacement(i, 'desc', e.target.value)} />
                      </div>
                      <div>
                        <label className="text-[10px] font-black text-slate-400 uppercase mb-1">Avg Salary Range</label>
                        <input className="w-full px-4 py-2 bg-blue-50 border border-transparent focus:border-blue-500/20 rounded-xl outline-none font-black text-blue-700 text-xs" value={p.avgSalary} onChange={(e) => updatePlacement(i, 'avgSalary', e.target.value)} />
                      </div>
                   </div>
                </div>
             ))}
          </div>
        </section>

        {/* The Lifecycle */}
        <section className="bg-white p-12 rounded-[4rem] border border-slate-100">
           <div className="flex justify-between items-center mb-12">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center font-black"><LuList /></div>
                <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight">The Placement Lifecycle</h2>
              </div>
              <button onClick={addLifecycleStep} className="p-3 bg-slate-50 text-slate-400 hover:text-blue-600 rounded-xl transition-all">
                <LuPlus />
              </button>
           </div>

           <div className="space-y-6">
              {data.lifecycle.map((l, i) => (
                <div key={i} className="flex gap-6 items-start p-6 bg-slate-50 rounded-[2.5rem] group">
                   <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white font-black shrink-0 shadow-lg shadow-blue-600/20">
                     {i+1}
                   </div>
                   <div className="flex-1 space-y-3">
                      <div className="flex justify-between items-center">
                         <input placeholder="Step Title" className="bg-transparent border-b border-slate-200 outline-none font-bold flex-1 mr-4 py-1" value={l.title} onChange={(e) => {
                           const newL = [...data.lifecycle];
                           newL[i].title = e.target.value;
                           setData({ ...data, lifecycle: newL });
                         }} />
                         <input className="w-24 px-2 py-1 bg-white border border-slate-100 rounded-md text-[10px] font-black text-blue-500 uppercase tracking-widest text-center" value={l.step} onChange={(e) => {
                           const newL = [...data.lifecycle];
                           newL[i].step = e.target.value;
                           setData({ ...data, lifecycle: newL });
                         }} />
                      </div>
                      <textarea placeholder="Step description and requirements..." className="w-full bg-transparent border-b border-slate-200 outline-none text-xs font-light py-1 resize-none" value={l.d} onChange={(e) => {
                        const newL = [...data.lifecycle];
                        newL[i].d = e.target.value;
                        setData({ ...data, lifecycle: newL });
                      }} />
                   </div>
                   <button 
                    onClick={() => {
                        const newL = data.lifecycle.filter((_, idx) => idx !== i);
                        setData({ ...data, lifecycle: newL });
                    }}
                    className="p-2 text-slate-200 hover:text-rose-500 transition-colors opacity-0 group-hover:opacity-100"
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
