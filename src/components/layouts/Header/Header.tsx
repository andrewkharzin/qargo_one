'use client';

import { SidebarTrigger } from '@/components/ui/sidebar';
import { ModeToggle } from '@/components/themeToggle';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Sparkles, Bell, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 flex h-16 items-center justify-between border-b border-slate-200/40 bg-white/80 px-6 backdrop-blur-xl transition-all duration-300 dark:border-slate-800/40 dark:bg-slate-900/80">
      {/* Gradient overlay for premium effect */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-blue-500/5 via-transparent to-purple-500/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>
      
      {/* Left: Sidebar trigger and logo */}
      <div className="flex items-center gap-4">
        <motion.div whileTap={{ scale: 0.95 }}>
          <SidebarTrigger className="h-9 w-9 rounded-xl bg-white shadow-sm hover:bg-slate-50 hover:shadow-md dark:bg-slate-800 dark:hover:bg-slate-700/80" />
        </motion.div>
        
        <div className="flex items-center gap-3">
          <div className="relative flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 shadow-lg">
            <Sparkles className="h-4 w-4 text-white" />
            <div className="absolute -inset-1 rounded-xl bg-blue-500/20 blur-sm"></div>
          </div>
          <motion.h1 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-xl font-bold text-transparent dark:from-slate-100 dark:to-slate-300"
          >
            Premium Dashboard
          </motion.h1>
        </div>
      </div>

      {/* Center: Search bar */}
      <div className="hidden flex-1 max-w-md lg:block px-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <Input
            type="search"
            placeholder="Search anything..."
            className="w-full rounded-xl border-slate-200/60 bg-white/70 pl-10 backdrop-blur-sm focus-visible:ring-2 focus-visible:ring-blue-500/30 dark:border-slate-700 dark:bg-slate-800/70 dark:placeholder:text-slate-400"
          />
        </div>
      </div>

      {/* Right: Navigation and controls */}
      <div className="flex items-center gap-4">
        {/* Navigation links - shown on larger screens */}
        <nav className="hidden md:flex items-center gap-1">
          {[
            { href: "/dashboard", label: "Dashboard" },
            { href: "/projects", label: "Projects" },
            { href: "/analytics", label: "Analytics" },
            { href: "/settings", label: "Settings" }
          ].map((item, index) => (
            <motion.div
              key={item.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                href={item.href}
                className="relative rounded-lg px-3 py-2 text-sm font-medium text-slate-700 transition-all duration-200 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400"
              >
                {item.label}
                <span className="absolute inset-x-1 -bottom-1 h-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 opacity-0 transition-opacity hover:opacity-100"></span>
              </Link>
            </motion.div>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {/* Notification bell */}
          <motion.button 
            whileTap={{ scale: 0.95 }}
            className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-white shadow-sm transition-all hover:shadow-md dark:bg-slate-800 dark:hover:bg-slate-700/80"
          >
            <Bell className="h-4 w-4 text-slate-600 dark:text-slate-400" />
            <span className="absolute -right-1 -top-1 h-4 w-4 rounded-full bg-red-500 text-xs font-medium text-white flex items-center justify-center">
              3
            </span>
          </motion.button>

          {/* Theme toggle */}
          <motion.div whileTap={{ scale: 0.95 }}>
            <ModeToggle />
          </motion.div>

          {/* User avatar placeholder */}
          <motion.div 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="hidden md:flex items-center justify-center h-9 w-9 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-lg cursor-pointer overflow-hidden"
          >
            <div className="absolute inset-0 bg-white/10 opacity-0 transition-opacity hover:opacity-100"></div>
            <span className="text-sm font-medium">JD</span>
          </motion.div>
        </div>
      </div>
    </header>
  );
}