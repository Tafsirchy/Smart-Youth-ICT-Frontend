"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { 
  IoArrowBackOutline, 
  IoHardwareChipOutline, 
  IoShieldCheckmarkOutline, 
  IoGlobeOutline,
  IoPulseOutline,
  IoSyncOutline,
  IoTerminalOutline,
  IoLockClosedOutline,
  IoCheckmarkCircleOutline,
  IoCloudDownloadOutline,
  IoFlashOutline
} from "react-icons/io5";

const infraLifecycle = [
  { step: "01", stage: "Provisioning", action: "Deploying high-performance NVMe Gen4 nodes in strategic global data centers." },
  { step: "02", stage: "Network Hardening", action: "Implementing multi-layered DDoS mitigation and AES-256 encrypted backplanes." },
  { step: "03", stage: "SSL Handshake", action: "Automatic certificate generation and enforced TLS 1.3 security protocols." },
  { step: "04", stage: "CDN Propagation", action: "Caching static assets across 200+ edge locations for sub-50ms global latency." },
  { step: "05", stage: "Daily Snapshot", action: "Delta-based automated backups with 30-day high-availability retention." },
  { step: "06", stage: "Resource Scaling", action: "Dynamic CPU/RAM allocation based on traffic vibration and load signals." }
];

const infraSpecs = [
  { group: "Hardware Tier", items: ["NVMe Gen4 Storage", "ECC DDR4 RAM", "AMD EPYC Processors", "10Gbps Uplinks"] },
  { group: "Security Tier", items: ["Hardware Firewalls", "ModSecurity WAF", "Imunify360 Shield", "Isolated Cage Hubs"] },
  { group: "Authority Tier", items: ["Anycast DNS Hub", "Cloudflare Integration", "Free SSL Gateway", "Tier-3 Data Centers"] }
];

