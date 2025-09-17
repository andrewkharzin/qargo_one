import { Template, TemplateField } from "../../../types/notes/templates";
import { fieldTypes } from "../config/fieldTypes";

export const createDefaultTemplate = (): Template => ({
  name: '',
  description: '',
  noteType: 'simple_note',
  category: '',
  fields: [],
  tags: ['template'],
  version: 1,
  createdAt: new Date(),
  updatedAt: new Date()
});

export const createNewField = (fieldTypeId: string): TemplateField => {
  const fieldType = fieldTypes.find(ft => ft.id === fieldTypeId);
  
  return {
    id: Date.now().toString(),
    type: fieldTypeId,
    label: `New ${fieldType?.label || 'Field'}`,
    placeholder: '',
    required: false,
    options: fieldType?.defaultOptions,
    validation: undefined
  };
};

export const validateTemplate = (template: Template): string[] => {
  const errors: string[] = [];

  if (!template.name.trim()) {
    errors.push('Template name is required');
  }

  if (template.fields.length === 0) {
    errors.push('At least one field is required');
  }

  // Validate individual fields
  template.fields.forEach((field, index) => {
    if (!field.label.trim()) {
      errors.push(`Field ${index + 1}: Label is required`);
    }

    if (field.type === 'select' && (!field.options || field.options.length === 0)) {
      errors.push(`Field "${field.label}": At least one option is required for select fields`);
    }
  });

  return errors;
};

export const generateTemplateId = (name: string): string => {
  return name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
};

export const generatePreviewContent = (template: Template, previewValues: Record<string, any>): string => {
  let content = `# ${template.name}\n\n`;

  if (template.description) {
    content += `*${template.description}*\n\n`;
  }

  template.fields.forEach(field => {
    const value = previewValues[field.id] || '';
    content += `## ${field.label}\n`;

    if (field.type === 'checkbox') {
      content += value ? '✅ Yes' : '❌ No';
    } else if (field.type === 'select') {
      content += value || `*${field.placeholder || 'Not selected'}*`;
    } else {
      content += value || `*${field.placeholder || 'Not filled'}*`;
    }

    content += '\n\n';
  });

  return content;
};

// Helper function for HTML content generation (without React components)
export const generateStyledPreviewHTML = (template: Template, previewValues: Record<string, any>): string => {
  return `
    <div class="p-6 bg-white text-gray-900">
      <div class="text-center mb-8 border-b pb-4">
        <h1 class="text-3xl font-bold text-blue-900 mb-2">${template.name}</h1>
        ${template.description ? `<p class="text-lg text-gray-600 italic">${template.description}</p>` : ''}
        <div class="flex justify-center gap-4 mt-4 text-sm text-gray-500">
          <span>Type: ${template.noteType}</span>
          <span>•</span>
          <span>Category: ${template.category}</span>
          <span>•</span>
          <span>Created: ${new Date().toLocaleDateString()}</span>
        </div>
      </div>

      <div class="space-y-6">
        ${template.fields.map((field, index) => {
          const value = previewValues[field.id] || '';
          return `
            <div class="border-l-4 border-blue-200 pl-4 py-2">
              <h3 class="text-xl font-semibold text-blue-800 mb-2 flex items-center">
                <span class="w-5 h-5 mr-2 text-blue-600">→</span>
                ${field.label}
                ${field.required ? '<span class="text-red-500 ml-2 text-sm">*</span>' : ''}
              </h3>

              <div class="ml-7">
                ${field.type === 'checkbox' ? `
                  <div class="flex items-center">
                    <div class="w-6 h-6 rounded border-2 mr-3 flex items-center justify-center ${
                      value ? 'bg-green-500 border-green-500' : 'bg-red-100 border-gray-300'
                    }">
                      ${value ? '<span class="text-white text-sm">✓</span>' : ''}
                    </div>
                    <span class="${value ? 'text-green-700 font-medium' : 'text-gray-600'}">
                      ${value ? 'Completed' : 'Not Completed'}
                    </span>
                  </div>
                ` : `
                  <p class="text-gray-700 text-lg leading-relaxed">
                    ${value || `<span class="text-gray-400 italic">${field.placeholder || 'Not specified'}</span>`}
                  </p>
                `}
              </div>

              ${field.type === 'select' && field.options ? `
                <div class="ml-7 mt-1">
                  <span class="bg-blue-50 text-blue-700 px-2 py-1 rounded text-sm border">
                    Selected from: ${field.options.join(', ')}
                  </span>
                </div>
              ` : ''}
            </div>
          `;
        }).join('')}
      </div>

      <div class="mt-12 pt-6 border-t text-center text-sm text-gray-500">
        <p>Generated from template on ${new Date().toLocaleDateString()}</p>
        <p class="mt-1">Template ID: ${template.name.toLowerCase().replace(/\s+/g, '-')}</p>
      </div>
    </div>
  `;
};