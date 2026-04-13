"use client";

import { motion } from "framer-motion";
import { IoRibbonOutline } from "react-icons/io5";

export default function CertificationsProgramsPage() {
  return (
    <section className="min-h-screen bg-slate-50 py-20 overflow-hidden relative">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          <div className="max-w-2xl relative z-10">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-bold tracking-widest uppercase mb-6"
            >
              <IoRibbonOutline size={18} /> Official Validation
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-black text-slate-900 leading-[1.1] mb-8 tracking-tighter"
            >
              Certification <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-600 animate-gradient-x">Programs</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="text-slate-600 text-lg md:text-xl leading-relaxed mb-10"
            >
              Boost your resume instantly. Our certification programs assess your skills through rigorous practical exams and issue a verified digital certificate recognized by local and global hiring partners.
            </motion.p>
            
            <div className="space-y-4">
              {["Verify your skills via unique digital IDs", "Direct integration directly into your LinkedIn profile", "Backed by Government and ISO valid authorities"].map((feat, i) => (
                <div key={i} className="flex gap-4 items-center bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
                  <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-black">✓</div>
                  <p className="font-medium text-slate-700">{feat}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative h-[500px] w-full mt-10 lg:mt-0">
            {/* Elaborate certificate mockup animation */}
            <motion.div
              initial={{ opacity: 0, y: 50, rotateX: 20 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ duration: 1, type: "spring" }}
              className="absolute inset-0 bg-white shadow-2xl rounded-sm border border-slate-200 p-8 flex flex-col items-center justify-center text-center transform perspective-1000"
            >
              <div className="border-[6px] border-double border-slate-200 w-full h-full p-10 flex flex-col items-center">
                 <h2 className="font-serif text-4xl text-slate-800 mb-2">Certificate of Completion</h2>
                 <p className="font-mono text-xs text-slate-400 mb-10 tracking-[0.3em]">SMART YOUTH ICT</p>
                 
                 <p className="text-slate-500 mb-2">This certifies that</p>
                 <h3 className="text-3xl font-bold text-brand-green mb-6 border-b border-slate-300 pb-2 px-10">[Your Name Here]</h3>
                 
                 <p className="text-slate-600 max-w-sm mb-12">has successfully completed the Professional Certification Program demonstrating outstanding practical expertise.</p>
                 
                 <div className="flex justify-between w-full px-10 mt-auto">
                    <div className="text-center">
                      <div className="w-24 h-px bg-slate-400 mb-2"></div>
                      <p className="text-xs font-bold text-slate-400 uppercase">Director</p>
                    </div>
                    <div className="w-20 h-20 border-4 border-amber-400 rounded-full flex items-center justify-center text-amber-500 bg-amber-50 shrink-0 shadow-lg -mt-10">
                      🏆
                    </div>
                    <div className="text-center">
                      <div className="w-24 h-px bg-slate-400 mb-2"></div>
                      <p className="text-xs font-bold text-slate-400 uppercase">Lead Instructor</p>
                    </div>
                 </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
