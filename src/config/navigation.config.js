import {
  HiHome, HiAcademicCap, HiChartBar, HiClipboardList,
  HiBadgeCheck, HiCreditCard, HiUsers, HiUserGroup,
  HiAnnotation, HiCollection, HiUserCircle, HiGift,
  HiGlobeAlt, HiBriefcase, HiLightningBolt, HiSparkles,
  HiChatAlt2, HiPuzzle, HiServer, HiShieldCheck, HiUserAdd
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

  about_cms: [
    { href: '/super/cms/team',            Icon: HiUsers,        label: 'Core Management' },
    { href: '/super/cms/advisory',        Icon: HiUserGroup,    label: 'Advisory Board' },
    { href: '/super/cms/mentors',         Icon: HiAcademicCap,  label: 'Our Mentors' },
    { href: '/super/cms/success-stories', Icon: HiBadgeCheck,    label: 'Success Stories' },
    { href: '/super/cms/testimonials',    Icon: HiAnnotation,   label: 'Testimonials' },
    { href: '/super/cms/partners',        Icon: HiCollection,   label: 'Our Partners' },
  ],

  learning_services_cms: [
    { href: '/super/cms/services/skill-development', Icon: HiLightningBolt, label: 'Skill Development' },
    { href: '/super/cms/services/career-tracks',     Icon: HiChartBar,      label: 'Career Tracks' },
    { href: '/super/cms/services/certifications',    Icon: HiBadgeCheck,    label: 'Certification Programs' },
    { href: '/super/cms/services/freelancing',       Icon: HiGlobeAlt,      label: 'Freelancing Training' },
    { href: '/super/cms/services/job-placements',    Icon: HiBriefcase,     label: 'Job Placement Support' },
  ],

  web_software_services_cms: [
    { href: '/super/cms/services/portfolio-websites', Icon: HiCollection,   label: 'Portfolio Websites' },
    { href: '/super/cms/services/business-websites',  Icon: HiBriefcase,    label: 'Business Websites' },
    { href: '/super/cms/services/ecommerce',          Icon: HiCreditCard,   label: 'E-commerce' },
    { href: '/super/cms/services/custom-apps',        Icon: HiLightningBolt, label: 'Custom Apps' },
    { href: '/super/cms/services/erp-crm',            Icon: HiChartBar,     label: 'ERP / CRM / POS' },
  ],

  design_marketing_services_cms: [
    { href: '/super/cms/services/branding',           Icon: HiSparkles,      label: 'Branding' },
    { href: '/super/cms/services/ui-ux',               Icon: HiCollection,    label: 'UI/UX Design' },
    { href: '/super/cms/services/social-creatives',   Icon: HiAnnotation,    label: 'Social Creatives' },
    { href: '/super/cms/services/facebook-ads',       Icon: HiLightningBolt, label: 'Facebook Ads' },
    { href: '/super/cms/services/seo',                Icon: HiGlobeAlt,      label: 'SEO Optimization' },
  ],

  ai_managed_services_cms: [
    { href: '/super/cms/services/chatbot',          Icon: HiChatAlt2,      label: 'Chatbot Development' },
    { href: '/super/cms/services/automation',       Icon: HiPuzzle,        label: 'Business Automation' },
    { href: '/super/cms/services/hosting',          Icon: HiServer,        label: 'Domain & Hosting' },
    { href: '/super/cms/services/maintenance',      Icon: HiShieldCheck,   label: 'Website Maintenance' },
    { href: '/super/cms/services/hire-student',     Icon: HiUserAdd,       label: 'Hire a Student' },
  ],
};

export const SUPPORT_LINKS = [
  { href: '/student/support', Icon: HiAnnotation, label: 'Support Hub' },
  { href: '/contact',         Icon: HiHome,       label: 'Help Center' },
  { href: '/profile',         Icon: HiUserCircle, label: 'Profile Settings' },
];
