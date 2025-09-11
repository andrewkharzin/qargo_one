// hooks/useUserReactions.ts
'use client'

import { useEffect, useState } from 'react'
import { createSupabaseBrowserClient } from '@/lib/supabase/client'

export type UserProfile = {
  id: string
  username?: string | null
  full_name?: string | null
  avatar_url?: string | null
}

export type Reaction = {
  id: string
  note_id: string
  user_id: string
  reaction_type: string
  created_at: string
  user_profile?: UserProfile | null
}

export function useUserReactions(noteId: string) {
  const supabase = createSupabaseBrowserClient()
  const [reactions, setReactions] = useState<Reaction[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!noteId) return

    const fetchReactions = async () => {
      setLoading(true)
      try {
        // 1. Получаем реакции
        const { data: reactionsData, error: reactionsError } = await supabase
          .from('note_reactions')
          .select('*')
          .eq('note_id', noteId)
          .order('created_at', { ascending: true })

        if (reactionsError) throw reactionsError
        if (!reactionsData) {
          setReactions([])
          setLoading(false)
          return
        }

        // 2. Получаем уникальные user_id
        const userIds = Array.from(new Set(reactionsData.map(r => r.user_id)))
        let profilesMap: Record<string, UserProfile> = {}

        if (userIds.length > 0) {
          // 3. Подгружаем профили пользователей
          const { data: profiles, error: profilesError } = await supabase
            .from('user_profile')
            .select('*')
            .in('id', userIds)

          if (profilesError) throw profilesError

          profilesMap = {}
          profiles?.forEach(p => {
            profilesMap[p.id] = p
          })
        }

        // 4. Объединяем реакции с профилями
        const mergedReactions: Reaction[] = reactionsData.map(r => ({
          id: r.id,
          note_id: r.note_id,
          user_id: r.user_id,
          reaction_type: r.reaction_type,
          created_at: r.created_at,
          user_profile:
            profilesMap[r.user_id] || {
              id: r.user_id,
              username: 'Unknown',
              full_name: null,
              avatar_url: null,
            },
        }))

        setReactions(mergedReactions)
      } catch (err: any) {
        console.error('Error loading reactions:', err)
        setError(err.message || 'Failed to load reactions')
      } finally {
        setLoading(false)
      }
    }

    fetchReactions()

    // 5. Real-time подписка на новые реакции
    const subscription = supabase
      .channel(`reactions_note_${noteId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'note_reactions',
          filter: `note_id=eq.${noteId}`,
        },
        async payload => {
          const newReactionData = payload.new

          // Загружаем профиль пользователя для новой реакции
          let profile: UserProfile | null = null
          try {
            const { data: profiles } = await supabase
              .from('user_profile')
              .select('*')
              .eq('id', newReactionData.user_id)
              .single()

            profile = profiles || null
          } catch {
            profile = null
          }

          const newReaction: Reaction = {
            id: newReactionData.id,
            note_id: newReactionData.note_id,
            user_id: newReactionData.user_id,
            reaction_type: newReactionData.reaction_type,
            created_at: newReactionData.created_at,
            user_profile:
              profile || {
                id: newReactionData.user_id,
                username: 'Unknown',
                full_name: null,
                avatar_url: null,
              },
          }

          setReactions(prev => [...prev, newReaction])
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(subscription)
    }
  }, [noteId, supabase])

  return { reactions, loading, error }
}
