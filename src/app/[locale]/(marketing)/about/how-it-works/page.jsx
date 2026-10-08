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
    icon: "🔍",
  },
  {
    number: "02",
    title: "Project-Based Learning",
    description:
      "Dive into our hands-on structured modules. We prioritize skipping endless theoretical lectures so you can start building real-world projects immediately. Expert instructors actively guide you through every complex step.",
    icon: "💻",
  },
  {
    number: "03",
    title: "Portfolio Accumulation",
    description:
      "As you continuously learn, you naturally accumulate a robust, production-ready portfolio. Every assigned project and end-of-module assessment becomes a high-quality piece of work to show to global clients.",
    icon: "📁",
  },
  {
    number: "04",
    title: "Mentorship & Prep",
    description:
      "Receive intensive training on navigating modern freelance marketplaces. Learn the essentials on how to communicate effectively with international clients, establish fair pricing, and write incredibly winning proposals.",
    icon: "🤝",
  },
  {
    number: "05",
    title: "Earn, Grow & Network",
    description:
      "Graduate completely equipped with the confidence and proof of work necessary to land remote jobs, spearhead a physical IT career, or seamlessly operate as a profitable independent freelancer.",
    icon: "🚀",
  },
];

export default function HowItWorksPage() {
  return (
    <section className="min-h-screen bg-slate-50 py-24 flex flex-col font-sans relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute -top-20 right-0 w-96 h-96 bg-brand-green/10 blur-[120px] pointer-events-none hidden"></div>

      <div className="container-custom relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-24">
          <p className="inline-block px-4 py-2 border border-brand-green/20 bg-brand-green/5 text-xs font-extrabold uppercase tracking-widest text-brand-green mb-8 shadow-sm">
            The Pipeline
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-slate-900 leading-[1.1] mb-8 tracking-tight">
            How <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-green to-brand-accent">It Works.</span>
          </h1>
          <p className="text-slate-600 text-lg md:text-xl font-medium leading-relaxed">
            Our strategic step-by-step learning methodology is uniquely designed to securely take you from an absolute beginner to an actively earning tech professional. No fluff—just solid execution.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <div
              key={index}
              className="relative flex flex-col md:flex-row items-start gap-6 md:gap-10 mb-12 last:mb-0 group"
            >
              <div className="hidden md:flex flex-col items-center mt-2 absolute left-0 top-0 h-full">
                <div className="w-16 h-16 bg-white text-brand-green font-extrabold flex items-center justify-center text-xl shadow-lg border border-slate-100 z-10 group-hover:bg-brand-green group-hover:text-white transition-all duration-300 group-hover:scale-110">
                  {step.number}
                </div>
                {index !== steps.length - 1 && (
                  <div className="w-1 h-full bg-slate-200 mt-2 mb-2 group-hover:bg-brand-green/30 transition-colors duration-300"></div>
                )}
              </div>

              <div className="md:ml-28 bg-white p-8 sm:p-10 border border-slate-100 shadow-sm flex-1 hover:shadow-xl transition-all duration-300 group-hover:border-brand-green/30 group-hover:-translate-y-1 w-full relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-5 text-8xl pointer-events-none group-hover:scale-110 group-hover:opacity-10 transition-all duration-500">
                  {step.icon}
                </div>
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="text-4xl md:hidden text-brand-green font-extrabold opacity-50">
                      {step.number}.
                    </div>
                    <div className="text-3xl hidden sm:block">{step.icon}</div>
                    <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                      {step.title}
                    </h3>
                  </div>
                  <p className="text-slate-600 text-lg font-medium leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile Sticky CTA */}
      <div className="fixed bottom-0 left-0 w-full p-4 bg-white/90 backdrop-blur-md border-t border-slate-200 z-50 md:hidden flex items-center justify-between shadow-[0_-10px_40px_rgba(0,0,0,0.05)] pb-[max(1rem,env(safe-area-inset-bottom))]">
        <div>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Next Step</p>
          <p className="text-slate-900 font-bold text-sm">Join the Program</p>
        </div>
        <button className="px-6 py-3 bg-brand-green text-white font-bold text-[10px] uppercase tracking-widest shadow-lg shadow-brand-green/30">
          Apply Now
        </button>
      </div>
    </section>
  );
}
