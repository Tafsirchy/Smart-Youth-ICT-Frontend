"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  IoSaveOutline, IoRefreshOutline, IoAddOutline, IoTrashOutline, 
  IoLayersOutline, IoSettingsOutline, IoPrismOutline, IoCodeSlashOutline, 
  IoCheckmarkOutline, IoChevronForwardOutline, IoChevronDownOutline,
  IoStatsChartOutline, IoShieldCheckmarkOutline, IoGlobeOutline,
  IoRocketOutline, IoBriefcaseOutline, IoGitNetworkOutline, IoAnalyticsOutline,
  IoShieldOutline, IoSparklesOutline, IoHardwareChipOutline, IoArrowBackOutline,
  IoImageOutline, IoListOutline, IoColorPaletteOutline, IoInformationCircleOutline,
  IoSyncOutline, IoCloudUploadOutline, IoTimerOutline, IoReaderOutline, IoStorefrontOutline,
  IoPeopleOutline
} from "react-icons/io5";
import api from "@/lib/api";
import toast from "react-hot-toast";

const ICON_OPTIONS = [
  "People", "Layers", "Stats", "Storefront", "Sync", "Shield", "GitNetwork", "Code", "Settings", "Reader", "Rocket", "Globe"
];

const COLOR_OPTIONS = [
  { name: "Teal", value: "from-teal-600 to-emerald-700", text: "text-teal-600" },
  { name: "Emerald", value: "from-emerald-500 to-teal-600", text: "text-emerald-500" },
  { name: "Slate", value: "from-slate-700 to-slate-900", text: "text-slate-700" },
  { name: "Blue", value: "from-blue-600 to-indigo-700", text: "text-blue-600" },
  { name: "Amber", value: "from-orange-500 to-amber-600", text: "text-amber-500" }
];

