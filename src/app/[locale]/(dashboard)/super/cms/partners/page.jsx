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
    <div className="p-8">
      <div className="flex justify-between items-center mb-12">
        <div>
          <h1 className="text-3xl font-black text-slate-900 mb-2">
            Our Partners
          </h1>
          <p className="text-slate-500">
            Manage industry affiliations and logo cloud displays.
          </p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="bg-indigo-600 text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-600/20"
        >
          <LuPlus className="w-5 h-5" />
          Add Partner
        </button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xxl:grid-cols-5 gap-6">
        {partners.map((partner, index) => (
          <motion.div
            key={partner._id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.03 }}
            className="bg-white p-6 rounded-[2.5rem] border border-slate-100 flex flex-col items-center gap-4 group relative hover:shadow-2xl hover:shadow-indigo-500/10 hover:border-indigo-500/20 transition-all"
          >
            <div className="w-full aspect-video rounded-2xl bg-slate-50 flex items-center justify-center p-6 grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:bg-indigo-50/30">
              <div className="relative w-full h-full">
                <Image
                  src={partner.logo}
                  alt={partner.name || "Partner logo"}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-contain group-hover:scale-110 transition-transform duration-500"
                />
              </div>
            </div>

            <div className="text-center">
              <h4 className="font-bold text-slate-900 text-sm group-hover:text-indigo-600 transition-colors uppercase tracking-tight">
                {partner.name}
              </h4>
              <p className="text-[10px] text-slate-500 font-bold mt-0.5 uppercase tracking-wide italic">
                {partner.partnerType || "Affiliate Partner"}
              </p>
              <p className="text-[10px] text-slate-300 font-black mt-1 uppercase tracking-widest">
                {partner.isActive ? "Active Partner" : "Inactive"}
              </p>
            </div>

            <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all">
              <button
                onClick={() => handleOpenModal(partner)}
                className="p-2.5 bg-white/90 backdrop-blur-sm text-slate-400 hover:text-indigo-600 shadow-xl border border-slate-100 rounded-xl transition-all"
                title="Edit Partner"
              >
                <LuPencil className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleDelete(partner._id)}
                className="p-2.5 bg-white/90 backdrop-blur-sm text-slate-400 hover:text-rose-600 shadow-xl border border-slate-100 rounded-xl transition-all"
                title="Remove Partner"
              >
                <LuTrash2 className="w-4 h-4" />
              </button>
            </div>

            {/* Link Indicator */}
            {partner.websiteUrl && (
              <div className="absolute bottom-4 right-6 text-slate-200 group-hover:text-indigo-200 transition-colors">
                <LuLink className="w-3 h-3" />
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white w-full max-w-lg rounded-[2.5rem] p-10 shadow-2xl relative max-h-[90vh] overflow-y-auto"
          >
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-8 right-8 p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-full transition-all"
            >
              <LuX className="w-5 h-5" />
            </button>
            <div className="flex justify-between items-start mb-8">
              <div>
                <h3 className="text-2xl font-black text-slate-900 tracking-tight">
                  {editingPartner ? "Update Partner" : "New Affiliate Partner"}
                </h3>
                <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">
                  Logo Cloud Management
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <ImageUpload
                value={formData.logo}
                onChange={(url) => setFormData({ ...formData, logo: url })}
                label="Partner Logo (SVG/PNG Preferred)"
              />

              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-black uppercase text-slate-400 mb-1.5">
                      Company Name
                    </label>
                    <input
                      required
                      className="w-full px-5 py-3.5 bg-slate-50 border-2 border-transparent focus:border-indigo-500/20 focus:bg-white transition-all rounded-2xl outline-none text-sm font-bold shadow-inner"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black uppercase text-slate-400 mb-1.5">
                      Partner Type
                    </label>
                    <input
                      placeholder="e.g. Hiring Partner"
                      className="w-full px-5 py-3.5 bg-slate-50 border-2 border-transparent focus:border-indigo-500/20 focus:bg-white transition-all rounded-2xl outline-none text-sm font-bold shadow-inner"
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
                  <label className="block text-[10px] font-black uppercase text-slate-400 mb-1.5">
                    Official Website
                  </label>
                  <div className="relative">
                    <LuLink className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 w-4 h-4" />
                    <input
                      className="w-full pl-11 pr-5 py-3.5 bg-slate-50 border-2 border-transparent focus:border-indigo-500/20 focus:bg-white transition-all rounded-2xl outline-none text-sm shadow-inner"
                      placeholder="https://company.com"
                      value={formData.websiteUrl}
                      onChange={(e) =>
                        setFormData({ ...formData, websiteUrl: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <label className="flex items-center gap-2.5 cursor-pointer group">
                    <input
                      type="checkbox"
                      className="w-5 h-5 rounded-lg border-2 border-slate-200 text-indigo-600 focus:ring-transparent transition-all"
                      checked={formData.isActive}
                      onChange={(e) =>
                        setFormData({ ...formData, isActive: e.target.checked })
                      }
                    />
                    <span className="text-[10px] font-black uppercase text-slate-500 group-hover:text-indigo-600 transition-colors">
                      Visible in Logo Cloud
                    </span>
                  </label>
                </div>
              </div>

              <div className="flex gap-4 pt-6 border-t border-slate-50">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 py-4 font-black text-slate-400 hover:text-slate-600 uppercase tracking-widest text-[10px] transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-[2] py-4 bg-slate-900 text-white font-black rounded-2xl shadow-xl shadow-slate-900/20 hover:bg-black transition-all flex items-center justify-center gap-3 group"
                >
                  <LuCheck className="w-5 h-5 group-hover:scale-125 transition-transform" />
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
