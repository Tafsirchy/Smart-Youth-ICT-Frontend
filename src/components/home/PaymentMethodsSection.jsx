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
 <section className="section py-10 sm:py-12 bg-white relative overflow-hidden">
 {/* Subtle Background Pattern */}
 <div 
 className="absolute inset-0 pointer-events-none opacity-[0.02]" 
 style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, slate 1px, transparent 0)', backgroundSize: '40px 40px' }} 
 />

 <div className="container-custom relative z-10">
 
 {/* Main Split Container */}
 <div className="bg-slate-50 border border-slate-200 -[2rem] sm:-[3rem] p-5 sm:p-8 lg:p-10 flex flex-col lg:flex-row items-center gap-8 lg:gap-12 shadow-2xl shadow-slate-200/50">
 
 {/* Left Content Area */}
 <div className="w-full lg:w-1/2 flex flex-col items-start text-left">
 <motion.div
 initial={{ opacity: 0, y: 20 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true }}
 transition={{ duration: 0.6 }}
 >
 <div className="inline-flex items-center gap-2 px-2 py-2 mb-4 bg-white border border-slate-200 shadow-sm">
 <div className="w-2 h-2 bg-emerald-500 animate-pulse" />
 <span className="text-slate-600 text-[10px] font-black tracking-widest uppercase">
 Admissions Open
 </span>
 </div>

 <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-slate-900 leading-[1.1] mb-4 tracking-tight">
 Start Your <br />
 <span className="text-brand-pink relative inline-block mt-2">
 Mastery.
 <svg className="absolute -bottom-2 left-0 w-full h-3 text-pink-500/20" viewBox="0 0 100 10" preserveAspectRatio="none"><path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="6" strokeLinecap="round" fill="none" /></svg>
 </span>
 </h2>

 <p className="text-slate-500 text-lg sm:text-xl mb-5 leading-normal font-medium max-w-md">
 Unlock project-based, industry-level skills. Secure your spot today and get access to premium mentorship.
 </p>

 <div className="flex flex-col sm:flex-row items-center gap-4">
 <Link
 href="/courses"
 className="w-full sm:w-auto inline-flex justify-center items-center gap-3 px-5 py-2 bg-slate-900 text-white font-black text-lg hover:bg-brand-pink transition-colors duration-300 shadow-lg hover:shadow-brand-pink/30 hover:-translate-y-1"
 >
 Explore Courses
 <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
 <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
 </svg>
 </Link>
 
 <p className="text-slate-400 font-bold text-xs uppercase tracking-widest text-center sm:text-left">
 No hidden fees. <br/>Cancel anytime.
 </p>
 </div>
 </motion.div>
 </div>

 {/* Right Payment Area (Trust Widget) */}
 <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
 <motion.div 
 initial={{ opacity: 0, scale: 0.95 }}
 whileInView={{ opacity: 1, scale: 1 }}
 viewport={{ once: true }}
 transition={{ duration: 0.6, delay: 0.2 }}
 className="w-full max-w-md bg-white border border-slate-100 -[2rem] p-5 shadow-xl shadow-slate-200/50 relative overflow-hidden"
 >
 <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-brand-pink to-amber-400" />
 
 <div className="flex items-center justify-between mb-5">
 <div>
 <h3 className="text-slate-900 font-black text-xl">Secure Checkout</h3>
 <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-1">Supported Methods</p>
 </div>
 <div className="p-3 bg-slate-50 border border-slate-100">
 <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-slate-400">
 <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" strokeLinecap="round" strokeLinejoin="round"/>
 </svg>
 </div>
 </div>

 <div className="space-y-3">
 {methods.map((method) => (
 <div 
 key={method.name}
 className="flex items-center justify-between p-2 border border-slate-100 hover:border-brand-pink/30 hover:bg-slate-50 transition-colors group cursor-pointer"
 >
 <div className="flex items-center gap-2">
 <div className="w-12 h-8 relative shrink-0">
 <Image src={method.logo} alt={method.name} fill sizes="48px" className="object-contain" />
 </div>
 <span className="text-sm font-black text-slate-800">{method.name}</span>
 </div>
 <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest group-hover:text-brand-pink transition-colors">
 {method.desc}
 </span>
 </div>
 ))}
 </div>

 <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-center gap-2">
 <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="text-emerald-500">
 <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round"/>
 </svg>
 <span className="text-slate-500 text-xs font-bold tracking-wide">100% Secure & Trusted Payment</span>
 </div>
 </motion.div>
 </div>

 </div>
 </div>
 </section>
 );
}
