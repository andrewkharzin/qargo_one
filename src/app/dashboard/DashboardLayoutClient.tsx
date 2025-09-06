'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  PenTool,
  Sparkles,
  FolderOpen,
  BookOpen,
  Globe,
  Bookmark,
  Users,
  FileCode,
  Package,
  Building2,
  UserCheck,
  Plane,
  LucideIcon
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

interface NavigationItem {
  title: string;
  url: string;
  icon: LucideIcon;
}

interface DashboardLayoutClientProps {
  children: React.ReactNode;
}

const navigationItems: NavigationItem[] = [
  {
    title: "Enhanced Notes",
    url: "/dashboard/notes",
    icon: BookOpen,
  },
  {
    title: "Notes categories",
    url: "/dashboard/notes/categories",
    icon: BookOpen,
  },
  {
    title: "My Qbook",
    url: "/dashboard/my-qbook",
    icon: Package,
  },
  {
    title: "Booking Manager",
    url: "/dashboard/booking-manager",
    icon: Building2,
  },
  {
    title: "Public Wall",
    url: "/dashboard/public-wall",
    icon: Globe,
  },
  {
    title: "Bookmarks",
    url: "/dashboard/bookmarks",
    icon: Bookmark,
  },
  {
    title: "Following",
    url: "/dashboard/following",
    icon: Users,
  },
  {
    title: "Categories",
    url: "/dashboard/categories",
    icon: FolderOpen,
  }
];

const managementItems: NavigationItem[] = [
  {
    title: "Agents",
    url: "/dashboard/agents",
    icon: UserCheck,
  },
  {
    title: "Participants",
    url: "/dashboard/participants",
    icon: Users,
  },
  {
    title: "Airlines",
    url: "/dashboard/airlines",
    icon: Plane,
  }
];

export default function DashboardLayoutClient({ children }: DashboardLayoutClientProps) {
  const pathname = usePathname();

  return (
    <SidebarProvider>
      <style>
        {`
          :root {
            --background: #fafafa;
            --foreground: #111827;
            --primary: #3b82f6;
            --primary-foreground: #ffffff;
            --secondary: #f1f5f9;
            --secondary-foreground: #475569;
            --accent: #8b5cf6;
            --muted: #f9fafb;
            --border: #e2e8f0;
            --card: #ffffff;
            --card-foreground: #374151;
          }
        `}
      </style>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20">
        <Sidebar className="border-r border-slate-200/60 bg-white/80 backdrop-blur-xl">
          <SidebarHeader className="border-b border-slate-200/60 p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 via-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                <PenTool className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="font-bold text-lg text-slate-900">Ultimate Notes</h2>
                <p className="text-xs text-slate-500 font-medium">Social AI Writing</p>
              </div>
            </div>
          </SidebarHeader>

          <SidebarContent className="p-3">
            <SidebarGroup>
              <SidebarGroupLabel className="text-xs font-semibold text-slate-500 uppercase tracking-wider px-3 py-3">
                Core Features
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {navigationItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        asChild
                        className={`hover:bg-blue-50/80 hover:text-blue-700 transition-all duration-300 rounded-xl mb-1 group ${
                          pathname === item.url ? 'bg-blue-50/80 text-blue-700 shadow-sm' : ''
                        }`}
                      >
                        <Link href={item.url} className="flex items-center gap-3 px-4 py-3">
                          <item.icon className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
                          <span className="font-medium">{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <SidebarGroup>
              <SidebarGroupLabel className="text-xs font-semibold text-slate-500 uppercase tracking-wider px-3 py-3">
                Management
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {managementItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        asChild
                        className={`hover:bg-green-50/80 hover:text-green-700 transition-all duration-300 rounded-xl mb-1 group ${
                          pathname === item.url ? 'bg-green-50/80 text-green-700 shadow-sm' : ''
                        }`}
                      >
                        <Link href={item.url} className="flex items-center gap-3 px-4 py-3">
                          <item.icon className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
                          <span className="font-medium">{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <SidebarGroup>
              <SidebarGroupLabel className="text-xs font-semibold text-slate-500 uppercase tracking-wider px-3 py-3">
                Developer
              </SidebarGroupLabel>
              <SidebarGroupContent>
                 <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton
                        asChild
                        className={`hover:bg-blue-50/80 hover:text-blue-700 transition-all duration-300 rounded-xl mb-1 group ${
                          pathname === "/dashboard/integration-guide" ? 'bg-blue-50/80 text-blue-700 shadow-sm' : ''
                        }`}
                      >
                        <Link href="/dashboard/integration-guide" className="flex items-center gap-3 px-4 py-3">
                          <FileCode className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
                          <span className="font-medium">Integration Guide</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

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
          </SidebarContent>

          <SidebarFooter className="border-t border-slate-200/60 p-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-r from-slate-100 to-slate-200 rounded-full flex items-center justify-center">
                <span className="text-slate-600 font-semibold text-sm">U</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-slate-900 text-sm truncate">User</p>
                <p className="text-xs text-slate-500 truncate">Cargo Operations</p>
              </div>
            </div>
          </SidebarFooter>
        </Sidebar>

        <main className="flex-1 flex flex-col">
          <header className="bg-white/70 backdrop-blur-xl border-b border-slate-200/60 px-6 py-4 lg:hidden">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="hover:bg-slate-100 p-2 rounded-xl transition-colors duration-200" />
              <h1 className="text-xl font-bold text-slate-900">Ultimate Notes</h1>
            </div>
          </header>

          <div className="flex-1 overflow-auto">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
