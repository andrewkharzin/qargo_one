'use server';

import { createSupabaseServerClient } from '@/lib/supabase/server';

export async function getNoteById(noteId: string) {
  try {
    const supabase = await createSupabaseServerClient();

    // Get current user
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Not authenticated');

    // Get note with basic data first
    const { data: note, error } = await supabase
      .from('notes')
      .select(`
        *,
        note_categories:category_id (name, color, description)
      `)
      .eq('id', noteId)
      .eq('author_id', user.id)
      .single();

    if (error) {
      console.error('Supabase error details:', error);
      throw error;
    }

    if (!note) {
      throw new Error('Note not found');
    }

    // Get related data with separate queries
    const [
      { data: tagsData },
      { data: attachments },
      { data: comments },
      { data: tasks },
      { data: followers },
      { data: permissions },
      { data: shares }
    ] = await Promise.all([
      // Tags
      supabase
        .from('note_tag_map')
        .select(`
          note_tags!inner(name)
        `)
        .eq('note_id', noteId),

      // Attachments
      supabase
        .from('note_attachments')
        .select('*')
        .eq('note_id', noteId),

      // Comments - get basic data first, then enrich with user info
      supabase
        .from('note_comments')
        .select('*')
        .eq('note_id', noteId)
        .order('created_at', { ascending: false }),

      // Tasks
      supabase
        .from('note_tasks')
        .select('*')
        .eq('note_id', noteId),

      // Followers
      supabase
        .from('note_followers')
        .select('*')
        .eq('note_id', noteId),

      // Permissions
      supabase
        .from('note_permissions')
        .select('*')
        .eq('note_id', noteId),

      // Shares
      supabase
        .from('note_shares')
        .select('*')
        .eq('note_id', noteId)
    ]);

    // Enrich comments with user data
    const enrichedComments = await Promise.all(
      (comments || []).map(async (comment) => {
        const { data: userData } = await supabase
          .from('auth.users')
          .select('id, email')
          .eq('id', comment.author_id)
          .single();

        return {
          ...comment,
          author: userData || { id: comment.author_id, email: null }
        };
      })
    );

    // Enrich other user-related data similarly if needed
    const enrichedTasks = await Promise.all(
      (tasks || []).map(async (task) => {
        if (!task.assignee) return task;

        const { data: userData } = await supabase
          .from('auth.users')
          .select('id, email')
          .eq('id', task.assignee)
          .single();

        return {
          ...task,
          assignee_user: userData || { id: task.assignee, email: null }
        };
      })
    );

    const tags = tagsData?.map(t => t.note_tags?.name).filter(Boolean) || [];

    // Transform data
    const noteWithDetails = {
      ...note,
      category: note.note_categories,
      tags,
      attachments: attachments || [],
      comments: enrichedComments || [],
      tasks: enrichedTasks || [],
      followers: followers || [],
      permissions: permissions || [],
      shares: shares || []
    };

    return { note: noteWithDetails, error: null };
  } catch (error) {
    console.error('Error fetching note:', error);
    return {
      note: null,
      error: error instanceof Error ? error.message : 'Failed to fetch note'
    };
  }
}
