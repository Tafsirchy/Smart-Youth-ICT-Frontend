import React from 'react';

export default function ServiceDetailLoading() {
  return (
    <div className="min-h-screen bg-slate-50 overflow-hidden animate-pulse">
      {/* Skeleton Hero Section */}
      <div className="container-custom py-20 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-20 mb-48 px-4 md:px-0">
          <div className="flex-1 text-left space-y-8">
            {/* Badge Skeleton */}
            <div className="w-32 h-6 bg-slate-200 rounded-full" />
            
            {/* Title Skeleton */}
            <div className="space-y-4">
              <div className="w-full h-16 bg-slate-200 rounded-2xl" />
              <div className="w-3/4 h-16 bg-slate-200 rounded-2xl" />
            </div>
            
            {/* Description Skeleton */}
            <div className="space-y-3">
              <div className="w-full h-4 bg-slate-200 rounded-full" />
              <div className="w-full h-4 bg-slate-200 rounded-full" />
              <div className="w-2/3 h-4 bg-slate-200 rounded-full" />
            </div>
            
            {/* Buttons Skeleton */}
            <div className="flex flex-col sm:flex-row gap-6">
              <div className="w-full sm:w-64 h-16 bg-slate-200 rounded-xl" />
              <div className="w-full sm:w-64 h-16 bg-slate-200 rounded-xl" />
            </div>
          </div>
          
          {/* Visual Skeleton (Desktop) */}
          <div className="flex-1 hidden lg:block">
            <div className="w-full aspect-square bg-white rounded-[4rem] border border-slate-100 shadow-xl p-12 flex flex-col items-center justify-center space-y-8">
               <div className="w-32 h-32 bg-slate-100 rounded-3xl" />
               <div className="w-full h-4 bg-slate-100 rounded-full" />
               <div className="w-2/3 h-4 bg-slate-100 rounded-full" />
            </div>
          </div>
        </div>
        
        {/* Pillars Skeleton */}
        <div className="grid lg:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-64 bg-white rounded-[3rem] border border-slate-100 p-10 space-y-6">
              <div className="w-14 h-14 bg-slate-100 rounded-2xl" />
              <div className="w-1/2 h-6 bg-slate-100 rounded-lg" />
              <div className="space-y-2">
                <div className="w-full h-3 bg-slate-50 rounded-full" />
                <div className="w-3/4 h-3 bg-slate-50 rounded-full" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Industrial Decoration Skeletons */}
      <div className="absolute top-0 w-full h-full pointer-events-none -z-10 opacity-5">
         <div className="absolute top-0 left-1/4 w-[1px] h-full bg-slate-200"></div>
         <div className="absolute top-0 right-1/4 w-[1px] h-full bg-slate-200"></div>
         <div className="absolute top-1/2 left-0 w-full h-[1px] bg-slate-200"></div>
      </div>
    </div>
  );
}
