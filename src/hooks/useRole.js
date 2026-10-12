'use client';

import { useSession } from 'next-auth/react';

/**
 * useRole - A centralized hook for role-based authentication and delegated permission checks.
 * 
 * Provides semantic helpers to check user permissions and roles globally,
 * ensuring consistency across the UI and preventing manual string checks.
 */
export function useRole() {
  const { data: session, status } = useSession();

  const user = session?.user;
  const role = user?.role;
  const permissions = user?.permissions || [];

  const isSuperAdmin    = role === 'super_admin' || role === 'super_management';
  const isBranchManager = role === 'branch_admin' || role === 'branch_management';
  const isAdmin         = role === 'admin' || isBranchManager;
  const isEmployee      = role === 'employee';
  const isInstructor    = role === 'instructor';
  const isStudent       = role === 'student' || (!role && status === 'authenticated');

  // Dynamic permission checker:
  // - Super Admin & Branch Managers automatically have all branch permissions
  // - Employees check their delegated permissions list
  const hasPermission = (permission) => {
    if (isSuperAdmin || isBranchManager) return true;
    if (isEmployee) return permissions.includes(permission);
    return false;
  };

  return {
    user,
    role,
    permissions,
    status,
    isLoading: status === 'loading',
    isAuthenticated: status === 'authenticated',
    
    // Role Helpers
    isSuperAdmin,
    isBranchManager,
    isAdmin,
    isEmployee,
    isInstructor,
    isStudent,
    
    // Dynamic Permission Checker
    hasPermission,

    // Specific role check
    is: (targetRole) => role === targetRole,
    
    // Check if user belongs to a specific branch
    isAtBranch: (branchId) => user?.branchId === branchId || isSuperAdmin,
  };
}
