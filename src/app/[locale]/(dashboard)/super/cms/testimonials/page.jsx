"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  LuCheck,
  LuX,
  LuMessageSquare,
  LuStar,
  LuEye,
  LuPlus,
  LuPencil,
  LuTrash2,
} from "react-icons/lu";
import api from "@/lib/api";
import toast from "react-hot-toast";
import ImageUpload from "@/components/ui/ImageUpload";

export default function TestimonialManagementPage() {
  const [testimonials, setTestimonials] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState(null);
  const [formData, setFormData] = useState({
    user: { name: "", avatar: "" },
    course: "", // ID
    rating: 5,
    text: "",
    incomeProof: "",
    isApproved: true,
    moderationStatus: "approved",
    isManual: false,
    manualName: "",
    manualAvatar: "",
    manualCourse: "",
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [tRes, cRes] = await Promise.all([
        api.get("/cms/testimonials"),
        api.get("/courses"),
      ]);
      setTestimonials(tRes.data.data);
      setCourses(cRes.data.data);
    } catch (err) {
      toast.error("Failed to load testimonials");
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (t = null) => {
    if (t) {
      setEditingTestimonial(t);
      setFormData({
        ...t,
        user: { name: t.user?.name || "", avatar: t.user?.avatar || "" },
        course: t.course?._id || t.course || "",
      });
    } else {
      setEditingTestimonial(null);
      setFormData({
        user: { name: "", avatar: "" },
        course: "",
        rating: 5,
        text: "",
        incomeProof: "",
        isApproved: true,
        moderationStatus: "approved",
        isManual: true,
        manualName: "",
        manualAvatar: "",
        manualCourse: "",
      });
    }
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const submissionData = {
      ...formData,
      course: formData.course === "" ? null : formData.course,
      user: formData.user?.name === "" ? null : formData.user,
    };

    try {
      if (editingTestimonial) {
        await api.put(
          `/cms/testimonials/${editingTestimonial._id}`,
          submissionData,
        );
        toast.success("Testimonial updated");
      } else {
        await api.post("/cms/testimonials", submissionData);
        toast.success("Testimonial added manually");
      }
      setShowModal(false);
      fetchData();
    } catch (err) {
      toast.error("Operation failed");
    }
  };

  const updateStatus = async (id, status, isApproved) => {
    try {
      await api.patch(`/cms/testimonials/${id}/status`, {
        moderationStatus: status,
        isApproved,
      });
      toast.success(`Testimonial ${status}`);
      fetchData();
    } catch (err) {
      toast.error("Update failed");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Permanently delete this testimonial?")) return;
    try {
      await api.delete(`/cms/testimonials/${id}`);
      toast.success("Deleted successfully");
      fetchData();
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-12">
        <div>
          <h1 className="text-3xl font-black text-slate-900 mb-2">
            Testimonial Moderation
          </h1>
          <p className="text-slate-500">
            Review, approve, or manually add customer reviews for the marketing
            site.
          </p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="bg-slate-900 text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 hover:bg-black transition-all shadow-xl shadow-slate-900/10"
        >
          <LuPlus className="w-5 h-5" />
          Add Manual Testimonial
        </button>
      </div>

      <div className="space-y-6">
        <AnimatePresence mode="popLayout">
          {testimonials.map((t, index) => (
            <motion.div
              key={t._id}
              layout
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ delay: index * 0.05 }}
              className={`bg-white p-6 rounded-[2.5rem] border flex flex-col md:flex-row gap-8 items-start transition-all hover:shadow-2xl hover:shadow-slate-200/50 ${t.isApproved ? "border-slate-100" : "border-amber-200 bg-amber-50/10"}`}
            >
              <div className="flex items-center gap-4 w-full md:w-64 shrink-0">
                <div className="w-14 h-14 rounded-2xl bg-white shadow-sm border border-slate-100 p-0.5 flex-shrink-0">
                  <Image
                    src={
                      (t.isManual ? t.manualAvatar : t.user?.avatar) ||
                      "/images/placeholder.png"
                    }
                    alt={
                      (t.isManual ? t.manualName : t.user?.name) ||
                      "Testimonial author"
                    }
                    width={56}
                    height={56}
                    className="w-full h-full rounded-[1.25rem] object-cover"
                  />
                </div>
                <div className="min-w-0">
                  <h4 className="font-bold text-slate-900 truncate">
                    {t.isManual ? t.manualName : t.user?.name}
                  </h4>
                  <p className="text-[10px] font-black uppercase text-brand-green truncate">
                    {t.isManual
                      ? t.manualCourse
                      : t.course?.title?.en ||
                        t.course?.title ||
                        "Course Review"}
                  </p>
                </div>
              </div>

              <div className="flex-1">
                <div className="flex gap-1 text-amber-400 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <LuStar
                      key={i}
                      className={`w-4 h-4 ${i < t.rating ? "fill-current" : "text-slate-100"}`}
                    />
                  ))}
                </div>
                <p className="text-slate-600 text-sm leading-relaxed mb-6 font-medium italic">
                  “{t.text}”
                </p>
                {t.incomeProof && (
                  <div className="flex gap-4 items-center">
                    <a
                      href={t.incomeProof}
                      target="_blank"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-600 text-[10px] font-black uppercase tracking-wider rounded-xl hover:bg-slate-200 transition-colors"
                    >
                      <LuEye className="w-4 h-4" /> View Income Proof
                    </a>
                  </div>
                )}
              </div>

              <div className="flex flex-wrap gap-2 w-full md:w-auto self-center lg:self-start">
                {!t.isApproved && (
                  <button
                    onClick={() => updateStatus(t._id, "approved", true)}
                    className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-green-600 text-white hover:bg-green-700 rounded-2xl font-bold transition-all shadow-lg shadow-green-600/20"
                  >
                    <LuCheck className="w-4 h-4" /> Approve
                  </button>
                )}

                <button
                  onClick={() => handleOpenModal(t)}
                  className="p-3 bg-slate-50 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all"
                  title="Edit testimonial"
                >
                  <LuPencil className="w-5 h-5" />
                </button>

                <button
                  onClick={() => handleDelete(t._id)}
                  className="p-3 bg-slate-50 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all"
                  title="Delete testimonial"
                >
                  <LuTrash2 className="w-5 h-5" />
                </button>

                {t.isApproved && (
                  <button
                    onClick={() => updateStatus(t._id, "rejected", false)}
                    className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-3 bg-rose-50 text-rose-600 hover:bg-rose-100 rounded-2xl font-bold transition-all"
                  >
                    <LuX className="w-4 h-4" /> Reject
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {!loading && testimonials.length === 0 && (
          <div className="py-20 text-center flex flex-col items-center">
            <div className="w-20 h-20 bg-slate-50 rounded-[2.5rem] flex items-center justify-center mb-6">
              <LuMessageSquare className="w-10 h-10 text-slate-200" />
            </div>
            <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">
              No testimonials to moderate
            </p>
          </div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white w-full max-w-2xl rounded-[3rem] p-10 shadow-2xl relative max-h-[90vh] overflow-y-auto"
          >
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-8 right-8 p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-full transition-all"
            >
              <LuX className="w-5 h-5" />
            </button>
            <h3 className="text-2xl font-black text-slate-900 mb-8">
              {editingTestimonial ? "Edit Feedback" : "New Testimonial"}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="flex gap-8">
                <ImageUpload
                  value={
                    formData.isManual
                      ? formData.manualAvatar
                      : formData.user?.avatar || ""
                  }
                  onChange={(url) =>
                    setFormData({
                      ...formData,
                      [formData.isManual ? "manualAvatar" : "user"]:
                        formData.isManual
                          ? url
                          : { ...formData.user, avatar: url },
                    })
                  }
                  label="User Avatar"
                />

                <div className="flex-1 space-y-4">
                  <div className="flex justify-between items-center bg-slate-50 p-3 rounded-2xl border border-slate-100">
                    <span className="text-[10px] font-black uppercase text-slate-400">
                      Entry Mode
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        setFormData({
                          ...formData,
                          isManual: !formData.isManual,
                        })
                      }
                      className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase transition-all ${formData.isManual ? "bg-indigo-600 text-white" : "bg-white text-slate-600 shadow-sm border border-slate-200"}`}
                    >
                      {formData.isManual ? "Manual Entry" : "System User"}
                    </button>
                  </div>

                  <div>
                    <label className="block text-[10px] font-black uppercase text-slate-400 mb-1">
                      {formData.isManual
                        ? "Student Name"
                        : "User Name (Read-Only)"}
                    </label>
                    <input
                      required
                      disabled={!formData.isManual}
                      className="w-full px-5 py-3.5 bg-slate-50 border-2 border-transparent focus:border-indigo-500/20 focus:bg-white transition-all rounded-2xl outline-none text-sm font-bold shadow-inner disabled:opacity-50"
                      value={
                        formData.isManual
                          ? formData.manualName
                          : formData.user?.name || ""
                      }
                      onChange={(e) =>
                        setFormData({ ...formData, manualName: e.target.value })
                      }
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-black uppercase text-slate-400 mb-1">
                        Rating (1-5)
                      </label>
                      <select
                        className="w-full px-5 py-3.5 bg-slate-50 border-2 border-transparent focus:border-indigo-500/20 focus:bg-white transition-all rounded-2xl outline-none text-sm font-bold shadow-inner"
                        value={formData.rating}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            rating: Number(e.target.value),
                          })
                        }
                      >
                        {[5, 4, 3, 2, 1].map((r) => (
                          <option key={r} value={r}>
                            {r} Stars
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] font-black uppercase text-slate-400 mb-1">
                        Course Title
                      </label>
                      {formData.isManual ? (
                        <input
                          required
                          placeholder="e.g. Full-Stack Web Dev"
                          className="w-full px-5 py-3.5 bg-slate-50 border-2 border-transparent focus:border-indigo-500/20 focus:bg-white transition-all rounded-2xl outline-none text-sm font-bold shadow-inner"
                          value={formData.manualCourse}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              manualCourse: e.target.value,
                            })
                          }
                        />
                      ) : (
                        <select
                          className="w-full px-5 py-3.5 bg-slate-50 border-2 border-transparent focus:border-indigo-500/20 focus:bg-white transition-all rounded-2xl outline-none text-sm font-bold shadow-inner"
                          value={formData.course}
                          onChange={(e) =>
                            setFormData({ ...formData, course: e.target.value })
                          }
                        >
                          <option value="">Select Student Course</option>
                          {courses.map((c) => (
                            <option key={c._id} value={c._id}>
                              {c.title?.en || c.title}
                            </option>
                          ))}
                        </select>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase text-slate-400 mb-1">
                  Review Text
                </label>
                <textarea
                  rows="4"
                  required
                  className="w-full px-5 py-3.5 bg-slate-50 border-2 border-transparent focus:border-indigo-500/20 focus:bg-white transition-all rounded-2xl outline-none text-sm resize-none shadow-inner"
                  placeholder="Enter the user's detailed feedback..."
                  value={formData.text}
                  onChange={(e) =>
                    setFormData({ ...formData, text: e.target.value })
                  }
                />
              </div>

              <ImageUpload
                value={formData.incomeProof}
                onChange={(url) =>
                  setFormData({ ...formData, incomeProof: url })
                }
                label="Income Proof / Result Screenshot"
              />

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
                  className="flex-[2] py-4 bg-slate-900 text-white font-black rounded-2xl shadow-xl shadow-slate-900/20 hover:bg-black transition-all flex items-center justify-center gap-2"
                >
                  <LuCheck className="w-6 h-6" />
                  {editingTestimonial ? "Save Changes" : "Post Testimonial"}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
