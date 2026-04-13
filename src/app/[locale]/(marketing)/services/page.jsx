"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { 
  IoLayersOutline, 
  IoCodeWorkingOutline, 
  IoRocketOutline, 
  IoGlobeOutline,
  IoShieldCheckmarkOutline,
  IoStatsChartOutline,
  IoConstructOutline,
  IoPeopleOutline,
  IoTerminalOutline,
  IoSearchOutline,
  IoLogoFacebook,
  IoImageOutline,
  IoInfiniteOutline,
  IoMagnetOutline,
  IoSparklesOutline
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

export default function ServicesDirectoryPage() {
  return (
    <section className="min-h-screen bg-slate-50 text-slate-900 selection:bg-indigo-600 selection:text-white pb-40">
      {/* INDUSTRIAL OVERLAY */}
      <div className="absolute top-0 opacity-10 pointer-events-none -z-10 w-full h-full">
         <div className="absolute top-0 left-1/3 w-[1px] h-full bg-slate-300"></div>
         <div className="absolute top-0 right-1/3 w-[1px] h-full bg-slate-300"></div>
      </div>

      <div className="container-custom pt-20">
        {/* HEADER */}
        <div className="max-w-4xl mb-32 px-4 md:px-0">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-4 text-indigo-600 mb-8"
          >
            <div className="w-12 h-[1px] bg-indigo-600"></div>
            <span className="text-[10px] font-black uppercase tracking-[0.4em]">Expertise Master Catalog</span>
          </motion.div>
          
          <h1 className="text-fluid-hero font-black tracking-tighter mb-12 leading-none">
            Global <br /> <span className="text-slate-400 italic">Expertise.</span>
          </h1>
          
          <p className="text-slate-600 text-xl font-light leading-relaxed max-w-2xl">
            We don't provide simple services; we deliver technical assets. Browse our categorized expertise hubs to initiate your organization's digital transformation.
          </p>
        </div>

        {/* BENTO GRID OF CATEGORIES */}
        <div className="grid lg:grid-cols-3 gap-8 px-4 md:px-0">
          {serviceCategories.map((cat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="group"
            >
              <div className="bg-white rounded-[3rem] p-10 h-full border border-slate-100 shadow-xl shadow-slate-200/50 flex flex-col justify-between hover:shadow-2xl transition-all border-b-4 border-b-indigo-500">
                <div>
                   <div className="text-3xl text-indigo-600 mb-8 w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center border border-indigo-100 group-hover:rotate-12 transition-transform">
                      {cat.icon}
                   </div>
                   <h2 className="text-3xl font-black text-slate-900 mb-4 tracking-tight uppercase leading-none">{cat.category}</h2>
                   <p className="text-slate-500 text-sm font-light leading-relaxed mb-12">{cat.desc}</p>
                </div>

                <div className="space-y-3">
                   {cat.services.map((svc, idx) => (
                      <Link 
                        key={idx} 
                        href={`/services/${svc.path}`}
                        className="group/item flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:bg-slate-900 hover:text-white transition-all"
                      >
                         <div>
                            <p className="text-sm font-bold tracking-tight">{svc.name}</p>
                            <p className="text-[8px] font-black uppercase tracking-widest text-slate-400 group-hover/item:text-indigo-400">{svc.tech}</p>
                         </div>
                         <IoRocketOutline className="text-xl opacity-0 group-hover/item:opacity-100 transition-opacity" />
                      </Link>
                   ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* TECH MANIFEST CTA */}
        <div className="mt-48 text-center border-t border-slate-200 pt-20">
           <IoInfiniteOutline className="text-7xl text-indigo-600 mb-12 mx-auto opacity-20" />
           <h3 className="text-4xl lg:text-6xl font-black text-slate-900 mb-12 tracking-tighter">Unified Infrastructure. <br/><span className="text-indigo-600 italic font-serif font-light">Global Scale.</span></h3>
           <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link
                href="/freelancing"
                className="w-full sm:w-[280px] px-8 py-6 bg-slate-900 text-white font-black rounded-xl hover:bg-slate-800 transition-all uppercase tracking-widest text-[10px] flex items-center justify-center text-center shadow-2xl"
              >
                Explore Talent Hub
              </Link>
              <button className="w-full sm:w-[280px] px-8 py-6 bg-white border border-slate-200 text-slate-900 font-black rounded-xl hover:bg-slate-50 transition-all uppercase tracking-widest text-[10px] flex items-center justify-center">
                Contact Architects
              </button>
           </div>
        </div>
      </div>
    </section>
  );
}
