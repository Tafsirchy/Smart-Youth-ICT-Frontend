"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { IoCheckmarkCircle } from "react-icons/io5";

const licenses = [
  {
    title: "ISO 9001:2015 Certified",
    description: "Internationally recognized standard ensuring our educational services meet the strict needs of students through an effective quality management system.",
    symbol: "🏆",
    color: "from-amber-400 to-orange-500",
  },
  {
    title: "Government Registered Institute",
    description: "Fully licensed training facility under the technical education board, ensuring valid compliance with national standard regulatory frameworks.",
    symbol: "🏛️",
    color: "from-blue-400 to-indigo-600",
  },
  {
    title: "Recognized Digital Sandbox",
    description: "Awarded validation by top regional IT associations for continuous and relentless contribution to the local software economy.",
    symbol: "🏅",
    color: "from-emerald-400 to-teal-600",
  },
];

export default function CertificationsPage() {
  return (
    <section className="min-h-screen bg-slate-50 py-20 overflow-hidden relative">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Text Content */}
          <div className="max-w-2xl relative z-10">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-green/10 text-brand-green text-sm font-bold tracking-widest uppercase mb-6"
            >
              <IoCheckmarkCircle size={18} /> Approvals & Trust
            </motion.div>
            <h1 className="text-5xl md:text-7xl font-black text-slate-900 leading-[1.1] mb-8 tracking-tighter">
              Certifi-<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-600 animate-gradient-x">cations.</span>
            </h1>
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="text-slate-600 text-lg md:text-xl leading-relaxed mb-10"
            >
              When you earn a certificate from Smart Youth ICT, you carry a credential backed by the Government and international ISO standards. It's not just a piece of paper; it's a testament to rigorous quality.
            </motion.p>

            <ul className="space-y-6">
              {licenses.map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  className="flex gap-4"
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0 bg-gradient-to-br ${item.color} text-white shadow-md`}>
                    {item.symbol}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-1">{item.title}</h3>
                    <p className="text-slate-600 font-medium leading-relaxed">{item.description}</p>
                  </div>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Graphical Certs Display */}
          <div className="relative h-[600px] w-full hidden lg:block">
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, type: "spring" }}
              className="absolute top-10 right-10 w-80 h-[450px] bg-white rounded-xl shadow-2xl border border-slate-200 p-6 z-20 origin-bottom-right"
            >
              <div className="w-full h-full border-4 border-double border-slate-200 flex flex-col items-center justify-center p-4 text-center">
                <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center text-amber-500 mb-6 text-4xl">🏆</div>
                <h4 className="font-serif text-2xl font-bold text-slate-900 mb-2">Certificate of Excellence</h4>
                <p className="text-[10px] uppercase tracking-widest text-slate-400 mb-8">ISO 9001:2015 Approved</p>
                <div className="w-24 h-1 bg-slate-800 rounded-full mb-1"></div>
                <p className="text-xs font-bold text-slate-800">Authorized Signature</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: 10 }}
              animate={{ opacity: 1, scale: 1, rotate: 5 }}
              transition={{ duration: 0.8, type: "spring", delay: 0.2 }}
              className="absolute top-32 left-0 w-80 h-[450px] bg-slate-900 rounded-xl shadow-2xl border border-slate-700 p-6 z-10 origin-bottom-left"
            >
              <div className="w-full h-full border border-dashed border-slate-600 flex flex-col items-center justify-center p-4 text-center">
                <div className="w-16 h-16 bg-blue-500/20 rounded-lg flex items-center justify-center text-blue-400 mb-6 text-3xl">🏛️</div>
                <h4 className="font-serif text-xl text-white mb-2">Government Approval</h4>
                <p className="text-[10px] uppercase tracking-widest text-slate-500 mb-8">Tech Education Board</p>
                <div className="flex gap-4">
                   <div className="mt-4 opacity-50"><div className="w-16 h-4 bg-slate-600 rounded"></div></div>
                   <div className="mt-4 opacity-50"><div className="w-16 h-4 bg-slate-600 rounded"></div></div>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
