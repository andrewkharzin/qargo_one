// components/layouts/Sidebar/NavigationItems.tsx
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
} from "lucide-react";
import { NavigationItem } from './types';

export const navigationItems: NavigationItem[] = [
  {
    title: "Enhanced Notes",
    url: "/dashboard/notes",
    icon: BookOpen,
    group: "Core Features",
    isParallel: true // Flag for parallel routes
  },
  {
    title: "Notes categories",
    url: "/dashboard/notes/categories",
    icon: BookOpen,
    group: "Core Features"
  },
  {
    title: "AI Generator",
    url: "/dashboard/ai-generator",
    icon: Sparkles,
    group: "Core Features"
  },
  {
    title: "Projects",
    url: "/dashboard/projects",
    icon: FolderOpen,
    group: "Core Features"
  },
  {
    title: "Web Research",
    url: "/dashboard/web-research",
    icon: Globe,
    group: "Core Features"
  },
  {
    title: "Bookmarks",
    url: "/dashboard/bookmarks",
    icon: Bookmark,
    group: "Core Features"
  },
  {
    title: "Team",
    url: "/dashboard/team",
    icon: Users,
    group: "Core Features"
  },
  {
    title: "API Documentation",
    url: "/dashboard/api-docs",
    icon: FileCode,
    group: "Resources"
  },
  {
    title: "Components",
    url: "/dashboard/components",
    icon: Package,
    group: "Resources"
  },
  {
    title: "Company",
    url: "/dashboard/company",
    icon: Building2,
    group: "Resources"
  },
];

export const managementItems: NavigationItem[] = [
  {
    title: "Agents",
    url: "/dashboard/agents",
    icon: UserCheck,
    group: "Management"
  },
  {
    title: "Travel",
    url: "/dashboard/travel",
    icon: Plane,
    group: "Management"
  },
];