export default function ErpCrmCMS() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState("landing");
  const [content, setContent] = useState({
    landing: {
      hero: { badge: "", title: "", subtitle: "", description: "" },
      sections: { 
        verticals: [], 
        integrations: [], 
        pricing: [] 
      },
      cta: { title: "" }
    },
    details: {
      hero: { badge: "", title: "", subtitle: "", description: "" },
      sections: { 
        phases: [], 
        manifest: [], 
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
      const res = await api.get("/cms/services/web-software/erp-crm");
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
      toast.error("Failed to load ERP/CRM content");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await api.put("/cms/services/web-software/erp-crm", content);
      toast.success("Enterprise ecosystem updated globally");
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
        <IoRefreshOutline className="animate-spin text-4xl text-teal-600" />
        <span className="font-black text-slate-900 uppercase tracking-widest text-xs">Initializing Enterprise Environment...</span>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 p-6 max-w-7xl mx-auto pb-24 text-slate-900 selection:bg-teal-600 selection:text-white">
      {/* HEADER PROTOCOL */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 text-teal-600 mb-1">
            <IoSyncOutline className="text-lg" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em]">Service_Tier_Enterprise_Systems</span>
          </div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tighter leading-none">ERP / CRM / POS Systems</h1>
          <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px] mt-1.5 ml-1">Centralized Operational Node</p>
        </div>
        <button 
          onClick={handleSave}
          disabled={saving}
          className="group relative overflow-hidden px-8 py-3.5 bg-slate-900 text-white rounded-xl font-black uppercase tracking-widest text-[10px] flex items-center gap-3 hover:shadow-xl hover:shadow-teal-950/20 transition-all active:scale-95 disabled:opacity-50"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-teal-600 to-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="relative flex items-center gap-3">
            {saving ? <IoRefreshOutline className="animate-spin" /> : <IoSaveOutline className="group-hover:rotate-12 transition-transform" />}
            Deploy Enterprise Logic
          </div>
        </button>
      </div>

       {/* TIER SELECTOR */}
       <div className="flex gap-1 mb-6 bg-white p-1 rounded-xl border border-slate-200 w-fit shadow-sm">
        {[
          { id: "landing", label: "Operations Landing", icon: IoLayersOutline, color: "text-teal-500" },
          { id: "details", label: "Systems Manifest", icon: IoSettingsOutline, color: "text-indigo-500" },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-5 py-2 rounded-lg font-black uppercase tracking-widest text-[9px] transition-all ${activeTab === tab.id ? 'bg-slate-900 text-white shadow-md' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'}`}
          >
            <tab.icon size={15} className={activeTab === tab.id ? 'text-teal-400' : tab.color} />
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
                        <div className="w-8 h-8 bg-teal-50 rounded-lg flex items-center justify-center text-teal-600"><IoPrismOutline /></div>
                        Hero Protocol
                    </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <Field label="Badge" value={content.landing.hero.badge} onChange={(v) => updateNested("landing", "hero.badge", v)} />
                    <Field label="Title" value={content.landing.hero.title} onChange={(v) => updateNested("landing", "hero.title", v)} />
                    <Field label="Subtitle" value={content.landing.hero.subtitle} onChange={(v) => updateNested("landing", "hero.subtitle", v)} />
                    <div className="md:col-span-3">
                        <Field label="Operational Description" value={content.landing.hero.description} onChange={(v) => updateNested("landing", "hero.description", v)} textarea />
                    </div>
                </div>
            </section>

             {/* VERTICALS */}
             <section className="bg-white p-6 rounded-3xl border border-slate-100 shadow-lg shadow-slate-200/30">
                <div className="flex justify-between items-center mb-4 pb-3 border-b border-slate-100">
                    <h2 className="text-xl font-black tracking-tighter flex items-center gap-3">
                        <div className="w-8 h-8 bg-teal-50 rounded-lg flex items-center justify-center text-teal-600"><IoSyncOutline /></div>
                        System Verticals
                    </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-4">
                    {content.landing.sections.verticals?.map((item, idx) => (
                        <CardWrapper key={idx} onRemove={() => {
                            const newArr = content.landing.sections.verticals.filter((_, i) => i !== idx);
                            updateNested("landing", "sections.verticals", newArr);
                        }} compact>
                             <div className="flex gap-4 mb-4">
                                <div className="shrink-0 relative group/icon">
                                    <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center text-teal-600 text-2xl shadow-inner border border-slate-100 group-hover:scale-105 transition-all">
                                        {item.icon === "People" && <IoPeopleOutline />}
                                        {item.icon === "Layers" && <IoLayersOutline />}
                                        {item.icon === "Stats" && <IoStatsChartOutline />}
                                        {item.icon === "Storefront" && <IoStorefrontOutline />}
                                        {item.icon === "Sync" && <IoSyncOutline />}
                                        {item.icon === "Shield" && <IoShieldOutline />}
                                        {item.icon === "GitNetwork" && <IoGitNetworkOutline />}
                                        {item.icon === "Code" && <IoCodeSlashOutline />}
                                        {item.icon === "Settings" && <IoSettingsOutline />}
                                        {item.icon === "Reader" && <IoReaderOutline />}
                                        {item.icon === "Rocket" && <IoRocketOutline />}
                                        {item.icon === "Globe" && <IoGlobeOutline />}
                                        
                                        <select 
                                            className="absolute inset-0 opacity-0 cursor-pointer w-full h-full" 
                                            value={item.icon} 
                                            onChange={(e) => {
                                                const newArr = [...content.landing.sections.verticals];
                                                newArr[idx].icon = e.target.value;
                                                updateNested("landing", "sections.verticals", newArr);
                                            }}
                                        >
                                            {ICON_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
                                        </select>
                                    </div>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <input placeholder="Vertical" className="w-full bg-transparent border-none outline-none font-black text-sm uppercase tracking-tighter" value={item.title} onChange={(e) => {
                                        const newArr = [...content.landing.sections.verticals];
                                        newArr[idx].title = e.target.value;
                                        updateNested("landing", "sections.verticals", newArr);
                                    }} />
                                    <div className="flex items-center gap-1.5 mt-1">
                                        <IoColorPaletteOutline className="text-slate-300 text-[10px]" />
                                        <select className="bg-transparent border-none outline-none text-[8px] font-bold text-slate-400 uppercase" value={item.color} onChange={(e) => {
                                            const newArr = [...content.landing.sections.verticals];
                                            newArr[idx].color = e.target.value;
                                            updateNested("landing", "sections.verticals", newArr);
                                        }}>
                                            {COLOR_OPTIONS.map(c => <option key={c.value} value={c.value}>{c.name}</option>)}
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <textarea placeholder="Feature Detail" rows="3" className="w-full bg-slate-50 border border-transparent focus:bg-white focus:border-slate-100 rounded-xl p-3 text-[11px] text-slate-500 leading-relaxed outline-none transition-all scrollbar-hide" value={item.desc} onChange={(e) => {
                                const newArr = [...content.landing.sections.verticals];
                                newArr[idx].desc = e.target.value;
                                updateNested("landing", "sections.verticals", newArr);
                            }} />
                        </CardWrapper>
                    ))}
                    <AddButton onClick={() => {
                        const newArr = [...(content.landing.sections.verticals || []), { title: "New System", desc: "", icon: "Layers", color: "from-teal-600 to-emerald-700" }];
                        updateNested("landing", "sections.verticals", newArr);
                    }} label="Add System" />
                </div>
            </section>

             {/* INFRASTRUCTURE / INTEGRATIONS */}
             <section className="bg-slate-900 p-6 rounded-3xl text-white shadow-xl">
                 <div className="flex justify-between items-center mb-4 pb-3 border-b border-white/10">
                    <h2 className="text-xl font-black tracking-tighter flex items-center gap-3">
                        <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center text-teal-400"><IoHardwareChipOutline /></div>
                        Core Infrastructure
                    </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {content.landing.sections.integrations?.map((item, idx) => (
                        <div key={idx} className="bg-white/5 border border-white/10 p-6 rounded-2xl relative group">
                             <button onClick={() => {
                                const newArr = content.landing.sections.integrations.filter((_, i) => i !== idx);
                                updateNested("landing", "sections.integrations", newArr);
                             }} className="absolute top-4 right-4 text-white/20 hover:text-rose-500 opacity-0 group-hover:opacity-100 transition-all"><IoTrashOutline size={16}/></button>
                             <input placeholder="Stack layer" className="bg-transparent border-none outline-none font-black text-[9px] uppercase tracking-widest text-slate-500 mb-4 block" value={item.group} onChange={(e) => {
                                const newArr = [...content.landing.sections.integrations];
                                newArr[idx].group = e.target.value;
                                updateNested("landing", "sections.integrations", newArr);
                             }} />
                             <div className="flex flex-wrap gap-2">
                                {item.tags?.map((tag, tIdx) => (
                                    <div key={tIdx} className="bg-white/10 px-3 py-1 rounded-lg flex items-center gap-2">
                                         <input className="bg-transparent border-none outline-none font-bold text-[9px] text-teal-400 w-16" value={tag} onChange={(e) => {
                                            const newArr = [...content.landing.sections.integrations];
                                            newArr[idx].tags[tIdx] = e.target.value;
                                            updateNested("landing", "sections.integrations", newArr);
                                         }} />
                                         <button onClick={() => {
                                            const newArr = [...content.landing.sections.integrations];
                                            newArr[idx].tags = newArr[idx].tags.filter((_, i) => i !== tIdx);
                                            updateNested("landing", "sections.integrations", newArr);
                                         }} className="text-white/10 hover:text-rose-500"><IoTrashOutline size={10}/></button>
                                    </div>
                                ))}
                                <button onClick={() => {
                                    const newArr = [...content.landing.sections.integrations];
                                    newArr[idx].tags = [...(newArr[idx].tags || []), "NEW"];
                                    updateNested("landing", "sections.integrations", newArr);
                                }} className="text-[9px] font-black text-teal-500 border border-teal-500/30 px-2 py-1 rounded-lg">+ Add</button>
                             </div>
                        </div>
                    ))}
                    <button onClick={() => {
                        const newArr = [...(content.landing.sections.integrations || []), { group: "NEW GROUP", tags: [] }];
                        updateNested("landing", "sections.integrations", newArr);
                    }} className="h-full min-h-[140px] border-2 border-dashed border-white/10 rounded-2xl flex flex-col items-center justify-center gap-2 text-white/20 hover:text-teal-400 hover:border-teal-400/30 hover:bg-white/5 transition-all">
                        <IoAddOutline size={20} />
                        <span className="text-[9px] font-black uppercase tracking-widest">Add Stack Layer</span>
                    </button>
                </div>
            </section>

             {/* PRICING */}
             <section className="bg-white p-6 rounded-3xl border border-slate-100 shadow-lg shadow-slate-200/30">
                <div className="flex justify-between items-center mb-4 pb-3 border-b border-slate-100">
                    <h2 className="text-xl font-black tracking-tighter flex items-center gap-3">
                        <div className="w-8 h-8 bg-emerald-50 rounded-lg flex items-center justify-center text-emerald-600"><IoStatsChartOutline /></div>
                        System Licenses
                    </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {content.landing.sections.pricing?.map((tier, idx) => (
                        <CardWrapper 
                            key={idx} 
                            highlight={tier.highlight}
                            onRemove={() => {
                                const newArr = content.landing.sections.pricing.filter((_, i) => i !== idx);
                                updateNested("landing", "sections.pricing", newArr);
                            }}
                            compact
                        >
                            <div className="flex justify-between items-start mb-4">
                                <input placeholder="Tier Name" className="text-lg font-black uppercase tracking-tighter bg-transparent outline-none w-full" value={tier.t} onChange={(e) => {
                                    const newArr = [...content.landing.sections.pricing];
                                    newArr[idx].t = e.target.value;
                                    updateNested("landing", "sections.pricing", newArr);
                                }} />
                                <button onClick={() => {
                                    const newArr = [...content.landing.sections.pricing];
                                    newArr[idx].highlight = !newArr[idx].highlight;
                                    updateNested("landing", "sections.pricing", newArr);
                                }} className={`p-1.5 rounded-lg transition-all ${tier.highlight ? 'bg-teal-600 text-white shadow-lg' : 'bg-slate-50 text-slate-300 hover:text-teal-500'}`}><IoSparklesOutline size={12}/></button>
                            </div>
                            <input placeholder="Price" className="text-3xl font-black text-slate-900 mb-6 bg-transparent outline-none w-full" value={tier.p} onChange={(e) => {
                                const newArr = [...content.landing.sections.pricing];
                                newArr[idx].p = e.target.value;
                                updateNested("landing", "sections.pricing", newArr);
                            }} />
                            <div className="space-y-2 mb-8 min-h-[140px]">
                                <label className="text-[8px] font-black uppercase text-slate-400 tracking-widest block mb-2">Payload Features</label>
                                {tier.list?.map((feature, fIdx) => (
                                    <div key={fIdx} className="flex gap-2 group/feat items-center">
                                        <IoCheckmarkOutline className="text-teal-500 shrink-0 text-xs" />
                                        <input className="text-[11px] font-bold text-slate-600 bg-transparent outline-none w-full border-b border-transparent focus:border-slate-100" value={feature} onChange={(e) => {
                                            const newArr = [...content.landing.sections.pricing];
                                            newArr[idx].list[fIdx] = e.target.value;
                                            updateNested("landing", "sections.pricing", newArr);
                                        }} />
                                        <button onClick={() => {
                                            const newArr = [...content.landing.sections.pricing];
                                            newArr[idx].list = newArr[idx].list.filter((_, i) => i !== fIdx);
                                            updateNested("landing", "sections.pricing", newArr);
                                        }} className="opacity-0 group-hover/feat:opacity-100 text-rose-500 transition-all"><IoTrashOutline size={12}/></button>
                                    </div>
                                ))}
                                <button onClick={() => {
                                    const newArr = [...content.landing.sections.pricing];
                                    newArr[idx].list = [...(newArr[idx].list || []), "New Feature"];
                                    updateNested("landing", "sections.pricing", newArr);
                                }} className="text-[9px] font-black text-teal-500 mt-1 hover:underline">+ Add Feature</button>
                            </div>
                        </CardWrapper>
                    ))}
                    <AddButton onClick={() => {
                        const newArr = [...(content.landing.sections.pricing || []), { t: "Standard", p: "$1999", list: [], color: "teal", highlight: false }];
                        updateNested("landing", "sections.pricing", newArr);
                    }} label="Add License" />
                </div>
            </section>

          </motion.div>
        ) : (
          <motion.div key="details" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-8">
            
             {/* PHASES */}
             <section className="bg-white p-6 rounded-3xl border border-slate-100 shadow-lg shadow-slate-200/30">
                <div className="flex justify-between items-center mb-4 pb-3 border-b border-slate-100">
                    <h2 className="text-xl font-black tracking-tighter flex items-center gap-3">
                        <div className="w-8 h-8 bg-teal-50 rounded-lg flex items-center justify-center text-teal-600"><IoReaderOutline /></div>
                        Implementation Roadmap
                    </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-slate-100 border border-slate-100 rounded-2xl overflow-hidden">
                    {content.details.sections.phases?.map((phase, idx) => (
                        <div key={idx} className="p-8 bg-white hover:bg-slate-50 transition-colors relative group">
                            <button onClick={() => {
                                const newArr = content.details.sections.phases.filter((_, i) => i !== idx);
                                updateNested("details", "sections.phases", newArr);
                            }} className="absolute top-4 right-4 text-slate-200 hover:text-rose-500 transition-all opacity-0 group-hover:opacity-100"><IoTrashOutline size={16}/></button>
                            <div className="flex items-center gap-4 mb-4">
                                <span className="text-[10px] font-black text-teal-500 bg-teal-50 px-2 py-1 rounded">{phase.step}</span>
                                <input placeholder="Phase Name" className="bg-transparent border-none outline-none font-black text-sm uppercase text-slate-900 flex-1" value={phase.t} onChange={(e) => {
                                    const newArr = [...content.details.sections.phases];
                                    newArr[idx].t = e.target.value;
                                    updateNested("details", "sections.phases", newArr);
                                }} />
                            </div>
                            <textarea placeholder="Detail" rows="3" className="w-full bg-transparent border-none outline-none text-[10px] text-slate-400 font-medium leading-relaxed" value={phase.d} onChange={(e) => {
                                const newArr = [...content.details.sections.phases];
                                newArr[idx].d = e.target.value;
                                updateNested("details", "sections.phases", newArr);
                            }} />
                        </div>
                    ))}
                    <button onClick={() => {
                         const newArr = [...(content.details.sections.phases || []), { t: "New Phase", d: "", step: "0"+((content.details.sections.phases?.length || 0)+1), icon: "Settings" }];
                         updateNested("details", "sections.phases", newArr);
                    }} className="bg-white flex flex-col items-center justify-center gap-2 text-slate-300 hover:text-teal-500 hover:bg-slate-50 transition-all min-h-[180px]">
                        <IoAddOutline size={24} />
                        <span className="text-[9px] font-black uppercase tracking-widest">Append Phase</span>
                    </button>
                </div>
            </section>

             {/* INFRASTRUCTURE MANIFEST */}
             <section className="bg-slate-900 p-6 rounded-3xl text-white shadow-xl">
                <div className="flex items-center gap-3 mb-6 pb-3 border-b border-white/10">
                    <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center text-teal-400"><IoHardwareChipOutline /></div>
                    <h2 className="text-xl font-black tracking-tighter">Systems Manifest</h2>
                </div>
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-y-2 gap-x-16">
                     {content.details.sections.manifest?.map((item, idx) => (
                        <div key={idx} className="flex justify-between items-center py-2 border-b border-white/5 last:border-0 group relative gap-4">
                             <input className="bg-transparent border-none outline-none text-[10px] uppercase font-black tracking-widest text-slate-500 w-[40%]" value={item.label} onChange={(e) => {
                                const newArr = [...content.details.sections.manifest];
                                newArr[idx].label = e.target.value;
                                updateNested("details", "sections.manifest", newArr);
                             }} />
                             <input className="bg-transparent border-none outline-none text-right font-bold text-[11px] w-[60%] text-white focus:text-teal-400 transition-colors" value={item.value} onChange={(e) => {
                                const newArr = [...content.details.sections.manifest];
                                newArr[idx].value = e.target.value;
                                updateNested("details", "sections.manifest", newArr);
                             }} />
                             <button onClick={() => {
                                const newArr = content.details.sections.manifest.filter((_, i) => i !== idx);
                                updateNested("details", "sections.manifest", newArr);
                             }} className="absolute -left-6 opacity-0 group-hover:opacity-100 text-rose-500 transition-all p-1 hover:bg-white/5 rounded"><IoTrashOutline size={12}/></button>
                        </div>
                     ))}
                     <button onClick={() => {
                        const newArr = [...(content.details.sections.manifest || []), { label: "NEW_PROTOCOL", value: "NODE_VAL" }];
                        updateNested("details", "sections.manifest", newArr);
                     }} className="py-3 border border-dashed border-white/10 rounded-xl text-[9px] font-black uppercase text-teal-400 hover:bg-white/5 transition-all">+ Add Protocol Node</button>
                </div>
            </section>

             {/* ROI FEATURES */}
             <section className="bg-white p-6 rounded-3xl border border-slate-100 shadow-lg shadow-slate-200/30">
                <div className="flex justify-between items-center mb-4 pb-3 border-b border-slate-100">
                    <h2 className="text-xl font-black tracking-tighter flex items-center gap-3">
                        <div className="w-8 h-8 bg-teal-50 rounded-lg flex items-center justify-center text-teal-600"><IoStatsChartOutline /></div>
                        Operational ROI
                    </h2>
                    <AddButton onClick={() => {
                        const newArr = [...(content.details.sections.roi || []), { title: "", desc: "", icon: "Stats", support: "" }];
                        updateNested("details", "sections.roi", newArr);
                    }} small />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {content.details.sections.roi?.map((spec, idx) => (
                        <div key={idx} className="p-5 bg-slate-50 rounded-2xl relative group border border-transparent hover:border-teal-100 transition-all">
                            <button onClick={() => {
                                const newArr = content.details.sections.roi.filter((_, i) => i !== idx);
                                updateNested("details", "sections.roi", newArr);
                            }} className="absolute top-4 right-4 text-slate-200 hover:text-rose-500 transition-all opacity-0 group-hover:opacity-100 z-10 p-1.5 bg-white/5 rounded-lg"><IoTrashOutline size={16}/></button>
                            <div className="flex gap-4 mb-4">
                                <div className="shrink-0 relative group/icon">
                                    <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-teal-600 text-2xl shadow-inner border border-slate-100 group-hover:scale-105 transition-transform">
                                        {spec.icon === "People" && <IoPeopleOutline />}
                                        {spec.icon === "Layers" && <IoLayersOutline />}
                                        {spec.icon === "Stats" && <IoStatsChartOutline />}
                                        {spec.icon === "Storefront" && <IoStorefrontOutline />}
                                        {spec.icon === "Sync" && <IoSyncOutline />}
                                        {spec.icon === "Shield" && <IoShieldOutline />}
                                        {spec.icon === "GitNetwork" && <IoGitNetworkOutline />}
                                        {spec.icon === "Code" && <IoCodeSlashOutline />}
                                        {spec.icon === "Settings" && <IoSettingsOutline />}
                                        {spec.icon === "Reader" && <IoReaderOutline />}
                                        {spec.icon === "Rocket" && <IoRocketOutline />}
                                        {spec.icon === "Globe" && <IoGlobeOutline />}
                                        
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
                                    <input placeholder="ROI Title" className="w-full bg-transparent border-none outline-none font-black text-sm tracking-tighter mb-0.5 uppercase text-slate-900 focus:text-teal-600 transition-colors" value={spec.title} onChange={(e) => {
                                        const newArr = [...content.details.sections.roi];
                                        newArr[idx].title = e.target.value;
                                        updateNested("details", "sections.roi", newArr);
                                    }} />
                                    <textarea placeholder="Description" rows="2" className="w-full bg-transparent border-none outline-none text-[10px] text-slate-400 font-medium leading-relaxed scrollbar-hide" value={spec.desc} onChange={(e) => {
                                        const newArr = [...content.details.sections.roi];
                                        newArr[idx].desc = e.target.value;
                                        updateNested("details", "sections.roi", newArr);
                                    }} />
                                </div>
                            </div>
                            <div className="pt-3 border-t border-slate-200/50 flex items-center justify-between">
                                 <span className="text-[9px] font-black uppercase text-slate-400 tracking-widest">Bridged Standards</span>
                                 <input className="bg-transparent border-none outline-none text-[10px] font-bold text-teal-600 text-right w-1/2 focus:text-teal-500" value={spec.support} onChange={(e) => {
                                    const newArr = [...content.details.sections.roi];
                                    newArr[idx].support = e.target.value;
                                    updateNested("details", "sections.roi", newArr);
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

function Field({ label, value, onChange, textarea = false, dark = false, small = false, icon = null }) {
    return (
        <div className={small ? "w-48" : "w-full"}>
            <label className={`block text-[10px] font-black uppercase mb-1 tracking-widest ${dark ? 'text-slate-500' : 'text-slate-400'}`}>
                {label}
            </label>
            <div className={`relative flex items-center ${dark ? 'bg-white/5 border-white/5' : 'bg-slate-50 border-transparent'} border rounded-xl overflow-hidden focus-within:border-teal-500/10 transition-all`}>
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
        <div className={`${compact ? 'p-4' : 'p-6'} bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-lg transition-all relative group ${highlight ? 'ring-2 ring-teal-600 shadow-teal-600/10' : ''}`}>
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
        <button onClick={onClick} className="p-2 bg-teal-50 text-teal-600 rounded-lg hover:bg-teal-600 hover:text-white transition-all">
            <IoAddOutline size={18} />
        </button>
    );
    return (
        <button 
            onClick={onClick}
            className="h-full min-h-[140px] border-2 border-dashed border-slate-100 rounded-2xl flex flex-col items-center justify-center gap-2 text-slate-300 hover:text-teal-500 hover:border-teal-200 hover:bg-teal-50/30 transition-all group"
        >
            <div className="w-10 h-10 rounded-full border-2 border-dashed border-slate-200 flex items-center justify-center group-hover:scale-110 transition-transform">
                <IoAddOutline size={18} />
            </div>
            <span className="text-[9px] font-black uppercase tracking-widest">{label}</span>
        </button>
    );
}
