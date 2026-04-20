"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import {
  IoLogoLinkedin,
  IoLogoTwitter,
  IoSchoolOutline,
  IoBriefcaseOutline,
  IoExpandOutline,
} from "react-icons/io5";

const mentors = [
  {
    id: 1,
    name: "Asraful Shanto",
    role: "Lead Web Instructor",
    expertise: "Full Stack Development",
    experience: "8+ Years Exp.",
    bio: "Ex-Senior Engineer at leading tech firms. Specialized in React, Node.js and scalable architecture.",
    image:
      "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=400&h=400",
    color: "from-pink-500 to-rose-600",
    glowColor: "bg-pink-500/30",
  },
  {
    id: 2,
    name: "Sazzad Hossain",
    role: "Marketing Expert",
    expertise: "Social Media & Ads",
    experience: "6+ Years Exp.",
    bio: "Guided 100+ brands to 7-figure revenue. Master of Facebook Ads & Growth Hacking.",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400&h=400",
    color: "from-emerald-400 to-teal-600",
    glowColor: "bg-emerald-500/30",
  },
  {
    id: 3,
    name: "Muntasir Billah",
    role: "Design Mentor",
    expertise: "UI/UX & Branding",
    experience: "5+ Years Exp.",
    bio: "Art Director with a passion for minimal and functional design. Top Rated on Upwork.",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400&h=400",
    color: "from-blue-500 to-indigo-600",
    glowColor: "bg-blue-500/30",
  },
];

const FloatingLines = () => (
  <svg
    className="absolute inset-0 w-full h-full opacity-20 pointer-events-none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <motion.path
      d="M-100 200 C 200 100, 400 300, 800 150 S 1200 400, 1600 250"
      stroke="url(#gradient1)"
      strokeWidth="2"
      fill="none"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 1 }}
      transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
    />
    <motion.path
      d="M-100 600 C 300 500, 600 700, 1000 550 S 1400 800, 1800 650"
      stroke="url(#gradient2)"
      strokeWidth="1.5"
      fill="none"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 1 }}
      transition={{ duration: 15, repeat: Infinity, ease: "linear", delay: 2 }}
    />
    <defs>
      <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#ec4899" stopOpacity="0" />
        <stop offset="50%" stopColor="#ec4899" stopOpacity="1" />
        <stop offset="100%" stopColor="#ec4899" stopOpacity="0" />
      </linearGradient>
      <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#10b981" stopOpacity="0" />
        <stop offset="50%" stopColor="#10b981" stopOpacity="1" />
        <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
      </linearGradient>
    </defs>
  </svg>
);

