'use client';

import Link from 'next/link';
import { usePathname, useParams } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  HiHome, HiAcademicCap, HiChartBar, HiClipboardList,
  HiBadgeCheck, HiCreditCard, HiLogout, HiCog,
  HiUsers, HiCollection, HiAnnotation, HiUserGroup, HiUserCircle, HiBriefcase, HiGift, HiQuestionMarkCircle
} from 'react-icons/hi';


const studentNav = [
  { href: '/student',              Icon: HiHome,          label: 'Dashboard'   },
  { href: '/student/my-courses',   Icon: HiAcademicCap,   label: 'My Courses'  },
  { href: '/student/progress',     Icon: HiChartBar,      label: 'Progress'    },
  { href: '/student/assignments',  Icon: HiClipboardList, label: 'Assignments' },
  { href: '/student/certificates', Icon: HiBadgeCheck,    label: 'Certificates'},
  { href: '/student/payments',     Icon: HiCreditCard,    label: 'Payments'    },
  { href: '/student/portfolio',    Icon: HiUserCircle,    label: 'Portfolio'   },
  { href: '/student/affiliate',    Icon: HiGift,          label: 'Affiliate'   },
  { href: '/freelancing',          Icon: HiBriefcase,     label: 'Projects'    },
];

const instructorNav = [
  { href: '/instructor/courses', Icon: HiCollection, label: 'My Courses' },
  { href: '/instructor/lessons', Icon: HiAnnotation, label: 'Lessons'    },
];

const branchAdminNav = [
  { href: '/admin',          Icon: HiChartBar,  label: 'Branch Overview'},
  { href: '/admin/courses',  Icon: HiCollection, label: 'Courses'   },
  { href: '/admin/students', Icon: HiUserGroup,  label: 'Students'  },
  { href: '/admin/payments', Icon: HiCreditCard, label: 'Payments'  },
  { href: '/admin/staff',    Icon: HiUsers,      label: 'Staff Room'},
  { href: '/admin/assets',   Icon: HiClipboardList, label: 'Assets' },
  { href: '/admin/crm',      Icon: HiAnnotation, label: 'Leads/CRM' },
];

const superAdminNav = [
  { href: '/super',             Icon: HiChartBar,  label: 'Global Stats' },
  { href: '/super/branches',    Icon: HiHome,      label: 'All Branches' },
  { href: '/super/curriculum',  Icon: HiAcademicCap, label: 'Master Courses'},
  { href: '/super/finance',     Icon: HiCreditCard, label: 'Global Finance'},
  { href: '/super/reports',     Icon: HiClipboardList, label: 'Audit Reports'},
];

function NavItem({ href, Icon, label }) {
  const pathname = usePathname();
  const { branchId } = useParams();
  
  // Scoped navigation path (super admin accesses global routes without branch slug)
  const fullHref = branchId ? `/${branchId}${href}` : href;

  const isActive = pathname === fullHref || (href !== '/student' && href !== '/admin' && href !== '/super' && pathname.startsWith(fullHref));
  
  return (
    <motion.div
      whileHover={{ x: 4 }}
      whileTap={{ scale: 0.98 }}
    >
      <Link href={fullHref} id={`sidebar-${label.toLowerCase().replace(/\s/g, '-')}`}
        className={`sidebar-link ${isActive ? 'active' : ''}`}>
        <Icon className={`${isActive ? 'text-pink-500' : 'text-slate-400'} transition-colors`} size={20} />
        <span>{label}</span>
      </Link>
    </motion.div>
  );
}

export default function Sidebar({ role, user }) {
  let navItems = studentNav;
  if (role === 'super_admin') navItems = superAdminNav;
  else if (role === 'branch_admin' || role === 'branch_management' || role === 'admin') navItems = branchAdminNav;
  else if (role === 'instructor') navItems = instructorNav;

  return (
    <aside className="sidebar w-72 h-full flex flex-col hidden lg:flex shrink-0">
      {/* Brand */}
      <div className="px-8 py-8 flex justify-center">
        <Link href="/" className="flex items-center">
          <img 
            src="/images/logo.png" 
            alt="Smart Youth ICT" 
            className="h-10 w-auto object-contain" 
          />
        </Link>
      </div>

      {/* User info Card */}
      <div className="sidebar-user-card">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full border-2 border-pink-500/20 p-0.5">
             <div className="w-full h-full rounded-full bg-slate-800 flex items-center justify-center text-white font-bold text-sm">
                {user?.name?.charAt(0) || 'U'}
             </div>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white text-sm font-bold truncate">{user?.name}</p>
            <p className="text-slate-500 text-[10px] uppercase font-bold tracking-widest">{user?.role}</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <div className="flex-1 px-4 py-6 overflow-y-auto scrollbar-hide">
        <div className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] px-4 mb-4">
          Main Menu
        </div>
        <nav className="space-y-1.5">
          {navItems.map((item) => <NavItem key={item.href} {...item} />)}
        </nav>

        <div className="mt-10 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] px-4 mb-4">
          Support
        </div>
        <div className="space-y-1.5">
          <NavItem href="/contact" Icon={HiQuestionMarkCircle} label="Help Center" />
          <NavItem href="/settings" Icon={HiCog} label="Settings" />
        </div>
      </div>

      {/* Sign out */}
      <div className="px-4 pb-8 border-t border-white/5 pt-6 space-y-2">
        <button
          id="sidebar-logout"
          onClick={() => signOut({ callbackUrl: '/' })}
          className="sidebar-logout group w-full"
        >
          <HiLogout className="group-hover:-translate-x-1 transition-transform" size={20} />
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

