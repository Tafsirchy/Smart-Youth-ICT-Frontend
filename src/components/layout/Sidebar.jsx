'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';
import {
  HiHome, HiAcademicCap, HiChartBar, HiClipboardList,
  HiBadgeCheck, HiCreditCard, HiLogout, HiCog,
  HiUsers, HiCollection, HiAnnotation, HiUserGroup, HiUserCircle, HiBriefcase, HiGift,
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

const adminNav = [
  { href: '/admin/courses',  Icon: HiCollection, label: 'Courses'   },
  { href: '/admin/students', Icon: HiUserGroup,  label: 'Students'  },
  { href: '/admin/payments', Icon: HiCreditCard, label: 'Payments'  },
  { href: '/admin/blog',     Icon: HiAnnotation, label: 'Blog'      },
  { href: '/admin/crm',      Icon: HiUsers,      label: 'CRM'       },
  { href: '/admin/affiliate',Icon: HiCog,        label: 'Affiliate' },
];

function NavItem({ href, Icon, label }) {
  const pathname = usePathname();
  const isActive = pathname === href || (href !== '/student' && pathname.startsWith(href));
  return (
    <Link href={href} id={`sidebar-${label.toLowerCase().replace(/\s/g, '-')}`}
      className={`sidebar-link ${isActive ? 'active' : ''}`}>
      <Icon size={18} />
      <span>{label}</span>
    </Link>
  );
}

export default function Sidebar({ role, user }) {
  const navItems = role === 'admin' ? adminNav : role === 'instructor' ? instructorNav : studentNav;

  return (
    <aside className="sidebar w-64 min-h-screen flex flex-col hidden md:flex shrink-0">
      {/* Brand */}
      <div className="px-5 py-5 border-b border-white/10">
        <Link href="/">
          <span className="text-xl font-extrabold"
            style={{ background: 'var(--gradient-hero)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            SYICT
          </span>
        </Link>
      </div>

      {/* User info */}
      <div className="px-4 py-4 border-b border-white/10">
        <p className="text-white text-sm font-semibold truncate">{user?.name}</p>
        <p className="text-gray-400 text-xs capitalize">{user?.role}</p>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => <NavItem key={item.href} {...item} />)}
      </nav>

      {/* Sign out */}
      <div className="px-3 pb-4 border-t border-white/10 pt-4">
        <button
          id="sidebar-logout"
          onClick={() => signOut({ callbackUrl: '/' })}
          className="sidebar-link w-full text-left"
        >
          <HiLogout size={18} />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
