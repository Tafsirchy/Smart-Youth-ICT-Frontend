/* ─── NAVBAR CONFIGURATION & NAVIGATION DATA ────────────────────────── */

export const aboutColumns = [
  {
    id: "foundation",
    heading: "Overview",
    icon: "🧭",
    iconTheme: "bg-emerald-100 text-emerald-600",
    items: [
      { label: "Our Story", href: "/about/story", desc: "How we started" },
      {
        label: "Mission & Vision",
        href: "/about/mission",
        desc: "Our goal & purpose",
      },
      {
        label: "How It Works",
        href: "/about/how-it-works",
        desc: "Step-by-step roadmap",
      },
      {
        label: "Why Choose Us",
        href: "/about/why-choose-us",
        desc: "Our unique edge",
      },
    ],
  },
  {
    id: "people",
    heading: "Leadership & Team",
    icon: "🤝",
    iconTheme: "bg-blue-100 text-blue-600",
    items: [
      {
        label: "Core Management",
        href: "/about/core-management",
        desc: "Executive leaders",
      },
      {
        label: "Advisory Board",
        href: "/about/advisor",
        desc: "Strategic guidance",
      },
      {
        label: "Our Mentors",
        href: "/about/instructors",
        desc: "Industry experts",
      },
    ],
  },
  {
    id: "impact",
    heading: "Impact & Stories",
    icon: "🏆",
    iconTheme: "bg-purple-100 text-purple-600",
    items: [
      {
        label: "Success Stories",
        href: "/success-stories",
        desc: "Student wins & career shifts",
      },
      {
        label: "Testimonials",
        href: "/testimonials",
        desc: "Reviews & video proof",
      },
      {
        label: "Certifications",
        href: "/about/certifications",
        desc: "Official proof & licenses",
      },
    ],
  },
  {
    id: "connect",
    heading: "Network & Connect",
    icon: "📍",
    iconTheme: "bg-pink-100 text-pink-600",
    items: [
      {
        label: "Partnership & Membership",
        href: "/about/partnership-membership",
        desc: "Affiliations & network",
      },
      {
        label: "Our Campuses",
        href: "/branches",
        desc: "13 physical hubs",
      },
      {
        label: "Contact Us",
        href: "/contact",
        desc: "Get in touch & counseling",
      },
      {
        label: "Blog & Updates",
        href: "/blog",
        desc: "Tech news & guides",
      },
    ],
  },
];

export const serviceColumns = [
  {
    id: "web",
    heading: "Web & Software",
    iconTheme: "bg-blue-100 text-blue-600",
    icon: "💻",
    items: [
      {
        label: "Business",
        href: "/services/business-websites",
        badge: "⭐ Popular ",
      },
      { label: "E-commerce", href: "/services/ecommerce" },
      { label: "Custom Web", href: "/services/custom-apps" },
      { label: "ERP / CRM / POS", href: "/services/erp-crm" },
    ],
    price: "",
  },
  {
    id: "design",
    heading: "Design & Marketing",
    iconTheme: "bg-purple-100 text-purple-600",
    icon: "🎨",
    items: [
      { label: "Logo & Brand Identity", href: "/services/branding" },
      { label: "UI/UX Design", href: "/services/ui-ux" },
      { label: "Social Media Creatives", href: "/services/social-creatives" },
      { label: "Facebook Ads Management", href: "/services/facebook-ads" },
      { label: "SEO Optimization", href: "/services/seo" },
    ],
    price: "",
  },
  {
    id: "ai",
    heading: "AI & Managed",
    iconTheme: "bg-emerald-100 text-emerald-600",
    icon: "🤖",
    items: [
      {
        label: "Chatbot Development",
        href: "/services/chatbot",
        badge: "✨ New ",
      },
      {
        label: "Business Automation",
        href: "/services/automation",
        badge: "✨ New ",
      },
      { label: "Domain & Hosting", href: "/services/hosting" },
      { label: "Website Maintenance", href: "/services/maintenance" },
      {
        label: "Hire a Student (Freelancer)",
        href: "/services/hire-student",
        badge: "🔥 Popular ",
      },
    ],
    price: "",
  },
];

export const BANGLADESH_DIVISIONS = [
  {
    division: "Barisal",
    name: "Barisal Division (Barishal)",
    shortName: "Barisal (Barishal)",
    aliases: ["Barisal", "Barishal"],
    desc: "Upcoming Regional Hub & Campus",
  },
  {
    division: "Chittagong",
    name: "Chittagong Division (Chattogram)",
    shortName: "Chittagong (Chattogram)",
    aliases: ["Chittagong", "Chattogram"],
    desc: "Agrabad, Chattagram & Cumilla Hubs",
  },
  {
    division: "Dhaka",
    name: "Dhaka Division",
    shortName: "Dhaka",
    aliases: ["Dhaka"],
    desc: "Corporate HQ, Mirpur, Gazipur Campuses",
  },
  {
    division: "Khulna",
    name: "Khulna Division",
    shortName: "Khulna",
    aliases: ["Khulna"],
    desc: "Jashore & Khulna Regional Hubs",
  },
  {
    division: "Mymensingh",
    name: "Mymensingh Division",
    shortName: "Mymensingh",
    aliases: ["Mymensingh"],
    desc: "Fulbaria, Netrakona, Sherpur Campuses",
  },
  {
    division: "Rajshahi",
    name: "Rajshahi Division",
    shortName: "Rajshahi",
    aliases: ["Rajshahi"],
    desc: "Bogura City Campus & Academic Hub",
  },
  {
    division: "Rangpur",
    name: "Rangpur Division",
    shortName: "Rangpur",
    aliases: ["Rangpur"],
    desc: "Rangpur Metropolitan & Regional Hubs",
  },
  {
    division: "Sylhet",
    name: "Sylhet Division",
    shortName: "Sylhet",
    aliases: ["Sylhet"],
    desc: "Upcoming Regional Hub & Campus",
  },
];

export const BRANCH_DIVISIONS = [
  {
    name: "All Divisions",
    division: "All",
    count: 14,
    desc: "View all 14 nationwide campuses",
  },
  ...BANGLADESH_DIVISIONS.map((d) => ({
    name: d.name,
    shortName: d.shortName,
    division: d.division,
    count:
      d.division === "Dhaka"
        ? 4
        : d.division === "Chittagong"
          ? 2
          : d.division === "Mymensingh"
            ? 3
            : d.division === "Rangpur"
              ? 3
              : d.division === "Rajshahi"
                ? 1
                : d.division === "Khulna"
                  ? 1
                  : 0,
    desc: d.desc,
  })),
];

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/courses", label: "Courses" },
];
