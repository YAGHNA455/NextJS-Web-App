import React from 'react';
import ProtectedRoute from '@/components/ProtectedRoute';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute>
      <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-background to-secondary/20">
        {children}
      </div>
    </ProtectedRoute>
  );
}