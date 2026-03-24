'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useRef } from 'react';

const methods = [
  { name: 'bKash', logo: '/images/BKash.png', desc: 'Mobile Banking', color: '#E2136E' },
  { name: 'Nagad', logo: '/images/Nagad.png', desc: 'Digital Wallet', color: '#F7941D' },
  { name: 'Rocket', logo: '/images/Rocket.png', desc: 'Mobile Banking', color: '#8C3494' },
  { name: 'Visa',  logo: '/images/Visa.png',  desc: 'Card Payment', color: '#1A1F71' },
  { name: 'Bank',  logo: '/images/Bank.png',  desc: 'Manual Transfer', color: '#006747' },
];


function HolographicCard({ name, icon, desc, color }) {
  const cardRef = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseX = useMotionValue(50);
  const mouseY = useMotionValue(50);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['10deg', '-10deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-10deg', '10deg']);

  const handleMouseMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const px = e.clientX - rect.left;
    const py = e.clientY - rect.top;
    
    const xPct = px / width - 0.5;
    const yPct = py / height - 0.5;
    
    x.set(xPct);
    y.set(yPct);
    mouseX.set((px / width) * 100);
    mouseY.set((py / height) * 100);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    mouseX.set(50);
    mouseY.set(50);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      variants={{
        hidden: { opacity: 0, scale: 0.8, y: 30 },
        visible: { opacity: 1, scale: 1, y: 0, transition: { type: 'spring', damping: 15 } },
      }}
      whileHover={{ scale: 1.05 }}
      className="relative group cursor-pointer"
    >
      {/* Outer Glow */}
      <div 
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl pointer-events-none"
        style={{ background: `linear-gradient(135deg, ${color}66, transparent 70%)` }}
      />
      
      <div className="relative overflow-hidden bg-[#ffffff0a] border border-white/10 rounded-2xl p-8 backdrop-blur-2xl transition-all duration-300 group-hover:bg-[#ffffff15] group-hover:border-white/20 h-full">
        {/* Holographic Glare */}
        <motion.div
          className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-60 transition-opacity"
          style={{
            background: useTransform(
              [mouseX, mouseY],
              ([mx, my]) => `radial-gradient(circle at ${mx}% ${my}%, rgba(255,255,255,0.15) 0%, transparent 60%)`
            ),
          }}
        />
        
        {/* Rainbow Shimmer Layer */}
        <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-10 transition-opacity bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.3)_50%,transparent_75%)] bg-[length:250%_250%] animate-[shimmer_3s_infinite_linear]" />
        
        <div style={{ transform: 'translateZ(30px)' }}>
          <div className="w-16 h-16 mb-6 text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">
            {icon}
          </div>
          <h4 className="text-white font-black text-2xl mb-2 tracking-tight">{name}</h4>
          <p className="text-white/50 text-sm leading-relaxed">{desc}</p>
        </div>

        {/* Decorative corner element */}
        <div className="absolute top-4 right-4 w-6 h-6 opacity-30 group-hover:opacity-60 transition-opacity">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-white">
            <path d="M7 7h10v10M7 17L17 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </motion.div>
  );
}

