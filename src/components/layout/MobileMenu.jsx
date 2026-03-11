'use client';

import Link from 'next/link';

export default function MobileMenu({ links, session, onClose }) {
  return (
    <div className="md:hidden bg-white border-t border-gray-100 px-4 pb-4">
      <ul className="flex flex-col gap-1 pt-3">
        {links.map(({ href, label }) => (
          <li key={href}>
              <Link href={href} onClick={onClose}
              className="block px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:text-primary hover:bg-primary/5 transition-all">
              {label}
            </Link>
          </li>
        ))}
      </ul>
      <div className="mt-4 flex flex-col gap-2">
        {session ? (
          <Link href="/student" onClick={onClose} className="btn-primary text-center text-sm">Dashboard</Link>
        ) : (
          <>
            <Link href="/login" onClick={onClose} className="btn-ghost text-center text-sm font-medium text-gray-700">Sign In</Link>
            <Link href="/register" onClick={onClose} className="btn-primary text-center text-sm">Enroll Now</Link>
          </>
        )}
      </div>
    </div>
  );
}
