'use server'

import { createSupabaseServerClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function createNote(noteData: {
  title: string;
  content: string;
  category_id?: string;
  color?: string;
  is_public?: boolean;
  type?: string;
  subcategory?: string;
  priority?: number;
  urgency?: number;
  metadata?: Record<string, any>; // Добавлено поле metadata
}) {
  console.log('📝 createNote called with:', noteData);

  try {
    const supabase = await createSupabaseServerClient()
    console.log('🔐 Supabase client created');

    // Get current user
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    console.log('👤 User auth result:', { user, authError });

    if (!user) throw new Error('Not authenticated')
    console.log('✅ User authenticated:', user.id);

    const { data: note, error } = await supabase
      .from('notes')
      .insert({
        ...noteData,
        author_id: user.id,
        color: noteData.color || 'slate',
        metadata: noteData.metadata || {} // Добавляем metadata
      })
      .select()
      .single()

    console.log('📊 Database insert result:', { note, error });

    if (error) throw error

    revalidatePath('/dashboard/notes')
    console.log('✅ Note created successfully, revalidating path');
    return { note, error: null }
  } catch (error) {
    console.error('❌ Error creating note:', error)
    return { note: null, error: error instanceof Error ? error.message : 'Failed to create note' }
  }
}
