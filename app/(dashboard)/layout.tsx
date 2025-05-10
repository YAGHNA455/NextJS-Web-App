import React from 'react';
import ProtectedRoute from '@/components/ProtectedRoute';
import { Navbar } from '@/components/layout/Navbar';
import { Sidebar } from '@/components/layout/Sidebar';
import { MobileNav } from '@/components/layout/MobileNav';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background">
        <Navbar />
        <Sidebar />
        <div className="md:ml-64 min-h-[calc(100vh-4rem)]">
          <div className="flex">
            <div className="md:hidden">
              <MobileNav />
            </div>
            <main className="flex-1 p-4 md:p-8">{children}</main>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}