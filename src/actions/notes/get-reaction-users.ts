'use server'

import { createSupabaseServerClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

// Интерфейс для возвращаемых данных
export interface UserReaction {
  id: string
  note_id: string
  user_id: string
  reaction_type: string
  created_at: string
  user_profile: {
    id: string
    username: string | null
    full_name: string | null
    avatar_url: string | null
  } | null
}

// -------------------------------
// Получаем все реакции на заметку с профилями пользователей
// -------------------------------
export async function getUsersReaction(noteId: string): Promise<{
  data: UserReaction[]
  error: string | null
}> {
  try {
    const supabase = await createSupabaseServerClient()

    // 1️⃣ Получаем реакции
    const { data: reactions, error: reactionsError } = await supabase
      .from('note_reactions')
      .select('id, note_id, user_id, reaction_type, created_at')
      .eq('note_id', noteId)
      .order('created_at', { ascending: false })

    if (reactionsError) {
      console.error('Error fetching reactions:', reactionsError)
      return { data: [], error: reactionsError.message }
    }

    if (!reactions || reactions.length === 0) return { data: [], error: null }

    // 2️⃣ Получаем профили пользователей
    const userIds = reactions.map(r => r.user_id)
    const { data: profiles, error: profilesError } = await supabase
      .from('user_profile')
      .select('id, username, full_name, avatar_url')
      .in('id', userIds)

    if (profilesError) {
      console.error('Error fetching user profiles:', profilesError)
      return { data: [], error: profilesError.message }
    }

    const profilesMap = Object.fromEntries(
      (profiles || []).map(p => [p.id, p])
    )

    // 3️⃣ Объединяем реакции с профилями
    const result: UserReaction[] = reactions.map(r => ({
      ...r,
      user_profile: profilesMap[r.user_id] || null
    }))

    return { data: result, error: null }
  } catch (err) {
    console.error('Unexpected error in getUsersReaction:', err)
    return { data: [], error: 'An unexpected error occurred' }
  }
}

// -------------------------------
// Получаем реакцию конкретного пользователя на заметку
// -------------------------------
export async function getUserReactionForNote(noteId: string, userId: string): Promise<{
  data: UserReaction | null
  error: string | null
}> {
  try {
    const supabase = await createSupabaseServerClient()

    const { data: reaction, error: reactionError } = await supabase
      .from('note_reactions')
      .select('id, note_id, user_id, reaction_type, created_at')
      .eq('note_id', noteId)
      .eq('user_id', userId)
      .maybeSingle()

    if (reactionError) {
      console.error('Error fetching reaction:', reactionError)
      return { data: null, error: reactionError.message }
    }

    if (!reaction) return { data: null, error: null }

    // Подтягиваем профиль пользователя
    const { data: profile, error: profileError } = await supabase
      .from('user_profile')
      .select('id, username, full_name, avatar_url')
      .eq('id', userId)
      .maybeSingle()

    if (profileError) {
      console.error('Error fetching user profile:', profileError)
      return { data: null, error: profileError.message }
    }

    return {
      data: {
        ...reaction,
        user_profile: profile || null
      },
      error: null
    }
  } catch (err) {
    console.error('Unexpected error in getUserReactionForNote:', err)
    return { data: null, error: 'An unexpected error occurred' }
  }
}

// -------------------------------
// Добавляем реакцию пользователя
// -------------------------------
export async function addUserReaction(noteId: string, userId: string, reactionType: string): Promise<{
  success: boolean
  error: string | null
}> {
  try {
    const supabase = await createSupabaseServerClient()

    const { error } = await supabase
      .from('note_reactions')
      .insert({
        note_id: noteId,
        user_id: userId,
        reaction_type: reactionType
      })

    if (error) {
      console.error('Error adding user reaction:', error)
      return { success: false, error: error.message }
    }

    // Перегенерируем страницу, чтобы показать новые реакции
    revalidatePath(`/notes/${noteId}`)

    return { success: true, error: null }
  } catch (err) {
    console.error('Unexpected error in addUserReaction:', err)
    return { success: false, error: 'An unexpected error occurred' }
  }
}

// -------------------------------
// Удаляем реакцию пользователя
// -------------------------------
export async function removeUserReaction(noteId: string, userId: string, reactionType: string): Promise<{
  success: boolean
  error: string | null
}> {
  try {
    const supabase = await createSupabaseServerClient()

    const { error } = await supabase
      .from('note_reactions')
      .delete()
      .eq('note_id', noteId)
      .eq('user_id', userId)
      .eq('reaction_type', reactionType)

    if (error) {
      console.error('Error removing user reaction:', error)
      return { success: false, error: error.message }
    }

    revalidatePath(`/notes/${noteId}`)

    return { success: true, error: null }
  } catch (err) {
    console.error('Unexpected error in removeUserReaction:', err)
    return { success: false, error: 'An unexpected error occurred' }
  }
}

// -------------------------------
// Переключаем реакцию пользователя (toggle)
// -------------------------------
export async function toggleUserReaction(noteId: string, userId: string, reactionType: string): Promise<{
  success: boolean
  action: 'added' | 'removed' | 'none'
  error: string | null
}> {
  try {
    // Проверяем, есть ли уже реакция пользователя
    const { data: existingReaction, error: checkError } = await getUserReactionForNote(noteId, userId)

    if (checkError) {
      return { success: false, action: 'none', error: checkError }
    }

    if (existingReaction && existingReaction.reaction_type === reactionType) {
      // Если реакция уже есть, удаляем
      const { success, error } = await removeUserReaction(noteId, userId, reactionType)
      return { success, action: 'removed', error }
    } else {
      // Удаляем любую другую существующую реакцию, чтобы была только одна
      if (existingReaction) {
        await removeUserReaction(noteId, userId, existingReaction.reaction_type)
      }

      // Добавляем новую реакцию
      const { success, error } = await addUserReaction(noteId, userId, reactionType)
      return { success, action: 'added', error }
    }
  } catch (err) {
    console.error('Unexpected error in toggleUserReaction:', err)
    return { success: false, action: 'none', error: 'An unexpected error occurred' }
  }
}
