export const metadata = {
  title: "Mission & Vision | Smart Youth ICT",
  description:
    "Discover our mission to impart practical skills and our vision for a tech-driven future.",
};

export default function MissionVisionPage() {
  return (
    <section className="min-h-screen bg-slate-50 py-24 flex flex-col font-sans relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-pink/15 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-green/15 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="container-custom relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-20">
          <p className="inline-block px-4 py-2 rounded-full border border-brand-green/20 bg-brand-green/5 text-xs font-extrabold uppercase tracking-widest text-brand-green mb-8 shadow-sm">
            Core Principles
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-slate-900 leading-[1.1] mb-8 tracking-tight">
            Mission & <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-green to-brand-accent">Vision.</span>
          </h1>
          <p className="text-slate-600 text-lg md:text-xl font-medium leading-relaxed">
            We operate with absolute clarity and an aggressive focus on execution. Here is the blueprint that drives us forward every single day.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2 max-w-6xl mx-auto">
          {/* Mission */}
          <div className="bg-white rounded-3xl p-10 md:p-14 border border-slate-100 flex flex-col group transition-all hover:border-brand-green/30 hover:shadow-2xl shadow-xl relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-brand-green/10 rounded-full blur-3xl group-hover:bg-brand-green/20 transition-colors"></div>
            
            <div className="w-16 h-16 rounded-2xl bg-brand-green/10 text-brand-green flex items-center justify-center text-3xl mb-10 group-hover:scale-110 transition-transform shadow-inner">
              🎯
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-6 tracking-tight">
              Our Mission
            </h2>
            <p className="text-slate-600 font-medium leading-relaxed text-lg mb-10 flex-1">
              To equip youths and professionals with in-demand, practical digital skills that directly map to industry needs. We focus on bridging the skill gap through project-based learning, highly accessible mentorship, and real-world execution.
            </p>
            <ul className="space-y-4 border-t border-slate-100 pt-8">
              <li className="flex items-start gap-4">
                <div className="w-2 h-2 rounded-full bg-brand-green mt-2.5 shrink-0 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
                <span className="text-slate-700 font-medium leading-relaxed">
                  Deliver intensive, project-first training environments.
                </span>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-2 h-2 rounded-full bg-brand-green mt-2.5 shrink-0 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
                <span className="text-slate-700 font-medium leading-relaxed">
                  Foster a highly supportive peer and mentor learning community.
                </span>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-2 h-2 rounded-full bg-brand-green mt-2.5 shrink-0 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
                <span className="text-slate-700 font-medium leading-relaxed">
                  Ensure remarkably high career and freelancing success rates.
                </span>
              </li>
            </ul>
          </div>

          {/* Vision */}
          <div className="bg-slate-900 rounded-3xl p-10 md:p-14 border border-slate-800 flex flex-col group transition-all hover:border-brand-pink/30 hover:shadow-2xl shadow-xl shadow-brand-pink/5 relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-brand-pink/20 rounded-full blur-3xl group-hover:bg-brand-pink/30 transition-colors"></div>

            <div className="w-16 h-16 rounded-2xl bg-white/10 text-white flex items-center justify-center text-3xl mb-10 group-hover:scale-110 transition-transform shadow-inner border border-white/10 backdrop-blur-md">
              👁️‍🗨️
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-6 tracking-tight">
              Our Vision
            </h2>
            <p className="text-slate-300 font-medium leading-relaxed text-lg mb-10 flex-1">
              To become the leading catalyst for transforming youth potential into digital excellence, ultimately creating an empowered global workforce of highly skilled, independent tech professionals and successful digital entrepreneurs.
            </p>
            <ul className="space-y-4 border-t border-slate-800 pt-8">
              <li className="flex items-start gap-4">
                <div className="w-2 h-2 rounded-full bg-brand-pink mt-2.5 shrink-0 shadow-[0_0_8px_rgba(255,44,109,0.5)]"></div>
                <span className="text-slate-300 font-medium leading-relaxed">
                  Attain global recognition for sustainable tech excellence.
                </span>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-2 h-2 rounded-full bg-brand-pink mt-2.5 shrink-0 shadow-[0_0_8px_rgba(255,44,109,0.5)]"></div>
                <span className="text-slate-300 font-medium leading-relaxed">
                  Empower mass remote work adaptation and digital independence.
                </span>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-2 h-2 rounded-full bg-brand-pink mt-2.5 shrink-0 shadow-[0_0_8px_rgba(255,44,109,0.5)]"></div>
                <span className="text-slate-300 font-medium leading-relaxed">
                  Build a thriving, self-sustaining ecosystem of top tech talent.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Mobile Sticky CTA */}
      <div className="fixed bottom-0 left-0 w-full p-4 bg-white/90 backdrop-blur-md border-t border-slate-200 z-50 md:hidden flex items-center justify-between shadow-[0_-10px_40px_rgba(0,0,0,0.05)] pb-[max(1rem,env(safe-area-inset-bottom))]">
        <div>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Next Step</p>
          <p className="text-slate-900 font-bold text-sm">Join the Program</p>
        </div>
        <button className="px-6 py-3 rounded-xl bg-brand-green text-white font-bold text-[10px] uppercase tracking-widest shadow-lg shadow-brand-green/30">
          Apply Now
        </button>
      </div>
    </section>
  );
}
