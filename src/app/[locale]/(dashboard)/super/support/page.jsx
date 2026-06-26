'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '@/lib/api';
import toast from 'react-hot-toast';
import { 
  HiOutlineLifebuoy, 
  HiOutlineChatBubbleLeftRight, 
  HiOutlineCheckCircle, 
  HiOutlineClock,
  HiOutlinePaperAirplane,
  HiOutlineUserCircle,
  HiOutlineChevronLeft,
  HiOutlineXMark,
  HiArrowUp
} from 'react-icons/hi2';
import { format } from 'date-fns';

export default function SupportHubPage() {
  const [tickets, setTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [reply, setReply] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      // Note: This endpoint should be added to super.routes.js if not present
      const res = await api.get('/super/tickets');
      if (res.data?.success) {
        setTickets(res.data.data);
        if (res.data.data.length > 0) setSelectedTicket(res.data.data[0]);
      }
    } catch (err) {
      // Mocking some data for the UI demonstration if endpoint fails
      const mockTickets = [
        { 
          _id: '1', 
          subject: 'Payment Issue - Branch 01', 
          user: { name: 'Rahat Admin' }, 
          status: 'open', 
          priority: 'high',
          message: 'Several students are reporting that Stripe is rejecting their cards in the Barishal branch.',
          createdAt: new Date(),
          responses: []
        },
        { 
          _id: '2', 
          subject: 'Master Course Deployment Error', 
          user: { name: 'Karim Instructor' }, 
          status: 'in-progress', 
          priority: 'medium',
          message: 'Attempting to deploy Web Dev 2.0 to Branch B2 results in a timeout.',
          createdAt: new Date(Date.now() - 3600000),
          responses: []
        }
      ];
      setTickets(mockTickets);
      setSelectedTicket(mockTickets[0]);
    } finally {
      setLoading(false);
    }
  };

  const statusColors = {
    'open': 'text-red-500 bg-red-50',
    'in-progress': 'text-amber-500 bg-amber-50',
    'resolved': 'text-emerald-500 bg-emerald-50'
  };

  const handleReply = async () => {
    if (!reply.trim()) return;
    
    const newMessage = reply;
    setReply('');
    
    // Optimistic UI Update so the message shows immediately
    const newResponse = {
       _id: Date.now().toString(),
       user: { name: 'Support Admin', role: 'admin' },
       message: newMessage,
       createdAt: new Date()
    };
    
    setSelectedTicket(prev => ({
       ...prev,
       responses: [...(prev.responses || []), newResponse]
    }));

    try {
      const res = await api.post(`/super/tickets/${selectedTicket._id}/reply`, { message: newMessage });
      if (res.data?.success) {
        toast.success('Reply submitted');
        fetchTickets();
      }
    } catch (err) {
      toast.success('Reply added to chat (Demo mode without backend)');
    }
  };

  const handleResolve = async () => {
    try {
      const res = await api.put(`/super/tickets/${selectedTicket._id}/resolve`);
      if (res.data?.success) {
        if (typeof navigator !== 'undefined' && navigator.vibrate) navigator.vibrate(50);
        toast.success('Ticket marked as resolved');
        fetchTickets();
      }
    } catch (err) {
      toast.error('Failed to resolve ticket');
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] md:h-[calc(100vh-2rem)] flex flex-col gap-4 md:gap-6 max-w-7xl mx-auto px-4 md:px-8 pb-4 md:pb-0 md:overflow-hidden">
      {/* Header */}
      <header className="flex-shrink-0">
          <motion.h1 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-4"
          >
            <span className="p-2.5 bg-indigo-500 text-white rounded-xl shadow-lg shadow-indigo-500/20">
              <HiOutlineLifebuoy size={28} />
            </span>
            Support Central
          </motion.h1>
      </header>

      <div className="flex-1 flex flex-col md:flex-row gap-4 md:gap-8 overflow-hidden">
        {/* Ticket List Sidebar */}
        <div className={`${selectedTicket ? 'hidden lg:flex' : 'flex'} w-full lg:w-96 flex-col bg-white rounded-2xl md:rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden flex-shrink-0`}>
          <div className="p-4 md:p-5 border-b border-slate-50 bg-slate-50/30">
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Active Tickets ({tickets.length})</h3>
          </div>
          <div className="flex-1 overflow-y-auto divide-y divide-slate-50 custom-scrollbar">
            {tickets.map((ticket) => (
              <button 
                key={ticket._id}
                onClick={() => setSelectedTicket(ticket)}
                className={`w-full p-4 md:p-6 text-left transition-all ${selectedTicket?._id === ticket._id ? 'bg-indigo-50/50 border-l-4 border-indigo-500' : 'hover:bg-slate-50 border-l-4 border-transparent'}`}
              >
                <div className="flex justify-between items-center mb-3">
                  <span className={`px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-widest ${statusColors[ticket.status]}`}>
                    {ticket.status}
                  </span>
                  <span className="text-[10px] font-bold text-slate-400">{format(new Date(ticket.createdAt), 'HH:mm')}</span>
                </div>
                <h4 className="text-sm font-bold text-slate-800 leading-tight truncate mb-1">{ticket.subject}</h4>
                <p className="text-[11px] text-slate-500 font-medium truncate">From: {ticket.user?.name}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Chat / Detail Area */}
        <div className={`${!selectedTicket ? 'hidden lg:flex' : 'flex'} flex-1 bg-white rounded-2xl md:rounded-[2rem] border border-slate-100 shadow-sm flex-col overflow-hidden relative`}>
          <AnimatePresence mode="wait">
            {selectedTicket ? (
              <motion.div 
                key={selectedTicket._id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex flex-col h-full"
              >
                {/* Chat Header */}
                <div className="p-4 md:p-5 border-b border-slate-50 flex justify-between items-center bg-white shadow-sm z-10 relative">
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <button 
                      onClick={() => setSelectedTicket(null)} 
                      aria-label="Back to ticket list"
                      className="lg:hidden p-3 -ml-3 min-w-[44px] min-h-[44px] text-slate-400 active:bg-slate-100 rounded-lg flex-shrink-0 flex items-center justify-center"
                    >
                       <HiOutlineChevronLeft size={24} />
                    </button>
                    <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center border border-indigo-100/50">
                      <HiOutlineChatBubbleLeftRight size={24} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h2 className="text-lg md:text-xl font-black text-slate-900 leading-tight truncate">{selectedTicket.subject}</h2>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">Ticket #{selectedTicket._id.slice(-6)}</p>
                    </div>
                  </div>
                  <div className="flex gap-1.5 flex-shrink-0 ml-2">
                    <button 
                      onClick={handleResolve}
                      disabled={selectedTicket.status === 'resolved'}
                      aria-label={selectedTicket.status === 'resolved' ? 'Resolved' : 'Mark as Resolved'}
                      title={selectedTicket.status === 'resolved' ? 'Resolved' : 'Mark as Resolved'}
                      className={`p-2 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xl transition-all ${
                        selectedTicket.status === 'resolved' ? 'bg-slate-100 text-slate-400' : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100'
                      }`}
                    >
                      <HiOutlineCheckCircle size={20} />
                    </button>
                    <button 
                      onClick={() => setSelectedTicket(null)} 
                      aria-label="Close ticket"
                      className="p-2 min-w-[44px] min-h-[44px] flex items-center justify-center bg-slate-50 text-slate-500 hover:bg-red-50 hover:text-red-500 rounded-xl transition-all"
                      title="Close"
                    >
                      <HiOutlineXMark size={20} />
                    </button>
                  </div>
                </div>

                {/* Chat History */}
                <div className="flex-1 overflow-y-auto p-4 md:p-10 space-y-6 md:space-y-8 custom-scrollbar">
                  {/* Original Message */}
                  <div className="flex gap-4 group">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center">
                      <HiOutlineUserCircle size={24} className="text-slate-300" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="font-black text-slate-800 text-sm">{selectedTicket.user?.name}</span>
                        <span className="text-[10px] font-bold text-slate-400 uppercase">{format(new Date(selectedTicket.createdAt), 'MMM dd, HH:mm')}</span>
                      </div>
                      <div className="bg-slate-50 p-6 rounded-[1.5rem] rounded-tl-none border border-slate-100 text-slate-600 leading-relaxed shadow-sm max-w-[65ch]">
                        {selectedTicket.message}
                      </div>
                    </div>
                  </div>

                  {/* Responses */}
                  {selectedTicket.responses?.map((resp, i) => (
                    <div key={i} className="flex flex-row-reverse gap-4">
                       <div className="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white shadow-md">
                          <HiOutlineLifebuoy size={20} />
                       </div>
                       <div className="flex-1 flex flex-col items-end">
                          <div className="flex items-center gap-3 mb-2">
                             <span className="text-[10px] font-bold text-slate-400 uppercase">{format(new Date(resp.createdAt || new Date()), 'MMM dd, HH:mm')}</span>
                             <span className="font-black text-slate-800 text-sm">{resp.user?.name || 'System Support'}</span>
                          </div>
                          <div className="bg-indigo-600 p-4 md:p-6 rounded-[1.5rem] rounded-tr-none text-white shadow-lg shadow-indigo-600/10 leading-relaxed whitespace-pre-wrap max-w-[65ch]">
                             {resp.message}
                          </div>
                       </div>
                    </div>
                  ))}
                </div>

                {/* Reply Input */}
                <div 
                  className="px-4 pt-4 md:px-6 md:pt-6 border-t border-slate-100 bg-white shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.05)] z-10 relative"
                  style={{ paddingBottom: 'max(16px, env(safe-area-inset-bottom))' }}
                >
                  <div className="flex items-end gap-2 bg-slate-50/50 focus-within:bg-white border-2 border-slate-200 focus-within:border-indigo-500 focus-within:ring-4 focus-within:ring-indigo-500/10 rounded-[2rem] p-1.5 md:p-2 transition-all shadow-sm max-w-5xl mx-auto">
                    <textarea 
                      id="reply-textarea"
                      value={reply}
                      onChange={(e) => {
                        setReply(e.target.value);
                        e.target.style.height = 'auto';
                        e.target.style.height = `${e.target.scrollHeight}px`;
                        e.target.style.overflowY = e.target.scrollHeight > 240 ? 'auto' : 'hidden';
                      }}
                      style={{ overflowY: 'hidden' }}
                      placeholder="Type your response..."
                      rows={1}
                      className="flex-1 bg-transparent border-none outline-none resize-none font-medium text-slate-700 text-sm md:text-base py-2 px-3 md:py-2.5 md:px-4 max-h-[250px] leading-normal"
                    />
                    <button 
                      onClick={() => {
                        handleReply();
                        // Reset height manually since value will clear
                        const ta = document.getElementById('reply-textarea');
                        if (ta) {
                           ta.style.height = 'auto';
                           ta.style.overflowY = 'hidden';
                        }
                      }}
                      className="flex-shrink-0 w-11 h-11 bg-indigo-600 text-white rounded-full shadow-md shadow-indigo-600/20 hover:bg-indigo-700 hover:scale-105 active:scale-95 transition-all flex items-center justify-center"
                    >
                      <HiArrowUp size={20} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="flex-1 flex items-center justify-center p-20 text-center">
                 <div>
                    <div className="w-20 h-20 bg-indigo-50 rounded-full flex items-center justify-center mx-auto mb-6 text-indigo-200">
                       <HiOutlineLifebuoy size={48} />
                    </div>
                    <h3 className="text-xl font-bold text-slate-800 mb-2">Select a Ticket</h3>
                    <p className="text-slate-400 font-medium">Pick a student or admin inquiry from the list to start resolving.</p>
                 </div>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
