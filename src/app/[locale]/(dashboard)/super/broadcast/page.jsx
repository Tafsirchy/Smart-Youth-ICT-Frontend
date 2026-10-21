'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '@/lib/api';
import toast from 'react-hot-toast';
import {
  HiSpeakerphone,
  HiMail,
  HiChat,
  HiBell,
  HiExclamation,
  HiShieldCheck,
  HiUsers,
  HiClock,
  HiCheckCircle,
  HiXCircle,
  HiRefresh
} from 'react-icons/hi';
import { IoSend, IoWarningOutline } from 'react-icons/io5';

const AUDIENCE_OPTIONS = [
  { id: 'all_students', label: 'All Enrolled Students (Countrywide)', desc: 'Broadcast to every student across all active campuses' },
  { id: 'all_instructors', label: 'All Faculty & Mentors', desc: 'Faculty members, lab instructors, and workshop conductors' },
  { id: 'all_branch_staff', label: 'All Branch Staff & Administrators', desc: 'Campus admins, front-desk counselors, and accountants' },
  { id: 'specific_branch', label: 'Specific Campus / Branch Only', desc: 'Isolate notification to one selected physical campus' },
  { id: 'all_users', label: 'Universal Broadcast (Every Platform User)', desc: 'Highest priority: students, instructors, staff, and management' },
];

