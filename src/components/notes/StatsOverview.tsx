import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import {
  FileText,
  FolderOpen,
  Tag,
  TrendingUp,
  LucideIcon
} from "lucide-react";

interface Note {
  is_pinned: boolean;
  tags?: string[];
}

interface Category {
  id: string;
  name: string;
}

interface StatItem {
  title: string;
  value: number;
  icon: LucideIcon;
  color: string;
  bg: string;
}

interface StatsOverviewProps {
  notes: Note[];
  categories: Category[];
}

export default function StatsOverview({ notes, categories }: StatsOverviewProps) {
  const totalNotes = notes.length;
  const totalCategories = categories.length;
  const pinnedNotes = notes.filter(note => note.is_pinned).length;
  const allTags = notes.flatMap(note => note.tags || []);
  const uniqueTags = [...new Set(allTags)].length;

  const stats: StatItem[] = [
    {
      title: "Total Notes",
      value: totalNotes,
      icon: FileText,
      color: "text-blue-600",
      bg: "bg-blue-50"
    },
    {
      title: "Categories",
      value: totalCategories,
      icon: FolderOpen,
      color: "text-purple-600",
      bg: "bg-purple-50"
    },
    {
      title: "Pinned",
      value: pinnedNotes,
      icon: TrendingUp,
      color: "text-green-600",
      bg: "bg-green-50"
    },
    {
      title: "Unique Tags",
      value: uniqueTags,
      icon: Tag,
      color: "text-orange-600",
      bg: "bg-orange-50"
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-4 lg:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs lg:text-sm font-medium text-slate-600">
                    {stat.title}
                  </p>
                  <p className="text-xl lg:text-2xl font-bold text-slate-900 mt-1">
                    {stat.value}
                  </p>
                </div>
                <div className={`p-2 lg:p-3 rounded-xl ${stat.bg}`}>
                  <stat.icon className={`w-4 h-4 lg:w-5 lg:h-5 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
