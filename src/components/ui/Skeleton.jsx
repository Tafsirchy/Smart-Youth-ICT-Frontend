import React from 'react';

export function Skeleton({ className, ...props }) {
  return (
    <div
      className={`animate-pulse rounded-md bg-neutral-200 ${className || ''}`}
      {...props}
    />
  );
}

export function CourseCardSkeleton() {
  return (
    <div className="flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-neutral-200">
      {/* Thumbnail Skeleton */}
      <Skeleton className="aspect-video w-full rounded-none" />
      
      {/* Content Skeleton */}
      <div className="flex flex-1 flex-col p-5">
        {/* Meta Info Skeleton */}
        <div className="mb-3 flex gap-4">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-24" />
        </div>
        
        {/* Title Skeleton */}
        <div className="mb-4 space-y-2">
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-3/4" />
        </div>
        
        {/* Footer Skeleton */}
        <div className="mt-auto flex items-center justify-between border-t border-neutral-100 pt-4">
          <div className="flex items-center gap-2">
            <Skeleton className="h-8 w-8 rounded-full" />
            <Skeleton className="h-4 w-20" />
          </div>
          <Skeleton className="h-6 w-16" />
        </div>
      </div>
    </div>
  );
}

export function ProjectCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden shadow-sm flex flex-col h-full">
      <div className="p-6 flex-1 flex flex-col">
        {/* Header Badges */}
        <div className="flex justify-between items-start mb-6">
          <Skeleton className="h-6 w-24 rounded-md" />
          <Skeleton className="h-6 w-16 rounded-md" />
        </div>

        {/* Title & Company */}
        <div className="mb-4 space-y-2">
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-2 gap-3 mb-6 mt-auto border-t border-neutral-100 pt-4">
          <div className="flex items-center gap-2">
            <Skeleton className="h-5 w-5 rounded-full" />
            <Skeleton className="h-4 w-16" />
          </div>
          <div className="flex items-center gap-2">
            <Skeleton className="h-5 w-5 rounded-full" />
            <Skeleton className="h-4 w-16" />
          </div>
        </div>

        {/* Description snippet */}
        <div className="space-y-2 mb-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
        </div>
      </div>

      <div className="p-6 pt-0 mt-auto">
        <Skeleton className="h-[44px] w-full rounded-xl" />
      </div>
    </div>
  );
}

