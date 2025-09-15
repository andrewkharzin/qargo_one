// components/layouts/Sidebar/NavigationItems.tsx
import {
  BookOpen,
  Sparkles,
  FolderOpen,
  Globe,
  Bookmark,
  Users,
  FileCode,
  Package,
  Building2,
  UserCheck,
  Plane,
  List,
  Grid,
  Tag,
  Calendar,
  BookmarkCheck,
  LayoutTemplate
} from "lucide-react";
import { NavigationItem, NavigationLink, NavigationMenu } from './types';

export const navigationItems: NavigationItem[] = [
  {
    type: 'menu',
    title: "Notes",
    icon: BookOpen,
    group: "Core Features",
    isParallel: true,
    items: [
      {
        title: "All Notes",
        url: "/dashboard/notes",
        icon: Grid,
        description: "View all your notes",
        badge: "12"
      },
      {
        title: "Categories",
        url: "/dashboard/notes/categories",
        icon: Tag,
        description: "Organize by categories"
      },
       {
        title: "Bookmarks",
        url: "/dashboard/notes/bookmarks",
        icon: BookmarkCheck,
        description: "Bookmarked notes"
      },
      {
        title: "Note types",
        url: "/dashboard/notes/note-types",
        icon: LayoutTemplate,
        description: "Grid view of note types",
        badge: "new"
      }
    ]
  },
//   {
//     type: 'link',
//     title: "AI Generator",
//     url: "/dashboard/ai-generator",
//     icon: Sparkles,
//     group: "Core Features"
//   },
//   {
//     type: 'link',
//     title: "Projects",
//     url: "/dashboard/projects",
//     icon: FolderOpen,
//     group: "Core Features"
//   },
//   {
//     type: 'menu',
//     title: "Content",
//     icon: Bookmark,
//     group: "Core Features",
//     items: [
//       {
//         title: "Web Research",
//         url: "/dashboard/web-research",
//         icon: Globe,
//         description: "Research and save content"
//       },
//       {
//         title: "Bookmarks",
//         url: "/dashboard/bookmarks",
//         icon: Bookmark,
//         description: "Saved bookmarks",
//         badge: "8"
//       }
//     ]
//   },
  {
    type: 'link',
    title: "Team",
    url: "/dashboard/team",
    icon: Users,
    group: "Core Features"
  },
  {
    type: 'link',
    title: "API Documentation",
    url: "/dashboard/api-docs",
    icon: FileCode,
    group: "Resources"
  },
  {
    type: 'link',
    title: "Components",
    url: "/dashboard/components",
    icon: Package,
    group: "Resources"
  },
  {
    type: 'link',
    title: "Company",
    url: "/dashboard/company",
    icon: Building2,
    group: "Resources"
  },
];

export const managementItems: NavigationItem[] = [
  {
    type: 'link',
    title: "Agents",
    url: "/dashboard/agents",
    icon: UserCheck,
    group: "Management"
  },
  {
    type: 'menu',
    title: "Operations",
    icon: Calendar,
    group: "Management",
    items: [
      {
        title: "Travel",
        url: "/dashboard/travel",
        icon: Plane,
        description: "Travel management"
      },
      {
        title: "Calendar",
        url: "/dashboard/calendar",
        icon: Calendar,
        description: "Schedule management"
      }
    ]
  },
];
