"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  IoSaveOutline, IoRefreshOutline, IoAddOutline, IoTrashOutline, 
  IoLayersOutline, IoSettingsOutline, IoPrismOutline, IoTerminalOutline,
  IoCheckmarkOutline, IoGitNetworkOutline, IoTrendingUpOutline, IoListOutline,
  IoCubeOutline, IoShieldCheckmarkOutline
} from "react-icons/io5";
import api from "@/lib/api";
import toast from "react-hot-toast";

const ICON_OPTIONS = ["Cube", "Shield", "Sync", "Layers", "Settings", "Code", "CloudUpload", "Time", "Terminal", "Flash", "Globe", "GitNetwork", "Infinite"];

export default function CustomAppsCMS() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState("landing");
  const [content, setContent] = useState({
    landing: {
      hero: { badge: "", title: "", subtitle: "", description: "" },
      sections: { verticals: [], integrations: [], pricing: [] },
      cta: { title: "" }
    },
    details: {
      hero: { badge: "", title: "", description: "" },
      sections: { phases: [], manifest: [], roi: [] },
      cta: { title: "" }
    }
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get("/cms/services/web-software/custom-apps");
        if (res.data.data) {
          setContent(res.data.data);
        }
      } catch (err) {
        toast.error("Failed to load custom apps content");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      await api.put("/cms/services/web-software/custom-apps", content);
      toast.success("Custom Apps content updated globally");
    } catch (err) {
      toast.error("Update failed");
    } finally {
      setSaving(false);
    }
  };

  const updateNested = (base, path, value) => {
    const newContent = { ...content };
    let current = newContent[base];
    const keys = path.split('.');
    for (let i = 0; i < keys.length - 1; i++) {
        if (!current[keys[i]]) current[keys[i]] = {};
        current = current[keys[i]];
    }
    current[keys[keys.length - 1]] = value;
    setContent(newContent);
  };

  if (loading) return <div className="p-20 text-center font-black animate-pulse text-violet-400">ACTIVATING BESPOKE ENGINES...</div>;

  return (
    <div className="p-8 max-w-7xl mx-auto pb-40 text-slate-900">
      <div className="flex justify-between items-center mb-12">
        <div>
          <h1 className="text-4xl font-black text-slate-900 mb-2 italic">Custom Apps CMS</h1>
          <p className="text-slate-500 font-bold uppercase tracking-[0.3em] text-[10px]">Bespoke Engineering Manager</p>
        </div>
        <button 
          onClick={handleSave}
          disabled={saving}
          className="px-8 py-4 bg-violet-600 text-white rounded-xl font-black uppercase tracking-widest text-xs flex items-center gap-3 hover:bg-violet-700 transition-all shadow-2xl shadow-violet-600/20"
        >
          {saving ? <IoRefreshOutline className="animate-spin" /> : <IoSaveOutline />}
          Synchronize Data
        </button>
      </div>

      <div className="flex gap-4 mb-12 border-b border-slate-100 pb-4">
        {[
          { id: "landing", label: "App Engine (Main)", icon: IoLayersOutline, color: "text-violet-500" },
          { id: "details", label: "Technical Protocol", icon: IoTerminalOutline, color: "text-indigo-500" },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-3 px-6 py-3 rounded-xl font-black uppercase tracking-widest text-[10px] transition-all ${activeTab === tab.id ? 'bg-violet-600 text-white shadow-xl' : 'text-slate-400 hover:text-slate-600'}`}
          >
            <tab.icon className={activeTab === tab.id ? 'text-white' : tab.color} size={18} />
            {tab.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {activeTab === "landing" ? (
          <motion.div key="landing" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="space-y-12">
             <section className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm">
                <h2 className="text-xl font-black uppercase tracking-tighter mb-8 flex items-center gap-3">
                    <IoLayersOutline className="text-violet-500" /> Hero Architecture
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <label className="block text-[10px] font-black uppercase text-slate-400 mb-2 font-bold">Protocol Badge</label>
                        <input className="w-full px-5 py-3 bg-slate-50 border border-transparent focus:border-violet-500/20 rounded-xl outline-none font-bold text-sm" value={content.landing.hero.badge || ""} onChange={(e) => updateNested("landing", "hero.badge", e.target.value)} />
                    </div>
                    <div>
                        <label className="block text-[10px] font-black uppercase text-slate-400 mb-2 font-bold">Platform Title</label>
                        <input className="w-full px-5 py-3 bg-slate-50 border border-transparent focus:border-violet-500/20 rounded-xl outline-none font-bold text-sm" value={content.landing.hero.title || ""} onChange={(e) => updateNested("landing", "hero.title", e.target.value)} />
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-[10px] font-black uppercase text-slate-400 mb-2 font-bold">Hero Description</label>
                        <textarea rows="3" className="w-full px-5 py-3 bg-slate-50 border border-transparent focus:border-violet-500/20 rounded-xl outline-none font-medium text-sm leading-relaxed" value={content.landing.hero.description || ""} onChange={(e) => updateNested("landing", "hero.description", e.target.value)} />
                    </div>
                </div>
            </section>

            <section className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-xl font-black uppercase tracking-tighter flex items-center gap-3">
                        <IoSettingsOutline className="text-violet-500" /> Architecture Classifications
                    </h2>
                    <button onClick={() => {
                        const newV = [...(content.landing.sections.verticals || []), { title: "", desc: "", icon: "Cube" }];
                        updateNested("landing", "sections.verticals", newV);
                    }} className="text-[10px] font-black uppercase text-violet-500 hover:text-violet-600">+ Add Vertical</button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {content.landing.sections.verticals?.map((item, idx) => (
                        <div key={idx} className="p-6 bg-slate-50 rounded-[2rem] border border-slate-100 relative group">
                            <button onClick={() => {
                                const newItems = content.landing.sections.verticals.filter((_, i) => i !== idx);
                                updateNested("landing", "sections.verticals", newItems);
                            }} className="absolute top-4 right-4 text-slate-300 hover:text-rose-600 transition-colors"><IoTrashOutline size={16}/></button>
                            <div className="space-y-4">
                                <select className="w-full px-4 py-2 rounded-xl bg-white border border-slate-200 outline-none text-xs font-bold" value={item.icon} onChange={(e) => {
                                    const newItems = [...content.landing.sections.verticals];
                                    newItems[idx].icon = e.target.value;
                                    updateNested("landing", "sections.verticals", newItems);
                                }}>
                                    {ICON_OPTIONS.map(icon => <option key={icon} value={icon}>{icon}</option>)}
                                </select>
                                <input placeholder="Title" className="w-full px-4 py-2 rounded-xl bg-white border border-slate-200 outline-none text-sm font-bold" value={item.title} onChange={(e) => {
                                    const newItems = [...content.landing.sections.verticals];
                                    newItems[idx].title = e.target.value;
                                    updateNested("landing", "sections.verticals", newItems);
                                }} />
                                <textarea placeholder="Description" rows="2" className="w-full px-4 py-2 rounded-xl bg-white border border-slate-200 outline-none text-xs" value={item.desc} onChange={(e) => {
                                    const newItems = [...content.landing.sections.verticals];
                                    newItems[idx].desc = e.target.value;
                                    updateNested("landing", "sections.verticals", newItems);
                                }} />
                            </div>
                        </div>
                    ))}
                </div>
            </section>
          </motion.div>
        ) : (
          <motion.div key="details" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-12">
            <section className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm text-slate-900">
                <h2 className="text-xl font-black uppercase tracking-tighter mb-8 flex items-center gap-3">
                    <IoTerminalOutline className="text-indigo-500" /> Detail Protocol
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <label className="block text-[10px] font-black uppercase text-slate-400 mb-2 font-bold">Badge Protocol</label>
                        <input className="w-full px-5 py-3 bg-slate-50 border border-transparent focus:border-indigo-500/20 rounded-xl outline-none font-bold text-sm" value={content.details.hero.badge || ""} onChange={(e) => updateNested("details", "hero.badge", e.target.value)} />
                    </div>
                    <div>
                        <label className="block text-[10px] font-black uppercase text-slate-400 mb-2 font-bold">Technical Title</label>
                        <input className="w-full px-5 py-3 bg-slate-50 border border-transparent focus:border-indigo-500/20 rounded-xl outline-none font-bold text-sm" value={content.details.hero.title || ""} onChange={(e) => updateNested("details", "hero.title", e.target.value)} />
                    </div>
                </div>
            </section>

            <section className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm text-slate-900">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-xl font-black uppercase tracking-tighter flex items-center gap-3">
                        <IoShieldCheckmarkOutline className="text-indigo-500" /> Critical Technical Units
                    </h2>
                    <button onClick={() => {
                        const newROI = [...(content.details.sections.roi || []), { title: "", desc: "", protocol: "" }];
                        updateNested("details", "sections.roi", newROI);
                    }} className="text-[10px] font-black uppercase text-indigo-500 hover:text-indigo-600">+ Add Module</button>
                </div>
                <div className="grid md:grid-cols-2 gap-8">
                    {content.details.sections.roi?.map((unit, idx) => (
                        <div key={idx} className="p-8 bg-slate-50 border border-slate-100 rounded-[2.5rem] relative group">
                            <button onClick={() => {
                                const newItems = content.details.sections.roi.filter((_, i) => i !== idx);
                                updateNested("details", "sections.roi", newItems);
                            }} className="absolute top-4 right-4 text-slate-300 hover:text-rose-600 transition-colors"><IoTrashOutline size={16}/></button>
                            <input className="font-black text-2xl bg-transparent mb-6 outline-none block w-full" placeholder="Module Title" value={unit.title} onChange={(e) => {
                                const newROI = [...content.details.sections.roi];
                                newROI[idx].title = e.target.value;
                                updateNested("details", "sections.roi", newROI);
                            }} />
                            <textarea className="w-full bg-transparent text-sm leading-relaxed text-slate-500 mb-8 outline-none resize-none" rows="3" placeholder="Technical Impact" value={unit.desc} onChange={(e) => {
                                const newROI = [...content.details.sections.roi];
                                newROI[idx].desc = e.target.value;
                                updateNested("details", "sections.roi", newROI);
                            }} />
                            <div className="flex items-center gap-3 border-t border-slate-200 pt-6">
                                <span className="text-[10px] font-black text-slate-400 uppercase">Protocol:</span>
                                <input className="flex-1 px-4 py-2 border border-slate-100 rounded-xl bg-white text-[10px] font-black text-violet-500 outline-none" placeholder="Logic Path" value={unit.protocol} onChange={(e) => {
                                    const newROI = [...content.details.sections.roi];
                                    newROI[idx].protocol = e.target.value;
                                    updateNested("details", "sections.roi", newROI);
                                }} />
                            </div>
                        </div>
                    ))}
                </div>
            </section>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
