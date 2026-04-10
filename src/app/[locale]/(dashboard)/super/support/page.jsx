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
  HiOutlineUserCircle
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
    try {
      const res = await api.post(`/super/tickets/${selectedTicket._id}/reply`, { message: reply });
      if (res.data?.success) {
        toast.success('Reply submitted');
        setReply('');
        fetchTickets();
      }
    } catch (err) {
      toast.error('Failed to send reply');
    }
  };

  const handleResolve = async () => {
    try {
      const res = await api.put(`/super/tickets/${selectedTicket._id}/resolve`);
      if (res.data?.success) {
        toast.success('Ticket marked as resolved');
        fetchTickets();
      }
    } catch (err) {
      toast.error('Failed to resolve ticket');
    }
  };

  return (
    <div className="h-[calc(100vh-140px)] flex flex-col gap-6 max-w-7xl mx-auto overflow-hidden">
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

      <div className="flex-1 flex gap-8 overflow-hidden">
        {/* Ticket List Sidebar */}
        <div className="w-80 md:w-96 flex flex-col bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-50">
            <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest">Active Tickets ({tickets.length})</h3>
          </div>
          <div className="flex-1 overflow-y-auto divide-y divide-slate-50 custom-scrollbar">
            {tickets.map((ticket) => (
              <button 
                key={ticket._id}
                onClick={() => setSelectedTicket(ticket)}
                className={`w-full p-6 text-left transition-all ${selectedTicket?._id === ticket._id ? 'bg-indigo-50/50' : 'hover:bg-slate-50'}`}
              >
                <div className="flex justify-between items-start mb-2">
                  <span className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest ${statusColors[ticket.status]}`}>
                    {ticket.status}
                  </span>
                  <span className="text-[10px] font-bold text-slate-400">{format(new Date(ticket.createdAt), 'HH:mm')}</span>
                </div>
                <h4 className="font-bold text-slate-800 leading-snug line-clamp-1 mb-1">{ticket.subject}</h4>
                <p className="text-xs text-slate-400 font-medium">From: {ticket.user?.name}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Chat / Detail Area */}
        <div className="flex-1 bg-white rounded-[2rem] border border-slate-100 shadow-sm flex flex-col overflow-hidden relative">
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
                <div className="p-8 border-b border-slate-50 flex justify-between items-center bg-slate-50/10">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center">
                      <HiOutlineChatBubbleLeftRight size={24} />
                    </div>
                    <div>
                      <h2 className="text-xl font-black text-slate-900 leading-tight">{selectedTicket.subject}</h2>
                      <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Ticket #{selectedTicket._id.slice(-6)}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={handleResolve}
                      disabled={selectedTicket.status === 'resolved'}
                      className={`px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all flex items-center gap-2 ${
                        selectedTicket.status === 'resolved' ? 'bg-slate-100 text-slate-400' : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100'
                      }`}
                    >
                      <HiOutlineCheckCircle size={18} />
                      {selectedTicket.status === 'resolved' ? 'Resolved' : 'Resolve'}
                    </button>
                    <button className="p-2.5 bg-slate-50 text-slate-400 hover:text-slate-600 rounded-xl transition-all">
                      <HiOutlineClock size={18} />
                    </button>
                  </div>
                </div>

                {/* Chat History */}
                <div className="flex-1 overflow-y-auto p-10 space-y-8 custom-scrollbar">
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
                      <div className="bg-slate-50 p-6 rounded-[1.5rem] rounded-tl-none border border-slate-100 text-slate-600 leading-relaxed shadow-sm">
                        {selectedTicket.message}
                      </div>
                    </div>
                  </div>

                  {/* Mock Response */}
                  <div className="flex flex-row-reverse gap-4">
                     <div className="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white">
                        <HiOutlineLifebuoy size={20} />
                     </div>
                     <div className="flex-1 flex flex-col items-end">
                        <div className="flex items-center gap-3 mb-2">
                           <span className="text-[10px] font-bold text-slate-400 uppercase">Just Now</span>
                           <span className="font-black text-slate-800 text-sm">System Support</span>
                        </div>
                        <div className="bg-indigo-600 p-6 rounded-[1.5rem] rounded-tr-none text-white shadow-lg shadow-indigo-600/10">
                           Thank you for reaching out. We are investigating the issue with branch Stripe configurations.
                        </div>
                     </div>
                  </div>
                </div>

                {/* Reply Input */}
                <div className="p-8 border-t border-slate-50 bg-slate-50/10">
                  <div className="relative group">
                    <textarea 
                      value={reply}
                      onChange={(e) => setReply(e.target.value)}
                      placeholder="Type your response here..."
                      className="w-full bg-white border border-slate-200 rounded-[1.8rem] p-6 pr-24 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all outline-none resize-none font-medium text-slate-700 min-h-[120px] shadow-sm"
                    />
                    <button 
                      onClick={handleReply}
                      className="absolute bottom-4 right-4 bg-indigo-600 text-white p-4 rounded-2xl shadow-xl shadow-indigo-600/20 hover:bg-indigo-700 hover:scale-105 active:scale-95 transition-all"
                    >
                      <HiOutlinePaperAirplane className="rotate-90" size={20} />
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
