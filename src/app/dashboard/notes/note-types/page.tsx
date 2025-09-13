'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Breadcrumb } from '@/components/ui/reuse/Breadcrumb';
import { Plus } from 'lucide-react';
import { toast } from 'sonner';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';

import { getNoteTypes, createNoteType, deleteNoteType } from '@/actions/notes/noteTypes';
import { NoteTypeCard } from '@/components/notes/NoteTypeCard';

interface NoteType {
  id: string;
  name: string;
  description?: string;
  custom_fields?: any;
}

export default function NoteTypesPage() {
  const router = useRouter();

  const [noteTypes, setNoteTypes] = useState<NoteType[]>([]);
  const [filteredTypes, setFilteredTypes] = useState<NoteType[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newTypeName, setNewTypeName] = useState('');
  const [newTypeDescription, setNewTypeDescription] = useState('');

  const breadcrumbItems = [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Note Types', href: '/dashboard/note-types', isCurrent: true },
  ];

  const loadNoteTypes = async () => {
    setIsLoading(true);
    try {
      const types = await getNoteTypes();
      setNoteTypes(types || []);
      setFilteredTypes(types || []);
    } catch (err) {
      console.error(err);
      toast.error('Failed to load note types');
    }
    setIsLoading(false);
  };

  useEffect(() => {
    loadNoteTypes();
  }, []);

  // Filter
  useEffect(() => {
    if (!searchTerm) setFilteredTypes(noteTypes);
    else {
      setFilteredTypes(
        noteTypes.filter(
          t =>
            t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            t.description?.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
  }, [searchTerm, noteTypes]);

  const handleDelete = async (id: string) => {
    try {
      await deleteNoteType(id);
      setNoteTypes(prev => prev.filter(t => t.id !== id));
      toast.success('Note type deleted successfully!');
    } catch (err) {
      console.error(err);
      toast.error('Failed to delete note type.');
    }
  };

  // Create note type with optional redirect
  const handleCreate = async (redirectToEditor = false) => {
    if (!newTypeName) return toast.error('Name is required!');
    try {
      const created = await createNoteType({
        name: newTypeName,
        description: newTypeDescription,
      });
      setNoteTypes(prev => [created, ...prev]);
      setNewTypeName('');
      setNewTypeDescription('');
      setIsDialogOpen(false);
      toast.success('Note type created successfully!');

      // Redirect if requested
      if (redirectToEditor) {
        router.push(`/dashboard/notes/note-types/${created.id}/editor`);
      }
    } catch (err) {
      console.error(err);
      toast.error('Failed to create note type.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 p-6 space-y-6">
      {/* Header + Breadcrumb */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-700 dark:text-slate-100 flex items-center gap-2">
            <Plus className="h-6 w-6 text-blue-500" />
            Note Types
          </h1>
          <Breadcrumb items={breadcrumbItems} />
        </div>

        {/* Dialog Trigger */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white">
              + New Type
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Create New Note Type</DialogTitle>
            </DialogHeader>
            <div className="flex flex-col gap-4 mt-2">
              <Input
                placeholder="Name"
                value={newTypeName}
                onChange={(e) => setNewTypeName(e.target.value)}
              />
              <Input
                placeholder="Description (optional)"
                value={newTypeDescription}
                onChange={(e) => setNewTypeDescription(e.target.value)}
              />
            </div>
            <DialogFooter className="flex justify-end gap-2">
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              {/* Normal Create */}
              <Button variant="default" onClick={() => handleCreate(false)}>
                Create
              </Button>
              {/* Premium: Create & Continue Editing */}
              <Button variant="premium" onClick={() => handleCreate(true)}>
                Create & Continue Editing
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="rounded-xl bg-white dark:bg-slate-800 p-4 shadow">
          <h3 className="text-sm font-medium text-slate-500 dark:text-slate-300">Total Types</h3>
          <p className="mt-2 text-2xl font-bold text-slate-900 dark:text-slate-100">{noteTypes.length}</p>
        </div>
      </div>

      {/* Search */}
      <div className="mt-4">
        <Input
          placeholder="Search note types..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-1/2"
        />
      </div>

      {/* Types Grid */}
      <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {isLoading
          ? Array(6)
              .fill(0)
              .map((_, i) => (
                <div key={i} className="animate-pulse rounded-2xl bg-white/80 dark:bg-slate-800 p-6 h-40" />
              ))
          : filteredTypes.map((type) => (
              <NoteTypeCard key={type.id} type={type} onDelete={handleDelete} />
            ))}
      </div>
    </div>
  );
}
