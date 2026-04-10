"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { IoStar, IoStarOutline } from 'react-icons/io5';

const REVIEWS = [
  { name: 'Rahim Islam', rating: 5, text: 'This course was a game-changer for me. the curriculum is very practical and I was able to land a freelance job within 2 months.' },
  { name: 'Sadia Rahman', rating: 5, text: 'Excellent instructor and very clear explanations. The project-based approach helped me build a strong portfolio.' },
  { name: 'Tanvir Hasan', rating: 4, text: 'Great content, but fast-paced. Luckily, having lifetime access means I can re-watch the tricky parts.' },
  { name: 'Ayesha Chowdhury', rating: 5, text: 'Highly recommended! The support team is very responsive and the community is helpful.' },
];

export default function ReviewsGrid({ course }) {
  const rating = course?.rating || 4.8;

  return (
    <motion.section 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      variants={{
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
      }}
      className="space-y-8 pt-6"
    >
      <div className="flex flex-col md:flex-row gap-8 items-center md:items-start bg-slate-50 rounded-3xl p-6 border border-slate-100/60 shadow-sm">
        {/* Overall Score */}
        <div className="text-center shrink-0">
          <p className="text-6xl font-black text-slate-900 tracking-tighter">{rating}</p>
          <div className="flex justify-center gap-1 my-2">
            {[...Array(5)].map((_, i) => (
              <IoStar key={i} size={20} className={i < Math.round(rating) ? 'text-amber-400' : 'text-slate-300'} />
            ))}
          </div>
          <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">Course Rating</p>
        </div>

        {/* Rating Bars */}
        <div className="flex-1 w-full space-y-2.5">
          {[5,4,3,2,1].map(star => (
            <div key={star} className="flex items-center gap-3 text-sm font-semibold text-slate-600">
              <span className="w-4 text-right">{star}</span>
              <IoStar size={14} className="text-amber-400 shrink-0" />
              <div className="flex-1 bg-slate-200 rounded-full h-2 overflow-hidden">
                <div 
                  className="bg-amber-400 h-2 rounded-full" 
                  style={{ width: star === 5 ? '75%' : star === 4 ? '15%' : star === 3 ? '5%' : '0%' }} 
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {REVIEWS.map((rev, i) => (
          <motion.div 
            key={i}
            variants={{ hidden: { opacity: 0, scale: 0.95 }, visible: { opacity: 1, scale: 1 } }}
            className="p-6 rounded-2xl bg-white border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-base">
                  {rev.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 leading-tight">{rev.name}</h4>
                  <span className="text-xs text-slate-400 font-medium">Verified Student</span>
                </div>
              </div>
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, j) => (
                  <IoStar key={j} size={14} className={j < rev.rating ? 'text-amber-400' : 'text-slate-200'} />
                ))}
              </div>
            </div>
            <p className="text-slate-600 text-sm leading-relaxed italic">"{rev.text}"</p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
