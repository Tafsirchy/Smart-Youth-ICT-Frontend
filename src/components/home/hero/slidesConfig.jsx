"use client";

// ─── Slide Data / Config (4-Slide Enterprise Structure) ───────────────────────
// Slide 1: Full-Spectrum Custom IT Solutions & Web/Mobile Architecture
// Slide 2: 13+ Ready-Made ERP & Commercial Softwares (Client Requirement #1)
// Slide 3: Next-Gen AI Solutions, Cloud DevOps & 24/7 Managed IT (Client Requirement #5)
// Slide 4: Real Industrial Apprenticeship & Production Projects (Industry Attachment & Hire Talent)

export const slidesConfig = [
  {
    id: 1,
    bgColor: "#EFF6F3",
    label: "FULL-SPECTRUM IT SERVICES • SMART YOUTH ICT",
    heading: (
      <>
        Any IT Solution <br />
        <span className="text-orange-500">Your Business Ever Needs</span>
      </>
    ),
    description:
      "From bespoke software, mobile apps, and modern web portals to cloud DevOps and enterprise cybersecurity — engineered for scalable performance.",
    primaryBtn: { text: "Consult with Us", href: "/contact" },
    secondaryBtn: { text: "Our Services 🚀", href: "/services" },
    image: "/images/hero-slide-1.png",
    type: "collage",
    isDark: false,
  },
  {
    id: 2,
    bgColor: "#0F7C5A",
    bgGradient: "linear-gradient(135deg, #0F7C5A 0%, #178964 100%)",
    bgBanner: "linear-gradient(135deg, #0F7C5A 0%, #178964 100%)",
    badge: "13+ READY-MADE ERP SOFTWARE",
    heading: (
      <>
        13+ Ready-Made ERP <br />
        <span className="text-[#13DC9D]">& Commercial Softwares</span> Ready to Deploy
      </>
    ),
    description:
      "Instant-launch business platforms: POS & Inventory, Clinic & Hospital ERP, NGO & Microfinance, HR-Payroll & Accounts, Restaurant POS, and Co-operative Loan Management.",
    primaryBtn: {
      text: "Explore 13+ ERPs",
      href: "/services",
      color: "#13DC9D",
      textColor: "#0F7C5A",
    },
    secondaryBtn: {
      text: "Request a Demo",
      href: "/contact",
    },
    image: "/images/slider2/Smiling Workspace Cutout with Laptop and Plant.png",
    type: "geometric",
    isDark: true,
    stats: [
      { value: "13+", label: "Ready ERPs" },
      { value: "50+", label: "Enterprise Clients" },
      { value: "24/7", label: "Technical Support" },
    ],
  },
  {
    id: 3,
    bgColor: "#D5F2E3",
    bgGradient: "linear-gradient(135deg, #F0FAF4 0%, #D5F2E3 50%, #C6ECD8 100%)",
    bgBanner: "linear-gradient(135deg, #F0FAF4 0%, #D5F2E3 50%, #C6ECD8 100%)",
    badge: "ENTERPRISE AI & MANAGED CLOUD",
    heading: (
      <>
        Enterprise AI Solutions, <br />
        <span className="bg-gradient-to-r from-[#003D46] via-[#057A78] to-[#0D9488] bg-clip-text text-transparent">
          Cloud DevOps & 24/7 Managed IT
        </span>
      </>
    ),
    description:
      "From intelligent AI chatbots and autonomous business workflows to AWS/Azure cloud architecture, Zero-Trust cybersecurity, and 24/7 IT helpdesk contracts (AMC).",
    primaryBtn: {
      text: "Explore AI & Cloud",
      href: "/services",
      color: "#003D46",
      textColor: "#FFFFFF",
    },
    secondaryBtn: {
      text: "Security Audit 🛡️",
      href: "/contact",
    },
    type: "ai-cloud",
    isDark: false,
  },
  {
    id: 4,
    bgColor: "#FDF8F7",
    label: "REAL INDUSTRY ATTACHMENT • NOT GENERIC COURSES",
    heading: (
      <>
        Industrial Apprenticeship <br />
        <span className="text-[#A85161]">& Live Production Projects</span>
      </>
    ),
    description:
      "No generic training or freelancing hype. Work directly on live production software, real client architectures, and enterprise engineering pipelines.",
    primaryBtn: {
      text: "Explore Programs",
      href: "/courses",
      color: "#4A2C2E",
      textColor: "#FFFFFF",
    },
    secondaryBtn: {
      text: "Hire Talent / Freelancer 🎓",
      href: "/contact",
    },
    image: "/images/hero-slide-3.png",
    archImage: "/images/hero-slide-4.png",
    type: "dual-portrait",
    isDark: false,
  },
];
