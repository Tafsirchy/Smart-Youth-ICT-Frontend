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
    <section className="min-h-screen bg-slate-50 py-20 overflow-hidden">
      <div className="container-custom relative">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, type: "spring" }}
            className="inline-flex items-center justify-center gap-1 text-amber-500 mb-6 bg-amber-50 px-4 py-2 rounded-full border border-amber-100 shadow-sm"
          >
            {[...Array(5)].map((_, i) => (
              <IoStar key={i} size={18} />
            ))}
            <span className="text-amber-700 font-bold text-sm ml-2">4.9/5 Average Rating</span>
          </motion.div>
          <h1 className="text-5xl md:text-7xl font-black text-slate-900 leading-[1.1] mb-8 tracking-tighter">
            Testi-<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-rose-500 to-amber-500 animate-gradient-x">monials</span>
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-slate-500 text-lg md:text-xl leading-relaxed"
          >
            Thousands of students have fundamentally changed their careers, launched businesses, and achieved financial independence with SYICT. Here is what they have to say.
          </motion.p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
             <div className="w-12 h-12 border-4 border-slate-200 border-t-pink-600 rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6 max-w-7xl mx-auto">
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
                  transition={{ delay: (i % 3) * 0.1, duration: 0.5 }}
                  className="break-inside-avoid bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative group"
                >
                  <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                    </svg>
                  </div>

                  <div className="flex gap-1 text-amber-400 mb-6">
                    {[...Array(5)].map((_, i) => (
                      <IoStar key={i} size={16} className={`${i < review.rating ? 'fill-current' : 'text-slate-100'}`} />
                    ))}
                  </div>

                  <p className="text-slate-700 leading-relaxed text-lg mb-8 relative z-10 font-medium">
                    "{review.text}"
                  </p>

                  <div className="flex items-center gap-4 relative z-10 border-t border-slate-100 pt-6">
                    <div className="w-12 h-12 rounded-full overflow-hidden shadow-sm ring-2 ring-white">
                      <Image
                        src={writerAvatar}
                        alt={writerName}
                        width={48}
                        height={48}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900">{writerName}</h4>
                      <p className="text-brand-green text-xs font-black uppercase tracking-wide">
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
    </section>
  );
}
