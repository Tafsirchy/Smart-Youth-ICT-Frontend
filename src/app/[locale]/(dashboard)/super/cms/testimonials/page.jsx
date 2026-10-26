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
    <div className="py-2.5 sm:py-3.5">
      <div className="flex justify-between items-center gap-2.5 mb-3.5 sm:mb-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mb-0.5 leading-[1.4]">
            Testimonial Moderation
          </h1>
          <p className="text-sm sm:text-base text-slate-500 leading-[1.5]">
            Review, approve, or manually add customer reviews for the marketing site.
          </p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="bg-slate-900 text-white px-3.5 py-2 font-bold flex items-center justify-center gap-1.5 hover:bg-black transition-all shadow-xl shadow-slate-900/10 shrink-0 text-xs sm:text-sm leading-[1.4] rounded-md"
        >
          <LuPlus className="w-4 h-4 shrink-0" />
          <span className="hidden sm:inline">Add Manual Testimonial</span>
        </button>
      </div>

      <div className="space-y-2.5 sm:space-y-3">
        <AnimatePresence mode="popLayout">
          {testimonials.map((t, index) => (
            <motion.div
              key={t._id}
              layout
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ delay: index * 0.05 }}
              className={`bg-white p-3 sm:p-3.5 border flex flex-col md:flex-row gap-3 sm:gap-4 items-start transition-all hover:shadow-2xl hover:shadow-slate-200/50 rounded-md ${t.isApproved ? "border-slate-100" : "border-amber-200 bg-amber-50/10"}`}
            >
              <div className="flex items-center gap-2.5 md:w-52 shrink-0 w-full min-w-0">
                <div className="w-10 h-10 bg-white shadow-sm border border-slate-100 p-0.5 shrink-0 rounded-lg relative overflow-hidden flex items-center justify-center">
                  {(t.isManual ? t.manualAvatar : t.user?.avatar) ? (
                    <div className="relative w-full h-full z-10">
                      <Image
                        src={t.isManual ? t.manualAvatar : t.user?.avatar}
                        alt={
                          (t.isManual ? t.manualName : t.user?.name) ||
                          "Testimonial author"
                        }
                        width={40}
                        height={40}
                        loading="lazy"
                        decoding="async"
                        unoptimized={true}
                        onError={(e) => { e.currentTarget.style.display = 'none'; }}
                        onLoad={(e) => {
                          if (e.target.src.includes('ibb.co') && e.target.naturalWidth === 180 && e.target.naturalHeight === 180) {
                            e.target.style.display = 'none';
                          }
                        }}
                        className="w-full h-full object-cover rounded-md"
                      />
                    </div>
                  ) : null}
                  <div className="w-full h-full flex items-center justify-center bg-indigo-50 text-indigo-600 font-black text-xs absolute inset-0 z-0 uppercase">
                    {(t.isManual ? t.manualName : t.user?.name)?.[0] || "U"}
                  </div>
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="font-bold text-slate-900 truncate leading-[1.4] text-sm">
                    {t.isManual ? t.manualName : t.user?.name}
                  </h4>
                  <p className="text-[10px] font-black uppercase text-brand-green truncate leading-[1.4]">
                    {t.isManual
                      ? t.manualCourse
                      : t.course?.title?.en ||
                        t.course?.title ||
                        "Course Review"}
                  </p>
                </div>
              </div>

              <div className="flex-1 min-w-0 w-full">
                <div className="flex gap-1 text-amber-400 mb-1.5">
                  {[...Array(5)].map((_, i) => (
                    <LuStar
                      key={i}
                      className={`w-3.5 h-3.5 ${i < t.rating ? "fill-current" : "text-slate-100"}`}
                    />
                  ))}
                </div>
                <p className="text-slate-600 text-xs sm:text-sm leading-[1.5] mb-2 font-medium italic">
                  “{t.text}”
                </p>
                {t.incomeProof && (
                  <div className="flex items-center">
                    <a
                      href={t.incomeProof}
                      target="_blank"
                      className="inline-flex items-center justify-center h-7 px-2.5 bg-slate-100 text-slate-600 text-[10px] font-black uppercase tracking-wider hover:bg-slate-200 transition-colors leading-[1.4] rounded"
                    >
                      <LuEye className="w-3.5 h-3.5 mr-1" /> View Proof
                    </a>
                  </div>
                )}
              </div>

              <div className="flex gap-1.5 w-full md:w-auto mt-auto pt-2 border-t border-slate-50 md:border-none md:pt-0 md:mt-0 shrink-0">
                {!t.isApproved && (
                  <button
                    onClick={() => updateStatus(t._id, "approved", true)}
                    className="flex-1 md:flex-none h-8 flex items-center justify-center gap-1 px-3 bg-green-600 text-white active:bg-green-700 lg:hover:bg-green-700 text-[10px] font-black uppercase tracking-normal transition-all shadow-sm rounded-md"
                  >
                    <LuCheck className="w-3.5 h-3.5" /> Approve
                  </button>
                )}
                {t.isApproved && (
                  <button
                    onClick={() => updateStatus(t._id, "rejected", false)}
                    className="flex-1 md:flex-none h-8 flex items-center justify-center gap-1 px-3 bg-rose-50 text-rose-600 active:bg-rose-100 lg:hover:bg-rose-100 text-[10px] font-black uppercase tracking-normal transition-all rounded-md"
                  >
                    <LuX className="w-3.5 h-3.5" /> Reject
                  </button>
                )}

                <button
                  onClick={() => handleOpenModal(t)}
                  className="w-8 h-8 shrink-0 flex items-center justify-center bg-slate-50 text-slate-400 active:text-indigo-600 active:bg-indigo-50 lg:hover:text-indigo-600 lg:hover:bg-indigo-50 transition-all rounded-md"
                  title="Edit testimonial"
                >
                  <LuPencil className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => handleDelete(t._id)}
                  className="w-8 h-8 shrink-0 flex items-center justify-center bg-slate-50 text-slate-400 active:text-rose-600 active:bg-rose-50 lg:hover:text-rose-600 lg:hover:bg-rose-50 transition-all rounded-md"
                  title="Delete testimonial"
                >
                  <LuTrash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {!loading && testimonials.length === 0 && (
          <div className="py-6 text-center flex flex-col items-center border-2 border-dashed border-slate-100 rounded-lg">
            <div className="w-10 h-10 bg-slate-50 flex items-center justify-center mb-2 rounded-md">
              <LuMessageSquare className="w-5 h-5 text-slate-200" />
            </div>
            <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px] leading-[1.4]">
              No testimonials to moderate
            </p>
          </div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[999] flex items-end sm:items-center justify-center p-0 sm:p-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white w-full max-w-xl p-3.5 sm:p-4 shadow-2xl relative max-h-[90vh] overflow-y-auto flex flex-col custom-scrollbar rounded-lg"
          >
            <div className="flex items-center justify-between mb-3 shrink-0">
              <h3 className="text-lg sm:text-xl font-black text-slate-900 leading-[1.4]">
                {editingTestimonial ? "Edit Feedback" : "New Testimonial"}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="w-8 h-8 flex items-center justify-center bg-slate-50 text-slate-500 active:bg-slate-100 lg:hover:bg-slate-200 transition-all shrink-0 rounded-md"
                aria-label="Close"
              >
                <LuX className="w-4 h-4" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-2.5">
              <div className="flex flex-col md:flex-row gap-3">
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

                <div className="flex-1 space-y-2 w-full min-w-0">
                  <div className="flex justify-between items-center bg-slate-50 p-1.5 border border-slate-100 rounded-md">
                    <span className="text-[10px] font-black uppercase text-slate-400 leading-[1.4]">
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
                      className={`px-2.5 py-1 text-[10px] font-black uppercase transition-all leading-[1.4] rounded ${formData.isManual ? "bg-indigo-600 text-white" : "bg-white text-slate-600 shadow-sm border border-slate-200"}`}
                    >
                      {formData.isManual ? "Manual Entry" : "System User"}
                    </button>
                  </div>

                  <div>
                    <label className="block text-[10px] font-black uppercase text-slate-400 mb-0.5 leading-[1.4]">
                      {formData.isManual
                        ? "Student Name"
                        : "User Name (Read-Only)"}
                    </label>
                    <input
                      required
                      disabled={!formData.isManual}
                      className="w-full px-2.5 py-1.5 bg-slate-50 border-2 border-transparent focus:border-indigo-500/20 focus:bg-white transition-all outline-none text-xs sm:text-sm font-bold shadow-inner disabled:opacity-50 leading-[1.4] rounded-md"
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

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[10px] font-black uppercase text-slate-400 mb-0.5 leading-[1.4]">
                        Rating (1-5)
                      </label>
                      <select
                        className="w-full px-2.5 py-1.5 bg-slate-50 border-2 border-transparent focus:border-indigo-500/20 focus:bg-white transition-all outline-none text-xs sm:text-sm font-bold shadow-inner leading-[1.4] rounded-md"
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
                    <div className="min-w-0">
                      <label className="block text-[10px] font-black uppercase text-slate-400 mb-0.5 leading-[1.4] truncate">
                        Course Title
                      </label>
                      {formData.isManual ? (
                        <input
                          required
                          placeholder="e.g. Web Dev"
                          className="w-full px-2.5 py-1.5 bg-slate-50 border-2 border-transparent focus:border-indigo-500/20 focus:bg-white transition-all outline-none text-xs sm:text-sm font-bold shadow-inner leading-[1.4] rounded-md"
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
                          className="w-full px-2.5 py-1.5 bg-slate-50 border-2 border-transparent focus:border-indigo-500/20 focus:bg-white transition-all outline-none text-xs sm:text-sm font-bold shadow-inner leading-[1.4] rounded-md"
                          value={formData.course}
                          onChange={(e) =>
                            setFormData({ ...formData, course: e.target.value })
                          }
                        >
                          <option value="">Select Course</option>
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
                <label className="block text-[10px] font-black uppercase text-slate-400 mb-0.5 leading-[1.4]">
                  Review Text
                </label>
                <textarea
                  rows="2"
                  required
                  className="w-full px-2.5 py-1.5 bg-slate-50 border-2 border-transparent focus:border-indigo-500/20 focus:bg-white transition-all outline-none text-xs sm:text-sm resize-none shadow-inner leading-[1.6] rounded-md"
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
