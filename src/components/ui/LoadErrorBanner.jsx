'use client';

import React from 'react';
import { HiExclamationCircle } from 'react-icons/hi';

/**
 * Inline error banner for data-loading failures.
 * Prevents silent empty states when a fetch fails.
 */
export default function LoadErrorBanner({ message, onRetry }) {
  if (!message) return null;

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-800">
      <div className="flex items-center gap-2">
        <HiExclamationCircle className="h-5 w-5 shrink-0 text-rose-500" />
        <span className="font-medium">{message}</span>
      </div>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="self-start sm:self-auto rounded-lg border border-rose-300 bg-white px-3 py-1.5 text-xs font-bold text-rose-700 hover:bg-rose-100 transition-colors"
        >
          Retry
        </button>
      )}
    </div>
  );
}
