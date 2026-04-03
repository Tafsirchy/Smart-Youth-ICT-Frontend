"use client";

import { motion } from "framer-motion";
import { 
  IoHardwareChipOutline, 
  IoColorPaletteOutline, 
  IoMegaphoneOutline, 
  IoLayersOutline,
  IoCodeWorkingOutline,
  IoVideocamOutline,
  IoCheckmarkCircle,
  IoShieldCheckmarkOutline,
  IoStatsChartOutline,
  IoCloudUploadOutline,
  IoBugOutline,
  IoGameControllerOutline,
  IoCreateOutline,
  IoBrushOutline
} from "react-icons/io5";

const programs = [
  {
    title: "Full-Stack Web Engineering",
    badge: "Most Demanded",
    description: "From HTML to advanced cloud deployments. Master the complete MERN stack (MongoDB, Express, React, Node.js) alongside Next.js and Tailwind.",
    tech: ["React", "Next.js", "Node", "MongoDB", "AWS"],
    icon: <IoHardwareChipOutline size={32} />,
    color: "from-blue-500 to-indigo-600",
    bg: "bg-blue-50",
    text: "text-blue-600",
  },
  {
    title: "UI/UX & Product Design",
    badge: "Creative Tech",
    description: "Master the psychology of user interfaces. Learn wireframing, high-fidelity prototyping, and complex design systems using Figma.",
    tech: ["Figma", "Prototyping", "Wireframes", "User Research"],
    icon: <IoColorPaletteOutline size={32} />,
    color: "from-pink-500 to-rose-600",
    bg: "bg-pink-50",
    text: "text-pink-600",
  },
  {
    title: "Digital Marketing Masterclass",
    badge: "High ROI",
    description: "Learn to run profitable campaigns across Meta, Google, and TikTok. Master technical SEO, copywriting, and data-driven marketing decisions.",
    tech: ["Meta Ads", "Google Ads", "SEO", "Analytics"],
    icon: <IoMegaphoneOutline size={32} />,
    color: "from-amber-400 to-orange-500",
    bg: "bg-amber-50",
    text: "text-amber-600",
  },
  {
    title: "Python & Applied AI",
    badge: "Trending",
    description: "Learn Python from scratch and move into data science and machine learning. Build AI wrappers and automate workflows using OpenAI APIs.",
    tech: ["Python", "Pandas", "Scikit", "OpenAI API"],
    icon: <IoCodeWorkingOutline size={32} />,
    color: "from-emerald-500 to-teal-600",
    bg: "bg-emerald-50",
    text: "text-emerald-600",
  },
  {
    title: "App Development (Flutter)",
    badge: "Mobile First",
    description: "Build natively compiled applications for mobile, web, and desktop from a single codebase using Google's UI toolkit.",
    tech: ["Dart", "Flutter", "Firebase", "State Mgmt"],
    icon: <IoLayersOutline size={32} />,
    color: "from-sky-400 to-blue-500",
    bg: "bg-sky-50",
    text: "text-sky-600",
  },
  {
    title: "Video Editing & Animation",
    badge: "Content Creation",
    description: "Master Premiere Pro and After Effects. Learn the art of storytelling through motion, color grading, and dynamic transitions.",
    tech: ["Premiere Pro", "After Effects", "DaVinci", "Coloring"],
    icon: <IoVideocamOutline size={32} />,
    color: "from-purple-500 to-indigo-500",
    bg: "bg-purple-50",
    text: "text-purple-600",
  },
  {
    title: "Cyber Security & Ethical Hacking",
    badge: "Protect & Defend",
    description: "Learn to identify vulnerabilities, perform penetration testing, and secure network infrastructures against modern digital threats.",
    tech: ["Kali Linux", "Metasploit", "Nmap", "Wireshark"],
    icon: <IoShieldCheckmarkOutline size={32} />,
    color: "from-red-500 to-rose-600",
    bg: "bg-red-50",
    text: "text-red-600",
  },
  {
    title: "Data Science & Analytics",
    badge: "Data Driven",
    description: "Master the art of data storytelling. Learn to clean, analyze, and visualize complex datasets to drive business decisions.",
    tech: ["Tableau", "SQL", "Power BI", "Statistics"],
    icon: <IoStatsChartOutline size={32} />,
    color: "from-teal-500 to-emerald-600",
    bg: "bg-teal-50",
    text: "text-teal-600",
  },
  {
    title: "Cloud Computing & DevOps",
    badge: "Scale Fast",
    description: "Learn to deploy and manage scalable infrastructure on AWS and Azure. Master CI/CD pipelines, Docker, and Kubernetes.",
    tech: ["AWS", "Azure", "Docker", "Kubernetes"],
    icon: <IoCloudUploadOutline size={32} />,
    color: "from-orange-500 to-yellow-600",
    bg: "bg-orange-50",
    text: "text-orange-600",
  },
  {
    title: "Software Quality Assurance",
    badge: "Quality First",
    description: "Learn manual and automated testing. Master bug tracking, test cases, and quality control for enterprise-level software.",
    tech: ["Selenium", "Jira", "Postman", "Cypress"],
    icon: <IoBugOutline size={32} />,
    color: "from-slate-700 to-slate-900",
    bg: "bg-slate-100",
    text: "text-slate-800",
  },
  {
    title: "Game Development (Unity)",
    badge: "Interactive Media",
    description: "Learn to build immersive 2D and 3D games for mobile and PC. Master C#, Unity Engine, and game physics from scratch.",
    tech: ["Unity 3D", "C#", "Level Design", "Blender"],
    icon: <IoGameControllerOutline size={32} />,
    color: "from-violet-500 to-purple-600",
    bg: "bg-violet-50",
    text: "text-violet-600",
  },
  {
    title: "Content Writing & Copywriting",
    badge: "Storytelling",
    description: "Master the art of persuasive writing. Learn to create viral blogs, high-converting ad copies, and technical documentation.",
    tech: ["SEO Writing", "Copywriting", "Ghostwriting", "Storytelling"],
    icon: <IoCreateOutline size={32} />,
    color: "from-pink-400 to-rose-500",
    bg: "bg-pink-50",
    text: "text-pink-600",
  },
  {
    title: "Graphic Design & Branding",
    badge: "Creative Core",
    description: "Master Adobe Photoshop and Illustrator. Learn the principles of composition, color theory, and typography to create world-class brand identities.",
    tech: ["Photoshop", "Illustrator", "InDesign", "Logo Design"],
    icon: <IoBrushOutline size={32} />,
    color: "from-fuchsia-500 to-purple-600",
    bg: "bg-fuchsia-50",
    text: "text-fuchsia-600",
  }
];

