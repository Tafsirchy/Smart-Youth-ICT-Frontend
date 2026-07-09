'use client';

import { FaWhatsapp } from 'react-icons/fa';
import { usePathname } from 'next/navigation';

export default function WhatsAppButton() {
  const pathname = usePathname();

  // Hide the WhatsApp button on dashboard/admin routes
  if (pathname && (pathname.includes('/admin') || pathname.includes('/super'))) {
    return null;
  }

  const rawNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '01822-335566';
  // WhatsApp requires numbers to have no dashes, spaces, or plus signs.
  // We remove non-numeric characters. If it's a local BD number (starts with 01), we prepend 88.
  let number = rawNumber.replace(/\D/g, '');
  if (number.startsWith('01') && number.length === 11) {
    number = '88' + number;
  }
  
  const message = encodeURIComponent('Hi SYICT! I\'d like to know more about your courses.');

  return (
    <a
      href={`https://wa.me/${number}?text=${message}`}
      id="floating-whatsapp"
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full shadow-[0_8px_30px_rgba(37,211,102,0.4)] transition-transform hover:scale-110"
      style={{ background: '#25D366' }}
    >
      <FaWhatsapp size={28} color="#fff" />
    </a>
  );
}
