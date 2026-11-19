"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import api from "@/lib/api";
import ToolchainMarquee from "@/components/ui/toolchain-marquee";
import {
  SiPython,
  SiJavascript,
  SiTypescript,
  SiPhp,
  SiGo,
  SiRust,
  SiCplusplus,
  SiKotlin,
  SiSwift,
  SiDart,
  SiHtml5,
  SiCss,
  SiTailwindcss,
  SiSass,
  SiReact,
  SiNextdotjs,
  SiNodedotjs,
  SiExpress,
  SiDjango,
  SiFastapi,
  SiLaravel,
  SiSpringboot,
  SiFlutter,
  SiPostgresql,
  SiMongodb,
  SiRedis,
  SiDocker,
  SiKubernetes,
  SiCloudflare,
  SiLinux,
} from "react-icons/si";
import { TbBrandCSharp } from "react-icons/tb";
import { FaAws, FaJava } from "react-icons/fa6";
import { IoCodeWorkingOutline, IoSparkles } from "react-icons/io5";

// Production fallback for all Languages, Markups, Frameworks & Cloud
const DEFAULT_TECH = [
  // ── True Programming Languages ──
  {
    _id: "t-1",
    name: "Python",
    category: "language",
    badge: "AI / Data",
    color: "#3776AB",
    order: 1,
  },
  {
    _id: "t-2",
    name: "JavaScript",
    category: "language",
    badge: "Fullstack",
    color: "#F7DF1E",
    order: 2,
  },
  {
    _id: "t-3",
    name: "TypeScript",
    category: "language",
    badge: "Type-Safe",
    color: "#3178C6",
    order: 3,
  },
  {
    _id: "t-4",
    name: "PHP",
    category: "language",
    badge: "Web Engine",
    color: "#777BB4",
    order: 4,
  },
  {
    _id: "t-5",
    name: "Go",
    category: "language",
    badge: "Microservices",
    color: "#00ADD8",
    order: 5,
  },
  {
    _id: "t-6",
    name: "Rust",
    category: "language",
    badge: "Systems / WASM",
    color: "#DEA584",
    order: 6,
  },
  {
    _id: "t-7",
    name: "Java",
    category: "language",
    badge: "Enterprise JVM",
    color: "#ED8B00",
    order: 7,
  },
  {
    _id: "t-8",
    name: "C++",
    category: "language",
    badge: "High-Perf",
    color: "#00599C",
    order: 8,
  },
  {
    _id: "t-9",
    name: "C#",
    category: "language",
    badge: ".NET Core",
    color: "#239120",
    order: 9,
  },
  {
    _id: "t-10",
    name: "Kotlin",
    category: "language",
    badge: "Android Native",
    color: "#7F52FF",
    order: 10,
  },
  {
    _id: "t-11",
    name: "Swift",
    category: "language",
    badge: "iOS Native",
    color: "#F05138",
    order: 11,
  },
  {
    _id: "t-12",
    name: "Dart",
    category: "language",
    badge: "Mobile UI",
    color: "#0175C2",
    order: 12,
  },

  // ── Markup & Style Languages ──
  {
    _id: "t-13",
    name: "HTML5",
    category: "markup",
    badge: "Semantic Web",
    color: "#E34F26",
    order: 13,
  },
  {
    _id: "t-14",
    name: "CSS3",
    category: "markup",
    badge: "Layout Core",
    color: "#1572B6",
    order: 14,
  },
  {
    _id: "t-15",
    name: "Tailwind CSS",
    category: "markup",
    badge: "Design Tokens",
    color: "#06B6D4",
    order: 15,
  },
  {
    _id: "t-16",
    name: "Sass/SCSS",
    category: "markup",
    badge: "Preprocessor",
    color: "#CC6699",
    order: 16,
  },

  // ── Libraries and Frameworks ──
  {
    _id: "t-17",
    name: "React",
    category: "framework",
    badge: "Reactive UI",
    color: "#61DAFB",
    order: 17,
  },
  {
    _id: "t-18",
    name: "Next.js",
    category: "framework",
    badge: "Fullstack Edge",
    color: "#000000",
    order: 18,
  },
  {
    _id: "t-19",
    name: "Node.js",
    category: "framework",
    badge: "Runtime Engine",
    color: "#339933",
    order: 19,
  },
  {
    _id: "t-20",
    name: "Express",
    category: "framework",
    badge: "Micro-APIs",
    color: "#444444",
    order: 20,
  },
  {
    _id: "t-21",
    name: "Django",
    category: "framework",
    badge: "Python Web",
    color: "#092E20",
    order: 21,
  },
  {
    _id: "t-22",
    name: "FastAPI",
    category: "framework",
    badge: "Async APIs",
    color: "#009688",
    order: 22,
  },
  {
    _id: "t-23",
    name: "Laravel",
    category: "framework",
    badge: "PHP Ecosystem",
    color: "#FF2D20",
    order: 23,
  },
  {
    _id: "t-24",
    name: "Spring Boot",
    category: "framework",
    badge: "Microservices",
    color: "#6DB33F",
    order: 24,
  },
  {
    _id: "t-25",
    name: "Flutter",
    category: "framework",
    badge: "Multi-Platform",
    color: "#02569B",
    order: 25,
  },

  // ── Databases, Cloud & DevOps ──
  {
    _id: "t-26",
    name: "PostgreSQL",
    category: "database",
    badge: "ACID Relational",
    color: "#4169E1",
    order: 26,
  },
  {
    _id: "t-27",
    name: "MongoDB",
    category: "database",
    badge: "NoSQL JSON",
    color: "#47A248",
    order: 27,
  },
  {
    _id: "t-28",
    name: "Redis",
    category: "database",
    badge: "In-Memory Speed",
    color: "#DC382D",
    order: 28,
  },
  {
    _id: "t-29",
    name: "Docker",
    category: "devops_cloud",
    badge: "Containers",
    color: "#2496ED",
    order: 29,
  },
  {
    _id: "t-30",
    name: "Kubernetes",
    category: "devops_cloud",
    badge: "Cluster K8s",
    color: "#326CE5",
    order: 30,
  },
  {
    _id: "t-31",
    name: "AWS",
    category: "devops_cloud",
    badge: "Cloud Platform",
    color: "#FF9900",
    order: 31,
  },
  {
    _id: "t-32",
    name: "Cloudflare",
    category: "devops_cloud",
    badge: "Edge CDN",
    color: "#F38020",
    order: 32,
  },
  {
    _id: "t-33",
    name: "Linux",
    category: "devops_cloud",
    badge: "Kernel Core",
    color: "#FCC624",
    order: 33,
  },
];

