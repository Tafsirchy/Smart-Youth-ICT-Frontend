'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSession } from 'next-auth/react';
import { 
  HiOutlineLifebuoy, 
  HiOutlineTicket, 
  HiOutlinePlus, 
  HiOutlineChatBubbleLeftRight, 
  HiOutlineClock, 
  HiOutlineCheckCircle, 
  HiOutlineExclamationCircle,
  HiOutlinePaperAirplane,
  HiOutlinePhoto,
  HiOutlineMagnifyingGlass,
  HiOutlineXMark,
  HiOutlineStar,
  HiOutlineArrowTopRightOnSquare,
  HiChevronRight,
  HiOutlineLightBulb
} from 'react-icons/hi2';
import { FaWhatsapp, FaStar } from 'react-icons/fa6';
import api from '@/lib/api';
import toast from 'react-hot-toast';
import ImageUpload from '@/components/ui/ImageUpload';

const SMART_SUGGESTIONS = [
  {
    keywords: ['payment', 'bkash', 'nagad', 'installment', 'money', 'slip', 'cash'],
    title: 'Payment Verification Tip',
    tip: 'Manual payments (bKash/Nagad/Bank) are typically verified within 2-4 hours. You can verify your submitted TrxID under Payments > Invoices.'
  },
  {
    keywords: ['video', 'play', 'lecture', 'recording', 'class', 'meet', 'zoom'],
    title: 'LMS Lecture Access',
    tip: 'Recorded sessions are uploaded 6-12 hours after live class. Ensure you are logged into your enrolled SYICT Google email.'
  },
  {
    keywords: ['certificate', 'exam', 'grade', 'verify'],
    title: 'Certificate Issuance Criteria',
    tip: 'Certificates are unlocked upon maintaining 70% live attendance and submitting the final course capstone project.'
  },
  {
    keywords: ['fiverr', 'upwork', 'order', 'client', 'freelancing', 'buyer'],
    title: 'Urgent Marketplace Support',
    tip: 'Have a live client order? You can reach our 24/7 Freelancing Mentorship Desk directly via WhatsApp for emergency order review.'
  }
];

