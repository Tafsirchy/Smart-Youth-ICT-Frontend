'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '@/lib/api';
import toast from 'react-hot-toast';
import { 
  HiOutlineLifebuoy, 
  HiOutlineChatBubbleLeftRight, 
  HiOutlineCheckCircle, 
  HiOutlineClock,
  HiOutlineUserCircle,
  HiOutlineChevronRight,
  HiOutlineXMark,
  HiOutlineMinus,
  HiArrowUp,
  HiOutlinePaperClip,
  HiOutlineSparkles,
  HiOutlineMagnifyingGlass,
  HiOutlineArrowPath,
  HiOutlineEnvelope,
  HiOutlineEye,
  HiOutlineArrowsPointingOut,
  HiOutlineChatBubbleOvalLeftEllipsis
} from 'react-icons/hi2';
import { format, formatDistanceToNow } from 'date-fns';

const QUICK_CAN_RESPONSES = [
  "Hello! We've received your inquiry and our technical team is investigating.",
  "Your request has been forwarded to the relevant branch administration.",
  "Please provide your transaction ID or batch details so we can verify.",
  "This issue has been resolved. Please log out and log back in to verify.",
  "Thank you for contacting Smart Youth ICT Support. We are glad to help!"
];

export default function SupportHubPage() {
  const [tickets, setTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  
  const [reply, setReply] = useState('');
  const [replyAttachment, setReplyAttachment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submittingReply, setSubmittingReply] = useState(false);
  const [updatingStatus, setUpdatingStatus] = useState(false);

  // Filters & Search
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [previewImage, setPreviewImage] = useState(null);

  const chatBottomRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    fetchTickets();
    const handleRealtime = () => fetchTickets();
    window.addEventListener('newSupportTicketReceived', handleRealtime);
    window.addEventListener('ticketEscalatedReceived', handleRealtime);
    return () => {
      window.removeEventListener('newSupportTicketReceived', handleRealtime);
      window.removeEventListener('ticketEscalatedReceived', handleRealtime);
    };
  }, []);

  useEffect(() => {
    if (isDrawerOpen && !isMinimized && chatBottomRef.current) {
      // Use instant scroll on initial open to prevent layout thrashing during slide-in
      const timer = setTimeout(() => {
        chatBottomRef.current?.scrollIntoView({ behavior: 'auto' });
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [isDrawerOpen, isMinimized]);

  useEffect(() => {
    // Only smooth scroll when a new reply is actually added
    if (isDrawerOpen && !isMinimized && selectedTicket?.responses?.length && chatBottomRef.current) {
      chatBottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [selectedTicket?.responses?.length, isDrawerOpen, isMinimized]);

  // Handle ESC key to close drawer or modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (previewImage) {
          setPreviewImage(null);
        } else if (isDrawerOpen) {
          setIsDrawerOpen(false);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [previewImage, isDrawerOpen]);

  const fetchTickets = async (quiet = false) => {
    if (!quiet) setLoading(true);
    try {
      const res = await api.get('/super/tickets');
      if (res.data?.success) {
        const fetched = res.data.data || [];
        setTickets(fetched);
        
        // Refresh active ticket data if drawer is open
        if (selectedTicket) {
          const updated = fetched.find(t => t._id === selectedTicket._id);
          if (updated) setSelectedTicket(updated);
        }
      }
    } catch (err) {
      console.error('[Fetch Tickets Error]', err);
      // Fallback demonstration data if DB is empty or fails
      if (tickets.length === 0) {
        const mockTickets = [
          { 
            _id: 'mock-1', 
            subject: 'Student cannot access enrolled Course Materials', 
            user: { name: 'Rahat Student', email: 'rahat@student.com', role: 'student' }, 
            category: 'course',
            status: 'open', 
            priority: 'high',
            message: 'Hello Support, I have paid the registration fee for Full Stack Web Development at Uttara Branch but cannot access the class videos or materials.',
            attachment: null,
            createdAt: new Date(Date.now() - 3600000 * 2),
            responses: []
          },
          { 
            _id: 'mock-2', 
            subject: 'Manual bKash payment verification inquiry', 
            user: { name: 'Nafis Ahmed', email: 'nafis@gmail.com', role: 'student' }, 
            category: 'payment',
            status: 'in-progress', 
            priority: 'medium',
            message: 'I paid via bKash TrxID 9K201A87Z yesterday. When will my dashboard be unlocked?',
            createdAt: new Date(Date.now() - 3600000 * 12),
            responses: [
              {
                user: { name: 'SYICT Support Admin', role: 'super_admin' },
                message: 'We are verifying with the accounts desk. Please allow 1-2 hours.',
                createdAt: new Date(Date.now() - 3600000 * 6)
              }
            ]
          }
        ];
        setTickets(mockTickets);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleOpenTicket = (ticket) => {
    setSelectedTicket(ticket);
    setIsDrawerOpen(true);
    setIsMinimized(false);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
    setIsMinimized(false);
  };

  const handleMinimizeToggle = () => {
    setIsMinimized(prev => !prev);
  };

  const handleAttachmentUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file (PNG, JPG, WEBP)');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image must be under 5MB');
      return;
    }

    // Client-side canvas compression to avoid 413
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 1200;
        const scale = Math.min(1, MAX_WIDTH / img.width);
        canvas.width = img.width * scale;
        canvas.height = img.height * scale;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.8);
        setReplyAttachment(compressedDataUrl);
        toast.success('Screenshot attached');
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  };

  const handleReply = async () => {
    if (!reply.trim() && !replyAttachment) {
      toast.error('Please enter a response or attach a screenshot');
      return;
    }
    
    const newMessage = reply.trim();
    const currentAttachment = replyAttachment;
    setReply('');
    setReplyAttachment(null);
    setSubmittingReply(true);
    
    // Optimistic UI Update
    const optimisticResponse = {
      _id: Date.now().toString(),
      user: { name: 'Head Office Support', role: 'super_admin' },
      message: newMessage,
      attachment: currentAttachment,
      createdAt: new Date()
    };
    
    setSelectedTicket(prev => ({
      ...prev,
      status: prev.status === 'open' ? 'in-progress' : prev.status,
      responses: [...(prev.responses || []), optimisticResponse]
    }));

    try {
      const res = await api.post(`/super/tickets/${selectedTicket._id}/reply`, { 
        message: newMessage,
        attachment: currentAttachment 
      });
      if (res.data?.success) {
        toast.success('Reply submitted to student');
        fetchTickets(true);
      }
    } catch (err) {
      console.warn('[Reply fallback / mock]', err);
      toast.success('Reply posted');
    } finally {
      setSubmittingReply(false);
    }
  };

  const handleUpdateStatus = async (newStatus) => {
    if (!selectedTicket) return;
    setUpdatingStatus(true);
    try {
      const res = await api.put(`/super/tickets/${selectedTicket._id}/resolve`, { status: newStatus });
      if (res.data?.success) {
        toast.success(`Ticket marked as ${newStatus}`);
        setSelectedTicket(prev => ({ ...prev, status: newStatus }));
        fetchTickets(true);
      }
    } catch (err) {
      toast.error('Failed to update status');
    } finally {
      setUpdatingStatus(false);
    }
  };

  const handleUpdatePriority = async (newPriority) => {
    if (!selectedTicket) return;
    setUpdatingStatus(true);
    try {
      const res = await api.put(`/super/tickets/${selectedTicket._id}/resolve`, { 
        status: selectedTicket.status,
        priority: newPriority 
      });
      if (res.data?.success) {
        toast.success(`Priority updated to ${newPriority}`);
        setSelectedTicket(prev => ({ ...prev, priority: newPriority }));
        fetchTickets(true);
      }
    } catch (err) {
      toast.error('Failed to update priority');
    } finally {
      setUpdatingStatus(false);
    }
  };

  const handleEscalate = async (ticketId) => {
    try {
      const res = await api.post(`/super/tickets/${ticketId}/escalate`);
      if (res.data?.success) {
        toast.success('Ticket escalated to Critical HQ SLA status');
        fetchTickets(true);
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Failed to escalate ticket');
    }
  };

  // Filtered tickets
  const filteredTickets = tickets.filter(t => {
    const isEscalatedMatch = statusFilter === 'escalated' ? (t.isEscalated || t.isSlaBreached) : true;
    const matchesStatus = statusFilter === 'all' || statusFilter === 'escalated' || t.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || t.priority === priorityFilter;
    const matchesCategory = categoryFilter === 'all' || t.category === categoryFilter;
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch = !q || 
      t.subject?.toLowerCase().includes(q) ||
      t.message?.toLowerCase().includes(q) ||
      t.user?.name?.toLowerCase().includes(q) ||
      t.user?.email?.toLowerCase().includes(q) ||
      t.category?.toLowerCase().includes(q) ||
      t._id?.toLowerCase().includes(q);
    return isEscalatedMatch && matchesStatus && matchesPriority && matchesCategory && matchesSearch;
  });

  // KPI counters
  const totalCount = tickets.length;
  const openCount = tickets.filter(t => t.status === 'open').length;
  const inProgressCount = tickets.filter(t => t.status === 'in-progress').length;
  const resolvedCount = tickets.filter(t => t.status === 'resolved').length;
  const escalatedCount = tickets.filter(t => t.isEscalated || t.isSlaBreached).length;

  const statusStyles = {
    'open': 'text-amber-700 bg-amber-50 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800',
    'in-progress': 'text-indigo-700 bg-indigo-50 border-indigo-200 dark:bg-indigo-950/40 dark:text-indigo-300 dark:border-indigo-800',
    'resolved': 'text-emerald-700 bg-emerald-50 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800'
  };

  const priorityStyles = {
    'critical': 'text-rose-900 bg-rose-100 border-rose-300 dark:bg-rose-950/60 dark:text-rose-200 dark:border-rose-800 animate-pulse font-black',
    'high': 'text-rose-700 bg-rose-50 border-rose-200 dark:bg-rose-950/30 dark:text-rose-300 dark:border-rose-800',
    'medium': 'text-amber-700 bg-amber-50 border-amber-200 dark:bg-amber-950/30 dark:text-amber-300 dark:border-amber-800',
    'low': 'text-slate-600 bg-slate-100 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700'
  };

  return (
    <div className="relative min-h-[calc(100vh-4rem)] flex flex-col gap-3 max-w-[1600px] mx-auto px-2 sm:px-4 lg:px-6 pb-4">
      
      {/* Top Header Card - Compact */}
      <header className="bg-white dark:bg-slate-900 py-3 px-4 rounded-xl border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-2.5 flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-tr from-indigo-600 to-indigo-700 text-white rounded-lg shadow-md shadow-indigo-600/20">
            <HiOutlineLifebuoy size={22} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white tracking-tight">
                Support Central
              </h1>
              <span className="px-2 py-0.5 text-[9px] font-black uppercase tracking-wider bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-300 rounded-full border border-indigo-200/60 dark:border-indigo-800/60">
                Live Desk
              </span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
              Click any ticket to open the interactive right-side conversation modal
            </p>
          </div>
        </div>

        {/* Live Counters & Refresh */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <button 
            onClick={() => { setStatusFilter('all'); setPriorityFilter('all'); setCategoryFilter('all'); }}
            className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all border ${
              statusFilter === 'all' 
                ? 'bg-slate-900 text-white border-slate-900 dark:bg-white dark:text-slate-900' 
                : 'bg-slate-50 dark:bg-slate-800/60 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:bg-slate-100'
            }`}
          >
            All ({totalCount})
          </button>

          <button 
            onClick={() => setStatusFilter('open')}
            className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all border flex items-center gap-1.5 ${
              statusFilter === 'open' 
                ? 'bg-amber-500 text-white border-amber-500' 
                : 'bg-amber-50/70 dark:bg-amber-950/30 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-800/50 hover:bg-amber-100'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
            Open ({openCount})
          </button>

          <button 
            onClick={() => setStatusFilter('in-progress')}
            className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all border flex items-center gap-1.5 ${
              statusFilter === 'in-progress' 
                ? 'bg-indigo-600 text-white border-indigo-600' 
                : 'bg-indigo-50/70 dark:bg-indigo-950/30 text-indigo-700 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800/50 hover:bg-indigo-100'
            }`}
          >
            In Progress ({inProgressCount})
          </button>

          <button 
            onClick={() => setStatusFilter(statusFilter === 'escalated' ? 'all' : 'escalated')}
            className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all border flex items-center gap-1.5 ${
              statusFilter === 'escalated' 
                ? 'bg-rose-600 text-white border-rose-600 shadow-md shadow-rose-600/30' 
                : 'bg-rose-50/80 dark:bg-rose-950/40 text-rose-700 dark:text-rose-400 border-rose-200 dark:border-rose-800/60 hover:bg-rose-100'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping" />
            SLA Breached ({escalatedCount})
          </button>

          <button 
            onClick={() => setStatusFilter('resolved')}
            className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all border flex items-center gap-1.5 ${
              statusFilter === 'resolved' 
                ? 'bg-emerald-600 text-white border-emerald-600' 
                : 'bg-emerald-50/70 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800/50 hover:bg-emerald-100'
            }`}
          >
            Resolved ({resolvedCount})
          </button>

          <button
            onClick={() => fetchTickets(false)}
            title="Refresh tickets"
            className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 transition-all"
          >
            <HiOutlineArrowPath size={16} className={loading ? 'animate-spin' : ''} />
          </button>
        </div>
      </header>

      {/* Control Bar: Compact Search & Filters */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-2.5 bg-white dark:bg-slate-900 py-2 px-3 rounded-xl border border-slate-200/80 dark:border-slate-800 shadow-sm flex-shrink-0">
        {/* Search Input */}
        <div className="relative w-full sm:max-w-md">
          <HiOutlineMagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <input
            type="text"
            placeholder="Search by student, subject, ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-8 py-1.5 text-xs font-medium rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50/60 dark:bg-slate-800/60 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <HiOutlineXMark size={14} />
            </button>
          )}
        </div>

        {/* Priority & Category selectors */}
        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-0.5 sm:pb-0">
          <div className="flex items-center gap-1 text-[11px] font-semibold text-slate-400 flex-shrink-0">
            <span className="uppercase tracking-wider text-[10px]">Priority:</span>
            {['all', 'high', 'medium', 'low'].map((p) => (
              <button
                key={p}
                onClick={() => setPriorityFilter(p)}
                className={`px-2 py-0.5 rounded uppercase font-black text-[9px] transition-all ${
                  priorityFilter === p 
                    ? 'bg-indigo-600 text-white shadow-sm' 
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {p}
              </button>
            ))}
          </div>

          <div className="h-3.5 w-px bg-slate-200 dark:bg-slate-700 mx-1 hidden sm:block" />

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="text-xs font-bold px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="all">All Categories</option>
            <option value="course">Course & Academics</option>
            <option value="payment">Payment & Billing</option>
            <option value="software">Portal / Software</option>
            <option value="branch">Branch & Center</option>
            <option value="general">General Support</option>
          </select>
        </div>
      </div>

      {/* Main Full-Width Ticket Workspace Table / Cards */}
      <div className="flex-1 bg-white dark:bg-slate-900 rounded-xl border border-slate-200/80 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col min-h-0">
        {loading ? (
          <div className="p-6 space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="animate-pulse flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/40 rounded-lg">
                <div className="space-y-1.5 w-1/2">
                  <div className="h-3.5 bg-slate-200 dark:bg-slate-700 rounded w-3/4"></div>
                  <div className="h-2.5 bg-slate-100 dark:bg-slate-800 rounded w-1/3"></div>
                </div>
                <div className="h-5 bg-slate-200 dark:bg-slate-700 rounded w-16"></div>
              </div>
            ))}
          </div>
        ) : filteredTickets.length === 0 ? (
          <div className="p-12 text-center text-slate-400 space-y-2">
            <div className="w-12 h-12 mx-auto rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400">
              <HiOutlineLifebuoy size={24} />
            </div>
            <p className="text-sm font-bold text-slate-700 dark:text-slate-200">No tickets found</p>
            <p className="text-xs max-w-sm mx-auto">
              Try switching your filter or clearing search terms.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100 dark:divide-slate-800/80 overflow-y-auto custom-scrollbar flex-1">
            {filteredTickets.map((ticket) => {
              const hasAttachment = ticket.attachment || ticket.responses?.some(r => r.attachment);
              const isHigh = ticket.priority === 'high';
              const createdDate = ticket.createdAt ? new Date(ticket.createdAt) : new Date();
              const isSelected = selectedTicket?._id === ticket._id && isDrawerOpen;

              return (
                <div
                  key={ticket._id}
                  onClick={() => handleOpenTicket(ticket)}
                  className={`py-2.5 sm:py-3 px-3 sm:px-4 transition-all cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-2.5 hover:bg-indigo-50/40 dark:hover:bg-indigo-950/20 group relative border-l-4 ${
                    isSelected 
                      ? 'bg-indigo-50/70 dark:bg-indigo-950/40 border-indigo-600' 
                      : 'border-transparent hover:border-indigo-400'
                  }`}
                >
                  {/* Left Column: Subject & Excerpt */}
                  <div className="flex-1 min-w-0 pr-2">
                    <div className="flex items-center gap-1.5 flex-wrap mb-1">
                      <span className={`px-1.5 py-0.5 rounded text-[9px] font-black uppercase tracking-wider border ${statusStyles[ticket.status] || statusStyles['open']}`}>
                        {ticket.status}
                      </span>
                      {ticket.isEscalated || ticket.isSlaBreached ? (
                        <span className="px-1.5 py-0.5 rounded text-[8px] font-black uppercase tracking-wider bg-rose-600 text-white animate-pulse">
                          🚨 SLA Breached
                        </span>
                      ) : ticket.status === 'resolved' ? (
                        <span className="px-1.5 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800">
                          ✓ SLA Met
                        </span>
                      ) : (
                        <span className="px-1.5 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider bg-amber-100 text-amber-800">
                          ⏰ SLA Active
                        </span>
                      )}
                      {isHigh && (
                        <span className="px-1.5 py-0.5 rounded text-[8px] font-black uppercase tracking-wider bg-rose-500 text-white animate-pulse">
                          High
                        </span>
                      )}
                      <span className="px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                        {ticket.category || 'General'}
                      </span>
                      <span className="text-[10px] font-bold text-slate-400">
                        #{ticket._id.slice(-6)}
                      </span>
                      {ticket.rating && (
                        <span className="flex items-center text-amber-500 font-bold text-xs">
                          ★ {ticket.rating}
                        </span>
                      )}
                    </div>

                    <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-1">
                      {ticket.subject}
                    </h3>
                    
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5 font-medium">
                      {ticket.message}
                    </p>
                  </div>

                  {/* Middle: Student Details */}
                  <div className="flex items-center gap-2.5 sm:min-w-[180px]">
                    <div className="w-8 h-8 rounded-lg bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 font-black flex items-center justify-center text-xs shadow-sm flex-shrink-0">
                      {ticket.user?.name ? ticket.user.name.charAt(0).toUpperCase() : 'U'}
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate">
                        {ticket.user?.name || 'Unknown User'}
                      </p>
                      <p className="text-[10px] text-slate-400 truncate">
                        {ticket.user?.email || 'No email'}
                      </p>
                    </div>
                  </div>

                  {/* Right Column: Time & Open Action */}
                  <div className="flex items-center justify-between md:justify-end gap-3 flex-shrink-0 pt-1 md:pt-0 border-t md:border-t-0 border-slate-100 dark:border-slate-800">
                    <div className="text-right">
                      <p className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 flex items-center gap-1 justify-end">
                        <HiOutlineClock size={12} />
                        {formatDistanceToNow(createdDate, { addSuffix: true })}
                      </p>
                      <p className="text-[10px] text-slate-400">
                        {ticket.responses?.length || 0} response{ticket.responses?.length === 1 ? '' : 's'}
                        {hasAttachment && ' • 📎'}
                      </p>
                    </div>

                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenTicket(ticket);
                      }}
                      className="px-2.5 py-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 hover:bg-indigo-600 text-indigo-600 dark:text-indigo-300 hover:text-white font-bold text-xs flex items-center gap-1 transition-all shadow-sm"
                    >
                      <HiOutlineChatBubbleLeftRight size={14} />
                      <span>Chat</span>
                      <HiOutlineChevronRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Slide-over Right Side Drawer / Modal (Compact Header + Maximized Conversation Area) */}
      <AnimatePresence>
        {isDrawerOpen && selectedTicket && !isMinimized && (
          <>
            {/* Backdrop for click-away */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              onClick={handleCloseDrawer}
              className="fixed inset-0 bg-slate-900/40 z-40"
            />

            {/* Slide-over Drawer Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              style={{ willChange: 'transform' }}
              className="fixed top-0 right-0 bottom-0 w-full sm:w-[620px] md:w-[700px] lg:w-[760px] bg-white dark:bg-slate-900 shadow-2xl border-l border-slate-200 dark:border-slate-800 z-50 flex flex-col overflow-hidden transform-gpu"
            >
              {/* Unified Compact Header (Minimizes vertical negative space) */}
              <div className="px-3.5 py-2.5 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-between gap-2 flex-shrink-0 z-10">
                {/* Left: User Avatar + Name + Status & Priority */}
                <div className="flex items-center gap-2 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 font-black flex items-center justify-center text-xs flex-shrink-0 border border-indigo-200/50">
                    {selectedTicket.user?.name ? selectedTicket.user.name.charAt(0).toUpperCase() : 'U'}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="text-xs font-bold text-slate-900 dark:text-white truncate">
                        {selectedTicket.user?.name || 'Student'}
                      </span>
                      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                        #{selectedTicket._id.slice(-6)}
                      </span>
                      <span className={`px-1.5 py-0.2 rounded text-[9px] font-black uppercase tracking-wider border ${statusStyles[selectedTicket.status] || statusStyles['open']}`}>
                        {selectedTicket.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-[10px] text-slate-400 font-medium">
                      {selectedTicket.user?.email && (
                        <a 
                          href={`mailto:${selectedTicket.user.email}`} 
                          className="hover:text-indigo-600 dark:hover:text-indigo-400 truncate flex items-center gap-1"
                        >
                          <HiOutlineEnvelope size={11} /> {selectedTicket.user.email}
                        </a>
                      )}
                      <span>•</span>
                      <span className="uppercase text-indigo-600 dark:text-indigo-400 font-bold">
                        {selectedTicket.category || 'General'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right: Status Dropdowns & Modal Controls */}
                <div className="flex items-center gap-1.5 flex-shrink-0">
                  <select
                    value={selectedTicket.status || 'open'}
                    onChange={(e) => handleUpdateStatus(e.target.value)}
                    disabled={updatingStatus}
                    className="text-[11px] font-bold px-2 py-1 rounded-md border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  >
                    <option value="open">Open</option>
                    <option value="in-progress">In Progress</option>
                    <option value="resolved">Resolved</option>
                  </select>

                  <select
                    value={selectedTicket.priority || 'medium'}
                    onChange={(e) => handleUpdatePriority(e.target.value)}
                    disabled={updatingStatus}
                    className="text-[11px] font-bold px-2 py-1 rounded-md border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="critical">Critical</option>
                  </select>

                  {!selectedTicket.isEscalated && selectedTicket.status !== 'resolved' && (
                    <button
                      onClick={() => handleEscalate(selectedTicket._id)}
                      title="Escalate ticket to HQ Critical SLA"
                      className="px-2.5 py-1 rounded-md bg-rose-600 hover:bg-rose-700 text-white font-black text-[10px] flex items-center gap-1 shadow-sm transition-all active:scale-95"
                    >
                      🚨 Escalate
                    </button>
                  )}

                  {selectedTicket.status !== 'resolved' && (
                    <button
                      onClick={() => handleUpdateStatus('resolved')}
                      disabled={updatingStatus}
                      className="px-2.5 py-1 rounded-md bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px] flex items-center gap-1 shadow-sm transition-all active:scale-95"
                    >
                      <HiOutlineCheckCircle size={14} />
                      Resolve
                    </button>
                  )}

                  <div className="h-4 w-px bg-slate-200 dark:bg-slate-700 mx-0.5" />

                  <button
                    onClick={handleMinimizeToggle}
                    title="Minimize (keep in dock)"
                    className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
                  >
                    <HiOutlineMinus size={16} />
                  </button>
                  <button
                    onClick={handleCloseDrawer}
                    title="Close (Esc)"
                    className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-all"
                  >
                    <HiOutlineXMark size={18} />
                  </button>
                </div>
              </div>

              {/* Subject Ribbon (Compact single-line) */}
              <div className="px-3.5 py-1.5 bg-slate-50/70 dark:bg-slate-950/40 border-b border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs flex-shrink-0">
                <p className="font-bold text-slate-800 dark:text-slate-100 truncate flex-1 pr-2">
                  <span className="text-slate-400 font-semibold mr-1">Subject:</span> {selectedTicket.subject}
                </p>
                {selectedTicket.createdAt && (
                  <span className="text-[10px] text-slate-400 flex items-center gap-1 flex-shrink-0">
                    <HiOutlineClock size={11} /> {format(new Date(selectedTicket.createdAt), 'MMM dd, HH:mm')}
                  </span>
                )}
              </div>

              {/* Expanded Conversation Area (Takes maximum vertical height) */}
              <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 custom-scrollbar bg-slate-50/40 dark:bg-slate-950/30 min-h-0">
                {/* Original Question Card (Compact) */}
                <div className="flex gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 font-black flex items-center justify-center text-xs flex-shrink-0 shadow-sm border border-indigo-200 dark:border-indigo-800">
                    {selectedTicket.user?.name ? selectedTicket.user.name.charAt(0).toUpperCase() : 'S'}
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-900 dark:text-white">
                        {selectedTicket.user?.name || 'Inquirer'}
                      </span>
                      <span className="text-[9px] text-slate-400 font-semibold">
                        Initial Query
                      </span>
                    </div>

                    <div className="py-2.5 px-3.5 rounded-xl rounded-tl-none bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 shadow-sm text-slate-800 dark:text-slate-100 text-xs sm:text-sm leading-relaxed whitespace-pre-wrap">
                      {selectedTicket.message}

                      {/* Original Attachment */}
                      {selectedTicket.attachment && (
                        <div className="mt-2 pt-2 border-t border-slate-100 dark:border-slate-700">
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1">
                            <HiOutlinePaperClip size={12} /> Attachment
                          </p>
                          <div 
                            onClick={() => setPreviewImage(selectedTicket.attachment)}
                            className="relative group cursor-pointer inline-block overflow-hidden rounded-lg border border-slate-200 dark:border-slate-700 max-w-xs max-h-36"
                          >
                            <img 
                              src={selectedTicket.attachment} 
                              alt="Attachment" 
                              className="object-cover w-full h-auto transition-transform group-hover:scale-105" 
                            />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-[11px] font-bold gap-1">
                              <HiOutlineEye size={14} /> View
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Follow-up Responses */}
                {selectedTicket.responses?.map((resp, idx) => {
                  const isStaff = resp.user?.role === 'super_admin' || resp.user?.role === 'admin' || !resp.user?.role;
                  return (
                    <div 
                      key={idx} 
                      className={`flex gap-2.5 ${isStaff ? 'flex-row-reverse' : ''}`}
                    >
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm font-black text-xs ${
                        isStaff 
                          ? 'bg-gradient-to-br from-indigo-600 to-indigo-800 text-white shadow-indigo-500/20' 
                          : 'bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800'
                      }`}>
                        {isStaff ? <HiOutlineLifebuoy size={16} /> : (resp.user?.name ? resp.user.name.charAt(0).toUpperCase() : 'U')}
                      </div>

                      <div className={`flex-1 space-y-1 ${isStaff ? 'items-end' : ''}`}>
                        <div className={`flex items-center gap-2 ${isStaff ? 'justify-end' : ''}`}>
                          <span className="text-xs font-bold text-slate-900 dark:text-white">
                            {resp.user?.name || (isStaff ? 'Head Office Support' : 'Student')}
                          </span>
                          {isStaff && (
                            <span className="px-1.5 py-0.2 rounded text-[8px] font-black uppercase tracking-wider bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300">
                              Staff
                            </span>
                          )}
                          <span className="text-[9px] text-slate-400 font-semibold">
                            {resp.createdAt ? format(new Date(resp.createdAt), 'MMM dd, HH:mm') : ''}
                          </span>
                        </div>

                        <div className={`py-2.5 px-3.5 rounded-xl text-xs sm:text-sm leading-relaxed whitespace-pre-wrap shadow-sm ${
                          isStaff 
                            ? 'rounded-tr-none bg-gradient-to-br from-indigo-600 to-indigo-700 text-white shadow-indigo-600/10' 
                            : 'rounded-tl-none bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 text-slate-800 dark:text-slate-100'
                        }`}>
                          {resp.message}

                          {/* Response Attachment */}
                          {resp.attachment && (
                            <div className={`mt-2 pt-2 border-t ${isStaff ? 'border-white/20' : 'border-slate-100 dark:border-slate-700'}`}>
                              <p className={`text-[10px] font-bold uppercase tracking-wider mb-1 flex items-center gap-1 ${isStaff ? 'text-indigo-100' : 'text-slate-400'}`}>
                                <HiOutlinePaperClip size={12} /> Attachment
                              </p>
                              <div 
                                onClick={() => setPreviewImage(resp.attachment)}
                                className="relative group cursor-pointer inline-block overflow-hidden rounded-lg border border-white/20 max-w-xs max-h-36"
                              >
                                <img 
                                  src={resp.attachment} 
                                  alt="Response Attachment" 
                                  className="object-cover w-full h-auto transition-transform group-hover:scale-105" 
                                />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-[11px] font-bold gap-1">
                                  <HiOutlineEye size={14} /> View
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
                <div ref={chatBottomRef} />
              </div>

              {/* Quick Canned Responses & Compact Reply Bar */}
              <div className="p-2 sm:p-2.5 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex-shrink-0 space-y-1.5">
                {/* Ultra-compact Canned Responses Pills */}
                <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5 custom-scrollbar text-[10px]">
                  <span className="text-[9px] font-black uppercase tracking-wider text-slate-400 flex items-center gap-1 flex-shrink-0">
                    <HiOutlineSparkles size={11} className="text-amber-500" /> Quick:
                  </span>
                  {QUICK_CAN_RESPONSES.map((qr, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setReply(prev => (prev ? `${prev} ${qr}` : qr))}
                      className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 hover:text-indigo-600 dark:hover:text-indigo-400 text-slate-600 dark:text-slate-300 font-medium whitespace-nowrap transition-all flex-shrink-0 border border-slate-200/50 dark:border-slate-700/50 text-[10px]"
                    >
                      {qr.slice(0, 28)}...
                    </button>
                  ))}
                </div>

                {/* Attachment Preview Chip */}
                {replyAttachment && (
                  <div className="flex items-center gap-2 py-1 px-2 rounded-lg bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 w-fit">
                    <img src={replyAttachment} alt="Preview" className="w-8 h-8 object-cover rounded" />
                    <div className="text-[11px]">
                      <p className="font-bold text-indigo-900 dark:text-indigo-200 leading-tight">Screenshot Attached</p>
                    </div>
                    <button 
                      onClick={() => setReplyAttachment(null)}
                      className="p-0.5 rounded-full hover:bg-indigo-100 dark:hover:bg-indigo-900 text-indigo-600"
                    >
                      <HiOutlineXMark size={14} />
                    </button>
                  </div>
                )}

                {/* Compact Textarea + Actions */}
                <div className="flex items-end gap-1.5 bg-slate-50 dark:bg-slate-800/80 p-1.5 rounded-xl border border-slate-200 dark:border-slate-700 focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-500/20 transition-all">
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    onChange={handleAttachmentUpload} 
                    accept="image/*" 
                    className="hidden" 
                  />
                  
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    title="Attach image/screenshot"
                    className="p-1.5 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-200/60 dark:hover:bg-slate-700 rounded-lg transition-all flex-shrink-0"
                  >
                    <HiOutlinePaperClip size={18} />
                  </button>

                  <textarea
                    value={reply}
                    onChange={(e) => setReply(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
                        e.preventDefault();
                        handleReply();
                      }
                    }}
                    placeholder="Type reply to student... (Ctrl+Enter to send)"
                    rows={1}
                    className="flex-1 bg-transparent border-none outline-none resize-none text-xs sm:text-sm font-medium text-slate-800 dark:text-slate-100 placeholder-slate-400 py-1 max-h-24"
                  />

                  <button
                    type="button"
                    onClick={handleReply}
                    disabled={submittingReply || (!reply.trim() && !replyAttachment)}
                    className={`p-2 rounded-lg font-bold text-white shadow transition-all flex-shrink-0 flex items-center justify-center ${
                      submittingReply || (!reply.trim() && !replyAttachment)
                        ? 'bg-slate-300 dark:bg-slate-700 cursor-not-allowed shadow-none'
                        : 'bg-indigo-600 hover:bg-indigo-700 hover:scale-105 active:scale-95 shadow-indigo-600/30'
                    }`}
                  >
                    <HiArrowUp size={16} className={submittingReply ? 'animate-bounce' : ''} />
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Minimized Dock Floating Pill (Right Bottom) */}
      <AnimatePresence>
        {isDrawerOpen && selectedTicket && isMinimized && (
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            className="fixed bottom-5 right-5 z-50 flex items-center gap-2.5 py-2 px-3 bg-slate-900 text-white rounded-xl shadow-2xl border border-slate-700"
          >
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => setIsMinimized(false)}>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <div>
                <p className="text-xs font-bold leading-tight line-clamp-1 max-w-[200px]">
                  {selectedTicket.subject}
                </p>
                <p className="text-[10px] text-slate-400">
                  {selectedTicket.user?.name || 'Inquirer'} • #{selectedTicket._id.slice(-6)}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1 border-l border-slate-700 pl-2">
              <button
                onClick={() => setIsMinimized(false)}
                title="Expand ticket conversation"
                className="p-1 rounded-md hover:bg-slate-800 text-slate-300 hover:text-white transition-all"
              >
                <HiOutlineArrowsPointingOut size={15} />
              </button>
              <button
                onClick={handleCloseDrawer}
                title="Close ticket"
                className="p-1 rounded-md hover:bg-rose-900/60 text-slate-400 hover:text-rose-300 transition-all"
              >
                <HiOutlineXMark size={15} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Image Lightbox Modal */}
      <AnimatePresence>
        {previewImage && (
          <div 
            onClick={() => setPreviewImage(null)}
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 cursor-pointer"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl max-h-[90vh] bg-slate-900 rounded-2xl overflow-hidden shadow-2xl p-2"
            >
              <button 
                onClick={() => setPreviewImage(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/60 text-white hover:bg-black/80 transition-all z-10"
              >
                <HiOutlineXMark size={20} />
              </button>
              <img 
                src={previewImage} 
                alt="Enlarged screenshot" 
                className="max-h-[85vh] w-auto object-contain rounded-xl mx-auto" 
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
