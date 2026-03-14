"use client";

import React from "react";

const brands = [
  "Google",
  "Microsoft",
  "Amazon",
  "Meta",
  "Shopify",
  "Canva",
  "Upwork",
  "Fiverr",
  "Notion",
  "HubSpot",
];

function BrandCard({ name }) {
  return (
    <div className="flex min-w-[180px] shrink-0 items-center gap-4 rounded-2xl border border-emerald-100/70 bg-white/90 px-4 py-3 shadow-sm backdrop-blur-sm">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-sm font-black text-emerald-700">
        {name.slice(0, 2).toUpperCase()}
      </div>
      <p className="whitespace-nowrap text-sm font-bold tracking-wide text-slate-700">
        {name}
      </p>
    </div>
  );
}

export default function TrustedBrandsStrip() {
  const duplicated = [...brands, ...brands];

  return (
    <section className="relative w-full overflow-hidden bg-white py-12 md:py-14">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-200 to-transparent" />

      <div className="container-custom">
        <div className="mb-8 text-center md:mb-10">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-emerald-600">
            Trusted Brands
          </p>
          <h2 className="mt-3 text-2xl font-black text-slate-800 md:text-3xl">
            Brands Our Learners Work With
          </h2>
        </div>

        <div className="relative overflow-hidden rounded-3xl border border-emerald-100 bg-gradient-to-r from-emerald-50/70 via-white to-emerald-50/70 py-4">
          <div className="marquee-x flex w-max gap-3 px-3">
            {duplicated.map((brand, idx) => (
              <BrandCard key={`x-${brand}-${idx}`} name={brand} />
            ))}
          </div>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-white to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-white to-transparent" />
        </div>
      </div>

      <style jsx>{`
        .marquee-x {
          animation: marquee-x 22s linear infinite;
        }

        @keyframes marquee-x {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </section>
  );
}
