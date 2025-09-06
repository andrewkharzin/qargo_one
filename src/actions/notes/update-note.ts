'use server'

import { createSupabaseServerClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function updateNote(noteId: string, updates: any) {
  try {
    const supabase = await createSupabaseServerClient()

    const { error } = await supabase
      .from('notes')
      .update({
        ...updates,
        updated_at: new Date().toISOString()
      })
      .eq('id', noteId)

    if (error) throw error

    revalidatePath('/dashboard/notes')
    revalidatePath(`/dashboard/notes/${noteId}`)
    return { success: true, error: null }
  } catch (error) {
    console.error('Error updating note:', error)
    return { success: false, error: error instanceof Error ? error.message : 'Failed to update note' }
  }
}
