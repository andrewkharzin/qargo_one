'use server';

import { createSupabaseServerClient } from '@/lib/supabase/server';

export async function getNoteById(noteId: string) {
  try {
    const supabase = await createSupabaseServerClient();

    // Get current user - use the same pattern as getNotes
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Not authenticated');

    // Get note with category - simplified like getNotes
    const { data: note, error } = await supabase
      .from('notes')
      .select(`
        *,
        note_categories:category_id (name, color)
      `)
      .eq('id', noteId)
      .eq('author_id', user.id)
      .single();

    if (error) throw error;

    if (!note) {
      throw new Error('Note not found');
    }

    // Transform data to match getNotes pattern
    const noteWithDetails = {
      ...note,
      category: note.note_categories?.name, // Category name as string
      color: note.note_categories?.color,
      // Add other transformations if needed
      word_count: note.content.split(/\s+/).length
    };

    return { note: noteWithDetails, error: null };
  } catch (error) {
    console.error('Error fetching note:', error);
    return {
      note: null,
      error: error instanceof Error ? error.message : 'Failed to fetch note'
    };
  }
}
