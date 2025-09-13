import React from 'react';
import NoteTypeEditor from '@/components/notes/editors/NoteTypeEditor';
import { Breadcrumb } from '@/components/ui/reuse/Breadcrumb';

interface PageProps {
  params: { id: string };
}

export default function Page({ params }: PageProps) {
  const breadcrumbItems = [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Note Types', href: '/dashboard/note-types' },
    { label: 'Edit', href: `/dashboard/note-types/${params.id}/editor`, isCurrent: true },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 p-6 space-y-6">
      <Breadcrumb items={breadcrumbItems} />
      <NoteTypeEditor params={params} />
    </div>
  );
}
