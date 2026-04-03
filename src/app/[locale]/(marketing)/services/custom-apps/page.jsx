"use client";

import { motion } from "framer-motion";
import { 
  IoTerminalOutline, 
  IoShieldCheckmarkOutline, 
  IoSyncOutline, 
  IoGridOutline, 
  IoCubeOutline,
  IoCodeWorkingOutline,
  IoCloudDoneOutline
} from "react-icons/io5";

const appClassifications = [
  {
    title: "SaaS Platforms",
    desc: "Single or multi-tenant architectures with subscription handling, user workspaces, and complex permission mapping.",
    icon: <IoCubeOutline />,
    color: "text-blue-400"
  },
  {
    title: "Real-time Dashboards",
    desc: "Data-heavy interfaces with live WebSocket updates for financial monitoring, analytics, and IoT telemetry.",
    icon: <IoSyncOutline />,
    color: "text-emerald-400"
  },
  {
    title: "Community & Portals",
    desc: "Large-scale social networks or internal employee portals with interactive feeds and profile management.",
    icon: <IoGridOutline />,
    color: "text-purple-400"
  }
];

const techStack = [
  { name: "Frontend", val: "Next.js 14 / React 18 / Tailwind" },
  { name: "Backend", val: "Node.js / Express / Python FastAPI" },
  { name: "Realtime", val: "Socket.io / Redis / PubSub" },
  { name: "Database", val: "PostgreSQL / Prisma / MongoDB" }
];

export default function CustomAppsPage() {
  return (
    <section className="min-h-screen bg-black overflow-hidden relative font-mono">
      {/* Intense Background Effects */}
      <div className="absolute inset-x-0 top-0 h-[600px] bg-emerald-500/10 blur-[120px] pointer-events-none -z-10 opacity-30"></div>
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05] pointer-events-none"></div>
      
      <div className="container-custom pt-32 pb-20 relative z-10">
        <div className="mb-20 border-l-4 border-emerald-500 pl-8 lg:pl-16">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-xs tracking-[0.4em] uppercase mb-4 font-black"
          >
            <span className="text-emerald-500">request.header</span>: "BESPOKE ARCHITECTURE"
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-9xl font-black text-white leading-[0.9] mb-8 tracking-tighter"
          >
            Custom Web <br/> <span className="text-emerald-500">Applications.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 text-lg md:text-2xl font-sans max-w-3xl leading-relaxed"
          >
            When off-the-shelf software falls short, we engineer fully custom platforms from first principles. Scalable, secure, and purely technical solutions for modern problems.
          </motion.p>
        </div>

        {/* Classification Cards */}
        <div className="grid lg:grid-cols-3 gap-8 mb-32">
          {appClassifications.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-zinc-900 border border-emerald-500/10 p-10 rounded-2xl hover:border-emerald-500/40 transition-all group"
            >
              <div className={`text-4xl ${item.color} mb-8 group-hover:scale-110 transition-transform`}>
                {item.icon}
              </div>
              <h3 className="text-2xl font-black text-white mb-4 font-sans">{item.title}</h3>
              <p className="text-slate-500 leading-relaxed font-sans font-light">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Technical Architecture Component */}
        <div className="grid lg:grid-cols-2 gap-20 items-center mb-32 max-w-full">
           <div className="space-y-12">
              <h2 className="text-4xl font-black text-white font-sans">The Engineering Stack.</h2>
              <div className="space-y-6">
                 {techStack.map((tech, i) => (
                    <motion.div 
                      key={i} 
                      whileHover={{ x: 10 }}
                      className="flex justify-between items-center border-b border-emerald-950 pb-4 group"
                    >
                       <span className="text-xs font-black uppercase text-emerald-500/50 group-hover:text-emerald-500 transition-colors tracking-[0.2em]">{tech.name}</span>
                       <span className="text-white text-sm font-bold">{tech.val}</span>
                    </motion.div>
                 ))}
              </div>
              <div className="pt-10 flex gap-4">
                 <div className="flex items-center gap-2 px-4 py-2 bg-emerald-500/10 rounded-full border border-emerald-500/20 text-[10px] text-emerald-500 uppercase font-black tracking-widest"><IoShieldCheckmarkOutline /> Enterprise Security</div>
                 <div className="flex items-center gap-2 px-4 py-2 bg-emerald-500/10 rounded-full border border-emerald-500/20 text-[10px] text-emerald-500 uppercase font-black tracking-widest"><IoCloudDoneOutline /> 24/7 Monitoring</div>
              </div>
           </div>

           <motion.div
             initial={{ opacity: 0, scale: 0.9 }}
             whileInView={{ opacity: 1, scale: 1 }}
             viewport={{ once: true }}
             className="bg-black/80 backdrop-blur-3xl border border-emerald-500/20 rounded-[2.5rem] p-10 h-full overflow-hidden shadow-[0_0_80px_rgba(16,185,129,0.15)]"
           >
              <div className="flex gap-2 mb-8 border-b border-emerald-900 pb-4">
                 <div className="w-3 h-3 rounded-full bg-rose-500/50"></div>
                 <div className="w-3 h-3 rounded-full bg-amber-500/50"></div>
                 <div className="w-3 h-3 rounded-full bg-emerald-500/50"></div>
                 <p className="ml-auto text-[10px] text-emerald-900 font-black uppercase">Platform Deployment Console</p>
              </div>
              
              <div className="text-emerald-500/80 space-y-4 text-xs sm:text-sm leading-relaxed">
                 <p><span className="text-white opacity-40">$</span> syict deploy --env production</p>
                 <p><span className="text-purple-400">STATUS</span>: Checking build files...</p>
                 <p><span className="text-purple-400">STATUS</span>: Optimizing serverless routes (Next.js 14)</p>
                 <p className="text-yellow-400">[info] Initializing PostgreSQL database migrations...</p>
                 <p className="text-emerald-400">✔ Migrations applied successfully (42.1ms)</p>
                 <p className="text-emerald-400">✔ Redis cache warm-up complete</p>
                 <p className="text-emerald-400">✔ WebSocket bridge handshake operational</p>
                 <br/>
                 <p className="text-white p-3 bg-emerald-900/20 rounded border border-emerald-500/30 text-center font-black animate-pulse">DEPLOYMENT SUCCESSFUL : v2.4.1</p>
              </div>
           </motion.div>
        </div>

        {/* Action Section */}
        <div className="relative pt-24 border-t border-emerald-950 flex flex-col items-center text-center max-w-4xl mx-auto">
           <h3 className="text-3xl font-black text-white font-sans mb-10">Stop compromising. Build the platform you actually need.</h3>
           <button className="px-10 py-5 bg-emerald-500 text-black font-black rounded-full hover:bg-emerald-400 transition-colors shadow-2xl uppercase tracking-widest text-sm">
              Schedule Technical Consultation
           </button>
        </div>
      </div>
    </section>
  );
}
