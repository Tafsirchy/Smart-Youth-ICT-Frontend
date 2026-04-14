"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  IoSaveOutline, IoRefreshOutline, IoAddOutline, IoTrashOutline, 
  IoLayersOutline, IoSettingsOutline, IoPrismOutline, IoCodeSlashOutline, 
  IoCheckmarkOutline, IoChevronForwardOutline, IoChevronDownOutline,
  IoColorPaletteOutline, IoDiamondOutline, IoSparklesOutline, IoPulseOutline
} from "react-icons/io5";
import api from "@/lib/api";
import toast from "react-hot-toast";

const ICON_OPTIONS = ["Palette", "Diamond", "Flash", "Globe", "Shield", "Rocket", "Briefcase", "Stats", "Chip", "Infinite", "Sparkles", "FingerPrint", "Flask", "Images", "ShareSocial", "Shapes", "TrendingUp", "Search"];

export default function BrandingCMS() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState("landing");
  const [content, setContent] = useState({
    landing: {
      hero: { badge: "", title: "", description: "" },
      sections: { pillars: [], manifest: [], metrics: [] },
      cta: { title: "" }
    },
    details: {
      hero: { badge: "", title: "", description: "" },
      sections: { roi: [], protocol: [] },
      cta: { title: "" }
    }
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await api.get("/cms/services/web-software/branding");
      if (res.data.data) {
        setContent(res.data.data);
      }
    } catch (err) {
      toast.error("Failed to load branding content");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await api.put("/cms/services/web-software/branding", content);
      toast.success("Branding content updated globally");
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

  if (loading) return <div className="p-20 text-center font-black animate-pulse text-rose-400">LOADING BRAND IDENTITY ENGINE...</div>;

  return (
    <div className="p-8 max-w-7xl mx-auto pb-40">
      <div className="flex justify-between items-center mb-12">
        <div>
          <h1 className="text-4xl font-black text-slate-900 mb-2">Logo & Brand Identity CMS</h1>
          <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">Managing Visual Sovereignty</p>
        </div>
        <button 
          onClick={handleSave}
          disabled={saving}
          className="px-8 py-4 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-widest text-xs flex items-center gap-3 hover:bg-black transition-all shadow-2xl"
        >
          {saving ? <IoRefreshOutline className="animate-spin" /> : <IoSaveOutline />}
          Deploy Changes
        </button>
      </div>

      <div className="flex gap-4 mb-12 border-b border-slate-100 pb-4">
        {[
          { id: "landing", label: "Landing Architecture", icon: IoLayersOutline, color: "text-rose-500" },
          { id: "details", label: "Technical Manifest", icon: IoCodeSlashOutline, color: "text-indigo-500" },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-3 px-6 py-3 rounded-xl font-black uppercase tracking-widest text-[10px] transition-all ${activeTab === tab.id ? 'bg-slate-900 text-white shadow-xl' : 'text-slate-400 hover:text-slate-600'}`}
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
                    <IoColorPaletteOutline className="text-rose-500" /> Hero Section
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="md:col-span-2">
                        <label className="block text-[10px] font-black uppercase text-slate-400 mb-2 font-bold">Badge Text</label>
                        <input className="w-full px-5 py-3 bg-slate-50 border border-transparent focus:border-rose-500/20 rounded-xl outline-none font-bold text-sm" value={content.landing.hero.badge || ""} onChange={(e) => updateNested("landing", "hero.badge", e.target.value)} />
                    </div>
                    <div>
                        <label className="block text-[10px] font-black uppercase text-slate-400 mb-2 font-bold">Primary Title</label>
                        <input className="w-full px-5 py-3 bg-slate-50 border border-transparent focus:border-rose-500/20 rounded-xl outline-none font-bold text-sm" value={content.landing.hero.title || ""} onChange={(e) => updateNested("landing", "hero.title", e.target.value)} />
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
                        <IoDiamondOutline className="text-rose-500" /> Brand Pillars
                    </h2>
                    <button onClick={() => {
                        const newPillars = [...(content.landing.sections.pillars || []), { title: "", desc: "", icon: "Palette", color: "from-rose-500 to-pink-600" }];
                        updateNested("landing", "sections.pillars", newPillars);
                    }} className="text-[10px] font-black uppercase text-rose-500 hover:text-rose-600">+ Add Pillar</button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {content.landing.sections.pillars?.map((item, idx) => (
                        <div key={idx} className="p-6 bg-slate-50 rounded-[2rem] border border-slate-100 relative group">
                            <button onClick={() => {
                                const newItems = content.landing.sections.pillars.filter((_, i) => i !== idx);
                                updateNested("landing", "sections.pillars", newItems);
                            }} className="absolute top-4 right-4 text-slate-300 hover:text-rose-600 transition-colors"><IoTrashOutline size={16}/></button>
                            <div className="space-y-4">
                                <select className="w-full px-4 py-2 rounded-xl bg-white border border-slate-200 outline-none text-xs font-bold" value={item.icon} onChange={(e) => {
                                    const newItems = [...content.landing.sections.pillars];
                                    newItems[idx].icon = e.target.value;
                                    updateNested("landing", "sections.pillars", newItems);
                                }}>
                                    {ICON_OPTIONS.map(icon => <option key={icon} value={icon}>{icon}</option>)}
                                </select>
                                <input placeholder="Title" className="w-full px-4 py-2 rounded-xl bg-white border border-slate-200 outline-none text-sm font-bold" value={item.title} onChange={(e) => {
                                    const newItems = [...content.landing.sections.pillars];
                                    newItems[idx].title = e.target.value;
                                    updateNested("landing", "sections.pillars", newItems);
                                }} />
                                <textarea placeholder="Description" rows="2" className="w-full px-4 py-2 rounded-xl bg-white border border-slate-200 outline-none text-xs" value={item.desc} onChange={(e) => {
                                    const newItems = [...content.landing.sections.pillars];
                                    newItems[idx].desc = e.target.value;
                                    updateNested("landing", "sections.pillars", newItems);
                                }} />
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm">
                <h2 className="text-xl font-black uppercase tracking-tighter mb-8 flex items-center gap-3">
                    <IoSparklesOutline className="text-rose-500" /> Conversion CTA
                </h2>
                <div className="grid grid-cols-1 gap-8">
                    <div>
                        <label className="block text-[10px] font-black uppercase text-slate-400 mb-2 font-bold">CTA Title</label>
                        <input className="w-full px-5 py-3 bg-slate-50 border border-transparent focus:border-rose-500/20 rounded-xl outline-none font-black text-xl tracking-tighter" value={content.landing.cta.title || ""} onChange={(e) => updateNested("landing", "cta.title", e.target.value)} />
                    </div>
                </div>
            </section>
          </motion.div>
        ) : (
          <motion.div key="details" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-12">
            
            <section className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm">
                <h2 className="text-xl font-black uppercase tracking-tighter mb-8 flex items-center gap-3">
                    <IoCodeSlashOutline className="text-indigo-500" /> Technical Header
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <label className="block text-[10px] font-black uppercase text-slate-400 mb-2 font-bold">Badge Protocol</label>
                        <input className="w-full px-5 py-3 bg-slate-50 border border-transparent focus:border-indigo-500/20 rounded-xl outline-none font-bold text-sm" value={content.details.hero.badge || ""} onChange={(e) => updateNested("details", "hero.badge", e.target.value)} />
                    </div>
                    <div>
                        <label className="block text-[10px] font-black uppercase text-slate-400 mb-2 font-bold">Tech Title</label>
                        <input className="w-full px-5 py-3 bg-slate-50 border border-transparent focus:border-indigo-500/20 rounded-xl outline-none font-bold text-sm" value={content.details.hero.title || ""} onChange={(e) => updateNested("details", "hero.title", e.target.value)} />
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-[10px] font-black uppercase text-slate-400 mb-2 font-bold">Technical Description</label>
                        <textarea rows="3" className="w-full px-5 py-3 bg-slate-50 border border-transparent focus:border-indigo-500/20 rounded-xl outline-none font-medium text-sm" value={content.details.hero.description || ""} onChange={(e) => updateNested("details", "hero.description", e.target.value)} />
                    </div>
                </div>
            </section>

            <section className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm text-slate-900">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-xl font-black uppercase tracking-tighter flex items-center gap-3">
                        <IoPulseOutline className="text-indigo-500" /> ROI Indicators
                    </h2>
                    <button onClick={() => {
                        const newRoi = [...(content.details.sections.roi || []), { title: "", desc: "", icon: "Briefcase" }];
                        updateNested("details", "sections.roi", newRoi);
                    }} className="text-[10px] font-black uppercase text-indigo-500 hover:text-indigo-600">+ Add Indicator</button>
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
                            </div>
                        </div>
                    ))}
                </div>
            </section>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
      `}</style>
    </div>
  );
}
