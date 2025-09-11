// components/layouts/Sidebar/Sidebar.tsx
'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { PenTool, Sparkles } from 'lucide-react';
import {
  Sidebar as UISidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { NavigationItem } from './types';
import { navigationItems, managementItems } from './NavigationItems';

interface SidebarComponentProps {
  isCollapsed?: boolean;
}

export default function Sidebar({ isCollapsed = false }: SidebarComponentProps) {
  const pathname = usePathname();

  // Check if current path is active or a child of active path (for parallel routes)
  const isActive = (itemUrl: string, currentPath: string) => {
    if (itemUrl === currentPath) return true;
    // For parallel routes, check if current path starts with item URL
    if (currentPath.startsWith(itemUrl + '/')) return true;
    return false;
  };

  const renderNavigationGroup = (items: NavigationItem[], groupName: string) => (
    <SidebarGroup>
      <SidebarGroupLabel className="text-xs font-semibold text-slate-500 uppercase tracking-wider px-3 py-3">
        {groupName}
      </SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => {
            const active = isActive(item.url, pathname);
            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  asChild
                  className={`hover:bg-blue-50/80 hover:text-blue-700 transition-all duration-300 rounded-xl mb-1 group ${
                    active ? 'bg-blue-50/80 text-blue-700 shadow-sm' : ''
                  }`}
                >
                  <Link
                    href={item.url}
                    className="flex items-center gap-3 px-4 py-3"
                  >
                    <item.icon className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
                    {!isCollapsed && (
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{item.title}</span>
                        {item.isParallel && (
                          <span className="text-xs text-blue-500 bg-blue-100 px-2 py-0.5 rounded-full">
                            Parallel
                          </span>
                        )}
                      </div>
                    )}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );

  return (
    <UISidebar className="border-r border-slate-200/60 bg-white/80 backdrop-blur-xl">
      <SidebarHeader className="border-b border-slate-200/60 p-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 via-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
            <PenTool className="w-5 h-5 text-white" />
          </div>
          {!isCollapsed && (
            <div>
              <h2 className="font-bold text-lg text-slate-900">Ultimate Notes</h2>
              <p className="text-xs text-slate-500 font-medium">Social AI Writing</p>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent className="p-3">
        {renderNavigationGroup(navigationItems, "Core Features")}
        {renderNavigationGroup(managementItems, "Management")}

        {/* AI Features Section */}
        {!isCollapsed && (
          <SidebarGroup>
            <SidebarGroupLabel className="text-xs font-semibold text-slate-500 uppercase tracking-wider px-3 py-3">
              AI Features
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <div className="px-3 py-3 mx-3 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl border border-purple-100">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-4 h-4 text-purple-600" />
                  <span className="font-semibold text-purple-900 text-sm">AI Assistant</span>
                </div>
                <p className="text-xs text-purple-700">
                  Auto-generates titles, tags, and FWB messages
                </p>
              </div>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>

      <SidebarFooter className="border-t border-slate-200/60 p-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-r from-slate-100 to-slate-200 rounded-full flex items-center justify-center">
            <span className="text-slate-600 font-semibold text-sm">U</span>
          </div>
          {!isCollapsed && (
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-slate-900 text-sm truncate">User</p>
              <p className="text-xs text-slate-500 truncate">Cargo Operations</p>
            </div>
          )}
        </div>
      </SidebarFooter>
    </UISidebar>
  );
}
