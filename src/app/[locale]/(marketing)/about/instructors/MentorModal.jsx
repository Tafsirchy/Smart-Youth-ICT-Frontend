"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { LuLinkedin, LuTwitter, LuMaximize, LuX } from "react-icons/lu";

export default function MentorModal({ mentor, onClose }) {
  if (!mentor) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
      />

      {/* Modal Content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-sm bg-[#1e1a29] rounded-[2.5rem] border border-white/5 overflow-hidden shadow-[0_0_80px_rgba(139,92,246,0.15)] flex flex-col p-8 items-center text-center z-10"
        style={{
          background: "linear-gradient(180deg, #2a1f3d 0%, #17151f 100%)"
        }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 text-white/50 hover:text-white transition-colors"
        >
          <LuX className="w-4 h-4" />
        </button>

        {/* Avatar Section */}
        <div className="relative mt-4 mb-6">
          {/* Badge */}
          {mentor.badge && (
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10 bg-white/10 backdrop-blur-md border border-white/20 text-white text-[9px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full whitespace-nowrap shadow-lg flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-sm bg-brand-pink/80 inline-block rotate-45" />
              {mentor.badge}
            </div>
          )}

          {/* Image */}
          <div className="relative w-32 h-32 rounded-[2.5rem] overflow-hidden shadow-[0_0_40px_rgba(236,72,153,0.3)] border-2 border-white/10">
            <Image
              src={mentor.avatar || "/images/placeholder.png"}
              alt={mentor.name}
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Info Section */}
        <h2 className="text-3xl font-black text-white mb-2 tracking-tight">
          {mentor.name}
        </h2>
        
        <div className="inline-block bg-white/5 border border-white/10 rounded-xl px-4 py-2 mb-6">
          <p className="text-[10px] font-black uppercase text-slate-300 tracking-[0.2em]">
            {mentor.role}
          </p>
        </div>

        <p className="text-sm text-slate-300 leading-relaxed mb-8 max-w-[260px]">
          {mentor.bio}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap justify-center gap-2 mb-8 w-full">
          {mentor.expertise && mentor.expertise[0] && (
            <span className="px-4 py-2 bg-white/5 border border-white/10 text-white/70 text-[9px] font-black uppercase tracking-widest rounded-xl">
              {mentor.expertise[0]}
            </span>
          )}
          {mentor.experience && (
            <span className="px-4 py-2 bg-white/5 border border-white/10 text-white/70 text-[9px] font-black uppercase tracking-widest rounded-xl">
              {mentor.experience}
            </span>
          )}
        </div>

        {/* Footer Actions */}
        <div className="w-full flex items-center justify-between pt-6 border-t border-white/10 mt-auto">
          <div className="flex gap-2">
            {mentor.socials?.linkedin && (
              <a href={mentor.socials.linkedin} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 flex items-center justify-center text-white/50 hover:text-white transition-all">
                <LuLinkedin className="w-4 h-4" />
              </a>
            )}
            {mentor.socials?.twitter && (
              <a href={mentor.socials.twitter} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 flex items-center justify-center text-white/50 hover:text-white transition-all">
                <LuTwitter className="w-4 h-4" />
              </a>
            )}
          </div>
          
          <button className="flex items-center gap-2 text-[10px] font-black text-white/50 hover:text-white uppercase tracking-widest transition-colors">
            VIEW PROFILE <LuMaximize className="w-3 h-3" />
          </button>
        </div>
      </motion.div>
    </div>
  );
}
