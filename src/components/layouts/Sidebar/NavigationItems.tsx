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
    group: "Core Features"
  },
  {
    title: "Notes categories",
    url: "/dashboard/notes/categories",
    icon: BookOpen,
    group: "Core Features"
  },
  // ... остальные элементы
];

export const managementItems: NavigationItem[] = [
  {
    title: "Agents",
    url: "/dashboard/agents",
    icon: UserCheck,
    group: "Management"
  },
  // ... остальные элементы
];
