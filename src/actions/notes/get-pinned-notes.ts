'use server'

import { createSupabaseServerClient } from '@/lib/supabase/server'

export async function getPinnedNotes() {
  try {
    const supabase = await createSupabaseServerClient()

    // Get current user
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('Not authenticated')

    // Get only pinned notes for the current user
    const { data: notes, error } = await supabase
      .from('notes')
      .select(`
        *,
        note_categories:category_id (name, color),
        note_tags:note_tag_map (note_tags:tag_id (name))
      `)
      .eq('author_id', user.id)
      .eq('is_pinned', true)
      .order('created_at', { ascending: false })

    if (error) throw error

    // Transform data
    const notesWithDetails = notes.map(note => ({
      ...note,
      category: note.note_categories?.name,
      color: note.note_categories?.color,
      tags: note.note_tags?.map((nt: any) => nt.note_tags?.name).filter(Boolean) || []
    }))

    return { notes: notesWithDetails, error: null }
  } catch (error) {
    console.error('Error fetching pinned notes:', error)
    return { notes: null, error: error instanceof Error ? error.message : 'Failed to fetch pinned notes' }
  }
}
