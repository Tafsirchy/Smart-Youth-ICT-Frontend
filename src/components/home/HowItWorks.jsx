'use client';

import { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import {
  HiPencilAlt,
  HiAcademicCap,
  HiBriefcase,
  HiCurrencyBangladeshi,
  HiBadgeCheck
} from 'react-icons/hi';

const steps = [
  {
    id: '01',
    Icon: HiPencilAlt,
    title: 'Enroll',
    desc: 'Choose your career path and join the SYICT community.',
    color: '#FF2C6D',
    animation: { rotate: [0, -10, 0], transition: { repeat: Infinity, duration: 2 } }
  },
  {
    id: '02',
    Icon: HiAcademicCap,
    title: 'Learn',
    desc: 'Master in-demand skills through project-first practical training.',
    color: '#10B981',
    animation: { scale: [1, 1.1, 1], transition: { repeat: Infinity, duration: 3 } }
  },
  {
    id: '03',
    Icon: HiBriefcase,
    title: 'Work',
    desc: 'Apply your skills in real-world internships and client projects.',
    color: '#1A6B5F',
    animation: { y: [0, -5, 0], transition: { repeat: Infinity, duration: 2.5 } }
  },
  {
    id: '04',
    Icon: HiCurrencyBangladeshi,
    title: 'Earn',
    desc: 'Generate income while you study through our freelance network.',
    color: '#F59E0B',
    animation: { scale: [1, 1.2, 1], rotate: [0, 5, -5, 0], transition: { repeat: Infinity, duration: 4 } }
  },
  {
    id: '05',
    Icon: HiBadgeCheck,
    title: 'Get Certified',
    desc: 'Graduate as a skilled professional with an industry-backed badge.',
    color: '#FF2C6D',
    animation: { filter: ['drop-shadow(0 0 0px #FF2C6D)', 'drop-shadow(0 0 10px #FF2C6D)', 'drop-shadow(0 0 0px #FF2C6D)'], transition: { repeat: Infinity, duration: 2 } }
  },
];

export default function HowItWorks() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const pathLength = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <section
      ref={containerRef}
      className="section py-12 sm:py-16 md:py-20 relative overflow-hidden bg-white"
    >
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 -left-20 w-80 h-80 bg-emerald-50 rounded-full blur-3xl opacity-60" />
        <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-pink-50 rounded-full blur-3xl opacity-60" />
      </div>

      <div className="container-custom relative z-10">
        <motion.div
          className="text-center mb-10 sm:mb-16 md:mb-24 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-slate-900 text-white text-xs font-black uppercase tracking-[0.3em] mb-6">
            The Success Journey
          </span>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-slate-900 leading-[1.15] mb-4 sm:mb-6 md:mb-8 tracking-tighter">
            How Smart Learning <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-500 animate-gradient-x">Transforms Your Future</span>
          </h2>
          <p className="text-slate-500 text-sm sm:text-base md:text-lg lg:text-xl mt-4 sm:mt-6 font-medium leading-relaxed">
            Follow our proven 5-step roadmap designed to take you from a curious beginner to a professional digital earner.
          </p>
        </motion.div>

        <div className="relative max-w-5xl mx-auto">
          {/* Central Vertical Path (Desktop) */}
          <div className="absolute left-1/2 top-10 bottom-10 w-[2px] -translate-x-1/2 hidden md:block">
            <svg
              width="2"
              height="100%"
              preserveAspectRatio="none"
              className="w-full h-full overflow-visible"
            >
              <line
                x1="1" y1="0" x2="1" y2="100%"
                stroke="#E2E8F0"
                strokeWidth="2"
                strokeDasharray="8 8"
              />
              <motion.line
                x1="1" y1="0" x2="1" y2="100%"
                stroke="#10B981"
                strokeWidth="2"
                style={{ pathLength }}
              />
            </svg>
          </div>

          <div className="space-y-16 md:space-y-0">
            {steps.map(({ id, Icon, title, desc, color, animation }, i) => (
              <div key={id} className={`flex flex-col-reverse md:flex-row items-center gap-6 md:gap-0 ${i % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>

                {/* Content Card */}
                <motion.div
                  className={`w-full md:w-[42%] bg-[#FAF9F6] rounded-3xl sm:rounded-[40px] p-6 sm:p-8 md:p-10 border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-500 group text-left ${i % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                >
                  <div className={`flex items-center gap-3 mb-3 justify-start ${i % 2 === 0 ? 'md:justify-end' : 'md:justify-start'}`}>
                    <span className="text-sm font-black text-slate-400 uppercase tracking-widest">Step {id}</span>
                    <div className="w-8 h-[2px] bg-slate-200 group-hover:bg-emerald-300 transition-colors" />
                  </div>
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-slate-900 mb-2 sm:mb-4 group-hover:text-emerald-600 transition-colors">
                    {title}
                  </h3>
                  <p className="text-slate-500 text-sm sm:text-base md:text-lg leading-relaxed font-medium">
                    {desc}
                  </p>
                </motion.div>

                {/* Center Node */}
                <div className="relative z-20 flex items-center justify-center md:w-[16%]">
                  <motion.div
                    className="w-16 h-16 md:w-20 md:h-20 rounded-[24px] bg-white shadow-lg border border-slate-100 flex items-center justify-center relative overflow-hidden group/node"
                    initial={{ scale: 0, rotate: -45 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.15 }}
                  >
                    <div
                      className="absolute inset-0 opacity-[0.08] transition-opacity group-hover/node:opacity-[0.15]"
                      style={{ background: color }}
                    />
                    <motion.div animate={animation}>
                      <Icon size={32} style={{ color }} />
                    </motion.div>
                  </motion.div>

                  {/* Floating particles or indicators */}
                  <motion.div
                    className="absolute -z-10 w-24 h-24 rounded-full blur-2xl opacity-20"
                    style={{ background: color }}
                    animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
                    transition={{ duration: 4, repeat: Infinity }}
                  />
                </div>

                {/* Empty Space for Desktop Alignment */}
                <div className="hidden md:block w-[42%]" />
              </div>
            ))}
          </div>
        </div>

        {/* Motivational Footer */}
        <motion.div
          className="mt-16 sm:mt-24 md:mt-32 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <p className="font-serif italic text-lg sm:text-xl md:text-2xl text-slate-400 mb-6 sm:mb-8">
            "Your journey of a thousand projects begins with a single step."
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3.5 sm:px-8 sm:py-4 bg-emerald-500 text-white font-black rounded-full shadow-lg shadow-emerald-500/20 uppercase tracking-widest text-xs sm:text-sm hover:bg-emerald-600 transition-colors min-h-[44px]"
          >
            Start Your Journey Today
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
