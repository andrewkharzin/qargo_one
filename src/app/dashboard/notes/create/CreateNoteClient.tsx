'use client';

import { useState } from 'react';

import { useRouter } from 'next/navigation';

import { createNote } from '@/actions/notes';
import NoteEditor from '@/components/notes/NoteEditor';
import { Button } from '@/components/ui/button';
import { Category } from '@/types/notes';

import { ArrowLeft } from 'lucide-react';

import ErrorBoundary from '@/components/ErrorBoundary';

interface CreateNoteClientProps {
    categories: Category[];
}

export default function CreateNoteClient({ categories }: CreateNoteClientProps) {
    const router = useRouter();
    const [isSaving, setIsSaving] = useState(false);
    const [debugInfo, setDebugInfo] = useState<string[]>([]); // Add debug state

    const addDebug = (message: string) => {
        console.log(message);
        setDebugInfo((prev) => [...prev, `${new Date().toISOString()}: ${message}`]);
    };

   // In CreateNoteClient.tsx - Update the handleSave function
    const handleSave = async (noteData: { title: string; content: string; category: string; color: string; }) => {
    alert('Save function called! Check console.');
    console.log('🔄 Save function called with:', noteData);
    addDebug('🔄 Starting save with data: ' + JSON.stringify(noteData));
    setIsSaving(true);

    try {
        addDebug('📤 Calling createNote server action...');
        const result = await createNote({
        title: noteData.title,
        content: noteData.content,
        category_id: noteData.category || undefined,
        color: noteData.color,
        is_public: false,
        type: 'note',
        priority: 3,
        urgency: 3
        });

        addDebug('📥 Server action response: ' + JSON.stringify(result));

        if (result.error) {
        addDebug('❌ Server error: ' + result.error);
        throw new Error(result.error);
        }

        if (result.note) {
        addDebug('✅ Note created successfully, redirecting...');
        // CHANGE THIS LINE - Add the newNote parameter
        router.push(`/dashboard/notes?newNote=${result.note.id}`);
        router.refresh();
        } else {
        addDebug('❌ No note returned from server');
        throw new Error('Failed to create note');
        }
    } catch (error) {
        addDebug('❌ Error in handleSave: ' + error);
        alert(error instanceof Error ? error.message : 'Failed to create note. Please try again.');
    } finally {
        addDebug('🏁 Save process completed');
        setIsSaving(false);
    }
    };

    const handleCancel = () => {
        router.push('/dashboard/notes');
    };

    return (
        <div className='min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20'>
            <div className='mx-auto max-w-4xl p-4 lg:p-8'>
                <div className='mb-6 flex items-center gap-4'>
                    <Button variant='outline' size='icon' onClick={handleCancel} className='hover:bg-slate-100'>
                        <ArrowLeft className='h-4 w-4' />
                    </Button>
                    <h1 className='text-2xl font-bold text-slate-900'>Create New Note</h1>
                </div>

                {/* Debug panel - will show in browser */}
                {debugInfo.length > 0 && (
                    <div className='mb-4 rounded-lg bg-gray-100 p-4'>
                        <h3 className='mb-2 font-bold'>Debug Info:</h3>
                        <div className='max-h-32 space-y-1 overflow-y-auto text-xs'>
                            {debugInfo.map((info, index) => (
                                <div key={index}>{info}</div>
                            ))}
                        </div>
                    </div>
                )}

                <NoteEditor categories={categories} onSave={handleSave} onCancel={handleCancel} isSaving={isSaving} />
            </div>
        </div>
    );
}
