'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { HiHome, HiArrowLeft } from 'react-icons/hi2';
import { useEffect, useState } from 'react';

export default function NotFound() {
  const t = useTranslations('NotFound');
  const router = useRouter();
  
  // Parallax Values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Smooth Parallax
  const smoothX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 50, damping: 20 });
  
  // Transform values for background elements
  const bgTranslateX = useTransform(smoothX, [0, 1920], [-30, 30]);
  const bgTranslateY = useTransform(smoothY, [0, 1080], [-30, 30]);
  
  // Floating elements parallax
  const floatX1 = useTransform(smoothX, [0, 1920], [-50, 50]);
  const floatY1 = useTransform(smoothY, [0, 1080], [-50, 50]);
  const floatX2 = useTransform(smoothX, [0, 1920], [50, -50]);
  const floatY2 = useTransform(smoothY, [0, 1080], [50, -50]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className="relative min-h-[95vh] w-full flex items-center justify-center overflow-hidden bg-[#fafafa] dark:bg-[#050505]">
      {/* ─── Aesthetic Background Layers ─────────────────────────────── */}
      
      {/* Animated Mesh Gradients */}
      <motion.div 
        style={{ x: bgTranslateX, y: bgTranslateY }}
        className="absolute inset-0 z-0 overflow-hidden pointer-events-none"
      >
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] mix-blend-multiply dark:mix-blend-soft-light animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-blue-400/20 rounded-full blur-[130px] mix-blend-multiply dark:mix-blend-soft-light animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-500/10 rounded-full blur-[150px]" />
      </motion.div>

      {/* Grain Overlay */}
      <div className="absolute inset-0 z-[1] opacity-[0.03] dark:opacity-[0.05] pointer-events-none grayscale contrast-150" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} 
      />

      {/* Floating 3D Elements */}
      <motion.div 
        style={{ x: floatX1, y: floatY1 }}
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        className="absolute top-20 left-[15%] z-0 w-32 h-32 hidden md:block"
      >
        <div className="w-full h-full rounded-2xl bg-gradient-to-tr from-primary/30 to-transparent border border-white/20 backdrop-blur-sm rotate-12 shadow-inner" />
      </motion.div>

      <motion.div 
        style={{ x: floatX2, y: floatY2 }}
        animate={{ rotate: -360 }}
        transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-40 right-[15%] z-0 w-48 h-48 hidden md:block"
      >
        <div className="w-full h-full rounded-full bg-gradient-to-bl from-blue-500/20 to-transparent border border-white/10 backdrop-blur-md shadow-2xl" />
      </motion.div>

      {/* ─── Main Content ───────────────────────────────────────────── */}
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-4xl px-6"
      >
        {/* Glassmorphic Card */}
        <div className="relative group overflow-hidden bg-white/40 dark:bg-black/40 backdrop-blur-2xl border border-white/30 dark:border-white/10 rounded-[3rem] p-10 md:p-20 text-center shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] dark:shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)] transition-all duration-700 hover:shadow-[0_48px_80px_-20px_rgba(0,0,0,0.15)]">
          
          {/* Inner Light Effect */}
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-transparent via-white/5 to-white/20 dark:via-white/2 dark:to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
          
          {/* 404 Typography with Animated Gradient */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="mb-8 relative select-none"
          >
            <h1 className="text-[12rem] md:text-[20rem] font-black tracking-[-0.05em] leading-none">
              <span className="bg-clip-text text-transparent bg-gradient-to-br from-gray-900 via-primary to-blue-600 dark:from-white dark:via-primary dark:to-blue-400 bg-[length:200%_auto] animate-gradient-shift">
                404
              </span>
            </h1>
            {/* Soft Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[80%] bg-primary/20 blur-[100px] -z-10 group-hover:bg-primary/30 transition-colors duration-1000" />
          </motion.div>

          {/* Text Content */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-6 tracking-tight">
              {t('title')}
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-lg md:text-2xl max-w-2xl mx-auto mb-12 leading-relaxed font-medium px-4">
              {t('description')}
            </p>
          </motion.div>

          {/* Action Buttons with Advanced Hover */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <motion.div
              whileHover={{ y: -5, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full sm:w-auto"
            >
              <Link 
                href="/"
                className="group/btn relative flex items-center justify-center gap-3 px-10 py-5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-black rounded-2xl transition-all shadow-[0_20px_40px_-10px_rgba(0,0,0,0.3)] dark:shadow-[0_20px_40px_-10px_rgba(255,255,255,0.1)] overflow-hidden"
              >
                <div className="absolute inset-0 bg-primary opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
                <HiHome className="text-2xl relative z-10" />
                <span className="relative z-10">{t('backToHome')}</span>
              </Link>
            </motion.div>

            <motion.div
              whileHover={{ y: -5, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full sm:w-auto"
            >
              <button 
                onClick={() => router.back()}
                className="flex items-center justify-center gap-3 px-10 py-5 bg-white dark:bg-white/5 text-gray-900 dark:text-white font-black rounded-2xl transition-all border-2 border-gray-100 dark:border-white/10 hover:border-primary/50 dark:hover:border-primary/50 hover:bg-gray-50 dark:hover:bg-white/10"
              >
                <HiArrowLeft className="text-2xl" />
                {t('goBack')}
              </button>
            </motion.div>
          </div>
        </div>
      </motion.div>
      
      {/* Bottom Aesthetic Bar */}
      <div className="absolute bottom-0 left-0 w-full h-1.5 bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-30" />
      
      {/* Utility Styles for Animation */}
      <style jsx global>{`
        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient-shift {
          animation: gradient-shift 8s ease infinite;
        }
      `}</style>
    </div>
  );
}
