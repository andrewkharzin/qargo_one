import React from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
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

interface DashboardLayoutProps {
  children: React.ReactNode;
  currentPageName?: string;
}

const navigationItems: NavigationItem[] = [
  {
    title: "Enhanced Notes",
    url: createPageUrl("EnhancedNotes"),
    icon: BookOpen,
  },
  {
    title: "My Qbook",
    url: createPageUrl("MyQbook"),
    icon: Package,
  },
  // ... остальные элементы
];

// ... остальной код без изменений

export default function DashboardLayout({ children, currentPageName }: DashboardLayoutProps) {
  const location = useLocation();

  return (
    <SidebarProvider>
      {/* ... остальной JSX без изменений */}
    </SidebarProvider>
  );
}
