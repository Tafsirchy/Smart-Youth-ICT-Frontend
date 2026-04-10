'use client';

import { useSession } from 'next-auth/react';

/**
 * useRole - A centralized hook for role-based authentication logic.
 * 
 * Provides semantic helpers to check user permissions and roles globally,
 * ensuring consistency across the UI and preventing manual string checks.
 */
export function useRole() {
  const { data: session, status } = useSession();

  const user = session?.user;
  const role = user?.role;

  const isSuperAdmin = role === 'super_admin' || role === 'super_management';
  const isAdmin      = role === 'admin'       || role === 'branch_admin' || role === 'branch_management';
  const isInstructor = role === 'instructor';
  const isStudent    = role === 'student'     || (!role && status === 'authenticated');

  return {
    user,
    role,
    status,
    isLoading: status === 'loading',
    isAuthenticated: status === 'authenticated',
    
    // Role Helpers
    isSuperAdmin,
    isAdmin,
    isInstructor,
    isStudent,
    
    // Specific role check
    is: (targetRole) => role === targetRole,
    
    // Check if user belongs to a specific branch
    isAtBranch: (branchId) => user?.branchId === branchId || isSuperAdmin,
  };
}
