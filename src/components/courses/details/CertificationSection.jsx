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
 className="bg-slate-900 rounded-lg p-8 md:p-12 relative overflow-hidden mt-6"
 >
 <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)', backgroundSize: '24px 24px' }} />

 <div className="relative z-10 flex flex-col lg:flex-row items-center gap-10">
 
 {/* Left - Info */}
 <div className="flex-1 space-y-6 text-center lg:text-left">
 <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-slate-800 text-brand-pink text-xs font-semibold uppercase tracking-wider mx-auto lg:mx-0 rounded-full">
 <IoShieldCheckmark size={16} /> Official Certification
 </div>
 
 <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight leading-tight">
 Prove your skills with a recognized certificate
 </h2>
 
 <p className="text-slate-300 font-medium text-lg leading-relaxed max-w-lg mx-auto lg:mx-0">
 Upon successful completion of the coursework and final project exams, you'll receive a verifiable digital certificate. Share it proudly on LinkedIn or use it in your portfolio to land high-paying roles.
 </p>

 <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start pt-4">
 <span className="flex items-center gap-2 text-slate-200 text-sm font-medium">
 <span className="w-5 h-5 bg-emerald-500 text-white rounded-full flex items-center justify-center text-xs">✓</span> Globally Recognized
 </span>
 <span className="flex items-center gap-2 text-slate-200 text-sm font-medium">
 <span className="w-5 h-5 bg-emerald-500 text-white rounded-full flex items-center justify-center text-xs">✓</span> Sharable Link
 </span>
 </div>
 </div>

 {/* Right - Certificate Preivew */}
 <div className="lg:w-[400px] xl:w-[450px] shrink-0 relative group">
 <div className="absolute -inset-2 bg-gradient-to-r from-brand-pink to-indigo-500 blur-xl opacity-20 group-hover:opacity-40 transition duration-500 rounded-lg"></div>
 <div className="relative bg-white p-2 rounded-lg shadow-2xl transition duration-500 hover:-translate-y-1">
 <div className="aspect-[1.414/1] bg-slate-100 overflow-hidden relative rounded-lg border border-slate-200">
 <Image 
 src="/images/certificate-placeholder.png" 
 alt="Certificate"
 fill
 sizes="400px"
 loading="lazy"
 decoding="async"
 onError={(e) => { e.target.srcset = ''; e.target.src = '/images/placeholder.png'; }}
 className="object-cover bg-[#f0f0f0]"
 />
 <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center border-[8px] border-slate-200 rounded-lg">
 <IoRibbonOutline className="text-emerald-600 mb-2" size={48} />
 <h4 className="font-serif text-2xl text-slate-800 font-bold mb-1 border-b border-slate-300 pb-2 w-full">CERTIFICATE</h4>
 <p className="text-[10px] text-slate-500 uppercase tracking-widest mt-1">of Completion</p>
 <div className="mt-4 flex-1 flex items-center justify-center">
 <div className="w-32 h-1 bg-slate-300" />
 </div>
 <div className="flex justify-between w-full mt-4 px-4 gap-4">
 <div className="w-16 h-0.5 bg-slate-300" />
 <div className="w-16 h-0.5 bg-slate-300" />
 </div>
 </div>
 </div>
 </div>
 </div>

 </div>
 </motion.section>
 );
}
