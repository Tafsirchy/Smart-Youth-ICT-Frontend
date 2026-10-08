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
      <section className="bg-slate-900 pt-24 pb-32 px-4 text-center border-b border-slate-800">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-3 px-4 py-2 border border-slate-700 text-xs font-medium uppercase tracking-widest text-slate-400 mb-8"
          >
            Our Pride
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-6xl md:text-7xl font-light text-white leading-[1.1] mb-8 tracking-tight"
          >
            Success <br />
            <span className="font-medium">Stories.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 font-light"
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
              className="px-8 py-4 bg-white text-slate-900 font-medium uppercase tracking-widest text-xs hover:bg-slate-200 transition-colors inline-block"
            >
              Read Success Stories
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="relative -mt-12 z-20 container-custom">
        <div className="bg-white border border-slate-200 p-8 md:p-12 shadow-sm">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 text-center">
            {STATS.map((stat, i) => (
              <div key={i} className="flex flex-col items-center">
                <h3 className="text-3xl md:text-5xl font-light text-slate-900 mb-4 tracking-tight">{stat.number}</h3>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{stat.label}</p>
                {i !== STATS.length - 1 && (
                  <div className="hidden md:block absolute w-[1px] h-16 bg-slate-100 right-0 top-1/2 -translate-y-1/2" style={{ right: `${(3 - i) * 25}%` }}></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Testimonials */}
      <section id="stories" className="py-24 overflow-hidden">
        <div className="text-center max-w-2xl mx-auto mb-16 px-4">
          <h2 className="text-3xl md:text-5xl font-light text-slate-900 mb-6 tracking-tight">Hear From <br /><span className="font-medium">Our Graduates.</span></h2>
          <p className="text-slate-500 text-lg font-light">Watch how mastering modern skills at Smart Youth ICT fundamentally changed their trajectories.</p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="w-12 h-12 border-2 border-slate-200 border-t-slate-900 animate-spin"></div>
          </div>
        ) : videoStories.length > 0 && (
          <div className="relative w-full flex overflow-hidden group py-4 bg-white border-y border-slate-200">
            <motion.div
              animate={{ x: ["0%", "-50%"] }}
              transition={{ duration: 40, ease: "linear", repeat: Infinity }}
              className="flex gap-0 w-max"
            >
              {[...videoStories, ...videoStories].map((story, i) => (
                <button
                  type="button"
                  key={i}
                  onClick={() => setSelectedStory(story)}
                  className="relative overflow-hidden w-[300px] md:w-[400px] aspect-[4/5] bg-slate-900 cursor-pointer border-r border-slate-800 shrink-0 group/card text-left focus:outline-none"
                >
                  <Image src={story.videoThumbnail || story.studentAvatar || "/images/placeholder.png"} alt={story.studentName || "Student"} fill sizes="400px" loading="lazy" decoding="async" className="object-cover opacity-80 group-hover/card:opacity-100 group-hover/card:scale-105 transition-all duration-700 bg-slate-900" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent"></div>

                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 bg-white/10 backdrop-blur-md flex items-center justify-center text-white border border-white/20 group-hover/card:bg-white group-hover/card:text-slate-900 transition-colors">
                      <IoPlayCircleOutline size={32} className="ml-1" />
                    </div>
                  </div>

                  <div className="absolute bottom-8 left-8 right-8">
                    <h3 className="text-white font-medium text-lg leading-snug mb-2 truncate">{story.resultSummary}</h3>
                    <p className="text-slate-400 text-xs tracking-widest uppercase">{story.studentName} {story.company ? `// ${story.company}` : ''}</p>
                  </div>
                </button>
              ))}
            </motion.div>
          </div>
        )}
      </section>

      {/* Alumni Wall Grid */}
      <section className="py-24 bg-white border-t border-slate-200">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <h2 className="text-3xl md:text-5xl font-light text-slate-900 mb-6 tracking-tight">The Alumni <br /><span className="font-medium">Wall of Fame.</span></h2>
            <p className="text-slate-500 text-lg font-light">Hundreds of students are joining top-tier software companies and freelancing platforms every month.</p>
          </div>

          {!loading && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {gridStories.map((story, i) => (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: (i % 3) * 0.1 }}
                  key={story._id || i}
                  className="bg-slate-50 p-8 border border-slate-200 hover:border-slate-900 transition-colors flex flex-col group"
                >
                  <div className="flex gap-4 items-center mb-8 pb-8 border-b border-slate-200">
                    <div className="relative w-16 h-16 bg-slate-200 shrink-0">
                      <Image src={story.studentAvatar || "/images/placeholder.png"} alt={story.studentName || "Student"} fill sizes="64px" loading="lazy" decoding="async" className="object-cover" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-medium text-slate-900 text-lg truncate mb-1">{story.studentName}</h4>
                      <p className="text-slate-500 font-light text-sm truncate">{story.resultSummary}</p>
                    </div>
                  </div>

                  <div className="space-y-4 mb-8 flex-1">
                    {story.company && (
                      <div className="flex items-center gap-4 text-sm text-slate-600 font-light">
                        <div className="w-8 h-8 bg-white border border-slate-200 flex items-center justify-center shrink-0 text-slate-900">
                          <IoBriefcaseOutline size={16} />
                        </div>
                        <span className="truncate">Hired at <strong className="font-medium text-slate-900">{story.company}</strong></span>
                      </div>
                    )}
                    <div className="flex items-center gap-4 text-sm text-slate-600 font-light">
                      <div className="w-8 h-8 bg-white border border-slate-200 flex items-center justify-center shrink-0 text-slate-900">
                        <IoCheckmarkCircle size={16} />
                      </div>
                      <span className="truncate">SYICT <strong className="font-medium text-slate-900">{story.courseId?.title?.en || story.course || "Course"}</strong></span>
                    </div>
                    {story.location && (
                      <div className="flex items-center gap-4 text-sm text-slate-600 font-light">
                        <div className="w-8 h-8 bg-white border border-slate-200 flex items-center justify-center shrink-0 text-slate-900">
                          <IoLocationOutline size={16} />
                        </div>
                        <span className="truncate">Based in <strong className="font-medium text-slate-900">{story.location}</strong></span>
                      </div>
                    )}
                  </div>

                  {story.videoUrl && (
                    <button
                      type="button"
                      onClick={() => setSelectedStory(story)}
                      className="w-full py-4 bg-white border border-slate-200 text-slate-900 hover:bg-slate-900 hover:text-white hover:border-slate-900 font-medium text-xs uppercase tracking-widest flex items-center justify-center gap-3 transition-colors"
                    >
                      <IoPlayCircleOutline size={18} />
                      <span>Watch Story</span>
                    </button>
                  )}
                </motion.div>
              ))}
            </div>
          )}

          <div className="mt-24 text-center">
            <Link href="/courses" className="inline-block px-8 py-4 bg-slate-900 text-white font-medium text-xs uppercase tracking-widest hover:bg-slate-800 transition-colors">
              Start Your Journey Today
            </Link>
          </div>
        </div>
      </section>

      {/* Mobile Sticky CTA */}
      <div className="fixed bottom-0 left-0 w-full p-4 bg-white border-t border-slate-200 z-50 md:hidden flex items-center justify-between">
        <div>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Next Step</p>
          <p className="text-slate-900 font-medium text-sm">Join the Program</p>
        </div>
        <Link href="/courses" className="px-6 py-4 bg-slate-900 text-white font-medium text-[10px] uppercase tracking-widest text-center">
          Start Journey
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
