"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function ServicesMegaMenu({
  isOpen,
  onMouseEnter,
  onMouseLeave,
  onClose,
  cleanPath,
  serviceColumns,
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
          className="absolute top-[100%] right-4 2xl:right-0 w-full max-w-[800px] bg-white shadow-xl border border-slate-100 overflow-hidden z-50 origin-top-right"
        >
          {/* Minimalist Editorial Top Bar */}
          <div className="bg-white px-4 py-2.5 flex items-center justify-between border-b border-slate-100">
            <div className="flex items-center gap-2">
              <span className="text-xl leading-none">💡</span>
              <p className="text-slate-900 text-sm font-black uppercase tracking-[0.15em] leading-[1.4]">
                Our Expert Services
              </p>
            </div>
            <Link
              href="/services"
              onClick={onClose}
              className="text-brand-pink text-xs font-bold hover:text-rose-500 transition-colors flex items-center gap-1 group/link leading-[1.4]"
            >
              View full catalog{" "}
              <span className="transition-transform group-hover/link:translate-x-1">
                →
              </span>
            </Link>
          </div>

          {/* 4-column minimal grid */}
          <div className="grid grid-cols-4 gap-1.5 p-2 bg-white">
            {serviceColumns.map((col) => (
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
                <div>
                  <ul className="space-y-0.5">
                    {col.items.map((item) => {
                      const isItemActive = cleanPath === item.href;
                      return (
                        <li key={item.href}>
                          <Link
                            href={item.href}
                            onClick={onClose}
                            className="flex items-center justify-between gap-1 px-2.5 py-1.5 -mx-2 hover:bg-white hover:shadow-[0_2px_10px_-4px_rgba(0,0,0,0.1)] group/item transition-all"
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
                            {item.badge && (
                              <span className="shrink-0 text-[10px] font-black text-rose-500 bg-rose-50 px-1 py-0.5 uppercase tracking-wider transition-all transform group-hover/item:-translate-x-1 leading-none">
                                {item.badge}
                              </span>
                            )}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="border-t border-slate-100 bg-slate-50/50 px-4 py-2.5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-base leading-none">💬</span>
              <p className="text-xs text-slate-600 font-medium leading-[1.4]">
                Not sure what you need?{" "}
                <strong className="text-slate-900 border-b border-slate-300 pb-0.5 ml-1">
                  Let's talk to our experts.
                </strong>
              </p>
            </div>
            <Link
              href="/contact"
              onClick={onClose}
              className="text-[11px] font-black text-slate-900 border border-slate-200 hover:border-brand-pink hover:text-brand-pink px-3 py-1 transition-colors flex items-center gap-1.5 leading-[1.4]"
            >
              Get a Free Quote
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
