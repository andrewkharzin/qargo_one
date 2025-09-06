'use server'

import { createSupabaseServerClient } from '@/lib/supabase/server'

export async function getNoteCategories() {
  try {
    const supabase = await createSupabaseServerClient()

    // Get current user
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('Not authenticated')

    // Get categories for current user
    const { data: categories, error } = await supabase
      .from('note_categories')
      .select('*')
      .or(`owner_id.is.null,owner_id.eq.${user.id}`) // System categories or user's categories
      .order('name', { ascending: true })

    if (error) throw error

    return { categories, error: null }
  } catch (error) {
    console.error('Error fetching categories:', error)
    return { categories: null, error: error instanceof Error ? error.message : 'Failed to fetch categories' }
  }
}
