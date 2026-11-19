'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import {
  IoCloseOutline,
  IoBriefcaseOutline,
  IoLocationOutline,
  IoCheckmarkCircle,
  IoOpenOutline,
  IoSchoolOutline,
  IoPlay,
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
    return `https://www.youtube.com/embed/${ytMatch[1]}?autoplay=1&rel=0&modestbranding=1&playsinline=1&enablejsapi=1`;
  }

  // Vimeo match: vimeo.com/123456789
  const vimeoMatch = trimmed.match(
    /vimeo\.com\/(?:channels\/(?:\w+\/)?|groups\/([^\/]*)\/videos\/|album\/(\d+)\/video\/|)(\d+)(?:$|\/|\?)/i
  );
  if (vimeoMatch && vimeoMatch[3]) {
    return `https://player.vimeo.com/video/${vimeoMatch[3]}?autoplay=1`;
  }

  // Direct video files should use the <video> tag rather than <iframe>
  if (/\.(mp4|webm|ogg)(\?|$)/i.test(trimmed)) {
    return null;
  }

  // Direct embed format
  if (trimmed.includes('/embed/')) {
    return trimmed.includes('?') ? `${trimmed}&autoplay=1` : `${trimmed}?autoplay=1`;
  }

  return trimmed;
}

function getThumbnailUrl(story) {
  if (story?.videoThumbnail) return story.videoThumbnail;
  if (story?.videoUrl) {
    const match = story.videoUrl.match(
      /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?|shorts)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i
    );
    if (match && match[1]) {
      return `https://img.youtube.com/vi/${match[1]}/hqdefault.jpg`;
    }
  }
  return story?.studentAvatar || '/images/placeholder.png';
}

