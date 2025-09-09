'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

// Add this import
import { useSearchParams } from 'next/navigation';

// Your other imports...
import { deleteNote, getNotes, pinNote } from '@/actions/notes';
import { getNoteCategories } from '@/actions/notes/categories';
import CategoryFilter from '@/components/notes/CategoryFilter';
import NoteCard from '@/components/notes/NoteCard';
import SearchBar from '@/components/notes/SearchBar';
import StatsOverview from '@/components/notes/StatsOverview';
import { Button } from '@/components/ui/button';
import { Category, Note } from '@/types/notes';

import { AnimatePresence, motion } from 'framer-motion';
import { Edit3, Plus } from 'lucide-react';

export default function NotesPage() {
    const router = useRouter();
    // Add this line to get search params
    const searchParams = useSearchParams();

    const [notes, setNotes] = useState<Note[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [filteredNotes, setFilteredNotes] = useState<Note[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [isLoading, setIsLoading] = useState(true);
    const [sortBy, setSortBy] = useState('updated');

    // Add this state to track new note IDs
    const [newNoteIds, setNewNoteIds] = useState<string[]>([]);

    useEffect(() => {
        loadData();
    }, []);

    useEffect(() => {
        filterAndSortNotes();
    }, [notes, searchTerm, selectedCategory, sortBy]);

    // Function to add a note to the "new" list
    const addNewNoteHighlight = (noteId: string) => {
        setNewNoteIds(prev => [...prev, noteId]);

        // Remove the highlight after 5 seconds
        setTimeout(() => {
            setNewNoteIds(prev => prev.filter(id => id !== noteId));
        }, 5000);
    };

    // Check if we're coming from a create operation
    useEffect(() => {
        // Check URL parameters for newly created note
        const newNoteId = searchParams.get('newNote');

        if (newNoteId) {
            addNewNoteHighlight(newNoteId);

            // Clean up the URL
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

            const processedNotes = (notesResponse.notes || []).map((note) => ({
                ...note,
                category: typeof note.category === 'object' ? note.category.name : note.category,
                color: note.color || 'slate'
            }));

            setNotes(processedNotes);
            setCategories(categoriesResponse.categories || []);
        } catch (error) {
            console.error('Error loading data:', error);
        }
        setIsLoading(false);
    };

    const filterAndSortNotes = () => {
        let filtered = [...notes];

        // Filter by search term
        if (searchTerm) {
            filtered = filtered.filter(
                (note) =>
                    note.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    note.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    note.tags?.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
            );
        }

        // Filter by category
        if (selectedCategory !== 'all') {
            filtered = filtered.filter((note) => note.category === selectedCategory);
        }

        // Sort notes
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

    // In your note creation function - update this function
    const handleCreateNote = async () => {
        // Navigate to create page
        router.push('/dashboard/notes/create');
    };

    // If you have a separate note creation page, you'll need to update that too
    // Here's what the create function should look like on your note creation page:
    /*
    const handleCreateNoteSubmit = async (noteData) => {
        try {
            const { success, error, note } = await createNote(noteData);

            if (error) throw new Error(error);

            // Redirect to notes list with the new note ID as a parameter
            router.push(`/dashboard/notes?newNote=${note.id}`);
        } catch (error) {
            console.error('Error creating note:', error);
        }
    };
    */

    const handleEditNote = (note: Note) => {
        router.push(`/dashboard/notes/${note.id}/edit`);
    };

    const handlePinNote = async (noteId: string, isPinned: boolean) => {
        try {
            const { success, error } = await pinNote(noteId, !isPinned);
            if (error) throw new Error(error);
            loadData();
        } catch (error) {
            console.error('Error pinning note:', error);
        }
    };

    const handleDeleteNote = async (noteId: string) => {
        if (window.confirm('Are you sure you want to delete this note?')) {
            try {
                const { success, error } = await deleteNote(noteId);
                if (error) throw new Error(error);
                loadData();
            } catch (error) {
                console.error('Error deleting note:', error);
            }
        }
    };

    return (
        <div className='min-h-screen bg-slate-50'>
            <div className='mx-auto max-w-7xl p-4 lg:p-8'>
                {/* Header */}
                <div className='mb-8 flex flex-col items-start justify-between gap-4 lg:flex-row lg:items-center'>
                    <div>
                        <h1 className='mb-2 text-3xl font-bold text-slate-900 lg:text-4xl'>Your Notes</h1>
                        <p className='text-slate-600'>Capture your thoughts with AI-powered organization</p>
                    </div>
                    <Button
                        onClick={handleCreateNote}
                        className='group bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg transition-all duration-300 hover:from-blue-700 hover:to-indigo-700 hover:shadow-xl'>
                        <Plus className='mr-2 h-4 w-4 transition-transform duration-200 group-hover:rotate-90' />
                        New Note
                    </Button>
                </div>

                {/* Stats Overview */}
                <StatsOverview notes={notes} categories={categories} />

                {/* Search and Filters */}
                <div className='mb-8 grid gap-4 lg:grid-cols-4'>
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
                            className='w-full rounded-xl border border-slate-200 bg-white/80 px-4 py-2 backdrop-blur-sm transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none'
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
                        <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
                            {Array(6)
                                .fill(0)
                                .map((_, i) => (
                                    <div key={i} className='animate-pulse rounded-2xl bg-white/80 p-6'>
                                        <div className='mb-3 h-4 rounded bg-slate-200'></div>
                                        <div className='mb-2 h-3 rounded bg-slate-200'></div>
                                        <div className='h-3 w-3/4 rounded bg-slate-200'></div>
                                    </div>
                                ))}
                        </div>
                    ) : filteredNotes.length === 0 ? (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className='py-16 text-center'>
                            <div className='mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-blue-100 to-indigo-100'>
                                <Edit3 className='h-12 w-12 text-blue-600' />
                            </div>
                            <h3 className='mb-2 text-xl font-semibold text-slate-900'>No notes found</h3>
                            <p className='mb-6 text-slate-600'>
                                {searchTerm || selectedCategory !== 'all'
                                    ? 'Try adjusting your search or filters'
                                    : 'Start writing your first note with AI assistance'}
                            </p>
                            {!searchTerm && selectedCategory === 'all' && (
                                <Button
                                    onClick={handleCreateNote}
                                    className='bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700'>
                                    <Plus className='mr-2 h-4 w-4' />
                                    Create Your First Note
                                </Button>
                            )}
                        </motion.div>
                    ) : (
                        <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
                            {filteredNotes.map((note) => (
                                <NoteCard
                                    key={note.id}
                                    note={{
                                        ...note,
                                        word_count: note.content.split(/\s+/).length
                                    }}
                                    onEdit={handleEditNote}
                                    onPin={handlePinNote}
                                    onDelete={handleDeleteNote}
                                    isNew={newNoteIds.includes(note.id)} // Pass the isNew prop
                                />
                            ))}
                        </div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
