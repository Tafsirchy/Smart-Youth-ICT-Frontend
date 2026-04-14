"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  IoSaveOutline, IoRefreshOutline, IoAddOutline, IoTrashOutline, 
  IoServerOutline, IoGlobeOutline, IoPricetagOutline, IoHardwareChipOutline, 
  IoCheckmarkOutline, IoShieldCheckmarkOutline, IoPulseOutline, IoFlashOutline,
  IoSparklesOutline, IoCloudDownloadOutline
} from "react-icons/io5";
import api from "@/lib/api";
import toast from "react-hot-toast";

const ICON_OPTIONS = ["Server", "Globe", "Flash", "Shield", "Headset", "Cloud", "HardwareChip", "Pulse", "GitNetwork", "Lock", "Sync", "Infinite"];

export default function HostingCMS() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState("landing");
  const [content, setContent] = useState({
    landing: {
      hero: { badge: "", title: "", description: "" },
      sections: { pricing: [], pillars: [] },
      cta: { title: "" }
    },
    details: {
      hero: { badge: "", title: "", desc: "", subtitle: "" },
      sections: { phases: [], roi: [] },
      cta: { title: "" }
    }
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await api.get("/cms/services/web-software/hosting");
      if (res.data.data) {
        setContent(res.data.data);
      }
    } catch (err) {
      toast.error("Failed to load hosting content");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await api.put("/cms/services/web-software/hosting", content);
      toast.success("Hosting & Infrastructure content updated globally");
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

  if (loading) return <div className="p-20 text-center font-black animate-pulse text-blue-500 tracking-[0.3em]">PROVISIONING CMS CONTROLS...</div>;

  return (
    <div className="p-8 max-w-7xl mx-auto pb-40">
      <div className="flex justify-between items-center mb-12">
        <div>
          <h1 className="text-4xl font-black text-slate-900 mb-2">Domain & Hosting CMS</h1>
          <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">Managing Global Infrastructure</p>
        </div>
        <button 
          onClick={handleSave}
          disabled={saving}
          className="px-8 py-4 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-widest text-xs flex items-center gap-3 hover:bg-black transition-all shadow-2xl"
        >
          {saving ? <IoRefreshOutline className="animate-spin" /> : <IoSaveOutline />}
          Deploy Infrastructure Updates
        </button>
      </div>

      <div className="flex gap-4 mb-12 border-b border-slate-100 pb-4">
        {[
          { id: "landing", label: "Hero & Tiers", icon: IoServerOutline, color: "text-blue-500" },
          { id: "details", label: "Technical Manifest", icon: IoHardwareChipOutline, color: "text-indigo-500" },
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
                <h2 className="text-xl font-black uppercase tracking-tighter mb-8 flex items-center gap-3 text-blue-600">
                    <IoSparklesOutline /> Hero Architecture
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="md:col-span-2">
                        <label className="block text-[10px] font-black uppercase text-slate-400 mb-2 font-bold tracking-widest">Badge Text</label>
                        <input className="w-full px-5 py-3 bg-slate-50 border border-transparent focus:border-blue-500/20 rounded-xl outline-none font-bold text-sm" value={content.landing.hero.badge || ""} onChange={(e) => updateNested("landing", "hero.badge", e.target.value)} />
                    </div>
                    <div>
                        <label className="block text-[10px] font-black uppercase text-slate-400 mb-2 font-bold tracking-widest">Primary Title</label>
                        <input className="w-full px-5 py-3 bg-slate-50 border border-transparent focus:border-blue-500/20 rounded-xl outline-none font-bold text-sm" value={content.landing.hero.title || ""} onChange={(e) => updateNested("landing", "hero.title", e.target.value)} />
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-[10px] font-black uppercase text-slate-400 mb-2 font-bold tracking-widest">Hero Description</label>
                        <textarea rows="3" className="w-full px-5 py-3 bg-slate-50 border border-transparent focus:border-blue-500/20 rounded-xl outline-none font-medium text-sm leading-relaxed" value={content.landing.hero.description || ""} onChange={(e) => updateNested("landing", "hero.description", e.target.value)} />
                    </div>
                </div>
            </section>

            <section className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-xl font-black uppercase tracking-tighter flex items-center gap-3 text-blue-600">
                        <IoPricetagOutline /> Pricing Tiers
                    </h2>
                    <button onClick={() => {
                        const newPricing = [...(content.landing.sections.pricing || []), { t: "", p: "", list: [""], highlight: false }];
                        updateNested("landing", "sections.pricing", newPricing);
                    }} className="text-[10px] font-black uppercase text-blue-500 hover:text-blue-600">+ Add Hosting Plan</button>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {content.landing.sections.pricing?.map((plan, idx) => (
                        <div key={idx} className={`p-8 bg-slate-50 rounded-[2.5rem] border ${plan.highlight ? 'border-blue-500/50 outline outline-4 outline-blue-500/5' : 'border-slate-100'} relative group`}>
                            <button onClick={() => {
                                const newItems = content.landing.sections.pricing.filter((_, i) => i !== idx);
                                updateNested("landing", "sections.pricing", newItems);
                            }} className="absolute top-4 right-4 text-slate-300 hover:text-rose-600 transition-colors"><IoTrashOutline size={16}/></button>
                            <div className="space-y-6">
                                <div className="flex justify-between gap-4">
                                    <input placeholder="Plan Name" className="flex-1 px-4 py-2 rounded-xl bg-white border border-slate-200 outline-none text-sm font-black uppercase tracking-tighter" value={plan.t} onChange={(e) => {
                                        const newItems = [...content.landing.sections.pricing];
                                        newItems[idx].t = e.target.value;
                                        updateNested("landing", "sections.pricing", newItems);
                                    }} />
                                    <div className="flex items-center gap-2">
                                        <span className="text-[10px] font-black text-slate-400">BEST</span>
                                        <input type="checkbox" checked={plan.highlight} onChange={(e) => {
                                            const newItems = [...content.landing.sections.pricing];
                                            newItems[idx].highlight = e.target.checked;
                                            updateNested("landing", "sections.pricing", newItems);
                                        }} />
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-xl font-black text-blue-600">$</span>
                                    <input placeholder="Price" className="w-full px-4 py-2 rounded-xl bg-white border border-slate-200 outline-none text-2xl font-black tracking-tighter" value={plan.p} onChange={(e) => {
                                        const newItems = [...content.landing.sections.pricing];
                                        newItems[idx].p = e.target.value;
                                        updateNested("landing", "sections.pricing", newItems);
                                    }} />
                                </div>
                                <div className="space-y-2">
                                    <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Included Features</p>
                                    {plan.list?.map((feature, fIdx) => (
                                        <div key={fIdx} className="flex gap-2">
                                           <input className="flex-1 px-3 py-1 bg-white border border-slate-100 rounded-lg text-xs" value={feature} onChange={(e) => {
                                               const newItems = [...content.landing.sections.pricing];
                                               newItems[idx].list[fIdx] = e.target.value;
                                               updateNested("landing", "sections.pricing", newItems);
                                           }} />
                                           <button onClick={() => {
                                               const newItems = [...content.landing.sections.pricing];
                                               newItems[idx].list = newItems[idx].list.filter((_, i) => i !== fIdx);
                                               updateNested("landing", "sections.pricing", newItems);
                                           }} className="text-slate-200"><IoTrashOutline size={12}/></button>
                                        </div>
                                    ))}
                                    <button onClick={() => {
                                        const newItems = [...content.landing.sections.pricing];
                                        newItems[idx].list.push("");
                                        updateNested("landing", "sections.pricing", newItems);
                                    }} className="text-[9px] font-black text-blue-500 uppercase">+ Add Feature</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-xl font-black uppercase tracking-tighter flex items-center gap-3 text-blue-600">
                        <IoFlashOutline /> Infrastructure Pillars
                    </h2>
                    <button onClick={() => {
                        const newPillars = [...(content.landing.sections.pillars || []), { title: "", desc: "", icon: "Flash" }];
                        updateNested("landing", "sections.pillars", newPillars);
                    }} className="text-[10px] font-black uppercase text-blue-500 hover:text-blue-600">+ Add Pillar</button>
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
                                <input placeholder="Pillar Title" className="w-full px-4 py-2 rounded-xl bg-white border border-slate-200 outline-none text-sm font-bold" value={item.title} onChange={(e) => {
                                    const newItems = [...content.landing.sections.pillars];
                                    newItems[idx].title = e.target.value;
                                    updateNested("landing", "sections.pillars", newItems);
                                }} />
                                <textarea placeholder="Pillar Description" rows="2" className="w-full px-4 py-2 rounded-xl bg-white border border-slate-200 outline-none text-xs" value={item.desc} onChange={(e) => {
                                    const newItems = [...content.landing.sections.pillars];
                                    newItems[idx].desc = e.target.value;
                                    updateNested("landing", "sections.pillars", newItems);
                                }} />
                            </div>
                        </div>
                    ))}
                </div>
            </section>
          </motion.div>
        ) : (
          <motion.div key="details" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-12">
            
            <section className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm">
                <h2 className="text-xl font-black uppercase tracking-tighter mb-8 flex items-center gap-3 text-indigo-600">
                    <IoHardwareChipOutline /> Technical Manifest
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <label className="block text-[10px] font-black uppercase text-slate-400 mb-2 font-bold tracking-widest">Manifest Version (Badge)</label>
                        <input className="w-full px-5 py-3 bg-slate-50 border border-transparent focus:border-indigo-500/20 rounded-xl outline-none font-bold text-sm" value={content.details.hero.badge || ""} onChange={(e) => updateNested("details", "hero.badge", e.target.value)} />
                    </div>
                    <div>
                        <label className="block text-[10px] font-black uppercase text-slate-400 mb-2 font-bold tracking-widest">Techno-Title</label>
                        <input className="w-full px-5 py-3 bg-slate-50 border border-transparent focus:border-indigo-500/20 rounded-xl outline-none font-bold text-sm" value={content.details.hero.title || ""} onChange={(e) => updateNested("details", "hero.title", e.target.value)} />
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-[10px] font-black uppercase text-slate-400 mb-2 font-bold tracking-widest">Infrastructure Philosophy</label>
                        <textarea rows="3" className="w-full px-5 py-3 bg-slate-50 border border-transparent focus:border-indigo-500/20 rounded-xl outline-none font-medium text-sm leading-relaxed" value={content.details.hero.desc || ""} onChange={(e) => updateNested("details", "hero.desc", e.target.value)} />
                    </div>
                </div>
            </section>

            <section className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-xl font-black uppercase tracking-tighter flex items-center gap-3 text-indigo-600">
                        <IoCloudDownloadOutline /> The Deployment Lifecycle
                    </h2>
                    <button onClick={() => {
                        const newPhases = [...(content.details.sections.phases || []), { step: "0X", stage: "", action: "" }];
                        updateNested("details", "sections.phases", newPhases);
                    }} className="text-[10px] font-black uppercase text-indigo-500 hover:text-indigo-600">+ Add Phase</button>
                </div>
                <div className="space-y-4">
                    {content.details.sections.phases?.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-4 bg-slate-50 p-6 rounded-3xl border border-slate-100 relative group">
                            <input placeholder="01" className="w-16 px-4 py-2 rounded-xl bg-white border border-slate-200 outline-none text-xs font-mono font-bold text-indigo-600" value={item.step} onChange={(e) => {
                                const newItems = [...content.details.sections.phases];
                                newItems[idx].step = e.target.value;
                                updateNested("details", "sections.phases", newItems);
                            }} />
                            <input placeholder="Stage Name" className="w-1/4 px-4 py-2 rounded-xl bg-white border border-slate-200 outline-none text-xs font-bold" value={item.stage} onChange={(e) => {
                                const newItems = [...content.details.sections.phases];
                                newItems[idx].stage = e.target.value;
                                updateNested("details", "sections.phases", newItems);
                            }} />
                            <textarea placeholder="Action details..." rows="1" className="flex-1 px-4 py-2 rounded-xl bg-white border border-slate-200 outline-none text-xs" value={item.action} onChange={(e) => {
                                const newItems = [...content.details.sections.phases];
                                newItems[idx].action = e.target.value;
                                updateNested("details", "sections.phases", newItems);
                            }} />
                            <button onClick={() => {
                                const newItems = content.details.sections.phases.filter((_, i) => i !== idx);
                                updateNested("details", "sections.phases", newItems);
                            }} className="text-slate-300 hover:text-rose-600"><IoTrashOutline /></button>
                        </div>
                    ))}
                </div>
            </section>

            <section className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-xl font-black uppercase tracking-tighter flex items-center gap-3 text-indigo-600">
                        <IoShieldCheckmarkOutline /> Structural Frameworks
                    </h2>
                    <button onClick={() => {
                        const newRoi = [...(content.details.sections.roi || []), { group: "", items: [""] }];
                        updateNested("details", "sections.roi", newRoi);
                    }} className="text-[10px] font-black uppercase text-indigo-500 hover:text-indigo-600">+ Add Framework Group</button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {content.details.sections.roi?.map((group, gIdx) => (
                        <div key={gIdx} className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 relative">
                            <button onClick={() => {
                                const newRoi = content.details.sections.roi.filter((_, i) => i !== gIdx);
                                updateNested("details", "sections.roi", newRoi);
                            }} className="absolute top-6 right-6 text-slate-300 hover:text-rose-600"><IoTrashOutline /></button>
                            <input placeholder="Framework Group (e.g. Hardware Tier)" className="w-full px-4 py-2 rounded-xl bg-white border border-slate-200 outline-none text-xs font-black uppercase tracking-widest mb-6 text-indigo-600" value={group.group} onChange={(e) => {
                                const newRoi = [...content.details.sections.roi];
                                newRoi[gIdx].group = e.target.value;
                                updateNested("details", "sections.roi", newRoi);
                            }} />
                            <div className="space-y-2">
                                {group.items?.map((item, iIdx) => (
                                    <div key={iIdx} className="flex gap-2">
                                        <input className="flex-1 px-4 py-2 rounded-xl bg-white border border-slate-100 outline-none text-xs font-bold" value={item} onChange={(e) => {
                                            const newRoi = [...content.details.sections.roi];
                                            newRoi[gIdx].items[iIdx] = e.target.value;
                                            updateNested("details", "sections.roi", newRoi);
                                        }} />
                                        <button onClick={() => {
                                            const newRoi = [...content.details.sections.roi];
                                            newRoi[gIdx].items = newRoi[gIdx].items.filter((_, i) => i !== iIdx);
                                            updateNested("details", "sections.roi", newRoi);
                                        }} className="text-slate-300"><IoTrashOutline size={14}/></button>
                                    </div>
                                ))}
                                <button onClick={() => {
                                    const newRoi = [...content.details.sections.roi];
                                    newRoi[gIdx].items.push("");
                                    updateNested("details", "sections.roi", newRoi);
                                }} className="text-[9px] font-black text-indigo-500 uppercase">+ Add Spec Item</button>
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
