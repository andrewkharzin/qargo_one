'use client';

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Note, Bookmark, User } from "@/types/notes";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bookmark as BookmarkIcon,
  Heart,
  Loader2,
  Grid,
  List,
  Calendar,
  Tag,
  Sparkles
} from "lucide-react";
import { toast } from "sonner";

import SearchBar from "@/components/notes/SearchBar";
import NoteCard from "@/components/notes/NoteCard";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Toggle } from "@/components/ui/toggle";
import { Badge } from "@/components/ui/badge";

// Mock API functions since we don't have the actual implementations
const mockUserMe = async (): Promise<User> => {
  return {
    id: "user-1",
    email: "user@example.com",
    username: "currentuser",
    full_name: "Current User",
    avatar_url: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };
};

const mockBookmarkList = async (sort: string): Promise<Bookmark[]> => {
  return [
    {
      id: "bookmark-1",
      note_id: "note-1",
      created_by: "user@example.com",
      created_date: new Date().toISOString()
    },
    {
      id: "bookmark-2",
      note_id: "note-2",
      created_by: "user@example.com",
      created_date: new Date().toISOString()
    },
    {
      id: "bookmark-3",
      note_id: "note-3",
      created_by: "user@example.com",
      created_date: new Date().toISOString()
    },
    {
      id: "bookmark-4",
      note_id: "note-4",
      created_by: "user@example.com",
      created_date: new Date().toISOString()
    }
  ];
};

const mockNoteList = async (): Promise<Note[]> => {
  return [
    {
      id: "note-1",
      title: "Важные заметки о проекте",
      content: "Ключевые моменты для следующего релиза проекта и основные задачи команды разработчиков на следующие недели.",
      is_pinned: false,
      created_at: new Date('2023-10-15').toISOString(),
      updated_at: new Date('2023-10-15').toISOString(),
      author_id: "user-1",
      tags: ["проект", "работа", "важное"],
      word_count: 150
    },
    {
      id: "note-2",
      title: "Дизайн вдохновение",
      content: "Отличные примеры UI/UX дизайна для мобильных приложений, которые стоит изучить перед началом нового проекта.",
      is_pinned: true,
      created_at: new Date('2023-10-12').toISOString(),
      updated_at: new Date('2023-10-12').toISOString(),
      author_id: "user-1",
      tags: ["дизайн", "вдохновение", "UI/UX"],
      word_count: 200
    },
    {
      id: "note-3",
      title: "Идеи для нового функционала",
      content: "Потенциальные функции, которые можно добавить в приложение на основе feedback от пользователей.",
      is_pinned: false,
      created_at: new Date('2023-10-10').toISOString(),
      updated_at: new Date('2023-10-10').toISOString(),
      author_id: "user-1",
      tags: ["идеи", "фичи", "пользователи"],
      word_count: 180
    },
    {
      id: "note-4",
      title: "Конференция по разработке",
      content: "Основные тезисы и insights с конференции по веб-разработке, которые стоит внедрить в рабочий процесс.",
      is_pinned: false,
      created_at: new Date('2023-10-05').toISOString(),
      updated_at: new Date('2023-10-05').toISOString(),
      author_id: "user-1",
      tags: ["конференция", "разработка", "инсайты"],
      word_count: 220
    }
  ];
};

