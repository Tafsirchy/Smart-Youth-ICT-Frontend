'use client';

import { useEffect, useRef } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter, usePathname } from 'next/navigation';
import api from '@/lib/api';
import toast from 'react-hot-toast';

/**
 * SessionSync handles real-time role and status synchronization.
 * Fix: Uses a Ref to track session state to avoid stale closures in the polling interval.
 */
export default function SessionSync() {
  const { data: session, status, update } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const sessionRef = useRef(session);
  const checkInterval = useRef(null);
  const isSyncing = useRef(false);

  // Keep the ref in sync with the latest session state from the hook
  useEffect(() => {
    sessionRef.current = session;
  }, [session]);

  const syncSession = async () => {
    // Only sync if authenticated and not already in a sync cycle
    if (status !== 'authenticated' || !sessionRef.current || isSyncing.current) return;

    try {
      isSyncing.current = true;
      
      // Fetch latest user data from backend
      const response = await api.get('/users/me');
      const dbUser = response.data?.data;

      if (!dbUser) return;

      const currentSession = sessionRef.current;

      // 1. Security Check: Account Deactivation
      if (dbUser.isActive === false) {
        toast.error('Your account has been disabled. Logging out...', { duration: 5000 });
        signOut({ callbackUrl: '/login' });
        return;
      }

      // 2. Data Check: Role or Branch escalation/change
      const hasRoleChanged = dbUser.role !== currentSession.user.role;
      const hasBranchChanged = dbUser.branchId !== currentSession.user.branchId;
      const hasNameChanged = dbUser.name !== currentSession.user.name;

      if (hasRoleChanged || hasBranchChanged || hasNameChanged) {

        
        // Update the client-side session JWT
        await update({
          user: {
            role: dbUser.role,
            branchId: dbUser.branchId,
            name: dbUser.name,
            image: dbUser.avatar || dbUser.image
          }
        });

        // Only toast on major role changes
        if (hasRoleChanged) {
          toast.success(`Account permissions updated: You are now a ${dbUser.role.replace('_', ' ')}`, {
            icon: '🔐',
            duration: 5000,
            id: 'role-change-toast'
          });

          // 3. Routing Check: Auto-redirect to appropriate dashboard
          const isSuperRole = ['super_admin', 'super_management'].includes(dbUser.role);
          const isOnSuperPage = pathname.includes('/super');

          if (isSuperRole && !isOnSuperPage) {

            // Hard redirect to ensure a clean mount of the global dashboard layout
            setTimeout(() => { window.location.href = '/super'; }, 1500);
            return;
          }

          // Fallback: Reload current page for other role changes to refresh Server Components
          setTimeout(() => { window.location.reload(); }, 1500);
        }
      }
    } catch (error) {
      console.error('[SessionSync] Synchronization error:', error);
    } finally {
      isSyncing.current = false;
    }
  };

  useEffect(() => {
    if (status === 'authenticated') {
      // Run once on mount/auth
      syncSession();

      // Poll every 5 minutes (300,000 ms)
      if (checkInterval.current) clearInterval(checkInterval.current);
      checkInterval.current = setInterval(syncSession, 300000);
    }

    return () => {
      if (checkInterval.current) clearInterval(checkInterval.current);
    };
  }, [status]);

  return null;
}