const MentorCard = ({ mentor }) => {
  const cardRef = useRef(null);

  // 3D Tilt Effect
  const x = useSpring(0, { stiffness: 100, damping: 30 });
  const y = useSpring(0, { stiffness: 100, damping: 30 });

  const handleMouseMove = (event) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    const xPct = (mouseX / width - 0.5) * 20;
    const yPct = (mouseY / height - 0.5) * -20;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX: y, rotateY: x, transformStyle: "preserve-3d" }}
      className="group relative"
    >
      {/* Background Glow */}
      <div
        className={`absolute -inset-4 rounded-[48px] ${mentor.glowColor} blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700`}
      />

      <div className="relative h-full bg-slate-900/40 border border-white/10 backdrop-blur-3xl rounded-[40px] p-8 flex flex-col items-center text-center transition-all duration-500 group-hover:bg-slate-900/60 group-hover:border-white/20 overflow-hidden">
        {/* Animated Corner Decor */}
        <div
          className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl ${mentor.color} opacity-20 blur-2xl group-hover:opacity-40 transition-opacity`}
        />

        {/* Image Container with Floating Effect */}
        <div
          className="relative mb-10 w-40 h-40"
          style={{ transform: "translateZ(50px)" }}
        >
          <div
            className={`absolute inset-0 bg-gradient-to-tr ${mentor.color} rounded-[48px] rotate-6 group-hover:rotate-12 transition-transform duration-500 blur-md opacity-50`}
          />
          <div
            className={`absolute inset-0 border-2 border-white/20 rounded-[48px] -rotate-3 group-hover:-rotate-6 transition-transform duration-500`}
          />
          <div className="relative w-full h-full rounded-[44px] overflow-hidden border-4 border-white/10 shadow-2xl">
            <Image
              src={mentor.image}
              alt={mentor.name}
              fill
              sizes="(max-width: 768px) 80vw, 160px"
              className="object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-700 scale-110 group-hover:scale-100"
            />
          </div>

          {/* Top Rated Badge */}
          <div className="absolute -top-4 -right-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-2 px-3 shadow-xl transform translate-z-10 group-hover:scale-110 transition-transform">
            <span className="text-[10px] font-black text-white uppercase tracking-tighter flex items-center gap-1">
              <IoSchoolOutline className="text-pink-400" /> Professional
            </span>
          </div>
        </div>

        {/* Content with 3D Depth */}
        <div
          className="relative z-10 space-y-4"
          style={{ transform: "translateZ(30px)" }}
        >
          <div>
            <h3 className="text-3xl font-black text-white tracking-tight mb-1">
              {mentor.name}
            </h3>
            <p className="inline-block px-3 py-1 rounded-lg bg-white/5 text-xs font-bold text-white/60 uppercase tracking-widest border border-white/5">
              {mentor.role}
            </p>
          </div>

          <p className="text-white/40 text-sm leading-relaxed max-w-[260px] mx-auto group-hover:text-white/70 transition-colors">
            {mentor.bio}
          </p>

          <div className="flex flex-wrap justify-center gap-2">
            <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-black text-white/60 uppercase">
              {mentor.expertise}
            </span>
            <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-black text-white/60 uppercase">
              {mentor.experience}
            </span>
          </div>
        </div>

        {/* Socials & Action */}
        <div
          className="mt-8 flex items-center justify-between w-full relative z-10"
          style={{ transform: "translateZ(20px)" }}
        >
          <div className="flex gap-3">
            <a
              href="#"
              className="w-10 h-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:bg-white hover:text-slate-900 transition-all duration-300"
            >
              <IoLogoLinkedin size={18} />
            </a>
            <a
              href="#"
              className="w-10 h-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:bg-white hover:text-slate-900 transition-all duration-300"
            >
              <IoLogoTwitter size={18} />
            </a>
          </div>

          <button className="flex items-center gap-2 text-[10px] font-black text-white/40 uppercase tracking-widest hover:text-white transition-colors group/btn">
            View Profile{" "}
            <IoExpandOutline className="group-hover/btn:rotate-45 transition-transform" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default function Mentors() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section
      ref={containerRef}
      className="section py-32 relative overflow-hidden bg-[#020617]"
    >
      {/* Dynamic Background Layer */}
      <motion.div className="absolute inset-0 z-0" style={{ y: bgY }}>
        <div
          className="absolute inset-0 bg-cover bg-center brightness-[0.3]"
          style={{ backgroundImage: "url('/images/mentors_bg.png')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#020617] via-transparent to-[#020617]" />
      </motion.div>

      {/* Animated SVG Circuitry */}
      <FloatingLines />

      {/* Decorative Orbs */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-brand-pink/10 rounded-full blur-[120px] mix-blend-screen animate-pulse" />
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-brand-accent/10 rounded-full blur-[120px] mix-blend-screen animate-pulse delay-700" />

      <div className="container-custom relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-24 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-block relative mb-8">
            <div className="absolute inset-0 bg-brand-pink/20 blur-xl rounded-full" />
            <span className="relative px-6 py-2 rounded-full border border-white/10 text-white text-[10px] font-black uppercase tracking-[0.4em] backdrop-blur-xl">
              The Board of Directors
            </span>
          </div>

          <h2 className="text-5xl md:text-7xl font-black text-white leading-[1.1] mb-8 tracking-tighter">
            Learn from the <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-rose-500 to-amber-500 animate-gradient-x">
              Best in Industry
            </span>
          </h2>

          <p className="text-white/50 text-xl font-medium max-w-2xl mx-auto leading-relaxed">
            Direct guidance from top-tier professionals who have built, scaled,
            and transformed industry standards globally.
          </p>
        </motion.div>

        {/* Mentor Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 xl:gap-16">
          {mentors.map((mentor, index) => (
            <motion.div
              key={mentor.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.8 }}
            >
              <MentorCard mentor={mentor} />
            </motion.div>
          ))}
        </div>

        {/* Bottom Decorative Line */}
        <motion.div
          className="mt-32 flex flex-col items-center gap-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="h-px w-40 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          <p className="text-white/20 text-[10px] font-black uppercase tracking-[0.5em] text-center">
            Empowering the next generation of digital leaders
          </p>
        </motion.div>
      </div>
    </section>
  );
}
