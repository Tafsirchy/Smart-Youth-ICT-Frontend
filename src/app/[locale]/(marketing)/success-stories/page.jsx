'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { IoPlayCircleOutline, IoBriefcaseOutline, IoLocationOutline, IoCheckmarkCircle, IoTrophyOutline } from 'react-icons/io5';
import Link from 'next/link';
import api from '@/lib/api';
import VideoStoryModal from '@/components/marketing/VideoStoryModal';

const STATS = [
  { number: '15,000+', label: 'Students Trained' },
  { number: '85%', label: 'Placement Rate' },
  { number: '৳40k+', label: 'Avg. Starting Salary' },
  { number: '200+', label: 'Hiring Partners' },
];

function getStoryThumbnail(story) {
  if (story?.videoThumbnail && story.videoThumbnail.trim()) {
    return story.videoThumbnail;
  }
  if (story?.videoUrl) {
    const ytMatch = story.videoUrl.match(
      /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?|shorts)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i
    );
    if (ytMatch && ytMatch[1]) {
      return `https://img.youtube.com/vi/${ytMatch[1]}/hqdefault.jpg`;
    }
  }
  if (story?.studentAvatar && story.studentAvatar.trim()) {
    return story.studentAvatar;
  }
  return "/images/placeholder.png";
}

