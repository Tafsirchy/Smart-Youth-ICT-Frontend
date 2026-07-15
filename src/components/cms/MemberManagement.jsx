"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  LuPlus,
  LuPencil,
  LuTrash2,
  LuUsers,
  LuLinkedin,
  LuGlobe,
  LuCheck,
  LuX,
  LuMapPin,
  LuCpu,
} from "react-icons/lu";
import api from "@/lib/api";
import toast from "react-hot-toast";
import ImageUpload from "@/components/ui/ImageUpload";

export default function MemberManagement({ type, title, subtitle }) {
  const [members, setMembers] = useState([]);
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingMember, setEditingMember] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    institution: "",
    type: type,
    image: "",
    bio: "",
    expertise: [],
    branchId: "",
    socials: { linkedin: "", twitter: "", website: "", email: "" },
    order: 0,
  });

  useEffect(() => {
    fetchMembers();
    if (type === "instructor") fetchBranches();
  }, [type]);

  const fetchBranches = async () => {
    try {
      const res = await api.get("/branches/public/list");
      setBranches(res.data.data || []);
    } catch (err) {
      console.error("Failed to load branches");
    }
  };

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
        institution: "",
        type: type,
        image: "",
        bio: "",
        expertise: [],
        branchId: "",
        socials: { linkedin: "", twitter: "", website: "", email: "" },
        order: members.length,
      });
    }
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const submissionData = {
      ...formData,
      branchId: formData.branchId === "" ? null : formData.branchId,
      expertise: Array.isArray(formData.expertise)
        ? formData.expertise
        : (formData.expertise || "").split(",").map((t) => t.trim()),
    };

    try {
      if (editingMember) {
        await api.put(`/cms/team/${editingMember._id}`, submissionData);
        toast.success("Updated successfully");
      } else {
        await api.post("/cms/team", submissionData);
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
    <div className="py-4 sm:py-5">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 mb-4 sm:mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mb-1 leading-[1.4]">{title}</h1>
          <p className="text-sm sm:text-base text-slate-500 leading-[1.5]">{subtitle}</p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="w-full sm:w-auto bg-rose-600 text-white px-4 py-2.5 rounded-xl font-bold flex items-center justify-center gap-1.5"
        >
          <LuPlus className="w-5 h-5" />
          Add Member
        </button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-3">
        {members.map((member, index) => (
          <motion.div
            key={member._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="group relative bg-white p-3 rounded-2xl border border-slate-100 flex items-center gap-3 transition-all hover:shadow-2xl hover:shadow-pink-500/5 hover:border-pink-500/20"
          >
            <div className="absolute top-2 right-3 text-[10px] font-black text-slate-200 group-hover:text-pink-200 transition-colors">
              #{index + 1}
            </div>

            <div className="w-14 h-14 rounded-xl bg-slate-50 overflow-hidden flex-shrink-0 border border-white shadow-sm group-hover:scale-105 transition-transform">
              <div className="relative w-full h-full">
                <Image
                  src={member.image || "/images/placeholder.png"}
                  alt={member.name || "Member image"}
                  fill
                  sizes="56px"
                  loading="lazy"
                  decoding="async"
                  onError={(e) => { e.target.srcset = ''; e.target.src = '/images/placeholder.png'; }}
                  className="object-cover bg-[#f0f0f0]"
                />
              </div>
            </div>

            <div className="flex-1 min-w-0">
              <h4 className="font-bold text-slate-900 group-hover:text-pink-600 transition-colors truncate leading-[1.4]">
                {member.name}
              </h4>
              <p className="text-[10px] text-slate-400 font-black uppercase mt-0.5 mb-1.5 leading-[1.4]">
                {member.role}
              </p>

              <div className="flex gap-1">
                {member.socials?.linkedin && (
                  <LuLinkedin className="w-3.5 h-3.5 text-slate-300" />
                )}
                {member.socials?.website && (
                  <LuGlobe className="w-3.5 h-3.5 text-slate-300" />
                )}
              </div>
            </div>

            <div className="flex flex-col gap-1 opacity-100 translate-x-0 lg:opacity-0 lg:translate-x-2 lg:group-hover:opacity-100 lg:group-hover:translate-x-0 transition-all">
              <button
                onClick={() => handleOpenModal(member)}
                className="w-11 h-11 flex items-center justify-center bg-slate-50 text-slate-400 active:text-indigo-600 active:bg-indigo-50 lg:hover:text-indigo-600 lg:hover:bg-indigo-50 rounded-xl shadow-sm transition-all"
                title="Edit Details"
              >
                <LuPencil className="w-5 h-5" />
              </button>
              <button
                onClick={() => handleDelete(member._id)}
                className="w-11 h-11 flex items-center justify-center bg-slate-50 text-slate-400 active:text-rose-600 active:bg-rose-50 lg:hover:text-rose-600 lg:hover:bg-rose-50 rounded-xl shadow-sm transition-all"
                title="Remove Member"
              >
                <LuTrash2 className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[9999] flex items-end sm:items-center justify-center p-0 sm:p-2">
          <motion.div
            initial={{ scale: 0.95, y: 50, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            className="bg-white w-full max-w-xl rounded-t-2xl sm:rounded-2xl p-4 sm:p-5 shadow-2xl relative max-h-[90vh] overflow-y-auto custom-scrollbar flex flex-col"
          >
            <div className="flex items-center justify-between mb-4 shrink-0">
              <h3 className="text-xl font-black text-slate-900 leading-[1.4]">
                {editingMember ? "Edit Member" : "Add Member"}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="w-11 h-11 flex items-center justify-center bg-slate-50 text-slate-500 rounded-full active:bg-slate-100 lg:hover:bg-slate-200 transition-all"
                aria-label="Close"
              >
                <LuX className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="flex gap-4">
                <ImageUpload
                  value={formData.image}
                  onChange={(url) => setFormData({ ...formData, image: url })}
                  label="Member Photo"
                />

                <div className="flex-1 space-y-2.5">
                  <div>
                    <label className="block text-[10px] font-black uppercase text-slate-400 mb-0.5 leading-[1.4]">
                      Full Name
                    </label>
                    <input
                      required
                      className="w-full px-3 py-2 bg-slate-50 border-2 border-transparent focus:border-pink-500/20 focus:bg-white transition-all rounded-lg outline-none text-sm font-bold leading-[1.4]"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black uppercase text-slate-400 mb-0.5 leading-[1.4]">
                      Position / Role
                    </label>
                    <input
                      required
                      className="w-full px-3 py-2 bg-slate-50 border-2 border-transparent focus:border-pink-500/20 focus:bg-white transition-all rounded-lg outline-none text-sm leading-[1.4]"
                      value={formData.role}
                      onChange={(e) =>
                        setFormData({ ...formData, role: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black uppercase text-slate-400 mb-0.5 leading-[1.4]">
                      Affiliation / Institution
                    </label>
                    <input
                      placeholder="e.g. University of Dhaka"
                      className="w-full px-3 py-2 bg-slate-50 border-2 border-transparent focus:border-pink-500/20 focus:bg-white transition-all rounded-lg outline-none text-sm leading-[1.4]"
                      value={formData.institution}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          institution: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase text-slate-400 mb-0.5 leading-[1.4]">
                  Brief Bio
                </label>
                <textarea
                  rows="2"
                  className="w-full px-3 py-2 bg-slate-50 border-2 border-transparent focus:border-pink-500/20 focus:bg-white transition-all rounded-lg outline-none text-sm resize-none border-b-slate-100 leading-[1.6]"
                  placeholder="Short description for the About page..."
                  value={formData.bio}
                  onChange={(e) =>
                    setFormData({ ...formData, bio: e.target.value })
                  }
                />
              </div>

              {type === "instructor" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                  <div>
                    <label className="block text-[10px] font-black uppercase text-slate-400 mb-0.5 leading-[1.4]">
                      Branch / Location
                    </label>
                    <select
                      className="w-full px-3 py-2 bg-slate-50 border-2 border-transparent focus:border-pink-500/20 focus:bg-white transition-all rounded-lg outline-none text-sm font-bold appearance-none cursor-pointer leading-[1.4]"
                      value={formData.branchId}
                      onChange={(e) =>
                        setFormData({ ...formData, branchId: e.target.value })
                      }
                    >
                      <option value="">Global Faculty</option>
                      {branches.map((b) => (
                        <option key={b._id} value={b._id}>
                          {b.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-black uppercase text-slate-400 mb-0.5 leading-[1.4]">
                      Expertise (Comma separated)
                    </label>
                    <input
                      placeholder="React, UI/UX, SEO"
                      className="w-full px-3 py-2 bg-slate-50 border-2 border-transparent focus:border-pink-500/20 focus:bg-white transition-all rounded-lg outline-none text-sm font-bold leading-[1.4]"
                      value={
                        Array.isArray(formData.expertise)
                          ? formData.expertise.join(", ")
                          : formData.expertise || ""
                      }
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          expertise: e.target.value
                            .split(",")
                            .map((t) => t.trim()),
                        })
                      }
                    />
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-[10px] font-black uppercase text-slate-400 mb-0.5 leading-[1.4]">
                    LinkedIn URL
                  </label>
                  <input
                    inputMode="url"
                    className="w-full px-3 py-2 bg-slate-50 border-2 border-transparent focus:border-pink-500/20 focus:bg-white transition-all rounded-lg outline-none text-sm leading-[1.4]"
                    placeholder="https://linkedin.com/in/..."
                    value={formData.socials.linkedin}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        socials: {
                          ...formData.socials,
                          linkedin: e.target.value,
                        },
                      })
                    }
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase text-slate-400 mb-0.5 leading-[1.4]">
                    Email
                  </label>
                  <input
                    inputMode="email"
                    className="w-full px-3 py-2 bg-slate-50 border-2 border-transparent focus:border-pink-500/20 focus:bg-white transition-all rounded-lg outline-none text-sm leading-[1.4]"
                    placeholder="email@example.com"
                    value={formData.socials.email}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        socials: { ...formData.socials, email: e.target.value },
                      })
                    }
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-[10px] font-black uppercase text-slate-400 mb-0.5 leading-[1.4]">
                    Website
                  </label>
                  <input
                    inputMode="url"
                    className="w-full px-3 py-2 bg-slate-50 border-2 border-transparent focus:border-pink-500/20 focus:bg-white transition-all rounded-lg outline-none text-sm leading-[1.4]"
                    placeholder="https://yourpage.com"
                    value={formData.socials.website}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        socials: {
                          ...formData.socials,
                          website: e.target.value,
                        },
                      })
                    }
                  />
                </div>
              </div>

              <div className="flex gap-2 pt-3 pb-2 sm:pb-0 sticky bottom-0 bg-white z-10 border-t border-slate-50 sm:border-none mt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 py-2 font-black text-slate-400 hover:text-slate-600 transition-colors uppercase text-xs leading-[1.4]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-[2] py-2.5 bg-slate-900 text-white font-black rounded-xl shadow-xl shadow-slate-900/20 hover:bg-black transition-all flex items-center justify-center gap-1.5 leading-[1.4]"
                >
                  <LuCheck className="w-5 h-5" />
                  {editingMember ? "Update Member" : "Save Member"}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
