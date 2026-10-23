'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  IoCloseOutline,
  IoChevronBackOutline,
  IoChevronForwardOutline,
  IoImageOutline,
} from 'react-icons/io5';

export default function CampusGalleryLightbox({
  isOpen,
  images = [],
  initialIndex = 0,
  branchName = 'Campus',
  onClose,
}) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex, isOpen]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
  }, [images.length]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
  }, [images.length]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, handlePrev, handleNext]);

  if (!isOpen || !images.length) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[1200] flex items-center justify-center bg-black/90 backdrop-blur-md">
        {/* Top Header Bar */}
        <div className="absolute top-0 inset-x-0 z-20 flex items-center justify-between px-6 py-4 bg-gradient-to-b from-black/80 to-transparent text-white">
          <div className="flex items-center gap-2">
            <IoImageOutline className="text-blue-400" size={20} />
            <div>
              <h3 className="font-extrabold text-sm tracking-wide text-white">
                {branchName} — Campus & Lab Showcase
              </h3>
              <p className="text-[11px] text-neutral-400">
                Photo {currentIndex + 1} of {images.length}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 text-neutral-400 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-colors active:scale-95"
            aria-label="Close lightbox"
          >
            <IoCloseOutline size={24} />
          </button>
        </div>

        {/* Main Image Display */}
        <div className="relative w-full h-full flex items-center justify-center p-4 sm:p-12">
          {images.length > 1 && (
            <button
              type="button"
              onClick={handlePrev}
              className="absolute left-4 sm:left-8 z-20 p-3 bg-black/50 hover:bg-black/80 text-white rounded-full transition-all active:scale-90 border border-white/10 hover:border-white/30"
              aria-label="Previous image"
            >
              <IoChevronBackOutline size={24} />
            </button>
          )}

          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="relative max-w-5xl max-h-[80vh] flex items-center justify-center"
          >
            <img
              src={images[currentIndex]}
              alt={`${branchName} photo ${currentIndex + 1}`}
              className="max-w-full max-h-[75vh] object-contain rounded-xl shadow-2xl border border-white/10"
              onError={(e) => {
                e.currentTarget.src =
                  'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80';
              }}
            />
          </motion.div>

          {images.length > 1 && (
            <button
              type="button"
              onClick={handleNext}
              className="absolute right-4 sm:right-8 z-20 p-3 bg-black/50 hover:bg-black/80 text-white rounded-full transition-all active:scale-90 border border-white/10 hover:border-white/30"
              aria-label="Next image"
            >
              <IoChevronForwardOutline size={24} />
            </button>
          )}
        </div>

        {/* Bottom Thumbnail Strip */}
        {images.length > 1 && (
          <div className="absolute bottom-4 inset-x-0 z-20 flex justify-center gap-2 px-4 overflow-x-auto no-scrollbar py-2">
            {images.map((img, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setCurrentIndex(idx)}
                className={`relative w-16 h-12 rounded-lg overflow-hidden shrink-0 border-2 transition-all ${
                  currentIndex === idx
                    ? 'border-blue-500 scale-105 shadow-lg shadow-blue-500/30'
                    : 'border-white/20 opacity-60 hover:opacity-100'
                }`}
              >
                <img
                  src={img}
                  alt={`Thumbnail ${idx + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>
    </AnimatePresence>
  );
}
