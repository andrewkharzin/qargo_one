'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SmilePlus, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import {
  Avatar,
  AvatarFallback,
  AvatarImage
} from '@/components/ui/avatar';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger
} from '@/components/ui/hover-card';

import { addReaction, removeReaction } from '@/actions/notes/reactions';
import { Reaction } from '@/types/notes';

// Emoji and label mapping
const reactionEmojis: Record<string, string> = {
  like: '👍', love: '❤️', laugh: '😄', wow: '😯', sad: '😢', angry: '😡',
  important: '⭐', agree: '✅', disagree: '❌', question: '❓', idea: '💡',
  bookmark: '🔖', clap: '👏', fire: '🔥', rocket: '🚀'
};

const reactionNames: Record<string, string> = {
  like: 'Нравится', love: 'Люблю', laugh: 'Смешно', wow: 'Удивительно', sad: 'Грустно',
  angry: 'Злость', important: 'Важно', agree: 'Согласен', disagree: 'Не согласен',
  question: 'Вопрос', idea: 'Идея', bookmark: 'В закладки', clap: 'Аплодисменты',
  fire: 'Огонь', rocket: 'Вперед'
};

interface NoteReactionsProps {
  noteId: string;
  initialReactions: Reaction[];
  currentUserId: string;
}

export function NoteReactions({ noteId, initialReactions, currentUserId }: NoteReactionsProps) {
  const [reactions, setReactions] = useState<Reaction[]>(initialReactions);
  const [isOpen, setIsOpen] = useState(false);

  const currentUserReaction = reactions.find(r => r.user_id === currentUserId);

  // Group reactions by type
  const reactionGroups: Record<string, { count: number; users: Reaction[] }> = reactions.reduce((acc, r) => {
    if (!acc[r.reaction_type]) acc[r.reaction_type] = { count: 0, users: [] };
    acc[r.reaction_type].count += 1;
    acc[r.reaction_type].users.push(r);
    return acc;
  }, {} as Record<string, { count: number; users: Reaction[] }>);

  const handleReaction = async (type: string) => {
    try {
      // Toggle reaction
      if (currentUserReaction?.reaction_type === type) {
        await removeReaction(currentUserReaction.id);
        setReactions(reactions.filter(r => r.id !== currentUserReaction.id));
      } else {
        const { data } = await addReaction(noteId, type);
        if (data) {
          setReactions([...reactions.filter(r => r.user_id !== currentUserId), data]);
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex items-center gap-2">
      {/* Add reaction button */}
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => e.stopPropagation()}
            className={currentUserReaction ? 'bg-blue-100 text-blue-600' : 'text-muted-foreground'}
          >
            <SmilePlus className="h-4 w-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-3 max-w-[280px]">
          <div className="grid grid-cols-7 gap-1 justify-center">
            {Object.entries(reactionEmojis).map(([type, emoji]) => (
              <Button
                key={type}
                variant="ghost"
                size="icon"
                onClick={(e) => {
                  e.stopPropagation();
                  handleReaction(type);
                }}
                title={reactionNames[type]}
              >
                {emoji}
              </Button>
            ))}
          </div>
        </PopoverContent>
      </Popover>

      {/* Display reactions */}
      <div className="flex -space-x-2">
        {Object.entries(reactionGroups).map(([type, group]) => (
          <HoverCard key={type}>
            <HoverCardTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <span className="text-lg">{reactionEmojis[type]}</span>
                <span className="absolute -top-1 -right-1 text-xs bg-muted rounded-full w-4 h-4 flex items-center justify-center">
                  {group.count}
                </span>
              </Button>
            </HoverCardTrigger>
            <HoverCardContent className="w-64">
              <p className="text-sm font-semibold mb-2">{reactionNames[type]} ({group.count})</p>
              <div className="flex flex-wrap gap-2">
                {group.users.map(u => (
                  <div key={u.id} className="flex items-center gap-2">
                    <Avatar className="w-6 h-6">
                      <AvatarImage src={u.user_profile?.avatar_url || ''} />
                      <AvatarFallback>{u.user_profile?.username?.[0] || '?'}</AvatarFallback>
                    </Avatar>
                    <span className="text-xs">{u.user_profile?.full_name || u.user_profile?.username}</span>
                  </div>
                ))}
              </div>
            </HoverCardContent>
          </HoverCard>
        ))}
      </div>
    </div>
  );
}
