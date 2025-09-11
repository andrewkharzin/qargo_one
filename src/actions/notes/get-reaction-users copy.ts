'use server'

import { createSupabaseServerClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

// Interface for the raw data from Supabase
interface RawUserReaction {
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

// Interface for the transformed data we want to return
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

// Helper function to transform the raw data
function transformUserReactions(rawData: RawUserReaction[]): UserReaction[] {
  return rawData.map(item => ({
    id: item.id,
    note_id: item.note_id,
    user_id: item.user_id,
    reaction_type: item.reaction_type,
    created_at: item.created_at,
    user_profile: item.user_profile && item.user_profile.length > 0
      ? item.user_profile[0]
      : null
  }))
}

export async function getUsersReaction(noteId: string): Promise<{
  data: UserReaction[]
  error: string | null
}> {
  try {
    const supabase = await createSupabaseServerClient()

    // Query note reactions with user profile information
    const { data, error } = await supabase
        .from('note_reactions')
        .select(`
            id,
            note_id,
            user_id,
            reaction_type,
            created_at,
            user_profile!note_reactions_user_id_fkey (
            id,
            username,
            full_name,
            avatar_url
            )
        `)
        .eq('note_id', noteId)
        .order('created_at', { ascending: false })


    if (error) {
      console.error('Error fetching user reactions:', error)
      return { data: [], error: error.message }
    }

    // Transform the data to match our expected format
    const transformedData = transformUserReactions(data as unknown as RawUserReaction[])

    return { data: transformedData, error: null }
  } catch (error) {
    console.error('Unexpected error in getUsersReaction:', error)
    return { data: [], error: 'An unexpected error occurred' }
  }
}

export async function getUserReactionForNote(noteId: string, userId: string): Promise<{
  data: UserReaction | null
  error: string | null
}> {
  try {
    const supabase = await createSupabaseServerClient()

    const { data, error } = await supabase
      .from('note_reactions')
      .select(`
        id,
        note_id,
        user_id,
        reaction_type,
        created_at,
        user_profile:user_id (
          id,
          username,
          full_name,
          avatar_url
        )
      `)
      .eq('note_id', noteId)
      .eq('user_id', userId)
      .maybeSingle() // Use maybeSingle instead of single to handle no rows

    if (error) {
      console.error('Error fetching user reaction:', error)
      return { data: null, error: error.message }
    }

    if (!data) {
      return { data: null, error: null }
    }

    // Transform the single item
    const transformedData = transformUserReactions([data as unknown as RawUserReaction])[0]

    return { data: transformedData, error: null }
  } catch (error) {
    console.error('Unexpected error in getUserReactionForNote:', error)
    return { data: null, error: 'An unexpected error occurred' }
  }
}

// The rest of the functions remain the same...
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

    // Revalidate the page to show updated reactions
    revalidatePath(`/notes/${noteId}`)

    return { success: true, error: null }
  } catch (error) {
    console.error('Unexpected error in addUserReaction:', error)
    return { success: false, error: 'An unexpected error occurred' }
  }
}

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

    // Revalidate the page to show updated reactions
    revalidatePath(`/notes/${noteId}`)

    return { success: true, error: null }
  } catch (error) {
    console.error('Unexpected error in removeUserReaction:', error)
    return { success: false, error: 'An unexpected error occurred' }
  }
}

export async function toggleUserReaction(noteId: string, userId: string, reactionType: string): Promise<{
  success: boolean
  action: 'added' | 'removed' | 'none'
  error: string | null
}> {
  try {
    // Check if the user already has this reaction
    const { data: existingReaction, error: checkError } = await getUserReactionForNote(noteId, userId)

    if (checkError) {
      return { success: false, action: 'none', error: checkError }
    }

    if (existingReaction && existingReaction.reaction_type === reactionType) {
      // Remove the reaction if it already exists
      const { success, error } = await removeUserReaction(noteId, userId, reactionType)
      return { success, action: 'removed', error }
    } else {
      // Remove any existing reaction (to ensure one reaction per user per note)
      if (existingReaction) {
        await removeUserReaction(noteId, userId, existingReaction.reaction_type)
      }

      // Add the new reaction
      const { success, error } = await addUserReaction(noteId, userId, reactionType)
      return { success, action: 'added', error }
    }
  } catch (error) {
    console.error('Unexpected error in toggleUserReaction:', error)
    return { success: false, action: 'none', error: 'An unexpected error occurred' }
  }
}
