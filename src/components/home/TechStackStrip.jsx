"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import { queryKeys } from "@/lib/queryKeys";
import {
  SiPython,
  SiJavascript,
  SiTypescript,
  SiPhp,
  SiGo,
  SiRust,
  SiOpenjdk,
  SiCplusplus,
  SiCsharp,
  SiKotlin,
  SiSwift,
  SiDart,
  SiHtml5,
  SiCss3,
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
  SiAmazonwebservices,
  SiCloudflare,
  SiLinux
} from "react-icons/si";
import { IoCodeWorkingOutline, IoSparkles } from "react-icons/io5";

// Production fallback in case DB is fresh
const DEFAULT_TECH = [
  // Languages
  { _id: "t-1", name: "Python", category: "language", badge: "AI / Data", color: "#3776AB", order: 1 },
  { _id: "t-2", name: "JavaScript", category: "language", badge: "Fullstack", color: "#F7DF1E", order: 2 },
  { _id: "t-3", name: "TypeScript", category: "language", badge: "Type-Safe", color: "#3178C6", order: 3 },
  { _id: "t-4", name: "PHP", category: "language", badge: "Web Engine", color: "#777BB4", order: 4 },
  { _id: "t-5", name: "Go", category: "language", badge: "Microservices", color: "#00ADD8", order: 5 },
  { _id: "t-6", name: "Rust", category: "language", badge: "Systems / WASM", color: "#DEA584", order: 6 },
  { _id: "t-7", name: "Java", category: "language", badge: "Enterprise JVM", color: "#ED8B00", order: 7 },
  { _id: "t-8", name: "C++", category: "language", badge: "High-Perf", color: "#00599C", order: 8 },
  { _id: "t-9", name: "C#", category: "language", badge: ".NET Core", color: "#239120", order: 9 },
  { _id: "t-10", name: "Kotlin", category: "language", badge: "Android Native", color: "#7F52FF", order: 10 },
  { _id: "t-11", name: "Swift", category: "language", badge: "iOS Native", color: "#F05138", order: 11 },
  { _id: "t-12", name: "Dart", category: "language", badge: "Mobile UI", color: "#0175C2", order: 12 },

  // Markup & Styles
  { _id: "t-13", name: "HTML5", category: "markup", badge: "Semantic Web", color: "#E34F26", order: 13 },
  { _id: "t-14", name: "CSS3", category: "markup", badge: "Layout Core", color: "#1572B6", order: 14 },
  { _id: "t-15", name: "Tailwind CSS", category: "markup", badge: "Design Tokens", color: "#06B6D4", order: 15 },
  { _id: "t-16", name: "Sass/SCSS", category: "markup", badge: "Preprocessor", color: "#CC6699", order: 16 },

  // Frameworks
  { _id: "t-17", name: "React", category: "framework", badge: "Reactive UI", color: "#61DAFB", order: 17 },
  { _id: "t-18", name: "Next.js", category: "framework", badge: "Fullstack Edge", color: "#000000", order: 18 },
  { _id: "t-19", name: "Node.js", category: "framework", badge: "Runtime Engine", color: "#339933", order: 19 },
  { _id: "t-20", name: "Express", category: "framework", badge: "Micro-APIs", color: "#444444", order: 20 },
  { _id: "t-21", name: "Django", category: "framework", badge: "Python Web", color: "#092E20", order: 21 },
  { _id: "t-22", name: "FastAPI", category: "framework", badge: "Async APIs", color: "#009688", order: 22 },
  { _id: "t-23", name: "Laravel", category: "framework", badge: "PHP Ecosystem", color: "#FF2D20", order: 23 },
  { _id: "t-24", name: "Spring Boot", category: "framework", badge: "Microservices", color: "#6DB33F", order: 24 },
  { _id: "t-25", name: "Flutter", category: "framework", badge: "Multi-Platform", color: "#02569B", order: 25 },

  // Databases & Cloud
  { _id: "t-26", name: "PostgreSQL", category: "database", badge: "ACID Relational", color: "#4169E1", order: 26 },
  { _id: "t-27", name: "MongoDB", category: "database", badge: "NoSQL JSON", color: "#47A248", order: 27 },
  { _id: "t-28", name: "Redis", category: "database", badge: "In-Memory Speed", color: "#DC382D", order: 28 },
  { _id: "t-29", name: "Docker", category: "devops_cloud", badge: "Containers", color: "#2496ED", order: 29 },
  { _id: "t-30", name: "Kubernetes", category: "devops_cloud", badge: "Cluster K8s", color: "#326CE5", order: 30 },
  { _id: "t-31", name: "AWS", category: "devops_cloud", badge: "Cloud Platform", color: "#FF9900", order: 31 },
  { _id: "t-32", name: "Cloudflare", category: "devops_cloud", badge: "Edge CDN", color: "#F38020", order: 32 },
  { _id: "t-33", name: "Linux", category: "devops_cloud", badge: "Kernel Core", color: "#FCC624", order: 33 },
];

