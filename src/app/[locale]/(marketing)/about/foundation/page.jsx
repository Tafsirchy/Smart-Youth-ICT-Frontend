export const metadata = {
  title: "SYICT Foundation",
  description:
    "The core pillars that power Smart Youth ICT: skill-first learning, real projects, mentorship, and career outcomes.",
};

const pillars = [
  {
    title: "Skill-First Learning",
    description:
      "Structured, practical training tracks that start from fundamentals and move to production-level work.",
  },
  {
    title: "Real Project Practice",
    description:
      "Students learn by building real deliverables, not only by watching tutorials or memorizing theory.",
  },
  {
    title: "Mentorship & Accountability",
    description:
      "Regular mentor guidance, feedback loops, and progress checkpoints keep students moving forward.",
  },
  {
    title: "Career & Freelancing Readiness",
    description:
      "Portfolio building, communication training, and client-ready workflows prepare students to earn.",
  },
];

export default function FoundationPage() {
  return (
    <section className="min-h-screen bg-background py-16">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center mb-14">
          <p className="inline-block text-[11px] font-black uppercase tracking-[0.28em] text-brand-green mb-4">
            About Smart Youth ICT
          </p>
          <h1 className="text-5xl md:text-7xl font-black text-slate-900 leading-[1.1] mb-8 tracking-tighter">
            SYICT <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-600 animate-gradient-x">Foundation</span>
          </h1>
          <p className="mt-4 text-slate-600 text-sm sm:text-base">
            Our foundation is built on applied learning and measurable outcomes.
            These pillars shape how we train, mentor, and support learners from
            beginner level to professional work.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          {pillars.map((pillar) => (
            <article
              key={pillar.title}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:shadow-md"
            >
              <h2 className="text-xl font-extrabold text-slate-900 mb-3">
                {pillar.title}
              </h2>
              <p className="text-slate-600 leading-relaxed">
                {pillar.description}
              </p>
            </article>
          ))}
        </div>

        <div className="max-w-4xl mx-auto mt-12 rounded-2xl bg-slate-900 text-white p-8 sm:p-10">
          <h3 className="text-2xl font-black mb-3">
            Why This Foundation Matters
          </h3>
          <p className="text-slate-200 leading-relaxed">
            The digital job market rewards people who can deliver value quickly.
            Our foundation combines practical skills, project confidence, and
            guided growth so students can build a sustainable career path in
            tech, freelancing, or remote work.
          </p>
        </div>
      </div>
    </section>
  );
}
