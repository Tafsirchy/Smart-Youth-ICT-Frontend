import React, { Suspense } from 'react';
import AffiliateContent from './AffiliateContent';
import DashboardSkeleton from '@/components/ui/DashboardSkeleton';

export const metadata = {
  title: 'Affiliate Hub — SYICT Partner',
  description: 'Manage your referrals and withdrawals.',
};

export default function AffiliateDashboardPage() {
  return (
    <Suspense fallback={<DashboardSkeleton />}>
      <AffiliateContent />
    </Suspense>
  );
}
