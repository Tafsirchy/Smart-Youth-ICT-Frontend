"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  IoSaveOutline, IoRefreshOutline, IoAddOutline, IoTrashOutline, 
  IoLayersOutline, IoSettingsOutline, IoPrismOutline, IoCodeSlashOutline, 
  IoCheckmarkOutline, IoChevronForwardOutline, IoChevronDownOutline,
  IoColorPaletteOutline, IoStatsChartOutline, IoShieldCheckmarkOutline, IoGlobeOutline,
  IoRocketOutline, IoBriefcaseOutline, IoGitNetworkOutline, IoAnalyticsOutline,
  IoShieldOutline, IoSparklesOutline, IoHardwareChipOutline, IoArrowBackOutline,
  IoImageOutline, IoListOutline, IoInformationCircleOutline,
  IoSchoolOutline, IoFlashOutline, IoRibbonOutline, IoBookOutline
} from "react-icons/io5";
import api from "@/lib/api";
import toast from "react-hot-toast";

const ICON_OPTIONS = [
  "School", "Book", "Flash", "Ribbon", "Briefcase", "Globe", "Analytics", "Rocket", "Layers"
];

const COLOR_OPTIONS = [
  { name: "Amber", value: "from-amber-500 to-orange-600", text: "text-amber-500" },
  { name: "Orange", value: "from-orange-600 to-red-700", text: "text-orange-600" },
  { name: "Indigo", value: "from-indigo-600 to-blue-700", text: "text-indigo-600" },
  { name: "Slate", value: "from-slate-700 to-slate-900", text: "text-slate-700" }
];

