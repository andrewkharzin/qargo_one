"use client";

import * as React from "react";
import { format } from "date-fns";
import {
  Calendar,
  Type,
  Pin,
  Bookmark,
  UserPlus,
  MessageSquare,
  Trash2,
  Edit3,
} from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Category, Note } from '@/types/notes';

// interface Note {
//   id: string;
//   title?: string;
//   content: string;
//   is_pinned: boolean;
//   created_at: string;
//   updated_at: string;
//   category?: string;
//   color?: string;
//   tags?: string[];
//   word_count?: number;
// }

interface NoteDetailsProps {
  note: Note | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onEdit: (note: Note) => void;
  onPin: (noteId: string, isPinned: boolean) => void;
  onDelete: (noteId: string) => void;
}

export default function NoteDetails({
  note,
  open,
  onOpenChange,
  onEdit,
  onPin,
  onDelete,
}: NoteDetailsProps) {
  const stripHtml = (html: string): string => {
    if (typeof document === "undefined") return html.replace(/<[^>]*>/g, "");
    const tmp = document.createElement("DIV");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
  };

  if (!note) return null;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-lg overflow-y-auto px-4">
        <SheetHeader className="mb-6">
          <div className="flex items-center justify-between">
            <SheetTitle className="text-2xl font-bold px-2">
              {note.title || "Untitled Note"}
            </SheetTitle>
            <Button
              size="icon"
              variant="outline"
              onClick={() => onEdit(note)}
              className="h-8 w-8"
            >
              <Edit3 className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex items-center gap-4 text-sm text-muted-foreground ml-2">
            <span className="flex items-center gap-1 text-xs">
              <Calendar className="h-3 w-3" />
              Created: {format(new Date(note.created_at), "MMM d, yyyy")}
            </span>
            <span className="flex items-center gap-1 text-xs">
              <Calendar className="h-3 w-3" />
              Updated: {format(new Date(note.updated_at), "MMM d, yyyy")}
            </span>
            {note.word_count && (
              <span className="flex items-center gap-1 uppercase  tex-xs text-slate-800">
                {note.word_count} words
              </span>
            )}
          </div>
        </SheetHeader>

        <div className="space-y-6">
          {/* Tags and Category */}
          <div className="flex flex-wrap gap-2">
            {note.tags?.map((tag, i) => (
              <Badge
                key={i}
                variant="secondary"
                className="rounded-full px-2 py-0.5 text-xs bg-blue-500/20 text-blue-700"
              >
                {tag}
              </Badge>
            ))}

            {note.category && (
              <Badge className="rounded-full px-2 py-0.5 text-xs border border-purple-500/40 bg-purple-500/10 text-purple-600">
                {typeof note.category === "string" ? note.category : note.category.name}
              </Badge>
            )}
          </div>

          {/* Content */}
          <div className="prose prose-sm max-w-none">
            <div
              dangerouslySetInnerHTML={{ __html: note.content }}
              className="text-sm text-muted-foreground"
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-2 pt-4 border-t">
            <Button
              size="icon"
              variant="ghost"
              onClick={() => onPin(note.id, !note.is_pinned)}
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
              className="text-destructive hover:bg-red-50"
              onClick={() => onDelete(note.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
