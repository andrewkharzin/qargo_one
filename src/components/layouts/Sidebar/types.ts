import { LucideIcon } from 'lucide-react';

export interface NavigationItem {
  title: string;
  url: string;
  icon: LucideIcon;
  group?: string;
}

export interface SidebarProps {
  isCollapsed?: boolean;
  onToggle?: () => void;
}
