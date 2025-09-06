import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Pin,
  PinOff,
  Edit3,
  Trash2,
  Calendar,
  Tag,
  Type
} from "lucide-react";
import { format } from "date-fns";

const colorThemes = {
  blue: "from-blue-500/10 to-blue-600/5 border-blue-200/50",
  purple: "from-purple-500/10 to-purple-600/5 border-purple-200/50",
  green: "from-green-500/10 to-green-600/5 border-green-200/50",
  yellow: "from-yellow-500/10 to-yellow-600/5 border-yellow-200/50",
  pink: "from-pink-500/10 to-pink-600/5 border-pink-200/50",
  gray: "from-gray-500/10 to-gray-600/5 border-gray-200/50"
} as const;

// Types
interface Note {
  id: string;
  title?: string;
  content: string;
  is_pinned: boolean;
  created_at: string;
  updated_at: string;
  category_id?: string;
  category?: string; // Только строка!
  color?: string;
  tags?: string[];
  is_public?: boolean;
  type?: string;
  priority?: number;
  urgency?: number;
  is_archived?: boolean;
  // Вычисляемые поля для UI
  word_count?: number;
}

interface NoteCardProps {
  note: Note;
  onEdit: (note: Note) => void;
  onPin: (noteId: string, isPinned: boolean) => void;
  onDelete: (noteId: string) => void;
}

export default function NoteCard({ note, onEdit, onPin, onDelete }: NoteCardProps) {
  const stripHtml = (html: string): string => {
    const tmp = document.createElement("DIV");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
  };

  const getPreviewText = (content: string): string => {
    const text = stripHtml(content);
    return text.length > 150 ? text.substring(0, 150) + "..." : text;
  };

  const themeClass = note.color ? colorThemes[note.color] : colorThemes.blue;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ y: -2 }}
      className="relative group"
    >
      <Card className={`bg-gradient-to-br ${themeClass} backdrop-blur-sm border shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer`}
           onClick={() => onEdit(note)}>
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                {note.is_pinned && (
                  <Pin className="w-4 h-4 text-blue-600 fill-current" />
                )}
                <h3 className="font-semibold text-slate-900 truncate">
                  {note.title || "Untitled Note"}
                </h3>
              </div>
              <div className="flex items-center gap-3 text-xs text-slate-500">
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {format(new Date(note.updated_at), "MMM d")}
                </div>
                {note.word_count && (
                  <div className="flex items-center gap-1">
                    <Type className="w-3 h-3" />
                    {note.word_count} words
                  </div>
                )}
              </div>
            </div>

            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <Button
                variant="ghost"
                size="icon"
                onClick={(e) => {
                  e.stopPropagation();
                  onPin(note.id, note.is_pinned);
                }}
                className="h-8 w-8 hover:bg-white/50"
              >
                {note.is_pinned ? (
                  <PinOff className="w-3 h-3" />
                ) : (
                  <Pin className="w-3 h-3" />
                )}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(note.id);
                }}
                className="h-8 w-8 hover:bg-red-50 hover:text-red-600"
              >
                <Trash2 className="w-3 h-3" />
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="pt-0 space-y-3">
          {note.content && (
            <p className="text-sm text-slate-600 leading-relaxed">
              {getPreviewText(note.content)}
            </p>
          )}

          {note.tags && note.tags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {note.tags.slice(0, 3).map((tag, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="text-xs px-2 py-0.5 bg-white/50 text-slate-600"
                >
                  <Tag className="w-2 h-2 mr-1" />
                  {tag}
                </Badge>
              ))}
              {note.tags.length > 3 && (
                <Badge variant="secondary" className="text-xs px-2 py-0.5 bg-white/50 text-slate-600">
                  +{note.tags.length - 3} more
                </Badge>
              )}
            </div>
          )}

          {note.category && (
            <div className="flex items-center gap-1">
              <Badge className="text-xs bg-blue-50 text-blue-700 border-blue-200">
                {note.category}
              </Badge>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
