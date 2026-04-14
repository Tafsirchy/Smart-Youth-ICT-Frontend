"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  LuPlus, LuPencil, LuTrash2, LuCheck, LuX, 
  LuTimer, LuBriefcase, LuLayoutDashboard, LuPalette, LuSave, LuRefreshCw,
  LuChevronRight, LuTarget, LuSettings
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

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="flex flex-col items-center gap-4">
        <LuRefreshCw className="w-10 h-10 text-blue-600 animate-spin" />
        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">Syncing Career Protocols...</p>
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
            <h1 className="text-2xl font-black text-slate-900 tracking-tighter uppercase">Career Tracks <span className="text-blue-600">CMS</span></h1>
          </div>
          <button 
            onClick={() => handleOpenModal()}
            className="group px-6 py-3 bg-blue-600 text-white rounded-xl font-black flex items-center gap-2 hover:bg-blue-700 transition-all shadow-xl shadow-blue-600/20 uppercase tracking-widest text-[10px]"
          >
            <LuPlus className="group-hover:rotate-90 transition-transform" />
            New Framework
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* LEFT: HERO CONFIG */}
          <div className="lg:col-span-4 space-y-4">
            <section className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden box-border">
              <div className="px-4 py-3 border-b border-slate-50 flex items-center gap-4 bg-slate-50/30">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100"><LuLayoutDashboard size={18} /></div>
                <div>
                  <h2 className="text-sm font-black text-slate-900 uppercase tracking-tight">Messaging Protocol</h2>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">Landing Hero Control</p>
                </div>
              </div>
              
              <div className="p-4 space-y-6">
                <div>
                  <label className="block text-[10px] font-black uppercase text-slate-400 mb-2 ml-1">Identity Badge</label>
                  <input className="w-full px-4 py-3 bg-slate-50 border-2 border-transparent focus:border-blue-500/20 focus:bg-white rounded-xl outline-none font-bold text-xs" value={pageContent.hero.badge} onChange={(e) => setPageContent({...pageContent, hero: {...pageContent.hero, badge: e.target.value}})} />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase text-slate-400 mb-2 ml-1">Main Headline</label>
                  <input className="w-full px-4 py-3 bg-slate-50 border-2 border-transparent focus:border-blue-500/20 focus:bg-white rounded-xl outline-none font-black text-sm" value={pageContent.hero.title} onChange={(e) => setPageContent({...pageContent, hero: {...pageContent.hero, title: e.target.value}})} />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase text-slate-400 mb-2 ml-1">Subtitle Manifest</label>
                  <input className="w-full px-4 py-3 bg-slate-50 border-2 border-transparent focus:border-blue-500/20 focus:bg-white rounded-xl outline-none font-bold text-[10px] text-blue-600 uppercase tracking-widest" value={pageContent.hero.subtitle} onChange={(e) => setPageContent({...pageContent, hero: {...pageContent.hero, subtitle: e.target.value}})} />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase text-slate-400 mb-2 ml-1">Narrative Description</label>
                  <textarea 
                    rows="4" 
                    className="w-full max-w-2xl px-5 py-4 bg-slate-50/50 border border-slate-100 focus:border-blue-500/20 focus:bg-white rounded-2xl outline-none text-xs leading-relaxed font-medium text-slate-500 italic resize-none shadow-inner transition-all" 
                    value={pageContent.hero.description} 
                    onChange={(e) => setPageContent({...pageContent, hero: {...pageContent.hero, description: e.target.value}})} 
                  />
                </div>
                
                <button 
                  onClick={handleSavePageContent}
                  disabled={savingContent}
                  className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-3 hover:bg-black transition-all shadow-xl shadow-slate-900/10"
                >
                  {savingContent ? <LuRefreshCw className="animate-spin text-blue-400" /> : <LuCheck className="text-emerald-400" />}
                  Deploy Messaging
                </button>
              </div>
            </section>
          </div>

          {/* RIGHT: TRACKS LISTING */}
          <div className="lg:col-span-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-[1px] bg-slate-200"></div>
              <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] leading-none">Authorized_Track_Modules</h2>
            </div>
            
            <AnimatePresence mode="popLayout">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {tracks.map((track, i) => (
                  <motion.div 
                    key={track._id} 
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="bg-white rounded-[2rem] border border-slate-100 shadow-sm relative overflow-hidden group hover:shadow-2xl transition-all"
                  >
                    <div className={`absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r ${track.color}`}></div>
                    
                    <div className="p-5">
                      <div className="flex justify-between items-start mb-6">
                        <div className="flex-1 min-w-0">
                          <h3 className="text-xl font-black text-slate-900 tracking-tight truncate">{track.title}</h3>
                          <div className="flex items-center gap-3 mt-1.5">
                            <span className="text-[10px] font-black text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md uppercase tracking-widest">{track.duration}</span>
                            <div className="w-1 h-1 rounded-full bg-slate-200"></div>
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest truncate">{track.outcome}</span>
                          </div>
                        </div>
                        <div className="flex gap-1 ml-4 opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0 duration-300">
                          <button onClick={() => handleOpenModal(track)} className="p-2.5 bg-slate-50 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all"><LuPencil size={16} /></button>
                          <button onClick={() => handleDelete(track._id)} className="p-2.5 bg-slate-50 text-slate-300 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all"><LuTrash2 size={16} /></button>
                        </div>
                      </div>

                      <div className="space-y-4 mb-8">
                        {[track.phase1, track.phase2, track.phase3, track.phase4].map((ph, idx) => (
                          <div key={idx} className="flex gap-4 items-center group/item transition-all">
                            <div className={`w-8 h-8 rounded-xl ${track.bg} text-white text-[10px] font-black flex items-center justify-center shrink-0 shadow-lg shadow-blue-600/10 group-hover/item:scale-110 transition-transform`}>{idx + 1}</div>
                            <span className="text-xs font-medium text-slate-500 truncate group-hover/item:text-slate-900 transition-colors">{ph || "Unassigned Module"}</span>
                          </div>
                        ))}
                      </div>

                      <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                        <div className="flex items-center gap-2">
                          <div className={`w-1.5 h-1.5 rounded-full ${track.isActive ? 'bg-emerald-500 animate-pulse' : 'bg-slate-300'}`}></div>
                          <span className={`text-[10px] font-black uppercase tracking-[0.2em] ${track.isActive ? 'text-emerald-600' : 'text-slate-400'}`}>
                            {track.isActive ? 'Active_Live' : 'Draft_Mode'}
                          </span>
                        </div>
                        <div className="text-[10px] font-black text-slate-300 uppercase italic opacity-40">ORD_0{track.order}</div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </AnimatePresence>

            {tracks.length === 0 && (
              <div 
                onClick={() => handleOpenModal()}
                className="py-20 border-2 border-dashed border-slate-200 rounded-[4rem] flex flex-col items-center justify-center gap-4 hover:border-blue-300 group cursor-pointer transition-all bg-white"
              >
                <div className="w-16 h-16 rounded-full bg-slate-50 text-slate-300 flex items-center justify-center group-hover:bg-blue-50 group-hover:text-blue-500 transition-all">
                  <LuPlus size={32} />
                </div>
                <p className="text-[10px] font-black tracking-[0.3em] text-slate-400 uppercase group-hover:text-blue-600">Initialize First Track</p>
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
                <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center border border-indigo-100 italic font-serif">T</div>
                <div>
                  <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">{editingTrack ? "Refine Blueprint" : "Architect Track"}</h3>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">Track Data Configuration</p>
                </div>
              </div>
              <button onClick={() => setShowModal(false)} className="p-3 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-full transition-all duration-300"><LuX size={18} /></button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-10 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="md:col-span-2">
                  <label className="block text-[10px] font-black uppercase text-slate-400 mb-3 ml-1 tracking-widest">Strategic Title</label>
                  <input required className="w-full px-6 py-4 bg-slate-50 border-2 border-transparent focus:border-indigo-500/20 focus:bg-white rounded-2xl transition-all outline-none font-black text-lg text-slate-900" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-[10px] font-black uppercase text-slate-400 mb-3 ml-1 tracking-widest">Industrial Narrative (Pitch)</label>
                  <textarea 
                    rows="3" 
                    required 
                    className="w-full max-w-2xl px-6 py-4 bg-slate-50/50 border border-slate-100 focus:border-indigo-500/20 focus:bg-white rounded-[2rem] transition-all outline-none resize-none text-sm font-medium leading-relaxed italic text-slate-500 shadow-inner" 
                    value={formData.description} 
                    onChange={(e) => setFormData({...formData, description: e.target.value})} 
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-[10px] font-black uppercase text-slate-400 mb-3 ml-1 tracking-widest">Time Constraint</label>
                  <div className="relative group">
                    <LuTimer className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-500 transition-colors" />
                    <input className="w-full pl-14 pr-6 py-4 bg-slate-50 border-2 border-transparent focus:border-blue-500/20 focus:bg-white rounded-2xl transition-all outline-none font-black text-xs text-slate-700 uppercase tracking-widest" value={formData.duration} onChange={(e) => setFormData({...formData, duration: e.target.value})} />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="block text-[10px] font-black uppercase text-slate-400 mb-3 ml-1 tracking-widest">Terminal Objective</label>
                  <div className="relative group">
                    <LuBriefcase className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-emerald-500 transition-colors" />
                    <input className="w-full pl-14 pr-6 py-4 bg-slate-50 border-2 border-transparent focus:border-emerald-500/20 focus:bg-white rounded-2xl transition-all outline-none font-bold text-xs" value={formData.outcome} onChange={(e) => setFormData({...formData, outcome: e.target.value})} />
                  </div>
                </div>

                <div className="md:col-span-2 p-8 bg-slate-50/50 rounded-[3rem] border border-slate-100 space-y-6">
                  <div className="flex items-center gap-3 mb-2">
                    <LuTarget className="text-indigo-600" size={16} />
                    <h4 className="text-[10px] font-black text-slate-900 uppercase tracking-[0.3em]">Curriculum_Sequence</h4>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input placeholder="Phase 1: Entry" className="w-full px-5 py-3 bg-white border border-slate-200 focus:border-indigo-400 rounded-xl outline-none text-[10px] font-bold uppercase tracking-widest transition-all" value={formData.phase1} onChange={(e) => setFormData({...formData, phase1: e.target.value})} />
                    <input placeholder="Phase 2: Scale" className="w-full px-5 py-3 bg-white border border-slate-200 focus:border-indigo-400 rounded-xl outline-none text-[10px] font-bold uppercase tracking-widest transition-all" value={formData.phase2} onChange={(e) => setFormData({...formData, phase2: e.target.value})} />
                    <input placeholder="Phase 3: Deep" className="w-full px-5 py-3 bg-white border border-slate-200 focus:border-indigo-400 rounded-xl outline-none text-[10px] font-bold uppercase tracking-widest transition-all" value={formData.phase3} onChange={(e) => setFormData({...formData, phase3: e.target.value})} />
                    <input placeholder="Phase 4: Launch" className="w-full px-5 py-3 bg-white border border-slate-200 focus:border-indigo-400 rounded-xl outline-none text-[10px] font-bold uppercase tracking-widest transition-all" value={formData.phase4} onChange={(e) => setFormData({...formData, phase4: e.target.value})} />
                  </div>
                </div>

                <div className="space-y-2">
                   <label className="block text-[10px] font-black uppercase text-slate-400 mb-3 ml-1 tracking-widest">Visual Ident (TW)</label>
                   <div className="relative group">
                     <div className={`absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full shadow-inner bg-gradient-to-r ${formData.color}`}></div>
                     <input className="w-full pl-14 pr-6 py-3 bg-slate-50 border-2 border-transparent focus:border-indigo-500/20 focus:bg-white rounded-xl outline-none text-[10px] font-mono font-bold tracking-tighter" value={formData.color} onChange={(e) => setFormData({...formData, color: e.target.value})} />
                   </div>
                </div>
                <div className="space-y-2">
                   <label className="block text-[10px] font-black uppercase text-slate-400 mb-3 ml-1 tracking-widest">Platform Sync order</label>
                   <div className="relative group">
                     <LuSettings className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-500 transition-colors" />
                     <input type="number" className="w-full pl-14 pr-6 py-3 bg-slate-50 border-2 border-transparent focus:border-indigo-500/20 focus:bg-white rounded-xl outline-none font-black text-sm" value={formData.order} onChange={(e) => setFormData({...formData, order: parseInt(e.target.value)})} />
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
                  {editingTrack ? "PROX_UPDATE_SYNC" : "INITIALIZE_DEPLOYMENT"}
                 </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