export default function SkillDevelopmentPage() {
  return (
    <section className="min-h-screen bg-slate-50 overflow-hidden relative">
      {/* Hero Section */}
      <div className="relative pt-32 pb-20 px-4">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-200/50 rounded-full blur-[120px] opacity-60 -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-pink-200/40 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="container-custom relative z-10 text-center space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border border-slate-200 shadow-sm text-sm font-bold text-slate-800"
          >
            <span className="flex h-2 w-2 rounded-full bg-brand-pink relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-pink opacity-75"></span>
            </span>
            Industry-Approved Curriculum
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-6xl lg:text-8xl font-black text-slate-900 leading-[1.1] tracking-tight"
          >
            Build skills that <br className="hidden md:block" /> actually <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-pink to-indigo-500">get you hired.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-slate-600 text-xl md:text-2xl leading-relaxed max-w-3xl mx-auto font-light"
          >
            We don't teach theory. You'll spend 90% of your time building real-world projects that you can immediately showcase to global employers.
          </motion.p>
        </div>
      </div>

      {/* Methodology Section */}
      <div className="bg-white py-20 border-y border-slate-100">
         <div className="container-custom">
            <div className="grid md:grid-cols-3 gap-12 text-center">
               {[
                 { t: "1. Hands-On Projects", p: "No boring lectures. You are coding, designing, and marketing from day one." },
                 { t: "2. Expert Mentors", p: "Learn directly from senior industry professionals who are currently working in top agencies." },
                 { t: "3. Portfolio Ready", p: "Graduate with 5+ complete, high-quality projects ready for your Upwork or LinkedIn profile." },
               ].map((mod, i) => (
                  <motion.div 
                     key={i}
                     initial={{ opacity: 0, y: 20 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     viewport={{ once: true }}
                     className="space-y-4"
                  >
                     <h3 className="text-2xl font-extrabold text-slate-900">{mod.t}</h3>
                     <p className="text-slate-600 leading-relaxed max-w-sm mx-auto">{mod.p}</p>
                  </motion.div>
               ))}
            </div>
         </div>
      </div>

      {/* Detailed Programs Grid */}
      <div className="container-custom py-24">
        <h2 className="text-4xl font-black text-center mb-16">Our Core Training Programs</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {programs.map((prog, i) => (
            <motion.div
              key={prog.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ y: -10 }}
              className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-xl shadow-slate-200/40 relative overflow-hidden group flex flex-col"
            >
              <div className={`absolute top-0 left-0 w-full h-2 bg-gradient-to-r ${prog.color}`}></div>
              
              <div className="flex justify-between items-start mb-6">
                 <div className={`w-16 h-16 rounded-2xl ${prog.bg} ${prog.text} flex items-center justify-center group-hover:scale-110 transition-transform duration-500`}>
                   {prog.icon}
                 </div>
                 <span className="px-3 py-1 bg-slate-100 text-slate-600 text-[10px] font-bold uppercase tracking-widest rounded-full">
                    {prog.badge}
                 </span>
              </div>
              
              <h3 className="text-2xl font-bold text-slate-900 mb-3">{prog.title}</h3>
              <p className="text-slate-600 leading-relaxed mb-6 flex-1 text-sm">{prog.description}</p>
              
              <div className="space-y-4 border-t border-slate-100 pt-6">
                 <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Technologies</p>
                 <div className="flex flex-wrap gap-2">
                    {prog.tech.map(t => (
                       <span key={t} className="px-3 py-1.5 bg-slate-50 border border-slate-100 rounded-lg text-xs font-bold text-slate-700">
                          {t}
                       </span>
                    ))}
                 </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA Bottom */}
      <div className="container-custom pb-24">
         <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-slate-900 rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden"
         >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-3xl bg-brand-pink/20 blur-[120px]"></div>
            <h2 className="text-4xl md:text-5xl font-black text-white relative z-10 mb-8">Not sure which program to pick?</h2>
            <p className="text-slate-300 text-lg mb-10 max-w-2xl mx-auto relative z-10">Schedule a free 15-minute counseling session with our academic advisors. We'll assess your interests and recommend the perfect career path.</p>
            <button className="relative z-10 px-8 py-4 bg-white text-slate-900 font-extrabold rounded-full hover:scale-105 transition-transform shadow-xl">
               Book Free Counseling
            </button>
         </motion.div>
      </div>

    </section>
  );
}
