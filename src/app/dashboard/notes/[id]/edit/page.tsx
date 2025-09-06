'use client';

import { useEffect, useState } from 'react';

import { useParams, useRouter } from 'next/navigation';

import { getNoteById } from '@/actions/notes';
import { getNoteCategories } from '@/actions/notes/categories';
import NoteEditor from '@/components/notes/NoteEditor';
import { Button } from '@/components/ui/button';
// Import your types and server actions
import { Category, Note } from '@/types/notes';

import { ArrowLeft } from 'lucide-react';

export default function EditNotePage() {
    const router = useRouter();
    const params = useParams();
    const noteId = params.id as string;

    const [note, setNote] = useState<Note | null>(null);
    const [categories, setCategories] = useState<Category[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                setError(null);

                // Fetch note data using server action
                const noteResponse = await getNoteById(noteId);

                if (noteResponse.note) {
                    const category = noteResponse.note.category;

                    const transformedNote: Note = {
                        id: noteResponse.note.id,
                        title: noteResponse.note.title || undefined,
                        content: noteResponse.note.content,
                        is_pinned: noteResponse.note.is_pinned,
                        created_at: noteResponse.note.created_at,
                        updated_at: noteResponse.note.updated_at,
                        category_id: noteResponse.note.category_id || undefined,

                        // Safe access to category properties
                        category: typeof category === 'object' ? category?.name || undefined : category || undefined,

                        color: typeof category === 'object' ? category?.color || undefined : undefined,

                        tags: noteResponse.note.tags || [],
                        is_public: noteResponse.note.is_public || undefined,
                        type: noteResponse.note.type || undefined,
                        priority: noteResponse.note.priority || undefined,
                        urgency: noteResponse.note.urgency || undefined,
                        is_archived: noteResponse.note.is_archived || undefined,
                        word_count: noteResponse.note.content.split(/\s+/).length
                    };

                    setNote(transformedNote);
                }

                // Fetch categories using server action
                const categoriesResponse = await getNoteCategories();
                if (categoriesResponse.categories) {
                    setCategories(categoriesResponse.categories);
                } else if (categoriesResponse.error) {
                    console.error('Error fetching categories:', categoriesResponse.error);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                setError(error instanceof Error ? error.message : 'Failed to load data');
            } finally {
                setIsLoading(false);
            }
        };

        if (noteId) {
            fetchData();
        }
    }, [noteId]);

    const handleSave = async (noteData: {
        title: string;
        content: string;
        category: string;
        tags?: string[];
        is_public?: boolean;
        type?: string;
        priority?: number;
        urgency?: number;
    }) => {
        setIsSaving(true);

        try {
            // Use your server action for updating notes
            const response = await fetch(`/api/notes/${noteId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title: noteData.title,
                    content: noteData.content,
                    category_id: noteData.category,
                    tags: noteData.tags,
                    is_public: noteData.is_public,
                    type: noteData.type,
                    priority: noteData.priority,
                    urgency: noteData.urgency
                })
            });

            if (response.ok) {
                router.push('/dashboard/notes');
                router.refresh();
            } else {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to update note');
            }
        } catch (error) {
            console.error('Error updating note:', error);
            alert('Failed to update note. Please try again.');
        } finally {
            setIsSaving(false);
        }
    };

    const handleCancel = () => {
        router.push('/dashboard/notes');
    };

    if (isLoading) {
        return (
            <div className='flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20'>
                <div className='text-center'>
                    <div className='mx-auto h-12 w-12 animate-spin rounded-full border-b-2 border-blue-600'></div>
                    <p className='mt-4 text-slate-600'>Loading note...</p>
                </div>
            </div>
        );
    }

    if (error || !note) {
        return (
            <div className='min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20'>
                <div className='mx-auto max-w-4xl p-4 lg:p-8'>
                    <div className='mb-6 flex items-center gap-4'>
                        <Button variant='outline' size='icon' onClick={handleCancel} className='hover:bg-slate-100'>
                            <ArrowLeft className='h-4 w-4' />
                        </Button>
                        <h1 className='text-2xl font-bold text-slate-900'>Error</h1>
                    </div>
                    <div className='py-12 text-center'>
                        <p className='text-gray-500'>{error || "The note you're trying to edit doesn't exist."}</p>
                        <Button onClick={handleCancel} className='mt-4'>
                            Return to Notes
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className='min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20'>
            <div className='mx-auto max-w-4xl p-4 lg:p-8'>
                <div className='mb-6 flex items-center gap-4'>
                    <Button variant='outline' size='icon' onClick={handleCancel} className='hover:bg-slate-100'>
                        <ArrowLeft className='h-4 w-4' />
                    </Button>
                    <h1 className='text-2xl font-bold text-slate-900'>Edit Note</h1>
                </div>

                <NoteEditor
                    note={note}
                    categories={categories}
                    onSave={handleSave}
                    onCancel={handleCancel}
                    isSaving={isSaving}
                />
            </div>
        </div>
    );
}
