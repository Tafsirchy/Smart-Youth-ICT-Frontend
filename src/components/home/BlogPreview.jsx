'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import ImageLoader from '@/components/ui/ImageLoader';
import { useLocale } from 'next-intl';
import api from '@/lib/api';
import { IoCalendarOutline, IoArrowForwardOutline, IoTimeOutline } from 'react-icons/io5';

const FALLBACK = [
  { _id: '1', slug: 'how-to-start-freelancing', title: 'How to Start Freelancing with Zero Experience', category: 'CAREER', createdAt: '2026-03-01', readTime: '6 min', thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=900&auto=format&fit=crop', excerpt: 'The step-by-step roadmap to land your first high-paying client on Fiverr or Upwork, even with no portfolio.' },
  { _id: '2', slug: 'best-it-skills-2026', title: 'Top 5 IT Skills with Highest Demand in 2026', category: 'TRENDS', createdAt: '2026-02-22', readTime: '4 min', thumbnail: 'https://images.unsplash.com/photo-1555099962-4199c345e5dd?w=900&auto=format&fit=crop', excerpt: 'AI, full-stack dev and cybersecurity are the gold mines of 2026. Discover which skills command the highest rates.' },
  { _id: '3', slug: 'build-portfolio-fast', title: 'Build a Portfolio That Wins Clients Fast', category: 'GUIDE', createdAt: '2026-02-15', readTime: '8 min', thumbnail: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=900&auto=format&fit=crop', excerpt: 'A weak portfolio is the #1 reason freelancers fail. Learn how to curate case studies that show real-world impact.' },
  { _id: '4', slug: 'future-of-ai', title: 'The Future of AI in Modern Freelancing', category: 'AI & TECH', createdAt: '2026-03-10', readTime: '5 min', thumbnail: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=900&auto=format&fit=crop', excerpt: 'AI won\'t replace freelancers — it will empower them. Explore the essential AI stack to double your productivity.' },
];

export default function BlogPreview() {
  const locale = useLocale();
  const [posts, setPosts]       = useState(FALLBACK);
  const [selectedId, setSelectedId] = useState(FALLBACK[0]._id);

  useEffect(() => {
    api.get('/blog', { params: { limit: 5, published: true } })
      .then(res => {
        if (res.data?.data?.length) {
          setPosts(res.data.data);
          setSelectedId(res.data.data[0]._id);
        }
      })
      .catch(() => {});
  }, []);

  const selectedPost = posts.find(p => p._id === selectedId) || posts[0];

  return (
    <section className="section py-28 overflow-hidden bg-white">
      <div className="container-custom">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-slate-900/5 border border-slate-900/10 mb-6">
            <div className="w-1.5 h-1.5 rounded-full bg-brand-pink animate-pulse" />
            <span className="text-slate-500 font-black text-[10px] uppercase tracking-[0.4em]">The Digital Journal</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-black text-slate-900 tracking-tighter leading-[0.85] uppercase">
            Learn &amp; <span className="text-brand-pink italic">Stay Ahead.</span>
          </h2>
        </motion.div>

        {/* ── Master-Detail Container ── */}
        <div className="flex flex-col lg:flex-row border-[3px] border-slate-900 rounded-[3.5rem] overflow-hidden shadow-[32px_32px_0px_#f1f5f9] min-h-[700px]">

          {/* ── 1. Sidebar (leftmost column, 28%) ── */}
          <div className="lg:w-[28%] bg-slate-50 border-r-[3px] border-slate-900 overflow-y-auto custom-scrollbar shrink-0">
            <div className="p-5 space-y-2">
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.35em] mb-6 px-4">Recent Posts</p>
              {posts.map((post) => {
                const isActive = selectedId === post._id;
                return (
                  <button
                    key={post._id}
                    onClick={() => setSelectedId(post._id)}
                    className={`w-full text-left p-6 rounded-[1.5rem] transition-all duration-400 ${isActive ? 'bg-slate-900 shadow-2xl' : 'hover:bg-white hover:shadow-md'}`}
                  >
                    <span className={`text-[9px] font-black uppercase tracking-widest block mb-3 ${isActive ? 'text-brand-pink' : 'text-slate-400'}`}>
                      {post.category}
                    </span>
                    <h4 className={`font-black leading-snug text-base ${isActive ? 'text-white' : 'text-slate-900'}`}>
                      {post.title?.en || post.title}
                    </h4>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ── 2. Detail Viewer (72%) — TEXT LEFT, IMAGE RIGHT ── */}
          <div className="lg:w-[72%] relative overflow-hidden bg-white flex">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedId}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.45 }}
                className="w-full h-full flex flex-row"
              >

                {/* TEXT COLUMN ─ left half of detail viewer */}
                <div className="w-full md:w-1/2 flex flex-col justify-between px-12 py-16 md:px-16 md:py-20 shrink-0 relative z-10 bg-white">

                  {/* Top content */}
                  <motion.div
                    initial={{ x: -24, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.08, duration: 0.5 }}
                    className="flex flex-col gap-8"
                  >
                    {/* Category + Read-time */}
                    <div className="flex items-center gap-5 flex-wrap">
                      <span className="px-4 py-2 bg-brand-pink text-white font-black text-[9px] uppercase tracking-[0.3em] rounded-lg shadow-[4px_4px_0px_#0f172a]">
                        {selectedPost.category || 'INSIGHTS'}
                      </span>
                      <span className="flex items-center gap-2 text-slate-400 font-bold text-[10px] uppercase tracking-widest">
                        <IoTimeOutline size={13} className="text-brand-pink" />
                        {selectedPost.readTime || '5 min read'}
                      </span>
                    </div>

                    {/* Bold Headline */}
                    <h3 className="text-4xl lg:text-5xl font-black text-slate-900 leading-[1.05] tracking-tighter">
                      {selectedPost.title?.en || selectedPost.title}
                    </h3>

                    {/* Excerpt */}
                    <blockquote className="border-l-[5px] border-brand-pink pl-6 py-1">
                      <p className="text-slate-600 text-base lg:text-lg font-semibold italic leading-relaxed">
                        "{selectedPost.excerpt}"
                      </p>
                    </blockquote>

                    {/* Read Article CTA + Date */}
                    <div className="flex flex-wrap items-center gap-10 pt-2">
                      <Link
                        href={`/${locale}/blog/${selectedPost.slug}`}
                        className="group flex items-center gap-4 text-slate-900 font-black text-[11px] uppercase tracking-[0.5em] hover:text-brand-pink transition-colors"
                      >
                        Read Article
                        <span className="w-10 h-10 rounded-full border-2 border-slate-900 flex items-center justify-center group-hover:bg-slate-900 group-hover:text-white transition-all">
                          <IoArrowForwardOutline className="group-hover:translate-x-0.5" />
                        </span>
                      </Link>

                      <span className="flex items-center gap-2 text-slate-400 font-bold text-[10px] uppercase tracking-[0.3em]">
                        <IoCalendarOutline size={14} className="text-slate-300" />
                        {selectedPost.createdAt
                          ? new Date(selectedPost.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
                          : ''}
                      </span>
                    </div>
                  </motion.div>

                  {/* Browse All Posts — bottom of text column */}
                  <div className="flex justify-start pt-10">
                    <Link
                      href={`/${locale}/blog`}
                      className="group flex items-center gap-5 text-slate-900 font-black text-[10px] uppercase tracking-[0.7em] hover:text-brand-pink transition-colors"
                    >
                      Browse All Posts
                      <span className="w-12 h-12 rounded-full border-2 border-slate-900 flex items-center justify-center group-hover:bg-slate-900 group-hover:text-white transition-all duration-400">
                        <IoArrowForwardOutline size={20} />
                      </span>
                    </Link>
                  </div>
                </div>

                {/* IMAGE COLUMN ─ right half, left edge softly blurred into text */}
                <div className="hidden md:block w-1/2 relative overflow-hidden shrink-0">
                  <ImageLoader
                    src={selectedPost.thumbnail || '/images/marketing.png'}
                    alt="blog featured image"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-[1500ms] hover:scale-105"
                    priority
                  />
                  {/* Soft blur/fade on the left edge (the "marked" border) */}
                  <div className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-white via-white/50 to-transparent" />
                </div>

              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Mobile fallback */}
        <div className="mt-12 text-center md:hidden">
          <Link href={`/${locale}/blog`} className="text-slate-900 font-black text-xs uppercase tracking-[0.5em] border-b-2 border-slate-900 pb-2">
            View All Stories
          </Link>
        </div>
      </div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar { width: 3px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #0f172a; border-radius: 20px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
      `}</style>
    </section>
  );
}
