'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function ProgressBar({ progress = 0, label = 'Course Progress' }) {
  return (
    <div className="w-full">
      <div className="flex justify-between items-end mb-2">
        <span className="text-sm font-semibold text-neutral-700">{label}</span>
        <span className="text-sm font-bold text-emerald-600">{progress}%</span>
      </div>
      <div className="w-full bg-neutral-200 rounded-full h-2.5 dark:bg-neutral-200 overflow-hidden">
        <motion.div
          className="bg-emerald-500 h-2.5 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
}
