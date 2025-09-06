import React from 'react';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

import { FolderOpen } from 'lucide-react';

interface Category {
    id: string;
    name: string;
}

interface CategoryFilterProps {
    categories: Category[];
    selectedCategory: string;
    onCategoryChange: (value: string) => void;
}

export default function CategoryFilter({ categories, selectedCategory, onCategoryChange }: CategoryFilterProps) {
    return (
        <Select value={selectedCategory} onValueChange={onCategoryChange}>
            <SelectTrigger className='rounded-xl border-slate-200 bg-white/80 backdrop-blur-sm focus:border-blue-500 focus:ring-blue-500'>
                <div className='flex items-center gap-2'>
                    <FolderOpen className='h-4 w-4 text-slate-500' />
                    <SelectValue placeholder='All Categories' />
                </div>
            </SelectTrigger>
            <SelectContent position='popper'>
                <SelectItem value='all'>All Categories</SelectItem>
                {categories.map((category) => (
                    <SelectItem key={category.id} value={category.name}>
                        {category.name}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
}
