'use client';

/**
 * Providers.jsx — Unified client-side provider wrapper
 *
 * Responsibilities:
 *   • SessionProvider  → NextAuth session available everywhere via useSession()
 *   • QueryClientProvider → TanStack Query cache for all server-state fetching
 *   • ReactQueryDevtools  → query inspector in development
 *
 * Usage: wrap children in root layout so ALL components can access both.
 *
 * STATE MANAGEMENT STRATEGY
 * ─────────────────────────
 *   TanStack Query  → server state  (courses, enrollments, progress, payments …)
 *   Zustand         → client state  (cart items, UI flags, locally-cached user prefs)
 */

import { SessionProvider } from 'next-auth/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useState } from 'react';

export default function Providers({ children, session }) {
  // Create ONE QueryClient per component mount so Next.js SSR doesn't share state
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime:            60 * 1000,    // 1 min — don't refetch too aggressively
            gcTime:               5 * 60 * 1000,// 5 min cache retention
            retry:                1,
            refetchOnWindowFocus: false,
          },
        },
      }),
  );

  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>
        {children}
        {process.env.NODE_ENV === 'development' && (
          <ReactQueryDevtools initialIsOpen={false} buttonPosition="bottom-left" />
        )}
      </QueryClientProvider>
    </SessionProvider>
  );
}
