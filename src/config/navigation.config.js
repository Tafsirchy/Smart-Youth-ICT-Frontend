import {
  HiHome, HiAcademicCap, HiChartBar, HiClipboardList,
  HiBadgeCheck, HiCreditCard, HiUsers, HiUserGroup,
  HiAnnotation, HiCollection, HiUserCircle, HiGift,
  HiGlobeAlt, HiBriefcase, HiLightningBolt, HiSparkles,
  HiChatAlt2, HiPuzzle, HiServer, HiShieldCheck, HiUserAdd,
  HiDesktopComputer, HiReceiptTax, HiCalendar, HiIdentification,
  HiTag, HiSpeakerphone
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
    { href: '/student/routine',      Icon: HiCalendar,      label: 'Class Routine' },
    { href: '/student/notices',      Icon: HiSpeakerphone,  label: 'Notices & Alerts' },
    { href: '/student/progress',     Icon: HiChartBar,      label: 'Progress'    },
    { href: '/student/assignments',  Icon: HiClipboardList, label: 'Assignments' },
    { href: '/student/certificates', Icon: HiBadgeCheck,    label: 'Certificates'},
    { href: '/student/id-card',      Icon: HiIdentification, label: 'Student ID' },
    { href: '/student/payments',     Icon: HiCreditCard,    label: 'Payments'    },
    { href: '/student/portfolio',    Icon: HiUserCircle,    label: 'Portfolio'   },
    { href: '/student/affiliate',    Icon: HiGift,          label: 'Affiliate'   },
  ],
  
  instructor: [
    { href: '/instructor/courses', Icon: HiCollection, label: 'My Courses' },
    { href: '/instructor/lessons', Icon: HiAnnotation, label: 'Lessons'    },
  ],
  
  admin: [
    { href: '/admin',          Icon: HiChartBar,       label: 'Branch Overview', permission: null },
    { href: '/admin/courses',  Icon: HiCollection,    label: 'Courses',          permission: 'courses:view' },
    { href: '/admin/routines', Icon: HiClipboardList, label: 'Class Routines',   permission: 'courses:view' },
    { href: '/admin/students', Icon: HiUserGroup,     label: 'Students',         permission: 'students:view' },
    { href: '/admin/payments', Icon: HiCreditCard,    label: 'Payments',         permission: 'payments:view' },
    { href: '/admin/coupons',  Icon: HiTag,           label: 'Coupons & Promos', permission: 'payments:view' },
    { href: '/admin/notices',  Icon: HiSpeakerphone,  label: 'Notice Board',     permission: null },
    { href: '/admin/expenses', Icon: HiReceiptTax,    label: 'Expenses & P&L',   permission: 'staff:manage' },
    { href: '/admin/counseling', Icon: HiCalendar,    label: 'Counseling Hub',   permission: 'leads:view' },
    { href: '/admin/staff',    Icon: HiUsers,         label: 'Staff Room',       permission: 'staff:manage' },
    { href: '/admin/crm',      Icon: HiAnnotation,    label: 'Leads/CRM',        permission: 'leads:view' },
    { href: '/admin/seminars', Icon: HiAcademicCap,   label: 'Seminars',         permission: 'seminars:view' },
    { href: '/admin/assets',   Icon: HiDesktopComputer, label: 'Assets & Lab',   permission: 'staff:manage' },
    { href: '/admin/affiliate', Icon: HiGift,         label: 'Affiliates',       adminOnly: true },
    { href: '/admin/blog',     Icon: HiAnnotation,    label: 'Blog',             adminOnly: true },
    { href: '/admin/testimonials', Icon: HiBadgeCheck,label: 'Testimonials',     adminOnly: true },
  ],
  
  super_admin: [
    { href: '/super',             Icon: HiChartBar,     label: 'Global Stats' },
    { href: '/super/branches',    Icon: HiHome,         label: 'All Branches' },
    { href: '/super/users',       Icon: HiUsers,        label: 'Global Users' },
    { href: '/super/curriculum',  Icon: HiAcademicCap,  label: 'Master Courses'},
    { href: '/super/finance',     Icon: HiCreditCard,   label: 'Global Finance'},
    { href: '/super/payments',    Icon: HiCreditCard,   label: 'Global Payments'},
    { href: '/super/reports',     Icon: HiClipboardList,label: 'Audit Reports'},
  ],

  about_cms: [
    { href: '/super/cms/courses-hero',    Icon: HiCollection,   label: 'Courses Hero' },
    { href: '/super/cms/team',            Icon: HiUsers,        label: 'Core Management' },
    { href: '/super/cms/advisory',        Icon: HiUserGroup,    label: 'Advisory Board' },
    { href: '/super/cms/mentors',         Icon: HiAcademicCap,  label: 'Our Mentors' },
    { href: '/super/cms/success-stories', Icon: HiBadgeCheck,    label: 'Success Stories' },
    { href: '/super/cms/testimonials',    Icon: HiAnnotation,   label: 'Testimonials' },
    { href: '/super/cms/partners',        Icon: HiCollection,   label: 'Our Partners' },
    { href: '/super/cms/memberships',     Icon: HiPuzzle,       label: 'Memberships' },
    { href: '/super/cms/blogs',           Icon: HiAnnotation,   label: 'Blog Posts' },
  ],

  services_cms: [
    // Learning & Career
    { href: '/super/cms/services/skill-development', Icon: HiLightningBolt, label: 'Skill Development', category: 'Learning & Career' },
    { href: '/super/cms/services/career-tracks',     Icon: HiChartBar,      label: 'Career Tracks', category: 'Learning & Career' },
    { href: '/super/cms/services/certifications',    Icon: HiBadgeCheck,    label: 'Certification Programs', category: 'Learning & Career' },
    { href: '/super/cms/services/freelancing',       Icon: HiGlobeAlt,      label: 'Freelancing Training', category: 'Learning & Career' },
    { href: '/super/cms/services/job-placements',    Icon: HiBriefcase,     label: 'Job Placement Support', category: 'Learning & Career' },
    
    // Web & Software
    { href: '/super/cms/services/portfolio-websites', Icon: HiCollection,   label: 'Portfolio Websites', category: 'Web & Software' },
    { href: '/super/cms/services/business-websites',  Icon: HiBriefcase,    label: 'Business Websites', category: 'Web & Software' },
    { href: '/super/cms/services/ecommerce',          Icon: HiCreditCard,   label: 'E-commerce', category: 'Web & Software' },
    { href: '/super/cms/services/custom-apps',        Icon: HiLightningBolt, label: 'Custom Apps', category: 'Web & Software' },
    { href: '/super/cms/services/erp-crm',            Icon: HiChartBar,     label: 'ERP / CRM / POS', category: 'Web & Software' },

    // Design & Marketing
    { href: '/super/cms/services/branding',           Icon: HiSparkles,      label: 'Branding', category: 'Design & Marketing' },
    { href: '/super/cms/services/ui-ux',               Icon: HiCollection,    label: 'UI/UX Design', category: 'Design & Marketing' },
    { href: '/super/cms/services/social-creatives',   Icon: HiAnnotation,    label: 'Social Creatives', category: 'Design & Marketing' },
    { href: '/super/cms/services/facebook-ads',       Icon: HiLightningBolt, label: 'Facebook Ads', category: 'Design & Marketing' },
    { href: '/super/cms/services/seo',                Icon: HiGlobeAlt,      label: 'SEO Optimization', category: 'Design & Marketing' },

    // AI & Managed
    { href: '/super/cms/services/chatbot',          Icon: HiChatAlt2,      label: 'Chatbot Development', category: 'AI & Managed' },
    { href: '/super/cms/services/automation',       Icon: HiPuzzle,        label: 'Business Automation', category: 'AI & Managed' },
    { href: '/super/cms/services/hosting',          Icon: HiServer,        label: 'Domain & Hosting', category: 'AI & Managed' },
    { href: '/super/cms/services/maintenance',      Icon: HiShieldCheck,   label: 'Website Maintenance', category: 'AI & Managed' },
    { href: '/super/cms/services/hire-student',     Icon: HiUserAdd,       label: 'Hire a Student', category: 'AI & Managed' },
  ],
};

export const SUPPORT_LINKS = [
  { href: '/student/support', Icon: HiAnnotation, label: 'Support Hub' },
  { href: '/help',            Icon: HiHome,       label: 'Help Center' },
  { href: '/profile',         Icon: HiUserCircle, label: 'Profile Settings' },
];
