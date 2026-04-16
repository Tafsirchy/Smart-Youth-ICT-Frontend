"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  IoSaveOutline, IoRefreshOutline, IoAddOutline, IoTrashOutline, 
  IoLayersOutline, IoSettingsOutline, IoPrismOutline, IoCodeSlashOutline, 
  IoCheckmarkOutline, IoChevronForwardOutline, IoChevronDownOutline,
  IoCartOutline, IoStatsChartOutline, IoShieldCheckmarkOutline, IoGlobeOutline,
  IoRocketOutline, IoBriefcaseOutline, IoGitNetworkOutline, IoAnalyticsOutline,
  IoShieldOutline, IoSparklesOutline, IoHardwareChipOutline, IoArrowBackOutline,
  IoImageOutline, IoListOutline, IoColorPaletteOutline, IoInformationCircleOutline,
  IoCardOutline, IoBagCheckOutline, IoPeopleOutline, IoFlashOutline
} from "react-icons/io5";
import api from "@/lib/api";
import toast from "react-hot-toast";

const ICON_OPTIONS = [
  "Cart", "Card", "BagCheck", "People", "Flash", "Shield", "Globe", "GitNetwork", "Analytics", "Stats", "Rocket", "Business", "Briefcase"
];

const COLOR_OPTIONS = [
  { name: "Rose", value: "from-rose-500 to-rose-600", text: "text-rose-500" },
  { name: "Blue", value: "from-blue-500 to-blue-600", text: "text-blue-500" },
  { name: "Indigo", value: "from-indigo-500 to-indigo-600", text: "text-indigo-500" },
  { name: "Slate", value: "from-slate-700 to-slate-800", text: "text-slate-700" },
  { name: "Emerald", value: "from-emerald-500 to-teal-500", text: "text-emerald-500" },
  { name: "Orange", value: "from-orange-500 to-amber-500", text: "text-orange-500" }
];

