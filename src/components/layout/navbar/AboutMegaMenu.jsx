"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function AboutMegaMenu({
  isOpen,
  onMouseEnter,
  onMouseLeave,
  onClose,
  cleanPath,
  aboutColumns,
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          initial={{ opacity: 0, y: 10, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{
            opacity: 0,
            y: 10,
            scale: 0.98,
            transition: { duration: 0.15 },
          }}
          className="absolute top-full right-4 2xl:right-0 w-full max-w-[840px] !bg-white shadow-2xl border border-slate-200/90 overflow-hidden z-50 origin-top-right before:absolute before:-top-4 before:inset-x-0 before:h-4 before:content-['']"
        >
          {/* Minimalist Editorial Top Bar */}
          <div className="!bg-white px-4 py-2.5 flex items-center justify-between border-b border-slate-100">
            <div className="flex items-center gap-2">
              <span className="text-xl leading-none">📖</span>
              <p className="text-slate-900 text-sm font-black uppercase tracking-[0.15em] leading-[1.4]">
                About Smart Youth ICT
              </p>
            </div>
          </div>

          {/* 4-column minimal grid */}
          <div className="grid grid-cols-4 gap-1.5 p-2 !bg-white">
            {aboutColumns.map((col) => (
              <div
                key={col.heading}
                className="px-2.5 py-2 hover:bg-slate-50 transition-colors duration-300"
              >
                <div className="flex items-center gap-1.5 mb-2">
                  <div className="w-6 h-6 bg-brand-pink/10 text-brand-pink flex items-center justify-center shrink-0">
                    <span className="text-xs leading-none">{col.icon}</span>
                  </div>
                  <p className="text-[11px] font-black text-slate-800 uppercase tracking-widest leading-[1.4]">
                    {col.heading}
                  </p>
                </div>
                <ul className="space-y-0.5">
                  {col.items.map((item) => {
                    const isItemActive = cleanPath === item.href;
                    return (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          onClick={onClose}
                          className="flex flex-col gap-0.5 px-2.5 py-1.5 -mx-2.5 hover:bg-white hover:shadow-[0_2px_10px_-4px_rgba(0,0,0,0.1)] group/item transition-all"
                        >
                          <span
                            className={`text-xs font-bold transition-all transform group-hover/item:translate-x-1 leading-[1.4] ${
                              isItemActive
                                ? "text-brand-pink"
                                : "text-slate-700 group-hover/item:text-brand-pink"
                            }`}
                          >
                            {item.label}
                          </span>
                          <span className="text-[10px] text-slate-400 group-hover/item:text-slate-500 transition-colors transform group-hover/item:translate-x-1 leading-[1.4]">
                            {item.desc}
                          </span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>

          {/* Trust Badge / Footer */}
          <div className="border-t border-slate-100 bg-slate-50/50 px-4 py-2.5 flex items-center justify-center">
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em] italic leading-[1.4]">
              From Learning to Earning • Built for Real-World Skills
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
