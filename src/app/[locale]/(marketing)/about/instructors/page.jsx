"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const instructors = [
  {
    name: "Zayed Hassan",
    role: "Senior Software Engineer",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop",
    tech: ["React", "Next.js", "Node.js"],
  },
  {
    name: "Nusrat Amin",
    role: "Lead UI/UX Designer",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop",
    tech: ["Figma", "Interaction Design", "Wireframing"],
  },
  {
    name: "Arifur Rahman",
    role: "Digital Marketing Specialist",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop",
    tech: ["SEO", "Meta Ads", "Google Analytics"],
  },
  {
    name: "Afrin Jahan",
    role: "Full Stack MERN Lead",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
    tech: ["MongoDB", "Express", "REST APIs"],
  },
  {
    name: "Saiful Islam",
    role: "Mobile App Developer",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
    tech: ["Flutter", "Dart", "Firebase"],
  },
  {
    name: "Mst. Sumaiya",
    role: "AI & ML Engineer",
    image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=400&fit=crop",
    tech: ["Python", "TensorFlow", "Pandas"],
  },
];

export default function InstructorsPage() {
  return (
    <section className="min-h-screen bg-white py-24 overflow-hidden">
      <div className="container-custom relative">
        <div className="absolute top-10 right-10 flex gap-4 opacity-5 pointer-events-none">
          <span className="text-9xl">👨‍💻</span>
          <span className="text-9xl mt-20">👩‍🏫</span>
        </div>

        <div className="max-w-3xl mb-16 text-left border-l-4 border-brand-green pl-6 sm:pl-8">
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-4xl md:text-5xl font-black text-slate-900 leading-tight mb-4"
          >
            Our Mentors & Instructors
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="text-slate-600 text-lg leading-relaxed"
          >
            Learn directly from active industry professionals, startup founders, and top-rated freelancers who are building real software and marketing campaigns every day.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {instructors.map((instructor, i) => (
            <motion.div
              key={instructor.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              className="flex items-center gap-6 p-4 rounded-[2rem] hover:bg-slate-50 transition-colors group border border-transparent hover:border-slate-100"
            >
              <div className="relative w-24 h-24 sm:w-32 sm:h-32 shrink-0 rounded-[1.5rem] overflow-hidden shadow-sm">
                <Image
                  src={instructor.image}
                  alt={instructor.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              
              <div className="flex-1">
                <h3 className="text-xl font-bold text-slate-900 group-hover:text-brand-green transition-colors">
                  {instructor.name}
                </h3>
                <p className="text-sm font-semibold text-slate-500 mb-3">
                  {instructor.role}
                </p>
                <div className="flex flex-wrap gap-2">
                  {instructor.tech.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-1 bg-slate-100 text-slate-600 text-[10px] font-bold uppercase tracking-wider rounded-md"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
