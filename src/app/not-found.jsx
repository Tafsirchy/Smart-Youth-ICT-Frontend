'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { HiHome } from 'react-icons/hi2';

export default function GlobalNotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#fafafa] dark:bg-[#050505] px-6">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] mix-blend-multiply dark:mix-blend-soft-light" />
        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-400/10 rounded-full blur-[100px]" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-xl"
      >
        <div className="bg-white/40 dark:bg-black/40 backdrop-blur-2xl border border-white/30 dark:border-white/10 rounded-[2.5rem] p-10 md:p-14 text-center shadow-2xl">
          
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="mb-8 relative select-none"
          >
            <h1 className="text-[12rem] font-black tracking-tighter leading-none text-gray-900 dark:text-white opacity-90">
              404
            </h1>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-primary/5 blur-3xl -z-10" />
          </motion.div>

          <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white mb-6 tracking-tight">
            Lost Somewhere?
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-lg md:text-xl mb-12 font-medium">
            The page you're looking for doesn't exist or has moved to a new dimension.
          </p>

          <motion.div
            whileHover={{ y: -5, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Link 
              href="/bn"
              className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-black rounded-2xl transition-all shadow-xl shadow-black/10 dark:shadow-white/5 hover:bg-primary dark:hover:bg-primary dark:hover:text-white"
            >
              <HiHome className="text-2xl" />
              Return Home
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
