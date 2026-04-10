"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { IoShieldCheckmark, IoRibbonOutline } from 'react-icons/io5';

export default function CertificationSection() {
  return (
    <motion.section 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
      }}
      className="bg-slate-900 rounded-[2rem] p-8 md:p-12 relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #312e81 100%)' }}
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[500px] bg-emerald-500/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="relative z-10 flex flex-col lg:flex-row items-center gap-10">
        
        {/* Left - Info */}
        <div className="flex-1 space-y-6 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-300 text-xs font-bold uppercase tracking-widest mx-auto lg:mx-0">
            <IoShieldCheckmark size={14} /> Official Certification
          </div>
          
          <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            Prove your skills with a recognized certificate
          </h2>
          
          <p className="text-indigo-200 text-lg leading-relaxed max-w-lg mx-auto lg:mx-0">
            Upon successful completion of the coursework and final project exams, you'll receive a verifiable digital certificate. Share it proudly on LinkedIn or use it in your portfolio to land high-paying roles.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start pt-4">
            <span className="flex items-center gap-2 text-indigo-100 text-sm font-semibold">
              <span className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center border border-white/20">✓</span> Globally Recognized
            </span>
            <span className="flex items-center gap-2 text-indigo-100 text-sm font-semibold">
              <span className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center border border-white/20">✓</span> Sharable Link
            </span>
          </div>
        </div>

        {/* Right - Certificate Preivew */}
        <div className="lg:w-[400px] xl:w-[450px] shrink-0 relative group perspective-1000">
          <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-indigo-500 rounded-xl blur opacity-30 group-hover:opacity-70 transition duration-500"></div>
          <div className="relative bg-white p-2 rounded-xl ring-1 ring-white/50 transform transition duration-500 hover:scale-[1.02]">
            <div className="aspect-[1.414/1] bg-slate-100 rounded-lg overflow-hidden relative">
              <Image 
                src="https://images.unsplash.com/photo-15edp1?q=80&w=2000&auto=format&fit=crop" 
                // Fallback realistic tech certificate placeholder
                alt="Certificate"
                fill
                className="object-cover saturate-50 mix-blend-multiply opacity-10"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center border-[8px] border-slate-200">
                 <IoRibbonOutline className="text-emerald-600 mb-2" size={48} />
                 <h4 className="font-serif text-2xl text-slate-800 font-bold mb-1 border-b border-slate-300 pb-2 w-full">CERTIFICATE</h4>
                 <p className="text-[10px] text-slate-500 uppercase tracking-widest mt-1">of Completion</p>
                 <div className="mt-4 flex-1 flex items-center justify-center">
                   <div className="w-32 h-1 bg-slate-300 rounded-full" />
                 </div>
                 <div className="flex justify-between w-full mt-4 px-4 gap-4">
                    <div className="w-16 h-0.5 bg-slate-300 rounded" />
                    <div className="w-16 h-0.5 bg-slate-300 rounded" />
                 </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </motion.section>
  );
}
