import React from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

export default function SearchBar({ searchTerm, onSearchChange }: SearchBarProps) {
  return (
    <div className="relative">
      <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
      <Input
        type="text"
        placeholder="Search notes, tags, or content..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="pl-11 pr-4 py-2 bg-white/80 backdrop-blur-sm border-slate-200 focus:border-blue-500 focus:ring-blue-500 rounded-xl transition-all duration-200"
      />
    </div>
  );
}
