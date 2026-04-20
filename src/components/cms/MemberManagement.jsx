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

      <div className="grid md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {members.map((member, index) => (
          <motion.div
            key={member._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="group relative bg-white p-5 rounded-[2.5rem] border border-slate-100 flex items-center gap-5 transition-all hover:shadow-2xl hover:shadow-pink-500/5 hover:border-pink-500/20"
          >
            {/* Index/Order Badge */}
            <div className="absolute top-4 right-6 text-[10px] font-black text-slate-200 group-hover:text-pink-200 transition-colors">
              #{index + 1}
            </div>

            <div className="w-20 h-20 rounded-[1.5rem] bg-slate-50 overflow-hidden flex-shrink-0 border-2 border-white shadow-sm group-hover:scale-105 transition-transform">
              <div className="relative w-full h-full">
                <Image
                  src={member.image || "/images/placeholder.png"}
                  alt={member.name || "Member image"}
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </div>
            </div>

            <div className="flex-1 min-w-0">
              <h4 className="font-bold text-slate-900 group-hover:text-pink-600 transition-colors truncate">
                {member.name}
              </h4>
              <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-1 mb-3">
                {member.role}
              </p>

              <div className="flex gap-2">
                {member.socials?.linkedin && (
                  <LuLinkedin className="w-3.5 h-3.5 text-slate-300" />
                )}
                {member.socials?.website && (
                  <LuGlobe className="w-3.5 h-3.5 text-slate-300" />
                )}
              </div>
            </div>

            {/* Actions Menu */}
            <div className="flex flex-col gap-2 opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all">
              <button
                onClick={() => handleOpenModal(member)}
                className="p-2.5 bg-slate-50 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl shadow-sm transition-all"
                title="Edit Details"
              >
                <LuPencil className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleDelete(member._id)}
                className="p-2.5 bg-slate-50 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl shadow-sm transition-all"
                title="Remove Member"
              >
                <LuTrash2 className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="bg-white w-full max-w-xl rounded-[2.5rem] p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto"
          >
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-6 right-6 p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-full transition-all"
            >
              <LuX className="w-5 h-5" />
            </button>
            <h3 className="text-2xl font-black text-slate-900 mb-6">
              {editingMember ? "Edit Member" : "Add Member"}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="flex gap-8">
                <ImageUpload
                  value={formData.image}
                  onChange={(url) => setFormData({ ...formData, image: url })}
                  label="Member Photo"
                />

                <div className="flex-1 space-y-4">
                  <div>
                    <label className="block text-[10px] font-black uppercase text-slate-400 mb-1">
                      Full Name
                    </label>
                    <input
                      required
                      className="w-full px-4 py-3 bg-slate-50 border-2 border-transparent focus:border-pink-500/20 focus:bg-white transition-all rounded-xl outline-none text-sm font-bold"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black uppercase text-slate-400 mb-1">
                      Position / Role
                    </label>
                    <input
                      required
                      className="w-full px-4 py-3 bg-slate-50 border-2 border-transparent focus:border-pink-500/20 focus:bg-white transition-all rounded-xl outline-none text-sm"
                      value={formData.role}
                      onChange={(e) =>
                        setFormData({ ...formData, role: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black uppercase text-slate-400 mb-1">
                      Affiliation / Institution
                    </label>
                    <input
                      placeholder="e.g. University of Dhaka"
                      className="w-full px-4 py-3 bg-slate-50 border-2 border-transparent focus:border-pink-500/20 focus:bg-white transition-all rounded-xl outline-none text-sm"
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
                <label className="block text-[10px] font-black uppercase text-slate-400 mb-1">
                  Brief Bio
                </label>
                <textarea
                  rows="2"
                  className="w-full px-4 py-3 bg-slate-50 border-2 border-transparent focus:border-pink-500/20 focus:bg-white transition-all rounded-xl outline-none text-sm resize-none border-b-slate-100"
                  placeholder="Short description for the About page..."
                  value={formData.bio}
                  onChange={(e) =>
                    setFormData({ ...formData, bio: e.target.value })
                  }
                />
              </div>

              {type === "instructor" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-black uppercase text-slate-400 mb-1">
                      Branch / Location
                    </label>
                    <select
                      className="w-full px-4 py-3 bg-slate-50 border-2 border-transparent focus:border-pink-500/20 focus:bg-white transition-all rounded-xl outline-none text-sm font-bold appearance-none cursor-pointer"
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
                    <label className="block text-[10px] font-black uppercase text-slate-400 mb-1">
                      Expertise (Comma separated)
                    </label>
                    <input
                      placeholder="React, UI/UX, SEO"
                      className="w-full px-4 py-3 bg-slate-50 border-2 border-transparent focus:border-pink-500/20 focus:bg-white transition-all rounded-xl outline-none text-sm font-bold"
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-black uppercase text-slate-400 mb-1">
                    LinkedIn URL
                  </label>
                  <input
                    className="w-full px-4 py-3 bg-slate-50 border-2 border-transparent focus:border-pink-500/20 focus:bg-white transition-all rounded-xl outline-none text-sm"
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
                  <label className="block text-[10px] font-black uppercase text-slate-400 mb-1">
                    Email
                  </label>
                  <input
                    className="w-full px-4 py-3 bg-slate-50 border-2 border-transparent focus:border-pink-500/20 focus:bg-white transition-all rounded-xl outline-none text-sm"
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
                  <label className="block text-[10px] font-black uppercase text-slate-400 mb-1">
                    Website
                  </label>
                  <input
                    className="w-full px-4 py-3 bg-slate-50 border-2 border-transparent focus:border-pink-500/20 focus:bg-white transition-all rounded-xl outline-none text-sm"
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

              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 py-4 font-black text-slate-400 hover:text-slate-600 transition-colors uppercase tracking-widest text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-[2] py-4 bg-slate-900 text-white font-black rounded-2xl shadow-xl shadow-slate-900/20 hover:bg-black transition-all flex items-center justify-center gap-2"
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
