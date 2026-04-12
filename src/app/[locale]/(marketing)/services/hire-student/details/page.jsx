"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { 
  IoArrowBackOutline, 
  IoPeopleOutline, 
  IoSchoolOutline, 
  IoGitMergeOutline,
  IoPulseOutline,
  IoSyncOutline,
  IoTerminalOutline,
  IoShieldCheckmarkOutline,
  IoCheckmarkCircleOutline,
  IoSearchOutline,
  IoRocketOutline,
  IoRibbonOutline
} from "react-icons/io5";

const vettingLifecycle = [
  { step: "01", stage: "Academic Audit", action: "Verifying student enrollment and core competency through our internal learning management system." },
  { step: "02", stage: "Logic Assessment", action: "Conducting technical assessments focused on algorithm efficiency and clean code standards." },
  { step: "03", stage: "Sandbox Project", action: "Assigning a low-risk internal module to test deadline discipline and adherence to documentation." },
  { step: "04", stage: "Portfolio Review", action: "Detailed audit of existing codebase/design files by our senior Mentor Mesh leads." },
  { step: "05", stage: "Communication Beta", action: "Simulated client briefings to verify soft-skills and reporting transparency." },
  { step: "06", stage: "Active Clearance", action: "Full onboarding into the Marketplace with persistent performance monitoring and peer-review." }
];

const vettingSpecs = [
  { group: "Skill Tier", items: ["Advanced Logic Tests", "Project Scoping Hub", "Framework Mastery", "UI/UX Foundations"] },
  { group: "Integrity Tier", items: ["NDA Compliance", "Time Tracking Sync", "Milestone Rigor", "Peer Review Loop"] },
  { group: "Bridge Tier", items: ["Direct Portal Comms", "Payment Security", "Contract Templates", "Conflict Resolution"] }
];

