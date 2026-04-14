"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { LuSave, LuRefreshCw, LuPlus, LuTrash2, LuCaseUpper, LuLayoutDashboard } from "react-icons/lu";
import api from "@/lib/api";
import toast from "react-hot-toast";

export default function SkillDevelopmentDashboard() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [content, setContent] = useState({
    hero: { badge: "", title: "", subtitle: "", description: "" },
    methodology: [],
    cta: { title: "", description: "", buttonText: "" }
  });

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const res = await api.get("/cms/services/content/skill-development");
      if (res.data.data) {
        setContent(res.data.data);
      }
    } catch (err) {
      toast.error("Failed to load page content");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await api.put("/cms/services/content/skill-development", content);
      toast.success("Page content updated successfully");
    } catch (err) {
      toast.error("Failed to save changes");
    } finally {
      setSaving(false);
    }
  };

  const addMethod = () => {
    setContent({
      ...content,
      methodology: [...content.methodology, { title: "", description: "" }]
    });
  };

  const removeMethod = (index) => {
    const newMethods = content.methodology.filter((_, i) => i !== index);
    setContent({ ...content, methodology: newMethods });
  };

  if (loading) return <div className="p-10 text-center animate-pulse text-slate-400 font-black uppercase tracking-widest">Loading Infrastructure...</div>;

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-12">
        <div>
          <h1 className="text-3xl font-black text-slate-900 mb-2">Skill Development CMS</h1>
          <p className="text-slate-500">Manage the hero section and core methodology of the Skill Development landing page.</p>
        </div>
        <button 
          onClick={handleSave}
          disabled={saving}
          className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-black flex items-center gap-3 hover:bg-black transition-all shadow-xl shadow-slate-900/10 disabled:opacity-50"
        >
          {saving ? <LuRefreshCw className="animate-spin" /> : <LuSave />}
          {saving ? "Deploying..." : "Update Page"}
        </button>
      </div>

      <div className="space-y-12">
        {/* HERO SECTION */}
        <section className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center"><LuLayoutDashboard /></div>
            <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight">Hero Section</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-[10px] font-black uppercase text-slate-400 mb-2">Hero Title</label>
              <input 
                className="w-full px-6 py-4 bg-slate-50 border-2 border-transparent focus:border-indigo-500/20 focus:bg-white rounded-2xl transition-all outline-none font-bold text-lg" 
                value={content.hero.title}
                onChange={(e) => setContent({ ...content, hero: { ...content.hero, title: e.target.value }})}
              />
            </div>
            <div>
              <label className="block text-[10px] font-black uppercase text-slate-400 mb-2">Badge Text</label>
              <input 
                className="w-full px-6 py-4 bg-slate-50 border-2 border-transparent focus:border-indigo-500/20 focus:bg-white rounded-2xl transition-all outline-none font-bold" 
                value={content.hero.badge}
                onChange={(e) => setContent({ ...content, hero: { ...content.hero, badge: e.target.value }})}
              />
            </div>
            <div>
              <label className="block text-[10px] font-black uppercase text-slate-400 mb-2">Gradient Subtitle</label>
              <input 
                className="w-full px-6 py-4 bg-slate-50 border-2 border-transparent focus:border-indigo-500/20 focus:bg-white rounded-2xl transition-all outline-none font-bold" 
                value={content.hero.subtitle}
                onChange={(e) => setContent({ ...content, hero: { ...content.hero, subtitle: e.target.value }})}
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-[10px] font-black uppercase text-slate-400 mb-2">Description Paragraph</label>
              <textarea 
                rows="3"
                className="w-full px-6 py-4 bg-slate-50 border-2 border-transparent focus:border-indigo-500/20 focus:bg-white rounded-[2rem] transition-all outline-none resize-none leading-relaxed" 
                value={content.hero.description}
                onChange={(e) => setContent({ ...content, hero: { ...content.hero, description: e.target.value }})}
              />
            </div>
          </div>
        </section>

        {/* METHODOLOGY SECTION */}
        <section className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm">
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center"><LuCaseUpper /></div>
              <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight">Methodology Items</h2>
            </div>
            <button onClick={addMethod} className="p-3 bg-emerald-50 text-emerald-600 rounded-xl hover:bg-emerald-100 transition-colors">
              <LuPlus />
            </button>
          </div>
          <div className="space-y-4">
            {content.methodology.map((m, i) => (
              <div key={i} className="flex gap-4 items-start p-6 bg-slate-50 rounded-[2rem] group">
                <div className="flex-1 space-y-4">
                   <input 
                    placeholder="Method Title (e.g. 1. Hands-On Projects)"
                    className="w-full px-4 py-2 bg-white border border-slate-200 rounded-xl outline-none font-bold" 
                    value={m.title}
                    onChange={(e) => {
                      const newM = [...content.methodology];
                      newM[i].title = e.target.value;
                      setContent({ ...content, methodology: newM });
                    }}
                  />
                  <textarea 
                    placeholder="Method Description..."
                    className="w-full px-4 py-2 bg-white border border-slate-200 rounded-xl outline-none resize-none text-sm" 
                    value={m.description}
                    onChange={(e) => {
                      const newM = [...content.methodology];
                      newM[i].description = e.target.value;
                      setContent({ ...content, methodology: newM });
                    }}
                  />
                </div>
                <button onClick={() => removeMethod(i)} className="p-2 text-slate-300 hover:text-rose-500 transition-colors opacity-0 group-hover:opacity-100">
                  <LuTrash2 />
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* CTA SECTION */}
        <section className="bg-slate-900 p-10 rounded-[3rem] shadow-xl">
           <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-white/10 text-white flex items-center justify-center"><LuPlus /></div>
            <h2 className="text-xl font-black text-white uppercase tracking-tight">Bottom CTA Card</h2>
          </div>
          <div className="space-y-6">
            <input 
              placeholder="CTA Heading"
              className="w-full px-6 py-4 bg-white/5 border border-white/10 text-white rounded-2xl outline-none font-bold" 
              value={content.cta.title}
              onChange={(e) => setContent({ ...content, cta: { ...content.cta, title: e.target.value }})}
            />
            <textarea 
              placeholder="CTA Description"
              className="w-full px-6 py-4 bg-white/5 border border-white/10 text-white rounded-[2rem] outline-none resize-none font-light" 
              value={content.cta.description}
              onChange={(e) => setContent({ ...content, cta: { ...content.cta, description: e.target.value }})}
            />
            <input 
              placeholder="Button Text"
              className="w-full px-6 py-4 bg-white/5 border border-white/10 text-white rounded-2xl outline-none font-black uppercase tracking-widest text-xs" 
              value={content.cta.buttonText}
              onChange={(e) => setContent({ ...content, cta: { ...content.cta, buttonText: e.target.value }})}
            />
          </div>
        </section>
      </div>
    </div>
  );
}