export default function EmergencyBroadcastPage() {
  const [branches, setBranches] = useState([]);
  const [logs, setLogs] = useState([]);
  const [loadingLogs, setLoadingLogs] = useState(false);
  const [sending, setSending] = useState(false);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);

  // Form State
  const [targetAudience, setTargetAudience] = useState('all_students');
  const [selectedBranchId, setSelectedBranchId] = useState('');
  const [urgency, setUrgency] = useState('urgent'); // normal | urgent | critical
  const [channels, setChannels] = useState(['in_app', 'email']); // 'in_app', 'email', 'sms'
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  // Fetch Branches and Logs on mount
  useEffect(() => {
    fetchBranches();
    fetchLogs();
  }, []);

  const fetchBranches = async () => {
    try {
      const res = await api.get('/branches/public/list');
      if (res.data?.success) {
        const b = res.data.data || [];
        setBranches(b);
        if (b.length > 0) setSelectedBranchId(b[0]._id);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const fetchLogs = async () => {
    try {
      setLoadingLogs(true);
      const res = await api.get('/super/broadcast/logs');
      if (res.data?.success) {
        setLogs(res.data.data || []);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingLogs(false);
    }
  };

  const toggleChannel = (channelId) => {
    if (channels.includes(channelId)) {
      if (channels.length === 1) {
        toast.error('At least one broadcast channel must remain active');
        return;
      }
      setChannels(channels.filter(c => c !== channelId));
    } else {
      setChannels([...channels, channelId]);
    }
  };

  // SMS Length Calculation
  const smsCharCount = message.length;
  const smsParts = Math.max(1, Math.ceil(smsCharCount / 160));

  const handleOpenConfirm = (e) => {
    e.preventDefault();
    if (!title.trim() || !message.trim()) {
      toast.error('Please enter both title and broadcast message');
      return;
    }
    setConfirmModalOpen(true);
  };

  const handleExecuteBroadcast = async () => {
    setSending(true);
    setConfirmModalOpen(false);
    const loadingToast = toast.loading('Initiating multi-channel dispatch...');

    try {
      const payload = {
        title: title.trim(),
        subject: subject.trim() || title.trim(),
        message: message.trim(),
        channels,
        targetAudience,
        branchId: targetAudience === 'specific_branch' ? selectedBranchId : null,
        urgency
      };

      const res = await api.post('/super/broadcast/send', payload);
      if (res.data?.success) {
        toast.success(res.data.message || 'Broadcast successfully dispatched!', { id: loadingToast });
        setTitle('');
        setSubject('');
        setMessage('');
        fetchLogs();
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Broadcast dispatch failed', { id: loadingToast });
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="space-y-8 pb-16 max-w-7xl mx-auto">
      {/* Emergency Alert Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-rose-950 via-slate-900 to-amber-950 p-8 text-white shadow-2xl border border-rose-900/40">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-rose-500/20 px-3.5 py-1 text-xs font-black text-rose-400 backdrop-blur-md border border-rose-500/30">
              <span className="h-2 w-2 rounded-full bg-rose-500 animate-ping" />
              <span>HQ Multi-Channel Emergency Dispatch Center</span>
            </div>
            <h1 className="mt-3 text-2xl font-black tracking-tight sm:text-3xl text-white">
              Emergency Broadcast & Mass Dispatch
            </h1>
            <p className="mt-2 text-sm text-slate-300 leading-relaxed">
              Instantaneous countrywide communication engine. Dispatch verified SMS alerts, formatted email advisories, and prominent in-app notification banners directly to student and staff dashboards.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={fetchLogs}
              className="flex items-center gap-2 rounded-2xl bg-white/10 px-4 py-3 text-xs font-bold text-white hover:bg-white/20 transition-all border border-white/10 shadow-lg"
            >
              <HiRefresh className="h-4 w-4" />
              <span>Refresh Log</span>
            </button>
          </div>
        </div>

        <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-rose-600/10 blur-3xl pointer-events-none" />
      </div>

      {/* Grid Layout: Dispatch Console (Left) + Dispatch History (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left: Dispatch Composer */}
        <div className="lg:col-span-7 space-y-6">
          <form onSubmit={handleOpenConfirm} className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4 dark:border-slate-800">
              <h2 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                <HiSpeakerphone className="h-5 w-5 text-rose-600" />
                <span>Compose Mass Dispatch</span>
              </h2>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                Real-Time Outbox
              </span>
            </div>

            {/* 1. Urgency Level */}
            <div>
              <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-2">
                Urgency & Threat Level
              </label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: 'normal', label: 'Standard Notice', badge: 'Informational', color: 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200' },
                  { id: 'urgent', label: 'Urgent Alert', badge: 'High Priority', color: 'border-amber-300 bg-amber-50/50 text-amber-800 dark:bg-amber-950/20 dark:border-amber-800 dark:text-amber-300' },
                  { id: 'critical', label: 'Critical Emergency', badge: 'Highest Alert', color: 'border-rose-400 bg-rose-50/60 text-rose-800 dark:bg-rose-950/30 dark:border-rose-800 dark:text-rose-300' },
                ].map((u) => {
                  const isSelected = urgency === u.id;
                  return (
                    <button
                      key={u.id}
                      type="button"
                      onClick={() => setUrgency(u.id)}
                      className={`p-3 rounded-2xl text-left border-2 transition-all ${
                        isSelected 
                          ? `${u.color} ring-2 ring-offset-2 ring-rose-500 font-black shadow-md` 
                          : 'border-slate-100 bg-slate-50/60 text-slate-500 dark:border-slate-800 dark:bg-slate-800/40 hover:bg-slate-100'
                      }`}
                    >
                      <div className="text-xs font-bold">{u.label}</div>
                      <div className="text-[10px] opacity-75 mt-0.5">{u.badge}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Target Audience */}
            <div>
              <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-2">
                Target Audience Demographics
              </label>
              <select
                value={targetAudience}
                onChange={(e) => setTargetAudience(e.target.value)}
                className="w-full rounded-2xl border border-slate-200 p-3 text-xs font-bold text-slate-800 outline-none focus:border-rose-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              >
                {AUDIENCE_OPTIONS.map((a) => (
                  <option key={a.id} value={a.id}>{a.label}</option>
                ))}
              </select>
              <p className="mt-1 text-[11px] text-slate-400">
                {AUDIENCE_OPTIONS.find(a => a.id === targetAudience)?.desc}
              </p>
            </div>

            {/* Conditional Branch Picker */}
            {targetAudience === 'specific_branch' && (
              <div className="rounded-2xl border border-indigo-200 bg-indigo-50/50 p-4 dark:border-indigo-900/50 dark:bg-indigo-950/20">
                <label className="block text-xs font-extrabold text-indigo-900 dark:text-indigo-300 mb-1">
                  Select Target Campus
                </label>
                <select
                  value={selectedBranchId}
                  onChange={(e) => setSelectedBranchId(e.target.value)}
                  className="w-full rounded-xl border border-indigo-200 p-2.5 text-xs font-bold text-slate-800 outline-none focus:border-indigo-500 dark:border-indigo-800 dark:bg-slate-900 dark:text-white"
                >
                  {branches.map(b => (
                    <option key={b._id} value={b._id}>{b.name} ({b.city})</option>
                  ))}
                </select>
              </div>
            )}

            {/* 3. Multi-Channel Selector */}
            <div>
              <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-2">
                Delivery Channels
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { id: 'in_app', label: 'In-App Notification', icon: HiBell, desc: 'Dashboard Alert' },
                  { id: 'email', label: 'Email Advisory', icon: HiMail, desc: 'Formatted HTML' },
                  { id: 'sms', label: 'SMS Cellular Alert', icon: HiChat, desc: 'Mobile Network' },
                ].map((c) => {
                  const isChecked = channels.includes(c.id);
                  const Icon = c.icon;
                  return (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => toggleChannel(c.id)}
                      className={`flex items-center gap-3 p-3 rounded-2xl border transition-all text-left ${
                        isChecked 
                          ? 'border-rose-500 bg-rose-50/60 dark:bg-rose-950/20 text-rose-900 dark:text-rose-200 font-bold shadow-sm' 
                          : 'border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-800/40 text-slate-400 hover:border-slate-300'
                      }`}
                    >
                      <div className={`p-2 rounded-xl ${isChecked ? 'bg-rose-600 text-white' : 'bg-slate-100 text-slate-400 dark:bg-slate-800'}`}>
                        <Icon className="h-4 w-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold leading-tight">{c.label}</div>
                        <div className="text-[10px] opacity-75">{c.desc}</div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 4. Subject & Title */}
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1">
                  Advisory Headline / Title *
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Cyclone Advisory: All Sylhet Classes Suspended for Oct 22"
                  className="w-full rounded-2xl border border-slate-200 p-3 text-xs font-bold text-slate-800 outline-none focus:border-rose-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
              </div>

              {channels.includes('email') && (
                <div>
                  <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1">
                    Email Subject Line (Optional)
                  </label>
                  <input
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="Defaults to Headline if left blank"
                    className="w-full rounded-2xl border border-slate-200 p-3 text-xs text-slate-800 outline-none focus:border-rose-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  />
                </div>
              )}

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                    Dispatch Body / Notice Text *
                  </label>
                  {channels.includes('sms') && (
                    <span className="text-[11px] font-mono text-slate-400">
                      {smsCharCount} chars • <strong className="text-rose-600">{smsParts} SMS Unit{smsParts > 1 ? 's' : ''}</strong>
                    </span>
                  )}
                </div>
                <textarea
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Official statement, directives, rescheduling instructions, and emergency hotline numbers..."
                  className="w-full rounded-2xl border border-slate-200 p-3 text-xs text-slate-800 outline-none focus:border-rose-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white leading-relaxed"
                />
              </div>
            </div>

            {/* Action Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={sending}
                className="w-full flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-rose-600 to-rose-700 py-3.5 text-xs font-black text-white shadow-lg shadow-rose-600/30 hover:from-rose-700 hover:to-rose-800 disabled:opacity-50 transition-all active:scale-95"
              >
                <IoSend className="h-4 w-4" />
                <span>Preview & Confirm Dispatch</span>
              </button>
            </div>
          </form>
        </div>

        {/* Right: Broadcast Dispatch History */}
        <div className="lg:col-span-5 space-y-4">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 dark:border-slate-800">
              <h2 className="text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                <HiClock className="h-4 w-4 text-slate-400" />
                <span>Recent Mass Dispatches</span>
              </h2>
              <span className="text-xs font-mono font-bold text-slate-400">
                {logs.length} logged
              </span>
            </div>

            {loadingLogs ? (
              <div className="py-12 text-center text-xs text-slate-400 font-bold">
                Loading dispatch trail...
              </div>
            ) : logs.length === 0 ? (
              <div className="py-12 text-center text-xs text-slate-400">
                No emergency mass dispatches recorded yet.
              </div>
            ) : (
              <div className="mt-4 space-y-3.5 max-h-[600px] overflow-y-auto pr-1">
                {logs.map((log) => {
                  const urgencyStyle = 
                    log.urgency === 'critical' ? 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/50 dark:text-rose-300' :
                    log.urgency === 'urgent' ? 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/50 dark:text-amber-300' :
                    'bg-slate-50 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300';

                  return (
                    <div
                      key={log._id}
                      className="rounded-2xl border border-slate-100 bg-slate-50/50 p-4 transition-all hover:bg-slate-100/60 dark:border-slate-800 dark:bg-slate-800/40"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className={`inline-flex items-center rounded-md px-2 py-0.5 text-[10px] font-black uppercase tracking-wider border ${urgencyStyle}`}>
                          {log.urgency}
                        </span>
                        <span className="text-[11px] text-slate-400 font-medium">
                          {new Date(log.createdAt).toLocaleDateString()} {new Date(log.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>

                      <h4 className="mt-2 text-xs font-bold text-slate-900 dark:text-white line-clamp-1">
                        {log.title}
                      </h4>

                      <p className="mt-1 text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2">
                        {log.message}
                      </p>

                      <div className="mt-3 pt-2.5 border-t border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between text-[11px]">
                        <div className="flex items-center gap-1.5 font-mono text-slate-500">
                          {log.channels?.includes('sms') && <span className="bg-white dark:bg-slate-700 px-1.5 py-0.5 rounded border border-slate-200 dark:border-slate-600 font-bold text-[9px]">SMS</span>}
                          {log.channels?.includes('email') && <span className="bg-white dark:bg-slate-700 px-1.5 py-0.5 rounded border border-slate-200 dark:border-slate-600 font-bold text-[9px]">EMAIL</span>}
                          {log.channels?.includes('in_app') && <span className="bg-white dark:bg-slate-700 px-1.5 py-0.5 rounded border border-slate-200 dark:border-slate-600 font-bold text-[9px]">IN-APP</span>}
                        </div>

                        <span className="font-bold text-slate-700 dark:text-slate-300">
                          {log.stats?.totalRecipients || 0} Recipients
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Confirmation & Broadcast Authorization Modal */}
      <AnimatePresence>
        {confirmModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-lg overflow-hidden rounded-3xl bg-white shadow-2xl dark:bg-slate-900 border border-slate-100 dark:border-slate-800"
            >
              <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-rose-50 text-rose-600 dark:bg-rose-950/60 dark:text-rose-400">
                  <IoWarningOutline className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
                    Confirm Emergency Dispatch
                  </h3>
                  <p className="text-xs text-slate-500">Mass communication trigger authorization</p>
                </div>
              </div>

              <div className="p-6 space-y-4 text-xs">
                <div className="rounded-2xl bg-amber-50 dark:bg-amber-950/30 p-4 border border-amber-200 dark:border-amber-900 text-amber-900 dark:text-amber-200 leading-relaxed font-medium">
                  <strong>Warning:</strong> You are about to broadcast this notification across {channels.length} channel(s) to <strong>{AUDIENCE_OPTIONS.find(a => a.id === targetAudience)?.label}</strong>. This action is auditable under your Super Admin credentials.
                </div>

                <div className="rounded-2xl bg-slate-50 dark:bg-slate-800/40 p-4 border border-slate-200 dark:border-slate-700 space-y-2">
                  <div>
                    <span className="text-slate-400">Headline:</span> <strong className="text-slate-900 dark:text-white">{title}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400">Channels:</span> <strong className="text-slate-900 dark:text-white uppercase">{channels.join(', ')}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400">Threat Level:</span> <strong className="text-rose-600 uppercase font-black">{urgency}</strong>
                  </div>
                </div>

                <div className="pt-2 flex justify-end gap-2.5">
                  <button
                    type="button"
                    onClick={() => setConfirmModalOpen(false)}
                    className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-bold hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleExecuteBroadcast}
                    className="px-6 py-2.5 rounded-xl bg-rose-600 text-white font-black hover:bg-rose-700 shadow-lg shadow-rose-600/30 flex items-center gap-1.5"
                  >
                    <IoSend className="h-3.5 w-3.5" />
                    <span>Authorize & Dispatch</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
