'use server'

import { createSupabaseServerClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function updateCategory(categoryId: string, updates: {
  name?: string;
  color?: string;
  description?: string;
  icon?: string; // Добавляем поддержку icon
}) {
  try {
    const supabase = await createSupabaseServerClient()

    // Get current user to verify ownership
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('Not authenticated')

    const { error } = await supabase
      .from('note_categories')
      .update({
        ...updates,
        updated_at: new Date().toISOString() // Добавляем timestamp обновления
      })
      .eq('id', categoryId)
      .eq('owner_id', user.id) // Only allow updating user's own categories

    if (error) throw error

    revalidatePath('/dashboard/notes')
    return { success: true, error: null }
  } catch (error) {
    console.error('Error updating category:', error)
    return { success: false, error: error instanceof Error ? error.message : 'Failed to update category' }
  }
}
