'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

/**
 * Portal Component
 * Renders children at the body level to escape dashboard stacking contexts.
 * Essential for fixed-position modals that must cover the entire viewport.
 */
export default function Portal({ children }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  // Only render on client after mounting to avoid SSR mismatch
  return mounted ? createPortal(children, document.body) : null;
}
