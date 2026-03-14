'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useLocale } from 'next-intl';
import api from '@/lib/api';
import { IoCalendarOutline, IoArrowForwardOutline, IoBookOutline } from 'react-icons/io5';

const FALLBACK = [
  { _id: '1', slug: 'how-to-start-freelancing', title: 'How to Start Freelancing with Zero Experience', category: 'Career', createdAt: '2026-03-01', excerpt: 'Learn the exact roadmap to land your first client on Fiverr, even if you have no portfolio yet.' },
  { _id: '2', slug: 'best-it-skills-2026',       title: 'Top 5 IT Skills with Highest Demand in 2026',  category: 'Trends', createdAt: '2026-02-22', excerpt: 'AI, web development, and digital marketing dominate the freelancing landscape. Here\'s what to focus on.' },
  { _id: '3', slug: 'build-portfolio-fast',       title: 'Build a Portfolio That Wins Clients Fast',     category: 'Tips',   createdAt: '2026-02-15', excerpt: 'A strong portfolio is your #1 marketing asset. Here\'s how to build one that stands out.' },
];

const CATEGORY_COLORS = {
  Career: 'bg-blue-100 text-blue-700',
  Trends: 'bg-purple-100 text-purple-700',
  Tips:   'bg-emerald-100 text-emerald-700',
};

const container = { hidden: {}, visible: { transition: { staggerChildren: 0.12 } } };
const card      = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } };

export default function BlogPreview() {
  const locale  = useLocale();
  const [posts, setPosts] = useState(FALLBACK);

  useEffect(() => {
    api.get('/blog', { params: { limit: 3, published: true } })
      .then(res => { if (res.data?.data?.length) setPosts(res.data.data); })
      .catch(() => {});
  }, []);

  return (
    <section className="section" style={{ background: 'var(--color-background)' }}>
      <div className="container-custom">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <span className="badge-green mb-3">Blog & Tips</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-textPrimary">Learn & Stay Ahead</h2>
            <p className="text-textSecondary text-sm mt-2">Free articles, career tips, and IT industry insights.</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <Link href={`/${locale}/blog`} className="btn-outline text-sm px-5 py-2.5 flex items-center gap-1.5">
              View All Posts <IoArrowForwardOutline size={16} />
            </Link>
          </motion.div>
        </div>

        {/* Blog Cards */}
        <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-6"
          variants={container} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}>
          {posts.map((post) => {
            const title    = post.title?.en || post.title;
            const excerpt  = post.excerpt || post.content?.en?.substring(0, 120) || '';
            const catLabel = post.category || post.tags?.[0] || 'Blog';
            const catColor = CATEGORY_COLORS[catLabel] || 'bg-neutral-100 text-neutral-600';
            return (
              <motion.div key={post._id} variants={card}
                whileHover={{ y: -5, boxShadow: '0 16px 40px rgba(0,0,0,0.10)' }}
                transition={{ type: 'spring', stiffness: 280, damping: 18 }}>
                <Link href={`/${locale}/blog/${post.slug}`} className="block h-full">
                  <div className="card flex flex-col h-full overflow-hidden rounded-2xl">
                    {/* Thumbnail */}
                    <div className="relative h-44 bg-gradient-to-br from-blue-50 to-indigo-100 overflow-hidden">
                      {post.thumbnail ? (
                        <Image src={post.thumbnail} alt={title} fill className="object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <IoBookOutline size={48} className="text-blue-200" />
                        </div>
                      )}
                    </div>

                    <div className="p-5 flex flex-col flex-1">
                      <div className="flex items-center gap-2 mb-3">
                        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${catColor}`}>{catLabel}</span>
                        <span className="flex items-center gap-1 text-xs text-textSecondary ml-auto">
                          <IoCalendarOutline size={12} />
                          {post.createdAt ? new Date(post.createdAt).toLocaleDateString('en-BD', { day: 'numeric', month: 'short' }) : ''}
                        </span>
                      </div>

                      <h3 className="font-bold text-textPrimary mb-2 line-clamp-2 text-base leading-snug flex-1">
                        {title}
                      </h3>
                      <p className="text-xs text-textSecondary leading-relaxed line-clamp-2 mb-4">{excerpt}</p>

                      <span className="mt-auto text-xs font-bold text-blue-600 flex items-center gap-1 group-hover:gap-2 transition-all">
                        Read More <IoArrowForwardOutline size={13} />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
