'use server'

import { createSupabaseServerClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function deleteCategory(categoryId: string) {
  try {
    const supabase = await createSupabaseServerClient()

    // Get current user to verify ownership
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('Not authenticated')

    const { error } = await supabase
      .from('note_categories')
      .delete()
      .eq('id', categoryId)
      .eq('owner_id', user.id) // Only allow deleting user's own categories

    if (error) throw error

    revalidatePath('/dashboard/notes')
    return { success: true, error: null }
  } catch (error) {
    console.error('Error deleting category:', error)
    return { success: false, error: error instanceof Error ? error.message : 'Failed to delete category' }
  }
}
