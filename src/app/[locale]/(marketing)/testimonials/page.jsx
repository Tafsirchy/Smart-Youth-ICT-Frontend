"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
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
    <section className="min-h-screen bg-slate-50 pt-12 sm:pt-18 pb-12 md:pb-16 flex flex-col font-sans relative overflow-hidden">
      <div className="container-custom relative z-10 w-full">
        {/* Compact Header */}
        <div className="max-w-4xl mb-8 md:mb-10">
          <div className="flex items-center justify-between flex-wrap gap-2 mb-2.5">
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2.5"
            >
              <div className="w-8 h-[2px] bg-brand-pink" />
              <p className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-400 leading-[1.4]">
                Social Proof
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-amber-50 border border-amber-200/80 rounded-lg text-amber-700 text-[10px] font-extrabold uppercase tracking-wider"
            >
              <div className="flex gap-0.5 text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <IoStar key={i} size={11} />
                ))}
              </div>
              <span>4.9 / 5 Rating</span>
            </motion.div>
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 }}
            className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 leading-[1.2] mb-2 tracking-tight"
          >
            Client <span className="text-brand-pink">Testimonials</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.16 }}
            className="text-slate-600 text-sm md:text-base leading-[1.6] max-w-2xl border-l-2 border-brand-pink pl-4"
          >
            Thousands of students have transformed their careers, launched businesses,
            <br className="hidden sm:inline" />
            and unlocked financial independence with SYICT. Here is their honest feedback.
          </motion.p>
        </div>

        {/* Testimonials Masonry */}
        {loading ? (
          <div className="flex justify-center items-center py-16">
            <div className="w-10 h-10 border-4 border-slate-200 border-t-brand-pink animate-spin rounded-full" />
          </div>
        ) : (
          <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4 max-w-7xl mx-auto">
            {testimonials.map((review, i) => {
              const writerName = review.isManual ? review.manualName : (review.user?.name || "Member");
              const writerAvatar = (review.isManual ? review.manualAvatar : review.user?.avatar) || "/images/placeholder.png";
              const writerCourse = review.isManual ? review.manualCourse : (review.course?.title?.en || review.course?.title || "Course Graduate");

              return (
                <motion.div
                  key={review._id || i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-30px" }}
                  transition={{ delay: (i % 3) * 0.06, duration: 0.35 }}
                  className="break-inside-avoid bg-white p-5 sm:p-6 border border-slate-200/90 shadow-xs hover:shadow-md hover:border-brand-pink/30 transition-all duration-300 group flex flex-col relative rounded-2xl"
                >
                  <div className="flex items-center justify-between mb-3 relative z-10">
                    <div className="flex gap-0.5 text-amber-400">
                      {[...Array(5)].map((_, starIdx) => (
                        <IoStar
                          key={starIdx}
                          size={13}
                          className={starIdx < review.rating ? "fill-current" : "text-slate-200"}
                        />
                      ))}
                    </div>
                    <span className="text-[10px] font-black tracking-widest text-slate-300 uppercase font-mono">
                      Verified
                    </span>
                  </div>

                  <p className="text-slate-700 text-xs sm:text-sm font-normal leading-[1.6] mb-4 relative z-10 flex-1">
                    "{review.text}"
                  </p>

                  <div className="flex items-center gap-3 relative z-10 border-t border-slate-100 pt-3 mt-auto">
                    <div className="w-10 h-10 bg-slate-100 border border-slate-200 overflow-hidden shrink-0 rounded-xl relative flex items-center justify-center">
                      {writerAvatar ? (
                        <Image
                          src={writerAvatar}
                          alt={writerName}
                          width={40}
                          height={40}
                          loading="lazy"
                          decoding="async"
                          unoptimized={true}
                          onError={(e) => { e.currentTarget.style.display = 'none'; }}
                          className="w-full h-full object-cover rounded-xl z-10 relative"
                        />
                      ) : null}
                      <div className="w-full h-full flex items-center justify-center bg-indigo-50 text-indigo-600 font-black text-xs absolute inset-0 z-0">
                        {writerName ? writerName.charAt(0) : "U"}
                      </div>
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-black text-slate-900 text-xs sm:text-sm truncate leading-[1.3]">{writerName}</h4>
                      <p className="text-brand-pink text-[9px] font-extrabold uppercase tracking-wider truncate mt-0.5 leading-[1.2]">
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
      <div className="fixed bottom-0 left-0 w-full p-3 bg-white/90 backdrop-blur-md border-t border-slate-200 z-50 md:hidden flex items-center justify-between shadow-[0_-8px_24px_rgba(0,0,0,0.06)] pb-[max(0.75rem,env(safe-area-inset-bottom))]">
        <div>
          <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Feedback</p>
          <p className="text-slate-900 font-black text-xs leading-none">Rated 4.9 by Alumni</p>
        </div>
        <Link
          href="/courses"
          className="px-5 py-2.5 min-h-[40px] bg-brand-pink text-white font-extrabold text-[10px] uppercase tracking-wider rounded-lg flex items-center justify-center active:scale-95 leading-none"
        >
          Join Now
        </Link>
      </div>
    </section>
  );
}
