export const metadata = {
  title: "Our Story | Smart Youth ICT",
  description:
    "From a shared vision to a leading tech education platform. Discover how Smart Youth ICT started.",
};

export default function StoryPage() {
  return (
    <section className="min-h-screen bg-background py-16">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <p className="inline-block text-[11px] font-black uppercase tracking-[0.28em] text-brand-green mb-4">
            About Smart Youth ICT
          </p>
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 leading-tight mb-6">
            Our Story.
          </h1>
          <p className="text-slate-600 text-lg leading-relaxed">
            It all started with a simple observation: there is a huge gap between traditional education and what the tech industry actually demands. We built Smart Youth ICT to bridge that gap.
          </p>
        </div>

        <div className="relative border-l border-slate-200 ml-4 sm:ml-12 md:mx-auto md:max-w-4xl pb-10">
          {/* Timeline Item 1 */}
          <div className="mb-12 ml-8 relative">
            <div className="absolute -left-[41px] top-1 h-6 w-6 rounded-full border-4 border-white bg-brand-green"></div>
            <p className="text-sm font-bold text-brand-green mb-1">
              The Idea
            </p>
            <h3 className="text-2xl font-bold text-slate-900 mb-3">
              Recognizing the Skill Gap
            </h3>
            <p className="text-slate-600 leading-relaxed max-w-2xl">
              We realized that while many youths were graduating, very few had the hands-on skills required to land a job or start freelancing. Our founders began mentoring small groups in local communities to test a project-first learning approach.
            </p>
          </div>
          {/* Timeline Item 2 */}
          <div className="mb-12 ml-8 relative">
            <div className="absolute -left-[41px] top-1 h-6 w-6 rounded-full border-4 border-white bg-brand-pink"></div>
            <p className="text-sm font-bold text-brand-pink mb-1">
              First Cohort
            </p>
            <h3 className="text-2xl font-bold text-slate-900 mb-3">
              Opening Doors to Practical Training
            </h3>
            <p className="text-slate-600 leading-relaxed max-w-2xl">
              Equipped with a few computers and a passion for teaching, we officially launched our training center. The curriculum bypassed traditional lectures, focusing entirely on tangible deliverables and real-world scenarios right from day one.
            </p>
          </div>
          {/* Timeline Item 3 */}
          <div className="mb-12 ml-8 relative">
            <div className="absolute -left-[41px] top-1 h-6 w-6 rounded-full border-4 border-white bg-purple-500"></div>
            <p className="text-sm font-bold text-purple-500 mb-1">
              Expanding Programs
            </p>
            <h3 className="text-2xl font-bold text-slate-900 mb-3">
              Introducing Freelancing Tracks
            </h3>
            <p className="text-slate-600 leading-relaxed max-w-2xl">
              As the digital economy grew, we saw a critical need for specialized and remote work training. We expanded our curriculum to include advanced UI/UX Design, full-stack development, AI tools integration, and targeted Digital Marketing.
            </p>
          </div>
          {/* Timeline Item 4 */}
          <div className="ml-8 relative">
            <div className="absolute -left-[41px] top-1 h-6 w-6 rounded-full border-4 border-white bg-blue-500"></div>
            <p className="text-sm font-bold text-blue-500 mb-1">Today & Beyond</p>
            <h3 className="text-2xl font-bold text-slate-900 mb-3">
              Empowering Thousands Globally
            </h3>
            <p className="text-slate-600 leading-relaxed max-w-2xl">
              We now maintain an integrated ecosystem, serving massive cohorts of learners. Working closely with industry partners, we successfully guide students into sustainable freelancing careers and highly engaging remote job placements.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
