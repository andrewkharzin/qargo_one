'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import { deleteNote, getNotes, pinNote } from '@/actions/notes';
import { getNoteCategories } from '@/actions/notes/categories';
import NotesLayout from '@/components/layouts/NotesLayout';
import CategoryFilter from '@/components/notes/CategoryFilter';
import NoteCard from '@/components/notes/NoteCard';
import NoteDetails from '@/components/notes/NoteDetails';
import SearchBar from '@/components/notes/SearchBar';
import StatsOverview from '@/components/notes/StatsOverview';
import { Button } from '@/components/ui/button';
import { Breadcrumb } from '@/components/ui/reuse/Breadcrumb';
import { Category, Note } from '@/types/notes';
import { AnimatePresence, motion } from 'framer-motion';
import { Edit3, Plus, Notebook, Sparkles } from 'lucide-react';

export default function NotesPage() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const breadcrumbItems = [
        { label: 'Dashboard', href: '/dashboard' },
        { label: 'Notes', href: '/dashboard/notes', isCurrent: true }
    ];

    const [notes, setNotes] = useState<Note[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [filteredNotes, setFilteredNotes] = useState<Note[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [isLoading, setIsLoading] = useState(true);
    const [sortBy, setSortBy] = useState('updated');
    const [newNoteIds, setNewNoteIds] = useState<string[]>([]);
    const [selectedNote, setSelectedNote] = useState<Note | null>(null);
    const [isSheetOpen, setIsSheetOpen] = useState(false);

    useEffect(() => {
        const noteId = searchParams.get('id');
        if (noteId && notes.length > 0) {
            const note = notes.find((n) => n.id === noteId);
            if (note) {
                setSelectedNote(note);
                setIsSheetOpen(true);
            }
        }
    }, [searchParams, notes]);

    useEffect(() => {
        loadData();
    }, []);

    useEffect(() => {
        filterAndSortNotes();
    }, [notes, searchTerm, selectedCategory, sortBy]);

    const addNewNoteHighlight = (noteId: string) => {
        setNewNoteIds((prev) => [...prev, noteId]);
        setTimeout(() => {
            setNewNoteIds((prev) => prev.filter((id) => id !== noteId));
        }, 5000);
    };

    useEffect(() => {
        const newNoteId = searchParams.get('newNote');
        if (newNoteId) {
            addNewNoteHighlight(newNoteId);
            const newUrl = window.location.pathname;
            window.history.replaceState({}, '', newUrl);
        }
    }, [searchParams]);

    const loadData = async () => {
        setIsLoading(true);
        try {
            const [notesResponse, categoriesResponse] = await Promise.all([getNotes(), getNoteCategories()]);

            if (notesResponse.error) throw new Error(notesResponse.error);
            if (categoriesResponse.error) throw new Error(categoriesResponse.error);

            const processedNotes = (notesResponse.notes || []).map((note) => {
                const categoryName =
                    typeof note.category === 'object' && note.category !== null
                        ? (note.category as Category).name
                        : (note.category as string | undefined);

                return {
                    ...note,
                    category: categoryName,
                    color: note.color || 'slate'
                };
            });

            setNotes(processedNotes);
            setCategories(categoriesResponse.categories || []);
        } catch (error) {
            console.error('Error loading data:', error);
        }
        setIsLoading(false);
    };

    const filterAndSortNotes = () => {
        let filtered = [...notes];

        if (searchTerm) {
            filtered = filtered.filter(
                (note) =>
                    note.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    note.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    note.tags?.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
            );
        }

        if (selectedCategory !== 'all') {
            filtered = filtered.filter((note) => note.category === selectedCategory);
        }

        filtered.sort((a, b) => {
            if (a.is_pinned && !b.is_pinned) return -1;
            if (!a.is_pinned && b.is_pinned) return 1;

            switch (sortBy) {
                case 'created':
                    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
                case 'title':
                    return (a.title || '').localeCompare(b.title || '');
                case 'updated':
                default:
                    return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
            }
        });

        setFilteredNotes(filtered);
    };

    const handleCreateNote = async () => {
        router.push('/dashboard/notes/create');
    };

    const handlePinNote = async (noteId: string, isPinned: boolean) => {
        try {
            setNotes((prevNotes) =>
                prevNotes.map((note) => (note.id === noteId ? { ...note, is_pinned: isPinned } : note))
            );

            const { success, error } = await pinNote(noteId, isPinned);

            if (error) {
                setNotes((prevNotes) =>
                    prevNotes.map((note) => (note.id === noteId ? { ...note, is_pinned: !isPinned } : note))
                );
                throw new Error(error);
            }
        } catch (error) {
            console.error('Error pinning note:', error);
        }
    };

    const handleDeleteNote = async (noteId: string) => {
        if (window.confirm('Are you sure you want to delete this note?')) {
            try {
                const { success, error } = await deleteNote(noteId);
                if (error) throw new Error(error);
                setNotes((prevNotes) => prevNotes.filter((note) => note.id !== noteId));
            } catch (error) {
                console.error('Error deleting note:', error);
            }
        }
    };

    const handleCardClick = (note: Note) => {
        setSelectedNote(note);
        setIsSheetOpen(true);
        router.push(`/dashboard/notes?id=${note.id}`, { scroll: false });
    };

    const handleSheetOpenChange = (open: boolean) => {
        setIsSheetOpen(open);
        if (!open) {
            router.push('/dashboard/notes', { scroll: false });
        }
    };

    const handleEditNote = (note: Note) => {
        setIsSheetOpen(false);
        router.push(`/dashboard/notes/${note.id}/edit`);
    };

    return (
        <NotesLayout>
            <div className='min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-blue-900/20'>
                <div className='mx-auto max-w-7xl p-4 lg:p-8'>
                    {/* Premium Header */}
                    <div className='mb-8 flex flex-col items-start justify-between gap-4 lg:flex-row lg:items-center'>
                        <div className='relative'>
                            <div className='absolute -inset-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 blur-2xl'></div>
                            <h1 className='relative mb-3 flex items-center gap-3 text-3xl font-bold text-slate-800 dark:text-white lg:text-4xl'>
                                <div className='flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg'>
                                    <Notebook className='h-6 w-6 text-white' />
                                </div>
                                <span>Notes</span>
                                <Sparkles className='h-5 w-5 text-yellow-400' />
                            </h1>
                            <p className='relative text-slate-600 dark:text-slate-400'>
                                Capture your thoughts with AI-powered organization
                            </p>
                        </div>
                        <Button
                            onClick={handleCreateNote}
                            className='group relative overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg transition-all duration-300 hover:from-blue-700 hover:to-indigo-700 hover:shadow-xl'>
                            <div className='absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100'></div>
                            <Plus className='mr-2 h-4 w-4 transition-transform duration-200 group-hover:rotate-90' />
                            New Note
                        </Button>
                    </div>

                    <Breadcrumb items={breadcrumbItems} />

                    {/* Stats Overview */}
                    <div className='mt-6'>
                        <StatsOverview notes={notes} categories={categories} />
                    </div>

                    {/* Search and Filters */}
                    <div className='mb-8 mt-8 grid gap-4 lg:grid-cols-4'>
                        <div className='lg:col-span-2'>
                            <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
                        </div>
                        <div>
                            <CategoryFilter
                                categories={categories}
                                selectedCategory={selectedCategory}
                                onCategoryChange={setSelectedCategory}
                            />
                        </div>
                        <div>
                            <select
                                className='w-full rounded-xl border border-slate-200 bg-white/80 px-4 py-2.5 backdrop-blur-sm transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800/80 dark:text-white dark:placeholder-slate-400 dark:focus:ring-blue-400'
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}>
                                <option value='updated'>Recently Updated</option>
                                <option value='created'>Recently Created</option>
                                <option value='title'>Alphabetical</option>
                            </select>
                        </div>
                    </div>

                    {/* Notes Grid */}
                    <AnimatePresence mode='wait'>
                        {isLoading ? (
                            <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
                                {Array(8)
                                    .fill(0)
                                    .map((_, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            className='animate-pulse rounded-2xl bg-white/80 p-6 backdrop-blur-sm dark:bg-slate-800/80'
                                        >
                                            <div className='mb-4 h-6 rounded-lg bg-slate-200 dark:bg-slate-700'></div>
                                            <div className='mb-3 h-4 rounded bg-slate-200 dark:bg-slate-700'></div>
                                            <div className='h-4 w-3/4 rounded bg-slate-200 dark:bg-slate-700'></div>
                                        </motion.div>
                                    ))}
                            </div>
                        ) : filteredNotes.length === 0 ? (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                                className='py-20 text-center'
                            >
                                <div className='mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30'>
                                    <Edit3 className='h-12 w-12 text-blue-600 dark:text-blue-400' />
                                </div>
                                <h3 className='mb-3 text-xl font-semibold text-slate-900 dark:text-white'>
                                    No notes found
                                </h3>
                                <p className='mb-6 text-slate-600 dark:text-slate-400'>
                                    {searchTerm || selectedCategory !== 'all'
                                        ? 'Try adjusting your search or filters'
                                        : 'Start writing your first note with AI assistance'}
                                </p>
                                {!searchTerm && selectedCategory === 'all' && (
                                    <Button
                                        onClick={handleCreateNote}
                                        className='bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700'
                                    >
                                        <Plus className='mr-2 h-4 w-4' />
                                        Create Your First Note
                                    </Button>
                                )}
                            </motion.div>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5 }}
                                className='grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
                            >
                                {filteredNotes.map((note, index) => (
                                    <motion.div
                                        key={note.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.4, delay: index * 0.05 }}
                                    >
                                        <NoteCard
                                            note={{
                                                ...note,
                                                word_count: note.content.split(/\s+/).length
                                            }}
                                            onEdit={handleEditNote}
                                            onPin={handlePinNote}
                                            onDelete={handleDeleteNote}
                                            isNew={newNoteIds.includes(note.id)}
                                            isSelected={selectedNote?.id === note.id}
                                            onClick={() => handleCardClick(note)}
                                        />
                                    </motion.div>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Note Details Sheet */}
                    <NoteDetails
                        note={selectedNote}
                        open={isSheetOpen}
                        onOpenChange={handleSheetOpenChange}
                        onEdit={handleEditNote}
                        onPin={handlePinNote}
                        onDelete={handleDeleteNote}
                    />
                </div>
            </div>
        </NotesLayout>
    );
}
