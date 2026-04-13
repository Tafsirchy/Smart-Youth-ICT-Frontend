'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { IoPlayCircleOutline, IoBriefcaseOutline, IoLocationOutline, IoCheckmarkCircle } from 'react-icons/io5';
import Link from 'next/link';

// Mock Data
const ALUMNI = [
  { id: 1, name: 'Rafiqul Islam', role: 'Frontend Engineer', company: 'BrainStation-23', img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop', course: 'Web Development Masterclass', location: 'Dhaka, BD' },
  { id: 2, name: 'Sadia Rahman', role: 'UI/UX Designer', company: 'Pathao', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop', course: 'Graphic & UI/UX Design', location: 'Dhaka, BD' },
  { id: 3, name: 'Hasan Mahmud', role: 'Top Rated Freelancer', company: 'Upwork', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop', course: 'Digital Marketing pro', location: 'Sylhet, BD' },
  { id: 4, name: 'Nusrat Jahan', role: 'Software Developer', company: 'TigerIT', img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop', course: 'Full-Stack MERN', location: 'Remote' },
  { id: 5, name: 'Anisur Rahman', role: 'SEO Expert', company: 'Fiverr (Level 2)', img: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop', course: 'SEO Fundamentals', location: 'Khulna, BD' },
  { id: 6, name: 'Mithila Farzana', role: 'React Content Developer', company: 'Enosis Solutions', img: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop', course: 'Advanced React.js', location: 'Dhaka, BD' },
];

const STATS = [
  { number: '15,000+', label: 'Students Trained' },
  { number: '85%', label: 'Placement Rate' },
  { number: '৳40k+', label: 'Avg. Starting Salary' },
  { number: '200+', label: 'Hiring Partners' },
];

export default function SuccessStoriesPage() {
  return (
    <div className="min-h-screen bg-slate-50 overflow-hidden">
      
      {/* ── Hero Section ── */}
      <section className="relative pt-20 pb-32 px-4 bg-[#0f172a] overflow-hidden text-center">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[500px] opacity-20 pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-screen filter blur-[100px] animate-blob"></div>
          <div className="absolute top-20 right-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-screen filter blur-[100px] animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-20 left-1/2 w-72 h-72 bg-pink-500 rounded-full mix-blend-screen filter blur-[100px] animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto">
          <motion.span 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-blue-200 text-sm font-bold tracking-widest uppercase mb-6 backdrop-blur-md">
            <IoCheckmarkCircle size={18} /> Our Pride
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-black text-white leading-[1.1] mb-8 tracking-tighter">
            Success <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-rose-500 to-amber-500 animate-gradient-x">Stories</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto mb-10">
            Meet the SYICT alumni who transformed their passion into high-paying Tech and Design careers taking the world by storm.
          </motion.p>
          
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 }} className="flex flex-wrap justify-center gap-4">
             <Link href="#stories" className="px-8 py-4 bg-white text-slate-900 font-extrabold rounded-full hover:bg-blue-50 hover:scale-105 transition-all shadow-[0_0_30px_rgba(255,255,255,0.3)]">
               Read Success Stories
             </Link>
          </motion.div>
        </div>
      </section>

      {/* ── Stats Bar ── */}
      <section className="relative -mt-16 z-20 container-lg mx-auto px-4 max-w-5xl">
        <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 p-8 md:p-12">
           <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 divide-x divide-slate-100 text-center">
              {STATS.map((stat, i) => (
                <div key={i}>
                  <h3 className="text-3xl md:text-4xl font-black text-slate-800 mb-2">{stat.number}</h3>
                  <p className="text-sm font-bold text-slate-500 uppercase tracking-wider">{stat.label}</p>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* ── Video Testimonials (Infinite Scroll Marquee) ── */}
      <section id="stories" className="py-20 overflow-hidden">
        <div className="text-center max-w-2xl mx-auto mb-16 px-4">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">Hear From Our Graduates</h2>
          <p className="text-slate-500 text-lg">Watch how mastering modern skills at Smart Youth ICT changed their lives completely.</p>
        </div>

        <div className="relative w-full flex overflow-hidden group py-4">
          <motion.div 
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 30, ease: "linear", repeat: Infinity }}
            className="flex gap-6 px-3 w-max"
          >
            {[1, 2, 3, 4, 5, 1, 2, 3, 4, 5].map((v, i) => (
               <div key={i} className="relative rounded-3xl overflow-hidden w-[300px] md:w-[400px] aspect-[4/5] bg-slate-200 cursor-pointer shadow-lg hover:shadow-2xl transition-all shrink-0 group/card">
                 <Image src={`https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=800&fit=crop&q=80&sig=${v}`} alt="Student Testimonial" fill className="object-cover group-hover/card:scale-110 transition-transform duration-700" />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                 
                 <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white group-hover/card:bg-blue-600 transition-colors shadow-[0_0_20px_rgba(0,0,0,0.3)]">
                      <IoPlayCircleOutline size={40} className="opacity-90 ml-1" />
                    </div>
                 </div>

                 <div className="absolute bottom-6 left-6 right-6">
                   <h3 className="text-white font-bold text-lg leading-snug mb-1">How I landed a $40k Remote US job in 6 Months.</h3>
                   <p className="text-slate-300 text-sm font-medium">Aminul H. - Web Developer</p>
                 </div>
               </div>
            ))}
          </motion.div>
          
          {/* Fading Edges for Marquee Effect */}
          <div className="absolute top-0 bottom-0 left-0 w-16 md:w-48 bg-gradient-to-r from-slate-50 to-transparent pointer-events-none z-10" />
          <div className="absolute top-0 bottom-0 right-0 w-16 md:w-48 bg-gradient-to-l from-slate-50 to-transparent pointer-events-none z-10" />
        </div>
      </section>

      {/* ── Alumni Wall Grid ── */}
      <section className="py-20 bg-white border-t border-slate-100">
        <div className="container-lg mx-auto px-4 max-w-6xl">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">The Alumni Wall of Fame</h2>
            <p className="text-slate-500 text-lg">Hundreds of students are joining top-tier software companies and freelancing platforms every month.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {ALUMNI.map((alumni, i) => (
               <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ delay: i * 0.1 }}
                  key={alumni.id} className="bg-slate-50 rounded-3xl p-6 border border-slate-100 hover:border-blue-200 hover:shadow-xl transition-all group">
                 <div className="flex gap-4 items-center mb-6">
                    <div className="relative w-16 h-16 rounded-full overflow-hidden shadow-sm ring-2 ring-white">
                      <Image src={alumni.img} alt={alumni.name} fill className="object-cover" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-lg">{alumni.name}</h4>
                      <p className="text-blue-600 font-bold text-sm">{alumni.role}</p>
                    </div>
                 </div>

                 <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-3 text-sm text-slate-600 font-medium">
                       <div className="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center shrink-0">
                         <IoBriefcaseOutline className="text-purple-500" size={16} />
                       </div>
                       Hired at <strong className="text-slate-900">{alumni.company}</strong>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-slate-600 font-medium">
                       <div className="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center shrink-0">
                         <IoCheckmarkCircle className="text-emerald-500" size={16} />
                       </div>
                       SYICT <strong className="text-slate-900">{alumni.course}</strong>
                    </div>
                 </div>
               </motion.div>
            ))}
          </div>

          <div className="mt-16 text-center">
             <Link href="/courses" className="inline-block px-8 py-4 bg-slate-900 text-white rounded-full font-bold hover:bg-blue-600 transition-colors shadow-lg">
               Start Your Journey Today
             </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
