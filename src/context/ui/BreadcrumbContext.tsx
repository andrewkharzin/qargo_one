// context/ui/BreadcrumbContext.tsx
'use client';

import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import { BreadcrumbItem } from './types/breadcrumb';

interface BreadcrumbContextType {
  items: BreadcrumbItem[];
}

const BreadcrumbContext = createContext<BreadcrumbContextType | undefined>(undefined);

interface BreadcrumbProviderProps {
  children: ReactNode;
  items: BreadcrumbItem[];
}

export const BreadcrumbProvider: React.FC<BreadcrumbProviderProps> = ({
  children,
  items
}) => {
  return (
    <BreadcrumbContext.Provider value={{ items }}>
      {children}
    </BreadcrumbContext.Provider>
  );
};

export const useBreadcrumb = () => {
  const context = useContext(BreadcrumbContext);
  if (context === undefined) {
    throw new Error('useBreadcrumb must be used within a BreadcrumbProvider');
  }
  return context;
};
