"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { IoRocketOutline } from 'react-icons/io5';

const PROJECTS = [
 {
 title: 'E-Commerce Dashboard',
 desc: 'Full-stack dashboard with real-time sales tracking and inventory management.',
 techs: ['React', 'Node.js', 'Tailwind'],
 image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop'
 },
 {
 title: 'Social Media App',
 desc: 'A complete social platform featuring live chat, feeds, and modern UI.',
 techs: ['Next.js', 'MongoDB', 'Socket.io'],
 image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1974&auto=format&fit=crop'
 },
 {
 title: 'Portfolio Website',
 desc: 'An aesthetically pleasing, responsive portfolio to showcase your work.',
 techs: ['HTML/CSS', 'JS', 'Framer'],
 image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=2055&auto=format&fit=crop'
 }
];

export default function ProjectShowcase() {
 return (
 <motion.section
 initial="hidden"
 whileInView="visible"
 viewport={{ once: true, margin: '-50px' }}
 variants={{
 hidden: { opacity: 0 },
 visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
 }}
 className="space-y-6 pt-4"
 >
 <div className="flex items-center gap-4 pb-4 border-b border-slate-100 mb-4">
 <div className="w-10 h-10 flex items-center justify-center bg-slate-50 text-brand-pink rounded-lg">
 <IoRocketOutline size={22} />
 </div>
 <div>
 <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Real-World Projects</h2>
 <p className="text-sm text-slate-500 font-medium mt-0.5">What you'll build and add to your portfolio</p>
 </div>
 </div>

 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
 {PROJECTS.map((proj, i) => (
 <motion.div
 key={i}
 variants={{ hidden: { opacity: 0, scale: 0.95 }, visible: { opacity: 1, scale: 1 } }}
 className="group overflow-hidden border border-slate-100 rounded-lg bg-white hover:shadow-xl hover:shadow-slate-200/50 hover:-translate-y-1 transition-all duration-300 flex flex-col"
 >
 <div className="relative aspect-video overflow-hidden bg-slate-50">
 <Image 
 src={proj.image} 
 alt={proj.title} 
 fill 
 sizes="400px"
 loading="lazy"
 decoding="async"
 onError={(e) => { e.target.srcset = ''; e.target.src = '/images/placeholder.png'; }}
 className="object-cover group-hover:scale-105 transition-transform duration-500 bg-[#f0f0f0]"
 />
 </div>
 <div className="p-6 flex-1 flex flex-col">
 <h3 className="font-bold text-slate-900 text-lg mb-2">{proj.title}</h3>
 <p className="text-sm text-slate-600 leading-relaxed mb-6 flex-1">{proj.desc}</p>
 <div className="flex flex-wrap gap-2 mt-auto">
 {proj.techs.map((tech, j) => (
 <span key={j} className="text-[11px] font-semibold tracking-wide bg-slate-50 border border-slate-100 text-slate-600 px-2.5 py-1 rounded-md">
 {tech}
 </span>
 ))}
 </div>
 </div>
 </motion.div>
 ))}
 </div>
 </motion.section>
 );
}
