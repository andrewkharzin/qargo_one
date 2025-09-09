"use client"

import * as React from "react"
import { format } from "date-fns"
import { motion } from "framer-motion"
import {
  Calendar,
  Type,
  Pin,
  Bookmark,
  UserPlus,
  MessageSquare,
  Trash2,
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

interface Note {
  id: string
  title?: string
  content: string
  is_pinned: boolean
  created_at: string
  updated_at: string
  category?: string
  color?: string
  tags?: string[]
  word_count?: number
}

interface NoteCardProps {
  note: Note
  onEdit: (note: Note) => void
  onPin: (noteId: string, isPinned: boolean) => void
  onDelete: (noteId: string) => void
  isNew?: boolean
}

export default function NoteCard({
  note,
  onEdit,
  onPin,
  onDelete,
  isNew = false,
}: NoteCardProps) {
  const stripHtml = (html: string): string => {
    const tmp = document.createElement("DIV")
    tmp.innerHTML = html
    return tmp.textContent || tmp.innerText || ""
  }

  const getPreviewText = (content: string): string => {
    const text = stripHtml(content)
    return text.length > 150 ? text.substring(0, 150) + "..." : text
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
      <Card
        className={`
          flex h-[300px] flex-col justify-between
          cursor-pointer transition-all duration-300
          ${isNew ? "ring-2 ring-accent/50 ring-offset-2" : ""}
        `}
        onClick={() => onEdit(note)}
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

          {/* ✅ Теги и категория */}
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
                {note.category}
              </Badge>
            )}
          </div>
        </CardContent>

        <CardFooter className="justify-end gap-2 border-t pt-4">
          <Button
            size="icon"
            variant="ghost"
            onClick={(e) => {
              e.stopPropagation()
              onPin(note.id, !note.is_pinned)
            }}
          >
            <Pin className="h-4 w-4" />
          </Button>
          <Button size="icon" variant="ghost">
            <Bookmark className="h-4 w-4" />
          </Button>
          <Button size="icon" variant="ghost">
            <UserPlus className="h-4 w-4" />
          </Button>
          <Button size="icon" variant="ghost">
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
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}
