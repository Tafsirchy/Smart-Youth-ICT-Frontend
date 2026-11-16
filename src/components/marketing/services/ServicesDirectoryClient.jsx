"use client";

import Link from "next/link";
import { 
  IoLayersOutline, 
  IoCodeWorkingOutline, 
  IoRocketOutline, 
  IoStatsChartOutline,
  IoBusinessOutline,
  IoSchoolOutline
} from "react-icons/io5";

const serviceCategories = [
  {
    category: "ERP & Enterprise Software",
    desc: "13+ ready-to-deploy enterprise software systems for rapid digital sovereignty.",
    icon: <IoBusinessOutline />,
    services: [
      { name: "13 Ready ERP Solutions", path: "erp-software", tech: "Complete Suite" },
      { name: "POS & Billing System", path: "erp-software?type=pos", tech: "Barcode / Thermal" },
      { name: "HR-Payroll & Accounts", path: "erp-software?type=hr-payroll", tech: "Biometric / Ledger" },
      { name: "Hospital & Diagnostic ERP", path: "erp-software?type=hospital", tech: "OPD / IPD / Lab" },
      { name: "NGO & Loan Management", path: "erp-software?type=ngo", tech: "Microcredit" }
    ]
  },
  {
    category: "Software & Web Engineering",
    desc: "Bespoke digital architecture, APIs, and modern frontend platforms.",
    icon: <IoCodeWorkingOutline />,
    services: [
      { name: "Programming Languages", path: "programming-languages", tech: "Complete Stack" },
      { name: "Business Platforms", path: "business-websites", tech: "Next.js / SSR" },
      { name: "E-commerce Hubs", path: "ecommerce", tech: "Secure Multi-Gateway" },
      { name: "Custom Web Applications", path: "custom-apps", tech: "Node / Python / React" },
      { name: "Enterprise Logic & CRM", path: "erp-crm", tech: "Multi-Tenant" }
    ]
  },
  {
    category: "AI, Cloud & Managed IT",
    desc: "Autonomous intelligence, secure cloud infrastructure, and 24/7 IT guards.",
    icon: <IoLayersOutline />,
    services: [
      { name: "Chatbot Development", path: "chatbot", tech: "Neural LLM / NLP" },
      { name: "Business Automation", path: "automation", tech: "API / Workflow" },
      { name: "Domain & High-Speed Hosting", path: "hosting", tech: "NVMe / 99.9% SLA" },
      { name: "Cybersecurity & Pentesting", path: "maintenance", tech: "Zero-Trust Audit" },
      { name: "Student Talent & Freelance", path: "hire-student", tech: "Production Vetted" }
    ]
  },
  {
    category: "Design & Growth Systems",
    desc: "Data-driven user acquisition, visual brand systems, and search dominance.",
    icon: <IoStatsChartOutline />,
    services: [
      { name: "Brand Identity & Logo", path: "branding", tech: "Visual Grammar" },
      { name: "UI/UX Architecture", path: "ui-ux", tech: "Figma / Design Tokens" },
      { name: "Social Media Creatives", path: "social-creatives", tech: "Kinetic Content" },
      { name: "Performance Ads", path: "facebook-ads", tech: "ROAS Optimization" },
      { name: "SEO Optimization", path: "seo", tech: "Semantic Entity" }
    ]
  },
  {
    category: "Industrial Academy & Tracks",
    desc: "Real-world engineering apprenticeships, live projects, and career placement.",
    icon: <IoSchoolOutline />,
    services: [
      { name: "Skill Development Tracks", path: "skill-development", tech: "Project-Based" },
      { name: "Career Specializations", path: "career-tracks", tech: "Web / AI / Cloud" },
      { name: "Global Certifications", path: "certifications", tech: "Verified QR" },
      { name: "Industrial Freelance Prep", path: "freelancing", tech: "Marketplace Prep" },
      { name: "Direct Job Placement", path: "job-placement", tech: "Corporate Network" }
    ]
  }
];

