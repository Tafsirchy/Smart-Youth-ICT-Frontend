"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import {
 LuPlus,
 LuPencil,
 LuTrash2,
 LuLink,
 LuImage,
 LuCheck,
 LuX,
} from "react-icons/lu";
import api from "@/lib/api";
import toast from "react-hot-toast";
import ImageUpload from "@/components/ui/ImageUpload";

export default function PartnersPage() {
 const [partners, setPartners] = useState([]);
 const [loading, setLoading] = useState(true);
 const [showModal, setShowModal] = useState(false);
 const [editingPartner, setEditingPartner] = useState(null);
 const [formData, setFormData] = useState({
 name: "",
 logo: "",
 partnerType: "",
 websiteUrl: "",
 description: "",
 isActive: true,
 order: 0,
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
 partnerType: "",
 websiteUrl: "",
 description: "",
 isActive: true,
 order: partners.length,
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
    <div className="py-2.5 sm:py-3.5">
      <div className="flex justify-between items-center gap-2.5 mb-3.5 sm:mb-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mb-0.5 leading-[1.4]">
            Our Partners
          </h1>
          <p className="text-sm sm:text-base text-slate-500 leading-[1.5]">
            Manage industry affiliations and logo cloud displays.
          </p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="bg-indigo-600 text-white px-3.5 py-2 font-bold flex items-center justify-center gap-1.5 hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-600/20 shrink-0 text-xs sm:text-sm leading-[1.4] rounded-md"
        >
          <LuPlus className="w-4 h-4 shrink-0" />
          <span className="hidden sm:inline">Add Partner</span>
        </button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2.5 sm:gap-3">
        {loading ? (
          [...Array(4)].map((_, i) => (
            <div
              key={i}
              className="bg-slate-50 animate-pulse h-40 border border-slate-100 flex flex-col items-center justify-center gap-2 p-3 rounded-md"
            >
              <div className="w-full aspect-video bg-slate-200 rounded" />
              <div className="w-3/4 h-3.5 bg-slate-200 rounded" />
              <div className="w-1/2 h-2.5 bg-slate-200 rounded" />
            </div>
          ))
        ) : partners.length === 0 ? (
          <div className="col-span-full py-6 flex flex-col items-center justify-center text-slate-400">
            <LuImage className="w-8 h-8 mb-2 text-slate-200" />
            <p className="font-bold text-xs sm:text-sm leading-[1.4]">No partners added yet</p>
          </div>
        ) : (
          partners.map((partner, index) => (
            <motion.div
              key={partner._id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.03 }}
              className="bg-white p-3 sm:p-3.5 border border-slate-100 flex flex-col items-center gap-2 group relative hover:shadow-2xl hover:shadow-indigo-500/10 hover:border-indigo-500/20 transition-all rounded-md"
            >
              <div className="w-full aspect-video bg-slate-50 flex items-center justify-center p-2.5 grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:bg-indigo-50/30 rounded relative overflow-hidden">
                {partner.logo ? (
                  <div className="relative w-full h-full z-10">
                    <Image
                      src={partner.logo}
                      alt={partner.name || "Partner logo"}
                      fill
                      sizes="(max-width: 768px) 50vw, 25vw"
                      unoptimized={true}
                      onError={(e) => { e.currentTarget.style.display = 'none'; }}
                      onLoad={(e) => {
                        if (e.target.src.includes('ibb.co') && e.target.naturalWidth === 180 && e.target.naturalHeight === 180) {
                          e.currentTarget.style.display = 'none';
                        }
                      }}
                      className="object-contain group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                ) : null}
                <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 absolute inset-0 z-0 bg-slate-50 p-2 text-center">
                  <LuImage className="w-6 h-6 text-slate-300 mb-1" />
                  <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 truncate max-w-full">
                    {partner.name}
                  </span>
                </div>
              </div>

              <div className="text-center w-full min-w-0">
                <h4 className="font-bold text-slate-900 text-xs sm:text-sm group-hover:text-indigo-600 transition-colors uppercase tracking-tight truncate leading-[1.4]">
                  {partner.name}
                </h4>
                <p className="text-[10px] text-slate-500 font-bold mt-0.5 uppercase tracking-normal italic truncate leading-[1.4]">
                  {partner.partnerType || "Affiliate Partner"}
                </p>
                <p className="text-[10px] text-slate-300 font-black mt-0.5 uppercase tracking-widest leading-[1.4]">
                  {partner.isActive ? "Active Partner" : "Inactive"}
                </p>
              </div>

              <div className="flex gap-1.5 w-full mt-auto pt-2 border-t border-slate-50">
                <button
                  onClick={() => handleOpenModal(partner)}
                  className="flex-1 h-8 flex items-center justify-center bg-slate-50 text-slate-400 active:bg-indigo-50 active:text-indigo-600 lg:hover:text-indigo-600 lg:hover:bg-indigo-50 font-bold text-[10px] uppercase tracking-normal transition-all leading-[1.4] rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(partner._id)}
                  className="w-8 h-8 shrink-0 flex items-center justify-center bg-slate-50 text-slate-400 active:bg-rose-50 active:text-rose-600 lg:hover:text-rose-600 lg:hover:bg-rose-50 transition-all rounded"
                  title="Remove Partner"
                >
                  <LuTrash2 className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Link Indicator */}
              {partner.websiteUrl && (
                <div className="absolute top-2 right-2 p-1 bg-white/80 backdrop-blur text-slate-300 group-hover:text-indigo-400 transition-colors pointer-events-none rounded">
                  <LuLink className="w-3 h-3" />
                </div>
              )}
            </motion.div>
          ))
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[999] flex items-end sm:items-center justify-center p-0 sm:p-2">
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            className="bg-white w-full max-w-lg p-3.5 sm:p-4 shadow-2xl relative max-h-[90vh] overflow-y-auto flex flex-col custom-scrollbar rounded-lg"
          >
            <div className="flex items-center justify-between mb-3 shrink-0">
              <div>
                <h3 className="text-lg sm:text-xl font-black text-slate-900 leading-[1.4]">
                  {editingPartner ? "Update Partner" : "New Affiliate Partner"}
                </h3>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5 leading-[1.4]">
                  Logo Cloud Management
                </p>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="w-8 h-8 flex items-center justify-center bg-slate-50 text-slate-500 active:bg-slate-100 lg:hover:bg-slate-200 transition-all shrink-0 rounded-md"
                aria-label="Close"
              >
                <LuX className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-2.5">
              <ImageUpload
                value={formData.logo}
                onChange={(url) => setFormData({ ...formData, logo: url })}
                label="Partner Logo (SVG/PNG)"
              />

              <div className="space-y-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[10px] font-black uppercase text-slate-400 mb-0.5 leading-[1.4]">
                      Company Name
                    </label>
                    <input
                      required
                      className="w-full px-2.5 py-1.5 bg-slate-50 border-2 border-transparent focus:border-indigo-500/20 focus:bg-white transition-all outline-none text-xs sm:text-sm font-bold shadow-inner leading-[1.4] rounded-md"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black uppercase text-slate-400 mb-0.5 leading-[1.4]">
                      Partner Type
                    </label>
                    <input
                      placeholder="e.g. Hiring Partner"
                      className="w-full px-2.5 py-1.5 bg-slate-50 border-2 border-transparent focus:border-indigo-500/20 focus:bg-white transition-all outline-none text-xs sm:text-sm font-bold shadow-inner leading-[1.4] rounded-md"
                      value={formData.partnerType}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          partnerType: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-black uppercase text-slate-400 mb-0.5 leading-[1.4]">
                    Official Website
                  </label>
                  <div className="relative">
                    <LuLink className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-300 w-3.5 h-3.5" />
                    <input
                      type="url"
                      inputMode="url"
                      className="w-full pl-8 pr-2.5 py-1.5 bg-slate-50 border-2 border-transparent focus:border-indigo-500/20 focus:bg-white transition-all outline-none text-xs sm:text-sm shadow-inner leading-[1.4] rounded-md"
                      placeholder="https://company.com"
                      value={formData.websiteUrl}
                      onChange={(e) =>
                        setFormData({ ...formData, websiteUrl: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <label className="flex items-center gap-1.5 cursor-pointer group rounded-md">
                    <input
                      type="checkbox"
                      className="w-3.5 h-3.5 border-2 border-slate-200 text-indigo-600 focus:ring-transparent transition-all rounded"
                      checked={formData.isActive}
                      onChange={(e) =>
                        setFormData({ ...formData, isActive: e.target.checked })
                      }
                    />
                    <span className="text-[10px] font-black uppercase text-slate-500 group-hover:text-indigo-600 transition-colors leading-[1.4]">
                      Visible in Logo Cloud
                    </span>
                  </label>
                </div>
              </div>

              <div className="flex gap-2 pt-2.5 pb-2 sm:pb-0 sticky bottom-0 bg-white z-10 border-t border-slate-50 sm:border-none mt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 py-1.5 font-black text-slate-400 active:text-slate-600 lg:hover:text-slate-600 uppercase tracking-widest text-[10px] transition-colors leading-[1.4]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-[2] py-2 bg-slate-900 text-white font-black shadow-xl shadow-slate-900/10 hover:bg-black transition-all flex items-center justify-center gap-1.5 leading-[1.4] rounded-md text-xs sm:text-sm"
                >
                  <LuCheck className="w-4 h-4" />
                  {editingPartner ? "Update Partner" : "Save Association"}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
