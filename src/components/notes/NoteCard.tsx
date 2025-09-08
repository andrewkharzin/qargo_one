import React from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

import { format } from 'date-fns';
import { motion } from 'framer-motion';
import { Calendar, Edit3, Pin, PinOff, Tag, Trash2, Type } from 'lucide-react';
import anime from "animejs"; // Import animejs

const colorThemes = {
    slate: 'from-slate-500/10 to-slate-600/5 border-slate-200/50',
    gray: 'from-gray-500/10 to-gray-600/5 border-gray-200/50',
    zinc: 'from-zinc-500/10 to-zinc-600/5 border-zinc-200/50',
    neutral: 'from-neutral-500/10 to-neutral-600/5 border-neutral-200/50',
    stone: 'from-stone-500/10 to-stone-600/5 border-stone-200/50',
    red: 'from-red-500/10 to-red-600/5 border-red-200/50',
    orange: 'from-orange-500/10 to-orange-600/5 border-orange-200/50',
    amber: 'from-amber-500/10 to-amber-600/5 border-amber-200/50',
    yellow: 'from-yellow-500/10 to-yellow-600/5 border-yellow-200/50',
    lime: 'from-lime-500/10 to-lime-600/5 border-lime-200/50',
    green: 'from-green-500/10 to-green-600/5 border-green-200/50',
    blue: 'from-blue-500/10 to-blue-600/5 border-blue-200/50',
    purple: 'from-purple-500/10 to-purple-600/5 border-purple-200/50',
    pink: 'from-pink-500/10 to-pink-600/5 border-pink-200/50'
} as const;

// Animation variants
const cardVariants = {
    initial: { opacity: 0, y: 20 },
    animate: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.3 }
    },
    exit: { opacity: 0, y: -20 },
    highlight: {
        scale: [1, 1.03, 1],
        boxShadow: [
            '0 4px 15px rgba(0, 0, 0, 0.1)',
            '0 0 0 3px rgba(59, 130, 246, 0.3)',
            '0 4px 15px rgba(0, 0, 0, 0.1)'
        ],
        transition: {
            duration: 1.5,
            times: [0, 0.5, 1]
        }
    }
};

// Types
interface Note {
    id: string;
    title?: string;
    content: string;
    is_pinned: boolean;
    created_at: string;
    updated_at: string;
    category_id?: string;
    category?: string;
    color?: string;
    tags?: string[];
    is_public?: boolean;
    type?: string;
    priority?: number;
    urgency?: number;
    is_archived?: boolean;
    word_count?: number;
}

interface NoteCardProps {
    note: Note;
    onEdit: (note: Note) => void;
    onPin: (noteId: string, isPinned: boolean) => void;
    onDelete: (noteId: string) => void;
    isNew?: boolean;
}

