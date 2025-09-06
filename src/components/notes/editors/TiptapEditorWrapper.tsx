'use client';

import dynamic from 'next/dynamic';
import { Skeleton } from '@/components/ui/skeleton';

const TiptapEditor = dynamic(() => import('./TiptapEditor'), {
  ssr: false,
  loading: () => <Skeleton className="h-32 w-full" />,
});

export default TiptapEditor;
