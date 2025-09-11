// app/dashboard/notes/@detail/[id]/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { getNoteById } from '@/actions/notes';
import NoteDetail from '@/components/notes/NoteDetail';

interface NoteDetailPageProps {
  params: Promise<{ id: string }>;
}

export default function NoteDetailPage({ params }: NoteDetailPageProps) {
  const [note, setNote] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // We need to unwrap the params because we're in a client component
  const [unwrappedParams, setUnwrappedParams] = useState<{ id: string } | null>(null);

  useEffect(() => {
    async function unwrapParams() {
      const unwrapped = await params;
      setUnwrappedParams(unwrapped);
    }
    unwrapParams();
  }, [params]);

  useEffect(() => {
    if (!unwrappedParams?.id) return;

    const fetchNote = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const { note: noteData, error: fetchError } = await getNoteById(unwrappedParams.id);

        if (fetchError) {
          setError(fetchError);
        } else {
          setNote(noteData);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load note');
      } finally {
        setIsLoading(false);
      }
    };

    fetchNote();
  }, [unwrappedParams?.id]);

  if (isLoading) {
    return (
      <div className="animate-pulse rounded-2xl bg-white/80 p-6">
        <div className="mb-4 h-8 w-3/4 rounded bg-slate-200"></div>
        <div className="mb-2 h-4 rounded bg-slate-200"></div>
        <div className="mb-2 h-4 rounded bg-slate-200"></div>
        <div className="mb-2 h-4 w-5/6 rounded bg-slate-200"></div>
      </div>
    );
  }

  if (error || !note) {
    return (
      <div className="rounded-2xl bg-white/80 p-6 text-center">
        <p className="text-gray-500">
          {error || "Note not found"}
        </p>
      </div>
    );
  }

  return <NoteDetail note={note} />;
}
