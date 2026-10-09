"use client";

import { motion } from "framer-motion";
import { IoCheckmarkCircle, IoRibbonOutline, IoLibraryOutline, IoShieldCheckmarkOutline } from "react-icons/io5";

const licenses = [
 {
 title: "ISO 9001:2015 Certified",
 description: "Internationally recognized standard ensuring our educational services meet the strict needs of students through an effective quality management system.",
 icon: <IoRibbonOutline size={24} />,
 },
 {
 title: "Government Registered Institute",
 description: "Fully licensed training facility under the technical education board, ensuring valid compliance with national standard regulatory frameworks.",
 icon: <IoLibraryOutline size={24} />,
 },
 {
 title: "Recognized Digital Sandbox",
 description: "Awarded validation by top regional IT associations for continuous and relentless contribution to the local software economy.",
 icon: <IoShieldCheckmarkOutline size={24} />,
 },
];

export default function CertificationsPage() {
 return (
 <section className="min-h-screen pb-24 md:pb-32 bg-white pt-24 md:pt-32 overflow-hidden relative flex flex-col font-sans">
 <div className="container-custom">
 <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center max-w-7xl mx-auto">

 {/* Text Content */}
 <div className="max-w-2xl relative z-10">
 <motion.div
 initial={{ opacity: 0, x: -20 }}
 animate={{ opacity: 1, x: 0 }}
 className="flex items-center gap-4 mb-8"
 >
 <div className="w-8 h-[1px] bg-slate-300"></div>
 <p className="text-xs font-medium uppercase tracking-[0.2em] text-slate-500">
 Approvals & Trust
 </p>
 </motion.div>
 
 <motion.h1
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ delay: 0.1 }}
 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-slate-900 leading-[1.05] tracking-tight mb-8"
 >
 <span className="font-semibold">Certifications.</span>
 </motion.h1>
 
 <motion.p
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ delay: 0.2 }}
 className="text-slate-500 text-lg md:text-xl leading-relaxed mb-12 font-light"
 >
 When you earn a certificate from Smart Youth ICT, you carry a credential backed by the Government and international ISO standards. It's not just a piece of paper; it's a testament to rigorous quality.
 </motion.p>

 <ul className="space-y-8 md:space-y-10">
 {licenses.map((item, i) => (
 <motion.li
 key={i}
 initial={{ opacity: 0, y: 20 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true }}
 transition={{ delay: i * 0.1 }}
 className="flex gap-6 group"
 >
 <div className="w-14 h-14 flex items-center justify-center shrink-0 bg-slate-50 border border-slate-100 text-slate-600 group-hover:scale-110 group-hover:bg-slate-900 group-hover:text-white transition-all duration-500 rounded-lg">
 {item.icon}
 </div>
 <div>
 <h3 className="text-xl font-medium text-slate-900 mb-2 tracking-tight">{item.title}</h3>
 <p className="text-slate-500 font-light leading-relaxed">{item.description}</p>
 </div>
 </motion.li>
 ))}
 </ul>
 </div>

 {/* Graphical Certs Display */}
 <div className="relative h-[600px] w-full hidden lg:block">
 <motion.div
 initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
 animate={{ opacity: 1, scale: 1, rotate: 0 }}
 transition={{ duration: 0.8, ease: "easeOut" }}
 className="absolute top-10 right-10 w-[360px] h-[480px] bg-white -[2rem] shadow-[0_20px_60px_rgb(0,0,0,0.05)] border border-slate-100 p-8 z-20 hover:-translate-y-2 hover:shadow-[0_30px_70px_rgb(0,0,0,0.08)] transition-all duration-500"
 >
 <div className="w-full h-full border border-slate-200 flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
 <div className="absolute top-0 left-0 w-full h-1 bg-slate-900"></div>
 <div className="w-16 h-16 flex items-center justify-center text-slate-900 mb-8 border border-slate-200 rounded-lg">
 <IoRibbonOutline size={28} />
 </div>
 <h4 className="font-serif text-2xl font-medium text-slate-900 mb-3 tracking-tight">Certificate of Excellence</h4>
 <p className="text-[10px] uppercase tracking-widest text-slate-400 mb-10">ISO 9001:2015 Approved</p>
 <div className="w-32 h-[1px] bg-slate-300 mb-3"></div>
 <p className="text-[10px] font-medium text-slate-500 uppercase tracking-widest">Authorized Signature</p>
 </div>
 </motion.div>

 <motion.div
 initial={{ opacity: 0, scale: 0.9, rotate: 4 }}
 animate={{ opacity: 1, scale: 1, rotate: 2 }}
 transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
 className="absolute top-32 left-0 w-[360px] h-[480px] bg-slate-50 -[2rem] shadow-[0_10px_40px_rgb(0,0,0,0.03)] border border-slate-200 p-8 z-10 hover:-translate-y-1 transition-all duration-500"
 >
 <div className="w-full h-full border border-slate-200 flex flex-col items-center justify-center p-6 text-center border-dashed">
 <div className="w-16 h-16 flex items-center justify-center text-slate-500 mb-8 bg-white border border-slate-100 shadow-sm rounded-lg">
 <IoLibraryOutline size={28} />
 </div>
 <h4 className="font-serif text-xl font-medium text-slate-800 mb-3 tracking-tight">Government Approval</h4>
 <p className="text-[10px] uppercase tracking-widest text-slate-400 mb-10">Tech Education Board</p>
 <div className="flex gap-4">
 <div className="w-20 h-1 bg-slate-300"></div>
 <div className="w-20 h-1 bg-slate-300"></div>
 </div>
 </div>
 </motion.div>
 </div>

 </div>
 </div>

 {/* Mobile Sticky CTA */}
 <div className="fixed bottom-0 left-0 w-full p-4 bg-white/90 backdrop-blur-md border-t border-slate-100 z-50 md:hidden flex items-center justify-between pb-[max(1rem,env(safe-area-inset-bottom))]">
 <div>
 <p className="text-[10px] font-medium text-slate-400 uppercase tracking-widest mb-0.5">Next Step</p>
 <p className="text-slate-900 font-medium text-sm">Join the Program</p>
 </div>
 <button className="px-6 py-3 min-h-[44px] bg-slate-900 text-white font-medium text-[11px] uppercase tracking-wider transition-transform active:scale-95 rounded-md">
 Apply Now
 </button>
 </div>
 </section>
 );
}