export default function SkillDevelopmentCMS() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState("landing");
  const [content, setContent] = useState({
    hero: { badge: "", title: "", subtitle: "", description: "" },
    methodology: [],
    cta: { title: "", description: "", buttonText: "" }
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await api.get("/cms/services/content/skill-development");
      if (res.data.data) {
        setContent(res.data.data);
      }
    } catch (err) {
      toast.error("Failed to load skill development content");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await api.put("/cms/services/content/skill-development", content);
      toast.success("Learning framework updated globally");
    } catch (err) {
      toast.error("Update failed");
    } finally {
      setSaving(false);
    }
  };

  const updateNested = (path, value) => {
    const newContent = { ...content };
    const keys = path.split('.');
    let current = newContent;
    for (let i = 0; i < keys.length - 1; i++) {
        if (!current[keys[i]]) current[keys[i]] = {};
        current = current[keys[i]];
    }
    current[keys[keys.length - 1]] = value;
    setContent(newContent);
  };

  if (loading) return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-20 text-center space-y-4">
        <IoRefreshOutline className="animate-spin text-4xl text-amber-600" />
        <span className="font-black text-slate-900 uppercase tracking-widest text-xs">Initializing Pedagogy Node...</span>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 p-6 max-w-7xl mx-auto pb-24 text-slate-900 selection:bg-amber-600 selection:text-white">
      {/* HEADER PROTOCOL */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 text-amber-600 mb-1">
            <IoSchoolOutline className="text-lg" />
            <span className="text-[9px] font-black uppercase tracking-[0.4em]">Service_Tier_Skill_Acquisition</span>
          </div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tighter leading-none">Skill Development</h1>
          <p className="text-slate-400 font-bold uppercase tracking-widest text-[9px] mt-2 ml-1">Centralized Learning Node</p>
        </div>
        <button 
          onClick={handleSave}
          disabled={saving}
          className="group relative overflow-hidden px-8 py-3.5 bg-slate-900 text-white rounded-xl font-black uppercase tracking-widest text-[10px] flex items-center gap-3 hover:shadow-xl hover:shadow-amber-950/20 transition-all active:scale-95 disabled:opacity-50"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-amber-600 to-orange-600 opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="relative flex items-center gap-3">
            {saving ? <IoRefreshOutline className="animate-spin" /> : <IoSaveOutline className="group-hover:rotate-12 transition-transform" />}
            Deploy Learning Protocol
          </div>
        </button>
      </div>

       {/* TIER SELECTOR */}
       <div className="flex gap-1 mb-8 bg-white p-1.5 rounded-xl border border-slate-200 w-fit shadow-sm">
        {[
          { id: "landing", label: "Academy Landing", icon: IoLayersOutline, color: "text-amber-500" },
          { id: "methodology", label: "Pedagogy Config", icon: IoSettingsOutline, color: "text-slate-500" },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2.5 px-6 py-2.5 rounded-lg font-black uppercase tracking-widest text-[9px] transition-all ${activeTab === tab.id ? 'bg-slate-900 text-white shadow-md' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'}`}
          >
            <tab.icon size={16} className={activeTab === tab.id ? 'text-amber-400' : tab.color} />
            {tab.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {activeTab === "landing" ? (
          <motion.div key="landing" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-8">
            
            {/* HERO SECTION */}
            <section className="bg-white p-8 rounded-3xl border border-slate-100 shadow-lg shadow-slate-200/30">
                <div className="flex justify-between items-center mb-6 pb-4 border-b border-slate-100">
                    <h2 className="text-xl font-black tracking-tighter flex items-center gap-3">
                        <div className="w-8 h-8 bg-amber-50 rounded-lg flex items-center justify-center text-amber-600"><IoPrismOutline /></div>
                        Hero Architecture
                    </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Field label="Badge" value={content.hero.badge} onChange={(v) => updateNested("hero.badge", v)} />
                    <Field label="Title" value={content.hero.title} onChange={(v) => updateNested("hero.title", v)} />
                    <Field label="Subtitle" value={content.hero.subtitle} onChange={(v) => updateNested("hero.subtitle", v)} />
                    <div className="md:col-span-2">
                        <Field label="Academy Manifesto" value={content.hero.description} onChange={(v) => updateNested("hero.description", v)} textarea />
                    </div>
                </div>
            </section>

             {/* CTA CARD */}
             <section className="bg-slate-900 p-8 rounded-3xl text-white shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 blur-3xl rounded-full translate-x-10 -translate-y-10"></div>
                <div className="flex justify-between items-center mb-6 pb-4 border-b border-white/10">
                    <h2 className="text-xl font-black tracking-tighter flex items-center gap-3">
                        <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center text-amber-400"><IoRocketOutline /></div>
                        Conversion Protocol (CTA)
                    </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
                    <Field label="CTA Title" value={content.cta.title} onChange={(v) => updateNested("cta.title", v)} dark />
                    <Field label="Button Text" value={content.cta.buttonText} onChange={(v) => updateNested("cta.buttonText", v)} dark />
                    <div className="md:col-span-2">
                        <Field label="CTA Description" value={content.cta.description} onChange={(v) => updateNested("cta.description", v)} dark textarea />
                    </div>
                </div>
            </section>

          </motion.div>
        ) : (
          <motion.div key="methodology" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-8">
            
            {/* METHODOLOGY PILLARS */}
            <section className="bg-white p-8 rounded-3xl border border-slate-100 shadow-lg shadow-slate-200/30">
                <div className="flex justify-between items-center mb-6 pb-4 border-b border-slate-100">
                    <h2 className="text-xl font-black tracking-tighter flex items-center gap-3">
                        <div className="w-8 h-8 bg-amber-50 rounded-lg flex items-center justify-center text-amber-600"><IoFlashOutline /></div>
                        Pedagogical Pillars
                    </h2>
                    <AddButton onClick={() => {
                        const newArr = [...(content.methodology || []), { title: "New Methodology Item", description: "" }];
                        updateNested("methodology", newArr);
                    }} small />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {content.methodology?.map((item, idx) => (
                        <div key={idx} className="p-8 bg-slate-50 rounded-3xl relative group border border-transparent hover:border-amber-100 transition-all flex flex-col h-full">
                            <button onClick={() => {
                                const newArr = content.methodology.filter((_, i) => i !== idx);
                                updateNested("methodology", newArr);
                            }} className="absolute top-4 right-4 text-slate-200 hover:text-rose-500 transition-all opacity-0 group-hover:opacity-100"><IoTrashOutline size={16}/></button>
                            
                            <div className="w-10 h-10 rounded-xl bg-amber-600 text-white flex items-center justify-center font-black text-sm mb-6 shadow-lg shadow-amber-600/20">
                                {String(idx + 1).padStart(2, '0')}
                            </div>
                            
                            <div className="flex-1 space-y-4">
                                <div>
                                    <label className="text-[8px] font-black uppercase text-slate-400 tracking-widest mb-1 block">Component_Title</label>
                                    <input placeholder="Methodology Node" className="w-full bg-white px-4 py-2 rounded-xl border border-slate-100 outline-none font-black text-sm uppercase tracking-tighter text-slate-900" value={item.title} onChange={(e) => {
                                        const newArr = [...content.methodology];
                                        newArr[idx].title = e.target.value;
                                        updateNested("methodology", newArr);
                                    }} />
                                </div>
                                <div>
                                    <label className="text-[8px] font-black uppercase text-slate-400 tracking-widest mb-1 block">Process_Description</label>
                                    <textarea placeholder="Scientific explanation" rows="4" className="w-full bg-white px-4 py-3 rounded-xl border border-slate-100 outline-none text-[11px] text-slate-500 font-medium leading-relaxed resize-none" value={item.description} onChange={(e) => {
                                        const newArr = [...content.methodology];
                                        newArr[idx].description = e.target.value;
                                        updateNested("methodology", newArr);
                                    }} />
                                </div>
                            </div>
                        </div>
                    ))}
                    {content.methodology?.length === 0 && <div className="md:col-span-3 py-20 border-2 border-dashed border-slate-100 rounded-3xl flex flex-col items-center justify-center gap-4 text-slate-300">
                        <IoBookOutline size={48} />
                        <p className="text-[10px] font-black uppercase tracking-[0.3em]">Initialize methodology architecture</p>
                    </div>}
                </div>
            </section>

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Field({ label, value, onChange, textarea = false, dark = false, small = false, icon = null }) {
    return (
        <div className={small ? "w-48" : "w-full"}>
            <label className={`block text-[9px] font-black uppercase mb-1.5 tracking-widest ${dark ? 'text-slate-500' : 'text-slate-400'}`}>
                {label}
            </label>
            <div className={`relative flex items-center ${dark ? 'bg-white/5 border-white/5' : 'bg-slate-50 border-transparent'} border rounded-xl overflow-hidden focus-within:border-amber-500/10 transition-all`}>
                {icon && <div className="pl-4 text-slate-400">{icon}</div>}
                {textarea ? (
                    <textarea 
                        rows="3" 
                        className={`w-full px-4 py-2.5 bg-transparent outline-none font-medium text-[11px] leading-relaxed shrink-0 ${dark ? 'text-white' : 'text-slate-900'}`} 
                        value={value || ""} 
                        onChange={(e) => onChange(e.target.value)} 
                    />
                ) : (
                    <input 
                        className={`w-full px-4 py-2.5 bg-transparent outline-none font-black text-xs ${dark ? 'text-white' : 'text-slate-900'}`} 
                        value={value || ""} 
                        onChange={(e) => onChange(e.target.value)} 
                    />
                )}
            </div>
        </div>
    );
}

function AddButton({ onClick, label = "Add", small = false }) {
    if (small) return (
        <button onClick={onClick} className="p-2 bg-amber-50 text-amber-600 rounded-lg hover:bg-amber-600 hover:text-white transition-all">
            <IoAddOutline size={18} />
        </button>
    );
    return (
        <button 
            onClick={onClick}
            className="h-full min-h-[140px] border-2 border-dashed border-slate-100 rounded-2xl flex flex-col items-center justify-center gap-2 text-slate-300 hover:text-amber-500 hover:border-amber-200 hover:bg-amber-50/30 transition-all group"
        >
            <div className="w-10 h-10 rounded-full border-2 border-dashed border-slate-200 flex items-center justify-center group-hover:scale-110 transition-transform">
                <IoAddOutline size={18} />
            </div>
            <span className="text-[9px] font-black uppercase tracking-widest">{label}</span>
        </button>
    );
}
