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
    title: "Mentorship & Freelance Prep",
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
    <section className="min-h-screen bg-background py-16">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <p className="inline-block text-[11px] font-black uppercase tracking-[0.28em] text-brand-green mb-4">
            About Smart Youth ICT
          </p>
          <h1 className="text-5xl md:text-7xl font-black text-slate-900 leading-[1.1] mb-8 tracking-tighter">
            How <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-600 animate-gradient-x">It Works</span>
          </h1>
          <p className="text-slate-600 text-lg leading-relaxed">
            Our strategic step-by-step learning methodology is uniquely designed to securely take you from an absolute beginner to an actively earning tech professional. No fluff—just solid results.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <div
              key={index}
              className="relative flex flex-col md:flex-row items-start gap-6 md:gap-10 mb-12 last:mb-0 group"
            >
              <div className="hidden md:flex flex-col items-center mt-2 absolute left-0 top-0 h-full">
                <div className="w-16 h-16 rounded-full bg-slate-100 text-brand-green font-black flex items-center justify-center text-xl border-4 border-white shadow-sm z-10 group-hover:bg-brand-green group-hover:text-white transition-all duration-300">
                  {step.number}
                </div>
                {index !== steps.length - 1 && (
                  <div className="w-0.5 h-full bg-slate-200 mt-2 mb-2 group-hover:bg-brand-green/30 transition-colors duration-300"></div>
                )}
              </div>
              
              <div className="md:ml-28 bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-sm flex-1 hover:shadow-lg transition-all duration-300 group-hover:border-slate-300 group-hover:-translate-y-1 w-full relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-5 text-8xl pointer-events-none group-hover:scale-110 group-hover:opacity-10 transition-all duration-500">
                  {step.icon}
                </div>
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="text-4xl md:hidden text-brand-green font-black opacity-50">
                      {step.number}.
                    </div>
                    <div className="text-3xl hidden sm:block">{step.icon}</div>
                    <h3 className="text-2xl font-bold text-slate-900">
                      {step.title}
                    </h3>
                  </div>
                  <p className="text-slate-600 text-lg leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
