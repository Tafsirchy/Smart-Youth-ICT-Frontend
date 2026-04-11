"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LuCheck, LuX, LuMessageSquare, LuStar, LuEye } from "react-icons/lu";
import api from "@/lib/api";
import toast from "react-hot-toast";

export default function TestimonialModerationPage() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    setLoading(true);
    try {
      const res = await api.get("/cms/testimonials");
      setTestimonials(res.data.data);
    } catch (err) {
      toast.error("Failed to load moderation queue");
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status, isApproved) => {
    try {
      await api.patch(`/cms/testimonials/${id}/status`, { moderationStatus: status, isApproved });
      toast.success(`Testimonial ${status}`);
      fetchTestimonials();
    } catch (err) {
      toast.error("Update failed");
    }
  };

  return (
    <div className="p-8">
      <div className="mb-12">
        <h1 className="text-3xl font-black text-slate-900 mb-2">Testimonial Moderation</h1>
        <p className="text-slate-500">Review and approve customer reviews for the marketing site.</p>
      </div>

      <div className="space-y-6">
        {testimonials.map(t => (
          <div key={t._id} className="bg-white p-6 rounded-[2.5rem] border border-slate-100 flex flex-col md:flex-row gap-6 items-start transition-all hover:border-slate-200">
            <div className="flex items-center gap-4 w-full md:w-64 shrink-0">
               <div className="w-12 h-12 rounded-full bg-slate-50 flex-shrink-0">
                 <img src={t.user?.avatar || "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=100&h=100&fit=crop"} className="w-full h-full rounded-full object-cover" />
               </div>
               <div className="min-w-0">
                 <h4 className="font-bold text-slate-900 truncate">{t.user?.name}</h4>
                 <p className="text-[10px] font-black uppercase text-brand-green truncate">{t.course?.title?.en || "Course Review"}</p>
               </div>
            </div>

            <div className="flex-1">
              <div className="flex gap-1 text-amber-400 mb-2">
                {[...Array(5)].map((_, i) => (
                  <LuStar key={i} className={`w-3.5 h-3.5 ${i < t.rating ? 'fill-current' : 'text-slate-200'}`} />
                ))}
              </div>
              <p className="text-slate-600 text-sm leading-relaxed mb-4 italic">"{t.text}"</p>
              {t.incomeProof && (
                <a href={t.incomeProof} target="_blank" className="inline-flex items-center gap-2 px-3 py-1.5 bg-slate-100 text-slate-500 text-xs font-bold rounded-lg hover:bg-slate-200 transition-colors">
                   <LuEye className="w-3 h-3" /> View Income Proof
                </a>
              )}
            </div>

            <div className="flex gap-2 w-full md:w-auto">
              <button 
                onClick={() => updateStatus(t._id, 'approved', true)}
                disabled={t.isApproved}
                className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl font-bold transition-all ${t.isApproved ? 'bg-green-50 text-green-600' : 'bg-slate-900 text-white hover:bg-black'}`}
              >
                <LuCheck className="w-4 h-4" /> {t.isApproved ? 'Approved' : 'Approve'}
              </button>
              <button 
                onClick={() => updateStatus(t._id, 'rejected', false)}
                className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-2.5 bg-rose-50 text-rose-600 hover:bg-rose-100 rounded-xl font-bold transition-all"
              >
                <LuX className="w-4 h-4" /> Reject
              </button>
            </div>
          </div>
        ))}

        {!loading && testimonials.length === 0 && (
          <div className="py-20 text-center">
            < LuMessageSquare className="w-12 h-12 text-slate-200 mx-auto mb-4" />
            <p className="text-slate-400 font-medium">No testimonials found in the moderation queue.</p>
          </div>
        )}
      </div>
    </div>
  );
}
