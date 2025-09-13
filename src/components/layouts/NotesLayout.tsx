// components/layouts/NotesLayout.tsx
'use client';

import { BreadcrumbProvider } from '@/context/ui/BreadcrumbContext';
import { BreadcrumbItem } from '@/context/ui/types/breadcrumb';

interface NotesLayoutProps {
  children: React.ReactNode;
}

const notesBreadcrumbs: BreadcrumbItem[] = [
  { label: 'Dashboard', href: '/dashboard' },
  { label: 'Notes', href: '/dashboard/notes', isCurrent: true }
];

export default function NotesLayout({ children }: NotesLayoutProps) {
  return (
    <BreadcrumbProvider items={notesBreadcrumbs}>
      {children}
    </BreadcrumbProvider>
  );
}
