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
import toast from "react-hot-toast";

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
  {
    href: process.env.NEXT_PUBLIC_FACEBOOK_PAGE_URL || "https://facebook.com",
    Icon: FaFacebook,
    label: "Facebook",
    color: "hover:text-blue-500",
  },
  {
    href: "https://youtube.com",
    Icon: FaYoutube,
    label: "YouTube",
    color: "hover:text-red-500",
  },
  {
    href: `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}`,
    Icon: FaWhatsapp,
    label: "WhatsApp",
    color: "hover:text-emerald-500",
  },
  {
    href: "https://linkedin.com",
    Icon: FaLinkedin,
    label: "LinkedIn",
    color: "hover:text-blue-400",
  },
  {
    href: "https://t.me/",
    Icon: FaTelegramPlane,
    label: "Telegram",
    color: "hover:text-sky-500",
  },
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
      // Silently try — newsletter endpoint optional
      await api.post("/email/subscribe", { email }).catch(() => {});
      setSubscribed(true);
    } finally {
      setSubLoading(false);
    }
  };

  return (
    <footer
      style={{
        background: "linear-gradient(180deg, #0f172a 0%, #1e1b4b 100%)",
      }}
      className="text-indigo-200 pt-8 pb-4"
    >
      <div className="container-custom">
        {/* Top grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
          {/* Brand column — spans 2 cols */}
          <div className="col-span-2">
            <Link href={`/${locale}`} className="mb-2 inline-block">
              <Image
                src="/images/logo.png"
                alt="Smart Youth ICT Logo"
                width={192}
                height={48}
                className="h-12 w-auto object-contain brightness-200 bg-[#f0f0f0]"
                loading="lazy"
                decoding="async"
                onError={(e) => { e.target.srcset = ''; e.target.src = '/images/placeholder.png'; }}
              />
            </Link>
            <p className="text-sm leading-[1.6] text-indigo-300 max-w-xs mb-3">
              Earn while you learn. Bangladesh's most practical IT training &
              freelancing platform.
            </p>

            {/* Socials */}
            <div className="flex gap-2">
              {SOCIALS.map(({ href, Icon, label, color }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className={`w-9 h-9 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center text-indigo-300 transition-all hover:bg-white/20 ${color}`}
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(NAV).map(([heading, links]) => (
            <div key={heading}>
              <h3 className="text-sm font-bold text-white mb-2 uppercase tracking-wider leading-[1.4]">
                {heading}
              </h3>
              <ul className="space-y-1.5">
                {links.map(({ href, label }) => (
                  <li key={href}>
                    <Link
                      href={`/${locale}${href}`}
                      className="text-sm text-indigo-300 hover:text-white transition-colors font-medium leading-[1.4]"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter strip */}
        <div className="bg-white/5 border border-white/10 rounded-2xl px-4 py-3 mb-6 flex flex-col md:flex-row items-center gap-3">
          <div className="flex-1 text-center md:text-left">
            <h4 className="text-white font-bold text-base mb-1 leading-[1.4]">
              📩 Get Free IT Career Tips
            </h4>
            <p className="text-indigo-300 text-sm leading-[1.6]">
              Join 3,000+ students getting weekly tips on freelancing & tech.
            </p>
          </div>
          {subscribed ? (
            <div className="flex items-center gap-2 text-emerald-400 font-semibold text-sm leading-[1.4]">
              <IoCheckmarkCircle size={20} /> You're subscribed!
            </div>
          ) : (
            <form
              onSubmit={handleSubscribe}
              className="flex flex-col sm:flex-row gap-2 w-full md:w-auto"
            >
              <input
                type="email"
                required
                placeholder="your@email.com"
                className="flex-1 md:w-56 px-3 py-2 rounded-xl bg-white/10 border border-white/20 text-white placeholder-indigo-300/60 text-sm leading-[1.4] focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <motion.button
                type="submit"
                disabled={subLoading}
                className="px-3 py-2 rounded-xl bg-gradient-to-r from-pink-500 to-indigo-500 text-white font-semibold text-sm leading-[1.4] flex items-center gap-1.5 disabled:opacity-60 hover:opacity-90 transition"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
              >
                <IoSendOutline size={15} /> {subLoading ? "…" : "Subscribe"}
              </motion.button>
            </form>
          )}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-indigo-400 leading-[1.4]">
          <p>
            © {new Date().getFullYear()} Smart Youth ICT. All rights reserved.
          </p>
          <div className="flex gap-3">
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
            <span>Made with ❤️ in Bangladesh 🇧🇩</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
