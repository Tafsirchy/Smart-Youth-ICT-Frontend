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
    <section className="min-h-screen bg-white py-24 flex flex-col font-sans">
      <div className="container-custom relative">
        <div className="text-center max-w-3xl mx-auto mb-24">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center justify-center gap-3 px-4 py-2 border border-slate-200 text-xs font-medium uppercase tracking-widest text-slate-900 mb-8"
          >
            <div className="flex gap-1 text-slate-900">
              {[...Array(5)].map((_, i) => (
                <IoStar key={i} size={14} />
              ))}
            </div>
            <span>4.9/5 Average Rating</span>
          </motion.div>
          
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-light text-slate-900 leading-[1.1] mb-8 tracking-tight">
            Client <br />
            <span className="font-medium">Testimonials.</span>
          </h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-slate-500 text-lg md:text-xl leading-relaxed font-light"
          >
            Thousands of students have fundamentally changed their careers, launched businesses, and achieved financial independence with SYICT. Here is what they have to say.
          </motion.p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-24">
            <div className="w-12 h-12 border-2 border-slate-200 border-t-slate-900 animate-spin"></div>
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
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: (i % 3) * 0.1 }}
                  className="break-inside-avoid bg-slate-50 p-8 md:p-10 border border-slate-200 hover:border-slate-900 transition-colors group flex flex-col relative"
                >
                  <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-100 transition-opacity text-slate-900">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                    </svg>
                  </div>

                  <div className="flex gap-1 text-slate-900 mb-8">
                    {[...Array(5)].map((_, i) => (
                      <IoStar key={i} size={14} className={`${i < review.rating ? 'fill-current' : 'text-slate-300'}`} />
                    ))}
                  </div>

                  <p className="text-slate-600 font-light leading-relaxed text-lg mb-12 relative z-10 flex-1">
                    "{review.text}"
                  </p>

                  <div className="flex items-center gap-4 relative z-10 border-t border-slate-200 pt-8 mt-auto">
                    <div className="w-12 h-12 bg-slate-200 shrink-0">
                      <Image
                        src={writerAvatar}
                        alt={writerName}
                        width={48}
                        height={48}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-medium text-slate-900 truncate">{writerName}</h4>
                      <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest truncate">
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
      <div className="fixed bottom-0 left-0 w-full p-4 bg-white border-t border-slate-200 z-50 md:hidden flex items-center justify-between">
        <div>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Next Step</p>
          <p className="text-slate-900 font-medium text-sm">Join the Program</p>
        </div>
        <button className="px-6 py-4 bg-slate-900 text-white font-medium text-[10px] uppercase tracking-widest">
          Apply Now
        </button>
      </div>
    </section>
  );
}
