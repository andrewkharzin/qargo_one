'use client';

import { useState } from 'react';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import Sidebar from './Sidebar/Sidebar';
import MobileHeader from './Header/MobileHeader';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20">
        <Sidebar isCollapsed={isCollapsed} />
        
        <main className="flex-1 flex flex-col">
          <MobileHeader onToggle={() => setIsCollapsed(!isCollapsed)} />
          
          <div className="flex-1 overflow-auto p-6">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}