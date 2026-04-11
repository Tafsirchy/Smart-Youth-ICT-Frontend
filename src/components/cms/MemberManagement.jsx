"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { LuPlus, LuPencil, LuTrash2, LuUsers } from "react-icons/lu";
import api from "@/lib/api";
import toast from "react-hot-toast";

export default function MemberManagement({ type, title, subtitle }) {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingMember, setEditingMember] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    type: type,
    image: "",
    bio: "",
    socials: { linkedin: "", twitter: "", website: "" },
    order: 0
  });

  useEffect(() => {
    fetchMembers();
  }, [type]);

  const fetchMembers = async () => {
    setLoading(true);
    try {
      const res = await api.get(`/cms/team?type=${type}`);
      setMembers(res.data.data);
    } catch (err) {
      toast.error("Failed to load members");
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (member = null) => {
    if (member) {
      setEditingMember(member);
      setFormData({ ...member });
    } else {
      setEditingMember(null);
      setFormData({
        name: "",
        role: "",
        type: type,
        image: "",
        bio: "",
        socials: { linkedin: "", twitter: "", website: "" },
        order: members.length
      });
    }
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingMember) {
        await api.put(`/cms/team/${editingMember._id}`, formData);
        toast.success("Updated successfully");
      } else {
        await api.post("/cms/team", formData);
        toast.success("Member added");
      }
      setShowModal(false);
      fetchMembers();
    } catch (err) {
      toast.error("Operation failed");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this member?")) return;
    try {
      await api.delete(`/cms/team/${id}`);
      toast.success("Removed");
      fetchMembers();
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-12">
        <div>
          <h1 className="text-3xl font-black text-slate-900 mb-2">{title}</h1>
          <p className="text-slate-500">{subtitle}</p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="bg-rose-600 text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2"
        >
          <LuPlus className="w-5 h-5" />
          Add Member
        </button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {members.map(member => (
          <div key={member._id} className="bg-white p-6 rounded-[2rem] border border-slate-100 flex items-center gap-4 group transition-all hover:shadow-xl">
            <div className="w-16 h-16 rounded-2xl bg-slate-50 overflow-hidden flex-shrink-0">
               <img src={member.image || "/images/placeholder.png"} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-bold text-slate-900 truncate">{member.name}</h4>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">{member.role}</p>
            </div>
            <div className="flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <button onClick={() => handleOpenModal(member)} className="p-2 text-slate-400 hover:text-indigo-600"><LuPencil className="w-4 h-4" /></button>
              <button onClick={() => handleDelete(member._id)} className="p-2 text-slate-400 hover:text-rose-600"><LuTrash2 className="w-4 h-4" /></button>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="bg-white w-full max-w-xl rounded-[2.5rem] p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <h3 className="text-2xl font-black text-slate-900 mb-6">{editingMember ? "Edit Member" : "Add Member"}</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
               <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-black uppercase text-slate-400 mb-1">Full Name</label>
                    <input required className="w-full px-4 py-2.5 bg-slate-50 border-none rounded-xl" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black uppercase text-slate-400 mb-1">Position</label>
                    <input required className="w-full px-4 py-2.5 bg-slate-50 border-none rounded-xl" value={formData.role} onChange={(e) => setFormData({...formData, role: e.target.value})} />
                  </div>
               </div>
               <div>
                 <label className="block text-[10px] font-black uppercase text-slate-400 mb-1">Image URL</label>
                 <input className="w-full px-4 py-2.5 bg-slate-50 border-none rounded-xl" value={formData.image} onChange={(e) => setFormData({...formData, image: e.target.value})} />
               </div>
               <div>
                  <label className="block text-[10px] font-black uppercase text-slate-400 mb-1">LinkedIn Profile</label>
                  <input className="w-full px-4 py-2.5 bg-slate-50 border-none rounded-xl" value={formData.socials.linkedin} onChange={(e) => setFormData({...formData, socials: {...formData.socials, linkedin: e.target.value}})} />
               </div>
               <div className="flex gap-4 pt-6">
                 <button type="button" onClick={() => setShowModal(false)} className="flex-1 py-3 font-bold text-slate-500">Cancel</button>
                 <button type="submit" className="flex-1 py-3 bg-slate-900 text-white font-bold rounded-xl">Save Member</button>
               </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
