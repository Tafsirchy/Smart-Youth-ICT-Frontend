'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import { HiMenu, HiX } from 'react-icons/hi';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import MobileMenu from './MobileMenu';

const navLinks = [
  { href: '/courses',         label: 'Courses'    },
  { href: '/freelancing',     label: 'Freelancing'},
  { href: '/success-stories', label: 'Success'    },
  { href: '/blog',            label: 'Blog'       },
  { href: '/about',           label: 'About'      },
  { href: '/contact',         label: 'Contact'    },
];

export default function Navbar() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();
    // Only trigger hide/show if we have scrolled past the initial 50px
    if (latest > 50 && latest > previous) {
      setHidden(true); // Scrolling down
    } else {
      setHidden(false); // Scrolling up
    }
  });

  const cleanPath = pathname.replace(/^\/[a-z]{2}(-[A-Z]{2})?(?=\/|$)/, '');
  const isActive = (href) => cleanPath === href || (href !== '/' && cleanPath.startsWith(href));

  return (
    <motion.header
      className="bg-white shadow-sm sticky top-0 z-50"
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" }
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: 'easeInOut' }}
    >
      <nav className="container-custom flex items-center justify-between py-4">
        {/* Logo */}
        <Link href="/" id="nav-logo" className="flex items-center gap-2">
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
          >
            <img src="/images/logo.png" alt="Smart Youth ICT" className="h-10 w-auto object-contain" />
          </motion.div>
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-1">
          {navLinks.map(({ href, label }, i) => (
            <motion.li
              key={href}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * i + 0.1 }}
            >
              <Link href={href}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  isActive(href)
                    ? 'text-brand-green bg-brand-green/10 font-semibold'
                    : 'text-gray-700 hover:text-brand-green hover:bg-brand-green/5'
                }`}>
                {label}
              </Link>
            </motion.li>
          ))}
        </ul>

        {/* CTA / Auth */}
        <motion.div
          className="hidden md:flex items-center gap-3"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          {session ? (
            <div className="flex items-center gap-3">
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
                <Link href="/student" id="nav-dashboard" className="btn-primary text-sm px-4 py-2">
                  Dashboard
                </Link>
              </motion.div>
              <button
                onClick={() => {
                  import('next-auth/react').then(({ signOut }) => {
                    signOut({ callbackUrl: '/' });
                  });
                }}
                className="text-sm font-medium text-gray-700 hover:text-red-500 transition-colors bg-gray-100 hover:bg-red-50 px-3 py-2 rounded-lg"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <>
              <Link href="/login" id="nav-login"
                className="text-sm font-medium text-gray-700 hover:text-primary transition-colors">
                Sign In
              </Link>
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
                <Link href="/register" id="nav-register" className="btn-primary text-sm px-4 py-2">
                  Enroll Now
                </Link>
              </motion.div>
            </>
          )}
        </motion.div>

        {/* Mobile hamburger */}
        <motion.button
          id="nav-mobile-toggle"
          className="md:hidden text-gray-800 p-1"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
          whileTap={{ scale: 0.85 }}
        >
          <AnimatePresence mode="wait" initial={false}>
            {mobileOpen
              ? <motion.span key="x"    initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90,  opacity: 0 }} transition={{ duration: 0.2 }}><HiX    size={24} /></motion.span>
              : <motion.span key="menu" initial={{ rotate:  90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}><HiMenu size={24} /></motion.span>
            }
          </AnimatePresence>
        </motion.button>
      </nav>

      {/* Mobile menu slide-down */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            style={{ overflow: 'hidden' }}
          >
            <MobileMenu links={navLinks} session={session} onClose={() => setMobileOpen(false)} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
