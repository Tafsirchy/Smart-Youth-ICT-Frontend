"use client";

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiSearch, HiX, HiBriefcase } from 'react-icons/hi';
import ProjectCard from './ProjectCard';

const dummyProjects = [
  {
    id: 1,
    title: 'Full-Stack E-commerce Website Development',
    company: 'TechNova Solutions',
    category: 'Web Development',
    budget: '$500 - $1,000',
    duration: '1-2 Months',
    type: 'Remote',
    description: 'Looking for a skilled MERN stack developer to build a modern e-commerce platform with Stripe integration, product variations, and administrative dashboard.',
  },
  {
    id: 2,
    title: 'Social Media Management & Content Creation',
    company: 'FreshBites Restaurant',
    category: 'Digital Marketing',
    budget: '$300 / month',
    duration: 'Ongoing',
    type: 'Remote / Hybrid',
    description: 'Need a creative marketer to manage 3 social platforms, create weekly graphics, and run targeted ad campaigns to increase local foot traffic.',
  },
  {
    id: 3,
    title: 'Brand Identity & Logo Design',
    company: 'Lumiere Photography',
    category: 'Graphic Design',
    budget: '$150 - $250',
    duration: '2 Weeks',
    type: 'Remote',
    description: 'We need a complete brand identity revamp including a minimalist logo, color palette, typography guidelines, and business card designs.',
  },
  {
    id: 4,
    title: 'SEO Audit & Optimization',
    company: 'Global Trade Inc.',
    category: 'SEO',
    budget: '$400',
    duration: '3 Weeks',
    type: 'Remote',
    description: 'Comprehensive technical SEO audit, keyword research, and on-page optimization for a B2B corporate website targeting global clients.',
  }
];

const CATEGORIES = [
  'All Categories',
  'Web Development',
  'Digital Marketing',
  'Graphic Design',
  'SEO'
];

export default function FreelancingDirectory() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');

  const filteredProjects = useMemo(() => {
    return dummyProjects.filter(project => {
      const matchesCategory = selectedCategory === 'All Categories' || project.category === selectedCategory;
      const matchesSearch = 
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.company.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="bg-neutral-50 min-h-screen">
       {/* Hero Section */}
       <section className="bg-neutral-900 py-12 md:py-20 text-center px-4 sm:px-6 lg:px-8 relative overflow-hidden">
         {/* Decorative grid pattern */}
         <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none opacity-20"></div>
         <div className="relative z-10 max-w-4xl mx-auto">
           <motion.span 
             initial={{ opacity: 0, y: -10 }}
             animate={{ opacity: 1, y: 0 }}
             className="inline-block mb-3 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider text-orange-400 bg-orange-400/10 border border-orange-400/20"
           >
             Opportunities
           </motion.span>
           <motion.h1 
             initial={{ opacity: 0, y: 15 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.1 }}
             className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-6 leading-tight"
           >
              Learn IT Skills <span className="text-orange-400">&amp; Earn from Real Projects</span>
           </motion.h1>
           <motion.p 
             initial={{ opacity: 0, y: 15 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.2 }}
             className="text-xs sm:text-sm md:text-base lg:text-lg text-neutral-300 mb-8 max-w-2xl mx-auto leading-relaxed"
           >
             Apply your newly learned skills to real-world client projects. Build your portfolio, gain experience, and start earning before you even graduate.
           </motion.p>
           <motion.div 
             initial={{ opacity: 0, y: 15 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.3 }}
             className="flex flex-col sm:flex-row justify-center gap-4 max-w-md mx-auto px-4"
           >
              <a href="#projects" className="bg-orange-500 hover:bg-orange-600 text-white text-center py-3 rounded-xl font-bold transition-all min-h-[44px] flex items-center justify-center px-6">
                Browse Open Projects
              </a>
              <button className="bg-white/10 hover:bg-white/20 text-white border border-white/20 py-3 rounded-xl font-bold transition-all min-h-[44px] flex items-center justify-center px-6">
                How It Works
              </button>
           </motion.div>
         </div>
       </section>

       {/* Projects Grid Section */}
       <section id="projects" className="py-12 md:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
         <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
           <div>
             <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 mb-2">Active Opportunities</h2>
             <p className="text-sm text-neutral-500">Discover handpicked freelancing projects and remote internships exclusively for our students.</p>
           </div>
           
           {/* Filters Bar */}
           <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0">
             {/* Search input with X clear button */}
             <div className="relative w-full sm:w-64">
                <HiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" size={18} />
                <input 
                  type="text"
                  placeholder="Search projects..."
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-neutral-300 bg-white text-neutral-900 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 shadow-sm min-h-[44px]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 p-1"
                    aria-label="Clear search"
                  >
                    <HiX size={16} />
                  </button>
                )}
             </div>

             {/* Select Category */}
             <div className="w-full sm:w-48">
                <select 
                  className="w-full bg-white border border-neutral-300 text-neutral-900 text-sm rounded-xl focus:ring-2 focus:ring-orange-400 focus:border-orange-400 block p-2.5 shadow-sm min-h-[44px]"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  aria-label="Filter by Category"
                >
                  {CATEGORIES.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
             </div>
           </div>
         </div>

         {/* Results */}
         {filteredProjects.length > 0 ? (
           <motion.div 
             layout
             className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
           >
             <AnimatePresence mode="popLayout">
               {filteredProjects.map((project) => (
                 <motion.div
                   layout
                   initial={{ opacity: 0, scale: 0.95 }}
                   animate={{ opacity: 1, scale: 1 }}
                   exit={{ opacity: 0, scale: 0.95 }}
                   transition={{ duration: 0.2 }}
                   key={project.id}
                 >
                   <ProjectCard project={project} />
                 </motion.div>
               ))}
             </AnimatePresence>
           </motion.div>
         ) : (
           <div className="text-center py-16 bg-white rounded-2xl border border-neutral-200 shadow-sm max-w-md mx-auto">
             <div className="w-12 h-12 rounded-full bg-neutral-100 flex items-center justify-center mx-auto mb-4 text-neutral-400">
               <HiBriefcase size={24} />
             </div>
             <h3 className="text-lg font-bold text-neutral-800 mb-1">No opportunities found</h3>
             <p className="text-neutral-500 text-sm px-4">We couldn't find any projects matching your filters. Try search keywords or check another category.</p>
             <button 
               onClick={() => { setSearchQuery(''); setSelectedCategory('All Categories'); }}
               className="mt-4 text-sm font-semibold text-orange-500 hover:text-orange-600"
             >
               Reset Filters
             </button>
           </div>
         )}
         
         <div className="mt-12 text-center">
             <p className="text-sm text-neutral-500 mb-4">Showing {filteredProjects.length} of {dummyProjects.length} opportunities</p>
             <button className="bg-white border border-neutral-300 text-neutral-700 hover:bg-neutral-50 font-bold py-2.5 px-6 rounded-xl transition-colors shadow-sm min-h-[44px]">
               Load More Projects
             </button>
         </div>
       </section>
    </div>
  );
}