export default function SupportContent() {
  const { data: session } = useSession();
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Modals & Panels
  const [showCreate, setShowCreate] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  
  // Create Form
  const [createForm, setCreateForm] = useState({ 
    subject: '', 
    category: 'academic', 
    priority: 'medium', 
    message: '',
    attachment: '' 
  });
  const [submitting, setSubmitting] = useState(false);

  // Reply Form
  const [replyMessage, setReplyMessage] = useState('');
  const [replyAttachment, setReplyAttachment] = useState('');
  const [submittingReply, setSubmittingReply] = useState(false);

  // Rating / Resolution
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [userRating, setUserRating] = useState(5);
  const [resolutionFeedback, setResolutionFeedback] = useState('');

  // Lightbox Image
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      setLoading(true);
      const res = await api.get('/support/me');
      if (res.data?.success) {
        setTickets(res.data.data || []);
      }
    } catch (err) {
      console.error('Failed to fetch tickets', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTicket = async (e) => {
    e.preventDefault();
    if (!createForm.subject.trim() || !createForm.message.trim()) {
      return toast.error('Subject and description are required');
    }

    setSubmitting(true);
    try {
      const res = await api.post('/support', createForm);
      if (res.data?.success) {
        toast.success('Support ticket raised successfully!');
        setShowCreate(false);
        setCreateForm({ subject: '', category: 'academic', priority: 'medium', message: '', attachment: '' });
        fetchTickets();
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Failed to create ticket');
    } finally {
      setSubmitting(false);
    }
  };

  const handleSendReply = async (e) => {
    e.preventDefault();
    if (!replyMessage.trim() && !replyAttachment) return;

    setSubmittingReply(true);
    try {
      const res = await api.put(`/support/${selectedTicket._id}/response`, {
        message: replyMessage.trim() || 'Attached screenshot for review',
        attachment: replyAttachment || null
      });

      if (res.data?.success) {
        toast.success('Reply submitted');
        setSelectedTicket(res.data.data);
        setReplyMessage('');
        setReplyAttachment('');
        fetchTickets();
      }
    } catch (err) {
      toast.error('Failed to send reply');
    } finally {
      setSubmittingReply(false);
    }
  };

  const handleMarkResolved = async () => {
    if (!selectedTicket) return;
    try {
      const res = await api.put(`/support/${selectedTicket._id}/resolve`, {
        rating: userRating,
        feedback: resolutionFeedback.trim()
      });
      if (res.data?.success) {
        toast.success('Ticket marked as resolved! Thank you for your feedback.');
        setSelectedTicket(res.data.data);
        setShowRatingModal(false);
        fetchTickets();
      }
    } catch (err) {
      toast.error('Failed to resolve ticket');
    }
  };

  // WhatsApp Handler
  const handleOpenWhatsApp = () => {
    const name = session?.user?.name || 'Student';
    const email = session?.user?.email || 'N/A';
    const text = encodeURIComponent(
      `Hello Smart Youth ICT Support Hub!\nName: ${name}\nEmail: ${email}\nI need immediate assistance regarding: `
    );
    window.open(`https://wa.me/8801722550012?text=${text}`, '_blank');
  };

  // Real-time suggested smart tips while creating ticket
  const matchingSuggestion = useMemo(() => {
    if (!createForm.subject.trim()) return null;
    const lower = createForm.subject.toLowerCase();
    return SMART_SUGGESTIONS.find(s => s.keywords.some(k => lower.includes(k)));
  }, [createForm.subject]);

  // Filtered tickets
  const filteredTickets = useMemo(() => {
    return tickets.filter(t => {
      const matchesStatus = statusFilter === 'all' || t.status === statusFilter;
      const matchesSearch = !searchQuery || 
        t.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.message.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesStatus && matchesSearch;
    });
  }, [tickets, statusFilter, searchQuery]);

  return (
    <div className="py-6 max-w-7xl mx-auto space-y-6">
      {/* ── Top Header ─────────────────────────────────────── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl shadow-sm">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              Support Hub
            </h1>
          </div>
          <p className="text-slate-500 text-xs sm:text-sm">
            Interactive issue tracking, mentor problem-solving, and live inquiry management.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={handleOpenWhatsApp}
            className="flex items-center gap-2 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 border border-emerald-200 dark:border-emerald-800 px-4 py-2.5 rounded-xl font-bold text-xs hover:bg-emerald-600 hover:text-white transition-all shadow-sm"
          >
            <FaWhatsapp className="w-4 h-4" />
            <span>Emergency WhatsApp</span>
          </button>

          <button 
            onClick={() => setShowCreate(true)}
            className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-xl font-bold text-xs shadow-md shadow-blue-500/20 hover:bg-blue-700 transition-all active:scale-95"
          >
            <HiOutlinePlus size={18} />
            <span>New Ticket</span>
          </button>
        </div>
      </div>

      {/* ── Filters & Search ───────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Status Pills */}
        <div className="flex gap-1.5 overflow-x-auto scrollbar-hide text-xs font-bold">
          {[
            { id: 'all', label: `All (${tickets.length})` },
            { id: 'open', label: `Open (${tickets.filter(t => t.status === 'open').length})` },
            { id: 'in-progress', label: `In Progress (${tickets.filter(t => t.status === 'in-progress').length})` },
            { id: 'resolved', label: `Resolved (${tickets.filter(t => t.status === 'resolved').length})` },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setStatusFilter(tab.id)}
              className={`px-3.5 py-1.5 rounded-lg border transition-all whitespace-nowrap ${
                statusFilter === tab.id
                  ? 'bg-slate-900 text-white border-slate-900 dark:bg-white dark:text-slate-900 shadow-sm'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:bg-slate-50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-72">
          <HiOutlineMagnifyingGlass className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search tickets by subject..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3.5 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs rounded-xl outline-none focus:ring-2 focus:ring-blue-500/30 dark:text-white"
          />
        </div>
      </div>

      {/* ── Tickets Main List ──────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-3">
          {loading ? (
            <div className="space-y-3">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-24 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl animate-pulse" />
              ))}
            </div>
          ) : filteredTickets.length > 0 ? (
            filteredTickets.map((ticket, i) => (
              <motion.div 
                key={ticket._id} 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03 }}
                onClick={() => setSelectedTicket(ticket)}
                className={`cursor-pointer bg-white dark:bg-slate-900 border p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all rounded-xl shadow-sm hover:shadow-md ${
                  selectedTicket?._id === ticket._id 
                    ? 'border-blue-500 ring-2 ring-blue-500/10' 
                    : 'border-slate-200 dark:border-slate-800 hover:border-slate-300'
                }`}
              >
                <div className="flex items-start gap-3.5">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${
                    ticket.status === 'open' ? 'bg-blue-50 dark:bg-blue-950/50 text-blue-600' :
                    ticket.status === 'resolved' ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600' :
                    'bg-amber-50 dark:bg-amber-950/50 text-amber-600'
                  }`}>
                    <HiOutlineChatBubbleLeftRight size={20} />
                  </div>

                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`px-2 py-0.5 text-[10px] font-black uppercase rounded-md tracking-wider ${
                        ticket.status === 'open' ? 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300' :
                        ticket.status === 'resolved' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' :
                        'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                      }`}>
                        {ticket.status}
                      </span>

                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                        {ticket.category || 'general'}
                      </span>

                      <span className={`text-[10px] font-bold uppercase ${
                        ticket.priority === 'high' ? 'text-rose-500 font-black' : 'text-slate-400'
                      }`}>
                        • {ticket.priority} priority
                      </span>
                    </div>

                    <h3 className="font-bold text-slate-900 dark:text-white text-sm hover:text-blue-600 transition-colors">
                      {ticket.subject}
                    </h3>

                    <p className="text-xs text-slate-500 line-clamp-1">
                      {ticket.message}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-xs text-slate-400 shrink-0 self-end sm:self-center">
                  {ticket.attachment && (
                    <span className="flex items-center gap-1 text-[10px] text-blue-600 font-bold bg-blue-50 dark:bg-blue-950 px-2 py-0.5 rounded">
                      <HiOutlinePhoto size={13} /> Screenshot
                    </span>
                  )}
                  {ticket.responses?.length > 0 && (
                    <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold rounded">
                      {ticket.responses.length} reply
                    </span>
                  )}
                  <HiChevronRight className="text-slate-300" size={18} />
                </div>
              </motion.div>
            ))
          ) : (
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-12 text-center rounded-2xl space-y-3">
              <HiOutlineLifebuoy size={36} className="text-slate-300 mx-auto" />
              <h3 className="font-bold text-slate-700 dark:text-slate-300 text-base">No support tickets found</h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                {searchQuery || statusFilter !== 'all' 
                  ? 'No tickets match your filter criteria.' 
                  : 'Have an academic question, payment doubt, or bug to report? Click New Ticket to begin.'}
              </p>
            </div>
          )}
        </div>

        {/* ── Sidebar: Response Time & FAQs ──────────────────── */}
        <div className="space-y-5">
          {/* Response SLA Box */}
          <div className="bg-gradient-to-br from-slate-900 to-indigo-950 p-6 text-white rounded-2xl shadow-sm space-y-4 relative overflow-hidden">
            <h3 className="text-sm font-black uppercase tracking-wider text-indigo-200">
              Live Support SLA
            </h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                  <FaWhatsapp className="text-emerald-400 w-4 h-4" />
                </div>
                <div>
                  <p className="text-[10px] text-white/50 font-bold uppercase tracking-wider">WhatsApp Emergency Desk</p>
                  <p className="font-bold text-sm">2–5 Minutes</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                  <HiOutlineClock className="text-blue-400 w-4 h-4" />
                </div>
                <div>
                  <p className="text-[10px] text-white/50 font-bold uppercase tracking-wider">Ticket Investigation</p>
                  <p className="font-bold text-sm">2–4 Business Hours</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick FAQ Highlights */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-2xl shadow-sm space-y-3">
            <h3 className="font-bold text-slate-900 dark:text-white text-xs uppercase tracking-wider flex items-center gap-2">
              <HiOutlineExclamationCircle className="text-blue-500 w-4 h-4" />
              Common Student FAQs
            </h3>

            <div className="space-y-2.5 text-xs text-slate-600 dark:text-slate-400">
              <div className="p-2.5 bg-slate-50 dark:bg-slate-800/50 rounded-lg space-y-1">
                <p className="font-bold text-slate-900 dark:text-white">When is manual payment approved?</p>
                <p className="leading-relaxed">Transactions sent with TrxID are verified by our accounts cell within 2-4 hours.</p>
              </div>

              <div className="p-2.5 bg-slate-50 dark:bg-slate-800/50 rounded-lg space-y-1">
                <p className="font-bold text-slate-900 dark:text-white">How to get 1-on-1 Mentor Help?</p>
                <p className="leading-relaxed">Raise a ticket with category 'Academic & Mentor' or join the daily live doubt clearing Zoom.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Modal: Create New Ticket ─────────────────────────── */}
      <AnimatePresence>
        {showCreate && (
          <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white dark:bg-slate-900 w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-4"
            >
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-950 text-blue-600 flex items-center justify-center">
                    <HiOutlineTicket size={18} />
                  </div>
                  <h3 className="font-black text-slate-900 dark:text-white text-base">New Support Inquiry</h3>
                </div>
                <button onClick={() => setShowCreate(false)} className="text-slate-400 hover:text-slate-600">
                  <HiOutlineXMark size={20} />
                </button>
              </div>

              <form onSubmit={handleCreateTicket} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Subject Summary
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Cannot upload assignment for Module 3"
                    value={createForm.subject}
                    onChange={(e) => setCreateForm({ ...createForm, subject: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm rounded-xl outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
                  />
                </div>

                {/* Smart Suggestion Notification */}
                {matchingSuggestion && (
                  <div className="p-3 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/50 rounded-xl space-y-1">
                    <div className="flex items-center gap-1.5 text-amber-800 dark:text-amber-300 text-xs font-bold">
                      <HiOutlineLightBulb className="w-4 h-4" />
                      <span>{matchingSuggestion.title}</span>
                    </div>
                    <p className="text-[11px] text-amber-900/80 dark:text-amber-200/80 leading-relaxed">
                      {matchingSuggestion.tip}
                    </p>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Inquiry Category
                    </label>
                    <select
                      value={createForm.category}
                      onChange={(e) => setCreateForm({ ...createForm, category: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs rounded-xl outline-none focus:ring-2 focus:ring-blue-500 dark:text-white font-medium"
                    >
                      <option value="academic">Academic & Mentor</option>
                      <option value="payment">Billing & Payments</option>
                      <option value="lms">LMS & Live Class Bug</option>
                      <option value="certificate">Certificate & Exam</option>
                      <option value="freelancing">Freelance & Order Support</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Priority Level
                    </label>
                    <select
                      value={createForm.priority}
                      onChange={(e) => setCreateForm({ ...createForm, priority: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs rounded-xl outline-none focus:ring-2 focus:ring-blue-500 dark:text-white font-medium"
                    >
                      <option value="low">Low (General Query)</option>
                      <option value="medium">Medium (Standard)</option>
                      <option value="high">High (Urgent / Live Order)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Detailed Message
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Describe what happened, step-by-step or what error code you observed..."
                    value={createForm.message}
                    onChange={(e) => setCreateForm({ ...createForm, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm rounded-xl outline-none focus:ring-2 focus:ring-blue-500 dark:text-white resize-none"
                  />
                </div>

                {/* Screenshot Attachment */}
                <ImageUpload
                  value={createForm.attachment}
                  onChange={(url) => setCreateForm({ ...createForm, attachment: url })}
                  label="Attach Screenshot or Error Photo (Optional)"
                />

                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowCreate(false)}
                    className="px-4 py-2 text-xs font-bold text-slate-500 hover:bg-slate-100 rounded-xl"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-sm disabled:opacity-50"
                  >
                    {submitting ? 'Submitting...' : 'Submit Support Request'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ── Modal: Conversation Thread View ──────────────────── */}
      <AnimatePresence>
        {selectedTicket && (
          <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white dark:bg-slate-900 w-full max-w-2xl max-h-[88vh] flex flex-col rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden"
            >
              {/* Header */}
              <div className="p-4 sm:p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between shrink-0 bg-slate-50/50 dark:bg-slate-800/40">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-0.5 text-[10px] font-black uppercase rounded ${
                      selectedTicket.status === 'resolved' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-400' :
                      selectedTicket.status === 'in-progress' ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-400' :
                      'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-400'
                    }`}>
                      {selectedTicket.status}
                    </span>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                      {selectedTicket.category || 'General'}
                    </span>
                  </div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-base">
                    {selectedTicket.subject}
                  </h3>
                </div>

                <div className="flex items-center gap-2">
                  {selectedTicket.status !== 'resolved' && (
                    <button
                      onClick={() => setShowRatingModal(true)}
                      className="px-3 py-1.5 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 border border-emerald-200 dark:border-emerald-800 text-xs font-bold rounded-lg hover:bg-emerald-600 hover:text-white transition-all"
                    >
                      Mark Resolved
                    </button>
                  )}
                  <button onClick={() => setSelectedTicket(null)} className="p-1 text-slate-400 hover:text-slate-600">
                    <HiOutlineXMark size={22} />
                  </button>
                </div>
              </div>

              {/* Chat Thread */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
                {/* Initial Student Message */}
                <div className="bg-slate-50 dark:bg-slate-800/70 p-4 rounded-xl border border-slate-100 dark:border-slate-800 space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-500">
                    <span>You (Initial Inquiry)</span>
                    <span className="font-normal text-[11px]">{new Date(selectedTicket.createdAt).toLocaleString()}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 whitespace-pre-wrap leading-relaxed">
                    {selectedTicket.message}
                  </p>
                  {selectedTicket.attachment && (
                    <div className="pt-2">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Attached Screenshot:</p>
                      <img 
                        src={selectedTicket.attachment} 
                        alt="Attachment" 
                        onClick={() => setPreviewImage(selectedTicket.attachment)}
                        className="cursor-pointer max-h-44 rounded-lg border border-slate-200 dark:border-slate-700 hover:opacity-90 transition-opacity" 
                      />
                    </div>
                  )}
                </div>

                {/* Conversation Responses */}
                {selectedTicket.responses && selectedTicket.responses.length > 0 ? (
                  selectedTicket.responses.map((resp, i) => {
                    const isStaff = resp.user?.role !== 'student';
                    return (
                      <div
                        key={i}
                        className={`p-4 rounded-xl border space-y-2 ${
                          isStaff 
                            ? 'bg-blue-50/70 dark:bg-blue-950/30 border-blue-100 dark:border-blue-900/40 ml-0 sm:ml-4' 
                            : 'bg-slate-50 dark:bg-slate-800/70 border-slate-100 dark:border-slate-800 mr-0 sm:mr-4'
                        }`}
                      >
                        <div className="flex items-center justify-between text-xs">
                          <div className="flex items-center gap-1.5 font-bold">
                            <span className={isStaff ? 'text-blue-600 dark:text-blue-400' : 'text-slate-700 dark:text-slate-300'}>
                              {resp.user?.name || (isStaff ? 'Head Office Mentor' : 'You')}
                            </span>
                            {isStaff && (
                              <span className="text-[9px] font-black uppercase px-1.5 py-0.5 bg-blue-600 text-white rounded">
                                {resp.user?.role || 'Staff'}
                              </span>
                            )}
                          </div>
                          <span className="text-[11px] text-slate-400">{new Date(resp.createdAt).toLocaleString()}</span>
                        </div>

                        <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 whitespace-pre-wrap leading-relaxed">
                          {resp.message}
                        </p>

                        {resp.attachment && (
                          <div className="pt-1">
                            <img 
                              src={resp.attachment} 
                              alt="Response attachment" 
                              onClick={() => setPreviewImage(resp.attachment)}
                              className="cursor-pointer max-h-40 rounded-lg border border-slate-200 hover:opacity-90"
                            />
                          </div>
                        )}
                      </div>
                    );
                  })
                ) : (
                  <p className="text-xs text-center text-slate-400 py-4 italic">
                    Your request has been queued. An assigned mentor or support specialist will review and reply shortly.
                  </p>
                )}
              </div>

              {/* Reply Box Footer */}
              <form onSubmit={handleSendReply} className="p-3 sm:p-4 border-t border-slate-100 dark:border-slate-800 space-y-2 bg-white dark:bg-slate-900 shrink-0">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Type your reply message or follow-up question..."
                    value={replyMessage}
                    onChange={(e) => setReplyMessage(e.target.value)}
                    className="flex-1 px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm rounded-xl outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
                  />
                  <button
                    type="submit"
                    disabled={submittingReply || (!replyMessage.trim() && !replyAttachment)}
                    className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 disabled:opacity-40 transition-all shadow-sm"
                  >
                    <HiOutlinePaperAirplane className="w-4 h-4" />
                    <span>Send</span>
                  </button>
                </div>

                {replyAttachment && (
                  <div className="flex items-center justify-between text-xs text-blue-600 bg-blue-50 dark:bg-blue-950/50 p-2 rounded-lg">
                    <span>1 screenshot attached</span>
                    <button type="button" onClick={() => setReplyAttachment('')} className="text-rose-500 hover:underline">
                      Remove
                    </button>
                  </div>
                )}
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ── Modal: Rating & Resolution ──────────────────────── */}
      <AnimatePresence>
        {showRatingModal && (
          <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white dark:bg-slate-900 w-full max-w-md rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-4 text-center"
            >
              <HiOutlineCheckCircle className="w-12 h-12 text-emerald-500 mx-auto" />
              <h3 className="font-black text-slate-900 dark:text-white text-lg">Mark as Resolved?</h3>
              <p className="text-xs text-slate-500">
                How satisfied are you with the solution provided by our support team?
              </p>

              {/* 5-star Rating */}
              <div className="flex items-center justify-center gap-2 py-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setUserRating(star)}
                    className="p-1 text-2xl transition-transform hover:scale-125"
                  >
                    {star <= userRating ? (
                      <FaStar className="text-amber-400" />
                    ) : (
                      <HiOutlineStar className="text-slate-300" />
                    )}
                  </button>
                ))}
              </div>

              <textarea
                rows={2}
                placeholder="Optional feedback: Was your issue resolved quickly?"
                value={resolutionFeedback}
                onChange={(e) => setResolutionFeedback(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs rounded-xl outline-none focus:ring-2 focus:ring-blue-500 resize-none dark:text-white"
              />

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowRatingModal(false)}
                  className="px-4 py-2 text-xs font-bold text-slate-500 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleMarkResolved}
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-sm"
                >
                  Confirm & Resolve
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ── Modal: Lightbox Image Viewer ─────────────────────── */}
      <AnimatePresence>
        {previewImage && (
          <div 
            onClick={() => setPreviewImage(null)}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 cursor-pointer"
          >
            <div className="relative max-w-4xl max-h-[90vh]">
              <img src={previewImage} alt="Enlarged screenshot" className="max-w-full max-h-[85vh] rounded-xl shadow-2xl object-contain" />
              <button 
                onClick={() => setPreviewImage(null)}
                className="absolute top-3 right-3 text-white bg-black/60 p-2 rounded-full hover:bg-black"
              >
                <HiOutlineXMark size={20} />
              </button>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
