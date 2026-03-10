'use client';

import Link from 'next/link';

export default function MobileMenu({ links, session, onClose }) {
  return (
    <div style={{ background: 'var(--color-dark)' }} className="md:hidden border-t border-white/10 px-4 pb-4">
      <ul className="flex flex-col gap-1 pt-3">
        {links.map(({ href, label }) => (
          <li key={href}>
            <Link href={href} onClick={onClose}
              className="block px-3 py-2 rounded-lg text-sm text-gray-300 hover:text-white hover:bg-white/10 transition-all">
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
            <Link href="/login" onClick={onClose} className="btn-ghost text-center text-sm text-gray-300">Sign In</Link>
            <Link href="/register" onClick={onClose} className="btn-primary text-center text-sm">Enroll Now</Link>
          </>
        )}
      </div>
    </div>
  );
}
