"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useSession } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  HiOutlineLifebuoy, 
  HiOutlineTicket, 
  HiOutlinePlus, 
  HiOutlineChatBubbleLeftRight, 
  HiOutlineClock, 
  HiOutlineCheckCircle, 
  HiOutlineExclamationCircle,
  HiOutlineMagnifyingGlass,
  HiOutlineBuildingOffice2,
  HiOutlinePhone,
  HiOutlineQuestionMarkCircle,
  HiOutlineArrowTopRightOnSquare,
  HiOutlinePaperAirplane,
  HiXMark,
  HiChevronDown,
  HiOutlineFolderArrowDown,
  HiOutlineShieldCheck
} from "react-icons/hi2";
import { FaWhatsapp } from "react-icons/fa6";
import api from "@/lib/api";
import toast from "react-hot-toast";

const FAQ_DATA = [
  {
    id: "f1",
    category: "courses",
    q: "How do I access my live Zoom or Google Meet classes?",
    a: "Go to your student dashboard and open 'My Courses'. Click on your enrolled course and select the 'Live Classes' or 'Schedule' tab. The active session link will appear 15 minutes before the class begins."
  },
  {
    id: "f2",
    category: "courses",
    q: "Where can I find recorded lectures if I miss a live class?",
    a: "All live classes are recorded and uploaded to your student portal under the corresponding module within 6 to 12 hours after the session concludes. You have lifetime access to these recordings."
  },
  {
    id: "f3",
    category: "payments",
    q: "How does the installment payment verification work?",
    a: "When you pay via bKash, Nagad, Rocket, or Bank transfer, submit your Transaction ID and Sender Number in the Payment section. Our accounts team verifies and approves manual transactions within 2-4 hours on business days."
  },
  {
    id: "f4",
    category: "payments",
    q: "Can I get an official cash memo or payment invoice?",
    a: "Yes! Navigate to 'Payments' > 'Invoices' in your dashboard. You can download official PDF receipts for every completed installment or full fee payment."
  },
  {
    id: "f5",
    category: "certificates",
    q: "What are the criteria for receiving an SYICT Verified Certificate?",
    a: "You must maintain at least 70% attendance in live sessions, submit all mandatory course assignments, and successfully complete the final capstone project with a passing grade."
  },
  {
    id: "f6",
    category: "certificates",
    q: "How can third-party employers verify my certificate?",
    a: "Each SYICT certificate comes with a unique QR code and verification ID. Anyone can verify authenticity at our public verification portal: smartyouthict.com/verify."
  },
  {
    id: "f7",
    category: "freelancing",
    q: "How do I get help from the Freelancing Support Cell?",
    a: "Students who complete their course enter the SYICT Marketplace Apprenticeship Cell. When you get a client order on Fiverr, Upwork, or direct contract, raise an 'Urgent Freelancing' ticket or contact your assigned mentor on WhatsApp for live order guidance."
  },
  {
    id: "f8",
    category: "freelancing",
    q: "Does SYICT offer client project internships?",
    a: "Yes! Top performers in each batch are assigned to live client projects under the SYICT Agency team, earning real money while gaining industry-grade portfolio experience."
  }
];

const RESOURCE_TOOLKIT = [
  {
    title: "Web Development Starter Pack",
    category: "Development",
    desc: "VS Code configuration, essential extensions, Git setup cheat sheet, and HTML5/Tailwind boilerplates.",
    tag: "Essential",
    link: "https://code.visualstudio.com/"
  },
  {
    title: "Graphic Design Asset Toolkit",
    category: "Design",
    desc: "High-resolution mockups, curated font libraries, color palette swatches, and Adobe Creative Cloud guidelines.",
    tag: "Free Resources",
    link: "https://unsplash.com"
  },
  {
    title: "Marketplace Proposal Templates",
    category: "Freelancing",
    desc: "Proven winning proposal formats for Upwork, Fiverr gig description structures, and client messaging scripts.",
    tag: "Career Ready",
    link: "https://fiverr.com"
  },
  {
    title: "SYICT Certificate Verification",
    category: "Academic",
    desc: "Public online credential checker to validate your graduation credentials to domestic and global employers.",
    tag: "Official Portal",
    link: "/certificates"
  }
];