function getTechIcon(name) {
  const n = (name || "").toLowerCase().replace(/[^a-z0-9]/g, "");
  switch (n) {
    case "python": return <SiPython />;
    case "javascript": case "js": return <SiJavascript />;
    case "typescript": case "ts": return <SiTypescript />;
    case "php": return <SiPhp />;
    case "go": case "golang": return <SiGo />;
    case "rust": return <SiRust />;
    case "java": return <SiOpenjdk />;
    case "cplusplus": case "cpp": case "c": return <SiCplusplus />;
    case "csharp": case "cs": return <SiCsharp />;
    case "kotlin": return <SiKotlin />;
    case "swift": return <SiSwift />;
    case "dart": return <SiDart />;
    case "html5": case "html": return <SiHtml5 />;
    case "css3": case "css": return <SiCss3 />;
    case "tailwindcss": case "tailwind": return <SiTailwindcss />;
    case "sass": case "scss": return <SiSass />;
    case "react": case "reactjs": case "reactnative": return <SiReact />;
    case "nextjs": case "next": return <SiNextdotjs />;
    case "nodejs": case "node": return <SiNodedotjs />;
    case "express": case "expressjs": return <SiExpress />;
    case "django": return <SiDjango />;
    case "fastapi": return <SiFastapi />;
    case "laravel": return <SiLaravel />;
    case "springboot": case "spring": return <SiSpringboot />;
    case "flutter": return <SiFlutter />;
    case "postgresql": case "postgres": return <SiPostgresql />;
    case "mongodb": case "mongo": return <SiMongodb />;
    case "redis": return <SiRedis />;
    case "docker": return <SiDocker />;
    case "kubernetes": case "k8s": return <SiKubernetes />;
    case "aws": case "amazon": return <SiAmazonwebservices />;
    case "cloudflare": return <SiCloudflare />;
    case "linux": return <SiLinux />;
    default: return <IoCodeWorkingOutline />;
  }
}

function getCategoryPill(cat) {
  switch (cat) {
    case "language":
      return <span className="text-[10px] font-black uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">Language</span>;
    case "markup":
      return <span className="text-[10px] font-black uppercase tracking-wider text-sky-600 bg-sky-50 px-2 py-0.5 rounded">Markup / UI</span>;
    case "framework":
      return <span className="text-[10px] font-black uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">Framework</span>;
    case "database":
      return <span className="text-[10px] font-black uppercase tracking-wider text-amber-600 bg-amber-50 px-2 py-0.5 rounded">Database</span>;
    case "devops_cloud":
      return <span className="text-[10px] font-black uppercase tracking-wider text-purple-600 bg-purple-50 px-2 py-0.5 rounded">Cloud / DevOps</span>;
    default:
      return <span className="text-[10px] font-black uppercase tracking-wider text-slate-600 bg-slate-100 px-2 py-0.5 rounded">Tech</span>;
  }
}