export default function VideoStoryModal({ story, onClose }) {
  const [mounted, setMounted] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [videoReady, setVideoReady] = useState(false);

  // Smooth close handler with animation completion
  const handleClose = useCallback(() => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 180);
  }, [onClose]);

  // Close on ESC key
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    },
    [handleClose]
  );

  useEffect(() => {
    setMounted(true);
    window.addEventListener('keydown', handleKeyDown);

    // Stagger iframe load by 120ms so modal entrance animation runs at 60+ FPS without thread contention
    const videoTimer = setTimeout(() => {
      setVideoReady(true);
    }, 120);

    // Lock body scroll with padding compensation to avoid layout shift
    const originalOverflow = document.body.style.overflow;
    const originalPaddingRight = document.body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = 'hidden';
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    return () => {
      clearTimeout(videoTimer);
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
      document.body.style.paddingRight = originalPaddingRight;
    };
  }, [handleKeyDown]);

  if (!story || !mounted || typeof document === 'undefined') return null;

  const embedUrl = getEmbedUrl(story.videoUrl);
  const isDirectVideo = story.videoUrl && /\.(mp4|webm|ogg)$/i.test(story.videoUrl);
  const courseName = story.courseId?.title?.en || story.courseId?.title || story.course || null;
  const thumbnailUrl = getThumbnailUrl(story);

  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isClosing ? 0 : 1 }}
      transition={{ duration: 0.18, ease: 'easeOut' }}
      className="fixed inset-0 z-[99999] flex items-center justify-center p-3 sm:p-5 md:p-8 bg-slate-950/65 overflow-y-auto isolate"
      onClick={handleClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 12 }}
        animate={
          isClosing
            ? { opacity: 0, scale: 0.96, y: 8 }
            : { opacity: 1, scale: 1, y: 0 }
        }
        transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
        style={{ willChange: 'transform, opacity' }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-slate-200/90 overflow-hidden flex flex-col my-auto max-h-[94vh] transform-gpu"
      >
        {/* Top Header Bar — Clean Light Enterprise Style */}
        <div className="p-4 sm:p-5 px-5 sm:px-6 flex items-center justify-between border-b border-slate-100 bg-white shrink-0">
          <div className="flex items-center gap-3.5 min-w-0 pr-4">
            <div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-2xl overflow-hidden ring-2 ring-emerald-500/20 bg-slate-100 shrink-0 shadow-2xs">
              <Image
                src={thumbnailUrl}
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
                <h3 className="text-slate-900 font-black text-base sm:text-lg tracking-tight truncate">
                  {story.studentName || 'SYICT Graduate'}
                </h3>
                <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200/80 px-2.5 py-0.5 rounded-full shrink-0 shadow-2xs">
                  <IoCheckmarkCircle size={12} className="text-emerald-600" />
                  <span>Story</span>
                </span>
              </div>
              <p className="text-slate-500 text-xs sm:text-sm truncate font-medium mt-0.5">
                {story.resultSummary ||
                  (story.company ? `Hired at ${story.company}` : 'Success Story')}
              </p>
            </div>
          </div>

          {/* Clean Light Close Button */}
          <button
            onClick={handleClose}
            aria-label="Close Video Modal"
            className="w-9 h-9 sm:w-10 sm:h-10 bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 transition-all flex items-center justify-center shrink-0 border border-slate-200/80 rounded-full cursor-pointer active:scale-95 shadow-2xs"
          >
            <IoCloseOutline size={22} />
          </button>
        </div>

        {/* Video Player Container — Clean Dark Theater Frame for High Video Contrast */}
        <div className="relative w-full aspect-video bg-slate-950 flex items-center justify-center overflow-hidden">
          {videoReady && embedUrl ? (
            <iframe
              src={embedUrl}
              title={`${story.studentName || 'Student'} Success Story`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
              className="w-full h-full border-0 animate-in fade-in duration-200"
            />
          ) : videoReady && isDirectVideo ? (
            <video
              src={story.videoUrl}
              controls
              autoPlay
              playsInline
              className="w-full h-full object-contain animate-in fade-in duration-200"
            />
          ) : (
            /* Smooth Loading Skeleton / Thumbnail Preview (Avoids Lag during 200ms Entrance) */
            <div className="relative w-full h-full flex items-center justify-center bg-slate-950">
              <Image
                src={thumbnailUrl}
                alt={story.studentName || 'Preview'}
                fill
                className="object-cover opacity-60"
                unoptimized={true}
              />
              <div className="relative z-10 w-16 h-16 rounded-full bg-emerald-600/90 text-white flex items-center justify-center shadow-xl animate-pulse">
                <IoPlay size={28} className="translate-x-0.5" />
              </div>
            </div>
          )}
        </div>

        {/* Bottom Story Info & Action Bar — Clean Light Enterprise Style */}
        <div className="p-4 sm:p-5 px-5 sm:px-6 bg-slate-50/90 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0">
          <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 text-xs">
            {story.company && (
              <span className="inline-flex items-center gap-1.5 bg-white px-3 py-1.5 border border-slate-200/80 rounded-xl font-bold text-slate-700 shadow-2xs">
                <IoBriefcaseOutline className="text-emerald-600 shrink-0" size={14} />
                <span>
                  Hired at{' '}
                  <strong className="text-slate-900 font-black">{story.company}</strong>
                </span>
              </span>
            )}
            {courseName && (
              <span className="inline-flex items-center gap-1.5 bg-white px-3 py-1.5 border border-slate-200/80 rounded-xl font-bold text-slate-700 shadow-2xs">
                <IoSchoolOutline className="text-indigo-600 shrink-0" size={14} />
                <span>
                  Course:{' '}
                  <strong className="text-slate-900 font-black">{courseName}</strong>
                </span>
              </span>
            )}
            {story.location && (
              <span className="inline-flex items-center gap-1.5 bg-white px-3 py-1.5 border border-slate-200/80 rounded-xl font-bold text-slate-700 shadow-2xs">
                <IoLocationOutline className="text-rose-500 shrink-0" size={14} />
                <span>
                  Based in{' '}
                  <strong className="text-slate-900 font-black">{story.location}</strong>
                </span>
              </span>
            )}
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto shrink-0 w-full sm:w-auto">
            {story.videoUrl && (
              <a
                href={story.videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2 text-xs font-bold text-slate-700 hover:text-slate-900 bg-white hover:bg-slate-100 border border-slate-200 rounded-xl transition shadow-2xs inline-flex items-center gap-1.5 cursor-pointer flex-1 sm:flex-initial justify-center"
                title="Watch on YouTube"
              >
                <span>YouTube</span>
                <IoOpenOutline size={13} />
              </a>
            )}
            <Link
              href="/courses"
              onClick={handleClose}
              className="inline-flex items-center justify-center gap-1.5 px-4 sm:px-5 py-2 bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-xl text-xs font-black uppercase tracking-wider transition shadow-sm shadow-emerald-500/20 cursor-pointer flex-1 sm:flex-initial"
            >
              <span>Explore Courses</span>
            </Link>
          </div>
        </div>
      </motion.div>
    </motion.div>,
    document.body
  );
}
