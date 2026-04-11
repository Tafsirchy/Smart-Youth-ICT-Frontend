"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { LuPlus, LuPencil, LuTrash2, LuLink, LuImage } from "react-icons/lu";
import api from "@/lib/api";
import toast from "react-hot-toast";

export default function PartnersPage() {
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingPartner, setEditingPartner] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    logo: "",
    websiteUrl: "",
    description: "",
    isActive: true,
    order: 0
  });

  useEffect(() => {
    fetchPartners();
  }, []);

  const fetchPartners = async () => {
    setLoading(true);
    try {
      const res = await api.get("/cms/partners");
      setPartners(res.data.data);
    } catch (err) {
      toast.error("Failed to load partners");
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (partner = null) => {
    if (partner) {
      setEditingPartner(partner);
      setFormData({ ...partner });
    } else {
      setEditingPartner(null);
      setFormData({
        name: "",
        logo: "",
        websiteUrl: "",
        description: "",
        isActive: true,
        order: partners.length
      });
    }
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingPartner) {
        await api.put(`/cms/partners/${editingPartner._id}`, formData);
        toast.success("Partner updated");
      } else {
        await api.post("/cms/partners", formData);
        toast.success("Partner added");
      }
      setShowModal(false);
      fetchPartners();
    } catch (err) {
      toast.error("Operation failed");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this partner association?")) return;
    try {
      await api.delete(`/cms/partners/${id}`);
      toast.success("Partner removed");
      fetchPartners();
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-12">
        <div>
          <h1 className="text-3xl font-black text-slate-900 mb-2">Our Partners</h1>
          <p className="text-slate-500">Manage industry affiliations and logo cloud displays.</p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="bg-indigo-600 text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-600/20"
        >
          <LuPlus className="w-5 h-5" />
          Add Partner
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {partners.map(partner => (
          <div key={partner._id} className="bg-white p-6 rounded-[2rem] border border-slate-100 flex flex-col items-center gap-4 group relative hover:shadow-xl transition-all">
            <div className="w-full aspect-video rounded-xl bg-slate-50 flex items-center justify-center p-4 grayscale group-hover:grayscale-0 transition-all">
              <img src={partner.logo} alt={partner.name} className="max-w-full max-h-full object-contain" />
            </div>
            <h4 className="font-bold text-slate-900 text-sm text-center">{partner.name}</h4>
            
            <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <button onClick={() => handleOpenModal(partner)} className="p-1.5 bg-white text-slate-400 hover:text-indigo-600 shadow-sm border border-slate-100 rounded-lg"><LuPencil className="w-3.5 h-3.5" /></button>
              <button onClick={() => handleDelete(partner._id)} className="p-1.5 bg-white text-slate-400 hover:text-rose-600 shadow-sm border border-slate-100 rounded-lg"><LuTrash2 className="w-3.5 h-3.5" /></button>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="bg-white w-full max-w-md rounded-[2.5rem] p-8 shadow-2xl relative">
            <h3 className="text-2xl font-black text-slate-900 mb-6">{editingPartner ? "Edit Partner" : "New Partner"}</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-[10px] font-black uppercase text-slate-400 mb-1">Partner Name</label>
                <input required className="w-full px-4 py-2.5 bg-slate-50 border-none rounded-xl" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase text-slate-400 mb-1">Logo URL</label>
                <input required className="w-full px-4 py-2.5 bg-slate-50 border-none rounded-xl" value={formData.logo} onChange={(e) => setFormData({...formData, logo: e.target.value})} />
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase text-slate-400 mb-1">Website (External)</label>
                <input className="w-full px-4 py-2.5 bg-slate-50 border-none rounded-xl" placeholder="https://" value={formData.websiteUrl} onChange={(e) => setFormData({...formData, websiteUrl: e.target.value})} />
              </div>

              <div className="flex gap-4 pt-6">
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 py-3 font-bold text-slate-500">Cancel</button>
                <button type="submit" className="flex-1 py-3 bg-slate-900 text-white font-bold rounded-xl">Save Partner</button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
