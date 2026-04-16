'use client';

import Link from 'next/link';
import { usePathname, useParams } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { motion } from 'framer-motion';
import { HiHome, HiLogout, HiUserCircle, HiQuestionMarkCircle, HiAnnotation, HiCog } from 'react-icons/hi';

// Architectural Imports
import { useRole } from '@/hooks/useRole';
import { NAVIGATION_CONFIG } from '@/config/navigation.config';

/**
 * NavItem - Individual sidebar Link with active state detection.
 */
function NavItem({ href, Icon, label }) {
  const pathname = usePathname();
  const { branchId } = useParams();
  
  // Scoped navigation path
  const fullHref = branchId ? `/${branchId}${href}` : href;
  const isActive = pathname === fullHref || (href !== '/student' && href !== '/admin' && href !== '/super' && pathname.startsWith(fullHref));
  
  return (
    <motion.div whileHover={{ x: 4 }} whileTap={{ scale: 0.98 }}>
      <Link 
        href={fullHref} 
        id={`sidebar-${label.toLowerCase().replace(/\s/g, '-')}`}
        className={`sidebar-link ${isActive ? 'active' : ''}`}
      >
        <Icon className={`${isActive ? 'text-pink-500' : 'text-slate-400'} transition-colors`} size={20} />
        <span>{label}</span>
      </Link>
    </motion.div>
  );
}

/**
 * Sidebar Component
 * Centralized navigation shell that dynamically adjusts menu items based on the user's role.
 * Optimized with server-side props to prevent hydration flickering.
 */
export default function Sidebar({ initialRole, initialUser }) {
  const { user: clientUser, role: clientRole, isLoading } = useRole();
  const pathname = usePathname();

  // Dual-source of truth: prioritize hydrated client state, fallback to server-side props
  const user = clientUser || initialUser;
  const role = clientRole || initialRole;

  // Determine current role status
  const isSuperAdmin = role === 'super_admin' || role === 'super_management';
  const isAdmin      = role === 'admin' || role === 'branch_admin' || role === 'branch_management';
  const isInstructor = role === 'instructor';

  // Determine which navigation set to display (avoid defaulting to student if role is undefined)
  let navItems = [];
  if (isSuperAdmin)     navItems = NAVIGATION_CONFIG.super_admin;
  else if (isAdmin)      navItems = NAVIGATION_CONFIG.admin;
  else if (isInstructor) navItems = NAVIGATION_CONFIG.instructor;
  else if (role === 'student') navItems = NAVIGATION_CONFIG.student;
  else if (!role && !isLoading) navItems = NAVIGATION_CONFIG.student; // Final fallback

  return (
    <aside className="sidebar w-72 h-full flex flex-col hidden lg:flex shrink-0">
      {/* Brand */}
      <div className="px-8 py-8 flex justify-center">
        <Link href="/" className="flex items-center">
          <img src="/images/logo.png" alt="Smart Youth ICT" className="h-10 w-auto object-contain" />
        </Link>
      </div>

      {/* User info Card */}
      <div className="sidebar-user-card min-h-[50px]">
        {isLoading && !user ? (
          <div className="flex items-center gap-3 animate-pulse">
            <div className="w-10 h-10 rounded-full bg-slate-700/50" />
            <div className="flex-1 space-y-2">
              <div className="h-3 w-20 bg-slate-700/50 rounded" />
              <div className="h-2 w-12 bg-slate-700/50 rounded" />
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full border-2 border-pink-500/20 p-0.5">
              <div className="w-full h-full rounded-full bg-slate-800 flex items-center justify-center text-white font-bold text-sm">
                  {user?.name?.charAt(0) || 'U'}
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white text-sm font-bold truncate">{user?.name || 'Guest User'}</p>
              <p className="text-slate-500 text-xs uppercase font-bold tracking-widest">{role?.replace('_', ' ') || 'Authenticating...'}</p>
            </div>
          </div>
        )}
      </div>

      {/* Main Navigation */}
      <div className="flex-1 px-4 py-6 overflow-y-auto scrollbar-hide">
        <div className="text-xs font-black text-slate-500 uppercase tracking-[0.2em] px-4 mb-4">
          Main Menu
        </div>
        <nav className="space-y-1.5">
          {navItems.map((item) => <NavItem key={item.href} {...item} />)}
        </nav>

        {/* Tertiary Links */}
        <div className="mt-10 text-xs font-black text-slate-500 uppercase tracking-[0.2em] px-4 mb-4">
          Management
        </div>
        <div className="space-y-1.5">
          <NavItem 
            href={isSuperAdmin ? '/super/support' : '/student/support'} 
            Icon={HiAnnotation} 
            label="Support Hub" 
          />
          <NavItem 
            href="/contact" 
            Icon={HiQuestionMarkCircle} 
            label="Help Center" 
          />
          <NavItem 
            href="/profile" 
            Icon={HiUserCircle} 
            label="Account Profile" 
          />
          {isSuperAdmin && (
            <NavItem 
              href="/super/settings" 
              Icon={HiCog} 
              label="Global Settings" 
            />
          )}
          {isAdmin && !isSuperAdmin && (
            <NavItem 
              href="/settings" 
              Icon={HiCog} 
              label="Branch Settings" 
            />
          )}
        </div>

        {isSuperAdmin && (
          <>
            <div className="mt-10 text-xs font-black text-rose-500 uppercase tracking-[0.2em] px-4 mb-4">
              About Us CMS
            </div>
            <div className="space-y-1.5">
              {NAVIGATION_CONFIG.about_cms.map((item) => <NavItem key={item.href} {...item} />)}
            </div>

            <div className="mt-10 text-xs font-black text-blue-500 uppercase tracking-[0.2em] px-4 mb-4">
              Services CMS
            </div>
            <div className="space-y-1.5 pb-8">
              {NAVIGATION_CONFIG.services_cms.map((item) => <NavItem key={item.href} {...item} />)}
            </div>
          </>
        )}
      </div>

      {/* Bottom Actions */}
      <div className="px-4 pb-8 border-t border-white/5 pt-6 space-y-2">
        <button
          id="sidebar-logout"
          onClick={() => signOut({ callbackUrl: '/' })}
          className="sidebar-logout group w-full text-left flex items-center gap-3 px-4 py-3"
        >
          <HiLogout className="group-hover:-translate-x-1 transition-transform text-red-400" size={20} />
          <span className="font-bold">Sign Out</span>
        </button>

        <Link
          href="/"
          id="sidebar-back-home"
          className="sidebar-link group w-full hover:bg-white/5"
        >
          <HiHome className="group-hover:-translate-y-0.5 transition-transform text-slate-400 group-hover:text-white" size={20} />
          <span className="font-bold text-slate-400 group-hover:text-white">Back to Home</span>
        </Link>
      </div>
    </aside>
  );
}
