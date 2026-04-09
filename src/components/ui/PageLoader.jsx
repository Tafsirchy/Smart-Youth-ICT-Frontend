"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function PageLoader() {
  const pathname = usePathname();

  // Helper to check if we are on the home page (accounting for locales)
  const isHomePage = (path) => {
    if (!path) return false;
    const cleanPath = path.replace(/^\/[a-z]{2}(-[A-Z]{2})?(?=\/|$)/, "") || "/";
    return cleanPath === "/";
  };

  const [visible, setVisible] = useState(() => isHomePage(pathname));
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // 1. Check if we are on the Home page
    const shouldShowLoader = isHomePage(pathname);
    
    // 2. Check if we have already shown the splash screen this session
    // We use sessionStorage so it plays once per browser tab session
    const hasSeenSplash = sessionStorage.getItem("syict_splash_seen");

    // If it's not the homepage, OR they already saw it -> INSTANT LOAD (do not show)
    if (!shouldShowLoader || hasSeenSplash) {
      setVisible(false);
      setFadeOut(false);
      return;
    }

    // Otherwise, play the animation!
    setVisible(true);
    setFadeOut(false);

    const fadeTimer = setTimeout(() => {
      setFadeOut(true);
      // Mark as seen so they don't see it again if they route back
      sessionStorage.setItem("syict_splash_seen", "true"); 
    }, 1600);
    
    const hideTimer = setTimeout(() => {
      setVisible(false);
    }, 2200);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, [pathname]);

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white transition-opacity duration-500 ${
        fadeOut ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* Decorative blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-pink-100/60 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[45vw] h-[45vw] rounded-full bg-green-100/50 blur-[100px] pointer-events-none" />

      {/* Logo + animated ring */}
      <div className="relative flex items-center justify-center mb-8">
        <div className="absolute w-40 h-40 rounded-full border-4 border-transparent border-t-pink-500 border-r-green-500 animate-spin" />
        <div className="absolute w-32 h-32 rounded-full bg-gradient-to-br from-pink-100 to-green-100 animate-pulse" />
        <div className="relative w-24 h-24 z-10">
          <Image
            src="/images/logo.png"
            alt="Smart Youth ICT"
            fill
            sizes="96px"
            className="object-contain drop-shadow-lg"
            priority
          />
        </div>
      </div>

      <div className="text-center z-10">
        <h1 className="text-2xl sm:text-3xl font-black tracking-tight leading-none mb-1">
          <span className="text-pink-600">Smart </span>
          <span className="text-green-900">Youth </span>
          <span className="text-green-900">ICT</span>
        </h1>
        <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-[0.4em]">
          Be Expert With Smart
        </p>
      </div>

      <div className="mt-10 w-48 h-[3px] rounded-full bg-slate-100 overflow-hidden z-10">
        <div className="h-full bg-gradient-to-r from-pink-500 to-green-500 rounded-full animate-progress" />
      </div>

      <style jsx global>{`
        @keyframes progress {
          from {
            width: 0%;
          }
          to {
            width: 100%;
          }
        }
        .animate-progress {
          animation: progress 1.5s ease-in-out forwards;
        }
      `}</style>
    </div>
  );
}