export default function HireStudentDetailsPage() {
  return (
    <section className="min-h-screen bg-slate-50 text-slate-900 selection:bg-amber-600 selection:text-white pb-40">
      {/* PERSISTENT BREADCRUMB */}
      <div className="border-b border-slate-200 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container-custom py-4 flex items-center justify-between">
          <Link href="/services/hire-student" className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-amber-600 transition-colors">
            <IoArrowBackOutline className="text-sm" /> Infrastructure Overview
          </Link>
          <div className="text-[10px] font-black uppercase tracking-[0.4em] text-amber-600">TALENT_BETA_v2.4</div>
        </div>
      </div>

      <div className="container-custom pt-24">
        {/* TECH HEADER */}
        <div className="max-w-5xl mb-32">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-4 text-amber-600 mb-8"
          >
            <div className="w-12 h-[1px] bg-amber-600"></div>
            <span className="text-[10px] font-black uppercase tracking-[0.4em]">Vetting Manifest</span>
          </motion.div>
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-12 leading-[0.85]">
            Talent <br/> <span className="text-slate-400 italic">Engineering.</span>
          </h1>
          <p className="text-slate-500 text-xl font-light leading-relaxed max-w-2xl italic">
            "Hiring a freelancer shouldn't be a gamble. We treat talent acquisition as a technical vetting discipline, ensuring every student on our platform is project-ready."
          </p>
        </div>

        {/* 6-PHASE VETTING GRID */}
        <div className="mb-48">
          <div className="flex items-center gap-8 mb-20">
             <h2 className="text-3xl font-black text-slate-900 tracking-tighter uppercase leading-none">The Vetting Lifecycle</h2>
             <div className="h-[1px] flex-1 bg-slate-200"></div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-slate-200 border border-slate-200 rounded-[3rem] overflow-hidden shadow-2xl">
            {vettingLifecycle.map((item, i) => (
              <div key={i} className="bg-white p-12 hover:bg-slate-50 transition-colors group">
                 <div className="text-amber-600 font-mono text-xs mb-8 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-amber-600"></span> 
                    {item.step} // TALENT_SYNC_STRICT
                 </div>
                 <h3 className="text-xl font-black text-slate-900 mb-4 tracking-tight group-hover:text-amber-600 transition-colors uppercase">{item.stage}</h3>
                 <p className="text-slate-500 text-sm font-light leading-relaxed">{item.action}</p>
              </div>
            ))}
          </div>
        </div>

        {/* QUALITY ASSURANCE SECTION */}
        <div className="grid lg:grid-cols-2 gap-20 items-start mb-48">
           <div className="sticky top-32">
              <div className="w-16 h-16 bg-amber-50 rounded-2xl flex items-center justify-center text-3xl text-amber-600 mb-10 border border-amber-100">
                <IoRibbonOutline />
              </div>
              <h2 className="text-5xl font-black text-slate-900 mb-8 tracking-tighter">Mentor <br/> Oversight <span className="text-amber-600">Protocol.</span></h2>
              <p className="text-slate-500 text-lg font-light leading-relaxed mb-12">Every freelance project sits on our 'Mentor Mesh' platform, ensuring that senior engineers review critical code and design before final delivery.</p>
              
              <div className="p-8 bg-slate-900 rounded-3xl border border-slate-800 shadow-2xl flex items-center justify-between group cursor-default">
                 <div className="flex gap-4 items-center">
                    <div className="w-12 h-12 rounded-xl bg-amber-500 flex items-center justify-center text-white shadow-lg"><IoGitMergeOutline className="text-2xl" /></div>
                    <div>
                       <p className="text-[10px] font-black text-white/40 uppercase tracking-widest">Quality Audit</p>
                       <p className="text-xs font-bold text-white tracking-tight">MENTOR_CONSENSUS::PASSED</p>
                    </div>
                 </div>
                 <IoSyncOutline className="text-amber-500 text-xl animate-spin-slow" />
              </div>
           </div>

           <div className="space-y-6">
              {vettingSpecs.map((spec, idx) => (
                 <div key={idx} className="bg-white rounded-[2.5rem] p-10 border border-slate-200 shadow-sm hover:shadow-xl transition-all">
                    <h4 className="text-[10px] font-black text-amber-600 uppercase tracking-[0.4em] mb-8">{spec.group} Framework</h4>
                    <div className="grid grid-cols-2 gap-4">
                       {spec.items.map(item => (
                          <div key={item} className="flex items-center gap-3 text-sm font-bold text-slate-600">
                             <IoCheckmarkCircleOutline className="text-amber-600 text-lg" /> {item}
                          </div>
                       ))}
                    </div>
                 </div>
              ))}
           </div>
        </div>

        {/* DIRECT BRIDGE SECTION */}
        <div className="bg-white rounded-[4rem] p-12 lg:p-24 border border-slate-100 shadow-2xl shadow-slate-200/50 relative overflow-hidden mb-48">
           <div className="absolute top-0 right-0 w-1/3 h-full bg-slate-50/50 border-l border-slate-100 skew-x-12 translate-x-12"></div>
           <div className="grid lg:grid-cols-2 gap-20 relative z-10">
              <div>
                 <div className="text-amber-600 mb-8 flex items-center gap-4">
                    <div className="w-12 h-[2px] bg-amber-600"></div>
                    <span className="text-[10px] font-black uppercase tracking-[0.4em]">Direct Client-Student Bridge</span>
                 </div>
                 <h2 className="text-5xl font-black text-slate-900 mb-8 leading-[0.9]">Absolute <br/><span className="text-amber-600">Transparency.</span></h2>
                 <p className="text-slate-500 text-lg font-light leading-relaxed mb-12 italic">"By hiring a student, you're investing in the future of the tech ecosystem while receiving enterprise-grade work at startup-friendly rates."</p>
                 
                 <div className="space-y-4">
                    {[
                       { i: <IoPeopleOutline />, t: "Vetted Matching", d: "We match projects with students based on proven tech-stack scores." },
                       { i: <IoShieldCheckmarkOutline />, t: "Escrow Security", d: "Payments are held in escrow and released only upon Mentor approval." },
                       { i: <IoPulseOutline />, t: "Portfolio Sync", d: "Active tracking of student project histories and peer reviews." }
                    ].map((feat, i) => (
                       <div key={i} className="flex gap-4 p-6 bg-slate-50 rounded-2xl border border-slate-100">
                          <div className="text-2xl text-amber-600">{feat.i}</div>
                          <div>
                             <h5 className="text-[10px] font-black text-slate-900 uppercase tracking-widest">{feat.t}</h5>
                             <p className="text-xs text-slate-400 font-bold">{feat.d}</p>
                          </div>
                       </div>
                    ))}
                 </div>
              </div>

              <div className="relative">
                 <div className="bg-slate-900 rounded-[3rem] p-10 border border-slate-800 shadow-2xl aspect-[3/4] flex flex-col justify-between group overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="space-y-8 relative z-10">
                       <div className="flex justify-between items-center text-white/30 font-mono text-[8px] tracking-[0.4em]">
                          <span>SYS_TALENT_200</span>
                          <span>TALENT_ARCH</span>
                       </div>
                       
                       <div className="space-y-4">
                          <div className="h-[1px] w-full bg-white/10"></div>
                          <div className="flex items-center gap-4">
                             <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-amber-400 font-black text-xs"><IoSchoolOutline /></div>
                             <div className="flex-1 space-y-2">
                                <div className="h-1.5 bg-white/10 rounded-full w-full"></div>
                                <div className="h-1.5 bg-white/5 rounded-full w-2/3"></div>
                             </div>
                          </div>
                       </div>

                       <div className="p-6 bg-white/5 rounded-2xl border border-white/5">
                          <p className="text-[8px] font-mono text-emerald-400 mb-2 tracking-tighter">VETTING_STATUS::100%_CLEARED</p>
                          <p className="text-[8px] font-mono text-slate-500 leading-tight">MEMBER_ID: S_8210<br/>SCORE: 96/100<br/>VERIFIED: YES</p>
                       </div>
                    </div>

                    <div className="bg-white/5 rounded-3xl border border-white/10 p-8 relative overflow-hidden group/m hover:bg-white/10 transition-all">
                       <IoTerminalOutline className="text-4xl text-amber-600/30 mb-4 group-hover/m:rotate-12 transition-transform" />
                       <p className="text-[9px] font-black text-white/50 uppercase tracking-widest mb-2">Protocol: TALENT_QA_CERT</p>
                       <p className="text-xs font-bold text-white tracking-tight">Talent ready for direct deployment.</p>
                       <div className="absolute bottom-0 left-0 w-full h-[1px] bg-amber-500/50"></div>
                    </div>
                 </div>
              </div>
           </div>
        </div>

        {/* CTA */}
        <div className="text-center py-40 border-t border-slate-200">
           <IoRocketOutline className="text-7xl text-amber-600 mb-12 mx-auto opacity-20" />
           <h3 className="text-5xl lg:text-7xl font-black text-slate-900 mb-12 leading-tight">Ready to activate your <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-indigo-600 font-serif italic font-medium">Talent Bridge?</span></h3>
           <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button className="w-full sm:w-[280px] px-8 py-6 bg-amber-600 text-white font-black rounded-xl hover:bg-amber-700 transition-all shadow-2xl shadow-amber-600/40 uppercase tracking-widest text-[10px] flex items-center justify-center">
                Initialize Talent Search
              </button>
              <Link
                href="/freelancing"
                className="w-full sm:w-[280px] px-8 py-6 bg-slate-900 text-white font-black rounded-xl hover:bg-slate-800 transition-all uppercase tracking-widest text-[10px] flex items-center justify-center text-center"
              >
                Hire Student Talent
              </Link>
           </div>
        </div>
      </div>
    </section>
  );
}
