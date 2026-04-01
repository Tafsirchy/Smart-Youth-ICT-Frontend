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
      className="space-y-6"
    >
      <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
        <div className="p-2 bg-pink-100 text-pink-600 rounded-lg">
          <IoRocketOutline size={24} />
        </div>
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Real-World Projects</h2>
          <p className="text-sm text-slate-500 font-medium mt-1">What you'll build and add to your portfolio</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
        {PROJECTS.map((proj, i) => (
          <motion.div
            key={i}
            variants={{ hidden: { opacity: 0, scale: 0.95 }, visible: { opacity: 1, scale: 1 } }}
            className="group rounded-2xl overflow-hidden border border-slate-100 bg-white hover:shadow-xl hover:shadow-pink-500/5 transition-all duration-300 flex flex-col"
          >
            <div className="relative aspect-video overflow-hidden bg-slate-100">
              <Image 
                src={proj.image} 
                alt={proj.title} 
                fill 
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="p-5 flex-1 flex flex-col">
              <h3 className="font-bold text-slate-900 text-lg mb-2">{proj.title}</h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-4 flex-1">{proj.desc}</p>
              <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-slate-50">
                {proj.techs.map((tech, j) => (
                  <span key={j} className="text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-600 px-2 py-1 rounded-md">
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
