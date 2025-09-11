// components/layouts/Sidebar/types.ts
export interface NavigationItem {
  title: string;
  url: string;
  icon: React.ComponentType<any>;
  group: string;
  isParallel?: boolean; // Flag for parallel routes
  isModal?: boolean; // Optional flag for modal routes
}

export interface NavigationGroup {
  title: string;
  items: NavigationItem[];
}

export interface SidebarProps {
  isCollapsed?: boolean;
  onToggle?: () => void;
}