export default function HelpCenterPage() {
  const { data: session } = useSession();
  const [activeTab, setActiveTab] = useState("tickets"); // 'tickets' | 'faqs' | 'branches' | 'toolkit'
  const [tickets, setTickets] = useState([]);
  const [branches, setBranches] = useState([]);
  const [loadingTickets, setLoadingTickets] = useState(true);
  
  // Search & Filter
  const [searchQuery, setSearchQuery] = useState("");
  const [faqCategory, setFaqCategory] = useState("all");
  const [expandedFaq, setExpandedFaq] = useState(null);

  // Ticket Creation Modal
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [createForm, setCreateForm] = useState({
    subject: "",
    category: "academic",
    priority: "medium",
    message: ""
  });
  const [submittingTicket, setSubmittingTicket] = useState(false);

  // Ticket Thread Modal
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [replyMessage, setReplyMessage] = useState("");
  const [submittingReply, setSubmittingReply] = useState(false);

  useEffect(() => {
    fetchTickets();
    fetchBranches();
  }, []);

  const fetchTickets = async () => {
    try {
      setLoadingTickets(true);
      const res = await api.get("/support/me");
      if (res.data?.success) {
        setTickets(res.data.data || []);
      }
    } catch (err) {
      console.warn("Tickets fetch error:", err.message);
    } finally {
      setLoadingTickets(false);
    }
  };

  const fetchBranches = async () => {
    try {
      const res = await api.get("/branches");
      if (res.data?.success) {
        setBranches(res.data.data || []);
      }
    } catch (err) {
      console.warn("Branches fetch error:", err.message);
    }
  };

  const handleCreateTicket = async (e) => {
    e.preventDefault();
    if (!createForm.subject.trim() || !createForm.message.trim()) {
      return toast.error("Please fill in both subject and description");
    }

    setSubmittingTicket(true);
    try {
      const res = await api.post("/support", createForm);
      if (res.data?.success) {
        toast.success("Support ticket submitted successfully!");
        setShowCreateModal(false);
        setCreateForm({ subject: "", category: "academic", priority: "medium", message: "" });
        fetchTickets();
      } else {
        toast.error(res.data?.message || "Failed to submit ticket");
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || "Error submitting ticket");
    } finally {
      setSubmittingTicket(false);
    }
  };

  const handleSendReply = async (e) => {
    e.preventDefault();
    if (!replyMessage.trim() || !selectedTicket) return;

    setSubmittingReply(true);
    try {
      const res = await api.put(`/support/${selectedTicket._id}/response`, {
        message: replyMessage.trim()
      });
      if (res.data?.success) {
        toast.success("Reply posted!");
        setSelectedTicket(res.data.data);
        setReplyMessage("");
        fetchTickets();
      }
    } catch (err) {
      toast.error("Failed to post reply");
    } finally {
      setSubmittingReply(false);
    }
  };

  // WhatsApp helper with student metadata
  const handleOpenWhatsApp = () => {
    const studentName = session?.user?.name || "Student";
    const studentEmail = session?.user?.email || "N/A";
    const studentRole = session?.user?.role || "student";
    const text = encodeURIComponent(
      `Hello Smart Youth ICT Support Desk!\nMy Name: ${studentName}\nEmail: ${studentEmail}\nRole: ${studentRole}\nI need urgent assistance regarding: `
    );
    window.open(`https://wa.me/8801722550012?text=${text}`, "_blank");
  };

  // Filtered FAQs
  const filteredFaqs = useMemo(() => {
    return FAQ_DATA.filter((item) => {
      const matchesCategory = faqCategory === "all" || item.category === faqCategory;
      const matchesSearch = 
        !searchQuery ||
        item.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.a.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [faqCategory, searchQuery]);

  return (
    <div className="py-6 max-w-7xl mx-auto space-y-8">
      {/* ── Top Hero Banner ─────────────────────────────────── */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-slate-800 text-white p-6 sm:p-10 shadow-xl">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 text-xs font-bold uppercase tracking-wider text-indigo-300 bg-indigo-900/50 border border-indigo-700/50 rounded-full">
            <HiOutlineShieldCheck className="w-4 h-4 text-emerald-400" />
            Authenticated Student Help Desk
          </div>
          <h1 
            className="text-3xl sm:text-4xl font-black tracking-tight leading-tight text-white !text-white"
            style={{ color: "#ffffff" }}
          >
            How can we assist you, {session?.user?.name?.split(" ")[0] || "Learner"}?
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Welcome to the Smart Youth ICT Dedicated Support Hub. Track your inquiries, receive live mentor troubleshooting, check branch contacts, or browse expert guides.
          </p>

          {/* Search Box */}
          <div className="pt-2">
            <div className="relative max-w-xl">
              <HiOutlineMagnifyingGlass className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input 
                type="text" 
                placeholder="Search troubleshooting guides, payment FAQs, certificate steps..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 bg-slate-800/80 border border-slate-700 text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-xl transition-all shadow-inner"
              />
            </div>
          </div>
        </div>

        {/* Ambient background glows */}
        <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-blue-600/20 blur-3xl rounded-full pointer-events-none" />
        <div className="absolute top-0 right-1/4 w-60 h-60 bg-pink-600/10 blur-3xl rounded-full pointer-events-none" />
      </div>

      {/* ── Quick Action Cards ───────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Action 1: Create Ticket */}
        <div 
          onClick={() => setShowCreateModal(true)}
          className="cursor-pointer bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl shadow-sm hover:shadow-md hover:border-blue-500/50 transition-all group flex flex-col justify-between"
        >
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-950/50 text-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform shadow-inner">
              <HiOutlineTicket className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-black text-slate-900 dark:text-white text-lg">Raise Support Ticket</h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Submit an official inquiry for payment issues, bug reports, or assignment doubts. Track live status until resolved.
              </p>
            </div>
          </div>
          <div className="pt-4 flex items-center gap-2 text-xs font-bold text-blue-600 group-hover:translate-x-1 transition-transform">
            <span>Open New Ticket</span> &rarr;
          </div>
        </div>

        {/* Action 2: WhatsApp Emergency Desk */}
        <div 
          onClick={handleOpenWhatsApp}
          className="cursor-pointer bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl shadow-sm hover:shadow-md hover:border-emerald-500/50 transition-all group flex flex-col justify-between"
        >
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 flex items-center justify-center group-hover:scale-110 transition-transform shadow-inner">
              <FaWhatsapp className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-black text-slate-900 dark:text-white text-lg">Live WhatsApp Support</h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Urgent issue during live class or marketplace order? Connect with our dedicated student support desk on WhatsApp.
              </p>
            </div>
          </div>
          <div className="pt-4 flex items-center gap-2 text-xs font-bold text-emerald-600 group-hover:translate-x-1 transition-transform">
            <span>Chat on WhatsApp</span> &rarr;
          </div>
        </div>

        {/* Action 3: Branch Helpline */}
        <div 
          onClick={() => setActiveTab("branches")}
          className="cursor-pointer bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl shadow-sm hover:shadow-md hover:border-indigo-500/50 transition-all group flex flex-col justify-between"
        >
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 flex items-center justify-center group-hover:scale-110 transition-transform shadow-inner">
              <HiOutlineBuildingOffice2 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-black text-slate-900 dark:text-white text-lg">Branch Desks & Contacts</h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Find physical addresses, campus phone numbers, and in-person counseling hours for all SYICT branches.
              </p>
            </div>
          </div>
          <div className="pt-4 flex items-center gap-2 text-xs font-bold text-indigo-600 group-hover:translate-x-1 transition-transform">
            <span>View Branch Directory</span> &rarr;
          </div>
        </div>
      </div>

      {/* ── Main Tab Navigation ───────────────────────────────── */}
      <div className="flex border-b border-slate-200 dark:border-slate-800 gap-2 sm:gap-6 overflow-x-auto scrollbar-hide text-sm font-bold">
        {[
          { id: "tickets", label: `My Tickets (${tickets.length})`, icon: HiOutlineTicket },
          { id: "faqs", label: "Knowledge Base & FAQs", icon: HiOutlineQuestionMarkCircle },
          { id: "branches", label: "Branch Desks", icon: HiOutlineBuildingOffice2 },
          { id: "toolkit", label: "Student Toolkit & Resources", icon: HiOutlineFolderArrowDown },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 pb-3 px-1 border-b-2 transition-all whitespace-nowrap ${
                isActive
                  ? "border-blue-600 text-blue-600 dark:text-blue-400"
                  : "border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* ── Tab Content ──────────────────────────────────────── */}

      {/* TAB 1: Support Tickets */}
      {activeTab === "tickets" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Active & Resolved Tickets</h2>
            <button
              onClick={() => setShowCreateModal(true)}
              className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg shadow-sm shadow-blue-500/20 transition-all"
            >
              <HiOutlinePlus className="w-4 h-4" />
              New Ticket
            </button>
          </div>

          {loadingTickets ? (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-20 bg-slate-100 dark:bg-slate-800 rounded-xl animate-pulse" />
              ))}
            </div>
          ) : tickets.length === 0 ? (
            <div className="text-center py-12 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl space-y-3">
              <HiOutlineLifebuoy className="w-12 h-12 text-slate-400 mx-auto" />
              <h3 className="font-bold text-slate-800 dark:text-slate-200">No Support Tickets Raised Yet</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Have any issue with coursework, payments, or software? Click 'New Ticket' to get prompt support from our team.
              </p>
              <button
                onClick={() => setShowCreateModal(true)}
                className="mt-2 px-5 py-2.5 bg-blue-600 text-white text-xs font-bold rounded-lg"
              >
                Create Your First Ticket
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {tickets.map((ticket) => (
                <div
                  key={ticket._id}
                  onClick={() => setSelectedTicket(ticket)}
                  className="cursor-pointer bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-400 p-5 rounded-xl shadow-sm transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 text-[10px] font-black uppercase tracking-wider rounded-md ${
                        ticket.status === 'resolved' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-400' :
                        ticket.status === 'in-progress' ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-400' :
                        'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-400'
                      }`}>
                        {ticket.status}
                      </span>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                        {ticket.category || 'General'}
                      </span>
                      <span className={`text-[10px] font-bold uppercase ${
                        ticket.priority === 'high' ? 'text-rose-500' : 'text-slate-400'
                      }`}>
                        • {ticket.priority} priority
                      </span>
                    </div>
                    <h3 className="font-bold text-slate-900 dark:text-white text-sm group-hover:text-blue-600 transition-colors">
                      {ticket.subject}
                    </h3>
                    <p className="text-xs text-slate-500 line-clamp-1">
                      {ticket.message}
                    </p>
                  </div>

                  <div className="flex items-center gap-4 text-xs text-slate-400 shrink-0">
                    <div className="flex items-center gap-1">
                      <HiOutlineClock className="w-4 h-4" />
                      <span>{new Date(ticket.createdAt).toLocaleDateString()}</span>
                    </div>
                    {ticket.responses?.length > 0 && (
                      <span className="px-2 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold rounded-md">
                        {ticket.responses.length} reply
                      </span>
                    )}
                    <span className="text-blue-600 font-bold group-hover:translate-x-1 transition-transform">
                      View Thread &rarr;
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: Knowledge Base & FAQs */}
      {activeTab === "faqs" && (
        <div className="space-y-6">
          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2 text-xs font-bold">
            {[
              { id: "all", label: "All Questions" },
              { id: "courses", label: "Classes & LMS" },
              { id: "payments", label: "Payments & Invoices" },
              { id: "certificates", label: "Certificates" },
              { id: "freelancing", label: "Freelancing Cell" },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setFaqCategory(cat.id)}
                className={`px-3.5 py-2 rounded-lg border transition-all ${
                  faqCategory === cat.id
                    ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                    : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:bg-slate-50"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Accordion List */}
          <div className="space-y-3">
            {filteredFaqs.map((faq) => {
              const isOpen = expandedFaq === faq.id;
              return (
                <div
                  key={faq.id}
                  className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden transition-all shadow-sm"
                >
                  <button
                    onClick={() => setExpandedFaq(isOpen ? null : faq.id)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-slate-900 dark:text-white text-sm hover:text-blue-600 transition-colors"
                  >
                    <span>{faq.q}</span>
                    <HiChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-800 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 3: Branch Desks */}
      {activeTab === "branches" && (
        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">SYICT Campus Network & Desks</h2>
            <p className="text-xs text-slate-500 mt-1">Connect directly with branch coordinators or visit for in-person support.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {branches.length > 0 ? (
              branches.map((b) => (
                <div 
                  key={b._id} 
                  className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-xl shadow-sm space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider bg-blue-50 dark:bg-blue-950 text-blue-600 rounded-md">
                      {b.code || "Branch"}
                    </span>
                    <span className="text-xs text-emerald-600 font-bold flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-emerald-500" /> Active Campus
                    </span>
                  </div>

                  <h3 className="font-bold text-slate-900 dark:text-white text-base">
                    {b.name}
                  </h3>

                  <div className="text-xs text-slate-500 space-y-1.5 leading-relaxed">
                    <p className="flex items-start gap-2">
                      <HiOutlineBuildingOffice2 className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                      <span>{b.address || "Main Campus Location"}</span>
                    </p>
                    {b.phone && (
                      <p className="flex items-center gap-2">
                        <HiOutlinePhone className="w-4 h-4 text-slate-400 shrink-0" />
                        <span className="font-semibold text-slate-800 dark:text-slate-200">{b.phone}</span>
                      </p>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full py-8 text-center text-slate-400 text-sm">
                No physical branches configured yet.
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 4: Student Resource Toolkit */}
      {activeTab === "toolkit" && (
        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Essential Software & Templates</h2>
            <p className="text-xs text-slate-500 mt-1">Official materials, development software, and templates to speed up your learning.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {RESOURCE_TOOLKIT.map((item, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-xl shadow-sm flex flex-col justify-between space-y-4 hover:border-blue-400 transition-all"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 text-[10px] font-black uppercase tracking-wider bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-md">
                      {item.category}
                    </span>
                    <span className="text-[10px] font-bold text-blue-600">
                      {item.tag}
                    </span>
                  </div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-base">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <a
                  href={item.link}
                  target={item.link.startsWith("http") ? "_blank" : "_self"}
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700"
                >
                  <span>Access Resource</span>
                  <HiOutlineArrowTopRightOnSquare className="w-4 h-4" />
                </a>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Modal: Create Support Ticket ─────────────────────── */}
      <AnimatePresence>
        {showCreateModal && (
          <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-5"
            >
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <HiOutlineTicket className="w-5 h-5 text-blue-600" />
                  <h3 className="font-black text-slate-900 dark:text-white text-lg">Raise Support Ticket</h3>
                </div>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="text-slate-400 hover:text-slate-600"
                >
                  <HiXMark className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleCreateTicket} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Inquiry Subject
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Cannot open Lecture 4 assignment submission"
                    value={createForm.subject}
                    onChange={(e) => setCreateForm({ ...createForm, subject: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm rounded-lg outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Category
                    </label>
                    <select
                      value={createForm.category}
                      onChange={(e) => setCreateForm({ ...createForm, category: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm rounded-lg outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
                    >
                      <option value="academic">Academic & Mentor</option>
                      <option value="payment">Billing & Payments</option>
                      <option value="lms">LMS & Video Technical</option>
                      <option value="certificate">Certificate & Exam</option>
                      <option value="freelancing">Freelance & Marketplace</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Urgency Priority
                    </label>
                    <select
                      value={createForm.priority}
                      onChange={(e) => setCreateForm({ ...createForm, priority: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm rounded-lg outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
                    >
                      <option value="low">Low (Standard inquiry)</option>
                      <option value="medium">Medium (Requires attention)</option>
                      <option value="high">High (Urgent / Exam / Order)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Describe your problem or question
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Provide details, module number, or error messages..."
                    value={createForm.message}
                    onChange={(e) => setCreateForm({ ...createForm, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm rounded-lg outline-none focus:ring-2 focus:ring-blue-500 dark:text-white resize-none"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowCreateModal(false)}
                    className="px-4 py-2 text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submittingTicket}
                    className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg shadow-sm disabled:opacity-50"
                  >
                    {submittingTicket ? "Submitting..." : "Submit Ticket"}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ── Modal: View Ticket Conversation & Replies ───────── */}
      <AnimatePresence>
        {selectedTicket && (
          <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white dark:bg-slate-900 w-full max-w-2xl max-h-[85vh] flex flex-col rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800"
            >
              {/* Header */}
              <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between shrink-0">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2 py-0.5 text-[10px] font-black uppercase bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-400 rounded">
                      {selectedTicket.status}
                    </span>
                    <span className="text-xs text-slate-400 uppercase font-bold">
                      {selectedTicket.category || 'General'}
                    </span>
                  </div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-base">
                    {selectedTicket.subject}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedTicket(null)}
                  className="text-slate-400 hover:text-slate-600"
                >
                  <HiXMark className="w-6 h-6" />
                </button>
              </div>

              {/* Message Thread Body */}
              <div className="flex-1 overflow-y-auto p-5 space-y-4">
                {/* Initial Inquiry */}
                <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-xl border border-slate-100 dark:border-slate-800 space-y-1">
                  <div className="flex items-center justify-between text-xs text-slate-400 font-semibold">
                    <span>You (Initial Request)</span>
                    <span>{new Date(selectedTicket.createdAt).toLocaleString()}</span>
                  </div>
                  <p className="text-sm text-slate-800 dark:text-slate-200 leading-relaxed whitespace-pre-wrap">
                    {selectedTicket.message}
                  </p>
                </div>

                {/* Responses */}
                {selectedTicket.responses && selectedTicket.responses.length > 0 ? (
                  selectedTicket.responses.map((resp, i) => (
                    <div
                      key={i}
                      className="bg-blue-50/60 dark:bg-blue-950/30 p-4 rounded-xl border border-blue-100 dark:border-blue-900/40 space-y-1"
                    >
                      <div className="flex items-center justify-between text-xs text-blue-600 dark:text-blue-400 font-bold">
                        <span>{resp.user?.name || "Support Staff / Mentor"}</span>
                        <span className="text-slate-400 font-normal">{new Date(resp.createdAt).toLocaleString()}</span>
                      </div>
                      <p className="text-sm text-slate-800 dark:text-slate-200 leading-relaxed whitespace-pre-wrap">
                        {resp.message}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-center text-slate-400 py-3 italic">
                    A support engineer or mentor has received your inquiry and will reply shortly.
                  </p>
                )}
              </div>

              {/* Reply Box Footer */}
              <form onSubmit={handleSendReply} className="p-4 border-t border-slate-100 dark:border-slate-800 flex gap-2 shrink-0">
                <input
                  type="text"
                  placeholder="Type your message or follow-up clarification..."
                  value={replyMessage}
                  onChange={(e) => setReplyMessage(e.target.value)}
                  className="flex-1 px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm rounded-xl outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
                />
                <button
                  type="submit"
                  disabled={submittingReply || !replyMessage.trim()}
                  className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 disabled:opacity-50 transition-all shadow-sm"
                >
                  <HiOutlinePaperAirplane className="w-4 h-4" />
                  <span>Send</span>
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
