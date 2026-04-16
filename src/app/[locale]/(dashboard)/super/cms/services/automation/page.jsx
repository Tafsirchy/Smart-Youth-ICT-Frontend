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
  IoSyncOutline, IoFlashOutline, IoTerminalOutline, IoExtensionOutline
} from "react-icons/io5";
import api from "@/lib/api";
import toast from "react-hot-toast";

const ICON_OPTIONS = [
  "Sync", "Flash", "Extension", "Settings", "Shield", "Globe", "Analytics", "Rocket", "Layers"
];

const COLOR_OPTIONS = [
  { name: "Cyan", value: "from-cyan-600 to-blue-700", text: "text-cyan-600" },
  { name: "Blue", value: "from-blue-600 to-indigo-800", text: "text-blue-600" },
  { name: "Emerald", value: "from-emerald-500 to-teal-600", text: "text-emerald-500" },
  { name: "Slate", value: "from-slate-700 to-slate-900", text: "text-slate-700" }
];

export default function AutomationCMS() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState("landing");
  const [content, setContent] = useState({
    landing: {
      hero: { badge: "", title: "", description: "" },
      sections: { 
        pillars: [], 
        metrics: [] 
      },
      cta: { title: "" }
    },
    details: {
      hero: { badge: "", title: "", description: "" },
      sections: { 
        roi: [] 
      },
      cta: { title: "" }
    }
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await api.get("/cms/services/ai-managed/automation");
      if (res.data.data) {
        setContent(prev => ({
            ...prev,
            ...res.data.data,
            landing: {
                ...prev.landing,
                ...(res.data.data.landing || {}),
                sections: {
                    ...prev.landing.sections,
                    ...(res.data.data.landing?.sections || {})
                }
            },
            details: {
                ...prev.details,
                ...(res.data.data.details || {}),
                sections: {
                    ...prev.details.sections,
                    ...(res.data.data.details?.sections || {})
                }
            }
        }));
      }
    } catch (err) {
      toast.error("Failed to load automation content");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await api.put("/cms/services/ai-managed/automation", content);
      toast.success("Workflow mechanics updated globally");
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

  if (loading) return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-20 text-center space-y-4">
        <IoRefreshOutline className="animate-spin text-4xl text-cyan-600" />
        <span className="font-black text-slate-900 uppercase tracking-widest text-xs">Initializing Automation Sequence...</span>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 p-6 max-w-7xl mx-auto pb-24 text-slate-900 selection:bg-cyan-600 selection:text-white">
      {/* HEADER PROTOCOL */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 text-cyan-600 mb-1">
            <IoSyncOutline className="text-lg" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em]">Service_Tier_Workflow_Sync</span>
          </div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tighter leading-none">Process Automation</h1>
          <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px] mt-1.5 ml-1">Centralized Efficiency Node</p>
        </div>
        <button 
          onClick={handleSave}
          disabled={saving}
          className="group relative overflow-hidden px-8 py-3.5 bg-slate-900 text-white rounded-xl font-black uppercase tracking-widest text-[10px] flex items-center gap-3 hover:shadow-xl hover:shadow-cyan-950/20 transition-all active:scale-95 disabled:opacity-50"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="relative flex items-center gap-3">
            {saving ? <IoRefreshOutline className="animate-spin" /> : <IoSaveOutline className="group-hover:rotate-12 transition-transform" />}
            Deploy Factory Logic
          </div>
        </button>
      </div>

       {/* TIER SELECTOR */}
       <div className="flex gap-1 mb-6 bg-white p-1 rounded-xl border border-slate-200 w-fit shadow-sm">
        {[
          { id: "landing", label: "Efficiency Landing", icon: IoLayersOutline, color: "text-cyan-500" },
          { id: "details", label: "Technical Manifest", icon: IoSettingsOutline, color: "text-slate-500" },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-5 py-2 rounded-lg font-black uppercase tracking-widest text-[9px] transition-all ${activeTab === tab.id ? 'bg-slate-900 text-white shadow-md' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'}`}
          >
            <tab.icon size={15} className={activeTab === tab.id ? 'text-cyan-400' : tab.color} />
            {tab.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {activeTab === "landing" ? (
          <motion.div key="landing" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-8">
            
            {/* HERO SECTION */}
            <section className="bg-white p-6 rounded-3xl border border-slate-100 shadow-lg shadow-slate-200/30">
                <div className="flex justify-between items-center mb-4 pb-3 border-b border-slate-100">
                    <h2 className="text-xl font-black tracking-tighter flex items-center gap-3">
                        <div className="w-8 h-8 bg-cyan-50 rounded-lg flex items-center justify-center text-cyan-600"><IoPrismOutline /></div>
                        Hero Architecture
                    </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Field label="Badge" value={content.landing.hero.badge} onChange={(v) => updateNested("landing", "hero.badge", v)} />
                    <Field label="Title" value={content.landing.hero.title} onChange={(v) => updateNested("landing", "hero.title", v)} />
                    <div className="md:col-span-2">
                        <Field label="Automation Strategy" value={content.landing.hero.description} onChange={(v) => updateNested("landing", "hero.description", v)} textarea />
                    </div>
                </div>
            </section>

             {/* PILLARS */}
             <section className="bg-white p-6 rounded-3xl border border-slate-100 shadow-lg shadow-slate-200/30">
                <div className="flex justify-between items-center mb-4 pb-3 border-b border-slate-100">
                    <h2 className="text-xl font-black tracking-tighter flex items-center gap-3">
                        <div className="w-8 h-8 bg-cyan-50 rounded-lg flex items-center justify-center text-cyan-600"><IoSyncOutline /></div>
                        Efficiency Pillars
                    </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {content.landing.sections.pillars?.map((item, idx) => (
                        <CardWrapper key={idx} onRemove={() => {
                            const newArr = content.landing.sections.pillars.filter((_, i) => i !== idx);
                            updateNested("landing", "sections.pillars", newArr);
                        }} compact>
                             <div className="flex gap-4 mb-4">
                                <div className="shrink-0 relative group/icon">
                                    <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center text-cyan-600 text-2xl shadow-inner border border-slate-100 group-hover:scale-105 transition-all">
                                        {item.icon === "Sync" && <IoSyncOutline />}
                                        {item.icon === "Flash" && <IoFlashOutline />}
                                        {item.icon === "Extension" && <IoExtensionOutline />}
                                        {item.icon === "Settings" && <IoSettingsOutline />}
                                        {item.icon === "Shield" && <IoShieldOutline />}
                                        {item.icon === "Globe" && <IoGlobeOutline />}
                                        {item.icon === "Analytics" && <IoAnalyticsOutline />}
                                        {item.icon === "Rocket" && <IoRocketOutline />}
                                        {item.icon === "Layers" && <IoLayersOutline />}
                                        
                                        <select 
                                            className="absolute inset-0 opacity-0 cursor-pointer w-full h-full" 
                                            value={item.icon} 
                                            onChange={(e) => {
                                                const newArr = [...content.landing.sections.pillars];
                                                newArr[idx].icon = e.target.value;
                                                updateNested("landing", "sections.pillars", newArr);
                                            }}
                                        >
                                            {ICON_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
                                        </select>
                                    </div>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <input placeholder="Pillar Title" className="w-full bg-transparent border-none outline-none font-black text-sm uppercase tracking-tighter" value={item.title} onChange={(e) => {
                                        const newArr = [...content.landing.sections.pillars];
                                        newArr[idx].title = e.target.value;
                                        updateNested("landing", "sections.pillars", newArr);
                                    }} />
                                    <div className="flex items-center gap-1.5 mt-1">
                                        <IoColorPaletteOutline className="text-slate-300 text-[10px]" />
                                        <select className="bg-transparent border-none outline-none text-[8px] font-bold text-slate-400 uppercase" value={item.color} onChange={(e) => {
                                            const newArr = [...content.landing.sections.pillars];
                                            newArr[idx].color = e.target.value;
                                            updateNested("landing", "sections.pillars", newArr);
                                        }}>
                                            {COLOR_OPTIONS.map(c => <option key={c.value} value={c.value}>{c.name}</option>)}
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <textarea placeholder="Efficiency rationale" rows="3" className="w-full bg-slate-50 border border-transparent focus:bg-white focus:border-slate-100 rounded-xl p-3 text-[11px] text-slate-500 leading-relaxed outline-none transition-all scrollbar-hide" value={item.desc} onChange={(e) => {
                                const newArr = [...content.landing.sections.pillars];
                                newArr[idx].desc = e.target.value;
                                updateNested("landing", "sections.pillars", newArr);
                            }} />
                        </CardWrapper>
                    ))}
                    <AddButton onClick={() => {
                        const newArr = [...(content.landing.sections.pillars || []), { title: "New Workflow Node", desc: "", icon: "Sync", color: "from-cyan-600 to-blue-700" }];
                        updateNested("landing", "sections.pillars", newArr);
                    }} label="Add Efficiency Node" />
                </div>
            </section>

             {/* METRICS */}
            <section className="bg-slate-900 p-6 rounded-3xl text-white shadow-xl">
                 <div className="flex justify-between items-center mb-4 pb-3 border-b border-white/10">
                    <h2 className="text-xl font-black tracking-tighter flex items-center gap-3">
                        <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center text-cyan-400"><IoStatsChartOutline /></div>
                        Logic Metrics
                    </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                    {content.landing.sections.metrics?.map((metric, idx) => (
                        <div key={idx} className="bg-white/5 border border-white/10 p-5 rounded-xl relative group hover:bg-white/10 transition-all">
                             <button onClick={() => {
                                const newArr = content.landing.sections.metrics.filter((_, i) => i !== idx);
                                updateNested("landing", "sections.metrics", newArr);
                            }} className="absolute top-4 right-4 text-white/10 hover:text-rose-500 opacity-0 group-hover:opacity-100 transition-all"><IoTrashOutline size={16}/></button>
                            <input className="bg-transparent border-none outline-none font-black text-xs uppercase text-white w-full" value={metric.t} onChange={(e) => {
                                const newArr = [...content.landing.sections.metrics];
                                newArr[idx].t = e.target.value;
                                updateNested("landing", "sections.metrics", newArr);
                            }} />
                        </div>
                    ))}
                    <button onClick={() => {
                        const newArr = [...(content.landing.sections.metrics || []), { t: "NEW_KPI" }];
                        updateNested("landing", "sections.metrics", newArr);
                    }} className="border-2 border-dashed border-white/10 rounded-xl flex items-center justify-center py-5 text-white/20 hover:text-cyan-400 hover:bg-white/5 transition-all">
                        <IoAddOutline size={20} />
                    </button>
                </div>
            </section>

          </motion.div>
        ) : (
          <motion.div key="details" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-8">
            
            {/* ROI FEATURES */}
            <section className="bg-white p-6 rounded-3xl border border-slate-100 shadow-lg shadow-slate-200/30">
                <div className="flex justify-between items-center mb-4 pb-3 border-b border-slate-100">
                    <h2 className="text-xl font-black tracking-tighter flex items-center gap-3">
                        <div className="w-8 h-8 bg-cyan-50 rounded-lg flex items-center justify-center text-cyan-600"><IoFlashOutline /></div>
                        Efficiency ROI
                    </h2>
                    <AddButton onClick={() => {
                        const newArr = [...(content.details.sections.roi || []), { title: "", desc: "", icon: "Sync" }];
                        updateNested("details", "sections.roi", newArr);
                    }} small />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {content.details.sections.roi?.map((spec, idx) => (
                        <div key={idx} className="p-5 bg-slate-50 rounded-2xl relative group border border-transparent hover:border-cyan-100 transition-all">
                            <button onClick={() => {
                                const newArr = content.details.sections.roi.filter((_, i) => i !== idx);
                                updateNested("details", "sections.roi", newArr);
                            }} className="absolute top-4 right-4 text-slate-200 hover:text-rose-500 transition-all opacity-0 group-hover:opacity-100 z-10 p-1.5 bg-white/5 rounded-lg"><IoTrashOutline size={16}/></button>
                            <div className="flex gap-4 mb-4">
                                <div className="shrink-0 relative group/icon">
                                    <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-cyan-600 text-2xl shadow-inner border border-slate-100 group-hover:scale-105 transition-transform">
                                        {spec.icon === "Sync" && <IoSyncOutline />}
                                        {spec.icon === "Flash" && <IoFlashOutline />}
                                        {spec.icon === "Extension" && <IoExtensionOutline />}
                                        {spec.icon === "Settings" && <IoSettingsOutline />}
                                        {spec.icon === "Shield" && <IoShieldOutline />}
                                        {spec.icon === "Globe" && <IoGlobeOutline />}
                                        {spec.icon === "Analytics" && <IoAnalyticsOutline />}
                                        {spec.icon === "Rocket" && <IoRocketOutline />}
                                        {spec.icon === "Layers" && <IoLayersOutline />}
                                        
                                        <select 
                                            className="absolute inset-0 opacity-0 cursor-pointer w-full h-full" 
                                            value={spec.icon} 
                                            onChange={(e) => {
                                                const newArr = [...content.details.sections.roi];
                                                newArr[idx].icon = e.target.value;
                                                updateNested("details", "sections.roi", newArr);
                                            }}
                                        >
                                            {ICON_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
                                        </select>
                                    </div>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <input placeholder="ROI Principle" className="w-full bg-transparent border-none outline-none font-black text-sm tracking-tighter mb-0.5 uppercase text-slate-900 focus:text-cyan-600 transition-colors" value={spec.title} onChange={(e) => {
                                        const newArr = [...content.details.sections.roi];
                                        newArr[idx].title = e.target.value;
                                        updateNested("details", "sections.roi", newArr);
                                    }} />
                                    <textarea placeholder="Technical explanation" rows="2" className="w-full bg-transparent border-none outline-none text-[10px] text-slate-400 font-medium leading-relaxed scrollbar-hide shrink-0" value={spec.desc} onChange={(e) => {
                                        const newArr = [...content.details.sections.roi];
                                        newArr[idx].desc = e.target.value;
                                        updateNested("details", "sections.roi", newArr);
                                    }} />
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

function Field({ label, value, onChange, textarea = false, dark = false, small = false, icon = null }) {
    return (
        <div className={small ? "w-48" : "w-full"}>
            <label className={`block text-[10px] font-black uppercase mb-1 tracking-widest ${dark ? 'text-slate-500' : 'text-slate-400'}`}>
                {label}
            </label>
            <div className={`relative flex items-center ${dark ? 'bg-white/5 border-white/5' : 'bg-slate-50 border-transparent'} border rounded-xl overflow-hidden focus-within:border-cyan-500/10 transition-all`}>
                {icon && <div className="pl-4 text-slate-400">{icon}</div>}
                {textarea ? (
                    <textarea 
                        rows="3" 
                        className={`w-full px-4 py-2 bg-transparent outline-none font-medium text-[11px] leading-relaxed shrink-0 scrollbar-hide ${dark ? 'text-white' : 'text-slate-900'}`} 
                        value={value || ""} 
                        onChange={(e) => onChange(e.target.value)} 
                    />
                ) : (
                    <input 
                        className={`w-full px-4 py-2 bg-transparent outline-none font-black text-xs ${dark ? 'text-white' : 'text-slate-900'}`} 
                        value={value || ""} 
                        onChange={(e) => onChange(e.target.value)} 
                    />
                )}
            </div>
        </div>
    );
}

function CardWrapper({ children, onRemove, highlight = false, compact = false }) {
    return (
        <div className={`${compact ? 'p-4' : 'p-6'} bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-lg transition-all relative group ${highlight ? 'ring-2 ring-cyan-600 shadow-cyan-600/10' : ''}`}>
            {onRemove && (
                <button 
                    onClick={onRemove} 
                    className="absolute top-4 right-4 text-slate-200 hover:text-rose-500 transition-colors opacity-0 group-hover:opacity-100 z-10"
                >
                    <IoTrashOutline size={16} />
                </button>
            )}
            {children}
        </div>
    );
}

function AddButton({ onClick, label = "Add", small = false }) {
    if (small) return (
        <button onClick={onClick} className="p-2 bg-cyan-50 text-cyan-600 rounded-lg hover:bg-cyan-600 hover:text-white transition-all">
            <IoAddOutline size={18} />
        </button>
    );
    return (
        <button 
            onClick={onClick}
            className="h-full min-h-[140px] border-2 border-dashed border-slate-100 rounded-2xl flex flex-col items-center justify-center gap-2 text-slate-300 hover:text-cyan-500 hover:border-cyan-200 hover:bg-cyan-50/30 transition-all group"
        >
            <div className="w-10 h-10 rounded-full border-2 border-dashed border-slate-200 flex items-center justify-center group-hover:scale-110 transition-transform">
                <IoAddOutline size={18} />
            </div>
            <span className="text-[9px] font-black uppercase tracking-widest">{label}</span>
        </button>
    );
}
