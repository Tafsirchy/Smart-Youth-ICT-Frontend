"use client";

import { memo } from "react";

const ROWS = [
  {
    text: "INNOVATION • TECHNOLOGY • FUTURE • AI • CYBERNETICS • SMART YOUTH • ",
    animation: "animate-syict-marquee-left",
  },
  {
    text: "SOFTWARE ENGINEERING • FULL STACK • REACT • NEXT.JS • NODE.JS • DEVOPS • ",
    animation: "animate-syict-marquee-right",
  },
  {
    text: "ROBOTICS • AUTOMATION • CLOUD COMPUTING • DATA SCIENCE • MACHINE LEARNING • ",
    animation: "animate-syict-marquee-left-alt",
  },
  {
    text: "CYBER SECURITY • ETHICAL HACKING • NETWORK ARCHITECTURE • SYSTEM DESIGN • ",
    animation: "animate-syict-marquee-right-alt",
  },
  {
    text: "WEB3 • BLOCKCHAIN • UI/UX DESIGN • CREATIVE COMPUTING • ARTIFICIAL INTELLIGENCE • ",
    animation: "animate-syict-marquee-left",
  },
  {
    text: "PYTHON • ALGORITHMS • BIG DATA • DIGITAL TRANSFORMATION • SYICT CAMPUS • ",
    animation: "animate-syict-marquee-right",
  },
  {
    text: "MOBILE DEVELOPMENT • FLUTTER • CLOUD NATIVE • MICROSERVICES • FUTURE TECH • ",
    animation: "animate-syict-marquee-left-alt",
  },
];

function MarqueeRow({ text, animationClass, repeat = 4 }) {
  const content = Array(repeat).fill(text).join("");

  return (
    <div
      className="flex whitespace-nowrap overflow-hidden select-none leading-none"
      style={{
        contain: "paint layout",
        transform: "translate3d(0, 0, 0)",
        backfaceVisibility: "hidden",
      }}
    >
      <div className={animationClass}>
        {/* First Half */}
        <span className="inline-block text-[58px] sm:text-[76px] lg:text-[88px] font-black uppercase tracking-tighter text-slate-900/[0.04]">
          {content}
        </span>
        {/* Second Half (Exact clone for seamless -50% GPU compositor loop) */}
        <span
          aria-hidden="true"
          className="inline-block text-[58px] sm:text-[76px] lg:text-[88px] font-black uppercase tracking-tighter text-slate-900/[0.04]"
        >
          {content}
        </span>
      </div>
    </div>
  );
}

const AuthBackground = memo(function AuthBackground() {
  return (
    <div
      className="absolute inset-0 pointer-events-none select-none overflow-hidden z-0"
      style={{
        contain: "strict",
      }}
    >
      {/* ── Soft Ambient Glow Orbs (Static & Hardware Layered) ─────────────── */}
      <div
        className="absolute -top-32 -left-32 w-96 h-96 sm:w-[500px] sm:h-[500px] rounded-full bg-gradient-to-br from-brand-pink/[0.06] to-transparent blur-3xl"
        style={{ transform: "translate3d(0, 0, 0)" }}
      />
      <div
        className="absolute -bottom-32 -right-32 w-96 h-96 sm:w-[500px] sm:h-[500px] rounded-full bg-gradient-to-tl from-brand-accent/[0.07] to-transparent blur-3xl"
        style={{ transform: "translate3d(0, 0, 0)" }}
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 sm:w-[600px] sm:h-[600px] rounded-full bg-gradient-to-tr from-brand-green/[0.03] to-transparent blur-[120px]"
        style={{ transform: "translate3d(-50%, -50%, 0)" }}
      />

      {/* ── Pure CSS GPU-Composited Multi-Line Marquee Canvas ──────────────── */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className="absolute w-[250vw] h-[250vh] flex flex-col justify-center gap-7 sm:gap-9 lg:gap-11"
          style={{
            transform: "rotate(-12deg) translate3d(0, 0, 0)",
            willChange: "transform",
            backfaceVisibility: "hidden",
          }}
        >
          {ROWS.map((row, idx) => (
            <MarqueeRow
              key={idx}
              text={row.text}
              animationClass={row.animation}
            />
          ))}
        </div>
      </div>
    </div>
  );
});

export default AuthBackground;
