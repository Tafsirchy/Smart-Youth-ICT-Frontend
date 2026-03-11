'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { HiOutlineDownload, HiOutlineEye } from 'react-icons/hi';
import { motion } from 'framer-motion';

export default function CertificateCard({ certificate }) {
  const { courseTitle, issuedAt, pdfUrl, verificationCode } = certificate;

  const formattedDate = new Date(issuedAt).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white rounded-2xl border border-neutral-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col sm:flex-row"
    >
      <div className="bg-gradient-to-br from-amber-100 to-orange-50 p-6 flex flex-col justify-center items-center sm:w-1/3 border-b sm:border-b-0 sm:border-r border-neutral-200">
        <Image
          src="/images/certificate-preview.png"
          alt="Certificate Preview"
          width={120}
          height={80}
          className="opacity-80"
          onError={(e) => {
            e.target.style.display = 'none'; // Fallback if image doesn't exist yet
          }}
        />
        <div className="mt-4 text-center">
          <p className="text-xs font-bold text-amber-700 uppercase tracking-widest">Verified</p>
        </div>
      </div>
      
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-lg font-bold text-neutral-900 mb-1">{courseTitle}</h3>
          <p className="text-sm text-neutral-500">Issued on {formattedDate}</p>
          <div className="mt-4 inline-block bg-neutral-100 rounded-md px-3 py-1 border border-neutral-200">
            <p className="text-xs text-neutral-500 font-mono">
              ID: <span className="font-bold text-neutral-700">{verificationCode}</span>
            </p>
          </div>
        </div>
        
        <div className="mt-6 flex gap-3">
          <a
            href={pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex justify-center items-center gap-2 bg-blue-50 text-blue-700 hover:bg-blue-600 hover:text-white transition-colors py-2 px-4 rounded-lg text-sm font-semibold"
          >
            <HiOutlineEye size={16} /> View
          </a>
          <a
            href={pdfUrl}
            download
            className="flex-1 flex justify-center items-center gap-2 bg-neutral-900 text-white hover:bg-neutral-800 transition-colors py-2 px-4 rounded-lg text-sm font-semibold"
          >
            <HiOutlineDownload size={16} /> Download
          </a>
        </div>
      </div>
    </motion.div>
  );
}
