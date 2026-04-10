import DashboardSkeleton from '@/components/ui/DashboardSkeleton';

/**
 * Dashboard-Specific Loading Segment
 * ─────────────────────────────────
 * This loading file ensures that when navigating BETWEEN dashboard routes,
 * the Sidebar and Layout shell remain fixed and visible. ONLY the main
 * content area will show the DashboardSkeleton.
 */
export default function DashboardLoading() {
  return <DashboardSkeleton />;
}
