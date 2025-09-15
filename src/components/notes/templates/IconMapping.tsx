// components/IconMapping.tsx
'use client';

import React from 'react';
import { 
  FileText, 
  ListTodo, 
  Warehouse, 
  Calendar, 
  FileCheck,
  LucideIcon
} from 'lucide-react';

interface IconMappingProps {
  iconName: string;
  className?: string;
}

const iconComponents: Record<string, LucideIcon> = {
  FileText,
  ListTodo,
  Warehouse,
  Calendar,
  FileCheck
};

export default function IconMapping({ iconName, className = "h-5 w-5" }: IconMappingProps) {
  const IconComponent = iconComponents[iconName] || FileText;
  
  return <IconComponent className={className} />;
}