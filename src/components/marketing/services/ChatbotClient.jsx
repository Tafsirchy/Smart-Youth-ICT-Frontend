"use client";

import { useState } from "react";
import { IoArrowForwardOutline, IoCloseOutline, IoLogoWhatsapp, IoSparklesOutline } from "react-icons/io5";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { getIcon } from "@/lib/icons";

export default function ChatbotClient({ content, data: propData }) {
  const [showModal, setShowModal] = useState(false);

  const rawData = propData || content?.landing || {};
  const hero = rawData.hero || {
    badge: "Neural Intelligence & Conversational AI",
    title: "AI Chatbot & Autonomous Support Agents",
    description:
      "Architecting conversation with precision. We build RAG-powered, multi-channel AI agents that reduce operational friction and drive autonomous engagement.",
  };
  const sections = rawData.sections || {};
  const cta = rawData.cta || {
    badge: "24/7 Autonomous Engagement",
    title: "Your Business Never Sleeps. Neither Does Your AI Agent.",
    subtitle:
      "Book a free AI deployment consultation. We will scope your knowledge base, integration points, and design the perfect autonomous support architecture.",
  };

  const pillarsData = sections.pillars || [
    {
      title: "Neural Architectures",
      desc: "Utilizing Large Language Models (LLMs) to understand context, intent, and sentiment for human-level reasoning.",
      icon: "Chip",
      color: "from-emerald-500 to-teal-600",
    },
    {
      title: "Deterministic Logic",
      desc: "Structured workflow systems designed for high-velocity FAQ handling and precise data collection.",
      icon: "GitNetwork",
      color: "from-blue-500 to-indigo-600",
    },
    {
      title: "Hybrid Governance",
      desc: "Combining AI autonomy with seamless human-agent handoffs for enterprise-grade support reliability.",
      icon: "Analytics",
      color: "from-purple-500 to-fuchsia-600",
    },
  ];

  const metricsData = sections.metrics || [
    { t: "99.2% RESOLUTION", d: "First-contact resolution rate", value: "99.2%", label: "Resolution Rate" },
    { t: "< 250ms INFERENCE", d: "Sub-second real-time streaming", value: "< 250ms", label: "Inference Latency" },
    { t: "24/7 AUTONOMOUS", d: "Zero downtime round-the-clock", value: "24/7/365", label: "Continuous Support" },
    { t: "60+ LANGUAGES", d: "Native multilingual translation", value: "60+", label: "Global Dialects" },
  ];

  const integrationsData = sections.integrations || [
    { t: "WhatsApp Business API", d: "Direct Meta Cloud webhook synchronization for automated conversational customer engagement." },
    { t: "Facebook Messenger", d: "Automated social commerce lead routing and instant product inquiry assistance." },
    { t: "Native Web Chat", d: "Ultra-fast headless React widget with streaming token responses and zero latency." },
    { t: "Enterprise CRM & Slack", d: "Bi-directional webhook sync with HubSpot, Salesforce, and internal staff alert channels." },
  ];

  return (
    <section className="min-h-screen bg-white flex flex-col relative selection:bg-brand-pink selection:text-white font-sans">
      {/* Background Dot Texture */}
      <div className="fixed inset-0 bg-[radial-gradient(#0F172A08_1px,transparent_1px)] [background-size:22px_22px] pointer-events-none z-0" />

      <div className="relative z-10 flex flex-col flex-1">
        {/* ── Minimized Hero ── */}
        <div className="border-b border-slate-100 bg-white/70 backdrop-blur-sm">
          <div className="container-custom pt-10 sm:pt-14 pb-8 flex flex-col items-center text-center gap-3 max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#FF2C6D]/8 border border-[#FF2C6D]/25 text-[#FF2C6D] text-[10px] font-black uppercase tracking-widest rounded-full leading-[1.4]"
            >
              <span className="h-1.5 w-1.5 bg-[#FF2C6D] rounded-full shrink-0 animate-pulse" />
              {hero.badge || "Neural Intelligence & Conversational AI"}
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08 }}
              className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 leading-[1.2]"
            >
              AI Chatbot & <span className="text-[#FF2C6D]">Autonomous Support Agents</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="text-slate-500 text-sm md:text-base leading-relaxed max-w-3xl font-normal"
            >
              {hero.description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.22 }}
              className="flex flex-wrap items-center justify-center gap-3 pt-2"
            >
              <button
                onClick={() => setShowModal(true)}
                className="px-6 py-2.5 bg-[#FF2C6D] text-white font-bold hover:bg-[#e0285f] transition-colors shadow-sm uppercase tracking-wider text-xs rounded-lg min-h-[42px]"
              >
                Initialize AI Deployment
              </button>
              <Link
                href="/en/services/chatbot/details"
                className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-[#10B981] hover:text-[#FF2C6D] transition-colors py-2 px-3"
              >
                Technical Details <IoArrowForwardOutline />
              </Link>
            </motion.div>
          </div>
        </div>

        {/* ── Key Highlights Strip ── */}
        {metricsData.length > 0 && (
          <div className="border-b border-slate-100 bg-slate-50/80">
            <div className="container-custom py-3.5">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center divide-x divide-slate-200/60">
                {metricsData.map((item, idx) => (
                  <div key={idx} className="px-2">
                    <p className="text-xl sm:text-2xl font-black text-slate-900 leading-[1.1]">
                      {item.value || item.t}
                    </p>
                    <p className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-slate-400 mt-1">
                      {item.label || item.d}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── Capability Pillars (AI Architecture DNA) ── */}
        {pillarsData.length > 0 && (
          <div className="container-custom py-10 sm:py-14">
            <div className="text-center max-w-xl mx-auto mb-8">
              <h2 className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-1.5 leading-[1.4]">
                AI Architecture DNA
              </h2>
              <p className="text-xl sm:text-2xl font-black text-slate-900 leading-[1.2]">
                Pillars of Autonomous Intelligence
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {pillarsData.map((item, i) => (
                <div
                  key={i}
                  className="bg-white border border-slate-200/80 hover:border-[#FF2C6D]/40 hover:shadow-lg transition-all rounded-xl p-6 relative flex flex-col group overflow-hidden"
                >
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#FF2C6D] to-[#10B981] opacity-0 group-hover:opacity-100 transition-opacity" />

                  <div className="w-11 h-11 rounded-lg bg-slate-50 border border-slate-100 text-slate-800 flex items-center justify-center text-xl mb-4 group-hover:bg-[#FF2C6D]/10 group-hover:text-[#FF2C6D] transition-colors shrink-0">
                    {getIcon(item.icon)}
                  </div>

                  <h3 className="text-base font-bold text-slate-900 mb-2 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-slate-500 text-sm leading-[1.6] flex-1 mb-4">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Channel Ecosystem Grid ── */}
        {integrationsData.length > 0 && (
          <div className="border-t border-b border-slate-100 bg-slate-50/60 py-10">
            <div className="container-custom max-w-4xl">
              <div className="text-center max-w-xl mx-auto mb-8">
                <h2 className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-1.5 leading-[1.4]">
                  Channel Ecosystem
                </h2>
                <p className="text-xl sm:text-2xl font-black text-slate-900 leading-[1.2]">
                  Deployed Across Every Touchpoint
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                {integrationsData.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-5 bg-white border border-slate-200/80 rounded-xl hover:border-[#10B981]/40 transition-colors"
                  >
                    <h4 className="text-xs font-black text-[#10B981] uppercase tracking-widest mb-1">
                      {item.t}
                    </h4>
                    <p className="text-xs text-slate-500 leading-relaxed">{item.d}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── Compact CTA Banner ── */}
        <div className="container-custom py-10">
          <div className="bg-slate-900 rounded-2xl p-6 sm:p-8 text-center text-white relative overflow-hidden max-w-4xl mx-auto shadow-xl">
            <div className="relative z-10 max-w-xl mx-auto flex flex-col items-center gap-3">
              <p className="text-[10px] font-black tracking-widest text-[#FF2C6D] uppercase">
                {cta.badge || "24/7 Autonomous Engagement"}
              </p>
              <h2 className="text-xl sm:text-2xl font-black leading-tight text-white">
                {cta.title || "Your Business Never Sleeps. Neither Does Your AI Agent."}
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-md">
                {cta.subtitle || "Book a free AI deployment consultation. We will scope your knowledge base, integration points, and design the perfect autonomous support architecture."}
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <button
                  onClick={() => setShowModal(true)}
                  className="px-6 py-2.5 bg-[#FF2C6D] hover:bg-[#e0285f] text-white font-bold text-xs uppercase tracking-wider rounded-lg transition-colors min-h-[42px] shadow-sm"
                >
                  Schedule AI Consultation
                </button>
                <a
                  href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "8801722550012"}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-white/10 hover:bg-white/15 text-white font-bold text-xs uppercase tracking-wider rounded-lg transition-colors min-h-[42px]"
                >
                  <IoLogoWhatsapp className="text-emerald-400 text-sm" />
                  Chat on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Consultation Modal ── */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowModal(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative z-10 bg-white rounded-2xl shadow-2xl p-6 sm:p-8 max-w-md w-full border border-slate-100"
            >
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1"
                aria-label="Close"
              >
                <IoCloseOutline className="text-2xl" />
              </button>

              <div className="mb-5">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-pink-50 text-[#FF2C6D] rounded text-[10px] font-black uppercase tracking-wider mb-2">
                  <IoSparklesOutline /> AI Deployment
                </div>
                <h3 className="text-lg font-black text-slate-900">
                  Initialize AI Agent Consultation
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Connect with our conversational AI engineers. Tell us about your support channels.
                </p>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  alert("Thank you! Our AI deployment team will review your requirements and connect with you shortly.");
                  setShowModal(false);
                }}
                className="space-y-3 text-xs"
              >
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your name"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#FF2C6D] text-slate-900"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Business Email</label>
                  <input
                    type="email"
                    required
                    placeholder="name@company.com"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#FF2C6D] text-slate-900"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Target Channel</label>
                  <select className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#FF2C6D] text-slate-900">
                    <option>Website Live Chat (RAG)</option>
                    <option>WhatsApp Business API</option>
                    <option>Facebook / Instagram Messenger</option>
                    <option>Omnichannel (All Platforms)</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Support Volume & Goals</label>
                  <textarea
                    rows={3}
                    placeholder="Describe your typical monthly inquiries and key knowledge base topics..."
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#FF2C6D] text-slate-900 resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2.5 bg-[#FF2C6D] hover:bg-[#e0285f] text-white font-bold uppercase tracking-wider text-xs rounded-lg transition-colors mt-2"
                >
                  Submit Consultation Request
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