export default function ServicesDirectoryClient() {
  return (
    <section className="min-h-screen bg-slate-50 text-slate-900 selection:bg-brand-pink selection:text-white pb-12">
      <div className="container-custom pt-8">
        {/* COMPACT HEADER */}
        <div className="max-w-4xl mb-8 pb-6 border-b border-slate-200 px-4 md:px-0">
          <div className="text-[11px] font-black uppercase tracking-widest text-emerald-600 leading-[1.4] mb-2">
            Multi-Purpose IT Solutions &amp; Industrial Academy
          </div>
          
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-slate-900 leading-[1.15] mb-3 tracking-tight">
            Complete Digital Assets. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-pink via-rose-500 to-amber-500">
              Engineered for Enterprise Scale.
            </span>
          </h1>
          
          <p className="text-slate-600 text-sm sm:text-base font-normal leading-relaxed max-w-3xl">
            Smart Youth ICT delivers end-to-end IT services: from 13+ deployable ERP and software systems to custom full-stack web engineering, managed cloud infrastructure, and industrial training apprenticeships.
          </p>
        </div>

        {/* BENTO GRID OF CATEGORIES */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 md:px-0">
          {serviceCategories.map((cat, i) => (
            <div key={i} className="group">
              <div className="bg-white p-6 h-full border border-slate-200 shadow-sm flex flex-col justify-between hover:border-emerald-400 hover:shadow-md transition-all border-b-4 border-b-emerald-500 rounded-xl">
                <div>
                   <div className="flex items-center gap-3 mb-3">
                     <div className="text-xl text-emerald-600 w-10 h-10 bg-emerald-50 flex items-center justify-center border border-emerald-100 rounded-lg shrink-0">
                        {cat.icon}
                     </div>
                     <h2 className="text-base sm:text-lg font-black text-slate-900 leading-tight">{cat.category}</h2>
                   </div>
                   <p className="text-slate-600 text-xs sm:text-sm font-normal leading-relaxed mb-5">{cat.desc}</p>
                </div>

                <div className="space-y-2">
                   {cat.services.map((svc, idx) => (
                      <Link 
                        key={idx} 
                        href={`/services/${svc.path}`}
                        className="group/item flex items-center justify-between p-3 bg-slate-50 border border-slate-200/80 hover:bg-slate-900 hover:text-white transition-colors rounded-lg"
                      >
                         <div>
                            <p className="text-xs sm:text-sm font-bold leading-tight">{svc.name}</p>
                            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 group-hover/item:text-emerald-400 leading-tight mt-0.5">{svc.tech}</p>
                         </div>
                         <IoRocketOutline className="text-base opacity-0 group-hover/item:opacity-100 transition-opacity shrink-0 text-emerald-400" />
                      </Link>
                   ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* TECH MANIFEST CTA */}
        <div className="mt-12 text-center border-t border-slate-200 pt-8 px-4 md:px-0">
           <h3 className="text-xl sm:text-2xl font-black text-slate-900 mb-2 leading-tight">Unified Multi-Purpose IT Solutions. <span className="text-emerald-600">Global Scale.</span></h3>
           <p className="text-slate-500 text-sm max-w-xl mx-auto mb-6">Consult directly with our engineering architects to map your organizational workflows into customized digital platforms.</p>
           <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/services/erp-software"
                className="w-full sm:w-auto px-6 py-3 bg-slate-900 text-white font-bold hover:bg-brand-pink transition-colors text-xs flex items-center justify-center text-center shadow-sm rounded-lg"
              >
                Explore 13 Ready ERP Softwares →
              </Link>
              <Link
                href="/services/programming-languages"
                className="w-full sm:w-auto px-6 py-3 bg-white border border-slate-300 text-slate-900 font-bold hover:bg-slate-100 transition-colors text-xs flex items-center justify-center rounded-lg"
              >
                Inspect Tech Stack &amp; Languages
              </Link>
              <Link
                href="/contact"
                className="w-full sm:w-auto px-6 py-3 bg-emerald-600 text-white font-bold hover:bg-emerald-500 transition-colors text-xs flex items-center justify-center rounded-lg"
              >
                Consult Solutions Architects
              </Link>
           </div>
        </div>
      </div>
    </section>
  );
}
