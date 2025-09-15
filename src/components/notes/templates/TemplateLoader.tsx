'use client';

import React, { Suspense, useEffect, useState } from 'react';
import { TemplateType, getTemplateDefinition } from './registry';
import { Skeleton } from '@/components/ui/skeleton';

interface TemplateLoaderProps<T> {
  templateType: TemplateType;
  data: Partial<T>;
  onChange: (data: Partial<T>) => void;
  mode?: 'create' | 'edit' | 'view';
}

// Lazy load the template components
const WrhAptTemplate = React.lazy(() => import('./procedures/WrhApt'));
const TodoTemplate = React.lazy(() => import('./todos/ToDo'));

export default function TemplateLoader<T>({
  templateType,
  data,
  onChange,
  mode = 'create'
}: TemplateLoaderProps<T>) {
  const [TemplateComponent, setTemplateComponent] = useState<React.ComponentType<any> | null>(null);

  useEffect(() => {
    const loadTemplate = async () => {
      try {
        let Component;

        switch (templateType) {
          case 'wrh-apt':
            Component = WrhAptTemplate;
            break;
          case 'todo':
            Component = TodoTemplate;
            break;
          default:
            throw new Error(`Unknown template type: ${templateType}`);
        }

        setTemplateComponent(() => Component);
      } catch (error) {
        console.error('Failed to load template:', error);
      }
    };

    loadTemplate();
  }, [templateType]);

  if (!TemplateComponent) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-1/2" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-32 w-full" />
      </div>
    );
  }

  return (
    <Suspense fallback={
      <div className="space-y-4">
        <Skeleton className="h-8 w-1/2" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </div>
    }>
      <TemplateComponent data={data} onChange={onChange} mode={mode} />
    </Suspense>
  );
}
