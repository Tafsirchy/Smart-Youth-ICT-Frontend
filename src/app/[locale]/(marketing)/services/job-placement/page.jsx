"use client";

import { motion } from "framer-motion";
import { 
  IoBarChart, 
  IoStarOutline, 
  IoTrendingUpInternal, 
  IoBagHandleOutline, 
  IoNavigateCircleOutline, 
  IoBriefcaseOutline, 
  IoRibbonOutline, 
  IoChatbubblesOutline, 
  IoSearchOutline, 
  IoPeopleOutline,
  IoStatsChart,
  IoFlaskOutline
} from "react-icons/io5";

const placements = [
  {
    title: "Global Remote Hubs",
    type: "Overseas Expansion",
    desc: "Placing our top 1% in international startups and remote-first companies across North America, Europe, and UAE.",
    icon: <IoNavigateCircleOutline />,
    color: "bg-blue-600",
    avgSalary: "$1,200 - $3,500"
  },
  {
    title: "Local Tech Giants",
    type: "Bangladesh Software Firms",
    desc: "Direct partnerships with top-tier software houses and financial institutions within the local Bangladesh ecosystem.",
    icon: <IoBriefcaseOutline />,
    color: "bg-emerald-600",
    avgSalary: "৳45k - ৳120k"
  },
  {
    title: "Marketing & Ad Agencies",
    type: "Creative Studios",
    desc: "For our Designers and Growth Marketers—securing roles in major advertising agencies and high-growth retail brands.",
    icon: <IoRibbonOutline />,
    color: "bg-rose-500",
    avgSalary: "৳35k - ৳85k"
  }
];

const lifecycle = [
  { step: "Phase 01", title: "Technical Vetting", d: "A rigorous 48-hour coding/design hackathon to verify you are truly ready for production-level work." },
  { step: "Phase 02", title: "Soft Skills & CV Lab", d: "Crafting ATS-friendly resumes and optimizing your storytelling to stand out in a sea of thousands." },
  { step: "Phase 03", title: "Mock Interview Simulation", d: "Face real CTOs and HR Managers in simulated environments to build undeniable confidence." },
  { step: "Phase 04", title: "Direct Referral Drive", d: "Instead of applying, your CV is pushed directly to the desks of decision-makers in our network." },
  { step: "Phase 05", title: "Post-Placement Support", d: "Our mentors stay with you for the first 90 days of your job to ensure you transition flawlessly." }
];

