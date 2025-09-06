'use server'

import { createSupabaseServerClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function deleteNote(noteId: string) {
  try {
    const supabase = await createSupabaseServerClient()

    const { error } = await supabase
      .from('notes')
      .delete()
      .eq('id', noteId)

    if (error) throw error

    revalidatePath('/dashboard/notes')
    return { success: true, error: null }
  } catch (error) {
    console.error('Error deleting note:', error)
    return { success: false, error: error instanceof Error ? error.message : 'Failed to delete note' }
  }
}
