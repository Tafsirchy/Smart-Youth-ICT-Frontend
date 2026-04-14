"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  IoSaveOutline, IoRefreshOutline, IoAddOutline, IoTrashOutline, 
  IoLayersOutline, IoSettingsOutline, IoCartOutline, IoCodeSlashOutline, 
  IoBagCheckOutline, IoCardOutline, IoGitNetworkOutline, IoStatsChartOutline
} from "react-icons/io5";
import api from "@/lib/api";
import toast from "react-hot-toast";

const ICON_OPTIONS = ["Cart", "BagCheck", "Card", "GitNetwork", "Globe", "Shield", "Rocket", "Business", "Stats", "Chip", "Infinite", "Sparkles", "FingerPrint"];

export default function EcommerceCMS() {
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
      hero: { badge: "", title: "", subtitle: "", description: "" },
      sections: { roi: [], manifest: [], checklist: [] },
      cta: { title: "" }
    }
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await api.get("/cms/services/web-software/ecommerce");
      if (res.data.data) {
        setContent(res.data.data);
      }
    } catch (err) {
      toast.error("Failed to load ecommerce content");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await api.put("/cms/services/web-software/ecommerce", content);
      toast.success("Ecommerce content updated globally");
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

  if (loading) return <div className="p-20 text-center font-black animate-pulse text-rose-500">ACTIVATING COMMERCE ENGINE...</div>;

  return (
    <div className="p-8 max-w-7xl mx-auto pb-40 text-slate-900">
      <div className="flex justify-between items-center mb-12">
        <div>
          <h1 className="text-4xl font-black text-slate-900 mb-2 italic">Ecommerce CMS</h1>
          <p className="text-slate-500 font-bold uppercase tracking-[0.3em] text-[10px]">Transactional Architecture Manager</p>
        </div>
        <button 
          onClick={handleSave}
          disabled={saving}
          className="px-8 py-4 bg-rose-600 text-white rounded-xl font-black uppercase tracking-widest text-xs flex items-center gap-3 hover:bg-rose-700 transition-all shadow-2xl shadow-rose-600/20"
        >
          {saving ? <IoRefreshOutline className="animate-spin" /> : <IoSaveOutline />}
          Synchronize Storefront
        </button>
      </div>

      <div className="flex gap-4 mb-12 border-b border-slate-100 pb-4">
        {[
          { id: "landing", label: "Store Engine (Main)", icon: IoLayersOutline, color: "text-rose-500" },
          { id: "details", label: "Conversion Protocol", icon: IoBagCheckOutline, color: "text-indigo-500" },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-3 px-6 py-3 rounded-xl font-black uppercase tracking-widest text-[10px] transition-all ${activeTab === tab.id ? 'bg-rose-600 text-white shadow-xl' : 'text-slate-400 hover:text-slate-600'}`}
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
                    <IoCartOutline className="text-rose-500" /> Hero Section
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <label className="block text-[10px] font-black uppercase text-slate-400 mb-2 font-bold">Badge Text</label>
                        <input className="w-full px-5 py-3 bg-slate-50 border border-transparent focus:border-rose-500/20 rounded-xl outline-none font-bold text-sm" value={content.landing.hero.badge || ""} onChange={(e) => updateNested("landing", "hero.badge", e.target.value)} />
                    </div>
                    <div>
                        <label className="block text-[10px] font-black uppercase text-slate-400 mb-2 font-bold">Primary Title</label>
                        <input className="w-full px-5 py-3 bg-slate-50 border border-transparent focus:border-rose-500/20 rounded-xl outline-none font-bold text-sm" value={content.landing.hero.title || ""} onChange={(e) => updateNested("landing", "hero.title", e.target.value)} />
                    </div>
                    <div>
                        <label className="block text-[10px] font-black uppercase text-slate-400 mb-2 font-bold">Subtitle (Gradient)</label>
                        <input className="w-full px-5 py-3 bg-slate-50 border border-transparent focus:border-rose-500/20 rounded-xl outline-none font-bold text-sm" value={content.landing.hero.subtitle || ""} onChange={(e) => updateNested("landing", "hero.subtitle", e.target.value)} />
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-[10px] font-black uppercase text-slate-400 mb-2 font-bold">Hero Description</label>
                        <textarea rows="3" className="w-full px-5 py-3 bg-slate-50 border border-transparent focus:border-rose-500/20 rounded-xl outline-none font-medium text-sm leading-relaxed" value={content.landing.hero.description || ""} onChange={(e) => updateNested("landing", "hero.description", e.target.value)} />
                    </div>
                </div>
            </section>

            <section className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-xl font-black uppercase tracking-tighter flex items-center gap-3">
                        <IoStatsChartOutline className="text-rose-500" /> Vertical Markets
                    </h2>
                    <button onClick={() => {
                        const newV = [...(content.landing.sections.verticals || []), { title: "", desc: "", icon: "Cart", color: "from-rose-500 to-pink-600" }];
                        updateNested("landing", "sections.verticals", newV);
                    }} className="text-[10px] font-black uppercase text-rose-500 hover:text-rose-600">+ Add Vertical</button>
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

            <section className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-xl font-black uppercase tracking-tighter flex items-center gap-3">
                        <IoGitNetworkOutline className="text-rose-500" /> Logistics Integrations
                    </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {content.landing.sections.integrations?.map((int, idx) => (
                      <div key={idx} className="p-8 bg-slate-50 border border-slate-100 rounded-[2.5rem] flex gap-4">
                        <select className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 outline-none text-[8px] font-black uppercase h-fit" value={int.icon} onChange={(e) => {
                            const newI = [...content.landing.sections.integrations];
                            newI[idx].icon = e.target.value;
                            updateNested("landing", "sections.integrations", newI);
                        }}>
                           {ICON_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                        </select>
                        <div className="flex-1 space-y-2">
                           <input className="w-full font-black text-[10px] text-slate-900 uppercase tracking-widest bg-transparent outline-none" value={int.t} onChange={(e) => {
                               const newI = [...content.landing.sections.integrations];
                               newI[idx].t = e.target.value;
                               updateNested("landing", "sections.integrations", newI);
                           }} />
                           <input className="w-full text-[10px] text-slate-400 font-bold bg-transparent outline-none" value={int.d} onChange={(e) => {
                               const newI = [...content.landing.sections.integrations];
                               newI[idx].d = e.target.value;
                               updateNested("landing", "sections.integrations", newI);
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
                    <IoCodeSlashOutline className="text-indigo-500" /> Technical Protocol
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
                        <IoBagCheckOutline className="text-indigo-500" /> Conversion ROI
                    </h2>
                    <button onClick={() => {
                        const newRoi = [...(content.details.sections.roi || []), { title: "", desc: "", icon: "Stats", features: [] }];
                        updateNested("details", "sections.roi", newRoi);
                    }} className="text-[10px] font-black uppercase text-indigo-500 hover:text-indigo-600">+ Add ROI Spec</button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {content.details.sections.roi?.map((item, idx) => (
                        <div key={idx} className="p-6 bg-slate-50 rounded-[2rem] border border-slate-100 relative group">
                            <button onClick={() => {
                                const newItems = content.details.sections.roi.filter((_, i) => i !== idx);
                                updateNested("details", "sections.roi", newItems);
                            }} className="absolute top-4 right-4 text-slate-300 hover:text-rose-600 transition-colors"><IoTrashOutline size={16}/></button>
                            <div className="space-y-4">
                                <select className="w-full px-4 py-2 rounded-xl bg-white border border-slate-200 outline-none text-xs font-bold" value={item.icon} onChange={(e) => {
                                    const newItems = [...content.details.sections.roi];
                                    newItems[idx].icon = e.target.value;
                                    updateNested("details", "sections.roi", newItems);
                                }}>
                                    {ICON_OPTIONS.map(icon => <option key={icon} value={icon}>{icon}</option>)}
                                </select>
                                <input placeholder="Indicator Title" className="w-full px-4 py-2 rounded-xl bg-white border border-slate-200 outline-none text-sm font-bold" value={item.title} onChange={(e) => {
                                    const newItems = [...content.details.sections.roi];
                                    newItems[idx].title = e.target.value;
                                    updateNested("details", "sections.roi", newItems);
                                }} />
                                <textarea placeholder="Indicator Data" rows="2" className="w-full px-4 py-2 rounded-xl bg-white border border-slate-200 outline-none text-xs" value={item.desc} onChange={(e) => {
                                    const newItems = [...content.details.sections.roi];
                                    newItems[idx].desc = e.target.value;
                                    updateNested("details", "sections.roi", newItems);
                                }} />
                                <div className="flex flex-wrap gap-2">
                                   {item.features?.map((f, fIdx) => (
                                     <div key={fIdx} className="flex gap-1 items-center bg-white px-2 py-1 rounded-lg border border-slate-200">
                                       <input className="text-[10px] font-bold outline-none bg-transparent w-20" value={f} onChange={(e) => {
                                         const newRoi = [...content.details.sections.roi];
                                         newRoi[idx].features[fIdx] = e.target.value;
                                         updateNested("details", "sections.roi", newRoi);
                                       }} />
                                       <button onClick={() => {
                                         const newRoi = [...content.details.sections.roi];
                                         newRoi[idx].features = newRoi[idx].features.filter((_, i) => i !== fIdx);
                                         updateNested("details", "sections.roi", newRoi);
                                       }} className="text-slate-300 hover:text-red-500"><IoTrashOutline size={10} /></button>
                                     </div>
                                   ))}
                                   <button onClick={() => {
                                      const newRoi = [...content.details.sections.roi];
                                      newRoi[idx].features.push("");
                                      updateNested("details", "sections.roi", newRoi);
                                   }} className="text-[10px] font-black text-rose-500">+ FEATURE</button>
                                </div>
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
