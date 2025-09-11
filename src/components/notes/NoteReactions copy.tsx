'use client';

import React, { useState } from 'react';

import { addReaction, removeReaction } from '@/actions/notes/reactions';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Reaction } from '@/types/notes';

import { AnimatePresence, motion } from 'framer-motion';
import { SmilePlus, X } from 'lucide-react';

// Emoji mapping
const reactionEmojis: Record<string, string> = {
    like: '👍',
    love: '❤️',
    laugh: '😄',
    wow: '😯',
    sad: '😢',
    angry: '😡',
    important: '⭐',
    agree: '✅',
    disagree: '❌',
    question: '❓',
    idea: '💡',
    bookmark: '🔖',
    clap: '👏',
    fire: '🔥',
    rocket: '🚀'
};

// Display names for reactions
const reactionNames: Record<string, string> = {
    like: 'Нравится',
    love: 'Люблю',
    laugh: 'Смешно',
    wow: 'Удивительно',
    sad: 'Грустно',
    angry: 'Злость',
    important: 'Важно',
    agree: 'Согласен',
    disagree: 'Не согласен',
    question: 'Вопрос',
    idea: 'Идея',
    bookmark: 'В закладки',
    clap: 'Аплодисменты',
    fire: 'Огонь',
    rocket: 'Вперед'
};

interface NoteReactionsProps {
    noteId: string;
    initialReactions: Reaction[];
    currentUserId: string;
}

