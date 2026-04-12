"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { 
  IoTerminalOutline, 
  IoShieldCheckmarkOutline, 
  IoSyncOutline, 
  IoGridOutline, 
  IoCubeOutline,
  IoCodeWorkingOutline,
  IoCloudDoneOutline,
  IoLayersOutline,
  IoSettingsOutline,
  IoRocketOutline,
  IoInfiniteOutline
} from "react-icons/io5";

const appArchitecture = [
  {
    title: "Multi-tenant SaaS",
    desc: "Single-codebase architectures with logic-level isolation, unified subscription handling, and horizontal scaling metrics.",
    icon: <IoCubeOutline />,
    color: "from-violet-500 to-indigo-600",
  },
  {
    title: "Mission Critical Portals",
    desc: "High-security internal hubs for employee management, secure data vaults, and complex organizational hierarchies.",
    icon: <IoShieldCheckmarkOutline />,
    color: "from-slate-700 to-slate-900",
  },
  {
    title: "Real-time Engines",
    desc: "Native WebSocket integration for financial dashboards, live telemetry, and low-latency interaction hubs.",
    icon: <IoSyncOutline />,
    color: "from-fuchsia-600 to-violet-600",
  }
];

const engineeringEcosystem = [
  { group: "Logic Execution", tags: ["Node.js 20+", "Python FastAPI", "Go Fiber"] },
  { group: "Infrastructure", tags: ["AWS Lambda", "Edge Computing", "Docker Swarm"] },
  { group: "Persistence", tags: ["PostgreSQL", "Redis Cache", "Vector DB"] },
  { group: "Security", tags: ["JWT/OAuth2", "Argon2 Hash", "AES-256"] }
];

