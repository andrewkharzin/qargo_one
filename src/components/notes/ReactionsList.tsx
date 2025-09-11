'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card'
import { SmilePlus } from 'lucide-react'
import { useUserReactions } from '@/hooks/useUserReactions'
import { addReaction } from '@/actions/notes/reactions'

export default function ReactionsList({ noteId }: { noteId: string }) {
  const { reactions, loading } = useUserReactions(noteId)

  async function handleAddReaction() {
    await addReaction(noteId, '👍') // можно любую реакцию
  }

  if (loading) return <p>Loading...</p>

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={handleAddReaction}
        className="p-2 rounded-full hover:bg-muted"
      >
        <SmilePlus className="w-5 h-5" />
      </button>

      <div className="flex -space-x-2">
        {reactions.map(r => (
          <HoverCard key={r.id}>
            <HoverCardTrigger>
              <Avatar className="w-8 h-8 border">
                <AvatarImage src={r.user_profile?.avatar_url ?? ''} />
                <AvatarFallback>
                  {r.user_profile?.username?.[0]?.toUpperCase() ?? '?'}
                </AvatarFallback>
              </Avatar>
            </HoverCardTrigger>
            <HoverCardContent className="w-64">
              <div className="flex items-center gap-3">
                <Avatar className="w-10 h-10">
                  <AvatarImage src={r.user_profile?.avatar_url ?? ''} />
                  <AvatarFallback>
                    {r.user_profile?.username?.[0]?.toUpperCase() ?? '?'}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{r.user_profile?.full_name ?? r.user_profile?.username}</p>
                  <p className="text-sm text-muted-foreground">
                    Reacted with {r.reaction_type}
                  </p>
                </div>
              </div>
            </HoverCardContent>
          </HoverCard>
        ))}
      </div>
    </div>
  )
}
