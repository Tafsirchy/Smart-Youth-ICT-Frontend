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
  FaCcVisa,
  FaCcMastercard,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt
} from "react-icons/fa";
import { IoSendOutline, IoCheckmarkCircle } from "react-icons/io5";
import api from "@/lib/api";

const NAV = {
  Platform: [
    { href: "/courses", label: "All Courses" },
    { href: "/freelancing", label: "Freelancing Program" },
    { href: "/affiliate", label: "Affiliate Program" },
    { href: "/seminar", label: "Free Seminar" },
    { href: "/services", label: "Our Services" },
  ],
  Company: [
    { href: "/about", label: "About Us" },
    { href: "/branches", label: "Our Branches" },
    { href: "/gallery", label: "Gallery" },
    { href: "/success-stories", label: "Success Stories" },
    { href: "/blog", label: "Blog & Tips" },
  ],
  Support: [
    { href: "/contact", label: "Contact Us" },
    { href: "/student", label: "Student Dashboard" },
    { href: "/verify-certificate", label: "Verify Certificate" },
    { href: "/faq", label: "FAQ & Help" },
    { href: "/refund-policy", label: "Refund Policy" },
  ],
};

const SOCIALS = [
  { href: process.env.NEXT_PUBLIC_FACEBOOK_PAGE_URL || "https://facebook.com", Icon: FaFacebook, label: "Facebook" },
  { href: "https://youtube.com", Icon: FaYoutube, label: "YouTube" },
  { href: `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}`, Icon: FaWhatsapp, label: "WhatsApp" },
  { href: "https://linkedin.com", Icon: FaLinkedin, label: "LinkedIn" },
  { href: "https://t.me/", Icon: FaTelegramPlane, label: "Telegram" },
  { href: "mailto:support@syict.com", Icon: FaEnvelope, label: "Email" },
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
    <footer className="bg-[#0B101E] pt-12 pb-6 text-slate-400 font-sans border-t border-slate-800 relative overflow-hidden">
      {/* Decorative Blobs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-pink/10 blur-[120px] pointer-events-none hidden"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-brand-green/10 blur-[120px] pointer-events-none hidden"></div>

      <div className="container-custom relative z-10">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-6 mb-10">
          
          {/* Brand & Socials */}
          <div className="md:col-span-5 lg:col-span-4 flex flex-col items-start">
            <Link href={`/${locale}`} className="mb-6 inline-block">
              <Image
                src="/images/logo.png"
                alt="Smart Youth ICT Logo"
                width={480}
                height={120}
                className="h-20 sm:h-28 w-auto object-contain brightness-200 opacity-90 hover:opacity-100 transition-opacity rounded-md"
                loading="lazy"
                decoding="async"
                onError={(e) => { e.target.srcset = ''; e.target.src = '/images/placeholder.png'; }}
              />
            </Link>
            <p className="text-sm font-medium text-slate-400 leading-relaxed max-w-sm mb-8">
              Earn while you learn. Bangladesh's most practical IT training & freelancing platform. Architecting digital careers with precision and performance.
            </p>

            <div className="flex flex-wrap gap-1">
              {SOCIALS.map(({ href, Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="w-9 h-9 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-brand-pink hover:border-brand-pink hover:shadow-[0_0_15px_rgba(255,44,109,0.3)] transition-all group rounded-md"
                >
                  <Icon size={15} className="group-hover:scale-110 transition-transform" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Links & Contact */}
          <div className="md:col-span-7 lg:col-span-8 grid grid-cols-2 lg:grid-cols-4 gap-8">
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
            
            {/* Contact Info Column */}
            <div>
              <h3 className="text-base font-extrabold text-white mb-6">Get in Touch</h3>
              <ul className="flex flex-col gap-4 text-sm font-medium text-slate-400">
                <li>
                  <a href="tel:+8801822335566" className="flex items-center gap-3 hover:text-white transition-colors group">
                    <span className="w-8 h-8 rounded-md bg-white/5 flex items-center justify-center text-brand-pink group-hover:bg-brand-pink group-hover:text-white transition-colors border border-white/5 group-hover:border-brand-pink shrink-0">
                      <FaPhoneAlt size={12} />
                    </span>
                    +880 1822-335566
                  </a>
                </li>
                <li>
                  <a href="mailto:support@syict.com" className="flex items-center gap-3 hover:text-white transition-colors group">
                    <span className="w-8 h-8 rounded-md bg-white/5 flex items-center justify-center text-brand-pink group-hover:bg-brand-pink group-hover:text-white transition-colors border border-white/5 group-hover:border-brand-pink shrink-0">
                      <FaEnvelope size={12} />
                    </span>
                    support@syict.com
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-md bg-white/5 flex items-center justify-center text-brand-pink border border-white/5 shrink-0">
                    <FaMapMarkerAlt size={12} />
                  </span>
                  Dhaka, Bangladesh
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="border border-white/10 p-6 md:p-8 mb-8 flex flex-col lg:flex-row items-center justify-between gap-6 bg-slate-800/20 backdrop-blur-sm relative overflow-hidden shadow-2xl rounded-lg">
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-accent/10 blur-[80px] pointer-events-none hidden"></div>
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
              <div className="h-14 border border-brand-green/30 bg-brand-green/10 flex items-center justify-center gap-3 text-brand-green font-bold text-sm rounded-md">
                <IoCheckmarkCircle size={20} /> Subscription Complete
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 w-full group">
                <input
                  type="email"
                  required
                  placeholder="Enter your email address"
                  className="flex-1 h-14 px-6 bg-white/5 border border-white/10 text-white placeholder-slate-500 text-sm font-medium focus:outline-none focus:border-brand-pink focus:bg-white/10 transition-all shadow-inner rounded-md"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button
                  type="submit"
                  disabled={subLoading}
                  className="h-14 px-8 bg-brand-pink text-white font-extrabold shadow-[0_0_20px_rgba(255,44,109,0.2)] hover:bg-brand-pink-light hover:shadow-[0_0_30px_rgba(255,44,109,0.4)] transition-all disabled:opacity-70 flex items-center justify-center gap-2 shrink-0 rounded-md"
                >
                  {subLoading ? "Processing..." : "Subscribe"}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Payment Gateways & Memberships */}
        <div className="border-t border-white/10 pt-6 pb-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Verified & Secured by</span>
            <div className="flex items-center gap-2">
              {/* Dummy Badges for BASIS/Govt */}
              <div className="h-8 px-3 bg-white/5 border border-white/10 rounded flex items-center justify-center text-xs font-bold text-slate-300">BASIS</div>
              <div className="h-8 px-3 bg-white/5 border border-white/10 rounded flex items-center justify-center text-xs font-bold text-slate-300">GOVT. APPROVED</div>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">We Accept</span>
            <div className="flex items-center gap-2">
              <div className="h-8 w-14 bg-[#E2136E]/10 border border-[#E2136E]/30 rounded flex items-center justify-center text-[#E2136E] font-black text-xs italic tracking-tighter">bKash</div>
              <div className="h-8 w-14 bg-[#F7931E]/10 border border-[#F7931E]/30 rounded flex items-center justify-center text-[#F7931E] font-black text-xs tracking-tighter">Nagad</div>
              <div className="h-8 w-14 bg-[#8C1515]/10 border border-[#8C1515]/30 rounded flex items-center justify-center text-[#8C1515] font-black text-xs tracking-tighter">Rocket</div>
              <div className="h-8 w-12 bg-white/5 border border-white/10 rounded flex items-center justify-center text-slate-300"><FaCcVisa size={22} /></div>
              <div className="h-8 w-12 bg-white/5 border border-white/10 rounded flex items-center justify-center text-slate-300"><FaCcMastercard size={22} /></div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-medium">
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
