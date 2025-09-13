'use client';

import React from 'react';
import Link from 'next/link';
import { SlashIcon } from 'lucide-react';
import {
  Breadcrumb as BreadcrumbPrimitive,
  BreadcrumbItem as BreadcrumbItemPrimitive,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

export interface BreadcrumbItem {
  label: string;
  href: string;
  isCurrent?: boolean;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  if (!items || items.length === 0) return null;

  return (
    <div className="px-6 py-3 border-b border-slate-200/50 dark:border-slate-700/50 bg-white/60 dark:bg-slate-900/60 backdrop-blur-md">
      <BreadcrumbPrimitive>
        <BreadcrumbList className="flex items-center gap-2 md:gap-3 text-sm md:text-base">
          {items.map((item, index) => (
            <React.Fragment key={index}>
              <BreadcrumbItemPrimitive>
                {item.isCurrent ? (
                  <BreadcrumbPage className="text-slate-800 dark:text-slate-100 font-semibold">
                    {item.label}
                  </BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link
                      href={item.href}
                      className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium"
                    >
                      {item.label}
                    </Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItemPrimitive>
              {index < items.length - 1 && (
                <BreadcrumbSeparator>
                  <SlashIcon className="w-3 h-3 text-slate-400 dark:text-slate-500" />
                </BreadcrumbSeparator>
              )}
            </React.Fragment>
          ))}
        </BreadcrumbList>
      </BreadcrumbPrimitive>
    </div>
  );
}
