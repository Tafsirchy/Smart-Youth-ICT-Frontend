'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { IoStar, IoChatbubblesOutline, IoLogoYoutube } from 'react-icons/io5';
import api from '@/lib/api';

const STATIC_TEXT = [
  { _id: '1', name: 'Nusrat Jahan', role: 'Web Dev Student', rating: 5, text: 'Best decision of my life! The instructors are very supportive and the projects are real. I landed my first client within a month.' },
  { _id: '2', name: 'Ariful Islam', role: 'SMM Student',     rating: 5, text: 'I learned more in 3 months here than in 3 years of self-study. The hands-on approach is absolutely unmatched.' },
  { _id: '3', name: 'Sadia Khanam', role: 'Design Student',  rating: 5, text: 'Got my first Fiverr order within 2 weeks of finishing the Graphic Design course. The portfolio projects were a game-changer!' },
  { _id: '4', name: 'Milon Ahmed',  role: 'AI Student',      rating: 5, text: 'The installment option made it possible for me to join without financial stress. Worth every taka invested!' },
  { _id: '5', name: 'Fatema Begum', role: 'Web Dev Student', rating: 5, text: 'From zero coding knowledge to building full-stack apps in 6 months. The mentors are incredibly dedicated.' },
  { _id: '6', name: 'Rakib Hasan',  role: 'SMM Student',     rating: 5, text: 'My agency earns ৳50,000+ per month. This course literally changed my financial life. Highly recommend to everyone.' },
];

const STATIC_VIDEOS = [
  { _id: 'v1', name: 'Tanvir Hossain', youtubeId: 'dQw4w9WgXcQ', thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg' },
  { _id: 'v2', name: 'Mehndi Hasan', youtubeId: 'aqz-KE-BPKQ', thumbnail: 'https://img.youtube.com/vi/aqz-KE-BPKQ/hqdefault.jpg' },
  { _id: 'v3', name: 'Sumit Saha', youtubeId: 'R9I85RhI7Cg', thumbnail: 'https://img.youtube.com/vi/R9I85RhI7Cg/hqdefault.jpg' },
  { _id: 'v4', name: 'Jhankar Mahbub', youtubeId: 'SqcY0GlETPk', thumbnail: 'https://img.youtube.com/vi/SqcY0GlETPk/hqdefault.jpg' },
];

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
  return name?.split(' ').map(p => p[0]).slice(0, 2).join('').toUpperCase();
}

const AVATAR_GRADIENTS = [
  'from-pink-500 to-rose-500', 'from-blue-500 to-indigo-600',
  'from-emerald-500 to-teal-500', 'from-violet-500 to-purple-600',
  'from-amber-500 to-orange-500', 'from-cyan-500 to-blue-500',
];

export default function Testimonials() {
  const [reviews, setReviews] = useState(STATIC_TEXT);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    api.get('/testimonials', { params: { status: 'approved', limit: 12 } })
      .then(res => { 
        if (res.data?.data?.length) {
          setReviews([...res.data.data, ...STATIC_TEXT]);
        }
      })
      .catch(() => {});
  }, []);

  if (!mounted) return <div className="section h-[600px]" />; // Skeleton/Placeholder

  return (
    <section className="section relative overflow-hidden bg-white">
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none">
        <div className="absolute top-10 left-10 w-72 h-72 bg-pink-200/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-emerald-200/20 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10">
        {/* Header Section */}
        <div className="container-custom mb-24">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16 max-w-3xl mx-auto"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-pink-100 text-pink-600 text-xs font-bold tracking-wider uppercase mb-4">
              Success Stories
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight mb-6">
              What Our Students <span className="text-pink-600">Say</span>
            </h2>
            <p className="text-slate-600 text-lg md:text-xl leading-relaxed">
              Real results from real people. Join 5,000+ graduates who have transformed 
              their lives through our industry-leading courses and mentorship.
            </p>
          </motion.div>
        </div>

        {/* Scrolling Row 1: Text Reviews (Left to Right) */}
        <div className="mb-8 relative grayscale hover:grayscale-0 transition-all duration-500">
          <div className="scroll-container animate-scroll-right" style={{ '--scroll-duration': '60s' }}>
            {[...reviews, ...reviews].map((review, idx) => (
              <div 
                key={`${review._id}-${idx}`}
                className="w-[350px] mx-3 p-6 bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 group"
              >
                <div className="flex justify-between items-start mb-4">
                  <StarRating count={review.rating} />
                  <IoChatbubblesOutline className="text-slate-200 group-hover:text-pink-400 transition-colors" size={20} />
                </div>
                <p className="text-slate-700 text-sm leading-relaxed mb-6 italic">
                  &ldquo;{review.text}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${AVATAR_GRADIENTS[idx % AVATAR_GRADIENTS.length]} flex items-center justify-center text-white text-xs font-bold`}>
                    {getInitials(review.name)}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">{review.name}</h4>
                    <p className="text-[10px] text-slate-500 uppercase tracking-wider">{review.role || 'SYICT Graduate'}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Scrolling Row 2: Video Reviews (Right to Left) */}
        <div className="relative">
          <div className="scroll-container animate-scroll-left" style={{ '--scroll-duration': '50s' }}>
            {[...STATIC_VIDEOS, ...STATIC_VIDEOS, ...STATIC_VIDEOS].map((video, idx) => (
              <div 
                key={`${video._id}-${idx}`}
                className="w-[300px] mx-3 aspect-video relative rounded-2xl overflow-hidden group shadow-lg border-2 border-transparent hover:border-pink-500 transition-all duration-300"
              >
                <img 
                  src={video.thumbnail} 
                  alt={video.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all flex flex-col items-center justify-center">
                  <div className="w-12 h-12 bg-pink-600 rounded-full flex items-center justify-center text-white shadow-lg group-hover:scale-125 transition-transform">
                    <IoLogoYoutube size={24} />
                  </div>
                  <div className="absolute bottom-3 left-4 right-4">
                    <p className="text-white text-[10px] font-bold uppercase tracking-widest bg-black/60 backdrop-blur-md px-2 py-1 rounded inline-block">
                      {video.name}
                    </p>
                  </div>
                </div>
                <a 
                  href={`https://youtube.com/watch?v=${video.youtubeId}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="absolute inset-0 z-10"
                  aria-label={`Watch ${video.name}'s review`}
                />
              </div>
            ))}
          </div>
          
          {/* Side Gradients for fading effect */}
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white to-transparent pointer-events-none z-20" />
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white to-transparent pointer-events-none z-20" />
        </div>
      </div>

      {/* Stats Summary Section */}
      <div className="container-custom mt-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { val: '4.9/5', label: 'Average Rating', color: 'text-amber-500' },
            { val: '5k+', label: 'Happy Students', color: 'text-pink-600' },
            { val: '98%', label: 'Success Rate', color: 'text-emerald-500' },
            { val: '12+', label: 'Industry Partners', color: 'text-blue-600' }
          ].map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <div className={`text-3xl md:text-4xl font-black ${stat.color} mb-1`}>{stat.val}</div>
              <div className="text-slate-500 text-xs font-bold uppercase tracking-widest">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
