"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import {
 LuPlus,
 LuTrash2,
 LuLink,
 LuCheck,
 LuX,
} from "react-icons/lu";
import api from "@/lib/api";
import toast from "react-hot-toast";
import ImageUpload from "@/components/ui/ImageUpload";

export default function MembershipsPage() {
 const [memberships, setMemberships] = useState([]);
 const [, setLoading] = useState(true);
 const [showModal, setShowModal] = useState(false);
 const [editingMembership, setEditingMembership] = useState(null);
 const [formData, setFormData] = useState({
 name: "",
 logo: "",
 category: "",
 memberSince: "",
 websiteUrl: "",
 description: "",
 isActive: true,
 order: 0,
 });

 useEffect(() => {
 fetchMemberships();
 }, []);

 const fetchMemberships = async () => {
 setLoading(true);
 try {
 const res = await api.get("/cms/memberships");
 setMemberships(res.data.data);
 } catch (err) {
 toast.error("Failed to load memberships");
 } finally {
 setLoading(false);
 }
 };

 const handleOpenModal = (membership = null) => {
 if (membership) {
 setEditingMembership(membership);
 setFormData({ ...membership });
 } else {
 setEditingMembership(null);
 setFormData({
 name: "",
 logo: "",
 category: "",
 memberSince: "",
 websiteUrl: "",
 description: "",
 isActive: true,
 order: memberships.length,
 });
 }
 setShowModal(true);
 };

 const handleSubmit = async (e) => {
 e.preventDefault();
 try {
 if (editingMembership) {
 await api.put(`/cms/memberships/${editingMembership._id}`, formData);
 toast.success("Membership updated");
 } else {
 await api.post("/cms/memberships", formData);
 toast.success("Membership added");
 }
 setShowModal(false);
 fetchMemberships();
 } catch (err) {
 toast.error("Operation failed");
 }
 };

 const handleDelete = async (id) => {
 if (!window.confirm("Delete this membership?")) return;
 try {
 await api.delete(`/cms/memberships/${id}`);
 toast.success("Membership removed");
 fetchMemberships();
 } catch (err) {
 toast.error("Delete failed");
 }
 };

 return (
 <div className="py-4 sm:py-5">
 <div className="flex justify-between items-center gap-4 mb-6 sm:mb-8">
 <div>
 <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mb-1 leading-[1.4]">
 Our Memberships
 </h1>
 <p className="text-sm sm:text-base text-slate-500 leading-[1.6]">
 Manage the organisations SYICT is a member of (e.g. BCS, BASIS).
 </p>
 </div>
 <button
 onClick={() => handleOpenModal()}
 className="bg-indigo-600 text-white px-4 py-2.5 font-bold flex items-center justify-center gap-1.5 hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-600/20 shrink-0"
 >
 <LuPlus className="w-5 h-5 shrink-0" />
 <span className="hidden sm:inline">Add Membership</span>
 </button>
 </div>

 <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
 {memberships.map((membership, index) => (
 <motion.div
 key={membership._id}
 initial={{ opacity: 0, scale: 0.9 }}
 animate={{ opacity: 1, scale: 1 }}
 transition={{ delay: index * 0.03 }}
 className="bg-white p-4 sm:p-5 border border-slate-100 flex flex-col items-center gap-3 group relative hover:shadow-2xl hover:shadow-indigo-500/10 hover:border-indigo-500/20 transition-all"
 >
 <div className="w-full aspect-video bg-slate-50 flex items-center justify-center p-4 grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:bg-indigo-50/30">
 <div className="relative w-full h-full">
 <Image
 src={membership.logo}
 alt={membership.name || "Membership logo"}
 fill
 sizes="(max-width: 768px) 50vw, 25vw"
 loading="lazy"
 decoding="async"
 onError={(e) => { e.target.srcset = ''; e.target.src = '/images/placeholder.png'; }}
 className="object-contain group-hover:scale-110 transition-transform duration-500 bg-[#f0f0f0]"
 />
 </div>
 </div>

 <div className="text-center w-full min-w-0">
 <h4 className="font-bold text-slate-900 text-sm group-hover:text-indigo-600 transition-colors uppercase tracking-tight truncate leading-[1.4]">
 {membership.name}
 </h4>
 <p className="text-[10px] text-slate-500 font-bold mt-0.5 uppercase tracking-normal italic truncate leading-[1.4]">
 {membership.category || "Membership"}
 </p>
 <p className="text-[10px] text-slate-300 font-black mt-1 uppercase tracking-widest leading-[1.4]">
 {membership.isActive ? "Active" : "Inactive"}
 </p>
 </div>

 <div className="flex gap-2 w-full mt-auto pt-3 border-t border-slate-50">
 <button
 onClick={() => handleOpenModal(membership)}
 className="flex-1 h-11 flex items-center justify-center bg-slate-50 text-slate-400 active:bg-indigo-50 active:text-indigo-600 lg:hover:text-indigo-600 lg:hover:bg-indigo-50 font-bold text-[10px] uppercase tracking-normal transition-all leading-[1.4]"
 >
 Edit
 </button>
 <button
 onClick={() => handleDelete(membership._id)}
 className="w-11 h-11 shrink-0 flex items-center justify-center bg-slate-50 text-slate-400 active:bg-rose-50 active:text-rose-600 lg:hover:text-rose-600 lg:hover:bg-rose-50 transition-all"
 title="Remove Membership"
 >
 <LuTrash2 className="w-4 h-4" />
 </button>
 </div>

 {membership.websiteUrl && (
 <div className="absolute top-2 right-2 p-1.5 bg-white/80 backdrop-blur text-slate-300 group-hover:text-indigo-400 transition-colors pointer-events-none">
 <LuLink className="w-3 h-3" />
 </div>
 )}
 </motion.div>
 ))}
 </div>

 {showModal && (
 <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[999] flex items-end sm:items-center justify-center p-0 sm:p-2">
 <motion.div
 initial={{ scale: 0.95, opacity: 0, y: 20 }}
 animate={{ scale: 1, opacity: 1, y: 0 }}
 className="bg-white w-full max-w-lg sm: p-4 sm:p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto flex flex-col custom-scrollbar"
 >
 <div className="flex items-center justify-between mb-4 shrink-0">
 <div>
 <h3 className="text-xl font-black text-slate-900 leading-[1.4]">
 {editingMembership ? "Update Membership" : "New Membership"}
 </h3>
 <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5 leading-[1.4]">
 Membership Management
 </p>
 </div>
 <button
 onClick={() => setShowModal(false)}
 className="w-11 h-11 flex items-center justify-center bg-slate-50 text-slate-500 active:bg-slate-100 lg:hover:bg-slate-200 transition-all shrink-0"
 aria-label="Close"
 >
 <LuX className="w-5 h-5" />
 </button>
 </div>

 <form onSubmit={handleSubmit} className="space-y-4">
 <ImageUpload
 value={formData.logo}
 onChange={(url) => setFormData({ ...formData, logo: url })}
 label="Organisation Logo (SVG/PNG)"
 />

 <div className="space-y-3">
 <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
 <div>
 <label className="block text-[10px] font-black uppercase text-slate-400 mb-0.5 leading-[1.4]">
 Organisation Name
 </label>
 <input
 required
 className="w-full px-3 py-2 bg-slate-50 border-2 border-transparent focus:border-indigo-500/20 focus:bg-white transition-all outline-none text-sm font-bold shadow-inner leading-[1.4]"
 value={formData.name}
 onChange={(e) =>
 setFormData({ ...formData, name: e.target.value })
 }
 />
 </div>
 <div>
 <label className="block text-[10px] font-black uppercase text-slate-400 mb-0.5 leading-[1.4]">
 Category
 </label>
 <input
 placeholder="e.g. Professional Body"
 className="w-full px-3 py-2 bg-slate-50 border-2 border-transparent focus:border-indigo-500/20 focus:bg-white transition-all outline-none text-sm font-bold shadow-inner leading-[1.4]"
 value={formData.category}
 onChange={(e) =>
 setFormData({
 ...formData,
 category: e.target.value,
 })
 }
 />
 </div>
 </div>

 <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
 <div>
 <label className="block text-[10px] font-black uppercase text-slate-400 mb-0.5 leading-[1.4]">
 Member Since
 </label>
 <input
 placeholder="e.g. 2019"
 className="w-full px-3 py-2 bg-slate-50 border-2 border-transparent focus:border-indigo-500/20 focus:bg-white transition-all outline-none text-sm font-bold shadow-inner leading-[1.4]"
 value={formData.memberSince}
 onChange={(e) =>
 setFormData({ ...formData, memberSince: e.target.value })
 }
 />
 </div>
 <div>
 <label className="block text-[10px] font-black uppercase text-slate-400 mb-0.5 leading-[1.4]">
 Official Website
 </label>
 <div className="relative">
 <LuLink className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300 w-4 h-4" />
 <input
 type="url"
 inputMode="url"
 className="w-full pl-9 pr-3 py-2 bg-slate-50 border-2 border-transparent focus:border-indigo-500/20 focus:bg-white transition-all outline-none text-sm shadow-inner leading-[1.4]"
 placeholder="https://organisation.org"
 value={formData.websiteUrl}
 onChange={(e) =>
 setFormData({ ...formData, websiteUrl: e.target.value })
 }
 />
 </div>
 </div>
 </div>

 <div>
 <label className="block text-[10px] font-black uppercase text-slate-400 mb-0.5 leading-[1.4]">
 Description
 </label>
 <textarea
 rows={3}
 className="w-full px-3 py-2 bg-slate-50 border-2 border-transparent focus:border-indigo-500/20 focus:bg-white transition-all outline-none text-sm shadow-inner leading-[1.4]"
 value={formData.description}
 onChange={(e) =>
 setFormData({ ...formData, description: e.target.value })
 }
 />
 </div>

 <div className="flex items-center gap-3 pt-1 sm:pt-2">
 <label className="flex items-center gap-2 cursor-pointer group">
 <input
 type="checkbox"
 className="w-4 h-4 border-2 border-slate-200 text-indigo-600 focus:ring-transparent transition-all"
 checked={formData.isActive}
 onChange={(e) =>
 setFormData({ ...formData, isActive: e.target.checked })
 }
 />
 <span className="text-[10px] font-black uppercase text-slate-500 group-hover:text-indigo-600 transition-colors leading-[1.4]">
 Visible on Public Page
 </span>
 </label>
 </div>
 </div>

 <div className="flex gap-2 pt-4 pb-2 sm:pb-0 sticky bottom-0 bg-white z-10 border-t border-slate-50 sm:border-none mt-4">
 <button
 type="button"
 onClick={() => setShowModal(false)}
 className="flex-1 py-2.5 font-black text-slate-400 active:text-slate-600 lg:hover:text-slate-600 uppercase tracking-widest text-[10px] transition-colors leading-[1.4]"
 >
 Cancel
 </button>
 <button
 type="submit"
 className="flex-[2] py-2.5 bg-slate-900 text-white font-black shadow-xl shadow-slate-900/10 hover:bg-black transition-all flex items-center justify-center gap-1.5 leading-[1.4]"
 >
 <LuCheck className="w-5 h-5" />
 {editingMembership ? "Update Membership" : "Save Membership"}
 </button>
 </div>
 </form>
 </motion.div>
 </div>
 )}
 </div>
 );
}
