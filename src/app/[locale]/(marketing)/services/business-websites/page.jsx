"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  IoBusinessOutline,
  IoFlashOutline,
  IoAnalyticsOutline,
  IoShieldCheckmarkOutline,
  IoCheckmarkCircleOutline,
  IoRocketOutline,
  IoBriefcaseOutline,
  IoCubeOutline,
  IoStatsChartOutline,
  IoGlobeOutline,
  IoGitNetworkOutline,
} from "react-icons/io5";

const verticalArchitecture = [
  {
    title: "Startup & SaaS",
    desc: "Built for speed and conversion. We engineer aggressive growth funnels designed to turn traffic into trial users instantly.",
    icon: <IoRocketOutline />,
    color: "from-blue-500 to-blue-600",
    border: "border-blue-100",
  },
  {
    title: "Enterprise Corporate",
    desc: "Stability and brand authority. High-security, multi-lingual architectures designed for investor relations and global presence.",
    icon: <IoBusinessOutline />,
    color: "from-slate-700 to-slate-800",
    border: "border-slate-100",
  },
  {
    title: "Professional Agency",
    desc: "Service-centric storytelling. We build elegant lead-generation hubs designed to showcase expertise and qualify high-value clients.",
    icon: <IoBriefcaseOutline />,
    color: "from-cyan-500 to-blue-500",
    border: "border-cyan-100",
  },
];

const ecosystemIntegration = [
  {
    t: "CRM Sync",
    d: "HubSpot, Salesforce, Zoho integration.",
    icon: <IoGitNetworkOutline />,
  },
  {
    t: "Payment Gateways",
    d: "Stripe, SSLCommerz, PayPal native.",
    icon: <IoGlobeOutline />,
  },
  {
    t: "Marketing Automations",
    d: "Mailchimp, Resend, Meta Pixel.",
    icon: <IoAnalyticsOutline />,
  },
  {
    t: "Uptime Shield",
    d: "24/7 Monitoring & DDoS protection.",
    icon: <IoShieldCheckmarkOutline />,
  },
];

