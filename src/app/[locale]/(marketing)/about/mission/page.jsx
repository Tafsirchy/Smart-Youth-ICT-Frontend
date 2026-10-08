export const metadata = {
  title: "Mission & Vision | Smart Youth ICT",
  description:
    "Discover our mission to impart practical skills and our vision for a tech-driven future.",
};

export default function MissionVisionPage() {
  return (
    <section className="min-h-screen bg-slate-50 py-24 flex flex-col font-sans">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center mb-20">
          <p className="inline-block px-4 py-2 border border-slate-200 bg-white text-xs font-bold uppercase tracking-widest text-slate-500 mb-8">
            Core Principles
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-light text-slate-900 leading-[1.1] mb-8 tracking-tight">
            Mission & <br />
            <span className="font-medium">Vision.</span>
          </h1>
          <p className="text-slate-500 text-lg md:text-xl font-light leading-relaxed">
            We operate with absolute clarity and an aggressive focus on execution. Here is the blueprint that drives us forward every single day.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2 max-w-6xl mx-auto">
          {/* Mission */}
          <div className="bg-white p-10 md:p-14 border border-slate-200 flex flex-col group transition-all hover:border-slate-900 hover:shadow-xl">
            <div className="w-16 h-16 bg-slate-900 text-white flex items-center justify-center text-sm font-medium tracking-widest uppercase mb-10 group-hover:scale-105 transition-transform">
              M_01
            </div>
            <h2 className="text-3xl sm:text-4xl font-medium text-slate-900 mb-6 tracking-tight">
              Our Mission
            </h2>
            <p className="text-slate-500 font-light leading-relaxed text-lg mb-10 flex-1">
              To equip youths and professionals with in-demand, practical digital skills that directly map to industry needs. We focus on bridging the skill gap through project-based learning, highly accessible mentorship, and real-world execution.
            </p>
            <ul className="space-y-4 border-t border-slate-100 pt-8">
              <li className="flex items-start gap-4">
                <div className="w-1.5 h-1.5 bg-slate-900 mt-2 shrink-0"></div>
                <span className="text-slate-700 font-light leading-relaxed">
                  Deliver intensive, project-first training environments.
                </span>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-1.5 h-1.5 bg-slate-900 mt-2 shrink-0"></div>
                <span className="text-slate-700 font-light leading-relaxed">
                  Foster a highly supportive peer and mentor learning community.
                </span>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-1.5 h-1.5 bg-slate-900 mt-2 shrink-0"></div>
                <span className="text-slate-700 font-light leading-relaxed">
                  Ensure remarkably high career and freelancing success rates.
                </span>
              </li>
            </ul>
          </div>

          {/* Vision */}
          <div className="bg-slate-900 p-10 md:p-14 border border-slate-800 flex flex-col group transition-all hover:border-slate-700 hover:shadow-2xl">
            <div className="w-16 h-16 bg-white text-slate-900 flex items-center justify-center text-sm font-medium tracking-widest uppercase mb-10 group-hover:scale-105 transition-transform">
              V_02
            </div>
            <h2 className="text-3xl sm:text-4xl font-medium text-white mb-6 tracking-tight">
              Our Vision
            </h2>
            <p className="text-slate-400 font-light leading-relaxed text-lg mb-10 flex-1">
              To become the leading catalyst for transforming youth potential into digital excellence, ultimately creating an empowered global workforce of highly skilled, independent tech professionals and successful digital entrepreneurs.
            </p>
            <ul className="space-y-4 border-t border-slate-800 pt-8">
              <li className="flex items-start gap-4">
                <div className="w-1.5 h-1.5 bg-white mt-2 shrink-0"></div>
                <span className="text-slate-300 font-light leading-relaxed">
                  Attain global recognition for sustainable tech excellence.
                </span>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-1.5 h-1.5 bg-white mt-2 shrink-0"></div>
                <span className="text-slate-300 font-light leading-relaxed">
                  Empower mass remote work adaptation and digital independence.
                </span>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-1.5 h-1.5 bg-white mt-2 shrink-0"></div>
                <span className="text-slate-300 font-light leading-relaxed">
                  Build a thriving, self-sustaining ecosystem of top tech talent.
                </span>
              </li>
            </ul>
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