export default function EcommerceCMS() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState("landing");
  const [content, setContent] = useState({
    landing: {
      hero: { badge: "", title: "", subtitle: "", description: "", mainImage: "" },
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
        roi: [], 
        manifest: [], 
        checklist: [] 
      },
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
      toast.error("Failed to load e-commerce content");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await api.put("/cms/services/web-software/ecommerce", content);
      toast.success("E-commerce engine updated globally");
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
        <IoRefreshOutline className="animate-spin text-4xl text-rose-600" />
        <span className="font-black text-slate-900 uppercase tracking-widest text-xs">Initializing Commerce Engine...</span>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 p-6 max-w-7xl mx-auto pb-24 text-slate-900 selection:bg-rose-600 selection:text-white">
      {/* HEADER PROTOCOL */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 text-rose-600 mb-1">
            <IoCartOutline className="text-lg" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em]">Service_Tier_Transaction_Core</span>
          </div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tighter leading-none">E-commerce Development</h1>
          <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px] mt-1.5 ml-1">Centralized Sales Node</p>
        </div>
        <button 
          onClick={handleSave}
          disabled={saving}
          className="group relative overflow-hidden px-8 py-3.5 bg-slate-900 text-white rounded-xl font-black uppercase tracking-widest text-[10px] flex items-center gap-3 hover:shadow-xl hover:shadow-rose-950/20 transition-all active:scale-95 disabled:opacity-50"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-rose-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="relative flex items-center gap-3">
            {saving ? <IoRefreshOutline className="animate-spin" /> : <IoSaveOutline className="group-hover:rotate-12 transition-transform" />}
            Deploy Transaction Logic
          </div>
        </button>
      </div>

      {/* TIER SELECTOR */}
      <div className="flex gap-1 mb-6 bg-white p-1 rounded-xl border border-slate-200 w-fit shadow-sm">
        {[
          { id: "landing", label: "Landing Architecture", icon: IoLayersOutline, color: "text-rose-500" },
          { id: "details", label: "Technical Manifest", icon: IoSettingsOutline, color: "text-indigo-500" },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-5 py-2 rounded-lg font-black uppercase tracking-widest text-[9px] transition-all ${activeTab === tab.id ? 'bg-slate-900 text-white shadow-md' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'}`}
          >
            <tab.icon size={15} className={activeTab === tab.id ? 'text-rose-400' : tab.color} />
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
                        <div className="w-8 h-8 bg-rose-50 rounded-lg flex items-center justify-center text-rose-600"><IoPrismOutline /></div>
                        Hero Protocol
                    </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <Field label="Badge" value={content.landing.hero.badge} onChange={(v) => updateNested("landing", "hero.badge", v)} />
                    <Field label="Title" value={content.landing.hero.title} onChange={(v) => updateNested("landing", "hero.title", v)} />
                    <Field label="Subtitle" value={content.landing.hero.subtitle} onChange={(v) => updateNested("landing", "hero.subtitle", v)} />
                    <div className="md:col-span-2">
                        <Field label="Description" value={content.landing.hero.description} onChange={(v) => updateNested("landing", "hero.description", v)} textarea />
                    </div>
                </div>
            </section>

            {/* VERTICALS */}
            <section className="bg-white p-6 rounded-3xl border border-slate-100 shadow-lg shadow-slate-200/30">
                <div className="flex justify-between items-center mb-4 pb-3 border-b border-slate-100">
                    <h2 className="text-xl font-black tracking-tighter flex items-center gap-3">
                        <div className="w-8 h-8 bg-rose-50 rounded-lg flex items-center justify-center text-rose-600"><IoCartOutline /></div>
                        Commerce Verticals
                    </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {content.landing.sections.verticals?.map((item, idx) => (
                        <CardWrapper key={idx} onRemove={() => {
                            const newArr = content.landing.sections.verticals.filter((_, i) => i !== idx);
                            updateNested("landing", "sections.verticals", newArr);
                        }}>
                             <div className="flex gap-4 mb-4">
                                <select className="bg-slate-50 border border-slate-100 rounded-lg p-2 text-[9px] font-black uppercase tracking-widest outline-none text-rose-600" value={item.icon} onChange={(e) => {
                                    const newArr = [...content.landing.sections.verticals];
                                    newArr[idx].icon = e.target.value;
                                    updateNested("landing", "sections.verticals", newArr);
                                }}>
                                    {ICON_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
                                </select>
                                <div className="flex-1">
                                    <input placeholder="Title" className="w-full bg-transparent border-none outline-none font-black text-sm uppercase tracking-tighter" value={item.title} onChange={(e) => {
                                        const newArr = [...content.landing.sections.verticals];
                                        newArr[idx].title = e.target.value;
                                        updateNested("landing", "sections.verticals", newArr);
                                    }} />
                                    <div className="flex items-center gap-1.5 mt-1">
                                        <IoColorPaletteOutline className="text-slate-300 text-xs" />
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
                            <textarea placeholder="Description" rows="3" className="w-full bg-slate-50 border border-transparent focus:bg-white focus:border-slate-100 rounded-xl p-3 text-[11px] text-slate-500 leading-relaxed outline-none transition-all" value={item.desc} onChange={(e) => {
                                const newArr = [...content.landing.sections.verticals];
                                newArr[idx].desc = e.target.value;
                                updateNested("landing", "sections.verticals", newArr);
                            }} />
                        </CardWrapper>
                    ))}
                    <AddButton onClick={() => {
                        const newArr = [...(content.landing.sections.verticals || []), { title: "New Venture", desc: "", icon: "Cart", color: "from-rose-500 to-rose-600", border: "border-rose-100" }];
                        updateNested("landing", "sections.verticals", newArr);
                    }} label="Add Vertical" />
                </div>
            </section>

            {/* INTEGRATIONS */}
            <section className="bg-slate-900 p-6 rounded-3xl text-white shadow-xl">
                <div className="flex justify-between items-center mb-4 pb-3 border-b border-white/10">
                    <h2 className="text-xl font-black tracking-tighter flex items-center gap-3">
                        <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center text-rose-400"><IoGitNetworkOutline /></div>
                        Logistics & Payments
                    </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-4">
                    {content.landing.sections.integrations?.map((item, idx) => (
                        <div key={idx} className="bg-white/5 border border-white/10 p-4 rounded-xl relative group hover:bg-white/10 transition-all flex items-start gap-4 min-h-[90px]">
                             <button onClick={() => {
                                const newArr = content.landing.sections.integrations.filter((_, i) => i !== idx);
                                updateNested("landing", "sections.integrations", newArr);
                            }} className="absolute top-4 right-4 text-white/10 hover:text-rose-500 opacity-0 group-hover:opacity-100 transition-all z-10 p-1.5 bg-white/5 rounded-lg"><IoTrashOutline size={16}/></button>
                            
                            <div className="shrink-0 relative group/icon">
                                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-rose-400 text-2xl group-hover/node:bg-rose-600/10 group-hover:scale-105 transition-all shadow-inner border border-white/5">
                                    {item.icon === "Rocket" && <IoRocketOutline size={24} />}
                                    {item.icon === "Business" && <IoBriefcaseOutline size={24} />}
                                    {item.icon === "Briefcase" && <IoBriefcaseOutline size={24} />}
                                    {item.icon === "GitNetwork" && <IoGitNetworkOutline size={24} />}
                                    {item.icon === "Globe" && <IoGlobeOutline size={24} />}
                                    {item.icon === "Analytics" && <IoAnalyticsOutline size={24} />}
                                    {item.icon === "Shield" && <IoShieldOutline size={24} />}
                                    {item.icon === "Stats" && <IoStatsChartOutline size={24} />}
                                    {item.icon === "Chip" && <IoHardwareChipOutline size={24} />}
                                    {item.icon === "Sparkles" && <IoSparklesOutline size={24} />}
                                    {item.icon === "Cart" && <IoCartOutline size={24} />}
                                    {item.icon === "Card" && <IoCardOutline size={24} />}
                                    {item.icon === "BagCheck" && <IoBagCheckOutline size={24} />}
                                    {item.icon === "People" && <IoPeopleOutline size={24} />}
                                    {item.icon === "Flash" && <IoFlashOutline size={24} />}
                                    
                                    <select 
                                        className="absolute inset-0 opacity-0 cursor-pointer w-full h-full" 
                                        value={item.icon} 
                                        onChange={(e) => {
                                            const newArr = [...content.landing.sections.integrations];
                                            newArr[idx].icon = e.target.value;
                                            updateNested("landing", "sections.integrations", newArr);
                                        }}
                                    >
                                        {ICON_OPTIONS.map(o => <option key={o} value={o} className="bg-slate-900 text-white">{o}</option>)}
                                    </select>
                                </div>
                            </div>

                            <div className="flex-1 min-w-0 py-1">
                                <input placeholder="Gateway" className="bg-transparent border-none outline-none font-black text-sm uppercase text-white w-full mb-1 tracking-tighter" value={item.t} onChange={(e) => {
                                    const newArr = [...content.landing.sections.integrations];
                                    newArr[idx].t = e.target.value;
                                    updateNested("landing", "sections.integrations", newArr);
                                }} />
                                <input placeholder="Sync Detail" className="bg-transparent border-none outline-none text-[11px] text-slate-400 font-bold w-full uppercase tracking-wide" value={item.d} onChange={(e) => {
                                    const newArr = [...content.landing.sections.integrations];
                                    newArr[idx].d = e.target.value;
                                    updateNested("landing", "sections.integrations", newArr);
                                }} />
                            </div>
                        </div>
                    ))}
                    <button onClick={() => {
                        const newArr = [...(content.landing.sections.integrations || []), { t: "New Node", d: "Description", icon: "Card" }];
                        updateNested("landing", "sections.integrations", newArr);
                    }} className="h-full min-h-[90px] border-2 border-dashed border-white/10 rounded-2xl flex flex-col items-center justify-center gap-2 text-white/20 hover:text-rose-400 hover:border-rose-400/30 hover:bg-white/5 transition-all">
                        <IoAddOutline size={20} />
                        <span className="text-[9px] font-black uppercase tracking-widest">Add Integration</span>
                    </button>
                </div>
            </section>

             {/* PRICING */}
             <section className="bg-white p-6 rounded-3xl border border-slate-100 shadow-lg shadow-slate-200/30">
                <div className="flex justify-between items-center mb-4 pb-3 border-b border-slate-100">
                    <h2 className="text-xl font-black tracking-tighter flex items-center gap-3">
                        <div className="w-8 h-8 bg-emerald-50 rounded-lg flex items-center justify-center text-emerald-600"><IoStatsChartOutline /></div>
                        Scaling Tiers
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
                                <input placeholder="Tier Name" className="text-lg font-black uppercase tracking-tighter bg-transparent outline-none w-full text-slate-900" value={tier.t} onChange={(e) => {
                                    const newArr = [...content.landing.sections.pricing];
                                    newArr[idx].t = e.target.value;
                                    updateNested("landing", "sections.pricing", newArr);
                                }} />
                                <button onClick={() => {
                                    const newArr = [...content.landing.sections.pricing];
                                    newArr[idx].highlight = !newArr[idx].highlight;
                                    updateNested("landing", "sections.pricing", newArr);
                                }} className={`p-1.5 rounded-lg transition-all ${tier.highlight ? 'bg-rose-600 text-white shadow-lg' : 'bg-slate-50 text-slate-300 hover:text-rose-500'}`}><IoSparklesOutline size={12}/></button>
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
                                        <IoCheckmarkOutline className="text-rose-500 shrink-0 text-xs" />
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
                                }} className="text-[9px] font-black text-rose-500 mt-1 hover:underline">+ Add Feature</button>
                            </div>
                        </CardWrapper>
                    ))}
                    <AddButton onClick={() => {
                        const newArr = [...(content.landing.sections.pricing || []), { t: "Standard", p: "$1999", list: [], color: "rose", highlight: false }];
                        updateNested("landing", "sections.pricing", newArr);
                    }} label="Add Tier" />
                </div>
            </section>

          </motion.div>
        ) : (
          <motion.div key="details" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-8">
            
            {/* DETAILS HERO */}
            <section className="bg-white p-6 rounded-3xl border border-slate-100 shadow-lg shadow-slate-200/30">
                <div className="flex justify-between items-center mb-4 pb-3 border-b border-slate-100">
                    <h2 className="text-xl font-black tracking-tighter flex items-center gap-3">
                        <div className="w-8 h-8 bg-indigo-50 rounded-lg flex items-center justify-center text-indigo-600"><IoCodeSlashOutline /></div>
                        Technical Specifications
                    </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <Field label="Technical Badge" value={content.details.hero.badge} onChange={(v) => updateNested("details", "hero.badge", v)} />
                    <Field label="Hero Title" value={content.details.hero.title} onChange={(v) => updateNested("details", "hero.title", v)} />
                    <div className="lg:col-span-4">
                        <Field label="Spec Description" value={content.details.hero.description} onChange={(v) => updateNested("details", "hero.description", v)} textarea />
                    </div>
                </div>
            </section>

            {/* ROI VISUALIZER */}
            <section className="bg-white p-6 rounded-3xl border border-slate-100 shadow-lg shadow-slate-200/30">
                <div className="flex justify-between items-center mb-4 pb-3 border-b border-slate-100">
                    <h2 className="text-xl font-black tracking-tighter flex items-center gap-3">
                        <div className="w-8 h-8 bg-rose-50 rounded-lg flex items-center justify-center text-rose-600"><IoFlashOutline /></div>
                        Performance Visualizer
                    </h2>
                    <AddButton onClick={() => {
                        const newArr = [...(content.details.sections.roi || []), { title: "", desc: "", icon: "Flash", features: [] }];
                        updateNested("details", "sections.roi", newArr);
                    }} small />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {content.details.sections.roi?.map((spec, idx) => (
                        <div key={idx} className="p-5 bg-slate-50 rounded-2xl relative group border border-transparent hover:border-rose-100 transition-all">
                            <button onClick={() => {
                                const newArr = content.details.sections.roi.filter((_, i) => i !== idx);
                                updateNested("details", "sections.roi", newArr);
                            }} className="absolute top-4 right-4 text-slate-200 hover:text-rose-500 transition-all opacity-0 group-hover:opacity-100 z-10 p-1.5 bg-white/5 rounded-lg"><IoTrashOutline size={16}/></button>
                            <div className="flex gap-4 mb-4">
                                <div className="shrink-0 relative group/icon">
                                    <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-rose-600 text-2xl shadow-inner border border-slate-100 group-hover:scale-105 transition-transform">
                                        {spec.icon === "Rocket" && <IoRocketOutline />}
                                        {spec.icon === "Business" && <IoBriefcaseOutline />}
                                        {spec.icon === "Briefcase" && <IoBriefcaseOutline />}
                                        {spec.icon === "GitNetwork" && <IoGitNetworkOutline />}
                                        {spec.icon === "Globe" && <IoGlobeOutline />}
                                        {spec.icon === "Analytics" && <IoAnalyticsOutline />}
                                        {spec.icon === "Shield" && <IoShieldOutline />}
                                        {spec.icon === "Stats" && <IoStatsChartOutline />}
                                        {spec.icon === "Chip" && <IoHardwareChipOutline />}
                                        {spec.icon === "Sparkles" && <IoSparklesOutline />}
                                        {spec.icon === "Cart" && <IoCartOutline />}
                                        {spec.icon === "Card" && <IoCardOutline />}
                                        {spec.icon === "BagCheck" && <IoBagCheckOutline />}
                                        {spec.icon === "People" && <IoPeopleOutline />}
                                        {spec.icon === "Flash" && <IoFlashOutline />}
                                        
                                        <select 
                                            className="absolute inset-0 opacity-0 cursor-pointer w-full h-full" 
                                            value={spec.icon} 
                                            onChange={(e) => {
                                                const newArr = [...content.details.sections.roi];
                                                newArr[idx].icon = e.target.value;
                                                updateNested("details", "sections.roi", newArr);
                                            }}
                                        >
                                            {ICON_OPTIONS.map(o => <option key={o} value={o} className="bg-slate-900 text-white">{o}</option>)}
                                        </select>
                                    </div>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <input placeholder="Metric Title" className="w-full bg-transparent border-none outline-none font-black text-lg tracking-tighter mb-0.5 uppercase text-slate-800 focus:text-rose-600 transition-colors" value={spec.title} onChange={(e) => {
                                        const newArr = [...content.details.sections.roi];
                                        newArr[idx].title = e.target.value;
                                        updateNested("details", "sections.roi", newArr);
                                    }} />
                                    <textarea placeholder="ROI Description" rows="3" className="w-full bg-transparent border-none outline-none text-[11px] text-slate-400 font-medium leading-relaxed scrollbar-hide" value={spec.desc} onChange={(e) => {
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

             {/* INFRASTRUCTURE MANIFEST */}
             <section className="bg-slate-900 p-6 rounded-3xl text-white shadow-xl">
                <div className="flex items-center gap-3 mb-6 pb-3 border-b border-white/10">
                    <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center text-rose-400"><IoHardwareChipOutline /></div>
                    <h2 className="text-xl font-black tracking-tighter">Infrastructure Manifest</h2>
                </div>
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-y-2 gap-x-16">
                     {content.details.sections.manifest?.map((item, idx) => (
                         <div key={idx} className="flex justify-between items-center py-2 border-b border-white/5 last:border-0 group relative text-white gap-4">
                              <input className="bg-transparent border-none outline-none text-[10px] uppercase font-black tracking-widest text-slate-500 w-[40%]" value={item.label} onChange={(e) => {
                                 const newArr = [...content.details.sections.manifest];
                                 newArr[idx].label = e.target.value;
                                 updateNested("details", "sections.manifest", newArr);
                              }} />
                              <input className="bg-transparent border-none outline-none text-right font-bold text-[11px] w-[60%] focus:text-rose-400 transition-colors" value={item.value} onChange={(e) => {
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
                        const newArr = [...(content.details.sections.manifest || []), { label: "NEW_LAYER", value: "VALUE" }];
                        updateNested("details", "sections.manifest", newArr);
                     }} className="py-3 border border-dashed border-white/10 rounded-xl text-[9px] font-black uppercase text-rose-400 hover:bg-white/5 transition-all">+ Add Layer</button>
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
            <div className={`relative flex items-center ${dark ? 'bg-white/5 border-white/5' : 'bg-slate-50 border-transparent'} border rounded-xl overflow-hidden focus-within:border-rose-500/10 transition-all`}>
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
        <div className={`${compact ? 'p-4' : 'p-6'} bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-lg transition-all relative group ${highlight ? 'ring-2 ring-rose-600 shadow-rose-600/10' : ''}`}>
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
        <button onClick={onClick} className="p-2 bg-rose-50 text-rose-600 rounded-lg hover:bg-rose-600 hover:text-white transition-all">
            <IoAddOutline size={18} />
        </button>
    );
    return (
        <button 
            onClick={onClick}
            className="h-full min-h-[140px] border-2 border-dashed border-slate-100 rounded-2xl flex flex-col items-center justify-center gap-2 text-slate-300 hover:text-rose-500 hover:border-rose-200 hover:bg-rose-50/30 transition-all group"
        >
            <div className="w-10 h-10 rounded-full border-2 border-dashed border-slate-200 flex items-center justify-center group-hover:scale-110 transition-transform">
                <IoAddOutline size={18} />
            </div>
            <span className="text-[9px] font-black uppercase tracking-widest">{label}</span>
        </button>
    );
}
