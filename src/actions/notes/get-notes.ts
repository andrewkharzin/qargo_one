'use server';

import { createSupabaseServerClient } from '@/lib/supabase/server'

export async function getNotes() {
  try {
    const supabase = await createSupabaseServerClient()

    // Get current user
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('Not authenticated')

    // Get current user's notes with category
    const { data: notes, error } = await supabase
      .from('notes')
      .select(`
        *,
        note_categories:category_id (name)
      `)
      .eq('author_id', user.id)
      .order('is_pinned', { ascending: false })
      .order('updated_at', { ascending: false })

    if (error) throw error

    // Transform data - возвращаем category как строку
    const notesWithDetails = notes.map(note => ({
      ...note,
      category: note.note_categories?.name, // Просто имя категории как строка
      // Цвет теперь берется из самой заметки, а не из категории
      // Вычисляемое поле для UI
      word_count: note.content.split(/\s+/).length
    }))

    return { notes: notesWithDetails, error: null }
  } catch (error) {
    console.error('Error fetching notes:', error)
    return { notes: null, error: error instanceof Error ? error.message : 'Failed to fetch notes' }
  }
}
