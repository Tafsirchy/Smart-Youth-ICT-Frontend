'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSession } from 'next-auth/react';
import { useLocale } from 'next-intl';
import Link from 'next/link';
import api from '@/lib/api';
import toast from 'react-hot-toast';
import {
  IoCopyOutline, IoCheckmarkCircle, IoGiftOutline,
  IoPersonAddOutline, IoWalletOutline, IoShareSocialOutline,
  IoArrowForwardOutline
} from 'react-icons/io5';

const TIERS = [
  { min: 0,   max: 4,   commission: '10%', label: 'Starter',   color: 'from-blue-400 to-blue-600',        icon: '🌱' },
  { min: 5,   max: 14,  commission: '15%', label: 'Rising',    color: 'from-violet-500 to-purple-600',    icon: '🚀' },
  { min: 15,  max: 29,  commission: '20%', label: 'Pro',       color: 'from-amber-500 to-orange-500',     icon: '⭐' },
  { min: 30,  max: null,commission: '25%', label: 'Elite',     color: 'from-pink-500 to-rose-500',        icon: '👑' },
];

const HOW_IT_WORKS = [
  { step: '01', icon: IoPersonAddOutline, title: 'Sign Up',          desc: 'Register and get your unique referral link instantly.' },
  { step: '02', icon: IoShareSocialOutline,title: 'Share Your Link',  desc: 'Share with friends, post on social media, or message them directly.' },
  { step: '03', icon: IoGiftOutline,       title: 'They Enroll',      desc: 'When someone enrolls using your link, we track it automatically.' },
  { step: '04', icon: IoWalletOutline,     title: 'You Earn',         desc: 'Commission is credited to your wallet within 7 days of payment.' },
];

