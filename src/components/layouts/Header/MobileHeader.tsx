// components/layouts/Header/MobileHeader.tsx
'use client';

import { SidebarTrigger } from "@/components/ui/sidebar";

interface MobileHeaderProps {
  // Remove the onToggle prop since SidebarProvider handles it
}

export default function MobileHeader({}: MobileHeaderProps) {
  return (
    <header className="sticky top-0 z-30 flex items-center gap-4 border-b border-slate-200/60 bg-white/80 backdrop-blur-xl px-4 py-3 md:hidden">
      <SidebarTrigger />

      {/* Rest of your mobile header content */}
      <div className="flex-1">
        {/* Your mobile header content */}
      </div>
    </header>
  );
}
