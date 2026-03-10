'use client';

import React, { useState, useRef, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { IoLanguage } from 'react-icons/io5';

const locales = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'bn', name: 'বাংলা', flag: '🇧🇩' },
];

export function LanguageSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const pathname = usePathname();
  const router = useRouter();

  // Extract current locale from pathname (e.g., /bn/about -> bn)
  const currentLocale = pathname.split('/')[1];
  const activeLocale = locales.find((l) => l.code === currentLocale) || locales[0];

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const switchLanguage = (newLocale) => {
    // Basic implementation: replace the current locale prefix in the URL
    // A robust next-intl implementation would use its dedicated navigation APIs
    if (newLocale === currentLocale) {
      setIsOpen(false);
      return;
    }

    const segments = pathname.split('/');
    segments[1] = newLocale; // Replace locale
    const newPath = segments.join('/');
    
    router.push(newPath);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm font-medium text-neutral-700 shadow-sm transition-colors hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <IoLanguage size={18} className="text-blue-600" />
        <span className="hidden sm:inline-block">{activeLocale.name}</span>
        <span className="sm:hidden">{activeLocale.code.toUpperCase()}</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 mt-2 w-40 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
          >
            <div className="py-1">
              {locales.map((locale) => (
                <button
                  key={locale.code}
                  className={`flex w-full items-center gap-3 px-4 py-2 text-left text-sm transition-colors hover:bg-blue-50 hover:text-blue-600 ${
                    currentLocale === locale.code ? 'bg-blue-50 font-semibold text-blue-600' : 'text-neutral-700'
                  }`}
                  onClick={() => switchLanguage(locale.code)}
                >
                  <span className="text-lg">{locale.flag}</span>
                  {locale.name}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
