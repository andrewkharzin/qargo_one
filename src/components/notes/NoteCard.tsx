'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { pinNote } from '@/actions/notes';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Category, Note } from '@/types/notes';
import { NoteReactions } from './NoteReactions';
import { format } from 'date-fns';
import { motion } from 'framer-motion';
import { Bookmark, Calendar, Eye, MessageSquare, Pin, PinOff, Trash2, Type, UserPlus, Sparkles, MoreHorizontal } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface NoteCardProps {
    note: Note;
    onEdit: (note: Note) => void;
    onPin: (noteId: string, isPinned: boolean) => void;
    onDelete: (noteId: string) => void;
    isNew?: boolean;
    isSelected?: boolean;
    onClick?: (note: Note) => void;
    currentUserId: string;
}

export default function NoteCard({
    note,
    onEdit,
    onPin,
    onDelete,
    isNew = false,
    isSelected = false,
    onClick,
    currentUserId
}: NoteCardProps) {
    const router = useRouter();
    const [isPinning, setIsPinning] = React.useState(false);
    const [isCurrentlyPinned, setIsCurrentlyPinned] = React.useState(note.is_pinned);

    const stripHtml = (html: string): string => {
        if (typeof document === 'undefined') return html.replace(/<[^>]*>/g, '');
        const tmp = document.createElement('DIV');
        tmp.innerHTML = html;
        return tmp.textContent || tmp.innerText || '';
    };

    const getPreviewText = (content: string): string => {
        const text = stripHtml(content);
        return text.length > 150 ? text.substring(0, 150) + '...' : text;
    };

    const handleCardClick = () => {
        if (onClick) {
            onClick(note);
        } else {
            router.push(`/dashboard/notes?id=${note.id}`, { scroll: false });
        }
    };

    const handlePinClick = async (e: React.MouseEvent) => {
        e.stopPropagation();

        // Optimistic UI update
        setIsPinning(true);
        const previousPinnedState = isCurrentlyPinned;
        setIsCurrentlyPinned(!previousPinnedState);

        try {
            // Call the server action
            await pinNote(note.id, !previousPinnedState);

            // Update parent component if needed
            onPin(note.id, !previousPinnedState);
        } catch (error) {
            // Revert on error
            setIsCurrentlyPinned(previousPinnedState);
            console.error('Failed to pin note:', error);
        } finally {
            setIsPinning(false);
        }
    };

    const handleDetailClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        handleCardClick();
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{
                opacity: 1,
                y: 0,
                scale: isNew ? [1, 1.03, 1] : 1
            }}
            transition={{
                duration: isNew ? 1.2 : 0.3,
                ease: 'easeInOut'
            }}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            className='group relative'
        >
            {/* Gradient background effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>

            {/* Pin indicator at the top right */}
            {isCurrentlyPinned && (
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className='absolute -top-2 -right-2 z-10 rounded-full bg-gradient-to-r from-yellow-400 to-amber-400 p-1.5 shadow-lg'
                >
                    <Pin className='h-3.5 w-3.5 text-yellow-900' fill='currentColor' />
                </motion.div>
            )}

            {/* New note indicator */}
            {isNew && (
                <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    className="absolute -top-2 -left-2 z-10"
                >
                    <div className="flex items-center gap-1 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 px-2 py-1 text-xs font-medium text-white shadow-md">
                        <Sparkles className="h-3 w-3" />
                        <span>New</span>
                    </div>
                </motion.div>
            )}

            <Card
                className={`flex h-[320px] cursor-pointer flex-col justify-between transition-all duration-300 backdrop-blur-sm
                    ${isSelected
                        ? 'bg-blue-50/80 ring-2 ring-blue-500/60 shadow-lg dark:bg-blue-950/50 dark:ring-blue-400/40'
                        : 'bg-white/80 hover:bg-white hover:shadow-xl dark:bg-slate-800/80 dark:hover:bg-slate-700/80'
                    }
                    ${isNew ? 'ring-2 ring-green-400/50' : ''}
                    ${isCurrentlyPinned ? 'border-yellow-400/30 dark:border-yellow-500/30' : 'border-slate-200/60 dark:border-slate-700/50'}
                    rounded-2xl border overflow-hidden`}
                onClick={handleCardClick}
            >
                <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                            <CardTitle className='truncate text-lg font-semibold text-slate-800 dark:text-white'>
                                {note.title || 'Untitled Note'}
                            </CardTitle>
                            <CardDescription className='flex items-center gap-3 text-xs mt-1.5'>
                                <span className='flex items-center gap-1 text-slate-500 dark:text-slate-400'>
                                    <Calendar className='h-3.5 w-3.5' />
                                    {format(new Date(note.updated_at), 'MMM d, yyyy')}
                                </span>
                                {note.word_count && (
                                    <span className='flex items-center gap-1 text-slate-500 dark:text-slate-400'>
                                        <Type className='h-3.5 w-3.5' />
                                        {note.word_count} words
                                    </span>
                                )}
                            </CardDescription>
                        </div>

                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    size="icon"
                                    variant="ghost"
                                    className="h-8 w-8 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100/50 dark:hover:bg-slate-700/50 dark:hover:text-slate-200"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <MoreHorizontal className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-48 backdrop-blur-sm bg-white/90 dark:bg-slate-800/90 border-slate-200/60 dark:border-slate-700">
                                <DropdownMenuItem onClick={(e) => { e.stopPropagation(); onEdit(note); }}>
                                    Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={(e) => { e.stopPropagation(); onDelete(note.id); }} className="text-red-600 dark:text-red-400">
                                    Delete
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </CardHeader>

                <CardContent className="pb-3">
                    {note.content && (
                        <p className='text-slate-600 dark:text-slate-300 line-clamp-3 text-sm leading-relaxed'>
                            {getPreviewText(note.content)}
                        </p>
                    )}

                    {/* Tags and category */}
                    <div className='mt-4 flex flex-wrap gap-2'>
                        {note.tags?.slice(0, 2).map((tag, i) => (
                            <Badge
                                key={i}
                                variant="outline"
                                className='rounded-full bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700 border-blue-200/60 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-700/50'
                            >
                                {tag}
                            </Badge>
                        ))}

                        {note.tags && note.tags.length > 2 && (
                            <Badge
                                variant="outline"
                                className='rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700 border-slate-200/60 dark:bg-slate-700/50 dark:text-slate-300 dark:border-slate-600'
                            >
                                +{note.tags.length - 2}
                            </Badge>
                        )}

                        {note.category && (
                            <Badge
                                className='rounded-full bg-purple-50 px-2.5 py-1 text-xs font-medium text-purple-700 border-purple-200/60 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-700/50'
                            >
                                {typeof note.category === 'string' ? note.category : note.category.name}
                            </Badge>
                        )}
                    </div>
                </CardContent>

                <CardFooter className="flex justify-between items-center border-t border-slate-200/40 dark:border-slate-700/40 pt-4 pb-4">
                    {/* Reactions Section */}
                    <div className="flex-1">
                        <NoteReactions
                            noteId={note.id}
                            initialReactions={note.reactions || []}
                            currentUserId={currentUserId}
                        />
                    </div>

                    {/* Action Buttons Row */}
                    <div className="flex justify-end gap-1">
                        <Button
                            size="icon"
                            variant="ghost"
                            onClick={handleDetailClick}
                            title="View details"
                            className="h-9 w-9 rounded-xl bg-white/60 hover:bg-slate-100/60 border border-slate-200/40 dark:bg-slate-700/60 dark:hover:bg-slate-600/60 dark:border-slate-600/40"
                        >
                            <Eye className="h-4 w-4 text-slate-600 dark:text-slate-300" />
                        </Button>

                        <Button
                            size="icon"
                            variant="ghost"
                            onClick={handlePinClick}
                            disabled={isPinning}
                            className={`h-9 w-9 rounded-xl bg-white/60 hover:bg-slate-100/60 border border-slate-200/40 dark:bg-slate-700/60 dark:hover:bg-slate-600/60 dark:border-slate-600/40 ${
                                isCurrentlyPinned ? "text-yellow-500 hover:bg-yellow-50/60 dark:hover:bg-yellow-900/30" : ""
                            }`}
                            title={isCurrentlyPinned ? "Unpin note" : "Pin note"}
                        >
                            <motion.div
                                animate={{
                                    scale: isPinning ? [1, 1.2, 1] : 1,
                                    rotate: isPinning ? [0, 10, -10, 0] : 0
                                }}
                                transition={{ duration: 0.5 }}
                            >
                                {isCurrentlyPinned ? (
                                    <PinOff className="h-4 w-4" />
                                ) : (
                                    <Pin className="h-4 w-4" />
                                )}
                            </motion.div>
                        </Button>

                        <Button
                            size="icon"
                            variant="ghost"
                            title="Bookmark"
                            onClick={(e) => e.stopPropagation()}
                            className="h-9 w-9 rounded-xl bg-white/60 hover:bg-slate-100/60 border border-slate-200/40 dark:bg-slate-700/60 dark:hover:bg-slate-600/60 dark:border-slate-600/40"
                        >
                            <Bookmark className="h-4 w-4 text-slate-600 dark:text-slate-300" />
                        </Button>
                    </div>
                </CardFooter>
            </Card>
        </motion.div>
    );
}
