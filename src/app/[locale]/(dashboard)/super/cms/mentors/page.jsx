"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  LuSearch,
  LuPlus,
  LuPencil,
  LuTrash2,
  LuStar,
  LuUser,
  LuCheck,
  LuX,
  LuMail,
  LuLock,
  LuBriefcase,
  LuCpu,
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
    badge: "",
    experience: "",
    socials: { linkedin: "", twitter: "", website: "" },
    isFeaturedMentor: false,
    isActive: true,
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
        badge: mentor.badge || "",
        experience: mentor.experience || "",
        socials: mentor.socials || { linkedin: "", twitter: "", website: "" },
        isFeaturedMentor: mentor.isFeaturedMentor || false,
        isActive: mentor.isActive ?? true,
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
        badge: "",
        experience: "",
        socials: { linkedin: "", twitter: "", website: "" },
        isFeaturedMentor: false,
        isActive: true,
      });
    }
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const submissionData = {
      ...formData,
      expertise: Array.isArray(formData.expertise)
        ? formData.expertise
        : (formData.expertise || "").split(",").map((t) => t.trim()),
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
      await api.patch(`/cms/mentors/${id}/toggle`, {
        isFeaturedMentor: !currentStatus,
      });
      toast.success(
        currentStatus ? "Removed from Featured" : "Marked as Featured",
      );
      fetchMentors();
    } catch (err) {
      toast.error("Toggle failed");
    }
  };

  const handleDelete = async (id) => {
    if (
      !window.confirm(
        "Deactivate this instructor? This will hide them from the platform.",
      )
    )
      return;
    try {
      await api.delete(`/cms/mentors/${id}`);
      toast.success("Instructor deactivated");
      fetchMentors();
    } catch (err) {
      toast.error("Action failed");
    }
  };

  const filteredMentors = mentors.filter(
    (m) =>
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.email.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="py-4 sm:py-5">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 sm:mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mb-1 leading-[1.4]">
            Mentor Management
          </h1>
          <p className="text-sm sm:text-base text-slate-500 leading-[1.5]">
            Manage instructor profiles and their "About Us" marketing bio.
          </p>
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <div className="relative flex-1 md:w-80">
            <LuSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search instructors..."
              className="w-full pl-9 pr-3 py-2.5 bg-white border border-slate-100 rounded-xl shadow-sm focus:ring-2 focus:ring-rose-500/20 outline-none text-sm transition-all"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <button
            onClick={() => handleOpenModal()}
            className="bg-slate-900 text-white px-4 py-2.5 rounded-xl font-bold flex items-center justify-center gap-1.5 hover:bg-black transition-all shadow-xl shadow-slate-900/10 shrink-0"
          >
            <LuPlus className="w-5 h-5" />
            Add Instructor
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
        <AnimatePresence mode="popLayout">
          {filteredMentors.map((mentor, index) => (
            <motion.div
              key={mentor._id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: index * 0.03 }}
              className={`bg-white p-4 sm:p-5 rounded-2xl border flex flex-col items-center text-center relative group transition-all hover:shadow-2xl hover:shadow-slate-200/50 ${mentor.isFeaturedMentor ? "border-amber-200 ring-2 ring-amber-500/5" : "border-slate-100"}`}
            >
              {/* Status Ribbons */}
              {mentor.isFeaturedMentor && (
                <div className="absolute top-3 left-4">
                  <div className="bg-amber-500 text-white p-1.5 rounded-lg shadow-lg shadow-amber-500/20">
                    <LuStar className="w-3 h-3 fill-current" />
                  </div>
                </div>
              )}
              {!mentor.isActive && (
                <div className="absolute top-3 right-4">
                  <span className="text-[10px] font-black uppercase tracking-normal bg-slate-100 text-slate-400 px-2 py-0.5 rounded-md leading-[1.4]">
                    Inactive
                  </span>
                </div>
              )}

              <div className="w-16 h-16 rounded-2xl bg-slate-50 border-2 border-white shadow-sm mb-3 overflow-hidden group-hover:scale-105 transition-transform">
                <Image
                  src={mentor.avatar || "/images/placeholder.png"}
                  alt={mentor.name || "Mentor avatar"}
                  width={64}
                  height={64}
                  loading="lazy"
                  decoding="async"
                  onError={(e) => { e.target.srcset = ''; e.target.src = '/images/placeholder.png'; }}
                  className="w-full h-full object-cover bg-[#f0f0f0]"
                />
              </div>

              <h4 className="font-bold text-slate-900 truncate w-full leading-[1.4]">
                {mentor.name}
              </h4>
              <p className="text-[10px] font-black uppercase text-slate-400 tracking-normal mb-3 truncate w-full leading-[1.4]">
                {mentor.email}
              </p>

              <div className="flex flex-wrap justify-center gap-1 mb-4">
                {(mentor.expertise || []).slice(0, 3).map((e) => (
                  <span
                    key={e}
                    className="px-2 py-0.5 bg-slate-50 text-slate-500 text-[10px] font-bold rounded-lg border border-slate-100 uppercase tracking-normal leading-[1.4]"
                  >
                    {e}
                  </span>
                ))}
              </div>

              <div className="flex gap-2 w-full mt-auto pt-3 border-t border-slate-50">
                <button
                  onClick={() => handleOpenModal(mentor)}
                  className="flex-1 h-11 flex items-center justify-center bg-slate-50 text-slate-400 active:bg-indigo-50 active:text-indigo-600 lg:hover:text-indigo-600 lg:hover:bg-indigo-50 rounded-xl font-bold text-[10px] uppercase tracking-normal transition-all leading-[1.4]"
                >
                  Edit Profile
                </button>
                <button
                  onClick={() =>
                    toggleFeatured(mentor._id, mentor.isFeaturedMentor)
                  }
                  className={`w-11 h-11 shrink-0 flex items-center justify-center rounded-xl transition-all ${mentor.isFeaturedMentor ? "bg-amber-50 text-amber-500 active:bg-amber-100 lg:hover:bg-amber-100" : "bg-slate-50 text-slate-300 active:text-amber-500 lg:hover:text-amber-500"}`}
                  title={
                    mentor.isFeaturedMentor ? "Unfeature" : "Mark as Featured"
                  }
                >
                  <LuStar
                    className={`w-4 h-4 ${mentor.isFeaturedMentor ? "fill-current" : ""}`}
                  />
                </button>
                <button
                  onClick={() => handleDelete(mentor._id)}
                  className="w-11 h-11 shrink-0 flex items-center justify-center bg-slate-50 text-slate-300 active:text-rose-600 active:bg-rose-50 lg:hover:text-rose-600 lg:hover:bg-rose-50 rounded-xl transition-all"
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
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[999] flex items-end sm:items-center justify-center p-0 sm:p-2">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="bg-white w-full max-w-2xl rounded-t-2xl sm:rounded-2xl p-4 sm:p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto flex flex-col custom-scrollbar"
          >
            <div className="flex items-center justify-between mb-4 shrink-0">
              <h3 className="text-xl font-black text-slate-900 leading-[1.4]">
                {editingMentor ? "Edit Profile" : "Add Mentor"}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="w-11 h-11 flex items-center justify-center bg-slate-50 text-slate-500 rounded-full active:bg-slate-100 lg:hover:bg-slate-200 transition-all"
                aria-label="Close"
              >
                <LuX className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex flex-col md:flex-row gap-4">
                <ImageUpload
                  value={formData.avatar}
                  onChange={(url) => setFormData({ ...formData, avatar: url })}
                  label="Profile Photo"
                />

                <div className="flex-1 space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-black uppercase text-slate-400 mb-0.5 leading-[1.4]">
                        Full Name
                      </label>
                      <div className="relative">
                        <LuUser className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300 w-4 h-4" />
                        <input
                          required
                          className="w-full pl-9 pr-3 py-2 bg-slate-50 border-2 border-transparent focus:border-indigo-500/20 focus:bg-white transition-all rounded-lg outline-none text-sm font-bold leading-[1.4]"
                          value={formData.name}
                          onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                          }
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[10px] font-black uppercase text-slate-400 mb-0.5 leading-[1.4]">
                        Email Address
                      </label>
                      <div className="relative">
                        <LuMail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300 w-4 h-4" />
                        <input
                          required
                          type="email"
                          inputMode="email"
                          className="w-full pl-9 pr-3 py-2 bg-slate-50 border-2 border-transparent focus:border-indigo-500/20 focus:bg-white transition-all rounded-lg outline-none text-sm font-bold leading-[1.4]"
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                        />
                      </div>
                    </div>
                  </div>

                  {!editingMentor && (
                    <div>
                      <label className="block text-[10px] font-black uppercase text-slate-400 mb-0.5 leading-[1.4]">
                        Account Password
                      </label>
                      <div className="relative">
                        <LuLock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300 w-4 h-4" />
                        <input
                          required
                          type="password"
                          placeholder="Min. 8 characters"
                          className="w-full pl-9 pr-3 py-2 bg-slate-50 border-2 border-transparent focus:border-rose-500/20 focus:bg-white transition-all rounded-lg outline-none text-sm font-bold leading-[1.4]"
                          value={formData.password}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              password: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>
                  )}

                  <div>
                    <label className="block text-[10px] font-black uppercase text-slate-400 mb-0.5 leading-[1.4]">
                      Expertise Tags (Comma separated)
                    </label>
                    <div className="relative">
                      <LuCpu className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300 w-4 h-4" />
                      <input
                        placeholder="e.g. React, UI/UX, Backend"
                        className="w-full pl-9 pr-3 py-2 bg-slate-50 border-2 border-transparent focus:border-indigo-500/20 focus:bg-white transition-all rounded-lg outline-none text-sm font-bold leading-[1.4]"
                        value={
                          Array.isArray(formData.expertise)
                            ? formData.expertise.join(", ")
                            : formData.expertise
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

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-black uppercase text-slate-400 mb-0.5 leading-[1.4]">
                        Badge (e.g. Expert)
                      </label>
                      <input
                        className="w-full px-3 py-2 bg-slate-50 border-2 border-transparent focus:border-indigo-500/20 focus:bg-white transition-all rounded-lg outline-none text-sm font-bold leading-[1.4]"
                        value={formData.badge}
                        onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black uppercase text-slate-400 mb-0.5 leading-[1.4]">
                        Experience
                      </label>
                      <input
                        className="w-full px-3 py-2 bg-slate-50 border-2 border-transparent focus:border-indigo-500/20 focus:bg-white transition-all rounded-lg outline-none text-sm font-bold leading-[1.4]"
                        value={formData.experience}
                        onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-black uppercase text-slate-400 mb-0.5 leading-[1.4]">
                        LinkedIn
                      </label>
                      <input
                        inputMode="url"
                        placeholder="https://linkedin.com/..."
                        className="w-full px-3 py-2 bg-slate-50 border-2 border-transparent focus:border-indigo-500/20 focus:bg-white transition-all rounded-lg outline-none text-sm font-bold leading-[1.4]"
                        value={formData.socials?.linkedin || ""}
                        onChange={(e) => setFormData({ ...formData, socials: { ...formData.socials, linkedin: e.target.value } })}
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black uppercase text-slate-400 mb-0.5 leading-[1.4]">
                        Twitter
                      </label>
                      <input
                        inputMode="url"
                        placeholder="https://twitter.com/..."
                        className="w-full px-3 py-2 bg-slate-50 border-2 border-transparent focus:border-indigo-500/20 focus:bg-white transition-all rounded-lg outline-none text-sm font-bold leading-[1.4]"
                        value={formData.socials?.twitter || ""}
                        onChange={(e) => setFormData({ ...formData, socials: { ...formData.socials, twitter: e.target.value } })}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-black uppercase text-slate-400 mb-0.5 flex items-center gap-1 leading-[1.4]">
                    <LuBriefcase className="w-3 h-3" /> Standard Profile Bio
                  </label>
                  <textarea
                    rows="2"
                    className="w-full px-3 py-2.5 bg-slate-50 border-2 border-transparent focus:border-indigo-500/20 focus:bg-white transition-all rounded-xl outline-none text-sm resize-none leading-[1.6]"
                    placeholder="Short professional summary..."
                    value={formData.bio}
                    onChange={(e) =>
                      setFormData({ ...formData, bio: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase text-amber-500 mb-0.5 flex items-center gap-1 leading-[1.4]">
                    <LuStar className="w-3 h-3" /> About Us "Marketing" Bio
                  </label>
                  <textarea
                    rows="2"
                    className="w-full px-3 py-2.5 bg-amber-50/30 border-2 border-transparent focus:border-amber-500/20 focus:bg-amber-50/50 transition-all rounded-xl outline-none text-sm resize-none leading-[1.6]"
                    placeholder="Exclusive bio for featured showcase..."
                    value={formData.featuredBio}
                    onChange={(e) =>
                      setFormData({ ...formData, featuredBio: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                <div className="flex items-center gap-3">
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <input
                      type="checkbox"
                      className="w-4 h-4 rounded border-2 border-slate-200 text-amber-500 focus:ring-transparent transition-all"
                      checked={formData.isFeaturedMentor}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          isFeaturedMentor: e.target.checked,
                        })
                      }
                    />
                    <span className="text-[10px] font-black uppercase text-slate-500 group-hover:text-amber-500 transition-colors leading-[1.4]">
                      Show as Featured Mentor
                    </span>
                  </label>
                </div>
                <div className="flex items-center gap-3 border-l border-slate-200 pl-3">
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <input
                      type="checkbox"
                      className="w-4 h-4 rounded border-2 border-slate-200 text-indigo-600 focus:ring-transparent transition-all"
                      checked={formData.isActive}
                      onChange={(e) =>
                        setFormData({ ...formData, isActive: e.target.checked })
                      }
                    />
                    <span className="text-[10px] font-black uppercase text-slate-500 group-hover:text-indigo-600 transition-colors leading-[1.4]">
                      Active Instructor
                    </span>
                  </label>
                </div>
              </div>

              <div className="flex gap-2 pt-4 pb-2 sm:pb-0 sticky bottom-0 bg-white z-10 border-t border-slate-50 sm:border-none mt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 py-2.5 font-black text-slate-400 hover:text-slate-600 uppercase tracking-normal text-[10px] transition-colors leading-[1.4]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-[2] py-2.5 bg-slate-900 text-white font-black rounded-xl shadow-xl shadow-slate-900/10 hover:bg-black transition-all flex items-center justify-center gap-1.5 leading-[1.4]"
                >
                  <LuCheck className="w-5 h-5" />
                  {editingMentor ? "Update Mentor" : "Save Instructor"}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {loading && mentors.length === 0 && (
        <div className="py-12 text-center flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-slate-100 border-t-indigo-600 rounded-full animate-spin mb-3" />
          <p className="text-slate-400 font-bold uppercase tracking-normal text-[10px] leading-[1.4]">
            Syncing instructors...
          </p>
        </div>
      )}
    </div>
  );
}