function getTechIcon(name) {
  const n = (name || "").toLowerCase().replace(/[^a-z0-9]/g, "");
  switch (n) {
    case "python":
      return <SiPython />;
    case "javascript":
    case "js":
      return <SiJavascript />;
    case "typescript":
    case "ts":
      return <SiTypescript />;
    case "php":
      return <SiPhp />;
    case "go":
    case "golang":
      return <SiGo />;
    case "rust":
      return <SiRust />;
    case "java":
      return <FaJava />;
    case "cplusplus":
    case "cpp":
    case "c":
      return <SiCplusplus />;
    case "csharp":
    case "cs":
      return <TbBrandCSharp />;
    case "kotlin":
      return <SiKotlin />;
    case "swift":
      return <SiSwift />;
    case "dart":
      return <SiDart />;
    case "html5":
    case "html":
      return <SiHtml5 />;
    case "css3":
    case "css":
      return <SiCss />;
    case "tailwindcss":
    case "tailwind":
      return <SiTailwindcss />;
    case "sass":
    case "scss":
      return <SiSass />;
    case "react":
    case "reactjs":
    case "reactnative":
      return <SiReact />;
    case "nextjs":
    case "next":
      return <SiNextdotjs />;
    case "nodejs":
    case "node":
      return <SiNodedotjs />;
    case "express":
    case "expressjs":
      return <SiExpress />;
    case "django":
      return <SiDjango />;
    case "fastapi":
      return <SiFastapi />;
    case "laravel":
      return <SiLaravel />;
    case "springboot":
    case "spring":
      return <SiSpringboot />;
    case "flutter":
      return <SiFlutter />;
    case "postgresql":
    case "postgres":
      return <SiPostgresql />;
    case "mongodb":
    case "mongo":
      return <SiMongodb />;
    case "redis":
      return <SiRedis />;
    case "docker":
      return <SiDocker />;
    case "kubernetes":
    case "k8s":
      return <SiKubernetes />;
    case "aws":
    case "amazon":
      return <FaAws />;
    case "cloudflare":
      return <SiCloudflare />;
    case "linux":
      return <SiLinux />;
    default:
      return <IoCodeWorkingOutline />;
  }
}

