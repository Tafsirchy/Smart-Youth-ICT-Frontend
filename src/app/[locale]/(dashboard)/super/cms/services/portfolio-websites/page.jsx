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
  IoImageOutline, IoListOutline, IoInformationCircleOutline, IoFlashOutline,
  IoTerminalOutline
} from "react-icons/io5";
import api from "@/lib/api";
import toast from "react-hot-toast";

const ICON_OPTIONS = [
  "Rocket", "Business", "Briefcase", "GitNetwork", "Globe", 
  "Analytics", "Shield", "Stats", "Chip", "Sparkles", "Layers", "Palette", "Flash"
];

const COLOR_OPTIONS = [
  { name: "Blue", value: "from-blue-500 to-blue-600", text: "text-blue-500" },
  { name: "Indigo", value: "from-indigo-500 to-indigo-600", text: "text-indigo-500" },
  { name: "Cyan", value: "from-cyan-500 to-blue-500", text: "text-cyan-500" },
  { name: "Slate", value: "from-slate-700 to-slate-800", text: "text-slate-700" },
  { name: "Emerald", value: "from-emerald-500 to-teal-500", text: "text-emerald-500" },
  { name: "Rose", value: "from-rose-500 to-pink-500", text: "text-rose-500" }
];

export default function PortfolioCMS() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState("landing");
  const [content, setContent] = useState({
    landing: {
      hero: { badge: "", title: "", subtitle: "", description: "", mainImage: "" },
      sections: { 
        philosophies: [], 
        phases: [],
        pricingHeader: { badge: "", title: "", focus: "" },
        pricing: [] 
      },
      cta: { title: "" }
    },
    details: {
      hero: { badge: "", title: "", subtitle: "", description: "" },
      sections: { 
        techStack: [], 
        checklist: [], 
        codeSnippet: { title: "", description: "", tags: [], code: "", fileName: "" }
      },
      cta: { title: "" }
    }
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await api.get("/cms/services/web-software/portfolio-websites");
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
      toast.error("Failed to load portfolio content");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await api.put("/cms/services/web-software/portfolio-websites", content);
      toast.success("Portfolio architecture updated globally");
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
        <span className="font-black text-slate-900 uppercase tracking-widest text-xs">Initializing Portfolio Infrastructure...</span>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 p-6 max-w-7xl mx-auto pb-24 text-slate-900 selection:bg-rose-600 selection:text-white">
      {/* HEADER PROTOCOL */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 text-rose-600 mb-1">
            <IoPrismOutline className="text-lg" />
            <span className="text-[9px] font-black uppercase tracking-[0.4em]">Service_Tier_Creative_Core</span>
          </div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tighter leading-none">Portfolio Websites</h1>
          <p className="text-slate-400 font-bold uppercase tracking-widest text-[9px] mt-2 ml-1">Centralized Creative Node</p>
        </div>
        <button 
          onClick={handleSave}
          disabled={saving}
          className="group relative overflow-hidden px-8 py-3.5 bg-slate-900 text-white rounded-xl font-black uppercase tracking-widest text-[10px] flex items-center gap-3 hover:shadow-xl hover:shadow-rose-950/20 transition-all active:scale-95 disabled:opacity-50"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-rose-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="relative flex items-center gap-3">
            {saving ? <IoRefreshOutline className="animate-spin" /> : <IoSaveOutline className="group-hover:rotate-12 transition-transform" />}
            Deploy Creative Stack
          </div>
        </button>
      </div>

      {/* TIER SELECTOR */}
      <div className="flex gap-1 mb-8 bg-white p-1.5 rounded-xl border border-slate-200 w-fit shadow-sm">
        {[
          { id: "landing", label: "Landing Architecture", icon: IoLayersOutline, color: "text-rose-500" },
          { id: "details", label: "Technical Manifest", icon: IoSettingsOutline, color: "text-indigo-500" },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2.5 px-6 py-2.5 rounded-lg font-black uppercase tracking-widest text-[9px] transition-all ${activeTab === tab.id ? 'bg-slate-900 text-white shadow-md' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'}`}
          >
            <tab.icon size={16} className={activeTab === tab.id ? 'text-rose-400' : tab.color} />
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
                    <div>
                        <Field label="Main Image URL" value={content.landing.hero.mainImage} onChange={(v) => updateNested("landing", "hero.mainImage", v)} icon={<IoImageOutline />} />
                    </div>
                </div>
            </section>

            {/* PHILOSOPHIES */}
            <section className="bg-white p-8 rounded-3xl border border-slate-100 shadow-lg shadow-slate-200/30">
                <div className="flex justify-between items-center mb-6 pb-4 border-b border-slate-100">
                    <h2 className="text-xl font-black tracking-tighter flex items-center gap-3">
                        <div className="w-8 h-8 bg-indigo-50 rounded-lg flex items-center justify-center text-indigo-600"><IoColorPaletteOutline /></div>
                        Design Philosophies
                    </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {content.landing.sections.philosophies?.map((item, idx) => (
                        <CardWrapper key={idx} onRemove={() => {
                            const newArr = content.landing.sections.philosophies.filter((_, i) => i !== idx);
                            updateNested("landing", "sections.philosophies", newArr);
                        }}>
                             <div className="flex gap-4 mb-4">
                                <select className="bg-slate-50 border border-slate-100 rounded-lg p-2 text-[9px] font-black uppercase tracking-widest outline-none text-rose-600" value={item.icon} onChange={(e) => {
                                    const newArr = [...content.landing.sections.philosophies];
                                    newArr[idx].icon = e.target.value;
                                    updateNested("landing", "sections.philosophies", newArr);
                                }}>
                                    {ICON_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
                                </select>
                                <div className="flex-1">
                                    <input placeholder="Title" className="w-full bg-transparent border-none outline-none font-black text-sm uppercase tracking-tighter" value={item.title} onChange={(e) => {
                                        const newArr = [...content.landing.sections.philosophies];
                                        newArr[idx].title = e.target.value;
                                        updateNested("landing", "sections.philosophies", newArr);
                                    }} />
                                    <div className="flex items-center gap-1.5 mt-1">
                                        <IoColorPaletteOutline className="text-slate-300 text-xs" />
                                        <select className="bg-transparent border-none outline-none text-[8px] font-bold text-slate-400 uppercase" value={item.color} onChange={(e) => {
                                            const newArr = [...content.landing.sections.philosophies];
                                            newArr[idx].color = e.target.value;
                                            updateNested("landing", "sections.philosophies", newArr);
                                        }}>
                                            {COLOR_OPTIONS.map(c => <option key={c.value} value={c.value}>{c.name}</option>)}
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <textarea placeholder="Description" rows="3" className="w-full bg-slate-50 border border-transparent focus:bg-white focus:border-slate-100 rounded-xl p-3 text-[11px] text-slate-500 leading-relaxed outline-none transition-all" value={item.desc} onChange={(e) => {
                                const newArr = [...content.landing.sections.philosophies];
                                newArr[idx].desc = e.target.value;
                                updateNested("landing", "sections.philosophies", newArr);
                            }} />
                        </CardWrapper>
                    ))}
                    <AddButton onClick={() => {
                        const newArr = [...(content.landing.sections.philosophies || []), { title: "New Philosophy", desc: "", icon: "Layers", color: "from-slate-900 to-slate-800", border: "border-slate-100" }];
                        updateNested("landing", "sections.philosophies", newArr);
                    }} label="Add Philosophy" />
                </div>
            </section>

            {/* DEVELOPMENT PHASES */}
            <section className="bg-slate-900 p-8 rounded-3xl text-white shadow-xl shadow-rose-900/10">
                <div className="flex justify-between items-center mb-6 pb-4 border-b border-white/10">
                    <h2 className="text-xl font-black tracking-tighter flex items-center gap-3 text-white">
                        <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center text-rose-400"><IoGitNetworkOutline /></div>
                        Development Roadmap
                    </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {content.landing.sections.phases?.map((phase, idx) => (
                        <div key={idx} className="bg-white/5 border border-white/10 p-6 rounded-2xl relative group">
                            <button onClick={() => {
                                const newArr = content.landing.sections.phases.filter((_, i) => i !== idx);
                                updateNested("landing", "sections.phases", newArr);
                            }} className="absolute top-4 right-4 text-white/10 hover:text-rose-500 opacity-0 group-hover:opacity-100 transition-all"><IoTrashOutline size={16}/></button>
                            <div className="flex items-center gap-6 mb-6">
                                <div className="w-12 h-12 shrink-0 bg-white/10 rounded-xl flex items-center justify-center border border-white/5 shadow-inner">
                                    <input 
                                        placeholder="01" 
                                        className="bg-transparent border-none outline-none text-rose-400 font-black text-xs text-center w-full" 
                                        value={phase.id} 
                                        onChange={(e) => {
                                            const newArr = [...content.landing.sections.phases];
                                            newArr[idx].id = e.target.value;
                                            updateNested("landing", "sections.phases", newArr);
                                        }} 
                                    />
                                </div>
                                <input 
                                    placeholder="Phase Title" 
                                    className="bg-transparent border-none outline-none font-black text-sm uppercase text-white flex-1 min-w-0" 
                                    value={phase.t} 
                                    onChange={(e) => {
                                        const newArr = [...content.landing.sections.phases];
                                        newArr[idx].t = e.target.value;
                                        updateNested("landing", "sections.phases", newArr);
                                    }} 
                                />
                            </div>
                            <textarea placeholder="Phase Description" rows="2" className="w-full bg-transparent border-none outline-none text-[11px] text-slate-400 font-medium leading-relaxed" value={phase.d} onChange={(e) => {
                                const newArr = [...content.landing.sections.phases];
                                newArr[idx].d = e.target.value;
                                updateNested("landing", "sections.phases", newArr);
                            }} />
                        </div>
                    ))}
                    <button onClick={() => {
                        const newArr = [...(content.landing.sections.phases || []), { id: "0"+((content.landing.sections.phases?.length || 0)+1), t: "New Phase", d: "" }];
                        updateNested("landing", "sections.phases", newArr);
                    }} className="h-full min-h-[140px] border-2 border-dashed border-white/10 rounded-2xl flex flex-col items-center justify-center gap-2 text-white/20 hover:text-rose-400 hover:border-rose-400/30 hover:bg-white/5 transition-all group">
                        <IoAddOutline size={24} />
                        <span className="text-[9px] font-black uppercase tracking-widest">Append Phase</span>
                    </button>
                </div>
            </section>

            {/* PRICING TIER PROTOCOL */}
            <section className="bg-white p-8 rounded-3xl border border-slate-100 shadow-lg shadow-slate-200/30">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 pb-4 border-b border-slate-100 gap-4">
                    <h2 className="text-xl font-black tracking-tighter flex items-center gap-3">
                        <div className="w-8 h-8 bg-emerald-50 rounded-lg flex items-center justify-center text-emerald-600"><IoStatsChartOutline /></div>
                        Service Tiers
                    </h2>
                    <div className="flex gap-3 w-full md:w-auto">
                        <Field label="Section Badge" value={content.landing.sections.pricingHeader?.badge} onChange={(v) => updateNested("landing", "sections.pricingHeader.badge", v)} small />
                        <Field label="Focus Text" value={content.landing.sections.pricingHeader?.focus} onChange={(v) => updateNested("landing", "sections.pricingHeader.focus", v)} small />
                    </div>
                </div>
                
                <div className="mb-8">
                     <Field label="Section Title" value={content.landing.sections.pricingHeader?.title} onChange={(v) => updateNested("landing", "sections.pricingHeader.title", v)} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {content.landing.sections.pricing?.map((tier, idx) => (
                        <CardWrapper 
                            key={idx} 
                            highlight={tier.highlight}
                            onRemove={() => updateNested("landing", "sections.pricing", content.landing.sections.pricing.filter((_, i) => i !== idx))}
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
                                }} className={`p-1.5 rounded-lg transition-all ${tier.highlight ? 'bg-rose-600 text-white shadow-lg shadow-rose-500/30' : 'bg-slate-50 text-slate-300 hover:text-rose-500'}`}><IoSparklesOutline size={12}/></button>
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
                                        }} className="opacity-0 group-hover/feat:opacity-100 text-rose-500 hover:scale-110 transition-all"><IoTrashOutline size={12}/></button>
                                    </div>
                                ))}
                                <button onClick={() => {
                                    const newArr = [...content.landing.sections.pricing];
                                    newArr[idx].list = [...(newArr[idx].list || []), "New Feature"];
                                    updateNested("landing", "sections.pricing", newArr);
                                }} className="text-[9px] font-black text-rose-500 mt-1 hover:underline">+ Add Feature</button>
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
                        const newArr = [...(content.landing.sections.pricing || []), { t: "Standard", p: "$1499", list: [], color: "indigo", highlight: false }];
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

            {/* TECH STACK */}
            <section className="bg-white p-8 rounded-3xl border border-slate-100 shadow-lg shadow-slate-200/30">
                <div className="flex justify-between items-center mb-6 pb-4 border-b border-slate-100">
                    <h2 className="text-xl font-black tracking-tighter flex items-center gap-3">
                        <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600"><IoHardwareChipOutline /></div>
                        Technology Stack
                    </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {content.details.sections.techStack?.map((tech, idx) => (
                        <CardWrapper key={idx} onRemove={() => {
                            const newArr = content.details.sections.techStack.filter((_, i) => i !== idx);
                            updateNested("details", "sections.techStack", newArr);
                        }}>
                             <div className="flex gap-4 mb-4">
                                <select className="bg-slate-50 border border-slate-100 rounded-lg p-2 text-[9px] font-black uppercase tracking-widest outline-none text-blue-600" value={tech.icon} onChange={(e) => {
                                    const newArr = [...content.details.sections.techStack];
                                    newArr[idx].icon = e.target.value;
                                    updateNested("details", "sections.techStack", newArr);
                                }}>
                                    {ICON_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
                                </select>
                                <div className="flex-1">
                                    <input placeholder="Product" className="w-full bg-transparent border-none outline-none font-black text-sm uppercase tracking-tighter" value={tech.t} onChange={(e) => {
                                        const newArr = [...content.details.sections.techStack];
                                        newArr[idx].t = e.target.value;
                                        updateNested("details", "sections.techStack", newArr);
                                    }} />
                                    <select className="bg-transparent border-none outline-none text-[8px] font-bold text-slate-400 uppercase mt-1" value={tech.colSpan} onChange={(e) => {
                                        const newArr = [...content.details.sections.techStack];
                                        newArr[idx].colSpan = e.target.value;
                                        updateNested("details", "sections.techStack", newArr);
                                    }}>
                                        <option value="md:col-span-1">Standard (1x)</option>
                                        <option value="md:col-span-2">Wide (2x)</option>
                                    </select>
                                </div>
                            </div>
                            <textarea placeholder="Integration Detail" rows="2" className="w-full bg-slate-50 border border-transparent focus:bg-white focus:border-slate-100 rounded-xl p-3 text-[11px] text-slate-500 leading-relaxed outline-none transition-all" value={tech.d} onChange={(e) => {
                                const newArr = [...content.details.sections.techStack];
                                newArr[idx].d = e.target.value;
                                updateNested("details", "sections.techStack", newArr);
                            }} />
                        </CardWrapper>
                    ))}
                    <AddButton onClick={() => {
                        const newArr = [...(content.details.sections.techStack || []), { t: "New Tech", d: "", icon: "Layers", color: "bg-slate-900", colSpan: "md:col-span-1" }];
                        updateNested("details", "sections.techStack", newArr);
                    }} label="Add Tech Node" />
                </div>
            </section>

            {/* CODE SNIPPET */}
            <section className="bg-slate-900 p-8 rounded-3xl text-white shadow-xl">
                <div className="flex items-center gap-3 mb-8 pb-4 border-b border-white/10">
                    <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center text-blue-400"><IoTerminalOutline /></div>
                    <h2 className="text-xl font-black tracking-tighter">Code Architecture Manifest</h2>
                </div>
                <div className="grid lg:grid-cols-2 gap-8">
                    <div className="space-y-6">
                        <Field label="Section Title" value={content.details.sections.codeSnippet?.title} onChange={(v) => updateNested("details", "sections.codeSnippet.title", v)} dark />
                        <Field label="Description" value={content.details.sections.codeSnippet?.description} onChange={(v) => updateNested("details", "sections.codeSnippet.description", v)} textarea dark />
                        <div>
                             <label className="block text-[9px] font-black uppercase mb-1.5 tracking-widest text-slate-500">Atomic Tags</label>
                             <div className="flex flex-wrap gap-2 p-4 bg-white/5 border border-white/10 rounded-xl">
                                {content.details.sections.codeSnippet?.tags?.map((tag, i) => (
                                    <div key={i} className="flex items-center bg-white/10 px-3 py-1 rounded-lg gap-2">
                                        <input className="bg-transparent border-none outline-none font-bold text-[10px] text-blue-400 w-20" value={tag} onChange={(e) => {
                                            const newTags = [...content.details.sections.codeSnippet.tags];
                                            newTags[i] = e.target.value;
                                            updateNested("details", "sections.codeSnippet.tags", newTags);
                                        }} />
                                        <button onClick={() => {
                                            const newTags = content.details.sections.codeSnippet.tags.filter((_, idx) => idx !== i);
                                            updateNested("details", "sections.codeSnippet.tags", newTags);
                                        }} className="text-white/20 hover:text-rose-500"><IoTrashOutline size={12}/></button>
                                    </div>
                                ))}
                                <button onClick={() => {
                                    const newTags = [...(content.details.sections.codeSnippet.tags || []), "NEW_TAG"];
                                    updateNested("details", "sections.codeSnippet.tags", newTags);
                                }} className="text-[10px] font-black text-blue-400 border border-blue-400/30 px-3 py-1 rounded-lg hover:bg-blue-400/10">+ Add</button>
                             </div>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <Field label="Filename" value={content.details.sections.codeSnippet?.fileName} onChange={(v) => updateNested("details", "sections.codeSnippet.fileName", v)} dark small />
                        </div>
                        <div className="relative group">
                             <div className="absolute -top-3 right-4 px-3 py-1 bg-blue-600 rounded-full text-[8px] font-black uppercase tracking-widest z-10 shadow-lg">Live_Editor</div>
                             <textarea 
                                rows="10" 
                                className="w-full bg-black/50 border border-white/10 rounded-2xl p-6 font-mono text-[11px] text-blue-300 outline-none focus:border-blue-500/30 transition-all scrollbar-hide"
                                value={content.details.sections.codeSnippet?.code}
                                onChange={(e) => updateNested("details", "sections.codeSnippet.code", e.target.value)}
                             />
                        </div>
                    </div>
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
            <div className={`relative flex items-center ${dark ? 'bg-white/5 border-white/5' : 'bg-slate-50 border-transparent'} border rounded-xl overflow-hidden focus-within:border-rose-500/10 transition-all`}>
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

function CardWrapper({ children, onRemove, highlight = false }) {
    return (
        <div className={`p-6 bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-lg transition-all relative group ${highlight ? 'ring-2 ring-rose-600 shadow-rose-600/10' : ''}`}>
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
