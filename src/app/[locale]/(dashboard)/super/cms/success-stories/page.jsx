"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LuPlus, LuPencil, LuTrash2, LuBadgeCheck, LuImage, LuSearch } from "react-icons/lu";
import api from "@/lib/api";
import toast from "react-hot-toast";

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
        isPublished: true,
        order: stories.length
      });
    }
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingStory) {
        await api.put(`/cms/stories/${editingStory._id}`, formData);
        toast.success("Story updated");
      } else {
        await api.post("/cms/stories", formData);
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

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stories.map(story => (
          <div key={story._id} className="bg-white rounded-[2rem] border border-slate-100 overflow-hidden group hover:shadow-2xl hover:shadow-brand-green/5 transition-all">
            <div className="h-40 bg-slate-100 relative overflow-hidden">
               {story.proofImage ? <img src={story.proofImage} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-slate-300"><LuImage className="w-8 h-8" /></div>}
               <div className="absolute top-4 left-4">
                 <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${story.isPublished ? 'bg-green-100 text-green-600' : 'bg-slate-200 text-slate-500'}`}>
                   {story.isPublished ? 'Published' : 'Draft'}
                 </span>
               </div>
            </div>
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 font-bold">
                  {story.studentAvatar ? <img src={story.studentAvatar} className="w-full h-full rounded-full" /> : story.studentName[0]}
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">{story.studentName}</h4>
                  <p className="text-xs text-slate-400 font-bold uppercase">{story.courseId?.title?.en || "Course Achievement"}</p>
                </div>
              </div>
              <p className="text-rose-600 font-bold text-sm mb-4">“{story.resultSummary}”</p>
              <div className="flex justify-end gap-2 pt-4 border-t border-slate-50">
                <button onClick={() => handleOpenModal(story)} className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all"><LuPencil className="w-4 h-4" /></button>
                <button onClick={() => handleDelete(story._id)} className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all"><LuTrash2 className="w-4 h-4" /></button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white w-full max-w-xl rounded-[2.5rem] p-8 shadow-2xl relative">
            <h3 className="text-2xl font-black text-slate-900 mb-6">{editingStory ? "Edit Success Story" : "New Success Story"}</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-black uppercase text-slate-400 mb-1">Student Name</label>
                  <input required className="w-full px-4 py-2.5 bg-slate-50 border-none rounded-xl" value={formData.studentName} onChange={(e) => setFormData({...formData, studentName: e.target.value})} />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase text-slate-400 mb-1">Impact Title</label>
                  <input required placeholder="e.g. Earned $500 on Fiverr" className="w-full px-4 py-2.5 bg-slate-50 border-none rounded-xl text-rose-600 font-bold" value={formData.resultSummary} onChange={(e) => setFormData({...formData, resultSummary: e.target.value})} />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase text-slate-400 mb-1">Course</label>
                <select required className="w-full px-4 py-2.5 bg-slate-50 border-none rounded-xl" value={formData.courseId} onChange={(e) => setFormData({...formData, courseId: e.target.value})}>
                  <option value="">Select Course</option>
                  {courses.map(c => <option key={c._id} value={c._id}>{c.title?.en || c.title}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase text-slate-400 mb-1">Success Details</label>
                <textarea rows="3" required className="w-full px-4 py-2.5 bg-slate-50 border-none rounded-xl resize-none" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} />
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase text-slate-400 mb-1">Proof Image URL</label>
                <input className="w-full px-4 py-2.5 bg-slate-50 border-none rounded-xl" value={formData.proofImage} onChange={(e) => setFormData({...formData, proofImage: e.target.value})} />
              </div>

              <div className="flex gap-4 pt-6">
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 py-3 font-bold text-slate-500">Cancel</button>
                <button type="submit" className="flex-1 py-3 bg-slate-900 text-white font-bold rounded-xl">Save Visibility</button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