export default function TechStackStrip() {
  const [techItems, setTechItems] = useState(DEFAULT_TECH);

  useEffect(() => {
    let isMounted = true;
    api
      .get("/cms/home-tech")
      .then((res) => {
        if (isMounted && res.data?.data && res.data.data.length > 0) {
          setTechItems(res.data.data);
        }
      })
      .catch(() => {
        // Fallback silently kept
      });
    return () => {
      isMounted = false;
    };
  }, []);

  const list = techItems && techItems.length > 0 ? techItems : DEFAULT_TECH;

  // 1. True Programming Languages
  const languagesStack = list
    .filter((i) => i.category === "language")
    .map((i) => ({
      label: i.name,
      icon: getTechIcon(i.name),
      accent: i.color || "#3776AB",
    }));

  // 2. Libraries & Frameworks
  const frameworksStack = list
    .filter((i) => i.category === "framework")
    .map((i) => ({
      label: i.name,
      icon: getTechIcon(i.name),
      accent: i.color || "#61DAFB",
    }));

  // 3. Markup & Style Languages
  const markupsStack = list
    .filter((i) => i.category === "markup")
    .map((i) => ({
      label: i.name,
      icon: getTechIcon(i.name),
      accent: i.color || "#06B6D4",
    }));

  // 4. Databases, Cloud & DevOps
  const cloudStack = list
    .filter((i) => i.category === "database" || i.category === "devops_cloud")
    .map((i) => ({
      label: i.name,
      icon: getTechIcon(i.name),
      accent: i.color || "#FF9900",
    }));

  const stacks = [
    languagesStack,
    frameworksStack,
    markupsStack,
    cloudStack,
  ].filter((s) => s.length > 0);

  return (
    <section className="relative w-full overflow-hidden bg-white py-12 sm:py-16 border-b border-slate-200/80 font-sans">
      <motion.div
        initial={{ opacity: 0, y: 36 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        className="container-custom mb-8 text-center"
      >
        <p className="text-[10px] sm:text-xs font-black uppercase tracking-[0.22em] text-emerald-600 mb-2">
          Full Toolchain &amp; Engineering Arsenal
        </p>

        <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 leading-[1.15] tracking-tight mb-3">
          Technologies Our Engineers &amp; <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-500">
            Learners Build With
          </span>
        </h2>

        <p className="text-sm sm:text-lg text-slate-600 max-w-3xl mx-auto font-normal leading-[1.6]">
          Beyond basic tutorials. Our engineers and students build
          commercial-grade software using modern frameworks and cloud
          infrastructure.
        </p>
      </motion.div>

      {/* Multi-Row Toolchain Marquee with Play/Pause Control */}
      <motion.div
        initial={{ opacity: 0, y: 32, scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
        className="relative py-2 px-2 sm:px-4"
      >
        <ToolchainMarquee
          stacks={stacks}
          rows={stacks.length}
          duration={28}
          showControl={true}
        />
      </motion.div>
    </section>
  );
}
