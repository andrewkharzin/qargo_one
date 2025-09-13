'use server';

import { createSupabaseServerClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

// Добавить реакцию
export async function addReaction(noteId: string, reactionType: string) {
  try {
    const supabase = await createSupabaseServerClient();

    // Получить текущего пользователя
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Not authenticated');

    // Проверить, существует ли уже такая реакция
    const { data: existingReaction } = await supabase
      .from('note_reactions')
      .select('id')
      .eq('note_id', noteId)
      .eq('user_id', user.id)
      .eq('reaction_type', reactionType)
      .single();

    if (existingReaction) {
      return { success: true, data: existingReaction, error: null };
    }

    // Удалить предыдущие реакции пользователя (если нужно только одну реакцию на пользователя)
    await supabase
      .from('note_reactions')
      .delete()
      .eq('note_id', noteId)
      .eq('user_id', user.id);

    // Добавить новую реакцию
    const { data, error } = await supabase
      .from('note_reactions')
      .insert({
        note_id: noteId,
        user_id: user.id,
        reaction_type: reactionType
      })
      .select()
      .single();

    if (error) throw error;

    revalidatePath('/dashboard/notes');

    return { success: true, data, error: null };
  } catch (error) {
    console.error('Error adding reaction:', error);
    return {
      success: false,
      data: null,
      error: error instanceof Error ? error.message : 'Failed to add reaction'
    };
  }
}

// Удалить реакцию
export async function removeReaction(reactionId: string) {
  try {
    const supabase = await createSupabaseServerClient();

    // Получить текущего пользователя
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Not authenticated');

    // Удалить реакцию
    const { error } = await supabase
      .from('note_reactions')
      .delete()
      .eq('id', reactionId)
      .eq('user_id', user.id); // Убедиться, что пользователь удаляет свою реакцию

    if (error) throw error;

    revalidatePath('/dashboard/notes');

    return { success: true, error: null };
  } catch (error) {
    console.error('Error removing reaction:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to remove reaction'
    };
  }
}

// Получить реакции для заметки
export async function getNoteReactions(noteId: string) {
  try {
    const supabase = await createSupabaseServerClient();

    const { data: reactions, error } = await supabase
      .from('note_reactions')
      .select('*')
      .eq('note_id', noteId)
      .order('created_at', { ascending: false });

    if (error) throw error;

    return { reactions, error: null };
  } catch (error) {
    console.error('Error fetching reactions:', error);
    return {
      reactions: null,
      error: error instanceof Error ? error.message : 'Failed to fetch reactions'
    };
  }
}
