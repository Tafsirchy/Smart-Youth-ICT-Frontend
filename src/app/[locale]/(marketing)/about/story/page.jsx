export const metadata = {
  title: "Our Story | Smart Youth ICT",
  description:
    "From a shared vision to a leading tech education platform. Discover how Smart Youth ICT started.",
};

export default function StoryPage() {
  return (
    <section className="min-h-screen bg-slate-50 py-24 flex flex-col font-sans relative overflow-hidden">
      {/* Background soft blobs */}
      <div className="absolute top-20 left-0 w-96 h-96 bg-brand-pink/10 blur-[120px] pointer-events-none hidden"></div>
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-brand-green/10 blur-[150px] pointer-events-none hidden"></div>
      
      <div className="container-custom relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-24">
          <p className="inline-block px-4 py-2 border border-brand-pink/20 bg-brand-pink/5 text-xs font-extrabold uppercase tracking-widest text-brand-pink mb-8 shadow-sm rounded-md">
            Origin
          </p>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-slate-900 leading-[1.1] mb-8 tracking-tight">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-pink to-brand-green">Story.</span>
          </h1>
          <p className="text-slate-600 text-lg md:text-xl leading-relaxed font-medium">
            It all started with a simple observation: there is a huge gap between traditional education and what the tech industry actually demands. We built Smart Youth ICT to bridge that gap with brutal efficiency.
          </p>
        </div>

        <div className="relative border-l-2 border-slate-200 ml-4 sm:ml-12 md:mx-auto md:max-w-4xl pb-10 rounded-lg">
          {/* Timeline Item 1 */}
          <div className="mb-16 ml-12 relative group">
            <div className="absolute -left-[57px] top-1 h-8 w-8 bg-white border-2 border-brand-pink flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 rounded-lg">
              <div className="w-3 h-3 bg-brand-pink"></div>
            </div>
            <p className="text-sm font-extrabold text-brand-pink uppercase tracking-widest mb-3">
              The Idea
            </p>
            <h3 className="text-3xl font-extrabold text-slate-900 mb-4 tracking-tight">
              Recognizing the Skill Gap
            </h3>
            <p className="text-slate-600 font-medium leading-relaxed max-w-2xl text-lg">
              We realized that while many youths were graduating, very few had the hands-on skills required to land a job or start freelancing. Our founders began mentoring small groups in local communities to test a project-first learning approach.
            </p>
          </div>
          {/* Timeline Item 2 */}
          <div className="mb-16 ml-12 relative group">
            <div className="absolute -left-[57px] top-1 h-8 w-8 bg-white border-2 border-brand-green flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 rounded-lg">
              <div className="w-3 h-3 bg-brand-green"></div>
            </div>
            <p className="text-sm font-extrabold text-brand-green uppercase tracking-widest mb-3">
              First Cohort
            </p>
            <h3 className="text-3xl font-extrabold text-slate-900 mb-4 tracking-tight">
              Opening Doors to Practical Training
            </h3>
            <p className="text-slate-600 font-medium leading-relaxed max-w-2xl text-lg">
              Equipped with a few computers and a passion for teaching, we officially launched our training center. The curriculum bypassed traditional lectures, focusing entirely on tangible deliverables and real-world scenarios right from day one.
            </p>
          </div>
          {/* Timeline Item 3 */}
          <div className="mb-16 ml-12 relative group">
            <div className="absolute -left-[57px] top-1 h-8 w-8 bg-white border-2 border-brand-accent flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 rounded-lg">
              <div className="w-3 h-3 bg-brand-accent"></div>
            </div>
            <p className="text-sm font-extrabold text-brand-accent uppercase tracking-widest mb-3">
              Expanding Programs
            </p>
            <h3 className="text-3xl font-extrabold text-slate-900 mb-4 tracking-tight">
              Introducing Freelancing Tracks
            </h3>
            <p className="text-slate-600 font-medium leading-relaxed max-w-2xl text-lg">
              As the digital economy grew, we saw a critical need for specialized and remote work training. We expanded our curriculum to include advanced UI/UX Design, full-stack development, AI tools integration, and targeted Digital Marketing.
            </p>
          </div>
          {/* Timeline Item 4 */}
          <div className="ml-12 relative group">
            <div className="absolute -left-[57px] top-1 h-8 w-8 bg-white border-2 border-purple-500 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 rounded-lg">
              <div className="w-3 h-3 bg-purple-500"></div>
            </div>
            <p className="text-sm font-extrabold text-purple-500 uppercase tracking-widest mb-3">
              Today & Beyond
            </p>
            <h3 className="text-3xl font-extrabold text-slate-900 mb-4 tracking-tight">
              Empowering Thousands Globally
            </h3>
            <p className="text-slate-600 font-medium leading-relaxed max-w-2xl text-lg">
              We now maintain an integrated ecosystem, serving massive cohorts of learners. Working closely with industry partners, we successfully guide students into sustainable freelancing careers and highly engaging remote job placements.
            </p>
          </div>
        </div>
      </div>

      {/* Mobile Sticky CTA */}
      <div className="fixed bottom-0 left-0 w-full p-4 bg-white/90 backdrop-blur-md border-t border-slate-200 z-50 md:hidden flex items-center justify-between shadow-[0_-10px_40px_rgba(0,0,0,0.05)] pb-[max(1rem,env(safe-area-inset-bottom))]">
        <div>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Next Step</p>
          <p className="text-slate-900 font-bold text-sm">Join the Program</p>
        </div>
        <button className="px-6 py-3 bg-brand-pink text-white font-bold text-[10px] uppercase tracking-widest shadow-lg shadow-brand-pink/30 rounded-md">
          Apply Now
        </button>
      </div>
    </section>
  );
}
