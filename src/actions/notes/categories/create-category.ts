'use server'

import { createSupabaseServerClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function createCategory(
  name: string,
  color?: string,
  description?: string,
  icon?: string // Добавляем поддержку icon
) {
  try {
    const supabase = await createSupabaseServerClient()

    // Get current user
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('Not authenticated')

    const { data: category, error } = await supabase
      .from('note_categories')
      .insert({
        name,
        color,
        description,
        icon, // Добавляем icon
        owner_id: user.id,
      })
      .select()
      .single()

    if (error) throw error

    revalidatePath('/dashboard/notes')
    return { category, error: null }
  } catch (error) {
    console.error('Error creating category:', error)
    return { category: null, error: error instanceof Error ? error.message : 'Failed to create category' }
  }
}