export default function BusinessWebsitesPage() {
  return (
    <section className="min-h-screen bg-slate-50 text-slate-900 selection:bg-blue-600 overflow-hidden relative">
      {/* INDUSTRIAL DECORATION */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none -z-10 opacity-40">
        <div className="absolute top-0 left-1/4 w-[1px] h-full bg-slate-200 hidden lg:block"></div>
        <div className="absolute top-0 right-1/4 w-[1px] h-full bg-slate-200 hidden lg:block"></div>
        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-slate-200"></div>
        <div className="absolute top-0 right-[-100px] w-[600px] h-[600px] bg-blue-100 rounded-full blur-[160px]"></div>
      </div>

      <div className="container-custom py-20 relative">
        {/* INDUSTRIAL HERO SECTION */}
        <div className="flex flex-col lg:flex-row items-center gap-20 mb-48 pt-10">
          <div className="flex-1 text-left">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-lg bg-blue-50 border border-blue-100 text-blue-600 text-[10px] font-black tracking-[0.4em] uppercase mb-10"
            >
              <IoCubeOutline className="text-sm" /> Architecture for Scale
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "circOut" }}
              className="text-5xl md:text-7xl font-black text-slate-900 leading-[1.1] mb-8 tracking-tighter"
            >
              Business <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-500 to-cyan-500 animate-gradient-x">Websites</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-slate-500 text-xl md:text-3xl font-light leading-relaxed max-w-2xl mb-12"
            >
              We don't just build websites; we engineer{" "}
              <span className="text-slate-900 font-bold underline decoration-blue-500 decoration-2 underline-offset-8">
                conversion assets
              </span>{" "}
              that amplify your brand’s authority and operational efficiency
              globally.
            </motion.p>

            <div className="flex flex-col sm:flex-row gap-6">
              <button className="w-full sm:w-[280px] px-8 py-6 bg-blue-600 text-white font-black rounded-xl hover:bg-blue-700 transition-all shadow-2xl shadow-blue-600/20 uppercase tracking-widest text-[10px] flex items-center justify-center">
                Initialize Project
              </button>
              <Link
                href="/services/business-websites/details"
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
                  src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1000&h=800&fit=crop"
                  className="w-full h-full object-cover rounded-[2.5rem] opacity-80 grayscale hover:grayscale-0 transition-all duration-1000"
                  alt="Business Analytics"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent flex flex-col justify-end p-12">
                  <p className="text-blue-500 font-black text-2xl tracking-tighter uppercase">
                    Operational Excellence.
                  </p>
                  <p className="text-slate-400 font-light">
                    Engineered by SYICT Architects.
                  </p>
                </div>
              </div>

              {/* Floating Metric Card */}
              <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -right-10 top-20 bg-white p-8 rounded-3xl border border-blue-500/30 shadow-2xl"
              >
                <IoStatsChartOutline className="text-blue-500 text-3xl mb-4" />
                <p className="text-4xl font-black text-slate-900">+118%</p>
                <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest">
                  Lead Gen Lift
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* CONTRAST: LEGACY VS ENGINE */}
        <div className="mb-48 relative">
          <div className="grid lg:grid-cols-2 gap-1 px-8 lg:px-0 bg-white border border-slate-200 rounded-[4rem] overflow-hidden shadow-xl shadow-slate-200/50">
            <div className="p-16 border-r border-slate-100 group cursor-default">
              <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-10">
                The Legacy Site
              </h4>
              <div className="space-y-8 opacity-40 group-hover:opacity-100 transition-opacity">
                <p className="text-3xl font-bold text-slate-600 leading-tight">
                  Fragmented visual identity and slow infrastructure.
                </p>
                <div className="h-2 w-full bg-slate-100 rounded-full"></div>
                <p className="text-sm font-light text-slate-500">
                  Average Load Time: 4.8s
                </p>
                <p className="text-sm font-light text-slate-400 tracking-widest">
                  CONVERSION: 0.8%
                </p>
              </div>
            </div>
            <div className="p-16 bg-blue-50/30 relative overflow-hidden group cursor-default">
              <div className="absolute top-0 right-0 p-12 text-blue-500 opacity-5 text-9xl font-black uppercase tracking-widest select-none">
                ENGINE
              </div>
              <h4 className="text-[10px] font-black text-blue-500 uppercase tracking-widest mb-10">
                The SYICT Engine
              </h4>
              <div className="space-y-8 relative z-10">
                <p className="text-3xl font-black text-slate-900 leading-tight">
                  Cohesive architecture designed for conversion and speed.
                </p>
                <div className="h-2 w-full bg-slate-100 rounded-full relative overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "100%" }}
                    transition={{ duration: 2 }}
                    className="absolute h-full bg-blue-400 shadow-[0_0_20px_rgba(96,165,250,0.3)]"
                  />
                </div>
                <p className="text-sm font-bold text-blue-500 uppercase tracking-widest">
                  Average Load Time: 0.4s (Edge)
                </p>
                <p className="text-sm font-black text-slate-900 tracking-[0.4em] uppercase">
                  CONVERSION: 4.2%
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* BUSINESS SECTOR ARCHITECTURE */}
        <div className="mb-48">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8 border-l-4 border-blue-600 pl-8">
            <div className="max-w-xl">
              <h2 className="text-[10px] font-black text-blue-500 uppercase tracking-[0.4em] mb-4">
                Vertical Specializations
              </h2>
              <p className="text-4xl md:text-6xl font-black text-slate-900 leading-tight">
                Architecture built for your{" "}
                <span className="text-slate-400 italic font-serif font-light">
                  Specific Industry.
                </span>
              </p>
            </div>
            <p className="text-slate-500 max-w-xs font-light text-lg">
              We create custom blueprints for different business cycles and
              maturity stages.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {verticalArchitecture.map((item, i) => (
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
                    className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.color} text-white flex items-center justify-center text-3xl mb-10 shadow-lg shadow-blue-500/20`}
                  >
                    {item.icon}
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 mb-4">
                    {item.title}
                  </h3>
                  <p className="text-slate-500 leading-relaxed font-light mb-8 text-lg">
                    {item.desc}
                  </p>
                  <div className="flex items-center gap-3 text-[10px] font-black text-blue-500 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                    Blueprint Details <IoGlobeOutline className="text-lg" />
                  </div>
                  <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-blue-500/20 to-transparent"></div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ECOSYSTEM INTEGRATIONS (Bento Box) */}
        <div className="bg-white rounded-[4rem] p-8 lg:p-20 border border-slate-100 mb-48 overflow-hidden relative shadow-2xl shadow-slate-200/50">
          <div className="grid lg:grid-cols-3 gap-12 relative z-10">
            <div className="lg:col-span-1">
              <h2 className="text-4xl font-black text-slate-900 mb-6">
                A Unified <br />
                <span className="text-blue-500">Ecosystem.</span>
              </h2>
              <p className="text-slate-500 font-light leading-relaxed text-lg mb-8">
                We don't build in isolation. Our engines integrate natively with
                the world’s leading business tools.
              </p>
              <div className="flex items-center gap-4 text-sm font-black text-slate-200 uppercase tracking-widest">
                <span className="w-12 h-[1px] bg-slate-100"></span> API First
                Architecture
              </div>
            </div>

            <div className="lg:col-span-2 grid sm:grid-cols-2 gap-6">
              {ecosystemIntegration.map((item, idx) => (
                <div
                  key={idx}
                  className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 hover:border-blue-500/20 transition-all flex items-start gap-6"
                >
                  <div className="text-3xl text-blue-500 shrink-0 mt-1">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 mb-2">{item.t}</h4>
                    <p className="text-sm text-slate-500 font-light leading-relaxed">
                      {item.d}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div
            className="absolute inset-0 opacity-5 pointer-events-none"
            style={{
              backgroundImage:
                "radial-gradient(circle, #3b82f6 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          ></div>
        </div>

        {/* CORPORATE SERVICE TIERS */}
        <div className="mb-48 text-center pt-20 border-t border-slate-100">
          <div className="max-w-2xl mx-auto mb-20 text-center">
            <h2 className="text-[10px] font-black text-blue-500 uppercase tracking-[0.4em] mb-4">
              Pricing Architecture
            </h2>
            <p className="text-4xl md:text-6xl font-black text-slate-900 leading-tight">
              Select your{" "}
              <span className="text-slate-400">investment tier.</span>
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto text-left">
            {[
              {
                t: "Standard Business",
                p: "$1499",
                list: [
                  "SME Focused Strategy",
                  "100ms Edge Load",
                  "Mobile Responsive Architecture",
                  "Core SEO Pack",
                  "24/7 Security Shield",
                ],
                color: "slate",
              },
              {
                t: "Growth Pro",
                p: "$3499",
                list: [
                  "CRM Flow Integration",
                  "A/B Conversion Testing",
                  "Multi-Language Support",
                  "Advanced ROI Dashboard",
                  "Dedicated Architect Access",
                ],
                color: "blue",
                highlight: true,
              },
              {
                t: "Enterprise Suite",
                p: "Custom",
                list: [
                  "Custom API Integrations",
                  "Multi-Vendor Marketplaces",
                  "Whitelabel Design Flow",
                  "Dedicated SLA Support",
                  "Legacy Data Migration",
                ],
                color: "indigo",
              },
            ].map((tier, idx) => (
              <div
                key={idx}
                className={`bg-white rounded-[3.5rem] p-12 border ${tier.highlight ? "border-blue-500 ring-4 ring-blue-500/5 -translate-y-4 shadow-2xl shadow-blue-500/10" : "border-slate-100 shadow-sm shadow-slate-200/50"} flex flex-col h-full relative transition-all group`}
              >
                {tier.highlight && (
                  <div className="absolute top-0 right-0 bg-blue-500 text-white text-[10px] font-black uppercase tracking-widest px-8 py-2 rounded-bl-3xl">
                    Peak ROI
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
                      <IoCheckmarkCircleOutline className="text-blue-500 text-lg shrink-0" />{" "}
                      {item}
                    </div>
                  ))}
                </div>

                <button
                  className={`w-full py-5 rounded-2xl font-black uppercase tracking-widest text-[10px] transition-all shadow-lg ${tier.highlight ? "bg-blue-600 text-white shadow-blue-600/30" : "bg-white border border-slate-200 text-slate-900 hover:bg-slate-50"}`}
                >
                  Initialize {tier.t}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* FINAL INDUSTRIAL CTA */}
        <div className="text-center py-40 bg-white rounded-[5rem] border border-slate-100 relative overflow-hidden group shadow-2xl shadow-slate-200/50">
          <div className="absolute inset-0 bg-blue-50 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="max-w-4xl mx-auto px-6 relative z-10"
          >
            <IoBusinessOutline className="text-7xl text-blue-500 mb-10 mx-auto opacity-20" />
            <h3 className="text-5xl lg:text-7xl font-black text-slate-900 mb-12 leading-tight">
              Ready to activate your <br />
              <span className="text-blue-500 font-serif italic font-medium">
                Online Engine?
              </span>
            </h3>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button className="px-12 py-6 bg-blue-600 text-white font-black rounded-xl hover:bg-blue-700 transition-all shadow-2xl shadow-blue-600/40 uppercase tracking-widest text-xs">
                Start Business Brief
              </button>
              <Link
                href="/services/business-websites/details"
                className="px-12 py-6 bg-white border border-slate-200 text-slate-900 font-black rounded-xl hover:bg-slate-50 transition-all uppercase tracking-widest text-xs flex items-center justify-center"
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
