'use client';

import { useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useRole } from '@/hooks/useRole';

/**
 * usePermissionGuard
 * 
 * Protects a client-side page from employees who lack the required permission.
 * Branch Managers and Super Admins always pass through.
 * 
 * @param {string|string[]} requiredPermission - One or more permission strings (OR logic — any match grants access)
 * @returns {{ isLoading: boolean, isDenied: boolean }}
 * 
 * @example
 * const { isLoading, isDenied } = usePermissionGuard('payments:view');
 * if (isLoading) return <Spinner />;
 * if (isDenied) return <AccessDenied />;
 */
export function usePermissionGuard(requiredPermission) {
  const { isLoading, isSuperAdmin, isBranchManager, isEmployee, hasPermission } = useRole();
  const router = useRouter();
  const { branchId } = useParams();

  const required = Array.isArray(requiredPermission)
    ? requiredPermission
    : [requiredPermission];

  // Admins and super admins always have access — no guard needed
  const isAuthorized =
    isSuperAdmin ||
    isBranchManager ||
    required.some((perm) => hasPermission(perm));

  const isDenied = !isLoading && !isAuthorized;

  useEffect(() => {
    // Only redirect employees who are confirmed unauthorized
    // Non-employee roles are never redirected (guard is transparent to them)
    if (!isLoading && isEmployee && !isAuthorized) {
      // Redirect to the branch admin root with a denied query param
      const dest = branchId ? `/${branchId}/admin?access=denied` : '/auth-redirect';
      router.replace(dest);
    }
  }, [isLoading, isEmployee, isAuthorized, router, branchId]);

  return {
    isLoading,
    isDenied,
  };
}