export default function SuccessStoriesPage() {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedStory, setSelectedStory] = useState(null);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const res = await api.get("/cms/stories");
        setStories(res.data.data || []);
      } catch (err) {
        console.error("Failed to load success stories", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStories();
  }, []);

  const videoStories = stories.filter(s => s.videoUrl || s.videoThumbnail);
  const gridStories = stories;

  return (
    <div className="min-h-screen bg-slate-50 overflow-hidden flex flex-col font-sans">

      {/* ── Compact Inline Header ── */}
      <section className="pt-12 sm:pt-18 pb-6 bg-slate-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2.5 mb-2.5"
          >
            <div className="w-8 h-[2px] bg-brand-pink" />
            <p className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-400 leading-[1.4]">
              Alumni Achievement
            </p>
          </motion.div>

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <motion.h1
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 }}
                className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 leading-[1.2] mb-2 tracking-tight"
              >
                Success{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-pink to-rose-500">Stories</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.16 }}
                className="text-slate-600 text-sm md:text-base leading-[1.6] max-w-2xl border-l-2 border-brand-pink pl-4"
              >
                Meet SYICT alumni who transformed their passion into high-paying Tech and Design careers.{' '}
                <br className="hidden sm:inline" />
                Real people, real results — no fluff, just proof.
              </motion.p>
            </div>

            {/* Stats strip inline with header */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.24 }}
              className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-2 lg:grid-cols-4 gap-px bg-slate-200 border border-slate-200 rounded-xl overflow-hidden shrink-0"
            >
              {STATS.map((stat, i) => (
                <div key={i} className="bg-white px-4 py-3 flex flex-col items-center text-center min-w-[80px]">
                  <span className="text-xl font-black text-slate-900 leading-none tracking-tight">{stat.number}</span>
                  <span className="text-[9px] font-extrabold text-slate-400 uppercase tracking-[0.18em] mt-0.5 leading-[1.3]">{stat.label}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Video Testimonials Marquee ── */}
      <section id="stories" className="py-6 overflow-hidden">
        <div className="container-custom mb-4">
          <div className="flex items-center gap-2.5">
            <IoTrophyOutline className="text-brand-pink" size={14} />
            <span className="text-[10px] font-black uppercase tracking-[0.22em] text-slate-400 leading-[1.4]">Video Testimonials</span>
          </div>
          <h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight leading-[1.2] mt-1">
            Hear From <span className="text-brand-pink">Our Graduates.</span>
          </h2>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="w-10 h-10 border-4 border-slate-200 border-t-brand-pink animate-spin rounded-full" />
          </div>
        ) : videoStories.length > 0 && (
          <div className="relative w-full flex overflow-hidden group py-4 bg-slate-100/60 border-y border-slate-200">
            <motion.div
              animate={{ x: ["0%", "-50%"] }}
              transition={{ duration: 40, ease: "linear", repeat: Infinity }}
              className="flex gap-4 px-3 w-max"
            >
              {[...videoStories, ...videoStories].map((story, i) => (
                <button
                  type="button"
                  key={i}
                  onClick={() => setSelectedStory(story)}
                  className="relative overflow-hidden w-[260px] md:w-[340px] aspect-[4/5] bg-slate-200 cursor-pointer shadow-md hover:shadow-xl hover:-translate-y-1.5 shrink-0 group/card text-left focus:outline-none transition-all duration-300 border border-white rounded-xl"
                >
                  <Image
                    src={getStoryThumbnail(story)}
                    alt={story.studentName || "Student"}
                    fill
                    sizes="340px"
                    loading="lazy"
                    decoding="async"
                    unoptimized={true}
                    className="object-cover group-hover/card:scale-105 transition-transform duration-700 bg-slate-200 rounded-xl"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent rounded-xl" />

                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-14 h-14 bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/20 group-hover/card:bg-brand-pink group-hover/card:border-brand-pink group-hover/card:shadow-[0_0_24px_rgba(255,44,109,0.5)] transition-all rounded-xl">
                      <IoPlayCircleOutline size={36} className="ml-0.5 opacity-90" />
                    </div>
                  </div>

                  <div className="absolute bottom-5 left-5 right-5">
                    <h3 className="text-white font-extrabold text-base leading-[1.3] mb-1 truncate">{story.resultSummary}</h3>
                    <p className="text-brand-pink font-bold text-xs tracking-wide">{story.studentName}{story.company ? ` — ${story.company}` : ''}</p>
                  </div>
                </button>
              ))}
            </motion.div>

            <div className="absolute top-0 bottom-0 left-0 w-12 md:w-32 bg-gradient-to-r from-slate-50 to-transparent pointer-events-none z-10" />
            <div className="absolute top-0 bottom-0 right-0 w-12 md:w-32 bg-gradient-to-l from-slate-50 to-transparent pointer-events-none z-10" />
          </div>
        )}
      </section>

      {/* ── Alumni Wall Grid ── */}
      <section className="py-8 bg-white border-t border-slate-100">
        <div className="container-custom">
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="flex items-center gap-2.5 mb-1.5">
                <div className="w-6 h-[2px] bg-brand-green" />
                <span className="text-[10px] font-black uppercase tracking-[0.22em] text-slate-400 leading-[1.4]">Wall of Fame</span>
              </div>
              <h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight leading-[1.2]">
                The Alumni <span className="text-brand-green">Wall of Fame.</span>
              </h2>
              <p className="text-slate-500 text-xs leading-[1.5] mt-1 max-w-xl">
                Hundreds of students join top-tier software companies and freelancing platforms every month.
              </p>
            </div>
            <Link
              href="/courses"
              className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-brand-pink to-brand-green text-white font-extrabold text-[10px] uppercase tracking-widest shadow-sm hover:shadow-md hover:scale-105 transition-all rounded-lg shrink-0"
            >
              Start Your Journey
            </Link>
          </div>

          {!loading && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {gridStories.map((story, i) => (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ delay: (i % 3) * 0.07, duration: 0.35 }}
                  key={story._id || i}
                  className="bg-white p-5 border border-slate-100 hover:border-brand-green/30 hover:shadow-lg shadow-xs transition-all duration-300 flex flex-col group relative overflow-hidden rounded-xl"
                >
                  <div className="flex gap-3 items-center mb-4 relative z-10">
                    <div className="relative w-12 h-12 bg-slate-100 shrink-0 border-2 border-white shadow-sm overflow-hidden rounded-lg flex items-center justify-center">
                      {story.studentAvatar ? (
                        <Image
                          src={story.studentAvatar}
                          alt={story.studentName || "Student"}
                          fill
                          sizes="48px"
                          loading="lazy"
                          decoding="async"
                          unoptimized={true}
                          onError={(e) => { e.currentTarget.style.display = 'none'; }}
                          className="object-cover rounded-md z-10 relative"
                        />
                      ) : null}
                      <div className="w-full h-full flex items-center justify-center bg-indigo-50 text-indigo-600 font-bold text-base absolute inset-0 z-0">
                        {story.studentName ? story.studentName.charAt(0) : "S"}
                      </div>
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-extrabold text-slate-900 text-sm truncate leading-[1.4]">{story.studentName}</h4>
                      <p className="text-brand-green font-bold text-xs truncate leading-[1.4]">{story.resultSummary}</p>
                    </div>
                  </div>

                  <div className="space-y-2.5 mb-4 flex-1 relative z-10">
                    {story.company && (
                      <div className="flex items-center gap-3 text-xs text-slate-600 font-medium">
                        <div className="w-7 h-7 bg-purple-50 flex items-center justify-center shrink-0 text-purple-600 rounded-lg">
                          <IoBriefcaseOutline size={13} />
                        </div>
                        <span className="truncate leading-[1.4]">Hired at <strong className="font-extrabold text-slate-900">{story.company}</strong></span>
                      </div>
                    )}
                    <div className="flex items-center gap-3 text-xs text-slate-600 font-medium">
                      <div className="w-7 h-7 bg-brand-green/10 flex items-center justify-center shrink-0 text-brand-green rounded-lg">
                        <IoCheckmarkCircle size={13} />
                      </div>
                      <span className="truncate leading-[1.4]">SYICT <strong className="font-extrabold text-slate-900">{story.courseId?.title?.en || story.course || "Course"}</strong></span>
                    </div>
                    {story.location && (
                      <div className="flex items-center gap-3 text-xs text-slate-600 font-medium">
                        <div className="w-7 h-7 bg-brand-pink/10 flex items-center justify-center shrink-0 text-brand-pink rounded-lg">
                          <IoLocationOutline size={13} />
                        </div>
                        <span className="truncate leading-[1.4]">Based in <strong className="font-extrabold text-slate-900">{story.location}</strong></span>
                      </div>
                    )}
                  </div>

                  {story.videoUrl && (
                    <button
                      type="button"
                      onClick={() => setSelectedStory(story)}
                      className="w-full py-2.5 bg-gradient-to-r from-rose-50 to-pink-50 hover:from-brand-pink hover:to-rose-500 text-brand-pink hover:text-white font-extrabold text-[10px] uppercase tracking-widest flex items-center justify-center gap-1.5 transition-all rounded-lg active:scale-95"
                    >
                      <IoPlayCircleOutline size={16} />
                      <span>Watch Story</span>
                    </button>
                  )}
                </motion.div>
              ))}
            </div>
          )}

          {/* Mobile CTA inline */}
          <div className="mt-8 text-center md:hidden">
            <Link href="/courses" className="inline-block px-6 py-3 bg-gradient-to-r from-brand-pink to-brand-green text-white font-extrabold text-[10px] uppercase tracking-widest shadow-sm hover:scale-105 transition-all rounded-lg">
              Start Your Journey Today
            </Link>
          </div>
        </div>
      </section>

      {/* Mobile Sticky CTA */}
      <div className="fixed bottom-0 left-0 w-full p-3 bg-white/90 backdrop-blur-md border-t border-slate-200 z-50 md:hidden flex items-center justify-between shadow-[0_-8px_24px_rgba(0,0,0,0.06)] pb-[max(0.75rem,env(safe-area-inset-bottom))]">
        <Link href="/courses" className="flex items-center justify-center w-full min-h-[44px] py-2.5 bg-brand-green text-white font-extrabold shadow-md shadow-brand-green/30 active:scale-95 transition-transform uppercase tracking-widest text-xs rounded-lg">
          Start Your Journey Today
        </Link>
      </div>

      {selectedStory && (
        <VideoStoryModal
          story={selectedStory}
          onClose={() => setSelectedStory(null)}
        />
      )}

    </div>
  );
}
