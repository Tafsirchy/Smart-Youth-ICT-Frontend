'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import api from '@/lib/api';
import toast from 'react-hot-toast';
import {
  IoRibbonOutline, IoDownloadOutline, IoShareSocialOutline,
  IoCheckmarkCircle, IoOpenOutline
} from 'react-icons/io5';

export default function CertificatesPage() {
  const locale = useLocale();
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading]           = useState(true);

  useEffect(() => {
    api.get('/certificates')
      .then(res => { if (res.data?.success) setCertificates(res.data.data); })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const handleDownload = async (certId, courseName) => {
    try {
      const res = await api.get(`/certificates/${certId}/download`, { responseType: 'blob' });
      const url = URL.createObjectURL(new Blob([res.data], { type: 'application/pdf' }));
      const a   = Object.assign(document.createElement('a'), { href: url, download: `${courseName}-certificate.pdf` });
      a.click();
      URL.revokeObjectURL(url);
      toast.success('Certificate downloaded!');
    } catch {
      toast.error('Failed to download certificate.');
    }
  };

  const handleShare = (certId) => {
    const url = `${window.location.origin}/verify-certificate/${certId}`;
    navigator.clipboard.writeText(url).then(() => toast.success('Verification link copied!'));
  };

  return (
    <div className="pb-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-textPrimary flex items-center gap-3">
          <IoRibbonOutline className="text-amber-500" /> My Certificates
        </h1>
        <p className="text-textSecondary text-sm mt-1">Download and share your verified achievements.</p>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1,2,3].map(n => <div key={n} className="h-56 animate-pulse rounded-2xl bg-neutral-200" />)}
        </div>
      ) : certificates.length > 0 ? (
        <motion.div
          variants={{ animate: { transition: { staggerChildren: 0.09 } } }}
          initial="initial" animate="animate"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificates.map((cert, i) => (
            <motion.div key={cert._id}
              variants={{ initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0, transition: { duration: 0.4 } } }}
              className="relative bg-white rounded-3xl ring-1 ring-neutral-200 shadow-sm overflow-hidden hover:shadow-xl transition-all group">

              {/* Certificate visual header */}
              <div className="relative h-36 bg-gradient-to-br from-amber-400 via-orange-400 to-rose-400 flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 opacity-20"
                  style={{ backgroundImage: 'repeating-linear-gradient(45deg,transparent,transparent 10px,rgba(255,255,255,.1) 10px,rgba(255,255,255,.1) 20px)' }} />
                <div className="text-center text-white z-10">
                  <IoRibbonOutline size={44} className="mx-auto mb-1 opacity-90" />
                  <p className="text-xs font-bold uppercase tracking-widest opacity-80">Certificate of Completion</p>
                </div>
                {/* Verified badge */}
                <div className="absolute top-3 right-3 flex items-center gap-1 bg-white/20 backdrop-blur-sm rounded-full px-2.5 py-1 text-white text-xs font-semibold">
                  <IoCheckmarkCircle size={13} /> Verified
                </div>
              </div>

              <div className="p-5">
                <h3 className="font-bold text-textPrimary mb-1 line-clamp-2 group-hover:text-amber-600 transition-colors">
                  {cert.course?.title?.en || cert.course?.title || 'Course Certificate'}
                </h3>
                <p className="text-xs text-textSecondary mb-4">
                  Issued {cert.issuedAt ? new Date(cert.issuedAt).toLocaleDateString('en-BD', { day: 'numeric', month: 'long', year: 'numeric' }) : '—'}
                </p>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleDownload(cert._id, cert.course?.title?.en || 'certificate')}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-amber-50 text-amber-700 text-xs font-bold hover:bg-amber-500 hover:text-white transition-colors"
                  >
                    <IoDownloadOutline size={15} /> Download PDF
                  </button>
                  <button
                    onClick={() => handleShare(cert._id)}
                    className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-neutral-100 text-neutral-600 text-xs font-bold hover:bg-neutral-200 transition-colors"
                  >
                    <IoShareSocialOutline size={15} /> Share
                  </button>
                  <Link href={`/${locale}/verify-certificate/${cert._id}`} target="_blank"
                    className="flex items-center justify-center px-3 py-2.5 rounded-xl bg-neutral-100 text-neutral-600 hover:bg-neutral-200 transition-colors">
                    <IoOpenOutline size={15} />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-24 h-24 rounded-3xl bg-amber-50 flex items-center justify-center mb-6 ring-1 ring-amber-100">
            <IoRibbonOutline size={48} className="text-amber-400" />
          </div>
          <h3 className="text-xl font-bold text-textPrimary mb-2">No certificates yet</h3>
          <p className="text-textSecondary text-sm max-w-sm mb-8">
            Complete a course to earn your first certificate. Your hard work will be officially recognized!
          </p>
          <Link href={`/${locale}/student/my-courses`} className="btn-primary inline-block px-6 py-2.5">
            Go to My Courses
          </Link>
        </div>
      )}
    </div>
  );
}
