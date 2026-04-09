import React, { Suspense } from 'react';
import SupportContent from './SupportContent';
import DashboardSkeleton from '@/components/ui/DashboardSkeleton';

export const metadata = {
  title: 'Support Hub — SYICT Student',
  description: 'Raise and track your support inquiries.',
};

export default function SupportHubPage() {
  return (
    <Suspense fallback={<DashboardSkeleton />}>
      <SupportContent />
    </Suspense>
  );
}