export default function JobPlacementSupportPage() {
  return (
    <section className="min-h-screen bg-slate-950 overflow-hidden relative font-sans">
      <div className="absolute inset-x-0 top-0 h-[800px] bg-gradient-to-b from-blue-900/30 via-transparent to-transparent pointer-events-none"></div>

      <div className="container-custom py-24 relative z-10">
        
        {/* Massive Hero Section */}
        <div className="max-w-4xl mx-auto text-center mb-32">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-blue-500/10 text-blue-400 text-xs font-black tracking-widest uppercase mb-8 border border-blue-500/20"
          >
            Your Career Launchpad
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-6xl md:text-7xl lg:text-9xl font-black text-white leading-[0.9] mb-8 tracking-tighter"
          >
            Graduate. <br className="hidden md:block"/> <span className="text-blue-500">Accelerate.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 text-xl md:text-3xl leading-relaxed font-light max-w-3xl mx-auto"
          >
            Graduation is just the beginning. Our dedicated placement cell actively maps our top talent with high-growth tech hiring partners worldwide.
          </motion.p>
        </div>

        {/* Target Classifications */}
        <div className="mb-32">
          <h2 className="text-4xl font-black text-white text-center mb-16">Placement Track Classifications</h2>
          <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
             {placements.map((p, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[3rem] p-10 group hover:border-blue-500/50 transition-all overflow-hidden relative"
                >
                  <div className={`absolute -right-10 -bottom-10 w-40 h-40 ${p.color} opacity-10 rounded-full blur-[60px] group-hover:opacity-30 transition-opacity`}></div>
                  
                  <div className={`w-16 h-16 rounded-2xl ${p.color} text-white flex items-center justify-center text-3xl mb-8 shadow-2xl`}>
                    {p.icon}
                  </div>
                  <h3 className="text-2xl font-black text-white mb-2">{p.title}</h3>
                  <p className="text-xs font-black uppercase tracking-widest text-blue-400 mb-6">{p.type}</p>
                  <p className="text-slate-400 leading-relaxed font-light mb-8">{p.desc}</p>
                  
                  <div className="pt-6 border-t border-white/5">
                     <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Avg. Entry Package</p>
                     <p className="text-2xl font-black text-white">{p.avgSalary}</p>
                  </div>
                </motion.div>
             ))}
          </div>
        </div>

        {/* The Lifecycle */}
        <div className="mb-32 max-w-5xl mx-auto">
          <h2 className="text-4xl lg:text-5xl font-black text-white text-center mb-20 leading-tight">The Placement <span className="text-blue-500">Lifecycle.</span></h2>
          <div className="space-y-12 relative">
             <div className="absolute left-6 top-10 bottom-10 w-px bg-white/10 hidden md:block"></div>
             {lifecycle.map((l, i) => (
               <motion.div
                 key={i}
                 initial={{ opacity: 0, x: -20 }}
                 whileInView={{ opacity: 1, x: 0 }}
                 viewport={{ once: true }}
                 transition={{ delay: i * 0.1 }}
                 className="flex flex-col md:flex-row gap-8 items-start relative z-10"
               >
                 <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white font-black shrink-0 shadow-xl shadow-blue-600/30">
                   {i + 1}
                 </div>
                 <div className="flex-1">
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                       <h3 className="text-2xl font-black text-white">{l.title}</h3>
                       <span className="text-xs font-black text-blue-500 uppercase tracking-widest bg-blue-500/10 px-3 py-1 rounded-md">{l.step}</span>
                    </div>
                    <p className="text-slate-400 text-lg font-light leading-relaxed max-w-2xl">{l.d}</p>
                 </div>
               </motion.div>
             ))}
          </div>
        </div>

        {/* Interview Labs & Facility Section */}
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="bg-white rounded-[3rem] p-12 lg:p-20 flex flex-col lg:flex-row items-center gap-16 shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-100 rounded-full blur-[100px] pointer-events-none -translate-y-1/2 translate-x-1/2 opacity-60"></div>
          
          <div className="flex-1 space-y-8 relative z-10">
             <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center text-3xl shadow-sm"><IoFlaskOutline /></div>
             <h2 className="text-4xl lg:text-5xl font-black text-slate-900 leading-tight">Career Launch <br/>Labs.</h2>
             <p className="text-slate-600 text-lg md:text-xl font-light leading-relaxed">We don't just refer—we prepare. Our physically simulated interview labs in Uttara provide you with the exact pressure-test you need before facing real hiring boards.</p>
             
             <div className="grid grid-cols-2 gap-8">
                <div>
                   <h4 className="font-bold text-slate-900 flex items-center gap-2 mb-2"><IoChatbubblesOutline className="text-blue-500" /> Mock HR Rounds</h4>
                   <p className="text-xs text-slate-400 font-medium leading-relaxed uppercase tracking-widest font-black">Live practice sessions with senior tech recruiters.</p>
                </div>
                <div>
                   <h4 className="font-bold text-slate-900 flex items-center gap-2 mb-2"><IoSearchOutline className="text-blue-500" /> Resume Audit</h4>
                   <p className="text-xs text-slate-400 font-medium leading-relaxed uppercase tracking-widest font-black">Personalized refinement to bypass global ATS filters.</p>
                </div>
             </div>
          </div>

          <div className="flex-1 w-full lg:w-auto relative hidden lg:block">
             <div className="bg-slate-950 rounded-[2.5rem] p-10 h-[450px] flex flex-col justify-end relative shadow-2xl overflow-hidden border-8 border-slate-900">
                <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_40%,rgba(0,0,0,0.8))] z-10"></div>
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&h=800&fit=crop')] bg-cover bg-center grayscale opacity-60"></div>
                
                <div className="relative z-20 space-y-2">
                   <p className="text-blue-400 font-black tracking-widest uppercase text-xs">Internal Simulation</p>
                   <h4 className="text-4xl font-black text-white">The Mock Hall.</h4>
                   <p className="text-slate-400 text-sm">Where students transform into professionals.</p>
                </div>
             </div>
          </div>
        </motion.div>

        {/* Global Stats Footer */}
        <div className="mt-32 border-t border-white/5 pt-16 flex flex-col lg:flex-row items-center justify-between gap-12 text-center lg:text-left">
           <div className="flex gap-12">
              <div>
                <p className="text-blue-500 text-5xl font-black mb-2">120+</p>
                <p className="text-white font-bold uppercase tracking-widest text-[10px] text-slate-500">Hiring Partners</p>
              </div>
              <div>
                <p className="text-emerald-500 text-5xl font-black mb-2">90%</p>
                <p className="text-white font-bold uppercase tracking-widest text-[10px] text-slate-500">Placement Rate</p>
              </div>
           </div>
           <button className="px-12 py-5 bg-blue-600 text-white font-black rounded-full hover:scale-105 transition-transform shadow-2xl uppercase tracking-widest text-sm">
             Become a Hiring Partner
           </button>
        </div>

      </div>
    </section>
  );
}