export default function CustomAppsPage() {
  return (
    <section className="min-h-screen bg-slate-50 text-slate-900 selection:bg-violet-600 selection:text-white overflow-hidden relative">
      {/* INDUSTRIAL BACKGROUND DECOR */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none -z-10 opacity-30">
        <div className="absolute top-0 left-1/4 w-[1px] h-full bg-slate-200 hidden lg:block"></div>
        <div className="absolute top-0 right-1/4 w-[1px] h-full bg-slate-200 hidden lg:block"></div>
        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-slate-100"></div>
        <div className="absolute top-[10%] right-[-100px] w-[600px] h-[600px] bg-violet-100 rounded-full blur-[160px]"></div>
      </div>

      <div className="container-custom py-24 relative">
        {/* BESPOKE HERO SECTION */}
        <div className="flex flex-col lg:flex-row items-center gap-20 mb-48 pt-10">
          <div className="flex-1 text-left">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-lg bg-violet-50 border border-violet-100 text-violet-600 text-[10px] font-black tracking-[0.4em] uppercase mb-10"
            >
              <IoTerminalOutline className="text-sm" /> Bespoke Engineering Protocol
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "circOut" }}
              className="text-6xl md:text-8xl lg:text-[10rem] font-black leading-[0.8] mb-12 tracking-tighter"
            >
              Custom <br /> <span className="text-violet-600">Engines.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-slate-500 text-xl md:text-3xl font-light leading-relaxed max-w-2xl mb-12"
            >
              We don't build within templates. We engineer{" "}
              <span className="text-slate-900 font-bold underline decoration-violet-500 decoration-2 underline-offset-8">
                bespoke logic
              </span>{" "}
              designed specifically for your operational complexity and global scale.
            </motion.p>

            <div className="flex flex-col sm:flex-row gap-6">
              <button className="w-full sm:w-[280px] px-8 py-6 bg-violet-600 text-white font-black rounded-xl hover:bg-violet-700 transition-all shadow-2xl shadow-violet-600/20 uppercase tracking-widest text-[10px] flex items-center justify-center">
                Request Architecture Brief
              </button>
              <Link
                href="/services/custom-apps/details"
                className="w-full sm:w-[280px] px-8 py-6 bg-white border border-slate-200 text-slate-900 font-black rounded-xl hover:bg-slate-50 transition-all uppercase tracking-widest text-[10px] flex items-center justify-center text-center"
              >
                Technical Specifications
              </Link>
            </div>
          </div>

          <div className="flex-1 relative hidden lg:block">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotateY: -10 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ duration: 1 }}
              className="relative perspective-2000"
            >
              <div className="bg-white rounded-[3rem] p-4 border border-slate-200 shadow-[0_50px_100px_rgba(0,0,0,0.1)] overflow-hidden scale-110">
                <img
                  src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1000&h=800&fit=crop"
                  className="w-full h-full object-cover rounded-[2.5rem] grayscale opacity-80 hover:grayscale-0 transition-all duration-1000"
                  alt="Custom Code Architecture"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent flex flex-col justify-end p-12">
                  <p className="text-violet-600 font-black text-2xl tracking-tighter uppercase">
                    Zero Compromise.
                  </p>
                  <p className="text-slate-400 font-light">
                    SYICT Core Architecture v4.2
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* CONTRAST: FRAGMENTS VS COHESION */}
        <div className="mb-48 relative">
          <div className="grid lg:grid-cols-2 gap-1 px-8 lg:px-0 bg-white border border-slate-200 rounded-[4rem] overflow-hidden shadow-xl shadow-slate-200/50">
            <div className="p-16 border-r border-slate-100 group cursor-default">
              <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-10">
                Off-the-shelf Software
              </h4>
              <div className="space-y-8 opacity-40 group-hover:opacity-100 transition-opacity">
                <p className="text-3xl font-bold text-slate-500 leading-tight italic">
                  "One size fits all" codebases with redundant features and performance bloat.
                </p>
                <div className="h-2 w-full bg-slate-100 rounded-full"></div>
                <p className="text-xs font-black text-slate-400 uppercase tracking-widest">
                   Hard-coded limitations • Slow adaptability • Licensing overhead
                </p>
              </div>
            </div>
            <div className="p-16 bg-violet-50/20 relative overflow-hidden group cursor-default">
              <div className="absolute top-0 right-0 p-12 text-violet-500 opacity-5 text-9xl font-black uppercase tracking-widest select-none">
                BESPOKE
              </div>
              <h4 className="text-[10px] font-black text-violet-600 uppercase tracking-widest mb-10">
                SYICT Bespoke Engine
              </h4>
              <div className="space-y-8 relative z-10">
                <p className="text-3xl font-black text-slate-900 leading-tight">
                  Atomic components designed solely for your specific business logic.
                </p>
                <div className="h-2 w-full bg-slate-100 rounded-full relative overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "100%" }}
                    transition={{ duration: 2 }}
                    className="absolute h-full bg-violet-500 shadow-[0_0_20px_rgba(124,58,237,0.3)]"
                  />
                </div>
                <p className="text-xs font-black text-violet-600 uppercase tracking-widest">
                   High Scalability • Zero Bloat • Ownership of Intellectual Property
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* COMPLEXITY MAPPING (Bento Grid) */}
        <div className="mb-48">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8 border-l-4 border-violet-600 pl-8 font-black">
            <div className="max-w-xl">
              <h2 className="text-[10px] font-black text-violet-500 uppercase tracking-[0.4em] mb-4">
                Architecture Classifications
              </h2>
              <p className="text-4xl md:text-6xl font-black text-slate-900 leading-tight">
                Solutions for your{" "}
                <span className="text-slate-400 italic font-serif font-light">
                  Logical Complexity.
                </span>
              </p>
            </div>
            <p className="text-slate-500 max-w-xs font-light text-lg">
              We specialize in deep-tier systems that go far beyond standard web functionality.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {appArchitecture.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative"
              >
                <div
                  className={`bg-white rounded-[3rem] p-12 h-full border border-slate-100 shadow-sm shadow-slate-200/50 hover:shadow-xl transition-all duration-500 group-hover:-translate-y-2 relative overflow-hidden`}
                >
                  <div
                    className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.color} text-white flex items-center justify-center text-3xl mb-10 shadow-lg shadow-violet-500/20`}
                  >
                    {item.icon}
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 mb-4 font-bold">
                    {item.title}
                  </h3>
                  <p className="text-slate-500 leading-relaxed font-light mb-8 text-lg">
                    {item.desc}
                  </p>
                  <div className="flex items-center gap-3 text-[10px] font-black text-violet-500 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                    Architecture Blueprint <IoInfiniteOutline className="text-lg" />
                  </div>
                  <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-violet-500/20 to-transparent"></div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* TECHNICAL STACK MANIFEST */}
        <div className="bg-white rounded-[4rem] p-8 lg:p-20 border border-slate-100 mb-48 overflow-hidden shadow-2xl shadow-slate-200/50 relative">
          <div className="grid lg:grid-cols-3 gap-12 relative z-10">
            <div className="lg:col-span-1">
              <h2 className="text-4xl font-black text-slate-900 mb-6">
                The Engineering <br />
                <span className="text-violet-600">Manifesto.</span>
              </h2>
              <p className="text-slate-500 font-light leading-relaxed text-lg mb-8 italic">
                 "Code is either engineering or liability. We choose engineering."
              </p>
              <div className="flex items-center gap-4 text-sm font-black text-slate-200 uppercase tracking-widest">
                <span className="w-12 h-[1px] bg-slate-100"></span> Native Execution Only
              </div>
            </div>

            <div className="lg:col-span-2 grid sm:grid-cols-2 gap-8">
              {engineeringEcosystem.map((item, idx) => (
                <div
                  key={idx}
                  className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 hover:border-violet-500/20 transition-all"
                >
                  <h4 className="font-black text-[10px] text-violet-500 uppercase tracking-[0.3em] mb-6">{item.group}</h4>
                  <div className="flex flex-wrap gap-2">
                     {item.tags.map(tag => (
                       <span key={tag} className="px-4 py-2 bg-white rounded-lg border border-slate-200 text-xs font-bold text-slate-700">
                          {tag}
                       </span>
                     ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div
            className="absolute inset-0 opacity-5 pointer-events-none"
            style={{
              backgroundImage:
                "radial-gradient(circle, #7c3aed 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          ></div>
        </div>

        {/* INVESTMENT ARCHITECTURE */}
        <div className="mb-48 text-center pt-20 border-t border-slate-100">
          <div className="max-w-2xl mx-auto mb-20 text-center">
            <h2 className="text-[10px] font-black text-violet-500 uppercase tracking-[0.4em] mb-4 font-bold">Investment Tiers</h2>
            <p className="text-4xl md:text-6xl font-black text-slate-900 leading-tight">
              Scale based on <span className="text-slate-400">system complexity.</span>
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto text-left">
            {[
              {
                t: "Core MVP",
                p: "$2499",
                list: [
                  "Proof of Concept Logic",
                  "Single-Platform Auth",
                  "Atomic UI Kit",
                  "PostgreSQL Persistence",
                  "2-Week Discovery Sprint",
                ],
                color: "slate",
              },
              {
                t: "Professional Engine",
                p: "$5999",
                list: [
                  "Multi-Tenant SaaS Flow",
                  "Third-party API Sync",
                  "Real-time Event Bridge",
                  "Automated QA Suite",
                  "Vercel/AWS Edge Deploy",
                ],
                color: "violet",
                highlight: true,
              },
              {
                t: "Enterprise Ecosystem",
                p: "Custom",
                list: [
                  "Legacy Data Migration",
                  "Multi-Vendor Integration",
                  "Zero-Trust Architecture",
                  "Dedicated DevOps Support",
                  "Full IP Transfer",
                ],
                color: "indigo",
              },
            ].map((tier, idx) => (
              <div
                key={idx}
                className={`bg-white rounded-[3.5rem] p-12 border ${tier.highlight ? "border-violet-500 ring-4 ring-violet-500/5 -translate-y-4 shadow-2xl shadow-violet-500/10" : "border-slate-100 shadow-sm shadow-slate-200/50"} flex flex-col h-full relative transition-all group`}
              >
                {tier.highlight && (
                  <div className="absolute top-0 right-0 bg-violet-600 text-white text-[10px] font-black uppercase tracking-widest px-8 py-2 rounded-bl-3xl">
                    Industrial Standard
                  </div>
                )}
                <h4 className="text-2xl font-black text-slate-900 mb-2">
                  {tier.t}
                </h4>
                <p className="text-5xl font-black text-slate-900 mb-10">{tier.p}</p>

                <div className="space-y-5 mb-12 flex-1">
                  {tier.list.map((item) => (
                    <div
                      key={item}
                      className="flex gap-3 items-center text-slate-500 font-light text-sm"
                    >
                      <IoCodeWorkingOutline className="text-violet-500 text-lg shrink-0" />{" "}
                      {item}
                    </div>
                  ))}
                </div>

                <button
                  className={`w-full py-5 rounded-2xl font-black uppercase tracking-widest text-[10px] transition-all shadow-lg ${tier.highlight ? "bg-violet-600 text-white shadow-violet-600/30" : "bg-white border border-slate-200 text-slate-900 hover:bg-slate-50"}`}
                >
                  Activate {tier.t} Brief
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* FINAL CTA */}
        <div className="text-center py-40 bg-white rounded-[5rem] border border-slate-100 relative overflow-hidden group shadow-2xl shadow-slate-200/50">
          <div className="absolute inset-0 bg-violet-50 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="max-w-4xl mx-auto px-6 relative z-10"
          >
            <IoLayersOutline className="text-7xl text-violet-500 mb-10 mx-auto opacity-20" />
            <h3 className="text-5xl lg:text-7xl font-black text-slate-900 mb-12 leading-tight">
              Ready to initialize your <br />
              <span className="text-violet-600 font-serif italic font-medium">
                Bespoke Platform?
              </span>
            </h3>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button className="px-12 py-6 bg-violet-600 text-white font-black rounded-xl hover:bg-violet-700 transition-all shadow-2xl shadow-violet-600/40 uppercase tracking-widest text-xs">
                Initalize Technical Brief
              </button>
              <Link
                href="/services/custom-apps/details"
                className="px-12 py-6 bg-slate-900 text-white font-black rounded-xl hover:bg-slate-800 transition-all uppercase tracking-widest text-xs flex items-center justify-center"
              >
                Technical Specifications
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
