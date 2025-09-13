// components/layouts/Sidebar/types.ts
import { LucideIcon } from "lucide-react";

export interface BaseNavigationItem {
  title: string;
  icon: LucideIcon;
  group: string;
  isParallel?: boolean;
}

export interface NavigationLink extends BaseNavigationItem {
  type: 'link';
  url: string;
}

export interface NavigationMenu extends BaseNavigationItem {
  type: 'menu';
  items: NavigationSubItem[];
}

export interface NavigationSubItem {
  title: string;
  url: string;
  icon: LucideIcon;
  description?: string;
  badge?: string | number;
}

export type NavigationItem = NavigationLink | NavigationMenu;

// Type guards
export const isNavigationMenu = (item: NavigationItem): item is NavigationMenu => {
  return item.type === 'menu';
};

export const isNavigationLink = (item: NavigationItem): item is NavigationLink => {
  return item.type === 'link';
};
