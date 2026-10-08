'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { IoPlayCircleOutline, IoBriefcaseOutline, IoLocationOutline, IoCheckmarkCircle } from 'react-icons/io5';
import Link from 'next/link';
import api from '@/lib/api';
import VideoStoryModal from '@/components/marketing/VideoStoryModal';

const STATS = [
  { number: '15,000+', label: 'Students Trained' },
  { number: '85%', label: 'Placement Rate' },
  { number: '৳40k+', label: 'Avg. Starting Salary' },
  { number: '200+', label: 'Hiring Partners' },
];

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
      
      {/* Hero Section */}
      <section className="relative pt-24 pb-32 px-4 bg-slate-900 text-center overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[500px] opacity-20 pointer-events-none hidden md:block">
          <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-brand-accent mix-blend-screen filter blur-[100px] animate-blob"></div>
          <div className="absolute top-20 right-10 w-72 h-72 rounded-full bg-brand-pink mix-blend-screen filter blur-[100px] animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-20 left-1/2 w-72 h-72 rounded-full bg-brand-green mix-blend-screen filter blur-[100px] animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-brand-pink text-xs font-extrabold tracking-widest uppercase mb-8 backdrop-blur-md shadow-sm"
          >
            <IoCheckmarkCircle size={16} /> Our Pride
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-white leading-[1.1] mb-8 tracking-tight"
          >
            Success <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-pink via-rose-500 to-amber-500">Stories.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto mb-10 font-medium"
          >
            Meet the SYICT alumni who transformed their passion into high-paying Tech and Design careers taking the world by storm.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Link
              href="#stories"
              className="px-8 py-4 rounded-xl bg-white text-slate-900 font-extrabold uppercase tracking-widest text-xs hover:bg-slate-100 hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] transition-all inline-block"
            >
              Read Success Stories
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="relative -mt-16 z-20 container-custom">
        <div className="bg-white rounded-3xl border border-slate-100 p-8 md:p-12 shadow-xl shadow-slate-200/50">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 divide-x divide-slate-100 text-center">
            {STATS.map((stat, i) => (
              <div key={i} className="flex flex-col items-center">
                <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-2 tracking-tight">{stat.number}</h3>
                <p className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Testimonials */}
      <section id="stories" className="py-24 overflow-hidden">
        <div className="text-center max-w-2xl mx-auto mb-16 px-4">
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">Hear From <span className="text-brand-pink">Our Graduates.</span></h2>
          <p className="text-slate-600 text-lg font-medium">Watch how mastering modern skills at Smart Youth ICT fundamentally changed their trajectories.</p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="w-12 h-12 border-4 border-slate-200 border-t-brand-pink rounded-full animate-spin"></div>
          </div>
        ) : videoStories.length > 0 && (
          <div className="relative w-full flex overflow-hidden group py-8 bg-slate-100/50 border-y border-slate-200">
            <motion.div
              animate={{ x: ["0%", "-50%"] }}
              transition={{ duration: 40, ease: "linear", repeat: Infinity }}
              className="flex gap-6 px-3 w-max"
            >
              {[...videoStories, ...videoStories].map((story, i) => (
                <button
                  type="button"
                  key={i}
                  onClick={() => setSelectedStory(story)}
                  className="relative overflow-hidden rounded-3xl w-[300px] md:w-[400px] aspect-[4/5] bg-slate-200 cursor-pointer shadow-lg hover:shadow-2xl hover:-translate-y-2 shrink-0 group/card text-left focus:outline-none transition-all duration-300 border border-white"
                >
                  <Image src={story.videoThumbnail || story.studentAvatar || "/images/placeholder.png"} alt={story.studentName || "Student"} fill sizes="400px" loading="lazy" decoding="async" className="object-cover group-hover/card:scale-110 transition-transform duration-700 bg-slate-200" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/20 group-hover/card:bg-brand-pink group-hover/card:border-brand-pink group-hover/card:shadow-[0_0_30px_rgba(255,44,109,0.5)] transition-all">
                      <IoPlayCircleOutline size={48} className="ml-1 opacity-90" />
                    </div>
                  </div>

                  <div className="absolute bottom-8 left-8 right-8">
                    <h3 className="text-white font-extrabold text-xl leading-snug mb-2 truncate">{story.resultSummary}</h3>
                    <p className="text-brand-pink-light font-bold text-sm tracking-wide">{story.studentName} {story.company ? `- ${story.company}` : ''}</p>
                  </div>
                </button>
              ))}
            </motion.div>
            
            {/* Fading Edges for Marquee Effect */}
            <div className="absolute top-0 bottom-0 left-0 w-16 md:w-48 bg-gradient-to-r from-slate-50 to-transparent pointer-events-none z-10" />
            <div className="absolute top-0 bottom-0 right-0 w-16 md:w-48 bg-gradient-to-l from-slate-50 to-transparent pointer-events-none z-10" />
          </div>
        )}
      </section>

      {/* Alumni Wall Grid */}
      <section className="py-24 bg-white border-t border-slate-100">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">The Alumni <span className="text-brand-green">Wall of Fame.</span></h2>
            <p className="text-slate-600 text-lg font-medium">Hundreds of students are joining top-tier software companies and freelancing platforms every month.</p>
          </div>

          {!loading && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {gridStories.map((story, i) => (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: (i % 3) * 0.1 }}
                  key={story._id || i}
                  className="bg-white p-8 rounded-3xl border border-slate-100 hover:border-brand-green/30 hover:shadow-2xl shadow-sm transition-all duration-300 flex flex-col group relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-brand-green/5 rounded-full blur-2xl group-hover:bg-brand-green/10 transition-colors pointer-events-none"></div>

                  <div className="flex gap-4 items-center mb-8 relative z-10">
                    <div className="relative w-16 h-16 rounded-full bg-slate-100 shrink-0 border-2 border-white shadow-md overflow-hidden">
                      <Image src={story.studentAvatar || "/images/placeholder.png"} alt={story.studentName || "Student"} fill sizes="64px" loading="lazy" decoding="async" className="object-cover" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-extrabold text-slate-900 text-lg truncate mb-1">{story.studentName}</h4>
                      <p className="text-brand-green font-bold text-sm truncate">{story.resultSummary}</p>
                    </div>
                  </div>

                  <div className="space-y-4 mb-8 flex-1 relative z-10">
                    {story.company && (
                      <div className="flex items-center gap-4 text-sm text-slate-600 font-medium">
                        <div className="w-8 h-8 rounded-full bg-purple-50 flex items-center justify-center shrink-0 text-purple-600 shadow-inner">
                          <IoBriefcaseOutline size={16} />
                        </div>
                        <span className="truncate">Hired at <strong className="font-extrabold text-slate-900">{story.company}</strong></span>
                      </div>
                    )}
                    <div className="flex items-center gap-4 text-sm text-slate-600 font-medium">
                      <div className="w-8 h-8 rounded-full bg-brand-green/10 flex items-center justify-center shrink-0 text-brand-green shadow-inner">
                        <IoCheckmarkCircle size={16} />
                      </div>
                      <span className="truncate">SYICT <strong className="font-extrabold text-slate-900">{story.courseId?.title?.en || story.course || "Course"}</strong></span>
                    </div>
                    {story.location && (
                      <div className="flex items-center gap-4 text-sm text-slate-600 font-medium">
                        <div className="w-8 h-8 rounded-full bg-brand-pink/10 flex items-center justify-center shrink-0 text-brand-pink shadow-inner">
                          <IoLocationOutline size={16} />
                        </div>
                        <span className="truncate">Based in <strong className="font-extrabold text-slate-900">{story.location}</strong></span>
                      </div>
                    )}
                  </div>

                  {story.videoUrl && (
                    <button
                      type="button"
                      onClick={() => setSelectedStory(story)}
                      className="w-full py-3.5 rounded-xl bg-gradient-to-r from-rose-50 to-pink-50 hover:from-brand-pink hover:to-brand-pink-light text-brand-pink hover:text-white font-extrabold text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all shadow-sm group-hover:shadow-lg active:scale-95"
                    >
                      <IoPlayCircleOutline size={20} />
                      <span>Watch Story</span>
                    </button>
                  )}
                </motion.div>
              ))}
            </div>
          )}

          <div className="mt-24 text-center">
            <Link href="/courses" className="inline-block px-8 py-4 rounded-xl bg-gradient-to-r from-brand-pink to-brand-green text-white font-extrabold text-xs uppercase tracking-widest shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] hover:scale-105 transition-all">
              Start Your Journey Today
            </Link>
          </div>
        </div>
      </section>

      {/* Mobile Sticky CTA */}
      <div className="fixed bottom-0 left-0 w-full p-4 bg-white/90 backdrop-blur-md border-t border-slate-200 z-50 md:hidden flex items-center justify-between shadow-[0_-10px_40px_rgba(0,0,0,0.05)] pb-[max(1rem,env(safe-area-inset-bottom))]">
        <Link href="/courses" className="flex items-center justify-center w-full min-h-[44px] py-3 rounded-xl bg-brand-green text-white font-extrabold shadow-lg shadow-brand-green/30 active:scale-95 transition-transform uppercase tracking-widest text-xs">
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
