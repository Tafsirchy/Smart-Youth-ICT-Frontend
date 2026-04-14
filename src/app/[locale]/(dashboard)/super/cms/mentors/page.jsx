"use client";
 
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  LuSearch, LuPlus, LuPencil, LuTrash2, 
  LuStar, LuUser, LuCheck, LuX, LuMail, 
  LuLock, LuBriefcase, LuCpu 
} from "react-icons/lu";
import api from "@/lib/api";
import toast from "react-hot-toast";
import ImageUpload from "@/components/ui/ImageUpload";

export default function FeaturedMentorsPage() {
  const [mentors, setMentors] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingMentor, setEditingMentor] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    avatar: "",
    expertise: [],
    bio: "",
    featuredBio: "",
    isFeaturedMentor: false,
    isActive: true
  });

  useEffect(() => {
    fetchMentors();
  }, []);

  const fetchMentors = async () => {
    setLoading(true);
    try {
      const res = await api.get("/cms/mentors");
      setMentors(res.data.data);
    } catch (err) {
      toast.error("Failed to load instructors");
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (mentor = null) => {
    if (mentor) {
      setEditingMentor(mentor);
      setFormData({
        name: mentor.name || "",
        email: mentor.email || "",
        password: "", // Handled separately or omitted for update
        avatar: mentor.avatar || "",
        expertise: mentor.expertise || [],
        bio: mentor.bio || "",
        featuredBio: mentor.featuredBio || "",
        isFeaturedMentor: mentor.isFeaturedMentor || false,
        isActive: mentor.isActive ?? true
      });
    } else {
      setEditingMentor(null);
      setFormData({
        name: "",
        email: "",
        password: "",
        avatar: "",
        expertise: [],
        bio: "",
        featuredBio: "",
        isFeaturedMentor: false,
        isActive: true
      });
    }
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const submissionData = {
      ...formData,
      expertise: Array.isArray(formData.expertise) ? formData.expertise : (formData.expertise || "").split(",").map(t => t.trim())
    };

    // Remove password if empty during update
    if (editingMentor && !submissionData.password) {
      delete submissionData.password;
    }

    try {
      if (editingMentor) {
        await api.patch(`/cms/mentors/${editingMentor._id}`, submissionData);
        toast.success("Instructor updated");
      } else {
        await api.post("/cms/mentors", submissionData);
        toast.success("New instructor added");
      }
      setShowModal(false);
      fetchMentors();
    } catch (err) {
      toast.error(err.response?.data?.message || "Operation failed");
    }
  };

  const toggleFeatured = async (id, currentStatus) => {
    try {
      await api.patch(`/cms/mentors/${id}/toggle`, { isFeaturedMentor: !currentStatus });
      toast.success(currentStatus ? "Removed from Featured" : "Marked as Featured");
      fetchMentors();
    } catch (err) {
      toast.error("Toggle failed");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Deactivate this instructor? This will hide them from the platform.")) return;
    try {
      await api.delete(`/cms/mentors/${id}`);
      toast.success("Instructor deactivated");
      fetchMentors();
    } catch (err) {
      toast.error("Action failed");
    }
  };

  const filteredMentors = mentors.filter(m => 
    m.name.toLowerCase().includes(search.toLowerCase()) || 
    m.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
        <div>
          <h1 className="text-3xl font-black text-slate-900 mb-2">Mentor Management</h1>
          <p className="text-slate-500">Manage instructor profiles and their "About Us" marketing bio.</p>
        </div>
        
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="relative flex-1 md:w-80">
            <LuSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text"
              placeholder="Search instructors..."
              className="w-full pl-12 pr-4 py-3 bg-white border border-slate-100 rounded-2xl shadow-sm focus:ring-2 focus:ring-rose-500/20 outline-none text-sm transition-all"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <button 
            onClick={() => handleOpenModal()}
            className="bg-slate-900 text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 hover:bg-black transition-all shadow-xl shadow-slate-900/10 shrink-0"
          >
            <LuPlus className="w-5 h-5" />
            Add Instructor
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredMentors.map((mentor, index) => (
            <motion.div 
              key={mentor._id} 
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: index * 0.03 }}
              className={`bg-white p-6 rounded-[2.5rem] border flex flex-col items-center text-center relative group transition-all hover:shadow-2xl hover:shadow-slate-200/50 ${mentor.isFeaturedMentor ? 'border-amber-200 ring-4 ring-amber-500/5' : 'border-slate-100'}`}
            >
               {/* Status Ribbons */}
               {mentor.isFeaturedMentor && (
                 <div className="absolute top-4 left-6">
                   <div className="bg-amber-500 text-white p-1.5 rounded-lg shadow-lg shadow-amber-500/20">
                     <LuStar className="w-3 h-3 fill-current" />
                   </div>
                 </div>
               )}
               {!mentor.isActive && (
                 <div className="absolute top-4 right-6">
                    <span className="text-[8px] font-black uppercase tracking-tighter bg-slate-100 text-slate-400 px-2 py-0.5 rounded-md">Inactive</span>
                 </div>
               )}

               <div className="w-20 h-20 rounded-[2rem] bg-slate-50 border-4 border-white shadow-md mb-4 overflow-hidden group-hover:scale-105 transition-transform">
                 <img src={mentor.avatar || "/images/placeholder.png"} className="w-full h-full object-cover" />
               </div>

               <h4 className="font-bold text-slate-900 truncate w-full">{mentor.name}</h4>
               <p className="text-[10px] font-black uppercase text-slate-400 tracking-wider mb-4 truncate w-full">{mentor.email}</p>

               <div className="flex flex-wrap justify-center gap-1 mb-6">
                  {(mentor.expertise || []).slice(0, 3).map(e => (
                    <span key={e} className="px-2 py-0.5 bg-slate-50 text-slate-500 text-[10px] font-bold rounded-lg border border-slate-100 uppercase tracking-tighter">
                      {e}
                    </span>
                  ))}
               </div>

               <div className="flex gap-2 w-full mt-auto pt-4 border-t border-slate-50">
                  <button 
                    onClick={() => handleOpenModal(mentor)}
                    className="flex-1 py-2.5 bg-slate-50 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl font-bold text-[10px] uppercase tracking-wider transition-all"
                  >
                    Edit Profile
                  </button>
                  <button 
                    onClick={() => toggleFeatured(mentor._id, mentor.isFeaturedMentor)}
                    className={`p-2.5 rounded-xl transition-all ${mentor.isFeaturedMentor ? 'bg-amber-50 text-amber-500 hover:bg-amber-100' : 'bg-slate-50 text-slate-300 hover:text-amber-500'}`}
                    title={mentor.isFeaturedMentor ? "Unfeature" : "Mark as Featured"}
                  >
                    <LuStar className={`w-4 h-4 ${mentor.isFeaturedMentor ? 'fill-current' : ''}`} />
                  </button>
                  <button 
                    onClick={() => handleDelete(mentor._id)}
                    className="p-2.5 bg-slate-50 text-slate-300 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all"
                    title="Deactivate Account"
                  >
                    <LuTrash2 className="w-4 h-4" />
                  </button>
               </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white w-full max-w-2xl rounded-[3rem] p-10 shadow-2xl relative max-h-[95vh] overflow-y-auto">
            <button 
              onClick={() => setShowModal(false)}
              className="absolute top-8 right-8 p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-full transition-all"
            >
              <LuX className="w-5 h-5" />
            </button>
            <h3 className="text-2xl font-black text-slate-900 mb-8">{editingMentor ? "Edit Profile" : "Add Mentor"}</h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="flex flex-col md:flex-row gap-8">
                 <ImageUpload 
                   value={formData.avatar} 
                   onChange={(url) => setFormData({...formData, avatar: url})} 
                   label="Profile Photo"
                 />
                 
                 <div className="flex-1 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-black uppercase text-slate-400 mb-1">Full Name</label>
                        <div className="relative">
                          <LuUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 w-4 h-4" />
                          <input required className="w-full pl-11 pr-4 py-3 bg-slate-50 border-2 border-transparent focus:border-indigo-500/20 focus:bg-white transition-all rounded-xl outline-none text-sm font-bold" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
                        </div>
                      </div>
                      <div>
                        <label className="block text-[10px] font-black uppercase text-slate-400 mb-1">Email Address</label>
                        <div className="relative">
                          <LuMail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 w-4 h-4" />
                          <input required type="email" className="w-full pl-11 pr-4 py-3 bg-slate-50 border-2 border-transparent focus:border-indigo-500/20 focus:bg-white transition-all rounded-xl outline-none text-sm font-bold" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
                        </div>
                      </div>
                    </div>

                    {!editingMentor && (
                       <div>
                        <label className="block text-[10px] font-black uppercase text-slate-400 mb-1">Account Password</label>
                        <div className="relative">
                          <LuLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 w-4 h-4" />
                          <input required type="password" placeholder="Min. 8 characters" className="w-full pl-11 pr-4 py-3 bg-slate-50 border-2 border-transparent focus:border-rose-500/20 focus:bg-white transition-all rounded-xl outline-none text-sm font-bold" value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} />
                        </div>
                      </div>
                    )}

                    <div>
                      <label className="block text-[10px] font-black uppercase text-slate-400 mb-1">Expertise Tags (Comma separated)</label>
                      <div className="relative">
                        <LuCpu className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 w-4 h-4" />
                        <input placeholder="e.g. React, UI/UX, Backend" className="w-full pl-11 pr-4 py-3 bg-slate-50 border-2 border-transparent focus:border-indigo-500/20 focus:bg-white transition-all rounded-xl outline-none text-sm font-bold" value={Array.isArray(formData.expertise) ? formData.expertise.join(", ") : formData.expertise} onChange={(e) => setFormData({...formData, expertise: e.target.value.split(",").map(t => t.trim())})} />
                      </div>
                    </div>
                 </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] font-black uppercase text-slate-400 mb-1 flex items-center gap-2">
                    <LuBriefcase className="w-3 h-3" /> Standard Profile Bio
                  </label>
                  <textarea rows="3" className="w-full px-5 py-4 bg-slate-50 border-2 border-transparent focus:border-indigo-500/20 focus:bg-white transition-all rounded-[2rem] outline-none text-sm resize-none" placeholder="Short professional summary..." value={formData.bio} onChange={(e) => setFormData({...formData, bio: e.target.value})} />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase text-amber-500 mb-1 flex items-center gap-2">
                    <LuStar className="w-3 h-3" /> About Us "Marketing" Bio
                  </label>
                  <textarea rows="3" className="w-full px-5 py-4 bg-amber-50/30 border-2 border-transparent focus:border-amber-500/20 focus:bg-amber-50/50 transition-all rounded-[2rem] outline-none text-sm resize-none" placeholder="Exclusive bio for featured showcase..." value={formData.featuredBio} onChange={(e) => setFormData({...formData, featuredBio: e.target.value})} />
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
                 <div className="flex items-center gap-4">
                    <label className="flex items-center gap-2 cursor-pointer group">
                        <input 
                          type="checkbox" 
                          className="w-5 h-5 rounded-lg border-2 border-slate-200 text-amber-500 focus:ring-transparent transition-all"
                          checked={formData.isFeaturedMentor}
                          onChange={(e) => setFormData({...formData, isFeaturedMentor: e.target.checked})}
                        />
                        <span className="text-[10px] font-black uppercase text-slate-500 group-hover:text-amber-500 transition-colors">Show as Featured Mentor</span>
                    </label>
                 </div>
                 <div className="flex items-center gap-4 border-l border-slate-200 pl-4">
                    <label className="flex items-center gap-2 cursor-pointer group">
                        <input 
                          type="checkbox" 
                          className="w-5 h-5 rounded-lg border-2 border-slate-200 text-indigo-600 focus:ring-transparent transition-all"
                          checked={formData.isActive}
                          onChange={(e) => setFormData({...formData, isActive: e.target.checked})}
                        />
                        <span className="text-[10px] font-black uppercase text-slate-500 group-hover:text-indigo-600 transition-colors">Active Instructor</span>
                    </label>
                 </div>
              </div>

              <div className="flex gap-4 pt-6 border-t border-slate-50">
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 py-4 font-black text-slate-400 hover:text-slate-600 uppercase tracking-widest text-[10px] transition-colors">Cancel</button>
                <button type="submit" className="flex-[2] py-4 bg-slate-900 text-white font-black rounded-[2rem] shadow-2xl shadow-slate-900/10 hover:bg-black transition-all flex items-center justify-center gap-2">
                  <LuCheck className="w-6 h-6" />
                  {editingMentor ? "Update Mentor" : "Save Instructor"}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {loading && mentors.length === 0 && (
         <div className="py-20 text-center flex flex-col items-center">
            <div className="w-16 h-16 border-4 border-slate-100 border-t-indigo-600 rounded-full animate-spin mb-4" />
            <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Syncing instructors...</p>
         </div>
      )}
    </div>
  );
}
