"use client";

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

type ProtectedRouteProps = {
  children: React.ReactNode;
};

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  
  useEffect(() => {
    if (!loading) {
      // If not logged in and trying to access a protected route
      if (!user && !pathname.includes('/login') && !pathname.includes('/signup') && !pathname.includes('/forgot-password')) {
        router.push('/login');
      }
      
      // If logged in and trying to access auth routes
      if (user && (pathname.includes('/login') || pathname.includes('/signup') || pathname.includes('/forgot-password'))) {
        router.push('/projects');
      }
    }
  }, [user, loading, router, pathname]);

  // Show nothing while checking auth status
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }
  
  return <>{children}</>;
}