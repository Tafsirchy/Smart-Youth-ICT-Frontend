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
  IoChatbubblesOutline, IoFlashOutline, IoTerminalOutline, IoHardwareChipOutline as IoChip
} from "react-icons/io5";
import api from "@/lib/api";
import toast from "react-hot-toast";

const ICON_OPTIONS = [
  "Chatbubbles", "Chip", "Flash", "Terminal", "Shield", "Globe", "Analytics", "Rocket", "Layers"
];

const COLOR_OPTIONS = [
  { name: "Indigo", value: "from-indigo-600 to-slate-800", text: "text-indigo-600" },
  { name: "Slate", value: "from-slate-700 to-slate-900", text: "text-slate-700" },
  { name: "Blue", value: "from-blue-600 to-indigo-700", text: "text-blue-600" },
  { name: "Cyan", value: "from-cyan-500 to-blue-600", text: "text-cyan-500" }
];

export default function ChatbotCMS() {
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
        roi: [],
        phases: []
      },
      cta: { title: "" }
    }
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await api.get("/cms/services/ai-managed/chatbot");
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
      toast.error("Failed to load AI chatbot content");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await api.put("/cms/services/ai-managed/chatbot", content);
      toast.success("Intelligence node updated globally");
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

  const getIntegrity = () => {
    const missing = [];
    let score = 0;
    const total = 10;

    // Hero Landing
    if (content.landing.hero.badge) score++; else missing.push("Landing Badge");
    if (content.landing.hero.title) score++; else missing.push("Landing Title");
    if (content.landing.hero.description) score++; else missing.push("Landing Strategy");

    // Pillars
    if (content.landing.sections.pillars?.length >= 3) score += 2;
    else if (content.landing.sections.pillars?.length > 0) score++;
    else missing.push("Intelligence Pillars (Min 3)");

    // Metrics
    if (content.landing.sections.metrics?.length >= 2) score += 2;
    else missing.push("Neural Metrics (Min 2)");

    // Details ROI
    if (content.details.hero.title) score++; else missing.push("Technical Manifest Title");
    if (content.details.sections.roi?.length >= 2) score += 2;
    else missing.push("ROI Factors (Min 2)");

    return { percentage: Math.round((score / total) * 100), missing };
  };

  const integrity = getIntegrity();

  if (loading) return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-20 text-center space-y-4">
        <IoRefreshOutline className="animate-spin text-4xl text-indigo-600" />
        <span className="font-black text-slate-900 uppercase tracking-widest text-xs">Initializing Neural Pipeline...</span>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 p-6 max-w-7xl mx-auto pb-24 text-slate-900 selection:bg-indigo-600 selection:text-white">
      {/* HEADER PROTOCOL */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 text-indigo-600 mb-1">
            <IoChatbubblesOutline className="text-lg" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em]">Service_Tier_Neural_Agents</span>
          </div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tighter leading-none">AI Chatbot Solutions</h1>
          <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px] mt-1.5 ml-1">Centralized Intelligent Node</p>
        </div>
        <div className="flex items-center gap-3">
             <div className="hidden lg:flex items-center gap-2 bg-white border border-slate-200 px-4 py-2 rounded-xl shadow-sm">
                <div className="relative w-8 h-8 flex items-center justify-center">
                    <svg className="w-full h-full transform -rotate-90">
                        <circle cx="16" cy="16" r="14" stroke="currentColor" strokeWidth="3" fill="transparent" className="text-slate-100" />
                        <circle cx="16" cy="16" r="14" stroke="currentColor" strokeWidth="3" fill="transparent" strokeDasharray={88} strokeDashoffset={88 - (88 * integrity.percentage) / 100} className={`${integrity.percentage > 70 ? 'text-emerald-500' : 'text-amber-500'} transition-all duration-1000`} />
                    </svg>
                    <span className="absolute inset-0 flex items-center justify-center text-[8px] font-black">{integrity.percentage}%</span>
                </div>
                <div className="flex flex-col">
                    <span className="text-[8px] font-black uppercase text-slate-400 leading-none">Integrity_Score</span>
                    <span className={`text-[10px] font-black uppercase ${integrity.percentage > 70 ? 'text-emerald-600' : 'text-amber-600'}`}>
                        {integrity.percentage === 100 ? 'Production Ready' : 'Optimization Needed'}
                    </span>
                </div>
                {integrity.missing.length > 0 && (
                    <div className="group/missing relative ml-2">
                        <IoInformationCircleOutline className="text-slate-300 hover:text-indigo-600 cursor-help" />
                        <div className="absolute top-full right-0 mt-2 w-48 bg-slate-900 text-white p-3 rounded-xl opacity-0 group-hover/missing:opacity-100 transition-all pointer-events-none z-50 shadow-2xl">
                            <p className="text-[8px] font-black uppercase tracking-widest mb-2 border-b border-white/10 pb-1">Missing Essentials</p>
                            <ul className="space-y-1">
                                {integrity.missing.map(m => (
                                    <li key={m} className="text-[9px] font-medium flex items-center gap-2 text-slate-400">
                                        <div className="w-1 h-1 rounded-full bg-rose-500" /> {m}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                )}
            </div>
            <button 
                onClick={handleSave}
                disabled={saving}
                className="group relative overflow-hidden px-8 py-3.5 bg-slate-900 text-white rounded-xl font-black uppercase tracking-widest text-[10px] flex items-center gap-3 hover:shadow-xl hover:shadow-indigo-950/20 transition-all active:scale-95 disabled:opacity-50"
            >
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-slate-900 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative flex items-center gap-3">
                    {saving ? <IoRefreshOutline className="animate-spin" /> : <IoSaveOutline className="group-hover:rotate-12 transition-transform" />}
                    Deploy Neural Updates
                </div>
            </button>
        </div>
      </div>

       {/* TIER SELECTOR */}
       <div className="flex gap-1 mb-6 bg-white p-1 rounded-xl border border-slate-200 w-fit shadow-sm">
        {[
          { id: "landing", label: "Agent Landing", icon: IoLayersOutline, color: "text-indigo-500" },
          { id: "details", label: "Technical Manifest", icon: IoSettingsOutline, color: "text-slate-500" },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-5 py-2 rounded-lg font-black uppercase tracking-widest text-[9px] transition-all ${activeTab === tab.id ? 'bg-slate-900 text-white shadow-md' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'}`}
          >
            <tab.icon size={15} className={activeTab === tab.id ? 'text-indigo-400' : tab.color} />
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
                        <div className="w-8 h-8 bg-indigo-50 rounded-lg flex items-center justify-center text-indigo-600"><IoPrismOutline /></div>
                        Hero Architecture
                    </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Field label="Badge" value={content.landing.hero.badge} onChange={(v) => updateNested("landing", "hero.badge", v)} error={!content.landing.hero.badge} />
                    <Field label="Title" value={content.landing.hero.title} onChange={(v) => updateNested("landing", "hero.title", v)} error={!content.landing.hero.title} />
                    <div className="md:col-span-2">
                        <Field label="Intelligence Strategy" value={content.landing.hero.description} onChange={(v) => updateNested("landing", "hero.description", v)} textarea error={!content.landing.hero.description} />
                    </div>
                </div>
            </section>

             {/* PILLARS */}
             <section className="bg-white p-6 rounded-3xl border border-slate-100 shadow-lg shadow-slate-200/30">
                <div className="flex justify-between items-center mb-4 pb-3 border-b border-slate-100">
                    <h2 className="text-xl font-black tracking-tighter flex items-center gap-3">
                        <div className="w-8 h-8 bg-indigo-50 rounded-lg flex items-center justify-center text-indigo-600"><IoTerminalOutline /></div>
                        Intelligence Pillars
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
                                    <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center text-indigo-600 text-2xl shadow-inner border border-slate-100 group-hover:scale-105 transition-all">
                                        {item.icon === "Chatbubbles" && <IoChatbubblesOutline />}
                                        {item.icon === "Chip" && <IoChip />}
                                        {item.icon === "Flash" && <IoFlashOutline />}
                                        {item.icon === "Terminal" && <IoTerminalOutline />}
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
                                    <input placeholder="Pillar Name" className="w-full bg-transparent border-none outline-none font-black text-sm uppercase tracking-tighter" value={item.title} onChange={(e) => {
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
                            <textarea placeholder="Neural rationale" rows="3" className="w-full bg-slate-50 border border-transparent focus:bg-white focus:border-slate-100 rounded-xl p-3 text-[11px] text-slate-500 leading-relaxed outline-none transition-all scrollbar-hide" value={item.desc} onChange={(e) => {
                                const newArr = [...content.landing.sections.pillars];
                                newArr[idx].desc = e.target.value;
                                updateNested("landing", "sections.pillars", newArr);
                            }} />
                        </CardWrapper>
                    ))}
                    <AddButton onClick={() => {
                        const newArr = [...(content.landing.sections.pillars || []), { title: "New Intelligence Node", desc: "", icon: "Chip", color: "from-indigo-600 to-slate-800" }];
                        updateNested("landing", "sections.pillars", newArr);
                    }} label="Add Intelligence Node" />
                </div>
            </section>

            {/* METRICS */}
            <section className="bg-slate-900 p-6 rounded-3xl text-white shadow-xl">
                 <div className="flex justify-between items-center mb-4 pb-3 border-b border-white/10">
                    <h2 className="text-xl font-black tracking-tighter flex items-center gap-3">
                        <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center text-indigo-400"><IoStatsChartOutline /></div>
                        Neural Metrics
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
                    }} className="border-2 border-dashed border-white/10 rounded-xl flex items-center justify-center py-5 text-white/20 hover:text-indigo-400 hover:bg-white/5 transition-all">
                        <IoAddOutline size={20} />
                    </button>
                </div>
            </section>

            {/* CALL TO ACTION */}
            <section className="bg-white p-6 rounded-3xl border border-slate-100 shadow-lg shadow-slate-200/30">
                <div className="flex justify-between items-center mb-4 pb-3 border-b border-slate-100">
                    <h2 className="text-xl font-black tracking-tighter flex items-center gap-3">
                        <div className="w-8 h-8 bg-indigo-50 rounded-lg flex items-center justify-center text-indigo-600"><IoRocketOutline /></div>
                        Call-To-Action Ribbon
                    </h2>
                </div>
                <div className="max-w-md">
                    <Field 
                        label="Button Title" 
                        value={content.landing.cta.title} 
                        onChange={(v) => updateNested("landing", "cta.title", v)} 
                        icon={<IoFlashOutline className="text-indigo-600" />}
                    />
                </div>
            </section>

          </motion.div>
        ) : (
          <motion.div key="details" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-8">
            
            {/* TRAINING LIFECYCLE (PHASES) */}
            <section className="bg-white p-6 rounded-3xl border border-slate-100 shadow-lg shadow-slate-200/30">
                <div className="flex justify-between items-center mb-4 pb-3 border-b border-slate-100">
                    <h2 className="text-xl font-black tracking-tighter flex items-center gap-3">
                        <div className="w-8 h-8 bg-amber-50 rounded-lg flex items-center justify-center text-amber-600"><IoRocketOutline /></div>
                        Training Lifecycle
                    </h2>
                    <AddButton onClick={() => {
                        const newArr = [...(content.details.sections.phases || []), { step: "01", stage: "", action: "" }];
                        updateNested("details", "sections.phases", newArr);
                    }} small />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {content.details.sections.phases?.map((phase, idx) => (
                        <CardWrapper key={idx} onRemove={() => {
                            const newArr = content.details.sections.phases.filter((_, i) => i !== idx);
                            updateNested("details", "sections.phases", newArr);
                        }} compact>
                            <div className="flex gap-3 mb-3">
                                <input placeholder="01" className="w-10 bg-slate-50 border-none outline-none font-mono text-[10px] text-amber-600 font-bold px-2 py-1 rounded-md" value={phase.step} onChange={(e) => {
                                    const newArr = [...content.details.sections.phases];
                                    newArr[idx].step = e.target.value;
                                    updateNested("details", "sections.phases", newArr);
                                }} />
                                <input placeholder="Stage Name" className="flex-1 bg-transparent border-none outline-none font-black text-xs uppercase tracking-tight" value={phase.stage} onChange={(e) => {
                                    const newArr = [...content.details.sections.phases];
                                    newArr[idx].stage = e.target.value;
                                    updateNested("details", "sections.phases", newArr);
                                }} />
                            </div>
                            <textarea placeholder="Phase action/description" rows="3" className="w-full bg-slate-50 border border-transparent focus:bg-white focus:border-slate-100 rounded-xl p-3 text-[10px] text-slate-500 leading-relaxed outline-none transition-all scrollbar-hide" value={phase.action} onChange={(e) => {
                                const newArr = [...content.details.sections.phases];
                                newArr[idx].action = e.target.value;
                                updateNested("details", "sections.phases", newArr);
                            }} />
                        </CardWrapper>
                    ))}
                </div>
            </section>

            {/* ROI FEATURES (GROUPED) */}
            <section className="bg-white p-6 rounded-3xl border border-slate-100 shadow-lg shadow-slate-200/30">
                <div className="flex justify-between items-center mb-4 pb-3 border-b border-slate-100">
                    <h2 className="text-xl font-black tracking-tighter flex items-center gap-3">
                        <div className="w-8 h-8 bg-indigo-50 rounded-lg flex items-center justify-center text-indigo-600"><IoFlashOutline /></div>
                        Intelligence Frameworks
                    </h2>
                    <AddButton onClick={() => {
                        const newArr = [...(content.details.sections.roi || []), { group: "", items: [] }];
                        updateNested("details", "sections.roi", newArr);
                    }} small />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {content.details.sections.roi?.map((spec, idx) => (
                        <div key={idx} className="p-5 bg-slate-50 rounded-2xl relative group border border-transparent hover:border-indigo-100 transition-all">
                            <button onClick={() => {
                                const newArr = content.details.sections.roi.filter((_, i) => i !== idx);
                                updateNested("details", "sections.roi", newArr);
                            }} className="absolute top-4 right-4 text-slate-200 hover:text-rose-500 transition-all opacity-0 group-hover:opacity-100 z-10 p-1.5 bg-white/5 rounded-lg"><IoTrashOutline size={16}/></button>
                            
                            <div className="mb-4">
                                <label className="text-[8px] font-black uppercase text-indigo-600 mb-1 block">Framework Group</label>
                                <input placeholder="e.g. Intelligence Tier" className="w-full bg-transparent border-none outline-none font-black text-sm tracking-tighter uppercase text-slate-900 focus:text-indigo-600 transition-colors" value={spec.group} onChange={(e) => {
                                    const newArr = [...content.details.sections.roi];
                                    newArr[idx].group = e.target.value;
                                    updateNested("details", "sections.roi", newArr);
                                }} />
                            </div>
                            
                            <div>
                                <label className="text-[8px] font-black uppercase text-slate-400 mb-1 block">Framework Items (Comma Separated)</label>
                                <textarea 
                                    placeholder="GPT-4o, Custom Vector DB, NLP..." 
                                    rows="3" 
                                    className="w-full bg-white border border-slate-100 rounded-xl p-3 text-[10px] text-slate-500 font-medium leading-relaxed outline-none transition-all scrollbar-hide" 
                                    value={spec.items?.join(", ")} 
                                    onChange={(e) => {
                                        const newArr = [...content.details.sections.roi];
                                        newArr[idx].items = e.target.value.split(",").map(i => i.trim()).filter(i => i !== "");
                                        updateNested("details", "sections.roi", newArr);
                                    }} 
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* CALL TO ACTION */}
            <section className="bg-white p-6 rounded-3xl border border-slate-100 shadow-lg shadow-slate-200/30">
                <div className="flex justify-between items-center mb-4 pb-3 border-b border-slate-100">
                    <h2 className="text-xl font-black tracking-tighter flex items-center gap-3">
                        <div className="w-8 h-8 bg-indigo-50 rounded-lg flex items-center justify-center text-indigo-600"><IoRocketOutline /></div>
                        Call-To-Action Ribbon
                    </h2>
                </div>
                <div className="max-w-md">
                    <Field 
                        label="Button Title" 
                        value={content.details.cta.title} 
                        onChange={(v) => updateNested("details", "cta.title", v)} 
                        icon={<IoFlashOutline className="text-indigo-600" />}
                    />
                </div>
            </section>

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Field({ label, value, onChange, textarea = false, dark = false, small = false, icon = null, error = false }) {
    return (
        <div className={small ? "w-48" : "w-full"}>
            <div className="flex justify-between items-center mb-1">
                <label className={`block text-[10px] font-black uppercase tracking-widest ${dark ? 'text-slate-500' : 'text-slate-400'}`}>
                    {label}
                </label>
                {error && <span className="text-[8px] font-bold uppercase text-amber-500 animate-pulse">Missing Content</span>}
            </div>
            <div className={`relative flex items-center ${dark ? 'bg-white/5 border-white/5' : 'bg-slate-50 border-transparent'} border rounded-xl overflow-hidden focus-within:border-indigo-500/10 transition-all ${error ? 'ring-2 ring-amber-500/20' : ''}`}>
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
        <div className={`${compact ? 'p-4' : 'p-6'} bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-lg transition-all relative group ${highlight ? 'ring-2 ring-indigo-600 shadow-indigo-600/10' : ''}`}>
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
        <button onClick={onClick} className="p-2 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-600 hover:text-white transition-all">
            <IoAddOutline size={18} />
        </button>
    );
    return (
        <button 
            onClick={onClick}
            className="h-full min-h-[140px] border-2 border-dashed border-slate-100 rounded-2xl flex flex-col items-center justify-center gap-2 text-slate-300 hover:text-indigo-500 hover:border-indigo-200 hover:bg-indigo-50/30 transition-all group"
        >
            <div className="w-10 h-10 rounded-full border-2 border-dashed border-slate-200 flex items-center justify-center group-hover:scale-110 transition-transform">
                <IoAddOutline size={18} />
            </div>
            <span className="text-[9px] font-black uppercase tracking-widest">{label}</span>
        </button>
    );
}
