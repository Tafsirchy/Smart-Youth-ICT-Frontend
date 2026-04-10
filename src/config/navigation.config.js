import {
  HiHome, HiAcademicCap, HiChartBar, HiClipboardList,
  HiBadgeCheck, HiCreditCard, HiUsers, HiCollection,
  HiAnnotation, HiUserGroup, HiUserCircle, HiGift
} from 'react-icons/hi';

/**
 * Roles Mapping:
 * - student
 * - instructor
 * - branch_admin / branch_management / admin
 * - super_admin / super_management
 */

export const NAVIGATION_CONFIG = {
  student: [
    { href: '/student',              Icon: HiHome,          label: 'Dashboard'   },
    { href: '/student/my-courses',   Icon: HiAcademicCap,   label: 'My Courses'  },
    { href: '/student/progress',     Icon: HiChartBar,      label: 'Progress'    },
    { href: '/student/assignments',  Icon: HiClipboardList, label: 'Assignments' },
    { href: '/student/certificates', Icon: HiBadgeCheck,    label: 'Certificates'},
    { href: '/student/payments',     Icon: HiCreditCard,    label: 'Payments'    },
    { href: '/student/portfolio',    Icon: HiUserCircle,    label: 'Portfolio'   },
    { href: '/student/affiliate',    Icon: HiGift,          label: 'Affiliate'   },
  ],
  
  instructor: [
    { href: '/instructor/courses', Icon: HiCollection, label: 'My Courses' },
    { href: '/instructor/lessons', Icon: HiAnnotation, label: 'Lessons'    },
  ],
  
  admin: [
    { href: '/admin',          Icon: HiChartBar,       label: 'Branch Overview'},
    { href: '/admin/courses',  Icon: HiCollection,    label: 'Courses'   },
    { href: '/admin/students', Icon: HiUserGroup,     label: 'Students'  },
    { href: '/admin/payments', Icon: HiCreditCard,    label: 'Payments'  },
    { href: '/admin/staff',    Icon: HiUsers,         label: 'Staff Room'},
    { href: '/admin/assets',   Icon: HiClipboardList, label: 'Assets' },
    { href: '/admin/crm',      Icon: HiAnnotation,    label: 'Leads/CRM' },
  ],
  
  super_admin: [
    { href: '/super',             Icon: HiChartBar,     label: 'Global Stats' },
    { href: '/super/branches',    Icon: HiHome,         label: 'All Branches' },
    { href: '/super/users',       Icon: HiUsers,        label: 'Global Users' },
    { href: '/super/curriculum',  Icon: HiAcademicCap,  label: 'Master Courses'},
    { href: '/super/finance',     Icon: HiCreditCard,   label: 'Global Finance'},
    { href: '/super/reports',     Icon: HiClipboardList,label: 'Audit Reports'},
  ],
};

export const SUPPORT_LINKS = [
  { href: '/student/support', Icon: HiAnnotation, label: 'Support Hub' },
  { href: '/contact',         Icon: HiHome,       label: 'Help Center' },
  { href: '/profile',         Icon: HiUserCircle, label: 'Profile Settings' },
];
