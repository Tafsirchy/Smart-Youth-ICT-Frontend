"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  LuPlus,
  LuPencil,
  LuTrash2,
  LuBadgeCheck,
  LuImage,
  LuSearch,
  LuCheck,
  LuArrowRight,
  LuX,
} from "react-icons/lu";
import api from "@/lib/api";
import toast from "react-hot-toast";
import ImageUpload from "@/components/ui/ImageUpload";

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
    company: "",
    location: "",
    storyType: "text", // 'text' or 'video'
    videoUrl: "",
    videoThumbnail: "",
    isPublished: true,
    order: 0,
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [sRes, cRes] = await Promise.all([
        api.get("/cms/stories/admin"),
        api.get("/courses"),
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
      setFormData({
        ...story,
        courseId: story.courseId?._id || story.courseId,
      });
    } else {
      setEditingStory(null);
      setFormData({
        studentName: "",
        studentAvatar: "",
        courseId: "",
        resultSummary: "",
        description: "",
        proofImage: "",
        company: "",
        location: "",
        storyType: "text",
        videoUrl: "",
        videoThumbnail: "",
        isPublished: true,
        order: stories.length,
      });
    }
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const submissionData = {
      ...formData,
      courseId: formData.courseId === "" ? null : formData.courseId,
    };

    try {
      if (editingStory) {
        await api.put(`/cms/stories/${editingStory._id}`, submissionData);
        toast.success("Story updated");
      } else {
        await api.post("/cms/stories", submissionData);
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
    <div className="py-4 sm:py-5">
      <div className="flex justify-between items-center gap-4 mb-6 sm:mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mb-1 leading-[1.4]">
            Student Success Stories
          </h1>
          <p className="text-sm sm:text-base text-slate-500 leading-[1.6]">
            Highlight your students' achievements and career results.
          </p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="bg-brand-green text-white px-4 py-2.5 rounded-xl font-bold flex items-center justify-center gap-1.5 hover:bg-green-700 transition-all shadow-lg shadow-green-600/20 shrink-0"
        >
          <LuPlus className="w-5 h-5 shrink-0" />
          <span className="hidden sm:inline">Add Success Story</span>
        </button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4">
        {stories.map((story, index) => (
          <motion.div
            key={story._id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            className="bg-white rounded-2xl border border-slate-100 overflow-hidden group hover:shadow-2xl hover:shadow-brand-green/10 transition-all flex flex-col"
          >
            {/* Proof Preview Header */}
            <div className="h-40 sm:h-48 bg-slate-50 relative overflow-hidden group-hover:h-44 sm:group-hover:h-52 transition-all duration-500">
              {story.proofImage ? (
                <Image
                  src={story.proofImage}
                  alt="Proof"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                  loading="lazy"
                  decoding="async"
                  onError={(e) => { e.target.srcset = ''; e.target.src = '/images/placeholder.png'; }}
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-slate-300 gap-2">
                  <LuImage className="w-10 h-10 stroke-[1.5]" />
                  <span className="text-[10px] font-black uppercase tracking-widest">
                    No Proof Image
                  </span>
                </div>
              )}

              {/* Status Badge */}
              <div className="absolute top-3 left-3 sm:top-4 sm:left-4">
                <div
                  className={`px-3 py-1 rounded-md text-[10px] font-black uppercase tracking-widest backdrop-blur-md shadow-sm flex items-center gap-1.5 ${story.isPublished ? "bg-white/90 text-green-600" : "bg-slate-900/80 text-white"}`}
                >
                  <div
                    className={`w-1.5 h-1.5 rounded-full ${story.isPublished ? "bg-green-500 animate-pulse" : "bg-slate-400"}`}
                  />
                  {story.isPublished ? "Published" : "Draft"}
                </div>
              </div>
            </div>

            <div className="p-4 sm:p-5 flex-1 flex flex-col">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-slate-50 border-2 border-white shadow-sm overflow-hidden flex-shrink-0 group-hover:rotate-3 transition-transform">
                  {story.studentAvatar ? (
                    <Image
                      src={story.studentAvatar}
                      alt={story.studentName || "Student avatar"}
                      width={48}
                      height={48}
                      loading="lazy"
                      decoding="async"
                      onError={(e) => { e.target.srcset = ''; e.target.src = '/images/placeholder.png'; }}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-indigo-50 text-indigo-600 font-black text-lg">
                      {story.studentName[0]}
                    </div>
                  )}
                </div>
                <div className="min-w-0">
                  <h4 className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors truncate leading-[1.4]">
                    {story.studentName}
                  </h4>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-[1.4] truncate">
                    {story.courseId?.title?.en || "Course Grad"}
                  </p>
                </div>
              </div>

              <div className="bg-rose-50/50 p-3 rounded-xl mb-4 relative group-hover:bg-rose-50 transition-colors">
                <p className="text-rose-600 font-black text-sm relative z-10 leading-[1.4]">
                  “{story.resultSummary}”
                </p>
              </div>

              <div className="mt-auto pt-3 border-t border-slate-50 flex justify-between items-center">
                <div className="flex gap-1.5">
                  <button
                    onClick={() => handleOpenModal(story)}
                    className="w-11 h-11 flex items-center justify-center bg-slate-50 text-slate-400 active:bg-indigo-50 active:text-indigo-600 lg:hover:text-indigo-600 lg:hover:bg-indigo-50 rounded-xl transition-all shrink-0"
                    aria-label="Edit Story"
                  >
                    <LuPencil className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(story._id)}
                    className="w-11 h-11 flex items-center justify-center bg-slate-50 text-slate-400 active:bg-rose-50 active:text-rose-600 lg:hover:text-rose-600 lg:hover:bg-rose-50 rounded-xl transition-all shrink-0"
                    aria-label="Delete Story"
                  >
                    <LuTrash2 className="w-4 h-4" />
                  </button>
                </div>

                <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest leading-[1.4]">
                  #{index + 1} System ID
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-0 sm:p-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white w-full max-w-xl rounded-t-2xl sm:rounded-2xl p-4 sm:p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto flex flex-col custom-scrollbar"
          >
            <div className="flex items-center justify-between mb-4 shrink-0">
              <h3 className="text-xl font-black text-slate-900 leading-[1.4]">
                {editingStory ? "Update Achievement" : "Add Student Success"}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="w-11 h-11 flex items-center justify-center bg-slate-50 text-slate-500 rounded-full active:bg-slate-100 lg:hover:bg-slate-200 transition-all shrink-0"
                aria-label="Close"
              >
                <LuX className="w-5 h-5" />
              </button>
            </div>

            <div className="flex bg-slate-100 p-1 rounded-xl mb-4 w-full sm:w-fit shrink-0">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, storyType: "text" })}
                className={`flex-1 sm:flex-none px-4 py-2 rounded-lg text-[10px] font-black uppercase transition-all leading-[1.4] ${formData.storyType === "text" ? "bg-white text-indigo-600 shadow-sm" : "text-slate-400 active:text-slate-600 lg:hover:text-slate-600"}`}
              >
                Standard Story
              </button>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, storyType: "video" })}
                className={`flex-1 sm:flex-none px-4 py-2 rounded-lg text-[10px] font-black uppercase transition-all leading-[1.4] ${formData.storyType === "video" ? "bg-white text-rose-600 shadow-sm" : "text-slate-400 active:text-slate-600 lg:hover:text-slate-600"}`}
              >
                Video Success
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex flex-col md:flex-row gap-4">
                <ImageUpload
                  value={formData.studentAvatar}
                  onChange={(url) =>
                    setFormData({ ...formData, studentAvatar: url })
                  }
                  label="Student Avatar"
                />
                <div className="flex-1 space-y-3">
                  <div>
                    <label className="block text-[10px] font-black uppercase text-slate-400 mb-0.5 leading-[1.4]">
                      Student Name
                    </label>
                    <input
                      required
                      className="w-full px-3 py-2 bg-slate-50 border-2 border-transparent focus:border-indigo-500/20 focus:bg-white transition-all rounded-lg outline-none text-sm font-bold leading-[1.4]"
                      value={formData.studentName}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          studentName: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black uppercase text-slate-400 mb-0.5 leading-[1.4]">
                      Impact Title
                    </label>
                    <input
                      required
                      placeholder="e.g. Earned $500 on Fiverr"
                      className="w-full px-3 py-2 bg-slate-50 border-2 border-transparent focus:border-rose-500/20 focus:bg-white transition-all rounded-lg outline-none text-sm font-bold text-rose-600 leading-[1.4]"
                      value={formData.resultSummary}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          resultSummary: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-black uppercase text-slate-400 mb-0.5 leading-[1.4]">
                    Target Course
                  </label>
                  <select
                    required
                    className="w-full px-3 py-2 bg-slate-50 border-2 border-transparent focus:border-indigo-500/20 focus:bg-white transition-all rounded-lg outline-none text-sm font-bold leading-[1.4]"
                    value={formData.courseId}
                    onChange={(e) =>
                      setFormData({ ...formData, courseId: e.target.value })
                    }
                  >
                    <option value="">Select Course</option>
                    {courses.map((c) => (
                      <option key={c._id} value={c._id}>
                        {c.title?.en || c.title}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex items-center pt-1 sm:pt-4">
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <input
                      type="checkbox"
                      className="w-4 h-4 rounded border-2 border-slate-200 text-indigo-600 focus:ring-transparent transition-all"
                      checked={formData.isPublished}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          isPublished: e.target.checked,
                        })
                      }
                    />
                    <span className="text-[10px] font-black uppercase text-slate-500 group-hover:text-indigo-600 transition-colors leading-[1.4]">
                      Visible on Site
                    </span>
                  </label>
                </div>
              </div>

              {formData.storyType === "text" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <label className="block text-[10px] font-black uppercase text-slate-400 mb-0.5 leading-[1.4]">
                    Detailed Description
                  </label>
                  <textarea
                    rows="3"
                    required
                    className="w-full px-3 py-2.5 bg-slate-50 border-2 border-transparent focus:border-indigo-500/20 focus:bg-white transition-all rounded-xl outline-none text-sm resize-none leading-[1.6]"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                  />
                </motion.div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-black uppercase text-slate-400 mb-0.5 leading-[1.4]">
                    Company / Workplace
                  </label>
                  <input
                    placeholder="e.g. Google, Upwork"
                    className="w-full px-3 py-2 bg-slate-50 border-2 border-transparent focus:border-indigo-500/20 focus:bg-white transition-all rounded-lg outline-none text-sm font-bold leading-[1.4]"
                    value={formData.company}
                    onChange={(e) =>
                      setFormData({ ...formData, company: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase text-slate-400 mb-0.5 leading-[1.4]">
                    Location
                  </label>
                  <input
                    placeholder="e.g. Dhaka, Remote"
                    className="w-full px-3 py-2 bg-slate-50 border-2 border-transparent focus:border-indigo-500/20 focus:bg-white transition-all rounded-lg outline-none text-sm leading-[1.4]"
                    value={formData.location}
                    onChange={(e) =>
                      setFormData({ ...formData, location: e.target.value })
                    }
                  />
                </div>
              </div>

              {formData.storyType === "video" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-slate-50"
                >
                  <div>
                    <label className="block text-[10px] font-black uppercase text-slate-400 mb-0.5 leading-[1.4]">
                      Video Story URL
                    </label>
                    <input
                      required
                      placeholder="YouTube link"
                      className="w-full px-3 py-2 bg-slate-50 border-2 border-transparent focus:border-indigo-500/20 focus:bg-white transition-all rounded-lg outline-none text-sm leading-[1.4]"
                      value={formData.videoUrl}
                      onChange={(e) =>
                        setFormData({ ...formData, videoUrl: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black uppercase text-slate-400 mb-0.5 leading-[1.4]">
                      Video Thumbnail Upload
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      className="w-full px-3 py-1.5 bg-slate-50 border-2 border-transparent focus:border-indigo-500/20 focus:bg-white transition-all rounded-lg outline-none text-sm"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const objectUrl = URL.createObjectURL(file);
                          setFormData({
                            ...formData,
                            videoThumbnail: objectUrl,
                          });
                        }
                      }}
                    />
                    {formData.videoThumbnail && (
                      <div className="mt-2">
                        <img
                          src={formData.videoThumbnail}
                          alt="Preview"
                          loading="lazy"
                          decoding="async"
                          onError={(e) => { e.target.src = '/images/placeholder.png'; }}
                          className="rounded-lg object-cover"
                          style={{ maxWidth: '100%', maxHeight: '160px' }}
                        />
                      </div>
                    )}
                  </div>
                </motion.div>
              )}

              <ImageUpload
                value={formData.proofImage}
                onChange={(url) =>
                  setFormData({ ...formData, proofImage: url })
                }
                label="Achievement Proof (Certificate, Chat, Result)"
              />

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
                  className="flex-[2] py-2.5 bg-slate-900 text-white font-black rounded-xl shadow-xl shadow-slate-900/10 hover:bg-black transition-all flex items-center justify-center gap-1.5 leading-[1.4]"
                >
                  <LuCheck className="w-5 h-5" />
                  {editingStory ? "Update Story" : "Publish Achievement"}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
