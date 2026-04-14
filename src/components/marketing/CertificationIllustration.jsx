"use client";

import { motion } from "framer-motion";

export default function CertificationIllustration() {
  return (
    <div className="relative w-full aspect-square max-w-[500px] mx-auto flex items-center justify-center overflow-visible">
      {/* Background Decorative Rings */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute w-[120%] h-[120%] border border-emerald-500/10 rounded-full"
        />
        <motion.div 
          animate={{ rotate: -360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute w-[90%] h-[90%] border border-cyan-500/10 rounded-[40%] blur-[2px]"
        />
        <div className="absolute w-[70%] h-[70%] bg-gradient-to-br from-emerald-500/5 to-cyan-500/5 rounded-full blur-3xl" />
      </div>

      {/* Main Illustration Container */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 w-full h-full flex items-center justify-center"
      >
        <svg viewBox="0 0 400 400" className="w-full h-full drop-shadow-2xl">
          <defs>
            <linearGradient id="medalGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="100%" stopColor="#0891b2" />
            </linearGradient>
            <linearGradient id="glassGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="white" stopOpacity="0.4" />
              <stop offset="100%" stopColor="white" stopOpacity="0.1" />
            </linearGradient>
            <filter id="glassBlur">
               <feGaussianBlur in="SourceGraphic" stdDeviation="5" />
            </filter>
          </defs>

          {/* Floating Glass Cards */}
          <motion.rect
            x="50" y="80" width="120" height="160" rx="20"
            fill="url(#glassGradient)"
            initial={{ opacity: 0, x: -20, rotate: -10 }}
            animate={{ opacity: 1, x: 0, rotate: -15, y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="backdrop-blur-md"
          />
          <motion.rect
            x="230" y="150" width="120" height="160" rx="20"
            fill="url(#glassGradient)"
            initial={{ opacity: 0, x: 20, rotate: 10 }}
            animate={{ opacity: 1, x: 0, rotate: 15, y: [0, 10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            className="backdrop-blur-md"
          />

          {/* Central Ribbon/Medal */}
          <motion.g
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            {/* Ribbons */}
            <path 
              d="M170 250 L140 340 L200 320 L260 340 L230 250" 
              fill="#065f46" 
              opacity="0.8"
            />
            <path 
              d="M180 250 L160 330 L200 310 L240 330 L220 250" 
              fill="url(#medalGradient)" 
            />

            {/* Medal Circle */}
            <circle cx="200" cy="180" r="70" fill="white" fillOpacity="0.9" />
            <circle cx="200" cy="180" r="64" fill="url(#medalGradient)" />
            <circle cx="200" cy="180" r="58" fill="none" stroke="white" strokeWidth="2" strokeDasharray="8 4" opacity="0.5" />
            
            {/* Achievement Icon (Checkbox Trophy) */}
            <motion.path
                d="M180 180 L195 195 L225 165"
                fill="none"
                stroke="white"
                strokeWidth="8"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, delay: 1 }}
            />
          </motion.g>

          {/* Sparkles */}
          {[1, 2, 3].map((i) => (
            <motion.circle
              key={i}
              cx={100 + i * 80}
              cy={120 + i * 40}
              r={3}
              fill="#34d399"
              animate={{ 
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }}
            />
          ))}
        </svg>
      </motion.div>

      {/* Floating Elements (Pure CSS/React) */}
      <motion.div 
        animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
        transition={{ duration: 7, repeat: Infinity }}
        className="absolute top-[10%] left-[15%] w-12 h-12 bg-emerald-500/20 backdrop-blur-xl rounded-2xl rotate-12 flex items-center justify-center border border-emerald-500/30 shadow-xl"
      >
        <div className="w-1/2 h-[2px] bg-emerald-500 rounded-full" />
      </motion.div>

      <motion.div 
        animate={{ y: [0, 25, 0], x: [0, -15, 0] }}
        transition={{ duration: 8, repeat: Infinity, delay: 1 }}
        className="absolute bottom-[20%] right-[10%] w-16 h-16 bg-cyan-500/20 backdrop-blur-xl rounded-full flex items-center justify-center border border-cyan-500/30 shadow-xl"
      >
        <div className="w-1/2 h-1/2 border-2 border-cyan-500 rounded-full border-dashed" />
      </motion.div>

      <style jsx>{`
        .backdrop-blur-md {
          backdrop-filter: blur(12px);
        }
      `}</style>
    </div>
  );
}
