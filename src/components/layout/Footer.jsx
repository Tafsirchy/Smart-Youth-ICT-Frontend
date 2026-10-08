"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useLocale } from "next-intl";
import { motion } from "framer-motion";
import {
  FaFacebook,
  FaYoutube,
  FaWhatsapp,
  FaLinkedin,
  FaTelegramPlane,
} from "react-icons/fa";
import { IoSendOutline, IoCheckmarkCircle } from "react-icons/io5";
import api from "@/lib/api";

const NAV = {
  Platform: [
    { href: "/courses", label: "All Courses" },
    { href: "/freelancing", label: "Freelancing Program" },
    { href: "/affiliate", label: "Affiliate Program" },
    { href: "/seminar", label: "Free Seminar" },
  ],
  Company: [
    { href: "/about", label: "About Us" },
    { href: "/success-stories", label: "Success Stories" },
    { href: "/blog", label: "Blog & Tips" },
    { href: "/contact", label: "Contact" },
  ],
  Students: [
    { href: "/login", label: "Student Login" },
    { href: "/register", label: "Create Account" },
    { href: "/student", label: "Dashboard" },
    { href: "/verify-certificate", label: "Verify Certificate" },
  ],
};

const SOCIALS = [
  { href: process.env.NEXT_PUBLIC_FACEBOOK_PAGE_URL || "https://facebook.com", Icon: FaFacebook, label: "Facebook" },
  { href: "https://youtube.com", Icon: FaYoutube, label: "YouTube" },
  { href: `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}`, Icon: FaWhatsapp, label: "WhatsApp" },
  { href: "https://linkedin.com", Icon: FaLinkedin, label: "LinkedIn" },
  { href: "https://t.me/", Icon: FaTelegramPlane, label: "Telegram" },
];

export default function Footer() {
  const locale = useLocale();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [subLoading, setSubLoading] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    setSubLoading(true);
    try {
      await api.post("/email/subscribe", { email }).catch(() => {});
      setSubscribed(true);
    } finally {
      setSubLoading(false);
    }
  };

  return (
    <footer className="bg-[#0B101E] pt-20 pb-8 text-slate-400 font-sans border-t border-slate-800 relative overflow-hidden">
      {/* Decorative Blobs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-pink/10 blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-brand-green/10 blur-[120px] pointer-events-none"></div>

      <div className="container-custom relative z-10">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8 mb-16">
          
          {/* Brand & Socials */}
          <div className="md:col-span-5 lg:col-span-4 flex flex-col items-start">
            <Link href={`/${locale}`} className="mb-8 inline-block">
              <Image
                src="/images/logo.png"
                alt="Smart Youth ICT Logo"
                width={360}
                height={90}
                className="h-12 w-auto object-contain brightness-200 opacity-90 hover:opacity-100 transition-opacity"
                loading="lazy"
                decoding="async"
                onError={(e) => { e.target.srcset = ''; e.target.src = '/images/placeholder.png'; }}
              />
            </Link>
            <p className="text-sm font-medium text-slate-400 leading-relaxed max-w-sm mb-8">
              Earn while you learn. Bangladesh's most practical IT training & freelancing platform. Architecting digital careers with precision and performance.
            </p>
            <div className="flex flex-wrap gap-3">
              {SOCIALS.map(({ href, Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-brand-pink hover:border-brand-pink hover:shadow-[0_0_20px_rgba(255,44,109,0.3)] transition-all group"
                >
                  <Icon size={16} className="group-hover:scale-110 transition-transform" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-7 lg:col-span-8 grid grid-cols-2 md:grid-cols-3 gap-8">
            {Object.entries(NAV).map(([heading, links]) => (
              <div key={heading}>
                <h3 className="text-base font-extrabold text-white mb-6">
                  {heading}
                </h3>
                <ul className="space-y-4">
                  {links.map(({ href, label }) => (
                    <li key={href}>
                      <Link
                        href={`/${locale}${href}`}
                        className="text-sm font-medium text-slate-400 hover:text-brand-accent transition-colors flex items-center gap-2 group"
                      >
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="rounded-3xl border border-white/10 p-8 md:p-10 mb-16 flex flex-col lg:flex-row items-center justify-between gap-8 bg-slate-800/20 backdrop-blur-sm relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-accent/10 blur-[80px] pointer-events-none"></div>
          <div className="text-center lg:text-left flex-1 max-w-xl relative z-10">
            <h4 className="text-2xl font-extrabold text-white mb-2">
              Intelligence in your inbox.
            </h4>
            <p className="text-slate-400 font-medium text-sm leading-relaxed">
              Join 3,000+ students receiving premium strategies on freelancing, modern development, and digital marketing every week.
            </p>
          </div>
          
          <div className="w-full lg:w-auto flex-1 max-w-md relative z-10">
            {subscribed ? (
              <div className="h-14 rounded-2xl border border-brand-green/30 bg-brand-green/10 flex items-center justify-center gap-3 text-brand-green font-bold text-sm">
                <IoCheckmarkCircle size={20} /> Subscription Complete
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 w-full group">
                <input
                  type="email"
                  required
                  placeholder="Enter your email address"
                  className="flex-1 h-14 rounded-2xl px-6 bg-white/5 border border-white/10 text-white placeholder-slate-500 text-sm font-medium focus:outline-none focus:border-brand-pink focus:bg-white/10 transition-all shadow-inner"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button
                  type="submit"
                  disabled={subLoading}
                  className="h-14 rounded-2xl px-8 bg-brand-pink text-white font-extrabold shadow-[0_0_20px_rgba(255,44,109,0.2)] hover:bg-brand-pink-light hover:shadow-[0_0_30px_rgba(255,44,109,0.4)] transition-all disabled:opacity-70 flex items-center justify-center gap-2 shrink-0"
                >
                  {subLoading ? "Processing..." : "Subscribe"}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-slate-500 font-medium">
          <p>
            © {new Date().getFullYear()} Smart Youth ICT. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <Link
              href={`/${locale}/privacy-policy`}
              className="hover:text-white transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href={`/${locale}/terms`}
              className="hover:text-white transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
