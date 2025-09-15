// components/TemplateSelectorGrid.tsx
'use client';

import React from 'react';
import { TemplateType, templateRegistry } from './registry';
import { Card, CardContent } from '@/components/ui/card';
import IconMapping from './IconMapping';

interface TemplateSelectorGridProps {
  onTemplateSelect: (type: TemplateType) => void;
}

export default function TemplateSelectorGrid({ onTemplateSelect }: TemplateSelectorGridProps) {
  const categories = {
    operations: 'Operations',
    personal: 'Personal'
  };

  return (
    <div className="space-y-6">
      {Object.entries(categories).map(([categoryKey, categoryName]) => {
        const categoryTemplates = Object.values(templateRegistry).filter(
          template => template.category === categoryKey
        );

        if (categoryTemplates.length === 0) return null;

        return (
          <div key={categoryKey}>
            <h3 className="text-lg font-semibold mb-3">{categoryName}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {categoryTemplates.map((template) => (
                <Card
                  key={template.type}
                  className="cursor-pointer transition-all hover:shadow-md hover:border-primary"
                  onClick={() => onTemplateSelect(template.type)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-primary/10 rounded-md">
                        <IconMapping
                          iconName={template.icon}
                          className="h-5 w-5 text-primary"
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold">{template.displayName}</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          {template.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
