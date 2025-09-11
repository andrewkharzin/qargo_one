'use client';

import * as React from "react"
import { format } from "date-fns"
import { motion } from "framer-motion"
import {
  Calendar,
  Type,
  Pin,
  PinOff,
  Bookmark,
  UserPlus,
  MessageSquare,
  Trash2,
  Eye,
} from "lucide-react"

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { pinNote } from "@/actions/notes" // Adjust the import path as needed
import { NoteReactions }  from "./NoteReactions"
import { Category, Note } from '@/types/notes';

// export interface Reaction {
//   id: string;
//   note_id: string;
//   user_id: string;
//   reaction_type: string;
//   created_at: string;
// }

// interface Note {
//   id: string
//   title?: string
//   content: string
//   is_pinned: boolean
//   created_at: string
//   updated_at: string
//   category?: string
//   color?: string
//   tags?: string[]
//   word_count?: number
//   reactions?: Reaction[];
// }

interface NoteCardProps {
  note: Note
  onEdit: (note: Note) => void
  onPin: (noteId: string, isPinned: boolean) => void
  onDelete: (noteId: string) => void
  isNew?: boolean
  isSelected?: boolean
  onClick?: (note: Note) => void // Add onClick prop
  currentUserId: string // Добавьте ID текущего пользователя
}

export default function NoteCard({
  note,
  onEdit,
  onPin,
  onDelete,
  isNew = false,
  isSelected = false,
  onClick, // Destructure onClick
  currentUserId
}: NoteCardProps) {
  const router = useRouter()
  const [isPinning, setIsPinning] = React.useState(false)
  const [isCurrentlyPinned, setIsCurrentlyPinned] = React.useState(note.is_pinned)

  const stripHtml = (html: string): string => {
    if (typeof document === 'undefined') return html.replace(/<[^>]*>/g, '')
    const tmp = document.createElement("DIV")
    tmp.innerHTML = html
    return tmp.textContent || tmp.innerText || ""
  }

  const getPreviewText = (content: string): string => {
    const text = stripHtml(content)
    return text.length > 150 ? text.substring(0, 150) + "..." : text
  }

  const handleCardClick = () => {
    if (onClick) {
      onClick(note)
    } else {
      router.push(`/dashboard/notes?id=${note.id}`, { scroll: false })
    }
  }

  const handlePinClick = async (e: React.MouseEvent) => {
    e.stopPropagation()

    // Optimistic UI update
    setIsPinning(true)
    const previousPinnedState = isCurrentlyPinned
    setIsCurrentlyPinned(!previousPinnedState)

    try {
      // Call the server action
      await pinNote(note.id, !previousPinnedState)

      // Update parent component if needed
      onPin(note.id, !previousPinnedState)
    } catch (error) {
      // Revert on error
      setIsCurrentlyPinned(previousPinnedState)
      console.error("Failed to pin note:", error)
    } finally {
      setIsPinning(false)
    }
  }

  const handleDetailClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    handleCardClick()
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{
        opacity: 1,
        y: 0,
        scale: isNew ? [1, 1.03, 1] : 1,
      }}
      transition={{
        duration: isNew ? 1.2 : 0.3,
        ease: "easeInOut",
      }}
      whileHover={{ y: -2 }}
      className="group relative"
    >
      {/* Pin indicator at the top right */}
      {isCurrentlyPinned && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -top-2 -right-2 z-10 bg-yellow-400 rounded-full p-1 shadow-md"
        >
          <Pin className="h-4 w-4 text-yellow-900" fill="currentColor" />
        </motion.div>
      )}

      <Card
        className={`
          flex h-[300px] flex-col justify-between
          cursor-pointer transition-all duration-300
          ${isSelected
            ? 'ring-2 ring-blue-500 bg-blue-50/80 dark:bg-blue-950/50'
            : 'bg-white/80 dark:bg-gray-900/80 hover:bg-white dark:hover:bg-gray-800 hover:shadow-lg'
          }
          ${isNew ? "ring-2 ring-accent/50 ring-offset-2" : ""}
          ${isCurrentlyPinned ? 'border-yellow-400 dark:border-yellow-500 border-2' : ''}
        `}
        onClick={handleCardClick}
      >
        <CardHeader>
          <CardTitle className="truncate text-base">
            {note.title || "Untitled Note"}
          </CardTitle>
          <CardDescription className="flex items-center gap-3 text-xs">
            <span className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {format(new Date(note.updated_at), "MMM d")}
            </span>
            {note.word_count && (
              <span className="flex items-center gap-1">
                <Type className="h-3 w-3" />
                {note.word_count} words
              </span>
            )}
          </CardDescription>
        </CardHeader>

        <CardContent>
          {note.content && (
            <p className="text-sm text-muted-foreground line-clamp-3">
              {getPreviewText(note.content)}
            </p>
          )}

          {/* Tags and category */}
          <div className="mt-3 flex flex-wrap gap-2">
            {note.tags?.slice(0, 2).map((tag, i) => (
              <Badge
                key={i}
                variant="secondary"
                className="rounded-full px-2 py-0.5 text-xs
                           bg-blue-500/20 text-blue-700
                           dark:bg-blue-400/20 dark:text-blue-200"
              >
                {tag}
              </Badge>
            ))}

            {note.tags && note.tags.length > 2 && (
              <Badge
                variant="secondary"
                className="rounded-full px-2 py-0.5 text-xs
                           bg-blue-500/20 text-blue-700
                           dark:bg-blue-400/20 dark:text-blue-200"
              >
                +{note.tags.length - 2}
              </Badge>
            )}

            {note.category && (
              <Badge
                className="rounded-full px-2 py-0.5 text-xs
                           border border-purple-500/40
                           bg-purple-500/10 text-purple-600
                           dark:border-purple-400/50
                           dark:bg-purple-400/20 dark:text-purple-200"
              >
                {typeof note.category === "string" ? note.category : note.category.name}
              </Badge>
            )}
          </div>
        </CardContent>

        <CardFooter className="justify-end gap-2 border-t pt-4">
          {/* Reactions Section */}
           <NoteReactions
                noteId={note.id}
                initialReactions={note.reactions || []}
                currentUserId={currentUserId}
            />

          {/* Detail View Button */}
          <Button
            size="icon"
            variant="ghost"
            onClick={handleDetailClick}
            title="View details"
          >
            <Eye className="h-4 w-4" />
          </Button>

          <Button
            size="icon"
            variant="ghost"
            onClick={handlePinClick}
            disabled={isPinning}
            className={isCurrentlyPinned ? "text-yellow-500 hover:text-yellow-600" : ""}
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
                <PinOff className="h-4 w-4" fill="currentColor" />
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
          >
            <Bookmark className="h-4 w-4" />
          </Button>

          <Button
            size="icon"
            variant="ghost"
            title="Share"
            onClick={(e) => e.stopPropagation()}
          >
            <UserPlus className="h-4 w-4" />
          </Button>

          <Button
            size="icon"
            variant="ghost"
            title="Comment"
            onClick={(e) => e.stopPropagation()}
          >
            <MessageSquare className="h-4 w-4" />
          </Button>

          <Button
            size="icon"
            variant="ghost"
            className="text-destructive hover:bg-red-50 dark:hover:bg-red-950"
            onClick={(e) => {
              e.stopPropagation()
              onDelete(note.id)
            }}
            title="Delete note"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}
