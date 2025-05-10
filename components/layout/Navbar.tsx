"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { LucideLayoutDashboard, LucideMap, LucidePieChart, LucideUser, LucideLogOut } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

export function Navbar() {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  
  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const navItems = [
    { href: '/projects', label: 'Projects', icon: <LucideLayoutDashboard className="h-5 w-5" /> },
    { href: '/map', label: 'Map', icon: <LucideMap className="h-5 w-5" /> },
    { href: '/charts', label: 'Charts', icon: <LucidePieChart className="h-5 w-5" /> },
  ];

  if (!user) return null;

  return (
    <header className="sticky top-0 z-30 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/projects" className="flex items-center gap-2">
          <LucideLayoutDashboard className="h-6 w-6" />
          <span className="font-bold text-xl hidden md:inline">ProjectHub</span>
        </Link>
        
        <nav className="flex items-center gap-6">
          {navItems.map(({ href, label, icon }) => (
            <TooltipProvider key={href} delayDuration={0}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link 
                    href={href} 
                    className={cn(
                      "hidden md:flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary",
                      pathname === href ? "text-primary" : "text-muted-foreground"
                    )}
                  >
                    {icon}
                    <span>{label}</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent className="md:hidden">{label}</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
          
          <div className="flex items-center gap-4">
            <TooltipProvider delayDuration={0}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="rounded-full p-2"
                  >
                    <LucideUser className="h-5 w-5" />
                    <span className="sr-only">Profile</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Profile</TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <TooltipProvider delayDuration={0}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={handleLogout}
                    className="rounded-full p-2"
                  >
                    <LucideLogOut className="h-5 w-5" />
                    <span className="sr-only">Logout</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Logout</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </nav>
      </div>
    </header>
  );
}