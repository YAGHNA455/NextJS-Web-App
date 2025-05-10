"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useAuth } from '@/context/AuthContext';
import { 
  LucideLayoutDashboard, 
  LucideMap, 
  LucidePieChart,
  LucideLogOut
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Sidebar() {
  const pathname = usePathname();
  const { logout } = useAuth();

  const sidebarLinks = [
    {
      title: 'Projects',
      href: '/projects',
      icon: <LucideLayoutDashboard className="h-5 w-5" />,
    },
    {
      title: 'Map',
      href: '/map',
      icon: <LucideMap className="h-5 w-5" />,
    },
    {
      title: 'Charts',
      href: '/charts',
      icon: <LucidePieChart className="h-5 w-5" />,
    },
  ];

  return (
    <div className="hidden md:flex h-screen w-64 flex-col fixed top-0 left-0 border-r bg-background">
      <div className="flex h-16 items-center border-b px-6">
        <Link href="/projects" className="flex items-center gap-2">
          <LucideLayoutDashboard className="h-6 w-6" />
          <span className="font-bold text-xl">ProjectHub</span>
        </Link>
      </div>
      <div className="flex-1 overflow-auto py-6 px-4">
        <nav className="flex flex-col gap-2">
          {sidebarLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all",
                pathname === link.href
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              )}
            >
              {link.icon}
              {link.title}
            </Link>
          ))}
        </nav>
      </div>
      <div className="mt-auto p-4 border-t">
        <Button
          variant="outline"
          className="w-full justify-start gap-2"
          onClick={() => logout()}
        >
          <LucideLogOut className="h-4 w-4" />
          Logout
        </Button>
      </div>
    </div>
  );
}