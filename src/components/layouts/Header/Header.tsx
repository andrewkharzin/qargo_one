'use client';

import { SidebarTrigger } from '@/components/ui/sidebar';
import { ModeToggle } from '@/components/themeToggle';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="sticky top-0 z-30 flex items-center justify-between border-b border-slate-200/60 bg-white/80 px-6 py-4 backdrop-blur-xl shadow-md">
      {/* Left: Sidebar trigger on mobile */}
      <div className="flex items-center gap-4">
        <SidebarTrigger />
        <h1 className="text-xl font-bold text-slate-800">Premium Dashboard</h1>
      </div>

      {/* Center: Navigation links */}
      <nav className="hidden md:flex items-center gap-6">
        <Link href="/dashboard" className="text-slate-700 hover:text-blue-600 transition-colors">
          Dashboard
        </Link>
        <Link href="/projects" className="text-slate-700 hover:text-blue-600 transition-colors">
          Projects
        </Link>
        <Link href="/analytics" className="text-slate-700 hover:text-blue-600 transition-colors">
          Analytics
        </Link>
        <Link href="/settings" className="text-slate-700 hover:text-blue-600 transition-colors">
          Settings
        </Link>
      </nav>

      {/* Right: Mode toggle and user menu placeholder */}
      <div className="flex items-center gap-4">
        <ModeToggle />
        <div className="hidden md:flex items-center gap-2">

        </div>
      </div>
    </header>
  );
}
