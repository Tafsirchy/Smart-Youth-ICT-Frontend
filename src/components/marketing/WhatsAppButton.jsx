'use client';

import { useState, useEffect, useRef } from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { usePathname } from 'next/navigation';

export default function WhatsAppButton() {
  const pathname = usePathname();
  const [isExpanded, setIsExpanded] = useState(false);
  const buttonRef = useRef(null);

  // Close the popup if user clicks anywhere else on the screen
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (buttonRef.current && !buttonRef.current.contains(e.target)) {
        setIsExpanded(false);
      }
    };
    
    if (isExpanded) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isExpanded]);

  // Hide the WhatsApp button on dashboard/admin routes
  if (pathname && (pathname.includes('/admin') || pathname.includes('/super'))) {
    return null;
  }

  const number  = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '8801000000000';
  const message = encodeURIComponent('Hi SYICT! I\'d like to know more about your courses.');

  const handleClick = (e) => {
    if (!isExpanded) {
      // Prevent opening the link on the first click, just expand it
      e.preventDefault(); 
      setIsExpanded(true); 
    }
  };

  return (
    <a
      ref={buttonRef}
      href={`https://wa.me/${number}?text=${message}`}
      onClick={handleClick}
      id="floating-whatsapp"
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
      className={`fixed bottom-6 z-50 flex items-center justify-center w-14 h-14 rounded-full shadow-[0_8px_30px_rgba(37,211,102,0.3)] transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
        isExpanded 
          ? 'right-6 translate-x-0 hover:scale-110 opacity-100' 
          : 'right-0 translate-x-[50%] opacity-80 hover:opacity-100 hover:translate-x-[40%]'
      }`}
      style={{ background: '#25D366' }}
    >
      <FaWhatsapp size={28} color="#fff" />
    </a>
  );
}
