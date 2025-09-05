import React, { useState, useEffect } from "react";
import { Note as NoteEntity, Category as CategoryEntity } from "@/entities/all";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Plus,
  Search,
  Filter,
  Pin,
  PinOff,
  Sparkles,
  Edit3,
  Calendar,
  Tag,
  Trash2
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

import SearchBar from "../components/notes/SearchBar";
import CategoryFilter from "../components/notes/CategoryFilter";
import NoteCard from "../components/notes/NoteCard";
import NoteEditor from "../components/notes/NoteEditor";
import StatsOverview from "../components/notes/StatsOverview";

interface Note {
  id: string;
  title: string;
  content: string;
  category: string;
  tags?: string[];
  is_pinned: boolean;
  created_date: string;
  updated_date: string;
}

interface Category {
  id: string;
  name: string;
  color?: string;
}

export default function NotesPage() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [filteredNotes, setFilteredNotes] = useState<Note[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [showEditor, setShowEditor] = useState<boolean>(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [sortBy, setSortBy] = useState<string>("updated");

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    // Filter notes logic moved directly into useEffect
    let filtered = [...notes];

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(note =>
        note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        note.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        note.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter(note => note.category === selectedCategory);
    }

    // Sort notes
    filtered.sort((a, b) => {
      if (a.is_pinned && !b.is_pinned) return -1;
      if (!a.is_pinned && b.is_pinned) return 1;

      switch (sortBy) {
        case "created":
          return new Date(b.created_date).getTime() - new Date(a.created_date).getTime();
        case "title":
          return a.title.localeCompare(b.title);
        case "updated":
        default:
          return new Date(b.updated_date).getTime() - new Date(a.updated_date).getTime();
      }
    });

    setFilteredNotes(filtered);
  }, [notes, searchTerm, selectedCategory, sortBy]);

  const loadData = async (): Promise<void> => {
    setIsLoading(true);
    try {
      const [notesData, categoriesData] = await Promise.all([
        NoteEntity.list("-updated_date"),
        CategoryEntity.list()
      ]);
      setNotes(notesData);
      setCategories(categoriesData);
    } catch (error) {
      console.error("Error loading data:", error);
    }
    setIsLoading(false);
  };

  const handleCreateNote = (): void => {
    setEditingNote(null);
    setShowEditor(true);
  };

  const handleEditNote = (note: Note): void => {
    setEditingNote(note);
    setShowEditor(true);
  };

  const handleSaveNote = async (noteData: Partial<Note>): Promise<void> => {
    try {
      if (editingNote) {
        await NoteEntity.update(editingNote.id, noteData);
      } else {
        await NoteEntity.create(noteData);
      }
      setShowEditor(false);
      setEditingNote(null);
      loadData();
    } catch (error) {
      console.error("Error saving note:", error);
    }
  };

  const handlePinNote = async (noteId: string, isPinned: boolean): Promise<void> => {
    try {
      await NoteEntity.update(noteId, { is_pinned: !isPinned });
      loadData();
    } catch (error) {
      console.error("Error pinning note:", error);
    }
  };

  const handleDeleteNote = async (noteId: string): Promise<void> => {
    if (window.confirm("Are you sure you want to delete this note?")) {
      try {
        await NoteEntity.delete(noteId);
        loadData();
      } catch (error) {
        console.error("Error deleting note:", error);
      }
    }
  };

  if (showEditor) {
    return (
      <NoteEditor
        note={editingNote}
        categories={categories}
        onSave={handleSaveNote}
        onCancel={() => {
          setShowEditor(false);
          setEditingNote(null);
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20">
      <div className="max-w-7xl mx-auto p-4 lg:p-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-2">
              Your Notes
            </h1>
            <p className="text-slate-600">Capture your thoughts with AI-powered organization</p>
          </div>
          <Button
            onClick={handleCreateNote}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 group"
          >
            <Plus className="w-4 h-4 mr-2 group-hover:rotate-90 transition-transform duration-200" />
            New Note
          </Button>
        </div>

        {/* Stats Overview */}
        <StatsOverview notes={notes} categories={categories} />

        {/* Search and Filters */}
        <div className="grid lg:grid-cols-4 gap-4 mb-8">
          <div className="lg:col-span-2">
            <SearchBar
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
            />
          </div>
          <div>
            <CategoryFilter
              categories={categories}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
            />
          </div>
          <div>
            <select
              className="w-full px-4 py-2 border border-slate-200 rounded-xl bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="updated">Recently Updated</option>
              <option value="created">Recently Created</option>
              <option value="title">Alphabetical</option>
            </select>
          </div>
        </div>

        {/* Notes Grid */}
        <AnimatePresence mode="wait">
          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array(6).fill(0).map((_, i) => (
                <div key={i} className="bg-white/80 rounded-2xl p-6 animate-pulse">
                  <div className="h-4 bg-slate-200 rounded mb-3"></div>
                  <div className="h-3 bg-slate-200 rounded mb-2"></div>
                  <div className="h-3 bg-slate-200 rounded w-3/4"></div>
                </div>
              ))}
            </div>
          ) : filteredNotes.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16"
            >
              <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Edit3 className="w-12 h-12 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">No notes found</h3>
              <p className="text-slate-600 mb-6">
                {searchTerm || selectedCategory !== "all"
                  ? "Try adjusting your search or filters"
                  : "Start writing your first note with AI assistance"
                }
              </p>
              {!searchTerm && selectedCategory === "all" && (
                <Button onClick={handleCreateNote} className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Your First Note
                </Button>
              )}
            </motion.div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredNotes.map((note) => (
                <NoteCard
                  key={note.id}
                  note={note}
                  onEdit={handleEditNote}
                  onPin={handlePinNote}
                  onDelete={handleDeleteNote}
                />
              ))}
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}