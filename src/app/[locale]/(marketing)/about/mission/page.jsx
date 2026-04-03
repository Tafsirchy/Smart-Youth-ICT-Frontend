export const metadata = {
  title: "Mission & Vision | Smart Youth ICT",
  description:
    "Discover our mission to impart practical skills and our vision for a tech-driven future.",
};

export default function MissionVisionPage() {
  return (
    <section className="min-h-screen bg-background py-16">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <p className="inline-block text-[11px] font-black uppercase tracking-[0.28em] text-brand-green mb-4">
            About Smart Youth ICT
          </p>
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 leading-tight mb-6">
            Mission & Vision
          </h1>
          <p className="text-slate-600 text-lg leading-relaxed">
            We operate with a clear purpose and an ambitious outlook. Here is what drives us forward every single day.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2 max-w-6xl mx-auto">
          {/* Mission */}
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-sm relative overflow-hidden group hover:shadow-lg transition-all duration-500">
            <div className="absolute top-0 right-0 w-40 h-40 bg-emerald-100/50 rounded-full blur-3xl -mr-10 -mt-10 transition-transform duration-700 group-hover:scale-150"></div>
            <div className="relative z-10">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center text-4xl mb-8 shadow-sm">
                🎯
              </div>
              <h2 className="text-4xl font-extrabold text-slate-900 mb-6">
                Our Mission
              </h2>
              <p className="text-slate-600 leading-relaxed text-lg mb-8">
                To equip youths and professionals with in-demand, practical digital skills that directly map to industry needs. We focus on bridging the skill gap through project-based learning, highly accessible mentorship, and real-world execution.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="text-emerald-500 text-xl font-bold mt-1">✓</span>
                  <span className="text-slate-700 font-medium text-lg leading-snug">
                    Deliver intensive, project-first training environments.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-emerald-500 text-xl font-bold mt-1">✓</span>
                  <span className="text-slate-700 font-medium text-lg leading-snug">
                    Foster a highly supportive peer and mentor learning community.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-emerald-500 text-xl font-bold mt-1">✓</span>
                  <span className="text-slate-700 font-medium text-lg leading-snug">
                    Ensure remarkably high career and freelancing success rates.
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Vision */}
          <div className="bg-slate-900 rounded-3xl p-8 sm:p-12 border border-slate-800 shadow-sm relative overflow-hidden group hover:shadow-lg transition-all duration-500">
            <div className="absolute top-0 right-0 w-40 h-40 bg-brand-pink/20 rounded-full blur-3xl -mr-10 -mt-10 transition-transform duration-700 group-hover:scale-150"></div>
            <div className="relative z-10">
              <div className="w-16 h-16 bg-white/10 text-white border border-white/20 rounded-2xl flex items-center justify-center text-4xl mb-8 backdrop-blur-sm shadow-sm">
                👁️‍🗨️
              </div>
              <h2 className="text-4xl font-extrabold text-white mb-6">
                Our Vision
              </h2>
              <p className="text-slate-300 leading-relaxed text-lg mb-8">
                To become the leading catalyst for transforming youth potential into digital excellence, ultimately creating an empowered global workforce of highly skilled, independent tech professionals and successful digital entrepreneurs.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="text-brand-pink text-xl font-bold mt-1">✓</span>
                  <span className="text-slate-200 font-medium text-lg leading-snug">
                    Attain global recognition for sustainable tech excellence.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-brand-pink text-xl font-bold mt-1">✓</span>
                  <span className="text-slate-200 font-medium text-lg leading-snug">
                    Empower mass remote work adaptation and digital independence.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-brand-pink text-xl font-bold mt-1">✓</span>
                  <span className="text-slate-200 font-medium text-lg leading-snug">
                    Build a thriving, self-sustaining ecosystem of top tech talent.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
