"use client";

import Link from "next/link";
import { 
  IoLayersOutline, 
  IoCodeWorkingOutline, 
  IoRocketOutline, 
  IoStatsChartOutline
} from "react-icons/io5";

const serviceCategories = [
  {
    category: "Software Engineering",
    desc: "Bespoke digital logic for operational sovereignty.",
    icon: <IoCodeWorkingOutline />,
    services: [
      { name: "Custom Apps", path: "custom-apps", tech: "Next.js / Python" },
      { name: "ERP / CRM / POS", path: "erp-crm", tech: "Enterprise Logic" },
      { name: "E-commerce Hubs", path: "ecommerce", tech: "Secure Transaction" },
      { name: "Business Automation", path: "automation", tech: "API / Zapier" }
    ]
  },
  {
    category: "Growth & Search",
    desc: "Mathematical attention capture and conversion.",
    icon: <IoStatsChartOutline />,
    services: [
      { name: "SEO Optimization", path: "seo", tech: "Semantic Entity" },
      { name: "Facebook Ads", path: "facebook-ads", tech: "ROAS Optimization" },
      { name: "Social Creatives", path: "social-creatives", tech: "Kinetic Retention" },
      { name: "Logo & Branding", path: "branding", tech: "Visual Grammar" }
    ]
  },
  {
    category: "Infrastructure & AI",
    desc: "Autonomous intelligence and foundation guards.",
    icon: <IoLayersOutline />,
    services: [
      { name: "Chatbot Dev", path: "chatbot", tech: "Neural NLP" },
      { name: "Domain & Hosting", path: "hosting", tech: "NVMe / Uptime" },
      { name: "Maintenance", path: "maintenance", tech: "Security Audit" },
      { name: "Student Hire", path: "hire-student", tech: "Freelance Bridge" }
    ]
  }
];

export default function ServicesDirectoryClient() {
  return (
    <section className="min-h-screen bg-slate-50 text-slate-900 selection:bg-indigo-600 selection:text-white pb-8 md:pb-12">
      <div className="container-custom pt-4 sm:pt-6">
        {/* COMPACT HEADER */}
        <div className="max-w-4xl mb-5 pb-4 border-b border-slate-200 px-4 md:px-0">
          <div className="text-[11px] font-bold uppercase tracking-wider text-indigo-600 leading-[1.4] mb-1">
            Expertise Master Catalog
          </div>
          
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 leading-[1.3] mb-1.5">
            Global <span className="text-indigo-600">Expertise.</span>
          </h1>
          
          <p className="text-slate-600 text-sm sm:text-base font-normal leading-[1.6] max-w-3xl">
            We don&apos;t provide simple services; we deliver technical assets. Browse our categorized expertise hubs to initiate your organization&apos;s digital transformation.
          </p>
        </div>

        {/* BENTO GRID OF CATEGORIES */}
        <div className="grid lg:grid-cols-3 gap-3 px-4 md:px-0">
          {serviceCategories.map((cat, i) => (
            <div key={i} className="group">
              <div className="bg-white p-4 h-full border border-slate-200 shadow-sm flex flex-col justify-between hover:border-indigo-300 transition-colors border-b-4 border-b-indigo-500 rounded-lg">
                <div>
                   <div className="flex items-center gap-2.5 mb-2">
                     <div className="text-lg text-indigo-600 w-8 h-8 bg-indigo-50 flex items-center justify-center border border-indigo-100 rounded-md shrink-0">
                        {cat.icon}
                     </div>
                     <h2 className="text-base sm:text-lg font-black text-slate-900 uppercase leading-[1.3]">{cat.category}</h2>
                   </div>
                   <p className="text-slate-600 text-xs sm:text-sm font-normal leading-[1.6] mb-3">{cat.desc}</p>
                </div>

                <div className="space-y-1.5">
                   {cat.services.map((svc, idx) => (
                      <Link 
                        key={idx} 
                        href={`/services/${svc.path}`}
                        className="group/item flex items-center justify-between p-2.5 bg-slate-50 border border-slate-200 hover:bg-slate-900 hover:text-white transition-colors rounded-md"
                      >
                         <div>
                            <p className="text-sm font-bold leading-[1.4]">{svc.name}</p>
                            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500 group-hover/item:text-indigo-400 leading-[1.4]">{svc.tech}</p>
                         </div>
                         <IoRocketOutline className="text-base opacity-0 group-hover/item:opacity-100 transition-opacity shrink-0" />
                      </Link>
                   ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* TECH MANIFEST CTA */}
        <div className="mt-6 text-center border-t border-slate-200 pt-5 px-4 md:px-0">
           <h3 className="text-lg sm:text-xl font-black text-slate-900 mb-3 leading-[1.3]">Unified Infrastructure. <span className="text-indigo-600">Global Scale.</span></h3>
           <div className="flex flex-col sm:flex-row gap-2.5 justify-center">
              <Link
                href="/freelancing"
                className="w-full sm:w-[220px] min-h-[42px] px-4 py-2.5 bg-slate-900 text-white font-bold hover:bg-slate-800 transition-colors uppercase tracking-wider text-xs flex items-center justify-center text-center shadow-sm leading-[1.4] rounded-md"
              >
                Explore Talent Hub
              </Link>
              <button className="w-full sm:w-[220px] min-h-[42px] px-4 py-2.5 bg-white border border-slate-200 text-slate-900 font-bold hover:bg-slate-50 transition-colors uppercase tracking-wider text-xs flex items-center justify-center leading-[1.4] rounded-md">
                Contact Architects
              </button>
           </div>
        </div>
      </div>
    </section>
  );
}
