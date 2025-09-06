'use server'

import { createSupabaseServerClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function pinNote(noteId: string, isPinned: boolean) {
  try {
    const supabase = await createSupabaseServerClient()

    // Get current user to verify ownership
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('Not authenticated')

    // Update the is_pinned field for the specific note
    const { error } = await supabase
      .from('notes')
      .update({
        is_pinned: isPinned,
        updated_at: new Date().toISOString() // Update the timestamp
      })
      .eq('id', noteId)
      .eq('author_id', user.id) // Ensure user owns the note

    if (error) throw error

    // Revalidate the notes pages to reflect the changes
    revalidatePath('/dashboard/notes')
    revalidatePath('/dashboard') // In case you show pinned notes on main dashboard

    return { success: true, error: null }
  } catch (error) {
    console.error('Error pinning note:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to pin note'
    }
  }
}
