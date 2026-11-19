"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { IoStar, IoChatbubblesOutline, IoLogoYoutube } from "react-icons/io5";
import api from "@/lib/api";
import VideoStoryModal from "@/components/marketing/VideoStoryModal";

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
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    api
      .get("/cms/stories")
      .then((res) => {
        if (res.data?.data) {
          const stories = res.data.data;
          setTextReviews(
            stories.filter((s) => s.storyType === "text" || !s.videoUrl),
          );
          setVideoReviews(
            stories.filter((s) => s.storyType === "video" || s.videoUrl),
          );
        }
      })
      .catch(() => {});
  }, []);

  if (!mounted) return <div className="section h-[600px]" />; // Skeleton/Placeholder

  return (
    <section className="section py-12 sm:py-16 md:py-20 relative overflow-hidden bg-white rounded-sm border-b border-slate-200/80">
      <div className="relative z-10">
        {/* Header Section */}
        <div className="container-custom mb-6 sm:mb-8 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="text-center mb-8 max-w-3xl mx-auto"
          >
            <span className="inline-block px-4 py-1.5 bg-pink-100 text-pink-600 text-xs font-bold tracking-wider uppercase mb-4 rounded-md">
              Success Stories
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 leading-[1.15] mb-4 sm:mb-6 md:mb-8 tracking-tight">
              What Our <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-rose-500 to-amber-500 animate-gradient-x">
                Students Say
              </span>
            </h2>
            <p className="text-sm sm:text-lg text-slate-600 max-w-3xl mx-auto font-normal leading-[1.6]">
              Real results from real people. Join graduates who have
              transformed their lives through our industry-leading courses and
              mentorship.
            </p>
          </motion.div>
        </div>

        {/* Reviews Wall Motion Wrapper */}
        <motion.div
          initial={{ opacity: 0, y: 35, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.7, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Scrolling Row 1: Text Reviews (Left to Right) — Seamless 2-group infinite loop */}
          {textReviews.length > 0 && (
            <div className="mb-8 relative overflow-hidden" style={{ isolation: "isolate" }}>
            {/* Outer track: flex row that holds exactly 2 identical groups */}
            <div
              className="scroll-container animate-scroll-right"
              style={{ "--scroll-duration": "90s" }}
            >
              {/* Group A + Group B (identical) — animation slides from B→A seamlessly at -50% */}
              {[0, 1].map((groupIdx) => (
                <div key={groupIdx} className="flex shrink-0" aria-hidden={groupIdx === 1}>
                  {textReviews.map((review, idx) => (
                    <div
                      key={`g${groupIdx}-${review._id}-${idx}`}
                      className="w-[320px] shrink-0 mx-3 p-5 bg-white border border-slate-100 shadow-sm hover:shadow-lg transition-shadow duration-300 group flex flex-col rounded-xl"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <StarRating count={5} />
                        <IoChatbubblesOutline
                          className="text-slate-200 group-hover:text-pink-400 transition-colors"
                          size={18}
                        />
                      </div>
                      <p className="text-slate-700 text-sm leading-relaxed mb-4 italic line-clamp-4">
                        &ldquo;{review.description || review.resultSummary}&rdquo;
                      </p>
                      <div className="flex items-center gap-3 mt-auto pt-3 border-t border-slate-100">
                        {review.studentAvatar ? (
                          <div className="w-9 h-9 overflow-hidden shrink-0 bg-slate-50 relative flex items-center justify-center rounded-full">
                            <Image
                              src={review.studentAvatar}
                              alt={review.studentName}
                              width={36}
                              height={36}
                              loading="lazy"
                              onError={(e) => {
                                e.currentTarget.style.display = "none";
                              }}
                              className="w-full h-full object-cover z-10 relative rounded-full"
                            />
                            <div
                              className={`w-9 h-9 bg-gradient-to-br ${AVATAR_GRADIENTS[idx % AVATAR_GRADIENTS.length]} flex items-center justify-center text-white text-xs font-bold shrink-0 absolute inset-0 z-0 rounded-full`}
                            >
                              {getInitials(review.studentName)}
                            </div>
                          </div>
                        ) : (
                          <div
                            className={`w-9 h-9 bg-gradient-to-br ${AVATAR_GRADIENTS[idx % AVATAR_GRADIENTS.length]} flex items-center justify-center text-white text-xs font-bold shrink-0 rounded-full`}
                          >
                            {getInitials(review.studentName)}
                          </div>
                        )}
                        <div className="min-w-0">
                          <h4 className="text-xs font-bold text-slate-900 truncate">
                            {review.studentName}
                          </h4>
                          <p className="text-[10px] text-slate-500 uppercase tracking-wider truncate">
                            {review.courseId?.title?.en ||
                              review.courseId?.title ||
                              "SYICT Graduate"}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Scrolling Row 2: Video Reviews (Right to Left) — Seamless 2-group infinite loop */}
        {videoReviews.length > 0 && (
          <div className="relative mt-12 overflow-hidden" style={{ isolation: "isolate" }}>
            <div
              className="scroll-container animate-scroll-left"
              style={{ "--scroll-duration": "75s" }}
            >
              {/* Group A + Group B (identical) — animation slides from B→A seamlessly at -50% */}
              {[0, 1].map((groupIdx) => (
                <div key={groupIdx} className="flex shrink-0" aria-hidden={groupIdx === 1}>
                  {videoReviews.map((video, idx) => (
                    <div
                      key={`g${groupIdx}-${video._id}-${idx}`}
                      className="w-[300px] shrink-0 mx-3 aspect-video relative overflow-hidden group shadow-md border-2 border-transparent hover:border-pink-500 transition-all duration-300 rounded-xl"
                    >
                      <Image
                        src={
                          video.videoThumbnail ||
                          video.studentAvatar ||
                          "/images/placeholder.png"
                        }
                        alt={video.studentName || "Video testimonial thumbnail"}
                        fill
                        sizes="300px"
                        loading="lazy"
                        decoding="async"
                        onError={(e) => {
                          e.target.srcset = "";
                          e.target.src = "/images/placeholder.png";
                        }}
                        className="object-cover group-hover:scale-105 transition-transform duration-500 bg-[#f0f0f0]"
                      />
                      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all flex flex-col items-center justify-center">
                        <div className="w-11 h-11 bg-pink-600 flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300 rounded-lg">
                          <IoLogoYoutube size={22} />
                        </div>
                        <div className="absolute bottom-3 left-4 right-4">
                          <p className="text-white text-[10px] font-bold uppercase tracking-widest bg-black/75 px-2.5 py-1 inline-block truncate max-w-full rounded-md shadow-xs">
                            {video.studentName}
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => setSelectedVideo(video)}
                        className="absolute inset-0 z-10 w-full h-full cursor-pointer focus:outline-none focus:ring-4 focus:ring-pink-500/40"
                        aria-label={`Watch ${video.studentName}'s review`}
                      />
                    </div>
                  ))}
                </div>
              ))}
            </div>

            {/* Side fade gradients */}
            <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white to-transparent pointer-events-none z-20" />
            <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white to-transparent pointer-events-none z-20" />
          </div>
        )}
        </motion.div>
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
              initial={{ opacity: 0, y: 28, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ delay: i * 0.1, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
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

      {/* Styles to promote scrolling row performance to GPU hardware compositing */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        .scroll-container {
          will-change: transform;
          transform: translateZ(0);
          -webkit-transform: translateZ(0);
        }
        .animate-scroll-left,
        .animate-scroll-right {
          animation-play-state: running !important;
        }
        `,
        }}
      />

      {/* In-Site Video Story Modal */}
      {selectedVideo && (
        <VideoStoryModal
          story={selectedVideo}
          onClose={() => setSelectedVideo(null)}
        />
      )}
    </section>
  );
}
