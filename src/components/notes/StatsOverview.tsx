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
  gradient: string;
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
      color: "text-blue-600 dark:text-blue-400",
      bg: "bg-blue-50 dark:bg-blue-900/30",
      gradient: "from-blue-500 to-indigo-500"
    },
    {
      title: "Categories",
      value: totalCategories,
      icon: FolderOpen,
      color: "text-purple-600 dark:text-purple-400",
      bg: "bg-purple-50 dark:bg-purple-900/30",
      gradient: "from-purple-500 to-fuchsia-500"
    },
    {
      title: "Pinned",
      value: pinnedNotes,
      icon: TrendingUp,
      color: "text-green-600 dark:text-green-400",
      bg: "bg-green-50 dark:bg-green-900/30",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      title: "Unique Tags",
      value: uniqueTags,
      icon: Tag,
      color: "text-orange-600 dark:text-orange-400",
      bg: "bg-orange-50 dark:bg-orange-900/30",
      gradient: "from-orange-500 to-amber-500"
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1, duration: 0.5 }}
          whileHover={{ y: -5, transition: { duration: 0.2 } }}
          className="relative group"
        >
          {/* Gradient background effect */}
          <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-2xl" 
               style={{ backgroundImage: `linear-gradient(to right, var(--tw-gradient-stops))`, 
                        // @ts-ignore - we're dynamically setting gradient colors
                        "--tw-gradient-from": `var(--color-${stat.gradient.split('-')[0]}-500)`, 
                        "--tw-gradient-to": `var(--color-${stat.gradient.split('-')[2]}-500)` }} />
          
          <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl overflow-hidden group-hover:shadow-2xl group-hover:scale-[1.02]">
            <CardContent className="p-5 lg:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs lg:text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">
                    {stat.title}
                  </p>
                  <p className="text-2xl lg:text-3xl font-bold text-slate-900 dark:text-white">
                    {stat.value}
                  </p>
                </div>
                <div className="relative">
                  {/* Icon background gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} rounded-xl opacity-20 group-hover:opacity-30 transition-opacity duration-300`}></div>
                  
                  {/* Icon container */}
                  <div className={`p-2 lg:p-3 rounded-xl ${stat.bg} relative z-10 backdrop-blur-sm`}>
                    <stat.icon className={`w-4 h-4 lg:w-5 lg:h-5 ${stat.color}`} />
                  </div>
                </div>
              </div>
              
              {/* Animated progress bar (decorative) */}
              <div className="mt-4 h-1 w-full bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                <motion.div 
                  className={`h-full bg-gradient-to-r ${stat.gradient} rounded-full`}
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(stat.value / notes.length * 300, 100)}%` }}
                  transition={{ delay: index * 0.1 + 0.3, duration: 1, ease: "easeOut" }}
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}