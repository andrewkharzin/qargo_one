'use client';

import { useState } from 'react';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import Sidebar from './Sidebar/Sidebar';
import MobileHeader from './Header/MobileHeader';
import Header from './Header/Header';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-white dark:bg-slate-800">
        <Sidebar isCollapsed={isCollapsed} />

        <main className="flex-1 flex flex-col">
            <Header />
          <MobileHeader onToggle={() => setIsCollapsed(!isCollapsed)} />

          <div className="flex-1 overflow-auto">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
