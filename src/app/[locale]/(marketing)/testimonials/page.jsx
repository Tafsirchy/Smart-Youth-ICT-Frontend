"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { IoStar } from "react-icons/io5";
import { useEffect, useState } from "react";
import api from "@/lib/api";

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await api.get("/testimonials");
        setTestimonials(res.data.data || []);
      } catch (err) {
        console.error("Failed to load testimonials", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTestimonials();
  }, []);

  return (
    <section className="min-h-screen bg-slate-50 py-24 flex flex-col font-sans relative overflow-hidden">
      {/* Background Blobs */}
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-brand-pink/10 blur-[150px] rounded-full pointer-events-none"></div>

      <div className="container-custom relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, type: "spring" }}
            className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full border border-amber-200 bg-amber-50 text-xs font-extrabold uppercase tracking-widest text-amber-600 mb-8 shadow-sm"
          >
            <div className="flex gap-1 text-amber-500">
              {[...Array(5)].map((_, i) => (
                <IoStar key={i} size={14} />
              ))}
            </div>
            <span>4.9/5 Average Rating</span>
          </motion.div>
          
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-slate-900 leading-[1.1] mb-8 tracking-tight">
            Client <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-pink to-brand-green">Testimonials.</span>
          </h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-slate-600 text-lg md:text-xl leading-relaxed font-medium"
          >
            Thousands of students have fundamentally changed their careers, launched businesses, and achieved financial independence with SYICT. Here is what they have to say.
          </motion.p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-24">
            <div className="w-12 h-12 border-4 border-slate-200 border-t-brand-pink rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8 max-w-7xl mx-auto">
            {testimonials.map((review, i) => {
              const writerName = review.isManual ? review.manualName : (review.user?.name || "Member");
              const writerAvatar = (review.isManual ? review.manualAvatar : review.user?.avatar) || "/images/placeholder.png";
              const writerCourse = review.isManual ? review.manualCourse : (review.course?.title?.en || review.course?.title || "Project Excellence");

              return (
                <motion.div
                  key={review._id || i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: (i % 3) * 0.1 }}
                  className="break-inside-avoid bg-white p-8 md:p-10 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group flex flex-col relative"
                >
                  <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity text-brand-pink">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                    </svg>
                  </div>

                  <div className="flex gap-1 text-amber-400 mb-8 relative z-10">
                    {[...Array(5)].map((_, i) => (
                      <IoStar key={i} size={16} className={`${i < review.rating ? 'fill-current' : 'text-slate-200'}`} />
                    ))}
                  </div>

                  <p className="text-slate-700 font-medium leading-relaxed text-lg mb-12 relative z-10 flex-1">
                    "{review.text}"
                  </p>

                  <div className="flex items-center gap-4 relative z-10 border-t border-slate-100 pt-8 mt-auto">
                    <div className="w-14 h-14 rounded-full bg-slate-100 border-2 border-white shadow-sm overflow-hidden shrink-0">
                      <Image
                        src={writerAvatar}
                        alt={writerName}
                        width={56}
                        height={56}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-extrabold text-slate-900 truncate">{writerName}</h4>
                      <p className="text-brand-green text-[10px] font-extrabold uppercase tracking-widest truncate mt-1">
                        {writerCourse}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>

      {/* Mobile Sticky CTA */}
      <div className="fixed bottom-0 left-0 w-full p-4 bg-white/90 backdrop-blur-md border-t border-slate-200 z-50 md:hidden flex items-center justify-between shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
        <div>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Next Step</p>
          <p className="text-slate-900 font-bold text-sm">Join the Program</p>
        </div>
        <button className="px-6 py-3 rounded-xl bg-brand-pink text-white font-bold text-[10px] uppercase tracking-widest shadow-lg shadow-brand-pink/30">
          Apply Now
        </button>
      </div>
    </section>
  );
}
