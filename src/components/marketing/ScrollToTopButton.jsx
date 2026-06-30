'use client';

import { useState, useEffect } from 'react';
import { FaArrowUp } from 'react-icons/fa';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

export default function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isFilling, setIsFilling] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight;
      const winHeight = window.innerHeight;
      
      if (docHeight <= winHeight) {
        setIsVisible(false);
        return;
      }
      
      const percent = scrollTop / (docHeight - winHeight);
      setScrollProgress(percent);
      
      if (percent >= 0.3 || isFilling) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [isFilling]);

  const handleTankClick = () => {
    setIsFilling(true);
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    
    // Reset the filling state after the smooth scroll finishes
    setTimeout(() => {
      setIsFilling(false);
    }, 1200);
  };

  if (pathname && (pathname.includes('/admin') || pathname.includes('/super'))) {
    return null;
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 50, opacity: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="fixed bottom-28 right-0 z-50 group"
        >
          {/* The Magnetic Slider Track (Tank) */}
          <div 
            onClick={handleTankClick}
            className="relative flex items-center justify-center w-12 h-32 cursor-pointer bg-white/90 backdrop-blur-xl border-y border-l border-pink-100 rounded-l-xl shadow-[0_8px_30px_rgba(236,72,153,0.15)] overflow-hidden transition-all duration-300 hover:w-14 hover:bg-white"
          >
            {/* Waving Liquid Fill */}
            <motion.div 
              className="absolute bottom-0 w-full z-0 pointer-events-none"
              animate={{ height: isFilling ? '100%' : `${scrollProgress * 100}%` }}
              transition={{ 
                height: { type: "spring", stiffness: isFilling ? 60 : 200, damping: isFilling ? 15 : 20 }
              }}
            >
              {/* Liquid Body */}
              <div className="absolute top-[6px] bottom-0 w-full bg-gradient-to-t from-pink-400/30 to-indigo-400/30" />
              
              {/* Wave Layer 1 (Back - Indigo) */}
              <motion.div 
                className="absolute -top-[2px] w-[200%] h-3 flex text-indigo-400/40 fill-current"
                animate={{ x: ["0%", "-50%"] }}
                transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
              >
                <svg viewBox="0 0 200 20" preserveAspectRatio="none" className="w-full h-full">
                  <path d="M0 10 Q25 0 50 10 T100 10 T150 10 T200 10 L200 20 L0 20 Z" />
                </svg>
              </motion.div>

              {/* Wave Layer 2 (Front - Pink) */}
              <motion.div 
                className="absolute -top-1 w-[200%] h-4 flex text-pink-400/50 fill-current"
                animate={{ x: ["-50%", "0%"] }}
                transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
              >
                <svg viewBox="0 0 200 20" preserveAspectRatio="none" className="w-full h-full">
                  <path d="M0 10 Q25 0 50 10 T100 10 T150 10 T200 10 L200 20 L0 20 Z" />
                </svg>
              </motion.div>
            </motion.div>

            {/* The Glowing Thumb (Arrow) */}
            <div
              className={`absolute w-8 h-8 rounded-lg bg-gradient-to-br from-pink-500 to-indigo-600 shadow-[0_4px_15px_rgba(236,72,153,0.4)] flex items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] z-10 ${
                isFilling ? 'bottom-[5.5rem]' : 'bottom-2 group-hover:bottom-[5.5rem]'
              }`}
            >
              <FaArrowUp size={14} className="text-white group-hover:animate-bounce drop-shadow-md" />
            </div>
            
            {/* Subtle inner glow on hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-pink-500/0 to-indigo-500/0 group-hover:from-pink-500/5 group-hover:to-indigo-500/5 transition-colors duration-500 pointer-events-none z-20" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
