"use client"

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Plus,
  Edit3,
  Trash2,
  FolderOpen,
  FileText,
  BookOpen,
  Briefcase,
  Heart,
  Star,
  Music,
  Camera,
  Coffee,
  Lightbulb,
  Cpu,
  LucideIcon
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Import your server actions
import { getNoteCategories, createCategory, updateCategory, deleteCategory } from "@/actions/notes/categories";
import { getNotes } from "@/actions/notes";

// Types based on your Supabase schema
interface NoteCategory {
  id: string;
  name: string;
  description?: string;
  color?: string;
  icon?: string;
  owner_id?: string;
  created_at?: string;
  updated_at?: string;
}

interface Note {
  id: string;
  title?: string;
  content: string;
  category?: string;
  category_id?: string;
  is_pinned: boolean;
  created_at: string;
  updated_at: string;
}

interface ColorOption {
  value: string;
  label: string;
  class: string;
}

interface CategoryFormData {
  name: string;
  description: string;
  color: string;
  icon: string;
}

const colorOptions: ColorOption[] = [
  { value: "blue", label: "Blue", class: "bg-blue-500" },
  { value: "purple", label: "Purple", class: "bg-purple-500" },
  { value: "green", label: "Green", class: "bg-green-500" },
  { value: "yellow", label: "Yellow", class: "bg-yellow-500" },
  { value: "pink", label: "Pink", class: "bg-pink-500" },
  { value: "gray", label: "Gray", class: "bg-gray-500" }
];

const iconOptions: string[] = [
  "FolderOpen", "FileText", "BookOpen", "Briefcase", "Heart",
  "Star", "Music", "Camera", "Coffee", "Lightbulb", "Cpu"
];

const iconComponents: Record<string, LucideIcon> = {
  FolderOpen, FileText, BookOpen, Briefcase, Heart,
  Star, Music, Camera, Coffee, Lightbulb, Cpu
};

