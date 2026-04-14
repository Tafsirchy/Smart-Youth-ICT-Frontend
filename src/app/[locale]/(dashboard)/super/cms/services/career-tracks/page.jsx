"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  LuPlus, LuPencil, LuTrash2, LuCheck, LuX, 
  LuTimer, LuBriefcase, LuLayoutDashboard, LuPalette, LuSave, LuRefreshCw 
} from "react-icons/lu";
import api from "@/lib/api";
import toast from "react-hot-toast";

export default function CareerTracksDashboard() {
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [savingContent, setSavingContent] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingTrack, setEditingTrack] = useState(null);
  const [pageContent, setPageContent] = useState({
    hero: { badge: "", title: "", subtitle: "", description: "" }
  });
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    phase1: "",
    phase2: "",
    phase3: "",
    phase4: "",
    duration: "6 Months",
    outcome: "",
    color: "from-blue-500 to-cyan-400",
    bg: "bg-blue-500",
    order: 0,
    isActive: true
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [tracksRes, contentRes] = await Promise.all([
        api.get("/cms/services/career-tracks"),
        api.get("/cms/services/content/career-tracks")
      ]);
      setTracks(tracksRes.data.data);
      if (contentRes.data.data) {
        setPageContent(contentRes.data.data);
      }
    } catch (err) {
      toast.error("Failed to load tracks data");
    } finally {
      setLoading(false);
    }
  };

  const handleSavePageContent = async () => {
    setSavingContent(true);
    try {
      await api.put("/cms/services/content/career-tracks", pageContent);
      toast.success("Hero content updated");
    } catch (err) {
      toast.error("Failed to update hero content");
    } finally {
      setSavingContent(false);
    }
  };

  const handleOpenModal = (track = null) => {
    if (track) {
      setEditingTrack(track);
      setFormData({ ...track });
    } else {
      setEditingTrack(null);
      setFormData({
        title: "",
        description: "",
        phase1: "",
        phase2: "",
        phase3: "",
        phase4: "",
        duration: "6 Months",
        outcome: "",
        color: "from-blue-500 to-cyan-400",
        bg: "bg-blue-500",
        order: tracks.length,
        isActive: true
      });
    }
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingTrack) {
        await api.put(`/cms/services/career-tracks/${editingTrack._id}`, formData);
        toast.success("Track updated");
      } else {
        await api.post("/cms/services/career-tracks", formData);
        toast.success("New track created");
      }
      setShowModal(false);
      const res = await api.get("/cms/services/career-tracks");
      setTracks(res.data.data);
    } catch (err) {
      toast.error("Operation failed");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this career track?")) return;
    try {
      await api.delete(`/cms/services/career-tracks/${id}`);
      toast.success("Track removed");
      const res = await api.get("/cms/services/career-tracks");
      setTracks(res.data.data);
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  if (loading) return <div className="p-10 text-center animate-pulse text-slate-400 font-black uppercase tracking-widest">Syncing Career Protocols...</div>;

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-12">
        <div>
          <h1 className="text-3xl font-black text-slate-900 mb-2">Career Tracks CMS</h1>
          <p className="text-slate-500">Manage the global Hero messaging and individual track roadmaps.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left: Hero Content Manager */}
        <div className="lg:col-span-4 space-y-8">
           <section className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center"><LuLayoutDashboard /></div>
                <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight">Main Hero</h2>
              </div>
              <div className="space-y-6">
                <div>
                  <label className="block text-[10px] font-black uppercase text-slate-400 mb-2">Badge</label>
                  <input className="w-full px-4 py-2 bg-slate-50 border border-transparent focus:border-indigo-500/20 rounded-xl outline-none font-bold text-sm" value={pageContent.hero.badge} onChange={(e) => setPageContent({...pageContent, hero: {...pageContent.hero, badge: e.target.value}})} />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase text-slate-400 mb-2">Title</label>
                  <input className="w-full px-4 py-2 bg-slate-50 border border-transparent focus:border-indigo-500/20 rounded-xl outline-none font-bold text-sm" value={pageContent.hero.title} onChange={(e) => setPageContent({...pageContent, hero: {...pageContent.hero, title: e.target.value}})} />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase text-slate-400 mb-2">Subtitle (Gradient)</label>
                  <input className="w-full px-4 py-2 bg-slate-50 border border-transparent focus:border-indigo-500/20 rounded-xl outline-none font-bold text-sm" value={pageContent.hero.subtitle} onChange={(e) => setPageContent({...pageContent, hero: {...pageContent.hero, subtitle: e.target.value}})} />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase text-slate-400 mb-2">Description</label>
                  <textarea rows="3" className="w-full px-4 py-2 bg-slate-50 border border-transparent focus:border-indigo-500/20 rounded-xl outline-none text-xs resize-none" value={pageContent.hero.description} onChange={(e) => setPageContent({...pageContent, hero: {...pageContent.hero, description: e.target.value}})} />
                </div>
                <button 
                  onClick={handleSavePageContent}
                  disabled={savingContent}
                  className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-2 hover:bg-black transition-all"
                >
                  {savingContent ? <LuRefreshCw className="animate-spin" /> : <LuSave />}
                  Update Messaging
                </button>
              </div>
           </section>
        </div>

        {/* Right: Tracks List */}
        <div className="lg:col-span-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tighter">Active Tracks</h2>
            <button 
              onClick={() => handleOpenModal()}
              className="bg-indigo-600 text-white px-5 py-2 rounded-xl font-bold flex items-center gap-2 hover:bg-indigo-700 transition-all text-sm"
            >
              <LuPlus className="w-4 h-4" /> Add Track
            </button>
          </div>
        <AnimatePresence mode="popLayout">
          {tracks.map((track, i) => (
            <motion.div 
              key={track._id} 
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm relative overflow-hidden group"
            >
               <div className={`absolute top-0 left-0 w-full h-2 bg-gradient-to-r ${track.color}`}></div>
               <div className="flex justify-between items-start mb-6">
                 <div>
                   <h3 className="text-2xl font-black text-slate-900">{track.title}</h3>
                   <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-1">{track.duration} • {track.outcome}</p>
                 </div>
                 <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => handleOpenModal(track)} className="p-2 bg-slate-50 text-slate-400 hover:text-indigo-600 rounded-lg transition-colors"><LuPencil size={18} /></button>
                    <button onClick={() => handleDelete(track._id)} className="p-2 bg-slate-50 text-slate-300 hover:text-rose-600 rounded-lg transition-colors"><LuTrash2 size={18} /></button>
                 </div>
               </div>

               <div className="space-y-3 mb-8">
                  {[track.phase1, track.phase2, track.phase3, track.phase4].map((ph, idx) => (
                    <div key={idx} className="flex gap-3 items-center text-sm text-slate-600">
                      <div className={`w-6 h-6 rounded-full ${track.bg} text-white text-[10px] font-black flex items-center justify-center shrink-0`}>{idx+1}</div>
                      <span className="truncate">{ph}</span>
                    </div>
                  ))}
               </div>

               <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${track.isActive ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-50 text-slate-400'}`}>
                    {track.isActive ? 'Active Plan' : 'Draft Mode'}
                  </span>
                  <span className="text-[10px] font-bold text-slate-300 uppercase">Order: {track.order}</span>
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
            <h3 className="text-2xl font-black text-slate-900 mb-8">{editingTrack ? "Edit Career Track" : "New Career Track"}</h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-[10px] font-black uppercase text-slate-400 mb-2">Track Title</label>
                  <input required className="w-full px-5 py-3 bg-slate-50 border-2 border-transparent focus:border-indigo-500/20 focus:bg-white rounded-xl transition-all outline-none font-bold" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-[10px] font-black uppercase text-slate-400 mb-2">Marketing Pitch</label>
                  <textarea rows="2" required className="w-full px-5 py-3 bg-slate-50 border-2 border-transparent focus:border-indigo-500/20 focus:bg-white rounded-xl transition-all outline-none resize-none text-sm" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} />
                </div>

                <div>
                  <label className="block text-[10px] font-black uppercase text-slate-400 mb-2">Duration</label>
                  <div className="relative">
                    <LuTimer className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
                    <input className="w-full pl-11 pr-4 py-3 bg-slate-50 border-2 border-transparent focus:border-indigo-500/20 focus:bg-white rounded-xl transition-all outline-none font-bold" value={formData.duration} onChange={(e) => setFormData({...formData, duration: e.target.value})} />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase text-slate-400 mb-2">Final Outcome</label>
                  <div className="relative">
                    <LuBriefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
                    <input className="w-full pl-11 pr-4 py-3 bg-slate-50 border-2 border-transparent focus:border-indigo-500/20 focus:bg-white rounded-xl transition-all outline-none font-bold" value={formData.outcome} onChange={(e) => setFormData({...formData, outcome: e.target.value})} />
                  </div>
                </div>

                <div className="md:col-span-2 p-6 bg-slate-50 rounded-[2rem] space-y-4">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Curriculum Phases</p>
                  <input placeholder="Phase 1: Foundations" className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl outline-none text-sm font-medium" value={formData.phase1} onChange={(e) => setFormData({...formData, phase1: e.target.value})} />
                  <input placeholder="Phase 2: Modern Tech" className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl outline-none text-sm font-medium" value={formData.phase2} onChange={(e) => setFormData({...formData, phase2: e.target.value})} />
                  <input placeholder="Phase 3: Deep Stack" className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl outline-none text-sm font-medium" value={formData.phase3} onChange={(e) => setFormData({...formData, phase3: e.target.value})} />
                  <input placeholder="Phase 4: Capstone" className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl outline-none text-sm font-medium" value={formData.phase4} onChange={(e) => setFormData({...formData, phase4: e.target.value})} />
                </div>

                <div>
                   <label className="block text-[10px] font-black uppercase text-slate-400 mb-2">Gradient Style (Tailwind)</label>
                   <div className="relative">
                     <LuPalette className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
                     <input className="w-full pl-11 pr-4 py-3 bg-slate-50 border-2 border-transparent focus:border-indigo-500/20 focus:bg-white rounded-xl outline-none text-xs font-mono" value={formData.color} onChange={(e) => setFormData({...formData, color: e.target.value})} />
                   </div>
                </div>
                <div>
                   <label className="block text-[10px] font-black uppercase text-slate-400 mb-2">Sorting Order</label>
                   <div className="relative">
                     <LuLayoutDashboard className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
                     <input type="number" className="w-full pl-11 pr-4 py-3 bg-slate-50 border-2 border-transparent focus:border-indigo-500/20 focus:bg-white rounded-xl outline-none font-bold" value={formData.order} onChange={(e) => setFormData({...formData, order: parseInt(e.target.value)})} />
                   </div>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-6 border-t border-slate-50">
                 <button type="button" onClick={() => setShowModal(false)} className="flex-1 py-4 font-black text-slate-400 hover:text-slate-600 uppercase tracking-widest text-[10px] transition-colors">Cancel</button>
                 <button type="submit" className="flex-[2] py-4 bg-slate-900 text-white font-black rounded-[2rem] shadow-2xl hover:bg-black transition-all flex items-center justify-center gap-2 text-sm">
                    <LuCheck size={20} />
                    {editingTrack ? "Update Framework" : "Deploy Track"}
                 </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
