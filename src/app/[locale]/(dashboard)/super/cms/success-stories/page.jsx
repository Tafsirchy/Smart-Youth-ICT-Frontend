"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LuPlus, LuPencil, LuTrash2, LuBadgeCheck, LuImage, LuSearch, LuCheck, LuArrowRight, LuX } from "react-icons/lu";
import api from "@/lib/api";
import toast from "react-hot-toast";
import ImageUpload from "@/components/ui/ImageUpload";

export default function SuccessStoriesPage() {
  const [stories, setStories] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingStory, setEditingStory] = useState(null);
  const [formData, setFormData] = useState({
    studentName: "",
    studentAvatar: "",
    courseId: "",
    resultSummary: "",
    description: "",
    proofImage: "",
    company: "",
    location: "",
    storyType: "text", // 'text' or 'video'
    videoUrl: "",
    videoThumbnail: "",
    isPublished: true,
    order: 0
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [sRes, cRes] = await Promise.all([
        api.get("/cms/stories/admin"),
        api.get("/courses")
      ]);
      setStories(sRes.data.data);
      setCourses(cRes.data.data);
    } catch (err) {
      toast.error("Data loading failed");
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (story = null) => {
    if (story) {
      setEditingStory(story);
      setFormData({ ...story, courseId: story.courseId?._id || story.courseId });
    } else {
      setEditingStory(null);
      setFormData({
        studentName: "",
        studentAvatar: "",
        courseId: "",
        resultSummary: "",
        description: "",
        proofImage: "",
        company: "",
        location: "",
        storyType: "text",
        videoUrl: "",
        videoThumbnail: "",
        isPublished: true,
        order: stories.length
      });
    }
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const submissionData = { 
      ...formData, 
      courseId: formData.courseId === "" ? null : formData.courseId 
    };

    try {
      if (editingStory) {
        await api.put(`/cms/stories/${editingStory._id}`, submissionData);
        toast.success("Story updated");
      } else {
        await api.post("/cms/stories", submissionData);
        toast.success("Story published");
      }
      setShowModal(false);
      fetchData();
    } catch (err) {
      toast.error("Operation failed");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Remove this success story?")) return;
    try {
      await api.delete(`/cms/stories/${id}`);
      toast.success("Removed");
      fetchData();
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-12">
        <div>
          <h1 className="text-3xl font-black text-slate-900 mb-2">Student Success Stories</h1>
          <p className="text-slate-500">Highlight your students' achievements and career results.</p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="bg-brand-green text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 hover:bg-green-700 transition-all shadow-lg shadow-green-600/20"
        >
          <LuPlus className="w-5 h-5" />
          Add Success Story
        </button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8">
        {stories.map((story, index) => (
          <motion.div 
            key={story._id} 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            className="bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden group hover:shadow-2xl hover:shadow-brand-green/10 transition-all flex flex-col"
          >
            {/* Proof Preview Header */}
            <div className="h-48 bg-slate-50 relative overflow-hidden group-hover:h-52 transition-all duration-500">
               {story.proofImage ? (
                 <img src={story.proofImage} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Proof" />
               ) : (
                 <div className="w-full h-full flex flex-col items-center justify-center text-slate-300 gap-2">
                    <LuImage className="w-10 h-10 stroke-[1.5]" />
                    <span className="text-[10px] font-black uppercase tracking-widest">No Proof Image</span>
                 </div>
               )}
               
               {/* Status Badge */}
               <div className="absolute top-5 left-5">
                 <div className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest backdrop-blur-md shadow-sm flex items-center gap-2 ${story.isPublished ? 'bg-white/90 text-green-600' : 'bg-slate-900/80 text-white'}`}>
                   <div className={`w-1.5 h-1.5 rounded-full ${story.isPublished ? 'bg-green-500 animate-pulse' : 'bg-slate-400'}`} />
                   {story.isPublished ? 'Published' : 'Draft'}
                 </div>
               </div>
            </div>

            <div className="p-8 flex-1 flex flex-col">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-slate-50 border-2 border-white shadow-md overflow-hidden flex-shrink-0 group-hover:rotate-3 transition-transform">
                  {story.studentAvatar ? (
                    <img src={story.studentAvatar} className="w-full h-full object-cover" alt={story.studentName} />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-indigo-50 text-indigo-600 font-black text-xl">
                      {story.studentName[0]}
                    </div>
                  )}
                </div>
                <div className="min-w-0">
                  <h4 className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors truncate">{story.studentName}</h4>
                  <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">{story.courseId?.title?.en || "Course Grad"}</p>
                </div>
              </div>

              <div className="bg-rose-50/50 p-4 rounded-2xl mb-6 relative group-hover:bg-rose-50 transition-colors">
                <p className="text-rose-600 font-black text-sm relative z-10">
                  “{story.resultSummary}”
                </p>
              </div>

              <div className="mt-auto pt-6 border-t border-slate-50 flex justify-between items-center">
                <div className="flex gap-1.5">
                  <button onClick={() => handleOpenModal(story)} className="p-3 bg-slate-50 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all"><LuPencil className="w-4 h-4" /></button>
                  <button onClick={() => handleDelete(story._id)} className="p-3 bg-slate-50 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all"><LuTrash2 className="w-4 h-4" /></button>
                </div>
                
                <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">#{index + 1} System ID</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white w-full max-w-xl rounded-[2.5rem] p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button 
              onClick={() => setShowModal(false)}
              className="absolute top-6 right-6 p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-full transition-all"
            >
              <LuX className="w-5 h-5" />
            </button>
            <h3 className="text-2xl font-black text-slate-900 mb-2">{editingStory ? "Update Achievement" : "Add Student Success"}</h3>
            <div className="flex bg-slate-100 p-1 rounded-xl mb-8 w-fit">
              <button 
                type="button"
                onClick={() => setFormData({...formData, storyType: 'text'})}
                className={`px-6 py-2 rounded-lg text-[10px] font-black uppercase transition-all ${formData.storyType === 'text' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
              >
                Standard Story
              </button>
              <button 
                type="button"
                onClick={() => setFormData({...formData, storyType: 'video'})}
                className={`px-6 py-2 rounded-lg text-[10px] font-black uppercase transition-all ${formData.storyType === 'video' ? 'bg-white text-rose-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
              >
                Video Success Story
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="flex flex-col md:flex-row gap-6">
                 <ImageUpload 
                   value={formData.studentAvatar} 
                   onChange={(url) => setFormData({...formData, studentAvatar: url})} 
                   label="Student Avatar"
                 />
                 <div className="flex-1 space-y-4">
                    <div>
                      <label className="block text-[10px] font-black uppercase text-slate-400 mb-1">Student Name</label>
                      <input required className="w-full px-4 py-3 bg-slate-50 border-2 border-transparent focus:border-indigo-500/20 focus:bg-white transition-all rounded-xl outline-none text-sm font-bold" value={formData.studentName} onChange={(e) => setFormData({...formData, studentName: e.target.value})} />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black uppercase text-slate-400 mb-1">Impact Title</label>
                      <input required placeholder="e.g. Earned $500 on Fiverr" className="w-full px-4 py-3 bg-slate-50 border-2 border-transparent focus:border-rose-500/20 focus:bg-white transition-all rounded-xl outline-none text-sm font-bold text-rose-600" value={formData.resultSummary} onChange={(e) => setFormData({...formData, resultSummary: e.target.value})} />
                    </div>
                 </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-black uppercase text-slate-400 mb-1">Target Course</label>
                  <select required className="w-full px-4 py-3 bg-slate-50 border-2 border-transparent focus:border-indigo-500/20 focus:bg-white transition-all rounded-xl outline-none text-xs font-bold" value={formData.courseId} onChange={(e) => setFormData({...formData, courseId: e.target.value})}>
                    <option value="">Select Course</option>
                    {courses.map(c => <option key={c._id} value={c._id}>{c.title?.en || c.title}</option>)}
                  </select>
                </div>
                <div className="flex items-center pt-4">
                   <label className="flex items-center gap-2 cursor-pointer group">
                      <input 
                        type="checkbox" 
                        className="w-5 h-5 rounded-lg border-2 border-slate-200 text-indigo-600 focus:ring-transparent transition-all"
                        checked={formData.isPublished}
                        onChange={(e) => setFormData({...formData, isPublished: e.target.checked})}
                      />
                      <span className="text-[10px] font-black uppercase text-slate-500 group-hover:text-indigo-600 transition-colors">Visible on Site</span>
                   </label>
                </div>
              </div>

              {formData.storyType === 'text' && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                  <label className="block text-[10px] font-black uppercase text-slate-400 mb-1">Detailed Description</label>
                  <textarea rows="3" required className="w-full px-4 py-3 bg-slate-50 border-2 border-transparent focus:border-indigo-500/20 focus:bg-white transition-all rounded-xl outline-none text-sm resize-none" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} />
                </motion.div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-black uppercase text-slate-400 mb-1">Company / Workplace</label>
                  <input placeholder="e.g. Google, Upwork" className="w-full px-4 py-3 bg-slate-50 border-2 border-transparent focus:border-indigo-500/20 focus:bg-white transition-all rounded-xl outline-none text-sm font-bold" value={formData.company} onChange={(e) => setFormData({...formData, company: e.target.value})} />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase text-slate-400 mb-1">Location</label>
                  <input placeholder="e.g. Dhaka, Remote" className="w-full px-4 py-3 bg-slate-50 border-2 border-transparent focus:border-indigo-500/20 focus:bg-white transition-all rounded-xl outline-none text-sm" value={formData.location} onChange={(e) => setFormData({...formData, location: e.target.value})} />
                </div>
              </div>

              {formData.storyType === 'video' && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-slate-50">
                  <div>
                    <label className="block text-[10px] font-black uppercase text-slate-400 mb-1">Video Story URL</label>
                    <input required placeholder="YouTube link" className="w-full px-4 py-3 bg-slate-50 border-2 border-transparent focus:border-indigo-500/20 focus:bg-white transition-all rounded-xl outline-none text-sm" value={formData.videoUrl} onChange={(e) => setFormData({...formData, videoUrl: e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black uppercase text-slate-400 mb-1">Video Thumbnail</label>
                    <input required placeholder="Thumbnail URL" className="w-full px-4 py-3 bg-slate-50 border-2 border-transparent focus:border-indigo-500/20 focus:bg-white transition-all rounded-xl outline-none text-sm" value={formData.videoThumbnail} onChange={(e) => setFormData({...formData, videoThumbnail: e.target.value})} />
                  </div>
                </motion.div>
              )}

              <ImageUpload 
                value={formData.proofImage} 
                onChange={(url) => setFormData({...formData, proofImage: url})} 
                label="Achievement Proof Image (Certificate, Chat, or Result)"
              />

              <div className="flex gap-4 pt-4 border-t border-slate-50">
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 py-4 font-black text-slate-400 hover:text-slate-600 uppercase tracking-widest text-[10px]">Cancel</button>
                <button type="submit" className="flex-[2] py-4 bg-slate-900 text-white font-black rounded-2xl shadow-xl shadow-slate-900/20 hover:bg-black transition-all flex items-center justify-center gap-2">
                  <LuCheck className="w-5 h-5" />
                  {editingStory ? "Update Story" : "Publish Achievement"}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
