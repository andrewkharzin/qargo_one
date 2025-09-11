'use server';

import { createSupabaseServerClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

// Add a reaction
export async function addReaction(noteId: string, reactionType: string) {
  try {
    const supabase = await createSupabaseServerClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Not authenticated');

    // Check if the same reaction already exists
    const { data: existingReaction } = await supabase
      .from('note_reactions')
      .select('id, note_id, user_id, reaction_type, created_at')
      .eq('note_id', noteId)
      .eq('user_id', user.id)
      .eq('reaction_type', reactionType)
      .single();

    if (existingReaction) {
      // Fetch user profile to attach
      const { data: profile } = await supabase
        .from('user_profile')
        .select('id, username, full_name, avatar_url')
        .eq('id', user.id)
        .single();

      return { success: true, data:
        { ...existingReaction, user_profile: profile }, error: null
      };
    }

    // Delete any previous reactions from this user
    await supabase
      .from('note_reactions')
      .delete()
      .eq('note_id', noteId)
      .eq('user_id', user.id);

    // Insert new reaction
    const { data, error } = await supabase
      .from('note_reactions')
      .insert({
        note_id: noteId,
        user_id: user.id,
        reaction_type: reactionType
      })
      .select('id, note_id, user_id, reaction_type, created_at') // no direct user_profile join
      .single();

    if (error) throw error;

    // Fetch user profile separately
    const { data: profile } = await supabase
      .from('user_profile')
      .select('id, username, full_name, avatar_url')
      .eq('id', user.id)
      .single();

    revalidatePath('/dashboard/notes');

    return {
      success: true,
      data: { ...data, user_profile: profile },
      error: null
    };
  } catch (error) {
    console.error('Error adding reaction:', error);
    return {
      success: false,
      data: null,
      error: error instanceof Error ? error.message : 'Failed to add reaction'
    };
  }
}

// Remove a reaction
export async function removeReaction(reactionId: string) {
  try {
    const supabase = await createSupabaseServerClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Not authenticated');

    const { error } = await supabase
      .from('note_reactions')
      .delete()
      .eq('id', reactionId)
      .eq('user_id', user.id);

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

// Get reactions for a note
export async function getNoteReactions(noteId: string) {
  try {
    const supabase = await createSupabaseServerClient();

    // Fetch reactions
    const { data: reactions, error } = await supabase
      .from('note_reactions')
      .select('id, note_id, user_id, reaction_type, created_at')
      .eq('note_id', noteId)
      .order('created_at', { ascending: false });

    if (error) throw error;

    if (!reactions || reactions.length === 0) return { reactions: [], error: null };

    // Fetch user profiles for all reactions
    const userIds = reactions.map(r => r.user_id);
    const { data: profiles } = await supabase
      .from('user_profile')
      .select('id, username, full_name, avatar_url')
      .in('id', userIds);

    // Map profiles to reactions
    const reactionsWithProfile = reactions.map(r => ({
      ...r,
      user_profile: profiles?.find(p => p.id === r.user_id) || null
    }));

    return { reactions: reactionsWithProfile, error: null };
  } catch (error) {
    console.error('Error fetching reactions:', error);
    return {
      reactions: null,
      error: error instanceof Error ? error.message : 'Failed to fetch reactions'
    };
  }
}
