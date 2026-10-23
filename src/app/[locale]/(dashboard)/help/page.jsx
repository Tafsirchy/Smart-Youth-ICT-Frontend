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
      const res = await api.get("/branches/public/all");
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
    <div className="py-3 sm:py-4 w-full space-y-4">
      {/* ── Top Hero Banner ─────────────────────────────────── */}
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-slate-800 text-white p-4 sm:p-6 shadow-md">
        <div className="relative z-10 max-w-3xl space-y-2">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider text-indigo-300 bg-indigo-900/50 border border-indigo-700/50 rounded-full leading-tight">
            <HiOutlineShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            Authenticated Student Help Desk
          </div>
          <h1 
            className="text-2xl sm:text-3xl font-black tracking-tight leading-tight text-white !text-white"
            style={{ color: "#ffffff" }}
          >
            How can we assist you, {session?.user?.name?.split(" ")[0] || "Learner"}?
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm leading-normal">
            Welcome to the Smart Youth ICT Dedicated Support Hub. Track your inquiries, receive live mentor troubleshooting, check branch contacts, or browse expert guides.
          </p>

          {/* Search Box */}
          <div className="pt-1">
            <div className="relative max-w-xl">
              <HiOutlineMagnifyingGlass className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
              <input 
                type="text" 
                placeholder="Search troubleshooting guides, payment FAQs, certificate steps..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-3.5 py-2 bg-slate-800/80 border border-slate-700 text-white placeholder-slate-400 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg transition-all shadow-inner leading-snug"
              />
            </div>
          </div>
        </div>

        {/* Ambient background glows */}
        <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-blue-600/20 blur-3xl rounded-full pointer-events-none" />
        <div className="absolute top-0 right-1/4 w-60 h-60 bg-pink-600/10 blur-3xl rounded-full pointer-events-none" />
      </div>

      {/* ── Quick Action Cards ───────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {/* Action 1: Create Ticket */}
        <div 
          onClick={() => setShowCreateModal(true)}
          className="cursor-pointer bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-3.5 sm:p-4 rounded-xl shadow-sm hover:shadow-md hover:border-blue-500/50 transition-all group flex flex-col justify-between"
        >
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-950/50 text-blue-600 flex items-center justify-center group-hover:scale-105 transition-transform shadow-inner">
              <HiOutlineTicket className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-black text-slate-900 dark:text-white text-base leading-snug">Raise Support Ticket</h3>
              <p className="text-xs text-slate-500 mt-0.5 leading-normal">
                Submit an official inquiry for payment issues, bug reports, or assignment doubts. Track live status until resolved.
              </p>
            </div>
          </div>
          <div className="pt-2.5 flex items-center gap-1.5 text-xs font-bold text-blue-600 group-hover:translate-x-1 transition-transform leading-tight">
            <span>Open New Ticket</span> &rarr;
          </div>
        </div>

        {/* Action 2: WhatsApp Emergency Desk */}
        <div 
          onClick={handleOpenWhatsApp}
          className="cursor-pointer bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-3.5 sm:p-4 rounded-xl shadow-sm hover:shadow-md hover:border-emerald-500/50 transition-all group flex flex-col justify-between"
        >
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 flex items-center justify-center group-hover:scale-105 transition-transform shadow-inner">
              <FaWhatsapp className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-black text-slate-900 dark:text-white text-base leading-snug">Live WhatsApp Support</h3>
              <p className="text-xs text-slate-500 mt-0.5 leading-normal">
                Urgent issue during live class or marketplace order? Connect with our dedicated student support desk on WhatsApp.
              </p>
            </div>
          </div>
          <div className="pt-2.5 flex items-center gap-1.5 text-xs font-bold text-emerald-600 group-hover:translate-x-1 transition-transform leading-tight">
            <span>Chat on WhatsApp</span> &rarr;
          </div>
        </div>

        {/* Action 3: Branch Helpline */}
        <div 
          onClick={() => setActiveTab("branches")}
          className="cursor-pointer bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-3.5 sm:p-4 rounded-xl shadow-sm hover:shadow-md hover:border-indigo-500/50 transition-all group flex flex-col justify-between"
        >
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-lg bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 flex items-center justify-center group-hover:scale-105 transition-transform shadow-inner">
              <HiOutlineBuildingOffice2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-black text-slate-900 dark:text-white text-base leading-snug">Branch Desks & Contacts</h3>
              <p className="text-xs text-slate-500 mt-0.5 leading-normal">
                Find physical addresses, campus phone numbers, and in-person counseling hours for all SYICT branches.
              </p>
            </div>
          </div>
          <div className="pt-2.5 flex items-center gap-1.5 text-xs font-bold text-indigo-600 group-hover:translate-x-1 transition-transform leading-tight">
            <span>View Branch Directory</span> &rarr;
          </div>
        </div>
      </div>

      {/* ── Main Tab Navigation ───────────────────────────────── */}
      <div className="flex border-b border-slate-200 dark:border-slate-800 gap-2 sm:gap-4 overflow-x-auto scrollbar-hide text-sm font-bold">
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
              className={`flex items-center gap-1.5 pb-2 px-1 border-b-2 transition-all whitespace-nowrap leading-tight ${
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
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-tight">Active & Resolved Tickets</h2>
            <button
              onClick={() => setShowCreateModal(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg shadow-sm shadow-blue-500/20 transition-all leading-tight"
            >
              <HiOutlinePlus className="w-3.5 h-3.5" />
              New Ticket
            </button>
          </div>

          {loadingTickets ? (
            <div className="space-y-2.5">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-16 bg-slate-100 dark:bg-slate-800 rounded-xl animate-pulse" />
              ))}
            </div>
          ) : tickets.length === 0 ? (
            <div className="text-center py-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl space-y-2">
              <HiOutlineLifebuoy className="w-10 h-10 text-slate-400 mx-auto" />
              <h3 className="font-bold text-slate-800 dark:text-slate-200 text-sm leading-tight">No Support Tickets Raised Yet</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto leading-normal">
                Have any issue with coursework, payments, or software? Click 'New Ticket' to get prompt support from our team.
              </p>
              <button
                onClick={() => setShowCreateModal(true)}
                className="mt-1 px-4 py-2 bg-blue-600 text-white text-xs font-bold rounded-lg leading-tight"
              >
                Create Your First Ticket
              </button>
            </div>
          ) : (
            <div className="space-y-2">
              {tickets.map((ticket) => (
                <div
                  key={ticket._id}
                  onClick={() => setSelectedTicket(ticket)}
                  className="cursor-pointer bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-400 p-3 sm:p-3.5 rounded-lg shadow-sm transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 group"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5">
                      <span className={`px-1.5 py-0.5 text-[9px] font-black uppercase tracking-wider rounded leading-tight ${
                        ticket.status === 'resolved' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-400' :
                        ticket.status === 'in-progress' ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-400' :
                        'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-400'
                      }`}>
                        {ticket.status}
                      </span>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-tight">
                        {ticket.category || 'General'}
                      </span>
                      <span className={`text-[10px] font-bold uppercase leading-tight ${
                        ticket.priority === 'high' ? 'text-rose-500' : 'text-slate-400'
                      }`}>
                        • {ticket.priority} priority
                      </span>
                    </div>
                    <h3 className="font-bold text-slate-900 dark:text-white text-xs sm:text-sm group-hover:text-blue-600 transition-colors leading-snug">
                      {ticket.subject}
                    </h3>
                    <p className="text-xs text-slate-500 line-clamp-1 leading-normal">
                      {ticket.message}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 text-xs text-slate-400 shrink-0">
                    <div className="flex items-center gap-1 leading-tight">
                      <HiOutlineClock className="w-3.5 h-3.5" />
                      <span>{new Date(ticket.createdAt).toLocaleDateString()}</span>
                    </div>
                    {ticket.responses?.length > 0 && (
                      <span className="px-1.5 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold rounded text-[10px] leading-tight">
                        {ticket.responses.length} reply
                      </span>
                    )}
                    <span className="text-blue-600 font-bold group-hover:translate-x-1 transition-transform leading-tight text-xs">
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
        <div className="space-y-3.5">
          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-1.5 text-xs font-bold">
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
                className={`px-2.5 py-1 rounded-lg border transition-all text-xs leading-tight ${
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
          <div className="space-y-2">
            {filteredFaqs.map((faq) => {
              const isOpen = expandedFaq === faq.id;
              return (
                <div
                  key={faq.id}
                  className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden transition-all shadow-sm"
                >
                  <button
                    onClick={() => setExpandedFaq(isOpen ? null : faq.id)}
                    className="w-full p-3 sm:p-3.5 text-left flex items-center justify-between gap-3 font-bold text-slate-900 dark:text-white text-xs sm:text-sm hover:text-blue-600 transition-colors leading-snug"
                  >
                    <span>{faq.q}</span>
                    <HiChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                  </button>
                  {isOpen && (
                    <div className="px-3.5 pb-3 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-normal border-t border-slate-100 dark:border-slate-800 pt-2.5">
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
        <div className="space-y-3.5">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-tight">SYICT Campus Network & Desks</h2>
            <p className="text-xs text-slate-500 mt-0.5 leading-normal">Connect directly with branch coordinators or visit for in-person support.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {branches.length > 0 ? (
              branches.map((b) => (
                <div 
                  key={b._id} 
                  className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-3.5 sm:p-4 rounded-xl shadow-sm space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 text-[10px] font-black uppercase tracking-wider bg-blue-50 dark:bg-blue-950 text-blue-600 rounded leading-tight">
                      {b.code || "Branch"}
                    </span>
                    <span className="text-xs text-emerald-600 font-bold flex items-center gap-1 leading-tight">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Active Campus
                    </span>
                  </div>

                  <h3 className="font-bold text-slate-900 dark:text-white text-sm sm:text-base leading-snug">
                    {b.name}
                  </h3>

                  <div className="text-xs text-slate-500 space-y-1 leading-normal">
                    <p className="flex items-start gap-1.5">
                      <HiOutlineBuildingOffice2 className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                      <span>{b.address || "Main Campus Location"}</span>
                    </p>
                    {b.phone && (
                      <p className="flex items-center gap-1.5">
                        <HiOutlinePhone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span className="font-semibold text-slate-800 dark:text-slate-200">{b.phone}</span>
                      </p>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full py-6 text-center text-slate-400 text-xs">
                No physical branches configured yet.
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 4: Student Resource Toolkit */}
      {activeTab === "toolkit" && (
        <div className="space-y-3.5">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-tight">Essential Software & Templates</h2>
            <p className="text-xs text-slate-500 mt-0.5 leading-normal">Official materials, development software, and templates to speed up your learning.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {RESOURCE_TOOLKIT.map((item, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-3.5 sm:p-4 rounded-xl shadow-sm flex flex-col justify-between space-y-2.5 hover:border-blue-400 transition-all"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 text-[10px] font-black uppercase tracking-wider bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded leading-tight">
                      {item.category}
                    </span>
                    <span className="text-[10px] font-bold text-blue-600 leading-tight">
                      {item.tag}
                    </span>
                  </div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-sm sm:text-base leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-500 leading-normal">
                    {item.desc}
                  </p>
                </div>

                <a
                  href={item.link}
                  target={item.link.startsWith("http") ? "_blank" : "_self"}
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-700 leading-tight"
                >
                  <span>Access Resource</span>
                  <HiOutlineArrowTopRightOnSquare className="w-3.5 h-3.5" />
                </a>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Modal: Create Support Ticket ─────────────────────── */}
      <AnimatePresence>
        {showCreateModal && (
          <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-xl shadow-2xl border border-slate-200 dark:border-slate-800 p-4 sm:p-5 space-y-3.5"
            >
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2.5">
                <div className="flex items-center gap-1.5">
                  <HiOutlineTicket className="w-4 h-4 text-blue-600" />
                  <h3 className="font-black text-slate-900 dark:text-white text-base leading-snug">Raise Support Ticket</h3>
                </div>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="text-slate-400 hover:text-slate-600"
                >
                  <HiXMark className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleCreateTicket} className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1 leading-tight">
                    Inquiry Subject
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Cannot open Lecture 4 assignment submission"
                    value={createForm.subject}
                    onChange={(e) => setCreateForm({ ...createForm, subject: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm rounded-lg outline-none focus:ring-2 focus:ring-blue-500 dark:text-white leading-snug"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1 leading-tight">
                      Category
                    </label>
                    <select
                      value={createForm.category}
                      onChange={(e) => setCreateForm({ ...createForm, category: e.target.value })}
                      className="w-full px-2.5 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm rounded-lg outline-none focus:ring-2 focus:ring-blue-500 dark:text-white leading-snug"
                    >
                      <option value="academic">Academic & Mentor</option>
                      <option value="payment">Billing & Payments</option>
                      <option value="lms">LMS & Video Technical</option>
                      <option value="certificate">Certificate & Exam</option>
                      <option value="freelancing">Freelance & Marketplace</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1 leading-tight">
                      Urgency Priority
                    </label>
                    <select
                      value={createForm.priority}
                      onChange={(e) => setCreateForm({ ...createForm, priority: e.target.value })}
                      className="w-full px-2.5 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm rounded-lg outline-none focus:ring-2 focus:ring-blue-500 dark:text-white leading-snug"
                    >
                      <option value="low">Low (Standard inquiry)</option>
                      <option value="medium">Medium (Requires attention)</option>
                      <option value="high">High (Urgent / Exam / Order)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1 leading-tight">
                    Describe your problem or question
                  </label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Provide details, module number, or error messages..."
                    value={createForm.message}
                    onChange={(e) => setCreateForm({ ...createForm, message: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm rounded-lg outline-none focus:ring-2 focus:ring-blue-500 dark:text-white resize-none leading-normal"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-1.5">
                  <button
                    type="button"
                    onClick={() => setShowCreateModal(false)}
                    className="px-3.5 py-1.5 text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 rounded-lg leading-tight"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submittingTicket}
                    className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg shadow-sm disabled:opacity-50 leading-tight"
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
          <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white dark:bg-slate-900 w-full max-w-2xl max-h-[85vh] flex flex-col rounded-xl shadow-2xl border border-slate-200 dark:border-slate-800"
            >
              {/* Header */}
              <div className="p-3.5 sm:p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between shrink-0">
                <div>
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <span className="px-1.5 py-0.5 text-[9px] font-black uppercase bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-400 rounded leading-tight">
                      {selectedTicket.status}
                    </span>
                    <span className="text-xs text-slate-400 uppercase font-bold leading-tight">
                      {selectedTicket.category || 'General'}
                    </span>
                  </div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-sm sm:text-base leading-snug">
                    {selectedTicket.subject}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedTicket(null)}
                  className="text-slate-400 hover:text-slate-600"
                >
                  <HiXMark className="w-5 h-5" />
                </button>
              </div>

              {/* Message Thread Body */}
              <div className="flex-1 overflow-y-auto p-3.5 sm:p-4 space-y-2.5">
                {/* Initial Inquiry */}
                <div className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded-xl border border-slate-100 dark:border-slate-800 space-y-1">
                  <div className="flex items-center justify-between text-xs text-slate-400 font-semibold leading-tight">
                    <span>You (Initial Request)</span>
                    <span>{new Date(selectedTicket.createdAt).toLocaleString()}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-normal whitespace-pre-wrap">
                    {selectedTicket.message}
                  </p>
                </div>

                {/* Responses */}
                {selectedTicket.responses && selectedTicket.responses.length > 0 ? (
                  selectedTicket.responses.map((resp, i) => (
                    <div
                      key={i}
                      className="bg-blue-50/60 dark:bg-blue-950/30 p-3 rounded-xl border border-blue-100 dark:border-blue-900/40 space-y-1"
                    >
                      <div className="flex items-center justify-between text-xs text-blue-600 dark:text-blue-400 font-bold leading-tight">
                        <span>{resp.user?.name || "Support Staff / Mentor"}</span>
                        <span className="text-slate-400 font-normal">{new Date(resp.createdAt).toLocaleString()}</span>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-normal whitespace-pre-wrap">
                        {resp.message}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-center text-slate-400 py-2 italic">
                    A support engineer or mentor has received your inquiry and will reply shortly.
                  </p>
                )}
              </div>

              {/* Reply Box Footer */}
              <form onSubmit={handleSendReply} className="p-3 border-t border-slate-100 dark:border-slate-800 flex gap-2 shrink-0">
                <input
                  type="text"
                  placeholder="Type your message or follow-up clarification..."
                  value={replyMessage}
                  onChange={(e) => setReplyMessage(e.target.value)}
                  className="flex-1 px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm rounded-lg outline-none focus:ring-2 focus:ring-blue-500 dark:text-white leading-snug"
                />
                <button
                  type="submit"
                  disabled={submittingReply || !replyMessage.trim()}
                  className="px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-lg flex items-center gap-1 disabled:opacity-50 transition-all shadow-sm leading-tight"
                >
                  <HiOutlinePaperAirplane className="w-3.5 h-3.5" />
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
