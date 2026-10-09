"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";
import { IoLogoLinkedin, IoLogoTwitter, IoArrowForward, IoClose } from "react-icons/io5";
import { AnimatePresence } from "framer-motion";
import MentorModal from "@/app/[locale]/(marketing)/about/instructors/MentorModal";
import api from "@/lib/api";

const PortraitMentorCard = ({ mentor, onOpenProfile }) => {
    return (
        <motion.div
            className="group flex flex-col bg-white -[2rem] border border-slate-100 overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 h-full"
        >
            {/* Premium Image Area - Reduced height to Square */}
            <div className="relative w-full aspect-square bg-white overflow-hidden shrink-0 p-2">
                <div className="relative w-full h-full -[1.5rem] overflow-hidden bg-slate-50 border border-slate-100">
                    <Image
                        src={mentor.avatar || "/images/placeholder.png"}
                        alt={mentor.name}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        loading="lazy"
                        className="object-cover transition-transform duration-700 group-hover:scale-105 filter grayscale group-hover:grayscale-0 rounded-md"
                        onError={(e) => { e.target.srcset = ''; e.target.src = '/images/placeholder.png'; }}
                    />
                    {mentor.badge && (
                        <div className="absolute top-3 left-3 z-10 bg-white/95 backdrop-blur-sm text-slate-900 text-[9px] font-black px-3 py-1 uppercase tracking-widest shadow-md rounded-lg">
                            {mentor.badge}
                        </div>
                    )}
                </div>
            </div>

            {/* Content Area - Tighter padding */}
            <div className="flex flex-col flex-grow p-4 sm:p-5 lg:p-6 pt-4 sm:pt-5">
                <div className="mb-3">
                    <h3 className="text-base sm:text-lg lg:text-xl font-black text-slate-900 tracking-tight mb-1">{mentor.name}</h3>
                    <p className="text-[9px] sm:text-[10px] font-bold text-brand-pink uppercase tracking-widest">{mentor.role}</p>
                </div>

                <p className="text-slate-500 text-[11px] sm:text-xs leading-relaxed mb-4 line-clamp-3 flex-grow">
                    {mentor.featuredBio || mentor.bio || "Dedicated professional bringing years of industry expertise to guide and mentor the next generation."}
                </p>

                {/* Socials & Profile Action */}
                <div className="w-full pt-3 border-t border-slate-100 flex items-center justify-between mt-auto">
                    <div className="flex items-center gap-1 -ml-1">
                        {mentor.socials?.linkedin && (
                            <a href={mentor.socials.linkedin} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-[#0A66C2] transition-colors p-1.5 hover:bg-slate-50 rounded-md">
                                <IoLogoLinkedin size={16} />
                            </a>
                        )}
                        {mentor.socials?.twitter && (
                            <a href={mentor.socials.twitter} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-[#1DA1F2] transition-colors p-1.5 hover:bg-slate-50 rounded-md">
                                <IoLogoTwitter size={16} />
                            </a>
                        )}
                    </div>

                    <button
                        onClick={onOpenProfile}
                        className="text-slate-900 text-[9px] font-black uppercase tracking-[0.2em] flex items-center gap-1.5 hover:text-brand-pink transition-colors rounded-md"
                    >
                        Profile <IoArrowForward size={14} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

export default function Mentors() {
    const [mentors, setMentors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedMentor, setSelectedMentor] = useState(null);

    useEffect(() => {
        const fetchMentors = async () => {
            try {
                const res = await api.get("/cms/mentors");
                const allMentors = res.data.data || []; const featured = allMentors.filter(m => m.isFeaturedMentor); const mentorsToDisplay = featured.length > 0 ? featured : allMentors; setMentors(mentorsToDisplay.slice(0, 4));
            } catch (err) {
                console.error("Failed to load featured mentors", err);
            } finally {
                setLoading(false);
            }
        };
        fetchMentors();
    }, []);

    return (
        <section className="section py-10 sm:py-16 lg:py-24 bg-slate-50 relative overflow-hidden rounded-sm">
            {/* Super minimal grid background */}
            <div
                className="absolute inset-0 pointer-events-none opacity-[0.03]"
                style={{ backgroundImage: 'linear-gradient(to right, black 1px, transparent 1px), linear-gradient(to bottom, black 1px, transparent 1px)', backgroundSize: '60px 60px' }}
            />

            <div className="container-custom relative z-10">

                {/* Header - Editorial Style */}
                <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-12 lg:mb-16">
                    <motion.div
                        className="max-w-2xl"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="inline-block text-brand-pink text-[10px] sm:text-xs font-black uppercase tracking-[0.3em] mb-2 sm:mb-3">
                            Expert Mentors
                        </span>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 leading-[1.1] tracking-tighter">
                            Learn from the <br className="hidden sm:block" /> Best in Industry.
                        </h2>
                    </motion.div>

                    <motion.p
                        className="text-slate-500 text-sm sm:text-base lg:text-lg font-medium max-w-full lg:max-w-md lg:text-right leading-relaxed"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                    >
                        Direct guidance from top-tier professionals who have built, scaled, and transformed industry standards globally.
                    </motion.p>
                </div>

                {/* 4-Card Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
                    {loading ? (
                        <div className="col-span-1 sm:col-span-2 lg:col-span-4 flex justify-center py-12">
                            <div className="w-10 h-10 border-4 border-slate-200 border-t-brand-pink animate-spin"></div>
                        </div>
                    ) : mentors.length > 0 ? (
                        mentors.map((mentor, index) => (
                            <motion.div
                                key={mentor._id || index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1, duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
                                className="h-full"
                            >
                                <PortraitMentorCard mentor={mentor} onOpenProfile={() => setSelectedMentor(mentor)} />
                            </motion.div>
                        ))
                    ) : (
                        <div className="col-span-1 sm:col-span-2 lg:col-span-4 text-center py-12 text-slate-500 font-medium">
                            No mentors found.
                        </div>
                    )}
                </div>

                {/* Profile Modal */}
                <AnimatePresence>
                    {selectedMentor && (
                        <MentorModal 
                            mentor={selectedMentor} 
                            onClose={() => setSelectedMentor(null)} 
                        />
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
}
