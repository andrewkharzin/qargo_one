// components/layouts/Sidebar/Sidebar.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import {
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuBadge,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
    Sidebar as UISidebar,
    useSidebar
} from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';

import { managementItems, navigationItems } from './NavigationItems';
import { NavigationItem, NavigationLink, NavigationMenu, isNavigationLink, isNavigationMenu } from './types';
import { ChevronDown, ChevronRight, Crown, PenTool, Sparkles, Zap } from 'lucide-react';



// components/layouts/Sidebar/Sidebar.tsx

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
                        'group mb-1 rounded-lg transition-all duration-300',
                        'hover:bg-blue-500/10 hover:text-blue-400',
                        active &&
                            'border-l-2 border-blue-400 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 text-blue-300',
                        'dark:hover:bg-blue-500/10 dark:hover:text-blue-300'
                    )}>
                    <Link href={item.url} className='flex items-center gap-3 px-4 py-3'>
                        <item.icon className='h-4 w-4 transition-transform duration-200 group-hover:scale-110' />
                        {state !== 'collapsed' && (
                            <div className='flex items-center gap-2'>
                                <span className='font-medium'>{item.title}</span>
                                {item.isParallel && (
                                    <span className='rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 px-2 py-0.5 text-xs text-white'>
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
        const isAnySubItemActive = menu.items.some((item) => isActive(item.url));
        const isExpandedByDefault = isAnySubItemActive;

        return (
            <Collapsible key={menu.title} defaultOpen={isExpandedByDefault} className='group/collapsible'>
                <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                        <SidebarMenuButton
                            isActive={isAnySubItemActive}
                            className={cn(
                                'group mb-2 rounded-lg transition-all duration-300',
                                'hover:bg-blue-500/10 hover:text-blue-400',
                                isAnySubItemActive &&
                                    'border-l-2 border-blue-400 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 text-blue-300',
                                'dark:hover:bg-blue-500/10 dark:hover:text-blue-300'
                            )}>
                            <menu.icon className='h-4 w-4 transition-transform duration-200 group-hover:scale-110' />
                            {state !== 'collapsed' && (
                                <div className='flex w-full items-center justify-between'>
                                    <span className='font-medium'>{menu.title}</span>
                                    <ChevronDown className='ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180' />
                                </div>
                            )}
                        </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                        <div className='mt-1 space-y-2'>
                            {menu.items.map((subItem) => (
                                <div
                                    key={subItem.title}
                                    className='group/subitem rounded-xl transition-all duration-300 hover:bg-gradient-to-r hover:from-blue-500/15 hover:to-purple-500/15 hover:shadow-lg'>
                                    <Link href={subItem.url} className='flex items-start gap-3 px-3 py-3'>
                                        <div className='relative'>
                                            <div className='absolute -inset-1 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 blur transition-opacity duration-300 group-hover/subitem:opacity-30'></div>
                                            <subItem.icon className='relative mt-0.5 h-4 w-4 flex-shrink-0 text-slate-400 transition-all duration-300 group-hover/subitem:text-white' />
                                        </div>
                                        {state !== 'collapsed' && (
                                            <div className='min-w-0 flex-1'>
                                                <div className='mb-1.5 flex items-center gap-2'>
                                                    <span className='text-sm font-semibold text-slate-200 transition-colors duration-300 group-hover/subitem:text-white'>
                                                        {subItem.title}
                                                    </span>
                                                    {subItem.badge && (
                                                        <span className='transform rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 px-2 py-1 text-xs font-medium text-white shadow-lg transition-transform duration-300 group-hover/subitem:scale-105'>
                                                            {subItem.badge}
                                                        </span>
                                                    )}
                                                </div>
                                                {subItem.description && (
                                                    <div className='mt-2'>
                                                        <p className='text-xs leading-relaxed text-slate-400 transition-colors duration-300 group-hover/subitem:text-slate-300'>
                                                            {subItem.description}
                                                        </p>
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </CollapsibleContent>
                </SidebarMenuItem>
            </Collapsible>
        );
    };

    const renderNavigationGroup = (items: NavigationItem[], groupName: string) => {
        const groupItems = items.filter((item) => item.group === groupName);

        if (groupItems.length === 0) return null;

        return (
            <SidebarGroup key={groupName}>
                <SidebarGroupLabel className='px-3 py-3 text-xs font-semibold tracking-wider text-slate-400/70 uppercase'>
                    {groupName}
                </SidebarGroupLabel>
                <SidebarGroupContent>
                    <SidebarMenu>{groupItems.map(renderNavigationItem)}</SidebarMenu>
                </SidebarGroupContent>
            </SidebarGroup>
        );
    };

    // Group items by their group
    const allItems = [...navigationItems, ...managementItems];
    const groups = Array.from(new Set(allItems.map((item) => item.group)));

    return (
        <UISidebar
            collapsible='icon'
            className='bg-gradient-to-b from-slate-900 to-slate-800 shadow-2xl backdrop-blur-xl'>
            <SidebarHeader className='border-b border-slate-700/50 p-6'>
                <div className='flex items-center gap-3'>
                    <div className='flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-600 shadow-lg'>
                        <PenTool className='h-5 w-5 text-white' />
                    </div>
                    {state !== 'collapsed' && (
                        <div>
                            <h2 className='text-lg font-bold text-white'>Ultimate Notes</h2>
                            <p className='text-xs font-medium text-slate-400'>Social AI Writing</p>
                        </div>
                    )}
                </div>
            </SidebarHeader>

            <SidebarContent className=''>
                {groups.map((groupName) => renderNavigationGroup(allItems, groupName))}

                {/* Premium AI Features Section */}
                {state !== 'collapsed' && (
                    <SidebarGroup key='ai-features'>
                        <SidebarGroupLabel className='px-3 py-3 text-xs font-semibold tracking-wider text-slate-400/70 uppercase'>
                            AI Features
                        </SidebarGroupLabel>
                        <SidebarGroupContent>
                            <div className='mx-3 rounded-xl border border-purple-500/20 bg-gradient-to-r from-purple-900/30 to-blue-900/30 px-4 py-4'>
                                <div className='mb-2 flex items-center gap-2'>
                                    <div className='rounded-full bg-gradient-to-r from-purple-500 to-fuchsia-500 p-1'>
                                        <Sparkles className='h-3 w-3 text-white' />
                                    </div>
                                    <span className='text-sm font-semibold text-purple-300'>AI Assistant</span>
                                    <Crown className='ml-auto h-3 w-3 text-yellow-400' />
                                </div>
                                <p className='mb-3 text-xs leading-relaxed text-slate-400'>
                                    Auto-generates titles, tags, and FWB messages
                                </p>
                                <div className='flex items-center gap-2 text-xs text-blue-400'>
                                    <Zap className='h-3 w-3' />
                                    <span>Premium Feature</span>
                                </div>
                            </div>
                        </SidebarGroupContent>
                    </SidebarGroup>
                )}
            </SidebarContent>

            <SidebarFooter className='border-t border-slate-700/50 p-4'>
                <div className='flex items-center gap-3'>
                    <div className='flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-slate-700 to-slate-600 shadow-inner'>
                        <span className='text-sm font-semibold text-slate-300'>U</span>
                    </div>
                    {state !== 'collapsed' && (
                        <div className='min-w-0 flex-1'>
                            <p className='truncate text-sm font-semibold text-white'>User</p>
                            <p className='truncate text-xs text-slate-400'>Cargo Operations</p>
                        </div>
                    )}
                </div>
            </SidebarFooter>
        </UISidebar>
    );
}
