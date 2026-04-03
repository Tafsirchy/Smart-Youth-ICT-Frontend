"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { IoStar } from "react-icons/io5";

const testimonials = [
  {
    name: "Arifa Zaman",
    course: "Full-Stack Web Development",
    content: "The project-based learning model changed everything for me. I didn't just learn syntax; I built actual applications. I secured my first job before even finishing the training!",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop",
  },
  {
    name: "Mahmud Hasan",
    course: "Digital Marketing Pro",
    content: "I struggled on Upwork for months. Smart Youth ICT's freelancing modules taught me how to communicate, set pricing, and win contracts. Now I'm a Top Rated freelancer earning consistently.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop",
  },
  {
    name: "Sadia Rahman",
    course: "UI/UX & Product Design",
    content: "The mentors are incredibly hands-on. They reviewed my Figma files pixel by pixel and taught me industry-standard design systems. The curriculum is top-notch.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop",
  },
  {
    name: "Tanjil Ahmed",
    course: "Python & Machine Learning",
    content: "Very comprehensive curriculum. No unnecessary theory. The support from the instructors is unmatched, and the community of learners kept me motivated.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
  },
  {
    name: "Fahmida Hossain",
    course: "Facebook Ads Mastery",
    content: "I joined to scale my own e-commerce business. The ROI has been incredible. I learned how to set up robust pixel tracking and highly targeted ad sets. Absolutely worth it.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=100&h=100&fit=crop",
  },
  {
    name: "Shihab Uddin",
    course: "MERN Stack Crash Course",
    content: "Fast-paced, rigorous, and completely demanding. This is exactly what I needed to break out of tutorial hell. Now I confidently build massive APIs.",
    rating: 4,
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&h=100&fit=crop",
  },
];

export default function TestimonialsPage() {
  return (
    <section className="min-h-screen bg-slate-50 py-24 overflow-hidden">
      <div className="container-custom relative">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, type: "spring" }}
            className="inline-flex items-center justify-center gap-1 text-amber-500 mb-6 bg-amber-50 px-4 py-2 rounded-full border border-amber-100 shadow-sm"
          >
            {[...Array(5)].map((_, i) => (
              <IoStar key={i} size={18} />
            ))}
            <span className="text-amber-700 font-bold text-sm ml-2">4.9/5 Average Rating</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-black text-slate-900 leading-tight mb-6"
          >
            Don't Just Take Our Word For It.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-slate-500 text-lg md:text-xl leading-relaxed"
          >
            Thousands of students have fundamentally changed their careers, launched businesses, and achieved financial independence with SYICT. Here is what they have to say.
          </motion.p>
        </div>

        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6 max-w-7xl mx-auto">
          {testimonials.map((review, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: (i % 3) * 0.1, duration: 0.5 }}
              className="break-inside-avoid bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative group"
            >
              <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                {/* Quote Icon SVG styling */}
                <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>

              <div className="flex gap-1 text-amber-400 mb-6">
                {[...Array(review.rating)].map((_, i) => (
                  <IoStar key={i} size={16} />
                ))}
              </div>

              <p className="text-slate-700 leading-relaxed text-lg mb-8 relative z-10 font-medium">
                "{review.content}"
              </p>

              <div className="flex items-center gap-4 relative z-10 border-t border-slate-100 pt-6">
                <Image
                  src={review.avatar}
                  alt={review.name}
                  width={48}
                  height={48}
                  className="rounded-full object-cover shadow-sm ring-2 ring-white"
                />
                <div>
                  <h4 className="font-bold text-slate-900">{review.name}</h4>
                  <p className="text-brand-green text-xs font-black uppercase tracking-wide">
                    {review.course}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
