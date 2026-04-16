"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  IoSaveOutline, IoRefreshOutline, IoAddOutline, IoTrashOutline, 
  IoLayersOutline, IoSettingsOutline, IoPrismOutline, IoCodeSlashOutline, 
  IoCheckmarkOutline, IoChevronForwardOutline, IoChevronDownOutline,
  IoBusinessOutline, IoStatsChartOutline, IoShieldCheckmarkOutline, IoGlobeOutline,
  IoRocketOutline, IoBriefcaseOutline, IoGitNetworkOutline, IoAnalyticsOutline,
  IoShieldOutline, IoSparklesOutline, IoHardwareChipOutline, IoArrowBackOutline,
  IoImageOutline, IoListOutline, IoColorPaletteOutline, IoInformationCircleOutline
} from "react-icons/io5";
import api from "@/lib/api";
import toast from "react-hot-toast";

const ICON_OPTIONS = [
  "Rocket", "Business", "Briefcase", "GitNetwork", "Globe", 
  "Analytics", "Shield", "Stats", "Chip", "Sparkles"
];

const COLOR_OPTIONS = [
  { name: "Blue", value: "from-blue-500 to-blue-600", text: "text-blue-500" },
  { name: "Indigo", value: "from-indigo-500 to-indigo-600", text: "text-indigo-500" },
  { name: "Cyan", value: "from-cyan-500 to-blue-500", text: "text-cyan-500" },
  { name: "Slate", value: "from-slate-700 to-slate-800", text: "text-slate-700" },
  { name: "Emerald", value: "from-emerald-500 to-teal-500", text: "text-emerald-500" },
  { name: "Rose", value: "from-rose-500 to-pink-500", text: "text-rose-500" }
];

