"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  LuPlus, LuPencil, LuTrash2, LuCheck, LuX, 
  LuAward, LuList, LuSave, LuRefreshCw,
  LuLayoutDashboard, LuShieldCheck, LuChevronRight
} from "react-icons/lu";
import api from "@/lib/api";
import toast from "react-hot-toast";

export default function CertificationsDashboard() {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [savingContent, setSavingContent] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingProgram, setEditingProgram] = useState(null);
  const [pageContent, setPageContent] = useState({
    hero: { badge: "", title: "", subtitle: "", description: "" }
  });
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    features: [],
    badgeText: "Official Validation",
    order: 0,
    isActive: true
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [programsRes, contentRes] = await Promise.all([
        api.get("/cms/services/certifications"),
        api.get("/cms/services/content/certifications")
      ]);
      setPrograms(programsRes.data.data);
      if (contentRes.data.data) {
        setPageContent(contentRes.data.data);
      }
    } catch (err) {
      toast.error("Failed to load certifications data");
    } finally {
      setLoading(false);
    }
  };

  const handleSavePageContent = async () => {
    setSavingContent(true);
    try {
      await api.put("/cms/services/content/certifications", pageContent);
      toast.success("Hero content updated");
    } catch (err) {
      toast.error("Failed to update hero content");
    } finally {
      setSavingContent(false);
    }
  };

  const handleOpenModal = (program = null) => {
    if (program) {
      setEditingProgram(program);
      setFormData({ ...program });
    } else {
      setEditingProgram(null);
      setFormData({
        title: "",
        description: "",
        features: [],
        badgeText: "Official Validation",
        order: programs.length,
        isActive: true
      });
    }
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingProgram) {
        await api.put(`/cms/services/certifications/${editingProgram._id}`, formData);
        toast.success("Certificate updated");
      } else {
        await api.post("/cms/services/certifications", formData);
        toast.success("New certificate added");
      }
      setShowModal(false);
      const res = await api.get("/cms/services/certifications");
      setPrograms(res.data.data);
    } catch (err) {
      toast.error("Operation failed");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this certification?")) return;
    try {
      await api.delete(`/cms/services/certifications/${id}`);
      toast.success("Certification removed");
      const res = await api.get("/cms/services/certifications");
      setPrograms(res.data.data);
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  const addFeature = () => {
    setFormData({ ...formData, features: [...formData.features, ""] });
  };

  const updateFeature = (index, value) => {
    const newFeatures = [...formData.features];
    newFeatures[index] = value;
    setFormData({ ...formData, features: newFeatures });
  };

  const removeFeature = (index) => {
    const newFeatures = formData.features.filter((_, i) => i !== index);
    setFormData({ ...formData, features: newFeatures });
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="flex flex-col items-center gap-4">
        <LuRefreshCw className="w-10 h-10 text-indigo-600 animate-spin" />
        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">Validating Credentials...</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50/50 pb-20">
      {/* STICKY HEADER */}
      <div className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-8 py-6 flex justify-between items-center">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></div>
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Sync_Protocol_v4.2</span>
            </div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tighter uppercase">Certifications <span className="text-blue-600">CMS</span></h1>
          </div>
          <button 
            onClick={() => handleOpenModal()}
            className="group px-6 py-3 bg-slate-900 text-white rounded-xl font-black flex items-center gap-2 hover:bg-black transition-all shadow-xl shadow-slate-900/20 uppercase tracking-widest text-[10px]"
          >
            <LuPlus className="group-hover:rotate-90 transition-transform text-blue-400" />
            Issue Credentials
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT: HERO CONFIG */}
          <div className="lg:col-span-4 space-y-8">
            <section className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden box-border">
              <div className="px-4 py-4 border-b border-slate-50 flex items-center gap-4 bg-slate-50/30">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100"><LuLayoutDashboard size={18} /></div>
                <div>
                  <h2 className="text-sm font-black text-slate-900 uppercase tracking-tight">Landing Profile</h2>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">Hero Messaging Protocol</p>
                </div>
              </div>
              
              <div className="p-4 space-y-6">
                <div>
                  <label className="block text-[10px] font-black uppercase text-slate-400 mb-2 ml-1">Identity Badge</label>
                  <input className="w-full px-4 py-3 bg-slate-50 border-2 border-transparent focus:border-blue-500/20 focus:bg-white rounded-xl outline-none font-bold text-xs" value={pageContent.hero.badge} onChange={(e) => setPageContent({...pageContent, hero: {...pageContent.hero, badge: e.target.value}})} />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase text-slate-400 mb-2 ml-1">Hero Title</label>
                  <input className="w-full px-4 py-3 bg-slate-50 border-2 border-transparent focus:border-blue-500/20 focus:bg-white rounded-xl outline-none font-black text-sm" value={pageContent.hero.title} onChange={(e) => setPageContent({...pageContent, hero: {...pageContent.hero, title: e.target.value}})} />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase text-slate-400 mb-2 ml-1">Subtitle Manifest</label>
                  <input className="w-full px-4 py-3 bg-slate-50 border-2 border-transparent focus:border-blue-500/20 focus:bg-white rounded-xl outline-none font-bold text-[10px] text-blue-600 uppercase tracking-widest" value={pageContent.hero.subtitle} onChange={(e) => setPageContent({...pageContent, hero: {...pageContent.hero, subtitle: e.target.value}})} />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase text-slate-400 mb-2 ml-1">Narrative Deck</label>
                  <textarea rows="4" className="w-full px-4 py-3 bg-slate-50 border-2 border-transparent focus:border-blue-500/20 focus:bg-white rounded-2xl outline-none text-xs leading-relaxed font-medium text-slate-500 italic resize-none" value={pageContent.hero.description} onChange={(e) => setPageContent({...pageContent, hero: {...pageContent.hero, description: e.target.value}})} />
                </div>
                
                <button 
                  onClick={handleSavePageContent}
                  disabled={savingContent}
                  className="w-full py-4 bg-blue-600 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-3 hover:bg-blue-700 transition-all shadow-xl shadow-blue-600/10"
                >
                  {savingContent ? <LuRefreshCw className="animate-spin" /> : <LuSave />}
                  Update Messaging
                </button>
              </div>
            </section>
          </div>

          {/* RIGHT: CERTIFICATES LISTING */}
          <div className="lg:col-span-8">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-8 h-[1px] bg-slate-200"></div>
              <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] leading-none">Official_Validation_Registry</h2>
            </div>
            
            <AnimatePresence mode="popLayout">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {programs.map((prog, i) => (
                  <motion.div 
                    key={prog._id} 
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="bg-white rounded-[2rem] border border-slate-100 shadow-sm relative group hover:shadow-2xl transition-all"
                  >
                    <div className="p-5">
                      <div className="flex justify-between items-start mb-6">
                        <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100 shadow-sm transition-transform duration-500">
                          <LuAward size={20} />
                        </div>
                        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity translate-x-4 group-hover:translate-x-0 duration-300">
                          <button onClick={() => handleOpenModal(prog)} className="p-2.5 bg-slate-50 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all"><LuPencil size={18} /></button>
                          <button onClick={() => handleDelete(prog._id)} className="p-2.5 bg-slate-50 text-slate-300 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all"><LuTrash2 size={18} /></button>
                        </div>
                      </div>

                      <h3 className="text-xl font-black text-slate-900 tracking-tight truncate mb-2">{prog.title}</h3>
                      <p className="text-slate-500 text-[11px] line-clamp-2 mb-6 leading-relaxed font-medium italic">{prog.description}</p>

                      <div className="space-y-3 mb-8">
                        {prog.features.slice(0, 3).map((f, idx) => (
                          <div key={idx} className="flex gap-3 items-center group/item">
                            <div className="w-1.5 h-1.5 bg-blue-600 rounded-full group-hover/item:scale-150 transition-transform" />
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest truncate group-hover/item:text-slate-700 transition-colors">{f}</span>
                          </div>
                        ))}
                      </div>

                      <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                        <div className="flex items-center gap-2">
                          <LuShieldCheck className="text-blue-600 animate-pulse" size={14} />
                          <span className="text-[10px] font-black uppercase text-blue-600 bg-blue-50 px-3 py-1 rounded-lg tracking-widest shadow-sm shadow-blue-600/5">
                            {prog.badgeText}
                          </span>
                        </div>
                        <div className="text-[10px] font-black text-slate-300 uppercase italic opacity-40">ORD_0{prog.order}</div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </AnimatePresence>

            {programs.length === 0 && (
              <div 
                onClick={() => handleOpenModal()}
                className="py-20 border-2 border-dashed border-slate-200 rounded-[4rem] flex flex-col items-center justify-center gap-4 hover:border-blue-300 group cursor-pointer transition-all bg-white"
              >
                <div className="w-16 h-16 rounded-full bg-slate-50 text-slate-300 flex items-center justify-center group-hover:bg-blue-50 group-hover:text-blue-500 transition-all">
                  <LuPlus size={32} />
                </div>
                <p className="text-[10px] font-black tracking-[0.3em] text-slate-400 uppercase group-hover:text-blue-600">Register First Certification</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }} 
            animate={{ opacity: 1, scale: 1, y: 0 }} 
            className="bg-white w-full max-w-2xl rounded-[4rem] shadow-2xl relative my-auto"
          >
            {/* MODAL HEADER */}
            <div className="px-10 py-8 border-b border-slate-50 flex items-center justify-between bg-slate-50/30 rounded-t-[4rem]">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100 italic font-serif shadow-sm">C</div>
                <div>
                  <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">{editingProgram ? "Refine Credential" : "Authorize Credential"}</h3>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">Program Metadata Control</p>
                </div>
              </div>
              <button onClick={() => setShowModal(false)} className="p-3 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-full transition-all duration-300"><LuX size={18} /></button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-10 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="md:col-span-2">
                  <label className="block text-[10px] font-black uppercase text-slate-400 mb-3 ml-1 tracking-widest">Formal program Title</label>
                  <input required className="w-full px-6 py-4 bg-slate-50 border-2 border-transparent focus:border-blue-500/20 focus:bg-white rounded-2xl transition-all outline-none font-black text-lg text-slate-900 shadow-inner" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-[10px] font-black uppercase text-slate-400 mb-3 ml-1 tracking-widest">Technical abstract (Description)</label>
                  <textarea rows="3" required className="w-full px-6 py-4 bg-slate-50 border-2 border-transparent focus:border-blue-500/20 focus:bg-white rounded-[2rem] transition-all outline-none resize-none text-sm font-medium leading-relaxed italic text-slate-500" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} />
                </div>

                <div className="space-y-2">
                  <label className="block text-[10px] font-black uppercase text-slate-400 mb-3 ml-1 tracking-widest">Validation Badge Label</label>
                  <div className="relative group">
                    <LuShieldCheck className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-500 transition-colors" />
                    <input className="w-full pl-14 pr-6 py-4 bg-slate-50 border-2 border-transparent focus:border-blue-500/20 focus:bg-white rounded-2xl transition-all outline-none font-black text-[10px] text-slate-700 uppercase tracking-widest shadow-sm" value={formData.badgeText} onChange={(e) => setFormData({...formData, badgeText: e.target.value})} />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="block text-[10px] font-black uppercase text-slate-400 mb-3 ml-1 tracking-widest">Platform Sync Order</label>
                  <div className="relative group">
                    <LuLayoutDashboard className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-500 transition-colors" />
                    <input type="number" className="w-full pl-14 pr-6 py-4 bg-slate-50 border-2 border-transparent focus:border-blue-500/20 focus:bg-white rounded-2xl transition-all outline-none font-black text-sm text-slate-700 shadow-sm" value={formData.order} onChange={(e) => setFormData({...formData, order: parseInt(e.target.value)})} />
                  </div>
                </div>

                <div className="md:col-span-2 p-8 bg-slate-50/50 rounded-[3rem] border border-slate-100 space-y-6">
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-3">
                      <LuList className="text-blue-600" size={16} />
                      <h4 className="text-[10px] font-black text-slate-900 uppercase tracking-[0.3em]">Validation_Parameters</h4>
                    </div>
                    <button type="button" onClick={addFeature} className="px-4 py-2 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-600 hover:text-white transition-all font-black text-[10px] uppercase tracking-widest shadow-sm flex items-center gap-2 group/btn">
                      <LuPlus className="group-hover/btn:rotate-90 transition-transform" />
                      Add param
                    </button>
                  </div>
                  
                  <div className="space-y-3">
                    <AnimatePresence mode="popLayout">
                      {formData.features.map((f, i) => (
                        <motion.div 
                          key={i}
                          layout
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                          className="flex gap-4 group/param items-center"
                        >
                          <div className="w-2 h-2 rounded-full bg-blue-200 group-focus-within/param:bg-blue-600 transition-colors shrink-0" />
                          <input className="flex-1 px-5 py-3 bg-white border border-slate-200 focus:border-blue-400 rounded-xl outline-none text-[10px] font-bold uppercase tracking-widest transition-all shadow-sm" placeholder="e.g. ISO_VALID_AUTHORITY" value={f} onChange={(e) => updateFeature(i, e.target.value)} />
                          <button type="button" onClick={() => removeFeature(i)} className="p-2.5 text-slate-200 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all opacity-0 group-hover/param:opacity-100"><LuTrash2 size={16} /></button>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                </div>
              </div>

              {/* ACTION BUTTONS */}
              <div className="flex items-center gap-4 pt-8">
                 <button 
                  type="button" 
                  onClick={() => setShowModal(false)} 
                  className="flex-1 py-5 bg-slate-50 text-slate-400 font-black uppercase tracking-[0.3em] text-[10px] hover:text-slate-600 rounded-2xl transition-all"
                >
                  Terminate_Op
                </button>
                 <button 
                  type="submit" 
                  className="flex-[2] py-5 bg-slate-900 text-white font-black rounded-[2rem] shadow-2xl hover:bg-black group transition-all flex items-center justify-center gap-3 text-xs tracking-widest"
                >
                  <LuCheck size={20} className="text-emerald-400 group-hover:scale-125 transition-transform" />
                  {editingProgram ? "RECORDS_UPDATE_SYNC" : "AUTHORIZE_VALIDATION"}
                 </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
