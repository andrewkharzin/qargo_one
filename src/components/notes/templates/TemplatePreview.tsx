import React from 'react';
import { ChevronRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Template } from '../../../types/notes/templates';

interface TemplatePreviewProps {
  template: Template;
  previewValues: Record<string, any>;
}

export const TemplatePreview = React.forwardRef<HTMLDivElement, TemplatePreviewProps>(({ 
  template, 
  previewValues 
}, ref) => {
  return (
    <div
      ref={ref}
      className="w-full max-w-none p-6 md:p-8 lg:p-10 bg-white text-gray-900 dark:bg-slate-900 dark:text-slate-100 rounded-xl border border-gray-200 dark:border-slate-700 shadow-sm"
    >
      {/* Header */}
      <div className="text-center mb-8 md:mb-10 border-b border-gray-200 dark:border-slate-700 pb-4">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-blue-900 dark:text-blue-300 mb-2">
          {template.name}
        </h1>
        {template.description && (
          <p className="text-base md:text-lg text-gray-600 dark:text-slate-400 italic">
            {template.description}
          </p>
        )}
        <div className="flex flex-wrap justify-center gap-3 mt-4 text-xs md:text-sm text-gray-500 dark:text-slate-400">
          <span>Type: {template.noteType}</span>
          <span className="hidden md:inline">•</span>
          <span>Category: {template.category}</span>
          <span className="hidden md:inline">•</span>
          <span>Created: {new Date().toLocaleDateString()}</span>
        </div>
      </div>

      {/* Content */}
      <div className="space-y-5 md:space-y-6">
        {template.fields.map((field) => {
          const value = previewValues[field.id] || '';
          return (
            <div key={field.id} className="border-l-4 border-blue-200 dark:border-blue-800 pl-4 md:pl-5 py-2">
              <h3 className="text-lg md:text-xl font-semibold text-blue-800 dark:text-blue-300 mb-2 flex items-center">
                <ChevronRight className="w-4 h-4 md:w-5 md:h-5 mr-2 text-blue-600 dark:text-blue-400" />
                {field.label}
                {field.required && <span className="text-red-500 ml-2 text-xs md:text-sm">*</span>}
              </h3>

              <div className="ml-6 md:ml-7">
                {field.type === 'checkbox' ? (
                  <div className="flex items-center">
                    <div
                      className={`w-5 h-5 md:w-6 md:h-6 rounded border-2 mr-3 flex items-center justify-center ${
                        value
                          ? 'bg-green-500 border-green-500'
                          : 'bg-red-100 dark:bg-slate-800 border-gray-300 dark:border-slate-600'
                      }`}
                    >
                      {value && <span className="text-white text-sm">✓</span>}
                    </div>
                    <span className={value ? 'text-green-700 dark:text-green-400 font-medium' : 'text-gray-600 dark:text-slate-400'}>
                      {value ? 'Completed' : 'Not Completed'}
                    </span>
                  </div>
                ) : (
                  <p className="text-gray-700 dark:text-slate-200 text-base md:text-lg leading-relaxed break-words">
                    {value || (
                      <span className="text-gray-400 dark:text-slate-500 italic">
                        {field.placeholder || 'Not specified'}
                      </span>
                    )}
                  </p>
                )}
              </div>

              {field.type === 'select' && field.options && (
                <div className="ml-6 md:ml-7 mt-1">
                  <Badge variant="outline" className="bg-blue-50 dark:bg-slate-800 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-slate-600">
                    Selected from: {field.options.join(', ')}
                  </Badge>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="mt-10 md:mt-12 pt-6 border-t border-gray-200 dark:border-slate-700 text-center text-xs md:text-sm text-gray-500 dark:text-slate-400">
        <p>Generated from template on {new Date().toLocaleDateString()}</p>
        <p className="mt-1">Template ID: {template.name.toLowerCase().replace(/\s+/g, '-')}</p>
      </div>
    </div>
  );
});

TemplatePreview.displayName = 'TemplatePreview';