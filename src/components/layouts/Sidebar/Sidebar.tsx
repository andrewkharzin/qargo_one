// components/layouts/Sidebar/Sidebar.tsx
'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { PenTool, Sparkles, ChevronDown, ChevronRight } from 'lucide-react';
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
  useSidebar,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  SidebarMenuBadge,
} from "@/components/ui/sidebar";
import {
  NavigationItem,
  NavigationLink,
  NavigationMenu,
  isNavigationMenu,
  isNavigationLink
} from './types';
import { navigationItems, managementItems } from './NavigationItems';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { cn } from '@/lib/utils';

export default function Sidebar() {
  const pathname = usePathname();
  const { state } = useSidebar();

  const isActive = (url: string): boolean => {
    if (url === pathname) return true;
    if (pathname.startsWith(url + '/')) return true;
    return false;
  };

  const renderNavigationItem = (item: NavigationItem) => {
    if (isNavigationLink(item)) {
      return renderLinkItem(item);
    }
    if (isNavigationMenu(item)) {
      return renderMenu(item);
    }
    return null;
  };

  const renderLinkItem = (item: NavigationLink) => {
    const active = isActive(item.url);

    return (
      <SidebarMenuItem key={item.title}>
        <SidebarMenuButton
          asChild
          isActive={active}
          className={cn(
            "hover:bg-blue-50/80 hover:text-blue-700 transition-all duration-300 rounded-lg mb-1 group",
            active && 'bg-blue-50/80 text-blue-700 shadow-sm'
          )}
        >
          <Link href={item.url} className="flex items-center gap-3 px-4 py-3">
            <item.icon className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
            {state !== 'collapsed' && (
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
  };

  const renderMenu = (menu: NavigationMenu) => {
    const isAnySubItemActive = menu.items.some(item => isActive(item.url));
    const isExpandedByDefault = isAnySubItemActive;

    return (
      <Collapsible key={menu.title} defaultOpen={isExpandedByDefault} className="group/collapsible">
        <SidebarMenuItem>
          <CollapsibleTrigger asChild>
            <SidebarMenuButton
              isActive={isAnySubItemActive}
              className={cn(
                "hover:bg-blue-50/80 hover:text-blue-700 transition-all duration-300 rounded-lg mb-2 group",
                isAnySubItemActive && 'bg-blue-50/80 text-blue-700 shadow-sm'
              )}
            >
              <menu.icon className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
              {state !== 'collapsed' && (
                <div className="flex items-center justify-between w-full">
                  <span className="font-medium">{menu.title}</span>
                  <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                </div>
              )}
            </SidebarMenuButton>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <SidebarMenuSub className="mt-1">
              {menu.items.map((subItem) => (
                <SidebarMenuSubItem key={subItem.title} className="mb-1 last:mb-0">
                  <SidebarMenuSubButton
                    asChild
                    isActive={isActive(subItem.url)}
                    className="group/subitem transition-all duration-200 hover:bg-slate-50 rounded-lg"
                  >
                    <Link href={subItem.url} className="flex items-start gap-3 px-4 py-3">
                      <subItem.icon className="w-4 h-4 text-slate-400 group-hover/subitem:text-slate-700 mt-0.5 flex-shrink-0" />
                      {state !== 'collapsed' && (
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium text-sm text-slate-800 group-hover/subitem:text-slate-900">
                              {subItem.title}
                            </span>
                            {subItem.badge && (
                              <SidebarMenuBadge className="text-xs px-1.5 py-0.5">
                                {subItem.badge}
                              </SidebarMenuBadge>
                            )}
                          </div>
                          {subItem.description && (
                            <p className="text-xs text-slate-500 line-clamp-2 group-hover/subitem:text-slate-600 leading-relaxed">
                              {subItem.description}
                            </p>
                          )}
                        </div>
                      )}
                    </Link>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
              ))}
            </SidebarMenuSub>
          </CollapsibleContent>
        </SidebarMenuItem>
      </Collapsible>
    );
  };

  const renderNavigationGroup = (items: NavigationItem[], groupName: string) => {
    const groupItems = items.filter(item => item.group === groupName);

    if (groupItems.length === 0) return null;

    return (
      <SidebarGroup key={groupName}>
        <SidebarGroupLabel className="text-xs font-semibold text-slate-500 uppercase tracking-wider px-3 py-3">
          {groupName}
        </SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            {groupItems.map(renderNavigationItem)}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    );
  };

  // Group items by their group
  const allItems = [...navigationItems, ...managementItems];
  const groups = Array.from(new Set(allItems.map(item => item.group)));

  return (
    <UISidebar
      collapsible="icon"
      className="border-r border-slate-200/60 bg-white/80 backdrop-blur-xl"
    >
      <SidebarHeader className="border-b border-slate-200/60 p-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 via-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
            <PenTool className="w-5 h-5 text-white" />
          </div>
          {state !== 'collapsed' && (
            <div>
              <h2 className="font-bold text-lg text-slate-900">Ultimate Notes</h2>
              <p className="text-xs text-slate-500 font-medium">Social AI Writing</p>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent className="p-3">
        {groups.map(groupName => renderNavigationGroup(allItems, groupName))}

        {/* AI Features Section */}
        {state !== 'collapsed' && (
          <SidebarGroup key="ai-features">
            <SidebarGroupLabel className="text-xs font-semibold text-slate-500 uppercase tracking-wider px-3 py-3">
              AI Features
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <div className="px-4 py-4 mx-3 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl border border-purple-100">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-4 h-4 text-purple-600" />
                  <span className="font-semibold text-purple-900 text-sm">AI Assistant</span>
                </div>
                <p className="text-xs text-purple-700 leading-relaxed">
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
          {state !== 'collapsed' && (
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
