'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

const methods = [
  { name: 'bKash', logo: '/images/BKash.png', desc: 'Mobile Banking', color: '#E2136E' },
  { name: 'Nagad', logo: '/images/Nagad.png', desc: 'Digital Wallet', color: '#F7941D' },
  { name: 'Rocket', logo: '/images/Rocket.png', desc: 'Mobile Banking', color: '#8C3494' },
  { name: 'Visa', logo: '/images/Visa.png', desc: 'Card Payment', color: '#1A1F71' },
  { name: 'Bank', logo: '/images/Bank.png', desc: 'Manual Transfer', color: '#006747' },
];

export default function PaymentMethodsSection() {
  return (
    <section
      className="section py-12 sm:py-20 relative overflow-hidden flex items-center min-h-0"
      style={{
        backgroundImage: "url('/images/bg.png')",
        backgroundColor: '#f0f0f0',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      {/* Background Animated Gradient Blobs */}
      <div className="absolute inset-0 pointer-events-none mix-blend-screen overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.05, 1],
            opacity: [0.15, 0.3, 0.15],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-1/4 -right-1/4 w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] rounded-full bg-brand-pink/15 blur-[80px] sm:blur-[120px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute -bottom-1/4 -left-1/4 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] rounded-full bg-brand-accent/15 blur-[80px] sm:blur-[120px]"
        />
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 opacity-5 pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '30px 30px' }} />

      <div className="container-custom px-4 sm:px-6 relative z-10 w-full">
        {/* Card panel */}
        <div className="w-full overflow-hidden rounded-2xl sm:rounded-[2.5rem] border border-white/10 bg-black/40 backdrop-blur-md shadow-[0_20px_50px_rgba(0,0,0,0.4)] lg:shadow-[0_32px_80px_rgba(0,0,0,0.5)]">

          <div className="flex flex-col lg:flex-row relative">

            {/* Left Side Panel - Hidden on Mobile to prevent empty spacing */}
            <div className="hidden lg:block relative lg:w-1/3 overflow-hidden bg-gradient-to-br from-white/5 to-transparent">
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 0.05, scale: 1.2 }}
                  transition={{ duration: 10, repeat: Infinity, repeatType: 'reverse' }}
                  className="w-64 h-64 bg-brand-pink rounded-full blur-[100px]"
                />
              </div>
              <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                <div className="opacity-30">
                  <p className="text-white font-black uppercase tracking-[1em] text-[8px] transform -rotate-90 origin-center whitespace-nowrap">
                    Premium Quality
                  </p>
                </div>
              </div>
            </div>

            {/* Diagonal Line Decor - Hidden on mobile */}
            <div className="hidden lg:block absolute left-[33.33%] top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/20 to-transparent z-20 transform -skew-x-[12deg]" />

            {/* Right Side: Content Area (Using responsive CSS class for desktop clip path) */}
            <div className="w-full lg:w-2/3 p-6 sm:p-10 lg:p-16 relative z-10 flex flex-col justify-center bg-gradient-to-br from-black/40 to-transparent diagonal-clip-container">
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                {/* Security Tag */}
                <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 sm:mb-6 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-pink opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-pink"></span>
                  </span>
                  <span className="text-white/80 text-[8px] font-black tracking-[0.25em] uppercase">Join the Elite</span>
                </div>

                <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-white leading-[1.15] mb-4 sm:mb-6 md:mb-8 tracking-tighter">
                  Start Your <br className="hidden sm:block" />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-rose-500 to-amber-500 animate-gradient-x">Mastery.</span>
                </h2>

                <p className="text-white/60 text-sm sm:text-base lg:text-lg mb-6 sm:mb-8 max-w-lg leading-relaxed font-medium">
                  Unlock project-based industry level skills with our premium mentorship and secure payments.
                </p>

                <div className="flex flex-wrap gap-4 sm:gap-6 items-center">
                  <Link
                    href="/courses"
                    className="group relative inline-flex items-center gap-3 px-6 py-4 sm:px-8 sm:py-5 bg-brand-pink text-white font-black text-base sm:text-lg rounded-xl overflow-hidden hover:shadow-[0_0_30px_rgba(255,44,109,0.25)] transition-all duration-300 min-h-[48px]"
                  >
                    <span className="relative z-10">Get Started</span>
                    <motion.span
                      className="relative z-10"
                      animate={{ x: [0, 3, 0] }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                        <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </motion.span>
                    <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity" />
                  </Link>

                  <div className="flex items-center gap-2 opacity-70">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-white/70 font-black text-[9px] sm:text-[10px] uppercase tracking-[0.15em]">SSL Secure Encryption</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Compact Payment Icons Grid */}
          {/* On Mobile: grid-cols-1 on tiny screens, grid-cols-2 on sm, grid-cols-5 on desktop */}
          <div className="bg-white/[0.02] border-t border-white/5 p-5 sm:p-8 lg:p-10">
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4 lg:gap-8"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                visible: { transition: { staggerChildren: 0.08 } }
              }}
            >
              {methods.map((method) => (
                <div
                  key={method.name}
                  className="flex items-center gap-3 p-3 rounded-xl bg-white border border-white/10 hover:shadow-[0_8px_24px_rgba(255,255,255,0.08)] transition-all duration-300 group"
                >
                  <div className="w-10 h-8 relative group-hover:scale-105 transition-transform shrink-0">
                    <Image src={method.logo} alt={method.name} fill sizes="40px" loading="lazy" decoding="async" onError={(e) => { e.target.srcset = ''; e.target.src = '/images/placeholder.png'; }} className="object-contain" />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-xs font-black text-slate-900 truncate">{method.name}</span>
                    <span className="text-[8px] sm:text-[9px] font-bold text-slate-500 uppercase tracking-tighter truncate">{method.desc}</span>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Giant Decorative Background Text */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 text-[30vw] font-black text-white/[0.02] pointer-events-none select-none -z-10 tracking-[10vw]">
        SYICT
      </div>

      {/* Responsive styling to restrict clipping logic strictly to desktop viewports */}
      <style jsx>{`
        @media (min-width: 1024px) {
          .diagonal-clip-container {
            clip-path: polygon(10% 0, 100% 0, 100% 100%, 0 100%);
            margin-left: -6%;
          }
        }
      `}</style>
    </section>
  );
}