export default function HostingDetailsPage() {
  return (
    <section className="min-h-screen bg-slate-50 text-slate-900 selection:bg-blue-600 selection:text-white pb-40">
      {/* PERSISTENT BREADCRUMB */}
      <div className="border-b border-slate-200 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container-custom py-4 flex items-center justify-between">
          <Link href="/services/hosting" className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-blue-600 transition-colors">
            <IoArrowBackOutline className="text-sm" /> Infrastructure Overview
          </Link>
          <div className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-600">CLOUD_SPEC_v9.2</div>
        </div>
      </div>

      <div className="container-custom pt-20">
        {/* TECH HEADER */}
        <div className="max-w-5xl mb-32">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-4 text-blue-600 mb-8"
          >
            <div className="w-12 h-[1px] bg-blue-600"></div>
            <span className="text-[10px] font-black uppercase tracking-[0.4em]">Infrastructure Manifest</span>
          </motion.div>
          <h1 className="text-5xl md:text-7xl font-black text-slate-900 leading-[1.1] mb-8 tracking-tighter">
            Infrastructure <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-violet-500 to-emerald-500 animate-gradient-x">Manifest</span>
          </h1>
          <p className="text-slate-600 text-xl font-light leading-relaxed max-w-2xl italic">
            "Your digital foundation should be invisible yet invincible. We treat infrastructure as a zero-trust, high-vibration engineering discipline."
          </p>
        </div>

        {/* 6-PHASE INFRA GRID */}
        <div className="mb-48">
          <div className="flex items-center gap-8 mb-20">
             <h2 className="text-3xl font-black text-slate-900 tracking-tighter uppercase leading-none">The Deployment Lifecycle</h2>
             <div className="h-[1px] flex-1 bg-slate-200"></div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-slate-200 border border-slate-200 rounded-[3rem] overflow-hidden shadow-2xl">
            {infraLifecycle.map((item, i) => (
              <div key={i} className="bg-white p-12 hover:bg-slate-50 transition-colors group">
                 <div className="text-blue-600 font-mono text-xs mb-8 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-600"></span> 
                    {item.step} // NODE_PROVISION_SYNC
                 </div>
                 <h3 className="text-xl font-black text-slate-900 mb-4 tracking-tight group-hover:text-blue-600 transition-colors uppercase">{item.stage}</h3>
                 <p className="text-slate-500 text-sm font-light leading-relaxed">{item.action}</p>
              </div>
            ))}
          </div>
        </div>

        {/* HARDWARE SPECS SECTION */}
        <div className="grid lg:grid-cols-2 gap-20 items-start mb-48">
           <div className="sticky top-32">
              <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-3xl text-blue-600 mb-10 border border-blue-100">
                <IoHardwareChipOutline />
              </div>
              <h2 className="text-5xl font-black text-slate-900 mb-8 tracking-tighter">Pure <br/> NVMe <span className="text-blue-600">Architecture.</span></h2>
              <p className="text-slate-500 text-lg font-light leading-relaxed mb-12">Every site we host sits on Gen4 NVMe storage, ensuring 50x faster read/write speeds than traditional hosting environments.</p>
              
              <div className="p-8 bg-slate-900 rounded-3xl border border-slate-800 shadow-2xl flex items-center justify-between group cursor-default">
                 <div className="flex gap-4 items-center">
                    <div className="w-12 h-12 rounded-xl bg-blue-500 flex items-center justify-center text-white shadow-lg"><IoFlashOutline className="text-2xl" /></div>
                    <div>
                       <p className="text-[10px] font-black text-white/40 uppercase tracking-widest">Hardware Audit</p>
                       <p className="text-xs font-bold text-white tracking-tight">LATENCY::SUB_10MS</p>
                    </div>
                 </div>
                 <IoSyncOutline className="text-blue-500 text-xl animate-spin-slow" />
              </div>
           </div>

           <div className="space-y-6">
              {infraSpecs.map((spec, idx) => (
                 <div key={idx} className="bg-white rounded-[2.5rem] p-10 border border-slate-200 shadow-sm hover:shadow-xl transition-all">
                    <h4 className="text-[10px] font-black text-blue-600 uppercase tracking-[0.4em] mb-8">{spec.group} Framework</h4>
                    <div className="grid grid-cols-2 gap-4">
                       {spec.items.map(item => (
                          <div key={item} className="flex items-center gap-3 text-sm font-bold text-slate-600">
                             <IoCheckmarkCircleOutline className="text-blue-600 text-lg" /> {item}
                          </div>
                       ))}
                    </div>
                 </div>
              ))}
           </div>
        </div>

        {/* SECURITY PROTOCOL SECTION */}
        <div className="bg-white rounded-[4rem] p-12 lg:p-24 border border-slate-100 shadow-2xl shadow-slate-200/50 relative overflow-hidden mb-48">
           <div className="absolute top-0 right-0 w-1/3 h-full bg-slate-50/50 border-l border-slate-100 skew-x-12 translate-x-12"></div>
           <div className="grid lg:grid-cols-2 gap-20 relative z-10">
              <div>
                 <div className="text-blue-600 mb-8 flex items-center gap-4">
                    <div className="w-12 h-[2px] bg-blue-600"></div>
                    <span className="text-[10px] font-black uppercase tracking-[0.4em]">Network Security Governance</span>
                 </div>
                 <h2 className="text-5xl font-black text-slate-900 mb-8 leading-[0.9]">Zero-Trust <br/><span className="text-blue-600">Infrastructure.</span></h2>
                 <p className="text-slate-500 text-lg font-light leading-relaxed mb-12 italic">"We implement multi-layered encryption handshakes and hardened firewalls to ensure that your digital assets remain impenetrable."</p>
                 
                 <div className="space-y-4">
                    {[
                       { i: <IoLockClosedOutline />, t: "TLS 1.3 Strict", d: "Enforcing the highest modern encryption standards for all traffic." },
                       { i: <IoShieldCheckmarkOutline />, t: "WAF Protection", d: "Deep packet inspection to neutralize SQLi and XSS threats." },
                       { i: <IoTerminalOutline />, t: "Isolated Cage", d: "Containerized hosting nodes for maximum cross-site security." }
                    ].map((feat, i) => (
                       <div key={i} className="flex gap-4 p-6 bg-slate-50 rounded-2xl border border-slate-100">
                          <div className="text-2xl text-blue-600">{feat.i}</div>
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
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="space-y-8 relative z-10">
                       <div className="flex justify-between items-center text-white/30 font-mono text-[8px] tracking-[0.4em]">
                          <span>SYS_INFRA_200</span>
                          <span>CORE_BLUEPRINT</span>
                       </div>
                       
                       <div className="space-y-4">
                          <div className="h-[1px] w-full bg-white/10"></div>
                          <div className="flex items-center gap-4">
                             <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-blue-400 font-black text-xs"><IoGlobeOutline /></div>
                             <div className="flex-1 space-y-2">
                                <div className="h-1.5 bg-white/10 rounded-full w-full"></div>
                                <div className="h-1.5 bg-white/5 rounded-full w-1/3"></div>
                             </div>
                          </div>
                       </div>

                       <div className="p-6 bg-white/5 rounded-2xl border border-white/5">
                          <p className="text-[8px] font-mono text-emerald-400 mb-2 tracking-tighter">SSL_HANDSHAKE::VERIFIED</p>
                          <p className="text-[8px] font-mono text-slate-500 leading-tight">PLATFORM: ANYCAST_CDN<br/>ENCRYPTION: AES_256<br/>STATUS: SECURE</p>
                       </div>
                    </div>

                    <div className="bg-white/5 rounded-3xl border border-white/10 p-8 relative overflow-hidden group/m hover:bg-white/10 transition-all">
                       <IoCloudDownloadOutline className="text-4xl text-blue-600/30 mb-4 group-hover/m:rotate-12 transition-transform" />
                       <p className="text-[9px] font-black text-white/50 uppercase tracking-widest mb-2">Protocol: REDUNDANCY_QA</p>
                       <p className="text-xs font-bold text-white tracking-tight">System ready for global scale.</p>
                       <div className="absolute bottom-0 left-0 w-full h-[1px] bg-blue-500/50"></div>
                    </div>
                 </div>
              </div>
           </div>
        </div>

        {/* CTA */}
        <div className="text-center py-40 border-t border-slate-200">
           <IoPulseOutline className="text-7xl text-blue-600 mb-12 mx-auto opacity-20" />
           <h3 className="text-5xl lg:text-7xl font-black text-slate-900 mb-12 leading-tight">Ready to command your <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 font-serif italic font-medium">Infrastructure Sovereignty?</span></h3>
           <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button className="w-full sm:w-[280px] px-8 py-6 bg-blue-600 text-white font-black rounded-xl hover:bg-blue-700 transition-all shadow-2xl shadow-blue-600/40 uppercase tracking-widest text-[10px] flex items-center justify-center">
                Initialize Hosting Plan
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
