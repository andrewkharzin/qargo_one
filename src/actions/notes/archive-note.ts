'use server'

import { createSupabaseServerClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function archiveNote(noteId: string, isArchived: boolean) {
  try {
    const supabase = await createSupabaseServerClient()

    const { error } = await supabase
      .from('notes')
      .update({ is_archived: isArchived })
      .eq('id', noteId)

    if (error) throw error

    revalidatePath('/dashboard/notes')
    return { success: true, error: null }
  } catch (error) {
    console.error('Error archiving note:', error)
    return { success: false, error: error instanceof Error ? error.message : 'Failed to archive note' }
  }
}
