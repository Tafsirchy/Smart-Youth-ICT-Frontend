'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  HiOutlineLifebuoy, HiOutlinePlus, HiOutlineChatBubbleLeftRight, 
  HiOutlineClock, HiOutlineCheckCircle, HiOutlineExclamationCircle,
  HiChevronRight, HiXMark
} from 'react-icons/hi2'; // Switched to hi2
import api from '@/lib/api';
import toast from 'react-hot-toast';

export default function SupportContent() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  
  // New Ticket Form
  const [form, setForm] = useState({ subject: '', message: '', priority: 'medium' });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      const res = await api.get('/support/me');
      if (res.data?.success) setTickets(res.data.data);
    } catch (err) {
      console.error('Failed to fetch tickets', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await api.post('/support', form);
      if (res.data?.success) {
        toast.success('Support ticket raised!');
        setShowCreate(false);
        setForm({ subject: '', message: '', priority: 'medium' });
        fetchTickets();
      }
    } catch (err) {
      toast.error('Failed to create ticket');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="py-8 max-w-6xl">
      <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-neutral-900 tracking-tight">Support Hub</h1>
          <p className="mt-2 text-neutral-500">Need help? Raise a ticket and our team will get back to you shortly.</p>
        </div>
        <button 
           onClick={() => setShowCreate(true)}
           className="flex items-center justify-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-2xl font-bold shadow-xl shadow-blue-500/20 hover:bg-blue-700 transition-all active:scale-95"
        >
          <HiOutlinePlus size={20} /> New Support Ticket
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* TICKET LIST */}
        <div className="lg:col-span-2 space-y-4">
          {loading ? (
             <div className="space-y-4 animate-pulse">
               {[1, 2, 3].map(i => <div key={i} className="h-24 bg-neutral-100 rounded-3xl" />)}
             </div>
          ) : tickets.length > 0 ? (
            tickets.map((ticket, i) => (
              <motion.div 
                key={ticket._id} 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-white rounded-[32px] border border-neutral-100 p-6 flex items-center justify-between hover:shadow-lg hover:shadow-neutral-500/5 transition-all group"
              >
                <div className="flex items-center gap-5">
                   <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                      ticket.status === 'open' ? 'bg-blue-50 text-blue-600' :
                      ticket.status === 'resolved' ? 'bg-emerald-50 text-emerald-600' :
                      'bg-neutral-50 text-neutral-500'
                   }`}>
                      <HiOutlineChatBubbleLeftRight size={24} />
                   </div>
                   <div>
                      <h3 className="font-bold text-neutral-900 text-sm group-hover:text-blue-600 transition-colors">{ticket.subject}</h3>
                      <div className="flex items-center gap-3 mt-1">
                         <span className={`text-[10px] font-black uppercase tracking-widest ${
                            ticket.priority === 'high' ? 'text-red-500' : 'text-neutral-400'
                         }`}>
                           {ticket.priority} priority
                         </span>
                         <span className="w-1 h-1 rounded-full bg-neutral-200" />
                         <span className="text-[10px] font-bold text-neutral-400">{new Date(ticket.createdAt).toLocaleDateString()}</span>
                      </div>
                   </div>
                </div>
                <div className="flex items-center gap-4">
                   <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                      ticket.status === 'open' ? 'bg-blue-100 text-blue-700' :
                      ticket.status === 'resolved' ? 'bg-emerald-100 text-emerald-700' :
                      'bg-neutral-100 text-neutral-700'
                   }`}>
                     {ticket.status}
                   </span>
                   <HiChevronRight className="text-neutral-300 group-hover:text-blue-600 transition-colors" size={20} />
                </div>
              </motion.div>
            ))
          ) : (
            <div className="bg-white rounded-[40px] border-2 border-dashed border-neutral-100 p-20 text-center">
               <div className="w-20 h-20 bg-neutral-50 rounded-full flex items-center justify-center text-neutral-200 mx-auto mb-6">
                 <HiOutlineLifebuoy size={40} />
               </div>
               <p className="text-neutral-400 font-medium font-italic">No active support requests found.</p>
            </div>
          )}
        </div>

        {/* FAQ / QUICK STATS */}
        <div className="lg:col-span-1 space-y-6">
            <div className="bg-neutral-900 rounded-[40px] p-8 text-white relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/20 blur-3xl -mr-16 -mt-16 group-hover:scale-150 transition-transform" />
               <h3 className="text-lg font-black mb-4">Response Time</h3>
               <div className="space-y-4">
                  <div className="flex items-center gap-3">
                     <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center">
                        <HiOutlineClock size={16} className="text-blue-400" />
                     </div>
                     <div>
                        <p className="text-[10px] text-white/50 font-bold uppercase tracking-wider leading-none mb-1">Live Chat</p>
                        <p className="font-bold text-sm">2-5 Minutes</p>
                     </div>
                  </div>
                  <div className="flex items-center gap-3">
                     <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center">
                        <HiOutlineChatBubbleLeftRight size={16} className="text-emerald-400" />
                     </div>
                     <div>
                        <p className="text-[10px] text-white/50 font-bold uppercase tracking-wider leading-none mb-1">Tickets</p>
                        <p className="font-bold text-sm">2-4 Hours</p>
                     </div>
                  </div>
               </div>
            </div>

            <div className="bg-white rounded-[32px] border border-neutral-100 p-8 shadow-sm">
               <h3 className="font-bold text-neutral-900 mb-6 flex items-center gap-2">
                 <HiOutlineExclamationCircle className="text-blue-500" /> Quick FAQs
               </h3>
               <div className="space-y-4 text-sm font-medium text-neutral-600">
                  <p className="hover:text-blue-600 transition-colors cursor-pointer flex items-center justify-between">
                    Payment failed? 
                    <HiChevronRight />
                  </p>
                  <p className="hover:text-blue-600 transition-colors cursor-pointer flex items-center justify-between">
                    Certificate not issued?
                    <HiChevronRight />
                  </p>
                  <p className="hover:text-blue-600 transition-colors cursor-pointer flex items-center justify-between">
                    Login issues?
                    <HiChevronRight />
                  </p>
               </div>
            </div>
        </div>

      </div>

      {/* CREATE TICKET MODAL */}
      <AnimatePresence>
        {showCreate && (
           <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                onClick={() => setShowCreate(false)}
                className="absolute inset-0 bg-neutral-900/40 backdrop-blur-sm"
              />
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="relative w-full max-w-xl bg-white rounded-[40px] shadow-2xl p-10 overflow-hidden"
              >
                 <div className="absolute top-0 right-0 p-8">
                    <button onClick={() => setShowCreate(false)} className="w-10 h-10 rounded-full bg-neutral-50 text-neutral-400 flex items-center justify-center hover:bg-neutral-100">
                       <HiXMark size={24} />
                    </button>
                 </div>

                 <h2 className="text-2xl font-black text-neutral-900 mb-2">New Support Inquiry</h2>
                 <p className="text-neutral-500 text-sm mb-8">Describe the issue clearly so we can assist you better.</p>

                 <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-1.5">
                       <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest ml-1">Subject</label>
                       <input 
                          required className="w-full bg-neutral-50 rounded-2xl border-none px-4 py-4 text-sm font-bold focus:ring-2 focus:ring-blue-600 transition-all outline-none" 
                          placeholder="e.g. Cannot access Lesson 5"
                          value={form.subject} onChange={(e) => setForm({...form, subject: e.target.value})}
                       />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                       <div className="space-y-1.5">
                          <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest ml-1">Priority</label>
                          <select 
                            className="w-full bg-neutral-50 rounded-2xl border-none px-4 py-4 text-sm font-bold focus:ring-2 focus:ring-blue-600 transition-all outline-none"
                            value={form.priority} onChange={(e) => setForm({...form, priority: e.target.value})}
                          >
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                          </select>
                       </div>
                    </div>
                    <div className="space-y-1.5">
                       <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest ml-1">Message Detail</label>
                       <textarea 
                          required rows={5} className="w-full bg-neutral-50 rounded-2xl border-none px-4 py-4 text-sm font-medium resize-none focus:ring-2 focus:ring-blue-600 transition-all outline-none" 
                          placeholder="Explain your problem here..."
                          value={form.message} onChange={(e) => setForm({...form, message: e.target.value})}
                       />
                    </div>

                    <button type="submit" disabled={submitting} className="w-full py-5 bg-blue-600 text-white rounded-[32px] font-extrabold text-lg shadow-2xl shadow-blue-600/20 hover:bg-blue-700 transition-all disabled:opacity-50">
                       {submitting ? 'Raising Ticket...' : 'Submit Support Request'}
                    </button>
                 </form>
              </motion.div>
           </div>
        )}
      </AnimatePresence>
    </div>
  );
}