export default function BookmarksPage() {
  const [bookmarkedNotes, setBookmarkedNotes] = useState<Note[]>([]);
  const [filteredNotes, setFilteredNotes] = useState<Note[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const { theme } = useTheme();

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    // Filter notes logic
    let filtered = [...bookmarkedNotes];

    if (searchTerm) {
      filtered = filtered.filter(note =>
        note.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        note.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        note.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    setFilteredNotes(filtered);
  }, [bookmarkedNotes, searchTerm]);

  const loadData = async () => {
    setIsLoading(true);
    try {
      // Replace these with your actual API calls
      const [userData, bookmarks] = await Promise.all([
        mockUserMe(),
        mockBookmarkList("-created_date")
      ]);

      setCurrentUser(userData);

      // Get bookmarked notes
      const bookmarksByUser = bookmarks.filter(b => b.created_by === userData.email);
      const noteIds = bookmarksByUser.map(b => b.note_id);

      // Replace with your actual note fetching logic
      const allNotes = await mockNoteList();
      const notes = noteIds.map(noteId => allNotes.find(n => n.id === noteId)).filter(Boolean) as Note[];

      setBookmarkedNotes(notes);
    } catch (error) {
      console.error("Error loading bookmarks:", error);
      toast.error("Error loading bookmarks", {
        description: "Please try again later"
      });
    }
    setIsLoading(false);
  };

  const handleRefresh = () => {
    loadData();
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-blue-900/20">
      <div className="max-w-7xl mx-auto p-4 lg:p-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-4">
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 blur-2xl"></div>
            <h1 className="text-3xl lg:text-4xl font-bold text-slate-800 dark:text-white mb-2 flex items-center gap-3 relative">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg">
                <BookmarkIcon className="w-6 h-6 text-white" />
              </div>
              <span>My Bookmarks</span>
              <Sparkles className="h-5 w-5 text-yellow-400" />
            </h1>
            <p className="text-slate-600 dark:text-slate-400 relative">
              Your saved notes and favorites with premium organization
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button
              onClick={handleRefresh}
              variant="outline"
              size="sm"
              disabled={isLoading}
              className="bg-white/80 backdrop-blur-sm border-slate-200/60 dark:bg-slate-800/80 dark:border-slate-700 dark:text-slate-200"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
              ) : null}
              Refresh
            </Button>

            <div className="flex items-center bg-white/80 backdrop-blur-sm rounded-lg border border-slate-200/60 p-1 dark:bg-slate-800/80 dark:border-slate-700">
              <Toggle
                pressed={viewMode === 'grid'}
                onPressedChange={() => setViewMode('grid')}
                className="h-8 w-8 data-[state=on]:bg-blue-50 data-[state=on]:text-blue-600 dark:data-[state=on]:bg-blue-900/30 dark:data-[state=on]:text-blue-300"
              >
                <Grid className="h-4 w-4" />
              </Toggle>
              <Toggle
                pressed={viewMode === 'list'}
                onPressedChange={() => setViewMode('list')}
                className="h-8 w-8 data-[state=on]:bg-blue-50 data-[state=on]:text-blue-600 dark:data-[state=on]:bg-blue-900/30 dark:data-[state=on]:text-blue-300"
              >
                <List className="h-4 w-4" />
              </Toggle>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="mb-8 max-w-md">
          <SearchBar
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
          />
        </div>

        {/* Notes Grid/List */}
        <AnimatePresence mode="wait">
          {isLoading ? (
            <div className={viewMode === 'grid' ? "grid md:grid-cols-2 lg:grid-cols-3 gap-6" : "grid md:grid-cols-2 lg:grid-cols-3 gap-6"}>
              {Array.from({ length: 6 }).map((_, i) => (
                viewMode === 'grid' ? (
                  <Card key={i} className="overflow-hidden bg-white/80 backdrop-blur-sm border-0 shadow-lg dark:bg-slate-800/80 dark:border-slate-700/30">
                    <CardContent className="p-6">
                      <Skeleton className="h-6 w-3/4 mb-4 dark:bg-slate-700" />
                      <Skeleton className="h-4 w-full mb-2 dark:bg-slate-700" />
                      <Skeleton className="h-4 w-2/3 mb-4 dark:bg-slate-700" />
                      <div className="flex gap-2 mb-4">
                        <Skeleton className="h-6 w-16 rounded-full dark:bg-slate-700" />
                        <Skeleton className="h-6 w-20 rounded-full dark:bg-slate-700" />
                      </div>
                      <div className="flex justify-between">
                        <Skeleton className="h-8 w-8 rounded-full dark:bg-slate-700" />
                        <Skeleton className="h-8 w-8 rounded-full dark:bg-slate-700" />
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <Card key={i} className="bg-white/80 backdrop-blur-sm border-0 shadow-lg dark:bg-slate-800/80 dark:border-slate-700/30">
                    <CardContent className="p-4 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <Skeleton className="h-10 w-10 rounded-lg dark:bg-slate-700" />
                        <div>
                          <Skeleton className="h-5 w-40 mb-2 dark:bg-slate-700" />
                          <Skeleton className="h-4 w-24 dark:bg-slate-700" />
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Skeleton className="h-6 w-16 rounded-full dark:bg-slate-700" />
                        <Skeleton className="h-6 w-6 rounded-full dark:bg-slate-700" />
                      </div>
                    </CardContent>
                  </Card>
                )
              ))}
            </div>
          ) : filteredNotes.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16"
            >
              <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="w-12 h-12 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">No bookmarks yet</h3>
              <p className="text-slate-600 dark:text-slate-400">
                {searchTerm
                  ? "No bookmarks match your search"
                  : "Start bookmarking notes you love from the public wall"
                }
              </p>
            </motion.div>
          ) : viewMode === 'grid' ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredNotes.map((note) => (
                <NoteCard
                  key={note.id}
                  note={note}
                  onEdit={() => {}}
                  onPin={() => {}}
                  onDelete={() => {}}
                  currentUserId={currentUser?.id || ""}
                />
              ))}
            </div>
          ) : (
            <motion.div
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {filteredNotes.map((note) => (
                <motion.div
                  key={note.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  whileHover={{ y: -2 }}
                >
                  <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl overflow-hidden group dark:bg-slate-800/80 dark:border-slate-700/30">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30">
                            <BookmarkIcon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-slate-900 dark:text-white line-clamp-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                              {note.title}
                            </h3>
                            <div className="flex items-center gap-2 mt-1">
                              <Calendar className="h-3 w-3 text-slate-400 dark:text-slate-500" />
                              <span className="text-xs text-slate-500 dark:text-slate-400">
                                {formatDate(note.created_at)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 mt-3 flex-wrap">
                        {note.tags && note.tags.slice(0, 2).map((tag, index) => (
                          <Badge
                            key={index}
                            variant="outline"
                            className="bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-700/50 text-xs"
                          >
                            <Tag className="h-3 w-3 mr-1" />
                            {tag}
                          </Badge>
                        ))}
                        {note.tags && note.tags.length > 2 && (
                          <Badge
                            variant="outline"
                            className="bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-700/50 dark:text-slate-300 dark:border-slate-600 text-xs"
                          >
                            +{note.tags.length - 2}
                          </Badge>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
