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
  const [posts, setPosts] = useState(FALLBACK);
  const [selectedId, setSelectedId] = useState(FALLBACK[0]._id);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    api.get('/blog', { params: { limit: 5, published: true } })
      .then(res => {
        if (res.data?.data?.length) {
          setPosts(res.data.data);
          setSelectedId(res.data.data[0]._id);
        }
      })
      .catch(() => { })
      .finally(() => setIsLoading(false));
  }, []);

  const selectedPost = posts.find(p => p._id === selectedId) || posts[0];

  return (
    <section className="section py-12 md:py-28 overflow-hidden bg-white">
      <div className="container-custom px-4 sm:px-6">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8 md:mb-16 text-left"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/5 border border-slate-900/10 mb-4">
            <div className="w-1.5 h-1.5 rounded-full bg-brand-pink animate-pulse" />
            <span className="text-slate-500 font-black text-[9px] uppercase tracking-[0.3em]">The Digital Journal</span>
          </div>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-slate-900 leading-[1.15] mb-4 sm:mb-6 md:mb-8 tracking-tighter">
            Learn &amp; <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-rose-500 to-amber-500 animate-gradient-x">Stay Ahead.</span>
          </h2>
        </motion.div>

        {/* Master-Detail Container */}
        <div className="flex flex-col lg:flex-row border-2 sm:border-[3px] border-slate-900 rounded-2xl md:rounded-[3.5rem] overflow-hidden shadow-md sm:shadow-[16px_16px_0px_#f1f5f9] lg:shadow-[32px_32px_0px_#f1f5f9] min-h-0 lg:min-h-[700px]">

          {/* 1. Navigation / Master List */}
          {/* On Mobile: Rendered as a swipeable tab bar. On Desktop: Rendered as a vertical sidebar */}
          <div className="w-full lg:w-[28%] bg-slate-50 border-b-2 lg:border-b-0 lg:border-r-[3px] border-slate-900 overflow-x-auto lg:overflow-y-auto custom-scrollbar shrink-0">
            <div className="flex flex-row lg:flex-col p-3 sm:p-4 lg:p-5 gap-2 lg:space-y-2 whitespace-nowrap lg:whitespace-normal">
              {posts.map((post) => {
                const isActive = selectedId === post._id;
                return (
                  <button
                    key={post._id}
                    onClick={() => setSelectedId(post._id)}
                    className={`inline-block lg:block text-left px-4 py-3 lg:p-5 rounded-xl lg:rounded-[1.5rem] transition-all duration-300 shrink-0 ${
                      isActive ? 'bg-slate-900 text-white shadow-md lg:shadow-xl' : 'bg-white lg:bg-transparent border border-slate-200 lg:border-0 hover:bg-white hover:shadow-sm'
                    }`}
                  >
                    <span className={`text-[8px] sm:text-[9px] font-black uppercase tracking-widest block mb-1 lg:mb-2 ${isActive ? 'text-brand-pink' : 'text-slate-400'}`}>
                      {post.category}
                    </span>
                    <h4 className={`font-black leading-snug text-xs sm:text-sm lg:text-base ${isActive ? 'text-white' : 'text-slate-900'}`}>
                      {post.title?.en || post.title}
                    </h4>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Detail Viewer */}
          {/* On Mobile: Visual Image is placed on top of text, maintaining context */}
          <div className="w-full lg:w-[72%] relative overflow-hidden bg-white flex flex-col md:flex-row">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedId}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="w-full flex flex-col md:flex-row"
              >
                {/* Media Image Layer (Top on mobile, Right on tablet/desktop) */}
                <div className="w-full md:w-1/2 relative h-48 sm:h-60 md:h-auto overflow-hidden shrink-0 order-first md:order-last">
                  <ImageLoader
                    src={selectedPost.thumbnail || '/images/marketing.png'}
                    alt="blog featured image"
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 36vw"
                    className="object-cover transition-transform duration-[1500ms] hover:scale-105"
                    priority
                  />
                  {/* Soft gradient edge */}
                  <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-white to-transparent md:hidden" />
                  <div className="hidden md:block absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white via-white/50 to-transparent" />
                </div>

                {/* Text Content Block */}
                <div className="w-full md:w-1/2 flex flex-col justify-between p-6 sm:p-8 md:p-12 lg:p-16 shrink-0 bg-white">
                  <motion.div
                    initial={{ y: 12, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.05, duration: 0.4 }}
                    className="flex flex-col gap-4 sm:gap-6"
                  >
                    {/* Meta labels */}
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="px-3 py-1 bg-brand-pink text-white font-black text-[9px] uppercase tracking-[0.2em] rounded shadow-[2px_2px_0px_#0f172a]">
                        {selectedPost.category || 'INSIGHTS'}
                      </span>
                      <span className="flex items-center gap-1.5 text-slate-400 font-bold text-[9px] sm:text-[10px] uppercase tracking-widest">
                        <IoTimeOutline size={12} className="text-brand-pink" />
                        {selectedPost.readTime || '5 min read'}
                      </span>
                    </div>

                    {/* Headline */}
                    <h3 className="text-xl sm:text-2xl lg:text-4xl font-black text-slate-900 leading-tight tracking-tighter">
                      {selectedPost.title?.en || selectedPost.title}
                    </h3>

                    {/* Excerpt blockquote */}
                    <blockquote className="border-l-4 border-brand-pink pl-4 py-0.5">
                      <p className="text-slate-600 text-sm sm:text-base font-semibold italic leading-relaxed">
                        "{selectedPost.excerpt}"
                      </p>
                    </blockquote>

                    {/* Action buttons with optimized tap target sizes */}
                    <div className="flex flex-wrap items-center gap-6 pt-2">
                      <Link
                        href={`/${locale}/blog/${selectedPost.slug}`}
                        className="group flex items-center gap-3 text-slate-900 font-black text-[10px] sm:text-[11px] uppercase tracking-[0.3em] hover:text-brand-pink transition-colors min-h-[44px]"
                      >
                        Read Article
                        <span className="w-11 h-11 rounded-full border-2 border-slate-900 flex items-center justify-center group-hover:bg-slate-900 group-hover:text-white transition-all">
                          <IoArrowForwardOutline className="group-hover:translate-x-0.5" />
                        </span>
                      </Link>

                      <span className="flex items-center gap-1.5 text-slate-400 font-bold text-[9px] sm:text-[10px] uppercase tracking-[0.25em]">
                        <IoCalendarOutline size={13} className="text-slate-300" />
                        {selectedPost.createdAt
                          ? new Date(selectedPost.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
                          : ''}
                      </span>
                    </div>
                  </motion.div>

                  {/* Browse all posts footer */}
                  <div className="flex justify-start pt-6 sm:pt-8 border-t border-slate-100 mt-6 md:mt-0">
                    <Link
                      href={`/${locale}/blog`}
                      className="group flex items-center gap-3 text-slate-900 font-black text-[9px] sm:text-[10px] uppercase tracking-[0.5em] hover:text-brand-pink transition-colors min-h-[44px]"
                    >
                      Browse All
                      <span className="w-11 h-11 rounded-full border-2 border-slate-900 flex items-center justify-center group-hover:bg-slate-900 group-hover:text-white transition-all duration-300">
                        <IoArrowForwardOutline size={16} />
                      </span>
                    </Link>
                  </div>
                </div>

              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Fallback navigation for Mobile */}
        <div className="mt-8 text-center md:hidden">
          <Link href={`/${locale}/blog`} className="text-slate-900 font-black text-xs uppercase tracking-[0.3em] border-b-2 border-slate-900 pb-1.5">
            View All Stories
          </Link>
        </div>
      </div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar { height: 4px; width: 3px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #0f172a; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
      `}</style>
    </section>
  );
}