export function NoteReactions({ noteId, initialReactions, currentUserId }: NoteReactionsProps) {
    const [reactions, setReactions] = useState<Reaction[]>(initialReactions);
    const [isOpen, setIsOpen] = useState(false);

    // Get current user's reaction
    const currentUserReaction = reactions.find((r) => r.user_id === currentUserId);

    // Group reactions by type with count and user info
    const reactionCounts = reactions.reduce(
        (acc, reaction) => {
            if (!acc[reaction.reaction_type]) {
                acc[reaction.reaction_type] = {
                    count: 0,
                    users: [],
                    emoji: reactionEmojis[reaction.reaction_type] || '❓'
                };
            }

            acc[reaction.reaction_type].count += 1;
            if (reaction.user_id === currentUserId) {
                acc[reaction.reaction_type].isCurrentUser = true;
            }

            return acc;
        },
        {} as Record<string, { count: number; users: string[]; emoji: string; isCurrentUser?: boolean }>
    );

    const handleReaction = async (reactionType: string) => {
        try {
            // If user already has this reaction, remove it
            if (currentUserReaction && currentUserReaction.reaction_type === reactionType) {
                const { error } = await removeReaction(currentUserReaction.id);
                if (!error) {
                    setReactions(reactions.filter((r) => r.id !== currentUserReaction.id));
                }
                setIsOpen(false);
                return;
            }

            // Remove any existing reaction from the same user
            const otherReactions = reactions.filter((r) => r.user_id === currentUserId);

            // Add new reaction
            const { data, error } = await addReaction(noteId, reactionType);

            if (!error && data) {
                // Remove previous reaction and add new one
                const newReactions = reactions.filter((r) => r.user_id !== currentUserId);
                setReactions([...newReactions, data]);
                setIsOpen(false);
            }
        } catch (error) {
            console.error('Error handling reaction:', error);
        }
    };

    const handleRemoveReaction = async () => {
        if (!currentUserReaction) return;

        try {
            const { error } = await removeReaction(currentUserReaction.id);
            if (!error) {
                setReactions(reactions.filter((r) => r.id !== currentUserReaction.id));
            }
            setIsOpen(false);
        } catch (error) {
            console.error('Error removing reaction:', error);
        }
    };

    // Stop event propagation to prevent card click
    const stopPropagation = (e: React.MouseEvent) => {
        e.stopPropagation();
    };

    return (
        <div className='flex items-center gap-2' onClick={stopPropagation}>
            {/* Кнопка добавления реакции */}
            <Popover open={isOpen} onOpenChange={setIsOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant='ghost'
                        size='sm'
                        className={`h-8 w-8 p-0 relative ${
                            currentUserReaction
                                ? 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300'
                                : 'text-muted-foreground'
                        }`}
                        onClick={stopPropagation}
                        title='Добавить реакцию'>
                        <SmilePlus className='h-4 w-4' />
                        {currentUserReaction && (
                            <span className="absolute -top-1 -right-1 text-xs bg-blue-500 text-white rounded-full w-4 h-4 flex items-center justify-center">
                                {reactionEmojis[currentUserReaction.reaction_type]}
                            </span>
                        )}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className='w-auto p-3 max-w-[280px]' align='start' onClick={stopPropagation}>
                    {/* Заголовок с текущей реакцией */}
                    {currentUserReaction && (
                        <div className="mb-3 text-center">
                            <p className="text-sm text-muted-foreground mb-1">Ваша реакция:</p>
                            <div className="flex items-center justify-center gap-2">
                                <span className="text-2xl">
                                    {reactionEmojis[currentUserReaction.reaction_type]}
                                </span>
                                <span className="font-medium text-sm">
                                    {reactionNames[currentUserReaction.reaction_type]}
                                </span>
                            </div>
                        </div>
                    )}

                    {/* Сетка эмодзи */}
                    <div className='grid grid-cols-7 gap-1 justify-center'>
                        {Object.entries(reactionEmojis).map(([type, emoji]) => (
                            <Button
                                key={type}
                                variant='ghost'
                                size='icon'
                                className={`h-8 w-8 text-lg p-0 min-w-0 ${
                                    currentUserReaction?.reaction_type === type
                                        ? 'bg-blue-100 text-blue-600 ring-2 ring-blue-300 dark:bg-blue-900 dark:text-blue-300'
                                        : 'hover:bg-gray-100'
                                }`}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleReaction(type);
                                }}
                                title={reactionNames[type]}>
                                {emoji}
                            </Button>
                        ))}
                    </div>

                    {/* Кнопка удаления реакции */}
                    {currentUserReaction && (
                        <div className='mt-3 pt-3 border-t'>
                            <Button
                                variant='outline'
                                size='sm'
                                className='text-destructive hover:text-destructive hover:bg-destructive/10 w-full text-xs h-8'
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleRemoveReaction();
                                }}>
                                <X className='mr-1 h-3 w-3' />
                                Удалить
                            </Button>
                        </div>
                    )}

                    {/* Подсказка для новых пользователей */}
                    {!currentUserReaction && (
                        <div className='mt-2 text-center'>
                            <p className='text-xs text-muted-foreground'>
                                Выберите эмодзи
                            </p>
                        </div>
                    )}
                </PopoverContent>
            </Popover>

            {/* Отображение счетчиков реакций */}
            {reactions.length > 0 && (
                <div className='flex flex-wrap items-center gap-1'>
                    {Object.entries(reactionCounts)
                        .sort(([, a], [, b]) => b.count - a.count)
                        .slice(0, 3)
                        .map(([type, { count, emoji, isCurrentUser }]) => (
                            <motion.div
                                key={type}
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className={`flex items-center gap-1 rounded-full border px-2 py-1 text-xs ${
                                    isCurrentUser
                                        ? 'border-blue-300 bg-blue-50 text-blue-700 dark:border-blue-700 dark:bg-blue-950 dark:text-blue-300'
                                        : 'border-border bg-muted/50'
                                }`}
                                title={`${count} ${reactionNames[type]}`}>
                                <span>{emoji}</span>
                                <span>{count}</span>
                            </motion.div>
                        ))}

                    {Object.keys(reactionCounts).length > 3 && (
                        <span className='text-muted-foreground text-xs'>+{Object.keys(reactionCounts).length - 3}</span>
                    )}
                </div>
            )}
        </div>
    );
}