export default function BusinessCMS() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState("landing");
  const [content, setContent] = useState({
    landing: {
      hero: { badge: "", title: "", subtitle: "", description: "", mainImage: "" },
      sections: { 
        verticalsHeader: { badge: "", title: "", focus: "" },
        verticals: [], 
        logistics: { title: "", description: "", badge: "" },
        integrations: [], 
        pricingHeader: { badge: "", title: "", focus: "" },
        pricing: [] 
      },
      cta: { title: "" }
    },
    details: {
      hero: { badge: "", title: "", subtitle: "", description: "" },
      sections: { 
        roi: [], 
        extraInfo: { title: "", description: "", securityBadge: "", securityValue: "" },
        manifest: [], 
        checklistHeader: { title: "", focus: "" },
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
      const res = await api.get("/cms/services/web-software/business-websites");
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
      toast.error("Failed to load business content");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await api.put("/cms/services/web-software/business-websites", content);
      toast.success("Business architecture updated globally");
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
        <IoRefreshOutline className="animate-spin text-4xl text-blue-600" />
        <span className="font-black text-slate-900 uppercase tracking-widest text-xs">Initializing Enterprise Infrastructure...</span>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 p-6 max-w-7xl mx-auto pb-24 text-slate-900 selection:bg-blue-600 selection:text-white">
      {/* HEADER PROTOCOL */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 text-blue-600 mb-1">
            <IoBusinessOutline className="text-lg" />
            <span className="text-[9px] font-black uppercase tracking-[0.4em]">Service_Tier_Web_Core</span>
          </div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tighter leading-none">Business Websites</h1>
          <p className="text-slate-400 font-bold uppercase tracking-widest text-[9px] mt-2 ml-1">Centralized Administrative Node</p>
        </div>
        <button 
          onClick={handleSave}
          disabled={saving}
          className="group relative overflow-hidden px-8 py-3.5 bg-slate-900 text-white rounded-xl font-black uppercase tracking-widest text-[10px] flex items-center gap-3 hover:shadow-xl hover:shadow-blue-950/20 transition-all active:scale-95 disabled:opacity-50"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="relative flex items-center gap-3">
            {saving ? <IoRefreshOutline className="animate-spin" /> : <IoSaveOutline className="group-hover:rotate-12 transition-transform" />}
            Deploy Technical Stack
          </div>
        </button>
      </div>

      {/* TIER SELECTOR */}
      <div className="flex gap-1 mb-8 bg-white p-1.5 rounded-xl border border-slate-200 w-fit shadow-sm">
        {[
          { id: "landing", label: "Landing Architecture", icon: IoLayersOutline, color: "text-blue-500" },
          { id: "details", label: "Technical Manifest", icon: IoSettingsOutline, color: "text-indigo-500" },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2.5 px-6 py-2.5 rounded-lg font-black uppercase tracking-widest text-[9px] transition-all ${activeTab === tab.id ? 'bg-slate-900 text-white shadow-md' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'}`}
          >
            <tab.icon size={16} className={activeTab === tab.id ? 'text-blue-400' : tab.color} />
            {tab.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {activeTab === "landing" ? (
          <motion.div key="landing" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-8">
            
            {/* LANDING HERO */}
            <section className="bg-white p-6 rounded-3xl border border-slate-100 shadow-lg shadow-slate-200/30">
                <div className="flex justify-between items-center mb-4 pb-3 border-b border-slate-100">
                    <h2 className="text-xl font-black tracking-tighter flex items-center gap-3">
                        <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600"><IoPrismOutline /></div>
                        Hero Protocol
                    </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <Field label="Badge" value={content.landing.hero.badge} onChange={(v) => updateNested("landing", "hero.badge", v)} />
                    <Field label="Title" value={content.landing.hero.title} onChange={(v) => updateNested("landing", "hero.title", v)} />
                    <Field label="Subtitle" value={content.landing.hero.subtitle} onChange={(v) => updateNested("landing", "hero.subtitle", v)} />
                    <div className="md:col-span-2">
                        <Field label="Hero Description" value={content.landing.hero.description} onChange={(v) => updateNested("landing", "hero.description", v)} textarea />
                    </div>
                    <div>
                        <Field label="Hero Image URL" value={content.landing.hero.mainImage} onChange={(v) => updateNested("landing", "hero.mainImage", v)} icon={<IoImageOutline />} />
                    </div>
                </div>
            </section>

            {/* STRATEGIC PILLARS */}
            <section className="bg-white p-6 rounded-3xl border border-slate-100 shadow-lg shadow-slate-200/30 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50/50 blur-3xl -z-10" />
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 pb-3 border-b border-slate-100 gap-4">
                    <h2 className="text-xl font-black tracking-tighter flex items-center gap-3">
                        <div className="w-8 h-8 bg-indigo-50 rounded-lg flex items-center justify-center text-indigo-600"><IoStatsChartOutline /></div>
                        Strategic Pillars
                    </h2>
                    <div className="flex gap-3 w-full md:w-auto">
                        <Field label="Section Badge" value={content.landing.sections.verticalsHeader?.badge} onChange={(v) => updateNested("landing", "sections.verticalsHeader.badge", v)} small />
                        <Field label="Focus Text" value={content.landing.sections.verticalsHeader?.focus} onChange={(v) => updateNested("landing", "sections.verticalsHeader.focus", v)} small />
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {content.landing.sections.verticals?.map((item, idx) => (
                        <CardWrapper key={idx} onRemove={() => updateNested("landing", "sections.verticals", content.landing.sections.verticals.filter((_, i) => i !== idx))}>
                            <div className="flex gap-4 mb-4">
                                <select className="bg-slate-50 border border-slate-100 rounded-lg p-2 text-[9px] font-black uppercase tracking-widest outline-none text-blue-600" value={item.icon} onChange={(e) => {
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
                        const newArr = [...(content.landing.sections.verticals || []), { title: "New Pillar", desc: "", icon: "Business", color: COLOR_OPTIONS[0].value, border: "border-slate-100" }];
                        updateNested("landing", "sections.verticals", newArr);
                    }} label="Add Pillar" />
                </div>
            </section>

            {/* LOGISTICS & INTEGRATIONS */}
            <section className="bg-slate-900 p-8 rounded-[2.5rem] text-white shadow-2xl shadow-blue-900/20 relative overflow-hidden group/hub">
                <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/5 blur-[120px] -z-10 group-hover/hub:bg-blue-600/10 transition-colors" />
                <div className="grid lg:grid-cols-12 gap-8 relative z-10">
                    <div className="lg:col-span-4 space-y-6 pr-4">
                        <div className="flex items-center gap-2.5 text-blue-400 mb-2">
                           <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse shadow-[0_0_8px_rgba(96,165,250,0.5)]"></div>
                           <span className="text-[11px] font-black uppercase tracking-[0.4em]">Integrated_Sync_Hub</span>
                        </div>
                        <h2 className="text-4xl font-black tracking-tighter leading-[0.9] mb-8">Unified <br/><span className="text-blue-500">Logistics.</span></h2>
                        
                        <div className="space-y-6">
                            <Field label="Status Protocol" value={content.landing.sections.logistics?.badge} onChange={(v) => updateNested("landing", "sections.logistics.badge", v)} dark />
                            <Field label="Hub Identifier" value={content.landing.sections.logistics?.title} onChange={(v) => updateNested("landing", "sections.logistics.title", v)} dark />
                            <Field label="Strategic Framework" value={content.landing.sections.logistics?.description} onChange={(v) => updateNested("landing", "sections.logistics.description", v)} textarea dark />
                        </div>
                    </div>

                    <div className="lg:col-span-8 lg:border-l lg:border-white/5 lg:pl-8">
                        <div className="flex justify-between items-end mb-6 border-b border-white/5 pb-4">
                            <div>
                                <h3 className="text-[11px] font-black uppercase tracking-widest text-slate-500 mb-1">Architecture Nodes</h3>
                                <p className="text-[10px] font-bold text-slate-600 uppercase">Operational Integration Mesh</p>
                            </div>
                            <button 
                                onClick={() => {
                                    const newArr = [...(content.landing.sections.integrations || []), { t: "New Node", d: "System connection", icon: "Globe" }];
                                    updateNested("landing", "sections.integrations", newArr);
                                }} 
                                className="flex items-center gap-2 px-4 py-2 bg-blue-600/10 border border-blue-500/20 rounded-lg text-blue-400 hover:bg-blue-600 hover:text-white transition-all text-[9px] font-black uppercase tracking-widest"
                            >
                                <IoAddOutline size={14} /> Add Integration Node
                            </button>
                        </div>

                        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                            {content.landing.sections.integrations?.map((item, idx) => (
                                <div key={idx} className="bg-white/[0.03] backdrop-blur-sm border border-white/5 p-4 rounded-xl flex items-start gap-4 group/node hover:bg-white/[0.07] hover:border-white/10 transition-all relative overflow-hidden min-h-[90px]">
                                    <div className="absolute top-0 left-0 w-1 h-full bg-blue-600 opacity-0 group-hover/node:opacity-100 transition-opacity" />
                                    
                                    <div className="shrink-0 mt-1 relative group/icon">
                                        <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-3xl text-blue-400 group-hover/node:bg-blue-600/10 group-hover/node:scale-105 transition-all shadow-inner border border-white/5">
                                            {item.icon === "Rocket" && <IoRocketOutline />}
                                            {item.icon === "Business" && <IoBusinessOutline />}
                                            {item.icon === "Briefcase" && <IoBriefcaseOutline />}
                                            {item.icon === "GitNetwork" && <IoGitNetworkOutline />}
                                            {item.icon === "Globe" && <IoGlobeOutline />}
                                            {item.icon === "Analytics" && <IoAnalyticsOutline />}
                                            {item.icon === "Shield" && <IoShieldOutline />}
                                            {item.icon === "Stats" && <IoStatsChartOutline />}
                                            {item.icon === "Chip" && <IoHardwareChipOutline />}
                                            {item.icon === "Sparkles" && <IoSparklesOutline />}
                                            
                                            <select 
                                                className="absolute inset-0 opacity-0 cursor-pointer w-full h-full" 
                                                value={item.icon} 
                                                onChange={(e) => {
                                                    const newArr = [...content.landing.sections.integrations];
                                                    newArr[idx].icon = e.target.value;
                                                    updateNested("landing", "sections.integrations", newArr);
                                                }}
                                            >
                                                {ICON_OPTIONS.map(o => <option key={o} value={o} className="bg-slate-900 text-white leading-loose">{o}</option>)}
                                            </select>
                                        </div>
                                    </div>

                                    <div className="flex-1 min-w-0 py-1">
                                        <div className="flex justify-between items-center mb-1.5 gap-2">
                                            <input 
                                                className="bg-transparent border-none outline-none font-black text-sm text-white w-full uppercase tracking-tighter focus:text-blue-400 transition-colors" 
                                                placeholder="Node Identifier"
                                                value={item.t} 
                                                onChange={(e) => {
                                                    const newArr = [...content.landing.sections.integrations];
                                                    newArr[idx].t = e.target.value;
                                                    updateNested("landing", "sections.integrations", newArr);
                                                }} 
                                            />
                                            <button 
                                                onClick={() => updateNested("landing", "sections.integrations", content.landing.sections.integrations.filter((_, i) => i !== idx))} 
                                                className="text-white/10 hover:text-rose-500 transition-colors p-1.5 bg-white/5 rounded-lg opacity-0 group-hover/node:opacity-100"
                                            >
                                                <IoTrashOutline size={16}/>
                                            </button>
                                        </div>
                                        <input 
                                            className="bg-transparent border-none outline-none text-[11px] text-slate-500 font-bold w-full uppercase tracking-wide" 
                                            placeholder="Functional description..."
                                            value={item.d} 
                                            onChange={(e) => {
                                                const newArr = [...content.landing.sections.integrations];
                                                newArr[idx].d = e.target.value;
                                                updateNested("landing", "sections.integrations", newArr);
                                            }} 
                                        />
                                    </div>
                                </div>
                            ))}
                            {content.landing.sections.integrations?.length === 0 && (
                                <div className="col-span-full py-12 border-2 border-dashed border-white/5 rounded-2xl flex flex-col items-center justify-center gap-3 text-white/10 italic">
                                    <IoGlobeOutline size={32} />
                                    <p className="text-[10px] font-black uppercase tracking-[0.2em]">Mesh Architecture Empty - Initialize Sync Node</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* PRICING SELECTOR */}
            <section className="bg-white p-6 rounded-3xl border border-slate-100 shadow-lg shadow-slate-200/30">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 pb-3 border-b border-slate-100 gap-4">
                    <h2 className="text-xl font-black tracking-tighter flex items-center gap-3">
                        <div className="w-8 h-8 bg-emerald-50 rounded-lg flex items-center justify-center text-emerald-600"><IoStatsChartOutline /></div>
                        Scaling Tiers
                    </h2>
                    <div className="flex gap-3 w-full md:w-auto">
                        <Field label="Badge" value={content.landing.sections.pricingHeader?.badge} onChange={(v) => updateNested("landing", "sections.pricingHeader.badge", v)} small />
                        <Field label="Subtitle Focus" value={content.landing.sections.pricingHeader?.focus} onChange={(v) => updateNested("landing", "sections.pricingHeader.focus", v)} small />
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {content.landing.sections.pricing?.map((tier, idx) => (
                        <CardWrapper 
                            key={idx} 
                            highlight={tier.highlight}
                            onRemove={() => updateNested("landing", "sections.pricing", content.landing.sections.pricing.filter((_, i) => i !== idx))}
                            compact
                        >
                            <div className="flex justify-between items-start mb-2">
                                <input placeholder="Tier Name" className="text-lg font-black uppercase tracking-tighter bg-transparent outline-none w-full" value={tier.t} onChange={(e) => {
                                    const newArr = [...content.landing.sections.pricing];
                                    newArr[idx].t = e.target.value;
                                    updateNested("landing", "sections.pricing", newArr);
                                }} />
                                <button onClick={() => {
                                    const newArr = [...content.landing.sections.pricing];
                                    newArr[idx].highlight = !newArr[idx].highlight;
                                    updateNested("landing", "sections.pricing", newArr);
                                }} className={`p-1.5 rounded-lg transition-all ${tier.highlight ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' : 'bg-slate-50 text-slate-300 hover:text-blue-500'}`}><IoSparklesOutline size={12}/></button>
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
                                        <IoCheckmarkOutline className="text-blue-500 shrink-0 text-xs" />
                                        <input className="text-[11px] font-bold text-slate-600 bg-transparent outline-none w-full border-b border-transparent focus:border-slate-100" value={feature} onChange={(e) => {
                                            const newArr = [...content.landing.sections.pricing];
                                            newArr[idx].list[fIdx] = e.target.value;
                                            updateNested("landing", "sections.pricing", newArr);
                                        }} />
                                        <button onClick={() => {
                                            const newArr = [...content.landing.sections.pricing];
                                            newArr[idx].list = newArr[idx].list.filter((_, i) => i !== fIdx);
                                            updateNested("landing", "sections.pricing", newArr);
                                        }} className="opacity-0 group-hover/feat:opacity-100 text-rose-500 hover:scale-110 transition-all"><IoTrashOutline size={12}/></button>
                                    </div>
                                ))}
                                <button onClick={() => {
                                    const newArr = [...content.landing.sections.pricing];
                                    newArr[idx].list = [...(newArr[idx].list || []), "New Feature"];
                                    updateNested("landing", "sections.pricing", newArr);
                                }} className="text-[9px] font-black text-blue-500 mt-1 hover:underline">+ Add Feature</button>
                            </div>
                            <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                                <span className="text-[8px] font-black uppercase text-slate-300 tracking-[0.2em]">Deployment_Standard</span>
                                <select className="bg-transparent border-none outline-none font-bold text-[9px] uppercase text-slate-400" value={tier.color} onChange={(e) => {
                                    const newArr = [...content.landing.sections.pricing];
                                    newArr[idx].color = e.target.value;
                                    updateNested("landing", "sections.pricing", newArr);
                                }}>
                                    {COLOR_OPTIONS.map(c => <option key={c.name.toLowerCase()} value={c.name.toLowerCase()}>{c.name}</option>)}
                                </select>
                            </div>
                        </CardWrapper>
                    ))}
                    <AddButton onClick={() => {
                        const newArr = [...(content.landing.sections.pricing || []), { t: "Standard", p: "$1499", list: [], color: "blue", highlight: false }];
                        updateNested("landing", "sections.pricing", newArr);
                    }} label="Add Tier" />
                </div>
            </section>

          </motion.div>
        ) : (
          <motion.div key="details" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-8">
            
            {/* DETAILS HERO */}
            <section className="bg-white p-8 rounded-3xl border border-slate-100 shadow-lg shadow-slate-200/30">
                <div className="flex justify-between items-center mb-6 pb-4 border-b border-slate-100">
                    <h2 className="text-xl font-black tracking-tighter flex items-center gap-3">
                        <div className="w-8 h-8 bg-indigo-50 rounded-lg flex items-center justify-center text-indigo-600"><IoCodeSlashOutline /></div>
                        Technical Specifications
                    </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <Field label="Technical Badge" value={content.details.hero.badge} onChange={(v) => updateNested("details", "hero.badge", v)} />
                    <Field label="Hero Title" value={content.details.hero.title} onChange={(v) => updateNested("details", "hero.title", v)} />
                    <Field label="Sub Header" value={content.details.hero.subtitle} onChange={(v) => updateNested("details", "hero.subtitle", v)} />
                    <div className="lg:col-span-4">
                        <Field label="Spec Description" value={content.details.hero.description} onChange={(v) => updateNested("details", "hero.description", v)} textarea />
                    </div>
                </div>
            </section>

            {/* ROI VISUALIZER */}
            <section className="bg-white p-6 rounded-3xl border border-slate-100 shadow-lg shadow-slate-200/30">
                <div className="flex justify-between items-center mb-6 pb-4 border-b border-slate-100">
                    <h2 className="text-xl font-black tracking-tighter flex items-center gap-3">
                        <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600"><IoAnalyticsOutline /></div>
                        ROI Visualizer Bento
                    </h2>
                    <AddButton onClick={() => {
                        const newArr = [...(content.details.sections.roi || []), { title: "", desc: "", icon: "Stats", features: [] }];
                        updateNested("details", "sections.roi", newArr);
                    }} small />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-px bg-slate-100 border border-slate-100 rounded-2xl overflow-hidden shadow-sm">
                    {content.details.sections.roi?.map((spec, idx) => (
                        <div key={idx} className="p-5 bg-white hover:bg-slate-50 transition-colors relative group border-b border-r border-slate-100">
                            <button onClick={() => updateNested("details", "sections.roi", content.details.sections.roi.filter((_, i) => i !== idx))} className="absolute top-4 right-4 text-slate-200 hover:text-rose-500 transition-all opacity-0 group-hover:opacity-100 z-10 p-1.5"><IoTrashOutline size={16}/></button>
                            <div className="flex gap-4 mb-4">
                                <div className="shrink-0 relative group/icon">
                                    <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 text-2xl shadow-inner border border-blue-100 group-hover/icon:scale-105 transition-transform">
                                        {spec.icon === "Rocket" && <IoRocketOutline />}
                                        {spec.icon === "Business" && <IoBusinessOutline />}
                                        {spec.icon === "Briefcase" && <IoBriefcaseOutline />}
                                        {spec.icon === "GitNetwork" && <IoGitNetworkOutline />}
                                        {spec.icon === "Globe" && <IoGlobeOutline />}
                                        {spec.icon === "Analytics" && <IoAnalyticsOutline />}
                                        {spec.icon === "Shield" && <IoShieldOutline />}
                                        {spec.icon === "Stats" && <IoStatsChartOutline />}
                                        {spec.icon === "Chip" && <IoHardwareChipOutline />}
                                        {spec.icon === "Sparkles" && <IoSparklesOutline />}
                                        
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
                                    <input placeholder="Metric Title" className="w-full bg-transparent border-none outline-none font-black text-lg tracking-tighter mb-0.5 uppercase text-slate-800 focus:text-blue-600 transition-colors" value={spec.title} onChange={(e) => {
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
                            <div className="flex flex-wrap gap-1.5 mt-2">
                                {spec.features?.map((f, fIdx) => (
                                    <div key={fIdx} className="group/item flex items-center bg-slate-50 border border-slate-100 rounded-lg py-1 px-2.5 relative">
                                        <input className="bg-transparent border-none outline-none font-bold text-[9px] uppercase text-slate-500 w-20" value={f} onChange={(e) => {
                                            const newArr = [...content.details.sections.roi];
                                            newArr[idx].features[fIdx] = e.target.value;
                                            updateNested("details", "sections.roi", newArr);
                                        }} />
                                        <button onClick={() => {
                                            const newArr = [...content.details.sections.roi];
                                            newArr[idx].features = newArr[idx].features.filter((_, i) => i !== fIdx);
                                            updateNested("details", "sections.roi", newArr);
                                        }} className="ml-1 text-rose-300 hover:text-rose-500 opacity-0 group-hover/item:opacity-100 transition-all"><IoTrashOutline size={10}/></button>
                                    </div>
                                ))}
                                <button onClick={() => {
                                    const newArr = [...content.details.sections.roi];
                                    newArr[idx].features = [...(newArr[idx].features || []), "NEW_SPEC"];
                                    updateNested("details", "sections.roi", newArr);
                                }} className="py-1 px-2.5 border border-blue-50 rounded-lg text-blue-500 font-black text-[9px] uppercase hover:bg-blue-50 transition-colors">+ ADD</button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* OPERATIONAL HUB (EXTRA INFO) */}
            <section className="bg-white p-6 rounded-3xl border border-slate-100 shadow-lg shadow-slate-200/30">
                <div className="grid md:grid-cols-5 gap-8 items-start">
                    <div className="md:col-span-2 p-5 bg-slate-900 rounded-2xl text-white">
                        <div className="flex items-center gap-2 text-blue-400 mb-6 border-b border-white/10 pb-3">
                            <IoHardwareChipOutline size={16} />
                            <span className="text-[9px] font-black uppercase tracking-[0.3em]">Infrastructure_Manifest</span>
                        </div>
                        <div className="space-y-4">
                            {content.details.sections.manifest?.map((item, idx) => (
                                <div key={idx} className="flex justify-between items-center py-2 group/row relative border-b border-white/5 last:border-0">
                                    <input placeholder="Label" className="bg-transparent border-none outline-none text-slate-500 text-[9px] uppercase font-black tracking-widest w-1/2" value={item.label} onChange={(e) => {
                                        const newArr = [...content.details.sections.manifest];
                                        newArr[idx].label = e.target.value;
                                        updateNested("details", "sections.manifest", newArr);
                                    }} />
                                    <input placeholder="Value" className="bg-transparent border-none outline-none text-right font-bold text-xs text-white w-1/2" value={item.value} onChange={(e) => {
                                        const newArr = [...content.details.sections.manifest];
                                        newArr[idx].value = e.target.value;
                                        updateNested("details", "sections.manifest", newArr);
                                    }} />
                                    <button onClick={() => updateNested("details", "sections.manifest", content.details.sections.manifest.filter((_, i) => i !== idx))} className="absolute -left-6 opacity-0 group-hover/row:opacity-100 text-rose-500 hover:scale-110 transition-all"><IoTrashOutline size={12}/></button>
                                </div>
                            ))}
                            <button onClick={() => {
                                const newArr = [...(content.details.sections.manifest || []), { label: "NEW_METRIC", value: "VAL_0" }];
                                updateNested("details", "sections.manifest", newArr);
                            }} className="w-full py-2.5 border border-white/5 rounded-lg text-[9px] font-black uppercase text-blue-400 hover:bg-white/5 transition-colors">+ Append Manifest Node</button>
                        </div>
                    </div>
                    <div className="md:col-span-3 space-y-6">
                        <h2 className="text-2xl font-black tracking-tighter">Operationally Atomic.</h2>
                        <Field label="System Overview" value={content.details.sections.extraInfo?.description} onChange={(v) => updateNested("details", "sections.extraInfo.description", v)} textarea />
                        <div className="flex items-center gap-5 p-5 bg-blue-50 rounded-2xl border border-blue-100">
                            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white text-lg shadow-lg shadow-blue-500/20"><IoShieldCheckmarkOutline /></div>
                            <div className="flex-1 grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-[8px] font-black uppercase text-blue-900 tracking-widest mb-1">Security Badge</label>
                                    <input className="bg-transparent border-none outline-none font-black text-[10px] text-blue-900 w-full" value={content.details.sections.extraInfo?.securityBadge} onChange={(e) => updateNested("details", "sections.extraInfo.securityBadge", e.target.value)} />
                                </div>
                                <div>
                                    <label className="block text-[8px] font-black uppercase text-blue-900 tracking-widest mb-1">Status Protocol</label>
                                    <input className="bg-transparent border-none outline-none text-[10px] font-bold text-blue-600 w-full" value={content.details.sections.extraInfo?.securityValue} onChange={(e) => updateNested("details", "sections.extraInfo.securityValue", e.target.value)} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* HANDOVER ASSETS */}
            <section className="bg-white p-6 rounded-3xl border border-slate-100 shadow-lg shadow-slate-200/30">
                <div className="flex justify-between items-center mb-6 pb-4 border-b border-slate-100">
                    <div className="flex items-center gap-4">
                        <h2 className="text-xl font-black tracking-tighter flex items-center gap-3">
                            <div className="w-8 h-8 bg-emerald-50 rounded-lg flex items-center justify-center text-emerald-600"><IoListOutline /></div>
                            Asset Handover Checklist
                        </h2>
                        <div className="h-px w-12 bg-slate-100"></div>
                        <Field label="Group Title" value={content.details.sections.checklistHeader?.title} onChange={(v) => updateNested("details", "sections.checklistHeader.title", v)} small />
                        <Field label="Focus" value={content.details.sections.checklistHeader?.focus} onChange={(v) => updateNested("details", "sections.checklistHeader.focus", v)} small />
                    </div>
                    <AddButton onClick={() => {
                        const newArr = [...(content.details.sections.checklist || []), { t: "", d: "" }];
                        updateNested("details", "sections.checklist", newArr);
                    }} small />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {content.details.sections.checklist?.map((item, idx) => (
                        <CardWrapper 
                            key={idx} 
                            onRemove={() => updateNested("details", "sections.checklist", content.details.sections.checklist.filter((_, i) => i !== idx))}
                            compact
                        >
                            <div className="w-8 h-8 bg-emerald-50 rounded-lg flex items-center justify-center text-emerald-600 mb-4 shrink-0"><IoCheckmarkOutline size={18}/></div>
                            <input placeholder="Asset Name" className="font-black text-slate-900 text-sm mb-2 bg-transparent outline-none w-full tracking-tighter uppercase" value={item.t} onChange={(e) => {
                                const newArr = [...content.details.sections.checklist];
                                newArr[idx].t = e.target.value;
                                updateNested("details", "sections.checklist", newArr);
                            }} />
                            <textarea placeholder="Artifact Description" rows="3" className="text-[11px] text-slate-500 font-medium leading-relaxed bg-transparent outline-none w-full" value={item.d} onChange={(e) => {
                                const newArr = [...content.details.sections.checklist];
                                newArr[idx].d = e.target.value;
                                updateNested("details", "sections.checklist", newArr);
                            }} />
                        </CardWrapper>
                    ))}
                </div>
            </section>

          </motion.div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        .input-field {
            @apply w-full px-4 py-2 bg-slate-50 border border-transparent focus:border-blue-500/10 focus:bg-white rounded-xl outline-none transition-all font-bold text-xs;
        }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
}

function Field({ label, value, onChange, textarea = false, dark = false, small = false, icon = null }) {
    return (
        <div className={small ? "w-32" : "w-full"}>
            <label className={`block text-[10px] font-black uppercase mb-1 tracking-widest ${dark ? 'text-slate-500' : 'text-slate-400'}`}>
                {label}
            </label>
            <div className={`relative flex items-center ${dark ? 'bg-white/5 border-white/5' : 'bg-slate-50 border-transparent'} border rounded-lg overflow-hidden focus-within:border-blue-500/10 transition-all`}>
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
        <div className={`${compact ? 'p-4' : 'p-6'} bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-lg transition-all relative group ${highlight ? 'ring-2 ring-blue-600 shadow-blue-600/10' : ''}`}>
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
        <button onClick={onClick} className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-all">
            <IoAddOutline size={18} />
        </button>
    );
    return (
        <button 
            onClick={onClick}
            className="h-full min-h-[140px] border-2 border-dashed border-slate-100 rounded-2xl flex flex-col items-center justify-center gap-2 text-slate-300 hover:text-blue-500 hover:border-blue-200 hover:bg-blue-50/30 transition-all group"
        >
            <div className="w-10 h-10 rounded-full border-2 border-dashed border-slate-200 flex items-center justify-center group-hover:scale-110 transition-transform">
                <IoAddOutline size={18} />
            </div>
            <span className="text-[9px] font-black uppercase tracking-widest">{label}</span>
        </button>
    );
}
