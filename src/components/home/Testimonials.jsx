"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { IoStar, IoChatbubblesOutline, IoLogoYoutube } from "react-icons/io5";
import api from "@/lib/api";

// Dynamic Testimonials from CMS

function StarRating({ count = 5 }) {
  return (
    <div className="flex gap-0.5">
      {[...Array(count)].map((_, i) => (
        <IoStar key={i} size={12} className="text-amber-400" />
      ))}
    </div>
  );
}

function getInitials(name) {
  return name
    ?.split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

const AVATAR_GRADIENTS = [
  "from-pink-500 to-rose-500",
  "from-blue-500 to-indigo-600",
  "from-emerald-500 to-teal-500",
  "from-violet-500 to-purple-600",
  "from-amber-500 to-orange-500",
  "from-cyan-500 to-blue-500",
];

export default function Testimonials() {
  const [textReviews, setTextReviews] = useState([]);
  const [videoReviews, setVideoReviews] = useState([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    api
      .get("/cms/stories")
      .then((res) => {
        if (res.data?.data) {
          const stories = res.data.data;
          setTextReviews(stories.filter(s => s.storyType === "text" || !s.videoUrl));
          setVideoReviews(stories.filter(s => s.storyType === "video" || s.videoUrl));
        }
      })
      .catch(() => { });
  }, []);

  if (!mounted) return <div className="section h-[600px]" />; // Skeleton/Placeholder

  return (
    <section className="section py-12 sm:py-16 md:py-20 relative overflow-hidden bg-white">
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none">
        <div className="absolute top-10 left-10 w-72 h-72 bg-pink-200/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-emerald-200/20 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10">
        {/* Header Section */}
        <div className="container-custom mb-10 sm:mb-16 md:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16 max-w-3xl mx-auto"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-pink-100 text-pink-600 text-xs font-bold tracking-wider uppercase mb-4">
              Success Stories
            </span>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-slate-900 leading-[1.15] mb-4 sm:mb-6 md:mb-8 tracking-tighter">
              What Our <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-rose-500 to-amber-500 animate-gradient-x">
                Students Say
              </span>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed mt-4 sm:mt-6">
              Real results from real people. Join 5,000+ graduates who have
              transformed their lives through our industry-leading courses and
              mentorship.
            </p>
          </motion.div>
        </div>

        {/* Scrolling Row 1: Text Reviews (Left to Right) */}
        {textReviews.length > 0 && (
          <div className="mb-8 relative grayscale hover:grayscale-0 transition-all duration-500">
            <div
              className="scroll-container animate-scroll-right motion-gpu"
              style={{ "--scroll-duration": "60s" }}
            >
              {Array.from({ length: 6 }).flatMap(() => textReviews).map((review, idx) => (
                <div
                  key={`${review._id}-${idx}`}
                  className="w-[350px] shrink-0 mx-3 p-6 bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col"
                >
                  <div className="flex justify-between items-start mb-4">
                    <StarRating count={5} />
                    <IoChatbubblesOutline
                      className="text-slate-200 group-hover:text-pink-400 transition-colors"
                      size={20}
                    />
                  </div>
                  <p className="text-slate-700 text-sm leading-relaxed mb-6 italic line-clamp-4">
                    &ldquo;{review.description || review.resultSummary}&rdquo;
                  </p>
                  <div className="flex items-center gap-3 mt-auto pt-4 border-t border-slate-50">
                    {review.studentAvatar ? (
                      <div className="w-10 h-10 rounded-full overflow-hidden shrink-0 bg-slate-50">
                        <Image src={review.studentAvatar} alt={review.studentName} width={40} height={40} className="w-full h-full object-cover" />
                      </div>
                    ) : (
                      <div
                        className={`w-10 h-10 rounded-full bg-gradient-to-br ${AVATAR_GRADIENTS[idx % AVATAR_GRADIENTS.length]} flex items-center justify-center text-white text-xs font-bold shrink-0`}
                      >
                        {getInitials(review.studentName)}
                      </div>
                    )}
                    <div className="min-w-0">
                      <h4 className="text-xs font-bold text-slate-900 truncate">
                        {review.studentName}
                      </h4>
                      <p className="text-[10px] text-slate-500 uppercase tracking-wider truncate">
                        {review.courseId?.title?.en || review.courseId?.title || "SYICT Graduate"}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Scrolling Row 2: Video Reviews (Right to Left) */}
        {videoReviews.length > 0 && (
          <div className="relative mt-12">
            <div
              className="scroll-container animate-scroll-left motion-gpu"
              style={{ "--scroll-duration": "50s" }}
            >
              {Array.from({ length: 6 }).flatMap(() => videoReviews).map(
                (video, idx) => (
                  <div
                    key={`${video._id}-${idx}`}
                    className="w-[300px] shrink-0 mx-3 aspect-video relative rounded-2xl overflow-hidden group shadow-lg border-2 border-transparent hover:border-pink-500 transition-all duration-300"
                  >
                    <Image
                      src={video.videoThumbnail || video.studentAvatar || "/images/placeholder.png"}
                      alt={video.studentName || "Video testimonial thumbnail"}
                      fill
                      sizes="300px"
                      loading="lazy"
                      decoding="async"
                      onError={(e) => { e.target.srcset = ''; e.target.src = '/images/placeholder.png'; }}
                      className="object-cover group-hover:scale-110 transition-transform duration-500 bg-[#f0f0f0]"
                    />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all flex flex-col items-center justify-center">
                      <div className="w-12 h-12 bg-pink-600 rounded-full flex items-center justify-center text-white shadow-lg group-hover:scale-125 transition-transform">
                        <IoLogoYoutube size={24} />
                      </div>
                      <div className="absolute bottom-3 left-4 right-4">
                        <p className="text-white text-[10px] font-bold uppercase tracking-widest bg-black/60 backdrop-blur-md px-2 py-1 rounded inline-block truncate max-w-full">
                          {video.studentName}
                        </p>
                      </div>
                    </div>
                    <a
                      href={video.videoUrl || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute inset-0 z-10"
                      aria-label={`Watch ${video.studentName}'s review`}
                    />
                  </div>
                ),
              )}
            </div>

            {/* Side Gradients for fading effect */}
            <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white to-transparent pointer-events-none z-20" />
            <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white to-transparent pointer-events-none z-20" />
          </div>
        )}
      </div>

      {/* Stats Summary Section */}
      <div className="container-custom mt-10 sm:mt-16 md:mt-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
          {[
            { val: "4.9/5", label: "Average Rating", color: "text-amber-500" },
            { val: "5k+", label: "Happy Students", color: "text-pink-600" },
            { val: "98%", label: "Success Rate", color: "text-emerald-500" },
            { val: "12+", label: "Industry Partners", color: "text-blue-600" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <div
                className={`text-2xl sm:text-3xl md:text-4xl font-black ${stat.color} mb-1`}
              >
                {stat.val}
              </div>
              <div className="text-slate-500 text-xs font-bold uppercase tracking-widest">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Styles to hide scrollbars and promote scrolling row performance to GPU hardware compositing */}
      <style dangerouslySetInnerHTML={{ __html: `
        .scroll-container {
          will-change: transform;
        }
      `}} />
    </section>
  );
}
