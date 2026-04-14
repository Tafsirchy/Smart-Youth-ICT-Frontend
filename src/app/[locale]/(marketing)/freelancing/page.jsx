import React from 'react';
import ProjectCard from '@/components/freelancing/ProjectCard';

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

export const metadata = {
  title: 'Freelancing Projects | SYICT',
  description: 'Earn while you learn. Browse active freelancing projects and internships available for SYICT students.',
};

export default function FreelancingPage() {
  return (
    <div className="bg-neutral-50 min-h-screen">
      {/* Hero Section */}
      <section className="bg-neutral-900 py-20 text-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight mb-6">
             Learn IT Skills <span className="text-orange-400">& Earn from Real Projects</span>
          </h1>
          <p className="text-lg sm:text-xl text-neutral-300 mb-10 max-w-2xl mx-auto leading-relaxed">
            Apply your newly learned skills to real-world client projects. Build your portfolio, gain experience, and start earning before you even graduate.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
             <a href="#projects" className="btn-primary px-8 py-3 text-lg font-bold">
               Browse Open Projects
             </a>
             <button className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-8 py-3 rounded-lg font-bold transition-all">
               How It Works
             </button>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h2 className="text-3xl font-bold text-neutral-900 mb-2">Active Opportunities</h2>
            <p className="text-neutral-500">Discover handpicked freelancing projects and remote internships exclusively for our students.</p>
          </div>
          
          <div className="flex gap-2">
             <select className="bg-white border border-neutral-300 text-neutral-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 shadow-sm">
               <option>All Categories</option>
               <option>Web Development</option>
               <option>Digital Marketing</option>
               <option>Graphic Design</option>
             </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {dummyProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
        
        <div className="mt-16 text-center">
            <p className="text-neutral-500 mb-6">Showing 4 of 24 active projects</p>
            <button className="bg-white border border-neutral-300 text-neutral-700 hover:bg-neutral-50 font-bold py-2.5 px-6 rounded-lg transition-colors shadow-sm">
              Load More Projects
            </button>
        </div>
      </section>
    </div>
  );
}
