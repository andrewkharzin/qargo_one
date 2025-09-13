'use client';

import { SidebarProvider } from "@/components/ui/sidebar";
import Sidebar from './Sidebar/Sidebar';
import MobileHeader from './Header/MobileHeader';
import Header from './Header/Header';
import { Breadcrumb } from "@/components/ui/reuse/Breadcrumb"; // Добавляем импорт

interface DashboardLayoutProps {
  children: React.ReactNode;
  breadcrumbItems?: Array<{ label: string; href: string; isCurrent?: boolean }>;
}

export default function DashboardLayout({
     children,
     breadcrumbItems = []
     }: DashboardLayoutProps) {
  return (
    <SidebarProvider>

      <div className="min-h-screen flex w-full bg-white dark:bg-slate-800">
        <Sidebar />

        <main className="flex-1 flex flex-col">
          <Header />
          <MobileHeader />
           {/* Breadcrumb будет рендериться только если есть провайдер */}
           {/* Breadcrumb будет рендериться только если переданы items */}
          {breadcrumbItems.length > 0 && (
            <Breadcrumb items={breadcrumbItems} />
          )}

          <div className="flex-1 overflow-auto">
            {children}
          </div>
        </main>
      </div>

    </SidebarProvider>
  );
}
