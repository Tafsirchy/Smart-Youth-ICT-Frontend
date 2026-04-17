"use client";

import { motion } from "framer-motion";

export default function ServicePageSkeleton() {
  return (
    <div className="min-h-screen bg-white overflow-hidden relative">
      <div className="container-custom py-20 relative z-10">
        {/* Hero Skeleton */}
        <div className="flex flex-col lg:flex-row items-center gap-20 mb-48">
          <div className="flex-1 space-y-8">
            <div className="h-6 w-40 bg-slate-100 rounded-full animate-pulse" />
            <div className="space-y-4">
              <div className="h-16 w-3/4 bg-slate-100 rounded-2xl animate-pulse" />
              <div className="h-16 w-1/2 bg-slate-100 rounded-2xl animate-pulse" />
            </div>
            <div className="space-y-3">
              <div className="h-4 w-full bg-slate-50 rounded animate-pulse" />
              <div className="h-4 w-5/6 bg-slate-50 rounded animate-pulse" />
              <div className="h-4 w-4/6 bg-slate-50 rounded animate-pulse" />
            </div>
            <div className="flex gap-4">
              <div className="h-14 w-48 bg-slate-100 rounded-xl animate-pulse" />
              <div className="h-14 w-48 bg-slate-50 rounded-xl animate-pulse" />
            </div>
          </div>
          <div className="flex-1 hidden lg:block">
            <div className="aspect-square bg-slate-50 rounded-[4rem] animate-pulse border border-slate-100" />
          </div>
        </div>

        {/* Bento Grid Header Skeleton */}
        <div className="mb-12 border-l-4 border-slate-100 pl-8 space-y-4">
          <div className="h-4 w-32 bg-slate-100 rounded animate-pulse" />
          <div className="h-12 w-2/3 bg-slate-100 rounded-xl animate-pulse" />
        </div>

        {/* Bento Grid Skeleton */}
        <div className="grid lg:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-[3rem] p-12 h-64 border border-slate-100 animate-pulse space-y-6">
              <div className="w-14 h-14 bg-slate-100 rounded-2xl" />
              <div className="h-8 w-3/4 bg-slate-100 rounded-lg" />
              <div className="space-y-2">
                <div className="h-3 w-full bg-slate-50 rounded" />
                <div className="h-3 w-5/6 bg-slate-50 rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