export default function NoteCard({ note, onEdit, onPin, onDelete, isNew = false }: NoteCardProps) {
    const stripHtml = (html: string): string => {
        const tmp = document.createElement('DIV');
        tmp.innerHTML = html;
        return tmp.textContent || tmp.innerText || '';
    };

    const getPreviewText = (content: string): string => {
        const text = stripHtml(content);
        return text.length > 150 ? text.substring(0, 150) + '...' : text;
    };

    const themeClass =
        note.color && colorThemes[note.color as keyof typeof colorThemes]
            ? colorThemes[note.color as keyof typeof colorThemes]
            : colorThemes.slate;

     // Anime.js animation for new notes
  useEffect(() => {
    if (isNew && cardRef.current && highlightRef.current) {
      // Reset initial state
      cardRef.current.style.transform = "scale(1)";
      cardRef.current.style.boxShadow = "0 4px 15px rgba(0, 0, 0, 0.1)";
      highlightRef.current.style.opacity = "0";

      // Create highlight animation timeline
      const timeline = anime.timeline({
        duration: 1500,
        easing: "easeInOutSine"
      });

      timeline
        .add({
          targets: highlightRef.current,
          opacity: [0, 1],
          duration: 300
        })
        .add({
          targets: cardRef.current,
          scale: [1, 1.03, 1],
          boxShadow: [
            "0 4px 15px rgba(0, 0, 0, 0.1)",
            "0 0 0 3px rgba(59, 130, 246, 0.3)",
            "0 4px 15px rgba(0, 0, 0, 0.1)"
          ],
          duration: 1500
        }, 0);

      // Pulsating effect for the highlight
      anime({
        targets: highlightRef.current,
        opacity: [0.7, 1],
        duration: 800,
        direction: "alternate",
        loop: 3,
        easing: "easeInOutSine"
      });
    }
  }, [isNew]);

    return (
        <motion.div
            variants={cardVariants}
            initial='initial'
            animate={isNew ? ['animate', 'highlight'] : 'animate'}
            exit='exit'
            whileHover={{ y: -2 }}
            className='group relative'>
            {/* Highlight overlay for new notes */}
            {isNew && (
                <motion.div
                    className='absolute inset-0 z-20 rounded-lg border-2 border-blue-500 bg-blue-500/10'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                />
            )}

            <Card
                className={`bg-gradient-to-br ${themeClass} relative z-10 cursor-pointer border shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-xl`}
                onClick={() => onEdit(note)}>
                <CardHeader className='pb-3'>
                    <div className='flex items-start justify-between'>
                        <div className='min-w-0 flex-1'>
                            <div className='mb-2 flex items-center gap-2'>
                                {note.is_pinned && <Pin className='h-4 w-4 fill-current text-blue-600' />}
                                <h3 className='truncate font-semibold text-slate-900'>
                                    {note.title || 'Untitled Note'}
                                </h3>
                            </div>
                            <div className='flex items-center gap-3 text-xs text-slate-500'>
                                <div className='flex items-center gap-1'>
                                    <Calendar className='h-3 w-3' />
                                    {format(new Date(note.updated_at), 'MMM d')}
                                </div>
                                {note.word_count && (
                                    <div className='flex items-center gap-1'>
                                        <Type className='h-3 w-3' />
                                        {note.word_count} words
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className='flex gap-1 opacity-0 transition-opacity duration-200 group-hover:opacity-100'>
                            <Button
                                variant='ghost'
                                size='icon'
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onPin(note.id, note.is_pinned);
                                }}
                                className='h-8 w-8 hover:bg-white/50'>
                                {note.is_pinned ? <PinOff className='h-3 w-3' /> : <Pin className='h-3 w-3' />}
                            </Button>
                            <Button
                                variant='ghost'
                                size='icon'
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onDelete(note.id);
                                }}
                                className='h-8 w-8 hover:bg-red-50 hover:text-red-600'>
                                <Trash2 className='h-3 w-3' />
                            </Button>
                        </div>
                    </div>
                </CardHeader>

                <CardContent className='space-y-3 pt-0'>
                    {note.content && (
                        <p className='text-sm leading-relaxed text-slate-600'>{getPreviewText(note.content)}</p>
                    )}

                    {note.tags && note.tags.length > 0 && (
                        <div className='flex flex-wrap gap-1'>
                            {note.tags.slice(0, 3).map((tag, index) => (
                                <Badge
                                    key={index}
                                    variant='secondary'
                                    className='bg-white/50 px-2 py-0.5 text-xs text-slate-600'>
                                    <Tag className='mr-1 h-2 w-2' />
                                    {tag}
                                </Badge>
                            ))}
                            {note.tags.length > 3 && (
                                <Badge variant='secondary' className='bg-white/50 px-2 py-0.5 text-xs text-slate-600'>
                                    +{note.tags.length - 3} more
                                </Badge>
                            )}
                        </div>
                    )}

                    {note.category && (
                        <div className='flex items-center gap-1'>
                            <Badge className='border-blue-200 bg-blue-50 text-xs text-blue-700'>{note.category}</Badge>
                        </div>
                    )}
                </CardContent>
            </Card>
        </motion.div>
    );
}
