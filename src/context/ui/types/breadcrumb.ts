// types/breadcrumb.ts
export interface BreadcrumbItem {
  label: string;
  href: string;
  isCurrent?: boolean;
}

export interface BreadcrumbContextType {
  items: BreadcrumbItem[];
  setBreadcrumb: (items: BreadcrumbItem[]) => void;
  addBreadcrumb: (item: BreadcrumbItem) => void;
  clearBreadcrumb: () => void;
}
