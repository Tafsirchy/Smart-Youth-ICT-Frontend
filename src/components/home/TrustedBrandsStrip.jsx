"use client";

import React, { useState, useEffect } from "react";
import api from "@/lib/api";
import {
  SiGoogle,
  SiMeta,
  SiShopify,
  SiCanva,
  SiUpwork,
  SiFiverr,
  SiNotion,
  SiHubspot,
  SiApple,
  SiNetflix,
  SiSpotify,
  SiGithub,
  SiSlack,
} from "react-icons/si";
import { FaMicrosoft, FaAmazon, FaLinkedin } from "react-icons/fa6";
import { BiLogoAdobe } from "react-icons/bi";

// Resilient default brands with verified icons and categories
const DEFAULT_BRANDS = [
  { _id: "b-1", name: "Google", icon: "google", category: "Tech Giant" },
  { _id: "b-2", name: "Microsoft", icon: "microsoft", category: "Tech Giant" },
  { _id: "b-3", name: "Amazon", icon: "amazon", category: "Cloud & E-Commerce" },
  { _id: "b-4", name: "Meta", icon: "meta", category: "Social & AI Tech" },
  { _id: "b-5", name: "Shopify", icon: "shopify", category: "E-Commerce" },
  { _id: "b-6", name: "Canva", icon: "canva", category: "Creative & Design" },
  { _id: "b-7", name: "Upwork", icon: "upwork", category: "Global Freelance" },
  { _id: "b-8", name: "Fiverr", icon: "fiverr", category: "Global Freelance" },
  { _id: "b-9", name: "Notion", icon: "notion", category: "Productivity SaaS" },
  { _id: "b-10", name: "HubSpot", icon: "hubspot", category: "CRM & Marketing" },
];

/**
 * Resolves an authentic vector icon or uploaded image logo for any brand
 */
function getBrandIcon(brand) {
  if (brand.logo) {
    return (
      <img
        src={brand.logo}
        alt={brand.name}
        className="w-6 h-6 sm:w-7 sm:h-7 object-contain rounded"
      />
    );
  }

  const key = (brand.icon || brand.name || "").toLowerCase().trim();
  switch (key) {
    case "google":
      return <SiGoogle className="text-[#4285F4]" size={20} />;
    case "microsoft":
      return <FaMicrosoft className="text-[#00A4EF]" size={19} />;
    case "amazon":
      return <FaAmazon className="text-[#FF9900]" size={20} />;
    case "meta":
    case "facebook":
      return <SiMeta className="text-[#0668E1]" size={20} />;
    case "shopify":
      return <SiShopify className="text-[#96BF48]" size={20} />;
    case "canva":
      return <SiCanva className="text-[#00C4CC]" size={20} />;
    case "upwork":
      return <SiUpwork className="text-[#14A800]" size={20} />;
    case "fiverr":
      return <SiFiverr className="text-[#1DBF73]" size={20} />;
    case "notion":
      return <SiNotion className="text-[#000000]" size={19} />;
    case "hubspot":
      return <SiHubspot className="text-[#FF7A59]" size={20} />;
    case "apple":
      return <SiApple className="text-slate-800" size={20} />;
    case "netflix":
      return <SiNetflix className="text-[#E50914]" size={20} />;
    case "spotify":
      return <SiSpotify className="text-[#1DB954]" size={20} />;
    case "adobe":
      return <BiLogoAdobe className="text-[#FF0000]" size={20} />;
    case "github":
      return <SiGithub className="text-slate-900" size={20} />;
    case "slack":
      return <SiSlack className="text-[#4A154B]" size={20} />;
    case "linkedin":
      return <FaLinkedin className="text-[#0A66C2]" size={20} />;
    default:
      return (
        <span className="font-mono text-xs font-black text-emerald-700">
          {(brand.name || "BR").slice(0, 2).toUpperCase()}
        </span>
      );
  }
}

function BrandCard({ brand }) {
  return (
    <div className="flex min-w-[190px] sm:min-w-[210px] shrink-0 items-center gap-3.5 border border-emerald-100/90 bg-white/95 px-4 py-3 shadow-xs hover:shadow-md hover:border-emerald-300 hover:scale-[1.03] transition-all duration-300 rounded-xl group/brand cursor-default select-none">
      {/* Icon or Logo Avatar */}
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-50 border border-slate-100 group-hover/brand:bg-white group-hover/brand:border-emerald-200 transition-colors shadow-2xs">
        {getBrandIcon(brand)}
      </div>

      {/* Brand Identity */}
      <div className="flex flex-col text-left overflow-hidden">
        <p className="whitespace-nowrap text-sm font-black tracking-tight text-slate-800 group-hover/brand:text-emerald-700 transition-colors">
          {brand.name}
        </p>
        <span className="text-[10px] font-bold text-slate-400 tracking-wide uppercase truncate">
          {brand.category || "Global Enterprise"}
        </span>
      </div>
    </div>
  );
}

export default function TrustedBrandsStrip() {
  const [brands, setBrands] = useState(DEFAULT_BRANDS);

  // Fetch live brands dynamically from CMS
  useEffect(() => {
    let isMounted = true;
    api
      .get("/cms/home-brands")
      .then((res) => {
        if (isMounted && res.data?.data && res.data.data.length > 0) {
          setBrands(res.data.data);
        }
      })
      .catch(() => {
        // Fallback silently kept
      });
    return () => {
      isMounted = false;
    };
  }, []);

  const list = brands && brands.length > 0 ? brands : DEFAULT_BRANDS;
  // Repeat list for smooth mathematically seamless marquee
  const duplicated = [...list, ...list, ...list];

  return (
    <section className="relative w-full overflow-hidden bg-white py-10 sm:py-12 md:py-14 border-b border-slate-200/80 font-sans">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-200 to-transparent" />

      <div className="container-custom px-4 sm:px-6 md:px-12">
        {/* Section Header (Standardized Title Matching Homepage) */}
        <div className="mb-6 text-center sm:mb-8">
          <p className="text-[10px] sm:text-xs font-black uppercase tracking-[0.22em] text-emerald-600 mb-2">
            Trusted Brands &amp; Global Networks
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-800 leading-[1.15] mb-4 tracking-tight">
            Brands Our <br className="sm:hidden" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600">
              Learners Work With
            </span>
          </h2>
        </div>

        {/* Marquee Wrapper with Continuous Scrolling and Edge Gradients */}
        <div className="relative overflow-hidden border border-emerald-100 bg-gradient-to-r from-emerald-50/60 via-white to-emerald-50/60 py-4 rounded-2xl">
          <div className="marquee-x flex w-max gap-3.5 px-3 motion-gpu">
            {duplicated.map((brand, idx) => (
              <BrandCard
                key={`brand-${brand._id || brand.name}-${idx}`}
                brand={brand}
              />
            ))}
          </div>

          {/* Smooth edge masks */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-12 sm:w-20 bg-gradient-to-r from-white via-white/80 to-transparent z-10" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-12 sm:w-20 bg-gradient-to-l from-white via-white/80 to-transparent z-10" />
        </div>
      </div>

      <style jsx>{`
        .marquee-x {
          animation: marquee-x 35s linear infinite;
          will-change: transform;
        }

        @keyframes marquee-x {
          0% {
            transform: translate3d(0%, 0, 0);
          }
          100% {
            transform: translate3d(-33.333%, 0, 0);
          }
        }
      `}</style>
    </section>
  );
}
