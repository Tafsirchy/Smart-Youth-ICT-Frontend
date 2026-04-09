"use client";

import { useState, useEffect } from 'react';

/**
 * Custom hook to delay showing a loading state.
 * Useful for preventing "flickering" loaders if an API request resolves very quickly.
 *
 * @param {boolean} isLoading - The initial loading state (e.g. from react-query or axios)
 * @param {number} delay - Minimum delay in ms before returning true
 * @returns {boolean} - The delayed loading state to be used in UI conditionals
 */
export function useDelayLoading(isLoading, delay = 300) {
  const [showLoading, setShowLoading] = useState(false);

  useEffect(() => {
    let timer;
    if (isLoading) {
      timer = setTimeout(() => setShowLoading(true), delay);
    } else {
      setShowLoading(false);
    }
    return () => clearTimeout(timer);
  }, [isLoading, delay]);

  return showLoading;
}
