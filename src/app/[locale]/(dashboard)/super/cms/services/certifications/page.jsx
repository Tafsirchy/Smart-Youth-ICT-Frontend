"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  LuPlus, LuPencil, LuTrash2, LuCheck, LuX, 
  LuAward, LuList, LuSave, LuRefreshCw 
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

  if (loading) return <div className="p-10 text-center animate-pulse text-slate-400 font-black uppercase tracking-widest">Validating Credentials...</div>;

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-12">
        <div>
          <h1 className="text-3xl font-black text-slate-900 mb-2">Certifications CMS</h1>
          <p className="text-slate-500">Manage specialized validation and certification programs.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
         {/* Left: Hero Manager */}
         <div className="lg:col-span-4 space-y-8">
            <section className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm text-slate-900">
               <div className="flex items-center gap-3 mb-8">
                 <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center"><LuAward /></div>
                 <h2 className="text-xl font-black uppercase tracking-tight">Main Hero</h2>
               </div>
               <div className="space-y-6">
                 <div>
                   <label className="block text-[10px] font-black uppercase text-slate-400 mb-2">Badge</label>
                   <input className="w-full px-4 py-2 bg-slate-50 border border-transparent focus:border-blue-500/20 rounded-xl outline-none font-bold text-sm" value={pageContent.hero.badge} onChange={(e) => setPageContent({...pageContent, hero: {...pageContent.hero, badge: e.target.value}})} />
                 </div>
                 <div>
                   <label className="block text-[10px] font-black uppercase text-slate-400 mb-2">Title</label>
                   <input className="w-full px-4 py-2 bg-slate-50 border border-transparent focus:border-blue-500/20 rounded-xl outline-none font-bold text-sm" value={pageContent.hero.title} onChange={(e) => setPageContent({...pageContent, hero: {...pageContent.hero, title: e.target.value}})} />
                 </div>
                 <div>
                   <label className="block text-[10px] font-black uppercase text-slate-400 mb-2">Subtitle (Gradient)</label>
                   <input className="w-full px-4 py-2 bg-slate-50 border border-transparent focus:border-blue-500/20 rounded-xl outline-none font-bold text-sm" value={pageContent.hero.subtitle} onChange={(e) => setPageContent({...pageContent, hero: {...pageContent.hero, subtitle: e.target.value}})} />
                 </div>
                 <div>
                   <label className="block text-[10px] font-black uppercase text-slate-400 mb-2">Description</label>
                   <textarea rows="3" className="w-full px-4 py-2 bg-slate-50 border border-transparent focus:border-blue-500/20 rounded-xl outline-none text-xs resize-none leading-relaxed" value={pageContent.hero.description} onChange={(e) => setPageContent({...pageContent, hero: {...pageContent.hero, description: e.target.value}})} />
                 </div>
                 <button 
                   onClick={handleSavePageContent}
                   disabled={savingContent}
                   className="w-full py-4 bg-blue-600 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-2 hover:bg-blue-700 transition-all shadow-lg"
                 >
                   {savingContent ? <LuRefreshCw className="animate-spin" /> : <LuSave />}
                   Update Records
                 </button>
               </div>
            </section>
         </div>

         {/* Right: Programs List */}
         <div className="lg:col-span-8">
            <div className="flex justify-between items-center mb-8">
               <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tighter italic">Authorized Programs</h2>
               <button 
                 onClick={() => handleOpenModal()}
                 className="bg-slate-900 text-white px-5 py-2 rounded-xl font-bold flex items-center gap-2 hover:bg-black transition-all text-sm"
               >
                 <LuPlus className="w-4 h-4" /> Add Program
               </button>
            </div>
        <AnimatePresence mode="popLayout">
          {programs.map((prog, i) => (
            <motion.div 
              key={prog._id} 
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm relative group hover:shadow-xl transition-all"
            >
               <div className="flex justify-between items-start mb-4">
                 <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100">
                    <LuAward size={24} />
                 </div>
                 <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => handleOpenModal(prog)} className="p-2 text-slate-400 hover:text-indigo-600 transition-colors"><LuPencil size={18} /></button>
                    <button onClick={() => handleDelete(prog._id)} className="p-2 text-slate-300 hover:text-rose-600 transition-colors"><LuTrash2 size={18} /></button>
                 </div>
               </div>

               <h3 className="text-xl font-bold text-slate-900 mb-2 truncate">{prog.title}</h3>
               <p className="text-slate-500 text-xs line-clamp-2 mb-4 leading-relaxed">{prog.description}</p>

               <div className="space-y-2 mb-6 h-20 overflow-hidden">
                  {prog.features.slice(0, 3).map((f, idx) => (
                    <div key={idx} className="flex gap-2 items-center text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                      <div className="w-1 h-1 bg-blue-400 rounded-full" /> {f}
                    </div>
                  ))}
               </div>

               <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                  <span className="text-[10px] font-black uppercase text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">
                    {prog.badgeText}
                  </span>
                  <span className="text-[10px] font-bold text-slate-300 uppercase">Order: {prog.order}</span>
               </div>
            </motion.div>
          ))}
          </AnimatePresence>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white w-full max-w-2xl rounded-[3rem] p-10 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button onClick={() => setShowModal(false)} className="absolute top-8 right-8 p-2 text-slate-400 hover:text-rose-600 rounded-full transition-all"><LuX size={20} /></button>
            <h3 className="text-2xl font-black text-slate-900 mb-8">{editingProgram ? "Edit Program" : "Add Program"}</h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-[10px] font-black uppercase text-slate-400 mb-2 tracking-widest">Program Title</label>
                  <input required className="w-full px-5 py-3 bg-slate-50 border-2 border-transparent focus:border-indigo-500/20 focus:bg-white rounded-xl transition-all outline-none font-bold" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-[10px] font-black uppercase text-slate-400 mb-2 tracking-widest">Description</label>
                  <textarea rows="2" required className="w-full px-5 py-3 bg-slate-50 border-2 border-transparent focus:border-indigo-500/20 focus:bg-white rounded-xl transition-all outline-none resize-none text-sm" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} />
                </div>

                <div>
                  <label className="block text-[10px] font-black uppercase text-slate-400 mb-2 tracking-widest">Badge Label</label>
                  <input className="w-full px-5 py-3 bg-slate-50 border-2 border-transparent focus:border-indigo-500/20 focus:bg-white rounded-xl transition-all outline-none font-bold text-xs" value={formData.badgeText} onChange={(e) => setFormData({...formData, badgeText: e.target.value})} />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase text-slate-400 mb-2 tracking-widest">Order Index</label>
                  <input type="number" className="w-full px-5 py-3 bg-slate-50 border-2 border-transparent focus:border-indigo-500/20 focus:bg-white rounded-xl transition-all outline-none font-bold" value={formData.order} onChange={(e) => setFormData({...formData, order: parseInt(e.target.value)})} />
                </div>

                <div className="md:col-span-2 space-y-4">
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-2">
                      <LuList /> Key Features / Benefits
                    </label>
                    <button type="button" onClick={addFeature} className="text-[10px] font-black text-indigo-600 hover:text-indigo-700 uppercase">
                      + Add Feature
                    </button>
                  </div>
                  {formData.features.map((f, i) => (
                    <div key={i} className="flex gap-2">
                      <input className="flex-1 px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none text-sm" placeholder="e.g. ISO Valid Authority" value={f} onChange={(e) => updateFeature(i, e.target.value)} />
                      <button type="button" onClick={() => removeFeature(i)} className="p-2 text-slate-300 hover:text-rose-600"><LuTrash2 size={16} /></button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2 pt-6 border-t border-slate-50">
                 <button type="button" onClick={() => setShowModal(false)} className="flex-1 py-4 font-black text-slate-400 hover:text-slate-600 uppercase tracking-widest text-[10px] transition-colors">Cancel</button>
                 <button type="submit" className="flex-[2] py-4 bg-slate-900 text-white font-black rounded-[2rem] shadow-2xl hover:bg-black transition-all flex items-center justify-center gap-2 text-sm uppercase tracking-widest leading-none">
                    <LuCheck size={20} />
                    {editingProgram ? "Update Records" : "Authorize Program"}
                 </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
