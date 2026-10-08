export const metadata = {
  title: "Our Story | Smart Youth ICT",
  description:
    "From a shared vision to a leading tech education platform. Discover how Smart Youth ICT started.",
};

export default function StoryPage() {
  return (
    <section className="min-h-screen bg-white py-24 flex flex-col font-sans">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center mb-24">
          <p className="inline-block px-4 py-2 border border-slate-200 text-xs font-bold uppercase tracking-widest text-slate-500 mb-8">
            Origin
          </p>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-light text-slate-900 leading-[1.1] mb-8 tracking-tight">
            Our <span className="font-medium">Story.</span>
          </h1>
          <p className="text-slate-500 text-lg md:text-xl leading-relaxed font-light">
            It all started with a simple observation: there is a huge gap between traditional education and what the tech industry actually demands. We built Smart Youth ICT to bridge that gap with brutal efficiency.
          </p>
        </div>

        <div className="relative border-l border-slate-200 ml-4 sm:ml-12 md:mx-auto md:max-w-4xl pb-10">
          {/* Timeline Item 1 */}
          <div className="mb-16 ml-12 relative group">
            <div className="absolute -left-[56px] top-1 h-8 w-8 bg-white border border-slate-900 flex items-center justify-center group-hover:bg-slate-900 transition-colors duration-300">
              <div className="w-2 h-2 bg-slate-900 group-hover:bg-white transition-colors duration-300"></div>
            </div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">
              Phase 01 // The Idea
            </p>
            <h3 className="text-2xl font-medium text-slate-900 mb-4 tracking-tight">
              Recognizing the Skill Gap
            </h3>
            <p className="text-slate-500 font-light leading-relaxed max-w-2xl">
              We realized that while many youths were graduating, very few had the hands-on skills required to land a job or start freelancing. Our founders began mentoring small groups in local communities to test a project-first learning approach.
            </p>
          </div>
          {/* Timeline Item 2 */}
          <div className="mb-16 ml-12 relative group">
            <div className="absolute -left-[56px] top-1 h-8 w-8 bg-white border border-slate-900 flex items-center justify-center group-hover:bg-slate-900 transition-colors duration-300">
              <div className="w-2 h-2 bg-slate-900 group-hover:bg-white transition-colors duration-300"></div>
            </div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">
              Phase 02 // First Cohort
            </p>
            <h3 className="text-2xl font-medium text-slate-900 mb-4 tracking-tight">
              Opening Doors to Practical Training
            </h3>
            <p className="text-slate-500 font-light leading-relaxed max-w-2xl">
              Equipped with a few computers and a passion for teaching, we officially launched our training center. The curriculum bypassed traditional lectures, focusing entirely on tangible deliverables and real-world scenarios right from day one.
            </p>
          </div>
          {/* Timeline Item 3 */}
          <div className="mb-16 ml-12 relative group">
            <div className="absolute -left-[56px] top-1 h-8 w-8 bg-white border border-slate-900 flex items-center justify-center group-hover:bg-slate-900 transition-colors duration-300">
              <div className="w-2 h-2 bg-slate-900 group-hover:bg-white transition-colors duration-300"></div>
            </div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">
              Phase 03 // Expanding Programs
            </p>
            <h3 className="text-2xl font-medium text-slate-900 mb-4 tracking-tight">
              Introducing Freelancing Tracks
            </h3>
            <p className="text-slate-500 font-light leading-relaxed max-w-2xl">
              As the digital economy grew, we saw a critical need for specialized and remote work training. We expanded our curriculum to include advanced UI/UX Design, full-stack development, AI tools integration, and targeted Digital Marketing.
            </p>
          </div>
          {/* Timeline Item 4 */}
          <div className="ml-12 relative group">
            <div className="absolute -left-[56px] top-1 h-8 w-8 bg-white border border-slate-900 flex items-center justify-center group-hover:bg-slate-900 transition-colors duration-300">
              <div className="w-2 h-2 bg-slate-900 group-hover:bg-white transition-colors duration-300"></div>
            </div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">
              Phase 04 // Today & Beyond
            </p>
            <h3 className="text-2xl font-medium text-slate-900 mb-4 tracking-tight">
              Empowering Thousands Globally
            </h3>
            <p className="text-slate-500 font-light leading-relaxed max-w-2xl">
              We now maintain an integrated ecosystem, serving massive cohorts of learners. Working closely with industry partners, we successfully guide students into sustainable freelancing careers and highly engaging remote job placements.
            </p>
          </div>
        </div>
      </div>

      {/* Mobile Sticky CTA */}
      <div className="fixed bottom-0 left-0 w-full p-4 bg-white border-t border-slate-200 z-50 md:hidden flex items-center justify-between">
        <div>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Next Step</p>
          <p className="text-slate-900 font-medium text-sm">Join the Program</p>
        </div>
        <button className="px-6 py-4 bg-slate-900 text-white font-medium text-[10px] uppercase tracking-widest">
          Apply Now
        </button>
      </div>
    </section>
  );
}