export default function PaymentMethodsSection() {
  return (
    <section 
      className="section py-20 min-h-[700px] flex items-center overflow-hidden relative" 
      style={{ 
        backgroundImage: "url('/images/bg.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >

      {/* Background Animated Gradient Blobs */}
      <div className="absolute inset-0 pointer-events-none mix-blend-screen">
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-1/4 -right-1/4 w-[600px] h-[600px] rounded-full bg-brand-pink/20 blur-[120px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute -bottom-1/4 -left-1/4 w-[500px] h-[500px] rounded-full bg-brand-accent/20 blur-[120px]"
        />
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 opacity-5 pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '30px 30px' }} />

      <div className="container-custom relative z-10 w-full overflow-hidden rounded-[2.5rem] border border-white/10 bg-black/40 backdrop-blur-md">
        <div className="flex flex-col lg:flex-row relative min-h-[500px]">
          
          {/* Left Side: Clean Background with Diagonal Cut */}
          <div className="relative lg:w-1/3 min-h-[200px] lg:min-h-full overflow-hidden bg-gradient-to-br from-white/5 to-transparent">
             <div className="absolute inset-0 flex items-center justify-center">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 0.05, scale: 1.2 }}
                  transition={{ duration: 10, repeat: Infinity, repeatType: 'reverse' }}
                  className="w-64 h-64 bg-brand-pink rounded-full blur-[100px]" 
                />
             </div>
             
             <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="hidden lg:block opacity-30"
                >
                  <p className="text-white font-black uppercase tracking-[1em] text-[8px] transform -rotate-90 origin-center whitespace-nowrap">
                    Premium Quality
                  </p>
                </motion.div>
             </div>
          </div>

          {/* Diagonal Line Decor */}
          <div className="hidden lg:block absolute left-[33.33%] top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/20 to-transparent z-20 transform -skew-x-[12deg]" />

          {/* Right Side: Content Area */}
          <div className="lg:w-2/3 p-8 lg:p-16 relative z-10 flex flex-col justify-center bg-gradient-to-br from-black/40 to-transparent"
               style={{ 
                 clipPath: 'polygon(10% 0, 100% 0, 100% 100%, 0 100%)',
                 marginLeft: '-6%' 
               }}>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-pink opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-pink"></span>
                </span>
                <span className="text-white/80 text-[8px] font-black tracking-[0.3em] uppercase">Join the Elite</span>
              </div>

              <h2 className="text-5xl md:text-7xl font-black text-white mb-6 leading-[0.9] tracking-tighter">
                Start Your <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-rose-600">Mastery.</span>
              </h2>
              
              <p className="text-white/50 text-lg md:text-xl mb-10 max-w-lg leading-relaxed font-medium">
                Unlock project-based industry level skills with our premium mentorship and secure payments.
              </p>
              
              <div className="flex flex-wrap gap-8 items-center">
                <Link
                  href="/courses"
                  className="group relative inline-flex items-center gap-3 px-8 py-5 bg-brand-pink text-white font-black text-lg rounded-xl overflow-hidden hover:shadow-[0_0_40px_rgba(255,44,109,0.3)] transition-all duration-300"
                >
                  <span className="relative z-10">Get Started</span>
                  <motion.span 
                    className="relative z-10"
                    animate={{ x: [0, 3, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </motion.span>
                  <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity" />
                </Link>
                
                <div className="flex items-center gap-3 opacity-60">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span className="text-white/60 font-black text-[9px] uppercase tracking-[0.2em]">SSL Secure Encryption</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Compact Payment Icons Grid */}
        <div className="bg-white/[0.02] border-t border-white/5 p-8 lg:p-10">
           <motion.div
              className="grid grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-8"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                visible: { transition: { staggerChildren: 0.1 } }
              }}
            >
              {methods.map((method) => (
                 <div key={method.name} className="flex items-center gap-4 p-4 rounded-xl bg-white border border-white/10 hover:shadow-[0_10px_30px_rgba(255,255,255,0.1)] transition-all duration-300 group">
                   <div className="w-12 h-10 relative group-hover:scale-110 transition-transform">
                      <Image src={method.logo} alt={method.name} fill className="object-contain" />
                   </div>
                   <div className="flex flex-col">
                      <span className="text-xs font-black text-slate-900">{method.name}</span>
                      <span className="text-[9px] font-bold text-slate-500 uppercase tracking-tighter">{method.desc}</span>
                   </div>
                </div>
              ))}
            </motion.div>
        </div>
      </div>



      {/* Giant Decorative Text */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 text-[30vw] font-black text-white/[0.03] pointer-events-none select-none -z-10 tracking-[10vw]">
        SYICT
      </div>
    </section>
  );
}
