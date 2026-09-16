'use client';

import React, { useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { 
  IoCloseOutline, 
  IoBriefcaseOutline, 
  IoLocationOutline, 
  IoCheckmarkCircle, 
  IoOpenOutline,
  IoSchoolOutline
} from 'react-icons/io5';

/**
 * Converts any standard YouTube, Vimeo, or video URL into an embeddable iframe URL.
 */
function getEmbedUrl(url) {
  if (!url) return null;
  const trimmed = url.trim();

  // YouTube match: youtube.com/watch?v=, youtu.be/, youtube.com/shorts/, youtube.com/embed/
  const ytMatch = trimmed.match(
    /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?|shorts)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i
  );
  if (ytMatch && ytMatch[1]) {
    return `https://www.youtube-nocookie.com/embed/${ytMatch[1]}?autoplay=1&rel=0&modestbranding=1&playsinline=1`;
  }

  // Vimeo match: vimeo.com/123456789
  const vimeoMatch = trimmed.match(
    /vimeo\.com\/(?:channels\/(?:\w+\/)?|groups\/([^\/]*)\/videos\/|album\/(\d+)\/video\/|)(\d+)(?:$|\/|\?)/i
  );
  if (vimeoMatch && vimeoMatch[3]) {
    return `https://player.vimeo.com/video/${vimeoMatch[3]}?autoplay=1`;
  }

  // Direct embed format
  if (trimmed.includes('/embed/')) {
    return trimmed.includes('?') ? `${trimmed}&autoplay=1` : `${trimmed}?autoplay=1`;
  }

  return trimmed;
}

export default function VideoStoryModal({ story, onClose }) {
  // Close on ESC key
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    // Lock body scroll
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [handleKeyDown]);

  if (!story) return null;

  const embedUrl = getEmbedUrl(story.videoUrl);
  const isDirectVideo = story.videoUrl && /\.(mp4|webm|ogg)$/i.test(story.videoUrl);
  const courseName = story.courseId?.title?.en || story.courseId?.title || story.course || null;

  return (
    <AnimatePresence>
      <div 
        className="fixed inset-0 z-[1000] flex items-center justify-center p-3 sm:p-5 md:p-8 bg-slate-950/85 backdrop-blur-md"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-4xl bg-slate-900 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden border border-white/10 flex flex-col max-h-[95vh]"
        >
          {/* Top Bar / Header */}
          <div className="p-4 sm:p-5 px-5 sm:px-6 flex items-center justify-between border-b border-white/10 bg-slate-900/90 backdrop-blur shrink-0">
            <div className="flex items-center gap-3 min-w-0 pr-4">
              <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-full overflow-hidden ring-2 ring-pink-500/40 shrink-0 bg-slate-800">
                <Image
                  src={story.studentAvatar || story.videoThumbnail || '/images/placeholder.png'}
                  alt={story.studentName || 'Student'}
                  fill
                  sizes="48px"
                  className="object-cover"
                  onError={(e) => {
                    e.target.srcset = '';
                    e.target.src = '/images/placeholder.png';
                  }}
                />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="text-white font-bold text-base sm:text-lg truncate">
                    {story.studentName || 'SYICT Graduate'}
                  </h3>
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider bg-pink-500/20 text-pink-300 px-2 py-0.5 rounded-full ring-1 ring-pink-500/30 shrink-0">
                    <IoCheckmarkCircle size={12} className="text-pink-400" /> Story
                  </span>
                </div>
                <p className="text-slate-400 text-xs sm:text-sm truncate">
                  {story.resultSummary || (story.company ? `Hired at ${story.company}` : 'Success Story')}
                </p>
              </div>
            </div>

            {/* Close Button */}
            <button
              onClick={onClose}
              aria-label="Close Video Modal"
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/10 text-white hover:bg-white/20 hover:scale-105 active:scale-95 transition-all flex items-center justify-center shrink-0 border border-white/10"
            >
              <IoCloseOutline size={24} />
            </button>
          </div>

          {/* Video Player Container */}
          <div className="relative w-full aspect-video bg-black flex items-center justify-center overflow-hidden">
            {embedUrl ? (
              <iframe
                src={embedUrl}
                title={`${story.studentName || 'Student'} Success Story`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="w-full h-full border-0"
              />
            ) : isDirectVideo ? (
              <video
                src={story.videoUrl}
                controls
                autoPlay
                playsInline
                className="w-full h-full object-contain"
              />
            ) : (
              <div className="flex flex-col items-center justify-center text-center p-8 space-y-3">
                <p className="text-slate-400 text-sm">
                  Video preview is currently unavailable.
                </p>
                {story.videoUrl && (
                  <a
                    href={story.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-pink-600 hover:bg-pink-500 text-white text-xs font-bold rounded-full transition-colors"
                  >
                    Open on External Player <IoOpenOutline size={14} />
                  </a>
                )}
              </div>
            )}
          </div>

          {/* Bottom Story Info & Quick Action */}
          <div className="p-4 sm:p-5 px-5 sm:px-6 bg-slate-950/60 border-t border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0">
            <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-slate-300">
              {story.company && (
                <span className="inline-flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-lg border border-white/5">
                  <IoBriefcaseOutline className="text-purple-400" size={15} />
                  <span>Hired at <strong className="text-white font-semibold">{story.company}</strong></span>
                </span>
              )}
              {courseName && (
                <span className="inline-flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-lg border border-white/5">
                  <IoSchoolOutline className="text-pink-400" size={15} />
                  <span>Course: <strong className="text-white font-semibold">{courseName}</strong></span>
                </span>
              )}
              {story.location && (
                <span className="inline-flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-lg border border-white/5">
                  <IoLocationOutline className="text-rose-400" size={15} />
                  <span>Based in <strong className="text-white font-semibold">{story.location}</strong></span>
                </span>
              )}
            </div>

            <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
              {story.videoUrl && (
                <a
                  href={story.videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 text-xs font-bold text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-xl transition-all inline-flex items-center gap-1.5"
                  title="Watch on YouTube"
                >
                  <span>YouTube</span>
                  <IoOpenOutline size={14} />
                </a>
              )}
              <Link
                href="/courses"
                onClick={onClose}
                className="px-4 py-2 bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 text-white text-xs font-bold rounded-xl transition-all shadow-md shadow-pink-600/30"
              >
                Explore Courses
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