function TechCard({ item }) {
  return (
    <div className="flex min-w-[210px] shrink-0 items-center gap-3.5 border border-slate-200/80 bg-white/95 px-4 py-2.5 shadow-xs backdrop-blur-sm transition-all duration-300 hover:border-indigo-400 hover:shadow-md hover:-translate-y-0.5 rounded-lg group">
      <div 
        className="flex h-10 w-10 shrink-0 items-center justify-center text-xl rounded-lg border border-slate-100 transition-transform group-hover:scale-110"
        style={{ color: item.color || "#10B981", backgroundColor: `${item.color || "#10B981"}10` }}
      >
        {getTechIcon(item.name)}
      </div>

      <div className="flex flex-col text-left">
        <div className="flex items-center gap-2">
          <p className="whitespace-nowrap text-sm font-extrabold tracking-tight text-slate-800 group-hover:text-indigo-600 transition-colors">
            {item.name}
          </p>
        </div>
        <div className="flex items-center gap-1.5 mt-0.5">
          {getCategoryPill(item.category)}
          {item.badge && (
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest hidden sm:inline">
              • {item.badge}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default function TechStackStrip() {
  const { data: techItems } = useQuery({
    queryKey: queryKeys.homeTechStacks(),
    queryFn: async () => {
      try {
        const res = await api.get("/cms/home-tech");
        return res.data?.data && res.data.data.length > 0 ? res.data.data : DEFAULT_TECH;
      } catch (err) {
        return DEFAULT_TECH;
      }
    },
    staleTime: 5 * 60 * 1000,
  });

  const list = techItems && techItems.length > 0 ? techItems : DEFAULT_TECH;
  
  // Split into 2 rows for rich visual density
  const row1 = list.slice(0, Math.ceil(list.length / 2));
  const row2 = list.slice(Math.ceil(list.length / 2));

  const duplicatedRow1 = [...row1, ...row1];
  const duplicatedRow2 = [...row2, ...row2];

  return (
    <section className="relative w-full overflow-hidden bg-white py-10 sm:py-12 border-b border-slate-200/80 font-sans">
      <div className="container-custom px-4 sm:px-6 md:px-12 mb-6 sm:mb-8 text-center">
        <p className="text-[10px] sm:text-xs font-black uppercase tracking-[0.22em] text-indigo-600 mb-2">
          Engineering Arsenal &amp; Tech Stack
        </p>
        
        <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-slate-900 leading-[1.15] tracking-tight mb-3">
          Technologies Our Engineers &amp;{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
            Learners Build With
          </span>
        </h2>
        
        <p className="text-xs sm:text-sm text-slate-600 max-w-2xl mx-auto font-normal leading-relaxed">
          Not just basic tutorials or generic coaching — our engineers and students engineer commercial-grade software using industry-standard programming languages, modern frameworks, and cloud infrastructure.
        </p>
      </div>

      {/* Row 1: Leftward Marquee */}
      <div className="relative overflow-hidden py-1.5 group mb-3">
        <div className="marquee-left flex w-max gap-3.5 px-4 motion-gpu group-hover:[animation-play-state:paused]">
          {duplicatedRow1.map((item, idx) => (
            <TechCard key={`tech-r1-${item._id || item.name}-${idx}`} item={item} />
          ))}
        </div>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-12 sm:w-20 bg-gradient-to-r from-white to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-12 sm:w-20 bg-gradient-to-l from-white to-transparent z-10" />
      </div>

      {/* Row 2: Rightward (Reverse) Marquee */}
      <div className="relative overflow-hidden py-1.5 group">
        <div className="marquee-right flex w-max gap-3.5 px-4 motion-gpu group-hover:[animation-play-state:paused]">
          {duplicatedRow2.map((item, idx) => (
            <TechCard key={`tech-r2-${item._id || item.name}-${idx}`} item={item} />
          ))}
        </div>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-12 sm:w-20 bg-gradient-to-r from-white to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-12 sm:w-20 bg-gradient-to-l from-white to-transparent z-10" />
      </div>

      <style jsx>{`
        .marquee-left {
          animation: marquee-left 34s linear infinite;
          will-change: transform;
        }
        .marquee-right {
          animation: marquee-right 34s linear infinite;
          will-change: transform;
        }
        @keyframes marquee-left {
          0% {
            transform: translate3d(0%, 0, 0);
          }
          100% {
            transform: translate3d(-50%, 0, 0);
          }
        }
        @keyframes marquee-right {
          0% {
            transform: translate3d(-50%, 0, 0);
          }
          100% {
            transform: translate3d(0%, 0, 0);
          }
        }
      `}</style>
    </section>
  );
}
