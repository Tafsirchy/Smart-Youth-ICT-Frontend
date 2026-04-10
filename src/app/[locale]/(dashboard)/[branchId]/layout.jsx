export default function BranchDashboardLayout({ children }) {
  // Common shell logic (Sidebar, Auth) has been moved up to (dashboard)/layout.jsx
  // to support both global (/super) and branch-specific (/[branchId]) routes.
  return <>{children}</>;
}
