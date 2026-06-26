'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { redirect, useParams } from 'next/navigation';
import Sidebar from '@/components/layout/Sidebar';
import DashboardTopbar from '@/components/layout/DashboardTopbar';
import SessionSync from '@/components/dashboard/SessionSync';

/**
 * Common Dashboard Layout for all roles (Student, Instructor, Admin, Super Admin)
 * It handles the shell (CSS Grid), Mobile Navigation, Sidebar, and Session Sync.
 */
export default function SharedDashboardLayout({ children }) {
  const { data: session, status } = useSession();
  const params = useParams();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  if (status === 'loading') {
    return <div className="h-screen w-full flex items-center justify-center bg-slate-50"><div className="w-8 h-8 border-4 border-brand-pink border-t-transparent rounded-full animate-spin"></div></div>;
  }

  if (!session) {
    redirect(`/${params.locale}/login`);
  }

  return (
    <div className="dashboard-layout">
      <SessionSync />
      
      {/* Mobile / Tablet Topbar */}
      <DashboardTopbar user={session.user} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      
      {/* Sidebar Drawer / Desktop Rail */}
      <Sidebar 
        initialRole={session.user.role} 
        initialUser={session.user} 
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)} 
      />
      
      {/* Main Content Area */}
      <div className="dashboard-main">
        <main className="dashboard-main-content">
          {children}
        </main>
      </div>
      
      {/* Mobile Drawer Backdrop Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[190] lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}
