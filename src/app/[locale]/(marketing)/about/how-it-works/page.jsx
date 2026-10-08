export const metadata = {
  title: "How It Works | Smart Youth ICT",
  description:
    "Step-by-step guide on our learning methodology and process to get you job-ready.",
};

const steps = [
  {
    number: "01",
    title: "Discover & Consult",
    description:
      "Explore our diverse expert-led courses and career tracks. Speak to an advisory counselor to find the path that precisely matches your technical goals, whether it's software engineering, product design, or digital marketing.",
  },
  {
    number: "02",
    title: "Project-Based Learning",
    description:
      "Dive into our hands-on structured modules. We prioritize skipping endless theoretical lectures so you can start building real-world projects immediately. Expert instructors actively guide you through every complex step.",
  },
  {
    number: "03",
    title: "Portfolio Accumulation",
    description:
      "As you continuously learn, you naturally accumulate a robust, production-ready portfolio. Every assigned project and end-of-module assessment becomes a high-quality piece of work to show to global clients.",
  },
  {
    number: "04",
    title: "Mentorship & Prep",
    description:
      "Receive intensive training on navigating modern freelance marketplaces. Learn the essentials on how to communicate effectively with international clients, establish fair pricing, and write incredibly winning proposals.",
  },
  {
    number: "05",
    title: "Earn, Grow & Network",
    description:
      "Graduate completely equipped with the confidence and proof of work necessary to land remote jobs, spearhead a physical IT career, or seamlessly operate as a profitable independent freelancer.",
  },
];

export default function HowItWorksPage() {
  return (
    <section className="min-h-screen bg-slate-50 py-24 flex flex-col font-sans">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center mb-24">
          <p className="inline-block px-4 py-2 border border-slate-200 bg-white text-xs font-bold uppercase tracking-widest text-slate-500 mb-8">
            The Pipeline
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-light text-slate-900 leading-[1.1] mb-8 tracking-tight">
            How <span className="font-medium">It Works.</span>
          </h1>
          <p className="text-slate-500 text-lg md:text-xl font-light leading-relaxed">
            Our strategic step-by-step learning methodology is uniquely designed to securely take you from an absolute beginner to an actively earning tech professional. No fluff—just solid execution.
          </p>
        </div>

        <div className="max-w-5xl mx-auto space-y-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-white border border-slate-200 p-8 md:p-12 flex flex-col md:flex-row items-start md:items-center gap-8 group hover:border-slate-900 transition-colors"
            >
              <div className="w-20 h-20 bg-slate-900 text-white flex items-center justify-center font-medium text-2xl shrink-0 group-hover:scale-105 transition-transform">
                {step.number}
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-medium text-slate-900 mb-3 tracking-tight">
                  {step.title}
                </h3>
                <p className="text-slate-500 font-light leading-relaxed text-lg">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
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
