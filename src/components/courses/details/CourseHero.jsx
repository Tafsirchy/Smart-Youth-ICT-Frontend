"use client";

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { IoStar, IoStarOutline, IoPeopleOutline, IoPlayCircleOutline, IoCallOutline, IoDocumentTextOutline } from 'react-icons/io5';
import toast from 'react-hot-toast';

export default function CourseHero({ course, onEnroll }) {
 const title = course?.title?.en || course?.title || 'Course Details';
 const description = course?.description?.en || course?.description || 'Learn the most in-demand skills from industry experts and start your career today.';
 const enrolledCount = course?.enrolledCount || 1024;
 const instructorName = course?.instructor?.name || 'Expert Instructor';

 const handleDownloadPdf = async () => {
 if (!course?.curriculum || course.curriculum.length === 0) {
 toast.error('Curriculum syllabus is not available yet.');
 return;
 }

 const waitToast = toast.loading('Preparing curriculum PDF...');
 try {
 // Dynamic import to reduce initial bundle size
 const { default: jsPDF } = await import('jspdf');
 await import('jspdf-autotable');
 
 const doc = new jsPDF();
 doc.setFontSize(20);
 doc.text(`${title} - Syllabus`, 14, 22);
 
 doc.setFontSize(11);
 doc.setTextColor(100);
 doc.text(`Duration: ${course.duration || 'N/A'}`, 14, 30);
 
 let startY = 40;

 course.curriculum.forEach((module, index) => {
 doc.setFontSize(14);
 doc.setTextColor(40);
 doc.text(`Module ${index + 1}: ${module.title}`, 14, startY);
 
 const tableData = module.topics.map((t, i) => [`${i + 1}`, t]);
 
 doc.autoTable({
 startY: startY + 5,
 head: [['#', 'Topic']],
 body: tableData,
 theme: 'striped',
 styles: { fontSize: 10, cellPadding: 4 },
 headStyles: { fillColor: [79, 70, 229] },
 margin: { left: 14, right: 14 }
 });
 
 startY = doc.lastAutoTable.finalY + 15;
 if (startY > 270) {
 doc.addPage();
 startY = 20;
 }
 });

 doc.save(`${course.slug}-curriculum.pdf`);
 toast.success('Curriculum PDF downloaded successfully!', { id: waitToast });
 } catch (err) {
 console.error(err);
 toast.error('Failed to generate PDF.', { id: waitToast });
 }
 };

 return (
 <section className="relative overflow-hidden bg-slate-50 pt-12 pb-16 lg:pt-20 lg:pb-24">
 
 {/* Minimal Grid Background */}
 <div 
 className="absolute inset-0 pointer-events-none opacity-[0.02]" 
 style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #94a3b8 1px, transparent 0)', backgroundSize: '32px 32px' }} 
 />

 <div className="container-custom relative z-10">
 <div className="max-w-4xl">
 {course.category && (
 <motion.span 
 initial={{ opacity: 0, y: 10 }}
 animate={{ opacity: 1, y: 0 }}
 className="inline-block mb-5 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand-pink bg-pink-50 border border-pink-100 rounded-full"
 >
 {course.category}
 </motion.span>
 )}
 
 <motion.h1 
 initial={{ opacity: 0, y: 15 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ delay: 0.1 }}
 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight mb-6 text-slate-900 text-balance"
 >
 {title}
 </motion.h1>

 <motion.p 
 initial={{ opacity: 0, y: 15 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ delay: 0.2 }}
 className="text-slate-500 text-lg md:text-xl max-w-2xl leading-relaxed mb-8"
 >
 {description}
 </motion.p>

 <motion.div 
 initial={{ opacity: 0 }}
 animate={{ opacity: 1 }}
 transition={{ delay: 0.3 }}
 className="flex flex-wrap items-center gap-6 text-sm font-medium text-slate-600 mb-10"
 >
 {/* Students */}
 <div className="flex items-center gap-2">
 <div className="flex items-center justify-center p-1.5 bg-white rounded-md shadow-sm border border-slate-100">
 <IoPeopleOutline size={16} className="text-brand-pink" />
 </div>
 <span>{enrolledCount} Students</span>
 </div>

 {/* Instructor */}
 <div className="flex items-center gap-2">
 <div className="w-7 h-7 relative overflow-hidden rounded-full border border-slate-200">
 <Image src={course?.instructor?.avatar || '/images/default-avatar.png'} alt="Instructor" fill sizes="28px" className="object-cover bg-[#f0f0f0] rounded-md" priority={true} fetchPriority="high" onError={(e) => { e.target.srcset = ''; e.target.src = '/images/placeholder.png'; }} decoding="async"/>
 </div>
 <span>By <span className="font-semibold text-slate-800">{instructorName}</span></span>
 </div>
 </motion.div>

 {/* CTAs */}
 <motion.div 
 initial={{ opacity: 0, y: 10 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ delay: 0.4 }}
 className="flex flex-col sm:flex-row items-center gap-4"
 >
 <button 
 onClick={onEnroll}
 className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 bg-slate-900 text-white font-semibold rounded-lg hover:bg-slate-800 transition-colors shadow-sm"
 >
 <span>Enroll Now</span>
 </button>
 
 <div className="w-full sm:w-auto flex gap-3">
 <a 
 href="#contact"
 className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-3.5 bg-white text-slate-700 font-medium rounded-lg border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-colors shadow-sm"
 >
 <IoCallOutline size={18} className="text-slate-500" />
 <span>Contact</span>
 </a>
 <button 
 onClick={handleDownloadPdf}
 className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-3.5 bg-white text-slate-700 font-medium rounded-lg border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-colors shadow-sm"
 >
 <IoDocumentTextOutline size={18} className="text-slate-500" />
 <span>Syllabus</span>
 </button>
 </div>
 </motion.div>

 </div>
 </div>
 </section>
 );
}
