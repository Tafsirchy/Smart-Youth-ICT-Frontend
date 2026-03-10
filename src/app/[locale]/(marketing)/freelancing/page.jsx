import React from 'react';
import ProjectBoard from './ProjectBoard';
import { HiOutlineLightBulb, HiOutlineBadgeCheck, HiOutlineSparkles } from 'react-icons/hi';

export const metadata = {
  title: 'Freelancing & Projects | Smart Youth ICT',
  description: 'Earn while you learn. Access real client projects and build your portfolio.',
};

export default function FreelancingPage() {
  return (
    <div className="bg-neutral-50 min-h-screen pb-20">
      {/* Hero Header */}
      <section className="bg-gradient-to-r from-blue-900 to-emerald-900 text-white py-20 lg:py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="container-lg relative z-10 text-center">
          <span className="inline-block px-4 py-1.5 rounded-full bg-blue-500/20 text-blue-200 text-sm font-semibold mb-6 border border-blue-400/30 backdrop-blur-sm">
            Earn while you learn
          </span>
          <h1 className="text-4xl lg:text-5xl lg:leading-tight font-extrabold mb-6">
            Real Freelance Projects for<br />
            Our Best Students
          </h1>
          <p className="text-lg lg:text-xl text-blue-100 max-w-2xl mx-auto mb-10 leading-relaxed">
            Don't just watch videos. Apply your skills on real client projects, build your portfolio, and earn money directly through our platform.
          </p>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-16 bg-white border-b border-neutral-200">
        <div className="container-lg">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-neutral-900">How the Project System Works</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center max-w-4xl mx-auto">
            <div>
              <div className="w-16 h-16 mx-auto bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-4">
                <HiOutlineLightBulb size={32} />
              </div>
              <h3 className="text-xl font-bold text-neutral-900 mb-2">1. Learn the Skills</h3>
              <p className="text-neutral-500 text-sm leading-relaxed">Enroll in our courses and master the demanding skills requested by the industry.</p>
            </div>
            <div>
              <div className="w-16 h-16 mx-auto bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-4">
                <HiOutlineBadgeCheck size={32} />
              </div>
              <h3 className="text-xl font-bold text-neutral-900 mb-2">2. Browse Projects</h3>
              <p className="text-neutral-500 text-sm leading-relaxed">Access our exclusive project board and find tasks that match your newly acquired skills.</p>
            </div>
            <div>
              <div className="w-16 h-16 mx-auto bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center mb-4">
                <HiOutlineSparkles size={32} />
              </div>
              <h3 className="text-xl font-bold text-neutral-900 mb-2">3. Earn & Grow</h3>
              <p className="text-neutral-500 text-sm leading-relaxed">Complete the project successfully, get paid, and add real experience to your portfolio.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Project Board Component */}
      <section className="container-lg mt-8">
        <ProjectBoard />
      </section>
    </div>
  );
}
