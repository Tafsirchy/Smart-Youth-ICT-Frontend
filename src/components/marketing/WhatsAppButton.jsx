'use client';

import { FaWhatsapp } from 'react-icons/fa';

export default function WhatsAppButton() {
  const number  = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '8801000000000';
  const message = encodeURIComponent('Hi SYICT! I\'d like to know more about your courses.');

  return (
    <a
      href={`https://wa.me/${number}?text=${message}`}
      id="floating-whatsapp"
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full shadow-hover transition-transform hover:scale-110"
      style={{ background: '#25D366' }}
    >
      <FaWhatsapp size={28} color="#fff" />
    </a>
  );
}
