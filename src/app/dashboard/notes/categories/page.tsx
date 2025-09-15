"use client";

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
  LucideIcon,
  Home,
  Folder,
  ArrowLeft,
  Sparkles,
  Loader2
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
import { Breadcrumb } from '@/components/ui/reuse/Breadcrumb';
import { toast } from "sonner";
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
  darkClass: string;
}

interface CategoryFormData {
  name: string;
  description: string;
  color: string;
  icon: string;
}

const colorOptions: ColorOption[] = [
  { value: "blue", label: "Blue", class: "bg-blue-500", darkClass: "bg-blue-600" },
  { value: "purple", label: "Purple", class: "bg-purple-500", darkClass: "bg-purple-600" },
  { value: "green", label: "Green", class: "bg-green-500", darkClass: "bg-green-600" },
  { value: "yellow", label: "Yellow", class: "bg-yellow-500", darkClass: "bg-yellow-600" },
  { value: "pink", label: "Pink", class: "bg-pink-500", darkClass: "bg-pink-600" },
  { value: "gray", label: "Gray", class: "bg-gray-500", darkClass: "bg-gray-600" }
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
        toast.error("Error loading categories", {
          description: "Please try again later"
        });
      } else {
        setCategories(categoriesResponse.categories || []);
      }

      if (notesResponse.error) {
        console.error("Error loading notes:", notesResponse.error);
        toast.error("Error loading notes", {
          description: "Please try again later"
        });
      } else {
        setNotes(notesResponse.notes || []);
      }
    } catch (error) {
      console.error("Error loading data:", error);
      toast.error("Error loading data", {
        description: "Please try again later"
      });
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
            icon: formData.icon
        });
        if (error) throw new Error(error);
        } else {
        const { error } = await createCategory(
            formData.name,
            formData.color,
            formData.description,
            formData.icon
        );
        if (error) throw new Error(error);
        }
      setShowDialog(false);
      await loadData();
      toast.success(editingCategory ? "Category updated" : "Category created", {
        description: `${formData.name} has been ${editingCategory ? 'updated' : 'created'} successfully`
      });
    } catch (error) {
      console.error("Error saving category:", error);
      toast.error("Error saving category", {
        description: error instanceof Error ? error.message : "Please try again later"
      });
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
        await loadData();
        toast.success("Category deleted", {
          description: `${categoryName} has been deleted successfully`
        });
      } catch (error) {
        console.error("Error deleting category:", error);
        toast.error("Error deleting category", {
          description: error instanceof Error ? error.message : "Please try again later"
        });
      }
    }
  };

  // Breadcrumb items
  const breadcrumbItems = [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Categories', href: '/dashboard/categories', isCurrent: true }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-purple-900/20">
      <div className="max-w-7xl mx-auto p-4 lg:p-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-4">
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-purple-500/10 to-indigo-500/10 blur-2xl"></div>
            <h1 className="text-3xl lg:text-4xl font-bold text-slate-800 dark:text-white mb-2 flex items-center gap-3 relative">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 shadow-lg">
                <Folder className="w-6 h-6 text-white" />
              </div>
              <span>Categories</span>
              <Sparkles className="h-5 w-5 text-yellow-400" />
            </h1>
            <p className="text-slate-600 dark:text-slate-400 relative">
              Organize your notes with beautiful categories
            </p>
          </div>

          <Button
            onClick={handleCreateCategory}
            className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 group relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            <Plus className="w-4 h-4 mr-2 group-hover:rotate-90 transition-transform duration-200" />
            New Category
          </Button>
        </div>

        {/* Categories Grid */}
        <div className="mt-6">
          <AnimatePresence mode="wait">
            {isLoading ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, i) => (
                  <Card key={i} className="overflow-hidden bg-white/80 backdrop-blur-sm border-0 shadow-lg dark:bg-slate-800/80 dark:border-slate-700/30">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="h-12 w-12 bg-slate-200 dark:bg-slate-700 rounded-xl animate-pulse"></div>
                        <div className="space-y-2 flex-1">
                          <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-3/4"></div>
                          <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-1/2"></div>
                        </div>
                      </div>
                      <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded mb-2"></div>
                      <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-2/3"></div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : categories.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-16"
              >
                <div className="w-24 h-24 bg-gradient-to-br from-purple-100 to-indigo-100 dark:from-purple-900/30 dark:to-indigo-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                  <FolderOpen className="w-12 h-12 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">No categories yet</h3>
                <p className="text-slate-600 dark:text-slate-400 mb-6">Create categories to organize your notes better</p>
                <Button
                  onClick={handleCreateCategory}
                  className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl"
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
                  const colorOption = colorOptions.find(c => c.value === category.color) || colorOptions[0];

                  return (
                    <motion.div
                      key={category.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      whileHover={{ y: -5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 group dark:bg-slate-800/80 dark:border-slate-700/30 rounded-2xl overflow-hidden">
                        <CardHeader className="pb-3">
                          <div className="flex items-start justify-between">
                            <div className="flex items-center gap-3">
                              <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-lg ${colorOption.class}`}>
                                <IconComponent className="w-6 h-6 text-white" />
                              </div>
                              <div>
                                <CardTitle className="text-md font-semibold text-slate-900 dark:text-white">
                                  {category.name}
                                </CardTitle>
                                <div className="flex items-center gap-2 mt-1">
                                  <Badge variant="secondary" className="text-xs bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-700/50">
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
                                className="h-8 w-8 hover:bg-slate-100 dark:hover:bg-slate-700/50"
                              >
                                <Edit3 className="w-3 h-3" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleDeleteCategory(category.id, category.name)}
                                className="h-8 w-8 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/30 dark:hover:text-red-400"
                              >
                                <Trash2 className="w-3 h-3" />
                              </Button>
                            </div>
                          </div>
                        </CardHeader>
                        {category.description && (
                          <CardContent className="pt-0">
                            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
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
        </div>

        {/* Create/Edit Dialog */}
        <Dialog open={showDialog} onOpenChange={setShowDialog}>
          <DialogContent className="sm:max-w-lg bg-white/90 backdrop-blur-md dark:bg-slate-900/90 border-0 shadow-2xl rounded-3xl p-0 overflow-hidden">
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

            <div className="px-8 py-6 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
              <div className="space-y-6">
                <div>
                  <label className="text-base font-semibold text-slate-800 dark:text-slate-200 block mb-3 flex items-center gap-2">
                    <span>Category Name</span>
                    <span className="text-red-500">*</span>
                  </label>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="e.g., Work, Personal, Ideas..."
                    className="w-full h-12 text-base border-2 border-slate-200 dark:border-slate-700 rounded-xl focus:border-purple-500 focus:ring-purple-500 bg-white/50 dark:bg-slate-800/50 dark:text-white transition-all duration-300"
                  />
                </div>

                <div>
                  <label className="text-base font-semibold text-slate-800 dark:text-slate-200 block mb-3">
                    Description
                  </label>
                  <Textarea
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    placeholder="Brief description of this category..."
                    className="w-full h-24 text-base border-2 border-slate-200 dark:border-slate-700 rounded-xl focus:border-purple-500 focus:ring-purple-500 bg-white/50 dark:bg-slate-800/50 dark:text-white resize-none transition-all duration-300"
                  />
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="text-base font-semibold text-slate-800 dark:text-slate-200 block mb-3">
                      Color Theme
                    </label>
                    <Select
                      value={formData.color}
                      onValueChange={(value: string) => setFormData({...formData, color: value})}
                    >
                      <SelectTrigger className="h-12 border-2 border-slate-200 dark:border-slate-700 rounded-xl focus:border-purple-500 bg-white/50 dark:bg-slate-800/50 dark:text-white text-base">
                        <SelectValue placeholder="Select color..." />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-white/90 dark:bg-slate-800/90 backdrop-blur-md shadow-xl">
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
                    <label className="text-base font-semibold text-slate-800 dark:text-slate-200 block mb-3">
                      Icon
                    </label>
                    <Select
                      value={formData.icon}
                      onValueChange={(value: string) => setFormData({...formData, icon: value})}
                    >
                      <SelectTrigger className="h-12 border-2 border-slate-200 dark:border-slate-700 rounded-xl focus:border-purple-500 bg-white/50 dark:bg-slate-800/50 dark:text-white text-base">
                        <SelectValue placeholder="Select icon..." />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-white/90 dark:bg-slate-800/90 backdrop-blur-md shadow-xl max-h-72">
                        {iconOptions.map((iconName) => {
                          const IconComponent = iconComponents[iconName];
                          return (
                            <SelectItem key={iconName} value={iconName} className="py-3 px-4 rounded-lg">
                              <div className="flex items-center gap-3">
                                {IconComponent && <IconComponent className="w-5 h-5 text-slate-600 dark:text-slate-400" />}
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
                <div className="bg-gradient-to-r from-slate-50 to-purple-50 dark:from-slate-800 dark:to-slate-700 rounded-2xl p-4 border border-slate-200 dark:border-slate-600">
                  <label className="text-base font-semibold text-slate-800 dark:text-slate-200 block mb-3">
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
                      <div className="font-semibold text-slate-900 dark:text-white text-lg">
                        {formData.name || "Category Name"}
                      </div>
                      <div className="text-sm text-slate-600 dark:text-slate-400">
                        {formData.description || "Category description"}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 pt-6 border-t border-slate-200 dark:border-slate-700">
                  <Button
                    variant="outline"
                    onClick={() => setShowDialog(false)}
                    className="flex-1 h-12 text-base font-medium border-2 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl transition-all duration-300"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleSaveCategory}
                    disabled={!formData.name.trim() || isSaving}
                    className="flex-1 h-12 text-base font-semibold bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl rounded-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSaving ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Saving...
                      </>
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