export default function CategoriesPage() {
  const [categories, setCategories] = useState<NoteCategory[]>([]);
  const [notes, setNotes] = useState<Note[]>([]);
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const [editingCategory, setEditingCategory] = useState<NoteCategory | null>(null);
  const [formData, setFormData] = useState<CategoryFormData>({
    name: "",
    description: "",
    color: "blue",
    icon: "FolderOpen"
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSaving, setIsSaving] = useState<boolean>(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async (): Promise<void> => {
    setIsLoading(true);
    try {
      const [categoriesResponse, notesResponse] = await Promise.all([
        getNoteCategories(),
        getNotes()
      ]);

      if (categoriesResponse.error) {
        console.error("Error loading categories:", categoriesResponse.error);
      } else {
        setCategories(categoriesResponse.categories || []);
      }

      if (notesResponse.error) {
        console.error("Error loading notes:", notesResponse.error);
      } else {
        setNotes(notesResponse.notes || []);
      }
    } catch (error) {
      console.error("Error loading data:", error);
    }
    setIsLoading(false);
  };

  const getCategoryStats = (categoryName: string): number => {
    return notes.filter(note => note.category === categoryName).length;
  };

  const handleCreateCategory = (): void => {
    setEditingCategory(null);
    setFormData({
      name: "",
      description: "",
      color: "blue",
      icon: "FolderOpen"
    });
    setShowDialog(true);
  };

  const handleEditCategory = (category: NoteCategory): void => {
    setEditingCategory(category);
    setFormData({
      name: category.name,
      description: category.description || "",
      color: category.color || "blue",
      icon: category.icon || "FolderOpen"
    });
    setShowDialog(true);
  };

  const handleSaveCategory = async (): Promise<void> => {
    if (!formData.name.trim()) return;

    setIsSaving(true);
    try {
      if (editingCategory) {
        const { error } = await updateCategory(editingCategory.id, {
            name: formData.name,
            color: formData.color,
            description: formData.description,
            icon: formData.icon // Теперь можно передавать icon
        });
        if (error) throw new Error(error);
        } else {
        const { error } = await createCategory(
            formData.name,
            formData.color,
            formData.description,
            formData.icon // Теперь можно передавать icon
        );
        if (error) throw new Error(error);
        }
      setShowDialog(false);
      await loadData(); // Reload data after saving
    } catch (error) {
      console.error("Error saving category:", error);
      alert(error instanceof Error ? error.message : "Failed to save category");
    }
    setIsSaving(false);
  };

  const handleDeleteCategory = async (categoryId: string, categoryName: string): Promise<void> => {
    const notesInCategory = getCategoryStats(categoryName);

    if (notesInCategory > 0) {
      if (!window.confirm(`This category contains ${notesInCategory} notes. These notes will become uncategorized. Continue?`)) {
        return;
      }
    }

    if (window.confirm("Are you sure you want to delete this category?")) {
      try {
        const { error } = await deleteCategory(categoryId);
        if (error) throw new Error(error);
        await loadData(); // Reload data after deletion
      } catch (error) {
        console.error("Error deleting category:", error);
        alert(error instanceof Error ? error.message : "Failed to delete category");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20">
      <div className="max-w-6xl mx-auto p-4 lg:p-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-2">
              Categories
            </h1>
            <p className="text-slate-600">Organize your notes with smart categories</p>
          </div>
          <Button
            onClick={handleCreateCategory}
            className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 group"
          >
            <Plus className="w-4 h-4 mr-2 group-hover:rotate-90 transition-transform duration-200" />
            New Category
          </Button>
        </div>

        {/* Categories Grid */}
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
          ) : categories.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16"
            >
              <div className="w-24 h-24 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <FolderOpen className="w-12 h-12 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">No categories yet</h3>
              <p className="text-slate-600 mb-6">Create categories to organize your notes better</p>
              <Button
                onClick={handleCreateCategory}
                className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
              >
                <Plus className="w-4 h-4 mr-2" />
                Create Your First Category
              </Button>
            </motion.div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((category) => {
                const IconComponent = iconComponents[category.icon || "FolderOpen"] || FolderOpen;
                const noteCount = getCategoryStats(category.name);

                return (
                  <motion.div
                    key={category.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                  >
                    <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                              colorOptions.find(c => c.value === category.color)?.class || "bg-blue-500"
                            }`}>
                              <IconComponent className="w-6 h-6 text-white" />
                            </div>
                            <div>
                              <CardTitle className="text-lg font-semibold text-slate-900">
                                {category.name}
                              </CardTitle>
                              <div className="flex items-center gap-2 mt-1">
                                <Badge variant="secondary" className="text-xs">
                                  <FileText className="w-3 h-3 mr-1" />
                                  {noteCount} notes
                                </Badge>
                              </div>
                            </div>
                          </div>
                          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleEditCategory(category)}
                              className="h-8 w-8 hover:bg-slate-100"
                            >
                              <Edit3 className="w-3 h-3" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleDeleteCategory(category.id, category.name)}
                              className="h-8 w-8 hover:bg-red-50 hover:text-red-600"
                            >
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                      </CardHeader>
                      {category.description && (
                        <CardContent className="pt-0">
                          <p className="text-sm text-slate-600 leading-relaxed">
                            {category.description}
                          </p>
                        </CardContent>
                      )}
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          )}
        </AnimatePresence>

        {/* Create/Edit Dialog */}
        <Dialog open={showDialog} onOpenChange={setShowDialog}>
          <DialogContent className="sm:max-w-lg bg-white border-0 shadow-2xl rounded-3xl p-0 overflow-hidden">
            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 px-8 py-6">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold text-white">
                  {editingCategory ? "✨ Edit Category" : "🎨 Create New Category"}
                </DialogTitle>
                <p className="text-purple-100 mt-2 text-sm">
                  {editingCategory ? "Update your category settings" : "Organize your notes with a beautiful category"}
                </p>
              </DialogHeader>
            </div>

            <div className="px-8 py-6 bg-white">
              <div className="space-y-6">
                <div>
                  <label className="text-base font-semibold text-slate-800 block mb-3 flex items-center gap-2">
                    <span>Category Name</span>
                    <span className="text-red-500">*</span>
                  </label>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="e.g., Work, Personal, Ideas..."
                    className="w-full h-12 text-base border-2 border-slate-200 rounded-xl focus:border-purple-500 focus:ring-purple-500 bg-slate-50 transition-all duration-300"
                  />
                </div>

                <div>
                  <label className="text-base font-semibold text-slate-800 block mb-3">
                    Description
                  </label>
                  <Textarea
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    placeholder="Brief description of this category..."
                    className="w-full h-24 text-base border-2 border-slate-200 rounded-xl focus:border-purple-500 focus:ring-purple-500 bg-slate-50 resize-none transition-all duration-300"
                  />
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="text-base font-semibold text-slate-800 block mb-3">
                      Color Theme
                    </label>
                    <Select
                      value={formData.color}
                      onValueChange={(value: string) => setFormData({...formData, color: value})}
                    >
                      <SelectTrigger className="h-12 border-2 border-slate-200 rounded-xl focus:border-purple-500 bg-slate-50 text-base">
                        <SelectValue placeholder="Select color..." />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl border-2 border-slate-200 bg-white shadow-xl">
                        {colorOptions.map((color) => (
                          <SelectItem key={color.value} value={color.value} className="py-3 px-4 rounded-lg">
                            <div className="flex items-center gap-3">
                              <div className={`w-5 h-5 rounded-full ${color.class} shadow-sm`}></div>
                              <span className="font-medium">{color.label}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-base font-semibold text-slate-800 block mb-3">
                      Icon
                    </label>
                    <Select
                      value={formData.icon}
                      onValueChange={(value: string) => setFormData({...formData, icon: value})}
                    >
                      <SelectTrigger className="h-12 border-2 border-slate-200 rounded-xl focus:border-purple-500 bg-slate-50 text-base">
                        <SelectValue placeholder="Select icon..." />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl border-2 border-slate-200 bg-white shadow-xl max-h-72">
                        {iconOptions.map((iconName) => {
                          const IconComponent = iconComponents[iconName];
                          return (
                            <SelectItem key={iconName} value={iconName} className="py-3 px-4 rounded-lg">
                              <div className="flex items-center gap-3">
                                {IconComponent && <IconComponent className="w-5 h-5 text-slate-600" />}
                                <span className="font-medium">{iconName}</span>
                              </div>
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Preview */}
                <div className="bg-gradient-to-r from-slate-50 to-blue-50 rounded-2xl p-4 border border-slate-200">
                  <label className="text-base font-semibold text-slate-800 block mb-3">
                    Preview
                  </label>
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-lg ${
                      colorOptions.find(c => c.value === formData.color)?.class || "bg-blue-500"
                    }`}>
                      {React.createElement(iconComponents[formData.icon] || FolderOpen, {
                        className: "w-6 h-6 text-white"
                      })}
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900 text-lg">
                        {formData.name || "Category Name"}
                      </div>
                      <div className="text-sm text-slate-600">
                        {formData.description || "Category description"}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 pt-6 border-t border-slate-100">
                  <Button
                    variant="outline"
                    onClick={() => setShowDialog(false)}
                    className="flex-1 h-12 text-base font-medium border-2 border-slate-200 hover:border-slate-300 hover:bg-slate-50 rounded-xl transition-all duration-300"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleSaveCategory}
                    disabled={!formData.name.trim() || isSaving}
                    className="flex-1 h-12 text-base font-semibold bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl rounded-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSaving ? (
                      <>⏳ Saving...</>
                    ) : editingCategory ? (
                      <>✅ Update Category</>
                    ) : (
                      <>🎉 Create Category</>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
