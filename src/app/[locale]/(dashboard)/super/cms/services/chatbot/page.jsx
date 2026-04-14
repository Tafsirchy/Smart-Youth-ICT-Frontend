"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  IoSaveOutline, IoRefreshOutline, IoAddOutline, IoTrashOutline, 
  IoLayersOutline, IoSettingsOutline, IoChatbubblesOutline, IoHardwareChipOutline, 
  IoCheckmarkOutline, IoChevronForwardOutline, IoShieldCheckmarkOutline,
  IoPulseOutline, IoGitNetworkOutline, IoRocketOutline, IoSparklesOutline
} from "react-icons/io5";
import api from "@/lib/api";
import toast from "react-hot-toast";

const ICON_OPTIONS = ["Chatbubbles", "Chip", "Pulse", "GitNetwork", "Shield", "Rocket", "Sparkles", "Stats", "Globe", "Cloud", "Settings", "Lock", "Sync", "Infinite"];

export default function ChatbotCMS() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState("landing");
  const [content, setContent] = useState({
    landing: {
      hero: { badge: "", title: "", description: "" },
      sections: { pillars: [], integrations: [] },
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
      const res = await api.get("/cms/services/web-software/chatbot");
      if (res.data.data) {
        setContent(res.data.data);
      }
    } catch (err) {
      toast.error("Failed to load chatbot content");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await api.put("/cms/services/web-software/chatbot", content);
      toast.success("AI Chatbot content updated globally");
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

  if (loading) return <div className="p-20 text-center font-black animate-pulse text-emerald-500 tracking-[0.3em]">INITIALIZING NEURAL CMS...</div>;

  return (
    <div className="p-8 max-w-7xl mx-auto pb-40">
      <div className="flex justify-between items-center mb-12">
        <div>
          <h1 className="text-4xl font-black text-slate-900 mb-2">AI Chatbot Development CMS</h1>
          <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">Architecting Autonomous Conversation</p>
        </div>
        <button 
          onClick={handleSave}
          disabled={saving}
          className="px-8 py-4 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-widest text-xs flex items-center gap-3 hover:bg-black transition-all shadow-2xl"
        >
          {saving ? <IoRefreshOutline className="animate-spin" /> : <IoSaveOutline />}
          Deploy Neural Updates
        </button>
      </div>

      <div className="flex gap-4 mb-12 border-b border-slate-100 pb-4">
        {[
          { id: "landing", label: "Hero & Pillars", icon: IoChatbubblesOutline, color: "text-emerald-500" },
          { id: "details", label: "Technical Manifest", icon: IoHardwareChipOutline, color: "text-blue-500" },
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
                <h2 className="text-xl font-black uppercase tracking-tighter mb-8 flex items-center gap-3 text-emerald-600">
                    <IoSparklesOutline /> Hero Architecture
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="md:col-span-2">
                        <label className="block text-[10px] font-black uppercase text-slate-400 mb-2 font-bold tracking-widest">Badge Text</label>
                        <input className="w-full px-5 py-3 bg-slate-50 border border-transparent focus:border-emerald-500/20 rounded-xl outline-none font-bold text-sm" value={content.landing.hero.badge || ""} onChange={(e) => updateNested("landing", "hero.badge", e.target.value)} />
                    </div>
                    <div>
                        <label className="block text-[10px] font-black uppercase text-slate-400 mb-2 font-bold tracking-widest">Primary Title</label>
                        <input className="w-full px-5 py-3 bg-slate-50 border border-transparent focus:border-emerald-500/20 rounded-xl outline-none font-bold text-sm" value={content.landing.hero.title || ""} onChange={(e) => updateNested("landing", "hero.title", e.target.value)} />
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-[10px] font-black uppercase text-slate-400 mb-2 font-bold tracking-widest">Hero Description</label>
                        <textarea rows="3" className="w-full px-5 py-3 bg-slate-50 border border-transparent focus:border-emerald-500/20 rounded-xl outline-none font-medium text-sm leading-relaxed" value={content.landing.hero.description || ""} onChange={(e) => updateNested("landing", "hero.description", e.target.value)} />
                    </div>
                </div>
            </section>

            <section className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-xl font-black uppercase tracking-tighter flex items-center gap-3 text-emerald-600">
                        <IoHardwareChipOutline /> Bot Classifications
                    </h2>
                    <button onClick={() => {
                        const newPillars = [...(content.landing.sections.pillars || []), { title: "", desc: "", icon: "Chip", color: "from-emerald-500 to-teal-600" }];
                        updateNested("landing", "sections.pillars", newPillars);
                    }} className="text-[10px] font-black uppercase text-emerald-500 hover:text-emerald-600">+ Add Classification</button>
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
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-xl font-black uppercase tracking-tighter flex items-center gap-3 text-emerald-600">
                        <IoGitNetworkOutline /> Omni-Channel Ecosystem
                    </h2>
                    <button onClick={() => {
                        const newIntegrations = [...(content.landing.sections.integrations || []), { t: "", d: "" }];
                        updateNested("landing", "sections.integrations", newIntegrations);
                    }} className="text-[10px] font-black uppercase text-emerald-500 hover:text-emerald-600">+ Add Channel</button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {content.landing.sections.integrations?.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-100 relative group">
                            <input placeholder="Platform" className="w-1/3 px-4 py-2 rounded-xl bg-white border border-slate-200 outline-none text-xs font-bold" value={item.t} onChange={(e) => {
                                const newItems = [...content.landing.sections.integrations];
                                newItems[idx].t = e.target.value;
                                updateNested("landing", "sections.integrations", newItems);
                            }} />
                            <input placeholder="Description" className="flex-1 px-4 py-2 rounded-xl bg-white border border-slate-200 outline-none text-xs" value={item.d} onChange={(e) => {
                                const newItems = [...content.landing.sections.integrations];
                                newItems[idx].d = e.target.value;
                                updateNested("landing", "sections.integrations", newItems);
                            }} />
                            <button onClick={() => {
                                const newItems = content.landing.sections.integrations.filter((_, i) => i !== idx);
                                updateNested("landing", "sections.integrations", newItems);
                            }} className="text-slate-300 hover:text-rose-600"><IoTrashOutline /></button>
                        </div>
                    ))}
                </div>
            </section>

            <section className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm">
                <h2 className="text-xl font-black uppercase tracking-tighter mb-8 flex items-center gap-3 text-emerald-600">
                    <IoRocketOutline /> Conversion Hub
                </h2>
                <div className="grid grid-cols-1 gap-8">
                    <div>
                        <label className="block text-[10px] font-black uppercase text-slate-400 mb-2 font-bold tracking-widest">CTA Title</label>
                        <input className="w-full px-5 py-3 bg-slate-50 border border-transparent focus:border-emerald-500/20 rounded-xl outline-none font-black text-xl tracking-tighter" value={content.landing.cta.title || ""} onChange={(e) => updateNested("landing", "cta.title", e.target.value)} />
                    </div>
                </div>
            </section>
          </motion.div>
        ) : (
          <motion.div key="details" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-12">
            
            <section className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm">
                <h2 className="text-xl font-black uppercase tracking-tighter mb-8 flex items-center gap-3 text-blue-600">
                    <IoHardwareChipOutline /> Technical Manifest
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <label className="block text-[10px] font-black uppercase text-slate-400 mb-2 font-bold tracking-widest">Small Label (Badge)</label>
                        <input className="w-full px-5 py-3 bg-slate-50 border border-transparent focus:border-blue-500/20 rounded-xl outline-none font-bold text-sm" value={content.details.hero.badge || ""} onChange={(e) => updateNested("details", "hero.badge", e.target.value)} />
                    </div>
                    <div>
                        <label className="block text-[10px] font-black uppercase text-slate-400 mb-2 font-bold tracking-widest">Techno-Title</label>
                        <input className="w-full px-5 py-3 bg-slate-50 border border-transparent focus:border-blue-500/20 rounded-xl outline-none font-bold text-sm" value={content.details.hero.title || ""} onChange={(e) => updateNested("details", "hero.title", e.target.value)} />
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-[10px] font-black uppercase text-slate-400 mb-2 font-bold tracking-widest">Detailed Context</label>
                        <textarea rows="3" className="w-full px-5 py-3 bg-slate-50 border border-transparent focus:border-blue-500/20 rounded-xl outline-none font-medium text-sm leading-relaxed" value={content.details.hero.desc || ""} onChange={(e) => updateNested("details", "hero.desc", e.target.value)} />
                    </div>
                </div>
            </section>

            <section className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-xl font-black uppercase tracking-tighter flex items-center gap-3 text-blue-600">
                        <IoPulseOutline /> Training Lifecycle
                    </h2>
                    <button onClick={() => {
                        const newPhases = [...(content.details.sections.phases || []), { step: "0X", stage: "", action: "" }];
                        updateNested("details", "sections.phases", newPhases);
                    }} className="text-[10px] font-black uppercase text-blue-500 hover:text-blue-600">+ Add Phase</button>
                </div>
                <div className="space-y-4">
                    {content.details.sections.phases?.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-4 bg-slate-50 p-6 rounded-3xl border border-slate-100 relative group">
                            <input placeholder="01" className="w-16 px-4 py-2 rounded-xl bg-white border border-slate-200 outline-none text-xs font-mono font-bold text-blue-600" value={item.step} onChange={(e) => {
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
                    <h2 className="text-xl font-black uppercase tracking-tighter flex items-center gap-3 text-blue-600">
                        <IoShieldCheckmarkOutline /> Performance Tiers
                    </h2>
                    <button onClick={() => {
                        const newRoi = [...(content.details.sections.roi || []), { group: "", items: [""] }];
                        updateNested("details", "sections.roi", newRoi);
                    }} className="text-[10px] font-black uppercase text-blue-500 hover:text-blue-600">+ Add Framework Group</button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {content.details.sections.roi?.map((group, gIdx) => (
                        <div key={gIdx} className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 relative">
                            <button onClick={() => {
                                const newRoi = content.details.sections.roi.filter((_, i) => i !== gIdx);
                                updateNested("details", "sections.roi", newRoi);
                            }} className="absolute top-6 right-6 text-slate-300 hover:text-rose-600"><IoTrashOutline /></button>
                            <input placeholder="Framework Group (e.g. Intelligence Tier)" className="w-full px-4 py-2 rounded-xl bg-white border border-slate-200 outline-none text-xs font-black uppercase tracking-widest mb-6 text-blue-600" value={group.group} onChange={(e) => {
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
                                }} className="text-[9px] font-black text-blue-500 uppercase">+ Add Spec Item</button>
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