export default function AffiliatePage() {
  const { data: session } = useSession();
  const locale = useLocale();
  const [stats, setStats]   = useState(null);
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);

  const referralLink = session
    ? `${process.env.NEXT_PUBLIC_APP_URL || 'https://syict.com'}/${locale}/register?ref=${session.user?.referralCode || session.user?.id}`
    : null;

  useEffect(() => {
    if (!session) return;
    api.get('/affiliate/stats').then(res => { if (res.data?.success) setStats(res.data.data); }).catch(() => {});
  }, [session]);

  const copyLink = () => {
    if (!referralLink) return;
    navigator.clipboard.writeText(referralLink).then(() => {
      setCopied(true);
      toast.success('Referral link copied!');
      setTimeout(() => setCopied(false), 2500);
    });
  };

  const currentReferrals = stats?.totalReferrals || 0;
  const activeTier = TIERS.find(t => currentReferrals >= t.min && (t.max === null || currentReferrals <= t.max)) || TIERS[0];

  return (
    <div className="min-h-screen" style={{ background: 'var(--color-background)' }}>

      {/* ── Hero ── */}
      <section className="relative overflow-hidden py-20 px-4 text-center"
        style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 60%, #312e81 100%)' }}>
        <motion.div className="absolute -top-24 -left-20 w-80 h-80 rounded-full opacity-20 blur-3xl pointer-events-none"
          style={{ background: 'var(--color-brand-pink)' }}
          animate={{ scale:[1,1.15,1] }} transition={{ duration:8, repeat:Infinity }} />
        <motion.div className="absolute -bottom-20 -right-20 w-64 h-64 rounded-full opacity-15 blur-3xl pointer-events-none"
          style={{ background:'#818cf8' }}
          animate={{ scale:[1,1.2,1] }} transition={{ duration:7, repeat:Infinity, delay:1.5 }} />
        <div className="relative z-10 max-w-2xl mx-auto">
          <span className="inline-block mb-4 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider text-indigo-200 bg-white/10 border border-white/10">
            💸 Earn Real Money
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
            Affiliate Program
          </h1>
          <p className="text-indigo-200 text-lg mb-8 max-w-xl mx-auto">
            Refer friends to SYICT and earn up to <strong className="text-white">25% commission</strong> on every enrollment. No cap. Paid to your bKash or bank.
          </p>
          {session ? (
            <div className="bg-white/10 border border-white/20 rounded-2xl p-5 max-w-lg mx-auto">
              <p className="text-xs text-indigo-300 font-semibold mb-2 uppercase tracking-wider">Your Referral Link</p>
              <div className="flex gap-2">
                <input readOnly value={referralLink} className="flex-1 bg-white/10 border border-white/20 text-white rounded-xl px-3 py-2.5 text-sm focus:outline-none truncate" />
                <motion.button onClick={copyLink} whileHover={{ scale:1.04 }} whileTap={{ scale:0.96 }}
                  className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-pink-500 to-indigo-500 text-white text-sm font-bold flex items-center gap-1.5 shrink-0">
                  {copied ? <IoCheckmarkCircle size={16} /> : <IoCopyOutline size={16} />}
                  {copied ? 'Copied!' : 'Copy'}
                </motion.button>
              </div>
            </div>
          ) : (
            <div className="flex flex-wrap justify-center gap-3">
              <Link href={`/${locale}/register`} className="btn-primary px-7 py-3.5 font-bold text-base flex items-center gap-2">
                Join & Start Earning <IoArrowForwardOutline size={18} />
              </Link>
              <Link href={`/${locale}/login`} className="px-7 py-3.5 rounded-xl border border-white/20 text-white font-semibold hover:bg-white/10 transition text-base">
                Already a Member? Login
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* ── Stats (logged in) ── */}
      {session && stats && (
        <div className="container-lg mx-auto px-4 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {[
              { label: 'Total Referrals', value: stats.totalReferrals || 0,           color: 'text-blue-600',    bg: 'bg-blue-50'    },
              { label: 'Paid Enrollments',value: stats.paidReferrals || 0,            color: 'text-emerald-600', bg: 'bg-emerald-50' },
              { label: 'Total Earned (৳)', value: `৳${(stats.totalEarned || 0).toLocaleString()}`, color: 'text-violet-600',  bg: 'bg-violet-50'  },
              { label: 'Current Tier',    value: activeTier.label,                    color: 'text-amber-600',   bg: 'bg-amber-50'   },
            ].map(s => (
              <div key={s.label} className={`${s.bg} rounded-2xl p-5 text-center`}>
                <p className={`text-2xl font-extrabold ${s.color}`}>{s.value}</p>
                <p className="text-xs text-textSecondary mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── How It Works ── */}
      <section className="section">
        <div className="container-lg px-4">
          <motion.div className="text-center mb-10" initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}>
            <span className="badge-green mb-3">Simple Process</span>
            <h2 className="text-3xl font-extrabold text-textPrimary">How It Works</h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {HOW_IT_WORKS.map((s, i) => (
              <motion.div key={s.step} initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay: i*0.1 }}
                className="card p-6 text-center">
                <div className="w-14 h-14 mx-auto rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
                  <s.icon size={26} />
                </div>
                <span className="text-xs font-bold text-blue-400 uppercase tracking-widest">Step {s.step}</span>
                <h3 className="font-bold text-textPrimary mt-1 mb-2">{s.title}</h3>
                <p className="text-sm text-textSecondary leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Commission Tiers ── */}
      <section className="section" style={{ background:'var(--color-surface)' }}>
        <div className="container-lg px-4">
          <motion.div className="text-center mb-10" initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}>
            <span className="badge-pink mb-3">Commission Tiers</span>
            <h2 className="text-3xl font-extrabold text-textPrimary">The More You Refer, The More You Earn</h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TIERS.map((tier, i) => {
              const isActive = session && activeTier.label === tier.label;
              return (
                <motion.div key={tier.label} initial={{ opacity:0, scale:0.95 }} whileInView={{ opacity:1, scale:1 }} viewport={{ once:true }} transition={{ delay:i*0.1 }}
                  className={`relative rounded-3xl overflow-hidden ${isActive ? 'ring-2 ring-offset-2 ring-blue-500' : ''}`}>
                  <div className={`bg-gradient-to-br ${tier.color} p-6 text-white text-center`}>
                    <div className="text-4xl mb-2">{tier.icon}</div>
                    <h3 className="font-extrabold text-xl mb-1">{tier.label}</h3>
                    <p className="text-5xl font-extrabold">{tier.commission}</p>
                    <p className="text-sm opacity-80 mt-1">commission</p>
                  </div>
                  <div className="bg-white p-4 text-center">
                    <p className="text-sm text-textSecondary">
                      {tier.max ? `${tier.min}–${tier.max} referrals` : `${tier.min}+ referrals`}
                    </p>
                    {isActive && (
                      <span className="inline-block mt-2 text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                        ✓ Your Current Tier
                      </span>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      {!session && (
        <section className="section text-center">
          <div className="container-lg px-4 max-w-2xl mx-auto">
            <h2 className="text-3xl font-extrabold text-textPrimary mb-4">Ready to Start Earning?</h2>
            <p className="text-textSecondary mb-8">Join 500+ active affiliates already making income by spreading quality IT education.</p>
            <Link href={`/${locale}/register`} className="btn-primary inline-block px-10 py-4 font-bold text-lg">
              Join the Affiliate Program →
            </Link>
          </div>
        </section>
      )}
    </div>
  );
}
