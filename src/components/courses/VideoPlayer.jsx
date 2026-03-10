import React from 'react';
import Image from 'next/image';

export default function VideoPlayer({ url, thumbnail }) {
  return (
    <div className="relative flex aspect-video w-full items-center justify-center overflow-hidden rounded-2xl bg-neutral-900 shadow-xl ring-1 ring-neutral-800">
      {/* Background preview img if available */}
      {thumbnail && (
        <div className="absolute inset-0 z-0 opacity-30 mix-blend-luminosity">
          <Image src={thumbnail} alt="Video Thumbnail" fill className="object-cover" />
        </div>
      )}
      
      {/* Coming Soon Overlay */}
      <div className="z-10 flex flex-col items-center justify-center gap-4 text-center text-white px-6">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/10 p-4 ring-1 ring-white/20 backdrop-blur-md">
           <svg className="h-8 w-8 text-blue-400 drop-shadow-lg" fill="currentColor" viewBox="0 0 20 20">
             <path d="M4 4l12 6-12 6V4z" />
           </svg>
        </div>
        <div>
          <h3 className="mb-2 text-2xl font-bold tracking-tight sm:text-3xl">High-Quality Video Lessons</h3>
          <p className="inline-block rounded-full bg-blue-600/20 px-4 py-1.5 text-sm font-bold uppercase tracking-widest text-blue-300 ring-1 ring-blue-500/30">
            Coming Soon
          </p>
        </div>
      </div>
    </div>
  );
}
